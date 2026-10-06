/**
 * @file noun-phrase-post-modification.ts
 * @description C1 lesson on complex noun phrase post-modification including prepositional phrase chains, non-finite clauses, and appositives.
 */
import type { GrammarLesson } from '../../types.js';

const nounPhrasePostModificationLesson: GrammarLesson = {
  id: 'grammar-v2-c1-noun-phrase-post-modification-18',
  revisionId: 'grammar-v2-c1-noun-phrase-post-modification-18@1.0.0',
  revision: '1.0.0',
  title: 'Bổ ngữ sau của cụm danh từ (Noun Phrase Post-modification)',
  objective: 'Làm chủ các cấu trúc bổ ngữ sau phức hợp (chuỗi cụm giới từ, mệnh đề phân từ rút gọn, đồng vị ngữ và mệnh đề bổ nghĩa danh từ) để tạo lập các cụm danh từ học thuật tầng bậc, chính xác và tránh mơ hồ cú pháp.',
  prerequisiteIds: ['grammar-v2-c1-noun-phrase-pre-modification-17'],
  coverage: ['noun-phrase-post-modification', 'complex-noun-phrases', 'participial-reduced-clauses', 'appositives', 'prepositional-chains', 'c1-academic-writing'],
  context: {
    english: 'Advanced academic prose relies heavily on post-modification to specify abstract entities. Instead of stacking disconnected sentences, writers expand the noun phrase: "The unprecedented surge in energy consumption observed across urban centers during peak heat waves posed systemic grid challenges."',
    vietnamese: 'Văn phong học thuật cao cấp phụ thuộc lớn vào bổ ngữ sau để định rõ các thực thể trừu tượng. Thay vì chắp vá nhiều câu rời rạc, người viết mở rộng cụm danh từ: "The unprecedented surge in energy consumption observed across urban centers during peak heat waves posed systemic grid challenges".',
  },
  guide: {
    pattern: 'Head Noun + Prepositional Phrase(s) + Non-finite Clause (-ing / -ed / to-inf) + Appositive / Relative Clause',
    whenToUse: [
      'Định lượng và hạn định chính xác phạm vi của khái niệm hoặc số liệu khoa học (ví dụ: the concentration of particulates recorded at monitoring stations).',
      'Rút gọn mệnh đề quan hệ thành cụm phân từ hiện tại (-ing) hoặc phân từ quá khứ (-ed) để câu văn trôi chảy và cô đọng hơn.',
      'Sử dụng mệnh đề đồng vị (appositive that-clause) để làm rõ nội dung của các danh từ trừu tượng như hypothesis, assumption, proposal, finding.',
    ],
    signalWords: ['resulting from', 'associated with', 'underlying', 'aimed at', 'in accordance with', 'the premise that', 'the assumption that'],
    check: [
      'Mệnh đề phân từ rút gọn chủ động có dùng -ing và bị động có dùng -ed (V3) chuẩn xác không?',
      'Chuỗi cụm giới từ liên tiếp có gây ra hiện tượng nhập nhằng bổ nghĩa (attachment ambiguity) không?',
      'Mệnh đề đồng vị sau assumption/fact/claim có dùng "that" (mệnh đề hoàn chỉnh) chứ không nhầm với đại từ quan hệ "which" không?',
    ],
  },
  explanation: 'Bổ ngữ sau (Post-modification) cho phép cụm danh từ mang khối lượng thông tin chi tiết và phức tạp nhất trong câu. Các dạng thức bổ ngữ sau chính bao gồm: 1) Chuỗi cụm giới từ (Prepositional phrase embedding): xếp chồng các cụm giới từ định vị phạm vi (ví dụ: "a decline [in revenue] [from digital subscriptions] [over the fiscal year]"); 2) Mệnh đề phân từ rút gọn (Non-finite participial clauses): phân từ hiện tại -ing biểu thị quan hệ chủ động ("factors contributing to inflation") hoặc phân từ quá khứ -ed biểu thị quan hệ bị động ("methodologies adopted in this study"); 3) Cụm động từ nguyên mẫu có to (To-infinitive clauses): chỉ mục đích hoặc khả năng ("the decision to recalibrate the sensor"); 4) Mệnh đề đồng vị danh từ (Appositive clauses): bắt đầu bằng "that" đi sau các danh từ trừu tượng (belief, hypothesis, principle) để giải thích nội dung trọn vẹn của danh từ đó, khác biệt căn bản với mệnh đề quan hệ (relative clause) vốn chỉ đóng vai trò thành phần phụ khuyết.',
  examples: [
    {
      english: 'The rapid depletion of freshwater aquifers underlying agricultural basins threatens food security.',
      vietnamese: 'Sự cạn kiệt nhanh chóng của các tầng ngậm nước ngọt nằm bên dưới các lưu vực nông nghiệp đe dọa an ninh lương thực.',
    },
    {
      english: 'Protocols governing the disposal of toxic industrial effluent must undergo statutory review.',
      vietnamese: 'Các quy định chi phối việc xử lý chất thải công nghiệp độc hại phải trải qua quy trình xem xét theo luật định.',
    },
    {
      english: 'The hypothesis that sustained cognitive exertion alters glucose metabolism was tested empirically.',
      vietnamese: 'Giả thuyết rằng sự gắng sức nhận thức kéo dài làm thay đổi quá trình chuyển hóa glucose đã được kiểm chứng bằng thực nghiệm.',
    },
    {
      english: 'Feedback received from trial participants during the pilot phase indicated substantial usability barriers.',
      vietnamese: 'Phản hồi nhận được từ những người tham gia thử nghiệm trong giai đoạn thí điểm cho thấy những rào cản sử dụng đáng kể.',
    },
    {
      english: 'Efforts to decouple economic growth from greenhouse gas emissions require systemic capital realignment.',
      vietnamese: 'Những nỗ lực nhằm tách rời tăng trưởng kinh tế khỏi phát thải khí nhà kính đòi hỏi sự tái phân bổ vốn mang tính hệ thống.',
    },
    {
      english: 'An anomaly identified in the satellite telemetry data prompted an unscheduled trajectory adjustment.',
      vietnamese: 'Một điểm bất thường được nhận diện trong dữ liệu đo từ xa của vệ tinh đã thúc đẩy một đợt điều chỉnh quỹ đạo ngoài kế hoạch.',
    },
  ],
  contrasts: [
    {
      form: 'the assumption that markets self-correct vs the assumption which markets self-correct',
      whyFits: 'Assumption đòi hỏi mệnh đề đồng vị (appositive that-clause) với liên từ "that" liên kết một mệnh đề trọn vẹn (markets self-correct có đủ S + V).',
      whyNot: 'Dùng "which" là sai vì "which" là đại từ quan hệ yêu cầu thay thế cho một vị trí khuyết (chủ ngữ hoặc tân ngữ) trong mệnh đề con.',
    },
    {
      form: 'samples collected from the river beds vs samples collecting from the river beds',
      whyFits: 'Samples (mẫu vật) chịu tác động thu thập nên phải dùng phân từ quá khứ bị động "collected".',
      whyNot: 'Dùng "collecting" mang nghĩa chủ động, biến mẫu vật thành tác nhân tự đi thu thập, sai lệch logic.',
    },
  ],
  commonMistakes: [
    'Dùng nhầm đại từ quan hệ "which" thay cho liên từ đồng vị "that" sau các danh từ trừu tượng như fact, evidence, belief, hypothesis.',
    'Nhầm lẫn giữa phân từ chủ động (-ing) và phân từ bị động (-ed) khi rút gọn mệnh đề bổ nghĩa cho danh từ chỉ vật.',
    'Xếp chồng chuỗi cụm giới từ quá dài gây mơ hồ điểm tựa bổ nghĩa (misplaced prepositional attachment), ví dụ: "the discussion of the problem with the director" khiến người đọc không rõ problem with director hay discussion with director.',
  ],
  summary: 'Bổ ngữ sau định rõ nghĩa cho danh từ chính thông qua chuỗi cụm giới từ, phân từ rút gọn (-ing cho chủ động, -ed cho bị động), cụm nguyên mẫu to-infinitive và mệnh đề đồng vị that-clause.',
  exercises: [
    {
      id: 'grammar-v2-c1-noun-phrase-post-modification-18-q1',
      kind: 'choice',
      prompt: 'Select the sentence with the grammatically correct appositive clause defining the abstract noun.',
      options: [
        { text: 'The prevailing consensus that fiscal austerity dampens consumer spending remains unchallenged.', correct: true, rationale: 'Appositive that-clause correctly complements consensus with a complete grammatical clause.' },
        { text: 'The prevailing consensus which fiscal austerity dampens consumer spending remains unchallenged.', correct: false, rationale: 'Which is a relative pronoun requiring a gap, but the clause is already structurally complete.' },
        { text: 'The prevailing consensus what fiscal austerity dampens consumer spending remains unchallenged.', correct: false, rationale: 'What cannot head an appositive clause.' },
        { text: 'The prevailing consensus of fiscal austerity dampens consumer spending remains unchallenged.', correct: false, rationale: 'Preposition of cannot introduce a finite declarative clause.' },
      ],
      acceptedAnswers: [{ text: 'The prevailing consensus that fiscal austerity dampens consumer spending remains unchallenged.', rationale: 'Appositive that-clause structure.' }],
    },
    {
      id: 'grammar-v2-c1-noun-phrase-post-modification-18-q2',
      kind: 'choice',
      prompt: 'Identify the sentence where the reduced participial post-modifier is correctly formed with passive sense.',
      options: [
        { text: 'The statutory guidelines ratified by the supervisory board will take effect in January.', correct: true, rationale: 'Past participle ratified correctly post-modifies guidelines in a reduced passive relative clause.' },
        { text: 'The statutory guidelines ratifying by the supervisory board will take effect in January.', correct: false, rationale: 'Present participle ratifying incorrectly conveys active voice.' },
        { text: 'The statutory guidelines having ratified by the supervisory board will take effect in January.', correct: false, rationale: 'Having ratified is active compound participle; requires having been ratified.' },
        { text: 'The statutory guidelines were ratified by the supervisory board will take effect in January.', correct: false, rationale: 'Creates a double finite verb error without a relative connector.' },
      ],
      acceptedAnswers: [{ text: 'The statutory guidelines ratified by the supervisory board will take effect in January.', rationale: 'Reduced passive past participle clause.' }],
    },
    {
      id: 'grammar-v2-c1-noun-phrase-post-modification-18-q3',
      kind: 'choice',
      prompt: 'Choose the post-modifier that correctly expresses an active, ongoing causal relationship.',
      options: [
        { text: 'Substances inhibiting neurotransmitter uptake were excluded from the clinical trial.', correct: true, rationale: 'Present participle inhibiting correctly post-modifies substances with active functional meaning.' },
        { text: 'Substances inhibited neurotransmitter uptake were excluded from the clinical trial.', correct: false, rationale: 'Past participle inhibited creates passive or finite verb confusion with transitive uptake.' },
        { text: 'Substances which inhibiting neurotransmitter uptake were excluded from the clinical trial.', correct: false, rationale: 'Relative pronoun which cannot directly precede bare present participle.' },
        { text: 'Substances to inhibit of neurotransmitter uptake were excluded from the clinical trial.', correct: false, rationale: 'Ungrammatical prepositional insertion after transitive infinitive.' },
      ],
      acceptedAnswers: [{ text: 'Substances inhibiting neurotransmitter uptake were excluded from the clinical trial.', rationale: 'Active present participle post-modifier.' }],
    },
    {
      id: 'grammar-v2-c1-noun-phrase-post-modification-18-q4',
      kind: 'choice',
      prompt: 'Select the sentence that avoids ambiguous prepositional phrase attachment.',
      options: [
        { text: 'The committee reviewed the director’s presentation regarding the environmental audit.', correct: true, rationale: 'Clearly associates the environmental audit with the presentation rather than dangling ambiguously.' },
        { text: 'The committee reviewed the presentation of the audit with high anxiety.', correct: false, rationale: 'Unclear whether the audit was conducted with anxiety or the committee reviewed with anxiety.' },
        { text: 'The researcher examined the bacteria in the culture dish that had mutated overnight.', correct: false, rationale: 'Ambiguous whether the dish mutated or the bacteria mutated.' },
        { text: 'We discussed the implications for policy with the foreign delegates during lunch.', correct: false, rationale: 'Unclear whether policy relates to foreign delegates or discussion took place with them.' },
      ],
      acceptedAnswers: [{ text: 'The committee reviewed the director’s presentation regarding the environmental audit.', rationale: 'Unambiguous post-modification syntax.' }],
    },
    {
      id: 'grammar-v2-c1-noun-phrase-post-modification-18-q5',
      kind: 'gap',
      prompt: 'Complete the appositive clause with the appropriate conjunction: "The hypothesis _____ tectonic shifts trigger subterranean hydrothermal bursts was verified."',
      options: [],
      acceptedAnswers: [
        { text: 'that', rationale: 'Appositive clauses after abstract nouns take conjunction that.' },
      ],
    },
    {
      id: 'grammar-v2-c1-noun-phrase-post-modification-18-q6',
      kind: 'gap',
      prompt: 'Supply the active present participle form of "surround": "The perimeter fence _____ the radioactive depository was reinforced yesterday."',
      options: [],
      acceptedAnswers: [
        { text: 'surrounding', rationale: 'Active reduced relative clause uses present participle surrounding.' },
      ],
    },
    {
      id: 'grammar-v2-c1-noun-phrase-post-modification-18-q7',
      kind: 'gap',
      prompt: 'Supply the passive past participle form of "derive": "Compounds _____ from synthetic polymers exhibited elevated toxicity."',
      options: [],
      acceptedAnswers: [
        { text: 'derived', rationale: 'Passive reduced relative clause uses past participle derived.' },
      ],
    },
    {
      id: 'grammar-v2-c1-noun-phrase-post-modification-18-q8',
      kind: 'gap',
      prompt: 'Complete the to-infinitive post-modifier indicating purpose/mandate: "The sovereign fund announced a mandate _____ divest from legacy fossil-fuel assets." (to + verb)',
      options: [],
      acceptedAnswers: [
        { text: 'to divest', rationale: 'To-infinitive clause post-modifies noun mandate.' },
      ],
    },
    {
      id: 'grammar-v2-c1-noun-phrase-post-modification-18-q9',
      kind: 'transform',
      prompt: 'Reduce the full relative clause into a participial post-modifier: "Investigators inspected all documents that were recovered from the compromised server."',
      options: [],
      acceptedAnswers: [
        { text: 'Investigators inspected all documents recovered from the compromised server.', rationale: 'Reduces passive relative clause to past participle recovered.' },
      ],
    },
    {
      id: 'grammar-v2-c1-noun-phrase-post-modification-18-q10',
      kind: 'transform',
      prompt: 'Combine into a single sentence using an appositive clause with "the finding": "The researchers reported a crucial finding. Sleep deprivation impairs emotional regulation."',
      options: [],
      acceptedAnswers: [
        { text: 'The researchers reported the crucial finding that sleep deprivation impairs emotional regulation.', rationale: 'Integrates finding with appositive that-clause.' },
        { text: 'The researchers reported the finding that sleep deprivation impairs emotional regulation.', rationale: 'Accepts variant without adjective crucial.' },
      ],
    },
    {
      id: 'grammar-v2-c1-noun-phrase-post-modification-18-q11',
      kind: 'correction',
      prompt: 'Correct the pronoun error in this abstract noun complement: "The belief which economic austerity accelerates recovery has been debunked."',
      options: [],
      acceptedAnswers: [
        { text: 'The belief that economic austerity accelerates recovery has been debunked.', rationale: 'Replaces relative which with appositive conjunction that.' },
      ],
    },
    {
      id: 'grammar-v2-c1-noun-phrase-post-modification-18-q12',
      kind: 'correction',
      prompt: 'Correct the voice error in this reduced participle post-modifier: "Patients prescribing this medication reported immediate symptom relief."',
      options: [],
      acceptedAnswers: [
        { text: 'Patients prescribed this medication reported immediate symptom relief.', rationale: 'Replaces active prescribing with passive past participle prescribed.' },
      ],
    },
  ],
  reviewExercises: [
    {
      id: 'grammar-v2-c1-noun-phrase-post-modification-18-r1',
      kind: 'choice',
      prompt: 'Select the sentence containing a correctly structured post-modified noun phrase.',
      options: [
        { text: 'A resolution urging member states to curtail carbon output was adopted unanimously.', correct: true, rationale: 'Present participle urging member states correctly post-modifies resolution.' },
        { text: 'A resolution urged member states to curtail carbon output was adopted unanimously.', correct: false, rationale: 'Creates finite verb clash between urged and was adopted.' },
        { text: 'A resolution which urging member states to curtail carbon output was adopted unanimously.', correct: false, rationale: 'Incorrect relative which preceding non-finite participle.' },
      ],
      acceptedAnswers: [{ text: 'A resolution urging member states to curtail carbon output was adopted unanimously.', rationale: 'Correct non-finite post-modification.' }],
    },
    {
      id: 'grammar-v2-c1-noun-phrase-post-modification-18-r2',
      kind: 'gap',
      prompt: 'Complete the appositive phrase: "The legal doctrine _____ treaties must be upheld in good faith forms the cornerstone of international jurisprudence."',
      options: [],
      acceptedAnswers: [
        { text: 'that', rationale: 'Conjunction that introduces appositive clause.' },
      ],
    },
    {
      id: 'grammar-v2-c1-noun-phrase-post-modification-18-r3',
      kind: 'transform',
      prompt: 'Reduce the relative clause to an active participial phrase: "Vehicles that transport hazardous industrial materials must display warning placards."',
      options: [],
      acceptedAnswers: [
        { text: 'Vehicles transporting hazardous industrial materials must display warning placards.', rationale: 'Reduces that transport to present participle transporting.' },
      ],
    },
    {
      id: 'grammar-v2-c1-noun-phrase-post-modification-18-r4',
      kind: 'correction',
      prompt: 'Correct the error in this academic claim: "There is mounting evidence which sedentary lifestyle correlates with cardiac pathology."',
      options: [],
      acceptedAnswers: [
        { text: 'There is mounting evidence that sedentary lifestyle correlates with cardiac pathology.', rationale: 'Replaces relative which with appositive that following abstract noun evidence.' },
        { text: 'There is mounting evidence that a sedentary lifestyle correlates with cardiac pathology.', rationale: 'Accepts variant with indefinite article.' },
      ],
    },
  ],
  outputPrompts: [
    {
      id: 'grammar-v2-c1-noun-phrase-post-modification-18-o1',
      prompt: 'Viết 2 câu trong bài báo khoa học miêu tả kết quả thí nghiệm hoặc chính sách y tế, sử dụng một cụm phân từ rút gọn (-ing hoặc -ed) bổ nghĩa sau cho danh từ chính và một mệnh đề đồng vị với "that" (ví dụ: the discovery that... hoặc the assumption that...).',
      modelAnswer: 'The policy framework adopted by regional health authorities mandates immediate containment protocols upon pathogen detection. Furthermore, preliminary trials support the assumption that targeted immunization significantly lowers hospital admission rates.',
      checks: [
        'Sử dụng mệnh đề phân từ rút gọn (-ed hoặc -ing) làm bổ ngữ sau cho danh từ.',
        'Sử dụng mệnh đề đồng vị bắt đầu bằng liên từ "that" sau một danh từ trừu tượng (the assumption that...).',
        'Văn phong học thuật chuẩn mực, không mắc lỗi nối câu hoặc mơ hồ cú pháp.',
      ],
    },
    {
      id: 'grammar-v2-c1-noun-phrase-post-modification-18-o2',
      prompt: 'Viết 1-2 câu trong báo cáo tài chính hoặc phân tích kinh tế sử dụng chuỗi cụm giới từ nhiều tầng (ít nhất 2 giới từ liên tiếp, ví dụ: in... across... during...) làm bổ ngữ sau cho một danh từ chỉ số liệu mà không gây mơ hồ ngữ nghĩa.',
      modelAnswer: 'The unprecedented fluctuation in commodity prices across developing markets during the third quarter prompted central banks to review reserve ratios.',
      checks: [
        'Sử dụng chuỗi cụm giới từ nhiều tầng bổ nghĩa sau cho danh từ chính (fluctuation in... across... during...).',
        'Cú pháp rõ ràng, tránh attachment ambiguity.',
        'Độ chính xác ngữ pháp và từ vựng đạt chuẩn C1.',
      ],
    },
  ],
  sources: [
    {
      id: 'cambridge-noun-phrases-postmodifiers',
      title: 'English Grammar Today: Noun phrases: dependent words',
      url: 'https://dictionary.cambridge.org/grammar/british-grammar/noun-phrases-dependent-words',
      claims: [
        'In a noun phrase, postmodifiers follow the head noun and include prepositional phrases, non-finite clauses, and relative clauses.',
        'Appositive that-clauses complement abstract nouns like hypothesis, belief, and finding with complete declarative clauses.',
        'Participial non-finite clauses express active (-ing) or passive (-ed) relationships in reduced structures.',
      ],
      checkedAt: '2026-10-05',
      provenance: 'reference-only',
    },
  ],
  review: {
    status: 'approved',
    mode: 'ai-internal',
    reviewer: 'ai-internal-reviewer',
    reviewedAt: '2026-10-06T00:00:00.000Z',
    summary: 'Comprehensive review completed. Complex noun phrase post-modification, prepositional embedding chains, reduced participle clauses, appositive that-clauses, exercise items, and verified Cambridge Grammar source confirmed.',
    checks: {
      originalProse: true,
      factualExplanation: true,
      clearContrasts: true,
      singleCorrectChoice: true,
      validTransferExercises: true,
      soundOutputPrompts: true,
      referenceOnlySources: true,
    },
  },
};

export default nounPhrasePostModificationLesson;
