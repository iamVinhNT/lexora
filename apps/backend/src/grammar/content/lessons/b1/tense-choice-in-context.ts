/**
 * @file tense-choice-in-context.ts
 * @description Bài học B1 về phối hợp và lựa chọn thì trong ngữ cảnh đoạn văn và hội thoại.
 */
import type { GrammarLesson } from '../../types.js';

const lesson: GrammarLesson = {
  id: 'grammar-v2-b1-tense-choice-in-context-06',
  revisionId: 'grammar-v2-b1-tense-choice-in-context-06@1.0.0',
  revision: '1.0.0',
  title: 'Lựa chọn và phối hợp thì trong ngữ cảnh (Tense Choice in Context)',
  objective: 'Phối hợp linh hoạt giữa Quá khứ đơn, Quá khứ tiếp diễn, Quá khứ hoàn thành và các thì Hiện tại hoàn thành để tạo nên văn bản trần thuật hoặc hội thoại mạch lạc.',
  prerequisiteIds: ['grammar-v2-b1-stative-action-verbs-05'],
  coverage: ['tense-choice-in-context', 'past-narrative-tenses', 'perfect-vs-past', 'discourse-tense-harmony', 'b1-grammar'],
  context: {
    english: 'When Detective Miller arrived at the studio yesterday, officers had already cordoned off the alley. Rain was pouring down heavily, and a nervous witness, who has lived on that street for thirty years, was waiting to give a statement.',
    vietnamese: 'Khi thám tử Miller đến xưởng phim vào ngày hôm qua, các sĩ quan đã phong tỏa con hẻm từ trước. Mưa đang trút xuống xối xả, và một nhân chứng đầy lo lắng, người đã sống trên con phố đó 30 năm qua, đang đợi để cung cấp lời khai.',
  },
  guide: {
    pattern: 'Mốc neo quá khứ: Past Simple; Tiến trình nền: Past Continuous; Sự kiện tiền đề: Past Perfect; Cầu nối tới hiện tại: Present Perfect (Simple / Continuous)',
    whenToUse: [
      'Xác định mốc thời gian trung tâm của câu chuyện (thường là Quá khứ đơn).',
      'Đưa các sự kiện đã xảy ra trước mốc trung tâm về Quá khứ hoàn thành để người đọc nắm rõ trình tự nhân quả.',
      'Dùng Quá khứ tiếp diễn cho các yếu tố khung cảnh xung quanh và chuyển sang Hiện tại hoàn thành khi người nói bình luận về mối liên hệ kéo dài tới hiện tại.',
    ],
    signalWords: ['by the time', 'while', 'already', 'since', 'for years', 'when', 'suddenly', 'so far'],
    check: [
      'Không đổi thì tùy tiện giữa các câu nếu góc nhìn thời gian không thay đổi.',
      'Sự việc đã hoàn tất tại thời điểm quá khứ cụ thể không dùng Present Perfect.',
      'Động từ chỉ trạng thái (nhận thức, sở hữu) giữ nguyên ở thể đơn ngay cả trong bối cảnh nền kéo dài.',
    ],
  },
  explanation: 'Trong giao tiếp thực tế và văn bản mạch lạc, các thì tiếng Anh không đứng riêng rẽ mà tạo thành một hệ thống phối hợp chặt chẽ. Khi viết một đoạn văn kể chuyện hoặc giải thích:\n1. Điểm tựa chính (Anchor point): Thường là thì Quá khứ đơn (Past Simple), định vị chuỗi sự kiện chính theo thứ tự thời gian.\n2. Khung nền (Background frame): Quá khứ tiếp diễn (Past Continuous) giúp người nghe hình dung hoàn cảnh xung quanh (thời tiết, hoạt động đang diễn ra đồng thời).\n3. Lớp sâu hơn (Flashback / Pre-past): Quá khứ hoàn thành (Past Perfect) giải thích lý do hoặc sự kiện đã hoàn tất trước mốc neo chính, giải tỏa câu hỏi "Tại sao tình huống lúc đó lại như vậy?".\n4. Mối liên hệ hiện tại (Present relevance): Hiện tại hoàn thành (Present Perfect Simple/Continuous) xuất hiện khi người kể chuyển từ việc trần thuật quá khứ sang nhận định, đánh giá về kết quả hoặc thói quen còn tồn tại đến tận lúc nói.',
  examples: [
    {
      english: 'We arrived at the summit at noon; the guide had already pitched the tents.',
      vietnamese: 'Chúng tôi lên đến đỉnh núi lúc trưa; người dẫn đường đã dựng xong các lều từ trước.',
    },
    {
      english: 'While the technician was checking the wiring, the main generator suddenly cut out.',
      vietnamese: 'Trong khi kỹ thuật viên đang kiểm tra đường dây, máy phát điện chính đột ngột ngắt kết nối.',
    },
    {
      english: 'She has worked for this charity since 2018, but yesterday she announced her resignation.',
      vietnamese: 'Cô ấy đã làm việc cho tổ chức từ thiện này từ năm 2018, nhưng hôm qua cô đã thông báo từ chức.',
    },
    {
      english: 'By the time I reached the bus stop, the coach had left, so I had to call a taxi.',
      vietnamese: 'Trước khi tôi ra đến trạm xe buýt, xe khách đã rời đi, nên tôi đã phải gọi xe taxi.',
    },
    {
      english: 'His eyes were tired because he had been driving through the heavy fog for five hours.',
      vietnamese: 'Mắt anh ấy mỏi nhừ vì anh đã lái xe liên tục qua làn sương mù dày đặc suốt năm tiếng đồng hồ.',
    },
    {
      english: 'I have known Peter for years, yet I only discovered his talent for painting last weekend.',
      vietnamese: 'Tôi đã quen biết Peter nhiều năm nay, thế nhưng tôi mới chỉ phát hiện ra tài năng hội họa của anh ấy vào cuối tuần trước.',
    },
  ],
  contrasts: [
    {
      form: 'had left vs left vs has left',
      whyFits: 'When we got home, my brother had left (rời đi trước khi chúng tôi về đến nhà).',
      whyNot: 'has left không kết hợp với mốc quá khứ "When we got home"; còn left chỉ hành động xảy ra sau hoặc ngay tại thời điểm về nhà.',
    },
    {
      form: 'was working vs has been working',
      whyFits: 'He was working when the fire alarm rang (tiến trình làm việc bị cắt ngang trong quá khứ).',
      whyNot: 'He has been working since 8 AM (tiến trình làm việc nối dài tới hiện tại lúc nói).',
    },
  ],
  commonMistakes: [
    'Chuyển đổi thì lộn xộn trong cùng một mạch trần thuật: dùng lẫn lộn Hiện tại đơn và Quá khứ đơn khi kể lại câu chuyện hôm qua mà không có chủ ý nghệ thuật.',
    'Dùng Hiện tại hoàn thành cho sự việc có mốc thời gian dứt điểm trong quá khứ: nói "I have met him yesterday" (sai, phải là "I met him yesterday").',
    'Dùng Quá khứ đơn thay vì Quá khứ hoàn thành khi quan hệ trước - sau là yếu tố then chốt để hiểu nguyên nhân sự việc.',
  ],
  summary: 'Phối hợp thì trong đoạn văn: xác định mốc neo quá khứ (Past Simple), lùi trước mốc neo dùng Past Perfect, khung cảnh nền dùng Past Continuous, và kết nối hiện tại dùng Present Perfect.',
  exercises: [
    {
      id: 'grammar-v2-b1-tense-choice-in-context-06-q1',
      kind: 'choice',
      prompt: 'Xác định thì thích hợp cho hành động xảy ra trước mốc quá khứ: "When the conference organizer took the stage, the guest speaker ___ his opening slides."',
      options: [
        { text: 'had already prepared', correct: true, rationale: 'Hành động chuẩn bị slide hoàn tất trước khi người tổ chức bước lên sân khấu, dùng Past Perfect.' },
        { text: 'has already prepared', correct: false, rationale: 'Has already prepared là hiện tại hoàn thành, không hòa hợp với mốc quá khứ took the stage.' },
        { text: 'was already preparing', correct: false, rationale: 'Was preparing chỉ tiến trình đang làm dở, không thể hiện việc chuẩn bị đã xong xuôi.' },
      ],
      acceptedAnswers: [{ text: 'had already prepared', rationale: 'Past Perfect diễn tả hành động hoàn tất trước mốc quá khứ took the stage.' }],
    },
    {
      id: 'grammar-v2-b1-tense-choice-in-context-06-q2',
      kind: 'choice',
      prompt: 'Chọn thì thích hợp để nhấn mạnh bối cảnh thời tiết đang diễn ra khi sự kiện chính xảy đến: "Outside the cabin, snow ___ quietly while we were lighting the fireplace."',
      options: [
        { text: 'was falling', correct: true, rationale: 'Tuyết rơi là bối cảnh nền đang tiếp diễn song song với hành động nhóm lửa.' },
        { text: 'fell', correct: false, rationale: 'Fell coi hành động như một điểm mốc hoàn tất trọn vẹn, ít thể hiện tính bối cảnh nền êm đềm.' },
        { text: 'has fallen', correct: false, rationale: 'Has fallen là hiện tại hoàn thành, sai hệ thống thì quá khứ của đoạn văn.' },
      ],
      acceptedAnswers: [{ text: 'was falling', rationale: 'Past Continuous miêu tả bối cảnh nền đang diễn ra.' }],
    },
    {
      id: 'grammar-v2-b1-tense-choice-in-context-06-q3',
      kind: 'choice',
      prompt: 'Chọn thì phù hợp diễn tả tình trạng kéo dài đến hiện tại của người tham gia câu chuyện: "Julia joined our firm last month, but she ___ in software development for over a decade."',
      options: [
        { text: 'has worked', correct: true, rationale: 'Kinh nghiệm kéo dài qua một thập kỷ đến hiện tại dùng Present Perfect Simple.' },
        { text: 'had worked', correct: false, rationale: 'Had worked ngụ ý kinh nghiệm này đã chấm dứt hoàn toàn trước tháng trước, không còn giá trị tới hiện tại.' },
        { text: 'worked', correct: false, rationale: 'Worked không làm nổi bật liên kết thời lượng kéo dài tới thời điểm nói bằng Present Perfect.' },
      ],
      acceptedAnswers: [{ text: 'has worked', rationale: 'Present Perfect liên kết kinh nghiệm cả thập kỷ tới hiện tại.' }],
    },
    {
      id: 'grammar-v2-b1-tense-choice-in-context-06-q4',
      kind: 'choice',
      prompt: 'Chọn thì diễn tả sự việc xảy ra tại thời điểm xác định trong quá khứ: "We ___ all our luggage at the hotel reception yesterday morning."',
      options: [
        { text: 'left', correct: true, rationale: 'Mốc thời gian xác định yesterday morning đòi hỏi thì Quá khứ đơn.' },
        { text: 'have left', correct: false, rationale: 'Hiện tại hoàn thành không đi với trạng từ thời gian quá khứ dứt điểm yesterday morning.' },
        { text: 'had left', correct: false, rationale: 'Không có mốc quá khứ thứ hai nào để đối chiếu thì Quá khứ hoàn thành.' },
      ],
      acceptedAnswers: [{ text: 'left', rationale: 'Past Simple đi với mốc thời gian dứt điểm yesterday morning.' }],
    },
    {
      id: 'grammar-v2-b1-tense-choice-in-context-06-q5',
      kind: 'gap',
      prompt: 'By the time the rescue team reached the campsite, the climbers ___ (build) a temporary shelter.',
      options: [],
      acceptedAnswers: [
        { text: 'had built', rationale: 'Hành động dựng lều tạm xảy ra trước khi đội cứu hộ đến nơi (By the time + Past Simple -> Past Perfect).' },
      ],
    },
    {
      id: 'grammar-v2-b1-tense-choice-in-context-06-q6',
      kind: 'gap',
      prompt: 'While the children were watching cartoons, their father ___ (cook) soup in the kitchen.',
      options: [],
      acceptedAnswers: [
        { text: 'was cooking', rationale: 'Hai hành động song song làm nền cho nhau trong quá khứ cùng dùng Past Continuous.' },
        { text: 'cooked', rationale: 'Past Simple cũng được chấp nhận khi coi việc nấu súp là hành động hoàn tất trong khoảng thời gian đó.' },
      ],
    },
    {
      id: 'grammar-v2-b1-tense-choice-in-context-06-q7',
      kind: 'gap',
      prompt: 'I first met Clara five years ago, and we ___ (be) close friends ever since.',
      options: [],
      acceptedAnswers: [
        { text: 'have been', rationale: 'Ever since kết nối tình bạn từ quá khứ đến hiện tại, dùng Present Perfect.' },
      ],
    },
    {
      id: 'grammar-v2-b1-tense-choice-in-context-06-q8',
      kind: 'gap',
      prompt: 'Last night at eight o\'clock, Anthony ___ (repair) his bicycle in the garage.',
      options: [],
      acceptedAnswers: [
        { text: 'was repairing', rationale: 'Hành động đang diễn ra tại một mốc thời gian cụ thể trong quá khứ (last night at eight o\'clock).' },
      ],
    },
    {
      id: 'grammar-v2-b1-tense-choice-in-context-06-q9',
      kind: 'transform',
      prompt: 'Bắt đầu bằng "Before Marcus submitted the application, he had..." để kết hợp hai sự việc: "Marcus revised his CV carefully. Then he submitted the job application."',
      options: [],
      acceptedAnswers: [
        { text: 'Before Marcus submitted the application, he had revised his CV carefully.', rationale: 'Hành động chỉnh sửa CV xảy ra trước nên dùng Past Perfect sau mệnh đề Before.' },
        { text: 'Before Marcus submitted the job application, he had revised his CV carefully.', rationale: 'Biến thể giữ nguyên cụm the job application.' },
      ],
    },
    {
      id: 'grammar-v2-b1-tense-choice-in-context-06-q10',
      kind: 'transform',
      prompt: 'Bắt đầu bằng "While we were having dinner,..." để diễn đạt sự việc xen vào: "During our dinner, the electricity suddenly failed."',
      options: [],
      acceptedAnswers: [
        { text: 'While we were having dinner, the electricity suddenly failed.', rationale: 'Dùng Quá khứ tiếp diễn làm bối cảnh nền và Quá khứ đơn cho sự cố mất điện.' },
      ],
    },
    {
      id: 'grammar-v2-b1-tense-choice-in-context-06-q11',
      kind: 'correction',
      prompt: 'Sửa lỗi dùng thì Hiện tại hoàn thành với mốc thời gian dứt điểm: "I have visited the national museum two weeks ago."',
      options: [],
      acceptedAnswers: [
        { text: 'I visited the national museum two weeks ago.', rationale: 'Two weeks ago là mốc thời gian dứt điểm trong quá khứ, bắt buộc dùng Past Simple.' },
      ],
    },
    {
      id: 'grammar-v2-b1-tense-choice-in-context-06-q12',
      kind: 'correction',
      prompt: 'Sửa lỗi thiếu hòa hợp thì trong câu có mốc trước - sau: "By the time the bell rang, the students finished their exam papers."',
      options: [],
      acceptedAnswers: [
        { text: 'By the time the bell rang, the students had finished their exam papers.', rationale: 'Hành động nộp bài xong trước khi chuông reo đòi hỏi thì Quá khứ hoàn thành had finished.' },
      ],
    },
  ],
  reviewExercises: [
    {
      id: 'grammar-v2-b1-tense-choice-in-context-06-r1',
      kind: 'choice',
      prompt: 'When we stepped onto the balcony, the morning mist ___ over the lake.',
      options: [
        { text: 'was rising', correct: true, rationale: 'Sương mù đang bốc lên là khung cảnh nền được chứng kiến tại thời điểm bước ra ban công.' },
        { text: 'has risen', correct: false, rationale: 'Hiện tại hoàn thành không hòa hợp với mốc quá khứ stepped.' },
        { text: 'rises', correct: false, rationale: 'Hiện tại đơn sai thì trong mạch kể chuyện quá khứ.' },
      ],
      acceptedAnswers: [{ text: 'was rising', rationale: 'Past Continuous miêu tả khung cảnh nền.' }],
    },
    {
      id: 'grammar-v2-b1-tense-choice-in-context-06-r2',
      kind: 'gap',
      prompt: 'They could not board the ferry because they ___ (lose) their travel vouchers.',
      options: [],
      acceptedAnswers: [
        { text: 'had lost', rationale: 'Mất phiếu voucher xảy ra trước thời điểm không thể lên phà (Past Perfect).' },
      ],
    },
    {
      id: 'grammar-v2-b1-tense-choice-in-context-06-r3',
      kind: 'transform',
      prompt: 'Bắt đầu bằng "After the guests had departed,..." để viết lại: "All the guests departed. Then Karen cleaned the living room."',
      options: [],
      acceptedAnswers: [
        { text: 'After the guests had departed, Karen cleaned the living room.', rationale: 'Khách rời đi trước dùng Past Perfect, hành động dọn phòng xảy ra sau dùng Past Simple.' },
      ],
    },
    {
      id: 'grammar-v2-b1-tense-choice-in-context-06-r4',
      kind: 'correction',
      prompt: 'Sửa lỗi sai thì trong câu có liên từ nối từ quá khứ đến hiện tại: "She lived in this neighborhood since her childhood and she still loves it."',
      options: [],
      acceptedAnswers: [
        { text: 'She has lived in this neighborhood since her childhood and she still loves it.', rationale: 'Since her childhood nối tới hiện tại (still loves it) đòi hỏi thì Hiện tại hoàn thành has lived.' },
        { text: 'She has been living in this neighborhood since her childhood and she still loves it.', rationale: 'Dùng Hiện tại hoàn thành tiếp diễn nhấn mạnh sự liên tục.' },
      ],
    },
  ],
  outputPrompts: [
    {
      id: 'grammar-v2-b1-tense-choice-in-context-06-o1',
      prompt: 'Viết một đoạn văn ngắn (3–4 câu) kể lại một sự cố hoặc bất ngờ trong chuyến đi du lịch của bạn, kết hợp ít nhất ba thì: Past Simple, Past Continuous và Past Perfect.',
      modelAnswer: 'Last summer, when we arrived at our mountain cabin, the rain was pouring down violently. We discovered that the previous guests had forgotten to lock the terrace door, so water had leaked across the floor. We immediately put our bags down and started mopping the hallway.',
      checks: [
        'Dùng Past Simple cho chuỗi hành động chính (arrived, discovered, put down, started).',
        'Dùng Past Continuous cho bối cảnh nền (was pouring down).',
        'Dùng Past Perfect cho sự việc hoàn tất trước đó (had forgotten, had leaked).',
        'Mạch kể chuyện tự nhiên, liên kết thì chặt chẽ.',
      ],
    },
    {
      id: 'grammar-v2-b1-tense-choice-in-context-06-o2',
      prompt: 'Viết 2–3 câu giới thiệu về công việc hoặc sở thích của bạn, kết hợp mốc thời gian bắt đầu trong quá khứ (Past Simple) và khoảng thời gian bạn đã duy trì đến nay (Present Perfect Simple hoặc Continuous).',
      modelAnswer: 'I first discovered photography in 2021 when my grandfather gave me his vintage camera. Since that day, I have been taking photos of city architecture, and I have collected hundreds of memorable prints.',
      checks: [
        'Dùng Past Simple cho mốc thời gian bắt đầu cụ thể trong quá khứ (first discovered, gave).',
        'Dùng Present Perfect cho tiến trình hoặc kết quả kéo dài tới hiện tại (have been taking, have collected).',
        'Liên từ thời gian (since that day, in 2021) được sử dụng chính xác.',
      ],
    },
  ],
  sources: [
    {
      id: 'cambridge-narrative-tenses',
      title: 'Cambridge Grammar: Narrative tenses and discourse coherence',
      url: 'https://dictionary.cambridge.org/grammar/british-grammar/narrative-tenses',
      claims: ['Phối hợp các thì quá khứ và hiện tại hoàn thành trong diễn ngôn trần thuật'],
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
