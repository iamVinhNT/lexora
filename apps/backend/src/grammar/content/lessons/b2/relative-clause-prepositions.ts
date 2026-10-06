/**
 * @file relative-clause-prepositions.ts
 * @description B2 lesson 22: Prepositions in relative clauses (formal fronting vs informal stranding).
 */
import type { GrammarLesson } from '../../types.js';

const lesson: GrammarLesson = {
  id: 'grammar-v2-b2-relative-clause-prepositions-22',
  revisionId: 'grammar-v2-b2-relative-clause-prepositions-22@1.0.0',
  revision: '1.0.0',
  title: 'Giới từ trong mệnh đề quan hệ (Prepositions in Relative Clauses)',
  objective: 'Làm chủ vị trí của giới từ trong mệnh đề quan hệ giữa hai phong cách: đảo giới từ lên trước đại từ quan hệ (formal fronting: to whom, in which) và để giới từ ở cuối mệnh đề (informal stranding: who/which/that ... to/in).',
  prerequisiteIds: ['grammar-v2-b2-participle-clauses-passive-21'],
  coverage: ['relative-clause-prepositions', 'preposition-fronting', 'preposition-stranding', 'whom-which-patterns', 'formal-register'],
  context: {
    english: 'Legal drafts, academic dissertations, and diplomatic letters place prepositions before relative pronouns (whom/which), whereas conversational speech routinely strands prepositions at clause ends.',
    vietnamese: 'Văn bản pháp lý, luận văn học thuật và công văn ngoại giao thường đặt giới từ trước đại từ quan hệ (whom/which), trong khi văn nói hàng ngày thường để giới từ ở cuối mệnh đề quan hệ.',
  },
  guide: {
    pattern: 'Formal: Preposition + whom / which + S + V | Informal: S + V + Preposition',
    whenToUse: [
      'Dùng đảo giới từ lên trước (fronting: with whom, for which, in which) trong văn phong trang trọng, học thuật và thư từ chuyên nghiệp.',
      'Dùng giới từ ở cuối mệnh đề (stranding) trong giao tiếp hàng ngày, email thân mật hoặc văn nói tự nhiên.',
      'Khi giới từ đứng ngay phía trước, CHỈ ĐƯỢC DÙNG "whom" (cho người) và "which" (cho vật); tuyệt đối KHÔNG dùng "that" hay "who", và KHÔNG ĐƯỢC lược bỏ đại từ quan hệ.',
    ],
    signalWords: ['to whom', 'in which', 'with whom', 'on which', 'for which'],
    check: [
      'Nếu giới từ đứng ngay trước đại từ chỉ người, đã dùng "whom" (không dùng who/that) chưa?',
      'Nếu giới từ đứng ngay trước đại từ chỉ vật, đã dùng "which" (không dùng that) chưa?',
      'Đại từ quan hệ có bị lược bỏ nhầm khi giới từ đứng đầu không (sau giới từ bắt buộc phải giữ whom/which)?',
    ],
  },
  explanation: 'Trong tiếng Anh, giới từ đi kèm với động từ hoặc tính từ trong mệnh đề quan hệ có thể xuất hiện ở hai vị trí. 1) Phong cách trang trọng (Formal fronting): Giới từ được chuyển lên đứng ngay trước đại từ quan hệ. Quy tắc bất di bất dịch: đại từ chỉ người bắt buộc phải là "whom" (the scholar to whom I wrote), đại từ chỉ vật bắt buộc phải là "which" (the theory on which he relies). Tuyệt đối không dùng "that" hoặc "who" ngay sau giới từ (*to who, *on that), và không được lược bỏ đại từ. 2) Phong cách thân mật (Informal stranding): Giới từ vẫn nằm ở vị trí tự nhiên phía sau động từ (the person I spoke to, the book that I was looking at). Ở vị trí này, có thể dùng who, that, which hoặc lược bỏ hoàn toàn đại từ quan hệ tân ngữ.',
  examples: [
    {
      english: 'The professor to whom the letter was addressed has retired from the faculty.',
      vietnamese: 'Vị giáo sư mà bức thư được gửi tới đã nghỉ hưu khỏi khoa.',
    },
    {
      english: 'This is the laboratory in which the groundbreaking vaccine was developed.',
      vietnamese: 'Đây là phòng thí nghiệm nơi mà loại vắc-xin mang tính đột phá đã được phát triển.',
    },
    {
      english: 'She is the colleague with whom I co-authored the empirical study.',
      vietnamese: 'Cô ấy là người đồng nghiệp mà tôi đã đồng tác giả nghiên cứu thực nghiệm cùng.',
    },
    {
      english: 'The framework on which the economic model relies has recently been revised.',
      vietnamese: 'Khung lý thuyết mà mô hình kinh tế dựa vào vừa được sửa đổi gần đây.',
    },
    {
      english: 'The candidates for whom we voted failed to secure a parliamentary majority.',
      vietnamese: 'Những ứng viên mà chúng tôi bỏ phiếu cho đã không giành được đa số ghế trong quốc hội.',
    },
    {
      english: 'He is a specialist about whose methodology many scholars remain skeptical.',
      vietnamese: 'Ông ấy là một chuyên gia mà phương pháp luận của ông khiến nhiều học giả vẫn còn hoài nghi.',
    },
  ],
  contrasts: [
    {
      form: 'The diplomat with whom she negotiated signed the peace treaty.',
      whyFits: 'Văn phong trang trọng đặt giới từ with trước đại từ whom (chỉ người làm tân ngữ của giới từ).',
      whyNot: '"The diplomat with who she negotiated..." hoặc "with that she negotiated..." là sai ngữ pháp nghiêm trọng trong tiếng Anh chuẩn.',
    },
    {
      form: 'The software which our database is connected to experienced an outage.',
      whyFits: 'Trong văn phong thân mật hoặc trung tính, giới từ "to" có thể để ở cuối mệnh đề (preposition stranding).',
      whyNot: '"The software which to our database is connected..." là sự xáo trộn trật tự từ phi ngữ pháp.',
    },
  ],
  commonMistakes: [
    'Dùng "who" hoặc "that" ngay sau giới từ trong mệnh đề quan hệ (ví dụ: viết "the person to who I spoke" hoặc "the house in that she lived" thay vì "to whom", "in which").',
    'Lược bỏ đại từ quan hệ khi giới từ đứng trước (ví dụ: viết "the topic on we focused" thay vì "the topic on which we focused").',
    'Để giới từ bị lặp lại ở cả hai vị trí (ví dụ: viết "the committee to whom we submitted the report to").',
  ],
  summary: 'Giới từ trong mệnh đề quan hệ: Đứng trước (fronting) mang tính trang trọng và chỉ đi với "whom" hoặc "which" (to whom, in which); đứng cuối (stranding) mang tính giao tiếp thông thường và có thể dùng who, which, that hoặc lược bỏ đại từ.',
  exercises: [
    {
      id: 'grammar-v2-b2-relative-clause-prepositions-22-q1',
      kind: 'choice',
      prompt: 'Select the grammatically correct formal relative clause:',
      options: [
        { text: 'The client with whom we signed the contract requested an amendment.', correct: true, rationale: 'Preposition with correctly precedes whom for human antecedent in formal register.' },
        { text: 'The client with who we signed the contract requested an amendment.', correct: false, rationale: 'Who cannot immediately follow a fronted preposition.' },
        { text: 'The client with that we signed the contract requested an amendment.', correct: false, rationale: 'That cannot follow a fronted preposition.' },
        { text: 'The client with we signed the contract requested an amendment.', correct: false, rationale: 'Relative pronoun cannot be omitted after a fronted preposition.' },
      ],
      acceptedAnswers: [{ text: 'The client with whom we signed the contract requested an amendment.', rationale: 'With whom is the correct formal relative construction.' }],
    },
    {
      id: 'grammar-v2-b2-relative-clause-prepositions-22-q2',
      kind: 'choice',
      prompt: 'Choose the correct form for an inanimate antecedent in a formal context: "The foundation ___ the entire structure rests must be reinforced."',
      options: [
        { text: 'upon which', correct: true, rationale: 'Upon which correctly combines fronted preposition with relative pronoun which for inanimate foundation.' },
        { text: 'upon that', correct: false, rationale: 'That cannot be governed immediately by a fronted preposition.' },
        { text: 'upon whom', correct: false, rationale: 'Whom is reserved for human antecedents.' },
        { text: 'which upon', correct: false, rationale: 'Preposition must precede the relative pronoun when fronted.' },
      ],
      acceptedAnswers: [{ text: 'upon which', rationale: 'Upon which is the correct formal prepositional relative construction.' }],
    },
    {
      id: 'grammar-v2-b2-relative-clause-prepositions-22-q3',
      kind: 'choice',
      prompt: 'Identify the sentence containing an error of preposition duplication:',
      options: [
        { text: 'The director to whom we sent the initial draft to never responded.', correct: true, rationale: 'Preposition to is erroneously duplicated both before whom and at the end of the clause.' },
        { text: 'The director to whom we sent the initial draft never responded.', correct: false, rationale: 'Correct formal fronting with single preposition.' },
        { text: 'The director whom we sent the initial draft to never responded.', correct: false, rationale: 'Correct preposition stranding with single preposition.' },
        { text: 'The director we sent the initial draft to never responded.', correct: false, rationale: 'Correct informal zero-relative pronoun with stranded preposition.' },
      ],
      acceptedAnswers: [{ text: 'The director to whom we sent the initial draft to never responded.', rationale: 'To is incorrectly duplicated.' }],
    },
    {
      id: 'grammar-v2-b2-relative-clause-prepositions-22-q4',
      kind: 'choice',
      prompt: 'Select the appropriate relative pronoun to complete: "The conditions under ___ workers operated were deemed unsafe."',
      options: [
        { text: 'which', correct: true, rationale: 'Which is the required relative pronoun for inanimate entities following fronted prepositions.' },
        { text: 'what', correct: false, rationale: 'What cannot function as a relative pronoun with an explicit antecedent.' },
        { text: 'whom', correct: false, rationale: 'Whom refers exclusively to people.' },
        { text: 'that', correct: false, rationale: 'That cannot occur immediately after a fronted preposition.' },
      ],
      acceptedAnswers: [{ text: 'which', rationale: 'Which correctly completes under which.' }],
    },
    {
      id: 'grammar-v2-b2-relative-clause-prepositions-22-q5',
      kind: 'gap',
      prompt: 'Fill in the correct relative pronoun following the preposition: "The supervisor to _____ the complaint was lodged promised a full investigation."',
      options: [],
      acceptedAnswers: [{ text: 'whom', rationale: 'Whom is required when referring to a human antecedent directly following a preposition.' }],
    },
    {
      id: 'grammar-v2-b2-relative-clause-prepositions-22-q6',
      kind: 'gap',
      prompt: 'Complete the formal prepositional relative phrase: "The premises in _____ the chemicals were stored had no ventilation."',
      options: [],
      acceptedAnswers: [{ text: 'which', rationale: 'Which is required after preposition in when referring to inanimate premises.' }],
    },
    {
      id: 'grammar-v2-b2-relative-clause-prepositions-22-q7',
      kind: 'gap',
      prompt: 'Fill in the preposition to complete the dependent phrase: "The international standards with _____ our facility complies are very strict."',
      options: [],
      acceptedAnswers: [{ text: 'which', rationale: 'Which follows the fronted preposition with.' }],
    },
    {
      id: 'grammar-v2-b2-relative-clause-prepositions-22-q8',
      kind: 'gap',
      prompt: 'Complete the sentence with the appropriate preposition: "The scholarship for _____ two hundred students applied was awarded yesterday."',
      options: [],
      acceptedAnswers: [{ text: 'which', rationale: 'Which follows the fronted preposition for.' }],
    },
    {
      id: 'grammar-v2-b2-relative-clause-prepositions-22-q9',
      kind: 'transform',
      prompt: 'Transform into a formal relative clause by fronting the preposition: "The investor that she pitched her business idea to approved the funding."',
      options: [],
      acceptedAnswers: [
        { text: 'The investor to whom she pitched her business idea approved the funding.', rationale: 'Fronts preposition to and changes that to whom.' },
      ],
    },
    {
      id: 'grammar-v2-b2-relative-clause-prepositions-22-q10',
      kind: 'transform',
      prompt: 'Transform into formal style by fronting the preposition: "The treaty which the delegates agreed on will take effect next month."',
      options: [],
      acceptedAnswers: [
        { text: 'The treaty on which the delegates agreed will take effect next month.', rationale: 'Fronts preposition on before which.' },
      ],
    },
    {
      id: 'grammar-v2-b2-relative-clause-prepositions-22-q11',
      kind: 'correction',
      prompt: 'Correct the grammatical error in the formal relative clause: "The representative with who we met clarified the terms of engagement."',
      options: [],
      acceptedAnswers: [
        { text: 'The representative with whom we met clarified the terms of engagement.', rationale: 'Replaces who with whom following fronted preposition with.' },
      ],
    },
    {
      id: 'grammar-v2-b2-relative-clause-prepositions-22-q12',
      kind: 'correction',
      prompt: 'Correct the error in the prepositional clause: "The conference at that the keynote speaker presented was well attended."',
      options: [],
      acceptedAnswers: [
        { text: 'The conference at which the keynote speaker presented was well attended.', rationale: 'Replaces at that with at which.' },
      ],
    },
  ],
  reviewExercises: [
    {
      id: 'grammar-v2-b2-relative-clause-prepositions-22-r1',
      kind: 'choice',
      prompt: 'Select the sentence that correctly adheres to formal academic standards for preposition placement:',
      options: [
        { text: 'The hypotheses on which the thesis is constructed have been empirically verified.', correct: true, rationale: 'Formal preposition fronting on which maintains academic precision.' },
        { text: 'The hypotheses on that the thesis is constructed have been empirically verified.', correct: false, rationale: 'That cannot be governed by a preposition.' },
        { text: 'The hypotheses on whom the thesis is constructed have been empirically verified.', correct: false, rationale: 'Whom cannot refer to abstract inanimate hypotheses.' },
      ],
      acceptedAnswers: [{ text: 'The hypotheses on which the thesis is constructed have been empirically verified.', rationale: 'On which correctly establishes formal prepositional connection.' }],
    },
    {
      id: 'grammar-v2-b2-relative-clause-prepositions-22-r2',
      kind: 'gap',
      prompt: 'Fill in the relative pronoun: "The committee chairman, by _____ the resolution was drafted, gave a press conference."',
      options: [],
      acceptedAnswers: [{ text: 'whom', rationale: 'Whom is used for human antecedent chairman after preposition by.' }],
    },
    {
      id: 'grammar-v2-b2-relative-clause-prepositions-22-r3',
      kind: 'transform',
      prompt: 'Transform into a formal sentence by fronting the preposition: "The goals that the organization is committed to require substantial resources."',
      options: [],
      acceptedAnswers: [
        { text: 'The goals to which the organization is committed require substantial resources.', rationale: 'Fronts preposition to with which.' },
      ],
    },
    {
      id: 'grammar-v2-b2-relative-clause-prepositions-22-r4',
      kind: 'correction',
      prompt: 'Correct the relative clause error: "The witness about who the prosecutor spoke refused to testify."',
      options: [],
      acceptedAnswers: [
        { text: 'The witness about whom the prosecutor spoke refused to testify.', rationale: 'Substitutes whom for who after fronted preposition about.' },
      ],
    },
  ],
  outputPrompts: [
    {
      id: 'grammar-v2-b2-relative-clause-prepositions-22-o1',
      prompt: 'Viết 1-2 câu trong một báo cáo học thuật hoặc thư từ công việc trang trọng, sử dụng cấu trúc "to whom" hoặc "with whom" để nói về đối tượng hợp tác hoặc người hướng dẫn.',
      modelAnswer: 'The principal investigator with whom we collaborated provided critical insights into cellular biology. The ethical committee to whom the study was submitted granted unconditional approval.',
      checks: [
        'Sử dụng cụm giới từ đứng trước đại từ quan hệ (with whom / to whom).',
        'Không dùng who hoặc that ngay sau giới từ.',
        'Văn phong trang trọng, học thuật hoặc công việc.',
      ],
    },
    {
      id: 'grammar-v2-b2-relative-clause-prepositions-22-o2',
      prompt: 'Viết 1-2 câu miêu tả một chính sách pháp lý hoặc công cụ kỹ thuật bằng cấu trúc "in which" hoặc "on which".',
      modelAnswer: 'The statutory framework within which our enterprise operates undergoes annual regulatory review. The digital platform on which customer records are processed utilizes end-to-end encryption.',
      checks: [
        'Sử dụng giới từ kết hợp với "which" (in which, on which, within which) cho danh từ chỉ vật hoặc khái niệm.',
        'Cấu trúc câu hoàn chỉnh và trật tự từ chính xác.',
        'Diễn đạt rõ ràng, ngữ pháp chuẩn xác.',
      ],
    },
  ],
  sources: [
    {
      id: 'oxford-relative-prepositions',
      title: 'Oxford Learner’s Grammar: Prepositions in relative clauses',
      url: 'https://www.oxfordlearnersdictionaries.com/grammar/online-grammar/relative-clauses',
      claims: [
        'In formal English, prepositions are placed before relative pronouns whom (for persons) and which (for things).',
        'That and who cannot follow a preposition directly in relative clauses.',
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
