/**
 * @file cohesion-substitution.ts
 * @description B2 lesson 28: Cohesion through substitution (nominal, verbal, and clausal substitution).
 */
import type { GrammarLesson } from '../../types.js';

const lesson: GrammarLesson = {
  id: 'grammar-v2-b2-cohesion-substitution-28',
  revisionId: 'grammar-v2-b2-cohesion-substitution-28@1.0.0',
  revision: '1.0.0',
  title: 'Liên kết văn bản bằng phép thế (Cohesion through Substitution)',
  objective: 'Vận dụng chuẩn xác các cơ chế thế danh từ (one/ones, the same), thế động từ (do so, do that) và thế mệnh đề (so/not sau think, hope, believe, if so/if not) để tránh lặp từ và tạo tính mạch lạc trong văn bản học thuật và chuyên nghiệp.',
  prerequisiteIds: ['grammar-v2-b2-preposition-dependent-patterns-27'],
  coverage: ['cohesion-substitution', 'substitution-one-ones', 'do-so-substitution', 'so-not-substitution', 'textual-cohesion'],
  context: {
    english: 'Skilled authors and technical communicators maintain textual economy and seamless flow by substituting whole nouns, predicate verb phrases, or propositions with specialized pro-forms.',
    vietnamese: 'Các tác giả lành nghề và chuyên gia truyền thông kỹ thuật duy trì tính súc tích và mạch lạc tự nhiên bằng cách thay thế toàn bộ danh từ, cụm vị ngữ động từ hoặc mệnh đề bằng các dạng từ thế chuyên dụng.',
  },
  guide: {
    pattern: 'Nominal: one / ones / the same | Verbal: do so / do that / do it | Clausal: S + believe/think/hope + so / not | If so / If not',
    whenToUse: [
      'Dùng "one / ones" để thay thế danh từ đếm được đã nhắc trước đó (a new car -> a reliable one; older models -> newer ones).',
      'Dùng "do so" trong văn phong học thuật/trang trọng để thay thế cho cụm động từ hành động có chủ đích (dynamic deliberate action).',
      'Dùng "so" hoặc "not" để thay thế cho cả một mệnh đề sau các động từ nhận thức/tường thuật (think so, hope not, believe so).',
      'Dùng "if so" (nếu đúng như vậy) và "if not" (nếu không phải vậy) để tạo liên kết điều kiện súc tích giữa hai câu.',
    ],
    signalWords: ['do so', 'hope not', 'if so', 'newer ones', 'the same'],
    check: [
      'Có dùng "one/ones" để thay thế danh từ không đếm được không? (Tuyệt đối không dùng *a one cho danh từ không đếm được; dùng some/any hoặc it).',
      'Động từ được thay thế bằng "do so" có phải là động từ hành động (action) không? (Không dùng "do so" cho động từ trạng thái như know, like, resemble).',
      'Phủ định của "hope" là "I hope not" (không dùng *I don’t hope so); phủ định của "think" thường là "I don’t think so" (ít dùng *I think not)?',
    ],
  },
  explanation: 'Phép thế (Substitution) là một công cụ liên kết ngữ pháp (grammatical cohesion) thay thế một thành phần câu đã xuất hiện bằng một từ thay thế ngắn gọn. 1) Phép thế danh từ (Nominal substitution): "one" (số ít) và "ones" (số nhiều) thay cho danh từ đếm được (I didn’t like that hotel, so we found a better one). Khi thay thế danh từ không đếm được, ta dùng "some" hoặc đại từ quy chiếu "it" chứ không dùng "one". "The same" thay thế cho cùng đối tượng hoặc hành động (She ordered salmon, and I did the same). 2) Phép thế động từ (Verbal substitution): "do so" là dạng trang trọng nhất, thay thế cho động từ hành động chủ ý cùng tân ngữ/bổ ngữ (The board requested that he step down, but he refused to do so). "Do it" hoặc "do that" mang tính thân mật hơn hoặc nhấn mạnh đối tượng cụ thể. Lưu ý: Không dùng "do so" với các động từ chỉ trạng thái (stative verbs) như like, understand, belong. 3) Phép thế mệnh đề (Clausal substitution): Dùng "so" để khẳng định và "not" để phủ định một mệnh đề sau các động từ như think, believe, expect, suppose, hope, say, fear. Quy ước phủ định tự nhiên: Với think/believe/suppose/expect, ta thường phủ định động từ chính: "I don’t think so". Với hope/fear/afraid, ta giữ khẳng định và thêm "not" ở vế thế: "I hope not" (tuyệt đối không dùng *I don’t hope so). Trong lập luận, "if so" và "if not" là liên từ súc tích tuyệt vời để nối các bước điều kiện.',
  examples: [
    {
      english: 'The old transmission tower was decommissioned, and a much taller one was erected on the ridge.',
      vietnamese: 'Tháp phát sóng cũ đã ngừng hoạt động, và một tháp cao hơn nhiều đã được dựng lên trên sườn núi.',
    },
    {
      english: 'The regulations prohibit unauthorized access, and anyone who attempts to do so will be prosecuted.',
      vietnamese: 'Các quy định nghiêm cấm việc xâm nhập trái phép, và bất kỳ ai cố tình làm như vậy sẽ bị truy tố.',
    },
    {
      english: 'Will the fiscal stimulus prevent a recession? Economists certainly hope so.',
      vietnamese: 'Liệu gói kích thích tài khóa có ngăn chặn được suy thoái? Các nhà kinh tế chắc chắn hy vọng như vậy.',
    },
    {
      english: 'Is the system vulnerable to foreign cyberattacks? Security analysts certainly fear so.',
      vietnamese: 'Hệ thống có dễ bị tổn thương trước các cuộc tấn công mạng từ nước ngoài không? Các chuyên gia an ninh chắc chắn lo sợ như vậy.',
    },
    {
      english: 'Should the inflation rate surge further, interest rates will rise; if not, borrowing costs will remain steady.',
      vietnamese: 'Nếu tỷ lệ lạm phát tăng mạnh hơn nữa, lãi suất sẽ tăng; nếu không, chi phí vay mượn sẽ giữ nguyên ổn định.',
    },
    {
      english: 'She decided to withdraw her application, and her research partner promptly did the same.',
      vietnamese: 'Cô ấy quyết định rút đơn đăng ký của mình, và người cộng sự nghiên cứu của cô ấy cũng nhanh chóng làm điều tương tự.',
    },
  ],
  contrasts: [
    {
      form: 'Will it rain during the outdoor convocation? — I hope not.',
      whyFits: 'Dùng I hope not vì động từ hope tạo phủ định của phép thế mệnh đề bằng not trực tiếp phía sau.',
      whyNot: '"I don’t hope so" là cách nói phi ngữ pháp và không tự nhiên đối với người bản ngữ.',
    },
    {
      form: 'Management asked all staff to register their vehicles, and most employees did so.',
      whyFits: 'Dùng did so vì việc đăng ký xe là hành động chủ ý (deliberate action) và phù hợp văn phong trang trọng.',
      whyNot: '"He owned three vintage cars, and his brother did so too" là sai vì sở hữu (own) là trạng thái tĩnh, phải nói "did too".',
    },
  ],
  commonMistakes: [
    'Nói "I don’t hope so" thay vì dạng chuẩn bản ngữ "I hope not".',
    'Dùng "one/ones" để thay thế cho danh từ không đếm được (ví dụ: "I need fresh milk, do you have a one?" thay vì "do you have some?").',
    'Dùng "do so" với động từ trạng thái (ví dụ: viết "She understood the theorem and her colleague did so too" thay vì "did too" hoặc "understood it too").',
  ],
  summary: 'Phép thế danh từ dùng one/ones (đếm được); thế động từ dùng do so cho hành động chủ ý; thế mệnh đề dùng so/not (I think so / I hope not; if so / if not) giúp câu văn súc tích, liên kết và chuyên nghiệp.',
  exercises: [
    {
      id: 'grammar-v2-b2-cohesion-substitution-28-q1',
      kind: 'choice',
      prompt: 'Choose the most idiomatic response using negative clausal substitution with hope:',
      options: [
        { text: 'Will our flights be canceled due to the blizzard? — I hope not.', correct: true, rationale: 'I hope not is the idiomatic standard form for negative clausal substitution with hope.' },
        { text: 'Will our flights be canceled due to the blizzard? — I don’t hope so.', correct: false, rationale: 'This is possible but less idiomatic than I hope not for the intended negative clausal substitution.' },
        { text: 'Will our flights be canceled due to the blizzard? — I hope no.', correct: false, rationale: 'Hope no is ungrammatical; not must be used.' },
        { text: 'Will our flights be canceled due to the blizzard? — I am not hoping so.', correct: false, rationale: 'Awkward aspect and non-standard clausal substitution.' },
      ],
      acceptedAnswers: [{ text: 'Will our flights be canceled due to the blizzard? — I hope not.', rationale: 'I hope not correctly substitutes for the negative proposition.' }],
    },
    {
      id: 'grammar-v2-b2-cohesion-substitution-28-q2',
      kind: 'choice',
      prompt: 'Choose the sentence where "do so" is used correctly with a dynamic deliberate action:',
      options: [
        { text: 'The judge ordered the witness to step forward, and she hesitated before doing so.', correct: true, rationale: 'Step forward is a dynamic deliberate action, which correctly licenses verbal substitution with do so.' },
        { text: 'He knew the secret password, and his colleague did so as well.', correct: false, rationale: 'Know is a stative cognitive verb and cannot be substituted by do so.' },
        { text: 'The mansion belonged to an oil magnate, and the adjoining estate did so too.', correct: false, rationale: 'Belong is a stative relation and cannot take do so.' },
        { text: 'She resembled her grandmother, and her younger sister did so too.', correct: false, rationale: 'Resemble is stative and cannot be substituted by do so.' },
      ],
      acceptedAnswers: [{ text: 'The judge ordered the witness to step forward, and she hesitated before doing so.', rationale: 'Do so correctly substitutes for the deliberate action step forward.' }],
    },
    {
      id: 'grammar-v2-b2-cohesion-substitution-28-q3',
      kind: 'choice',
      prompt: 'Identify the sentence with an erroneous nominal substitution:',
      options: [
        { text: 'I ran out of diesel fuel; could you lend me a one?', correct: true, rationale: 'Fuel is uncountable and cannot be substituted by a one; some or a can of fuel must be used.' },
        { text: 'My fountain pen has run out of ink; may I borrow a blue one?', correct: false, rationale: 'One correctly substitutes for the countable noun pen.' },
        { text: 'These leather boots are worn out, so I purchased more durable ones.', correct: false, rationale: 'Ones correctly substitutes for plural count noun boots.' },
        { text: 'The architect reviewed the preliminary sketches and requested more detailed ones.', correct: false, rationale: 'Ones correctly replaces sketches.' },
      ],
      acceptedAnswers: [{ text: 'I ran out of diesel fuel; could you lend me a one?', rationale: 'A one cannot substitute for uncountable fuel.' }],
    },
    {
      id: 'grammar-v2-b2-cohesion-substitution-28-q4',
      kind: 'choice',
      prompt: 'Select the correct conditional sentence linker for "in that case": "The laboratory will receive funding if preliminary results are confirmed; ___, the project will be terminated."',
      options: [
        { text: 'if not', correct: true, rationale: 'If not correctly substitutes for if preliminary results are not confirmed.' },
        { text: 'if no', correct: false, rationale: 'If no is ungrammatical.' },
        { text: 'if so not', correct: false, rationale: 'If so not is syntactically invalid.' },
        { text: 'unless not', correct: false, rationale: 'Unless not creates a confusing double negative.' },
      ],
      acceptedAnswers: [{ text: 'if not', rationale: 'If not provides the correct negative conditional substitution.' }],
    },
    {
      id: 'grammar-v2-b2-cohesion-substitution-28-q5',
      kind: 'gap',
      prompt: 'Fill in the pro-form for verbal substitution: "The company urged employees to complete the compliance survey, but fewer than half did _____."',
      options: [],
      acceptedAnswers: [{ text: 'so', rationale: 'Did so substitutes for completed the compliance survey.' }],
    },
    {
      id: 'grammar-v2-b2-cohesion-substitution-28-q6',
      kind: 'gap',
      prompt: 'Fill in the affirmative clausal substitute after fears: "Is there any danger of toxic chemical contamination? — The chief inspector certainly fears _____."',
      options: [],
      acceptedAnswers: [{ text: 'so', rationale: 'Fears so confirms apprehension of the affirmative proposition.' }],
    },
    {
      id: 'grammar-v2-b2-cohesion-substitution-28-q7',
      kind: 'gap',
      prompt: 'Fill in the nominal substitute for plural items: "Instead of repairing the damaged solar panels, technicians installed brand-new _____."',
      options: [],
      acceptedAnswers: [{ text: 'ones', rationale: 'Ones substitutes for plural countable panels.' }],
    },
    {
      id: 'grammar-v2-b2-cohesion-substitution-28-q8',
      kind: 'gap',
      prompt: 'Fill in the conditional substitute meaning "if that is true": "Are the signatures authentic? If _____, the deed of transfer will be executed tomorrow."',
      options: [],
      acceptedAnswers: [{ text: 'so', rationale: 'If so provides the positive conditional clausal substitute.' }],
    },
    {
      id: 'grammar-v2-b2-cohesion-substitution-28-q9',
      kind: 'transform',
      prompt: 'Rewrite using "do so" to avoid repetition: "The committee instructed the auditor to publish the preliminary findings, and the auditor published the preliminary findings immediately."',
      options: [],
      acceptedAnswers: [
        { text: 'The committee instructed the auditor to publish the preliminary findings, and the auditor did so immediately.', rationale: 'Replaces repeated predicate with did so.' },
      ],
    },
    {
      id: 'grammar-v2-b2-cohesion-substitution-28-q10',
      kind: 'transform',
      prompt: 'Rewrite the response using negative clausal substitution with "hope": "Do you think the strike will last through next month? — I hope that the strike will not last through next month."',
      options: [],
      acceptedAnswers: [
        { text: 'I hope not.', rationale: 'Substitutes the entire negative clause with the idiomatic I hope not.' },
      ],
    },
    {
      id: 'grammar-v2-b2-cohesion-substitution-28-q11',
      kind: 'correction',
      prompt: 'Correct the unidiomatic clausal substitution: "Do you believe the market will crash tomorrow? — I don’t hope so."',
      options: [],
      acceptedAnswers: [
        { text: 'Do you believe the market will crash tomorrow? — I hope not.', rationale: 'Replaces unidiomatic I don’t hope so with standard I hope not.' },
      ],
    },
    {
      id: 'grammar-v2-b2-cohesion-substitution-28-q12',
      kind: 'correction',
      prompt: 'Correct the nominal substitution error with uncountable noun: "This coffee tastes bitter; could you pour me a sweeter one?"',
      options: [],
      acceptedAnswers: [
        { text: 'This coffee tastes bitter; could you pour me a sweeter cup?', rationale: 'Supplies countable head noun cup.' },
        { text: 'This coffee tastes bitter; could you pour me some that is sweeter?', rationale: 'Uses some for uncountable coffee.' },
      ],
    },
  ],
  reviewExercises: [
    {
      id: 'grammar-v2-b2-cohesion-substitution-28-r1',
      kind: 'choice',
      prompt: 'Select the sentence that demonstrates formal and precise verbal substitution:',
      options: [
        { text: 'The council required all vendors to renew their licenses, but several failed to do so.', correct: true, rationale: 'Do so cleanly replaces the deliberate action renew their licenses.' },
        { text: 'The council required all vendors to renew their licenses, but several failed to do it.', correct: false, rationale: 'Do it is more informal and refers to a specific physical task rather than formal compliance.' },
        { text: 'The council required all vendors to renew their licenses, but several failed to do that.', correct: false, rationale: 'Do that emphasizes contrastive or emphatic deictic reference.' },
      ],
      acceptedAnswers: [{ text: 'The council required all vendors to renew their licenses, but several failed to do so.', rationale: 'Failed to do so is the formal standard verbal substitution.' }],
    },
    {
      id: 'grammar-v2-b2-cohesion-substitution-28-r2',
      kind: 'gap',
      prompt: 'Fill in the negative clausal substitute: "Will the project suffer further budget cuts? — We certainly hope _____."',
      options: [],
      acceptedAnswers: [{ text: 'not', rationale: 'Hope not forms the standard negative response.' }],
    },
    {
      id: 'grammar-v2-b2-cohesion-substitution-28-r3',
      kind: 'transform',
      prompt: 'Rewrite using "if so": "Is there any discrepancy in the ledger? If there is any discrepancy in the ledger, contact the auditor."',
      options: [],
      acceptedAnswers: [
        { text: 'Is there any discrepancy in the ledger? If so, contact the auditor.', rationale: 'Compresses conditional clause into If so.' },
      ],
    },
    {
      id: 'grammar-v2-b2-cohesion-substitution-28-r4',
      kind: 'correction',
      prompt: 'Correct the error in stative verbal substitution: "The director understood the legal risk, and his deputy did so too."',
      options: [],
      acceptedAnswers: [
        { text: 'The director understood the legal risk, and his deputy did too.', rationale: 'Replaces invalid did so with auxiliary did too for stative verb.' },
      ],
    },
  ],
  outputPrompts: [
    {
      id: 'grammar-v2-b2-cohesion-substitution-28-o1',
      prompt: 'Viết một đoạn đối thoại ngắn gồm đúng hai câu trong môi trường làm việc chuyên nghiệp, sử dụng phép thế mệnh đề với "I don’t think so" hoặc "I hope not" để phản hồi nghi vấn của đồng nghiệp.',
      modelAnswer: '—Will the security breach force us to suspend digital operations over the weekend? —I certainly hope not; our cybersecurity team is isolating the compromised server right now.',
      checks: [
        'Sử dụng đúng cấu trúc thế mệnh đề "I hope not" hoặc "I don’t think so".',
        'Câu trả lời gắn kết tự nhiên và logic với câu hỏi trước.',
        'Văn phong giao tiếp chuyên nghiệp.',
      ],
    },
    {
      id: 'grammar-v2-b2-cohesion-substitution-28-o2',
      prompt: 'Viết 1-2 câu trong một văn bản quy định hoặc thỏa thuận pháp lý, sử dụng cấu trúc "do so" để thay thế cho một hành động có chủ đích đã được nhắc ở vế trước.',
      modelAnswer: 'All tenants are required to inspect smoke alarms biannually. Any resident who neglects to do so assumes personal liability for resulting fire damage.',
      checks: [
        'Sử dụng cấu trúc "do so" để thay thế cho cụm động từ hành động trước đó.',
        'Văn phong pháp lý, quy chế rõ ràng, trang trọng.',
        'Ngữ pháp chuẩn xác tuyệt đối.',
      ],
    },
  ],
  sources: [
    {
      id: 'halliday-hasan-cohesion',
      title: 'Halliday & Hasan: Cohesion in English - Substitution',
      url: 'https://www.cambridge.org/core/books/cohesion-in-english/substitution',
      claims: [
        'Substitution operates at nominal, verbal, and clausal levels using pro-forms like one/ones, do so, and so/not.',
        'Do so commonly replaces a deliberate dynamic action; it is not normally used as a substitute for stative predicates.',
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
