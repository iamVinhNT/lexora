/**
 * @file concession-clauses.ts
 * @description B2 lesson 24: Clauses of concession and contrast (although, even though, despite, in spite of, adjective + as/though).
 */
import type { GrammarLesson } from '../../types.js';

const lesson: GrammarLesson = {
  id: 'grammar-v2-b2-concession-clauses-24',
  revisionId: 'grammar-v2-b2-concession-clauses-24@1.0.0',
  revision: '1.0.0',
  title: 'Mệnh đề nhượng bộ và tương phản (Clauses of Concession and Contrast)',
  objective: 'Nắm vững và sử dụng linh hoạt các liên từ và giới từ chỉ sự nhượng bộ (although, even though, despite, in spite of, whereas, while) cùng các cấu trúc đảo nhấn mạnh nâng cao như "Adjective + as / though + S + be".',
  prerequisiteIds: ['grammar-v2-b2-reason-purpose-clauses-23'],
  coverage: ['concession-clauses', 'clauses-of-concession', 'although-even-though', 'despite-in-spite-of', 'adjective-as-though'],
  context: {
    english: 'Academic debaters, policy analysts, and persuasive essayists acknowledge opposing arguments and unexpected realities through nuanced concessive structures before asserting their core claims.',
    vietnamese: 'Các học giả tranh biện, nhà phân tích chính sách và người viết luận thuyết phục thường thừa nhận các quan điểm đối lập hoặc thực tế bất ngờ bằng cấu trúc nhượng bộ tinh tế trước khi khẳng định luận điểm cốt lõi.',
  },
  guide: {
    pattern: 'Although / Even though + S + V | Despite / In spite of + Noun / V-ing / the fact that + clause | Adj/Adv + as / though + S + V',
    whenToUse: [
      'Dùng "although" hoặc "even though" theo sau bởi một mệnh đề đầy đủ (S + V) khi hai sự việc có kết quả trái ngược với kỳ vọng hợp lý.',
      'Dùng "despite" hoặc "in spite of" theo sau bởi danh từ, cụm danh từ, V-ing hoặc "the fact that + clause".',
      'Dùng cấu trúc nhấn mạnh nâng cao "Tính từ / Trạng từ + as / though + S + V" (ví dụ: Difficult as it was...) trong văn phong học thuật và hùng biện.',
    ],
    signalWords: ['although', 'even though', 'despite', 'in spite of', 'difficult as it was'],
    check: [
      'Sau "despite" và "in spite of" là cụm danh từ / V-ing chứ không phải một mệnh đề độc lập (trừ khi có "the fact that")?',
      'Trong một cấu trúc mệnh đề đơn, tránh ghép although/even though với but dư thừa; một số câu nhiều mệnh đề vẫn có thể dùng cả hai khi phạm vi khác nhau.',
      'Phân biệt rõ "even though" (nhượng bộ sự thật có thật) và "even if" (giả định điều kiện kể cả khi xảy ra)?',
    ],
  },
  explanation: 'Mệnh đề nhượng bộ (Concession Clauses) diễn tả hai thông tin tương phản, trong đó vế sau mang lại kết quả bất ngờ hoặc trái với suy đoán thông thường. 1) "Although" và "Even though" đi với mệnh đề có chủ ngữ và động từ chia (Even though the rain poured, we hiked to the summit). "Even though" mang sắc thái nhấn mạnh mạnh mẽ hơn "although". Tuyệt đối không dùng "but" ở mệnh đề chính khi đã có Although/Even though. 2) "Despite" và "In spite of" là giới từ, do đó theo sau phải là danh từ, V-ing, hoặc "the fact that + clause" (Despite feeling exhausted, he finished the marathon). Chú ý: "despite" không đi với "of" (*despite of). 3) Cấu trúc nhượng bộ nâng cao: Đưa tính từ hoặc trạng từ lên đầu câu với "as" hoặc "though" để nhấn mạnh mức độ (Rich as he is, he lives modestly; Hard though she tried, she failed). Cấu trúc "Much as + S + V" dùng để diễn tả sự nhượng bộ về cảm xúc/mong muốn (Much as I admire her intellect, I disagree with her conclusion).',
  examples: [
    {
      english: 'Although the economic climate remained volatile, the startup achieved profitability in its first year.',
      vietnamese: 'Mặc dù môi trường kinh tế vẫn đầy biến động, công ty khởi nghiệp đã đạt được lợi nhuận ngay trong năm đầu tiên.',
    },
    {
      english: 'Despite heavy snowfall disrupting transit lines, all committee members attended the symposium.',
      vietnamese: 'Bất chấp tuyết rơi dày đặc làm gián đoạn các tuyến giao thông, tất cả các thành viên ủy ban đều tham dự hội nghị chuyên đề.',
    },
    {
      english: 'In spite of having no formal culinary training, she opened an award-winning bistro.',
      vietnamese: 'Mặc dù không được đào tạo nấu ăn bài bản, cô ấy đã mở một nhà hàng nhỏ đoạt giải thưởng.',
    },
    {
      english: 'Talented though he was, the young pianist suffered from paralyzing stage fright.',
      vietnamese: 'Dù tài năng đến đâu, nghệ sĩ dương cầm trẻ tuổi vẫn phải chịu đựng nỗi sợ sân khấu tột cùng.',
    },
    {
      english: 'Much as I would like to accept your invitation, prior commitments prevent me from attending.',
      vietnamese: 'Dù tôi rất muốn nhận lời mời của bạn, những cam kết từ trước khiến tôi không thể tham dự được.',
    },
    {
      english: 'The report was finalized despite the fact that several regional data sets were incomplete.',
      vietnamese: 'Báo cáo đã được hoàn thiện bất chấp thực tế là một số bộ dữ liệu khu vực vẫn chưa đầy đủ.',
    },
  ],
  contrasts: [
    {
      form: 'Although the medication had severe side effects, the patient completed the course.',
      whyFits: 'Dùng liên từ Although vì theo sau là mệnh đề hoàn chỉnh có chủ ngữ (the medication) và động từ (had).',
      whyNot: '"Despite the medication had severe side effects..." là sai vì despite là giới từ, không thể nối trực tiếp một mệnh đề.',
    },
    {
      form: 'Hard as they negotiated, no compromise could be reached on territorial boundaries.',
      whyFits: 'Cấu trúc đảo trạng từ Hard as they negotiated tạo sắc thái nhượng bộ trang trọng và nhấn mạnh nỗ lực đàm phán.',
      whyNot: '"Hard though that they negotiated..." là sai cú pháp vì that không xuất hiện sau though trong mẫu đảo này.',
    },
  ],
  commonMistakes: [
    'Dùng "Despite of" thay vì "Despite" hoặc "In spite of" (ví dụ: viết "Despite of the cold" thay vì "Despite the cold").',
    'Dùng cả liên từ nhượng bộ và liên từ kết hợp "but" trong cùng một câu (ví dụ: viết "Although he was tired, but he kept working").',
    'Nhầm lẫn giữa "even though" (thừa nhận một thực tế đã xảy ra) và "even if" (nêu giả định chưa chắc xảy ra).',
  ],
  summary: 'Mệnh đề nhượng bộ đối lập hai thông tin: Although/Even though + mệnh đề; Despite/In spite of + danh từ/V-ing/the fact that; Tính từ/Trạng từ + as/though + S + V nhấn mạnh mức độ nhượng bộ trong văn phong học thuật.',
  exercises: [
    {
      id: 'grammar-v2-b2-concession-clauses-24-q1',
      kind: 'choice',
      prompt: 'Select the sentence with correct syntax for concession:',
      options: [
        { text: 'Despite the rigorous safety inspections, the amusement park ride malfunctioned.', correct: true, rationale: 'Preposition despite correctly governs the noun phrase the rigorous safety inspections.' },
        { text: 'Despite of the rigorous safety inspections, the amusement park ride malfunctioned.', correct: false, rationale: 'Despite cannot take the preposition of.' },
        { text: 'Although the rigorous safety inspections, the amusement park ride malfunctioned.', correct: false, rationale: 'Although must be followed by a clause with a finite verb.' },
        { text: 'Despite the ride was inspected rigorously, it malfunctioned.', correct: false, rationale: 'Despite cannot govern a finite clause without the fact that.' },
      ],
      acceptedAnswers: [{ text: 'Despite the rigorous safety inspections, the amusement park ride malfunctioned.', rationale: 'Despite followed by noun phrase is correct.' }],
    },
    {
      id: 'grammar-v2-b2-concession-clauses-24-q2',
      kind: 'choice',
      prompt: 'Choose the correct fronted concession structure: "___ the assignment was, the students finished ahead of schedule."',
      options: [
        { text: 'Challenging though', correct: true, rationale: 'Adjective + though + subject + verb is the standard fronted concession pattern.' },
        { text: 'Although challenging', correct: false, rationale: 'Although challenging the assignment was is structurally scrambled and ungrammatical.' },
        { text: 'In spite of challenging', correct: false, rationale: 'In spite of requires a noun or gerund, not an adjective directly preceding a clause.' },
        { text: 'However challenging that', correct: false, rationale: 'That cannot follow however challenging in this construction.' },
      ],
      acceptedAnswers: [{ text: 'Challenging though', rationale: 'Challenging though correctly creates an emphatic concessive inversion.' }],
    },
    {
      id: 'grammar-v2-b2-concession-clauses-24-q3',
      kind: 'choice',
      prompt: 'Identify the sentence containing an erroneous conjunction combination:',
      options: [
        { text: 'Although the evidence was compelling, but the jury remained unconvinced.', correct: true, rationale: 'Although and but cannot both link the same two clauses; but must be removed.' },
        { text: 'Although the evidence was compelling, the jury remained unconvinced.', correct: false, rationale: 'Correct standard concession structure.' },
        { text: 'The evidence was compelling, yet the jury remained unconvinced.', correct: false, rationale: 'Correct coordination using yet.' },
        { text: 'In spite of compelling evidence, the jury remained unconvinced.', correct: false, rationale: 'Correct prepositional phrase of concession.' },
      ],
      acceptedAnswers: [{ text: 'Although the evidence was compelling, but the jury remained unconvinced.', rationale: 'Contains incorrect double conjunction although ... but.' }],
    },
    {
      id: 'grammar-v2-b2-concession-clauses-24-q4',
      kind: 'choice',
      prompt: 'Select the option that correctly uses "much as" to express emotional concession:',
      options: [
        { text: 'Much as I admire his courage, I cannot endorse his reckless plan.', correct: true, rationale: 'Much as + subject + verb conveys emphatic emotional concession (Even though I admire him greatly).' },
        { text: 'As much I admire his courage, I cannot endorse his reckless plan.', correct: false, rationale: 'Missing the second as; cannot replace much as in this idiom.' },
        { text: 'Much although I admire his courage, I cannot endorse his reckless plan.', correct: false, rationale: 'Much although is ungrammatical.' },
        { text: 'Much as though I admire his courage, I cannot endorse his reckless plan.', correct: false, rationale: 'Much as though fuses two incompatible patterns.' },
      ],
      acceptedAnswers: [{ text: 'Much as I admire his courage, I cannot endorse his reckless plan.', rationale: 'Much as followed by clause expresses valid concession.' }],
    },
    {
      id: 'grammar-v2-b2-concession-clauses-24-q5',
      kind: 'gap',
      prompt: 'Fill in the single preposition meaning "in spite of": "_____ facing immense pressure, the negotiator remained calm."',
      options: [],
      acceptedAnswers: [{ text: 'Despite', rationale: 'Despite governs the gerund clause facing immense pressure.' }],
    },
    {
      id: 'grammar-v2-b2-concession-clauses-24-q6',
      kind: 'gap',
      prompt: 'Fill in the particle in fronted concession: "Simple _____ the solution may appear, implementing it requires months of work."',
      options: [],
      acceptedAnswers: [{ text: 'as', rationale: 'Simple as the solution may appear forms fronted adjective concession.' }, { text: 'though', rationale: 'Simple though the solution may appear also forms fronted adjective concession.' }],
    },
    {
      id: 'grammar-v2-b2-concession-clauses-24-q7',
      kind: 'gap',
      prompt: 'Complete the three-word prepositional phrase: "In _____ of severe opposition from local residents, the airport runway was extended."',
      options: [],
      acceptedAnswers: [{ text: 'spite', rationale: 'In spite of is the standard prepositional phrase.' }],
    },
    {
      id: 'grammar-v2-b2-concession-clauses-24-q8',
      kind: 'gap',
      prompt: 'Complete the clause linker: "The merger proceeded despite the _____ that antitrust regulators had raised serious objections."',
      options: [],
      acceptedAnswers: [{ text: 'fact', rationale: 'Despite the fact that allows despite to introduce a finite clause.' }],
    },
    {
      id: 'grammar-v2-b2-concession-clauses-24-q9',
      kind: 'transform',
      prompt: 'Rewrite using "Despite": "Although she possessed impressive credentials, she was not selected for the fellowship."',
      options: [],
      acceptedAnswers: [
        { text: 'Despite possessing impressive credentials, she was not selected for the fellowship.', rationale: 'Changes clause to gerund phrase possessing impressive credentials.' },
        { text: 'Despite her impressive credentials, she was not selected for the fellowship.', rationale: 'Changes clause to noun phrase her impressive credentials.' },
      ],
    },
    {
      id: 'grammar-v2-b2-concession-clauses-24-q10',
      kind: 'transform',
      prompt: 'Rewrite using fronted "Unlikely as": "Even though it was unlikely that they would win, the team played with tremendous spirit."',
      options: [],
      acceptedAnswers: [
        { text: 'Unlikely as it was that they would win, the team played with tremendous spirit.', rationale: 'Fronts adjective Unlikely with as.' },
      ],
    },
    {
      id: 'grammar-v2-b2-concession-clauses-24-q11',
      kind: 'correction',
      prompt: 'Correct the error in preposition usage: "Despite of the high tuition fees, thousands of international students apply each year."',
      options: [],
      acceptedAnswers: [
        { text: 'Despite the high tuition fees, thousands of international students apply each year.', rationale: 'Removes erroneous preposition of after despite.' },
        { text: 'In spite of the high tuition fees, thousands of international students apply each year.', rationale: 'Replaces despite of with in spite of.' },
      ],
    },
    {
      id: 'grammar-v2-b2-concession-clauses-24-q12',
      kind: 'correction',
      prompt: 'Correct the double conjunction error: "Even though the treaty was signed, but border skirmishes continued for several weeks."',
      options: [],
      acceptedAnswers: [
        { text: 'Even though the treaty was signed, border skirmishes continued for several weeks.', rationale: 'Deletes redundant conjunction but.' },
      ],
    },
  ],
  reviewExercises: [
    {
      id: 'grammar-v2-b2-concession-clauses-24-r1',
      kind: 'choice',
      prompt: 'Which sentence correctly combines concession with sophisticated academic style?',
      options: [
        { text: 'Rigorous though the methodology was, reviewers identified several unaddressed sampling biases.', correct: true, rationale: 'Adjective + though + subject + verb creates standard scholarly concession.' },
        { text: 'Rigorous although the methodology was, reviewers identified several unaddressed sampling biases.', correct: false, rationale: 'Although cannot replace though/as in this fronted inversion structure.' },
        { text: 'In spite the methodology was rigorous, reviewers identified several unaddressed sampling biases.', correct: false, rationale: 'In spite cannot govern a clause without of the fact that.' },
      ],
      acceptedAnswers: [{ text: 'Rigorous though the methodology was, reviewers identified several unaddressed sampling biases.', rationale: 'Rigorous though the methodology was correctly employs fronted concession.' }],
    },
    {
      id: 'grammar-v2-b2-concession-clauses-24-r2',
      kind: 'gap',
      prompt: 'Fill in the missing word in the emotional concession pattern: "_____ as I respect the committee’s dedication, their recommendation is flawed."',
      options: [],
      acceptedAnswers: [{ text: 'Much', rationale: 'Much as introduces an emphatic concessive clause.' }],
    },
    {
      id: 'grammar-v2-b2-concession-clauses-24-r3',
      kind: 'transform',
      prompt: 'Rewrite using "In spite of": "Although inflation rose sharply throughout the quarter, consumer spending did not decline."',
      options: [],
      acceptedAnswers: [
        { text: 'In spite of inflation rising sharply throughout the quarter, consumer spending did not decline.', rationale: 'Uses in spite of with gerund phrase.' },
        { text: 'In spite of a sharp rise in inflation throughout the quarter, consumer spending did not decline.', rationale: 'Uses in spite of with noun phrase.' },
      ],
    },
    {
      id: 'grammar-v2-b2-concession-clauses-24-r4',
      kind: 'correction',
      prompt: 'Correct the syntactic error: "Although he had an ankle sprain, yet he completed the marathon."',
      options: [],
      acceptedAnswers: [
        { text: 'Although he had an ankle sprain, he completed the marathon.', rationale: 'Removes redundant coordinating conjunction yet after although.' },
      ],
    },
  ],
  outputPrompts: [
    {
      id: 'grammar-v2-b2-concession-clauses-24-o1',
      prompt: 'Viết 1-2 câu trong một bài luận tranh luận, sử dụng cấu trúc "Despite + Noun phrase" hoặc "In spite of + V-ing" để nêu bật một thành tựu đạt được trong hoàn cảnh khắc nghiệt.',
      modelAnswer: 'Despite mounting budgetary constraints and supply disruptions, the aerospace consortium delivered the lunar satellite ahead of schedule. In spite of facing intense public skepticism, the engineers proved the viability of their propulsion system.',
      checks: [
        'Sử dụng Despite + danh từ hoặc In spite of + V-ing chuẩn ngữ pháp (không có of sau despite).',
        'Nêu bật sự tương phản rõ ràng giữa thách thức và thành tựu.',
        'Ngữ điệu tự tin, học thuật và mạch lạc.',
      ],
    },
    {
      id: 'grammar-v2-b2-concession-clauses-24-o2',
      prompt: 'Viết 1-2 câu học thuật sử dụng cấu trúc đảo tính từ "Adjective + as / though + S + be" hoặc "Much as I..." để thừa nhận một mặt hạn chế trước khi đưa ra kết luận tích cực.',
      modelAnswer: 'Flawed though the initial clinical trials were, subsequent peer reviews confirmed the drug’s overall therapeutic value. Much as skeptics criticized the original sample size, recent epidemiological data have silenced the critics.',
      checks: [
        'Sử dụng cấu trúc đảo Adjective + as/though + S + V hoặc Much as...',
        'Hai mệnh đề thể hiện sự nhượng bộ tinh tế và logic tương phản chặt chẽ.',
        'Độ chính xác ngữ pháp cao.',
      ],
    },
  ],
  sources: [
    {
      id: 'swan-pe-concession',
      title: 'Swan: Practical English Usage - Concession and contrast',
      url: 'https://www.oxfordlearnersdictionaries.com/grammar/practical-english-usage/concession-clauses',
      claims: [
        'Although and even though are conjunctions taking full clauses; despite and in spite of are prepositions followed by nouns or gerunds.',
        'Structures with adjective + as/though + subject + verb express emphatic concession.',
      ],
      checkedAt: '2026-10-05',
      provenance: 'reference-only',
    },
  ],
  review: {
    status: 'approved',
    mode: 'ai-internal',
    reviewer: 'OpenAI Codex (AI-internal editorial review)',
    reviewedAt: '2026-10-06T00:00:00.000Z',
    summary: 'AI-internal review of teaching content, controlled and transfer exercises, output prompts, and reference claims; corrected ambiguity and overgeneralized rules.',
    checks: { originalProse: true, factualExplanation: true, clearContrasts: true, singleCorrectChoice: true, validTransferExercises: true, soundOutputPrompts: true, referenceOnlySources: true },
  },
};
export default lesson;
