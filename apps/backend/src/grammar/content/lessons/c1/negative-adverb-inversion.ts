/**
 * @file negative-adverb-inversion.ts
 * @description C1 lesson on inversion following initial negative and restrictive adverbials.
 */
import type { GrammarLesson } from '../../types.js';

const negativeAdverbInversionLesson: GrammarLesson = {
  id: 'grammar-v2-c1-negative-adverb-inversion-01',
  revisionId: 'grammar-v2-c1-negative-adverb-inversion-01@1.0.0',
  revision: '1.0.0',
  title: 'Đảo ngữ sau phó từ phủ định và hạn định (Negative Adverb Inversion)',
  objective: 'Vận dụng trật tự trợ động từ đứng trước chủ ngữ sau các phó từ phủ định và hạn định đặt ở đầu câu để tạo sắc thái trang trọng, kịch tính và học thuật.',
  prerequisiteIds: ['grammar-v2-b2-linking-adverb-position-30'],
  coverage: ['negative-adverb-inversion', 'inversion', 'rarely-seldom-never', 'hardly-scarcely-barely', 'formal-emphasis'],
  context: {
    english: 'In academic papers, formal speeches, and high-register journalism, placing negative or restrictive adverbs at the front elevates emphasis and creates dramatic cadence.',
    vietnamese: 'Trong văn bản học thuật, diễn văn trang trọng và báo chí cao cấp, đưa phó từ phủ định hoặc hạn định lên đầu câu giúp tăng tính biểu cảm, tạo nhịp điệu hùng biện và nhấn mạnh ý nghĩa.',
  },
  guide: {
    pattern: 'Negative / Restrictive Adverbial + Auxiliary Verb + Subject + Main Verb (+ Clause)',
    whenToUse: [
      'Nhấn mạnh mức độ hiếm hoi, chưa từng có hoặc tính phủ định tuyệt đối của hành động trong văn phong trang trọng.',
      'Diễn tả hai sự việc xảy ra nối tiếp nhau gần như ngay tức khắc (Hardly / Scarcely / Barely had S + V3 when S + V2).',
      'Đưa nhận xét mang tính tu từ, cảnh báo nghiêm ngặt (Under no circumstances, At no time).',
    ],
    signalWords: ['rarely', 'seldom', 'never before', 'hardly... when', 'scarcely... when', 'barely... when', 'little did', 'at no time', 'under no circumstances'],
    check: [
      'Đã đưa trợ động từ thích hợp (do/does/did/have/had/modal/be) lên trước chủ ngữ chưa?',
      'Động từ chính sau did/do/does có giữ dạng nguyên mẫu không chia không?',
      'Mệnh đề sau "when" trong cấu trúc hardly/scarcely/barely có giữ trật tự tự nhiên (không đảo ngữ) không?',
    ],
  },
  explanation: 'Đảo ngữ với phó từ phủ định (Negative Inversion) là hiện tượng đảo trợ động từ (auxiliary) lên trước chủ ngữ khi các phó từ hoặc cụm giới từ mang nghĩa phủ định/hạn định được chuyển lên đầu câu nhằm mục đích tu từ. Nếu câu gốc không có trợ động từ, ta bắt buộc phải mượn do/does/did và chuyển động từ chính về dạng nguyên thể. Cần lưu ý các cặp liên từ thời gian: Hardly / Scarcely / Barely kết hợp với "when", tuyệt đối không dùng "than" (vốn chỉ đi với No sooner). Mệnh đề phụ theo sau "when" vẫn giữ trật tự câu khẳng định bình thường.',
  examples: [
    {
      english: 'Rarely have international observers witnessed such decisive institutional reform.',
      vietnamese: 'Hiếm khi nào các quan sát viên quốc tế lại được chứng kiến một cuộc cải cách thể chế mang tính quyết định đến vậy.',
    },
    {
      english: 'Seldom does an analytical framework challenge decades of conventional economic wisdom.',
      vietnamese: 'Hiếm khi một khung phân tích lại thách thức hàng thập kỷ tri thức kinh tế truyền thống.',
    },
    {
      english: 'Never before had the diplomatic mission faced such severe geopolitical turbulence.',
      vietnamese: 'Chưa bao giờ phái đoàn ngoại giao phải đối mặt với biến động địa chính trị dữ dội đến mức này.',
    },
    {
      english: 'Hardly had the summit concluded when delegates began drafting the preliminary communique.',
      vietnamese: 'Hội nghị thượng đỉnh vừa mới kết thúc thì các đại biểu đã bắt tay ngay vào soạn thảo thông cáo sơ bộ.',
    },
    {
      english: 'At no time did the central bank signal an immediate increase in baseline borrowing costs.',
      vietnamese: 'Không một thời điểm nào ngân hàng trung ương phát tín hiệu về việc tăng lãi suất cơ bản ngay lập tức.',
    },
    {
      english: 'Little did the founding partners realize that the initial prototype would redefine digital publishing.',
      vietnamese: 'Các đối tác sáng lập chẳng hề hay biết rằng mẫu thử nghiệm ban đầu ấy sẽ tái định hình ngành xuất bản kỹ thuật số.',
    },
  ],
  contrasts: [
    {
      form: 'Seldom do independent analysts endorse unvetted fiscal projections.',
      whyFits: 'Đưa seldom lên đầu câu tạo giọng điệu học thuật chuẩn mực, đòi hỏi mượn trợ động từ do đứng trước danh từ số nhiều analysts.',
      whyNot: '"Seldom independent analysts endorse..." vi phạm ngữ pháp vì thiếu đảo trợ động từ. "Analysts seldom endorse..." đúng ngữ pháp nhưng là trật tự trung tính, thiếu sức nặng nhấn mạnh.',
    },
    {
      form: 'Hardly had the verdict been announced when protests erupted outside the courthouse.',
      whyFits: 'Hardly đứng đầu câu yêu cầu đảo thì quá khứ hoàn thành (had the verdict been announced) và kết nối với mệnh đề sau bằng "when".',
      whyNot: '"Hardly had the verdict been announced than protests erupted..." sai vì dùng nhầm "than" thay cho "when" (chỉ No sooner mới dùng than).',
    },
  ],
  commonMistakes: [
    'Quên đảo trợ động từ sau phó từ phủ định đứng đầu câu (viết "Rarely we see" thay vì "Rarely do we see").',
    'Vẫn chia động từ chính ở quá khứ sau trợ động từ did (viết "Little did they realized" thay vì "Little did they realize").',
    'Dùng nhầm "than" trong cấu trúc Hardly / Scarcely thay vì "when".',
  ],
  summary: 'Khi đặt phó từ phủ định hoặc hạn định (rarely, seldom, hardly, at no time...) ở đầu câu, luôn đảo trợ động từ lên trước chủ ngữ. Động từ chính sau do/does/did giữ nguyên mẫu; cấu trúc hardly/scarcely luôn đi liền với "when".',
  exercises: [
    {
      id: 'grammar-v2-c1-negative-adverb-inversion-01-q1',
      kind: 'choice',
      prompt: 'Select the grammatically correct inverted sentence for formal academic discourse.',
      options: [
        { text: 'Seldom do peer-reviewed studies dismiss qualitative data so cursorily.', correct: true, rationale: 'Seldom at sentence head triggers inversion with auxiliary do preceding plural subject studies.' },
        { text: 'Seldom peer-reviewed studies do dismiss qualitative data so cursorily.', correct: false, rationale: 'Auxiliary do must precede the subject, not follow it.' },
        { text: 'Seldom peer-reviewed studies dismiss qualitative data so cursorily.', correct: false, rationale: 'Fails to invert the auxiliary verb when seldom begins the sentence.' },
        { text: 'Seldom are peer-reviewed studies dismiss qualitative data so cursorily.', correct: false, rationale: 'Incorrect auxiliary are paired with bare infinitive dismiss.' },
      ],
      acceptedAnswers: [{ text: 'Seldom do peer-reviewed studies dismiss qualitative data so cursorily.', rationale: 'Correct inversion of auxiliary do before the subject.' }],
    },
    {
      id: 'grammar-v2-c1-negative-adverb-inversion-01-q2',
      kind: 'choice',
      prompt: 'Complete the correlative inversion: "Hardly had the treaty entered into force ___ renegotiation demands arose."',
      options: [
        { text: 'when', correct: true, rationale: 'Hardly... when is the canonical correlative pairing in English inversion.' },
        { text: 'than', correct: false, rationale: 'Than is used with no sooner, not with hardly.' },
        { text: 'then', correct: false, rationale: 'Then is informal and incorrect as a subordinator here.' },
        { text: 'that', correct: false, rationale: 'That is grammatically invalid in this correlative inversion.' },
      ],
      acceptedAnswers: [{ text: 'when', rationale: 'Hardly pairs with when.' }],
    },
    {
      id: 'grammar-v2-c1-negative-adverb-inversion-01-q3',
      kind: 'choice',
      prompt: 'Choose the correct formal inversion for emphasis: "At no point ___ the board contemplate liquidation."',
      options: [
        { text: 'did', correct: true, rationale: 'Negative phrase at no point requires auxiliary did before subject the board, followed by base verb contemplate.' },
        { text: 'was', correct: false, rationale: 'Was cannot be the auxiliary for the transitive active verb contemplate here.' },
        { text: 'had', correct: false, rationale: 'Had requires a past participle (contemplated), not base form contemplate.' },
        { text: 'would', correct: false, rationale: 'Would changes modal meaning without supporting context.' },
      ],
      acceptedAnswers: [{ text: 'did', rationale: 'Did is the correct auxiliary followed by base verb contemplate.' }],
    },
    {
      id: 'grammar-v2-c1-negative-adverb-inversion-01-q4',
      kind: 'choice',
      prompt: 'Identify the correct inversion with "Little": "Little ___ the impending fiscal overhaul."',
      options: [
        { text: 'did the executives foresee', correct: true, rationale: 'Little + did + subject + base verb correctly forms the inverted structure.' },
        { text: 'did the executives foresaw', correct: false, rationale: 'Foresaw is incorrect because auxiliary did must be followed by base form foresee.' },
        { text: 'the executives foresaw', correct: false, rationale: 'Uninverted order is ungrammatical when restrictive little is fronted.' },
        { text: 'foresee did the executives', correct: false, rationale: 'Main verb cannot precede auxiliary and subject.' },
      ],
      acceptedAnswers: [{ text: 'did the executives foresee', rationale: 'Correct negative inversion pattern.' }],
    },
    {
      id: 'grammar-v2-c1-negative-adverb-inversion-01-q5',
      kind: 'gap',
      prompt: 'Complete the sentence with the appropriate inverted auxiliary: "Rarely _____ (have / had) such divergent viewpoints coalesced so harmoniously into unified policy."',
      options: [],
      acceptedAnswers: [
        { text: 'have', rationale: 'Present perfect auxiliary have correctly pairs with plural subject viewpoints.' },
        { text: 'had', rationale: 'Past perfect had is accepted if contextualized in past narrative.' },
      ],
    },
    {
      id: 'grammar-v2-c1-negative-adverb-inversion-01-q6',
      kind: 'gap',
      prompt: 'Complete the time correlative: "Scarcely had the press release been distributed _____ questions flooded the communications desk."',
      options: [],
      acceptedAnswers: [{ text: 'when', rationale: 'Scarcely requires the subordinator when.' }],
    },
    {
      id: 'grammar-v2-c1-negative-adverb-inversion-01-q7',
      kind: 'gap',
      prompt: 'Supply the missing inverted auxiliary: "Under no circumstances _____ visitors permitted to enter the archival vault unescorted."',
      options: [],
      acceptedAnswers: [{ text: 'are', rationale: 'Passive auxiliary are agrees with plural subject visitors.' }],
    },
    {
      id: 'grammar-v2-c1-negative-adverb-inversion-01-q8',
      kind: 'gap',
      prompt: 'Supply the past auxiliary for the fronted restrictive adverb: "Little _____ the investigative journalist anticipate the global reaction to her expose."',
      options: [],
      acceptedAnswers: [{ text: 'did', rationale: 'Past auxiliary did precedes subject the investigative journalist.' }],
    },
    {
      id: 'grammar-v2-c1-negative-adverb-inversion-01-q9',
      kind: 'transform',
      prompt: 'Rewrite the sentence starting with "Never before": "The medical academy had never before endorsed such an experimental therapy."',
      options: [],
      acceptedAnswers: [
        { text: 'Never before had the medical academy endorsed such an experimental therapy.', rationale: 'Fronts Never before, inverts had before subject the medical academy.' },
      ],
    },
    {
      id: 'grammar-v2-c1-negative-adverb-inversion-01-q10',
      kind: 'transform',
      prompt: 'Rewrite the sentence starting with "Barely": "The aircraft had barely touched down when severe turbulence shook the runway infrastructure."',
      options: [],
      acceptedAnswers: [
        { text: 'Barely had the aircraft touched down when severe turbulence shook the runway infrastructure.', rationale: 'Fronts Barely with past perfect auxiliary had inverted before subject the aircraft.' },
      ],
    },
    {
      id: 'grammar-v2-c1-negative-adverb-inversion-01-q11',
      kind: 'correction',
      prompt: 'Correct the error in this inverted sentence: "Seldom the committee grants an exemption without verifying third-party documentation."',
      options: [],
      acceptedAnswers: [
        { text: 'Seldom does the committee grant an exemption without verifying third-party documentation.', rationale: 'Adds auxiliary does before singular subject the committee and uses base verb grant.' },
      ],
    },
    {
      id: 'grammar-v2-c1-negative-adverb-inversion-01-q12',
      kind: 'correction',
      prompt: 'Correct the error in this inverted sentence: "Hardly had the keynote concluded than attendees submitted their feedback."',
      options: [],
      acceptedAnswers: [
        { text: 'Hardly had the keynote concluded when attendees submitted their feedback.', rationale: 'Replaces than with the correct subordinator when.' },
      ],
    },
  ],
  reviewExercises: [
    {
      id: 'grammar-v2-c1-negative-adverb-inversion-01-r1',
      kind: 'choice',
      prompt: 'Choose the correct inverted clause: "At no time ___ informed of the impending corporate restructuring."',
      options: [
        { text: 'were the departmental heads', correct: true, rationale: 'Auxiliary were precedes plural subject departmental heads.' },
        { text: 'the departmental heads were', correct: false, rationale: 'Uninverted structure after negative fronting is incorrect.' },
        { text: 'did the departmental heads were', correct: false, rationale: 'Cannot combine auxiliary did with auxiliary were.' },
      ],
      acceptedAnswers: [{ text: 'were the departmental heads', rationale: 'Correct passive inversion with were.' }],
    },
    {
      id: 'grammar-v2-c1-negative-adverb-inversion-01-r2',
      kind: 'gap',
      prompt: 'Fill in the correct auxiliary: "Rarely _____ a single administrative error produced such widespread logistical chaos."',
      options: [],
      acceptedAnswers: [{ text: 'has', rationale: 'Present perfect singular auxiliary has matches single administrative error.' }],
    },
    {
      id: 'grammar-v2-c1-negative-adverb-inversion-01-r3',
      kind: 'transform',
      prompt: 'Rewrite with "Seldom": "Scholars seldom debate the foundational authenticity of this manuscript."',
      options: [],
      acceptedAnswers: [
        { text: 'Seldom do scholars debate the foundational authenticity of this manuscript.', rationale: 'Inverts auxiliary do before plural subject scholars.' },
      ],
    },
    {
      id: 'grammar-v2-c1-negative-adverb-inversion-01-r4',
      kind: 'correction',
      prompt: 'Correct the sentence: "Little did the project director knew about the budgetary deficit."',
      options: [],
      acceptedAnswers: [
        { text: 'Little did the project director know about the budgetary deficit.', rationale: 'Changes knew to base verb know following auxiliary did.' },
      ],
    },
  ],
  outputPrompts: [
    {
      id: 'grammar-v2-c1-negative-adverb-inversion-01-o1',
      prompt: 'Viết 1-2 câu học thuật sử dụng cấu trúc đảo ngữ với "Rarely" hoặc "Little did" để bình luận về một bước ngoặt bất ngờ trong nghiên cứu công nghệ hoặc lịch sử.',
      modelAnswer: 'Rarely have bioinformaticians observed such rapid algorithmic evolution in genomic sequence analysis. Little did the initial research cohort realize that their open-source pipeline would reshape personalized oncology within a single decade.',
      checks: [
        'Sử dụng phó từ phủ định đứng đầu câu (Rarely / Little did).',
        'Đảo đúng trợ động từ (have/did/had) lên trước chủ ngữ.',
        'Động từ chính giữ nguyên mẫu sau did hoặc phân từ đúng thì sau have/had.',
      ],
    },
    {
      id: 'grammar-v2-c1-negative-adverb-inversion-01-o2',
      prompt: 'Viết 1-2 câu trong diễn văn trang trọng dùng "Hardly had... when..." hoặc "Under no circumstances" để thiết lập một quy tắc ứng xử hoặc miêu tả sự chuyển biến khẩn cấp.',
      modelAnswer: 'Under no circumstances should authenticated personnel share encryption credentials outside secure audit protocols. Hardly had the security breach been detected when the automated safeguards quarantined the compromised nodes.',
      checks: [
        'Sử dụng cụm từ Under no circumstances hoặc cấu trúc Hardly had... when...',
        'Áp dụng trật tự đảo ngữ chính xác cho mệnh đề chính.',
        'Văn phong trang trọng, diễn đạt mạch lạc và tự nhiên.',
      ],
    },
  ],
  sources: [
    {
      id: 'british-council-inversion-after-negative-adverbials',
      title: 'British Council LearnEnglish: Inversion after negative adverbials',
      url: 'https://learnenglish.britishcouncil.org/free-resources/grammar/c1/inversion-after-negative-adverbials',
      claims: [
        'Negative and limiting adverbs placed at sentence start cause subject-verb inversion.',
        'Auxiliary verb precedes subject; do/does/did is added when no other auxiliary is present.',
        'Hardly, scarcely, and barely pair with when to describe rapid succession of past events.',
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
    summary: 'Comprehensive review completed. Inverted negative adverbial patterns, do-support, transfer items, and reference-only provenance verified.',
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

export default negativeAdverbInversionLesson;
