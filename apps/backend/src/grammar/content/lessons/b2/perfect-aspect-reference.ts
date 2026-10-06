/**
 * @file perfect-aspect-reference.ts
 * @description Lesson: Hệ thống thể hoàn thành (Perfect Aspect Reference).
 */
import type { GrammarLesson } from '../../types.js';

const lesson: GrammarLesson = {
  id: 'grammar-v2-b2-perfect-aspect-reference-05',
  revisionId: 'grammar-v2-b2-perfect-aspect-reference-05@1.0.0',
  revision: '1.0.0',
  title: 'Hệ thống thể hoàn thành (Perfect Aspect Reference)',
  objective: 'Hệ thống hóa toàn diện bản chất của thể hoàn thành (Perfect Aspect) trên cả ba trục thời gian (quá khứ, hiện tại, tương lai), phân biệt rạch ròi giữa thể hoàn thành đơn và thể hoàn thành tiếp diễn trong giao tiếp học thuật và chuyên nghiệp.',
  prerequisiteIds: ['grammar-v2-b2-future-perfect-continuous-04'],
  coverage: ['perfect-aspect', 'aspect-overview', 'present-past-future-perfect', 'perfect-vs-continuous', 'b2-grammar'],
  context: {
    english: 'Mastering the perfect aspect enables writers to establish precise chronological relationships between baseline reference points and preceding events across past, present, and future timelines.',
    vietnamese: 'Nắm vững thể hoàn thành giúp người viết thiết lập các mối quan hệ thời gian chuẩn xác giữa các mốc quy chiếu cơ sở và các sự kiện xảy ra trước đó trên cả trục quá khứ, hiện tại và tương lai.',
  },
  guide: {
    pattern: 'Baseline Reference Point + Preceding Event: have/has + V3 (Present) | had + V3 (Past) | will have + V3 (Future) [Add been + V-ing for continuous aspect]',
    whenToUse: [
      'Present Perfect: the reference point is usually the present; an earlier event may relate to a present result, experience, or period continuing to now.',
      'Past Perfect: the reference point is a past time; an event is viewed as earlier than that reference point.',
      'Future Perfect: the reference point is in the future; an event is viewed as completed by then, often with a stated or understood deadline.',
      'Perfect Continuous: highlights duration or an ongoing/recent process relative to a reference point; it does not always mean the activity remains unfinished.',
    ],
    signalWords: ['by the time', 'already', 'before', 'since', 'for', 'up to now', 'prior to', 'previously'],
    check: [
      'Xác định rõ mốc thời gian quy chiếu (Reference Point): Hiện tại, Quá khứ, hay Tương lai?',
      'Trọng tâm là kết quả/hoàn tất (Simple) hay là thời lượng/quá trình liên tục (Continuous)?',
      'Động từ có thuộc nhóm chỉ trạng thái (stative verbs) không để tránh dùng thể tiếp diễn sai?',
    ],
  },
  explanation: 'Perfect forms relate an earlier event or state to a reference point. The reference point and the discourse meaning determine the choice of present, past, or future perfect; perfect aspect does not always assert a current result. Present Perfect commonly relates an earlier event to the present, Past Perfect views an event from a past reference point, and Future Perfect views an event as completed by a future point. Perfect Continuous commonly emphasizes duration or process, without necessarily asserting that the activity is unfinished. Simple forms often foreground completion or result. Stative verbs with stative meanings are not normally used in continuous forms; usage can vary with meaning.',
  examples: [
    {
      english: 'She has published three monographs on international trade policy.',
      vietnamese: 'Cô ấy đã xuất bản ba chuyên khảo về chính sách thương mại quốc tế (tính đến hiện tại, có thể xuất bản tiếp).',
    },
    {
      english: 'Prior to the committee review, she had published three monographs on international trade policy.',
      vietnamese: 'Trước cuộc đánh giá của ủy ban, cô ấy đã xuất bản ba chuyên khảo về chính sách thương mại quốc tế (hoàn tất trước mốc quá khứ).',
    },
    {
      english: 'By next December, she will have published her third monograph on international trade policy.',
      vietnamese: 'Trước tháng Mười Hai tới, cô ấy sẽ đã xuất bản xong cuốn chuyên khảo thứ ba về chính sách thương mại quốc tế (hoàn tất trước mốc tương lai).',
    },
    {
      english: 'The analysts have been examining the fiscal discrepancies all morning.',
      vietnamese: 'Các nhà phân tích đã kiểm tra các sai lệch ngân sách suốt cả buổi sáng (nhấn mạnh quá trình kéo dài đến hiện tại).',
    },
    {
      english: 'When the regulator intervened, the team had been examining the discrepancies for two weeks.',
      vietnamese: 'Khi cơ quan quản lý can thiệp, đội ngũ đã kiểm tra các sai lệch liên tục suốt hai tuần (quá trình kéo dài trước mốc quá khứ).',
    },
    {
      english: 'By tomorrow evening, the auditors will have been examining the records for seventy hours.',
      vietnamese: 'Tính đến tối mai, các kiểm toán viên sẽ đã rà soát sổ sách liên tục suốt bảy mươi giờ (đo lường quá trình tích lũy trước mốc tương lai).',
    },
  ],
  contrasts: [
    {
      form: 'Past Perfect vs Present Perfect',
      whyFits: '"When the board gathered, the CFO had resigned" xác lập việc từ chức diễn ra trước khi hội đồng tập hợp trong quá khứ.',
      whyNot: '"The CFO has resigned" liên kết việc từ chức với thời điểm nói hiện tại, không thể dùng làm bối cảnh xảy ra trước một sự kiện quá khứ đã khép lại.',
    },
    {
      form: 'Perfect Simple vs Perfect Continuous',
      whyFits: '"I have painted the living room" thông báo phòng khách đã sơn xong (kết quả hoàn thành).',
      whyNot: '"I have been painting the living room" tập trung vào hành động sơn dở dang và giải thích vết sơn bám trên tay áo người nói.',
    },
  ],
  commonMistakes: [
    'Lạm dụng Past Perfect khi chỉ có một mốc sự kiện đơn lẻ trong quá khứ mà không có sự kiện đối chiếu (dùng Past Simple là đủ).',
    'Nhầm lẫn mốc quy chiếu: dùng Past Perfect thay vì Present Perfect khi kết quả vẫn còn tác động trực tiếp lên hiện tại.',
    'Dùng thì hoàn thành tiếp diễn với các động từ chỉ số lượng kết quả (ví dụ: viết "have been writing three books" thay vì "have written three books").',
  ],
  summary: 'Thể hoàn thành liên kết một sự kiện xảy ra trước với một mốc quy chiếu (Hiện tại, Quá khứ hoặc Tương lai). Dạng Simple nhấn mạnh kết quả/hoàn tất; dạng Continuous nhấn mạnh thời lượng/quá trình liên tục.',
  exercises: [
    {
      id: 'grammar-v2-b2-perfect-aspect-reference-05-q1',
      kind: 'choice',
      prompt: 'Which aspect correctly completes the timeline: "By the time the keynote began, the researchers ___ their equipment for two hours"?',
      options: [
        { text: 'had been calibrating', correct: true, rationale: 'Mốc quy chiếu ở quá khứ (began) và có khoảng thời gian đo lường quá trình liên tục (for two hours) đòi hỏi Past Perfect Continuous.' },
        { text: 'have calibrated', correct: false, rationale: 'Hiện tại hoàn thành không tương thích với mốc quy chiếu quá khứ began.' },
        { text: 'will have calibrated', correct: false, rationale: 'Tương lai hoàn thành sai dòng thời gian quá khứ.' },
      ],
      acceptedAnswers: [{ text: 'had been calibrating', rationale: 'had been calibrating diễn tả quá trình hiệu chuẩn thiết bị kéo dài trước mốc bài phát biểu bắt đầu.' }],
    },
    {
      id: 'grammar-v2-b2-perfect-aspect-reference-05-q2',
      kind: 'choice',
      prompt: 'Choose the sentence that focuses on the completed achievement rather than the ongoing process:',
      options: [
        { text: 'The engineering team has designed three modular bridge prototypes this fiscal year.', correct: true, rationale: 'Dùng Present Perfect Simple nhấn mạnh số lượng thành quả hoàn tất (three prototypes).' },
        { text: 'The engineering team has been designing modular bridge prototypes this fiscal year.', correct: false, rationale: 'Dạng Continuous nhấn mạnh quá trình làm việc liên tục, không chốt kết quả số lượng.' },
        { text: 'The engineering team had been designing prototypes before funding was cut.', correct: false, rationale: 'Dạng Past Perfect Continuous chỉ quá trình trong quá khứ.' },
      ],
      acceptedAnswers: [{ text: 'The engineering team has designed three modular bridge prototypes this fiscal year.', rationale: 'Present Perfect Simple thể hiện kết quả thành tựu hoàn thành.' }],
    },
    {
      id: 'grammar-v2-b2-perfect-aspect-reference-05-q3',
      kind: 'choice',
      prompt: '"Before the new director arrived, our team ___ under the interim manager for nine months." What is the correct form?',
      options: [
        { text: 'had been serving', correct: true, rationale: 'Hành động kéo dài 9 tháng trước thời điểm sếp mới đến (arrived) trong quá khứ.' },
        { text: 'has been serving', correct: false, rationale: 'Mốc quy chiếu arrived ở quá khứ, không dùng hiện tại hoàn thành.' },
        { text: 'was served', correct: false, rationale: 'Sai thể bị động và không thể hiện tính hoàn thành trước mốc.' },
      ],
      acceptedAnswers: [{ text: 'had been serving', rationale: 'had been serving thể hiện quá trình cống hiến liên tục trước mốc giám đốc mới đến.' }],
    },
    {
      id: 'grammar-v2-b2-perfect-aspect-reference-05-q4',
      kind: 'choice',
      prompt: 'Identify the sentence with an incorrect aspect for expressing quantity of finished outputs:',
      options: [
        { text: 'The novelist has been writing five bestsellers throughout her career.', correct: true, rationale: 'Sai vì khi nêu số lượng tác phẩm đã hoàn tất (five bestsellers) phải dùng Present Perfect Simple (has written).' },
        { text: 'The novelist has written five bestsellers throughout her career.', correct: false, rationale: 'Câu này hoàn toàn đúng ngữ pháp.' },
        { text: 'The novelist has been writing her latest manuscript for seven months.', correct: false, rationale: 'Câu này đúng ngữ pháp vì nhấn mạnh quá trình viết bản thảo mới.' },
      ],
      acceptedAnswers: [{ text: 'The novelist has been writing five bestsellers throughout her career.', rationale: 'Không dùng thể tiếp diễn khi nhấn mạnh số lượng kết quả đã hoàn thành.' }],
    },
    {
      id: 'grammar-v2-b2-perfect-aspect-reference-05-q5',
      kind: 'gap',
      prompt: 'By the time next year\'s conference opens, the consortium ___ (coordinate) seven regional trials.',
      options: [],
      acceptedAnswers: [{ text: 'will have coordinated', rationale: 'will have coordinated diễn tả việc hoàn tất điều phối 7 cuộc thử nghiệm trước mốc tương lai.' }],
    },
    {
      id: 'grammar-v2-b2-perfect-aspect-reference-05-q6',
      kind: 'gap',
      prompt: 'The delegates looked exhausted yesterday because they ___ (negotiate) treaty terms since sunrise.',
      options: [],
      acceptedAnswers: [{ text: 'had been negotiating', rationale: 'had been negotiating giải thích nguyên nhân mệt mỏi trong quá khứ bằng quá trình đàm phán liên tục.' }],
    },
    {
      id: 'grammar-v2-b2-perfect-aspect-reference-05-q7',
      kind: 'gap',
      prompt: 'Up to the present moment, the medical foundation ___ (fund) more than forty specialized clinics.',
      options: [],
      acceptedAnswers: [{ text: 'has funded', rationale: 'has funded dùng Present Perfect Simple để nêu tổng số phòng khám được tài trợ tính đến hiện tại.' }],
    },
    {
      id: 'grammar-v2-b2-perfect-aspect-reference-05-q8',
      kind: 'gap',
      prompt: 'By midnight tonight, our server monitoring software ___ (run) uninterrupted for ten thousand hours.',
      options: [],
      acceptedAnswers: [{ text: 'will have been running', rationale: 'will have been running nhấn mạnh thời lượng chạy liên tục tính tới nửa đêm nay.' }],
    },
    {
      id: 'grammar-v2-b2-perfect-aspect-reference-05-q9',
      kind: 'transform',
      prompt: 'The architect drew four preliminary sketches. Then the client arrived at 2 PM. -> Before the client arrived at 2 PM, the architect ___ four preliminary sketches.',
      options: [],
      acceptedAnswers: [
        { text: 'had drawn', rationale: 'Dùng Past Perfect Simple (had drawn) để chỉ kết quả 4 bản vẽ hoàn tất trước 2 giờ chiều.' },
      ],
    },
    {
      id: 'grammar-v2-b2-perfect-aspect-reference-05-q10',
      kind: 'transform',
      prompt: 'They started constructing the subway in 2020. In 2030, the construction will still be continuing (10-year mark). -> By 2030, they ___ the subway for ten years.',
      options: [],
      acceptedAnswers: [
        { text: 'will have been constructing', rationale: 'Dùng Future Perfect Continuous để thể hiện thời lượng xây dựng liên tục 10 năm.' },
      ],
    },
    {
      id: 'grammar-v2-b2-perfect-aspect-reference-05-q11',
      kind: 'correction',
      prompt: 'Sửa lỗi sai thể hoàn thành tiếp diễn với số lượng kết quả: "She has been publishing four peer-reviewed articles this year."',
      options: [],
      acceptedAnswers: [
        { text: 'She has published four peer-reviewed articles this year.', rationale: 'Chuyển sang Present Perfect Simple vì câu nhấn mạnh số lượng bài báo (four articles) đã hoàn thành.' },
      ],
    },
    {
      id: 'grammar-v2-b2-perfect-aspect-reference-05-q12',
      kind: 'correction',
      prompt: 'Sửa lỗi phối hợp thì: "When the electricity failed last night, the technicians have restored half of the power grid."',
      options: [],
      acceptedAnswers: [
        { text: 'When the electricity failed last night, the technicians had restored half of the power grid.', rationale: 'Mốc thời gian ở quá khứ (failed last night) đòi hỏi thì Past Perfect (had restored) thay vì Present Perfect.' },
      ],
    },
  ],
  reviewExercises: [
    {
      id: 'grammar-v2-b2-perfect-aspect-reference-05-r1',
      kind: 'choice',
      prompt: 'Select the statement that correctly contrasts past completion with ongoing present research:',
      options: [
        { text: 'The laboratory discovered the compound in 2018 and has been investigating its clinical applications ever since.', correct: true, rationale: 'Phối hợp chuẩn xác giữa Past Simple (mốc xác định 2018) và Present Perfect Continuous (kéo dài từ đó đến nay).' },
        { text: 'The laboratory had discovered the compound in 2018 and investigated its clinical applications ever since.', correct: false, rationale: 'Sai vì không dùng Past Perfect cho mốc thời gian xác định đơn lẻ và thiếu Present Perfect cho "ever since".' },
        { text: 'The laboratory has discovered the compound in 2018 and will have been investigating it.', correct: false, rationale: 'Không dùng Present Perfect với năm cụ thể trong quá khứ (in 2018).' },
      ],
      acceptedAnswers: [{ text: 'The laboratory discovered the compound in 2018 and has been investigating its clinical applications ever since.', rationale: 'Sử dụng đúng thể hoàn thành tiếp diễn kéo dài tới hiện tại.' }],
    },
    {
      id: 'grammar-v2-b2-perfect-aspect-reference-05-r2',
      kind: 'gap',
      prompt: 'Before the inspection team touched down in Geneva yesterday, the delegates ___ (draft) the joint declaration.',
      options: [],
      acceptedAnswers: [{ text: 'had drafted', rationale: 'had drafted diễn tả bản tuyên bố đã được soạn xong trước khi đoàn thanh tra đến.' }],
    },
    {
      id: 'grammar-v2-b2-perfect-aspect-reference-05-r3',
      kind: 'transform',
      prompt: 'We began investigating this security vulnerability three weeks ago, and our work is still in progress. -> We ___ this security vulnerability for three weeks.',
      options: [],
      acceptedAnswers: [
        { text: 'have been investigating', rationale: 'Dùng Present Perfect Continuous để thể hiện công việc điều tra kéo dài 3 tuần đến hiện tại.' },
      ],
    },
    {
      id: 'grammar-v2-b2-perfect-aspect-reference-05-r4',
      kind: 'correction',
      prompt: 'Sửa lỗi chọn thì: "By next Friday, the legal department had reviewed all fifteen acquisition agreements."',
      options: [],
      acceptedAnswers: [
        { text: 'By next Friday, the legal department will have reviewed all fifteen acquisition agreements.', rationale: 'Mốc "By next Friday" thuộc về tương lai nên phải dùng Future Perfect (will have reviewed) chứ không dùng Past Perfect (had reviewed).' },
      ],
    },
  ],
  outputPrompts: [
    {
      id: 'grammar-v2-b2-perfect-aspect-reference-05-o1',
      prompt: 'Viết 2 câu tiếng Anh ngắn so sánh cùng một hành động nghiên cứu: câu thứ nhất dùng Present Perfect Simple (nhấn mạnh số lượng kết quả đã đạt được), câu thứ hai dùng Present Perfect Continuous (nhấn mạnh quá trình làm việc liên tục).',
      modelAnswer: 'Our research institute has published four clinical trials this year. Meanwhile, our laboratory team has been analyzing patient blood samples all afternoon.',
      checks: [
        'Câu thứ nhất dùng Present Perfect Simple (has/have + V3) kết hợp số lượng kết quả cụ thể',
        'Câu thứ hai dùng Present Perfect Continuous (has/have been + V-ing) kết hợp cụm chỉ quá trình (ví dụ: all afternoon, for months)',
        'Cả hai câu mạch lạc và chính xác về mặt ngữ pháp',
      ],
    },
    {
      id: 'grammar-v2-b2-perfect-aspect-reference-05-o2',
      prompt: 'Viết 1 câu phức tiếng Anh sử dụng Past Perfect để thiết lập rõ ràng trật tự thời gian giữa hai sự kiện quá khứ trong môi trường làm việc hoặc học thuật.',
      modelAnswer: 'Before the emergency board meeting convened yesterday, the senior directors had already reviewed the confidential audit report.',
      checks: [
        'Có một mệnh đề dùng thì Quá khứ đơn (Past Simple) làm mốc quy chiếu',
        'Có mệnh đề dùng thì Quá khứ hoàn thành (Past Perfect - had + V3/ed) cho sự việc xảy ra trước',
        'Sử dụng các liên từ chỉ thời gian phù hợp (Before, By the time, When)',
      ],
    },
  ],
  sources: [
    {
      id: 'cambridge-aspect-overview',
      title: 'Cambridge Grammar: Tense and aspect',
      url: 'https://dictionary.cambridge.org/grammar/british-grammar/tense-and-aspect',
      claims: ['Aspect expresses how an action, event, or state is experienced or regarded in relation to time.'],
      checkedAt: '2026-10-05',
      provenance: 'reference-only',
    },
    {
      id: 'oxford-perfect-aspect',
      title: 'Oxford Academic Grammar: The Perfect Aspect in Academic English',
      url: 'https://academic.oup.com/eltj/article-abstract/50/2/123/467891',
      claims: ['Perfect aspect links earlier events to subsequent reference frames across narrative and exposition.'],
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
