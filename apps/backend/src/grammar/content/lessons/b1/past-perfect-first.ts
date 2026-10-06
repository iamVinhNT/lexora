/**
 * @file past-perfect-first.ts
 * @description Bài học B1 về thì quá khứ hoàn thành (Past Perfect Simple: had + V3/ed).
 */
import type { GrammarLesson } from '../../types.js';

const lesson: GrammarLesson = {
  id: 'grammar-v2-b1-past-perfect-first-02',
  revisionId: 'grammar-v2-b1-past-perfect-first-02@1.0.0',
  revision: '1.0.0',
  title: 'Thì quá khứ hoàn thành (Past Perfect Simple)',
  objective: 'Sử dụng had + quá khứ phân từ để xác định rõ hành động đã hoàn tất trước một thời điểm hoặc một hành động khác trong quá khứ.',
  prerequisiteIds: ['grammar-v2-b1-narrative-past-sequence-01'],
  coverage: ['past-perfect-first', 'past-perfect-simple', 'action-before-past', 'had-past-participle', 'b1-grammar'],
  context: {
    english: 'When Mark reached the cinema lobby at eight, the screening had already started. His friends had bought his ticket in advance, but they had gone inside because they did not want to miss the preview.',
    vietnamese: 'Khi Mark đến sảnh rạp chiếu phim lúc 8 giờ, buổi chiếu đã bắt đầu rồi. Bạn bè đã mua sẵn vé cho anh, nhưng họ đã vào trong vì không muốn bỏ lỡ phần giới thiệu.',
  },
  guide: {
    pattern: 'Khẳng định: S + had + V3/ed; Phủ định: S + had not (hadn\'t) + V3/ed; Nghi vấn: Had + S + V3/ed?',
    whenToUse: [
      'Diễn tả một hành động xảy ra và hoàn tất trước một mốc thời gian hoặc một hành động khác trong quá khứ.',
      'Làm rõ thứ tự trước-sau khi người nói kể lại các sự việc không theo thứ tự thời gian tự nhiên.',
      'Dùng kèm các liên từ và trạng từ: by the time, before, after, already, just, never... before.',
    ],
    signalWords: ['by the time', 'before', 'after', 'already', 'just', 'by then', 'until that day'],
    check: [
      'Hành động này có diễn ra và kết thúc trước một mốc quá khứ khác không?',
      'Có mốc quá khứ (Past Simple) làm điểm tựa để lùi về Quá khứ hoàn thành hay không?',
    ],
  },
  explanation: 'Thì Quá khứ hoàn thành (Past Perfect: had + V3/ed) đóng vai trò là "quá khứ của quá khứ" (past of the past). Khi mạch kể chuyện đang neo ở một thời điểm quá khứ (Past Simple), mọi sự việc đã xảy ra và hoàn thành trước thời điểm đó đều được đưa về Quá khứ hoàn thành. Điều này giúp người nghe phân biệt rạch ròi hành động nào diễn ra trước (hành động 1: Past Perfect) và hành động nào diễn ra sau (hành động 2: Past Simple). Không dùng Quá khứ hoàn thành chỉ vì sự việc xảy ra rất xa xôi trong lịch sử; thì này chỉ xuất hiện khi có một điểm mốc quá khứ khác để đối chiếu.',
  examples: [
    {
      english: 'By the time the fire brigade arrived, the neighbors had put out the flames.',
      vietnamese: 'Trước khi đội cứu hỏa đến (hành động sau), hàng xóm đã dập tắt ngọn lửa (hành động trước).',
    },
    {
      english: 'She realized that she had left her house keys on the kitchen counter.',
      vietnamese: 'Cô ấy nhận ra (Past Simple) rằng mình đã để quên chìa khóa nhà trên kệ bếp (xảy ra trước lúc nhận ra).',
    },
    {
      english: 'They had never flown in an airplane before their trip to Tokyo last year.',
      vietnamese: 'Họ chưa từng đi máy bay bao giờ trước chuyến đi Tokyo năm ngoái.',
    },
    {
      english: 'The museum had closed by the time we walked up the entrance steps.',
      vietnamese: 'Bảo tàng đã đóng cửa trước khi chúng tôi bước lên các bậc thềm lối vào.',
    },
    {
      english: 'After he had finished writing the project summary, he emailed it to his supervisor.',
      vietnamese: 'Sau khi đã viết xong bản tóm tắt dự án, anh ấy gửi thư điện tử cho người giám sát.',
    },
    {
      english: 'I felt confident during the test because I had revised all the grammar rules.',
      vietnamese: 'Tôi cảm thấy tự tin trong bài kiểm tra vì trước đó tôi đã ôn lại toàn bộ các quy tắc ngữ pháp.',
    },
  ],
  contrasts: [
    {
      form: 'Past Perfect (had done) vs Past Simple (did)',
      whyFits: 'Past Perfect nhấn mạnh hành động đã hoàn tất trước mốc quá khứ khác (When we arrived, the train had left).',
      whyNot: 'Past Simple chỉ hai hành động xảy ra nối tiếp nhau (When we arrived, the train left: chúng tôi đến rồi tàu mới rời đi).',
    },
    {
      form: 'Past Perfect (had lived) vs Present Perfect (have lived)',
      whyFits: 'Past Perfect nhìn lại một khoảng thời gian kết thúc trước một mốc quá khứ (He had lived there for ten years before moving in 2020).',
      whyNot: 'Present Perfect kéo dài sự việc hoặc kết quả từ quá khứ đến tận thời điểm hiện tại đang nói.',
    },
  ],
  commonMistakes: [
    'Dùng Past Perfect đơn độc khi không có bất kỳ mốc quá khứ nào để so sánh: "I had visited Paris in 2018" (sai, chỉ cần Past Simple: I visited Paris in 2018).',
    'Nhầm lẫn thứ tự: chia hành động xảy ra sau ở Past Perfect và hành động xảy ra trước ở Past Simple.',
    'Dùng nhầm trợ động từ have/has thay vì had khi lùi về quá khứ: "When she arrived, they have finished" (sai, phải là had finished).',
  ],
  summary: 'Past Perfect (had + V3/ed) dùng cho hành động hoàn tất trước một hành động hoặc mốc thời gian khác trong quá khứ.',
  exercises: [
    {
      id: 'grammar-v2-b1-past-perfect-first-02-q1',
      kind: 'choice',
      prompt: 'When we got to the airport gate, the flight ___ already ___ .',
      options: [
        { text: 'had / departed', correct: true, rationale: 'Máy bay cất cánh trước khi chúng tôi đến cổng, dùng had departed.' },
        { text: 'has / departed', correct: false, rationale: 'Has departed là hiện tại hoàn thành, không thể kết hợp với mốc quá khứ "got to".' },
        { text: 'was / departing', correct: false, rationale: 'Was departing chỉ hành động đang diễn ra, không diễn đạt sự việc đã hoàn tất trước đó.' },
      ],
      acceptedAnswers: [{ text: 'had / departed', rationale: 'Had departed diễn tả hành động cất cánh hoàn tất trước mốc quá khứ.' }],
    },
    {
      id: 'grammar-v2-b1-past-perfect-first-02-q2',
      kind: 'choice',
      prompt: 'Jessica was extremely nervous because she ___ in public before.',
      options: [
        { text: 'had never spoken', correct: true, rationale: 'Kinh nghiệm chưa từng xảy ra trước thời điểm quá khứ (was nervous) dùng Past Perfect.' },
        { text: 'has never spoken', correct: false, rationale: 'Has never spoken là hiện tại hoàn thành, không phù hợp với mốc quá khứ was.' },
        { text: 'never spoke', correct: false, rationale: 'Never spoke thiếu sự đối chiếu tính hoàn tất trước mốc quá khứ.' },
      ],
      acceptedAnswers: [{ text: 'had never spoken', rationale: 'Past Perfect diễn tả trải nghiệm trước một thời điểm quá khứ.' }],
    },
    {
      id: 'grammar-v2-b1-past-perfect-first-02-q3',
      kind: 'choice',
      prompt: 'Use the Past Perfect to make the earlier action explicit: By the time the doctor reached the room, the nurse ___ the patient\'s temperature.',
      options: [
        { text: 'had already taken', correct: true, rationale: 'Hành động đo nhiệt độ xảy ra trước khi bác sĩ bước vào phòng.' },
        { text: 'already took', correct: false, rationale: 'Past Simple can also be grammatical when the sequence is clear; this prompt specifically asks for Past Perfect.' },
        { text: 'takes', correct: false, rationale: 'Takes là hiện tại đơn, sai thì hoàn toàn.' },
      ],
      acceptedAnswers: [{ text: 'had already taken', rationale: 'The prompt specifically asks for Past Perfect to make the earlier action explicit.' }],
    },
    {
      id: 'grammar-v2-b1-past-perfect-first-02-q4',
      kind: 'choice',
      prompt: 'He could not withdraw any money from the ATM because he ___ his bank card at the restaurant.',
      options: [
        { text: 'had lost', correct: true, rationale: 'Việc mất thẻ xảy ra trước lúc không rút được tiền từ cây ATM.' },
        { text: 'has lost', correct: false, rationale: 'Has lost là hiện tại hoàn thành, không đi với could not trong quá khứ.' },
        { text: 'was losing', correct: false, rationale: 'Was losing là quá khứ tiếp diễn, mất thẻ là sự việc hoàn tất chứ không phải tiến trình.' },
      ],
      acceptedAnswers: [{ text: 'had lost', rationale: 'Had lost diễn tả nguyên nhân đã xảy ra trước mốc quá khứ.' }],
    },
    {
      id: 'grammar-v2-b1-past-perfect-first-02-q5',
      kind: 'gap',
      prompt: 'Before she moved to London in 2022, Claire ___ (live) in Manchester for eight years.',
      options: [],
      acceptedAnswers: [
        { text: 'had lived', rationale: 'Hành động sống ở Manchester diễn ra và hoàn thành trước mốc chuyển đến London năm 2022.' },
      ],
    },
    {
      id: 'grammar-v2-b1-past-perfect-first-02-q6',
      kind: 'gap',
      prompt: 'When David arrived home, he saw that someone ___ (break) the front window.',
      options: [],
      acceptedAnswers: [
        { text: 'had broken', rationale: 'Ai đó đã làm vỡ cửa sổ trước lúc David về đến nhà nhìn thấy.' },
      ],
    },
    {
      id: 'grammar-v2-b1-past-perfect-first-02-q7',
      kind: 'gap',
      prompt: 'They could not board the ferry because they ___ (not book) their tickets online.',
      options: [],
      acceptedAnswers: [
        { text: 'had not booked', rationale: 'Dạng phủ định had not booked (hoặc hadn\'t booked) diễn tả việc chưa đặt vé trước đó.' },
        { text: "hadn't booked", rationale: 'Dạng viết tắt của had not booked.' },
      ],
    },
    {
      id: 'grammar-v2-b1-past-perfect-first-02-q8',
      kind: 'gap',
      prompt: 'By the time the meeting ended, all the participants ___ (sign) the agreement.',
      options: [],
      acceptedAnswers: [
        { text: 'had signed', rationale: 'Hành động ký thỏa thuận hoàn tất trước mốc cuộc họp kết thúc.' },
      ],
    },
    {
      id: 'grammar-v2-b1-past-perfect-first-02-q9',
      kind: 'transform',
      prompt: 'Kết hợp hai câu thành một câu dùng "By the time": "The rain stopped. We arrived at the campsite."',
      options: [],
      acceptedAnswers: [
        { text: 'By the time we arrived at the campsite, the rain had stopped.', rationale: 'Mệnh đề by the time dùng Past Simple, mệnh đề chính xảy ra trước dùng Past Perfect.' },
      ],
    },
    {
      id: 'grammar-v2-b1-past-perfect-first-02-q10',
      kind: 'transform',
      prompt: 'Viết lại câu sau dùng "After" và Quá khứ hoàn thành: "Paul read the report, then he signed the contract."',
      options: [],
      acceptedAnswers: [
        { text: 'After Paul had read the report, he signed the contract.', rationale: 'Hành động đọc báo cáo xảy ra trước nên dùng Past Perfect sau After.' },
        { text: 'After he had read the report, Paul signed the contract.', rationale: 'Cách viết đảo chủ ngữ đại từ sau After.' },
      ],
    },
    {
      id: 'grammar-v2-b1-past-perfect-first-02-q11',
      kind: 'correction',
      prompt: 'Sửa lỗi thì trong câu: "When the teacher collected the test papers, I have not finished the last question."',
      options: [],
      acceptedAnswers: [
        { text: 'When the teacher collected the test papers, I had not finished the last question.', rationale: 'Mốc collected ở quá khứ nên phải dùng had not finished thay vì have not finished.' },
        { text: "When the teacher collected the test papers, I hadn't finished the last question.", rationale: 'Dạng rút gọn hadn\'t finished.' },
      ],
    },
    {
      id: 'grammar-v2-b1-past-perfect-first-02-q12',
      kind: 'correction',
      prompt: 'Sửa lỗi thừa thì trong câu độc lập không có mốc so sánh: "Columbus had discovered America in 1492."',
      options: [],
      acceptedAnswers: [
        { text: 'Columbus discovered America in 1492.', rationale: 'Sự kiện lịch sử có năm cụ thể không so sánh với mốc quá khứ khác chỉ dùng Quá khứ đơn.' },
      ],
    },
  ],
  reviewExercises: [
    {
      id: 'grammar-v2-b1-past-perfect-first-02-r1',
      kind: 'choice',
      prompt: 'Karen didn\'t recognize her former classmate because he ___ his hair style completely.',
      options: [
        { text: 'had changed', correct: true, rationale: 'Hành động thay đổi kiểu tóc xảy ra trước lúc Karen gặp lại và không nhận ra.' },
        { text: 'has changed', correct: false, rationale: 'Has changed là hiện tại hoàn thành, không hòa hợp với didn\'t recognize trong quá khứ.' },
        { text: 'was changing', correct: false, rationale: 'Was changing là quá khứ tiếp diễn, không diễn đạt sự thay đổi đã hoàn tất.' },
      ],
      acceptedAnswers: [{ text: 'had changed', rationale: 'Past Perfect diễn tả sự việc hoàn thành trước mốc quá khứ.' }],
    },
    {
      id: 'grammar-v2-b1-past-perfect-first-02-r2',
      kind: 'gap',
      prompt: 'The concert hall was completely dark because the performance ___ (already / start).',
      options: [],
      acceptedAnswers: [
        { text: 'had already started', rationale: 'Buổi biểu diễn đã bắt đầu trước khi khán phòng trở nên tối om.' },
      ],
    },
    {
      id: 'grammar-v2-b1-past-perfect-first-02-r3',
      kind: 'transform',
      prompt: 'Kết hợp hai câu dùng "Before": "They sold their house. Then they moved to Spain."',
      options: [],
      acceptedAnswers: [
        { text: 'They had sold their house before they moved to Spain.', rationale: 'Hành động bán nhà xảy ra trước hành động chuyển đến Tây Ban Nha.' },
        { text: 'Before they moved to Spain, they had sold their house.', rationale: 'Đảo mệnh đề Before lên đầu câu.' },
      ],
    },
    {
      id: 'grammar-v2-b1-past-perfect-first-02-r4',
      kind: 'correction',
      prompt: 'Sửa lỗi sai trong câu: "By ten o\'clock last night, all the guests left the party."',
      options: [],
      acceptedAnswers: [
        { text: 'By ten o\'clock last night, all the guests had left the party.', rationale: 'Cụm By + mốc thời gian quá khứ đòi hỏi thì Quá khứ hoàn thành (had left).' },
      ],
    },
  ],
  outputPrompts: [
    {
      id: 'grammar-v2-b1-past-perfect-first-02-o1',
      prompt: 'Viết 2–3 câu kể về một tình huống bạn đến trễ một sự kiện hoặc cuộc hẹn và điều gì đã xảy ra trước khi bạn tới, sử dụng Past Perfect (had + V3/ed).',
      modelAnswer: 'When I arrived at the bus terminal yesterday morning, the express coach had already departed. The ticket agent told me that the previous driver had left five minutes early because all the seats were full.',
      checks: [
        'Sử dụng chính xác cấu trúc had + V3/ed cho sự việc xảy ra trước.',
        'Có mốc quá khứ rõ ràng (When I arrived...) để làm điểm tựa đối chiếu.',
        'Giải thích hợp lý lý do hoặc bối cảnh liên quan.',
      ],
    },
    {
      id: 'grammar-v2-b1-past-perfect-first-02-o2',
      prompt: 'Viết 2 câu miêu tả một kinh nghiệm bạn chưa từng trải qua trước một mốc thời gian trong quá khứ, sử dụng "never... before" với Past Perfect.',
      modelAnswer: 'Before I traveled to Da Lat last winter, I had never experienced such chilly weather in Vietnam. I had never worn a heavy wool coat before that holiday.',
      checks: [
        'Sử dụng cấu trúc had never + V3/ed.',
        'Có cụm từ chỉ mốc thời gian quá khứ (before I traveled / before that holiday).',
        'Câu đúng ngữ pháp và tự nhiên.',
      ],
    },
  ],
  sources: [
    {
      id: 'cambridge-past-perfect',
      title: 'Cambridge Grammar: Past perfect simple (had done)',
      url: 'https://dictionary.cambridge.org/grammar/british-grammar/past-perfect-simple',
      claims: ['Sử dụng Quá khứ hoàn thành để chỉ hành động hoàn tất trước một mốc hoặc hành động quá khứ khác'],
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
