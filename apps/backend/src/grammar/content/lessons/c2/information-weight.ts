/**
 * @file information-weight.ts
 * @description C2 lesson: Information weight and the end-weight principle.
 */
import type { GrammarLesson } from '../../types.js';

const lesson: GrammarLesson = {
  id: 'grammar-v2-c2-information-weight-09',
  revisionId: 'grammar-v2-c2-information-weight-09@1.0.0',
  revision: '1.0.0',
  title: 'Phân bổ trọng lượng thông tin (End-Weight & Heavy NP Shift)',
  objective: 'Làm chủ nguyên lý trọng lượng cuối (end-weight), kỹ thuật hoán vị cụm danh từ nặng (heavy NP shift), tránh câu nặng đầu và điều phối nhịp điệu cú pháp trong văn bản học thuật cấp cao.',
  prerequisiteIds: ['grammar-v2-c2-topic-focus-packaging-08'],
  coverage: ['information-weight', 'end-weight', 'heavy-noun-phrase-shift', 'c2-information-packaging'],
  context: {
    english: 'In judicial opinions and analytical essays, heavy noun phrases are routinely shifted to clause-final position. Placing lengthy post-modified constituents before brief complements burdens processing capacity and disrupts syntactic rhythm.',
    vietnamese: 'Trong các phán quyết tư pháp và bài luận phân tích, các cụm danh từ phức tạp thường được dịch chuyển về vị trí cuối mệnh đề. Việc đặt các cụm dài có bổ ngữ phía trước các bổ ngữ ngắn gây quá tải khả năng tiếp nhận cú pháp và làm gãy nhịp điệu câu.',
  },
  guide: {
    pattern: 'V + [short prep phrase / complement] + [heavy direct object NP / clause]',
    whenToUse: [
      'Dồn cụm danh từ dài có nhiều mệnh đề quan hệ hoặc định ngữ về cuối mệnh đề theo nguyên lý end-weight',
      'Đưa cụm giới từ hoặc bổ ngữ ngắn lên sát động từ chính để tránh tình trạng bổ ngữ bị cô lập xa cách ở cuối câu',
      'Duy trì sự thông suốt và cân bằng nhịp điệu trong văn phong học thuật, pháp lý và hành chính cấp cao',
    ],
    signalWords: ['attribute to', 'disclose to', 'bring into relief', 'render obsolete', 'make accessible to'],
    check: [
      'Tân ngữ trực tiếp có cấu trúc dài và phức tạp hơn đáng kể so với cụm giới từ đi kèm không?',
      'Việc dịch chuyển có vô tình tạo ra sự mơ hồ về vị trí gắn kết của bổ ngữ không?',
      'Đại từ nhân xưng ngắn không nhấn mạnh có giữ trật tự V + pronoun + PP không?',
    ],
  },
  explanation: 'Nguyên lý trọng lượng cuối (End-Weight Principle) chi phối cách sắp xếp cú pháp trong tiếng Anh tự nhiên: các thành phần có dung lượng thông tin lớn, độ dài từ ngữ cao và mang thông tin mới thường được dồn về cuối mệnh đề. Khi một động từ nhận cả tân ngữ trực tiếp (direct object) lẫn cụm giới từ/bổ ngữ ngắn, trật tự chuẩn SVO + PP sẽ khiến câu bị "nặng giữa" hoặc "nặng đầu" nếu cụm tân ngữ chứa nhiều bổ ngữ phụ thuộc. Kỹ thuật Heavy NP Shift cho phép hoán đổi vị trí: chuyển cụm giới từ ngắn lên ngay sau động từ, đẩy cụm danh từ nặng về cuối (ví dụ: "explained to the delegates the intricate mechanism..."). Quy tắc tối thượng là không bao giờ áp dụng kỹ thuật này cho đại từ nhân xưng ngắn (không thể nói *"explained to them it").',
  examples: [
    {
      english: 'The minister explained to the parliamentary committee the intricate revisions made to the fiscal charter.',
      vietnamese: 'Bộ trưởng đã giải thích cho ủy ban quốc hội những sửa đổi phức tạp được đưa vào hiến chương tài khóa.',
    },
    {
      english: 'Historians attribute to rapid tectonic shifts the sudden abandonment of the coastal river settlements.',
      vietnamese: 'Các nhà sử học quy cho những chuyển dịch kiến tạo nhanh chóng việc các khu định cư ven sông bất ngờ bị bỏ hoang.',
    },
    {
      english: 'The inquiry brought to light several classified cables that directly contradicted official testimony.',
      vietnamese: 'Cuộc điều tra đã đưa ra ánh sáng nhiều bức điện tín mật mâu thuẫn trực tiếp với lời khai chính thức.',
    },
    {
      english: 'The technological breakthrough rendered entirely obsolete the existing protocols for analog signal processing.',
      vietnamese: 'Đột phá công nghệ đã khiến các quy thức hiện hành về xử lý tín hiệu analog trở nên hoàn toàn lỗi thời.',
    },
    {
      english: 'The foundation made accessible to independent researchers thousands of previously restricted audio recordings.',
      vietnamese: 'Tổ chức đã mở quyền tiếp cận cho các nhà nghiên cứu độc lập đối với hàng ngàn bản ghi âm từng bị hạn chế trước đây.',
    },
    {
      english: 'We hold in high regard those whistleblowers who endured personal hardship to expose corporate malfeasance.',
      vietnamese: 'Chúng tôi dành sự kính trọng sâu sắc cho những người tố giác đã chịu đựng gian khổ cá nhân để phơi bày sai phạm doanh nghiệp.',
    },
  ],
  contrasts: [
    {
      form: 'Heavy NP Shift (V + PP + Heavy NP) vs Standard Order (V + Heavy NP + PP)',
      whyFits: '"The board disclosed to the regulators all documents obtained during the six-month inquiry" giúp cụm giới từ ngắn đứng sát động từ và cụm danh từ dài dồn về cuối mượt mà.',
      whyNot: '"The board disclosed all documents obtained during the six-month inquiry to the regulators" đẩy cụm "to the regulators" ra quá xa động từ disclosed, làm đứt đoạn mạch câu và dễ gây nhầm lẫn là bổ ngữ của inquiry.',
    },
    {
      form: 'Shift with Pronoun vs Heavy NP',
      whyFits: '"She presented the award to him" là trật tự bắt buộc vì đại từ "the award" và "him" đều nhẹ.',
      whyNot: '"*She presented to him it" vi phạm quy tắc cú pháp nghiêm ngặt: đại từ đơn âm tiết/ngắn không thể bị hoán vị ra vị trí end-weight.',
    },
  ],
  commonMistakes: [
    'Áp dụng hoán vị trọng lượng khi tân ngữ trực tiếp là đại từ nhân xưng ngắn (viết nhầm "*They disclosed to us it").',
    'Để cụm trạng ngữ ngắn rơi vào vị trí cuối cùng sau một cụm danh từ dài hàng chục từ, khiến câu cụt lủn và mất cân đối.',
    'Nhầm lẫn giữa Heavy NP Shift và cấu trúc đảo ngữ dative (dative shift), bỏ mất giới từ bắt buộc của động từ (như viết nhầm "*explained the committee the revisions").',
  ],
  summary: 'End-weight sắp đặt các thành phần nặng về cuối mệnh đề. Heavy NP Shift đưa cụm giới từ ngắn lên trước cụm tân ngữ danh từ dài để tránh câu phân mảnh và duy trì nhịp điệu cú pháp chặt chẽ.',
  exercises: [
    {
      id: 'grammar-v2-c2-information-weight-09-q1',
      kind: 'choice',
      prompt: 'Chọn phương án áp dụng nguyên lý end-weight chuẩn xác và tự nhiên nhất trong văn phong phân tích.',
      options: [
        { text: 'The council submitted to the supervisory body the voluminous audit findings compiled over two years.', correct: true, rationale: 'Cụm giới từ ngắn "to the supervisory body" đứng sát động từ, dồn cụm danh từ dài về cuối.' },
        { text: 'The council submitted the voluminous audit findings compiled over two years to the supervisory body.', correct: false, rationale: 'Cụm danh từ dài ngăn cách động từ và cụm giới từ ngắn, làm giảm tính liền mạch cú pháp.' },
        { text: 'The council submitted to it the audit.', correct: false, rationale: 'Tân ngữ ngắn "the audit" không phải heavy NP, không có lý do để hoán vị.' },
      ],
      acceptedAnswers: [{ text: 'The council submitted to the supervisory body the voluminous audit findings compiled over two years.', rationale: 'End-weight tối ưu hóa vị trí tiếp nhận thông tin nặng.' }],
    },
    {
      id: 'grammar-v2-c2-information-weight-09-q2',
      kind: 'choice',
      prompt: 'Xác định câu sắp xếp thành phần bổ ngữ tối ưu cho cấu trúc với "render".',
      options: [
        { text: 'The unexpected rate increase rendered obsolete the financial models developed during the previous decade.', correct: true, rationale: 'Tính từ "obsolete" ngắn đứng ngay sau động từ, nhường chỗ cho cụm danh từ dài ở cuối.' },
        { text: 'The unexpected rate increase rendered the financial models developed during the previous decade obsolete.', correct: false, rationale: 'Đẩy "obsolete" ra sau cụm danh từ quá dài tạo cảm giác rời rạc và hụt hẫng.' },
        { text: 'The unexpected rate increase rendered obsolete it.', correct: false, rationale: 'Đại từ "it" ngắn không được đứng ở vị trí cuối sau tính từ bổ ngữ.' },
      ],
      acceptedAnswers: [{ text: 'The unexpected rate increase rendered obsolete the financial models developed during the previous decade.', rationale: 'Tính từ ngắn đặt trước heavy NP tạo cấu trúc vị ngữ gọn gàng.' }],
    },
    {
      id: 'grammar-v2-c2-information-weight-09-q3',
      kind: 'choice',
      prompt: 'Trong ngữ cảnh học thuật, câu nào phân bố trọng lượng thông tin tự nhiên nhất với "attribute"?',
      options: [
        { text: 'Paleontologists attribute to sudden ocean deoxygenation the mass extinction events recorded in the stratum.', correct: true, rationale: 'Cụm nguyên nhân "to sudden ocean deoxygenation" đặt trước dồn cụm danh từ dài về cuối.' },
        { text: 'Paleontologists attribute the mass extinction events recorded in the stratum to sudden ocean deoxygenation.', correct: false, rationale: 'Mặc dù ngữ pháp đúng nhưng câu dài hơn ở tân ngữ khiến việc chuyển cụm ngắn lên trước tự nhiên hơn.' },
        { text: 'Paleontologists attribute to deoxygenation it.', correct: false, rationale: 'Sai quy tắc vì "it" là đại từ ngắn.' },
      ],
      acceptedAnswers: [{ text: 'Paleontologists attribute to sudden ocean deoxygenation the mass extinction events recorded in the stratum.', rationale: 'Heavy NP shift giúp cân bằng trọng lượng mệnh đề.' }],
    },
    {
      id: 'grammar-v2-c2-information-weight-09-q4',
      kind: 'choice',
      prompt: 'Chọn câu thể hiện phong cách diễn ngôn học thuật chuẩn mực với "bring into relief".',
      options: [
        { text: 'The archival evidence brings into sharp relief the deep ideological rifts dividing the early revolutionaries.', correct: true, rationale: 'Cụm thành ngữ "into sharp relief" ngắn đứng sát động từ, cụm danh từ dài nằm ở cuối.' },
        { text: 'The archival evidence brings the deep ideological rifts dividing the early revolutionaries into sharp relief.', correct: false, rationale: 'Tách rời "brings" và "into sharp relief" bởi cụm danh từ dài làm loãng thành ngữ.' },
        { text: 'The archival evidence brings into sharp relief them.', correct: false, rationale: 'Đại từ "them" không được nhận heavy shift.' },
      ],
      acceptedAnswers: [{ text: 'The archival evidence brings into sharp relief the deep ideological rifts dividing the early revolutionaries.', rationale: 'Duy trì khối thành ngữ vị ngữ trọn vẹn trước cụm danh từ dài.' }],
    },
    {
      id: 'grammar-v2-c2-information-weight-09-q5',
      kind: 'gap',
      prompt: 'Hoàn thành câu bằng dạng danh từ thích hợp của từ trong ngoặc: "The commission presented to the legislature the final ___ (recommend) formulated after three years of consultation."',
      options: [],
      acceptedAnswers: [
        { text: 'recommendations', rationale: 'Danh từ số nhiều "recommendations" là trung tâm của cụm tân ngữ nặng.' },
      ],
    },
    {
      id: 'grammar-v2-c2-information-weight-09-q6',
      kind: 'gap',
      prompt: 'Điền từ trái nghĩa với "accessible" để hoàn thành cụm vị ngữ: "The digital archive made ___ (access) to unauthorized third parties all confidential transcripts."',
      options: [],
      acceptedAnswers: [
        { text: 'inaccessible', rationale: '"inaccessible" là tính từ phù hợp đi cùng "made" trước cụm giới từ "to...".' },
      ],
    },
    {
      id: 'grammar-v2-c2-information-weight-09-q7',
      kind: 'gap',
      prompt: 'Điền tính từ dạng phân từ thích hợp của từ trong ngoặc: "The new directives rendered ___ (enforce) several obsolete municipal bylaws."',
      options: [],
      acceptedAnswers: [
        { text: 'unenforceable', rationale: '"unenforceable" (không thể thực thi) là tính từ bổ ngữ đứng trước cụm danh từ nặng.' },
      ],
    },
    {
      id: 'grammar-v2-c2-information-weight-09-q8',
      kind: 'gap',
      prompt: 'Điền danh từ trừu tượng thích hợp của từ trong ngoặc: "Senior diplomats hold in high ___ (regard) the mediators who negotiated the armistice."',
      options: [],
      acceptedAnswers: [
        { text: 'regard', rationale: '"in high regard" là cụm cố định đứng trước mệnh đề danh từ nặng.' },
        { text: 'esteem', rationale: '"in high esteem" là biến thể tương đương hoàn toàn chính xác.' },
      ],
    },
    {
      id: 'grammar-v2-c2-information-weight-09-q9',
      kind: 'transform',
      prompt: 'Viết lại câu sau bằng cách áp dụng Heavy NP Shift để chuyển cụm giới từ ngắn lên trước cụm tân ngữ dài: "The spokesperson disclosed the confidential intelligence dossiers that had triggered the diplomatic crisis to the foreign correspondents."',
      options: [],
      acceptedAnswers: [
        { text: 'The spokesperson disclosed to the foreign correspondents the confidential intelligence dossiers that had triggered the diplomatic crisis.', rationale: 'Chuyển "to the foreign correspondents" lên ngay sau "disclosed".' },
        { text: 'disclosed to the foreign correspondents the confidential intelligence dossiers that had triggered the diplomatic crisis', rationale: 'Cụm vị ngữ hoán vị đưa cụm giới từ ngắn lên trước.' },
      ],
    },
    {
      id: 'grammar-v2-c2-information-weight-09-q10',
      kind: 'transform',
      prompt: 'Viết lại câu sau theo nguyên lý end-weight bằng cách đặt bổ ngữ tính từ ngắn "apparent" ngay sau động từ: "The auditor made the grave financial discrepancies uncovered during the forensic examination apparent."',
      options: [],
      acceptedAnswers: [
        { text: 'The auditor made apparent the grave financial discrepancies uncovered during the forensic examination.', rationale: '"made apparent" kết hợp chặt chẽ trước cụm danh từ dài ở cuối.' },
        { text: 'made apparent the grave financial discrepancies uncovered during the forensic examination', rationale: 'Cụm vị ngữ đặt tính từ ngắn ngay sau động từ made.' },
      ],
    },
    {
      id: 'grammar-v2-c2-information-weight-09-q11',
      kind: 'correction',
      prompt: 'Sửa lỗi trật tự từ vi phạm quy tắc hoán vị đại từ trong câu sau: "When the committee demanded the final summary, the director presented to them it without hesitation."',
      options: [],
      acceptedAnswers: [
        { text: 'When the committee demanded the final summary, the director presented it to them without hesitation.', rationale: 'Đại từ ngắn "it" không thể đứng cuối theo heavy NP shift mà phải theo trật tự chuẩn "presented it to them".' },
        { text: 'the director presented it to them without hesitation', rationale: 'Mệnh đề chính sửa lỗi trật tự từ của đại từ ngắn.' },
        { text: 'presented it to them', rationale: 'Trật tự động từ và đại từ chuẩn xác: presented it to them.' },
      ],
    },
    {
      id: 'grammar-v2-c2-information-weight-09-q12',
      kind: 'correction',
      prompt: 'Sửa lỗi cấu trúc câu bị đứt quãng do để cụm giới từ ngắn ở cuối sau cụm tân ngữ dài: "The museum exhibited the priceless archaeological artifacts unearthed near the Nile delta to visiting scholars."',
      options: [],
      acceptedAnswers: [
        { text: 'The museum exhibited to visiting scholars the priceless archaeological artifacts unearthed near the Nile delta.', rationale: 'Đưa cụm giới từ "to visiting scholars" lên trước để giải tỏa áp lực ngữ pháp cho câu.' },
      ],
    },
  ],
  reviewExercises: [
    {
      id: 'grammar-v2-c2-information-weight-09-r1',
      kind: 'choice',
      prompt: 'Chọn câu duy trì nhịp điệu cú pháp chặt chẽ nhất trong văn bản học thuật.',
      options: [
        { text: 'The treatise leaves open the contentious question of whether early hominids possessed symbolic language.', correct: true, rationale: 'Cụm vị ngữ "leaves open" liên kết chặt chẽ trước mệnh đề whether dài.' },
        { text: 'The treatise leaves the contentious question of whether early hominids possessed symbolic language open.', correct: false, rationale: '"open" bị đẩy ra quá xa động từ chính sau mệnh đề dài.' },
        { text: 'The treatise leaves open it for future study.', correct: false, rationale: 'Đại từ "it" ngắn không được áp dụng hoán vị.' },
      ],
      acceptedAnswers: [{ text: 'The treatise leaves open the contentious question of whether early hominids possessed symbolic language.', rationale: 'Cấu trúc "leave open + clause" tuân thủ nguyên lý trọng lượng cuối.' }],
    },
    {
      id: 'grammar-v2-c2-information-weight-09-r2',
      kind: 'gap',
      prompt: 'Điền giới từ thích hợp: "The biographers attribute ___ environmental factors the remarkable resilience observed across successive generations."',
      options: [],
      acceptedAnswers: [
        { text: 'to', rationale: 'Động từ "attribute" đòi hỏi giới từ "to".' },
      ],
    },
    {
      id: 'grammar-v2-c2-information-weight-09-r3',
      kind: 'transform',
      prompt: 'Viết lại câu sau sang trật tự Heavy NP Shift: "The dean presented the silver medallion commemorating forty years of continuous service to Dr. Aris."',
      options: [],
      acceptedAnswers: [
        { text: 'The dean presented to Dr. Aris the silver medallion commemorating forty years of continuous service.', rationale: 'Chuyển "to Dr. Aris" lên liền sau "presented".' },
      ],
    },
    {
      id: 'grammar-v2-c2-information-weight-09-r4',
      kind: 'correction',
      prompt: 'Sửa câu sau để cụm giới từ ngắn không bị tách biệt ở cuối: "The archivist revealed the fragile parchment codices that had survived the catastrophic fire to the public."',
      options: [],
      acceptedAnswers: [
        { text: 'The archivist revealed to the public the fragile parchment codices that had survived the catastrophic fire.', rationale: 'Đưa "to the public" lên sát "revealed" dồn cụm danh từ dài về cuối.' },
      ],
    },
  ],
  outputPrompts: [
    {
      id: 'grammar-v2-c2-information-weight-09-o1',
      prompt: 'Viết 2-3 câu báo cáo khoa học hoặc pháp lý, sử dụng kỹ thuật Heavy NP Shift với động từ "disclose to" hoặc "present to" để dồn một cụm danh từ phức tạp về cuối.',
      modelAnswer: 'During the closed hearing, the lead investigator disclosed to the parliamentary committee several encrypted communications recovered from foreign servers. These documents brought into sharp relief the systematic evasion of trade sanctions by domestic conglomerates.',
      checks: [
        'Sử dụng đúng cấu trúc V + PP + Heavy NP (không để cụm giới từ ngắn ở cuối sau danh từ dài)',
        'Cụm danh từ cuối câu chứa các thành phần tu từ hoặc mệnh đề phụ mở rộng',
        'Văn phong học thuật, chính xác và tự nhiên',
      ],
    },
    {
      id: 'grammar-v2-c2-information-weight-09-o2',
      prompt: 'Viết một câu phân tích nguyên nhân học thuật sử dụng "attribute to" kết hợp với nguyên lý End-Weight để trình bày một hiện tượng phức tạp.',
      modelAnswer: 'Sociolinguists attribute to rapid urbanization and digital media exposure the accelerated decline of regional dialects among suburban youth.',
      checks: [
        'Cụm giới từ "to + NP" đứng ngay sau động từ "attribute"',
        'Tân ngữ trực tiếp là cụm danh từ dài, mang trọng lượng thông tin chính của câu',
        'Cấu trúc mạch lạc, không nhầm lẫn giới từ',
      ],
    },
  ],
  sources: [
    {
      id: 'cgel-information-packaging',
      title: 'The Cambridge Grammar of the English Language (Chapter 16: Information Packaging)',
      url: 'https://www.cambridge.org/core/books/cambridge-grammar-of-the-english-language/AFD6DE78E568F873DE6EE0C1A7416353',
      claims: ['Heavy NP shift repositions weightier constituents clause-finally', 'End-weight facilitates syntactic processing'],
      checkedAt: '2026-10-05',
      provenance: 'reference-only',
    },
    {
      id: 'british-council-emphasis',
      title: 'British Council: Advanced Sentence Structure and Emphasis',
      url: 'https://learnenglish.britishcouncil.org/grammar/c1-c2-grammar/emphasis',
      claims: ['Information packaging guides reader focus and textual flow'],
      checkedAt: '2026-10-05',
      provenance: 'reference-only',
    },
  ],
  review: {
    status: 'approved',
    mode: 'ai-internal',
    reviewer: 'ai-internal-reviewer',
    reviewedAt: '2026-10-06T00:00:00.000Z',
    summary: 'Thorough C2 editorial review completed: verified Heavy NP Shift, end-weight distribution, 16 exercises, outputs, and canonical sources.',
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

export default lesson;
