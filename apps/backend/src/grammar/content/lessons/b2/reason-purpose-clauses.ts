/**
 * @file reason-purpose-clauses.ts
 * @description B2 lesson 23: Clauses of reason and purpose (as, since, because, so that, in order that, so as to).
 */
import type { GrammarLesson } from '../../types.js';

const lesson: GrammarLesson = {
  id: 'grammar-v2-b2-reason-purpose-clauses-23',
  revisionId: 'grammar-v2-b2-reason-purpose-clauses-23@1.0.0',
  revision: '1.0.0',
  title: 'Mệnh đề chỉ nguyên nhân và mục đích (Clauses of Reason and Purpose)',
  objective: 'Phân biệt và vận dụng chuẩn xác các liên từ chỉ nguyên nhân (because, since, as, seeing that) và chỉ mục đích (so that, in order that, in order to, so as not to), nắm vững sự phối hợp thì và trợ động từ tình thái.',
  prerequisiteIds: ['grammar-v2-b2-relative-clause-prepositions-22'],
  coverage: ['reason-purpose-clauses', 'clauses-of-reason', 'clauses-of-purpose', 'so-that-in-order-that', 'so-as-not-to'],
  context: {
    english: 'In strategic proposals and research summaries, writers clearly separate underlying causal factors (reason) from intended future objectives (purpose) through specialized conjunctions and modal auxiliaries.',
    vietnamese: 'Trong các đề xuất chiến lược và tóm tắt nghiên cứu, người viết phân tách rành mạch giữa các yếu tố nguyên nhân thực tế (lý do) và mục tiêu hướng tới tương lai (mục đích) bằng các liên từ chuyên dụng và trợ động từ tình thái.',
  },
  guide: {
    pattern: 'Reason: Because / Since / As + S + V | Purpose: S + V + so that / in order that + S + modal + V | in order (not) to / so as (not) to + V',
    whenToUse: [
      'Dùng "as" và "since" khi lý do đã được người nghe/đọc biết từ trước hoặc ít quan trọng hơn mệnh đề chính; "because" nhấn mạnh trực tiếp vào nguyên nhân mới.',
      'Dùng "so that" hoặc "in order that" với modal thường gặp như can, could, may, might hoặc would để làm rõ mục đích; cách chia phụ thuộc thời gian và ngữ cảnh.',
      'Dùng "in order to" hoặc "so as to" khi hai vế có cùng chủ ngữ; với mục đích phủ định, "so as not to" và "in order not to" thường rõ ý, nhưng không phải các lựa chọn duy nhất.',
    ],
    signalWords: ['so that', 'in order that', 'so as not to', 'since', 'seeing that'],
    check: [
      'Sau "so that / in order that", chọn dạng động từ theo thời gian và ý nghĩa; mệnh đề mục đích thường có modal, nhưng không phải lúc nào cũng bắt buộc.',
      'Với mục đích phủ định cùng chủ ngữ, "so as not to" hoặc "in order not to" thường là lựa chọn rõ ràng; một số cấu trúc khác cũng có thể tự nhiên theo ngữ cảnh.',
      'Phân biệt rõ giữa mục đích (so that + modal) và kết quả (so + fact clause)?',
    ],
  },
  explanation: '1) Mệnh đề chỉ nguyên nhân: Because thường nêu trực tiếp lý do; as và since thường mở đầu thông tin được xem là đã biết hoặc ít trọng tâm hơn. 2) Mệnh đề chỉ mục đích: so that và in order that thường nêu mục tiêu bằng một mệnh đề hữu hạn, thường có modal phù hợp thời gian và ý nghĩa (The guard locked the gate so that the visitors could enter through reception). Với cùng chủ ngữ, in order to và so as to là các lựa chọn phổ biến; phủ định có thể dùng in order not to hoặc so as not to. Chọn cấu trúc theo ngữ cảnh, không coi một hình thức là bắt buộc trong mọi câu.',
  examples: [
    {
      english: 'Since all team members were present, the chairman commenced the meeting immediately.',
      vietnamese: 'Vì tất cả các thành viên trong nhóm đã có mặt, chủ tọa đã bắt đầu cuộc họp ngay lập tức.',
    },
    {
      english: 'We installed additional solar panels so that we could reduce our dependence on the national grid.',
      vietnamese: 'Chúng tôi đã lắp đặt thêm pin mặt trời để có thể giảm bớt sự phụ thuộc vào lưới điện quốc gia.',
    },
    {
      english: 'The technician wore protective gloves so as not to contaminate the sterile laboratory samples.',
      vietnamese: 'Kỹ thuật viên đã đeo găng tay bảo hộ để không làm nhiễm bẩn các mẫu xét nghiệm vô trùng trong phòng thí nghiệm.',
    },
    {
      english: 'As temperatures dropped below freezing overnight, the municipal council salted the main roads.',
      vietnamese: 'Do nhiệt độ giảm xuống dưới mức đóng băng trong đêm, hội đồng thành phố đã rải muối lên các trục đường chính.',
    },
    {
      english: 'The software architecture was refactored in order that future modules might be integrated seamlessly.',
      vietnamese: 'Kiến trúc phần mềm đã được tái cấu trúc để các mô-đun trong tương lai có thể được tích hợp một cách liền mạch.',
    },
    {
      english: 'Seeing that demand for organic produce has surged, local farmers have expanded their greenhouse acreage.',
      vietnamese: 'Xét thấy nhu cầu về nông sản hữu cơ đã tăng vọt, các nông dân địa phương đã mở rộng diện tích nhà kính.',
    },
  ],
  contrasts: [
    {
      form: 'She locked the filing cabinet so that unauthorized staff could not access client dossiers.',
      whyFits: 'Dùng so that + could not access để chỉ mục đích phòng ngừa (hành động dự kiến trong tương lai).',
      whyNot: '"She locked the filing cabinet because unauthorized staff accessed client dossiers" biến sự việc thành lý do quá khứ (nhân viên đã xâm nhập hồ sơ rồi).',
    },
    {
      form: 'We left at dawn so as not to get caught in holiday traffic.',
      whyFits: 'Mục đích phủ định với cùng chủ ngữ bắt buộc phải dùng so as not to (hoặc in order not to).',
      whyNot: '\"We left at dawn not to get caught in holiday traffic\" có thể được hiểu là mục đích nhưng dễ mơ hồ hoặc kém tự nhiên; so as not to / in order not to nêu mục đích rõ hơn.',
    },
  ],
  commonMistakes: [
    'Dùng bare "not to + V" trong ngữ cảnh mà cụm này không thể hiện rõ mục đích; "so as not to" hoặc "in order not to" thường làm quan hệ mục đích tường minh hơn.',
    'Bỏ modal trong một số mệnh đề mục đích mà ý định/khả năng cần được nêu rõ (ví dụ: "She spoke slowly so that we could understand"); lựa chọn thì và modal phụ thuộc ngữ cảnh.',
    'Nhầm lẫn giữa "so that" (chỉ mục đích: để mà) và "so" đơn thuần (chỉ kết quả: vì vậy mà).',
  ],
  summary: 'Because, since, as nêu lý do; so that / in order that thường nêu mục đích trong mệnh đề hữu hạn, thường với modal; in order to / so as to và dạng phủ định của chúng thường dùng khi cùng chủ ngữ. Chọn theo thời gian và ngữ cảnh.',
  exercises: [
    {
      id: 'grammar-v2-b2-reason-purpose-clauses-23-q1',
      kind: 'choice',
      prompt: 'Select the correct conjunction and modal combination for purpose: "The instructions were simplified ___ users ___ navigate the interface effortlessly."',
      options: [
        { text: 'so that / could', correct: true, rationale: 'So that followed by modal could expresses the intended purpose in the past.' },
        { text: 'because / can', correct: false, rationale: 'Because denotes an existing cause, not an intended objective, and can does not match past tense.' },
        { text: 'since / must', correct: false, rationale: 'Since introduces a known reason rather than purpose.' },
        { text: 'in order / should', correct: false, rationale: 'In order requires that to introduce a clause.' },
      ],
      acceptedAnswers: [{ text: 'so that / could', rationale: 'So that paired with could correctly forms a clause of purpose.' }],
    },
    {
      id: 'grammar-v2-b2-reason-purpose-clauses-23-q2',
      kind: 'choice',
      prompt: 'Choose the correct form to express negative purpose: "He whispered ___ awaken the sleeping infant."',
      options: [
        { text: 'so as not to', correct: true, rationale: 'So as not to is the standard expression for negative purpose with an infinitive.' },
        { text: 'not to', correct: false, rationale: 'Bare not to is non-standard and avoided in purpose expressions.' },
        { text: 'for not to', correct: false, rationale: 'For not to is ungrammatical in standard English.' },
        { text: 'so that not', correct: false, rationale: 'So that not requires a full clause with subject and modal auxiliary.' },
      ],
      acceptedAnswers: [{ text: 'so as not to', rationale: 'So as not to correctly expresses negative purpose.' }],
    },
    {
      id: 'grammar-v2-b2-reason-purpose-clauses-23-q3',
      kind: 'choice',
      prompt: 'Select the most natural reason conjunction when the cause is already known to the listener: "___ the budget has been approved, we can recruit two engineers."',
      options: [
        { text: 'Since', correct: true, rationale: 'Since introduces a known background fact serving as the reason for the ensuing decision.' },
        { text: 'So that', correct: false, rationale: 'So that expresses purpose, not reason.' },
        { text: 'In order that', correct: false, rationale: 'In order that introduces purpose clauses.' },
        { text: 'So as to', correct: false, rationale: 'So as to requires an infinitive phrase, not a finite clause.' },
      ],
      acceptedAnswers: [{ text: 'Since', rationale: 'Since is appropriate for introducing a known cause.' }],
    },
    {
      id: 'grammar-v2-b2-reason-purpose-clauses-23-q4',
      kind: 'choice',
      prompt: 'Which sentence correctly demonstrates a clause of purpose with a modal verb?',
      options: [
        { text: 'The hospital purchased backup generators in order that power would not be disrupted during blackouts.', correct: true, rationale: 'In order that with subject power and modal auxiliary would correctly expresses purpose.' },
        { text: 'The hospital purchased backup generators in order that power disrupted during blackouts.', correct: false, rationale: 'Missing required modal auxiliary and passive verb structure.' },
        { text: 'The hospital purchased backup generators because power would not be disrupted during blackouts.', correct: false, rationale: 'Because distorts the intended meaning by treating future prevention as an antecedent cause.' },
        { text: 'The hospital purchased backup generators so as power would not be disrupted.', correct: false, rationale: 'So as cannot introduce a finite that-clause.' },
      ],
      acceptedAnswers: [{ text: 'The hospital purchased backup generators in order that power would not be disrupted during blackouts.', rationale: 'Correct clause of purpose with modal auxiliary.' }],
    },
    {
      id: 'grammar-v2-b2-reason-purpose-clauses-23-q5',
      kind: 'gap',
      prompt: 'Fill in the gap to complete the negative purpose phrase: "She set three consecutive alarms so as _____ to overslept for her morning flight."',
      options: [],
      acceptedAnswers: [{ text: 'not', rationale: 'Not is placed between as and to in so as not to.' }],
    },
    {
      id: 'grammar-v2-b2-reason-purpose-clauses-23-q6',
      kind: 'gap',
      prompt: 'Complete the purpose clause conjunction: "The security cameras were upgraded _____ that guards could monitor the perimeter clearly."',
      options: [],
      acceptedAnswers: [{ text: 'so', rationale: 'So that introduces a clause of purpose.' }, { text: 'in order', rationale: 'In order that also introduces a clause of purpose.' }],
    },
    {
      id: 'grammar-v2-b2-reason-purpose-clauses-23-q7',
      kind: 'gap',
      prompt: 'Fill in the reason conjunction meaning "considering the fact that": "_____ that sales have dropped by thirty percent, the board must reconsider production targets."',
      options: [],
      acceptedAnswers: [{ text: 'Seeing', rationale: 'Seeing that is a formal conjunction expressing reason based on observable reality.' }],
    },
    {
      id: 'grammar-v2-b2-reason-purpose-clauses-23-q8',
      kind: 'gap',
      prompt: 'Complete the infinitive of purpose: "The pharmaceutical firm accelerated trials in _____ to release the medication before winter."',
      options: [],
      acceptedAnswers: [{ text: 'order', rationale: 'In order to is the standard phrase expressing purpose with an infinitive.' }],
    },
    {
      id: 'grammar-v2-b2-reason-purpose-clauses-23-q9',
      kind: 'transform',
      prompt: 'Combine using "so that" and a modal auxiliary: "We took detailed notes during the lecture. We wanted to be able to revise effectively later."',
      options: [],
      acceptedAnswers: [
        { text: 'We took detailed notes during the lecture so that we could revise effectively later.', rationale: 'Combines the two sentences using so that and modal could.' },
      ],
    },
    {
      id: 'grammar-v2-b2-reason-purpose-clauses-23-q10',
      kind: 'transform',
      prompt: 'Rewrite using "so as not to": "The athlete rested her injured ankle because she did not want to aggravate the ligament strain."',
      options: [],
      acceptedAnswers: [
        { text: 'The athlete rested her injured ankle so as not to aggravate the ligament strain.', rationale: 'Expresses negative purpose using so as not to.' },
      ],
    },
    {
      id: 'grammar-v2-b2-reason-purpose-clauses-23-q11',
      kind: 'correction',
      prompt: 'Correct the error in the negative purpose clause: "The librarian spoke in a whisper not to disturb the patrons."',
      options: [],
      acceptedAnswers: [
        { text: 'The librarian spoke in a whisper so as not to disturb the patrons.', rationale: 'Replaces bare not to with so as not to.' },
        { text: 'The librarian spoke in a whisper in order not to disturb the patrons.', rationale: 'Replaces bare not to with in order not to.' },
      ],
    },
    {
      id: 'grammar-v2-b2-reason-purpose-clauses-23-q12',
      kind: 'correction',
      prompt: 'Correct the purpose clause lacking a modal: "We insulated the attic so that the house stays warmer during the winter blizzard."',
      options: [],
      acceptedAnswers: [
        { text: 'We insulated the attic so that the house would stay warmer during the winter blizzard.', rationale: 'Adds past modal would to match past main clause insulated.' },
        { text: 'We insulated the attic so that the house could stay warmer during the winter blizzard.', rationale: 'Adds past modal could for ability/purpose.' },
      ],
    },
  ],
  reviewExercises: [
    {
      id: 'grammar-v2-b2-reason-purpose-clauses-23-r1',
      kind: 'choice',
      prompt: 'Select the sentence that accurately uses a purpose clause in formal writing:',
      options: [
        { text: 'Diplomats drafted an interim accord so that negotiations might continue without interruption.', correct: true, rationale: 'So that with modal might expresses formal intended purpose.' },
        { text: 'Diplomats drafted an interim accord because negotiations might continue without interruption.', correct: false, rationale: 'Because distorts the meaning by presenting the intended continuation as an existing cause.' },
        { text: 'Diplomats drafted an interim accord so that negotiations continue without interruption.', correct: false, rationale: 'Omits the necessary modal auxiliary in a purpose clause.' },
      ],
      acceptedAnswers: [{ text: 'Diplomats drafted an interim accord so that negotiations might continue without interruption.', rationale: 'Correct formal purpose clause with modal might.' }],
    },
    {
      id: 'grammar-v2-b2-reason-purpose-clauses-23-r2',
      kind: 'gap',
      prompt: 'Fill in the negative purpose connector: "The team checked the calculations twice in _____ not to overlook any mathematical discrepancies."',
      options: [],
      acceptedAnswers: [{ text: 'order', rationale: 'In order not to forms the standard negative purpose infinitive.' }],
    },
    {
      id: 'grammar-v2-b2-reason-purpose-clauses-23-r3',
      kind: 'transform',
      prompt: 'Rewrite using "in order that": "They restructured the debt to allow the enterprise to avoid bankruptcy."',
      options: [],
      acceptedAnswers: [
        { text: 'They restructured the debt in order that the enterprise might avoid bankruptcy.', rationale: 'Uses in order that with modal might.' },
        { text: 'They restructured the debt in order that the enterprise could avoid bankruptcy.', rationale: 'Uses in order that with modal could.' },
      ],
    },
    {
      id: 'grammar-v2-b2-reason-purpose-clauses-23-r4',
      kind: 'correction',
      prompt: 'Correct the error in purpose phrasing: "He left his credit cards at home not to spend money impulsively."',
      options: [],
      acceptedAnswers: [
        { text: 'He left his credit cards at home so as not to spend money impulsively.', rationale: 'Replaces non-standard not to with so as not to.' },
        { text: 'He left his credit cards at home in order not to spend money impulsively.', rationale: 'Replaces non-standard not to with in order not to.' },
      ],
    },
  ],
  outputPrompts: [
    {
      id: 'grammar-v2-b2-reason-purpose-clauses-23-o1',
      prompt: 'Viết 1-2 câu trong một kế hoạch dự án hoặc quản lý rủi ro, sử dụng "so that + could/might" để nêu rõ mục đích của các biện pháp an toàn đã áp dụng.',
      modelAnswer: 'The engineering team installed redundant pressure sensors so that the control system could detect micro-leaks instantaneously. Emergency shut-off valves were automated in order that operators might prevent catastrophic failures.',
      checks: [
        'Sử dụng mệnh đề chỉ mục đích với so that hoặc in order that.',
        'Đi kèm với trợ động từ tình thái phù hợp (could / might / would).',
        'Ngữ cảnh kỹ thuật hoặc quản lý dự án mạch lạc.',
      ],
    },
    {
      id: 'grammar-v2-b2-reason-purpose-clauses-23-o2',
      prompt: 'Viết 1-2 câu diễn tả lý do và mục đích phòng ngừa bằng cấu trúc "Since / As..." kết hợp với "so as not to + V".',
      modelAnswer: 'Since the contract contained complex confidentiality clauses, our legal advisors reviewed every paragraph so as not to breach non-disclosure agreements.',
      checks: [
        'Mở đầu bằng liên từ chỉ nguyên nhân (Since hoặc As).',
        'Sử dụng cấu trúc mục đích phủ định "so as not to + V".',
        'Hai vế câu liên kết chặt chẽ về ngữ nghĩa.',
      ],
    },
  ],
  sources: [
    {
      id: 'cambridge-clauses-reason-purpose',
      title: 'Cambridge Grammar: Clauses of reason and purpose',
      url: 'https://dictionary.cambridge.org/grammar/british-grammar/clauses-of-purpose-and-result',
      claims: [
        'Clauses of purpose with so that and in order that usually contain modal verbs (can, could, may, might, would).',
        'Negative purpose is often expressed with so as not to or in order not to; other infinitive constructions can express purpose depending on context.',
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
