/**
 * @file can-could-ability.ts
 * @description A2 lesson on modal verbs 'can' and 'could' expressing present and past ability.
 */
import type { GrammarLesson } from '../../types.js';

const canCouldAbilityLesson: GrammarLesson = {
  id: 'grammar-v2-a2-can-could-ability-21',
  revisionId: 'grammar-v2-a2-can-could-ability-21@1.0.0',
  revision: '1.0.0',
  title: 'Động từ khuyết thiếu Can và Could chỉ khả năng (Can and Could for Ability)',
  objective: 'Sử dụng thành thạo can/can’t để nói về khả năng ở hiện tại và could/couldn’t để nói về khả năng chung trong quá khứ, nắm vững cấu trúc động từ nguyên mẫu không to.',
  prerequisiteIds: ['grammar-v2-a2-adjective-vs-adverb-20'],
  coverage: ['can-could-ability', 'modals', 'ability', 'can', 'could'],
  context: {
    english: 'We use the modal verb "can" to express ability in the present, and "could" to describe general ability in the past.',
    vietnamese: 'Chúng ta sử dụng động từ khuyết thiếu "can" để diễn đạt khả năng ở hiện tại, và "could" để miêu tả khả năng chung trong quá khứ.',
  },
  guide: {
    pattern: 'Present: S + can / cannot / can’t + V-bare | Past: S + could / could not / couldn’t + V-bare | Questions: Can/Could + S + V-bare?',
    whenToUse: [
      'Dùng "can" để nói về khả năng thể chất, kỹ năng hoặc năng khiếu ở hiện tại (I can swim; She can play chess).',
      'Dùng "can’t" hoặc "cannot" để nói về điều ai đó không có khả năng làm ở hiện tại.',
      'Dùng "could" để nói về khả năng chung ai đó từng có trong quá khứ (When I was five, I could ride a bicycle).',
      'Dùng "couldn’t" để diễn tả việc không thể thực hiện được trong quá khứ.',
      'Sau can và could luôn luôn là động từ nguyên mẫu không có "to" (bare infinitive).',
    ],
    signalWords: ['can', "can't", 'cannot', 'could', "couldn't", 'when I was young', 'in the past', 'now', 'at age seven'],
    check: [
      'Sau can và could, động từ phải giữ nguyên thể không chia và không có "to" (He can speak, không phải He can to speak).',
      'Tuyệt đối không thêm -s/es vào can hoặc could đối với chủ ngữ số ít (She can, không bao giờ viết She cans).',
      'Dạng phủ định viết đầy đủ của can là "cannot" (viết liền một từ duy nhất), dạng rút gọn là "can’t".',
      'Trong câu hỏi nghi vấn, đảo can hoặc could lên trước chủ ngữ (Can you help me? Could you swim when you were six?).',
    ],
  },
  explanation: 'Động từ khuyết thiếu (modal verbs) "can" và "could" đóng vai trò quan trọng khi giao tiếp về kỹ năng, sở trường hoặc năng lực. Ở hiện tại, "can" đi cùng động từ nguyên mẫu không to diễn tả khả năng một người có thể làm được việc gì đó: "She can speak three languages fluently." Dạng phủ định là "cannot" (chú ý viết liền) hoặc dạng viết tắt thông dụng "can’t": "I can’t find my car keys." Đối với quá khứ, "could" là dạng quá khứ của "can", dùng để miêu tả khả năng chung kéo dài trong một giai đoạn trước đây: "My grandfather could run ten kilometers every morning when he was young." Dạng phủ định quá khứ là "could not" hoặc "couldn’t": "We couldn’t sleep because of the loud music next door." Quy tắc then chốt của động từ khuyết thiếu là: không bao giờ biến đổi theo ngôi chủ ngữ (không thêm -s/-es ở ngôi he/she/it) và luôn đi kèm động từ nguyên thể không to (bare infinitive). Ngoài khả năng, can và could còn được dùng trong các câu yêu cầu hoặc xin phép lịch sự (Could you please open the door?), nhưng trọng tâm bài học này là diễn đạt năng lực và khả năng hành động.',
  examples: [
    {
      english: 'My seven-year-old sister can play classical piano very well.',
      vietnamese: 'Em gái bảy tuổi của tôi có thể chơi đàn piano cổ điển rất giỏi.',
    },
    {
      english: 'I cannot attend tomorrow’s team meeting because I have a doctor’s appointment.',
      vietnamese: 'Tôi không thể tham dự cuộc họp nhóm ngày mai vì tôi có lịch hẹn với bác sĩ.',
    },
    {
      english: 'When my father was a university student, he could speak Russian fluently.',
      vietnamese: 'Khi bố tôi còn là sinh viên đại học, ông ấy có thể nói tiếng Nga một cách lưu loát.',
    },
    {
      english: 'We couldn’t finish the outdoor barbecue because a sudden storm started.',
      vietnamese: 'Chúng tôi đã không thể hoàn thành bữa tiệc nướng ngoài trời vì một cơn bão bất ngờ ập đến.',
    },
    {
      english: 'Can your brother swim across this wide river safely?',
      vietnamese: 'Anh trai bạn có thể bơi qua con sông rộng này một cách an toàn không?',
    },
    {
      english: 'At the age of four, Mozart could compose short pieces of music.',
      vietnamese: 'Vào năm bốn tuổi, Mozart đã có thể sáng tác những bản nhạc ngắn.',
    },
  ],
  contrasts: [
    {
      form: 'She can speak Japanese, but she cannot write kanji characters.',
      whyFits: 'Can và cannot diễn đạt năng lực hiện tại, đi kèm động từ nguyên mẫu speak và write.',
      whyNot: '"She can speaks Japanese..." sai vì modal verb can không bao giờ thêm -s sau ngôi thứ ba số ít.',
    },
    {
      form: 'When I was ten years old, I could climb high mango trees easily.',
      whyFits: 'Could diễn đạt khả năng chung trong quá khứ kết hợp với mệnh đề thời gian "when I was ten".',
      whyNot: '"When I was ten years old, I can climb..." sai thì vì can chỉ dùng cho khả năng ở hiện tại.',
    },
  ],
  commonMistakes: [
    'Thêm "to" sau can hoặc could (viết "I can to swim" hoặc "She could to play the violin").',
    'Thêm đuôi -s vào can ở ngôi thứ ba số ít (viết "He cans run fast").',
    'Dùng can để nói về khả năng trong quá khứ có mốc thời gian rõ ràng (viết "Yesterday I can finish it" thay vì could hoặc was able to).',
  ],
  summary: 'Dùng can/can’t + V-bare cho khả năng hiện tại; could/couldn’t + V-bare cho khả năng quá khứ. Không thêm -s theo ngôi và không dùng "to" trước động từ chính.',
  exercises: [
    {
      id: 'grammar-v2-a2-can-could-ability-21-q1',
      kind: 'choice',
      prompt: 'Select the correct verb form: "My sister is very talented; she ___ four musical instruments."',
      options: [
        { text: 'can play', correct: true, rationale: 'Sau can là động từ nguyên mẫu không to (play), không thêm -s.' },
        { text: 'can to play', correct: false, rationale: 'Sai vì modal verb can không đi với động từ có to.' },
        { text: 'cans play', correct: false, rationale: 'Sai vì can không bao giờ nhận đuôi -s ở ngôi thứ ba số ít.' },
        { text: 'could playing', correct: false, rationale: 'Could không đi kèm V-ing khi diễn đạt khả năng cơ bản.' },
      ],
      acceptedAnswers: [{ text: 'can play', rationale: 'Can is followed by the bare infinitive play without inflection or to.' }],
    },
    {
      id: 'grammar-v2-a2-can-could-ability-21-q2',
      kind: 'choice',
      prompt: 'Choose the correct form for past ability: "When he was twelve, David ___ run five kilometers without stopping."',
      options: [
        { text: 'could', correct: true, rationale: 'Could diễn đạt khả năng chung trong quá khứ kết hợp với mốc thời gian when he was twelve.' },
        { text: 'can', correct: false, rationale: 'Can dùng cho hiện tại, không phù hợp với mốc quá khứ was twelve.' },
        { text: 'could to', correct: false, rationale: 'Could không đi kèm giới từ to.' },
        { text: 'is able', correct: false, rationale: 'Thiếu to và sai thì (is là hiện tại).' },
      ],
      acceptedAnswers: [{ text: 'could', rationale: 'Could expresses past general ability in narrative context.' }],
    },
    {
      id: 'grammar-v2-a2-can-could-ability-21-q3',
      kind: 'choice',
      prompt: 'Select the correct negative spelling: "I am sorry, but I ___ come to your birthday party tonight."',
      options: [
        { text: 'cannot', correct: true, rationale: 'Cannot viết liền một từ duy nhất, là dạng phủ định chuẩn của can.' },
        { text: 'can not', correct: false, rationale: 'Cannot is the usual one-word spelling for this ordinary un-emphasized negation; the separate spelling can not is possible when not is contrastively stressed.' },
        { text: 'cannot to', correct: false, rationale: 'Cannot không đi cùng động từ nguyên mẫu có to.' },
        { text: 'could not to', correct: false, rationale: 'Could not không đi cùng to và tonight là thời điểm hiện tại/tương lai gần.' },
      ],
      acceptedAnswers: [{ text: 'cannot', rationale: 'Cannot is the usual one-word spelling for ordinary negation.' }],
    },
    {
      id: 'grammar-v2-a2-can-could-ability-21-q4',
      kind: 'choice',
      prompt: 'Select the correct question: "___ your grandfather use a smartphone easily?"',
      options: [
        { text: 'Can', correct: true, rationale: 'Đảo Can lên đầu câu hỏi về khả năng hiện tại của ông bạn.' },
        { text: 'Does can', correct: false, rationale: 'Không dùng trợ động từ does với động từ khuyết thiếu can.' },
        { text: 'Is can', correct: false, rationale: 'Không kết hợp is và can.' },
        { text: 'Can to', correct: false, rationale: 'Can không đi kèm to.' },
      ],
      acceptedAnswers: [{ text: 'Can', rationale: 'Can inverts directly with the subject to form a question.' }],
    },
    {
      id: 'grammar-v2-a2-can-could-ability-21-q5',
      kind: 'gap',
      prompt: 'Fill in the blank with "can" or "could": "Look at that poster! You _____ read the small letters from here, right?"',
      options: [],
      acceptedAnswers: [
        { text: 'can', rationale: 'Present ability indicated by the immediate command Look at that poster.' },
      ],
    },
    {
      id: 'grammar-v2-a2-can-could-ability-21-q6',
      kind: 'gap',
      prompt: 'Fill in the blank with the negative past form: "We _____ (not / hear) what the speaker said because the microphone was broken."',
      options: [],
      acceptedAnswers: [
        { text: 'could not hear', rationale: 'Past negative ability expressing inability to hear with bare infinitive hear.' },
        { text: "couldn't hear", rationale: "Contraction couldn't hear is accepted." },
      ],
    },
    {
      id: 'grammar-v2-a2-can-could-ability-21-q7',
      kind: 'gap',
      prompt: 'Fill in the blank with the correct bare infinitive: "Linh can _____ (speak) three foreign languages fluently."',
      options: [],
      acceptedAnswers: [
        { text: 'speak', rationale: 'Modal verb can requires the bare infinitive speak.' },
      ],
    },
    {
      id: 'grammar-v2-a2-can-could-ability-21-q8',
      kind: 'gap',
      prompt: 'Fill in the blank with "could" or "can": "When I was in primary school, I _____ swim very fast."',
      options: [],
      acceptedAnswers: [
        { text: 'could', rationale: 'Refers to past ability during primary school.' },
      ],
    },
    {
      id: 'grammar-v2-a2-can-could-ability-21-q9',
      kind: 'transform',
      prompt: 'Rewrite using "cannot": "I do not have the ability to solve this complex mathematics problem."',
      options: [],
      acceptedAnswers: [
        { text: 'I cannot solve this complex mathematics problem.', rationale: 'Expresses lack of ability using cannot + bare infinitive solve.' },
        { text: "I can't solve this complex mathematics problem.", rationale: "Contraction can't is accepted." },
      ],
    },
    {
      id: 'grammar-v2-a2-can-could-ability-21-q10',
      kind: 'transform',
      prompt: 'Rewrite using "could": "In the past, my grandmother was able to knit warm wool sweaters quickly."',
      options: [],
      acceptedAnswers: [
        { text: 'In the past, my grandmother could knit warm wool sweaters quickly.', rationale: 'Replaces was able to with could for general past ability.' },
        { text: 'My grandmother could knit warm wool sweaters quickly in the past.', rationale: 'Variant with time phrase at end is accepted.' },
      ],
    },
    {
      id: 'grammar-v2-a2-can-could-ability-21-q11',
      kind: 'correction',
      prompt: 'Correct the error in this sentence: "My younger brother cans swim across the community pool."',
      options: [],
      acceptedAnswers: [
        { text: 'My younger brother can swim across the community pool.', rationale: 'Removes the incorrect third-person suffix -s from the modal verb can.' },
      ],
    },
    {
      id: 'grammar-v2-a2-can-could-ability-21-q12',
      kind: 'correction',
      prompt: 'Correct the error in this sentence: "Five years ago, she could to speak only a few English words."',
      options: [],
      acceptedAnswers: [
        { text: 'Five years ago, she could speak only a few English words.', rationale: 'Removes the unnecessary particle to after could.' },
      ],
    },
  ],
  reviewExercises: [
    {
      id: 'grammar-v2-a2-can-could-ability-21-r1',
      kind: 'choice',
      prompt: 'Choose the correct sentence: "Which sentence describes past inability correctly?"',
      options: [
        { text: 'We could not unlock the gate because we had the wrong key.', correct: true, rationale: 'Could not diễn đạt việc không thể mở khóa trong quá khứ với động từ nguyên mẫu unlock.' },
        { text: 'We could not to unlock the gate because we had the wrong key.', correct: false, rationale: 'Sai vì có to sau could not.' },
        { text: 'We did not can unlock the gate because we had the wrong key.', correct: false, rationale: 'Không dùng trợ động từ did với modal verb can.' },
      ],
      acceptedAnswers: [{ text: 'We could not unlock the gate because we had the wrong key.', rationale: 'Could not is followed by bare infinitive unlock without to.' }],
    },
    {
      id: 'grammar-v2-a2-can-could-ability-21-r2',
      kind: 'gap',
      prompt: 'Fill in the blank with the negative present form: "I _____ (not / ride) a motorcycle, so I commute by bus every day."',
      options: [],
      acceptedAnswers: [
        { text: 'cannot ride', rationale: 'Present inability with cannot and bare infinitive ride.' },
        { text: "can't ride", rationale: "Contraction can't ride is accepted." },
      ],
    },
    {
      id: 'grammar-v2-a2-can-could-ability-21-r3',
      kind: 'transform',
      prompt: 'Rewrite as a question using "Can": "You are able to speak Vietnamese."',
      options: [],
      acceptedAnswers: [
        { text: 'Can you speak Vietnamese?', rationale: 'Inverts modal verb Can with subject you to form an ability question.' },
      ],
    },
    {
      id: 'grammar-v2-a2-can-could-ability-21-r4',
      kind: 'correction',
      prompt: 'Correct the error: "When she was six, she can already play the violin beautifully."',
      options: [],
      acceptedAnswers: [
        { text: 'When she was six, she could already play the violin beautifully.', rationale: 'Replaces present can with past could to match when she was six.' },
      ],
    },
  ],
  outputPrompts: [
    {
      id: 'grammar-v2-a2-can-could-ability-21-o1',
      prompt: 'Viết 2 câu kể về một kỹ năng bạn có ở hiện tại (dùng "can") và một kỹ năng bạn chưa làm được (dùng "can’t" hoặc "cannot").',
      modelAnswer: 'I can prepare simple Vietnamese meals like pho and fried rice. However, I cannot bake traditional French pastries yet.',
      checks: [
        'Dùng can + V-bare diễn đạt kỹ năng làm được ở hiện tại.',
        'Dùng can’t hoặc cannot + V-bare diễn đạt điều chưa làm được.',
        'Động từ theo sau ở dạng nguyên mẫu không to.',
      ],
    },
    {
      id: 'grammar-v2-a2-can-could-ability-21-o2',
      prompt: 'Viết 2 câu kể về thời thơ ấu của bạn, dùng "could" cho điều bạn làm được khi còn nhỏ và "couldn’t" cho điều bạn chưa làm được thời điểm đó.',
      modelAnswer: 'When I was eight years old, I could ride my bicycle without hands. But at that time, I couldn’t swim in deep water because I was afraid.',
      checks: [
        'Dùng could + V-bare cho khả năng trong quá khứ kèm mốc thời gian (when I was eight).',
        'Dùng couldn’t + V-bare cho điều không thể làm trong quá khứ.',
        'Câu văn mạch lạc, đúng thì ngữ pháp.',
      ],
    },
  ],
  sources: [
    {
      id: 'cambridge-can-could-ability',
      title: 'Cambridge Dictionary: Can and could for ability',
      url: 'https://dictionary.cambridge.org/grammar/british-grammar/can-could-and-could-have',
      claims: [
        'Can is used to express general ability in the present, followed by a bare infinitive.',
        'Could is used to express general ability in the past.',
        'Modal verbs do not take -s in the third person singular and do not take to before the following infinitive.',
      ],
      checkedAt: '2026-10-05',
      provenance: 'reference-only',
    },
  ],
  review: {
    status: 'approved',
    mode: 'ai-internal',
    reviewer: 'Final review A2 curriculum.A2 audit east',
    reviewedAt: '2026-10-06T05:55:07.025Z',
  },
};

export default canCouldAbilityLesson;
