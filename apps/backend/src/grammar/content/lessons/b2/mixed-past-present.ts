/**
 * @file mixed-past-present.ts
 * @description Lesson: Câu điều kiện hỗn hợp: Quá khứ - Hiện tại (Mixed Conditionals: Past to Present).
 */
import type { GrammarLesson } from '../../types.js';

const lesson: GrammarLesson = {
  id: 'grammar-v2-b2-mixed-past-present-07',
  revisionId: 'grammar-v2-b2-mixed-past-present-07@1.0.0',
  revision: '1.0.0',
  title: 'Câu điều kiện hỗn hợp: Quá khứ - Hiện tại (Mixed Conditionals: Past to Present)',
  objective: 'Nắm vững cấu trúc câu điều kiện hỗn hợp kết hợp điều kiện không có thật trong quá khứ (If + had + V3) với hệ quả kéo dài hoặc diễn ra ở hiện tại (S + would/could/might + V-bare), phân biệt chuẩn xác với câu điều kiện loại 3 thuần túy.',
  prerequisiteIds: ['grammar-v2-b2-third-conditionals-06'],
  coverage: ['mixed-conditionals', 'past-condition-present-result', 'hypothetical-past-to-now', 'b2-grammar'],
  context: {
    english: 'If our founders had not secured international venture capital in 2021, our biotech firm would not be leading global stem-cell research today.',
    vietnamese: 'Nếu những người sáng lập của chúng tôi không gọi vốn đầu tư mạo hiểm quốc tế thành công vào năm 2021, công ty công nghệ sinh học của chúng tôi ngày nay đã không thể dẫn đầu nghiên cứu tế bào gốc toàn cầu.',
  },
  guide: {
    pattern: 'If + S + had (not) + V3/ed, S + would / could / might + V-bare (now / today / currently) | Had + S + (not) + V3/ed, S + would + V-bare',
    whenToUse: [
      'Giả định một hành động hoặc quyết định trong quá khứ đã không xảy ra, dẫn đến một kết quả hoặc trạng thái khác biệt ở thời điểm hiện tại.',
      'Liên kết trực tiếp giữa sai lầm hoặc thành tựu trong quá khứ với vị thế hoặc tình cảnh hiện thời.',
      'Thường đi kèm các từ chỉ thời gian hiện tại ở mệnh đề chính như: now, today, at present, currently.',
    ],
    signalWords: ['if... had', 'would be... now', 'today', 'currently', 'had we not', 'at present'],
    check: [
      'Mệnh đề điều kiện có nằm trong quá khứ không? (dùng had + V3)',
      'Hệ quả ở mệnh đề chính có đang diễn ra hoặc tồn tại ở hiện tại không? (dùng would + V nguyên mẫu, không dùng would have V3)',
      'Có từ nhận biết thời gian hiện tại (now, today, currently) giúp định hướng thì không?',
    ],
  },
  explanation: 'Câu điều kiện hỗn hợp loại Quá khứ - Hiện tại (Past condition -> Present result) là một trong hai dạng hỗn hợp phổ biến nhất ở trình độ B2.\n- Mệnh đề If (giả định quá khứ): dùng Past Perfect (had + V3/ed) tương tự câu điều kiện loại 3.\n- Mệnh đề chính (hệ quả hiện tại): dùng Would / Could / Might + V nguyên mẫu (bare infinitive) tương tự câu điều kiện loại 2.\nSự khác biệt mang tính quyết định:\n- Câu điều kiện loại 3 thuần túy: Hệ quả cũng xảy ra và kết thúc trong quá khứ (If I had studied, I would have passed the exam last year).\n- Câu điều kiện hỗn hợp Quá khứ - Hiện tại: Hành động ở quá khứ nhưng hệ quả đang tác động trực tiếp lên trạng thái hiện tại (If I had passed the exam last year, I would be a certified physician today).',
  examples: [
    {
      english: 'If the diplomat had accepted the posting to Geneva last year, she would be living near the Alps now.',
      vietnamese: 'Nếu nhà ngoại giao nhận nhiệm vụ ở Geneva năm ngoái, bây giờ cô ấy đã đang sống gần dãy Alps.',
    },
    {
      english: 'If I had not broken my wrist in the semifinals, I would be playing in the championship match today.',
      vietnamese: 'Nếu tôi không bị gãy cổ tay ở vòng bán kết, ngày hôm nay tôi đã đang thi đấu trong trận chung kết.',
    },
    {
      english: 'Had the government invested heavily in renewable energy a decade ago, our nation would not be facing acute power shortages now.',
      vietnamese: 'Nếu chính phủ đầu tư mạnh mẽ vào năng lượng tái tạo từ một thập kỷ trước, quốc gia chúng ta hiện nay đã không phải đối mặt với tình trạng thiếu điện trầm trọng.',
    },
    {
      english: 'If they had followed the navigation instructions carefully, they would not be lost in the wilderness right now.',
      vietnamese: 'Nếu họ cẩn thận đi theo chỉ dẫn định vị, giờ này họ đã không bị lạc trong vùng hoang dã.',
    },
    {
      english: 'If she had acquired fluent Mandarin during her university years, she could work as our regional director in Shanghai today.',
      vietnamese: 'Nếu cô ấy thành thạo tiếng Quan Thoại trong những năm đại học, ngày hôm nay cô ấy đã có thể làm giám đốc khu vực của chúng tôi tại Thượng Hải.',
    },
    {
      english: 'If we had signed the lease agreement last month, we would be renovating the new restaurant today.',
      vietnamese: 'Nếu chúng tôi ký hợp đồng thuê vào tháng trước, hôm nay chúng tôi đã đang cải tạo nhà hàng mới rồi.',
    },
  ],
  contrasts: [
    {
      form: 'would be living now vs would have lived',
      whyFits: '"If I had accepted the offer, I would be living in London now" chỉ trạng thái sinh sống đang diễn ra tại thời điểm hiện tại.',
      whyNot: '"If I had accepted the offer, I would have lived in London in 2020" chỉ sự việc đã xảy ra và khép lại hoàn toàn trong quá khứ.',
    },
    {
      form: 'Mixed (Past-Present) vs Second Conditional',
      whyFits: '"If he had taken the medicine an hour ago, he would feel better now" gắn mốc hành động uống thuốc trong quá khứ (an hour ago) với cảm giác hiện tại.',
      whyNot: '"If he took medicine, he would feel better" giả định chung chung về thói quen hoặc tình trạng hiện tại, không nêu bật được hành động cụ thể đã bị bỏ lỡ một tiếng trước.',
    },
  ],
  commonMistakes: [
    'Dùng would have + V3 ở mệnh đề chính khi có từ chỉ thời gian hiện tại (now/today): viết "If I had moved, I would have been happy now" thay vì "would be happy now".',
    'Dùng quá khứ đơn ở mệnh đề If: viết "If he took the train yesterday, he would be here today" thay vì "had taken".',
    'Quên trợ động từ had trong cấu trúc đảo ngữ: viết "Did we invest, we would be rich" thay vì "Had we invested, we would be rich".',
  ],
  summary: 'Câu điều kiện hỗn hợp Quá khứ - Hiện tại (If + had + V3, S + would + V-bare) kết nối giả định về một hành động quá khứ với hệ quả trực tiếp đang diễn ra ở hiện tại.',
  exercises: [
    {
      id: 'grammar-v2-b2-mixed-past-present-07-q1',
      kind: 'choice',
      prompt: 'If the software team had patched the security loophole over the weekend, our online banking portal ___ fully operational today.',
      options: [
        { text: 'would be', correct: true, rationale: 'Mệnh đề If ở quá khứ (had patched) và mệnh đề chính có trạng từ thời gian hiện tại "today" nên dùng would be.' },
        { text: 'would have been', correct: false, rationale: 'This can express a past result; the prompt asks for the state at the present reference point marked by today.' },
        { text: 'will be', correct: false, rationale: 'Tương lai đơn không phù hợp với giả định trái thực tế bắt đầu bằng If had.' },
      ],
      acceptedAnswers: [{ text: 'would be', rationale: 'would be diễn tả hệ quả hiện tại từ giả định quá khứ.' }],
    },
    {
      id: 'grammar-v2-b2-mixed-past-present-07-q2',
      kind: 'choice',
      prompt: 'Which sentence correctly represents a mixed past-to-present conditional?',
      options: [
        { text: 'If she had completed her residency in 2022, she would be practicing medicine as a licensed surgeon now.', correct: true, rationale: 'Mệnh đề If dùng had completed (quá khứ 2022) và mệnh đề chính dùng would be practicing... now (hiện tại).' },
        { text: 'If she completed her residency in 2022, she would practice medicine now.', correct: false, rationale: 'Mệnh đề If sai thì khi dùng completed cho mốc thời gian quá khứ giả định.' },
        { text: 'If she had completed her residency in 2022, she would have practiced medicine now.', correct: false, rationale: 'Sai vì would have practiced mâu thuẫn với trạng từ now.' },
      ],
      acceptedAnswers: [{ text: 'If she had completed her residency in 2022, she would be practicing medicine as a licensed surgeon now.', rationale: 'Cấu trúc hỗn hợp Quá khứ - Hiện tại hoàn chỉnh và logic.' }],
    },
    {
      id: 'grammar-v2-b2-mixed-past-present-07-q3',
      kind: 'choice',
      prompt: 'Had the conservationists not secured legal protection for the forest in 2015, the endangered gibbons ___ extinct today.',
      options: [
        { text: 'would be', correct: true, rationale: 'Cấu trúc đảo ngữ quá khứ (Had... not secured) kết hợp với hệ quả hiện tại (extinct today) dùng would be.' },
        { text: 'would have been', correct: false, rationale: 'would have been chỉ hệ quả trong quá khứ, không ăn khớp với today.' },
        { text: 'are', correct: false, rationale: 'Hiện tại đơn thực tế không phản ánh câu điều kiện giả định.' },
      ],
      acceptedAnswers: [{ text: 'would be', rationale: 'would be thể hiện trạng thái giả định ở hiện tại.' }],
    },
    {
      id: 'grammar-v2-b2-mixed-past-present-07-q4',
      kind: 'choice',
      prompt: 'If you had taken the doctor\'s advice yesterday, you ___ in such agonizing pain right now.',
      options: [
        { text: 'would not be', correct: true, rationale: 'Hệ quả ở hiện tại (right now) từ lời khuyên bị bỏ qua hôm qua đòi hỏi would not be.' },
        { text: 'would not have been', correct: false, rationale: 'Mâu thuẫn với trạng ngữ chỉ thời gian right now.' },
        { text: 'are not', correct: false, rationale: 'Hiện tại đơn không thể hiện tính giả định trái thực tế.' },
      ],
      acceptedAnswers: [{ text: 'would not be', rationale: 'would not be thể hiện hệ quả phủ định ở hiện tại.' }],
    },
    {
      id: 'grammar-v2-b2-mixed-past-present-07-q5',
      kind: 'gap',
      prompt: 'If Marcus had accepted the promotion to Singapore last year, he ___ (live) in Southeast Asia today.',
      options: [],
      acceptedAnswers: [{ text: 'would be living', rationale: 'would be living thể hiện hành động đang sinh sống ở hiện tại.' }, { text: 'would live', rationale: 'would live diễn tả trạng thái sinh sống ở hiện tại.' }],
    },
    {
      id: 'grammar-v2-b2-mixed-past-present-07-q6',
      kind: 'gap',
      prompt: 'If the university ___ (not revoke) his fellowship grant last term, he would be conducting laboratory research today.',
      options: [],
      acceptedAnswers: [
        { text: 'had not revoked', rationale: 'had not revoked là mệnh đề If ở thì quá khứ hoàn thành.' },
        { text: "hadn't revoked", rationale: 'Dạng rút gọn của had not revoked.' },
      ],
    },
    {
      id: 'grammar-v2-b2-mixed-past-present-07-q7',
      kind: 'gap',
      prompt: 'If we had booked our international flights two weeks ago, we ___ (not pay) exorbitant last-minute fares right now.',
      options: [],
      acceptedAnswers: [
        { text: 'would not be paying', rationale: 'would not be paying nhấn mạnh việc không phải trả mức vé đắt đỏ ngay lúc này.' },
        { text: "wouldn't be paying", rationale: 'Dạng rút gọn của would not be paying.' },
      ],
    },
    {
      id: 'grammar-v2-b2-mixed-past-present-07-q8',
      kind: 'gap',
      prompt: 'Had you ___ (listen) to the navigation warnings during yesterday\'s storm, we would not be stranded on this mountain trail now.',
      options: [],
      acceptedAnswers: [{ text: 'listened', rationale: 'listened là quá khứ phân từ trong mệnh đề đảo ngữ Had you listened.' }],
    },
    {
      id: 'grammar-v2-b2-mixed-past-present-07-q9',
      kind: 'transform',
      prompt: 'I did not win the national scholarship last month, so I am not attending Oxford University this term. -> If I had won the national scholarship last month, I ___ Oxford University this term.',
      options: [],
      acceptedAnswers: [
        { text: 'would be attending', rationale: 'Dùng would be attending để diễn tả việc theo học ở hiện tại từ sự kiện quá khứ.' },
        { text: 'would attend', rationale: 'Dùng would attend diễn tả việc học ở hiện tại.' },
      ],
    },
    {
      id: 'grammar-v2-b2-mixed-past-present-07-q10',
      kind: 'transform',
      prompt: 'The hospital did not install auxiliary power generators during last year\'s renovation. As a result, the facility is currently vulnerable to blackouts. -> Had the hospital installed auxiliary generators last year, the facility ___ vulnerable to blackouts currently.',
      options: [],
      acceptedAnswers: [
        { text: 'would not be', rationale: 'Dùng would not be để chỉ trạng thái hiện tại trong câu đảo ngữ hỗn hợp.' },
        { text: "wouldn't be", rationale: 'Dạng rút gọn của would not be.' },
      ],
    },
    {
      id: 'grammar-v2-b2-mixed-past-present-07-q11',
      kind: 'correction',
      prompt: 'Sửa lỗi sai thì ở mệnh đề chính khi có trạng từ hiện tại: "If the author had won the prestigious award last year, he would have been a household name today."',
      options: [],
      acceptedAnswers: [
        { text: 'If the author had won the prestigious award last year, he would be a household name today.', rationale: 'Thay "would have been" bằng "would be" vì trạng từ "today" chỉ trạng thái ở hiện tại.' },
      ],
    },
    {
      id: 'grammar-v2-b2-mixed-past-present-07-q12',
      kind: 'correction',
      prompt: 'Sửa lỗi thì ở mệnh đề điều kiện: "If the municipality didn\'t underfund the flood barrier project in 2018, the city would not be submerged right now."',
      options: [],
      acceptedAnswers: [
        { text: 'If the municipality had not underfunded the flood barrier project in 2018, the city would not be submerged right now.', rationale: 'Hành động thiếu kinh phí xảy ra năm 2018 phải dùng Quá khứ hoàn thành (had not underfunded).' },
        { text: "If the municipality hadn't underfunded the flood barrier project in 2018, the city would not be submerged right now.", rationale: 'Dạng viết tắt chuẩn của had not underfunded.' },
      ],
    },
  ],
  reviewExercises: [
    {
      id: 'grammar-v2-b2-mixed-past-present-07-r1',
      kind: 'choice',
      prompt: 'If she had memorized the speech notes last night, she ___ so flustered at the podium right now.',
      options: [
        { text: 'would not feel', correct: true, rationale: 'Trạng từ "right now" đòi hỏi mệnh đề chính ở dạng would not feel.' },
        { text: 'would not have felt', correct: false, rationale: 'would not have felt mâu thuẫn với trạng từ chỉ hiện tại right now.' },
        { text: 'does not feel', correct: false, rationale: 'Hiện tại đơn không dùng cho mệnh đề kết quả giả định.' },
      ],
      acceptedAnswers: [{ text: 'would not feel', rationale: 'would not feel diễn tả cảm giác giả định ở hiện tại.' }],
    },
    {
      id: 'grammar-v2-b2-mixed-past-present-07-r2',
      kind: 'gap',
      prompt: 'If the airline ___ (not cancel) our morning flight, we would be enjoying lunch in Rome right now.',
      options: [],
      acceptedAnswers: [
        { text: 'had not cancelled', rationale: 'Chính tả Anh-Anh chuẩn của cancel ở dạng quá khứ phân từ.' },
        { text: 'had not canceled', rationale: 'Chính tả Anh-Mỹ chuẩn của cancel ở dạng quá khứ phân từ.' },
        { text: "hadn't cancelled", rationale: 'Dạng rút gọn Anh-Anh của had not cancelled.' },
        { text: "hadn't canceled", rationale: 'Dạng rút gọn Anh-Mỹ của had not canceled.' },
      ],
    },
    {
      id: 'grammar-v2-b2-mixed-past-present-07-r3',
      kind: 'transform',
      prompt: 'I did not invest in that renewable energy company early on. Consequently, I am not a wealthy shareholder today. -> If I had invested in that renewable energy company early on, I ___ a wealthy shareholder today.',
      options: [],
      acceptedAnswers: [
        { text: 'would be', rationale: 'Dùng would be để diễn tả kết quả giàu có ở thời điểm hiện tại.' },
      ],
    },
    {
      id: 'grammar-v2-b2-mixed-past-present-07-r4',
      kind: 'correction',
      prompt: 'Sửa lỗi cấu trúc: "If the chef had trained in Paris during his youth, he would has owned three Michelin-starred restaurants now."',
      options: [],
      acceptedAnswers: [
        { text: 'If the chef had trained in Paris during his youth, he would own three Michelin-starred restaurants now.', rationale: 'Sau would phải là động từ nguyên mẫu (own), không dùng "has owned".' },
      ],
    },
  ],
  outputPrompts: [
    {
      id: 'grammar-v2-b2-mixed-past-present-07-o1',
      prompt: 'Viết 1 câu điều kiện hỗn hợp Quá khứ - Hiện tại (If + had + V3, S + would + V-bare... today/now) miêu tả một quyết định học vấn hoặc kỹ năng trong quá khứ đã làm thay đổi vị trí công việc hiện tại của bạn.',
      modelAnswer: 'If I had learned data science during my undergraduate studies, I would be leading the analytics department today.',
      checks: [
        'Mệnh đề điều kiện dùng thì Quá khứ hoàn thành (had + V3)',
        'Mệnh đề chính dùng would + V-bare kết hợp từ chỉ hiện tại (today, now)',
        'Câu diễn đạt mạch lạc, phản ánh logic quan hệ nhân quả quá khứ - hiện tại',
      ],
    },
    {
      id: 'grammar-v2-b2-mixed-past-present-07-o2',
      prompt: 'Viết 1 câu điều kiện hỗn hợp sử dụng cấu trúc đảo ngữ "Had + S + V3, S + would/could + V-bare... now" diễn tả một giải pháp phòng ngừa trong quá khứ giúp tránh rắc rối hiện tại.',
      modelAnswer: 'Had we backed up the central database yesterday, we would not be re-entering customer transactions right now.',
      checks: [
        'Bắt đầu bằng Had + S + V3 (đảo ngữ không có if)',
        'Mệnh đề kết quả dùng would not be / could be + V-bare (kèm từ chỉ hiện tại now, right now)',
        'Thể hiện rõ hậu quả hiện tại phát sinh từ sự việc trong quá khứ',
      ],
    },
  ],
  sources: [
    {
      id: 'cambridge-mixed-conditionals',
      title: 'Cambridge Grammar: Conditionals - mixed conditionals',
      url: 'https://dictionary.cambridge.org/grammar/british-grammar/conditionals-mixed-conditionals',
      claims: ['Mixed conditionals combine a past hypothetical condition with a present result using had done and would do.'],
      checkedAt: '2026-10-05',
      provenance: 'reference-only',
    },
    {
      id: 'bc-mixed-conditionals',
      title: 'British Council: Mixed conditionals',
      url: 'https://learnenglish.britishcouncil.org/grammar/b2-c1-grammar/mixed-conditionals',
      claims: ['Examines past unreal causes producing present states or consequences.'],
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
