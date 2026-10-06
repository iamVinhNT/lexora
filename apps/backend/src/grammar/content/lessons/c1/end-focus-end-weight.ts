/**
 * @file end-focus-end-weight.ts
 * @description C1 lesson on the principles of end-focus and end-weight in sentence architecture.
 */
import type { GrammarLesson } from '../../types.js';

const endFocusEndWeightLesson: GrammarLesson = {
  id: 'grammar-v2-c1-end-focus-end-weight-08',
  revisionId: 'grammar-v2-c1-end-focus-end-weight-08@1.0.0',
  revision: '1.0.0',
  title: 'Nguyên lý Trọng tâm cuối và Sức nặng cuối (End-Focus and End-Weight)',
  objective: 'Làm chủ hai nguyên lý cốt lõi của cú pháp tiếng Anh học thuật: End-Focus (đặt thông tin mới, giàu giá trị thông báo nhất ở cuối câu) và End-Weight (chuyển các thành phần dài, phức tạp về cuối câu) thông qua ngoại vị hóa (extraposition), dịch chuyển tân ngữ nặng (heavy NP shift) và lựa chọn câu bị động chiến lược.',
  prerequisiteIds: ['grammar-v2-c1-fronting-focus-07'],
  coverage: ['end-focus-end-weight', 'end-focus', 'end-weight', 'information-structure', 'clause-architecture'],
  context: {
    english: 'In sophisticated academic and legal composition, uncontrolled front-heavy sentences disorient readers. Applying end-weight and end-focus creates natural cognitive rhythm by anchoring known concepts early and reserving the final clause position for complex, climactic propositions.',
    vietnamese: 'Trong văn phong học thuật và pháp lý tinh tế, những câu có phần đầu quá cồng kềnh (front-heavy) khiến người đọc mất định hướng. Vận dụng end-weight và end-focus tạo nên nhịp điệu tiếp nhận tự nhiên bằng cách neo các khái niệm đã biết ở đầu câu và dành vị trí cuối cùng cho những luận điểm phức tạp, giàu sức nặng nhất.',
  },
  guide: {
    pattern: 'Short / Known Entity (Subject) + Verb + Long / Complex / New Information (Focus) | Extraposition: It + Copula / Verb + Complement + that-clause / to-infinitive | Heavy NP Shift: Verb + Prepositional Phrase + [Long Complex Direct Object]',
    whenToUse: [
      'Ngoại vị hóa (Extraposition) mệnh đề danh ngữ làm chủ ngữ: thay vì "That the project exceeded its budget surprised no one", viết "It surprised no one that the project exceeded its budget".',
      'Dịch chuyển tân ngữ nặng (Heavy NP Shift): chuyển tân ngữ chứa nhiều mệnh đề quan hệ ra sau cụm giới từ để tránh ngắt quãng câu: "The archive makes available to scholars [rare digital manuscripts previously inaccessible to the public]".',
      'Sử dụng thể bị động để đưa chủ thể ngắn/đã biết lên trước và đẩy tác nhân dài/phức tạp ra sau "by" ở cuối câu.',
    ],
    signalWords: ['it is widely recognized that', 'it remains disputed whether', 'brings to the fore', 'makes available to', 'it became evident that'],
    check: [
      'Tân ngữ được dịch chuyển ra sau (Heavy NP Shift) có thực sự là một cụm từ dài/nặng không? Tuyệt đối không dịch chuyển đại từ ngắn (viết "He explained it to us", không viết "He explained to us it")!',
      'Khi ngoại vị hóa mệnh đề danh từ với "It", đại từ giả "It" có đứng làm chủ ngữ ngữ pháp và mệnh đề thật (that/whether/to-V) có nằm trọn vẹn ở cuối câu không?',
      'Dòng thông tin của đoạn văn có tuân theo tiến trình: Thông tin đã biết (Given) -> Thông tin mới (New/Focus) không?',
    ],
  },
  explanation: 'Trong kiến trúc câu tiếng Anh cao cấp, hai nguyên lý chi phối cách phân bổ từ ngữ là: 1) End-Focus: Người đọc tự nhiên kỳ vọng thông tin mới (new), quan trọng và mang tính điểm nhấn sẽ xuất hiện ở vị trí cuối câu. 2) End-Weight: Não bộ tiếp nhận thông tin dễ dàng hơn nếu các thành phần ngắn, đơn giản xuất hiện trước, còn các cụm từ hoặc mệnh đề dài, đa tầng cấu trúc (heavy constituents) được dồn về sau. Để hiện thực hóa hai nguyên lý này mà không làm biến dạng ý nghĩa, người viết C1 sử dụng ba công cụ chính: - Extraposition: Dùng "It" làm chủ ngữ hình thức để đẩy mệnh đề danh ngữ dài ra đuôi câu ("It is regrettable that the ceasefire collapsed"). - Heavy NP Shift: Đổi trật tự V + O + Prep thành V + Prep + O khi O là một cụm danh từ rất dài có bổ ngữ ("She attributed to systemic oversight [the sudden collapse of the regional lending syndicate]"). - Passive Transformation: Đưa danh từ quen thuộc/ngắn lên làm chủ ngữ và đưa nhóm từ mới, nặng về đuôi câu kèm "by".',
  examples: [
    {
      english: 'It is widely acknowledged among developmental economists that institutional quality dictates long-term prosperity.',
      vietnamese: 'Giới kinh tế học phát triển thừa nhận rộng rãi rằng chất lượng thể chế quyết định sự thịnh vượng dài hạn.',
    },
    {
      english: 'The museum curator presented to the advisory board a comprehensive catalog of previously unexhibited Renaissance sketches.',
      vietnamese: 'Người giám tuyển bảo tàng đã trình lên ban cố vấn một danh mục toàn diện gồm các bản phác thảo thời Phục hưng chưa từng được trưng bày.',
    },
    {
      english: 'The groundbreaking environmental initiative was vigorously contested by a well-funded coalition of multinational energy conglomerates.',
      vietnamese: 'Sáng kiến môi trường mang tính đột phá ấy đã bị phản đối quyết liệt bởi một liên minh các tập đoàn năng lượng đa quốc gia hùng mạnh về tài chính.',
    },
    {
      english: 'It remains uncertain whether the newly inaugurated carbon border tax will withstand rigorous scrutiny at the World Trade Organization.',
      vietnamese: 'Vẫn còn chưa chắc chắn liệu thuế carbon biên giới mới ban hành có vượt qua được sự xem xét kỹ lưỡng tại Tổ chức Thương mại Thế giới hay không.',
    },
    {
      english: 'The investigation attributed to procedural negligence the catastrophic failure of the cooling redundant pumps.',
      vietnamese: 'Cuộc điều tra đã quy trách nhiệm về sự cố thảm khốc của các máy bơm làm mát dự phòng cho sự cẩu thả trong quy trình.',
    },
    {
      english: 'It surprised none of the participating diplomats that the bilateral summit culminated in an open-ended joint declaration.',
      vietnamese: 'Không một nhà ngoại giao tham dự nào ngạc nhiên trước việc hội nghị thượng đỉnh song phương khép lại bằng một tuyên bố chung mở.',
    },
  ],
  contrasts: [
    {
      form: 'The lead researcher explained to the committee all the anomalous telemetry data gathered during the atmospheric reentry phase.',
      whyFits: 'Heavy NP Shift: cụm tân ngữ "all the anomalous telemetry data..." quá dài nên được chuyển ra sau cụm giới từ ngắn "to the committee".',
      whyNot: '"The researcher explained to the committee them..." sai nghiêm trọng vì đại từ ngắn (them, it) không bao giờ được phép dịch chuyển qua cụm giới từ.',
    },
    {
      form: 'It was unexpected that the constitutional court would invalidate the emergency security decree so decisively.',
      whyFits: 'Extraposition: dùng "It was unexpected that..." giúp câu cân đối, tránh chủ ngữ dài dòng ở đầu câu.',
      whyNot: '"That the constitutional court would invalidate the emergency security decree so decisively was unexpected" tuy đúng ngữ pháp nhưng quá cồng kềnh ở phần đầu (front-heavy), làm giảm độ trôi chảy.',
    },
  ],
  commonMistakes: [
    'Áp dụng Heavy NP Shift cho đại từ tân ngữ ngắn (viết "We discussed with them it" thay vì "We discussed it with them").',
    'Để mệnh đề danh ngữ quá dài làm chủ ngữ đứng đầu câu gây mất cân đối và khó theo dõi (như viết một câu 25 từ làm chủ ngữ rồi mới đến động từ "is undeniable").',
    'Bỏ quên đại từ giả "It" khi thực hiện ngoại vị hóa (viết "Is widely acknowledged that..." thay vì "It is widely acknowledged that...").',
  ],
  summary: 'End-Focus đặt thông tin mới, giá trị nhất ở cuối câu; End-Weight đẩy các thành phần dài, phức tạp về đuôi. Kết hợp Extraposition với "It" và Heavy NP Shift giúp cấu trúc câu C1 thanh thoát, khoa học và đạt nhịp điệu hùng biện tối ưu.',
  exercises: [
    {
      id: 'grammar-v2-c1-end-focus-end-weight-08-q1',
      kind: 'choice',
      prompt: 'Select the sentence that best applies Heavy NP Shift for stylistic balance and clarity:',
      options: [
        { text: 'The envoy submitted to the security council a meticulously documented dossier of ceasefire violations.', correct: true, rationale: 'Short prepositional phrase "to the security council" precedes the lengthy, complex direct object.' },
        { text: 'The envoy submitted to the security council it.', correct: false, rationale: 'Pronoun "it" is light and cannot undergo Heavy NP Shift.' },
        { text: 'The envoy submitted a meticulously documented dossier of ceasefire violations to it.', correct: false, rationale: 'While grammatical, it misses the heavy shift balancing effect when referring to a council.' },
        { text: 'To the security council the envoy submitted a meticulously documented dossier violations.', correct: false, rationale: 'Fronting the adjunct creates an unnecessary front-heavy construction.' },
      ],
      acceptedAnswers: [{ text: 'The envoy submitted to the security council a meticulously documented dossier of ceasefire violations.', rationale: 'Correct heavy direct object shift.' }],
    },
    {
      id: 'grammar-v2-c1-end-focus-end-weight-08-q2',
      kind: 'choice',
      prompt: 'Choose the sentence demonstrating effective extraposition to eliminate an awkward front-heavy subject:',
      options: [
        { text: 'It remains an open question whether multilateral trade sanctions genuinely accelerate democratic transition.', correct: true, rationale: 'Extraposed subject clause via dummy "It" achieves ideal end-weight.' },
        { text: 'Whether multilateral trade sanctions genuinely accelerate democratic transition it remains an open question.', correct: false, rationale: 'Redundant pronoun "it" following subject clause creates an ungrammatical double subject.' },
        { text: 'There remains an open question that multilateral trade sanctions accelerate transition.', correct: false, rationale: '"There" does not properly extrapose an interrogative "whether" proposition.' },
        { text: 'Was an open question whether multilateral trade sanctions accelerate transition.', correct: false, rationale: 'Omission of dummy subject creates an ungrammatical verb-initial fragment.' },
      ],
      acceptedAnswers: [{ text: 'It remains an open question whether multilateral trade sanctions genuinely accelerate democratic transition.', rationale: 'Flawless extraposition with dummy It.' }],
    },
    {
      id: 'grammar-v2-c1-end-focus-end-weight-08-q3',
      kind: 'choice',
      prompt: 'Identify the sentence where passive voice is strategically deployed to uphold End-Focus:',
      options: [
        { text: 'The controversial zoning reform was fiercely opposed by a diverse coalition of suburban community activists.', correct: true, rationale: 'Places known topic (the reform) at the front and novel, weighty agent (the coalition) in the focus position at the end.' },
        { text: 'By a diverse coalition of suburban community activists the controversial zoning reform was fiercely opposed.', correct: false, rationale: 'Inverting by-phrase to the front violates natural given-before-new flow.' },
        { text: 'The reform opposed a diverse coalition of suburban community activists fiercely.', correct: false, rationale: 'Active voice reverses thematic roles absurdly.' },
        { text: 'It was opposed the reform by a diverse coalition of activists.', correct: false, rationale: 'Malformed cleft/passive combination.' },
      ],
      acceptedAnswers: [{ text: 'The controversial zoning reform was fiercely opposed by a diverse coalition of suburban community activists.', rationale: 'End-focus achieved via strategic passive construction.' }],
    },
    {
      id: 'grammar-v2-c1-end-focus-end-weight-08-q4',
      kind: 'choice',
      prompt: 'Select the correct sentence demonstrating idiomatic verb-phrase architecture without violating pronoun weight constraints:',
      options: [
        { text: 'The finance director disclosed the confidential restructuring memo to the independent auditors.', correct: true, rationale: 'When both constituents are moderate in length, standard S-V-O-PP order is maintained without forced shift.' },
        { text: 'The finance director disclosed to the independent auditors it.', correct: false, rationale: 'Pronominal direct object "it" must never be placed after the prepositional phrase.' },
        { text: 'The finance director disclosed to them it.', correct: false, rationale: 'Double light pronoun sequence with inverted PP is ungrammatical.' },
        { text: 'Disclosed the finance director to the auditors the restructuring memo.', correct: false, rationale: 'Verb-initial word order is completely ungrammatical in standard declarative clauses.' },
      ],
      acceptedAnswers: [{ text: 'The finance director disclosed the confidential restructuring memo to the independent auditors.', rationale: 'Preserves correct pronoun/noun weight constraints.' }],
    },
    {
      id: 'grammar-v2-c1-end-focus-end-weight-08-q5',
      kind: 'gap',
      prompt: 'Supply the anticipatory pronoun for extraposition: "_____ came as a profound relief to the diplomatic delegation that the border treaty was ratified without amendments."',
      options: [],
      acceptedAnswers: [
        { text: 'It', rationale: 'Dummy pronoun "It" acts as anticipatory subject for the extraposed that-clause.' },
      ],
    },
    {
      id: 'grammar-v2-c1-end-focus-end-weight-08-q6',
      kind: 'gap',
      prompt: 'Complete the heavy shift collocation: "The university provost made available _____ international scholars a priceless repository of medieval legal manuscripts."',
      options: [],
      acceptedAnswers: [
        { text: 'to', rationale: 'Preposition "to" completes the heavy shift structure "made available to [recipients] [heavy object]".' },
      ],
    },
    {
      id: 'grammar-v2-c1-end-focus-end-weight-08-q7',
      kind: 'gap',
      prompt: 'Provide the passive agent marker placing the complex agent in end-focus: "The constitutional challenge was dismissed _____ a unanimous panel of five appellate justices."',
      options: [],
      acceptedAnswers: [
        { text: 'by', rationale: 'Preposition "by" introduces the agentive noun phrase at the end of the passive clause.' },
      ],
    },
    {
      id: 'grammar-v2-c1-end-focus-end-weight-08-q8',
      kind: 'gap',
      prompt: 'Fill in the copular verb: "It _____ imperative that all participating researchers adhere strictly to the anonymization protocol."',
      options: [],
      acceptedAnswers: [
        { text: 'is', rationale: 'Present copula "is" fits timeless academic mandates with the mandative subjunctive.' },
        { text: 'remains', rationale: 'Stative verb "remains" is also fully standard.' },
      ],
    },
    {
      id: 'grammar-v2-c1-end-focus-end-weight-08-q9',
      kind: 'transform',
      prompt: 'Apply extraposition to relieve the front-heavy subject: "That the sovereign wealth fund sustained catastrophic losses during the market correction is undeniable."',
      options: [],
      acceptedAnswers: [
        { text: 'It is undeniable that the sovereign wealth fund sustained catastrophic losses during the market correction.', rationale: 'Extraposes the clausal subject to the end with anticipatory "It".' },
      ],
    },
    {
      id: 'grammar-v2-c1-end-focus-end-weight-08-q10',
      kind: 'transform',
      prompt: 'Reorder using Heavy NP Shift for better rhythm: "The minister revealed [the comprehensive blueprints for a transcontinental high-speed rail corridor] to the press corps."',
      options: [],
      acceptedAnswers: [
        { text: 'The minister revealed to the press corps the comprehensive blueprints for a transcontinental high-speed rail corridor.', rationale: 'Shifts the heavy direct object to the end, placing the shorter prepositional phrase adjacent to the verb.' },
      ],
    },
    {
      id: 'grammar-v2-c1-end-focus-end-weight-08-q11',
      kind: 'correction',
      prompt: 'Correct the illicit Heavy NP Shift involving a light pronoun: "The lead investigator handed over to the defense counsel them yesterday afternoon."',
      options: [],
      acceptedAnswers: [
        { text: 'The lead investigator handed them over to the defense counsel yesterday afternoon.', rationale: 'Places light pronoun "them" directly after the verb before the prepositional phrase.' },
        { text: 'The lead investigator handed them to the defense counsel yesterday afternoon.', rationale: 'Also fully correct without redundant over.' },
      ],
    },
    {
      id: 'grammar-v2-c1-end-focus-end-weight-08-q12',
      kind: 'correction',
      prompt: 'Correct the missing anticipatory subject in extraposition: "Became immediately apparent that the cryptographic key had been compromised."',
      options: [],
      acceptedAnswers: [
        { text: 'It became immediately apparent that the cryptographic key had been compromised.', rationale: 'Supplies required anticipatory dummy subject "It".' },
      ],
    },
  ],
  reviewExercises: [
    {
      id: 'grammar-v2-c1-end-focus-end-weight-08-r1',
      kind: 'choice',
      prompt: 'Select the optimal sentence respecting both end-weight and thematic information flow:',
      options: [
        { text: 'It is scarcely surprising that municipal authorities rejected the developers\' unsolicited proposal.', correct: true, rationale: 'Extraposition smoothly introduces the evaluation before the complex factual proposition.' },
        { text: 'That municipal authorities rejected the developers\' unsolicited proposal is scarcely surprising.', correct: false, rationale: 'Front-heavy subject clutters sentence onset.' },
        { text: 'Rejected the developers\' unsolicited proposal municipal authorities scarcely surprisingly.', correct: false, rationale: 'Completely ungrammatical word order.' },
      ],
      acceptedAnswers: [{ text: 'It is scarcely surprising that municipal authorities rejected the developers\' unsolicited proposal.', rationale: 'Standard extraposition ensuring end-weight.' }],
    },
    {
      id: 'grammar-v2-c1-end-focus-end-weight-08-r2',
      kind: 'gap',
      prompt: 'Supply the preposition in this heavy shift construction: "The foundation awarded _____ an unheralded marine biologist its prestigious annual conservation fellowship."',
      options: [],
      acceptedAnswers: [
        { text: 'to', rationale: 'Preposition "to" introduces the indirect object when shifted before the heavy direct object.' },
      ],
    },
    {
      id: 'grammar-v2-c1-end-focus-end-weight-08-r3',
      kind: 'transform',
      prompt: 'Restructure using passive voice so the lengthy agent receives end-focus: "An unprecedented coalition of indigenous elders, civil rights advocates, and environmental attorneys challenged the pipeline permit."',
      options: [],
      acceptedAnswers: [
        { text: 'The pipeline permit was challenged by an unprecedented coalition of indigenous elders, civil rights advocates, and environmental attorneys.', rationale: 'Passivizes the clause so the long, climactic agent appears at the end.' },
      ],
    },
    {
      id: 'grammar-v2-c1-end-focus-end-weight-08-r4',
      kind: 'correction',
      prompt: 'Correct the ungrammatical pronoun placement: "The archivist showed to the visiting scholars it during the morning symposium."',
      options: [],
      acceptedAnswers: [
        { text: 'The archivist showed it to the visiting scholars during the morning symposium.', rationale: 'Restores light pronoun "it" to the immediate post-verbal position.' },
      ],
    },
  ],
  outputPrompts: [
    {
      id: 'grammar-v2-c1-end-focus-end-weight-08-o1',
      prompt: 'Viết 1-2 câu học thuật áp dụng kỹ thuật Extraposition ("It is / was + adjective + that / whether...") để bình luận về một nghịch lý trong chính sách hoặc nghiên cứu khoa học.',
      modelAnswer: 'It is profoundly paradoxical that modern societies consume unprecedented volumes of informational media yet demonstrate diminishing critical discernment. It remains to be seen whether algorithmic moderation can mitigate this cognitive polarization.',
      checks: [
        'Sử dụng It làm chủ ngữ hình thức để ngoại vị hóa mệnh đề that hoặc whether.',
        'Đưa phần đánh giá tính từ lên trước, đẩy mệnh đề nội dung phức tạp ra sau.',
        'Văn phong học thuật sắc bén, mạch lạc.',
      ],
    },
    {
      id: 'grammar-v2-c1-end-focus-end-weight-08-o2',
      prompt: 'Viết 1-2 câu sử dụng Heavy NP Shift ("Verb + Prepositional Phrase + [Long Direct Object]") trong văn cảnh báo cáo hoặc phân tích lịch sử.',
      modelAnswer: 'The historical commission attributed to institutional inertia the prolonged delay in declassifying sensitive wartime diplomatic telegrams.',
      checks: [
        'Động từ đi liền với cụm giới từ ngắn (attributed to...).',
        'Tân ngữ trực tiếp dài và có bổ ngữ (the prolonged delay in...) được chuyển ra sau cùng.',
        'Không dùng đại từ ngắn (it, them) ở cuối câu.',
      ],
    },
  ],
  sources: [
    {
      id: 'biber-end-weight',
      title: 'Longman Grammar of Spoken and Written English: Information Packaging and End-Weight',
      url: 'https://www.pearson.com/en-us/subject-catalog/p/longman-grammar-of-spoken-and-written-english/P200000006385',
      claims: [
        'Academic prose strongly favors extraposition of that-clauses to avoid front-heavy subjects.',
        'Heavy noun phrases undergo postposition after prepositional complements to balance clause rhythm.',
        'Passive constructions frequently serve to position lengthy new-information agents at sentence end.',
      ],
      checkedAt: '2026-10-05',
      provenance: 'reference-only',
    },
  ],
  review: {
    status: 'approved',
    mode: 'ai-internal',
    reviewer: 'Editorial Review Agent (AI-Internal)',
    reviewedAt: '2026-10-06T00:00:00.000Z',
    summary: 'Comprehensive review completed. End-focus, end-weight, extraposition with dummy It, heavy NP shift constraints, and Biber et al. Longman Grammar sources verified.',
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

export default endFocusEndWeightLesson;
