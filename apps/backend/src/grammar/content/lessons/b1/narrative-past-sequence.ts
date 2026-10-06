/**
 * @file narrative-past-sequence.ts
 * @description Bài học B1 về trật tự kể chuyện trong quá khứ (Narrative Past Sequence).
 */
import type { GrammarLesson } from '../../types.js';

const lesson: GrammarLesson = {
  id: 'grammar-v2-b1-narrative-past-sequence-01',
  revisionId: 'grammar-v2-b1-narrative-past-sequence-01@1.0.0',
  revision: '1.0.0',
  title: 'Trật tự kể chuyện trong quá khứ (Narrative Past Sequence)',
  objective: 'Phối hợp thì quá khứ đơn, quá khứ tiếp diễn và các liên từ thời gian để trần thuật chuỗi sự việc rõ ràng và mạch lạc.',
  prerequisiteIds: ['grammar-v2-a2-although-but-28'],
  coverage: ['narrative-past-sequence', 'past-simple-events', 'past-continuous-background', 'time-sequencers', 'b1-grammar'],
  context: {
    english: 'While we were waiting for the delayed train, the station lights suddenly flickered and went out. A few minutes later, an official walked onto the platform and announced that a fallen tree had blocked the track.',
    vietnamese: 'Trong khi chúng tôi đang đợi chuyến tàu bị trễ, đèn nhà ga bỗng chớp tắt rồi vụt tắt hẳn. Vài phút sau, một nhân viên bước ra sân ga và thông báo một cây đổ đã chắn ngang đường ray.',
  },
  guide: {
    pattern: 'Bối cảnh nền: while/as + Past Continuous; Sự kiện xen vào / nối tiếp: when/then/suddenly + Past Simple',
    whenToUse: [
      'Dùng Past Continuous để dựng bối cảnh nền hoặc hành động kéo dài đang diễn ra tại thời điểm đó.',
      'Dùng Past Simple cho hành động ngắn cắt ngang hoặc chuỗi sự việc xảy ra dứt điểm nối tiếp nhau.',
      'Kết hợp liên từ thời gian (while, as, when, then, after that, suddenly) để làm rõ thứ tự thời gian.',
    ],
    signalWords: ['while', 'as', 'when', 'suddenly', 'first', 'then', 'after that', 'finally'],
    check: [
      'Hành động này là bối cảnh nền kéo dài hay là sự kiện cụ thể diễn ra dứt điểm?',
      'Hai hành động xảy ra nối tiếp (xong việc này đến việc kia) hay một việc đang chạy thì việc kia cắt ngang?',
    ],
  },
  explanation: 'Kể chuyện trong quá khứ đòi hỏi sự phân biệt rõ ràng giữa hai góc nhìn: bối cảnh nền đang diễn ra và các sự kiện chính trong mạch trần thuật. Tầng bối cảnh nền thường dùng Quá khứ tiếp diễn (was/were + V-ing) với while/as để đưa người nghe vào giữa một tiến trình chưa hoàn tất. Tầng sự kiện chính dùng Quá khứ đơn (V2/V-ed) cho những sự việc được nhìn nhận như một thể trọn vẹn, hoàn tất và thúc đẩy diễn biến câu chuyện về phía trước. Khi một sự việc mới xảy đến giữa lúc một hành động khác đang diễn ra, ta phối hợp: "Past Continuous + when + Past Simple" hoặc "While + Past Continuous, Past Simple". Khi các sự kiện diễn ra nối tiếp nhau theo trình tự trước sau (first, then, next, finally), người kể thường dùng Quá khứ đơn cho chuỗi hành động đó để giữ mạch trần thuật dứt khoát, trừ khi có chủ ý nghệ thuật muốn miêu tả chậm từng chi tiết đồng thời.',
  examples: [
    {
      english: 'We were driving along the coastal road when the tire suddenly burst.',
      vietnamese: 'Chúng tôi đang lái xe dọc đường ven biển thì chiếc lốp xe bất ngờ bị nổ (lái xe là nền, nổ lốp là sự kiện cắt ngang).',
    },
    {
      english: 'He picked up the envelope, read the address carefully, and placed it inside his pocket.',
      vietnamese: 'Anh ấy nhặt phong bì lên, đọc kỹ địa chỉ, rồi cất vào túi (chuỗi ba hành động nối tiếp nhau dứt điểm).',
    },
    {
      english: 'While the technician was fixing the server, the alarm started ringing.',
      vietnamese: 'Trong lúc kỹ thuật viên đang sửa máy chủ thì chuông báo động bắt đầu reo.',
    },
    {
      english: 'The sun was setting behind the hills as we arrived at the campsite.',
      vietnamese: 'Mặt trời đang lặn sau những ngọn đồi khi chúng tôi đến khu cắm trại (mặt trời lặn là bối cảnh nền tự nhiên).',
    },
    {
      english: 'First, she checked the passport details, then she stamped the visa and handed it back.',
      vietnamese: 'Đầu tiên cô ấy kiểm tra thông tin hộ chiếu, sau đó đóng dấu thị thực và trả lại.',
    },
    {
      english: 'I was listening to the podcast, so I did not hear the doorbell ring the first time.',
      vietnamese: 'Tôi đang nghe tệp âm thanh nên đã không nghe thấy tiếng chuông cửa reo lần đầu.',
    },
  ],
  contrasts: [
    {
      form: 'Past Continuous (was doing) vs Past Simple (did)',
      whyFits: 'Past Continuous đưa người nghe vào giữa tiến trình của một hành động chưa hoàn thành tại thời điểm được nhắc đến.',
      whyNot: 'Past Simple coi hành động là một sự kiện trọn vẹn, đã hoàn tất và kết thúc trong quá khứ.',
    },
    {
      form: 'While + Past Continuous vs When + Past Simple',
      whyFits: '"While" đi liền với hành động kéo dài làm nền (While I was sleeping...).',
      whyNot: '"When" thường giới thiệu mốc thời gian hoặc sự kiện ngắn cắt ngang hành động nền (When the phone rang...).',
    },
  ],
  commonMistakes: [
    'Dùng Past Continuous cho cả chuỗi hành động theo thứ tự trước sau: "He was opening the door, was taking off his coat, and was sitting down" (khi muốn kể chuỗi sự kiện nối tiếp nhau dứt khoát, chuẩn mực là dùng Past Simple: opened, took off, sat down).',
    'Dùng "while" đi với hành động được nhìn nhận như một điểm mốc tức thời thay vì dùng "when": "While the bell suddenly rang..." (chuẩn mực là When the bell suddenly rang).',
    'Lẫn lộn giữa góc nhìn trọn vẹn (Past Simple) và góc nhìn tiến trình chưa hoàn thành (Past Continuous) khi xây dựng bối cảnh cho sự việc cắt ngang.',
  ],
  summary: 'Kể chuyện: dùng Past Continuous làm khung nền, Past Simple cho sự kiện xen vào hoặc chuỗi hành động nối tiếp theo thứ tự thời gian.',
  exercises: [
    {
      id: 'grammar-v2-b1-narrative-past-sequence-01-q1',
      kind: 'choice',
      prompt: 'Use Past Continuous for the action in progress as background: "While Sarah ___ her presentation slides, the projector suddenly went dark."',
      options: [
        { text: 'was showing', correct: true, rationale: 'Was showing nhấn mạnh tiến trình trình chiếu đang diễn ra làm nền cho sự cố tắt máy chiếu.' },
        { text: 'showed', correct: false, rationale: 'Showed can describe a completed event; this prompt asks to present the action as the continuing background.' },
        { text: 'shows', correct: false, rationale: 'Shows là hiện tại đơn, không phù hợp với mạch trần thuật trong quá khứ.' },
      ],
      acceptedAnswers: [{ text: 'was showing', rationale: 'Past Continuous (was showing) làm nổi bật bối cảnh đang diễn ra sau liên từ While.' }],
    },
    {
      id: 'grammar-v2-b1-narrative-past-sequence-01-q2',
      kind: 'choice',
      prompt: 'Tom unlocked the bicycle, adjusted the seat, and ___ down the hill.',
      options: [
        { text: 'rode', correct: true, rationale: 'Chuỗi hành động dứt điểm nối tiếp nhau (unlocked -> adjusted -> rode) đều dùng thì Quá khứ đơn.' },
        { text: 'was riding', correct: false, rationale: 'Was riding diễn tả hành động đang tiếp diễn, không phải bước nối tiếp trong chuỗi hành động dứt điểm.' },
        { text: 'had ridden', correct: false, rationale: 'Had ridden chỉ hành động đã hoàn tất trước một mốc khác, không hợp với chuỗi hành động liền mạch.' },
      ],
      acceptedAnswers: [{ text: 'rode', rationale: 'Past Simple dùng cho chuỗi hành động nối tiếp nhau.' }],
    },
    {
      id: 'grammar-v2-b1-narrative-past-sequence-01-q3',
      kind: 'choice',
      prompt: 'Chọn dạng động từ diễn đạt điểm mốc bắt đầu dứt khoát cắt ngang bối cảnh: "The children were playing outside in the garden when the storm ___ ."',
      options: [
        { text: 'began', correct: true, rationale: 'Began diễn tả điểm mốc bắt đầu dứt khoát của cơn bão cắt ngang hoạt động vui chơi của bọn trẻ.' },
        { text: 'was beginning', correct: false, rationale: 'Was beginning miêu tả quá trình khởi đầu từ từ, nhưng ở đây bối cảnh cắt ngang đột ngột ưu tiên điểm mốc dứt khoát began.' },
        { text: 'begins', correct: false, rationale: 'Begins là hiện tại đơn, không hòa hợp với câu kể chuyện quá khứ.' },
      ],
      acceptedAnswers: [{ text: 'began', rationale: 'When + Past Simple (began) diễn đạt điểm mốc sự kiện cắt ngang.' }],
    },
    {
      id: 'grammar-v2-b1-narrative-past-sequence-01-q4',
      kind: 'choice',
      prompt: 'We ___ dinner at seven o’clock yesterday evening when the courier arrived with the package.',
      options: [
        { text: 'were having', correct: true, rationale: 'Were having diễn tả hành động ăn tối đang diễn ra tại mốc thời gian đó khi người giao hàng đến.' },
        { text: 'had', correct: false, rationale: 'Had không thể hiện được tính tiếp diễn làm nền khi người giao hàng đến xen vào.' },
        { text: 'have had', correct: false, rationale: 'Have had là hiện tại hoàn thành, không dùng cho mạch trần thuật quá khứ có mốc thời gian rõ ràng.' },
      ],
      acceptedAnswers: [{ text: 'were having', rationale: 'Past Continuous diễn tả hành động đang diễn ra tại thời điểm bị cắt ngang.' }],
    },
    {
      id: 'grammar-v2-b1-narrative-past-sequence-01-q5',
      kind: 'gap',
      prompt: 'While the mechanic was inspecting the brakes, he ___ (notice) a deep crack in the metal disc.',
      options: [],
      acceptedAnswers: [
        { text: 'noticed', rationale: 'Hành động nhận ra (notice) là sự việc xảy ra tức thì xen vào tiến trình kiểm tra phanh xe.' },
      ],
    },
    {
      id: 'grammar-v2-b1-narrative-past-sequence-01-q6',
      kind: 'gap',
      prompt: 'The manager walked into the hall, greeted the audience, and ___ (start) his opening speech.',
      options: [],
      acceptedAnswers: [
        { text: 'started', rationale: 'Chuỗi hành động nối tiếp nhau theo thứ tự thời gian dùng Quá khứ đơn (started).' },
      ],
    },
    {
      id: 'grammar-v2-b1-narrative-past-sequence-01-q7',
      kind: 'gap',
      prompt: 'As the airplane ___ (descend) through the thick clouds, the captain turned on the seatbelt sign.',
      options: [],
      acceptedAnswers: [
        { text: 'was descending', rationale: 'Máy bay đang hạ độ cao là bối cảnh nền đang diễn ra (Past Continuous).' },
      ],
    },
    {
      id: 'grammar-v2-b1-narrative-past-sequence-01-q8',
      kind: 'gap',
      prompt: 'I was writing an email when my laptop suddenly ___ (shut) down completely.',
      options: [],
      acceptedAnswers: [
        { text: 'shut', rationale: 'Động từ shut ở dạng quá khứ đơn (shut - shut - shut) diễn tả sự cố sập nguồn đột ngột.' },
      ],
    },
    {
      id: 'grammar-v2-b1-narrative-past-sequence-01-q9',
      kind: 'transform',
      prompt: 'Kết hợp hai câu thành một câu dùng "While": "David was walking in the park. He found a lost kitten."',
      options: [],
      acceptedAnswers: [
        { text: 'While David was walking in the park, he found a lost kitten.', rationale: 'Mệnh đề While đi với Quá khứ tiếp diễn làm nền, mệnh đề chính dùng Quá khứ đơn.' },
        { text: 'David found a lost kitten while he was walking in the park.', rationale: 'Mệnh đề While có thể đứng ở vế sau của câu.' },
      ],
    },
    {
      id: 'grammar-v2-b1-narrative-past-sequence-01-q10',
      kind: 'transform',
      prompt: 'Viết lại câu sau bắt đầu bằng "We were having a meeting when..." để chỉ sự kiện xen vào: "During our meeting, the power cut occurred."',
      options: [],
      acceptedAnswers: [
        { text: 'We were having a meeting when the power cut occurred.', rationale: 'Dùng Quá khứ tiếp diễn chỉ hoạt động đang diễn ra và when nối sự kiện mất điện xen vào.' },
        { text: 'We were having a meeting when the power cut happened.', rationale: 'Biến thể tự nhiên dùng động từ happened thay cho occurred.' },
      ],
    },
    {
      id: 'grammar-v2-b1-narrative-past-sequence-01-q11',
      kind: 'correction',
      prompt: 'Sửa lỗi thì trong câu sau: "He was getting up, was brushing his teeth, and went to work."',
      options: [],
      acceptedAnswers: [
        { text: 'He got up, brushed his teeth, and went to work.', rationale: 'Chuỗi hành động liên tiếp nhau phải dùng toàn bộ thì Quá khứ đơn.' },
      ],
    },
    {
      id: 'grammar-v2-b1-narrative-past-sequence-01-q12',
      kind: 'correction',
      prompt: 'To show the glass striking the floor and breaking on impact, replace "While" with the more suitable linker: "While the glass dropped on the tile floor, it shattered into pieces."',
      options: [],
      acceptedAnswers: [
        { text: 'When the glass dropped on the tile floor, it shattered into pieces.', rationale: 'When phù hợp hơn với hành động rơi chạm sàn tức thời, trong khi While thường giới thiệu một tiến trình kéo dài.' },
      ],
    },
  ],
  reviewExercises: [
    {
      id: 'grammar-v2-b1-narrative-past-sequence-01-r1',
      kind: 'choice',
      prompt: 'The police officer questioned the witness while the forensic team ___ the scene.',
      options: [
        { text: 'was examining', correct: true, rationale: 'Hai hành động quá khứ cùng diễn ra song song hoặc một hành động làm nền cho hành động kia.' },
        { text: 'examined', correct: false, rationale: 'Không thể hiện rõ nét tính chất tiến trình bối cảnh đang diễn ra bằng thể tiếp diễn.' },
        { text: 'examines', correct: false, rationale: 'Sai thì, không dùng thì hiện tại trong lời kể quá khứ.' },
      ],
      acceptedAnswers: [{ text: 'was examining', rationale: 'Past continuous làm nền cho hoạt động điều tra.' }],
    },
    {
      id: 'grammar-v2-b1-narrative-past-sequence-01-r2',
      kind: 'gap',
      prompt: 'Emma closed her diary, blew out the candle, and ___ (turn) off the desk lamp.',
      options: [],
      acceptedAnswers: [
        { text: 'turned', rationale: 'Chuỗi hành động liên tiếp trong quá khứ dùng Quá khứ đơn.' },
      ],
    },
    {
      id: 'grammar-v2-b1-narrative-past-sequence-01-r3',
      kind: 'transform',
      prompt: 'Kết hợp hai câu dùng "when": "They were packing their suitcases. The taxi driver sounded the horn."',
      options: [],
      acceptedAnswers: [
        { text: 'They were packing their suitcases when the taxi driver sounded the horn.', rationale: 'Hành động bóp còi là sự kiện cắt ngang khi đang đóng hành lý.' },
      ],
    },
    {
      id: 'grammar-v2-b1-narrative-past-sequence-01-r4',
      kind: 'correction',
      prompt: 'Viết lại câu sau, chuyển động từ sau "While" sang thì Quá khứ tiếp diễn để nhấn mạnh bối cảnh nền đang diễn ra: "While I walked home yesterday, it started to snow heavily."',
      options: [],
      acceptedAnswers: [
        { text: 'While I was walking home yesterday, it started to snow heavily.', rationale: 'Dùng Quá khứ tiếp diễn (was walking) để nhấn mạnh tiến trình đi bộ làm nền cho sự việc tuyết bắt đầu rơi.' },
      ],
    },
  ],
  outputPrompts: [
    {
      id: 'grammar-v2-b1-narrative-past-sequence-01-o1',
      prompt: 'Viết một đoạn văn ngắn (3–4 câu) kể lại một sự cố nhỏ bất ngờ xảy ra khi bạn đang làm việc gì đó, sử dụng kết hợp Past Simple, Past Continuous và từ nối (while, suddenly, then).',
      modelAnswer: 'Yesterday afternoon, while I was preparing dinner in the kitchen, the smoke alarm suddenly went off. I quickly turned off the gas stove and opened all the windows. Then, I realized that some bread in the toaster had burned.',
      checks: [
        'Có ít nhất một câu dùng Past Continuous làm nền với while hoặc as.',
        'Có ít nhất một câu dùng Past Simple cho sự kiện bất ngờ hoặc chuỗi hành động tiếp theo.',
        'Sử dụng đúng các từ nối thời gian như suddenly, then, when.',
      ],
    },
    {
      id: 'grammar-v2-b1-narrative-past-sequence-01-o2',
      prompt: 'Kể lại 3 hành động nối tiếp nhau bạn đã làm vào sáng nay khi thức dậy, sử dụng Quá khứ đơn và các từ nối thứ tự (first, then, after that).',
      modelAnswer: 'First, I turned off my alarm clock and got out of bed at six o’clock. Then, I washed my face and drank a large glass of warm water. After that, I prepared a quick cup of coffee before leaving for work.',
      checks: [
        'Sử dụng đúng thì Past Simple cho toàn bộ chuỗi hành động nối tiếp.',
        'Dùng các liên từ chỉ thứ tự thời gian như first, then, after that.',
        'Không dùng nhầm thì tiếp diễn cho chuỗi hành động dứt điểm.',
      ],
    },
  ],
  sources: [
    {
      id: 'cambridge-past-continuous',
      title: 'Cambridge Grammar: Past continuous and past simple',
      url: 'https://dictionary.cambridge.org/grammar/british-grammar/past-continuous-or-past-simple',
      claims: ['Phối hợp thì quá khứ đơn và quá khứ tiếp diễn trong trần thuật và chuỗi sự kiện'],
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
