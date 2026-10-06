/**
 * @file must-not-vs-no-obligation.ts
 * @description A2 lesson contrasting prohibition ('must not' / 'mustn’t') with lack of obligation ('don’t have to' / 'doesn’t have to').
 */
import type { GrammarLesson } from '../../types.js';

const mustNotVsNoObligationLesson: GrammarLesson = {
  id: 'grammar-v2-a2-must-not-vs-no-obligation-23',
  revisionId: 'grammar-v2-a2-must-not-vs-no-obligation-23@1.0.0',
  revision: '1.0.0',
  title: 'Phân biệt Must not (Cấm đoán) và Don’t have to (Không bắt buộc) (Must Not vs. No Obligation)',
  objective: 'Phân biệt rạch ròi sự khác nhau cốt lõi giữa "must not / mustn’t" (lệnh cấm, không được phép làm) và "don’t / doesn’t have to" (không bắt buộc, tùy chọn, không cần thiết phải làm).',
  prerequisiteIds: ['grammar-v2-a2-must-have-to-22'],
  coverage: ['must-not-vs-no-obligation', 'modals', 'prohibition', 'no-obligation', 'must-not', 'dont-have-to'],
  context: {
    english: 'We use "must not" (mustn’t) to express prohibition — it is against the rules or dangerous. In contrast, "don’t have to" means there is no obligation — you can do it if you want, but it is not necessary.',
    vietnamese: 'Chúng ta sử dụng "must not" (mustn’t) để diễn tả lệnh cấm — hành động bị cấm theo quy định hoặc nguy hiểm. Ngược lại, "don’t have to" diễn tả sự không bắt buộc — bạn có thể làm nếu muốn, nhưng không cần thiết phải làm.',
  },
  guide: {
    pattern: 'Prohibition: S + must not / mustn’t + V-bare | No obligation: S + do/does not have to + V-bare | Past: S + did not have to + V-bare',
    whenToUse: [
      'Dùng "must not" (hoặc dạng rút gọn "mustn’t") khi một hành động hoàn toàn bị nghiêm cấm, trái pháp luật hoặc gây nguy hiểm (You mustn’t use your phone while driving).',
      'Dùng "don’t have to" / "doesn’t have to" khi hành động là tùy chọn, không bị ép buộc, người làm có quyền tự do lựa chọn (Tomorrow is a national holiday, so we don’t have to go to work).',
      'Ngôi thứ ba số ít dùng "doesn’t have to + V-bare" (She doesn’t have to cook dinner tonight because we are eating out).',
      'Trong quá khứ, diễn tả việc không cần thiết phải làm dùng "didn’t have to + V-bare" (I didn’t have to set an alarm yesterday morning).',
    ],
    signalWords: ["mustn't", 'must not', "don't have to", "doesn't have to", "didn't have to", 'not allowed', 'forbidden', 'optional', 'not necessary'],
    check: [
      'Phân biệt ý nghĩa: Mustn’t = CẤM LÀM (bắt buộc KHÔNG được làm). Don’t have to = KHÔNG CẦN LÀM (làm hay không tùy bạn).',
      'Sau mustn’t là động từ nguyên mẫu không có "to" (mustn’t touch, không phải mustn’t to touch).',
      'Sau don’t/doesn’t have to bắt buộc phải có từ "to" trước động từ chính (don’t have to pay, không phải don’t have pay).',
      'Chủ ngữ he/she/it dùng trợ động từ doesn’t kết hợp với dạng nguyên thể have to (doesn’t have to, không viết doesn’t has to).',
    ],
  },
  explanation: 'Sự khác biệt giữa "must not" và "don’t have to" là một trong những điểm ngữ pháp thường gây nhầm lẫn nhất ở trình độ A2. Trong khi ở thể khẳng định "must" và "have to" đều chỉ sự bắt buộc, thì ở thể phủ định ý nghĩa của chúng rẽ sang hai hướng hoàn toàn đối lập. "Must not" (thường viết tắt là "mustn’t") mang sắc thái cấm đoán tuyệt đối (prohibition). Khi nói "You mustn’t park your car here", điều đó có nghĩa việc đỗ xe bị cấm theo luật hoặc biển báo; nếu bạn đỗ xe ở đây, bạn sẽ bị phạt hoặc gây nguy hiểm. Ngược lại, "don’t have to" (hoặc "doesn’t have to" với ngôi thứ ba số ít) chỉ sự thiếu vắng nghĩa vụ (absence of obligation / no necessity). Khi nói "You don’t have to wash the dishes", điều đó có nghĩa bạn không có bổn phận phải rửa bát; tuy nhiên, nếu bạn vẫn muốn rửa giúp thì điều đó hoàn toàn được phép và không bị ai ngăn cấm. Để diễn tả việc không bắt buộc trong quá khứ, ta dùng "didn’t have to": "We didn’t have to wait in line because we had pre-booked our tickets online."',
  examples: [
    {
      english: 'You mustn’t take photographs inside the historical military museum.',
      vietnamese: 'Bạn không được phép chụp ảnh bên trong bảo tàng quân sự lịch sử (đây là lệnh cấm).',
    },
    {
      english: 'You don’t have to buy a ticket for children under five years old; admission is free.',
      vietnamese: 'Bạn không cần phải mua vé cho trẻ em dưới năm tuổi; vé vào cửa là miễn phí.',
    },
    {
      english: 'Passengers mustn’t cross the railway tracks when the red warning signal is flashing.',
      vietnamese: 'Hành khách tuyệt đối không được băng qua đường ray khi đèn tín hiệu cảnh báo màu đỏ đang nhấp nháy.',
    },
    {
      english: 'Lan doesn’t have to cook tonight because our department is going to a restaurant.',
      vietnamese: 'Lan không phải nấu cơm tối nay vì phòng ban của chúng tôi sẽ đi ăn nhà hàng.',
    },
    {
      english: 'We didn’t have to wake up early last Sunday, so we stayed in bed until nine.',
      vietnamese: 'Chúng tôi đã không phải thức dậy sớm vào Chủ nhật tuần trước, nên chúng tôi đã ngủ nướng tới chín giờ.',
    },
    {
      english: 'You mustn’t tell anyone about this secret surprise party for our teacher.',
      vietnamese: 'Bạn tuyệt đối không được nói cho bất kỳ ai biết về bữa tiệc bất ngờ bí mật này dành cho giáo viên của chúng ta.',
    },
  ],
  contrasts: [
    {
      form: 'You mustn’t touch that electric wire; it is extremely dangerous!',
      whyFits: 'Mustn’t diễn tả lệnh cấm tuyệt đối vì hành động chạm vào dây điện gây nguy hiểm tính mạng.',
      whyNot: '"You don’t have to touch that wire..." sai nghiêm trọng vì câu này có nghĩa "bạn không cần chạm, nhưng chạm cũng chẳng sao".',
    },
    {
      form: 'You don’t have to wear a formal business suit; smart casual clothes are fine.',
      whyFits: 'Don’t have to diễn đạt sự không bắt buộc về trang phục, người mặc có quyền lựa chọn.',
      whyNot: '"You mustn’t wear a formal suit..." sai vì nó mang nghĩa cấm mặc đồ vest, trong khi ngữ cảnh chỉ là không bắt buộc.',
    },
  ],
  commonMistakes: [
    'Dùng "mustn’t" khi chỉ muốn nói "không cần thiết" (viết "You mustn’t come if you are busy" thay vì "You don’t have to come").',
    'Dùng "doesn’t has to" thay vì "doesn’t have to" (sau trợ động từ doesn’t, động từ have phải trở về nguyên thể).',
    'Bỏ quên "to" sau don’t have (viết "We don’t have wake up early" thay vì "don’t have to wake up early").',
  ],
  summary: 'Mustn’t = cấm/không được phép làm. Don’t/doesn’t have to = không bắt buộc, không cần làm. Quá khứ của no obligation dùng didn’t have to.',
  exercises: [
    {
      id: 'grammar-v2-a2-must-not-vs-no-obligation-23-q1',
      kind: 'choice',
      prompt: 'Select the right form for a strict safety prohibition: "You ___ swim in this lake; there are dangerous whirlpools."',
      options: [
        { text: 'mustn’t', correct: true, rationale: 'Mustn’t diễn tả lệnh cấm nghiêm ngặt vì sự an toàn tính mạng khi có xoáy nước nguy hiểm.' },
        { text: 'don’t have to', correct: false, rationale: 'Don’t have to chỉ mang nghĩa không bắt buộc bơi, sai hoàn toàn tính chất cảnh báo nguy hiểm.' },
        { text: 'needn’t to', correct: false, rationale: 'Needn’t không đi kèm to và không diễn tả lệnh cấm an toàn.' },
        { text: 'haven’t to', correct: false, rationale: 'Haven’t to không phải là cấu trúc chuẩn trong tiếng Anh hiện đại.' },
      ],
      acceptedAnswers: [{ text: 'mustn’t', rationale: 'Mustn’t expresses strict prohibition due to life danger.' }],
    },
    {
      id: 'grammar-v2-a2-must-not-vs-no-obligation-23-q2',
      kind: 'choice',
      prompt: 'Choose the correct form for absence of necessity: "Tomorrow is Saturday, so my father ___ go to the office."',
      options: [
        { text: 'doesn’t have to', correct: true, rationale: 'Chủ ngữ my father là ngôi thứ ba số ít, diễn tả việc không bắt buộc phải đi làm vào thứ Bảy.' },
        { text: 'mustn’t', correct: false, rationale: 'Mustn’t diễn tả lệnh cấm bị cấm đến công ty, không phù hợp ngữ cảnh ngày nghỉ.' },
        { text: 'don’t have to', correct: false, rationale: 'Don’t have to không dùng cho chủ ngữ số ít my father.' },
        { text: 'doesn’t has to', correct: false, rationale: 'Sau trợ động từ doesn’t, have to phải ở dạng nguyên thể, không dùng has to.' },
      ],
      acceptedAnswers: [{ text: 'doesn’t have to', rationale: 'Doesn’t have to indicates lack of obligation for a third-person singular subject.' }],
    },
    {
      id: 'grammar-v2-a2-must-not-vs-no-obligation-23-q3',
      kind: 'choice',
      prompt: 'Select the correct sentence for hospital rules: "Visitors ___ make loud noises in the intensive care unit."',
      options: [
        { text: 'must not', correct: true, rationale: 'Must not diễn đạt quy định cấm làm ồn trong phòng hồi sức tích cực của bệnh viện.' },
        { text: 'do not have to', correct: false, rationale: 'Do not have to chỉ có nghĩa không cần thiết làm ồn, không mang tính chất nội quy cấm.' },
        { text: 'must not to', correct: false, rationale: 'Must not không đi cùng giới từ to.' },
        { text: 'are not having to', correct: false, rationale: 'Không dùng dạng tiếp diễn are not having to cho nội quy cấm.' },
      ],
      acceptedAnswers: [{ text: 'must not', rationale: 'Must not expresses an official hospital rule forbidding loud noise.' }],
    },
    {
      id: 'grammar-v2-a2-must-not-vs-no-obligation-23-q4',
      kind: 'choice',
      prompt: 'Select the option meaning "it is not necessary": "The museum entrance is free on Thursdays, so you ___ pay."',
      options: [
        { text: 'don’t have to', correct: true, rationale: 'Don’t have to diễn tả việc không phải trả tiền vé vì vào cửa miễn phí.' },
        { text: 'mustn’t', correct: false, rationale: 'Mustn’t có nghĩa là cấm trả tiền, không phù hợp.' },
        { text: 'must not to', correct: false, rationale: 'Must not không đi cùng to.' },
        { text: 'haven’t got to', correct: false, rationale: 'Ít tự nhiên hơn và dễ gây nhầm lẫn ở cấp độ A2 so với don’t have to.' },
      ],
      acceptedAnswers: [{ text: 'don’t have to', rationale: 'Don’t have to expresses absence of obligation because entry is free.' }],
    },
    {
      id: 'grammar-v2-a2-must-not-vs-no-obligation-23-q5',
      kind: 'gap',
      prompt: 'Fill in the blank with "mustn\'t" or "don\'t have to": "You _____ smoke anywhere inside the petrol station; it is extremely dangerous."',
      options: [],
      acceptedAnswers: [
        { text: "mustn't", rationale: 'Strict prohibition due to fire explosion hazard.' },
        { text: 'must not', rationale: 'Uncontracted form must not is equally correct.' },
      ],
    },
    {
      id: 'grammar-v2-a2-must-not-vs-no-obligation-23-q6',
      kind: 'gap',
      prompt: 'Fill in the blank with the negative form of "have to": "She _____ (not / have to) finish all the exercises today; the teacher said they are due next week."',
      options: [],
      acceptedAnswers: [
        { text: "doesn't have to", rationale: 'Third-person singular lack of obligation with doesn’t have to.' },
        { text: 'does not have to', rationale: 'Uncontracted does not have to is accepted.' },
      ],
    },
    {
      id: 'grammar-v2-a2-must-not-vs-no-obligation-23-q7',
      kind: 'gap',
      prompt: 'Fill in the blank with the past form: "Last year, students _____ (not / have to) wear masks in outdoor physical education classes."',
      options: [],
      acceptedAnswers: [
        { text: "didn't have to", rationale: 'Past lack of obligation using didn’t have to.' },
        { text: 'did not have to', rationale: 'Uncontracted did not have to is accepted.' },
      ],
    },
    {
      id: 'grammar-v2-a2-must-not-vs-no-obligation-23-q8',
      kind: 'gap',
      prompt: 'Fill in the blank with "mustn\'t" or "don\'t have to": "You _____ bring food to the party because the host has prepared plenty of dishes, but you can if you like."',
      options: [],
      acceptedAnswers: [
        { text: "don't have to", rationale: 'Absence of obligation where bringing food is optional.' },
        { text: 'do not have to', rationale: 'Uncontracted do not have to is accepted.' },
      ],
    },
    {
      id: 'grammar-v2-a2-must-not-vs-no-obligation-23-q9',
      kind: 'transform',
      prompt: 'Rewrite using "mustn\'t": "It is strictly forbidden for visitors to feed the zoo animals."',
      options: [],
      acceptedAnswers: [
        { text: "Visitors mustn't feed the zoo animals.", rationale: 'Expresses strict prohibition using mustn’t + bare infinitive feed.' },
        { text: 'Visitors must not feed the zoo animals.', rationale: 'Uncontracted must not feed the zoo animals is accepted.' },
      ],
    },
    {
      id: 'grammar-v2-a2-must-not-vs-no-obligation-23-q10',
      kind: 'transform',
      prompt: 'Rewrite using "do not have to": "It is not necessary for you to wash the dishes right now."',
      options: [],
      acceptedAnswers: [
        { text: 'You do not have to wash the dishes right now.', rationale: 'Rewrites lack of necessity using You do not have to wash.' },
        { text: "You don't have to wash the dishes right now.", rationale: "Contraction don't have to is accepted." },
      ],
    },
    {
      id: 'grammar-v2-a2-must-not-vs-no-obligation-23-q11',
      kind: 'correction',
      prompt: 'Correct the error in this sentence: "Tomorrow is Sunday, so I mustn’t wake up early."',
      options: [],
      acceptedAnswers: [
        { text: "Tomorrow is Sunday, so I don't have to wake up early.", rationale: 'Replaces mustn’t (forbidden) with don’t have to (not necessary).' },
        { text: 'Tomorrow is Sunday, so I do not have to wake up early.', rationale: 'Uncontracted do not have to is accepted.' },
      ],
    },
    {
      id: 'grammar-v2-a2-must-not-vs-no-obligation-23-q12',
      kind: 'correction',
      prompt: 'Correct the error in this sentence: "Nam doesn’t has to wear a uniform on casual Fridays."',
      options: [],
      acceptedAnswers: [
        { text: "Nam doesn't have to wear a uniform on casual Fridays.", rationale: 'Corrects doesn’t has to to doesn’t have to (bare infinitive have after doesn’t).' },
        { text: 'Nam does not have to wear a uniform on casual Fridays.', rationale: 'Uncontracted does not have to is accepted.' },
      ],
    },
  ],
  reviewExercises: [
    {
      id: 'grammar-v2-a2-must-not-vs-no-obligation-23-r1',
      kind: 'choice',
      prompt: 'Choose the correct option: "You ___ touch the museum paintings; you will be fined immediately if you do."',
      options: [
        { text: 'must not', correct: true, rationale: 'Must not thể hiện quy định cấm chạm vào hiện vật với hình phạt nếu vi phạm.' },
        { text: 'do not have to', correct: false, rationale: 'Do not have to chỉ có nghĩa không cần thiết chạm, sai ý cấm hoàn toàn.' },
        { text: 'must not to', correct: false, rationale: 'Must not không đi cùng to.' },
      ],
      acceptedAnswers: [{ text: 'must not', rationale: 'Must not indicates strict prohibition backed by fines.' }],
    },
    {
      id: 'grammar-v2-a2-must-not-vs-no-obligation-23-r2',
      kind: 'gap',
      prompt: 'Fill in the blank with "mustn\'t" or "doesn\'t have to": "She _____ work on Saturdays because her company operates five days a week."',
      options: [],
      acceptedAnswers: [
        { text: "doesn't have to", rationale: 'Expresses lack of obligation for work schedule.' },
        { text: 'does not have to', rationale: 'Uncontracted does not have to is accepted.' },
      ],
    },
    {
      id: 'grammar-v2-a2-must-not-vs-no-obligation-23-r3',
      kind: 'transform',
      prompt: 'Rewrite using "don’t have to": "It is optional for participants to bring their own laptops to the workshop."',
      options: [],
      acceptedAnswers: [
        { text: "Participants don't have to bring their own laptops to the workshop.", rationale: 'Expresses lack of obligation using don’t have to bring.' },
        { text: 'Participants do not have to bring their own laptops to the workshop.', rationale: 'Uncontracted do not have to is accepted.' },
      ],
    },
    {
      id: 'grammar-v2-a2-must-not-vs-no-obligation-23-r4',
      kind: 'correction',
      prompt: 'Correct the error: "You mustn’t pay for the water; it is completely free of charge."',
      options: [],
      acceptedAnswers: [
        { text: "You don't have to pay for the water; it is completely free of charge.", rationale: 'Replaces prohibition mustn’t with absence of obligation don’t have to.' },
        { text: 'You do not have to pay for the water; it is completely free of charge.', rationale: 'Uncontracted do not have to is accepted.' },
      ],
    },
  ],
  outputPrompts: [
    {
      id: 'grammar-v2-a2-must-not-vs-no-obligation-23-o1',
      prompt: 'Viết 2 câu nêu quy định an toàn tại một hồ bơi hoặc thư viện, dùng "mustn’t" cho điều bị cấm và "don’t have to" cho điều không bắt buộc.',
      modelAnswer: 'Swimmers mustn’t dive into the shallow end of the swimming pool. However, you don’t have to wear a professional swimming cap if your hair is tied back.',
      checks: [
        'Dùng mustn’t diễn đạt lệnh cấm vì an toàn.',
        'Dùng don’t have to diễn đạt điều không bắt buộc.',
        'Động từ theo sau ở dạng nguyên mẫu không to.',
      ],
    },
    {
      id: 'grammar-v2-a2-must-not-vs-no-obligation-23-o2',
      prompt: 'Viết 2 câu kể về ngày nghỉ cuối tuần của bạn, dùng "don’t have to" (hoặc "didn’t have to") để nói về việc bạn không cần phải làm.',
      modelAnswer: 'On Sunday mornings, I don’t have to set an early alarm clock. Last weekend, I didn’t have to prepare lunch because my family visited a seafood restaurant.',
      checks: [
        'Sử dụng don’t have to cho thói quen hiện tại hoặc didn’t have to cho quá khứ.',
        'Thể hiện rõ ý nghĩa không bắt buộc / không cần thiết.',
        'Câu văn gãy gọn, ngữ pháp chính xác.',
      ],
    },
  ],
  sources: [
    {
      id: 'cambridge-mustn-t-dont-have-to',
      title: 'Cambridge Dictionary: Mustn’t vs Don’t have to',
      url: 'https://dictionary.cambridge.org/grammar/british-grammar/must-have-to',
      claims: [
        'Must not (mustn’t) expresses prohibition, meaning that something is not allowed or forbidden.',
        'Do not have to (don’t have to) expresses lack of obligation, meaning that something is not necessary but optional.',
        'Confusion between prohibition and absence of obligation is a frequent learner error.',
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

export default mustNotVsNoObligationLesson;
