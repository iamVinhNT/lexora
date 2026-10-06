/**
 * @file DataManagementPracticeBackup.test.tsx
 * @description Prevents an older restore from silently replacing grammar practice before explicit confirmation.
 */
import {fireEvent,render,screen,waitFor,within} from '@testing-library/react';
import {QueryClient,QueryClientProvider} from '@tanstack/react-query';
import {MemoryRouter} from 'react-router-dom';
import {beforeEach,describe,expect,it,vi} from 'vitest';
import {DataManagementPanel} from '../src/components/data-management/DataManagementPanel';
import i18n from '../src/i18n/config';

const backup={version:4,application:'Lexora',exportedAt:'2026-10-05T00:00:00.000Z',data:Object.fromEntries([
 'users','words','wordFamilies','collocations','examples','contexts','contextWords','learningProgress','reviewStates','reviewLogs','tags','wordTags','learningSessions','learningSessionItems','learningAttempts','grammarLessonProgress','grammarExerciseAttempts','studyPreferences','studyTasks',
].map(key=>[key,[]]))};
beforeEach(async()=>{await i18n.changeLanguage('en');vi.spyOn(window,'scrollTo').mockImplementation(()=>undefined);});
describe('older grammar practice restore',()=>{
 it('shows destructive warning and blocks restore until the exact confirmation phrase is entered',async()=>{
  const calls:Array<{url:string;payload:Record<string,unknown>}>=[];
  vi.stubGlobal('fetch',vi.fn(async(input:RequestInfo|URL,init?:RequestInit)=>{
   const url=String(input),payload=JSON.parse(String(init?.body??'{}'));calls.push({url,payload});
   const data=url.endsWith('/api/restore/preview')?{
    valid:true,version:4,application:'Lexora',exportedAt:backup.exportedAt,totalRecords:0,tableCounts:{},previewToken:'confirmed-preview',
    practiceSummary:{includedInBackup:false,willOverwrite:true,warning:'Server diagnostic only',backupTableCounts:{grammarPracticeAttempts:0,grammarReviewStates:0},existingTableCounts:{grammarPracticeAttempts:3,grammarReviewStates:2}},
   }:{restored:true};
   return new Response(JSON.stringify({success:true,data}),{status:200,headers:{'Content-Type':'application/json'}});
  }));
  render(<QueryClientProvider client={new QueryClient({defaultOptions:{queries:{retry:false},mutations:{retry:false}}})}><MemoryRouter><DataManagementPanel/></MemoryRouter></QueryClientProvider>);
  const file=new File([JSON.stringify(backup)],'old-backup.json',{type:'application/json'});
  Object.defineProperty(file,'text',{value:async()=>JSON.stringify(backup)});
  fireEvent.change(screen.getByLabelText('Restore backup file'),{target:{files:[file]}});
  const dialog=await screen.findByRole('dialog',{name:'Restore backup'});
  expect(within(dialog).getByRole('alert')).toBeTruthy();
  const submit=within(dialog).getByRole('button',{name:'Restore backup'});
  const phrase=within(dialog).getByLabelText('Type RESTORE to confirm');
  fireEvent.change(phrase,{target:{value:'restore'}});fireEvent.click(submit);
  expect((submit as HTMLButtonElement).disabled).toBe(true);
  expect(calls.filter(x=>x.url.endsWith('/api/restore'))).toEqual([]);
  fireEvent.change(phrase,{target:{value:'RESTORE'}});fireEvent.click(submit);
  await waitFor(()=>expect(calls.filter(x=>x.url.endsWith('/api/restore'))).toHaveLength(1));
  expect(calls.find(x=>x.url.endsWith('/api/restore'))!.payload).toEqual({backup,previewToken:'confirmed-preview',confirm:true});
 });
});
