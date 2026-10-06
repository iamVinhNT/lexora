/**
 * @file wish-past-regret.ts
 * @description Lesson: Cấu trúc Wish diễn tả nuối tiếc quá khứ (Wish + Past Perfect).
 */
import type { GrammarLesson } from '../../types.js';

const lesson: GrammarLesson = {
  id: 'grammar-v2-b2-wish-past-regret-09',
  revisionId: 'grammar-v2-b2-wish-past-regret-09@1.0.0',
  revision: '1.0.0',
  title: 'Cấu trúc Wish diễn tả nuối tiếc quá khứ (Wish + Past Perfect)',
  objective: 'Nắm vững cấu trúc S + wish + (that) + had (not) + V3/ed để bày tỏ sự nuối tiếc sâu sắc về những hành động, sai lầm hoặc cơ hội đã qua trong quá khứ, phân biệt rõ với Wish về hiện tại và tương lai.',
  prerequisiteIds: ['grammar-v2-b2-mixed-present-past-08'],
  coverage: ['wish-past-regret', 'wish-had-done', 'unreal-past-desire', 'regret-expressions', 'b2-grammar'],
  context: {
    english: 'Looking back at the catastrophic factory outage, the safety supervisor wished that senior management had authorized redundant backup generators during the annual overhaul.',
    vietnamese: 'Nhìn lại sự cố mất điện thảm khốc tại nhà máy, giám sát viên an toàn ước rằng ban giám đốc cấp cao đã phê duyệt các máy phát điện dự phòng bổ sung trong đợt đại tu hằng năm.',
  },
  guide: {
    pattern: 'S + wish(es) + (that) + S + had (not) + V3/ed | S + wished + (that) + S + had (not) + V3/ed',
    whenToUse: [
      'Bày tỏ sự nuối tiếc (regret) về một quyết định hoặc sự kiện đã diễn ra trái với mong muốn trong quá khứ.',
      'Ước một điều gì đó trong quá khứ đã xảy ra hoặc không xảy ra để tránh hậu quả tiêu cực.',
      'Có thể dùng wish + Past Perfect để nhìn lại điều đã xảy ra hoặc không xảy ra; câu nêu sự nuối tiếc nhưng không tự nó bắt buộc mọi chi tiết sự kiện phải là sự thật trái ngược.',
    ],
    signalWords: ['wish', 'had known', 'had taken', 'had not sold', 'regret doing', 'should have'],
    check: [
      'Mệnh đề sau wish thường dùng Past Perfect để bày tỏ nuối tiếc về quá khứ; xét ngữ cảnh trước khi lựa chọn.',
      'Tránh dùng "would have" hoặc "didn\'t" khi diễn tả sự tiếc nuối về sự việc quá khứ.',
      'Chủ ngữ trước và sau wish có thể giống nhau (I wish I had...) hoặc khác nhau (I wish they had...).',
    ],
  },
  explanation: 'Để bày tỏ sự nuối tiếc về quá khứ, thường dùng wish + past perfect (had + past participle): I wish I had accepted that offer. Wish + past simple thường nêu mong muốn trái với hiện tại; wish + would thường bày tỏ mong muốn một người hoặc tình huống thay đổi. Wish + past perfect thể hiện thái độ tiếc nuối, nhưng không áp đặt rằng mọi tình huống thực tế phải có cùng một diễn giải.',
  examples: [
    {
      english: 'I wish I had retained the purchase receipt; now the retail store refuses to honor the product warranty.',
      vietnamese: 'Tôi ước gì mình đã giữ lại hóa đơn mua hàng; giờ đây cửa hàng bán lẻ từ chối áp dụng chế độ bảo hành sản phẩm.',
    },
    {
      english: 'The project manager wished she had allocated more contingency budget before the supply chain disrupted.',
      vietnamese: 'Người quản lý dự án ước rằng cô ấy đã phân bổ thêm ngân sách dự phòng trước khi chuỗi cung ứng bị gián đoạn.',
    },
    {
      english: 'We wish we had not declined the university\'s collaborative research proposition last autumn.',
      vietnamese: 'Chúng tôi ước rằng chúng tôi đã không từ chối đề xuất hợp tác nghiên cứu của trường đại học vào mùa thu năm ngoái.',
    },
    {
      english: 'Do you wish you had chosen biomedical engineering instead of corporate finance back in college?',
      vietnamese: 'Bạn có ước rằng mình đã chọn ngành kỹ thuật y sinh thay vì tài chính doanh nghiệp thời đại học không?',
    },
    {
      english: 'The airline passenger wished he had packed essential prescription medications in his carry-on luggage.',
      vietnamese: 'Hành khách đi máy bay ước rằng anh ấy đã đóng gói các loại thuốc theo đơn thiết yếu vào hành lý xách tay.',
    },
    {
      english: 'Many municipal voters wished the city council had held public consultations before demolishing the heritage library.',
      vietnamese: 'Nhiều cử tri thành phố ước rằng hội đồng thành phố đã tổ chức tham vấn cộng đồng trước khi phá dỡ thư viện di sản.',
    },
  ],
  contrasts: [
    {
      form: 'I wish I had known vs I wish I knew',
      whyFits: '"I wish I had known the deadline yesterday" diễn tả sự nuối tiếc về một thông tin trong quá khứ mà người nói đã không biết.',
      whyNot: '"I wish I knew the answer now" diễn tả sự thiếu hiểu biết ở thời điểm hiện tại, không liên quan đến sự kiện quá khứ đã qua.',
    },
    {
      form: 'wish + had done vs wish + would do',
      whyFits: '"I wish they had listened to our advice last week" hướng về sự việc đã kết thúc trong quá khứ.',
      whyNot: '"I wish they would listen to our advice" bày tỏ sự bực bội hoặc mong mỏi ai đó thay đổi thái độ/hành vi trong hiện tại hoặc tương lai.',
    },
  ],
  commonMistakes: [
    'Dùng would have thay cho had: viết "I wish I would have studied harder" thay vì "I wish I had studied harder".',
    'Dùng quá khứ đơn didn\'t thay cho had not: viết "I wish I didn\'t say that yesterday" thay vì "I wish I hadn\'t said that yesterday".',
    'Nhầm lẫn phân từ hai của động từ bất quy tắc: viết "I wish I had chose" thay vì "I wish I had chosen".',
  ],
  summary: 'Wish + past perfect (had + V3) thường dùng để bày tỏ sự nuối tiếc về một tình huống quá khứ; phân biệt với wish + past simple cho mong muốn trái hiện tại và wish + would cho mong muốn thay đổi.',
  exercises: [
    {
      id: 'grammar-v2-b2-wish-past-regret-09-q1',
      kind: 'choice',
      prompt: 'Looking at the dismal quarterly results, the CFO wished the company ___ into that volatile speculative market.',
      options: [
        { text: 'had not diversified', correct: true, rationale: 'Bày tỏ sự nuối tiếc về quyết định đầu tư trong quá khứ đòi hỏi thì Past Perfect (had not diversified).' },
        { text: 'did not diversify', correct: false, rationale: 'Quá khứ đơn dùng cho ước muốn trái hiện tại, không dùng cho sự kiện quá khứ đã kết thúc.' },
        { text: 'would not diversify', correct: false, rationale: 'would not dùng cho phàn nàn hành vi tương lai/hiện tại.' },
      ],
      acceptedAnswers: [{ text: 'had not diversified', rationale: 'had not diversified diễn tả sự nuối tiếc về một quyết định quá khứ.' }],
    },
    {
      id: 'grammar-v2-b2-wish-past-regret-09-q2',
      kind: 'choice',
      prompt: 'Which sentence correctly expresses a retrospective regret about an event last night?',
      options: [
        { text: 'I wish I had verified the alarm settings before going to sleep last night.', correct: true, rationale: 'Cấu trúc wish + had verified diễn tả sự nuối tiếc chuẩn xác về tối hôm qua.' },
        { text: 'I wish I verified the alarm settings before going to sleep last night.', correct: false, rationale: 'Dùng quá khứ đơn verified là sai thì khi nói về nuối tiếc quá khứ.' },
        { text: 'I wish I would have verified the alarm settings before going to sleep last night.', correct: false, rationale: 'Không dùng would have trong mệnh đề sau wish.' },
      ],
      acceptedAnswers: [{ text: 'I wish I had verified the alarm settings before going to sleep last night.', rationale: 'Cấu trúc wish + had + V3 diễn đạt sự nuối tiếc quá khứ chuẩn mực.' }],
    },
    {
      id: 'grammar-v2-b2-wish-past-regret-09-q3',
      kind: 'choice',
      prompt: 'The traveler was stranded in Frankfurt and wished he ___ a direct flight instead of a budget layover.',
      options: [
        { text: 'had booked', correct: true, rationale: 'Việc đặt vé máy bay đã diễn ra trong quá khứ, nên dùng had booked sau wished.' },
        { text: 'booked', correct: false, rationale: 'Sai thì vì booked chỉ mong ước ở hiện tại.' },
        { text: 'has booked', correct: false, rationale: 'Hiện tại hoàn thành không dùng sau wish.' },
      ],
      acceptedAnswers: [{ text: 'had booked', rationale: 'had booked diễn tả sự nuối tiếc về việc đã không đặt chuyến bay thẳng.' }],
    },
    {
      id: 'grammar-v2-b2-wish-past-regret-09-q4',
      kind: 'choice',
      prompt: 'Identify the sentence with an ungrammatical wish construction:',
      options: [
        { text: 'We wish we would have consulted our patent attorney prior to the trade show.', correct: true, rationale: 'Sai vì sau wish không dùng "would have consulted"; phải dùng "had consulted".' },
        { text: 'We wish we had consulted our patent attorney prior to the trade show.', correct: false, rationale: 'Câu này đúng ngữ pháp wish + had + V3.' },
        { text: 'They wish they had not signed the non-disclosure agreement so hastily.', correct: false, rationale: 'Câu này đúng ngữ pháp wish + had not + V3.' },
      ],
      acceptedAnswers: [{ text: 'We wish we would have consulted our patent attorney prior to the trade show.', rationale: 'Không dùng would have trong mệnh đề sau wish khi bày tỏ nuối tiếc quá khứ.' }],
    },
    {
      id: 'grammar-v2-b2-wish-past-regret-09-q5',
      kind: 'gap',
      prompt: 'I have a terrible migraine today; I wish I ___ (not stay) up until 3 AM finishing the audit slides.',
      options: [],
      acceptedAnswers: [
        { text: 'had not stayed', rationale: 'had not stayed diễn tả sự nuối tiếc về việc thức khuya tối qua.' },
        { text: "hadn't stayed", rationale: 'Dạng rút gọn của had not stayed.' },
      ],
    },
    {
      id: 'grammar-v2-b2-wish-past-regret-09-q6',
      kind: 'gap',
      prompt: 'The museum curator wishes that the benefactors ___ (not auction) the impressionist masterpiece to private collectors.',
      options: [],
      acceptedAnswers: [
        { text: 'had not auctioned', rationale: 'had not auctioned diễn tả sự tiếc nuối về việc bức tranh đã bị bán đấu giá.' },
        { text: "hadn't auctioned", rationale: 'Dạng rút gọn của had not auctioned.' },
      ],
    },
    {
      id: 'grammar-v2-b2-wish-past-regret-09-q7',
      kind: 'gap',
      prompt: 'She failed the professional bar examination and deeply wishes she ___ (dedicate) more time to case precedents.',
      options: [],
      acceptedAnswers: [{ text: 'had dedicated', rationale: 'had dedicated thể hiện sự nuối tiếc vì đã không dành đủ thời gian ôn tập.' }],
    },
    {
      id: 'grammar-v2-b2-wish-past-regret-09-q8',
      kind: 'gap',
      prompt: 'Do they wish they ___ (negotiate) more favorable interest terms before securing the mortgage?',
      options: [],
      acceptedAnswers: [{ text: 'had negotiated', rationale: 'had negotiated diễn tả mong ước đã đàm phán điều khoản lãi suất tốt hơn trước khi vay.' }],
    },
    {
      id: 'grammar-v2-b2-wish-past-regret-09-q9',
      kind: 'transform',
      prompt: 'I regret not accepting the job offer in Zurich last winter. -> I wish I ___ the job offer in Zurich last winter.',
      options: [],
      acceptedAnswers: [
        { text: 'had accepted', rationale: 'Dùng had accepted để chuyển từ cấu trúc regret not doing sang wish + Past Perfect.' },
      ],
    },
    {
      id: 'grammar-v2-b2-wish-past-regret-09-q10',
      kind: 'transform',
      prompt: 'We made a grave mistake by deleting the raw research recordings yesterday. -> We wish we ___ the raw research recordings yesterday.',
      options: [],
      acceptedAnswers: [
        { text: 'had not deleted', rationale: 'Dùng had not deleted để bày tỏ sự nuối tiếc về việc xóa bản ghi âm.' },
        { text: "hadn't deleted", rationale: 'Dạng rút gọn của had not deleted.' },
      ],
    },
    {
      id: 'grammar-v2-b2-wish-past-regret-09-q11',
      kind: 'correction',
      prompt: 'Sửa lỗi sai dùng would have sau wish: "The architect wishes she would have insisted on higher-grade insulation materials."',
      options: [],
      acceptedAnswers: [
        { text: 'The architect wishes she had insisted on higher-grade insulation materials.', rationale: 'Thay "would have insisted" bằng thì Quá khứ hoàn thành "had insisted".' },
      ],
    },
    {
      id: 'grammar-v2-b2-wish-past-regret-09-q12',
      kind: 'correction',
      prompt: 'Sửa lỗi thì quá khứ đơn sau wish khi bày tỏ nuối tiếc sự việc quá khứ: "I wish I didn\'t sell my grandfather\'s antique pocket watch last year."',
      options: [],
      acceptedAnswers: [
        { text: 'I wish I had not sold my grandfather\'s antique pocket watch last year.', rationale: 'Thay "didn\'t sell" bằng "had not sold" (hoặc hadn\'t sold) vì mốc thời gian là last year.' },
        { text: "I wish I hadn't sold my grandfather's antique pocket watch last year.", rationale: 'Dạng viết tắt chuẩn của had not sold.' },
      ],
    },
  ],
  reviewExercises: [
    {
      id: 'grammar-v2-b2-wish-past-regret-09-r1',
      kind: 'choice',
      prompt: 'The driver received a hefty fine and wished he ___ through the residential school zone.',
      options: [
        { text: 'had not sped', correct: true, rationale: 'Bày tỏ sự nuối tiếc về hành vi chạy quá tốc độ trong quá khứ dùng had not sped.' },
        { text: 'did not speed', correct: false, rationale: 'Quá khứ đơn không dùng để diễn tả sự nuối tiếc hành động quá khứ.' },
        { text: 'would not speed', correct: false, rationale: 'would not speed dùng cho mong muốn người khác không chạy ẩu trong tương lai.' },
      ],
      acceptedAnswers: [{ text: 'had not sped', rationale: 'had not sped diễn tả sự hối hận vì đã chạy quá tốc độ.' }],
    },
    {
      id: 'grammar-v2-b2-wish-past-regret-09-r2',
      kind: 'gap',
      prompt: 'The delegates wished the bilateral summit ___ (produce) a binding ceasefire agreement yesterday.',
      options: [],
      acceptedAnswers: [{ text: 'had produced', rationale: 'had produced diễn tả sự nuối tiếc vì hội nghị thượng đỉnh hôm qua đã không đem lại thỏa thuận ràng buộc.' }],
    },
    {
      id: 'grammar-v2-b2-wish-past-regret-09-r3',
      kind: 'transform',
      prompt: 'I regret spending my entire savings on that unreliable sports car. -> I wish I ___ my entire savings on that unreliable sports car.',
      options: [],
      acceptedAnswers: [
        { text: 'had not spent', rationale: 'Dùng had not spent để chuyển từ regret spending sang wish.' },
        { text: "hadn't spent", rationale: 'Dạng rút gọn của had not spent.' },
      ],
    },
    {
      id: 'grammar-v2-b2-wish-past-regret-09-r4',
      kind: 'correction',
      prompt: 'Sửa lỗi phân từ hai: "She wished she had spoke to the senior partner before tendering her resignation."',
      options: [],
      acceptedAnswers: [
        { text: 'She wished she had spoken to the senior partner before tendering her resignation.', rationale: 'Phân từ hai của speak là spoken, không dùng dạng quá khứ đơn spoke.' },
      ],
    },
  ],
  outputPrompts: [
    {
      id: 'grammar-v2-b2-wish-past-regret-09-o1',
      prompt: 'Viết 1 câu tiếng Anh sử dụng cấu trúc "I wish I had (not) + V3" để bày tỏ sự nuối tiếc chân thành về một cơ hội học tập hoặc công việc trong quá khứ.',
      modelAnswer: 'I wish I had participated in the international exchange program during my sophomore year at university.',
      checks: [
        'Sử dụng cấu trúc I wish I had + V3/ed',
        'Động từ chính ở dạng quá khứ phân từ chính xác',
        'Nêu một sự việc hoặc cơ hội cụ thể trong quá khứ',
      ],
    },
    {
      id: 'grammar-v2-b2-wish-past-regret-09-o2',
      prompt: 'Viết 1 câu tiếng Anh sử dụng cấu trúc "The team / The management wished they had..." phản ánh sự tiếc nuối sau một sự cố kỹ thuật hoặc quản lý dự án.',
      modelAnswer: 'The engineering team wished they had conducted extensive penetration testing before launching the public web application.',
      checks: [
        'Chủ ngữ ngôi thứ ba kết hợp với wished they had + V3/ed',
        'Ngữ cảnh liên quan đến công việc hoặc sự cố chuyên môn',
        'Ngữ pháp chuẩn xác, mạch lạc',
      ],
    },
  ],
  sources: [
    {
      id: 'cambridge-wish-regret',
      title: 'Cambridge Grammar: Wish and if only for regrets',
      url: 'https://dictionary.cambridge.org/grammar/british-grammar/wish',
      claims: ['Wish followed by past perfect expresses regret about things that happened or did not happen in the past.'],
      checkedAt: '2026-10-05',
      provenance: 'reference-only',
    },
    {
      id: 'bc-wishes-regrets',
      title: 'British Council: Wishes and regrets (wish + past perfect)',
      url: 'https://learnenglish.britishcouncil.org/grammar/b1-b2-grammar/wishes-and-regrets',
      claims: ['Outlines past counterfactual desires and contrasts them with present wishes and irritation.'],
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
