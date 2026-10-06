/**
 * @file causative-have-get.ts
 * @description Bài học B1 về thể truyền khiến với have và get (Causative Have and Get).
 */
import type { GrammarLesson } from '../../types.js';

const lesson: GrammarLesson = {
  id: 'grammar-v2-b1-causative-have-get-15',
  revisionId: 'grammar-v2-b1-causative-have-get-15@1.0.0',
  revision: '1.0.0',
  title: 'Thể truyền khiến với Have và Get (Causative Have and Get)',
  objective: 'Sử dụng cấu trúc truyền khiến bị động (have/get something done) để nói về việc thuê dịch vụ hoặc trải qua sự cố, và cấu trúc chủ động (have someone do / get someone to do) để phân công hoặc nhờ vả người khác.',
  prerequisiteIds: ['grammar-v2-b1-passive-perfect-14'],
  coverage: ['causative-have-get', 'causative-forms', 'have-something-done', 'get-someone-to-do', 'b1-grammar'],
  context: {
    english: 'Before selling their family townhouse, the owners had the roof repaired by a licensed roofing contractor. They also got a professional photographer to take bright promotional pictures of the interior.',
    vietnamese: 'Trước khi bán căn nhà phố của gia đình, những người chủ đã thuê một nhà thầu lợp mái có chứng chỉ sửa lại mái nhà. Họ cũng nhờ một nhiếp ảnh gia chuyên nghiệp chụp những bức ảnh quảng bá sáng sủa về nội thất.',
  },
  guide: {
    pattern: 'Truyền khiến bị động: S + have / get + tân ngữ (vật) + V3/ed; Truyền khiến chủ động: S + have + người + V-nguyên thể / S + get + người + to V',
    whenToUse: [
      'Nói về việc sắp xếp, thuê mướn thợ hoặc dịch vụ chuyên nghiệp làm điều gì đó cho mình thay vì tự làm.',
      'Diễn tả việc bản thân trải qua một tai nạn, mất mát hoặc sự cố ngoài ý muốn (ví dụ: He had his wallet stolen).',
      'Diễn tả việc phân công trách nhiệm cho ai (have someone do) hoặc thuyết phục, nhờ vả ai làm gì (get someone to do).',
    ],
    signalWords: ['have my hair cut', 'get the car fixed', 'have someone check', 'get someone to help', 'serviced', 'repaired'],
    check: [
      'Cấu trúc bị động: "have/get something done" (luôn dùng quá khứ phân từ V3/ed cho vật).',
      'Cấu trúc chủ động với have: "have someone DO something" (động từ nguyên thể không "to").',
      'Cấu trúc chủ động với get: "get someone TO DO something" (bắt buộc phải có "to").',
    ],
  },
  explanation: 'Thể truyền khiến (Causative) diễn tả tình huống một người không tự tay làm một việc mà thu xếp, nhờ vả, thuê mướn hoặc yêu cầu người khác làm việc đó cho mình. Trong tiếng Anh B1, có hai dạng cấu trúc then chốt:\n\n1. Thể truyền khiến bị động (Passive Causative):\nCông thức: Chủ ngữ + have / get + Vật + V3/ed.\n- Dùng rất phổ biến khi đi làm các dịch vụ đời sống: "I have my hair cut once a month" (Tôi đi cắt tóc mỗi tháng một lần – thợ cắt chứ tôi không tự cắt). Nếu nói "I cut my hair", người nghe sẽ hiểu bạn tự cầm kéo cắt tóc ở nhà.\n- Dùng khi gặp sự cố ngoài ý muốn: "Karen had her car broken into yesterday" (Karen bị kẻ gian cạy phá xe hôm qua).\n\n2. Thể truyền khiến chủ động (Active Causative):\nKhi muốn nêu đích danh người thực hiện hành động:\n- Have + Người + V-nguyên thể (bare infinitive): mang sắc thái giao việc, phân công trách nhiệm công việc hoặc ủy quyền. Ví dụ: "The manager had her assistant book the flight tickets."\n- Get + Người + to V (to-infinitive): mang sắc thái thuyết phục, nài nỉ, động viên hoặc nhờ vả ai làm một việc khó. Ví dụ: "I finally got my brother to lend me his camera."',
  examples: [
    {
      english: 'We have our air conditioning units serviced every spring.',
      vietnamese: 'Chúng tôi thuê thợ bảo dưỡng các máy điều hòa vào mỗi mùa xuân (dịch vụ định kỳ).',
    },
    {
      english: 'Hannah got her dental braces removed yesterday morning.',
      vietnamese: 'Hannah đã được tháo niềng răng vào sáng hôm qua (bác sĩ nha khoa tháo cho cô).',
    },
    {
      english: 'I will have the mechanic inspect the brake pads tomorrow.',
      vietnamese: 'Tôi sẽ nhờ thợ máy kiểm tra má phanh vào ngày mai (have someone do).',
    },
    {
      english: 'She managed to get the technician to reinstall her operating system.',
      vietnamese: 'Cô ấy đã nhờ được kỹ thuật viên cài đặt lại hệ điều hành cho mình (get someone to do).',
    },
    {
      english: 'Unfortunately, Marcus had his smartphone stolen on the crowded subway.',
      vietnamese: 'Thật không may, Marcus đã bị móc mất điện thoại trên chuyến tàu điện ngầm đông đúc (sự cố bất khả kháng).',
    },
    {
      english: 'How often do you have your eyes tested by an optometrist?',
      vietnamese: 'Bao lâu thì bạn đi khám mắt bởi chuyên gia khúc xạ một lần?',
    },
  ],
  contrasts: [
    {
      form: 'have my hair cut vs cut my hair',
      whyFits: 'I had my hair cut at the salon (thợ làm tóc chuyên nghiệp cắt cho tôi).',
      whyNot: 'I cut my hair yesterday (nghĩa là tôi tự cầm kéo cắt lấy tóc mình ở nhà).',
    },
    {
      form: 'have someone do vs get someone to do',
      whyFits: 'I had the clerk print the boarding passes (giao việc theo chức trách hành chính).',
      whyNot: 'I got the clerk print (sai ngữ pháp vì sau get cần "to print").',
    },
  ],
  commonMistakes: [
    'Dùng "to V" sau have chủ động: nói "I had the electrician to fix the lamp" (sai, phải là "had the electrician fix").',
    'Bỏ quên "to" sau get chủ động: nói "I got him help me" (sai, phải là "got him to help me").',
    'Nói "I repaired my car" khi thực chất mang xe ra gara cho thợ sửa (chuẩn mực là "I had my car repaired").',
  ],
  summary: 'Causative: have/get something done (nhờ làm dịch vụ / gặp sự cố); have someone do (giao việc nguyên thể không to); get someone to do (thuyết phục có to).',
  exercises: [
    {
      id: 'grammar-v2-b1-causative-have-get-15-q1',
      kind: 'choice',
      prompt: 'Chọn dạng động từ thích hợp sau cấu trúc truyền khiến bị động: "We need to have our house roof ___ before the rainy season begins."',
      options: [
        { text: 'repaired', correct: true, rationale: 'Have + something + V3/ed (repaired) là cấu trúc truyền khiến bị động.' },
        { text: 'repair', correct: false, rationale: 'Động từ nguyên thể không dùng cho tân ngữ chỉ vật trong thể bị động truyền khiến.' },
        { text: 'to repair', correct: false, rationale: 'To repair sai cấu trúc sau have something.' },
      ],
      acceptedAnswers: [{ text: 'repaired', rationale: 'Have something repaired là thể truyền khiến bị động.' }],
    },
    {
      id: 'grammar-v2-b1-causative-have-get-15-q2',
      kind: 'choice',
      prompt: 'Chọn dạng động từ sau cấu trúc chủ động với "have": "The director had her personal assistant ___ the conference room."',
      options: [
        { text: 'book', correct: true, rationale: 'Have + someone + V-nguyên thể không to (book) khi giao việc cho nhân viên.' },
        { text: 'to book', correct: false, rationale: 'Không dùng to-infinitive sau have someone.' },
        { text: 'booked', correct: false, rationale: 'Booked là phân từ hai, không dùng sau tân ngữ chỉ người ở thể chủ động này.' },
      ],
      acceptedAnswers: [{ text: 'book', rationale: 'Have someone do (book) something.' }],
    },
    {
      id: 'grammar-v2-b1-causative-have-get-15-q3',
      kind: 'choice',
      prompt: 'Chọn dạng động từ sau cấu trúc chủ động với "get": "I finally got my neighbor ___ down the overgrown branches overhanging our fence."',
      options: [
        { text: 'to cut', correct: true, rationale: 'Get + someone + to V (to cut) khi thuyết phục hoặc nhờ ai làm việc gì.' },
        { text: 'cut', correct: false, rationale: 'Thiếu to sau get someone.' },
        { text: 'cutting', correct: false, rationale: 'Dạng V-ing không dùng trong cấu trúc nhờ vả get someone to do.' },
      ],
      acceptedAnswers: [{ text: 'to cut', rationale: 'Get someone to do (to cut) something.' }],
    },
    {
      id: 'grammar-v2-b1-causative-have-get-15-q4',
      kind: 'choice',
      prompt: 'Diễn đạt tình huống thuê thợ chụp ảnh kỷ yếu thay vì tự chụp:',
      options: [
        { text: 'We had our graduation portraits taken by a studio photographer.', correct: true, rationale: 'Had our portraits taken diễn đạt chính xác việc thuê thợ chụp ảnh chuyên nghiệp.' },
        { text: 'We took our graduation portraits by a studio photographer.', correct: false, rationale: 'Took ở thể chủ động mâu thuẫn với by a studio photographer.' },
        { text: 'We had taken our graduation portraits by a photographer.', correct: false, rationale: 'Had taken là quá khứ hoàn thành chủ động, sai cấu trúc truyền khiến.' },
      ],
      acceptedAnswers: [{ text: 'We had our graduation portraits taken by a studio photographer.', rationale: 'Had something taken diễn đạt thuê dịch vụ.' }],
    },
    {
      id: 'grammar-v2-b1-causative-have-get-15-q5',
      kind: 'gap',
      prompt: 'Sarah went to the optician yesterday to get her eyesight ___ (check).',
      options: [],
      acceptedAnswers: [
        { text: 'checked', rationale: 'Get + eyesight (vật) + V3/ed checked.' },
      ],
    },
    {
      id: 'grammar-v2-b1-causative-have-get-15-q6',
      kind: 'gap',
      prompt: 'The manager had the security guard ___ (inspect) all employee badges at the entrance.',
      options: [],
      acceptedAnswers: [
        { text: 'inspect', rationale: 'Have + person + bare infinitive inspect.' },
      ],
    },
    {
      id: 'grammar-v2-b1-causative-have-get-15-q7',
      kind: 'gap',
      prompt: 'Can you get the technician ___ (reinstall) the anti-virus software on our laptops?',
      options: [],
      acceptedAnswers: [
        { text: 'to reinstall', rationale: 'Get + person + to-infinitive to reinstall.' },
      ],
    },
    {
      id: 'grammar-v2-b1-causative-have-get-15-q8',
      kind: 'gap',
      prompt: 'While traveling in Barcelona, Oliver had his passport ___ (steal) from his backpack.',
      options: [],
      acceptedAnswers: [
        { text: 'stolen', rationale: 'Had + passport + stolen (sự cố mất mát ngoài ý muốn).' },
      ],
    },
    {
      id: 'grammar-v2-b1-causative-have-get-15-q9',
      kind: 'transform',
      prompt: 'Bắt đầu bằng "We had our car serviced by..." để viết lại: "A licensed mechanic serviced our car last Saturday."',
      options: [],
      acceptedAnswers: [
        { text: 'We had our car serviced by a licensed mechanic last Saturday.', rationale: 'Chuyển sang cấu trúc truyền khiến bị động had our car serviced.' },
      ],
    },
    {
      id: 'grammar-v2-b1-causative-have-get-15-q10',
      kind: 'transform',
      prompt: 'Bắt đầu bằng "She got her brother to help..." để viết lại: "She persuaded her brother to help her move the heavy wardrobe."',
      options: [],
      acceptedAnswers: [
        { text: 'She got her brother to help her move the heavy wardrobe.', rationale: 'Dùng get someone to do để diễn đạt sự thuyết phục nhờ vả.' },
      ],
    },
    {
      id: 'grammar-v2-b1-causative-have-get-15-q11',
      kind: 'correction',
      prompt: 'Sửa lỗi thừa "to" sau động từ have chủ động: "The professor had the students to write a two-page summary."',
      options: [],
      acceptedAnswers: [
        { text: 'The professor had the students write a two-page summary.', rationale: 'Bỏ to sau have someone, dùng động từ nguyên thể write.' },
      ],
    },
    {
      id: 'grammar-v2-b1-causative-have-get-15-q12',
      kind: 'correction',
      prompt: 'Sửa lỗi thiếu "to" sau động từ get chủ động: "I will get my friend lend me his bicycle for the weekend."',
      options: [],
      acceptedAnswers: [
        { text: 'I will get my friend to lend me his bicycle for the weekend.', rationale: 'Thêm to vào trước lend trong cấu trúc get someone to do something.' },
      ],
    },
  ],
  reviewExercises: [
    {
      id: 'grammar-v2-b1-causative-have-get-15-r1',
      kind: 'choice',
      prompt: 'Chọn câu diễn đạt chính xác việc gửi áo khoác đi giặt khô tại tiệm:',
      options: [
        { text: 'I am going to have my winter coat dry-cleaned this afternoon.', correct: true, rationale: 'Have my coat dry-cleaned là cấu trúc chuẩn chỉ việc gửi đồ cho tiệm giặt hấp.' },
        { text: 'I am going to dry-clean my winter coat by a shop this afternoon.', correct: false, rationale: 'Sai cấu trúc và diễn đạt vụng về.' },
        { text: 'I am going to have my winter coat to dry-clean this afternoon.', correct: false, rationale: 'Sai dạng to V sau have something.' },
      ],
      acceptedAnswers: [{ text: 'I am going to have my winter coat dry-cleaned this afternoon.', rationale: 'Have something dry-cleaned là cấu trúc truyền khiến chuẩn mực.' }],
    },
    {
      id: 'grammar-v2-b1-causative-have-get-15-r2',
      kind: 'gap',
      prompt: 'The homeowner got a local electrician ___ (wire) the new ceiling fans.',
      options: [],
      acceptedAnswers: [
        { text: 'to wire', rationale: 'Get + person + to-infinitive to wire.' },
      ],
    },
    {
      id: 'grammar-v2-b1-causative-have-get-15-r3',
      kind: 'transform',
      prompt: 'Bắt đầu bằng "We had the documents translated by..." để viết lại: "A certified agency translated the legal documents for our company."',
      options: [],
      acceptedAnswers: [
        { text: 'We had the documents translated by a certified agency for our company.', rationale: 'Chuyển sang cấu trúc truyền khiến had the documents translated.' },
        { text: 'We had the legal documents translated by a certified agency for our company.', rationale: 'Biến thể giữ nguyên cụm the legal documents.' },
      ],
    },
    {
      id: 'grammar-v2-b1-causative-have-get-15-r4',
      kind: 'correction',
      prompt: 'Sửa lỗi sai trong câu: "Yesterday I cut my hair at the barbershop in the mall."',
      options: [],
      acceptedAnswers: [
        { text: 'Yesterday I had my hair cut at the barbershop in the mall.', rationale: 'Đi tiệm cắt tóc phải dùng had my hair cut.' },
        { text: 'Yesterday I got my hair cut at the barbershop in the mall.', rationale: 'Dùng got my hair cut.' },
      ],
    },
  ],
  outputPrompts: [
    {
      id: 'grammar-v2-b1-causative-have-get-15-o1',
      prompt: 'Viết 2–3 câu kể về những dịch vụ bạn thường thuê hoặc sắp xếp người khác làm cho bạn (ví dụ: cắt tóc, bảo dưỡng xe, dọn dẹp nhà, sửa máy tính), sử dụng cấu trúc "have/get something done".',
      modelAnswer: 'Every six months, I have my teeth checked at a private clinic near my home. Last week, I also got my laptop battery replaced by an authorized technician because it stopped holding a charge.',
      checks: [
        'Dùng have/get + tân ngữ + V3/ed tự nhiên (have my teeth checked, got my battery replaced).',
        'Nêu tình huống dịch vụ thực tế và hợp lý.',
        'Ngữ pháp và liên kết câu chuẩn xác trình độ B1.',
      ],
    },
    {
      id: 'grammar-v2-b1-causative-have-get-15-o2',
      prompt: 'Viết 2–3 câu miêu tả một tình huống làm việc nhóm hoặc trong gia đình, trong đó bạn phân công một người làm một việc (have someone do) và nhờ vả/thuyết phục một người khác làm việc khác (get someone to do).',
      modelAnswer: 'For our school charity fair, I had my teammate design the promotional posters on his computer. Then, I got my younger brother to hand out fifty colorful flyers at the entrance of the supermarket.',
      checks: [
        'Dùng đúng cấu trúc have + someone + V-nguyên thể không to (had my teammate design).',
        'Dùng đúng cấu trúc get + someone + to V (got my brother to hand out).',
        'Ý nghĩa câu văn rõ ràng, thể hiện sự phân biệt tinh tế giữa hai cấu trúc.',
      ],
    },
  ],
  sources: [
    {
      id: 'cambridge-causatives-have-get',
      title: 'Cambridge Grammar: Causative structures with have and get',
      url: 'https://dictionary.cambridge.org/grammar/british-grammar/causative',
      claims: ['Thể truyền khiến bị động have/get something done và chủ động have someone do / get someone to do'],
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
