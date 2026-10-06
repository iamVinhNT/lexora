/**
 * @file perfect-simple-vs-continuous.ts
 * @description Bài học B1 so sánh thì hiện tại hoàn thành đơn và hiện tại hoàn thành tiếp diễn.
 */
import type { GrammarLesson } from '../../types.js';

const lesson: GrammarLesson = {
  id: 'grammar-v2-b1-perfect-simple-vs-continuous-04',
  revisionId: 'grammar-v2-b1-perfect-simple-vs-continuous-04@1.0.0',
  revision: '1.0.0',
  title: 'Hiện tại hoàn thành đơn so với tiếp diễn (Perfect Simple vs Continuous)',
  objective: 'Phân biệt chính xác khi nào dùng Present Perfect Simple (kết quả, số lượng) và khi nào dùng Present Perfect Continuous (tiến trình, thời lượng, tính tạm thời).',
  prerequisiteIds: ['grammar-v2-b1-present-perfect-continuous-03'],
  coverage: ['perfect-simple-vs-continuous', 'present-perfect-contrast', 'completed-vs-ongoing', 'quantity-vs-duration', 'b1-grammar'],
  context: {
    english: 'Rachel has been writing reports all morning, but so far she has only finished two of them. Her desk is covered in loose papers, and she still has three more summaries to draft.',
    vietnamese: 'Rachel đã viết báo cáo suốt cả buổi sáng, nhưng cho đến nay cô ấy mới chỉ hoàn thành được hai bản. Bàn làm việc ngập tràn giấy tờ, và cô vẫn còn ba bản tóm tắt nữa cần soạn thảo.',
  },
  guide: {
    pattern: 'Hoàn thành đơn: S + have/has + V3/ed (kết quả / số lượng); Hoàn thành tiếp diễn: S + have/has been + V-ing (tiến trình / thời lượng)',
    whenToUse: [
      'Dùng Present Perfect Simple khi muốn nhấn mạnh kết quả hoàn tất, số lần lặp lại hoặc số lượng sản phẩm hoàn thành (How much? How many? How many times?).',
      'Dùng Present Perfect Continuous khi muốn nhấn mạnh sự kéo dài liên tục của hành động hoặc tính chất tạm thời của sự việc (How long?).',
      'Luôn dùng Present Perfect Simple với các động từ chỉ trạng thái (know, have, believe, understand...).',
    ],
    signalWords: ['how many', 'how much', 'how long', 'so far', 'already', 'yet', 'all day', 'for', 'since'],
    check: [
      'Có số lượng cụ thể (two books, three cups) -> dùng Simple.',
      'Hành động nhấn mạnh thời lượng hoặc chưa xong (all morning, for hours) -> dùng Continuous.',
      'Động từ trạng thái không được chia tiếp diễn dù có "for" hay "since".',
    ],
  },
  explanation: 'Sự khác biệt cốt lõi giữa Present Perfect Simple và Present Perfect Continuous nằm ở góc nhìn của người nói: "kết quả hoàn thành" đối lập với "tiến trình hoạt động". Khi dùng thì đơn (have/has + V3/ed), người nói quan tâm hành động đã xong chưa, kết quả ra sao và đạt được số lượng bao nhiêu (ví dụ: "I have read 50 pages"). Ngược lại, khi dùng thì tiếp diễn (have/has been + V-ing), trọng tâm chuyển sang hoạt động đó diễn ra trong bao lâu và có tính liên tục hay tạm thời (ví dụ: "I have been reading for an hour"). Ngoài ra, với các động từ trạng thái chỉ nhận thức, cảm xúc hoặc sở hữu (know, like, belong, contain), ta bắt buộc phải dùng thì đơn ngay cả khi hành động kéo dài qua một khoảng thời gian.',
  examples: [
    {
      english: 'I have read three chapters of this novel today.',
      vietnamese: 'Tôi đã đọc xong ba chương của cuốn tiểu thuyết này hôm nay (nhấn mạnh số lượng hoàn thành).',
    },
    {
      english: 'I have been reading this novel for three hours.',
      vietnamese: 'Tôi đã đọc cuốn tiểu thuyết này suốt ba tiếng đồng hồ (nhấn mạnh thời lượng tiến trình).',
    },
    {
      english: 'Marcus has fixed the broken bicycle; you can ride it now.',
      vietnamese: 'Marcus đã sửa xong chiếc xe đạp hỏng rồi; bây giờ bạn có thể đi được (kết quả hoàn tất).',
    },
    {
      english: 'Marcus has been fixing the bicycle all afternoon, so his hands are oily.',
      vietnamese: 'Marcus đã sửa xe đạp cả buổi chiều, nên tay anh ấy dính đầy dầu mỡ (dấu vết hoạt động).',
    },
    {
      english: 'How many cups of coffee have you drunk this morning?',
      vietnamese: 'Bạn đã uống bao nhiêu tách cà phê sáng nay rồi? (hỏi số lượng -> dùng Simple).',
    },
    {
      english: 'How long have you been waiting for the bus?',
      vietnamese: 'Bạn đã đợi xe buýt được bao lâu rồi? (hỏi thời lượng -> dùng Continuous).',
    },
  ],
  contrasts: [
    {
      form: 'has eaten two slices vs has been eating all evening',
      whyFits: 'He has eaten two slices of pizza (nêu rõ số lượng 2 lát bánh hoàn thành).',
      whyNot: 'He has been eating two slices of pizza (sai vì không dùng tiếp diễn cho số lượng cụ thể).',
    },
    {
      form: 'has lived vs has been living',
      whyFits: 'Với các động từ như live, work, thì đơn gợi cảm giác lâu dài, ổn định hơn; thì tiếp diễn gợi tính tạm thời.',
      whyNot: 'Cả hai đều đúng ngữ pháp khi có since/for, nhưng "is living temporarily" tương ứng với has been living.',
    },
  ],
  commonMistakes: [
    'Dùng thì tiếp diễn khi trả lời cho câu hỏi số lượng: "I have been sending five messages" (sai, phải là "I have sent five messages").',
    'Dùng thì tiếp diễn với động từ nhận thức hoặc sở hữu: "We have been knowing each other for years" (sai, phải là "have known").',
    'Nhầm lẫn giữa kết quả đã hoàn tất (Simple) và hành động đang dở dang (Continuous): "I have been painting the door, so it is ready" (sai, đã xong sẵn sàng phải dùng "I have painted the door").',
  ],
  summary: 'Simple nhấn mạnh kết quả và số lượng (how many/much); Continuous nhấn mạnh tiến trình và thời lượng (how long). Stative verbs chỉ dùng Simple.',
  exercises: [
    {
      id: 'grammar-v2-b1-perfect-simple-vs-continuous-04-q1',
      kind: 'choice',
      prompt: 'Alex still has paint on his hands and has not finished painting the fence; he ___ it.',
      options: [
        { text: 'has been painting', correct: true, rationale: 'Vết bẩn trên tay là dấu vết trực quan của hoạt động vừa diễn ra, dùng thì tiếp diễn.' },
        { text: 'has painted', correct: false, rationale: 'Has painted nhấn mạnh kết quả hoàn thành chiếc hàng rào, không tập trung vào dấu vết hoạt động.' },
        { text: 'paints', correct: false, rationale: 'Paints là hiện tại đơn diễn tả thói quen, không giải thích nguyên nhân bàn tay lấm bẩn ở hiện tại.' },
      ],
      acceptedAnswers: [{ text: 'has been painting', rationale: 'Present Perfect Continuous diễn tả hoạt động vừa diễn ra để lại dấu vết.' }],
    },
    {
      id: 'grammar-v2-b1-perfect-simple-vs-continuous-04-q2',
      kind: 'choice',
      prompt: 'At 3 p.m., choose the Present Perfect Simple form to report the number of emails already completed: "How many customer emails ___ you ___ so far this afternoon?"',
      options: [
        { text: 'have / answered', correct: true, rationale: 'At 3 p.m., this unfinished period is reported with Present Perfect Simple for the completed total.' },
        { text: 'have / been answering', correct: false, rationale: 'This does not report the completed total requested.' },
        { text: 'did / answer', correct: false, rationale: 'The prompt specifies 3 p.m. within this afternoon and asks for Present Perfect Simple; Past Simple normally refers to a completed period.' },
      ],
      acceptedAnswers: [{ text: 'have / answered', rationale: 'The prompt asks for the completed count in an unfinished time period.' }],
    },
    {
      id: 'grammar-v2-b1-perfect-simple-vs-continuous-04-q3',
      kind: 'choice',
      prompt: 'We ___ each other since our first semester at university.',
      options: [
        { text: 'have known', correct: true, rationale: 'Động từ know là động từ trạng thái, không dùng thì tiếp diễn dù có since.' },
        { text: 'have been knowing', correct: false, rationale: 'Know là stative verb, không chia ở dạng -ing hoàn thành.' },
        { text: 'knew', correct: false, rationale: 'Knew là quá khứ đơn, không đi với liên từ since nối tới hiện tại.' },
      ],
      acceptedAnswers: [{ text: 'have known', rationale: 'Stative verb know chỉ dùng Present Perfect Simple.' }],
    },
    {
      id: 'grammar-v2-b1-perfect-simple-vs-continuous-04-q4',
      kind: 'choice',
      prompt: 'The chef ___ four different pasta dishes for tonight\'s menu already.',
      options: [
        { text: 'has prepared', correct: true, rationale: 'Nêu số lượng hoàn thành (four dishes) và có trạng từ already, dùng Simple.' },
        { text: 'has been preparing', correct: false, rationale: 'Không dùng Continuous với số lượng món ăn cụ thể đã chuẩn bị xong.' },
        { text: 'is preparing', correct: false, rationale: 'Is preparing mâu thuẫn với trạng từ already chỉ kết quả đã xong.' },
      ],
      acceptedAnswers: [{ text: 'has prepared', rationale: 'Đã hoàn thành 4 món cụ thể đi kèm already dùng Present Perfect Simple.' }],
    },
    {
      id: 'grammar-v2-b1-perfect-simple-vs-continuous-04-q5',
      kind: 'gap',
      prompt: 'Daniel ___ (write) three essays so far this term.',
      options: [],
      acceptedAnswers: [
        { text: 'has written', rationale: 'Nêu số lượng hoàn thành (three essays) với so far, dùng Present Perfect Simple.' },
      ],
    },
    {
      id: 'grammar-v2-b1-perfect-simple-vs-continuous-04-q6',
      kind: 'gap',
      prompt: 'Daniel is exhausted because he ___ (write) essays all day.',
      options: [],
      acceptedAnswers: [
        { text: 'has been writing', rationale: 'Nhấn mạnh hành động viết liên tục cả ngày (all day) dẫn đến kiệt sức, dùng Continuous.' },
      ],
    },
    {
      id: 'grammar-v2-b1-perfect-simple-vs-continuous-04-q7',
      kind: 'gap',
      prompt: 'I ___ (own) this acoustic guitar for more than ten years.',
      options: [],
      acceptedAnswers: [
        { text: 'have owned', rationale: 'Own là động từ trạng thái chỉ sở hữu, chỉ chia Present Perfect Simple.' },
      ],
    },
    {
      id: 'grammar-v2-b1-perfect-simple-vs-continuous-04-q8',
      kind: 'gap',
      prompt: 'How long ___ you ___ (wait) for the dentist in the waiting room?',
      options: [],
      acceptedAnswers: [
        { text: 'have you been waiting', rationale: 'Hỏi thời lượng How long của một hành động đang tiếp diễn.' },
      ],
    },
    {
      id: 'grammar-v2-b1-perfect-simple-vs-continuous-04-q9',
      kind: 'transform',
      prompt: 'Viết lại câu sau dùng Present Perfect Simple để nhấn mạnh kết quả: "She started reading that textbook earlier and she is on the final chapter now; she has completed 200 pages."',
      options: [],
      acceptedAnswers: [
        { text: 'She has read 200 pages of that textbook.', rationale: 'Nhấn mạnh kết quả hoàn thành 200 trang bằng thì Present Perfect Simple.' },
      ],
    },
    {
      id: 'grammar-v2-b1-perfect-simple-vs-continuous-04-q10',
      kind: 'transform',
      prompt: 'Viết lại câu sau dùng Present Perfect Continuous để nhấn mạnh thời lượng kéo dài: "He started repairing the roof at 8 AM and he is still repairing it at 2 PM."',
      options: [],
      acceptedAnswers: [
        { text: 'He has been repairing the roof for six hours.', rationale: 'Nhấn mạnh thời lượng kéo dài 6 tiếng bằng Present Perfect Continuous.' },
        { text: 'He has been repairing the roof since 8 AM.', rationale: 'Cách viết dùng mốc thời gian since 8 AM.' },
      ],
    },
    {
      id: 'grammar-v2-b1-perfect-simple-vs-continuous-04-q11',
      kind: 'correction',
      prompt: 'Sửa lỗi sai trong câu diễn đạt số lượng hoàn thành: "I have been drinking four glasses of water this morning."',
      options: [],
      acceptedAnswers: [
        { text: 'I have drunk four glasses of water this morning.', rationale: 'Có số lượng 4 ly nước hoàn tất phải dùng Present Perfect Simple (have drunk).' },
      ],
    },
    {
      id: 'grammar-v2-b1-perfect-simple-vs-continuous-04-q12',
      kind: 'correction',
      prompt: 'Sửa lỗi chia thì với động từ trạng thái sở hữu: "My parents have been having this apartment since 2010."',
      options: [],
      acceptedAnswers: [
        { text: 'My parents have had this apartment since 2010.', rationale: 'Động từ have mang nghĩa sở hữu là stative verb, chuyển thành have had.' },
      ],
    },
  ],
  reviewExercises: [
    {
      id: 'grammar-v2-b1-perfect-simple-vs-continuous-04-r1',
      kind: 'choice',
      prompt: 'Look at the kitchen counter! Somebody ___ all the chocolate cookies.',
      options: [
        { text: 'has eaten', correct: true, rationale: 'Bánh đã hết sạch, nhấn mạnh kết quả hoàn thành của hành động, dùng Simple.' },
        { text: 'has been eating', correct: false, rationale: 'Has been eating ngụ ý hành động đang tiếp diễn và bánh vẫn còn dở dang.' },
        { text: 'was eating', correct: false, rationale: 'Was eating là quá khứ tiếp diễn, không diễn đạt kết quả ở hiện tại.' },
      ],
      acceptedAnswers: [{ text: 'has eaten', rationale: 'Present Perfect Simple nhấn mạnh kết quả bánh đã bị ăn hết.' }],
    },
    {
      id: 'grammar-v2-b1-perfect-simple-vs-continuous-04-r2',
      kind: 'gap',
      prompt: 'They ___ (travel) around Southeast Asia for two months, and they have visited four countries so far.',
      options: [],
      acceptedAnswers: [
        { text: 'have been traveling', rationale: 'Tiến trình du lịch kéo dài 2 tháng dùng Continuous (Anh - Mỹ).' },
        { text: 'have been travelling', rationale: 'Chính tả Anh - Anh travelling.' },
      ],
    },
    {
      id: 'grammar-v2-b1-perfect-simple-vs-continuous-04-r3',
      kind: 'transform',
      prompt: 'Đặt câu hỏi thời lượng (How long) tương ứng với câu: "They live in a rented flat while searching for a permanent house."',
      options: [],
      acceptedAnswers: [
        { text: 'How long have they been living in a rented flat?', rationale: 'Dùng Present Perfect Continuous cho câu hỏi thời lượng mang tính tạm thời.' },
      ],
    },
    {
      id: 'grammar-v2-b1-perfect-simple-vs-continuous-04-r4',
      kind: 'correction',
      prompt: 'Sửa lỗi sai trong câu: "I have been understanding this grammar rule since yesterday."',
      options: [],
      acceptedAnswers: [
        { text: 'I have understood this grammar rule since yesterday.', rationale: 'Understand là động từ trạng thái nhận thức, chỉ dùng Present Perfect Simple (have understood).' },
      ],
    },
  ],
  outputPrompts: [
    {
      id: 'grammar-v2-b1-perfect-simple-vs-continuous-04-o1',
      prompt: 'Viết 2–3 câu mô tả một ngày làm việc hoặc học tập của bạn, trong đó kết hợp cả Present Perfect Continuous (nêu hoạt động bạn làm suốt buổi) và Present Perfect Simple (nêu số lượng cụ thể bạn đã hoàn thành).',
      modelAnswer: 'I have been revising English vocabulary all morning for my upcoming test. So far, I have memorized fifty new phrasal verbs and completed three practice quizzes.',
      checks: [
        'Dùng Present Perfect Continuous cho tiến trình (have been revising all morning).',
        'Dùng Present Perfect Simple cho số lượng cụ thể (have memorized fifty..., completed three...).',
        'Sự đối lập giữa tiến trình và kết quả rõ ràng và chính xác ngữ pháp.',
      ],
    },
    {
      id: 'grammar-v2-b1-perfect-simple-vs-continuous-04-o2',
      prompt: 'Viết 2–3 câu giải thích sự khác biệt giữa hai câu sau bằng tiếng Anh hoặc tiếng Việt: (1) "She has painted the kitchen." và (2) "She has been painting the kitchen."',
      modelAnswer: 'In sentence (1), "She has painted the kitchen" means the job is finished and the kitchen is ready to use. In sentence (2), "She has been painting the kitchen" focuses on the ongoing activity or explains why she has paint stains on her clothes, meaning the kitchen might still be unfinished.',
      checks: [
        'Chỉ ra câu (1) nhấn mạnh kết quả hoàn thành (finished result).',
        'Chỉ ra câu (2) nhấn mạnh hành động đang diễn ra hoặc dấu vết để lại (ongoing activity / unfinished).',
        'Giải thích mạch lạc và đúng trọng tâm kiến thức B1.',
      ],
    },
  ],
  sources: [
    {
      id: 'cambridge-perfect-simple-continuous',
      title: 'Cambridge Grammar: Present perfect simple vs continuous',
      url: 'https://dictionary.cambridge.org/grammar/british-grammar/present-perfect-simple-or-present-perfect-continuous',
      claims: ['Phân biệt kết quả hoàn tất với thời lượng tiến trình và quy tắc stative verbs trong thì hoàn thành'],
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
