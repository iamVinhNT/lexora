/**
 * @file wish-present.ts
 * @description Bài học B1 về câu ước cho hiện tại (Wish and If Only for Present: wish + Past Simple / were).
 */
import type { GrammarLesson } from '../../types.js';

const lesson: GrammarLesson = {
  id: 'grammar-v2-b1-wish-present-11',
  revisionId: 'grammar-v2-b1-wish-present-11@1.0.0',
  revision: '1.0.0',
  title: 'Câu ước cho hiện tại (Wish and If Only for Present)',
  objective: 'Sử dụng cấu trúc "wish + Past Simple / were" và "If only" để diễn tả những mong ước, nuối tiếc về một thực tế không như ý ở hiện tại, đồng thời phân biệt rõ giữa wish và hope.',
  prerequisiteIds: ['grammar-v2-b1-conditionals-contrast-10'],
  coverage: ['wish-present', 'unreal-wishes', 'if-only-present', 'wish-vs-hope', 'b1-grammar'],
  context: {
    english: 'Simon works in a busy underground call center with no windows. He often sighs: "I wish I had an office with a view of the park. If only I were fluent in Spanish, I could transfer to our coastal branch in Malaga."',
    vietnamese: 'Simon làm việc tại một trung tâm trực tổng đài bận rộn dưới tầng hầm không có cửa sổ. Anh ấy thường thở dài: "Ước gì tôi có một văn phòng nhìn ra công viên. Giá như tôi thông thạo tiếng Tây Ban Nha, tôi đã có thể chuyển tới chi nhánh ven biển ở Malaga."',
  },
  guide: {
    pattern: 'Khẳng định: S + wish(es) + (that) + S + V(quá khứ đơn / were); Cảm xúc mạnh hơn: If only + S + V(quá khứ đơn / were)',
    whenToUse: [
      'Bày tỏ mong ước muốn thay đổi một tình trạng hoặc hoàn cảnh không như ý ở hiện tại.',
      'Diễn tả sự tiếc nuối khi mình không có một kỹ năng, tài sản hoặc điều kiện nào đó ngay lúc này.',
      'Sử dụng "If only" khi muốn nhấn mạnh cảm xúc khao khát hoặc tiếc nuối mãnh liệt hơn so với "I wish".',
    ],
    signalWords: ['I wish', 'she wishes', 'if only', 'at present', 'right now', 'unreal desire'],
    check: [
      'Mệnh đề sau "wish / If only" bắt buộc phải lùi thì về Quá khứ đơn (Past Simple).',
      'Động từ to be chuẩn mực dùng "were" cho tất cả các ngôi (I wish I were, she wishes she were).',
      'Phân biệt tuyệt đối giữa "wish" (ước điều trái thực tế) và "hope" (hy vọng điều có thể xảy ra ở hiện tại hoặc tương lai: I hope it doesn\'t rain).',
    ],
  },
  explanation: 'Cấu trúc "wish" và "If only" dùng cho hiện tại thể hiện một mong muốn trái ngược với thực tế đang diễn ra. Vì thực tế ở hiện tại không thể thay đổi ngay lập tức, người nói sử dụng thì Quá khứ đơn (Past Simple) để tạo khoảng cách giả định (unreal past), tương tự như mệnh đề If trong câu điều kiện loại 2.\n\nĐặc biệt với động từ to be, dạng "were" là tiêu chuẩn ngữ pháp chính quy cho mọi ngôi (I wish I were taller, If only he were here). Trong đàm thoại thân mật hàng ngày, người bản ngữ đôi khi dùng "was" cho ngôi số ít, nhưng "were" luôn là lựa chọn chính xác trong văn viết học thuật và các kỳ thi.\n\nĐiểm quan trọng nhất ở cấp độ B1 là phân biệt "wish" và "hope":\n- Dùng "wish + Past Simple" khi điều ước hoàn toàn trái với sự thật hiện tại: "I wish I had a car" (thực tế: tôi không có xe).\n- Dùng "hope + Present / Future" khi việc đó hoàn toàn có thể xảy ra hoặc chưa ngã ngũ: "I hope you pass the test tomorrow" (không dùng I wish trong trường hợp này vì kỳ thi chưa diễn ra và hy vọng là có thật).',
  examples: [
    {
      english: 'I wish I had more spare time to pursue photography.',
      vietnamese: 'Tôi ước gì mình có nhiều thời gian rảnh hơn để theo đuổi nhiếp ảnh (thực tế: tôi rất bận).',
    },
    {
      english: 'Maria wishes she lived closer to her workplace so she would not spend two hours commuting.',
      vietnamese: 'Maria ước cô ấy sống gần chỗ làm hơn để không phải mất hai tiếng đi lại.',
    },
    {
      english: 'I wish I were taller so that I could play basketball more effectively.',
      vietnamese: 'Tôi ước gì mình cao hơn để có thể chơi bóng rổ hiệu quả hơn.',
    },
    {
      english: 'If only our apartment had a small balcony with morning sunlight.',
      vietnamese: 'Giá như căn hộ của chúng tôi có một ban công nhỏ đón nắng sớm (If only nhấn mạnh cảm xúc tiếc nuối).',
    },
    {
      english: 'I hope you have a safe and pleasant flight to Tokyo tomorrow.',
      vietnamese: 'Tôi hy vọng bạn có một chuyến bay an toàn và dễ chịu tới Tokyo vào ngày mai (dùng hope cho mong ước thực tế tương lai).',
    },
    {
      english: 'We wish we did not have to work this Saturday morning.',
      vietnamese: 'Chúng tôi ước gì mình không phải đi làm vào sáng thứ Bảy tuần này.',
    },
  ],
  contrasts: [
    {
      form: 'I wish vs I hope',
      whyFits: 'I wish I were on vacation right now (thực tế: tôi đang ngồi ở văn phòng, ước trái thực tế).',
      whyNot: 'I hope I pass my driving exam tomorrow (kỳ thi chưa diễn ra, hy vọng có thể thành sự thật, không dùng wish).',
    },
    {
      form: 'I wish I were vs I wish I was',
      whyFits: 'I wish I were more confident (chuẩn mực văn phong học thuật và các kỳ thi chuẩn hóa).',
      whyNot: 'I wish I was phổ biến trong khẩu ngữ nhưng ít trang trọng hơn.',
    },
  ],
  commonMistakes: [
    'Dùng thì hiện tại sau wish: nói "I wish I have a car" (sai, phải lùi thì thành "I wish I had a car").',
    'Dùng wish thay cho hope trong lời chúc tương lai: nói "I wish you pass your exam" (sai, phải là "I hope you pass your exam").',
    'Dùng wish + will for a simple hope; use hope for a possible future event. Wish + would can express a desired change in another person or situation.',
  ],
  summary: 'Wish / If only for present (S + wish + Past Simple / were) diễn tả mong ước trái với thực tế hiện tại. Phân biệt với hope dùng cho hy vọng có thể xảy ra.',
  exercises: [
    {
      id: 'grammar-v2-b1-wish-present-11-q1',
      kind: 'choice',
      prompt: 'Chọn dạng động từ lùi thì thích hợp sau "wish": "I live in a noisy neighborhood. I wish I ___ in a quiet countryside village."',
      options: [
        { text: 'lived', correct: true, rationale: 'Wish diễn tả mong ước trái với thực tế hiện tại lùi về Quá khứ đơn (lived).' },
        { text: 'live', correct: false, rationale: 'Live là hiện tại đơn, không thể hiện được tính chất ước muốn trái thực tế.' },
        { text: 'will live', correct: false, rationale: 'Không dùng will live sau wish cho mong ước hiện tại.' },
      ],
      acceptedAnswers: [{ text: 'lived', rationale: 'Wish + Past Simple diễn tả mong ước trái thực tế hiện tại.' }],
    },
    {
      id: 'grammar-v2-b1-wish-present-11-q2',
      kind: 'choice',
      prompt: 'Chọn dạng chuẩn mực của động từ to be sau "If only": "If only Liam ___ here right now to explain the instructions to the team."',
      options: [
        { text: 'were', correct: true, rationale: 'Were là dạng chuẩn mực cho mọi ngôi trong mệnh đề ước muốn giả định hiện tại.' },
        { text: 'is', correct: false, rationale: 'Is là hiện tại đơn, không lùi thì sau If only.' },
        { text: 'would be', correct: false, rationale: 'Sau If only ước về trạng thái hiện tại không dùng would be.' },
      ],
      acceptedAnswers: [{ text: 'were', rationale: 'Were là dạng chuẩn mực sau If only cho hiện tại.' }],
    },
    {
      id: 'grammar-v2-b1-wish-present-11-q3',
      kind: 'choice',
      prompt: 'Chọn từ thích hợp cho lời chúc/hy vọng về một sự kiện có thật sắp tới: "I ___ that the weather will be pleasant for your outdoor wedding this weekend."',
      options: [
        { text: 'hope', correct: true, rationale: 'Hy vọng về một sự kiện có thể xảy ra ở tương lai dùng động từ hope.' },
        { text: 'wish', correct: false, rationale: 'Wish không dùng để hy vọng một sự việc cụ thể trong tương lai đi với mệnh đề có thật.' },
        { text: 'desire', correct: false, rationale: 'Desire không dùng trong mẫu câu giao tiếp chúc mừng/hy vọng thường ngày này.' },
      ],
      acceptedAnswers: [{ text: 'hope', rationale: 'Hope dùng cho hy vọng thực tế trong tương lai.' }],
    },
    {
      id: 'grammar-v2-b1-wish-present-11-q4',
      kind: 'choice',
      prompt: 'Chọn dạng phủ định đúng trong câu ước: "Our team has so many meetings. We wish we ___ so much time in discussions."',
      options: [
        { text: 'did not spend', correct: true, rationale: 'Thì Quá khứ đơn phủ định did not spend lùi thì từ thực tế hiện tại spend.' },
        { text: 'do not spend', correct: false, rationale: 'Do not spend là hiện tại đơn, chưa lùi thì sau wish.' },
        { text: 'would not to spend', correct: false, rationale: 'Sai ngữ pháp cấu trúc động từ khuyết thiếu.' },
      ],
      acceptedAnswers: [{ text: 'did not spend', rationale: 'Quá khứ đơn phủ định did not spend sau wish.' }],
    },
    {
      id: 'grammar-v2-b1-wish-present-11-q5',
      kind: 'gap',
      prompt: 'I cannot play the violin. I wish I ___ (can) play a musical instrument gracefully.',
      options: [],
      acceptedAnswers: [
        { text: 'could', rationale: 'Can lùi thì thành could trong câu ước về năng lực ở hiện tại.' },
      ],
    },
    {
      id: 'grammar-v2-b1-wish-present-11-q6',
      kind: 'gap',
      prompt: 'My parents live far away. I wish they ___ (live) in the same city as me.',
      options: [],
      acceptedAnswers: [
        { text: 'lived', rationale: 'Quá khứ đơn lived diễn tả mong ước trái thực tế hiện tại.' },
      ],
    },
    {
      id: 'grammar-v2-b1-wish-present-11-q7',
      kind: 'gap',
      prompt: 'If only our office ___ (have) larger windows to let in natural daylight.',
      options: [],
      acceptedAnswers: [
        { text: 'had', rationale: 'If only đi với thì Quá khứ đơn had cho mong ước ở hiện tại.' },
      ],
    },
    {
      id: 'grammar-v2-b1-wish-present-11-q8',
      kind: 'gap',
      prompt: 'Lucas is shy in public. He wishes he ___ (be) more outgoing at social gatherings.',
      options: [],
      acceptedAnswers: [
        { text: 'were', rationale: 'Were là dạng chuẩn mực cho câu ước với to be.' },
        { text: 'was', rationale: 'Was được chấp nhận trong văn phong ít trang trọng.' },
      ],
    },
    {
      id: 'grammar-v2-b1-wish-present-11-q9',
      kind: 'transform',
      prompt: 'Bắt đầu bằng "I wish I knew..." để viết lại điều ước từ thực tế: "I do not know how to fix this broken coffee machine."',
      options: [],
      acceptedAnswers: [
        { text: 'I wish I knew how to fix this broken coffee machine.', rationale: 'Lùi thì do not know thành knew sau I wish.' },
      ],
    },
    {
      id: 'grammar-v2-b1-wish-present-11-q10',
      kind: 'transform',
      prompt: 'Bắt đầu bằng "If only we had..." để viết lại: "It is a pity that we do not have enough financial resources for the expedition."',
      options: [],
      acceptedAnswers: [
        { text: 'If only we had enough financial resources for the expedition.', rationale: 'Dùng If only kết hợp với Quá khứ đơn had để diễn tả sự tiếc nuối.' },
      ],
    },
    {
      id: 'grammar-v2-b1-wish-present-11-q11',
      kind: 'correction',
      prompt: 'Sửa lỗi không lùi thì sau động từ wish: "I wish I speak fluent French so I could communicate with our clients."',
      options: [],
      acceptedAnswers: [
        { text: 'I wish I spoke fluent French so I could communicate with our clients.', rationale: 'Sau wish phải lùi thì về Quá khứ đơn spoke.' },
      ],
    },
    {
      id: 'grammar-v2-b1-wish-present-11-q12',
      kind: 'correction',
      prompt: 'Sửa lỗi dùng nhầm wish thay cho hope trong lời hy vọng tương lai: "I wish that you will have an enjoyable vacation in Spain."',
      options: [],
      acceptedAnswers: [
        { text: 'I hope that you will have an enjoyable vacation in Spain.', rationale: 'Lời hy vọng về một kỳ nghỉ có thật ở tương lai phải dùng động từ hope thay vì wish.' },
        { text: 'I hope you have an enjoyable vacation in Spain.', rationale: 'Biến thể tự nhiên dùng thì Hiện tại đơn sau hope.' },
      ],
    },
  ],
  reviewExercises: [
    {
      id: 'grammar-v2-b1-wish-present-11-r1',
      kind: 'choice',
      prompt: 'Tình huống: Bạn của bạn sắp tham gia một cuộc phỏng vấn xin việc quan trọng vào ngày mai. Bạn nói gì?',
      options: [
        { text: 'I hope your interview goes smoothly tomorrow!', correct: true, rationale: 'Hy vọng một kết quả tốt đẹp cho sự việc thực tế sắp tới dùng I hope.' },
        { text: 'I wish your interview went smoothly tomorrow!', correct: false, rationale: 'Dùng wish + went ngụ ý người nói tin rằng cuộc phỏng vấn chắc chắn sẽ không suôn sẻ.' },
        { text: 'If only your interview will go smoothly tomorrow!', correct: false, rationale: 'Cấu trúc sai ngữ pháp sau If only.' },
      ],
      acceptedAnswers: [{ text: 'I hope your interview goes smoothly tomorrow!', rationale: 'Dùng hope cho hy vọng thực tế trong tương lai.' }],
    },
    {
      id: 'grammar-v2-b1-wish-present-11-r2',
      kind: 'gap',
      prompt: 'Our team is behind schedule. The director wishes we ___ (have) five more developers.',
      options: [],
      acceptedAnswers: [
        { text: 'had', rationale: 'Sau wishes dùng Quá khứ đơn had cho mong ước trái thực tế hiện tại.' },
      ],
    },
    {
      id: 'grammar-v2-b1-wish-present-11-r3',
      kind: 'transform',
      prompt: 'Bắt đầu bằng "I wish I did not have to..." để viết lại: "Unfortunately, I have to wake up at five o\'clock every weekday morning."',
      options: [],
      acceptedAnswers: [
        { text: 'I wish I did not have to wake up at five o\'clock every weekday morning.', rationale: 'Lùi thì have to thành did not have to sau I wish.' },
        { text: "I wish I didn't have to wake up at five o'clock every weekday morning.", rationale: 'Dạng rút gọn didn\'t have to.' },
      ],
    },
    {
      id: 'grammar-v2-b1-wish-present-11-r4',
      kind: 'correction',
      prompt: 'Sửa lỗi sai trong câu ước về hiện tại: "She wishes she has more brothers and sisters."',
      options: [],
      acceptedAnswers: [
        { text: 'She wishes she had more brothers and sisters.', rationale: 'Sau wishes cần lùi thì thành had.' },
      ],
    },
  ],
  outputPrompts: [
    {
      id: 'grammar-v2-b1-wish-present-11-o1',
      prompt: 'Viết 2–3 câu diễn tả những điều bạn mong muốn thay đổi về môi trường sống, chỗ ở hoặc thói quen hàng ngày của mình ngay lúc này, sử dụng cấu trúc "I wish" và "If only".',
      modelAnswer: 'I wish my apartment were closer to the city center so that I could walk to the library every evening. If only I had more quiet study hours during the day, I would complete my assignments much faster.',
      checks: [
        'Dùng đúng cấu trúc I wish + Past Simple / were.',
        'Sử dụng If only với sắc thái tiếc nuối mạnh mẽ.',
        'Nội dung chân thực, phản ánh mong ước trái thực tế hiện tại.',
      ],
    },
    {
      id: 'grammar-v2-b1-wish-present-11-o2',
      prompt: 'Viết 2–3 câu trong một bức thư gửi cho bạn bè, trong đó phân biệt rõ một câu dùng "I hope" (hy vọng chuyến đi sắp tới thuận lợi) và một câu dùng "I wish" (ước gì mình có thể đi cùng bạn).',
      modelAnswer: 'I hope you have a fantastic and memorable vacation in Italy next week! I wish I were not so swamped with project deadlines so that I could join you on this journey.',
      checks: [
        'Dùng I hope cho lời chúc / hy vọng tương lai có thật.',
        'Dùng I wish + Past Simple / were cho mong ước trái thực tế hiện tại.',
        'Sự đối lập giữa hai cấu trúc rõ ràng và chính xác ngữ pháp.',
      ],
    },
  ],
  sources: [
    {
      id: 'cambridge-wishes-present',
      title: 'Cambridge Grammar: Wish and if only (present desires and regrets)',
      url: 'https://dictionary.cambridge.org/grammar/british-grammar/wish',
      claims: ['Cấu trúc wish và if only diễn đạt mong ước trái ngược thực tế hiện tại và phân biệt với hope'],
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
