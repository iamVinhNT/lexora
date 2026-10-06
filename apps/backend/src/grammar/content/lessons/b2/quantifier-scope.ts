/**
 * @file quantifier-scope.ts
 * @description B2 lesson 26: Quantifier scope, distributive vs collective meanings, and subject-verb agreement.
 */
import type { GrammarLesson } from '../../types.js';

const lesson: GrammarLesson = {
  id: 'grammar-v2-b2-quantifier-scope-26',
  revisionId: 'grammar-v2-b2-quantifier-scope-26@1.0.0',
  revision: '1.0.0',
  title: 'Phạm vi từ định lượng và sự hòa hợp số lượng (Quantifier Scope and Agreement)',
  objective: 'Phân biệt chính xác phạm vi ý nghĩa phân phối (distributive) và tập hợp (collective) giữa each, every, either, neither, all, whole và nắm vững quy tắc hòa hợp chủ vị (subject-verb agreement) chuẩn mực trong văn phong học thuật.',
  prerequisiteIds: ['grammar-v2-b2-articles-shared-reference-25'],
  coverage: ['quantifier-scope', 'each-every', 'either-neither', 'all-whole', 'quantifier-agreement', 'distributive-meaning'],
  context: {
    english: 'Scientific researchers, survey analysts, and corporate lawyers define exact statistical scopes and group boundaries by choosing between individualizing distributive quantifiers and collective aggregators.',
    vietnamese: 'Các nhà nghiên cứu khoa học, chuyên viên phân tích khảo sát và luật sư doanh nghiệp xác định chính xác phạm vi thống kê và ranh giới nhóm bằng cách lựa chọn giữa từ định lượng phân phối từng cá thể và từ định lượng gộp tập hợp.',
  },
  guide: {
    pattern: 'Each / Every + Singular Noun + Singular Verb | Each / Either / Neither of + Plural Noun + Singular Verb | All (of) the + Noun | The whole + Singular Countable Noun',
    whenToUse: [
      'Dùng "each" khi nhấn mạnh từng cá thể riêng biệt trong một nhóm (từ 2 đối tượng trở lên); "each" có thể làm đại từ độc lập (each of them has...).',
      'Dùng "every" khi xét các thành viên của nhóm như một tập hợp; every thường gợi nhóm từ ba thành viên trở lên nhưng không phải quy tắc số lượng tuyệt đối.',
      'Dùng "either" / "neither" khi chỉ một trong hai đối tượng; trong văn phong học thuật trang trọng, chủ ngữ với "Neither of..." luôn đi với động từ số ít.',
      'Dùng "the whole" trước danh từ số ít đếm được để chỉ toàn bộ tính trọn vẹn (the whole year, the whole team), so sánh với "all the...".',
    ],
    signalWords: ['each of the', 'every single', 'neither of which', 'the whole of', 'none of the'],
    check: [
      'Sau "Each of...", "Neither of...", "Every one of..." động từ đã được chia ở ngôi thứ ba số ít (has, is, was) trong văn phong chuẩn chưa?',
      'Phân biệt cách nhìn phân phối của "each" với cách nhìn bao quát của "every"; không dựa vào ngưỡng số lượng tuyệt đối.',
      'Tránh dùng "whole" với danh từ không đếm được (dùng "all the water", không dùng "the whole water")?',
    ],
  },
  explanation: 'Phạm vi ý nghĩa của từ định lượng quyết định cách nhìn và tính hòa hợp. Each thường xét từng cá thể riêng lẻ và dùng được với nhóm từ hai đối tượng trở lên; every thường xem các thành viên như một tập hợp và thường dùng với nhóm từ ba trở lên, nhưng đây không phải ranh giới ngữ pháp tuyệt đối. Each có thể làm đại từ (Each was labeled) hoặc đứng sau chủ ngữ (They each agreed); every thường đứng trước danh từ số ít hoặc trong cấu trúc every one of. Either và neither thường nói về hai lựa chọn. Whole đứng trước danh từ đếm được số ít (the whole year); all dùng được với danh từ số nhiều và không đếm được.',
  examples: [
    {
      english: 'Each participant was assigned a unique alphanumeric code to ensure data anonymity.',
      vietnamese: 'Mỗi người tham gia đều được cấp một mã chữ-số duy nhất để đảm bảo tính ẩn danh của dữ liệu.',
    },
    {
      english: 'Every single hypothesis tested during the trial failed to demonstrate statistical significance.',
      vietnamese: 'Mọi giả thuyết được kiểm định trong suốt đợt thử nghiệm đều không chứng minh được ý nghĩa thống kê.',
    },
    {
      english: 'Neither of the proposed legislative amendments has received bipartisan endorsement.',
      vietnamese: 'Không có bản sửa đổi luật nào trong số hai bản được đề xuất nhận được sự ủng hộ từ cả hai đảng.',
    },
    {
      english: 'The fire destroyed the whole warehouse, including all electronic inventory stored inside.',
      vietnamese: 'Vụ hỏa hoạn đã thiêu rụi toàn bộ nhà kho, bao gồm tất cả hàng tồn kho điện tử được lưu trữ bên trong.',
    },
    {
      english: 'Every one of the survey respondents agrees that customer service requires modernization.',
      vietnamese: 'Mỗi một người trong số những người trả lời khảo sát đều đồng ý rằng dịch vụ khách hàng cần được hiện đại hóa.',
    },
    {
      english: 'The two architects had distinct visions, but each was recognized for innovative spatial design.',
      vietnamese: 'Hai kiến trúc sư có những tầm nhìn khác biệt, nhưng mỗi người đều được công nhận vì thiết kế không gian đột phá.',
    },
  ],
  contrasts: [
    {
      form: 'Neither of the two software solutions is compatible with legacy operating systems.',
      whyFits: 'Trong văn phong học thuật và trang trọng, Neither of the two solutions đi với động từ số ít is để nhấn mạnh từng giải pháp đơn lẻ.',
      whyNot: '"Neither of the two solutions are compatible..." phổ biến trong văn nói thân mật nhưng bị coi là thiếu chuẩn xác trong văn viết học thuật.',
    },
    {
      form: 'She spent the whole afternoon cataloging the rare botanical specimens.',
      whyFits: 'Dùng the whole afternoon để nhấn mạnh tính trọn vẹn liên tục của một buổi chiều đơn lẻ.',
      whyNot: '"She spent the whole water..." là sai vì whole không dùng trực tiếp trước danh từ không đếm được (phải dùng all the water).',
    },
  ],
  commonMistakes: [
    'Chia động từ số nhiều sau "Each of..." hoặc "Neither of..." trong văn bản học thuật (ví dụ: viết "Neither of the candidates have arrived" thay vì "has arrived").',
    'Dùng "every" khi chỉ có hai đối tượng (ví dụ: nói "every of my parents" thay vì "both of my parents" hoặc "each of my parents").',
    'Dùng "whole" trước danh từ không đếm được (ví dụ: viết "the whole information" thay vì "all the information").',
  ],
  summary: 'Each thường nhấn mạnh từng cá thể; every thường nhìn các thành viên như một tập hợp và thường dùng cho nhóm từ ba trở lên, nhưng không có ngưỡng tuyệt đối. Either/neither thường đề cập hai lựa chọn; whole thường đứng trước danh từ đếm được số ít.',
  exercises: [
    {
      id: 'grammar-v2-b2-quantifier-scope-26-q1',
      kind: 'choice',
      prompt: 'Select the sentence with strictly formal subject-verb agreement:',
      options: [
        { text: 'Neither of the experimental treatments has produced adverse neurological symptoms.', correct: true, rationale: 'Formal academic agreement requires singular has after Neither of.' },
        { text: 'Neither of the experimental treatments have produced adverse neurological symptoms.', correct: false, rationale: 'Plural have is informal and avoided in rigorous academic syntax.' },
        { text: 'Every of the experimental treatments has produced adverse neurological symptoms.', correct: false, rationale: 'Every cannot function as an independent pronoun followed by of; must use Every one of.' },
        { text: 'Each of the experimental treatments have produced adverse neurological symptoms.', correct: false, rationale: 'Each of requires singular verb agreement in formal style.' },
      ],
      acceptedAnswers: [{ text: 'Neither of the experimental treatments has produced adverse neurological symptoms.', rationale: 'Neither of takes singular verb has in formal usage.' }],
    },
    {
      id: 'grammar-v2-b2-quantifier-scope-26-q2',
      kind: 'choice',
      prompt: 'Choose the quantifier that correctly specifies a two-item set: "The athlete held a javelin in ___ hand before commencing his run-up."',
      options: [
        { text: 'each', correct: true, rationale: 'Each correctly refers to members of a pair (two hands) individually.' },
        { text: 'every', correct: false, rationale: 'Every is used for three or more entities, not pairs.' },
        { text: 'all', correct: false, rationale: 'All requires a plural noun (all hands), which is impossible for one person.' },
        { text: 'whole', correct: false, rationale: 'Whole modifies a single entire entity, not distributed across a pair.' },
      ],
      acceptedAnswers: [{ text: 'each', rationale: 'Each is the correct distributive quantifier for two items.' }],
    },
    {
      id: 'grammar-v2-b2-quantifier-scope-26-q3',
      kind: 'choice',
      prompt: 'Identify the grammatically correct sentence using "whole":',
      options: [
        { text: 'The torrential downpour flooded the whole valley within twenty-four hours.', correct: true, rationale: 'The whole correctly modifies the singular countable noun valley.' },
        { text: 'The storm destroyed the whole equipment in the telecommunications hut.', correct: false, rationale: 'Equipment is uncountable and cannot be modified by whole; use all the equipment.' },
        { text: 'Whole the committee voted against the controversial rezoning plan.', correct: false, rationale: 'Whole cannot precede the article the; correct form is The whole committee.' },
        { text: 'The whole students were evacuated from the dormitory building.', correct: false, rationale: 'Whole cannot directly modify plural count nouns without of the (All the students is standard).' },
      ],
      acceptedAnswers: [{ text: 'The torrential downpour flooded the whole valley within twenty-four hours.', rationale: 'The whole valley correctly expresses entire singular entity.' }],
    },
    {
      id: 'grammar-v2-b2-quantifier-scope-26-q4',
      kind: 'choice',
      prompt: 'Select the sentence that maintains proper distributive pronoun syntax:',
      options: [
        { text: 'Every one of the thirty applicants was interviewed by the executive panel.', correct: true, rationale: 'Every one of correctly functions as a distributive pronoun taking singular was.' },
        { text: 'Every of the thirty applicants was interviewed by the executive panel.', correct: false, rationale: 'Every cannot be followed directly by of without one.' },
        { text: 'Every one of the thirty applicants were interviewed by the executive panel.', correct: false, rationale: 'Formal syntax prefers singular was with Every one.' },
        { text: 'Each applicant were interviewed by the executive panel.', correct: false, rationale: 'Each applicant requires singular was, not were.' },
      ],
      acceptedAnswers: [{ text: 'Every one of the thirty applicants was interviewed by the executive panel.', rationale: 'Every one of with singular verb is correct.' }],
    },
    {
      id: 'grammar-v2-b2-quantifier-scope-26-q5',
      kind: 'gap',
      prompt: 'Fill in the singular auxiliary verb for formal agreement: "Neither of the proposed routes _____ feasible due to mountain snowdrifts."',
      options: [],
      acceptedAnswers: [{ text: 'is', rationale: 'Is provides singular present agreement with Neither of.' }, { text: 'was', rationale: 'Was provides singular past agreement with Neither of.' }],
    },
    {
      id: 'grammar-v2-b2-quantifier-scope-26-q6',
      kind: 'gap',
      prompt: 'Fill in the pronoun to complete the phrase: "Every _____ of the committee members voted in favor of the audit resolution."',
      options: [],
      acceptedAnswers: [{ text: 'one', rationale: 'Every one of forms the distributive pronoun phrase.' }],
    },
    {
      id: 'grammar-v2-b2-quantifier-scope-26-q7',
      kind: 'gap',
      prompt: 'Fill in the quantifier meaning "the entire": "The archaeologists spent the _____ winter analyzing pottery shards in the laboratory."',
      options: [],
      acceptedAnswers: [{ text: 'whole', rationale: 'The whole winter emphasizes the entirety of the season.' }],
    },
    {
      id: 'grammar-v2-b2-quantifier-scope-26-q8',
      kind: 'gap',
      prompt: 'Complete with the quantifier for two entities: "There are trees on _____ side of the avenue, creating a shaded canopy."',
      options: [],
      acceptedAnswers: [{ text: 'either', rationale: 'Either side refers to both sides of the two-sided avenue.' }, { text: 'each', rationale: 'Each side also refers distributively to both sides.' }],
    },
    {
      id: 'grammar-v2-b2-quantifier-scope-26-q9',
      kind: 'transform',
      prompt: 'Rewrite using "Each of" with formal singular agreement: "All of the delegates have submitted their credentials to the secretariat."',
      options: [],
      acceptedAnswers: [
        { text: 'Each of the delegates has submitted their credentials to the secretariat.', rationale: 'Replaces All of with Each of and adjusts have to singular has.' },
        { text: 'Each of the delegates has submitted his or her credentials to the secretariat.', rationale: 'Formal singular throughout.' },
      ],
    },
    {
      id: 'grammar-v2-b2-quantifier-scope-26-q10',
      kind: 'transform',
      prompt: 'Rewrite using "the whole" instead of "all": "He read all the book in a single evening sitting."',
      options: [],
      acceptedAnswers: [
        { text: 'He read the whole book in a single evening sitting.', rationale: 'Replaces all the book with the whole book.' },
      ],
    },
    {
      id: 'grammar-v2-b2-quantifier-scope-26-q11',
      kind: 'correction',
      prompt: 'Correct the subject-verb agreement error in the formal report: "Neither of the two financial forecasts are accurate."',
      options: [],
      acceptedAnswers: [
        { text: 'Neither of the two financial forecasts is accurate.', rationale: 'Replaces plural are with singular is after Neither of in formal English.' },
      ],
    },
    {
      id: 'grammar-v2-b2-quantifier-scope-26-q12',
      kind: 'correction',
      prompt: 'Correct the quantifier error: "We examined every of the twenty samples under the electron microscope."',
      options: [],
      acceptedAnswers: [
        { text: 'We examined every one of the twenty samples under the electron microscope.', rationale: 'Adds one after every to form the pronoun every one of.' },
        { text: 'We examined each of the twenty samples under the electron microscope.', rationale: 'Substitutes each of for erroneous every of.' },
      ],
    },
  ],
  reviewExercises: [
    {
      id: 'grammar-v2-b2-quantifier-scope-26-r1',
      kind: 'choice',
      prompt: 'Select the sentence that complies with strict academic subject-verb agreement standards:',
      options: [
        { text: 'Each of the fifteen interviewees was asked identical screening questions.', correct: true, rationale: 'Each of correctly governs the singular verb was in formal discourse.' },
        { text: 'Each of the fifteen interviewees were asked identical screening questions.', correct: false, rationale: 'Were violates formal distributive singular agreement.' },
        { text: 'Every interviewees was asked identical screening questions.', correct: false, rationale: 'Every cannot modify a plural noun directly.' },
      ],
      acceptedAnswers: [{ text: 'Each of the fifteen interviewees was asked identical screening questions.', rationale: 'Each of takes singular was in formal English.' }],
    },
    {
      id: 'grammar-v2-b2-quantifier-scope-26-r2',
      kind: 'gap',
      prompt: 'Fill in the correct auxiliary verb: "Neither of the proposed solutions _____ proved commercially viable."',
      options: [],
      acceptedAnswers: [{ text: 'has', rationale: 'Has provides the formal singular present perfect auxiliary.' }],
    },
    {
      id: 'grammar-v2-b2-quantifier-scope-26-r3',
      kind: 'transform',
      prompt: 'Rewrite using "Neither of" instead of negative coordination: "The first prototype was not durable, and the second prototype was not durable either."',
      options: [],
      acceptedAnswers: [
        { text: 'Neither of the prototypes was durable.', rationale: 'Combines the two clauses with Neither of and singular was.' },
        { text: 'Neither of the two prototypes was durable.', rationale: 'Explicitly retains the numeral two with singular was.' },
      ],
    },
    {
      id: 'grammar-v2-b2-quantifier-scope-26-r4',
      kind: 'correction',
      prompt: 'Correct the quantifier collocation: "The unexpected blizzard disrupted the whole traffic across the metropolitan area."',
      options: [],
      acceptedAnswers: [
        { text: 'The unexpected blizzard disrupted all the traffic across the metropolitan area.', rationale: 'Replaces the whole with all the before uncountable traffic.' },
      ],
    },
  ],
  outputPrompts: [
    {
      id: 'grammar-v2-b2-quantifier-scope-26-o1',
      prompt: 'Viết 1-2 câu trong một báo cáo kết quả nghiên cứu khoa học, sử dụng "Each of..." hoặc "Neither of..." với sự hòa hợp chủ vị số ít chuẩn mực (has/is/was).',
      modelAnswer: 'Each of the clinical trial participants was monitored continuously for forty-eight hours post-injection. Neither of the control groups has exhibited unexpected allergic reactions during the evaluation period.',
      checks: [
        'Sử dụng cấu trúc "Each of..." hoặc "Neither of...".',
        'Động từ được chia ở ngôi thứ ba số ít (was, has).',
        'Văn phong báo cáo nghiên cứu khoa học chính xác, khách quan.',
      ],
    },
    {
      id: 'grammar-v2-b2-quantifier-scope-26-o2',
      prompt: 'Viết 1-2 câu miêu tả sự phân công công việc hoặc đánh giá tổ chức, sử dụng "the whole" cho một thực thể trọn vẹn và "every single" để nhấn mạnh từng phần tử.',
      modelAnswer: 'The whole department collaborated under tight deadlines to finalize the annual compliance report. Every single team member contributed indispensable expertise to ensure zero regulatory discrepancies.',
      checks: [
        'Sử dụng đúng "the whole" đi với danh từ số ít chỉ tập thể/tổ chức.',
        'Sử dụng "every single" để nhấn mạnh từng thành viên trong tập thể.',
        'Ngữ nghĩa rõ ràng, tự nhiên.',
      ],
    },
  ],
  sources: [
    {
      id: 'oxford-quantifiers-agreement',
      title: 'Oxford Learner’s Grammar: Quantifiers and subject-verb agreement',
      url: 'https://www.oxfordlearnersdictionaries.com/grammar/online-grammar/quantifiers',
      claims: [
        'Each and each of take singular verbs; in formal English, neither of takes a singular verb.',
        'Whole is used with singular countable nouns to emphasize completeness, whereas all is used with uncountables and plurals.',
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
