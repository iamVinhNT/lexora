/**
 * @file substitution-reference-precision.ts
 * @description C2 lesson: Advanced substitution techniques, anaphoric pro-forms, and reference precision.
 */
import type { GrammarLesson } from '../../types.js';

const lesson: GrammarLesson = {
  id: 'grammar-v2-c2-substitution-reference-precision-13',
  revisionId: 'grammar-v2-c2-substitution-reference-precision-13@1.0.0',
  revision: '1.0.0',
  title: 'Kỹ thuật thay thế và độ chuẩn xác của tham chiếu (Substitution & Reference Precision)',
  objective: 'Làm chủ các cơ chế thay thế cú pháp tinh tế (nominal, verbal, clausal substitution) và hệ thống hình thái đại diện (pro-forms: that/those of, so/not, do so, the former/the latter) nhằm triệt tiêu lỗi tham chiếu mơ hồ và đạt độ chính xác học thuật tối ưu.',
  prerequisiteIds: ['grammar-v2-c2-coordination-scope-12'],
  coverage: ['substitution-reference-precision', 'anaphora', 'pro-forms', 'comparative-substitution', 'c2-precision'],
  context: {
    english: 'In comparative jurisprudence and econometric monographs, authors employ precise pro-forms—such as "that of" and "those of"—to prevent illegitimate comparisons and maintain anaphoric rigor across extended paragraphs.',
    vietnamese: 'Trong khoa học pháp lý so sánh và các chuyên khảo kinh tế lượng, người viết sử dụng các đại từ thay thế chuẩn xác—như "that of" và "those of"—để ngăn ngừa so sánh khập khiễng và duy trì tính chặt chẽ trong chuỗi chiếu ứng xuyên suốt các đoạn văn dài.',
  },
  guide: {
    pattern: 'N1 + of + NP compared to [that of / those of + NP] hoặc S + V + O, and in [so doing / doing so], S + V',
    whenToUse: [
      'Dùng "that of" (số ít/không đếm được) và "those of" (số nhiều) trong các cấu trúc so sánh để tránh so sánh khập khiễng giữa thực thể và thuộc tính',
      'Sử dụng "do so" hoặc "in so doing" để thay thế cho toàn bộ một hành động vị ngữ phức tạp có chủ đích',
      'Vận dụng "the former" và "the latter" để định vị chính xác hai đối tượng đã được nêu mà không cần nhắc lại danh từ',
    ],
    signalWords: ['that of', 'those of', 'doing so', 'in so doing', 'the former', 'the latter', 'as such'],
    check: [
      'Đại từ thay thế "that" hay "those" có phù hợp về số (số ít vs số nhiều) với danh từ tiền ngữ không?',
      'Đại từ tham chiếu (pronoun reference) có tiền ngữ duy nhất không, hay đang nằm giữa hai danh từ tranh chấp?',
      '"Do so" có bị dùng nhầm cho động từ chỉ trạng thái (stative verbs) không (chỉ dùng "do so" cho dynamic verbs)?',
    ],
  },
  explanation: 'Thay thế (Substitution) khác với lược bỏ (Ellipsis) ở chỗ nó sử dụng một hình thái giả định (pro-form) để lấp đầy vị trí cú pháp thay vì để trống hoàn toàn. Ở trình độ C2, việc kiểm soát các hình thái thay thế là thước đo của tính chuẩn xác học thuật: (1) Thay thế danh từ trong so sánh: Một lỗi rất nặng trong tiếng Anh học thuật là so sánh đối tượng với thuộc tính (ví dụ: *"The tax rate of France is higher than Germany" thay vì "than that of Germany"); (2) Thay thế vị ngữ qua "do so": Cụm "do so" đòi hỏi động từ tiền ngữ phải là động từ hành động chủ ý (agentive dynamic verb), không thể dùng "do so" để thay thế cho nhận thức hoặc trạng thái vô thức (*"She knew the answer, and he did so too" -> sai, phải dùng "he did too"); (3) Thay thế mệnh đề qua "so" và "not": Dùng sau các động từ niềm tin/phát ngôn ("believe so", "hope not", "presume so"). Ngoài ra, hiện tượng "vague reference" (đại từ this/which trôi nổi không rõ tiền ngữ) phải được khắc phục bằng cách bổ sung danh từ tóm lược (summary noun: "this finding", "which development").',
  examples: [
    {
      english: 'The regulatory regime of the European Union is far more restrictive than that of the United States.',
      vietnamese: 'Chế độ quản lý của Liên minh Châu Âu khắt khe hơn nhiều so với chế độ quản lý của Hoa Kỳ (Dùng "that of" thay thế cho "the regulatory regime").',
    },
    {
      english: 'The yields on sovereign debt securities surpassed those of corporate bonds during the fiscal crisis.',
      vietnamese: 'Lợi suất của trái phiếu chính phủ đã vượt qua lợi suất của trái phiếu doanh nghiệp trong cuộc khủng hoảng tài chính (Dùng "those of" thay thế cho danh từ số nhiều "the yields").',
    },
    {
      english: 'The prime minister intended to dissolve the legislature, but in doing so, risked triggering constitutional chaos.',
      vietnamese: 'Thủ tướng có ý định giải tán cơ quan lập pháp, nhưng khi làm như vậy, ông đối mặt với nguy cơ kích hoạt sự hỗn loạn hiến pháp (Dùng "in doing so" chỉ hành động chủ ý).',
    },
    {
      english: 'The report evaluated quantitative austerity and monetary easing; the former reduced deficits, while the latter stimulated consumption.',
      vietnamese: 'Báo cáo đã đánh giá chính sách thắt lưng buộc bụng định lượng và nới lỏng tiền tệ; biện pháp trước làm giảm thâm hụt, trong khi biện pháp sau kích thích tiêu dùng (The former / the latter đối chiếu sắc sảo).',
    },
    {
      english: 'Whether institutional investors will divest from fossil fuels remains uncertain, though prominent analysts believe so.',
      vietnamese: 'Liệu các nhà đầu tư tổ chức có thoái vốn khỏi nhiên liệu hóa thạch hay không vẫn chưa chắc chắn, mặc dù các nhà phân tích lỗi lạc tin như vậy (Clausal substitution với "believe so").',
    },
    {
      english: 'The treaty signatory failed to submit its annual emissions declaration, an omission that violated multilateral covenants.',
      vietnamese: 'Bên ký kết điều ước đã không nộp bản tuyên bố phát thải hàng năm, một sự thiếu sót vi phạm các thỏa ước đa phương (Dùng danh từ tóm lược "an omission" thay vì dùng đại từ mơ hồ "which").',
    },
  ],
  contrasts: [
    {
      form: 'Illegitimate Direct Comparison vs Precision Substitution with "that of"',
      whyFits: '"The GDP trajectory of emerging economies differs markedly from that of advanced industrial nations" so sánh rành mạch quỹ đạo GDP này với quỹ đạo GDP kia.',
      whyNot: '"*The GDP trajectory of emerging economies differs markedly from advanced industrial nations" là lỗi so sánh khập khiễng phi logic (so sánh quỹ đạo với các quốc gia).',
    },
    {
      form: 'Dynamic "do so" vs Stative Verb Ellipsis',
      whyFits: '"The board decided to initiate an audit, and management did so immediately" dùng "did so" thay cho hành động chủ ý "initiated an audit".',
      whyNot: '"*The witness recognized the defendant, and the detective did so too" vi phạm điều kiện ngữ nghĩa: "recognize" là động từ nhận thức/trạng thái, phải dùng trợ động từ "did too" thay vì pro-form "did so".',
    },
  ],
  commonMistakes: [
    'So sánh khập khiễng (faulty comparison) khi bỏ sót "that of" hoặc "those of", dẫn đến so sánh thuộc tính của vật này với bản thân vật khác.',
    'Dùng "do so" để thay thế cho một động từ chỉ trạng thái, cảm giác hoặc sở hữu (stative verbs).',
    'Dùng đại từ "this" hoặc "which" đứng trơ trọi để trỏ về cả đoạn văn dài mà không đi kèm danh từ quy chiếu (như "this decision", "this anomaly").',
  ],
  summary: 'Sử dụng pro-forms (that of, those of, do so) đúng từ loại và ngữ nghĩa để loại bỏ so sánh khập khiễng và bảo đảm tính tường minh tuyệt đối của hệ thống chiếu ứng.',
  exercises: [
    {
      id: 'grammar-v2-c2-substitution-reference-precision-13-q1',
      kind: 'choice',
      prompt: 'Chọn câu so sánh học thuật chuẩn xác, không mắc lỗi so sánh khập khiễng (faulty comparison).',
      options: [
        { text: 'The administrative burden imposed on small enterprises is considerably lighter than that imposed on multinational corporations.', correct: true, rationale: '"that imposed on" thay thế chính xác cho cụm danh từ số ít "The administrative burden".' },
        { text: 'The administrative burden imposed on small enterprises is considerably lighter than multinational corporations.', correct: false, rationale: 'So sánh khập khiễng giữa gánh nặng hành chính và các tập đoàn đa quốc gia.' },
        { text: 'The administrative burden imposed on small enterprises is considerably lighter than those of multinational corporations.', correct: false, rationale: 'Dùng sai số nhiều "those" cho danh từ số ít không đếm được "burden".' },
      ],
      acceptedAnswers: [{ text: 'The administrative burden imposed on small enterprises is considerably lighter than that imposed on multinational corporations.', rationale: 'Thay thế bằng that danh từ số ít hoàn hảo.' }],
    },
    {
      id: 'grammar-v2-c2-substitution-reference-precision-13-q2',
      kind: 'choice',
      prompt: 'Xác định câu sử dụng "do so" hợp lệ về mặt ngữ nghĩa hành động (agentive action).',
      options: [
        { text: 'The compliance officer instructed employees to encrypt sensitive emails, and most did so promptly.', correct: true, rationale: 'Encrypt emails là hành vi có chủ đích (agentive dynamic action), cho phép thay thế bằng "did so".' },
        { text: 'The director understood the intricate implications of the treaty, and the ministers did so as well.', correct: false, rationale: 'Understand là động từ nhận thức trạng thái (stative/cognitive), không kết hợp với "did so".' },
        { text: 'The prototype resembled an early aviation engine, and subsequent models did so too.', correct: false, rationale: 'Resemble là động từ quan hệ tĩnh (relational stative), không dùng được với "did so".' },
      ],
      acceptedAnswers: [{ text: 'The compliance officer instructed employees to encrypt sensitive emails, and most did so promptly.', rationale: 'Động từ hành động chủ ý tương thích tuyệt đối với pro-form do so.' }],
    },
    {
      id: 'grammar-v2-c2-substitution-reference-precision-13-q3',
      kind: 'choice',
      prompt: 'Chọn phương án sử dụng "the former / the latter" định vị hai khái niệm chính xác và tự nhiên.',
      options: [
        { text: 'The committee deliberated on fiscal austerity and quantitative easing; the former curtailed government spending, whereas the latter expanded the money supply.', correct: true, rationale: 'The former trỏ về fiscal austerity, the latter trỏ về quantitative easing, đối xứng và sáng rõ.' },
        { text: 'The committee deliberated on fiscal austerity, monetary intervention, and tax reform; the former succeeded, but the latter failed.', correct: false, rationale: 'Khi có ba đối tượng trở lên, không được dùng the former / the latter (phải dùng the first / the last).' },
        { text: 'The committee deliberated on fiscal austerity; the latter was widely supported.', correct: false, rationale: 'Chỉ có một đối tượng duy nhất nên không thể dùng the latter.' },
      ],
      acceptedAnswers: [{ text: 'The committee deliberated on fiscal austerity and quantitative easing; the former curtailed government spending, whereas the latter expanded the money supply.', rationale: 'The former / the latter dùng chuẩn xác cho cặp đối tượng đôi.' }],
    },
    {
      id: 'grammar-v2-c2-substitution-reference-precision-13-q4',
      kind: 'choice',
      prompt: 'Chọn câu khắc phục thành công lỗi đại từ quy chiếu trôi nổi (broad reference) bằng danh từ tóm lược.',
      options: [
        { text: 'The central bank raised interest rates by seventy-five basis points, a policy shift that surprised international bond markets.', correct: true, rationale: 'Cụm danh từ đồng vị "a policy shift that..." tóm lược toàn bộ hành động phía trước, loại bỏ tính mơ hồ.' },
        { text: 'The central bank raised interest rates by seventy-five basis points, which surprised everyone.', correct: false, rationale: 'Đại từ "which" trôi nổi thiếu tính trang trọng và sắc bén của văn phong C2.' },
        { text: 'The central bank raised interest rates by seventy-five basis points; this was unexpected.', correct: false, rationale: 'Đại từ "this" đứng độc lập dễ gây tranh cãi về tiền ngữ trực tiếp.' },
      ],
      acceptedAnswers: [{ text: 'The central bank raised interest rates by seventy-five basis points, a policy shift that surprised international bond markets.', rationale: 'Danh từ tóm lược (summary noun) tạo liên kết mạch lạc đỉnh cao.' }],
    },
    {
      id: 'grammar-v2-c2-substitution-reference-precision-13-q5',
      kind: 'gap',
      prompt: 'Điền đại từ thay thế số nhiều chỉ vật trong so sánh: "The living standards of Scandinavian citizens consistently rank higher than ___ of their southern counterparts."',
      options: [],
      acceptedAnswers: [
        { text: 'those', rationale: '"those of" thay thế cho cụm danh từ số nhiều "The living standards".' },
      ],
    },
    {
      id: 'grammar-v2-c2-substitution-reference-precision-13-q6',
      kind: 'gap',
      prompt: 'Điền từ thay thế mệnh đề phủ định sau động từ hy vọng: "Will the sovereign debt default trigger a regional banking panic? Observers fervently hope ___."',
      options: [],
      acceptedAnswers: [
        { text: 'not', rationale: '"hope not" là cấu trúc thay thế mệnh đề phủ định tiêu chuẩn (clausal substitution).' },
      ],
    },
    {
      id: 'grammar-v2-c2-substitution-reference-precision-13-q7',
      kind: 'gap',
      prompt: 'Điền từ hoàn thành cụm thay thế hành động phương thức: "The company sought to undercut its competitors, and in ___ doing, it precipitated a disastrous price war."',
      options: [],
      acceptedAnswers: [
        { text: 'so', rationale: '"in so doing" là thành ngữ thay thế hành động nguyên nhân - hệ quả trang trọng.' },
      ],
    },
    {
      id: 'grammar-v2-c2-substitution-reference-precision-13-q8',
      kind: 'gap',
      prompt: 'Điền đại từ thay thế số ít: "The historical context of the French Revolution cannot be equated with ___ of the American War of Independence."',
      options: [],
      acceptedAnswers: [
        { text: 'that', rationale: '"that of" thay thế cho danh từ số ít "The historical context".' },
      ],
    },
    {
      id: 'grammar-v2-c2-substitution-reference-precision-13-q9',
      kind: 'transform',
      prompt: 'Viết lại câu sau bằng cách dùng "those of" để loại trừ lỗi so sánh khập khiễng: "The carbon emissions of industrialized economies are four times higher than developing countries." -> "The carbon emissions of industrialized economies are four times higher than ___."',
      options: [],
      acceptedAnswers: [
        { text: 'those of developing countries', rationale: 'Dùng "those of" để đối ứng với danh từ số nhiều "carbon emissions".' },
      ],
    },
    {
      id: 'grammar-v2-c2-substitution-reference-precision-13-q10',
      kind: 'transform',
      prompt: 'Rút gọn mệnh đề sau bằng pro-form "do so": "Researchers who wish to obtain raw census datasets must apply for security clearance before researchers obtain raw census datasets." -> "Researchers who wish to obtain raw census datasets must apply for security clearance before ___."',
      options: [],
      acceptedAnswers: [
        { text: 'doing so', rationale: '"before doing so" thay thế gọn gàng cho việc lặp lại cụm động từ dài.' },
      ],
    },
    {
      id: 'grammar-v2-c2-substitution-reference-precision-13-q11',
      kind: 'correction',
      prompt: 'Sửa lỗi dùng sai "did so" đối với động từ chỉ trạng thái tri giác: "The chief justice felt great misgivings about the procedural irregularities, and the associate justices did so as well."',
      options: [],
      acceptedAnswers: [
        { text: 'The chief justice felt great misgivings about the procedural irregularities, and the associate justices did as well.', rationale: 'Bỏ "so" vì "felt" là động từ trạng thái cảm giác; dùng trợ động từ "did as well" thay vì pro-form "did so".' },
        { text: 'The chief justice had great misgivings about the procedural irregularities, as did the associate justices.', rationale: 'Dùng cấu trúc as did thay thế.' },
        { text: 'the associate justices did as well', rationale: 'Mệnh đề sau dùng trợ động từ did as well thay vì pro-form did so.' },
        { text: 'did as well', rationale: 'Trợ động từ did as well đối ứng với động từ trạng thái felt.' },
      ],
    },
    {
      id: 'grammar-v2-c2-substitution-reference-precision-13-q12',
      kind: 'correction',
      prompt: 'Sửa lỗi so sánh trực tiếp thiếu đại từ thay thế trong câu: "The legal framework in Singapore is often compared to the United Kingdom."',
      options: [],
      acceptedAnswers: [
        { text: 'The legal framework in Singapore is often compared to that of the United Kingdom.', rationale: 'Thêm "that of" để so sánh khuôn khổ pháp lý với khuôn khổ pháp lý.' },
        { text: 'The legal framework in Singapore is often compared to that in the United Kingdom.', rationale: 'Thêm "that in" để đối ứng chính xác.' },
        { text: 'that of the United Kingdom', rationale: 'Cụm đại từ thay thế số ít that of the United Kingdom.' },
        { text: 'that in the United Kingdom', rationale: 'Cụm đại từ thay thế số ít that in the United Kingdom.' },
      ],
    },
  ],
  reviewExercises: [
    {
      id: 'grammar-v2-c2-substitution-reference-precision-13-r1',
      kind: 'choice',
      prompt: 'Chọn câu so sánh số liệu kinh tế đạt độ chuẩn xác học thuật cao nhất.',
      options: [
        { text: 'The labor productivity gains recorded in modern manufacturing far outstrip those achieved in traditional agriculture.', correct: true, rationale: '"those achieved in" thay thế chính xác cho danh từ số nhiều "productivity gains".' },
        { text: 'The labor productivity gains recorded in modern manufacturing far outstrip traditional agriculture.', correct: false, rationale: 'Lỗi so sánh khập khiễng nghiêm trọng giữa năng suất và ngành nông nghiệp.' },
        { text: 'The labor productivity gains recorded in modern manufacturing far outstrip that achieved in traditional agriculture.', correct: false, rationale: 'Dùng sai đại từ số ít "that" cho danh từ số nhiều gains.' },
      ],
      acceptedAnswers: [{ text: 'The labor productivity gains recorded in modern manufacturing far outstrip those achieved in traditional agriculture.', rationale: 'Thay thế số nhiều chuẩn mực.' }],
    },
    {
      id: 'grammar-v2-c2-substitution-reference-precision-13-r2',
      kind: 'gap',
      prompt: 'Điền từ thay thế mệnh đề khẳng định: "Will the appellate court sustain the original verdict? Legal scholars firmly expect ___."',
      options: [],
      acceptedAnswers: [
        { text: 'so', rationale: '"expect so" là clausal substitution khẳng định.' },
      ],
    },
    {
      id: 'grammar-v2-c2-substitution-reference-precision-13-r3',
      kind: 'transform',
      prompt: 'Viết lại câu sau bằng cách dùng "that of" để tạo phép so sánh đối ứng: "The political stability of modern Switzerland resembles 19th-century Britain." -> "The political stability of modern Switzerland resembles ___."',
      options: [],
      acceptedAnswers: [
        { text: 'that of 19th-century Britain', rationale: 'Thay thế cho danh từ số ít trừu tượng "The political stability".' },
      ],
    },
    {
      id: 'grammar-v2-c2-substitution-reference-precision-13-r4',
      kind: 'correction',
      prompt: 'Sửa lỗi so sánh không đối ứng trong câu: "The architectural preservation policies of Kyoto are much stricter than Tokyo."',
      options: [],
      acceptedAnswers: [
        { text: 'The architectural preservation policies of Kyoto are much stricter than those of Tokyo.', rationale: 'Thêm "those of" để thay thế cho danh từ số nhiều "policies".' },
        { text: 'those of Tokyo', rationale: 'Đại từ thay thế số nhiều those of Tokyo.' },
      ],
    },
  ],
  outputPrompts: [
    {
      id: 'grammar-v2-c2-substitution-reference-precision-13-o1',
      prompt: 'Viết 2-3 câu phân tích kinh tế hoặc chính sách so sánh hai quốc gia/tổ chức, sử dụng ít nhất một cấu trúc thay thế bằng "that of" hoặc "those of" để loại trừ hoàn toàn so sánh khập khiễng.',
      modelAnswer: 'The fiscal vulnerabilities confronting Southern European economies diverge significantly from those observed in Northern member states. While the debt-to-GDP ratio of Greece exceeds two hundred percent, that of Denmark remains well within established Maastricht thresholds.',
      checks: [
        'Sử dụng chính xác pro-form "those" hoặc "that" đi kèm giới từ "of" trong so sánh đối xứng',
        'Bảo đảm sự phù hợp về số lượng giữa đại từ thay thế và danh từ tiền ngữ',
        'Không phạm lỗi so sánh khập khiễng (faulty comparison)',
      ],
    },
    {
      id: 'grammar-v2-c2-substitution-reference-precision-13-o2',
      prompt: 'Viết một câu trích từ bài luận học thuật sử dụng pro-form "in doing so" hoặc "do so" để kết nối một chuỗi hành vi có chủ đích, và một câu dùng danh từ tóm lược (summary noun) để làm rõ tiền ngữ.',
      modelAnswer: 'The statutory authority elected to deregulate wholesale telecommunications markets; in doing so, it dismantled decades of protective tariff barriers. This unprecedented liberalization fundamentally restructured consumer pricing across the entire continent.',
      checks: [
        'Sử dụng đúng cấu trúc "in doing so" hoặc "do so" với động từ hành động chủ ý',
        'Sử dụng danh từ tóm lược (như "This liberalization") để định danh tiền ngữ mạch lạc',
        'Đạt chuẩn văn phong học thuật C2',
      ],
    },
  ],
  sources: [
    {
      id: 'halliday-hasan-cohesion',
      title: 'Cohesion in English (Halliday & Hasan: Chapter 3 - Substitution)',
      url: 'https://www.routledge.com/Cohesion-in-English/Halliday-Hasan/p/book/9780582550414',
      claims: ['Substitution operates as a grammatical relation holding between linguistic forms', 'Pro-forms replace specific syntactic constituents without leaving structural gaps'],
      checkedAt: '2026-10-05',
      provenance: 'reference-only',
    },
    {
      id: 'cgel-anaphora-proforms',
      title: 'The Cambridge Grammar of the English Language (Chapter 17: Anaphora and Pro-forms)',
      url: 'https://www.cambridge.org/core/books/cambridge-grammar-of-the-english-language/AFD6DE78E568F873DE6EE0C1A7416353',
      claims: ['That of and those of function as restrictive anaphoric determinatives in comparative clauses', 'Do so requires an agentive dynamic antecedent predicate'],
      checkedAt: '2026-10-05',
      provenance: 'reference-only',
    },
  ],
  review: {
    status: 'approved',
    mode: 'ai-internal',
    reviewer: 'ai-internal-reviewer',
    reviewedAt: '2026-10-06T00:00:00.000Z',
    summary: 'Thorough C2 editorial review completed: verified nominal/verbal/clausal substitution, pro-forms, 16 exercises, outputs, and canonical sources.',
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
