/**
 * @file future-perfect-continuous.ts
 * @description Lesson: Tương lai hoàn thành tiếp diễn (Future Perfect Continuous).
 */
import type { GrammarLesson } from '../../types.js';

const lesson: GrammarLesson = {
  id: 'grammar-v2-b2-future-perfect-continuous-04',
  revisionId: 'grammar-v2-b2-future-perfect-continuous-04@1.0.0',
  revision: '1.0.0',
  title: 'Tương lai hoàn thành tiếp diễn (Future Perfect Continuous)',
  objective: 'Nắm vững cấu trúc will have been + V-ing để diễn tả tính liên tục và độ dài của một hành động tính đến một mốc thời gian xác định trong tương lai.',
  prerequisiteIds: ['grammar-v2-b2-future-continuous-03'],
  coverage: ['future-perfect-continuous', 'future-aspect', 'duration-to-future', 'b2-grammar'],
  context: {
    english: 'By the time Dr. Henderson retires next November, she will have been researching neurodegenerative disorders at the institute for over thirty-five years.',
    vietnamese: 'Trước thời điểm Tiến sĩ Henderson nghỉ hưu vào tháng Mười Một tới, bà sẽ đã nghiên cứu các rối loạn thoái hóa thần kinh tại viện được hơn ba mươi lăm năm liên tục.',
  },
  guide: {
    pattern: 'S + will have been + V-ing | S + will not (won\'t) have been + V-ing | Will + S + have been + V-ing?',
    whenToUse: [
      'Nhấn mạnh khoảng thời gian liên tục (duration) của một hành động kéo dài tới một mốc thời gian tương lai.',
      'Giải thích nguyên nhân hoặc trạng thái dự kiến tại một thời điểm tương lai (ví dụ: sẽ mệt mỏi vì đã làm việc liên tục).',
      'Đo lường các mốc kỷ niệm, quá trình công tác, hoặc dự án dài hạn kết hợp với for + khoảng thời gian và by/by the time.',
    ],
    signalWords: ['by the time', 'by next month', 'for five years', 'by 2030', 'how long will you have been'],
    check: [
      'Hành động có tính chất kéo dài tới mốc tương lai và có cụm từ chỉ thời lượng (for...) không?',
      'Đã dùng will have been + V-ing chưa (tránh quên "been" hoặc dùng nhầm V3)?',
      'For a verb used with a stative meaning, consider Future Perfect Simple; some verbs can also have continuous uses with a different meaning or in a special context.'
    ],
  },
  explanation: 'Thì tương lai hoàn thành tiếp diễn (Future Perfect Continuous - will have been + V-ing) dùng để nhìn tới một mốc tương lai và nhấn mạnh khoảng thời gian một hành động kéo dài tính đến thời điểm đó.\nKhác biệt mấu chốt:\n- Future Perfect Simple (will have done): nhấn mạnh kết quả hoặc sự hoàn tất của hành động trước mốc tương lai.\n- Future Perfect Continuous (will have been doing): tập trung vào quá trình và thời lượng kéo dài (for ten years, all day); không nhất thiết hàm ý hành động diễn ra không ngừng.\nLưu ý: Các động từ như know, own, belong, believe thường không dùng ở dạng tiếp diễn khi diễn tả trạng thái thông thường; trong trường hợp này dùng Future Perfect Simple. Một số động từ trạng thái có thể dùng dạng tiếp diễn với nghĩa khác hoặc trong ngữ cảnh đặc biệt.',
  examples: [
    {
      english: 'By midnight, the rescue crew will have been searching the dense forest for twelve consecutive hours.',
      vietnamese: 'Tính đến nửa đêm, đội cứu hộ sẽ đã tìm kiếm khu rừng rậm suốt mười hai giờ đồng hồ liên tục.',
    },
    {
      english: 'In July, our chief architect will have been leading the sustainable housing project for an entire decade.',
      vietnamese: 'Vào tháng Bảy, kiến trúc sư trưởng của chúng tôi sẽ đã lãnh đạo dự án nhà ở bền vững tròn một thập kỷ.',
    },
    {
      english: 'When the flight finally touches down in Sydney, we will have been traveling for more than twenty-two hours.',
      vietnamese: 'Khi chuyến bay cuối cùng cũng hạ cánh xuống Sydney, chúng tôi sẽ đã di chuyển liên tục hơn hai mươi hai tiếng.',
    },
    {
      english: 'They won\'t have been living in the countryside long enough to understand the winter isolation fully.',
      vietnamese: 'Họ sẽ chưa sống ở vùng nông thôn đủ lâu để thấu hiểu trọn vẹn sự cô lập mùa đông.',
    },
    {
      english: 'Will she have been studying biochemistry at Cambridge for four years by the time she presents her thesis?',
      vietnamese: 'Liệu cô ấy sẽ đã học ngành hóa sinh tại Cambridge được bốn năm tính đến thời điểm cô ấy bảo vệ luận án chứ?',
    },
    {
      english: 'By five o\'clock, the marathon runners will have been running under intense humidity for almost four hours.',
      vietnamese: 'Đến năm giờ chiều, các vận động viên marathon sẽ đã chạy dưới độ ẩm khắc nghiệt gần bốn tiếng đồng hồ.',
    },
  ],
  contrasts: [
    {
      form: 'will have been writing vs will have written',
      whyFits: '"By 6 PM, I will have been writing the report for five hours" nhấn mạnh khoảng thời gian liên tục 5 tiếng tôi miệt mài gõ văn bản.',
      whyNot: '"By 6 PM, I will have written three reports" tập trung vào số lượng văn bản hoàn tất (3 bản báo cáo) chứ không phải thời lượng tiến trình.',
    },
    {
      form: 'will have been working vs will be working',
      whyFits: '"Next month, she will have been working here for ten years" đối chiếu một khoảng thời gian tích lũy (for ten years) trước mốc tháng sau.',
      whyNot: '"At 10 AM tomorrow, she will be working at her desk" chỉ đơn thuần miêu tả hành động đang xảy ra tại một thời điểm tương lai đơn lẻ, không đo lường khoảng thời gian tích lũy.',
    },
  ],
  commonMistakes: [
    'Dùng thì tiếp diễn với động từ trạng thái: viết "will have been knowing each other for five years" thay vì "will have known".',
    'Thiếu trợ động từ been: viết "will have working" hoặc "will been working" thay vì "will have been working".',
    'Dùng will trong mệnh đề chỉ thời gian: viết "By the time he will arrive, I will have been waiting..." thay vì "By the time he arrives...".',
  ],
  summary: 'Future Perfect Continuous (will have been + V-ing) đo lường và nhấn mạnh độ dài liên tục của hành động dẫn đến một mốc thời gian tương lai xác định.',
  exercises: [
    {
      id: 'grammar-v2-b2-future-perfect-continuous-04-q1',
      kind: 'choice',
      prompt: 'By this autumn, the conservation team ___ the migratory birds along the coast for three years.',
      options: [
        { text: 'will have been tracking', correct: true, rationale: 'Có mốc tương lai "By this autumn" kết hợp thời lượng "for three years" chỉ hành động kéo dài liên tục.' },
        { text: 'will track', correct: false, rationale: 'Tương lai đơn không thể hiện khoảng thời gian tích lũy liên tục.' },
        { text: 'will be tracking', correct: false, rationale: 'Tương lai tiếp diễn chỉ miêu tả hành động đang diễn ra tại mốc, không đo lường thời lượng for three years.' },
      ],
      acceptedAnswers: [{ text: 'will have been tracking', rationale: 'will have been tracking diễn tả quá trình theo dõi liên tục suốt ba năm tính đến mùa thu.' }],
    },
    {
      id: 'grammar-v2-b2-future-perfect-continuous-04-q2',
      kind: 'choice',
      prompt: 'When the conductor raises the baton tonight, the orchestra ___ the symphony together for six months.',
      options: [
        { text: 'will have been rehearsing', correct: true, rationale: 'Cấu trúc tương lai hoàn thành tiếp diễn diễn tả quá trình tập luyện liên tục suốt 6 tháng trước đêm diễn.' },
        { text: 'will rehearse', correct: false, rationale: 'Tương lai đơn không phản ánh độ dài thời gian 6 tháng đã qua.' },
        { text: 'have been rehearsing', correct: false, rationale: 'Cần phối hợp thì tương lai với mệnh đề điều kiện/thời gian ở hiện tại đơn (raises).' },
      ],
      acceptedAnswers: [{ text: 'will have been rehearsing', rationale: 'will have been rehearsing nhấn mạnh thời lượng tập dượt kéo dài.' }],
    },
    {
      id: 'grammar-v2-b2-future-perfect-continuous-04-q3',
      kind: 'choice',
      prompt: 'By noon, the programmers will be exhausted because they ___ complex server bugs all morning without sleeping.',
      options: [
        { text: 'will have been resolving', correct: true, rationale: 'Working all morning up to noon explains why the programmers will be exhausted at that future reference point.' },
        { text: 'will resolve', correct: false, rationale: 'Không thể hiện quá trình liên tục gây ra trạng thái mệt mỏi.' },
        { text: 'are resolving', correct: false, rationale: 'Sai thì vì ngữ cảnh dự đoán nguyên nhân tại mốc trưa mai (by noon).' },
      ],
      acceptedAnswers: [{ text: 'will have been resolving', rationale: 'will have been resolving giải thích nguyên nhân kiệt sức tại mốc tương lai.' }],
    },
    {
      id: 'grammar-v2-b2-future-perfect-continuous-04-q4',
      kind: 'choice',
      prompt: 'Why is "By next year, they will have been owning the cottage for a century" grammatically incorrect?',
      options: [
        { text: 'The verb "own" is not normally used in the continuous when it means possess.', correct: true, rationale: 'Với nghĩa sở hữu thông thường, own không dùng ở dạng tiếp diễn; câu này nên dùng Future Perfect Simple (will have owned).' },
        { text: 'The preposition "by" cannot be followed by "next year".', correct: false, rationale: 'By next year là cụm trạng từ thời gian hoàn toàn hợp lệ.' },
        { text: 'The auxiliary "have" must be replaced by "had".', correct: false, rationale: 'Không dùng had sau trợ động từ tương lai will.' },
      ],
      acceptedAnswers: [{ text: 'The verb "own" is not normally used in the continuous when it means possess.', rationale: 'Với nghĩa sở hữu thông thường, own không dùng ở dạng tiếp diễn.' }],
    },
    {
      id: 'grammar-v2-b2-future-perfect-continuous-04-q5',
      kind: 'gap',
      prompt: 'By the time she completes her residency, Dr. Pham ___ (train) in pediatric surgery for seven years.',
      options: [],
      acceptedAnswers: [{ text: 'will have been training', rationale: 'will have been training diễn tả quá trình đào tạo liên tục 7 năm tính đến khi hoàn tất nội trú.' }],
    },
    {
      id: 'grammar-v2-b2-future-perfect-continuous-04-q6',
      kind: 'gap',
      prompt: 'At eight p.m. tonight, the translators ___ (work) on the treaty document continuously for twelve hours.',
      options: [],
      acceptedAnswers: [{ text: 'will have been working', rationale: 'will have been working nhấn mạnh hành động dịch thuật liên tục 12 tiếng.' }],
    },
    {
      id: 'grammar-v2-b2-future-perfect-continuous-04-q7',
      kind: 'gap',
      prompt: 'By the end of this tour, the rock band ___ (travel) across three continents for eight months.',
      options: [],
      acceptedAnswers: [
        { text: 'will have been travelling', rationale: 'Chính tả Anh-Anh chuẩn của động từ travel ở dạng tiếp diễn.' },
        { text: 'will have been traveling', rationale: 'Chính tả Anh-Mỹ chuẩn của động từ travel ở dạng tiếp diễn.' },
      ],
    },
    {
      id: 'grammar-v2-b2-future-perfect-continuous-04-q8',
      kind: 'gap',
      prompt: 'In December, we ___ (develop) this autonomous navigation software for two complete years.',
      options: [],
      acceptedAnswers: [{ text: 'will have been developing', rationale: 'will have been developing diễn tả thời lượng phát triển phần mềm kéo dài hai năm.' }],
    },
    {
      id: 'grammar-v2-b2-future-perfect-continuous-04-q9',
      kind: 'transform',
      prompt: 'Professor Evans started lecturing at 9 AM. At 1 PM, his lecture will still be going on. -> By 1 PM, Professor Evans ___ for four hours.',
      options: [],
      acceptedAnswers: [
        { text: 'will have been lecturing', rationale: 'Dùng will have been lecturing để diễn tả khoảng thời gian liên tục 4 tiếng đến mốc 1 giờ chiều.' },
      ],
    },
    {
      id: 'grammar-v2-b2-future-perfect-continuous-04-q10',
      kind: 'transform',
      prompt: 'The deep-sea divers began their expedition three weeks ago. Next Monday marks a full month of continuous diving. -> By next Monday, the deep-sea divers ___ for a month.',
      options: [],
      acceptedAnswers: [
        { text: 'will have been diving', rationale: 'will have been diving thể hiện quá trình lặn liên tục tròn một tháng.' },
      ],
    },
    {
      id: 'grammar-v2-b2-future-perfect-continuous-04-q11',
      kind: 'correction',
      prompt: 'Sửa lỗi thì tiếp diễn với động từ trạng thái: "By 2028, the two institutions will have been knowing each other for fifty years."',
      options: [],
      acceptedAnswers: [
        { text: 'By 2028, the two institutions will have known each other for fifty years.', rationale: 'know là động từ chỉ nhận thức/trạng thái nên chuyển sang Future Perfect Simple: will have known.' },
      ],
    },
    {
      id: 'grammar-v2-b2-future-perfect-continuous-04-q12',
      kind: 'correction',
      prompt: 'Sửa lỗi sai cấu trúc: "By midnight, the pilot will have flying across the turbulence for six hours."',
      options: [],
      acceptedAnswers: [
        { text: 'By midnight, the pilot will have been flying across the turbulence for six hours.', rationale: 'Cần bổ sung "been" sau have: will have been flying.' },
      ],
    },
  ],
  reviewExercises: [
    {
      id: 'grammar-v2-b2-future-perfect-continuous-04-r1',
      kind: 'choice',
      prompt: 'Select the sentence that emphasizes the ongoing duration leading up to next year\'s symposium:',
      options: [
        { text: 'By next year, our laboratory will have been testing the prototype for twenty months.', correct: true, rationale: 'Cấu trúc will have been testing for twenty months nhấn mạnh thời lượng liên tục.' },
        { text: 'By next year, our laboratory will test twenty prototypes.', correct: false, rationale: 'Câu này diễn đạt dự định hoặc số lượng, không nhấn mạnh thời lượng kéo dài.' },
        { text: 'At next year\'s symposium, our laboratory will be testing the prototype.', correct: false, rationale: 'Câu này chỉ hành động đang diễn ra tại thời điểm đó, không đo lường thời lượng tích lũy.' },
      ],
      acceptedAnswers: [{ text: 'By next year, our laboratory will have been testing the prototype for twenty months.', rationale: 'Nhấn mạnh thời lượng kéo dài liên tục dẫn tới mốc tương lai.' }],
    },
    {
      id: 'grammar-v2-b2-future-perfect-continuous-04-r2',
      kind: 'gap',
      prompt: 'By the time the shift finishes, the nurse ___ (monitor) intensive care patients for eight hours.',
      options: [],
      acceptedAnswers: [{ text: 'will have been monitoring', rationale: 'will have been monitoring chỉ hành động theo dõi bệnh nhân liên tục suốt 8 tiếng.' }],
    },
    {
      id: 'grammar-v2-b2-future-perfect-continuous-04-r3',
      kind: 'transform',
      prompt: 'They will celebrate five years of living in Tokyo next month. -> By next month, they ___ in Tokyo for five years.',
      options: [],
      acceptedAnswers: [
        { text: 'will have been living', rationale: 'will have been living thể hiện thời gian sinh sống liên tục tích lũy đến tháng sau.' },
      ],
    },
    {
      id: 'grammar-v2-b2-future-perfect-continuous-04-r4',
      kind: 'correction',
      prompt: 'Sửa lỗi ngữ pháp: "By the time the sun rises, the hikers will has been walking for twelve hours."',
      options: [],
      acceptedAnswers: [
        { text: 'By the time the sun rises, the hikers will have been walking for twelve hours.', rationale: 'Sau will luôn dùng dạng nguyên mẫu "have", không dùng "has".' },
      ],
    },
  ],
  outputPrompts: [
    {
      id: 'grammar-v2-b2-future-perfect-continuous-04-o1',
      prompt: 'Viết 1 câu tiếng Anh miêu tả một khoảng thời gian bạn sẽ học tập hoặc làm một công việc cụ thể tính đến một thời điểm trong tương lai (kết hợp "By the time..." hoặc "By next...", "will have been + V-ing", và "for...").',
      modelAnswer: 'By the time I graduate next spring, I will have been studying computer science at university for four years.',
      checks: [
        'Có cụm từ chỉ mốc thời gian tương lai (ví dụ: By next spring, By the time I finish)',
        'Sử dụng chính xác thì Future Perfect Continuous (will have been + V-ing)',
        'Có cụm chỉ thời lượng kéo dài (for + khoảng thời gian)',
      ],
    },
    {
      id: 'grammar-v2-b2-future-perfect-continuous-04-o2',
      prompt: 'Viết 1 câu tiếng Anh giải thích nguyên nhân ai đó sẽ rất mệt mỏi hoặc kiệt sức trong tương lai bằng thì Future Perfect Continuous.',
      modelAnswer: 'The technicians will be completely exhausted tomorrow morning because they will have been configuring network servers all night.',
      checks: [
        'Nêu trạng thái mệt mỏi/kiệt sức ở tương lai (will be exhausted/tired)',
        'Dùng liên từ chỉ nguyên nhân (because/since) với mệnh đề Future Perfect Continuous',
        'Cấu trúc will have been + V-ing được chia chính xác',
      ],
    },
  ],
  sources: [
    {
      id: 'cambridge-future-perfect-continuous',
      title: 'Cambridge Grammar: Future perfect continuous (will have been doing)',
      url: 'https://dictionary.cambridge.org/grammar/british-grammar/future-perfect-continuous',
      claims: ['Future perfect continuous emphasizes the duration of an ongoing event up to a future reference point.'],
      checkedAt: '2026-10-05',
      provenance: 'reference-only',
    },
    {
      id: 'bc-future-perfect-continuous',
      title: 'British Council: Future perfect continuous',
      url: 'https://learnenglish.britishcouncil.org/grammar/b1-b2-grammar/future-aspects',
      claims: ['Used to look back from a point in the future and measure duration of continuous activity.'],
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
