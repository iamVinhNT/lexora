/**
 * @file third-conditionals.ts
 * @description Lesson: Câu điều kiện loại 3 (Third Conditionals).
 */
import type { GrammarLesson } from '../../types.js';

const lesson: GrammarLesson = {
  id: 'grammar-v2-b2-third-conditionals-06',
  revisionId: 'grammar-v2-b2-third-conditionals-06@1.0.0',
  revision: '1.0.0',
  title: 'Câu điều kiện loại 3 (Third Conditionals)',
  objective: 'Nắm vững cấu trúc câu điều kiện loại 3 (If + had + V3, S + would/could/might have + V3) để nêu giả định về điều kiện và kết quả quá khứ, thường trái với thực tế đã biết, đồng thời bày tỏ tiếc nuối hoặc suy đoán kết quả thay thế.',
  prerequisiteIds: ['grammar-v2-b2-perfect-aspect-reference-05'],
  coverage: ['third-conditionals', 'unreal-past', 'hypothetical-conditions', 'would-have-done', 'b2-grammar'],
  context: {
    english: 'If the meteorologists had detected the atmospheric pressure drop twelve hours earlier, coastal authorities would have evacuated the island residents safely.',
    vietnamese: 'Nếu các nhà khí tượng học phát hiện ra hiện tượng sụt giảm áp suất khí quyển sớm hơn mười hai tiếng, chính quyền vùng duyên hải đã có thể sơ tán cư dân trên đảo an toàn.',
  },
  guide: {
    pattern: 'If + S + had + V3/ed, S + would / could / might + have + V3/ed | Had + S + (not) + V3/ed, S + would have + V3/ed',
    whenToUse: [
      'Nêu giả định về một điều kiện trong quá khứ và hệ quả quá khứ; thường dùng khi các sự việc trái với thực tế đã biết, nhưng cũng có thể hỏi giả định về tình huống quá khứ chưa rõ.',
      'Bày tỏ sự tiếc nuối (regret) hoặc chỉ trích (criticism) đối với một hành động hoặc quyết định trong quá khứ.',
      'Suy đoán về những kết quả thay thế khả dĩ trong lịch sử hoặc các trường hợp khẩn cấp.',
    ],
    signalWords: ['if', 'had we known', 'would have', 'could have', 'might have', 'otherwise', 'but for'],
    check: [
      'Mệnh đề If có dùng thì Quá khứ hoàn thành (had + V3/ed), tuyệt đối không dùng would have không?',
      'Mệnh đề chính có dùng would/could/might + have + V3/ed không?',
      'Điều kiện và hệ quả cùng quy chiếu về quá khứ; ngữ cảnh có cho biết đây là sự thật trái ngược hay chỉ là giả định chưa xác định?',
    ],
  },
  explanation: 'Câu điều kiện loại 3 dùng để nêu điều kiện và hệ quả giả định trong quá khứ; thường là tình huống trái với thực tế đã biết, nhưng cũng có thể đặt câu hỏi về một giả định chưa rõ.\nCông thức thường gặp:\n- Mệnh đề If: If + S + had + V3/ed.\n- Mệnh đề chính: S + would / could / might + have + V3/ed.\nWould have nêu hệ quả giả định; could have thường nhấn mạnh khả năng hoặc cơ hội; might have thường thể hiện khả năng dè dặt hơn. Không thể coi would have là bảo đảm 100% trong mọi ngữ cảnh.\nTrong văn phong trang trọng, mệnh đề If có thể đảo ngữ: "Had the pilot noticed the warning lights, the crash would have been avoided."',
  examples: [
    {
      english: 'If the surgical team had received the donor organ earlier, they would have performed the transplant immediately.',
      vietnamese: 'Nếu kíp phẫu thuật nhận được tạng hiến tặng sớm hơn, họ đã tiến hành ca ghép tạng ngay lập tức (thực tế nhận muộn nên không mổ ngay được).',
    },
    {
      english: 'We could have averted the system crash if we had updated the server firmware over the weekend.',
      vietnamese: 'Chúng ta đã có thể ngăn chặn sự cố sập hệ thống nếu cập nhật phần mềm điều khiển máy chủ vào cuối tuần.',
    },
    {
      english: 'If she had not studied international law, she might never have joined the United Nations commission.',
      vietnamese: 'Nếu cô ấy không học luật quốc tế, cô ấy có thể đã không bao giờ gia nhập ủy ban Liên Hợp Quốc.',
    },
    {
      english: 'Had the captain followed the harbor radar instructions, the vessel would not have run aground.',
      vietnamese: 'Nếu thuyền trưởng tuân theo chỉ dẫn radar của cảng, con tàu đã không mắc cạn.',
    },
    {
      english: 'If they had consulted an independent financial auditor, they would not have suffered such severe fiscal losses.',
      vietnamese: 'Nếu họ tham vấn một kiểm toán viên tài chính độc lập, họ đã không phải chịu những tổn thất ngân sách nặng nề đến thế.',
    },
    {
      english: 'What would you have done if the university had rejected your research fellowship application?',
      vietnamese: 'Bạn sẽ làm gì nếu trường đại học đã từ chối đơn xin học bổng nghiên cứu của bạn?',
    },
  ],
  contrasts: [
    {
      form: 'Third Conditional vs Second Conditional',
      whyFits: '"If we had booked earlier, we would have secured front-row tickets" bàn về chuyến đi xem ca nhạc đã kết thúc tuần trước (quá khứ không có thật).',
      whyNot: '"If we booked earlier, we would secure front-row tickets" bàn về tình huống giả định ở hiện tại hoặc tương lai, không dùng để nói về sự việc đã khép lại trong quá khứ.',
    },
    {
      form: 'would have vs could have',
      whyFits: '\"He would have passed\" nêu kết quả giả định nếu điều kiện được đáp ứng; mức độ chắc chắn còn phụ thuộc vào ngữ cảnh.',
      whyNot: '"He could have passed" chỉ nói rằng anh ấy có khả năng hoặc cơ hội đỗ, nhưng không bảo đảm chắc chắn tuyệt đối.',
    },
  ],
  commonMistakes: [
    'Dùng would have trong mệnh đề If: viết "If I would have known" thay vì "If I had known".',
    'Nhầm lẫn dạng phân từ hai: viết "would have went" thay vì "would have gone" hoặc "had saw" thay vì "had seen".',
    'Dùng nhầm câu điều kiện loại 2 cho sự việc quá khứ: viết "If he practiced more, he won yesterday" thay vì "If he had practiced more, he would have won".',
  ],
  summary: 'Câu điều kiện loại 3 (If + had + V3, S + would/could/might have + V3) đặt ra giả định trái ngược với quá khứ để bày tỏ sự tiếc nuối, phân tích nguyên nhân hoặc đưa ra giải pháp thay thế.',
  exercises: [
    {
      id: 'grammar-v2-b2-third-conditionals-06-q1',
      kind: 'choice',
      prompt: 'If the laboratory technicians ___ the refrigeration temperature properly, the biological samples would not have degraded.',
      options: [
        { text: 'had monitored', correct: true, rationale: 'Mệnh đề If điều kiện loại 3 đòi hỏi thì Quá khứ hoàn thành (had + V3).' },
        { text: 'monitored', correct: false, rationale: 'Quá khứ đơn là cấu trúc điều kiện loại 2, không phù hợp với kết quả quá khứ would not have degraded.' },
        { text: 'would have monitored', correct: false, rationale: 'Tuyệt đối không dùng would have trong mệnh đề If.' },
      ],
      acceptedAnswers: [{ text: 'had monitored', rationale: 'had monitored tạo nên mệnh đề điều kiện loại 3 chuẩn xác.' }],
    },
    {
      id: 'grammar-v2-b2-third-conditionals-06-q2',
      kind: 'choice',
      prompt: 'Select the sentence that correctly expresses an inverted third conditional in formal register:',
      options: [
        { text: 'Had the committee reviewed the documentation thoroughly, the oversight would have been identified.', correct: true, rationale: 'Đảo ngữ chuẩn của câu điều kiện loại 3: Had + S + V3, S + would have + V3.' },
        { text: 'Did the committee review the documentation thoroughly, the oversight would have been identified.', correct: false, rationale: 'Did + S + V không dùng cho đảo ngữ điều kiện loại 3.' },
        { text: 'Had the committee review the documentation, the oversight would have been identified.', correct: false, rationale: 'Sau Had động từ phải ở dạng quá khứ phân từ V3 (reviewed).' },
      ],
      acceptedAnswers: [{ text: 'Had the committee reviewed the documentation thoroughly, the oversight would have been identified.', rationale: 'Đảo ngữ câu điều kiện loại 3 trang trọng.' }],
    },
    {
      id: 'grammar-v2-b2-third-conditionals-06-q3',
      kind: 'choice',
      prompt: 'The emergency medical responders ___ the hiker\'s life if the dense fog had not grounded the rescue helicopter.',
      options: [
        { text: 'could have saved', correct: true, rationale: 'Mệnh đề chính dùng could have + V3 để diễn tả năng lực cứu sống trong quá khứ.' },
        { text: 'can save', correct: false, rationale: 'Can ở hiện tại không phù hợp với tình huống giả định quá khứ.' },
        { text: 'saved', correct: false, rationale: 'Quá khứ đơn không thể hiện tính chất giả định trái ngược với sự thật.' },
      ],
      acceptedAnswers: [{ text: 'could have saved', rationale: 'could have saved diễn đạt khả năng cứu được người nếu không có sương mù.' }],
    },
    {
      id: 'grammar-v2-b2-third-conditionals-06-q4',
      kind: 'choice',
      prompt: 'Identify the grammatically flawed sentence:',
      options: [
        { text: 'If the driver would have seen the red light, he would have applied the brakes immediately.', correct: true, rationale: 'Sai vì mệnh đề If chứa "would have seen"; đúng ngữ pháp phải là "had seen".' },
        { text: 'If the driver had seen the red light, he would have applied the brakes immediately.', correct: false, rationale: 'Câu này đúng chuẩn ngữ pháp điều kiện loại 3.' },
        { text: 'Had the driver seen the red light, he would have applied the brakes immediately.', correct: false, rationale: 'Câu này đúng thể đảo ngữ của điều kiện loại 3.' },
      ],
      acceptedAnswers: [{ text: 'If the driver would have seen the red light, he would have applied the brakes immediately.', rationale: 'Không dùng would have trong mệnh đề If.' }],
    },
    {
      id: 'grammar-v2-b2-third-conditionals-06-q5',
      kind: 'gap',
      prompt: 'If the fire department ___ (arrive) five minutes earlier, they could have prevented the roof from collapsing.',
      options: [],
      acceptedAnswers: [{ text: 'had arrived', rationale: 'had arrived là dạng quá khứ hoàn thành trong mệnh đề If điều kiện loại 3.' }],
    },
    {
      id: 'grammar-v2-b2-third-conditionals-06-q6',
      kind: 'gap',
      prompt: 'The board members ___ (not approve) the acquisition if they had known about the hidden liabilities.',
      options: [],
      acceptedAnswers: [
        { text: 'would not have approved', rationale: 'would not have approved là dạng phủ định mệnh đề chính điều kiện loại 3.' },
        { text: "wouldn't have approved", rationale: 'Dạng rút gọn của would not have approved.' },
      ],
    },
    {
      id: 'grammar-v2-b2-third-conditionals-06-q7',
      kind: 'gap',
      prompt: 'If she had verified the flight schedules, she ___ (not miss) her connecting flight in Frankfurt.',
      options: [],
      acceptedAnswers: [
        { text: 'would not have missed', rationale: 'would not have missed thể hiện kết quả không bị lỡ chuyến bay nếu kiểm tra trước.' },
        { text: "wouldn't have missed", rationale: 'Dạng rút gọn của would not have missed.' },
      ],
    },
    {
      id: 'grammar-v2-b2-third-conditionals-06-q8',
      kind: 'gap',
      prompt: 'Had you ___ (warn) us about the road construction, we would have taken the northern bypass.',
      options: [],
      acceptedAnswers: [{ text: 'warned', rationale: 'warned là phân từ hai sau trợ động từ Had trong cấu trúc đảo ngữ.' }],
    },
    {
      id: 'grammar-v2-b2-third-conditionals-06-q9',
      kind: 'transform',
      prompt: 'The patient did not follow the prescription, so his symptoms worsened. -> If the patient had followed the prescription, his symptoms ___ .',
      options: [],
      acceptedAnswers: [
        { text: 'would not have worsened', rationale: 'Dùng would not have worsened để diễn tả giả định trái với thực tế quá khứ.' },
        { text: "wouldn't have worsened", rationale: 'Dạng viết tắt của would not have worsened.' },
      ],
    },
    {
      id: 'grammar-v2-b2-third-conditionals-06-q10',
      kind: 'transform',
      prompt: 'Rewrite using conditional inversion without "if": "If the architects had known about the soft soil, they would have redesigned the foundation."',
      options: [],
      acceptedAnswers: [
        { text: 'Had the architects known about the soft soil, they would have redesigned the foundation.', rationale: 'Cấu trúc đảo ngữ: Had + S + V3, S + would have + V3.' },
      ],
    },
    {
      id: 'grammar-v2-b2-third-conditionals-06-q11',
      kind: 'correction',
      prompt: 'Sửa lỗi sai dùng would have trong mệnh đề If: "If the engineer would have detected the crack, the bridge would not have failed."',
      options: [],
      acceptedAnswers: [
        { text: 'If the engineer had detected the crack, the bridge would not have failed.', rationale: 'Thay "would have detected" bằng thì quá khứ hoàn thành "had detected".' },
      ],
    },
    {
      id: 'grammar-v2-b2-third-conditionals-06-q12',
      kind: 'correction',
      prompt: 'Sửa lỗi phân từ hai trong mệnh đề chính: "If they had secured the anchor, the yacht would not have drift away during the storm."',
      options: [],
      acceptedAnswers: [
        { text: 'If they had secured the anchor, the yacht would not have drifted away during the storm.', rationale: 'Sau would not have động từ phải ở dạng phân từ hai (drifted), không dùng nguyên mẫu.' },
      ],
    },
  ],
  reviewExercises: [
    {
      id: 'grammar-v2-b2-third-conditionals-06-r1',
      kind: 'choice',
      prompt: 'If the legal council had warned the executives in advance, they ___ the controversial contract.',
      options: [
        { text: 'might not have signed', correct: true, rationale: 'might not have signed diễn tả khả năng có thể đã không ký hợp đồng.' },
        { text: 'did not sign', correct: false, rationale: 'Quá khứ đơn sai cấu trúc điều kiện loại 3.' },
        { text: 'will not sign', correct: false, rationale: 'Tương lai đơn không dùng cho giả định quá khứ.' },
      ],
      acceptedAnswers: [{ text: 'might not have signed', rationale: 'might not have signed diễn tả phỏng đoán phủ định trong quá khứ.' }],
    },
    {
      id: 'grammar-v2-b2-third-conditionals-06-r2',
      kind: 'gap',
      prompt: 'Had the government ___ (implement) stricter banking regulations, the mortgage crisis might have been alleviated.',
      options: [],
      acceptedAnswers: [{ text: 'implemented', rationale: 'implemented là phân từ hai sau Had trong cấu trúc đảo ngữ.' }],
    },
    {
      id: 'grammar-v2-b2-third-conditionals-06-r3',
      kind: 'transform',
      prompt: 'The expedition ran out of drinking water because they did not pack the purification tablets. -> If the expedition had packed the purification tablets, they ___ out of drinking water.',
      options: [],
      acceptedAnswers: [
        { text: 'would not have run', rationale: 'Dùng would not have run để chỉ kết quả giả định trong quá khứ.' },
        { text: "wouldn't have run", rationale: 'Dạng rút gọn của would not have run.' },
      ],
    },
    {
      id: 'grammar-v2-b2-third-conditionals-06-r4',
      kind: 'correction',
      prompt: 'Sửa lỗi sai thì: "If our team had prepared the proposal earlier, we won the municipal grant last month."',
      options: [],
      acceptedAnswers: [
        { text: 'If our team had prepared the proposal earlier, we would have won the municipal grant last month.', rationale: 'Mệnh đề chính phải dùng would have won thay vì quá khứ đơn won.' },
        { text: 'If our team had prepared the proposal earlier, we could have won the municipal grant last month.', rationale: 'Dùng could have won diễn đạt khả năng đã có thể thắng thầu.' },
      ],
    },
  ],
  outputPrompts: [
    {
      id: 'grammar-v2-b2-third-conditionals-06-o1',
      prompt: 'Viết 1 câu tiếng Anh điều kiện loại 3 (If + had + V3, would have + V3) diễn tả một quyết định học tập hoặc sự nghiệp trong quá khứ mà nếu làm khác đi thì kết quả đã khác.',
      modelAnswer: 'If I had accepted the scholarship to study abroad three years ago, I would have experienced living in an international academic community.',
      checks: [
        'Mệnh đề If sử dụng thì Quá khứ hoàn thành (had + V3/ed)',
        'Mệnh đề chính sử dụng cấu trúc would have + V3/ed',
        'Ý nghĩa phản ánh đúng một giả định trái ngược với quá khứ thực tế',
      ],
    },
    {
      id: 'grammar-v2-b2-third-conditionals-06-o2',
      prompt: 'Viết 1 câu điều kiện loại 3 sử dụng cấu trúc đảo ngữ trang trọng "Had + S + V3, S + would/could have + V3" về một tình huống xử lý khủng hoảng hoặc quản lý dự án.',
      modelAnswer: 'Had the software engineers tested the payment gateway thoroughly, they could have prevented the security breach during the holiday sale.',
      checks: [
        'Sử dụng cấu trúc đảo ngữ bắt đầu bằng Had (không dùng if)',
        'Động từ trong mệnh đề đảo ở dạng quá khứ phân từ V3/ed',
        'Mệnh đề chính dùng would have hoặc could have + V3/ed đúng ngữ pháp',
      ],
    },
  ],
  sources: [
    {
      id: 'cambridge-third-conditional',
      title: 'Cambridge Grammar: Conditionals - third conditional (if had done, would have done)',
      url: 'https://dictionary.cambridge.org/grammar/british-grammar/conditionals-third-conditional',
      claims: ['Third conditional talks about things that did not happen in the past and their imagined consequences.'],
      checkedAt: '2026-10-05',
      provenance: 'reference-only',
    },
    {
      id: 'bc-third-conditional',
      title: 'British Council: Third conditional',
      url: 'https://learnenglish.britishcouncil.org/grammar/b1-b2-grammar/third-conditional',
      claims: ['Covers past hypothetical conditions, regrets, and variations with could have and might have.'],
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
