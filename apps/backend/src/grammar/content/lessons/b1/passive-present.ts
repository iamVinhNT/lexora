/**
 * @file passive-present.ts
 * @description Bài học B1 về thể bị động ở thì hiện tại đơn (Passive Voice - Present Simple: am/is/are + V3/ed).
 */
import type { GrammarLesson } from '../../types.js';

const lesson: GrammarLesson = {
  id: 'grammar-v2-b1-passive-present-12',
  revisionId: 'grammar-v2-b1-passive-present-12@1.0.0',
  revision: '1.0.0',
  title: 'Thể bị động thì hiện tại đơn (Passive Voice - Present Simple)',
  objective: 'Sử dụng cấu trúc câu bị động thì hiện tại đơn (am/is/are + quá khứ phân từ) để miêu tả quy trình sản xuất, nội quy, sự thật phổ quát và biết cách lược bỏ tác nhân không cần thiết.',
  prerequisiteIds: ['grammar-v2-b1-wish-present-11'],
  coverage: ['passive-present', 'passive-voice', 'present-simple-passive', 'agent-omission', 'b1-grammar'],
  context: {
    english: 'At the coffee roastery, raw beans are sorted by size and roasted at precise temperatures. Every batch is tasted by a certified quality inspector before it is packaged into vacuum-sealed bags.',
    vietnamese: 'Tại xưởng rang cà phê, các hạt thô được phân loại theo kích thước và được rang ở nhiệt độ chính xác. Mỗi mẻ đều được nếm thử bởi một chuyên gia kiểm định chất lượng có chứng chỉ trước khi nó được đóng gói vào các túi hút chân không.',
  },
  guide: {
    pattern: 'Khẳng định: S + am/is/are + V3/ed (+ by O); Phủ định: S + am/is/are not + V3/ed; Nghi vấn: Am/Is/Are + S + V3/ed?',
    whenToUse: [
      'Miêu tả các quy trình kỹ thuật, sản xuất hoặc các bước thực hiện lặp đi lặp lại thường xuyên.',
      'Nhấn mạnh vào đối tượng chịu tác động hoặc hành động hơn là người thực hiện.',
      'Nêu các nội quy công cộng, thông báo chính thức hoặc sự thật hiển nhiên (ví dụ: English is spoken here).',
    ],
    signalWords: ['is produced', 'are manufactured', 'are made of', 'is tested', 'every year', 'regularly', 'by'],
    check: [
      'Động từ to be (am/is/are) phải hòa hợp số ít / số nhiều với chủ ngữ mới (tân ngữ chuyển thành chủ ngữ).',
      'Động từ chính luôn ở dạng Quá khứ phân từ (Past Participle: V3/ed).',
      'Lược bỏ "by + agent" khi tác nhân là hiển nhiên, chung chung (by people, by them) hoặc không quan trọng; chỉ giữ lại khi tác nhân mang thông tin quan trọng.',
    ],
  },
  explanation: 'Thể bị động (Passive Voice) được hình thành khi trọng tâm của câu chuyện chuyển từ "người thực hiện hành động" (agent) sang "đối tượng tiếp nhận hành động" (patient). Trong thì Hiện tại đơn, công thức là:\nChủ ngữ + am/is/are + V3/ed (+ by tác nhân).\n\nThể bị động thì hiện tại đơn đặc biệt phổ biến trong ba ngữ cảnh chính:\n1. Miêu tả quy trình sản xuất: "First, milk is collected from local farms, then it is pasteurized at high heat." Trong ngữ cảnh này, bản thân các bước chế biến là trọng tâm, không cần liên tục nhắc đến người công nhân.\n2. Nội quy và thông báo chính thức: "Mobile phones are not permitted in the examination hall."\n3. Sự thật hiển nhiên hoặc số liệu toàn cầu: "Over two billion cups of coffee are consumed around the world every day."\n\nVề tác nhân (Agent): Ta chỉ dùng cụm "by + tác nhân" khi người hoặc vật thực hiện hành động mang thông tin mới lạ, bất ngờ hoặc có giá trị quan trọng (ví dụ: "The annual report is audited by an independent international agency"). Khi tác nhân là đại từ mơ hồ như "by people", "by someone", "by them", ta nên lược bỏ hoàn toàn để câu văn gọn gàng, tự nhiên.',
  examples: [
    {
      english: 'Spanish is spoken in many countries across South America.',
      vietnamese: 'Tiếng Tây Ban Nha được nói ở nhiều quốc gia trên khắp Nam Mỹ (tác nhân hiển nhiên là người dân -> lược bỏ by people).',
    },
    {
      english: 'Fresh bread is baked in this bakery every morning at four o\'clock.',
      vietnamese: 'Bánh mì tươi được nướng tại tiệm bánh này vào 4 giờ sáng mỗi ngày.',
    },
    {
      english: 'Electronic components are carefully inspected before assembly.',
      vietnamese: 'Các linh kiện điện tử được kiểm tra cẩn thận trước khi lắp ráp.',
    },
    {
      english: 'This historic palace is maintained by the national heritage trust.',
      vietnamese: 'Cung điện lịch sử này được duy trì bảo tồn bởi quỹ di sản quốc gia (tác nhân cụ thể quan trọng).',
    },
    {
      english: 'Credit cards are accepted at all ticket vending machines.',
      vietnamese: 'Thẻ tín dụng được chấp nhận tại tất cả các máy bán vé tự động.',
    },
    {
      english: 'How many parcels are delivered by your courier service daily?',
      vietnamese: 'Có bao nhiêu bưu kiện được chuyển phát bởi dịch vụ chuyển phát của bạn mỗi ngày?',
    },
  ],
  contrasts: [
    {
      form: 'Active vs Passive trong quy trình',
      whyFits: 'Paper is recycled into cardboard boxes (thể bị động làm nổi bật nguyên liệu và sản phẩm của quy trình).',
      whyNot: 'People recycle paper into cardboard boxes (thể chủ động với "people" rườm rà và thiếu tính khách quan).',
    },
    {
      form: 'Giữ lại tác nhân vs Lược bỏ tác nhân',
      whyFits: 'The contest is judged by three master chefs (cần giữ "by three master chefs" vì thông tin này quan trọng).',
      whyNot: 'Tea is grown in Sri Lanka by farmers (thừa "by farmers" vì ai cũng hiểu người trồng là nông dân).',
    },
  ],
  commonMistakes: [
    'Quên trợ động từ to be: nói "The car washes every week" (sai, phải là "The car is washed every week").',
    'Dùng sai dạng phân từ của động từ bất quy tắc: nói "Letters are wrote" (sai, phải là "Letters are written").',
    'Giữ lại tác nhân thừa thãi: nói "English is spoken by people all over the world" (chuẩn mực nên bỏ "by people").',
  ],
  summary: 'Passive Present (am/is/are + V3/ed) nhấn mạnh đối tượng và quy trình. Dùng "by + agent" khi tác nhân cung cấp thông tin quan trọng; lược bỏ khi tác nhân mơ hồ hoặc hiển nhiên.',
  exercises: [
    {
      id: 'grammar-v2-b1-passive-present-12-q1',
      kind: 'choice',
      prompt: 'Chọn dạng động từ bị động thích hợp trong miêu tả quy trình sản xuất: "Thousands of smartphones ___ in this automated facility every day."',
      options: [
        { text: 'are assembled', correct: true, rationale: 'Chủ ngữ số nhiều thousands of smartphones đi với to be số nhiều are và phân từ assembled.' },
        { text: 'is assembled', correct: false, rationale: 'Is assembled không hòa hợp với chủ ngữ số nhiều smartphones.' },
        { text: 'assemble', correct: false, rationale: 'Assemble ở thể chủ động ngụ ý điện thoại tự lắp ráp chính nó.' },
      ],
      acceptedAnswers: [{ text: 'are assembled', rationale: 'Present Simple Passive số nhiều: are assembled.' }],
    },
    {
      id: 'grammar-v2-b1-passive-present-12-q2',
      kind: 'choice',
      prompt: 'Chọn dạng phủ định đúng trong quy định văn phòng: "Confidential files ___ outside the archive room without permission."',
      options: [
        { text: 'are not permitted', correct: true, rationale: 'Are not permitted là thể bị động phủ định số nhiều của thì hiện tại đơn.' },
        { text: 'do not permit', correct: false, rationale: 'Do not permit là thể chủ động, tài liệu không thể tự cho phép.' },
        { text: 'is not permitted', correct: false, rationale: 'Chủ ngữ confidential files là số nhiều, không đi với is.' },
      ],
      acceptedAnswers: [{ text: 'are not permitted', rationale: 'Are not permitted là thể bị động phủ định của Hiện tại đơn.' }],
    },
    {
      id: 'grammar-v2-b1-passive-present-12-q3',
      kind: 'choice',
      prompt: 'Choose the passive sentence that omits an unnecessary generic agent in a neutral statement about rice production:',
      options: [
        { text: 'Rice is grown in wet paddy fields throughout Vietnam.', correct: true, rationale: 'The prompt asks for a neutral general statement without a generic agent.' },
        { text: 'Rice are grown in wet paddy fields throughout Vietnam by farmers.', correct: false, rationale: 'Rice is uncountable and takes singular is, not are.' },
        { text: 'Rice is grown in wet paddy fields throughout Vietnam by someone.', correct: false, rationale: 'Someone is a vague generic agent that adds no useful information here.' },
      ],
      acceptedAnswers: [{ text: 'Rice is grown in wet paddy fields throughout Vietnam.', rationale: 'The prompt specifies a neutral statement and omits an unimportant generic agent.' }],
    },
    {
      id: 'grammar-v2-b1-passive-present-12-q4',
      kind: 'choice',
      prompt: 'Chọn dạng câu hỏi bị động chính xác ở thì Hiện tại đơn: "___ this website ___ in multiple languages?"',
      options: [
        { text: 'Is / updated', correct: true, rationale: 'Chủ ngữ ngôi thứ ba số ít this website đi với trợ động từ Is và phân từ updated.' },
        { text: 'Does / updated', correct: false, rationale: 'Does đi với động từ nguyên thể ở thể chủ động, không đi với phân từ bị động.' },
        { text: 'Are / updating', correct: false, rationale: 'Website là số ít và câu mang nghĩa bị động, không dùng Are updating.' },
      ],
      acceptedAnswers: [{ text: 'Is / updated', rationale: 'Câu hỏi bị động Hiện tại đơn: Is + S + V3/ed?' }],
    },
    {
      id: 'grammar-v2-b1-passive-present-12-q5',
      kind: 'gap',
      prompt: 'The library books ___ (categorize) according to the international Dewey Decimal system.',
      options: [],
      acceptedAnswers: [
        { text: 'are categorized', rationale: 'Chủ ngữ số nhiều books đi với are categorized.' },
        { text: 'are categorised', rationale: 'Chính tả Anh - Anh categorised.' },
      ],
    },
    {
      id: 'grammar-v2-b1-passive-present-12-q6',
      kind: 'gap',
      prompt: 'Clean drinking water ___ (filter) through several layers of activated carbon.',
      options: [],
      acceptedAnswers: [
        { text: 'is filtered', rationale: 'Chủ ngữ không đếm được drinking water là số ít, đi với is filtered.' },
      ],
    },
    {
      id: 'grammar-v2-b1-passive-present-12-q7',
      kind: 'gap',
      prompt: 'Safety helmets ___ (require) on all construction sites at all times.',
      options: [],
      acceptedAnswers: [
        { text: 'are required', rationale: 'Chủ ngữ số nhiều safety helmets đi với are required.' },
      ],
    },
    {
      id: 'grammar-v2-b1-passive-present-12-q8',
      kind: 'gap',
      prompt: 'This rare medical herb ___ (not / find) in northern mountainous regions.',
      options: [],
      acceptedAnswers: [
        { text: 'is not found', rationale: 'Dạng phủ định số ít của động từ bất quy tắc find: is not found.' },
        { text: "isn't found", rationale: 'Dạng viết tắt isn\'t found.' },
      ],
    },
    {
      id: 'grammar-v2-b1-passive-present-12-q9',
      kind: 'transform',
      prompt: 'Bắt đầu bằng "Recyclable waste is sorted..." để chuyển câu sau sang thể bị động lược bỏ tác nhân thừa: "Workers sort recyclable waste into separate bins every afternoon."',
      options: [],
      acceptedAnswers: [
        { text: 'Recyclable waste is sorted into separate bins every afternoon.', rationale: 'Chuyển sang bị động với is sorted và lược bỏ tác nhân workers.' },
      ],
    },
    {
      id: 'grammar-v2-b1-passive-present-12-q10',
      kind: 'transform',
      prompt: 'Bắt đầu bằng "The museum collections are protected by..." để chuyển sang bị động giữ lại tác nhân quan trọng: "Advanced electronic surveillance systems protect the museum collections."',
      options: [],
      acceptedAnswers: [
        { text: 'The museum collections are protected by advanced electronic surveillance systems.', rationale: 'Tác nhân là hệ thống giám sát điện tử tiên tiến cung cấp thông tin quan trọng nên giữ lại sau by.' },
      ],
    },
    {
      id: 'grammar-v2-b1-passive-present-12-q11',
      kind: 'correction',
      prompt: 'Sửa lỗi thiếu động từ to be trong câu bị động: "High-speed trains operate by computers and electricity."',
      options: [],
      acceptedAnswers: [
        { text: 'High-speed trains are operated by computers and electricity.', rationale: 'Thêm trợ động từ are để tạo cấu trúc bị động are operated.' },
      ],
    },
    {
      id: 'grammar-v2-b1-passive-present-12-q12',
      kind: 'correction',
      prompt: 'Sửa lỗi sai phân từ hai của động từ bất quy tắc trong câu bị động: "These ceramic bowls are make by skilled artisans."',
      options: [],
      acceptedAnswers: [
        { text: 'These ceramic bowls are made by skilled artisans.', rationale: 'Phân từ hai của make là made, chuyển thành are made.' },
      ],
    },
  ],
  reviewExercises: [
    {
      id: 'grammar-v2-b1-passive-present-12-r1',
      kind: 'choice',
      prompt: 'Biển báo giao thông hoặc quy định nào sau đây sử dụng đúng thể bị động thì Hiện tại đơn?',
      options: [
        { text: 'Seat belts must be worn; passenger safety is monitored at all times.', correct: true, rationale: 'Is monitored là thể bị động thì Hiện tại đơn chuẩn mực.' },
        { text: 'Seat belts must wear; passenger safety monitors at all times.', correct: false, rationale: 'Dùng thể chủ động sai nghĩa ngữ pháp.' },
        { text: 'Seat belts are wore; passenger safety is monitor at all times.', correct: false, rationale: 'Sai dạng phân từ hai của wear và monitor.' },
      ],
      acceptedAnswers: [{ text: 'Seat belts must be worn; passenger safety is monitored at all times.', rationale: 'Is monitored là thể bị động chuẩn mực.' }],
    },
    {
      id: 'grammar-v2-b1-passive-present-12-r2',
      kind: 'gap',
      prompt: 'All organic vegetables at this market ___ (grow) without synthetic chemical pesticides.',
      options: [],
      acceptedAnswers: [
        { text: 'are grown', rationale: 'Chủ ngữ số nhiều vegetables đi với are grown.' },
      ],
    },
    {
      id: 'grammar-v2-b1-passive-present-12-r3',
      kind: 'transform',
      prompt: 'Bắt đầu bằng "Every transaction is recorded..." để chuyển sang bị động: "The automated banking server records every transaction securely."',
      options: [],
      acceptedAnswers: [
        { text: 'Every transaction is recorded securely by the automated banking server.', rationale: 'Chuyển tân ngữ every transaction lên làm chủ ngữ với is recorded.' },
        { text: 'Every transaction is recorded securely.', rationale: 'Biến thể lược bỏ tác nhân server khi muốn nhấn mạnh sự giao dịch.' },
      ],
    },
    {
      id: 'grammar-v2-b1-passive-present-12-r4',
      kind: 'correction',
      prompt: 'Sửa lỗi sai trong câu: "Fresh milk is delivers to our doorstep every morning."',
      options: [],
      acceptedAnswers: [
        { text: 'Fresh milk is delivered to our doorstep every morning.', rationale: 'Đổi động từ delivers thành quá khứ phân từ delivered (is delivered).' },
      ],
    },
  ],
  outputPrompts: [
    {
      id: 'grammar-v2-b1-passive-present-12-o1',
      prompt: 'Viết một đoạn văn ngắn (2–3 câu) miêu tả một quy trình sản xuất hoặc chuẩn bị một sản phẩm quen thuộc (ví dụ: làm bánh mì, pha cà phê hoặc tái chế rác), sử dụng thể bị động thì hiện tại đơn (is/are + V3/ed).',
      modelAnswer: 'First, ripe tea leaves are harvested by hand and dried in ventilated rooms. Then, the dried leaves are sorted into different grades and packed into moisture-proof containers.',
      checks: [
        'Sử dụng đúng cấu trúc am/is/are + V3/ed.',
        'Miêu tả các bước quy trình mạch lạc với từ nối thời gian (first, then...).',
        'Lược bỏ hoặc giữ tác nhân một cách tự nhiên.',
      ],
    },
    {
      id: 'grammar-v2-b1-passive-present-12-o2',
      prompt: 'Viết 2–3 câu thông báo về các quy định chung tại một thư viện, trường học hoặc phòng tập thể dục, sử dụng thể bị động thì hiện tại đơn ở cả dạng khẳng định và phủ định.',
      modelAnswer: 'Student membership cards are checked at the library entrance. Loud conversations are not permitted inside the quiet study hall, and all borrowed laptops are returned before 9 PM.',
      checks: [
        'Sử dụng đúng thể bị động Hiện tại đơn khẳng định (are checked, are returned).',
        'Sử dụng đúng thể bị động Hiện tại đơn phủ định (are not permitted).',
        'Văn phong thông báo trang trọng, phù hợp bối cảnh.',
      ],
    },
  ],
  sources: [
    {
      id: 'cambridge-passive-present',
      title: 'Cambridge Grammar: Present simple passive voice and agent omission',
      url: 'https://dictionary.cambridge.org/grammar/british-grammar/passive',
      claims: ['Thể bị động hiện tại đơn dùng trong quy trình, quy định và quy tắc lược bỏ tác nhân'],
      checkedAt: '2026-10-05',
      provenance: 'reference-only',
    },
  ],
  review: {
    status: 'approved',
    mode: 'ai-internal',
    reviewer: 'OpenAI Codex (AI-internal)',
    reviewedAt: '2026-10-06T00:00:00Z',
    summary: 'Reviewed the complete lesson for grammar accuracy, contextual answerability, distractors, authored variants, output prompts, and source-claim alignment. Applied editorial corrections where needed.',
    checks: { originalProse: true, factualExplanation: true, clearContrasts: true, singleCorrectChoice: true, validTransferExercises: true, soundOutputPrompts: true, referenceOnlySources: true },
  },
};

export default lesson;
