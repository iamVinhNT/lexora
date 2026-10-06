/**
 * @file academic-coherence.ts
 * @description C1 lesson on academic coherence and thematic progression (theme-rheme flow, given-before-new, lexical cohesion, macro-themes).
 */
import type { GrammarLesson } from '../../types.js';

const academicCoherenceLesson: GrammarLesson = {
  id: 'grammar-v2-c1-academic-coherence-23',
  revisionId: 'grammar-v2-c1-academic-coherence-23@1.0.0',
  revision: '1.0.0',
  title: 'Mạch lạc học thuật và cấu trúc chủ đề đoạn văn (Academic Coherence)',
  objective: 'Kiến tạo sự mạch lạc tầng sâu (macro-coherence) trong các đoạn văn học thuật thông qua nguyên lý Thông tin cũ trước Thông tin mới (Given-before-New), chuỗi tiến trình Đề - Thuyết (Theme-Rheme progression) và mạng lưới liên kết từ vựng hữu cơ.',
  prerequisiteIds: ['grammar-v2-c1-formal-email-register-22'],
  coverage: ['academic-coherence', 'theme-rheme-progression', 'given-before-new', 'lexical-cohesion', 'hyper-themes', 'c1-academic-writing'],
  context: {
    english: 'Weak academic writers rely mechanically on transition words at the start of every sentence (Furthermore, Moreover, In addition). In contrast, C1 prose achieves organic coherence by threading information: the new information (Rheme) introduced at the end of one sentence becomes the familiar starting point (Theme) of the next.',
    vietnamese: 'Người viết non tay thường lạm dụng máy móc các liên từ nối ở đầu mỗi câu (Furthermore, Moreover, In addition). Ngược lại, văn phong C1 đạt được sự mạch lạc tự nhiên bằng cách đan dệt thông tin: phần thông tin mới (Rheme) xuất hiện ở đuôi câu trước trở thành điểm xuất phát quen thuộc (Theme) mở đầu câu sau.',
  },
  guide: {
    pattern: 'Sentence 1: [Theme 1 (Given)] + [Rheme 1 (New)] -> Sentence 2: [Theme 2 (= Rheme 1)] + [Rheme 2 (New)]',
    whenToUse: [
      'Xây dựng các đoạn văn nghị luận học thuật phức tạp mà không bị phụ thuộc vào các từ nối liên kết cơ học.',
      'Định hình câu chủ đề đoạn văn (Hyper-theme) và phân rã các tiểu chủ đề một cách logic và lớp lang.',
      'Sử dụng các danh từ bao quát (general/shell nouns như "this phenomenon", "such disparities", "this bottleneck") để tóm tắt và nối mạch ý.',
    ],
    signalWords: ['this discrepancy', 'such mechanisms', 'this paradigm', 'the former... the latter', 'consequently', 'in this regard'],
    check: [
      'Đầu câu mới có chứa thông tin đã được giới thiệu hoặc người đọc có thể suy luận từ câu trước (Given information) chưa?',
      'Thông tin quan trọng nhất, nặng ký nhất có được dồn về vị trí cuối câu (End-focus / Rheme) không?',
      'Đã giảm bớt các liên từ nối sáo mòn (Furthermore, Moreover) bằng cách sử dụng liên kết từ vựng (lexical ties) chưa?',
    ],
  },
  explanation: 'Sự mạch lạc học thuật (Academic Coherence) ở trình độ C1 là khả năng tổ chức dòng chảy tư duy ở quy mô toàn văn bản (macro-level), vượt xa sự liên kết bề mặt (cohesion) (Halliday & Hasan, 1976; Daneš, 1974). Ba nguyên lý nền tảng bao gồm: 1) Cấu trúc Đề - Thuyết (Theme-Rheme Architecture): Đề (Theme) là phần mở đầu câu, đóng vai trò neo giữ bối cảnh quen thuộc; Thuyết (Rheme) là phần vị ngữ truyền tải thông tin mới mẻ cần thuyết minh; 2) Tiến trình chủ đề (Thematic progression): Mô hình tuyến tính (Linear / Zig-zag progression: Thuyết của câu 1 trở thành Đề của câu 2) tạo đà thúc đẩy lập luận mạnh mẽ nhất; Mô hình Đề bất biến (Constant Theme: cùng một Đề được duy trì qua các câu với các Thuyết khác nhau); Mô hình Đề phái sinh (Derived / Split Rheme: một Đề bao quát trong câu chủ đề được chẻ nhỏ thành các Đề con trong các câu tiếp theo); 3) Nguyên lý Thông tin cũ đứng trước Thông tin mới (Given-before-New Principle): Đặt yếu tố đã biết ở đầu câu giúp người đọc dễ tiếp nhận trước khi đối diện với các khái niệm phức tạp mới ở cuối câu (End-weight / End-focus).',
  examples: [
    {
      english: 'Deep-sea hydrothermal ecosystems harbor unique extremophilic bacteria. These microorganisms derive metabolic energy from chemical synthesis rather than sunlight.',
      vietnamese: 'Các hệ sinh thái thủy nhiệt dưới biển sâu chứa các vi khuẩn chịu cực hạn độc đáo. Những vi sinh vật này lấy năng lượng trao đổi chất từ hóa tổng hợp thay vì ánh sáng mặt trời. (Tiến trình Đề - Thuyết tuyến tính: Extremophilic bacteria ở Thuyết câu 1 trở thành Đề câu 2).',
    },
    {
      english: 'The treaty established strict statutory ceilings on sulfur dioxide emissions. Compliance with these ceilings, however, required unprecedented capital investments from heavy industries.',
      vietnamese: 'Hiệp ước thiết lập các mức trần theo luật định nghiêm ngặt đối với lượng khí thải sulfur dioxide. Tuy nhiên, việc tuân thủ các mức trần này đòi hỏi các khoản đầu tư vốn chưa từng có từ các ngành công nghiệp nặng.',
    },
    {
      english: 'Recent archaeological excavations in the Levant uncovered substantial evidence of early metallurgical innovation. Chief among these artifacts were bronze smelting crucibles dating back to the fourth millennium BCE.',
      vietnamese: 'Các cuộc khai quật khảo cổ gần đây tại Levant đã phát hiện bằng chứng đáng kể về sự đổi mới luyện kim sơ khai. Đứng đầu trong số các hiện vật này là các nồi nấu luyện đồng có niên đại từ thiên niên kỷ thứ tư trước Công nguyên.',
    },
    {
      english: 'Algorithmic trading systems process financial transactions within microseconds. Such rapid execution, while enhancing liquidity, introduces acute systemic vulnerability during market sell-offs.',
      vietnamese: 'Hệ thống giao dịch thuật toán xử lý các giao dịch tài chính trong vòng micro giây. Tốc độ khớp lệnh nhanh chóng như vậy, dù làm tăng tính thanh khoản, lại đưa đến lỗ hổng hệ thống nghiêm trọng trong các đợt bán tháo thị trường.',
    },
    {
      english: 'The central bank implemented an aggressive tightening cycle. This policy stance effectively stabilized the sovereign currency, albeit at the cost of transient economic contraction.',
      vietnamese: 'Ngân hàng trung ương đã thực hiện một chu kỳ thắt chặt quyết liệt. Lập trường chính sách này đã ổn định đồng nội tệ một cách hiệu quả, dẫu phải trả giá bằng sự suy thoái kinh tế tạm thời.',
    },
    {
      english: 'Urban decentralization disperses economic activities across metropolitan peripheries. This spatial restructuring substantially alters intra-urban commuting vectors.',
      vietnamese: 'Phi tập trung hóa đô thị phân tán các hoạt động kinh tế ra khắp vùng ngoại vi vùng đô thị. Sự tái cơ cấu không gian này làm thay đổi đáng kể các vectơ đi lại nội đô.',
    },
  ],
  contrasts: [
    {
      form: 'Linear flow: "...harbor unique enzymes. These enzymes catalyze reactions..." vs Disconnected flow: "...harbor unique enzymes. Reactions are catalyzed by them..."',
      whyFits: 'Đặt "These enzymes" làm Đề (Theme) của câu sau tạo sự tiếp nối thông tin mượt mà, đặt thông tin cũ trước thông tin mới.',
      whyNot: 'Câu thứ hai biến "Reactions" (thông tin mới chưa từng nhắc tới) thành Đề, khiến người đọc phải dừng lại kết nối, làm đứt gãy nhịp độ tư duy.',
    },
    {
      form: 'Lexical cohesion: "The currency depreciated rapidly. This monetary collapse alarmed investors..." vs Mechanical marker: "The currency depreciated rapidly. Moreover, investors were alarmed..."',
      whyFits: 'Dùng danh từ bao quát "This monetary collapse" vừa tóm tắt thông tin câu trước vừa tạo bước đệm phân tích ngữ nghĩa sâu sắc.',
      whyNot: 'Lạm dụng liên từ cơ học "Moreover" chỉ tạo liên kết bề mặt nông cạn, không thể hiện được khả năng tổng hợp khái niệm của người viết C1.',
    },
  ],
  commonMistakes: [
    'Lạm dụng dày đặc các liên từ nối cơ học (Furthermore, Moreover, In addition, Besides) ở đầu mỗi câu, biến đoạn văn thành danh sách gạch đầu dòng rời rạc.',
    'Vi phạm nguyên lý Given-before-New: đặt thông tin hoàn toàn mới và phức tạp lên đầu câu, đẩy thông tin đã biết về cuối câu khiến người đọc bị hẫng.',
    'Mất liên kết chuỗi từ vựng (lexical drift): thay đổi thuật ngữ liên tục mà không có sự quy chiếu rõ ràng, làm mờ nhạt chủ đề trung tâm của đoạn văn.',
  ],
  summary: 'Mạch lạc học thuật C1 đạt được thông qua cấu trúc Đề - Thuyết (Theme-Rheme), nguyên tắc thông tin cũ đứng trước thông tin mới (Given-before-New) và việc sử dụng danh từ bao quát (this discrepancy) để kết nối đoạn văn thay vì lạm dụng liên từ cơ học.',
  exercises: [
    {
      id: 'grammar-v2-c1-academic-coherence-23-q1',
      kind: 'choice',
      prompt: 'Select the sentence that provides the most coherent continuation following the Given-before-New principle: "The laboratory identified a previously uncharacterized bacterial strain in the deep-sea core samples."',
      options: [
        { text: 'This organism exhibits extraordinary metabolic resistance to heavy metal toxicity.', correct: true, rationale: 'Puts the familiar referent (This organism) in Theme position and introduces new findings in the Rheme.' },
        { text: 'Extraordinary metabolic resistance to heavy metal toxicity is exhibited by this organism.', correct: false, rationale: 'Violates Given-before-New by fronting complex new information while burying known reference.' },
        { text: 'Furthermore, heavy metal toxicity is something that affects many deep-sea organisms.', correct: false, rationale: 'Weak mechanical transition diverting from the focal bacterial strain.' },
        { text: 'In addition, core samples often contain many bacterial strains according to literature.', correct: false, rationale: 'Regresses backwards into general methodology rather than advancing the discourse.' },
      ],
      acceptedAnswers: [{ text: 'This organism exhibits extraordinary metabolic resistance to heavy metal toxicity.', rationale: 'Exemplary linear thematic progression (Given-before-New).' }],
    },
    {
      id: 'grammar-v2-c1-academic-coherence-23-q2',
      kind: 'choice',
      prompt: 'Identify the passage that demonstrates organic cohesion via shell nouns (general nouns) rather than mechanical connectors.',
      options: [
        { text: 'Discrepancies emerged between the theoretical projections and recorded outcomes. This divergence prompted an immediate re-evaluation of instrument calibration.', correct: true, rationale: 'Capsulates prior findings using the shell noun phrase This divergence as Theme.' },
        { text: 'Discrepancies emerged between the theoretical projections and recorded outcomes. Furthermore, an immediate re-evaluation of instrument calibration took place.', correct: false, rationale: 'Relies on superficial mechanical connector Furthermore.' },
        { text: 'Discrepancies emerged between the theoretical projections and recorded outcomes. Moreover, instruments were calibrated again very quickly.', correct: false, rationale: 'Mechanical transition with informal predicate phrasing.' },
        { text: 'Discrepancies emerged between the theoretical projections and recorded outcomes. Besides, they had to recalibrate instruments.', correct: false, rationale: 'Informal spoken connective besides.' },
      ],
      acceptedAnswers: [{ text: 'Discrepancies emerged between the theoretical projections and recorded outcomes. This divergence prompted an immediate re-evaluation of instrument calibration.', rationale: 'Organic encapsulation via retrospective shell noun.' }],
    },
    {
      id: 'grammar-v2-c1-academic-coherence-23-q3',
      kind: 'choice',
      prompt: 'Which sentence best establishes a macro-theme (hyper-theme) for an academic paragraph on urban vulnerability?',
      options: [
        { text: 'Metropolitan resilience hinges on three interdependent factors: infrastructural durability, fiscal elasticity, and adaptive governance.', correct: true, rationale: 'Sets up a clear hyper-theme that projects structured derived themes for subsequent sentences.' },
        { text: 'Infrastructural durability is very important for cities because water pipes can break easily.', correct: false, rationale: 'Narrow focus lacking structural macro-thematic projection.' },
        { text: 'Cities have many problems nowadays and governments must solve them immediately.', correct: false, rationale: 'Vague colloquial generalisation.' },
        { text: 'Furthermore, metropolitan resilience is a topic that many researchers have discussed lately.', correct: false, rationale: 'Meaningless metadiscourse lacking substantive thematic scope.' },
      ],
      acceptedAnswers: [{ text: 'Metropolitan resilience hinges on three interdependent factors: infrastructural durability, fiscal elasticity, and adaptive governance.', rationale: 'Clear tripartite hyper-theme projecting paragraph structure.' }],
    },
    {
      id: 'grammar-v2-c1-academic-coherence-23-q4',
      kind: 'choice',
      prompt: 'Select the revision that eliminates clumsy overuse of mechanical transition markers.',
      options: [
        { text: 'The central bank raised baseline interest rates. This monetary intervention curtailed credit expansion, dampening inflationary momentum.', correct: true, rationale: 'Replaces mechanical connectors with retrospective nominalisation (This monetary intervention) and participial result.' },
        { text: 'The central bank raised baseline interest rates. Furthermore, credit expansion was curtailed. Moreover, inflationary momentum was dampened.', correct: false, rationale: 'Clumsy stacking of furthermore and moreover.' },
        { text: 'The central bank raised baseline interest rates. In addition, this curtailed credit expansion. What is more, it dampened inflation.', correct: false, rationale: 'Repetitive additive markers and weak pronoun chaining.' },
        { text: 'The central bank raised baseline interest rates. Also, credit expansion went down. Consequently, inflation fell.', correct: false, rationale: 'Choppy coordination lacking high-level academic cohesion.' },
      ],
      acceptedAnswers: [{ text: 'The central bank raised baseline interest rates. This monetary intervention curtailed credit expansion, dampening inflationary momentum.', rationale: 'Smooth organic thematic progression.' }],
    },
    {
      id: 'grammar-v2-c1-academic-coherence-23-q5',
      kind: 'gap',
      prompt: 'Supply the shell noun that encapsulates the preceding process: "The manufacturing sector shed twelve thousand jobs in November. This _____ reflected widespread automation in assembly plants." (contraction / decline)',
      options: [],
      acceptedAnswers: [
        { text: 'contraction', rationale: 'Shell noun contraction encapsulates industrial job losses.' },
        { text: 'decline', rationale: 'Accepts decline as an appropriate synonym.' },
        { text: 'reduction', rationale: 'Accepts reduction.' },
      ],
    },
    {
      id: 'grammar-v2-c1-academic-coherence-23-q6',
      kind: 'gap',
      prompt: 'Supply the demonstrative determiner packaging the previous clause as a singular theme: "Antibiotic misuse accelerates microbial resistance. _____ alarming trend threatens global public health."',
      options: [],
      acceptedAnswers: [
        { text: 'This', rationale: 'Demonstrative determiner This anaphorically binds the trend.' },
      ],
    },
    {
      id: 'grammar-v2-c1-academic-coherence-23-q7',
      kind: 'gap',
      prompt: 'Supply the formal cohesive phrase indicating contrast with previous assumptions: "_____, empirical observations failed to corroborate the initial hypothesis." (Contrary to expectations / In contrast)',
      options: [],
      acceptedAnswers: [
        { text: 'Contrary to expectations', rationale: 'Academic cohesive phrase signalling violated expectation.' },
        { text: 'Contrary to expectation', rationale: 'Accepts singular expectation variant.' },
        { text: 'In contrast', rationale: 'Accepts In contrast.' },
      ],
    },
    {
      id: 'grammar-v2-c1-academic-coherence-23-q8',
      kind: 'gap',
      prompt: 'Complete the correlative pair structuring parallel themes: "The study evaluated two distinct methodologies; the _____ yielded higher precision, whereas the latter exhibited superior computational efficiency." (former)',
      options: [],
      acceptedAnswers: [
        { text: 'former', rationale: 'The former correlates with the latter to maintain parallel thematic reference.' },
      ],
    },
    {
      id: 'grammar-v2-c1-academic-coherence-23-q9',
      kind: 'transform',
      prompt: 'Improve thematic coherence by rewriting the second sentence so that its Theme connects directly to the Rheme of the first: "The committee sanctioned an emergency liquidity package. Commercial banks received substantial emergency loans through this package."',
      options: [],
      acceptedAnswers: [
        { text: 'This package provided commercial banks with substantial emergency loans.', rationale: 'Fronts This package as Theme, creating seamless linear progression.' },
        { text: 'Through this package, commercial banks received substantial emergency loans.', rationale: 'Fronts prepositional phrase Through this package as circumstantial Theme.' },
      ],
    },
    {
      id: 'grammar-v2-c1-academic-coherence-23-q10',
      kind: 'transform',
      prompt: 'Rewrite to eliminate the mechanical connector "Moreover" using a retrospective shell noun phrase: "Solar cell efficiency improved by five percent. Moreover, manufacturing costs fell by ten percent."',
      options: [],
      acceptedAnswers: [
        { text: 'This technological advancement was accompanied by a ten-percent reduction in manufacturing costs.', rationale: 'Encapsulates improvement into This technological advancement, integrating both facts.' },
        { text: 'This efficiency gain was accompanied by a ten-percent reduction in manufacturing costs.', rationale: 'Accepts This efficiency gain variant.' },
        { text: 'This improvement was accompanied by a ten-percent reduction in manufacturing costs.', rationale: 'Accepts This improvement variant.' },
      ],
    },
    {
      id: 'grammar-v2-c1-academic-coherence-23-q11',
      kind: 'correction',
      prompt: 'Correct the fragmented, connector-heavy progression: "The company breached safety regulations. Furthermore, fines were imposed. Moreover, production stopped."',
      options: [],
      acceptedAnswers: [
        { text: 'The company breached safety regulations, resulting in punitive fines and the immediate suspension of production.', rationale: 'Consolidates choppy sentences into a cohesive cause-and-effect structure.' },
        { text: 'The company breached safety regulations, which resulted in punitive fines and the suspension of production.', rationale: 'Accepts sentential relative clause variant.' },
      ],
    },
    {
      id: 'grammar-v2-c1-academic-coherence-23-q12',
      kind: 'correction',
      prompt: 'Correct the violation of the Given-before-New principle: "The report detailed several security vulnerabilities. Unprecedented unauthorized database intrusions had exploited these vulnerabilities."',
      options: [],
      acceptedAnswers: [
        { text: 'These vulnerabilities had been exploited by unprecedented unauthorized database intrusions.', rationale: 'Passive voice places known referent These vulnerabilities in Theme position.' },
        { text: 'The report detailed several security vulnerabilities. These vulnerabilities had been exploited by unprecedented unauthorized database intrusions.', rationale: 'Accepts full two-sentence revision.' },
      ],
    },
  ],
  reviewExercises: [
    {
      id: 'grammar-v2-c1-academic-coherence-23-r1',
      kind: 'choice',
      prompt: 'Select the sentence that creates the smoothest thematic continuation: "The sovereign fund divested from fossil-fuel infrastructure."',
      options: [
        { text: 'This strategic reallocation directed capital toward renewable energy ventures.', correct: true, rationale: 'Nominalises the divestment into This strategic reallocation as Theme.' },
        { text: 'Capital was directed toward renewable energy ventures through this divestment.', correct: false, rationale: 'Buries the anaphoric link in an end-positioned prepositional phrase.' },
        { text: 'Furthermore, renewable energy ventures are attracting substantial investment today.', correct: false, rationale: 'Mechanical additive marker lacking direct cohesive thread.' },
      ],
      acceptedAnswers: [{ text: 'This strategic reallocation directed capital toward renewable energy ventures.', rationale: 'Impeccable thematic progression.' }],
    },
    {
      id: 'grammar-v2-c1-academic-coherence-23-r2',
      kind: 'gap',
      prompt: 'Supply the shell noun encapsulating the policy debate: "Lawmakers debated the introduction of progressive carbon tariffs. This contentious _____ dominated parliamentary proceedings." (issue / measure)',
      options: [],
      acceptedAnswers: [
        { text: 'issue', rationale: 'Shell noun issue encapsulates the policy debate.' },
        { text: 'measure', rationale: 'Accepts measure as valid legislative referent.' },
        { text: 'debate', rationale: 'Accepts debate.' },
      ],
    },
    {
      id: 'grammar-v2-c1-academic-coherence-23-r3',
      kind: 'transform',
      prompt: 'Restructure using passive voice to maintain Given-before-New alignment: "Scholars published a landmark treatise on linguistics. A renowned research consortium funded the publication."',
      options: [],
      acceptedAnswers: [
        { text: 'The publication was funded by a renowned research consortium.', rationale: 'Fronts known referent The publication as Theme.' },
        { text: 'This publication was funded by a renowned research consortium.', rationale: 'Accepts demonstrative determiner This publication.' },
        { text: 'Scholars published a landmark treatise on linguistics. The publication was funded by a renowned research consortium.', rationale: 'Accepts full two-sentence sequence.' },
        { text: 'Scholars published a landmark treatise on linguistics. This publication was funded by a renowned research consortium.', rationale: 'Accepts full two-sentence sequence with This.' },
      ],
    },
    {
      id: 'grammar-v2-c1-academic-coherence-23-r4',
      kind: 'correction',
      prompt: 'Eliminate the awkward repetitive transition: "The glacier retreated rapidly. In addition, sea levels rose as a consequence."',
      options: [],
      acceptedAnswers: [
        { text: 'The glacier retreated rapidly, precipitating a corresponding rise in sea levels.', rationale: 'Replaces In addition with participial result clause.' },
        { text: 'The glacier retreated rapidly, leading to a corresponding rise in sea levels.', rationale: 'Accepts leading to variant.' },
        { text: 'The glacier retreated rapidly, causing a corresponding rise in sea levels.', rationale: 'Accepts causing variant.' },
        { text: 'The glacier retreated rapidly, resulting in a corresponding rise in sea levels.', rationale: 'Accepts resulting in variant.' },
      ],
    },
  ],
  outputPrompts: [
    {
      id: 'grammar-v2-c1-academic-coherence-23-o1',
      prompt: 'Viết một đoạn văn ngắn 3 câu về một bước đột phá trong y học hoặc khoa học máy tính, áp dụng chặt chẽ tiến trình Đề - Thuyết tuyến tính (Linear Theme-Rheme Progression): phần thông tin mới (Rheme) ở cuối câu 1 phải trở thành chủ đề đã biết (Theme) mở đầu câu 2, và Rheme của câu 2 tiếp tục mở đầu câu 3, tuyệt đối không dùng các liên từ máy móc như Furthermore hay Moreover.',
      modelAnswer: 'Researchers synthesized a novel macromolecular compound capable of crossing the blood-brain barrier. This targeted delivery vehicle facilitates the precise administration of therapeutic enzymes directly to compromised neural tissues. Such localized enzymatic intervention significantly retards the degenerative progression of neurodegenerative pathologies.',
      checks: [
        'Câu 1 giới thiệu hợp chất mới ở Rheme.',
        'Câu 2 lấy hợp chất đó làm Theme (This targeted delivery vehicle) và nêu hành động mới ở Rheme.',
        'Câu 3 lấy hành động enzym đó làm Theme (Such localized enzymatic intervention) ở đầu câu.',
        'Không sử dụng các liên từ cơ học sáo mòn (Furthermore, Moreover, In addition).',
      ],
    },
    {
      id: 'grammar-v2-c1-academic-coherence-23-o2',
      prompt: 'Viết 2 câu phân tích một thất bại chính sách kinh tế hoặc môi trường, sử dụng một danh từ bao quát (shell noun: ví dụ "This structural deficit...", "This regulatory oversight...") để đóng gói toàn bộ mệnh đề trước thành chủ ngữ của câu sau theo nguyên tắc Given-before-New.',
      modelAnswer: 'Municipal authorities failed to mandate reinforced drainage embankments prior to zoning land for residential expansion. This regulatory oversight substantially magnified localized flood damage during subsequent torrential rainfall events.',
      checks: [
        'Câu đầu nêu hành động hoặc sự cố cụ thể.',
        'Câu hai mở đầu bằng danh từ bao quát (This regulatory oversight...) làm chủ ngữ tóm tắt.',
        'Mạch lạc ngữ nghĩa sâu sắc, diễn đạt đạt chuẩn C1.',
      ],
    },
  ],
  sources: [
    {
      id: 'halliday-hasan-cohesion',
      url: 'https://www.routledge.com/Cohesion-in-English/Halliday-Hasan/p/book/9780582550315',
      title: 'Halliday & Hasan: Cohesion in English: Thematic Structure and Lexical Cohesion',
      claims: [
        'Thematic progression provides the primary structural mechanism for discourse coherence in academic writing.',
        'The Given-before-New principle optimizes cognitive processing by aligning new information with end-focus.',
        'Lexical cohesion and shell nouns achieve seamless coherence without over-reliance on explicit conjunctive adjuncts.',
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
    summary: 'Comprehensive review completed. Academic coherence principles, Theme-Rheme progression, Given-before-New alignment, all 16 exercises, output prompts, and Halliday & Hasan sources verified.',
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

export default academicCoherenceLesson;
