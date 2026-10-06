/**
 * @file past-modal-deduction.ts
 * @description Lesson: Động từ khuyết thiếu suy đoán ở quá khứ (Past Modal Deduction).
 */
import type { GrammarLesson } from '../../types.js';

const lesson: GrammarLesson = {
  id: 'grammar-v2-b2-past-modal-deduction-12',
  revisionId: 'grammar-v2-b2-past-modal-deduction-12@1.0.0',
  revision: '1.0.0',
  title: 'Động từ khuyết thiếu suy đoán ở quá khứ (Past Modal Deduction)',
  objective: 'Nắm vững cách sử dụng các modal verbs kết hợp với have + V3/ed (must have, can\'t have, couldn\'t have, might have, may have, could have) để đưa ra suy đoán logic hồi cố về các sự việc đã diễn ra trong quá khứ dựa trên manh mối hoặc bằng chứng hiện hữu.',
  prerequisiteIds: ['grammar-v2-b2-present-modal-deduction-11'],
  coverage: ['past-modal-deduction', 'must-have-done', 'cant-have-done', 'could-have-done', 'past-logical-deduction', 'b2-grammar'],
  context: {
    english: 'Evaluating the charred telemetry modules salvaged from the deep-sea wreckage, aviation investigators determined that the backup avionics must have sustained catastrophic power failure prior to the aircraft\'s descent.',
    vietnamese: 'Đánh giá các mô-đun đo xa bị cháy đen được vớt lên từ xác tàu dưới biển sâu, các nhà điều tra hàng không xác định rằng hệ thống điện tử hàng không dự phòng chắc hẳn đã bị sập nguồn thảm khốc trước khi máy bay hạ độ cao.',
  },
  guide: {
    pattern: 'S + must / can\'t / couldn\'t / might / may / could + have + V3/ed (hoặc have been + V-ing)',
    whenToUse: [
      'Dùng "must have + V3" để đưa ra suy luận khẳng định mạnh về quá khứ dựa trên bằng chứng.',
      'Dùng "cannot have + V3" hoặc "could not have + V3" để nói sự việc khó hoặc không thể đã xảy ra theo đánh giá của người nói.',
      'Dùng "might have", "may have" hoặc "could have + V3" để nêu khả năng chưa chắc chắn; sắc thái tùy ngữ cảnh.',
      'Suy đoán một hành động liên tục trong quá khứ: dùng "modal + have been + V-ing" (ví dụ: They must have been sleeping when the storm hit).',
    ],
    signalWords: ['surely', 'undoubtedly', 'it is impossible that', 'must have been', 'couldn\'t have done', 'traces show that'],
    check: [
      'Đã dùng have + V3 (hoặc have been + V-ing) sau modal verb chưa? (không dùng had hay V2)',
      'Phủ định của "must have done" trong suy đoán là "can\'t have done" hoặc "couldn\'t have done" (tuyệt đối không dùng mustn\'t have done).',
      'Phân biệt rõ suy đoán "must have done" với lời chỉ trích "should have done".',
    ],
  },
  explanation: 'Suy đoán logic về quá khứ (Past Modal Deduction) được thiết lập bằng công thức: Modal Verb + have + V3/ed.\nCác mức độ chắc chắn:\n1. Chắc chắn khẳng định: MUST HAVE + V3\n   - "The ground is soaked with puddles; it must have rained heavily last night." (Mặt đất đầy vũng nước -> chắc hẳn đêm qua trời đã mưa to).\n2. Chắc chắn phủ định / Bất khả thi: CAN\'T HAVE / COULDN\'T HAVE + V3\n   - "He was in hospital all day yesterday; he can\'t have committed the robbery." (Hôm qua anh ta nằm viện cả ngày -> anh ta chắc chắn không thể nào đã phạm tội trộm cắp).\n   - TUYỆT ĐỐI TRÁNH: Không dùng "mustn\'t have done" để suy đoán phủ định trong tiếng Anh chuẩn mực.\n3. Khả năng chưa chắc chắn: MAY / MIGHT / COULD HAVE + V3\n   - "The package hasn\'t arrived; the courier might have delivered it to the wrong address." (Bưu kiện chưa đến -> có thể người giao hàng đã giao nhầm địa chỉ).\n4. Dạng tiếp diễn trong quá khứ: "He didn\'t hear the fire alarm; he must have been wearing noise-canceling headphones."',
  examples: [
    {
      english: 'The safe was unlocked without any physical scratches; the thief must have known the combination code.',
      vietnamese: 'Két sắt đã được mở mà không hề có vết trầy xước vật lý nào; kẻ trộm chắc hẳn đã biết mật mã.',
    },
    {
      english: 'She couldn\'t have boarded the express train to Munich because her passport was left on my kitchen table.',
      vietnamese: 'Cô ấy chắc chắn không thể nào đã lên chuyến tàu tốc hành đi Munich vì hộ chiếu của cô ấy bị bỏ quên trên bàn bếp của tôi.',
    },
    {
      english: 'The ancient archeological settlement was abandoned abruptly; a sudden volcanic eruption might have triggered the evacuation.',
      vietnamese: 'Khu định cư khảo cổ cổ đại bị bỏ hoang đột ngột; một vụ phun trào núi lửa bất ngờ có lẽ đã kích hoạt cuộc sơ tán.',
    },
    {
      english: 'The delivery driver didn\'t answer the intercom; he could have been unloading parcels at the neighboring warehouse.',
      vietnamese: 'Tài xế giao hàng đã không trả lời chuông cửa; anh ta có thể lúc đó đang bốc dỡ hàng tại kho láng giềng.',
    },
    {
      english: 'They can\'t have finished evaluating three hundred comprehensive exam papers in just two hours.',
      vietnamese: 'Họ chắc chắn không thể nào đã chấm xong ba trăm bài thi toàn diện chỉ trong vỏn vẹn hai tiếng đồng hồ.',
    },
    {
      english: 'His voice was trembling and his jacket was torn; he must have experienced a terrifying confrontation in the alley.',
      vietnamese: 'Giọng anh ấy run rẩy và áo khoác bị rách; chắc hẳn anh ấy vừa trải qua một cuộc đối đầu kinh hoàng trong con hẻm.',
    },
  ],
  contrasts: [
    {
      form: 'must have done vs should have done',
      whyFits: '"He must have forgotten the appointment" đưa ra phán đoán logic dựa trên việc anh ấy vắng mặt (chắc hẳn anh ấy đã quên).',
      whyNot: '"He should have remembered the appointment" là lời trách móc hoặc chỉ trích vì hành vi không nhớ lịch hẹn (lẽ ra anh ấy phải nhớ).',
    },
    {
      form: 'can\'t have done vs could have done',
      whyFits: '"He can\'t have solved the puzzle alone" khẳng định việc đó là bất khả thi (chắc chắn anh ta không thể nào tự giải được).',
      whyNot: '"He could have solved the puzzle alone" khẳng định anh ta có khả năng/cơ hội làm được điều đó trong quá khứ, dù thực tế có thể anh ta đã nhờ người khác.',
    },
  ],
  commonMistakes: [
    'Dùng mustn\'t have done thay cho can\'t have done trong suy đoán phủ định quá khứ: viết "He mustn\'t have seen the email" thay vì "He can\'t/couldn\'t have seen the email".',
    'Dùng had thay cho have sau modal verb: viết "He must had been tired" thay vì "He must have been tired".',
    'Nhầm lẫn giữa suy đoán logic (must have done) và nghĩa vụ lẽ ra nên làm (should have done).',
  ],
  summary: 'Past modal deduction dùng modal + have + V3. Must have thường nêu suy luận khẳng định mạnh; cannot/could not have nêu suy luận phủ định mạnh; may/might/could have nêu khả năng. Độ chắc chắn tùy ngữ cảnh.',
  exercises: [
    {
      id: 'grammar-v2-b2-past-modal-deduction-12-q1',
      kind: 'choice',
      prompt: 'The streets are completely covered in wet golden leaves and broken branches; a severe gale ___ through the city last night.',
      options: [
        { text: 'must have swept', correct: true, rationale: 'Bằng chứng cành cây gãy và lá rải đầy đường chứng minh chắc chắn cơn bão đã quét qua (must have swept).' },
        { text: 'can have swept', correct: false, rationale: 'Can have V3 không dùng trong suy đoán logic khẳng định quá khứ.' },
        { text: 'must sweep', correct: false, rationale: 'must sweep chỉ suy đoán hiện tại, không phù hợp với mốc "last night".' },
      ],
      acceptedAnswers: [{ text: 'must have swept', rationale: 'must have swept thể hiện suy đoán logic chắc chắn về sự việc quá khứ.' }],
    },
    {
      id: 'grammar-v2-b2-past-modal-deduction-12-q2',
      kind: 'choice',
      prompt: 'Given Ethan was on a live webinar at home during the burglary, choose the strongest negative deduction about whether he entered the company archives yesterday:',
      options: [
        { text: 'couldn\'t have broken into', correct: true, rationale: 'Có bằng chứng ngoại phạm chắc chắn (đang phát webinar) nên dùng couldn\'t have broken into (hoặc can\'t have).' },
        { text: 'must not have broken into', correct: false, rationale: 'Must not have can express a past prohibition, but it does not give the intended negative deduction; use could not have or cannot have.' },
        { text: 'might not have broken into', correct: false, rationale: 'might not chỉ mức độ do dự, không phản ánh được chứng cứ ngoại phạm tuyệt đối.' },
      ],
      acceptedAnswers: [{ text: 'couldn\'t have broken into', rationale: 'couldn\'t have broken into thể hiện kết luận bất khả thi về hành động quá khứ.' }],
    },
    {
      id: 'grammar-v2-b2-past-modal-deduction-12-q3',
      kind: 'choice',
      prompt: 'The hiker\'s phone battery was dead, so he ___ the rescue team for directions when the blizzard struck.',
      options: [
        { text: 'can\'t have contacted', correct: true, rationale: 'Điện thoại hết pin đồng nghĩa với việc không thể nào đã liên lạc được (can\'t have contacted).' },
        { text: 'must have contacted', correct: false, rationale: 'Ngược nghĩa hoàn toàn với logic pin hết.' },
        { text: 'should have contacted', correct: false, rationale: 'should have contacted là lời khuyên/trách móc, không phù hợp với ngữ cảnh phân tích nguyên nhân bất khả thi.' },
      ],
      acceptedAnswers: [{ text: 'can\'t have contacted', rationale: 'can\'t have contacted khẳng định tính bất khả thi của hành động liên lạc.' }],
    },
    {
      id: 'grammar-v2-b2-past-modal-deduction-12-q4',
      kind: 'choice',
      prompt: 'Select the sentence that wrongly uses must not have to express a negative deduction:',
      options: [
        { text: 'The missing manuscript was published posthumously, so the author must not have destroyed it before dying.', correct: true, rationale: 'The form is grammatical for a prohibition, but it is not the usual form for negative deduction; use cannot have destroyed or could not have destroyed.' },
        { text: 'The missing manuscript was published posthumously, so the author can\'t have destroyed it before dying.', correct: false, rationale: 'Câu này đúng chuẩn ngữ pháp suy đoán phủ định quá khứ.' },
        { text: 'The author must have entrusted the manuscript to a loyal editor.', correct: false, rationale: 'Câu này đúng chuẩn suy đoán khẳng định quá khứ.' },
      ],
      acceptedAnswers: [{ text: 'The missing manuscript was published posthumously, so the author must not have destroyed it before dying.', rationale: 'Use cannot have or could not have for the intended negative deduction; must not have can instead express a prohibition.' }],
    },
    {
      id: 'grammar-v2-b2-past-modal-deduction-12-q5',
      kind: 'gap',
      prompt: 'All the conference badges were claimed before 9 AM; the international attendees ___ (arrive) very early.',
      options: [],
      acceptedAnswers: [{ text: 'must have arrived', rationale: 'must have arrived thể hiện suy đoán chắc chắn người tham dự đã đến rất sớm.' }],
    },
    {
      id: 'grammar-v2-b2-past-modal-deduction-12-q6',
      kind: 'gap',
      prompt: 'He had no internet access on the transatlantic flight, so he ___ (not send) that urgent wire transfer yesterday.',
      options: [],
      acceptedAnswers: [
        { text: 'couldn\'t have sent', rationale: 'couldn\'t have sent khẳng định sự bất khả thi của việc gửi tiền.' },
        { text: 'can\'t have sent', rationale: 'can\'t have sent khẳng định sự bất khả thi của việc gửi tiền.' },
      ],
    },
    {
      id: 'grammar-v2-b2-past-modal-deduction-12-q7',
      kind: 'gap',
      prompt: 'The forensic report notes that the fire was not electrical; an accelerant ___ (ignite) the blaze.',
      options: [],
      acceptedAnswers: [
        { text: 'might have ignited', rationale: 'might have ignited thể hiện khả năng có thể xảy ra trong quá khứ.' },
        { text: 'may have ignited', rationale: 'may have ignited thể hiện khả năng trong quá khứ.' },
        { text: 'could have ignited', rationale: 'could have ignited thể hiện khả năng trong quá khứ.' },
      ],
    },
    {
      id: 'grammar-v2-b2-past-modal-deduction-12-q8',
      kind: 'gap',
      prompt: 'The night watchman didn\'t hear the intruders; he ___ (sleep) soundly in the guard booth during the patrol round.',
      options: [],
      acceptedAnswers: [{ text: 'must have been sleeping', rationale: 'must have been sleeping suy đoán hành động chắc chắn đang ngủ say lúc đó.' }],
    },
    {
      id: 'grammar-v2-b2-past-modal-deduction-12-q9',
      kind: 'transform',
      prompt: 'I am certain that the delivery driver dropped the fragile parcel down the stairs. -> The delivery driver ___ the fragile parcel down the stairs.',
      options: [],
      acceptedAnswers: [
        { text: 'must have dropped', rationale: 'Dùng must have dropped để diễn tả sự chắc chắn về hành động quá khứ.' },
      ],
    },
    {
      id: 'grammar-v2-b2-past-modal-deduction-12-q10',
      kind: 'transform',
      prompt: 'It is utterly impossible that the junior accountant embezzled millions of dollars alone. -> The junior accountant ___ millions of dollars alone.',
      options: [],
      acceptedAnswers: [
        { text: 'can\'t have embezzled', rationale: 'Dùng can\'t have embezzled để diễn tả kết luận bất khả thi về quá khứ.' },
        { text: 'couldn\'t have embezzled', rationale: 'Dùng couldn\'t have embezzled.' },
        { text: 'cannot have embezzled', rationale: 'Dạng trang trọng cannot have embezzled.' },
      ],
    },
    {
      id: 'grammar-v2-b2-past-modal-deduction-12-q11',
      kind: 'correction',
      prompt: 'Sửa lỗi sai dùng had sau modal verb: "The doctor must had realized the allergic reaction immediately."',
      options: [],
      acceptedAnswers: [
        { text: 'The doctor must have realized the allergic reaction immediately.', rationale: 'Sau modal verb luôn là nguyên mẫu "have", không bao giờ dùng "had".' },
      ],
    },
    {
      id: 'grammar-v2-b2-past-modal-deduction-12-q12',
      kind: 'correction',
      prompt: 'Sửa lỗi dùng mustn\'t have trong suy đoán phủ định: "The security cameras show an empty hallway; the suspect mustn\'t have escaped through the front entrance."',
      options: [],
      acceptedAnswers: [
        { text: 'The security cameras show an empty hallway; the suspect couldn\'t have escaped through the front entrance.', rationale: 'Thay "mustn\'t have escaped" bằng "couldn\'t have escaped" hoặc "can\'t have escaped".' },
        { text: 'The security cameras show an empty hallway; the suspect can\'t have escaped through the front entrance.', rationale: 'Dùng can\'t have escaped.' },
      ],
    },
  ],
  reviewExercises: [
    {
      id: 'grammar-v2-b2-past-modal-deduction-12-r1',
      kind: 'choice',
      prompt: 'The ancient scroll exhibits extensive water damage; it ___ stored in a damp vault for centuries.',
      options: [
        { text: 'must have been', correct: true, rationale: 'Bằng chứng nước ngấm hư hại cho thấy cuộn giấy chắc chắn đã bị cất trong hầm ẩm ướt (must have been).' },
        { text: 'can have been', correct: false, rationale: 'Không dùng can have been trong suy đoán khẳng định.' },
        { text: 'should have been', correct: false, rationale: 'should have been chỉ sự việc lẽ ra nên làm, sai ngữ cảnh suy đoán logic.' },
      ],
      acceptedAnswers: [{ text: 'must have been', rationale: 'must have been thể hiện phán đoán chắc chắn dựa trên dấu vết hư hại.' }],
    },
    {
      id: 'grammar-v2-b2-past-modal-deduction-12-r2',
      kind: 'gap',
      prompt: 'Sophia was presenting at the international conference in Boston all yesterday; she ___ (not attend) the departmental workshop in London.',
      options: [],
      acceptedAnswers: [
        { text: 'couldn\'t have attended', rationale: 'couldn\'t have attended thể hiện tính bất khả thi do ở Boston.' },
        { text: 'can\'t have attended', rationale: 'can\'t have attended thể hiện tính bất khả thi.' },
      ],
    },
    {
      id: 'grammar-v2-b2-past-modal-deduction-12-r3',
      kind: 'transform',
      prompt: 'Perhaps the archeological expedition uncovered a secondary burial chamber. -> The archeological expedition ___ a secondary burial chamber.',
      options: [],
      acceptedAnswers: [
        { text: 'might have uncovered', rationale: 'Dùng might have uncovered để suy đoán khả năng quá khứ.' },
        { text: 'may have uncovered', rationale: 'Dùng may have uncovered.' },
        { text: 'could have uncovered', rationale: 'Dùng could have uncovered.' },
      ],
    },
    {
      id: 'grammar-v2-b2-past-modal-deduction-12-r4',
      kind: 'correction',
      prompt: 'Sửa lỗi phân từ hai: "The detectives concluded that the burglar must have took the jewelry through the skylight."',
      options: [],
      acceptedAnswers: [
        { text: 'The detectives concluded that the burglar must have taken the jewelry through the skylight.', rationale: 'Sau must have phải là quá khứ phân từ V3 (taken), không dùng dạng quá khứ đơn took.' },
      ],
    },
  ],
  outputPrompts: [
    {
      id: 'grammar-v2-b2-past-modal-deduction-12-o1',
      prompt: 'Viết 2 câu tiếng Anh ngắn đưa ra suy đoán về nguyên nhân của một sự cố trong quá khứ (ví dụ: mất điện, máy bay trễ, hỏng thiết bị): 1 câu dùng "must have + V3" và 1 câu dùng "couldn\'t have / can\'t have + V3" dựa trên manh mối cụ thể.',
      modelAnswer: 'The server room circuit breaker was completely melted, so an acute power surge must have struck the building last night. The backup battery can\'t have functioned properly because the cooling fans failed simultaneously.',
      checks: [
        'Câu thứ nhất dùng must have + V3 với bằng chứng cụ thể',
        'Câu thứ hai dùng can\'t have / couldn\'t have + V3 để loại trừ khả năng bất khả thi',
        'Phối hợp thì và ngữ pháp chuẩn xác',
      ],
    },
    {
      id: 'grammar-v2-b2-past-modal-deduction-12-o2',
      prompt: 'Viết 1 câu tiếng Anh suy đoán về một hành động liên tục đang diễn ra trong quá khứ bằng cấu trúc "must have been + V-ing" khi một sự kiện khác ập tới.',
      modelAnswer: 'The laboratory technicians did not hear the evacuation siren; the machinery was still running at full volume, so they must have been operating the acoustic testing equipment.',
      checks: [
        'Sử dụng cấu trúc must have been + V-ing',
        'Giải thích hợp lý lý do một hành động quá khứ không được nhận biết',
        'Câu văn mạch lạc, đúng văn phong B2',
      ],
    },
  ],
  sources: [
    {
      id: 'cambridge-modals-past-deduction',
      title: 'Cambridge Grammar: Modals - deduction in the past',
      url: 'https://dictionary.cambridge.org/grammar/british-grammar/modals-deduction',
      claims: ['Must have expresses deduction about past certainty; cannot have and could not have express negative certainty.'],
      checkedAt: '2026-10-05',
      provenance: 'reference-only',
    },
    {
      id: 'bc-past-modals-deduction',
      title: 'British Council: Past modals of deduction',
      url: 'https://learnenglish.britishcouncil.org/grammar/b1-b2-grammar/past-modals-deduction',
      claims: ['Analyzes evidence-based retrospective deductions, distinguishing must have from should have and could not have.'],
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
