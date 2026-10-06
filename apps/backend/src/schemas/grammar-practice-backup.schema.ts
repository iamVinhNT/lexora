/**
 * @file grammar-practice-backup.schema.ts
 * @description Validates immutable grammar practice backup rows and their revision-bound relationships.
 */
import { z } from 'zod';

const id = z.string().min(1).max(200).refine(value => value.trim().length > 0, 'Value must not be blank');
const answerText = z.string().min(1).max(2000).refine(value => value.trim().length > 0, 'Value must not be blank');
const feedback = z.string().min(1).refine(value => value.trim().length > 0, 'Feedback must not be blank');
const timestamp = z.string().datetime({ offset: true }).transform(value => new Date(value).toISOString());
const count = z.number().int().nonnegative().max(Number.MAX_SAFE_INTEGER);
export const grammarReviewStateRowSchema = z.object({
  lessonId:id, revisionId:id, revision:id,
  easeFactor:z.number().finite().min(1.3), repetitions:count, interval:count, lapses:count,
  dueAt:timestamp, lastReviewedAt:timestamp.nullable(), createdAt:timestamp, updatedAt:timestamp,
}).strict();
const answer = z.discriminatedUnion('type', [
  z.object({type:z.literal('choice'),text:answerText}).strict(),
  z.object({type:z.literal('text'),text:answerText}).strict(),
]);
const rubric = z.object({ form:z.number().int().min(0).max(2), meaning:z.number().int().min(0).max(2), use:z.number().int().min(0).max(2) }).strict();
const common = { id, requestId:id, lessonId:id, revisionId:id, revision:id, createdAt:timestamp };
export const grammarPracticeAttemptRowSchema = z.discriminatedUnion('kind', [
  z.object({ ...common, kind:z.literal('output'),exerciseId:z.null(),promptId:id,answer:z.null(),
    text:answerText,rubric,assessmentSource:z.literal('self'),isCorrect:z.null(),feedback:z.null(),rating:z.null(),state:z.null(),
  }).strict(),
  z.object({ ...common,kind:z.literal('review'),exerciseId:id,promptId:z.null(),answer,text:z.null(),rubric:z.null(),
    assessmentSource:z.literal('deterministic'),isCorrect:z.boolean(),feedback,rating:z.enum(['AGAIN','GOOD']),state:grammarReviewStateRowSchema,
  }).strict(),
]);
export type GrammarPracticeBackupData = {
  grammarPracticeAttempts:z.infer<typeof grammarPracticeAttemptRowSchema>[];
  grammarReviewStates:z.infer<typeof grammarReviewStateRowSchema>[];
};
export function validateGrammarPracticeRelations(
  data:GrammarPracticeBackupData & {grammarLessonProgress:Array<{lessonId:string;revisionId:string;revision:string;isComplete:boolean}>},
  ctx:z.RefinementCtx,
):void {
  const states=new Map<string,z.infer<typeof grammarReviewStateRowSchema>>();
  const progress=new Map(data.grammarLessonProgress.map(row=>[row.lessonId,row]));
  for(const [index,row] of data.grammarReviewStates.entries()){
    const key=JSON.stringify([row.lessonId,row.revisionId]);
    if(states.has(key))ctx.addIssue({code:'custom',message:'Duplicate grammar review state',path:['grammarReviewStates',index]});
    states.set(key,row);
    const lesson=progress.get(row.lessonId);
    if(!lesson?.isComplete||lesson.revisionId!==row.revisionId||lesson.revision!==row.revision)
      ctx.addIssue({code:'custom',message:'Review state requires completed matching lesson revision',path:['grammarReviewStates',index]});
  }
  const requests=new Set<string>(),ids=new Set<string>();
  for(const [index,row] of data.grammarPracticeAttempts.entries()){
    const path=['grammarPracticeAttempts',index];
    if(ids.has(row.id)||requests.has(row.requestId))ctx.addIssue({code:'custom',message:'Duplicate grammar practice ID or request',path});
    ids.add(row.id);requests.add(row.requestId);
    if(row.kind==='review'){
      const state=states.get(JSON.stringify([row.lessonId,row.revisionId]));
      if(!state||state.revision!==row.revision||row.state.lessonId!==row.lessonId||row.state.revisionId!==row.revisionId||row.state.revision!==row.revision)
        ctx.addIssue({code:'custom',message:'Review attempt has inconsistent state or revision',path});
      if(row.rating!==(row.isCorrect?'GOOD':'AGAIN'))ctx.addIssue({code:'custom',message:'Review rating does not match deterministic result',path});
    }
  }
}
