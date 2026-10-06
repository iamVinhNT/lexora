/**
 * @file past-perfect-continuous.ts
 * @description Lesson: Quá khứ hoàn thành tiếp diễn (Past Perfect Continuous).
 */
import type { GrammarLesson } from '../../types.js';

const lesson: GrammarLesson = {
  id: 'grammar-v2-b2-past-perfect-continuous-01',
  revisionId: 'grammar-v2-b2-past-perfect-continuous-01@1.0.0',
  revision: '1.0.0',
  title: 'Quá khứ hoàn thành tiếp diễn',
  objective: 'Nắm vững cấu trúc had been + V-ing để diễn tả hành động đã diễn ra liên tục trước một thời điểm hoặc sự kiện khác trong quá khứ, nhấn mạnh khoảng thời gian hoặc nguyên nhân để lại dấu vết.',
  prerequisiteIds: ['grammar-v2-b1-paragraph-reference-30'],
  coverage: ['past-perfect-continuous', 'past-aspect', 'b2-grammar'],
  context: {
    english: 'When the rescue team arrived at dawn, the hikers had been walking in the freezing rain for seven hours without warm clothing.',
    vietnamese: 'Khi đội cứu hộ đến lúc rạng sáng, các du khách đã đi bộ liên tục dưới cơn mưa buốt giá suốt bảy tiếng mà không có áo ấm.',
  },
  guide: {
    pattern: 'S + had been + V-ing | S + had not been + V-ing | Had + S + been + V-ing?',
    whenToUse: [
      'Nhấn mạnh độ dài thời gian của hành động kéo dài liên tục trước một mốc quá khứ xác định.',
      'Giải thích nguyên nhân dẫn đến một kết quả hoặc trạng thái rõ rệt trong quá khứ (để lại dấu vết/hậu quả).',
    ],
    signalWords: ['for two hours', 'since morning', 'all night', 'before', 'by the time', 'how long'],
    check: [
      'Hành động có kéo dài liên tục trước một sự kiện hoặc mốc thời điểm quá khứ khác không?',
      'Many stative meanings are not normally used in continuous forms; some verbs can take continuous forms with a different meaning or in a particular context.',
    ],
  },
  explanation: 'Past Perfect Continuous (had been + V-ing) presents an activity as continuing up to a past reference point, often highlighting duration or a past result. The simple form often focuses on a completed result. Stative meanings such as know or belong are not normally used in the continuous, though verb form depends on meaning and context.',
  examples: [
    {
      english: 'She was exhausted because she had been studying for the bar exam all night.',
      vietnamese: 'Cô ấy kiệt sức vì đã học ôn thi chứng chỉ luật sư suốt cả đêm.',
    },
    {
      english: 'The ground was muddy because it had been raining heavily for three hours.',
      vietnamese: 'Mặt đất lầy lội vì trời đã mưa lớn liên tục suốt ba tiếng đồng hồ.',
    },
    {
      english: 'How long had they been negotiating before they reached an agreement?',
      vietnamese: 'Họ đã đàm phán trong bao lâu trước khi đạt được thỏa thuận?',
    },
    {
      english: 'He had been coughing for two weeks before he finally saw a doctor.',
      vietnamese: 'Anh ấy đã ho suốt hai tuần trước khi chịu đi khám bác sĩ.',
    },
    {
      english: 'We had been driving along the coast for an hour when the engine suddenly stopped.',
      vietnamese: 'Chúng tôi đã lái xe dọc bờ biển được một tiếng thì động cơ đột ngột tắt.',
    },
    {
      english: 'The workers had been demanding higher wages months before the strike occurred.',
      vietnamese: 'Công nhân đã đòi tăng lương nhiều tháng liền trước khi cuộc đình công diễn ra.',
    },
  ],
  contrasts: [
    {
      form: 'had been painting vs had painted',
      whyFits: '"He had been painting the wall" nhấn mạnh hành động sơn tường kéo dài liên tục giải thích vệt sơn dính trên áo.',
      whyNot: '"He had painted the wall" nhấn mạnh bức tường đã được hoàn thành xong xuôi, tập trung vào kết quả.',
    },
    {
      form: 'action verbs vs stative verbs',
      whyFits: '"They had been living there for years" đúng vì live là hành động có thể tiếp diễn.',
      whyNot: '\"They had been knowing each other\" is not normally used for the stative meaning of know; use \"had known\" in this context.',
    },
  ],
  commonMistakes: [
    'Using a continuous form with a stative meaning such as know (normally use "had known" in this context).',
    'Nhầm lẫn với Present Perfect Continuous khi mốc thời gian đối chiếu nằm hoàn toàn ở quá khứ.',
    'Quên trợ động từ "been" trong cấu trúc (viết "had playing" thay vì "had been playing").',
  ],
  summary: 'Past Perfect Continuous (had been + V-ing) diễn tả hành động kéo dài liên tục dẫn đến một thời điểm hoặc kết quả cụ thể trong quá khứ.',
  exercises: [
    {
      id: 'grammar-v2-b2-past-perfect-continuous-01-q1',
      kind: 'choice',
      prompt: 'His eyes were red and tired because he ___ at the screen without breaks.',
      options: [
        { text: 'had been staring', correct: true, rationale: 'Diễn tả hành động nhìn chằm chằm liên tục giải thích đôi mắt đỏ mỏi.' },
        { text: 'has been staring', correct: false, rationale: 'Bối cảnh quá khứ "were red" đòi hỏi thì quá khứ hoàn thành tiếp diễn.' },
        { text: 'had stared', correct: false, rationale: 'Không nhấn mạnh tính kéo dài liên tục tạo nên trạng thái hiện tại lúc đó.' },
      ],
      acceptedAnswers: [{ text: 'had been staring', rationale: 'had been staring diễn tả quá trình kéo dài để lại dấu vết trong quá khứ.' }],
    },
    {
      id: 'grammar-v2-b2-past-perfect-continuous-01-q2',
      kind: 'choice',
      prompt: 'How long ___ for the train before it was announced as cancelled?',
      options: [
        { text: 'had you been waiting', correct: true, rationale: 'Hỏi về khoảng thời gian hành động chờ đợi diễn ra trước khi tàu bị hủy.' },
        { text: 'were you waiting', correct: false, rationale: 'Quá khứ tiếp diễn không đi kèm khoảng thời gian "how long" trước mốc hoàn tất.' },
        { text: 'have you been waiting', correct: false, rationale: 'Sự việc tàu hủy đã kết thúc trong quá khứ, không dùng hiện tại hoàn thành.' },
      ],
      acceptedAnswers: [{ text: 'had you been waiting', rationale: 'Cấu trúc câu hỏi quá khứ hoàn thành tiếp diễn với How long.' }],
    },
    {
      id: 'grammar-v2-b2-past-perfect-continuous-01-q3',
      kind: 'choice',
      prompt: 'They were out of breath when they reached the summit because they ___ steeply for miles.',
      options: [
        { text: 'had been climbing', correct: true, rationale: 'Diễn tả hành động leo dốc liên tục dẫn đến việc thở không ra hơi.' },
        { text: 'had climbed', correct: false, rationale: 'Nhấn mạnh sự hoàn thành chứ không nhấn mạnh nguyên nhân thể chất liên tục.' },
        { text: 'have climbed', correct: false, rationale: 'Sai thì vì ngữ cảnh ở quá khứ (were out of breath).' },
      ],
      acceptedAnswers: [{ text: 'had been climbing', rationale: 'had been climbing diễn tả nguyên nhân kéo dài trong quá khứ.' }],
    },
    {
      id: 'grammar-v2-b2-past-perfect-continuous-01-q4',
      kind: 'choice',
      prompt: 'Prior to the audit, the accountant ___ through five years of paper records.',
      options: [
        { text: 'had been sifting', correct: true, rationale: 'Nhấn mạnh quá trình rà soát tài liệu liên tục suốt thời gian dài trước cuộc kiểm toán.' },
        { text: 'has been sifting', correct: false, rationale: 'Mốc thời gian "Prior to the audit" ở quá khứ.' },
        { text: 'was sifted', correct: false, rationale: 'Cấu trúc bị động sai nghĩa chủ động của kế toán viên.' },
      ],
      acceptedAnswers: [{ text: 'had been sifting', rationale: 'had been sifting diễn tả hành động rà soát tài liệu kéo dài.' }],
    },
    {
      id: 'grammar-v2-b2-past-perfect-continuous-01-q5',
      kind: 'gap',
      prompt: 'She was soaked to the skin because she ___ (walk) in the torrential rain without an umbrella.',
      options: [],
      acceptedAnswers: [{ text: 'had been walking', rationale: 'had been walking diễn tả hành động đi bộ trong mưa kéo dài gây ra ướt sũng.' }],
    },
    {
      id: 'grammar-v2-b2-past-perfect-continuous-01-q6',
      kind: 'gap',
      prompt: 'The athletes were exhausted; they ___ (train) continuously under the hot sun for four hours.',
      options: [],
      acceptedAnswers: [{ text: 'had been training', rationale: 'had been training diễn tả hành động tập luyện liên tục suốt bốn tiếng.' }],
    },
    {
      id: 'grammar-v2-b2-past-perfect-continuous-01-q7',
      kind: 'gap',
      prompt: 'By noon, the legal team ___ (review) the contract clauses for over six hours.',
      options: [],
      acceptedAnswers: [{ text: 'had been reviewing', rationale: 'had been reviewing nhấn mạnh thời gian rà soát liên tục trước mốc trưa.' }],
    },
    {
      id: 'grammar-v2-b2-past-perfect-continuous-01-q8',
      kind: 'gap',
      prompt: 'His hands were trembling because he ___ (carry) heavy timber all afternoon.',
      options: [],
      acceptedAnswers: [{ text: 'had been carrying', rationale: 'had been carrying diễn tả hành động khuân vác liên tục để lại dấu vết tay run.' }],
    },
    {
      id: 'grammar-v2-b2-past-perfect-continuous-01-q9',
      kind: 'transform',
      prompt: 'The musician practiced the violin for four hours. Then the concert started. -> Before the concert started, the musician ___ for four hours.',
      options: [],
      acceptedAnswers: [
        { text: 'had been practicing the violin', rationale: 'Dùng quá khứ hoàn thành tiếp diễn để liên kết hành động luyện tập kéo dài trước buổi hòa nhạc.' },
        { text: 'had been practising the violin', rationale: 'Dạng chính tả Anh-Anh chuẩn của động từ practise.' },
      ],
    },
    {
      id: 'grammar-v2-b2-past-perfect-continuous-01-q10',
      kind: 'transform',
      prompt: 'They argued heatedly for an hour. Then the manager stepped in. -> By the time the manager stepped in, they ___ heatedly for an hour.',
      options: [],
      acceptedAnswers: [
        { text: 'had been arguing', rationale: 'Chuyển sang thì had been arguing để nhấn mạnh thời lượng tranh cãi trước can thiệp.' },
      ],
    },
    {
      id: 'grammar-v2-b2-past-perfect-continuous-01-q11',
      kind: 'correction',
      prompt: 'Sửa lỗi sai thì trong câu: "When they finally met, they had been knowing each other through letters for a decade."',
      options: [],
      acceptedAnswers: [
        { text: 'When they finally met, they had known each other through letters for a decade.', rationale: 'know là động từ chỉ trạng thái (stative verb), không chia ở dạng tiếp diễn.' },
      ],
    },
    {
      id: 'grammar-v2-b2-past-perfect-continuous-01-q12',
      kind: 'correction',
      prompt: 'Sửa lỗi sai trợ động từ: "The chef was furious because the assistants had working carelessly all morning."',
      options: [],
      acceptedAnswers: [
        { text: 'The chef was furious because the assistants had been working carelessly all morning.', rationale: 'Cần có trợ động từ "been" sau had trong cấu trúc quá khứ hoàn thành tiếp diễn.' },
      ],
    },
  ],
  reviewExercises: [
    {
      id: 'grammar-v2-b2-past-perfect-continuous-01-r1',
      kind: 'choice',
      prompt: 'The mechanic was covered in oil because he ___ on the vintage engine since dawn.',
      options: [
        { text: 'had been working', correct: true, rationale: 'Diễn tả quá trình làm việc liên tục giải thích việc lấm lem dầu mỡ.' },
        { text: 'has been working', correct: false, rationale: 'Bối cảnh quá khứ "was covered" không dùng hiện tại hoàn thành.' },
        { text: 'had worked', correct: false, rationale: 'Không nhấn mạnh tính liên tục sinh ra dấu vết dầu mỡ.' },
      ],
      acceptedAnswers: [{ text: 'had been working', rationale: 'had been working diễn tả hành động liên tục để lại dấu vết.' }],
    },
    {
      id: 'grammar-v2-b2-past-perfect-continuous-01-r2',
      kind: 'gap',
      prompt: 'The detectives were frustrated because they ___ (follow) false leads for three weeks.',
      options: [],
      acceptedAnswers: [{ text: 'had been following', rationale: 'had been following diễn tả quá trình theo đuổi manh mối kéo dài ba tuần.' }],
    },
    {
      id: 'grammar-v2-b2-past-perfect-continuous-01-r3',
      kind: 'transform',
      prompt: 'The snow fell without pause for two days before the road was blocked. -> It ___ for two days before the road was blocked.',
      options: [],
      acceptedAnswers: [
        { text: 'had been snowing', rationale: 'Dùng had been snowing để diễn tả tuyết rơi liên tục hai ngày.' },
      ],
    },
    {
      id: 'grammar-v2-b2-past-perfect-continuous-01-r4',
      kind: 'correction',
      prompt: 'Sửa lỗi cấu trúc: "How long had you been wait when the bus arrived?"',
      options: [],
      acceptedAnswers: [
        { text: 'How long had you been waiting when the bus arrived?', rationale: 'Động từ chính sau had been phải ở dạng V-ing (waiting).' },
      ],
    },
  ],
  outputPrompts: [
    {
      id: 'grammar-v2-b2-past-perfect-continuous-01-o1',
      prompt: 'Viết 1 câu tiếng Anh giải thích lý do tại sao một người hoặc bạn kiệt sức/mệt mỏi trong quá khứ bằng thì Past Perfect Continuous (sử dụng had been + V-ing cùng một khoảng thời gian).',
      modelAnswer: 'I was completely exhausted because I had been preparing the financial reports for six hours.',
      checks: [
        'Có mệnh đề diễn tả trạng thái trong quá khứ (ví dụ: was exhausted/tired)',
        'Sử dụng chính xác thì Past Perfect Continuous (had been + V-ing)',
        'Có cụm từ chỉ thời gian hoặc hành động giải thích nguyên nhân rõ ràng',
      ],
    },
    {
      id: 'grammar-v2-b2-past-perfect-continuous-01-o2',
      prompt: 'Viết 1 câu phức tiếng Anh với "By the time..." hoặc "Before...", miêu tả một hành động đã diễn ra liên tục trước khi một sự kiện khác xảy ra trong quá khứ.',
      modelAnswer: 'By the time the keynote speaker arrived, the audience had been waiting patiently for over forty minutes.',
      checks: [
        'Có liên từ By the time hoặc Before với mệnh đề quá khứ đơn',
        'Mệnh đề chính dùng thì Past Perfect Continuous (had been + V-ing)',
        'Nêu rõ khoảng thời gian kéo dài liên tục của hành động',
      ],
    },
  ],
  sources: [
    {
      id: 'cambridge-past-perfect-continuous',
      title: 'Cambridge Grammar: Past perfect continuous (had been doing)',
      url: 'https://dictionary.cambridge.org/grammar/british-grammar/past-perfect-continuous',
      claims: ['Past perfect continuous refers to actions in progress up to a point in the past, often emphasizing duration or cause.'],
      checkedAt: '2026-10-05',
      provenance: 'reference-only',
    },
    {
      id: 'bc-past-perfect-continuous',
      title: 'British Council: Past perfect continuous',
      url: 'https://learnenglish.britishcouncil.org/grammar/b1-b2-grammar/past-perfect-continuous',
      claims: ['Used to talk about actions continuing up to another past action, distinct from stative verb limitations.'],
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
