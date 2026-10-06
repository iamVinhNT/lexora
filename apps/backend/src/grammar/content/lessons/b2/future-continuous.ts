/**
 * @file future-continuous.ts
 * @description Lesson: Tương lai tiếp diễn (Future Continuous).
 */
import type { GrammarLesson } from '../../types.js';

const lesson: GrammarLesson = {
  id: 'grammar-v2-b2-future-continuous-03',
  revisionId: 'grammar-v2-b2-future-continuous-03@1.0.0',
  revision: '1.0.0',
  title: 'Tương lai tiếp diễn',
  objective: 'Nắm vững cấu trúc will be + V-ing để diễn tả hành động đang diễn ra tại một thời điểm tương lai, sự việc theo lịch trình tự nhiên, và câu hỏi lịch sự về dự định.',
  prerequisiteIds: ['grammar-v2-b2-future-perfect-02'],
  coverage: ['future-continuous', 'future-aspect', 'b2-grammar'],
  context: {
    english: 'At ten o\'clock tomorrow morning, the surgical specialists will be performing a groundbreaking cardiac procedure in the main operating theater.',
    vietnamese: 'Vào lúc mười giờ sáng mai, các chuyên gia phẫu thuật sẽ đang thực hiện một ca mổ tim đột phá trong phòng phẫu thuật chính.',
  },
  guide: {
    pattern: 'S + will be + V-ing | S + will not (won\'t) be + V-ing | Will + S + be + V-ing?',
    whenToUse: [
      'Diễn tả hành động đang trong tiến trình diễn ra tại một thời điểm xác định trong tương lai.',
      'Diễn tả sự việc sẽ xảy ra theo thông lệ thường lệ hoặc lịch trình tự nhiên mà không cần can thiệp ý chí.',
      'Hỏi thăm kế hoạch của người khác một cách lịch sự, trang trọng mà không tạo cảm giác ép buộc.',
    ],
    signalWords: ['at this time tomorrow', 'at 8 o\'clock tomorrow', 'this time next week', 'during the seminar'],
    check: [
      'Có mốc thời điểm cụ thể chỉ hành động đang diễn ra dở dang lúc đó không?',
      'Some verbs are rarely used in continuous forms with stative meanings (for example, know and belong); usage depends on the meaning of the verb.'
    ],
  },
  explanation: 'Thì tương lai tiếp diễn (Future Continuous) được tạo bởi will be + V-ing.\nBa cách dùng đặc trưng ở trình độ B2:\n1. Hành động đang diễn ra tại một thời điểm cụ thể: "This time next Friday, I will be flying over the Alps."\n2. Sự việc xảy ra như một phần của thói quen/lịch trình tự nhiên: "I will be seeing Paul at the faculty meeting tomorrow as usual."\n3. Thăm dò lịch sự (polite inquiry): "Will you be using the laboratory equipment this afternoon?" (hỏi khéo léo để biết liệu mình có thể mượn dùng được không).',
  examples: [
    {
      english: 'This time next Monday, our delegation will be attending the summit plenary.',
      vietnamese: 'Vào giờ này thứ Hai tới, phái đoàn của chúng tôi sẽ đang tham dự phiên toàn thể hội nghị thượng đỉnh.',
    },
    {
      english: 'Please do not phone between two and four; we will be interviewing job applicants.',
      vietnamese: 'Xin đừng gọi điện trong khoảng từ hai đến bốn giờ; lúc đó chúng tôi sẽ đang phỏng vấn ứng viên.',
    },
    {
      english: 'Will you be passing by the pharmacy on your way home this afternoon?',
      vietnamese: 'Chiều nay bạn có tiện đường đi ngang qua hiệu thuốc không? (câu hỏi thăm dò lịch sự).',
    },
    {
      english: 'As usual, Professor Vance will be giving his weekly tutorial on Thursday morning.',
      vietnamese: 'Như thường lệ, giáo sư Vance sẽ tổ chức buổi hướng dẫn hàng tuần vào sáng thứ Năm.',
    },
    {
      english: 'They won\'t be playing football tomorrow because the stadium is under renovation.',
      vietnamese: 'Họ sẽ không đá bóng vào ngày mai vì sân vận động đang được nâng cấp.',
    },
    {
      english: 'In an hour\'s time, hundreds of commuters will be boarding the express shuttle.',
      vietnamese: 'Một tiếng nữa, hàng trăm hành khách đi làm sẽ đang lên chuyến xe buýt nhanh.',
    },
  ],
  contrasts: [
    {
      form: 'will be doing vs will do',
      whyFits: '"Will you be using the scanner?" hỏi tế nhị về kế hoạch tự nhiên của người nghe.',
      whyNot: '"Will you use the scanner?" có thể nghe như lời yêu cầu hoặc ép người khác thực hiện.',
    },
    {
      form: 'will be doing vs will have done',
      whyFits: '"At noon I will be chairing the meeting" nghĩa là tôi đang chủ trì dở cuộc họp lúc 12 giờ.',
      whyNot: '"By noon I will have finished the meeting" nghĩa là cuộc họp đã kết thúc trước hoặc đúng 12 giờ.',
    },
  ],
  commonMistakes: [
    'Quên "be" trong cấu trúc: viết "I will working" thay vì "I will be working".',
    'Dùng thì tiếp diễn với động từ trạng thái: viết "I will be knowing" thay vì "I will know".',
    'Nhầm lẫn với Future Perfect khi gặp mốc thời điểm ("at 5 PM" dùng continuous, còn "by 5 PM" dùng perfect).',
  ],
  summary: 'Future Continuous (will be + V-ing) diễn tả hành động đang diễn ra tại mốc tương lai, sự việc theo lịch trình tự nhiên hoặc câu hỏi thăm dò lịch sự.',
  exercises: [
    {
      id: 'grammar-v2-b2-future-continuous-03-q1',
      kind: 'choice',
      prompt: 'At eight o\'clock tonight, we ___ the live broadcast of the international debate.',
      options: [
        { text: 'will be watching', correct: true, rationale: 'Thời điểm cụ thể "At eight o\'clock tonight" chỉ hành động đang diễn ra dở dang.' },
        { text: 'will have watched', correct: false, rationale: 'Không phải hành động kết thúc trước 8 giờ.' },
        { text: 'watch', correct: false, rationale: 'Hiện tại đơn không phù hợp với kế hoạch xem chương trình trực tiếp tối nay.' },
      ],
      acceptedAnswers: [{ text: 'will be watching', rationale: 'will be watching diễn tả hành động đang diễn ra tại mốc 8 giờ tối.' }],
    },
    {
      id: 'grammar-v2-b2-future-continuous-03-q2',
      kind: 'choice',
      prompt: 'To ask a colleague politely if you can borrow their laptop later, which question is best?',
      options: [
        { text: 'Will you be using your laptop this afternoon?', correct: true, rationale: 'Future Continuous dùng để thăm dò kế hoạch lịch sự, tránh áp đặt.' },
        { text: 'Will you use your laptop this afternoon?', correct: false, rationale: 'Tương lai đơn có thể gây cảm giác tra hỏi hoặc yêu cầu trực diện.' },
        { text: 'Do you use your laptop this afternoon?', correct: false, rationale: 'Hiện tại đơn sai ngữ pháp khi hỏi về chiều nay.' },
      ],
      acceptedAnswers: [{ text: 'Will you be using your laptop this afternoon?', rationale: 'Dạng câu hỏi lịch sự về dự định với Future Continuous.' }],
    },
    {
      id: 'grammar-v2-b2-future-continuous-03-q3',
      kind: 'choice',
      prompt: 'This time next month, Amanda ___ over tropical rainforests on her aerial survey.',
      options: [
        { text: 'will be flying', correct: true, rationale: '"This time next month" là dấu hiệu điển hình của hành động đang diễn ra trong tương lai.' },
        { text: 'will fly', correct: false, rationale: 'Không thể hiện rõ tính chất đang bay tại đúng thời điểm đó.' },
        { text: 'flies', correct: false, rationale: 'Hiện tại đơn không thể hiện trạng thái tiếp diễn cụ thể này.' },
      ],
      acceptedAnswers: [{ text: 'will be flying', rationale: 'will be flying diễn tả trạng thái đang bay tại thời điểm mốc.' }],
    },
    {
      id: 'grammar-v2-b2-future-continuous-03-q4',
      kind: 'choice',
      prompt: 'We can talk to the department director tomorrow because I ___ him in the lounge as usual.',
      options: [
        { text: 'will be seeing', correct: true, rationale: 'Diễn tả sự việc xảy ra tự nhiên theo thông lệ hằng ngày (as usual).' },
        { text: 'will have seen', correct: false, rationale: 'Hoàn thành trước mốc thời gian không đúng ngữ cảnh gặp gỡ thông thường.' },
        { text: 'am seen', correct: false, rationale: 'Thể bị động sai nghĩa chủ động của chủ ngữ I.' },
      ],
      acceptedAnswers: [{ text: 'will be seeing', rationale: 'will be seeing diễn tả sự kiện diễn ra tự nhiên theo thói quen.' }],
    },
    {
      id: 'grammar-v2-b2-future-continuous-03-q5',
      kind: 'gap',
      prompt: 'Don\'t telephone the clinic at noon; the doctors ___ (conduct) staff evaluations then.',
      options: [],
      acceptedAnswers: [{ text: 'will be conducting', rationale: 'will be conducting diễn tả hành động đang diễn ra tại mốc 12 giờ trưa.' }],
    },
    {
      id: 'grammar-v2-b2-future-continuous-03-q6',
      kind: 'gap',
      prompt: 'During the conference dinner, the orchestra ___ (play) classical chamber music.',
      options: [],
      acceptedAnswers: [{ text: 'will be playing', rationale: 'will be playing diễn tả hành động chơi nhạc liên tục xuyên suốt bữa tối hội nghị.' }],
    },
    {
      id: 'grammar-v2-b2-future-continuous-03-q7',
      kind: 'gap',
      prompt: '___ you ___ (drive) into town later? Could you drop this package at the post office?',
      options: [],
      acceptedAnswers: [
        { text: 'Will you be driving', rationale: 'Câu hỏi thăm dò lịch sự bằng Future Continuous.' },
      ],
    },
    {
      id: 'grammar-v2-b2-future-continuous-03-q8',
      kind: 'gap',
      prompt: 'At this hour tomorrow, the logistics crew ___ (unload) the cargo containers.',
      options: [],
      acceptedAnswers: [{ text: 'will be unloading', rationale: 'will be unloading diễn tả hành động đang bốc dỡ tại giờ này ngày mai.' }],
    },
    {
      id: 'grammar-v2-b2-future-continuous-03-q9',
      kind: 'transform',
      prompt: 'I have a routine meeting with Sarah tomorrow morning. -> I ___ Sarah tomorrow morning as part of my routine schedule.',
      options: [],
      acceptedAnswers: [
        { text: 'will be meeting', rationale: 'Dùng will be meeting để diễn tả cuộc gặp theo lịch trình thông thường.' },
      ],
    },
    {
      id: 'grammar-v2-b2-future-continuous-03-q10',
      kind: 'transform',
      prompt: 'Can you politely inquire if the technician plans to use the testing suite later? -> Will you ___ the testing suite later?',
      options: [],
      acceptedAnswers: [
        { text: 'be using', rationale: 'Hoàn thành câu hỏi lịch sự: Will you be using the testing suite later?' },
      ],
    },
    {
      id: 'grammar-v2-b2-future-continuous-03-q11',
      kind: 'correction',
      prompt: 'Sửa lỗi cấu trúc thì tương lai tiếp diễn: "At 3 PM tomorrow, our analysts will reviewing the market trends."',
      options: [],
      acceptedAnswers: [
        { text: 'At 3 PM tomorrow, our analysts will be reviewing the market trends.', rationale: 'Thiếu trợ động từ "be" trong cấu trúc will be + V-ing.' },
      ],
    },
    {
      id: 'grammar-v2-b2-future-continuous-03-q12',
      kind: 'correction',
      prompt: 'Sửa lỗi dùng động từ trạng thái: "Next year, the scholars will be understanding the complete manuscript."',
      options: [],
      acceptedAnswers: [
        { text: 'Next year, the scholars will understand the complete manuscript.', rationale: 'understand là động từ trạng thái (stative verb), không chia ở thì tiếp diễn.' },
      ],
    },
  ],
  reviewExercises: [
    {
      id: 'grammar-v2-b2-future-continuous-03-r1',
      kind: 'choice',
      prompt: 'At midnight tonight, our flight ___ over the Pacific Ocean.',
      options: [
        { text: 'will be cruising', correct: true, rationale: 'Chỉ hành động đang diễn ra tại đúng thời điểm nửa đêm.' },
        { text: 'cruises', correct: false, rationale: 'Hiện tại đơn không thể hiện hành động đang tiếp diễn tại mốc cụ thể này.' },
        { text: 'will have cruised', correct: false, rationale: 'Không nhấn mạnh sự kết thúc trước nửa đêm.' },
      ],
      acceptedAnswers: [{ text: 'will be cruising', rationale: 'will be cruising diễn tả trạng thái đang bay ở mốc nửa đêm.' }],
    },
    {
      id: 'grammar-v2-b2-future-continuous-03-r2',
      kind: 'gap',
      prompt: 'Professor Evans ___ (lecture) on quantum mechanics all morning tomorrow.',
      options: [],
      acceptedAnswers: [{ text: 'will be lecturing', rationale: 'will be lecturing diễn tả hành động giảng bài kéo dài suốt buổi sáng mai.' }],
    },
    {
      id: 'grammar-v2-b2-future-continuous-03-r3',
      kind: 'transform',
      prompt: 'Are you going to the bakery later? (Make it a polite inquiry with Future Continuous) -> ___ to the bakery later?',
      options: [],
      acceptedAnswers: [
        { text: 'Will you be going', rationale: 'Dạng câu hỏi lịch sự bằng Future Continuous.' },
      ],
    },
    {
      id: 'grammar-v2-b2-future-continuous-03-r4',
      kind: 'correction',
      prompt: 'Sửa lỗi chia động từ: "This time next week, we will be relax on a sunny beach in Da Nang."',
      options: [],
      acceptedAnswers: [
        { text: 'This time next week, we will be relaxing on a sunny beach in Da Nang.', rationale: 'Sau will be động từ phải ở dạng V-ing (relaxing).' },
      ],
    },
  ],
  outputPrompts: [
    {
      id: 'grammar-v2-b2-future-continuous-03-o1',
      prompt: 'Viết 1 câu tiếng Anh miêu tả bạn hoặc một người thân sẽ đang làm gì vào một thời điểm cụ thể ngày mai (sử dụng mốc thời gian như "At 8 PM tomorrow" hoặc "This time tomorrow" và cấu trúc will be + V-ing).',
      modelAnswer: 'At this time tomorrow, I will be presenting our research findings to the academic board.',
      checks: [
        'Có cụm từ chỉ thời điểm cụ thể trong tương lai (ví dụ: At this time tomorrow, At 9 AM tomorrow)',
        'Sử dụng chính xác cấu trúc Future Continuous (will be + V-ing)',
        'Động từ miêu tả hành động đang diễn ra hợp lý với ngữ cảnh',
      ],
    },
    {
      id: 'grammar-v2-b2-future-continuous-03-o2',
      prompt: 'Viết 1 câu hỏi tiếng Anh lịch sự hỏi về kế hoạch của đồng nghiệp hoặc bạn bè (ví dụ: hỏi xem họ có lái xe đi làm hay dùng máy tính sau đó không) bằng cấu trúc "Will you be + V-ing...?".',
      modelAnswer: 'Will you be driving past the supermarket on your way home this evening?',
      checks: [
        'Bắt đầu bằng cấu trúc Will you be + V-ing',
        'Thể hiện sắc thái thăm dò lịch sự, không ép buộc',
        'Câu hỏi chuẩn ngữ pháp và chấm câu hỏi (?)',
      ],
    },
  ],
  sources: [
    {
      id: 'cambridge-future-continuous',
      title: 'Cambridge Grammar: Future continuous (will be doing)',
      url: 'https://dictionary.cambridge.org/grammar/british-grammar/future-continuous',
      claims: ['Future continuous refers to temporary actions in progress at a future time or polite inquiries about routines.'],
      checkedAt: '2026-10-05',
      provenance: 'reference-only',
    },
    {
      id: 'bc-future-continuous',
      title: 'British Council: Future continuous',
      url: 'https://learnenglish.britishcouncil.org/grammar/b1-b2-grammar/future-continuous-future-perfect',
      claims: ['Used for actions in progress in the future, routine events, and polite questions about plans.'],
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
