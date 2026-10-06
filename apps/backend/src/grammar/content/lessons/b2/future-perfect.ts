/**
 * @file future-perfect.ts
 * @description Lesson: Tương lai hoàn thành (Future Perfect).
 */
import type { GrammarLesson } from '../../types.js';

const lesson: GrammarLesson = {
  id: 'grammar-v2-b2-future-perfect-02',
  revisionId: 'grammar-v2-b2-future-perfect-02@1.0.0',
  revision: '1.0.0',
  title: 'Tương lai hoàn thành',
  objective: 'Nắm vững cấu trúc will have + V3/ed để diễn đạt một hành động hoặc trạng thái sẽ hoàn tất trước một thời điểm hoặc sự kiện khác trong tương lai.',
  prerequisiteIds: ['grammar-v2-b2-past-perfect-continuous-01'],
  coverage: ['future-perfect', 'future-aspect', 'b2-grammar'],
  context: {
    english: 'By the time the new high-speed rail opens next autumn, engineers will have completed three years of rigorous safety testing.',
    vietnamese: 'Trước thời điểm tuyến đường sắt cao tốc mới khai trương vào mùa thu tới, các kỹ sư sẽ đã hoàn thành ba năm thử nghiệm an toàn nghiêm ngặt.',
  },
  guide: {
    pattern: 'S + will have + V3/ed | S + will not (won\'t) have + V3/ed | Will + S + have + V3/ed?',
    whenToUse: [
      'Diễn tả hành động sẽ hoàn thành xong trước một thời điểm xác định trong tương lai.',
      'Dự tính mốc hoàn tất của dự án, tiến độ công việc hoặc mục tiêu cá nhân.',
    ],
    signalWords: ['by tomorrow', 'by the time', 'by the end of this month', 'in two years\' time', 'before'],
    check: [
      'Thường dùng by/before để nêu mốc hoàn tất; mốc có thể được hiểu từ ngữ cảnh và "by" không tự nó bắt buộc dùng Future Perfect.',
      'Mệnh đề thời gian sau by the time có chia ở hiện tại đơn (không dùng will) không?',
    ],
  },
  explanation: 'Thì tương lai hoàn thành (Future Perfect - will have + V3/ed) nhìn từ hiện tại tới một mốc tương lai và khẳng định hành động sẽ kết thúc trước mốc đó.\nĐiểm then chốt cần ghi nhớ: Trong mệnh đề phụ chỉ thời gian bắt đầu bằng "by the time" hoặc "before", ta dùng thì Hiện tại đơn (Present Simple), trong khi mệnh đề chính dùng Tương lai hoàn thành (Future Perfect). Không dùng "will" trong mệnh đề thời gian.',
  examples: [
    {
      english: 'By 2030, the metropolitan area will have built ten additional solar farms.',
      vietnamese: 'Trước năm 2030, khu vực đô thị sẽ đã xây dựng thêm mười trang trại năng lượng mặt trời.',
    },
    {
      english: 'Don\'t call at eight; I won\'t have finished my evening lecture yet.',
      vietnamese: 'Đừng gọi lúc tám giờ nhé; lúc đó tôi vẫn chưa kết thúc bài giảng tối đâu.',
    },
    {
      english: 'Will you have written the final summary before the board meeting begins?',
      vietnamese: 'Bạn sẽ viết xong bản tóm tắt cuối cùng trước khi cuộc họp ban giám đốc bắt đầu chứ?',
    },
    {
      english: 'By this time next month, they will have lived in London for a whole decade.',
      vietnamese: 'Tính đến thời điểm này tháng sau, họ sẽ đã sống ở London tròn một thập kỷ.',
    },
    {
      english: 'The courier will have delivered all urgent parcels by six o\'clock this evening.',
      vietnamese: 'Nhân viên chuyển phát sẽ đã giao toàn bộ bưu kiện hỏa tốc trước sáu giờ tối nay.',
    },
    {
      english: 'By the time she graduates, she will have acquired extensive lab experience.',
      vietnamese: 'Trước khi cô ấy tốt nghiệp, cô ấy sẽ đã tích lũy được nhiều kinh nghiệm thực nghiệm.',
    },
  ],
  contrasts: [
    {
      form: 'will have finished vs will finish',
      whyFits: '"I will have finished the report by noon" chỉ rõ báo cáo được nộp trước hoặc đúng 12 giờ trưa.',
      whyNot: '"I will finish the report at noon" ngụ ý hành động kết thúc xảy ra ngay tại thời điểm 12 giờ.',
    },
    {
      form: 'will have done vs will be doing',
      whyFits: '"She will have completed the exam by three" tập trung vào sự kiện đã kết thúc.',
      whyNot: '"She will be writing the exam at two" nhấn mạnh quá trình đang diễn ra lúc hai giờ.',
    },
  ],
  commonMistakes: [
    'Dùng will trong mệnh đề chỉ thời gian: viết "By the time he will arrive" thay vì "By the time he arrives".',
    'Cho rằng mọi câu có "by" đều cần Future Perfect: "I will complete it by Friday" cũng đúng khi chỉ nêu hạn hoàn thành; Future Perfect nhấn mạnh hoàn tất trước mốc tham chiếu.',
    'Nhầm lẫn trợ động từ hoàn thành (viết "will has finished" thay vì "will have finished").',
  ],
  summary: 'Future Perfect (will have + V3/ed) nhấn mạnh một hành động sẽ hoàn tất trước một thời điểm hoặc sự kiện khác trong tương lai.',
  exercises: [
    {
      id: 'grammar-v2-b2-future-perfect-02-q1',
      kind: 'choice',
      prompt: 'By the end of this semester, Professor Miller ___ over two hundred thesis drafts.',
      options: [
        { text: 'will have evaluated', correct: true, rationale: 'Có mốc "By the end of this semester" chỉ hành động hoàn tất trước mốc tương lai.' },
        { text: 'will evaluate', correct: false, rationale: 'Tương lai đơn không nhấn mạnh tính hoàn thành trước mốc thời gian.' },
        { text: 'has evaluated', correct: false, rationale: 'Hiện tại hoàn thành không dùng cho thời điểm tương lai chưa tới.' },
      ],
      acceptedAnswers: [{ text: 'will have evaluated', rationale: 'will have evaluated diễn tả sự hoàn tất trước mốc cuối học kỳ.' }],
    },
    {
      id: 'grammar-v2-b2-future-perfect-02-q2',
      kind: 'choice',
      prompt: 'By the time the guests reach the venue, the catering team ___ the banquet tables.',
      options: [
        { text: 'will have arranged', correct: true, rationale: 'Mệnh đề chính dùng future perfect đối chiếu với mệnh đề thời gian "By the time the guests reach".' },
        { text: 'will arrange', correct: false, rationale: 'Không thể hiện tính xong xuôi trước khi khách đến.' },
        { text: 'had arranged', correct: false, rationale: 'Quá khứ hoàn thành không phối hợp với ngữ cảnh tương lai.' },
      ],
      acceptedAnswers: [{ text: 'will have arranged', rationale: 'will have arranged diễn tả việc bày tiệc hoàn tất trước khi khách tới.' }],
    },
    {
      id: 'grammar-v2-b2-future-perfect-02-q3',
      kind: 'choice',
      prompt: 'In five years\' time, the municipal council ___ the complete underground transit link.',
      options: [
        { text: 'will have constructed', correct: true, rationale: '"In five years\' time" là dấu hiệu mốc thời gian tương lai hoàn thành.' },
        { text: 'constructed', correct: false, rationale: 'Quá khứ đơn sai ngữ cảnh tương lai.' },
        { text: 'is constructing', correct: false, rationale: 'Hiện tại tiếp diễn không thể hiện kết quả hoàn tất trước mốc.' },
      ],
      acceptedAnswers: [{ text: 'will have constructed', rationale: 'will have constructed diễn tả công trình sẽ hoàn thành trong 5 năm tới.' }],
    },
    {
      id: 'grammar-v2-b2-future-perfect-02-q4',
      kind: 'choice',
      prompt: 'Will the technicians ___ the software migration before business hours commence tomorrow?',
      options: [
        { text: 'have completed', correct: true, rationale: 'Cấu trúc câu hỏi Future Perfect: Will + S + have + V3/ed.' },
        { text: 'had completed', correct: false, rationale: 'Không dùng had sau trợ động từ Will.' },
        { text: 'have completing', correct: false, rationale: 'Phải dùng dạng phân từ hai (completed), không dùng V-ing.' },
      ],
      acceptedAnswers: [{ text: 'have completed', rationale: 'Cấu trúc nghi vấn Future Perfect hoàn chỉnh.' }],
    },
    {
      id: 'grammar-v2-b2-future-perfect-02-q5',
      kind: 'gap',
      prompt: 'By this time next week, we ___ (submit) our revised research proposals to the committee.',
      options: [],
      acceptedAnswers: [{ text: 'will have submitted', rationale: 'will have submitted thể hiện việc nộp đề xuất hoàn thành trước tuần sau.' }],
    },
    {
      id: 'grammar-v2-b2-future-perfect-02-q6',
      kind: 'gap',
      prompt: 'The medical team ___ (not finish) the patient assessments before noon, so please wait.',
      options: [],
      acceptedAnswers: [
        { text: 'will not have finished', rationale: 'will not have finished diễn tả hành động chưa hoàn tất trước mốc trưa.' },
        { text: "won't have finished", rationale: 'Dạng viết tắt chuẩn của will not have finished.' },
      ],
    },
    {
      id: 'grammar-v2-b2-future-perfect-02-q7',
      kind: 'gap',
      prompt: 'By the time you return from your holiday, the painters ___ (redecorate) the entire office.',
      options: [],
      acceptedAnswers: [{ text: 'will have redecorated', rationale: 'will have redecorated diễn tả việc trang trí xong trước khi bạn trở về.' }],
    },
    {
      id: 'grammar-v2-b2-future-perfect-02-q8',
      kind: 'gap',
      prompt: 'In two months, Dr. Roberts ___ (work) at this institute for twenty-five years.',
      options: [],
      acceptedAnswers: [{ text: 'will have worked', rationale: 'will have worked diễn tả tích lũy thời gian làm việc đến mốc hai tháng nữa.' }],
    },
    {
      id: 'grammar-v2-b2-future-perfect-02-q9',
      kind: 'transform',
      prompt: 'I will write the final chapter. Then I will go to bed at midnight. -> By midnight, I ___ the final chapter.',
      options: [],
      acceptedAnswers: [
        { text: 'will have written', rationale: 'Viết xong trước mốc nửa đêm dùng will have written.' },
      ],
    },
    {
      id: 'grammar-v2-b2-future-perfect-02-q10',
      kind: 'transform',
      prompt: 'The delegates arrive at four. The organizers will prepare the conference packets beforehand. -> By the time the delegates arrive, the organizers ___ the conference packets.',
      options: [],
      acceptedAnswers: [
        { text: 'will have prepared', rationale: 'Dùng will have prepared để chỉ hành động chuẩn bị xong trước khi đại biểu tới.' },
      ],
    },
    {
      id: 'grammar-v2-b2-future-perfect-02-q11',
      kind: 'correction',
      prompt: 'Sửa lỗi sai thì trong mệnh đề thời gian: "By the time the manager will return, we will have drafted the contract."',
      options: [],
      acceptedAnswers: [
        { text: 'By the time the manager returns, we will have drafted the contract.', rationale: 'Mệnh đề sau By the time phải chia ở thì Hiện tại đơn (returns), không dùng will.' },
      ],
    },
    {
      id: 'grammar-v2-b2-future-perfect-02-q12',
      kind: 'correction',
      prompt: 'Sửa lỗi sai trợ động từ: "By next Friday, the contractors will has replaced all windows."',
      options: [],
      acceptedAnswers: [
        { text: 'By next Friday, the contractors will have replaced all windows.', rationale: 'Sau will luôn dùng nguyên mẫu "have", không bao giờ dùng "has".' },
      ],
    },
  ],
  reviewExercises: [
    {
      id: 'grammar-v2-b2-future-perfect-02-r1',
      kind: 'choice',
      prompt: 'Don\'t worry about the presentation; by tomorrow morning, the marketing department ___ all visual slides.',
      options: [
        { text: 'will have finalized', correct: true, rationale: 'Diễn tả sự hoàn thành trước mốc sáng mai (by tomorrow morning).' },
        { text: 'will finalize', correct: false, rationale: 'Không nhấn mạnh tính sẵn sàng/kết thúc trước mốc thời gian.' },
        { text: 'is finalizing', correct: false, rationale: 'Chỉ hành động đang diễn ra, không bảo đảm tính hoàn tất.' },
      ],
      acceptedAnswers: [{ text: 'will have finalized', rationale: 'will have finalized diễn tả sự hoàn tất slide trước sáng mai.' }],
    },
    {
      id: 'grammar-v2-b2-future-perfect-02-r2',
      kind: 'gap',
      prompt: 'By the time the flight lands, the diplomat ___ (travel) for eighteen consecutive hours.',
      options: [],
      acceptedAnswers: [{ text: 'will have travelled', rationale: 'Chính tả Anh-Anh của travel ở phân từ hai là travelled.' }, { text: 'will have traveled', rationale: 'Chính tả Anh-Mỹ chuẩn của traveled.' }],
    },
    {
      id: 'grammar-v2-b2-future-perfect-02-r3',
      kind: 'transform',
      prompt: 'The government will pass the legislation before the parliamentary session ends. -> Before the parliamentary session ends, the government ___ the legislation.',
      options: [],
      acceptedAnswers: [
        { text: 'will have passed', rationale: 'Dùng will have passed để diễn tả đạo luật được thông qua trước khi kỳ họp kết thúc.' },
      ],
    },
    {
      id: 'grammar-v2-b2-future-perfect-02-r4',
      kind: 'correction',
      prompt: 'Sửa lỗi chia động từ: "By midnight, the rescue boats will have save all the stranded fishermen."',
      options: [],
      acceptedAnswers: [
        { text: 'By midnight, the rescue boats will have saved all the stranded fishermen.', rationale: 'Động từ sau will have phải là quá khứ phân từ V3/ed (saved).' },
      ],
    },
  ],
  outputPrompts: [
    {
      id: 'grammar-v2-b2-future-perfect-02-o1',
      prompt: 'Viết 1 câu tiếng Anh miêu tả một mục tiêu học tập hoặc sự nghiệp mà bạn sẽ hoàn thành trước một mốc thời gian cụ thể (sử dụng "By..." và "will have + V3/ed").',
      modelAnswer: 'By the end of next year, I will have obtained my advanced English certification.',
      checks: [
        'Bắt đầu hoặc kết thúc bằng cụm từ chỉ mốc thời gian tương lai với By (ví dụ: By next year, By December)',
        'Sử dụng chính xác cấu trúc Future Perfect (will have + V3/ed)',
        'Ý nghĩa thể hiện một thành tựu hoặc mục tiêu hoàn tất rõ ràng',
      ],
    },
    {
      id: 'grammar-v2-b2-future-perfect-02-o2',
      prompt: 'Viết 1 câu tiếng Anh sử dụng liên từ "By the time..." kết hợp thì hiện tại đơn ở mệnh đề phụ và Future Perfect ở mệnh đề chính.',
      modelAnswer: 'By the time my supervisor reviews the project, we will have resolved all technical bugs.',
      checks: [
        'Mệnh đề By the time sử dụng động từ ở thì hiện tại đơn (không có will)',
        'Mệnh đề chính dùng cấu trúc will have + V3/ed',
        'Câu diễn đạt mạch lạc, đúng trật tự logic thời gian',
      ],
    },
  ],
  sources: [
    {
      id: 'cambridge-future-perfect',
      title: 'Cambridge Grammar: Future perfect (will have done)',
      url: 'https://dictionary.cambridge.org/grammar/british-grammar/future-perfect',
      claims: ['Future perfect refers to an event that will be completed before a specific point in the future.'],
      checkedAt: '2026-10-05',
      provenance: 'reference-only',
    },
    {
      id: 'bc-future-perfect',
      title: 'British Council: Future perfect and future continuous',
      url: 'https://learnenglish.britishcouncil.org/grammar/b1-b2-grammar/future-continuous-future-perfect',
      claims: ['Highlights the distinction between completion before a future deadline and actions in progress.'],
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
