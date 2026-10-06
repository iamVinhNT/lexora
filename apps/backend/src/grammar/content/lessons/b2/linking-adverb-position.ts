/**
 * @file linking-adverb-position.ts
 * @description B2 lesson 30: Positions of linking adverbs (initial, medial, and final) and punctuation conventions.
 */
import type { GrammarLesson } from '../../types.js';

const lesson: GrammarLesson = {
  id: 'grammar-v2-b2-linking-adverb-position-30',
  revisionId: 'grammar-v2-b2-linking-adverb-position-30@1.0.0',
  revision: '1.0.0',
  title: 'Vị trí của trạng từ liên kết và quy ước chấm câu (Linking Adverb Position and Punctuation)',
  objective: 'Làm chủ vị trí đầu câu (initial), giữa câu (medial) và cuối câu (final) của các trạng từ liên kết (however, therefore, nevertheless, furthermore, consequently) cùng quy tắc chấm câu nghiêm ngặt để tránh lỗi phẩy nối (comma splice).',
  prerequisiteIds: ['grammar-v2-b2-cohesion-ellipsis-29'],
  coverage: ['linking-adverb-position', 'discourse-markers', 'linking-adverbials', 'sentence-connectors', 'punctuation-rules'],
  context: {
    english: 'Scholarly writers, policy analysts, and courtroom advocates shift linking adverbs between initial, medial, and final positions to modulate thematic emphasis and control informational cadence.',
    vietnamese: 'Các tác giả học thuật, nhà phân tích chính sách và luật sư tranh tụng linh hoạt chuyển đổi vị trí của trạng từ liên kết giữa đầu câu, giữa câu và cuối câu để điều chỉnh trọng tâm nhấn mạnh và nhịp điệu của thông tin.',
  },
  guide: {
    pattern: 'Initial: However, S + V | Medial: S, however, + V | S + be/aux, however, + V | Final: S + V, however | Semicolon: Clause; therefore, Clause',
    whenToUse: [
      'Vị trí đầu câu (Initial position): Thiết lập ngay mối liên kết logic (tương phản, kết quả, bổ sung) cho mệnh đề tiếp theo (However, the committee voted against...).',
      'Vị trí giữa câu (Medial): thường được ngăn bằng dấu phẩy khi tạo thành thành phần chen giữa; dấu câu cụ thể có thể thay đổi theo cấu trúc và phong cách.',
      'Dùng dấu chấm phẩy trước trạng từ liên kết khi nối hai mệnh đề độc lập trong một câu; dấu chấm cũng có thể tách thành hai câu. Không dùng dấu phẩy đơn độc để nối chúng.',
      'Không nối hai mệnh đề độc lập chỉ bằng dấu phẩy trước however/therefore; dùng dấu chấm phẩy hoặc dấu chấm. Dấu câu ở vị trí khác phụ thuộc cú pháp.',
    ],
    signalWords: ['however', 'therefore', 'nevertheless', 'consequently', 'on the other hand'],
    check: [
      'Có dùng dấu chấm phẩy hoặc tách câu khi linking adverb nối hai mệnh đề độc lập không?',
      'Khi trạng từ liên kết được dùng như thành phần chen giữa, dấu phẩy thường bao quanh nó; không phải mọi vị trí giữa câu đều bắt buộc cùng một kiểu dấu câu.',
      'Phân biệt rõ "on the contrary" (phản bác lại một nhận định tiêu cực trước đó) và "in contrast / on the other hand" (so sánh hai khía cạnh đối lập)?',
    ],
  },
  explanation: 'Trạng từ liên kết (linking/conjunctive adverb) diễn tả quan hệ giữa các ý và có thể đứng đầu, giữa hoặc cuối mệnh đề; dấu câu phụ thuộc vị trí và cú pháp. Khi hai mệnh đề độc lập nằm trong cùng một câu, dấu phẩy đơn không đủ để nối chúng: thường dùng dấu chấm phẩy trước however/therefore và dấu phẩy sau, hoặc tách bằng dấu chấm. Dùng dấu phẩy để ngăn cách thành phần chen giữa hoặc trạng từ ở cuối khi cần theo cấu trúc. On the contrary thường phản bác một nhận định phủ định; on the other hand thường đặt hai khía cạnh cạnh nhau, nhưng khác biệt tùy lập luận.',
  examples: [
    {
      english: 'The initial laboratory results were promising; however, subsequent clinical trials failed to replicate them.',
      vietnamese: 'Kết quả ban đầu trong phòng thí nghiệm rất hứa hẹn; tuy nhiên, các thử nghiệm lâm sàng tiếp theo đã không thể tái hiện lại chúng.',
    },
    {
      english: 'The treasury, however, lacked the liquidity required to service the short-term sovereign debt.',
      vietnamese: 'Tuy nhiên, ngân khố lại thiếu thanh khoản cần thiết để chi trả cho khoản nợ công ngắn hạn.',
    },
    {
      english: 'The proposed regulations were considered burdensome; they were nevertheless adopted unanimously by the council.',
      vietnamese: 'Các quy định đề xuất bị coi là gánh nặng; dẫu vậy, chúng vẫn được hội đồng nhất trí thông qua.',
    },
    {
      english: 'The board was, therefore, compelled to solicit external management consultancy.',
      vietnamese: 'Hội đồng quản trị, vì lý do đó, đã buộc phải tìm kiếm sự tư vấn quản lý từ bên ngoài.',
    },
    {
      english: 'The treaty does not compromise national sovereignty; on the contrary, it strengthens collective security.',
      vietnamese: 'Hiệp ước không hề làm phương hại tới chủ quyền quốc gia; trái lại, nó củng cố an ninh tập thể.',
    },
    {
      english: 'Several manufacturing lines sustained damage during the storm; output remained steady, nevertheless.',
      vietnamese: 'Một số dây chuyền sản xuất bị hư hại trong cơn bão; dù vậy, sản lượng vẫn duy trì ổn định.',
    },
  ],
  contrasts: [
    {
      form: 'The methodology was innovative; however, the sample size was insufficient.',
      whyFits: 'Dùng dấu chấm phẩy trước however và dấu phẩy sau however để kết nối hai mệnh đề độc lập một cách chuẩn mực.',
      whyNot: '"The methodology was innovative, however the sample size was insufficient" mắc lỗi phẩy nối (comma splice) nghiêm trọng.',
    },
    {
      form: 'The economy did not contract during the winter quarter; on the contrary, consumer spending expanded by three percent.',
      whyFits: 'Dùng on the contrary để phản bác lại nhận định kinh tế suy giảm và nêu thực tế hoàn toàn trái ngược.',
      whyNot: '\"On the other hand\" thường mở ra một khía cạnh khác để so sánh; ở đây on the contrary nhấn mạnh kết quả trái với mệnh đề phủ định trước.',
    },
  ],
  commonMistakes: [
    'Mắc lỗi phẩy nối (comma splice): dùng dấu phẩy nối hai mệnh đề độc lập trước however hoặc therefore (ví dụ: viết "The road was blocked, therefore we turned back" thay vì "...blocked; therefore,...").',
    'Bỏ dấu câu cần thiết để làm rõ trạng từ liên kết chen giữa; dấu phẩy thường bao quanh thành phần chen giữa, tùy cấu trúc câu.',
    'Nhầm lẫn giữa "on the contrary" (bác bỏ mệnh đề phủ định trước đó) và "in contrast" (so sánh hai thực thể đối lập).',
  ],
  summary: 'Trạng từ liên kết như however, therefore, nevertheless có thể đứng đầu, giữa hoặc cuối câu; dấu câu phụ thuộc cấu trúc. Khi nối hai mệnh đề độc lập trong một câu, dùng dấu chấm phẩy trước trạng từ liên kết hoặc tách thành hai câu, không dùng dấu phẩy đơn độc.',
  exercises: [
    {
      id: 'grammar-v2-b2-linking-adverb-position-30-q1',
      kind: 'choice',
      prompt: 'Select the sentence that correctly punctuates a linking adverb between independent clauses:',
      options: [
        { text: 'The geological survey revealed vast lithium reserves; consequently, international mining consortiums bid aggressively.', correct: true, rationale: 'Semicolon before consequently and comma after it correctly punctuates two independent clauses.' },
        { text: 'The geological survey revealed vast lithium reserves, consequently, international mining consortiums bid aggressively.', correct: false, rationale: 'Comma splice: a comma cannot link two independent clauses with a conjunctive adverb.' },
        { text: 'The geological survey revealed vast lithium reserves consequently international mining consortiums bid aggressively.', correct: false, rationale: 'Run-on sentence lacking necessary punctuation.' },
        { text: 'The geological survey revealed vast lithium reserves; consequently international mining consortiums bid aggressively.', correct: false, rationale: 'Missing comma after conjunctive adverb consequently.' },
      ],
      acceptedAnswers: [{ text: 'The geological survey revealed vast lithium reserves; consequently, international mining consortiums bid aggressively.', rationale: 'Correct semicolon and comma punctuation with conjunctive adverb.' }],
    },
    {
      id: 'grammar-v2-b2-linking-adverb-position-30-q2',
      kind: 'choice',
      prompt: 'Choose the sentence with proper parenthetical punctuation for a medial linking adverb:',
      options: [
        { text: 'The new legislation, however, failed to address the underlying tax loopholes.', correct: true, rationale: 'Medial however is correctly set off by commas on both sides.' },
        { text: 'The new legislation however failed to address the underlying tax loopholes.', correct: false, rationale: 'Missing pair of commas around medial linking adverb.' },
        { text: 'The new legislation, however failed to address the underlying tax loopholes.', correct: false, rationale: 'Missing second comma after however.' },
        { text: 'The new legislation however, failed to address the underlying tax loopholes.', correct: false, rationale: 'Missing first comma before however.' },
      ],
      acceptedAnswers: [{ text: 'The new legislation, however, failed to address the underlying tax loopholes.', rationale: 'Medial however correctly flanked by commas.' }],
    },
    {
      id: 'grammar-v2-b2-linking-adverb-position-30-q3',
      kind: 'choice',
      prompt: 'Select the option that correctly uses "on the contrary" to refute a preceding negative statement:',
      options: [
        { text: 'The author was not discouraged by early rejections; on the contrary, each refusal fueled his literary determination.', correct: true, rationale: 'On the contrary correctly refutes the negative premise was not discouraged and asserts the opposite.' },
        { text: 'The author was discouraged by early rejections; on the contrary, he persevered.', correct: false, rationale: 'On the contrary requires a preceding negative proposition to refute.' },
        { text: 'The author was talented; on the contrary, his brother was an athlete.', correct: false, rationale: 'In contrast should be used for comparing two different entities, not on the contrary.' },
        { text: 'The novel was well written; on the contrary, it sold millions of copies.', correct: false, rationale: 'These ideas are complementary, not contradictory.' },
      ],
      acceptedAnswers: [{ text: 'The author was not discouraged by early rejections; on the contrary, each refusal fueled his literary determination.', rationale: 'On the contrary correctly refutes the negative clause.' }],
    },
    {
      id: 'grammar-v2-b2-linking-adverb-position-30-q4',
      kind: 'choice',
      prompt: 'Which sentence illustrates the final position of a linking adverb with correct punctuation?',
      options: [
        { text: 'The committee approved the capital expenditure; several members expressed deep reservations, nevertheless.', correct: true, rationale: 'Nevertheless in final position is correctly preceded by a comma.' },
        { text: 'The committee approved the capital expenditure; several members expressed deep reservations nevertheless.', correct: false, rationale: 'Missing comma before final linking adverb.' },
        { text: 'The committee approved the capital expenditure, several members expressed deep reservations, nevertheless.', correct: false, rationale: 'Comma splice linking the two main clauses.' },
        { text: 'The committee approved the capital expenditure; several members, expressed deep reservations nevertheless.', correct: false, rationale: 'Erroneous comma separating subject and verb.' },
      ],
      acceptedAnswers: [{ text: 'The committee approved the capital expenditure; several members expressed deep reservations, nevertheless.', rationale: 'Correct final linking adverb punctuation.' }],
    },
    {
      id: 'grammar-v2-b2-linking-adverb-position-30-q5',
      kind: 'gap',
      prompt: 'Fill in the linking adverb expressing result: "The software had severe security flaws; _____, the launch was postponed."',
      options: [],
      acceptedAnswers: [{ text: 'therefore', rationale: 'Therefore introduces a logical result.' }, { text: 'consequently', rationale: 'Consequently also introduces a causal result.' }],
    },
    {
      id: 'grammar-v2-b2-linking-adverb-position-30-q6',
      kind: 'gap',
      prompt: 'Complete the contrastive phrase refuting a negative claim: "The reform was not abandoned; on the _____, it was accelerated."',
      options: [],
      acceptedAnswers: [{ text: 'contrary', rationale: 'On the contrary refutes the negative assertion was not abandoned.' }],
    },
    {
      id: 'grammar-v2-b2-linking-adverb-position-30-q7',
      kind: 'gap',
      prompt: 'Fill in the concessive linking adverb: "The terrain was treacherous; the mountaineers pressed ahead, _____."',
      options: [],
      acceptedAnswers: [{ text: 'nevertheless', rationale: 'Nevertheless in final position conveys concession.' }, { text: 'however', rationale: 'However in final position conveys contrast.' }, { text: 'nonetheless', rationale: 'Nonetheless conveys concession.' }],
    },
    {
      id: 'grammar-v2-b2-linking-adverb-position-30-q8',
      kind: 'gap',
      prompt: 'Fill in the linking adverb for additive information: "The candidate has extensive managerial experience; _____, she is fluent in four languages."',
      options: [],
      acceptedAnswers: [{ text: 'furthermore', rationale: 'Furthermore introduces additional supporting evidence.' }, { text: 'moreover', rationale: 'Moreover also introduces supplementary positive facts.' }],
    },
    {
      id: 'grammar-v2-b2-linking-adverb-position-30-q9',
      kind: 'transform',
      prompt: 'Move the initial linking adverb "However" into medial position after the subject: "However, the final report failed to satisfy the regulatory agency."',
      options: [],
      acceptedAnswers: [
        { text: 'The final report, however, failed to satisfy the regulatory agency.', rationale: 'Places however in medial position enclosed by commas.' },
      ],
    },
    {
      id: 'grammar-v2-b2-linking-adverb-position-30-q10',
      kind: 'transform',
      prompt: 'Fix the comma splice error by repunctuating with a semicolon: "The factory exceeded its production quota, therefore all workers received a performance bonus."',
      options: [],
      acceptedAnswers: [
        { text: 'The factory exceeded its production quota; therefore, all workers received a performance bonus.', rationale: 'Substitutes semicolon for comma and adds comma after therefore.' },
      ],
    },
    {
      id: 'grammar-v2-b2-linking-adverb-position-30-q11',
      kind: 'correction',
      prompt: 'Correct the punctuation error in the medial adverb: "The board of directors however voted against the proposed acquisition."',
      options: [],
      acceptedAnswers: [
        { text: 'The board of directors, however, voted against the proposed acquisition.', rationale: 'Encloses medial however within a pair of commas.' },
      ],
    },
    {
      id: 'grammar-v2-b2-linking-adverb-position-30-q12',
      kind: 'correction',
      prompt: 'Correct the connector choice for comparing two different subjects: "Anna chose to study abroad; on the contrary, her twin brother stayed in their hometown."',
      options: [],
      acceptedAnswers: [
        { text: 'Anna chose to study abroad; in contrast, her twin brother stayed in their hometown.', rationale: 'Replaces on the contrary with in contrast for entity comparison.' },
        { text: 'Anna chose to study abroad; by contrast, her twin brother stayed in their hometown.', rationale: 'Uses by contrast for entity comparison.' },
      ],
    },
  ],
  reviewExercises: [
    {
      id: 'grammar-v2-b2-linking-adverb-position-30-r1',
      kind: 'choice',
      prompt: 'Select the sentence that avoids both a comma splice and punctuation omission:',
      options: [
        { text: 'The merger was heavily criticized by industry analysts; nevertheless, shareholder approval was secured.', correct: true, rationale: 'Standard semicolon and comma punctuation for conjunctive adverb.' },
        { text: 'The merger was heavily criticized by industry analysts, nevertheless shareholder approval was secured.', correct: false, rationale: 'Comma splice and missing post-adverb comma.' },
        { text: 'The merger was heavily criticized by industry analysts; nevertheless shareholder approval was secured.', correct: false, rationale: 'Missing comma following nevertheless.' },
      ],
      acceptedAnswers: [{ text: 'The merger was heavily criticized by industry analysts; nevertheless, shareholder approval was secured.', rationale: 'Semicolon before and comma after nevertheless is correct.' }],
    },
    {
      id: 'grammar-v2-b2-linking-adverb-position-30-r2',
      kind: 'gap',
      prompt: 'Fill in the linking adverb in medial position: "The proposed timeline was, _____, deemed unrealistic by the engineering leads."',
      options: [],
      acceptedAnswers: [{ text: 'therefore', rationale: 'Therefore expresses causal deduction in medial position.' }, { text: 'however', rationale: 'However expresses contrast in medial position.' }],
    },
    {
      id: 'grammar-v2-b2-linking-adverb-position-30-r3',
      kind: 'transform',
      prompt: 'Move "Therefore" to medial position after the modal auxiliary "was": "Therefore, the CEO was forced to step down."',
      options: [],
      acceptedAnswers: [
        { text: 'The CEO was, therefore, forced to step down.', rationale: 'Positions therefore medially between auxiliary was and participle forced, flanked by commas.' },
      ],
    },
    {
      id: 'grammar-v2-b2-linking-adverb-position-30-r4',
      kind: 'correction',
      prompt: 'Correct the comma splice: "Consumer demand slowed down, consequently retailers offered steep discounts."',
      options: [],
      acceptedAnswers: [
        { text: 'Consumer demand slowed down; consequently, retailers offered steep discounts.', rationale: 'Repunctuates with semicolon before consequently and comma after it.' },
      ],
    },
  ],
  outputPrompts: [
    {
      id: 'grammar-v2-b2-linking-adverb-position-30-o1',
      prompt: 'Viết 1-2 câu trong một bài báo cáo tài chính hoặc nghiên cứu thị trường, sử dụng trạng từ liên kết "however" hoặc "therefore" ở vị trí giữa câu (medial position) được bao bọc bởi hai dấu phẩy.',
      modelAnswer: 'The core business unit exceeded revenue forecasts for three consecutive quarters. The international branch, however, recorded substantial operating deficits due to currency fluctuations.',
      checks: [
        'Đặt trạng từ liên kết (however / therefore) ở vị trí giữa câu.',
        'Sử dụng đúng 2 dấu phẩy trước và sau trạng từ liên kết.',
        'Văn phong báo cáo tài chính học thuật, trang trọng.',
      ],
    },
    {
      id: 'grammar-v2-b2-linking-adverb-position-30-o2',
      prompt: 'Viết 1-2 câu sử dụng cấu trúc nối hai mệnh đề độc lập bằng dấu chấm phẩy (;) kèm "consequently" hoặc "nevertheless", hoặc dùng "on the contrary" sau một mệnh đề phủ định.',
      modelAnswer: 'The government did not weaken environmental emissions standards; on the contrary, it imposed stringent punitive taxes on industrial polluters.',
      checks: [
        'Sử dụng đúng quy tắc chấm câu với trạng từ liên kết hoặc dùng "on the contrary" phản bác mệnh đề phủ định trước.',
        'Tuyệt đối không mắc lỗi phẩy nối (comma splice).',
        'Lập luận mạch lạc, ngữ pháp hoàn chỉnh.',
      ],
    },
  ],
  sources: [
    {
      id: 'butte-college-conjunctive-adverbs',
      title: 'Butte College: Conjunctive adverbs and semicolons',
      url: 'https://www.butte.edu/departments/cas/tipsheets/grammar/conjunctive_adverbs.html',
      claims: [
        'Conjunctive adverbs connect two independent clauses with a semicolon before and a comma after.',
        'When used medially as parenthetical interruptions, conjunctive adverbs are enclosed in commas.',
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
