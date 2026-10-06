/**
 * @file must-have-to.ts
 * @description A2 lesson on expressing obligation with modal verb 'must' and semi-modal 'have to'.
 */
import type { GrammarLesson } from '../../types.js';

const mustHaveToLesson: GrammarLesson = {
  id: 'grammar-v2-a2-must-have-to-22',
  revisionId: 'grammar-v2-a2-must-have-to-22@1.0.0',
  revision: '1.0.0',
  title: 'Động từ khuyết thiếu Must và Have to chỉ sự bắt buộc (Must and Have to for Obligation)',
  objective: 'Hiểu và sử dụng must và have to để diễn đạt sự bắt buộc, nhận biết sự khác biệt giữa nghĩa vụ chủ quan (người nói tự thấy cần) và nghĩa vụ khách quan (luật lệ/nội quy), áp dụng dạng quá khứ had to.',
  prerequisiteIds: ['grammar-v2-a2-can-could-ability-21'],
  coverage: ['must-have-to', 'modals', 'obligation', 'must', 'have-to'],
  context: {
    english: 'Both "must" and "have to" express obligation or necessity. Speakers may use "must" for a personal or direct obligation and "have to" for an external requirement, but the forms often overlap.',
    vietnamese: 'Cả "must" và "have to" đều diễn đạt nghĩa vụ hoặc sự cần thiết. Người nói có thể dùng "must" cho nghĩa vụ cá nhân hoặc lời nói trực tiếp, và "have to" cho yêu cầu từ bên ngoài; hai cách dùng này thường chồng lấn.',
  },
  guide: {
    pattern: 'Must: S + must + V-bare | Have to: S + have to / has to + V-bare | Past: S + had to + V-bare | Questions: Do/Does + S + have to + V-bare?',
    whenToUse: [
      'Must thường được dùng cho nghĩa vụ cá nhân hoặc lời nói trực tiếp (I must call my mother tonight); have to thường dùng cho yêu cầu từ bên ngoài (I have to wear a uniform at work). Hai dạng có thể thay thế nhau trong nhiều ngữ cảnh.',
      'Have to thường diễn đạt nghĩa vụ do luật lệ, trường học, công ty hoặc hoàn cảnh đặt ra (In Vietnam, motorcyclists have to wear a helmet); must cũng có thể nêu quy định hoặc yêu cầu bên ngoài.',
      'Chủ ngữ ngôi thứ ba số ít (he/she/it) dùng "has to + V-bare" (Nam has to wear a uniform on Mondays).',
      'Vì "must" không có dạng quá khứ, ta bắt buộc dùng "had to" để diễn đạt nghĩa vụ trong quá khứ (Yesterday we had to work overtime).',
      'Để đặt câu hỏi về nghĩa vụ thông dụng, dùng "Do/Does + S + have to + V-bare?" (Do you have to wake up early tomorrow?).',
    ],
    signalWords: ['must', 'have to', 'has to', 'had to', 'rule', 'law', 'necessary', 'mandatory', 'obligation'],
    check: [
      'Sau "must" là động từ nguyên mẫu không có "to" (I must go, không phải I must to go).',
      'Cấu trúc "have to" luôn luôn có từ "to" đi kèm (She has to study, không phải She has study).',
      'Chủ ngữ số ít he/she/it dùng "has to" ở hiện tại đơn (He has to work).',
      'Khi nói về nghĩa vụ trong quá khứ, luôn dùng "had to", không bao giờ dùng must.',
      'Trong câu hỏi, Do/Does + S + have to...? phổ biến; Must + S...? cũng đúng và thường trang trọng hoặc trực tiếp hơn.',
    ],
  },
  explanation: 'Cả "must" và "have to" đều diễn đạt nghĩa vụ hoặc sự cần thiết. Must là modal verb, theo sau bởi động từ nguyên mẫu không to và không đổi theo chủ ngữ (He must go). Have to biến đổi theo ngôi (he has to go), đồng thời dùng do/does trong câu hỏi/phủ định (Does she have to go?). Người nói thường chọn must cho nghĩa vụ cá nhân hoặc cách nói trực tiếp, và have to cho yêu cầu bên ngoài; đây là khuynh hướng chứ không phải ranh giới cố định, vì cả hai có thể diễn đạt quy định hay ý kiến cá nhân. Quá khứ của nghĩa vụ thông thường dùng had to.',
  examples: [
    {
      english: 'I must remember to send an apology email to my client this morning.',
      vietnamese: 'Tôi phải nhớ gửi một bức thư điện tử xin lỗi tới khách hàng của tôi vào sáng nay.',
    },
    {
      english: 'In Vietnam, every driver has to carry a valid driving license.',
      vietnamese: 'Ở Việt Nam, mọi tài xế đều phải mang theo giấy phép lái xe hợp lệ.',
    },
    {
      english: 'Linh has to wake up at six every weekday because her school is far away.',
      vietnamese: 'Linh phải thức dậy lúc sáu giờ vào mỗi ngày trong tuần vì trường học của cô ấy ở xa.',
    },
    {
      english: 'Yesterday our team had to stay in the office until 8 p.m. to finish the audit.',
      vietnamese: 'Hôm qua đội của chúng tôi đã phải ở lại văn phòng đến 8 giờ tối để hoàn thành đợt kiểm toán.',
    },
    {
      english: 'Do international tourists have to show their passports at the hotel reception?',
      vietnamese: 'Khách du lịch quốc tế có phải xuất trình hộ chiếu tại quầy lễ tân khách sạn không?',
    },
    {
      english: 'You must see a doctor if your fever continues for more than two days.',
      vietnamese: 'Bạn phải đi khám bác sĩ nếu cơn sốt của bạn tiếp tục kéo dài hơn hai ngày.',
    },
  ],
  contrasts: [
    {
      form: 'I have to wear a tie at work because it is the company dress code.',
      whyFits: 'Have to diễn tả quy định trang phục chính thức do công ty quy định (nghĩa vụ khách quan).',
      whyNot: 'Must wear cũng có thể diễn tả yêu cầu này; have to chỉ làm nổi bật hơn việc nghĩa vụ đến từ nội quy công ty.'
    },
    {
      form: 'Last week we had to reschedule our family trip due to bad weather.',
      whyFits: 'Had to là dạng quá khứ thông thường để diễn tả nghĩa vụ phải làm trong quá khứ.',
      whyNot: '"Last week we must reschedule..." sai ngữ pháp vì must không thể chia ở thì quá khứ.',
    },
  ],
  commonMistakes: [
    'Thêm "to" sau must (viết "I must to study" thay vì "I must study").',
    'Quên "to" trong cấu trúc have to (viết "She has finish the report" thay vì "She has to finish").',
    'Dùng "must" cho hành động bắt buộc trong quá khứ (viết "Yesterday I must go" thay vì "Yesterday I had to go").',
  ],
  summary: 'Must và have to đều diễn tả nghĩa vụ. Must + V-bare; have to/has to + V-bare, quá khứ had to. Must thường thiên về nghĩa vụ cá nhân/lời nói trực tiếp, have to thường thiên về yêu cầu bên ngoài; hai dạng có thể chồng lấn.',
  exercises: [
    {
      id: 'grammar-v2-a2-must-have-to-22-q1',
      kind: 'choice',
      prompt: 'Select the correct form for an external rule: "At our university, all students ___ wear ID cards on campus."',
      options: [
        { text: 'have to', correct: true, rationale: 'Have to diễn tả quy định bắt buộc của trường học đối với sinh viên (chủ ngữ số nhiều students).' },
        { text: 'has to', correct: false, rationale: 'Has to chỉ dùng cho chủ ngữ số ít ngôi thứ ba, ở đây students là số nhiều.' },
        { text: 'must to', correct: false, rationale: 'Must là động từ khuyết thiếu, không đi với giới từ to.' },
        { text: 'having to', correct: false, rationale: 'Having to là dạng V-ing, không làm động từ vị ngữ chính ở đây.' },
      ],
      acceptedAnswers: [{ text: 'have to', rationale: 'Have to expresses an external institution rule with plural subject students.' }],
    },
    {
      id: 'grammar-v2-a2-must-have-to-22-q2',
      kind: 'choice',
      prompt: 'Choose the correct form for third-person singular: "Peter ___ travel to Da Nang for business twice a month."',
      options: [
        { text: 'has to', correct: true, rationale: 'Chủ ngữ Peter là ngôi thứ ba số ít, dùng has to + V-bare.' },
        { text: 'have to', correct: false, rationale: 'Have to dùng cho I/you/we/they, không dùng cho Peter.' },
        { text: 'must to', correct: false, rationale: 'Must không kết hợp với to.' },
        { text: 'is have to', correct: false, rationale: 'Không kết hợp động từ be với have to theo cách này.' },
      ],
      acceptedAnswers: [{ text: 'has to', rationale: 'Third-person singular Peter requires has to.' }],
    },
    {
      id: 'grammar-v2-a2-must-have-to-22-q3',
      kind: 'choice',
      prompt: 'Select the correct past obligation: "Yesterday my car broke down, so I ___ take a taxi to work."',
      options: [
        { text: 'had to', correct: true, rationale: 'Had to là dạng quá khứ của have to/must để diễn tả sự bắt buộc đã xảy ra ngày hôm qua.' },
        { text: 'must', correct: false, rationale: 'Must không có hình thức quá khứ, không dùng với yesterday.' },
        { text: 'have to', correct: false, rationale: 'Have to ở hiện tại, không ăn khớp với thì quá khứ của yesterday.' },
        { text: 'musted', correct: false, rationale: 'Musted là từ sai hoàn toàn, không tồn tại trong tiếng Anh.' },
      ],
      acceptedAnswers: [{ text: 'had to', rationale: 'Had to is the required past form for obligation.' }],
    },
    {
      id: 'grammar-v2-a2-must-have-to-22-q4',
      kind: 'choice',
      prompt: 'Select the correct question form: "___ work on weekends during the busy season?"',
      options: [
        { text: 'Do you have to', correct: true, rationale: 'Câu hỏi về nghĩa vụ ở hiện tại với chủ ngữ you dùng trợ động từ Do you have to.' },
        { text: 'Must you to', correct: false, rationale: 'Must không đi cùng giới từ to.' },
        { text: 'Are you have to', correct: false, rationale: 'Không dùng trợ động từ Are với have to.' },
        { text: 'Have you to', correct: false, rationale: 'Have you to là cấu trúc cổ, không thông dụng trong tiếng Anh hiện đại.' },
      ],
      acceptedAnswers: [{ text: 'Do you have to', rationale: 'Standard question formation uses Do you have to + bare infinitive.' }],
    },
    {
      id: 'grammar-v2-a2-must-have-to-22-q5',
      kind: 'gap',
      prompt: 'Fill in the blank with "must" or "have to": "Look at my messy desk! I _____ clean it up right now."',
      options: [],
      acceptedAnswers: [
        { text: 'must', rationale: 'Expresses personal subjective feeling that cleaning is immediately necessary.' },
        { text: 'have to', rationale: 'Have to is also acceptable in modern spoken English for necessity.' },
      ],
    },
    {
      id: 'grammar-v2-a2-must-have-to-22-q6',
      kind: 'gap',
      prompt: 'Fill in the blank with the correct form of "have to": "My mother _____ (have to) wake up at 5 a.m. to prepare breakfast for our family."',
      options: [],
      acceptedAnswers: [
        { text: 'has to', rationale: 'Third-person singular subject My mother requires has to.' },
      ],
    },
    {
      id: 'grammar-v2-a2-must-have-to-22-q7',
      kind: 'gap',
      prompt: 'Fill in the blank with the past form: "Because of the heavy rain, the football match _____ (have to) be postponed."',
      options: [],
      acceptedAnswers: [
        { text: 'had to', rationale: 'Past obligation or necessity requires had to.' },
      ],
    },
    {
      id: 'grammar-v2-a2-must-have-to-22-q8',
      kind: 'gap',
      prompt: 'Complete the question: "Does he _____ (have to) wear a formal suit to the office every day?"',
      options: [],
      acceptedAnswers: [
        { text: 'have to', rationale: 'After auxiliary Does, have to returns to base form.' },
      ],
    },
    {
      id: 'grammar-v2-a2-must-have-to-22-q9',
      kind: 'transform',
      prompt: 'Rewrite using "have to": "It is necessary for us to submit our tax declarations before April 30th."',
      options: [],
      acceptedAnswers: [
        { text: 'We have to submit our tax declarations before April 30th.', rationale: 'Expresses external legal necessity using We have to submit.' },
      ],
    },
    {
      id: 'grammar-v2-a2-must-have-to-22-q10',
      kind: 'transform',
      prompt: 'Rewrite using "had to": "It was necessary for Nam to visit the dental clinic yesterday afternoon."',
      options: [],
      acceptedAnswers: [
        { text: 'Nam had to visit the dental clinic yesterday afternoon.', rationale: 'Expresses past necessity using Nam had to visit.' },
      ],
    },
    {
      id: 'grammar-v2-a2-must-have-to-22-q11',
      kind: 'correction',
      prompt: 'Correct the error in this sentence: "You must to show your boarding pass at the departure gate."',
      options: [],
      acceptedAnswers: [
        { text: 'You must show your boarding pass at the departure gate.', rationale: 'Removes the incorrect particle to after modal verb must.' },
      ],
    },
    {
      id: 'grammar-v2-a2-must-have-to-22-q12',
      kind: 'correction',
      prompt: 'Correct the error in this sentence: "Last night I must study until 1 a.m. because of the mid-term exam."',
      options: [],
      acceptedAnswers: [
        { text: 'Last night I had to study until 1 a.m. because of the mid-term exam.', rationale: 'Replaces must with had to because must cannot refer to past obligation.' },
      ],
    },
  ],
  reviewExercises: [
    {
      id: 'grammar-v2-a2-must-have-to-22-r1',
      kind: 'choice',
      prompt: 'Choose the correct form: "Every foreign passenger ___ fill out an immigration arrival card."',
      options: [
        { text: 'has to', correct: true, rationale: 'Every foreign passenger là chủ ngữ số ít, quy tắc chính thức yêu cầu dùng has to.' },
        { text: 'have to', correct: false, rationale: 'Every đi với danh từ số ít nên không dùng have to.' },
        { text: 'must to', correct: false, rationale: 'Must không bao giờ đi kèm to.' },
      ],
      acceptedAnswers: [{ text: 'has to', rationale: 'Every foreign passenger is singular, requiring has to.' }],
    },
    {
      id: 'grammar-v2-a2-must-have-to-22-r2',
      kind: 'gap',
      prompt: 'Fill in the blank with the past form: "We _____ (have to) cancel our outdoor picnic last Saturday due to the typhoon."',
      options: [],
      acceptedAnswers: [
        { text: 'had to', rationale: 'Past obligation requires had to.' },
      ],
    },
    {
      id: 'grammar-v2-a2-must-have-to-22-r3',
      kind: 'transform',
      prompt: 'Rewrite as a question using "have to": "She has to attend the conference tomorrow."',
      options: [],
      acceptedAnswers: [
        { text: 'Does she have to attend the conference tomorrow?', rationale: 'Uses auxiliary Does with base form have to for third-person singular question.' },
      ],
    },
    {
      id: 'grammar-v2-a2-must-have-to-22-r4',
      kind: 'correction',
      prompt: 'Correct the error: "He musts take this prescription medicine three times a day."',
      options: [],
      acceptedAnswers: [
        { text: 'He must take this prescription medicine three times a day.', rationale: 'Removes the incorrect -s suffix from modal verb must.' },
      ],
    },
  ],
  outputPrompts: [
    {
      id: 'grammar-v2-a2-must-have-to-22-o1',
      prompt: 'Viết 2 câu về một nội quy tại trường học hoặc nơi làm việc của bạn, sử dụng "have to" hoặc "has to" để diễn tả quy định chung.',
      modelAnswer: 'All employees have to wear their company identity cards when entering the building. Our sales team also has to send a weekly progress report every Friday afternoon.',
      checks: [
        'Sử dụng đúng have to với chủ ngữ số nhiều hoặc has to với chủ ngữ số ít.',
        'Theo sau là động từ nguyên mẫu không chia.',
        'Diễn đạt một nội quy hoặc nghĩa vụ rõ ràng.',
      ],
    },
    {
      id: 'grammar-v2-a2-must-have-to-22-o2',
      prompt: 'Viết 2 câu kể về một việc bạn đã bắt buộc phải làm vào tuần trước, sử dụng cấu trúc "had to" để diễn tả sự bắt buộc trong quá khứ.',
      modelAnswer: 'Last Wednesday, I had to stay up late to finish my university assignment. The next morning, I had to wake up early to catch the first bus to campus.',
      checks: [
        'Dùng đúng had to + V-bare diễn đạt nghĩa vụ trong quá khứ.',
        'Có từ chỉ thời gian quá khứ (last Wednesday, the next morning).',
        'Ngữ pháp chuẩn xác, câu văn trôi chảy.',
      ],
    },
  ],
  sources: [
    {
      id: 'british-council-modals-obligation',
      title: 'British Council: Modals of obligation and necessity',
      url: 'https://learnenglish.britishcouncil.org/grammar/a1-a2-grammar/modals-must-have-to',
      claims: [
        'Must and have to are used to express obligation and necessity in the present.',
        'Must conveys internal, speaker-based obligation, while have to refers to external rules or requirements.',
        'Had to is used to express obligation in the past, as must has no past tense form.',
      ],
      checkedAt: '2026-10-05',
      provenance: 'reference-only',
    },
  ],
  review: {
    status: 'approved',
    mode: 'ai-internal',
    reviewer: 'Final review A2 curriculum.A2 audit west',
    reviewedAt: '2026-10-06T05:54:31Z',
  },
};

export default mustHaveToLesson;
