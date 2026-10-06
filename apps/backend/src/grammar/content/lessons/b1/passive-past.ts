/**
 * @file passive-past.ts
 * @description Bài học B1 về thể bị động ở thì quá khứ đơn (Passive Voice - Past Simple: was/were + V3/ed).
 */
import type { GrammarLesson } from '../../types.js';

const lesson: GrammarLesson = {
  id: 'grammar-v2-b1-passive-past-13',
  revisionId: 'grammar-v2-b1-passive-past-13@1.0.0',
  revision: '1.0.0',
  title: 'Thể bị động thì quá khứ đơn (Passive Voice - Past Simple)',
  objective: 'Sử dụng cấu trúc bị động thì quá khứ đơn (was/were + quá khứ phân từ) để tường thuật các sự kiện lịch sử, tin tức sự cố và các phát minh khoa học trong quá khứ.',
  prerequisiteIds: ['grammar-v2-b1-passive-present-12'],
  coverage: ['passive-past', 'passive-voice', 'past-simple-passive', 'historical-events', 'b1-grammar'],
  context: {
    english: 'The stone cathedral was completed in 1380 after five decades of construction. During the major storm of 1928, parts of the southern tower were damaged, but they were carefully restored by master stonemasons several years later.',
    vietnamese: 'Nhà thờ đá được hoàn thành vào năm 1380 sau năm thập kỷ xây dựng. Trong cơn bão lớn năm 1928, các phần của tòa tháp phía nam đã bị hư hại, nhưng chúng đã được phục hồi cẩn thận bởi các nghệ nhân thợ đá bậc thầy vài năm sau đó.',
  },
  guide: {
    pattern: 'Khẳng định: S + was/were + V3/ed (+ by O); Phủ định: S + was/were not (wasn\'t/weren\'t) + V3/ed; Nghi vấn: Was/Were + S + V3/ed?',
    whenToUse: [
      'Tường thuật các phát minh, khám phá khoa học hoặc các công trình lịch sử được xây dựng trong quá khứ.',
      'Báo cáo tin tức về các tai nạn, sự cố, tội phạm hoặc thiệt hại khi người gây ra không rõ hoặc không phải trọng tâm.',
      'Nhấn mạnh vào kết quả của một hành động đã diễn ra trọn vẹn tại một thời điểm hoặc giai đoạn xác định trong quá khứ.',
    ],
    signalWords: ['was built in', 'were discovered', 'was invented by', 'yesterday', 'in the 19th century', 'two hundred years ago'],
    check: [
      'Chủ ngữ số ít đi với was + V3/ed; chủ ngữ số nhiều/you/we/they đi với were + V3/ed.',
      'Sử dụng "by + tác nhân" khi tác nhân là người phát minh, tác giả hoặc nhân vật lịch sử quan trọng (ví dụ: was directed by Nolan, was painted by Da Vinci).',
      'Đảm bảo dùng đúng dạng Quá khứ phân từ (V3/ed), tránh nhầm lẫn với dạng V2 quá khứ đơn của động từ bất quy tắc.',
    ],
  },
  explanation: 'Thể bị động thì Quá khứ đơn (Past Simple Passive) chuyển góc nhìn của câu trần thuật về đối tượng đón nhận hành động trong quá khứ. Cấu trúc là:\nChủ ngữ + was/were + V3/ed (+ by tác nhân).\n\nThể này giữ vai trò trọng tâm trong văn phong tường thuật báo chí, lịch sử và học thuật vì ba lý do:\n1. Tác nhân là danh nhân nổi tiếng: "The telephone was invented by Alexander Graham Bell in 1876." Trọng tâm mở đầu câu là phát minh (the telephone), còn người phát minh được giới thiệu ở vế sau với "by".\n2. Tác nhân không rõ danh tính hoặc không quan trọng: "Our office was broken into last night and three laptops were stolen." Cảnh sát và nạn nhân quan tâm đến sự việc bị đột nhập và tài sản bị mất, còn kẻ trộm chưa rõ là ai.\n3. Nhấn mạnh vào đối tượng chịu thiệt hại trong tai nạn hoặc thiên tai: "Fortunately, nobody was injured when the old bridge collapsed."',
  examples: [
    {
      english: 'The Eiffel Tower was constructed for the 1889 World\'s Fair in Paris.',
      vietnamese: 'Tháp Eiffel được xây dựng cho Hội chợ Thế giới năm 1889 tại Paris.',
    },
    {
      english: 'Penicillin was accidentally discovered by Alexander Fleming in 1928.',
      vietnamese: 'Penicillin được phát hiện một cách tình cờ bởi Alexander Fleming vào năm 1928.',
    },
    {
      english: 'Hundreds of antique coins were unearthed by archaeologists last month.',
      vietnamese: 'Hàng trăm đồng tiền cổ đã được các nhà khảo cổ khai quật vào tháng trước.',
    },
    {
      english: 'The contract was signed by both parties at the city hall yesterday.',
      vietnamese: 'Hợp đồng đã được ký kết bởi cả hai bên tại tòa thị chính ngày hôm qua.',
    },
    {
      english: 'The missing tourists were found safe in the valley after a forty-eight-hour search.',
      vietnamese: 'Các du khách mất tích đã được tìm thấy an toàn trong thung lũng sau một cuộc tìm kiếm kéo dài 48 giờ.',
    },
    {
      english: 'Were any questions answered by the government spokesperson during the briefing?',
      vietnamese: 'Có câu hỏi nào được người phát ngôn chính phủ trả lời trong buổi họp báo không?',
    },
  ],
  contrasts: [
    {
      form: 'Past Passive vs Present Passive',
      whyFits: 'The fortress was built in the 12th century (công trình xây dựng hoàn tất ở quá khứ xác định).',
      whyNot: 'The fortress is visited by tourists today (hoạt động tham quan diễn ra thường xuyên ở hiện tại).',
    },
    {
      form: 'Active vs Passive trong sự kiện lịch sử',
      whyFits: 'The novel was published in 1960 (tác phẩm văn học được đưa lên làm chủ ngữ trang trọng).',
      whyNot: 'A publisher published the novel in 1960 (nhà xuất bản vô danh làm chủ ngữ khiến câu thiếu tự nhiên).',
    },
  ],
  commonMistakes: [
    'Quên to be quá khứ: nói "The palace built in 1750" (sai nghĩa, phải là "The palace was built in 1750").',
    'Nhầm lẫn giữa was và were cho danh từ số nhiều: nói "Three cars was stolen" (sai, phải là "Three cars were stolen").',
    'Dùng nhầm V2 thay cho V3 với động từ bất quy tắc: nói "The song was wrote" (sai, phải là "The song was written").',
  ],
  summary: 'Past Simple Passive (was/were + V3/ed) dùng cho sự kiện lịch sử, phát minh và tin tức quá khứ khi trọng tâm là đối tượng hoặc kết quả của hành động.',
  exercises: [
    {
      id: 'grammar-v2-b1-passive-past-13-q1',
      kind: 'choice',
      prompt: 'Chọn dạng động từ bị động thích hợp cho phát minh lịch sử: "The World Wide Web ___ by Tim Berners-Lee in 1989."',
      options: [
        { text: 'was invented', correct: true, rationale: 'Chủ ngữ ngôi thứ ba số ít ở quá khứ xác định (in 1989) dùng was invented.' },
        { text: 'were invented', correct: false, rationale: 'Chủ ngữ the World Wide Web là danh từ số ít, không dùng were.' },
        { text: 'invented', correct: false, rationale: 'Invented thể chủ động ngụ ý mạng toàn cầu tự phát minh ra chính nó.' },
      ],
      acceptedAnswers: [{ text: 'was invented', rationale: 'Past Simple Passive số ít: was invented.' }],
    },
    {
      id: 'grammar-v2-b1-passive-past-13-q2',
      kind: 'choice',
      prompt: 'Chọn dạng bị động số nhiều cho bản tin sự cố: "Several valuable paintings ___ from the private gallery during the blackout."',
      options: [
        { text: 'were stolen', correct: true, rationale: 'Chủ ngữ số nhiều paintings đi với were và phân từ hai bất quy tắc stolen.' },
        { text: 'was stolen', correct: false, rationale: 'Paintings là danh từ số nhiều, không đi với was.' },
        { text: 'were stole', correct: false, rationale: 'Stole là V2, không phải phân từ hai V3.' },
      ],
      acceptedAnswers: [{ text: 'were stolen', rationale: 'Past Simple Passive số nhiều với động từ bất quy tắc: were stolen.' }],
    },
    {
      id: 'grammar-v2-b1-passive-past-13-q3',
      kind: 'choice',
      prompt: 'Chọn câu hỏi bị động chính xác ở thì Quá khứ đơn: "___ the flight ___ due to the heavy snowfall yesterday?"',
      options: [
        { text: 'Was / canceled', correct: true, rationale: 'Câu hỏi bị động số ít trong quá khứ: Was + the flight + canceled...?' },
        { text: 'Did / canceled', correct: false, rationale: 'Did không đi với động từ phân từ bị động.' },
        { text: 'Were / cancel', correct: false, rationale: 'The flight là số ít và cần dạng phân từ hai V3/ed.' },
      ],
      acceptedAnswers: [{ text: 'Was / canceled', rationale: 'Câu hỏi bị động Quá khứ đơn: Was + S + V3/ed?' }],
    },
    {
      id: 'grammar-v2-b1-passive-past-13-q4',
      kind: 'choice',
      prompt: 'Chọn dạng bị động phủ định: "Luckily, none of the bus passengers ___ in the collision."',
      options: [
        { text: 'were injured', correct: true, rationale: 'None of the passengers thường đi với were injured trong văn phong hiện đại chỉ số nhiều.' },
        { text: 'was injure', correct: false, rationale: 'Thiếu đuôi quá khứ phân từ -ed.' },
        { text: 'did not injure', correct: false, rationale: 'Did not injure là thể chủ động, sai nghĩa.' },
      ],
      acceptedAnswers: [{ text: 'were injured', rationale: 'Were injured diễn tả trạng thái bị thương tích ở thể bị động.' }],
    },
    {
      id: 'grammar-v2-b1-passive-past-13-q5',
      kind: 'gap',
      prompt: 'The ancient pyramid ___ (construct) more than four thousand years ago.',
      options: [],
      acceptedAnswers: [
        { text: 'was constructed', rationale: 'Chủ ngữ số ít ancient pyramid đi với was constructed trong mốc thời gian quá khứ.' },
      ],
    },
    {
      id: 'grammar-v2-b1-passive-past-13-q6',
      kind: 'gap',
      prompt: 'The medical test results ___ (send) to your personal email address yesterday morning.',
      options: [],
      acceptedAnswers: [
        { text: 'were sent', rationale: 'Chủ ngữ số nhiều results đi với were sent (phân từ của send là sent).' },
      ],
    },
    {
      id: 'grammar-v2-b1-passive-past-13-q7',
      kind: 'gap',
      prompt: 'The first successful airplane flight ___ (make) by the Wright brothers in 1903.',
      options: [],
      acceptedAnswers: [
        { text: 'was made', rationale: 'Chủ ngữ số ít flight đi với was made (phân từ của make là made).' },
      ],
    },
    {
      id: 'grammar-v2-b1-passive-past-13-q8',
      kind: 'gap',
      prompt: 'The broken elevator ___ (not / repair) until late yesterday afternoon.',
      options: [],
      acceptedAnswers: [
        { text: 'was not repaired', rationale: 'Thể phủ định số ít của Quá khứ đơn bị động: was not repaired.' },
        { text: "wasn't repaired", rationale: 'Dạng viết tắt wasn\'t repaired.' },
      ],
    },
    {
      id: 'grammar-v2-b1-passive-past-13-q9',
      kind: 'transform',
      prompt: 'Bắt đầu bằng "The famous portrait was painted by..." để chuyển sang bị động: "Leonardo da Vinci painted the famous portrait in the early sixteenth century."',
      options: [],
      acceptedAnswers: [
        { text: 'The famous portrait was painted by Leonardo da Vinci in the early sixteenth century.', rationale: 'Chuyển tân ngữ the famous portrait lên đầu câu với was painted và giữ tác nhân Leonardo da Vinci.' },
      ],
    },
    {
      id: 'grammar-v2-b1-passive-past-13-q10',
      kind: 'transform',
      prompt: 'Bắt đầu bằng "Three historic bridges were destroyed by..." để chuyển sang bị động: "The massive flood destroyed three historic bridges along the river."',
      options: [],
      acceptedAnswers: [
        { text: 'Three historic bridges were destroyed by the massive flood along the river.', rationale: 'Chuyển tân ngữ số nhiều three historic bridges lên làm chủ ngữ với were destroyed.' },
      ],
    },
    {
      id: 'grammar-v2-b1-passive-past-13-q11',
      kind: 'correction',
      prompt: 'Sửa lỗi thiếu to be trong câu bị động quá khứ: "The national anthem composed in 1845 by a local musician."',
      options: [],
      acceptedAnswers: [
        { text: 'The national anthem was composed in 1845 by a local musician.', rationale: 'Thêm trợ động từ was vào trước composed để tạo câu bị động hoàn chỉnh.' },
      ],
    },
    {
      id: 'grammar-v2-b1-passive-past-13-q12',
      kind: 'correction',
      prompt: 'Sửa lỗi dùng sai dạng phân từ hai của động từ bất quy tắc: "The official declaration was wrote on parchment paper."',
      options: [],
      acceptedAnswers: [
        { text: 'The official declaration was written on parchment paper.', rationale: 'Phân từ hai của write là written (was written).' },
      ],
    },
  ],
  reviewExercises: [
    {
      id: 'grammar-v2-b1-passive-past-13-r1',
      kind: 'choice',
      prompt: 'Chọn câu trần thuật lịch sử chính xác nhất:',
      options: [
        { text: 'The steam engine was improved significantly by James Watt in the 18th century.', correct: true, rationale: 'Was improved... by James Watt là câu bị động quá khứ đơn chuẩn mực.' },
        { text: 'The steam engine improved significantly by James Watt in the 18th century.', correct: false, rationale: 'Thiếu trợ động từ was, khiến động từ thành thể chủ động vô nghĩa.' },
        { text: 'The steam engine were improved significantly by James Watt in the 18th century.', correct: false, rationale: 'Chủ ngữ số ít the steam engine không đi với were.' },
      ],
      acceptedAnswers: [{ text: 'The steam engine was improved significantly by James Watt in the 18th century.', rationale: 'Past simple passive chuẩn mực: was improved.' }],
    },
    {
      id: 'grammar-v2-b1-passive-past-13-r2',
      kind: 'gap',
      prompt: 'The missing treasure ___ (discover) inside a submerged shipwreck off the coast.',
      options: [],
      acceptedAnswers: [
        { text: 'was discovered', rationale: 'Chủ ngữ không đếm được/số ít the missing treasure đi với was discovered.' },
      ],
    },
    {
      id: 'grammar-v2-b1-passive-past-13-r3',
      kind: 'transform',
      prompt: 'Bắt đầu bằng "The old warehouse was demolished..." để chuyển sang bị động: "The construction company demolished the old warehouse last month."',
      options: [],
      acceptedAnswers: [
        { text: 'The old warehouse was demolished last month.', rationale: 'Chuyển sang bị động với was demolished và lược bỏ tác nhân công ty xây dựng không quan trọng.' },
        { text: 'The old warehouse was demolished by the construction company last month.', rationale: 'Biến thể giữ lại tác nhân by the construction company.' },
      ],
    },
    {
      id: 'grammar-v2-b1-passive-past-13-r4',
      kind: 'correction',
      prompt: 'Sửa lỗi sai to be số ít/nhiều trong câu: "Ten modern sculptures was exhibited in the central park last summer."',
      options: [],
      acceptedAnswers: [
        { text: 'Ten modern sculptures were exhibited in the central park last summer.', rationale: 'Chủ ngữ số nhiều ten modern sculptures phải đi với were exhibited.' },
      ],
    },
  ],
  outputPrompts: [
    {
      id: 'grammar-v2-b1-passive-past-13-o1',
      prompt: 'Viết một đoạn văn ngắn (2–3 câu) giới thiệu về một di tích lịch sử hoặc một phát minh quen thuộc trong quá khứ, sử dụng thể bị động thì Quá khứ đơn (was/were + V3/ed) và nêu tác nhân với "by" nếu thích hợp.',
      modelAnswer: 'The printing press was invented by Johannes Gutenberg around 1440. Through this revolutionary machine, thousands of books were printed across Europe, and literacy rates were dramatically improved over the following century.',
      checks: [
        'Dùng đúng cấu trúc was/were + V3/ed cho sự kiện lịch sử.',
        'Sử dụng chính xác "by + tác nhân" (by Johannes Gutenberg).',
        'Có câu sử dụng chủ ngữ số nhiều đi với were (books were printed, rates were improved).',
      ],
    },
    {
      id: 'grammar-v2-b1-passive-past-13-o2',
      prompt: 'Viết 2–3 câu tường thuật về một sự cố hoặc tin tức thời sự đã xảy ra gần đây (ví dụ: bão làm hỏng đường sá, tòa nhà được sơ tán, các chuyến bay bị hoãn), sử dụng thể bị động thì Quá khứ đơn.',
      modelAnswer: 'During the severe thunderstorm last Tuesday, several power lines were knocked down by falling trees. The highway was closed for five hours while debris was cleared by emergency crews.',
      checks: [
        'Sử dụng thể bị động Quá khứ đơn (were knocked down, was closed, was cleared).',
        'Miêu tả chuỗi diễn biến sự cố mạch lạc, tự nhiên.',
        'Đúng ngữ pháp hòa hợp giữa chủ ngữ số ít / số nhiều với was / were.',
      ],
    },
  ],
  sources: [
    {
      id: 'cambridge-passive-past',
      title: 'Cambridge Grammar: Past simple passive and reporting historical events',
      url: 'https://dictionary.cambridge.org/grammar/british-grammar/passive',
      claims: ['Thể bị động quá khứ đơn trong trần thuật sự kiện lịch sử và báo cáo sự cố'],
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
