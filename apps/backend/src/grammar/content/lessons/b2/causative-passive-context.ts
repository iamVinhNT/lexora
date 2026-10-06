/**
 * @file causative-passive-context.ts
 * @description B2 lesson 19: Causative passive constructions (have / get something done) in context.
 */
import type { GrammarLesson } from '../../types.js';

const lesson: GrammarLesson = {
  id: 'grammar-v2-b2-causative-passive-context-19',
  revisionId: 'grammar-v2-b2-causative-passive-context-19@1.0.0',
  revision: '1.0.0',
  title: 'Thể sai khiến bị động trong ngữ cảnh (Causative Passive: Have/Get Something Done)',
  objective: 'Phân biệt và ứng dụng thành thạo cấu trúc sai khiến bị động "have/get something done" để diễn tả việc thuê mướn/nhờ ai làm dịch vụ hoặc trải qua rủi ro ngoài ý muốn.',
  prerequisiteIds: ['grammar-v2-b2-get-passive-register-18'],
  coverage: ['causative-passive-context', 'have-something-done', 'get-something-done', 'service-requests', 'misfortune-meaning'],
  context: {
    english: 'Homeowners, business managers, and travelers rely on causative passive structures to arrange paid professional services or describe unexpected misfortunes without stating the performer.',
    vietnamese: 'Chủ nhà, quản lý doanh nghiệp và du khách dựa vào cấu trúc sai khiến bị động để sắp xếp các dịch vụ chuyên nghiệp có trả phí hoặc miêu tả tai nạn rủi ro mà không cần nhắc tên người thực hiện.',
  },
  guide: {
    pattern: 'Subject + have / get + Object + Past Participle (V3)',
    whenToUse: [
      'Thuê chuyên gia hoặc nhờ ai đó làm một dịch vụ cho mình (have my car serviced, get the roof repaired).',
      'Diễn tả trải nghiệm không may hoặc tai nạn ập đến với tài sản của chủ thể (had his passport stolen).',
      '"Get something done" mang tính thân mật hơn hoặc nhấn mạnh sự nỗ lực hoàn thành công việc so với "have something done".',
    ],
    signalWords: ['have it repaired', 'get your eyes tested', 'had their house burgled', 'got the report signed'],
    check: [
      'Tân ngữ (vật chịu tác động) đã đứng giữa have/get và động từ phân từ ba (V3) chưa?',
      'Đã chia đúng thì của have/get (had, will have, are getting) theo ngữ cảnh thời gian chưa?',
      'Tránh nhầm với thể sai khiến chủ động: have someone do something / get someone to do something?',
    ],
  },
  explanation: 'Cấu trúc Causative Passive có công thức chung là "S + have/get + O + V3". Cấu trúc này có hai tầng nghĩa chính: 1) Nhờ hoặc thuê người khác làm dịch vụ cho mình vì mình không thể hoặc không muốn tự làm (We are having our kitchen remodeled); 2) Trải qua một tai nạn hay sự cố ngoài ý muốn làm tổn hại tài sản (He had his car vandalized last night). Trong văn nói, "get something done" thường thay thế cho "have something done" và có thể ngụ ý thêm rằng người nói đã phải rất vất vả mới giải quyết xong việc đó. Chú ý phân biệt với cấu trúc sai khiến chủ động: "have somebody do" và "get somebody to do".',
  examples: [
    {
      english: 'We have our central heating inspected every autumn before cold weather sets in.',
      vietnamese: 'Chúng tôi nhờ thợ kiểm tra hệ thống sưởi trung tâm vào mỗi mùa thu trước khi trời trở lạnh.',
    },
    {
      english: 'She is getting her wedding dress tailored by an experienced seamstress.',
      vietnamese: 'Cô ấy đang thuê một thợ may giàu kinh nghiệm may đo chiếc váy cưới cho mình.',
    },
    {
      english: 'The company had its financial accounts audited by an independent consulting agency.',
      vietnamese: 'Công ty đã thuê một cơ quan tư vấn độc lập kiểm toán các báo cáo tài chính của mình.',
    },
    {
      english: 'While touring the market, he had his digital camera snatched from his shoulder.',
      vietnamese: 'Khi đang dạo quanh khu chợ, anh ấy đã bị giật mất chiếc máy ảnh kỹ thuật số trên vai.',
    },
    {
      english: 'You should get your wisdom teeth checked before embarking on the long expedition.',
      vietnamese: 'Bạn nên đi khám răng khôn trước khi bắt đầu chuyến thám hiểm dài ngày.',
    },
    {
      english: 'They had the entire conference hall decorated with sustainable local flowers.',
      vietnamese: 'Họ đã thuê người trang trí toàn bộ hội trường bằng hoa tươi bản địa bền vững.',
    },
  ],
  contrasts: [
    {
      form: 'I had the mechanic repair my brakes. vs I had my brakes repaired.',
      whyFits: '"I had my brakes repaired" là thể causative passive, nhấn mạnh dịch vụ đã hoàn tất mà không cần tập trung vào người thợ.',
      whyNot: '"I had the mechanic repair my brakes" là thể causative active (have + person + bare infinitive), hướng trọng tâm vào đối tượng người làm.',
    },
    {
      form: 'He got his computer upgraded. vs He got an engineer to upgrade his computer.',
      whyFits: '"Got his computer upgraded" ngắn gọn và tập trung vào kết quả chiếc máy tính đã được nâng cấp.',
      whyNot: '"Got an engineer to upgrade..." là causative active với get, bắt buộc dùng to-infinitive (to upgrade) sau đối tượng người.',
    },
  ],
  commonMistakes: [
    'Đặt sai vị trí tân ngữ sau động từ phân từ ba (viết "I had repaired my car" nghĩa là thì quá khứ hoàn thành do chính mình tự sửa, thay vì "I had my car repaired").',
    'Dùng nhầm động từ nguyên mẫu trong causative passive (viết "get my hair cutted" hoặc "have my hair cut" với dạng sai của động từ bất quy tắc).',
    'Nhầm lẫn giữa get someone to do (chủ động) và get something done (bị động).',
  ],
  summary: 'Causative passive: S + have/get + O + V3. Dùng để nói về việc thuê dịch vụ chuyên nghiệp hoặc gặp tai nạn ngoài ý muốn. Vị trí tân ngữ bắt buộc đứng trước phân từ ba.',
  exercises: [
    {
      id: 'grammar-v2-b2-causative-passive-context-19-q1',
      kind: 'choice',
      prompt: 'Select the correct causative passive to express hiring a painter: "They ___ next Monday."',
      options: [
        { text: 'are having their living room painted', correct: true, rationale: 'Present continuous are having + object their living room + V3 painted denotes arranged service.' },
        { text: 'are having painted their living room', correct: false, rationale: 'Object must precede the past participle in causative passive.' },
        { text: 'are getting their living room paint', correct: false, rationale: 'Requires past participle painted, not base verb paint.' },
        { text: 'have painted their living room', correct: false, rationale: 'Present perfect implies they painted it themselves.' },
      ],
      acceptedAnswers: [{ text: 'are having their living room painted', rationale: 'Are having + object + painted is the correct pattern.' }],
    },
    {
      id: 'grammar-v2-b2-causative-passive-context-19-q2',
      kind: 'choice',
      prompt: 'Choose the sentence that describes experiencing an adverse theft: "The traveler ___ while boarding the metro."',
      options: [
        { text: 'had his wallet stolen', correct: true, rationale: 'Had + object + stolen describes a misfortune happening to the subject’s property.' },
        { text: 'had stolen his wallet', correct: false, rationale: 'Past perfect had stolen indicates the traveler himself stole his own wallet.' },
        { text: 'got his wallet steal', correct: false, rationale: 'Requires past participle stolen, not base form steal.' },
        { text: 'was had his wallet stolen', correct: false, rationale: 'Ungrammatical double passive passive auxiliary.' },
      ],
      acceptedAnswers: [{ text: 'had his wallet stolen', rationale: 'Had + object + stolen conveys experiencing misfortune.' }],
    },
    {
      id: 'grammar-v2-b2-causative-passive-context-19-q3',
      kind: 'choice',
      prompt: 'Select the causative passive with "get" for a completed formal task:',
      options: [
        { text: 'We finally got the contract signed by all stakeholders.', correct: true, rationale: 'Got + object + V3 signed correctly conveys achieving the signature.' },
        { text: 'We finally got signed the contract by all stakeholders.', correct: false, rationale: 'Object must appear before the past participle.' },
        { text: 'We finally got the contract to sign by all stakeholders.', correct: false, rationale: 'Causative passive takes V3 signed, not to-infinitive.' },
        { text: 'We finally got to sign the contract done.', correct: false, rationale: 'Muddled and ungrammatical structure.' },
      ],
      acceptedAnswers: [{ text: 'We finally got the contract signed by all stakeholders.', rationale: 'Got + object + signed is correct.' }],
    },
    {
      id: 'grammar-v2-b2-causative-passive-context-19-q4',
      kind: 'choice',
      prompt: 'Which sentence correctly distinguishes causative passive from past perfect?',
      options: [
        { text: 'She had her hair cut yesterday.', correct: true, rationale: 'Had + object (her hair) + V3 (cut) shows someone else performed the haircut.' },
        { text: 'She had cut her hair yesterday.', correct: false, rationale: 'Had cut with adjacent verb is past perfect active, implying self-cutting.' },
        { text: 'She had her hair to cut yesterday.', correct: false, rationale: 'Means having an obligation, not an accomplished service.' },
        { text: 'She was had her hair cut yesterday.', correct: false, rationale: 'Ungrammatical combination of was and had.' },
      ],
      acceptedAnswers: [{ text: 'She had her hair cut yesterday.', rationale: 'Distinguishes causative passive from personal past perfect.' }],
    },
    {
      id: 'grammar-v2-b2-causative-passive-context-19-q5',
      kind: 'gap',
      prompt: 'Fill in the past participle of "install": "The school is having solar panels _____ on the gymnasium roof."',
      options: [],
      acceptedAnswers: [{ text: 'installed', rationale: 'Past participle installed follows the object solar panels.' }],
    },
    {
      id: 'grammar-v2-b2-causative-passive-context-19-q6',
      kind: 'gap',
      prompt: 'Complete the causative question: "How often do you have your eyes _____ (test) by an optometrist?"',
      options: [],
      acceptedAnswers: [{ text: 'tested', rationale: 'Past participle tested follows your eyes.' }],
    },
    {
      id: 'grammar-v2-b2-causative-passive-context-19-q7',
      kind: 'gap',
      prompt: 'Supply the correct past tense auxiliary: "Unfortunately, they _____ their luggage misplaced on the connecting flight."',
      options: [],
      acceptedAnswers: [
        { text: 'had', rationale: 'Had their luggage misplaced conveys past misfortune.' },
        { text: 'got', rationale: 'Got is also acceptable colloquially for past misfortune.' },
      ],
    },
    {
      id: 'grammar-v2-b2-causative-passive-context-19-q8',
      kind: 'gap',
      prompt: 'Fill in the gap to complete the advice: "You should _____ your passport renewed before planning international flights."',
      options: [],
      acceptedAnswers: [
        { text: 'have', rationale: 'Have your passport renewed expresses professional renewal.' },
        { text: 'get', rationale: 'Get your passport renewed is equally natural.' },
      ],
    },
    {
      id: 'grammar-v2-b2-causative-passive-context-19-q9',
      kind: 'transform',
      prompt: 'Rewrite using "had our roof repaired": "A builder repaired our roof after the hurricane."',
      options: [],
      acceptedAnswers: [
        { text: 'We had our roof repaired after the hurricane.', rationale: 'Transforms active third-person repair into causative passive.' },
      ],
    },
    {
      id: 'grammar-v2-b2-causative-passive-context-19-q10',
      kind: 'transform',
      prompt: 'Rewrite using "is getting her teeth whitened": "A dental specialist is whitening her teeth."',
      options: [],
      acceptedAnswers: [
        { text: 'She is getting her teeth whitened.', rationale: 'Converts active specialist treatment into causative passive with get.' },
      ],
    },
    {
      id: 'grammar-v2-b2-causative-passive-context-19-q11',
      kind: 'correction',
      prompt: 'Correct the word order in this sentence: "We are going to have delivered the new refrigerator tomorrow morning."',
      options: [],
      acceptedAnswers: [
        { text: 'We are going to have the new refrigerator delivered tomorrow morning.', rationale: 'Places object the new refrigerator before participle delivered.' },
      ],
    },
    {
      id: 'grammar-v2-b2-causative-passive-context-19-q12',
      kind: 'correction',
      prompt: 'Correct the error in this causative sentence: "He got his assistant to made twenty copies of the agenda."',
      options: [],
      acceptedAnswers: [
        { text: 'He got his assistant to make twenty copies of the agenda.', rationale: 'Uses base verb make after to in active causative get.' },
        { text: 'He had twenty copies of the agenda made.', rationale: 'Alternative causative passive conversion.' },
      ],
    },
  ],
  reviewExercises: [
    {
      id: 'grammar-v2-b2-causative-passive-context-19-r1',
      kind: 'choice',
      prompt: 'Choose the correct causative passive form: "The museum ___ by an international conservation firm."',
      options: [
        { text: 'had the fragile mural restored', correct: true, rationale: 'Had + object + V3 restored denotes arranged professional restoration.' },
        { text: 'had restored the fragile mural', correct: false, rationale: 'Incorrect word order for causative passive.' },
        { text: 'got the fragile mural to restore', correct: false, rationale: 'Takes V3, not to-infinitive.' },
      ],
      acceptedAnswers: [{ text: 'had the fragile mural restored', rationale: 'Had the fragile mural restored is correct.' }],
    },
    {
      id: 'grammar-v2-b2-causative-passive-context-19-r2',
      kind: 'gap',
      prompt: 'Fill in the gap: "She needs to have her vehicle _____ (service) before the long journey."',
      options: [],
      acceptedAnswers: [{ text: 'serviced', rationale: 'Past participle serviced completes the causative phrase.' }],
    },
    {
      id: 'grammar-v2-b2-causative-passive-context-19-r3',
      kind: 'transform',
      prompt: 'Rewrite using causative "had his passport renewed": "The embassy renewed his passport in three business days."',
      options: [],
      acceptedAnswers: [
        { text: 'He had his passport renewed in three business days.', rationale: 'Transforms embassy action into causative passive.' },
      ],
    },
    {
      id: 'grammar-v2-b2-causative-passive-context-19-r4',
      kind: 'correction',
      prompt: 'Correct the error: "They had their garden landscape by a professional team."',
      options: [],
      acceptedAnswers: [
        { text: 'They had their garden landscaped by a professional team.', rationale: 'Changes base verb landscape to past participle landscaped.' },
      ],
    },
  ],
  outputPrompts: [
    {
      id: 'grammar-v2-b2-causative-passive-context-19-o1',
      prompt: 'Viết 1-2 câu miêu tả kế hoạch cải tạo hoặc bảo trì nhà cửa sắp tới của gia đình bạn bằng cách sử dụng cấu trúc "have/get something done" (ví dụ: have the kitchen renovated, get the air conditioner cleaned).',
      modelAnswer: 'Before welcoming guests for the holiday, we are planning to have our wooden floors polished. We will also get the air conditioning filters thoroughly cleaned by a professional technician.',
      checks: [
        'Sử dụng ít nhất một cấu trúc have something done hoặc get something done.',
        'Tân ngữ đứng trước động từ phân từ ba (V3).',
        'Ngữ pháp và ngữ nghĩa tự nhiên trong bối cảnh chuẩn bị nhà cửa.',
      ],
    },
    {
      id: 'grammar-v2-b2-causative-passive-context-19-o2',
      prompt: 'Viết 1-2 câu chia sẻ về một tình huống không may xảy ra với hành lý hoặc đồ đạc cá nhân trong lúc đi công tác hoặc du lịch, sử dụng "had my... stolen/damaged".',
      modelAnswer: 'During my layover in Brussels, I had my laptop bag snatched from beside the café counter. Fortunately, I had all my presentation files backed up on a secure cloud drive.',
      checks: [
        'Sử dụng cấu trúc causative diễn đạt sự cố ngoài ý muốn (had + noun + V3).',
        'Kết hợp đúng thì quá khứ đơn giản và ngữ cảnh diễn đạt trôi chảy.',
      ],
    },
  ],
  sources: [
    {
      id: 'cambridge-have-something-done',
      title: 'Cambridge Dictionary: Causative have and get',
      url: 'https://dictionary.cambridge.org/grammar/british-grammar/have-something-done',
      claims: [
        'Have/get something done expresses that someone arranges for someone else to do a job or service.',
        'It can also describe experiencing an accident, misfortune, or crime.',
      ],
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
