/**
 * @file b2.ts
 * @description Original Vietnamese B2 grammar lessons with deterministic practice.
 */
import { ownerApproval, type GrammarLesson, type GrammarSource } from './types.js';

export const b2Lessons: GrammarLesson[] = [
  {
    id: 'grammar-b2-third-and-mixed-conditionals', revisionId: 'grammar-b2-third-and-mixed-conditionals@1.0.0', revision: '1.0.0', title: 'Điều kiện loại 3 và điều kiện hỗn hợp',
    objective: 'Nói về điều đã không xảy ra trong quá khứ và hệ quả giả định ở quá khứ hoặc hiện tại.',
    prerequisiteIds: ['grammar-b1-relative-clauses'], coverage: ['third-mixed-conditionals', 'third-conditional', 'mixed-conditionals'],
    explanation: 'Loại 3 nhìn lại một điều kiện quá khứ không xảy ra và kết quả cũng không xảy ra: If we had left earlier, we would have caught the train. Vế if dùng quá khứ hoàn thành (had + phân từ), kết quả thường dùng would have + phân từ. Điều kiện hỗn hợp kết nối hai mốc khác nhau. Nếu nguyên nhân quá khứ giải thích trạng thái hiện tại, dùng If + had + phân từ, would + nguyên mẫu: If I had taken that job, I would live abroad now. Nếu trạng thái hiện tại giải thích kết quả quá khứ, có thể dùng If + quá khứ đơn, would have + phân từ: If she were more organized, she wouldn’t have missed the deadline. Một số cách phối hợp khác có thể hợp lý tùy ý nghĩa; các mẫu này diễn đạt quan hệ giả định, không phải công thức cơ học. If-clause không dùng would theo mẫu cơ bản, và quá khứ hoàn thành ở đây đánh dấu độ lùi giả định trước một kết quả quá khứ, chứ không phải bằng chứng rằng hành động thật đã xảy ra.',
    examples: [
      { english: 'If the driver had checked the map, we wouldn’t have taken the wrong road.', vietnamese: 'Nếu tài xế đã xem bản đồ, chúng tôi đã không rẽ nhầm. Cả việc xem và hệ quả đều thuộc quá khứ đã khác thực tế.' },
      { english: 'If I had studied engineering, I would be designing bridges now.', vietnamese: 'Nếu trước đây tôi học kỹ thuật, giờ tôi có thể đang thiết kế cầu. Nguyên nhân giả định ở quá khứ, hệ quả hiện tại.' },
    ],
    contrasts: [{ form: 'If the alarm had gone off, I would have woken up on time.', whyFits: 'Had gone off nói điều kiện quá khứ không xảy ra; would have woken diễn tả kết quả quá khứ cũng không thành hiện thực.', whyNot: '“If the alarm went off, I would wake up on time” thường là giả định loại 2 về hiện tại/tương lai, không kể cơ hội đã bỏ lỡ sáng hôm qua.' }],
    commonMistakes: ['Viết “If I would have known” trong vế if của mẫu loại 3 cơ bản.', 'Dùng would have ở cả hai vế.', 'Nhầm điều kiện hỗn hợp với lỗi hòa hợp thì mà không xác định hai mốc thời gian.'],
    summary: 'Loại 3: điều kiện và kết quả đều ở quá khứ giả định; mixed: một vế ở quá khứ, một vế ở hiện tại—hãy ghi rõ hai mốc trước khi chọn dạng.',
    exercises: [{ id: 'grammar-b2-third-mixed-conditionals-q1', prompt: 'He is exhausted now because he didn’t sleep well. If he ___ better last night, he ___ so tired now.', options: [
      { text: 'had slept / wouldn’t be', correct: true, rationale: 'Thiếu ngủ là nguyên nhân quá khứ; mệt là trạng thái hiện tại, nên mixed conditional dùng had slept + wouldn’t be.' },
      { text: 'slept / wouldn’t have been', correct: false, rationale: 'Cặp này không khớp hai mốc trong ngữ cảnh: hậu quả ở đây là hiện tại now, không phải quá khứ.' },
      { text: 'would sleep / won’t be', correct: false, rationale: 'Would không đứng trong if-clause mẫu giả định này, và won’t biến kết quả thành dự đoán thật.' },
    ], acceptedAnswers: [{ text: 'had slept / wouldn’t be', rationale: 'Điều kiện giả định ở tối qua nối với trạng thái hiện tại nên cần quá khứ hoàn thành và would + nguyên mẫu.' }] }],
    sources: [
      { id: 'bc-third-mixed-conditionals', title: 'British Council: Conditionals: third and mixed', url: 'https://learnenglish.britishcouncil.org/free-resources/grammar/b1-b2/conditionals-third-mixed' },
    ],
    review: ownerApproval,
  },
  {
    id: 'grammar-b2-speculative-modals', revisionId: 'grammar-b2-speculative-modals@1.0.0', revision: '1.0.0', title: 'Modal suy đoán: mức độ chắc chắn về hiện tại và quá khứ',
    objective: 'Diễn đạt suy luận có căn cứ với must, may/might/could, can’t và dạng modal hoàn thành.',
    prerequisiteIds: ['grammar-b2-third-and-mixed-conditionals'], coverage: ['speculative-modals', 'modal-deduction-present', 'modal-deduction-past'],
    explanation: 'Modal suy đoán cho biết mức độ người nói tin vào một kết luận, không trực tiếp khẳng định sự thật. Với hiện tại, must + nguyên mẫu diễn tả suy luận mạnh từ bằng chứng; may/might/could + nguyên mẫu để ngỏ khả năng; can’t + nguyên mẫu nói điều gần như không thể theo bằng chứng. Dùng be + V-ing sau modal khi suy đoán một việc đang diễn ra. Nhìn về quá khứ, cấu trúc modal + have + phân từ đánh giá việc đã xảy ra: must have left (hẳn đã rời đi), might have missed (có thể đã lỡ), can’t have seen (khó có thể đã thấy). Mustn’t thường là cấm đoán chứ không phải phủ định suy đoán; để nói “không thể đã”, dùng can’t have. Những từ này không có thang xác suất tuyệt đối dùng được mọi tình huống; giọng điệu, bằng chứng và mức thận trọng của người nói quan trọng. Could have còn có thể nói cơ hội đã có nhưng không được dùng, nên cần ngữ cảnh phân biệt suy đoán với khả năng không thành hiện thực.',
    examples: [
      { english: 'The lights are off and the door is locked; they must be asleep.', vietnamese: 'Đèn tắt và cửa khóa; người nói suy luận khá chắc rằng họ đang ngủ.' },
      { english: 'Her car is still outside, so she may have forgotten her keys.', vietnamese: 'Xe vẫn ở ngoài nên có thể cô ấy đã quên chìa; may have + phân từ giữ kết luận ở mức chưa chắc.' },
    ],
    contrasts: [{ form: 'The parcel can’t have arrived yet; the tracking page still says “in transit.”', whyFits: 'Bằng chứng vận chuyển khiến người nói gần như loại trừ việc bưu kiện đã tới.', whyNot: '“The parcel mustn’t have arrived” thường được hiểu như lệnh cấm hoặc cách dùng không chuẩn cho suy đoán phủ định; can’t have diễn đạt kết luận không thể đã xảy ra.' }],
    commonMistakes: ['Dùng mustn’t have để nói “chắc là chưa”.', 'Dùng modal + have + động từ quá khứ thay vì phân từ.', 'Đọc might như một dấu hiệu chắc chắn thay vì khả năng còn mở.'],
    summary: 'Must suy luận mạnh; may/might/could để ngỏ; can’t loại trừ. Về quá khứ dùng modal + have + phân từ và nêu căn cứ.',
    exercises: [{ id: 'grammar-b2-speculative-modals-q1', prompt: 'The office is dark, her bike is gone, and the meeting ended an hour ago. Make a strong deduction about the past: She ___ home already.', options: [
      { text: 'must have gone', correct: true, rationale: 'Các dấu hiệu hỗ trợ một suy luận khá chắc về sự kiện quá khứ; must have + gone là phân từ.' },
      { text: 'must go', correct: false, rationale: 'Must go nói nghĩa vụ hoặc suy luận hiện tại/tương lai, không nói khả năng cô ấy đã về.' },
      { text: 'mustn’t have gone', correct: false, rationale: 'Mustn’t thường diễn tả cấm đoán, không phải kết luận rằng sự việc gần như chắc đã không xảy ra.' },
    ], acceptedAnswers: [{ text: 'must have gone', rationale: 'Must have gone nêu suy luận mạnh về việc rời đi đã xảy ra trước hiện tại.' }] }],
    sources: [
      { id: 'bc-modals-deductions-past', title: 'British Council: Modals: deductions about the past', url: 'https://learnenglish.britishcouncil.org/free-resources/grammar/b1-b2/modals-deductions-about-past' },
      { id: 'bc-modals-deductions-present', title: 'British Council: Modals: deductions about the present', url: 'https://learnenglish.britishcouncil.org/free-resources/grammar/b1-b2/modals-deductions-about-present' },
    ],
    review: ownerApproval,
  },
  {
    id: 'grammar-b2-perfect-aspect', revisionId: 'grammar-b2-perfect-aspect@1.0.0', revision: '1.0.0', title: 'Thể hoàn thành: nhìn lại một mốc từ một mốc khác',
    objective: 'Dùng hiện tại, quá khứ và tương lai hoàn thành để diễn tả sự việc xảy ra trước một mốc tham chiếu.',
    prerequisiteIds: ['grammar-b2-speculative-modals'], coverage: ['perfect-aspect', 'present-perfect', 'past-perfect', 'future-perfect'],
    explanation: 'Thể hoàn thành đặt một sự việc trước mốc tham chiếu: have/has + phân từ tính tới hiện tại; had + phân từ tính tới một mốc quá khứ; will have + phân từ tính tới một mốc tương lai. “Hoàn thành” không nhất thiết có nghĩa hành động đã kết thúc vĩnh viễn; thời lượng có thể kéo tới mốc ấy (By June, I will have worked here for a year). Chọn mốc trước: khi có hai sự kiện quá khứ, past perfect thường làm rõ sự kiện nào xảy ra trước, nhưng không cần dùng nó nếu thứ tự đã rõ và câu chuyện chạy tuyến tính. Present perfect nối về hiện tại và không đi với thời điểm quá khứ đã kết thúc như in 2020. Future perfect thường dùng với by Friday/by the time để nhìn từ điểm tương lai trở lại. So sánh với past simple: I finished at six kể sự kiện; I had finished by six nhấn việc đã xong trước hoặc chậm nhất vào mốc sáu giờ. Không thêm perfect chỉ để câu có vẻ nâng cao; khi thứ tự/mối liên hệ không cần nhấn, dạng đơn giản thường rõ hơn.',
    examples: [
      { english: 'By the time the guests arrived, we had prepared dinner.', vietnamese: 'Đến lúc khách tới, bữa tối đã được chuẩn bị xong; had prepared đặt việc chuẩn bị trước mốc khách đến.' },
      { english: 'By next December, she will have completed her training.', vietnamese: 'Đến tháng Mười Hai năm sau, cô ấy sẽ đã hoàn tất chương trình; will have completed nhìn từ mốc tương lai trở lại.' },
    ],
    contrasts: [{ form: 'When I reached the station, the train had already left.', whyFits: 'Tàu rời đi trước lúc tôi tới; past perfect đánh dấu quan hệ trước-sau có ý nghĩa cho câu chuyện.', whyNot: '“When I reached the station, the train left” thường kể hai sự kiện liên tiếp hoặc tàu rời đúng lúc tôi tới, không nói rõ tàu đã đi trước.' }],
    commonMistakes: ['Dùng past perfect cho mọi động từ trong một câu chuyện quá khứ.', 'Quên have/has/had/will trong cấu trúc hoàn thành.', 'Dùng present perfect với mốc quá khứ đóng cụ thể mà không đổi góc nhìn.'],
    summary: 'Perfect = have + phân từ nhìn từ mốc tham chiếu; hiện tại, quá khứ, tương lai lần lượt dùng have/has, had, will have.',
    exercises: [{ id: 'grammar-b2-perfect-aspect-q1', prompt: 'Dùng past perfect để nhấn việc ngủ xảy ra trước cuộc gọi: “By the time the doctor called back, the patient ___ asleep.” (fall)', options: [
      { text: 'fell', correct: false, rationale: 'Fell có thể đúng ngữ pháp khi trình tự đã rõ, nhưng không dùng past perfect theo yêu cầu câu hỏi.' },
      { text: 'had fallen', correct: true, rationale: 'Had fallen đặt việc ngủ trước mốc quá khứ the doctor called back.' },
      { text: 'has fallen', correct: false, rationale: 'Has fallen nối sự việc với hiện tại; câu đặt mốc nhìn trong một trình tự quá khứ đã kết thúc.' },
    ], acceptedAnswers: [{ text: 'had fallen', rationale: 'Quá khứ hoàn thành làm rõ bệnh nhân đã ngủ trước lúc bác sĩ gọi lại.' }] }],
    sources: [
      { id: 'bc-past-perfect', title: 'British Council: Past perfect', url: 'https://learnenglish.britishcouncil.org/free-resources/grammar/b1-b2/past-perfect' },
      { id: 'bc-present-perfect', title: 'British Council: Present perfect', url: 'https://learnenglish.britishcouncil.org/free-resources/grammar/b1-b2/present-perfect' },
      { id: 'bc-future-continuous-future-perfect', title: 'British Council: Future continuous and future perfect', url: 'https://learnenglish.britishcouncil.org/free-resources/grammar/b1-b2/future-continuous-future-perfect' },
    ],
    review: ownerApproval,
  },
  {
    id: 'grammar-b2-advanced-clauses', revisionId: 'grammar-b2-advanced-clauses@1.0.0', revision: '1.0.0', title: 'Mệnh đề nâng cao: nhượng bộ, nguyên nhân và mục đích',
    objective: 'Kết nối ý tương phản, nguyên nhân, kết quả và mục đích bằng liên từ phù hợp, giữ rõ quan hệ logic.',
    prerequisiteIds: ['grammar-b2-perfect-aspect'], coverage: ['advanced-clauses', 'concession', 'cause-result-purpose'],
    explanation: 'Mệnh đề phụ giúp thể hiện quan hệ giữa các ý thay vì chỉ xếp câu cạnh nhau. Although/though/even though dẫn mệnh đề nhượng bộ đầy đủ chủ-vị: Although it was late, we continued. Despite/in spite of dẫn danh từ hoặc V-ing: Despite the delay, we continued; không đặt trực tiếp một mệnh đề hữu hạn sau despite nếu không có cấu trúc the fact that. Because dẫn nguyên nhân; so that có thể dẫn mục đích/kết quả dự kiến; so đứng giữa hai mệnh đề để nêu hệ quả. Cặp liên từ phải phản ánh quan hệ thực tế: although và but không thường cùng nối một cặp mệnh đề theo một mẫu đơn giản; dùng cả hai thường tạo thừa cấu trúc. Dấu phẩy phụ thuộc vị trí và độ dài: mệnh đề phụ đứng đầu thường có dấu phẩy ngăn với mệnh đề chính, còn đứng sau thường không cần. Có thể đảo mệnh đề chính/phụ để thay trọng tâm, nhưng không làm quan hệ nguyên nhân thành nhượng bộ chỉ vì muốn câu nghe phức tạp.',
    examples: [
      { english: 'Although the forecast was poor, the organizers kept the event outdoors.', vietnamese: 'Dù dự báo thời tiết xấu, ban tổ chức vẫn để sự kiện ngoài trời; kết quả trái với điều thường chờ đợi.' },
      { english: 'Despite having little time, she checked every figure so that the report would be accurate.', vietnamese: 'Mặc dù ít thời gian, cô vẫn kiểm tra từng con số để báo cáo chính xác; despite + V-ing, so that + mệnh đề mục đích.' },
    ],
    contrasts: [{ form: 'Despite the heavy traffic, we arrived before noon.', whyFits: 'Despite đứng trước cụm danh từ the heavy traffic, còn mệnh đề chính nêu kết quả trái kỳ vọng.', whyNot: '“Despite the traffic was heavy” đặt thẳng mệnh đề hữu hạn sau despite; cần although the traffic was heavy hoặc despite the heavy traffic.' }],
    commonMistakes: ['Dùng “despite it was raining” mà không có the fact that.', 'Ghép although ... but trong một cấu trúc đơn giản.', 'Dùng so that khi chỉ muốn nêu kết quả đã xảy ra mà không có ý mục đích.'],
    summary: 'Although + mệnh đề; despite + danh từ/V-ing; because nêu nguyên nhân, so/so that có quan hệ kết quả hoặc mục đích—chọn theo logic.',
    exercises: [{ id: 'grammar-b2-advanced-clauses-q1', prompt: '___ the train was delayed, we arrived before the doors closed. (nối một mệnh đề nhượng bộ)', options: [
      { text: 'Although', correct: true, rationale: 'Although đứng trước mệnh đề đầy đủ the train was delayed và báo hiệu kết quả trái kỳ vọng.' },
      { text: 'Despite', correct: false, rationale: 'Despite không đứng trực tiếp trước mệnh đề hữu hạn này; cần despite the delay hoặc despite the train being delayed.' },
      { text: 'Because', correct: false, rationale: 'Because diễn tả nguyên nhân, nhưng tàu trễ không phải lý do khiến họ đến trước lúc cửa đóng trong ý câu.' },
     ], acceptedAnswers: [
       { text: 'Although', rationale: 'Although đứng trước mệnh đề đầy đủ và nối hoàn cảnh bất lợi với kết quả trái dự đoán.' },
       { text: 'Although the train was delayed, we arrived before the doors closed.', rationale: 'Although nối mệnh đề nguyên nhân bất lợi với kết quả trái dự đoán.' },
     ] }],
    sources: [
      { id: 'bc-contrasting-ideas', title: 'British Council: Contrasting ideas: although, despite and others', url: 'https://learnenglish.britishcouncil.org/free-resources/grammar/b1-b2/contrasting-ideas-although-despite-others' },
      { id: 'bc-infinitive-purpose', title: 'British Council: Infinitive of purpose', url: 'https://learnenglish.britishcouncil.org/free-resources/grammar/a1-a2/infinitive-purpose' },
    ],
    review: ownerApproval,
  },
  {
    id: 'grammar-b2-cohesion', revisionId: 'grammar-b2-cohesion@1.0.0', revision: '1.0.0', title: 'Liên kết đoạn: tham chiếu rõ, lặp có chủ đích và từ nối',
    objective: 'Tạo mạch văn rõ bằng đại từ tham chiếu, từ thay thế và từ nối biểu thị chính xác quan hệ giữa các ý.',
    prerequisiteIds: ['grammar-b2-advanced-clauses'], coverage: ['cohesion', 'reference', 'substitution', 'discourse-connectors'],
    explanation: 'Một đoạn văn liên kết không chỉ cần từ nối; người đọc phải nhận ra đại từ đang chỉ về ai/vật nào và quan hệ giữa câu trước-sau. Đại từ it/they/this có thể tham chiếu một danh từ hoặc cả một ý, nhưng this/that + danh từ thường làm đối tượng rõ hơn: This decision surprised the team. Thay thế bằng one/ones, do so hoặc so tránh lặp khi đối tượng/hoạt động đã xác định; lạm dụng chúng khiến người đọc phải đoán phần bị thay. Từ nối cũng mã hóa logic: however báo tương phản; therefore nêu hệ quả suy ra; moreover bổ sung ý cùng hướng. Chúng không hoán đổi chỉ vì đều đứng đầu câu. Dùng however như trạng từ liên kết thường cần dấu câu phù hợp (The cost was high. However, we proceeded.); không dùng dấu phẩy đơn để nối hai mệnh đề độc lập trong văn viết chuẩn. Lặp lại danh từ chính đôi khi rõ hơn đại từ, đặc biệt khi có nhiều danh từ gần đó. Mục tiêu là tham chiếu dễ theo dõi, không phải loại bỏ mọi sự lặp.',
    examples: [
      { english: 'The lab changed its safety rules. This change reduced accidents.', vietnamese: 'This change chỉ rõ việc thay đổi quy định, tránh để it mơ hồ giữa phòng thí nghiệm và quy định.' },
      { english: 'The first proposal was affordable; however, it did not meet the deadline.', vietnamese: 'However báo tương phản giữa giá thành và tiến độ; it tham chiếu proposal.' },
    ],
    contrasts: [{ form: 'The first design was expensive. However, the client approved it.', whyFits: 'However nối hai câu có tương phản kỳ vọng; dấu chấm tạo ranh giới câu rõ, it có tiền ngữ xác định là design.', whyNot: '“The first design was expensive, however, the client approved it” nối hai mệnh đề độc lập chỉ bằng dấu phẩy; trong văn viết chuẩn đây là lỗi comma splice, nên dùng dấu chấm/chấm phẩy hoặc liên từ phối hợp.' }],
    commonMistakes: ['Đặt it/they sau nhiều danh từ số ít/số nhiều khác nhau khiến tiền ngữ không rõ.', 'Dùng therefore cho một ý tương phản thay vì hệ quả.', 'Nối hai câu độc lập bằng dấu phẩy trước however.'],
    summary: 'Liên kết tốt là tham chiếu rõ và logic chính xác; đại từ/từ thay thế tránh lặp khi tiền ngữ rõ, còn từ nối cần khớp quan hệ ý.',
    exercises: [{ id: 'grammar-b2-cohesion-q1', prompt: 'The team tested the new process for a month, and that process reduced errors. ___, the error rate fell by half. Nêu kết quả được quy cho quy trình mới.', options: [
      { text: 'However', correct: false, rationale: 'Không có tương phản giữa thử nghiệm và lỗi giảm; however báo ý trái kỳ vọng.' },
      { text: 'Therefore', correct: true, rationale: 'Câu sau được trình bày là hệ quả của việc thử quy trình mới, nên therefore phù hợp.' },
      { text: 'Moreover', correct: false, rationale: 'Moreover chỉ thêm một thông tin cùng hướng, không thể hiện quan hệ kết quả được yêu cầu.' },
     ], acceptedAnswers: [
       { text: 'Therefore', rationale: 'Therefore biểu thị kết quả được suy ra từ việc thử nghiệm quy trình.' },
       { text: 'Therefore, the error rate fell by half.', rationale: 'Therefore nối hành động thử nghiệm với kết quả được suy ra.' },
     ] }],
    sources: [
      { id: 'purdue-paragraphs', title: 'Purdue OWL: On Paragraphs', url: 'https://owl.purdue.edu/owl/general_writing/academic_writing/paragraphs_and_paragraphing/index.html' },
      { id: 'bc-one-ones', title: 'British Council: one and ones', url: 'https://learnenglish.britishcouncil.org/free-resources/grammar/english-grammar-reference/one-ones' },
      { id: 'purdue-transitional-devices', title: 'Purdue OWL: Transitional Devices', url: 'https://owl.purdue.edu/owl/general_writing/mechanics/transitions_and_transitional_devices/transitional_devices.html' },
      { id: 'purdue-cohesion', title: 'Purdue OWL: Revising for Cohesion', url: 'https://owl.purdue.edu/owl/general_writing/the_writing_process/proofreading/revising_for_cohesion.html' },
    ],
    review: ownerApproval,
  },
];
