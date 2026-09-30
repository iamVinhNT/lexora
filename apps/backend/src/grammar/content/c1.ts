/**
 * @file c1.ts
 * @description Original Vietnamese C1 lessons on emphasis, discourse choices, and advanced grammar contrasts.
 */
import { ownerApproval, type GrammarLesson, type GrammarSource } from './types.js';

const fallbackSources: GrammarSource[] = [
  { id: 'cambridge-cefr', title: 'Cambridge English: CEFR', url: 'https://www.cambridgeenglish.org/exams-and-tests/cefr/' },
  { id: 'cambridge-activities', title: 'Cambridge English: Learning activities', url: 'https://www.cambridgeenglish.org/learning-english/activities-for-learners/' },
  { id: 'purdue-grammar', title: 'Purdue OWL: Grammar', url: 'https://owl.purdue.edu/owl/general_writing/grammar/index.html' },
];
const emphasisSources: GrammarSource[] = [
  { id: 'british-council-c1-emphasis', title: 'British Council: Emphasis: cleft sentences, inversion and auxiliaries', url: 'https://learnenglish.britishcouncil.org/free-resources/grammar/c1/emphasis-cleft-sentences-inversion-auxiliaries' },
];

export const c1Lessons: GrammarLesson[] = [
  {
    id: 'grammar-c1-inversion', revisionId: 'grammar-c1-inversion@1.0.0', revision: '1.0.0', title: 'Đảo ngữ để tạo trọng tâm và giới hạn lập luận',
    objective: 'Dùng đảo trợ động từ sau một số trạng ngữ phủ định hoặc giới hạn để nhấn ý, và nhận ra khi nào trật tự câu thường phù hợp hơn.',
    prerequisiteIds: ['grammar-b2-cohesion'], coverage: ['inversion', 'negative-adverbial-inversion', 'conditional-inversion'],
    explanation: 'Đảo ngữ ở đây là trật tự trợ động từ đứng trước chủ ngữ trong mệnh đề chính; nó không phải phép đảo tùy ý mọi động từ. Khi một cụm phủ định hoặc giới hạn được đưa lên đầu để tạo nhấn mạnh, văn viết trang trọng thường dùng mẫu trợ động từ + chủ ngữ + động từ chính: Rarely have we seen such a careful review; Only after the vote did the proposal change. Nếu câu gốc không có trợ động từ, thêm do/does/did và đưa động từ chính về nguyên mẫu (Only then did she understand, không phải did she understood). Với only, phạm vi nghĩa quan trọng: Only Maya spoke to the editor nhấn Maya là người duy nhất nói; Only after Maya spoke did the editor respond nhấn điều kiện/thời điểm. Inversion thường tạo giọng nhấn mạnh, có phần tu từ; câu trật tự thường có thể đúng và tự nhiên hơn trong hội thoại. Một số mệnh đề điều kiện trang trọng lược if và đảo had/were/should lên trước chủ ngữ (Had we known, ...), nhưng không thay thế mọi câu if. Không đảo khi trạng ngữ không đứng đầu hoặc không thuộc nhóm kích hoạt cấu trúc này.',
    examples: [
      { english: 'Not until the final pages did I understand why the narrator had withheld the letter.', vietnamese: 'Mãi đến những trang cuối tôi mới hiểu vì sao người kể đã giấu bức thư. Cụm not until đứng đầu khiến trợ động từ did đảo lên trước I.' },
      { english: 'Had the committee received the revised figures, it might have reached a different decision.', vietnamese: 'Nếu ủy ban nhận được số liệu đã sửa, họ có thể đã quyết định khác. Had đứng đầu là dạng điều kiện trang trọng rút gọn từ if the committee had received.' },
    ],
    contrasts: [{ form: 'Only after the archivist checked the date did the team cite the letter.', whyFits: 'Only giới hạn điều kiện thời gian ở đầu câu; mệnh đề chính dùng did + chủ ngữ + nguyên mẫu để tạo đảo ngữ.', whyNot: '“Only after the archivist checked the date the team cited the letter” thiếu trợ động từ đảo trong mệnh đề chính. “The team cited the letter only after ...” vẫn đúng nhưng đặt trọng tâm nhẹ hơn ở cuối câu.' }],
    commonMistakes: ['Đảo cả động từ chính mà không có trợ động từ: “Rarely we see ...”.', 'Giữ dạng quá khứ sau did: “Only then did she understood”.', 'Dùng đảo ngữ sau mọi trạng ngữ chỉ thời gian dù trạng ngữ đó không mang sắc thái phủ định/giới hạn.'],
    summary: 'Trạng ngữ phủ định/giới hạn ở đầu thường kéo trợ động từ lên trước chủ ngữ; đảo ngữ là lựa chọn nhấn mạnh, không phải cách viết mặc định.',
    exercises: [{ id: 'grammar-c1-inversion-q1', prompt: 'Viết lại với “Not until Friday” ở đầu câu và giữ ý: “We realized the figures were incomplete only on Friday.”', options: [
      { text: 'Not until Friday did we realize the figures were incomplete.', correct: true, rationale: 'Not until ở đầu giới hạn thời điểm nhận ra; mệnh đề chính đảo did lên trước we và giữ realize ở nguyên mẫu.' },
      { text: 'Not until Friday we realized the figures were incomplete.', correct: false, rationale: 'Câu giữ trật tự thường sau trạng ngữ nhấn mạnh phủ định ở đầu, nên thiếu trợ động từ đảo did.' },
      { text: 'Not until Friday did we realized the figures were incomplete.', correct: false, rationale: 'Sau did, động từ chính phải ở nguyên mẫu realize, không chia realized.' },
    ], acceptedAnswers: [{ text: 'Not until Friday did we realize the figures were incomplete.', rationale: 'Đảo did + we + realize sau cụm not until đặt đầu câu.' }] }], sources: emphasisSources, review: ownerApproval,
  },
  {
    id: 'grammar-c1-emphasis', revisionId: 'grammar-c1-emphasis@1.0.0', revision: '1.0.0', title: 'Nhấn mạnh có kiểm soát: do-support, vị trí và tương phản',
    objective: 'Chọn phương tiện nhấn mạnh phù hợp với thông tin mới, đối lập hoặc sửa lại một giả định của người nghe.',
    prerequisiteIds: ['grammar-c1-inversion'], coverage: ['emphasis', 'emphatic-do', 'focus-and-fronting'],
    explanation: 'Muốn nhấn một ý, trước hết xác định người nghe đang thiếu thông tin nào: ai làm, việc gì xảy ra, hay phần nào cần sửa. Trong câu khẳng định ở hiện tại/quá khứ đơn, do/does/did + động từ nguyên mẫu có thể nhấn sự thật hoặc phản bác nghi ngờ: I do appreciate the warning; She did call yesterday. Đây là nhấn bằng giọng hoặc văn cảnh, thường tự nhiên trong hội thoại; dùng liên tục khiến giọng trở nên đối đầu. Đưa một thành phần lên đầu (This result, we did not predict) có thể đánh dấu chủ đề/tương phản, nhưng cần giữ cấu trúc còn lại rõ và tránh làm người đọc tưởng đó là chủ ngữ. Trọng âm câu nói cũng thay đổi tiêu điểm mà không cần thay cấu trúc. Câu chẻ it-cleft/wh-cleft là một lựa chọn khác khi cần đóng khung phần thông tin; đó là cấu trúc riêng sẽ học ở bài kế tiếp. Không thêm do vào câu có be/modal: “I do am ready” sai; thay bằng trọng âm hoặc một cấu trúc tương phản thích hợp.',
    examples: [
      { english: 'I do see why the residents are concerned, but the revised plan reduces the noise.', vietnamese: 'Do see xác nhận người nói hiểu mối lo trước khi đưa ra điểm đối lập; sắc thái là công nhận thật, không chỉ nói see.' },
      { english: 'That deadline, we can meet; the earlier one is unrealistic.', vietnamese: 'Đưa that deadline lên đầu đặt nó thành chủ đề đối chiếu; trọng tâm sau đó là khả năng đáp ứng deadline ấy.' },
    ],
    contrasts: [{ form: 'The board did approve the trial, although it requested monthly reports.', whyFits: 'Did approve nhấn việc phê duyệt là có thật, có thể để đáp lại ai đó nghĩ rằng hội đồng từ chối.', whyNot: '“The board did approved the trial” chia động từ hai lần; sau did phải là nguyên mẫu. Nếu không có ý xác nhận/đối lập, “The board approved ...” gọn và trung tính hơn.' }],
    commonMistakes: ['Thêm do trước be hoặc modal: “She does can attend”.', 'Dùng do-support rồi vẫn chia động từ chính ở quá khứ.', 'Đưa quá nhiều cụm lên đầu khiến chủ đề và quan hệ tương phản khó theo dõi.'],
    summary: 'Nhấn mạnh tốt trả lời một nhu cầu thông tin cụ thể; do-support xác nhận hành động, còn trọng âm hoặc fronting điều chỉnh tiêu điểm.',
    exercises: [{ id: 'grammar-c1-emphasis-q1', prompt: 'Một đồng nghiệp nghĩ An đã không gửi tệp. Chọn câu xác nhận An thực sự gửi nó hôm qua.', options: [
      { text: 'An did send the file yesterday.', correct: true, rationale: 'Did send nhấn sự việc đã xảy ra và phản bác nghi ngờ; send ở nguyên mẫu sau did.' },
      { text: 'An did sent the file yesterday.', correct: false, rationale: 'Did đã mang dấu quá khứ; không dùng thêm sent sau trợ động từ này.' },
      { text: 'An does send the file yesterday.', correct: false, rationale: 'Does không hợp mốc quá khứ yesterday; muốn nhấn sự kiện quá khứ dùng did.' },
    ], acceptedAnswers: [{ text: 'An did send the file yesterday.', rationale: 'Did + nguyên mẫu nhấn xác nhận một sự kiện quá khứ.' }] }], sources: emphasisSources, review: ownerApproval,
  },
  {
    id: 'grammar-c1-cleft-sentences', revisionId: 'grammar-c1-cleft-sentences@1.0.0', revision: '1.0.0', title: 'Câu chẻ: đóng khung phần thông tin cần làm nổi bật',
    objective: 'Dùng it-cleft và wh-cleft để đặt tiêu điểm thông tin mà không làm thay đổi ý sự kiện nền.',
    prerequisiteIds: ['grammar-c1-emphasis'], coverage: ['cleft-sentences', 'it-cleft', 'wh-cleft'],
    explanation: 'Câu chẻ tách một mệnh đề thành khung dẫn và phần tiêu điểm, hữu ích khi trả lời câu hỏi ngầm hoặc sửa một đối lập. It-cleft thường có It + be + tiêu điểm + mệnh đề quan hệ: It was Nhi who found the error. Who nhấn người; có thể dùng that cho người/vật trong một số cấu trúc, còn when/where phù hợp với thời gian/nơi chốn. Wh-cleft (pseudo-cleft) dùng mệnh đề wh làm nền: What we need is a quieter room; tiêu điểm thường đứng sau be. Chọn tiêu điểm theo câu hỏi diễn ngôn: “Who found it?” → Nhi; “What did Nhi find?” → the error. Mệnh đề nền không nhất thiết là thông tin đã biết hoàn toàn, nhưng cần đủ để người nghe định vị quan hệ. Câu chẻ dài hơn câu thường; nếu không có tương phản hay lý do tổ chức thông tin, “Nhi found the error” đơn giản và tự nhiên hơn. Đừng nhầm cleft với câu hỏi trực tiếp và đừng để đại từ quan hệ làm sai quan hệ chủ ngữ/tân ngữ.',
    examples: [
      { english: 'It was the night editor who noticed that the caption named the wrong town.', vietnamese: 'Câu nhấn người phát hiện lỗi, không phải người viết caption hay nội dung sai.' },
      { english: 'What the archive preserves is a record of the discussion, not a verbatim transcript.', vietnamese: 'Wh-cleft đặt phần điều chỉnh kỳ vọng ở cuối: tài liệu lưu biên bản ghi lại, chứ không phải bản chép nguyên văn.' },
    ],
    contrasts: [{ form: 'It was the location, not the date, that the researchers had misidentified.', whyFits: 'Cấu trúc it-cleft đưa location thành tiêu điểm đối lập trực tiếp với date.', whyNot: '“It was the location that the researchers had misidentified, not the date” có thể hiểu được nhưng vị trí not the date tách khỏi cặp tiêu điểm; câu thường “They misidentified the location” không tự nói rõ đối lập với date.' }],
    commonMistakes: ['Đặt phần tiêu điểm sai vị trí khiến người đọc không thấy điều đang được sửa.', 'Dùng it-cleft cho mọi câu kể dù không có câu hỏi ngầm hay lý do nhấn.', 'Nhầm mệnh đề what làm nền trong wh-cleft với câu hỏi trực tiếp cần dấu hỏi.'],
    summary: 'Cleft tổ chức câu quanh một tiêu điểm: it-cleft nêu tiêu điểm sớm, wh-cleft thường đặt tiêu điểm sau be; dùng khi cấu trúc thông tin có ích.',
    exercises: [{ id: 'grammar-c1-cleft-sentences-q1', prompt: 'Câu hỏi ngầm là “What does the new policy protect?” Chọn wh-cleft nhấn câu trả lời “staff privacy”.', options: [
      { text: 'What the new policy protects is staff privacy.', correct: true, rationale: 'What-clause làm nền cho câu hỏi “what”; phần trả lời staff privacy nằm ở vị trí tiêu điểm sau is.' },
      { text: 'It is staff privacy what the new policy protects?', correct: false, rationale: 'Cấu trúc it-cleft thường dùng that/who, không dùng what theo trật tự này; dấu hỏi cũng biến câu trả lời thành câu hỏi.' },
      { text: 'What does the new policy protects is staff privacy.', correct: false, rationale: 'What-clause làm chủ ngữ dùng trật tự câu kể, không đảo does; nếu đã dùng does trong câu hỏi thì protect phải là nguyên mẫu.' },
    ], acceptedAnswers: [{ text: 'What the new policy protects is staff privacy.', rationale: 'Wh-cleft đặt mệnh đề nền what the policy protects trước tiêu điểm staff privacy.' }] }], sources: emphasisSources, review: ownerApproval,
  },
  {
    id: 'grammar-c1-ellipsis', revisionId: 'grammar-c1-ellipsis@1.0.0', revision: '1.0.0', title: 'Lược bỏ để tránh lặp mà vẫn giữ được điểm tựa',
    objective: 'Nhận diện và tạo ellipsis trong phản hồi, so sánh và phối hợp mệnh đề khi phần bị lược có thể phục hồi rõ ràng.',
    prerequisiteIds: ['grammar-c1-cleft-sentences'], coverage: ['ellipsis', 'auxiliary-ellipsis', 'comparative-ellipsis'],
    explanation: 'Ellipsis là lược một phần mà người nghe có thể khôi phục từ ngữ cảnh; nó làm lời nói gọn, nhưng chỉ hiệu quả nếu điểm tựa rõ. Trong câu trả lời, có thể lược phần đã biết và giữ trợ động từ: “Has Mira replied?” — “She has.” Trong cấu trúc so sánh, phần lặp cũng có thể lược: “The north route is shorter than the south route is” hoặc gọn hơn “...than the south route.” Trong mệnh đề phối hợp, chủ ngữ hay động từ lặp đôi khi được chia sẻ khi quan hệ cú pháp song song rõ. Tuy nhiên, lược trợ động từ có thể đổi nghĩa hoặc tạo cấu trúc không tự nhiên; không thể tùy tiện lược động từ chính trong mọi câu hữu hạn. Trong văn học thuật, ellipsis cần tránh mơ hồ về thành phần so sánh (cheaper than last year có thể so giá, không nhất thiết so sản phẩm). Khi người đọc phải tự đoán vật/thuộc tính bị lược, lặp lại danh từ đôi khi tốt hơn sự ngắn gọn.',
    examples: [
      { english: '“Will the revised figures be ready today?” “They should be.”', vietnamese: 'Be được giữ lại làm điểm tựa cho phần bị lược (ready today); không cần lặp nguyên cụm tính từ.' },
      { english: 'The second sample was less stable than the first (sample was).', vietnamese: 'Phần so sánh cuối có thể lược vì first sample đã có thể khôi phục; giữ lại khi cần nhấn hoặc làm rõ cấu trúc.' },
    ],
    contrasts: [{ form: 'Lena has submitted the form, and Omar has too.', whyFits: 'Has too lược submitted the form sau trợ động từ đã được nêu; hành động bị lược dễ phục hồi.', whyNot: '“Lena has submitted the form, and Omar too” có thể dùng trong một số kiểu văn phong lược, nhưng ở đây thiếu điểm tựa trợ động từ khiến cấu trúc song song kém rõ; “Omar has too” minh bạch hơn.' }],
    commonMistakes: ['Lược cả phần làm rõ đối tượng so sánh, khiến câu có nhiều cách hiểu.', 'Lặp trợ động từ không phù hợp với mệnh đề trước.', 'Giả định mọi chỗ ngữ cảnh giúp đoán đều cho phép ellipsis tự nhiên.'],
    summary: 'Chỉ lược phần dễ khôi phục từ cấu trúc song song hoặc trợ động từ; ưu tiên nhắc lại khi phép lược gây mơ hồ.',
    exercises: [{ id: 'grammar-c1-ellipsis-q1', prompt: 'Hoàn tất câu trả lời ngắn, tránh lặp “checked the references”: “Have both reviewers checked the references?” “Mina has, and Jo ___ too.”', options: [
      { text: 'has', correct: true, rationale: 'Has too giữ trợ động từ hiện tại hoàn thành và lược checked the references đã nêu.' },
      { text: 'did', correct: false, rationale: 'Did chuyển sang quá khứ đơn, không song song với câu hỏi hiện tại hoàn thành have checked.' },
      { text: 'has checked the references has', correct: false, rationale: 'Cụm này lặp không cần thiết và đặt trợ động từ lần hai sai cấu trúc.' },
    ], acceptedAnswers: [{ text: 'has', rationale: 'Giữ has làm trợ động từ để người nghe phục hồi phần động từ đã lược.' }] }], sources: [
      { id: 'bc-c1-ellipsis', title: 'British Council: Ellipsis', url: 'https://learnenglish.britishcouncil.org/free-resources/grammar/c1/ellipsis' },
    ], review: ownerApproval,
  },
  {
    id: 'grammar-c1-hedging', revisionId: 'grammar-c1-hedging@1.0.0', revision: '1.0.0', title: 'Hedging: hiệu chỉnh mức độ khẳng định theo bằng chứng',
    objective: 'Dùng phương tiện ngôn ngữ để phân biệt quan sát, suy luận, khả năng và giới hạn của một nhận định.',
    prerequisiteIds: ['grammar-c1-ellipsis'], coverage: ['hedging', 'epistemic-caution', 'evidence-and-claims'],
    explanation: 'Hedging không có nghĩa là làm câu mơ hồ cho lịch sự; đó là cách biểu thị phạm vi và độ chắc chắn của phát biểu. Có thể nêu mức độ bằng modal/adverb (may, probably), động từ lập trường (suggest, appear), hoặc giới hạn phạm vi (in this sample, under these conditions). “The pattern suggests an association” mô tả điều dữ liệu gợi ra; “The pattern proves a cause” khẳng định mạnh hơn và cần bằng chứng thiết kế phù hợp. Chọn hedge theo bằng chứng, không theo thói quen làm mọi câu yếu đi. Cũng cần phân biệt dè dặt nhận thức với dè dặt quan hệ: perhaps có thể mời người nghe cân nhắc, còn “I was wondering whether ...” làm yêu cầu gián tiếp hơn. Trong báo cáo, hedging quá nhiều làm mất luận điểm; trong thư góp ý, dạng quá trực tiếp có thể không đạt mục tiêu giao tiếp. Nêu nguồn bất định cụ thể thường hữu ích hơn chuỗi từ perhaps/maybe/seemingly.',
    examples: [
      { english: 'The interviews suggest that timetable changes may have affected attendance, although the sample is small.', vietnamese: 'Suggest và may giới hạn kết luận ở mức dữ liệu phỏng vấn gợi khả năng; although nêu rõ hạn chế mẫu.' },
      { english: 'Could we move the review to Thursday, if that would be convenient?', vietnamese: 'Could và if that would be convenient giảm độ áp đặt của một đề nghị; đây là hiệu ứng quan hệ, không phải nghi ngờ rằng cuộc họp tồn tại.' },
    ],
    contrasts: [{ form: 'These results are consistent with a seasonal effect, but they do not establish one.', whyFits: 'Consistent with nói dữ liệu tương thích với giả thuyết mà không coi đó là chứng minh nguyên nhân.', whyNot: '“These results prove a seasonal effect” vượt quá điều tương quan/quan sát đơn lẻ có thể cho biết; ngược lại “may possibly perhaps be consistent” tích tụ hedge mà không thêm giới hạn cụ thể.' }],
    commonMistakes: ['Coi may/might là tín hiệu phải né trách nhiệm thay vì mô tả độ chắc chắn.', 'Lặp nhiều hedge đồng nghĩa mà không nêu nguồn bất định.', 'Dùng lời xin phép vòng vo trong mọi yêu cầu dù quan hệ và mục tiêu không cần giảm nhẹ.'],
    summary: 'Hedge chính xác mức độ khẳng định và phạm vi; gắn nó với bằng chứng hoặc quan hệ giao tiếp, tránh vừa phóng đại vừa làm yếu vô cớ.',
    exercises: [{ id: 'grammar-c1-hedging-q1', prompt: 'Một khảo sát quan sát cho thấy hai biến đi cùng nhau nhưng không kiểm tra nguyên nhân. Chọn câu báo cáo thận trọng chính xác nhất.', options: [
      { text: 'The survey suggests an association between sleep and concentration; it cannot establish causation.', correct: true, rationale: 'Suggests an association giới hạn kết luận theo quan sát, và vế sau nêu đúng điều khảo sát chưa chứng minh.' },
      { text: 'The survey proves that sleep causes better concentration.', correct: false, rationale: 'Proves/causes suy diễn quan hệ nhân quả từ khảo sát quan sát chưa kiểm tra nguyên nhân.' },
      { text: 'The survey maybe perhaps possibly shows something about sleep.', correct: false, rationale: 'Nhiều hedge chung chung không cho biết kết quả là gì hay giới hạn bằng chứng nằm ở đâu.' },
    ], acceptedAnswers: [{ text: 'The survey suggests an association between sleep and concentration; it cannot establish causation.', rationale: 'Câu nêu kết quả ở đúng mức bằng chứng và ranh giới nhân quả.' }] }], sources: [
      { id: 'purdue-reasonability', title: 'Purdue OWL: Reasonability and hedging', url: 'https://owl.purdue.edu/owl/multilingual/multilingual_students/tips_for_writing_in_north_american_colleges/reasonability.html' },
    ], review: ownerApproval,
  },
  {
    id: 'grammar-c1-register', revisionId: 'grammar-c1-register@1.0.0', revision: '1.0.0', title: 'Register: điều chỉnh cấu trúc theo người đọc và mục đích',
    objective: 'Chọn mức độ trực tiếp, rút gọn và danh hóa theo tình huống mà vẫn giữ câu rõ, tự nhiên và không giả định trang trọng luôn tốt hơn.',
    prerequisiteIds: ['grammar-c1-hedging'], coverage: ['register', 'formal-informal-choice', 'nominalization'],
    explanation: 'Register là lựa chọn ngôn ngữ phù hợp với quan hệ, kênh giao tiếp, mục đích và quy ước cộng đồng; không chỉ là đối lập “đúng” với “sai”. Email cho đồng nghiệp quen, báo cáo cho cơ quan và trao đổi học thuật có thể cần cách mở đầu, mức trực tiếp, contraction và danh từ hóa khác nhau. “Can you send me the file?” có thể hoàn toàn lịch sự giữa đồng đội; “Would you be able to send the file by noon?” làm yêu cầu mềm và nêu hạn rõ hơn, nhưng không phải lúc nào cũng tốt hơn. Danh hóa (the committee reviewed → the committee’s review) giúp đóng gói ý thành chủ đề hoặc tiêu đề, nhưng chuỗi danh từ dài có thể che ai hành động. Contraction thường tự nhiên trong hội thoại và một số văn bản thân mật; chuẩn biên tập của tổ chức có thể ưu tiên dạng đầy đủ. Hãy xét độc giả thật, mức quyền lực, mục tiêu và định dạng trước khi đổi giọng. Đừng bắt chước lối trang trọng cứng nhắc hoặc coi một biến thể vùng miền là kém chuẩn; quy ước phải được hiểu trong cộng đồng dùng nó.',
    examples: [
      { english: 'Hi Sam, could you send the draft when you have a moment? I want to check one figure.', vietnamese: 'Thông điệp cho đồng nghiệp quen dùng lời yêu cầu trực tiếp nhưng mềm bằng could và giải thích mục đích.' },
      { english: 'The review of the draft identified one figure that requires verification.', vietnamese: 'Danh hóa review phù hợp kiểu báo cáo, nhưng câu vẫn nêu rõ việc kiểm tra con số; trong trao đổi nhóm, “We reviewed ...” có thể trực tiếp hơn.' },
    ],
    contrasts: [{ form: 'Dear Dr. Patel, I am writing to request an extension until 14 May because the laboratory was closed.', whyFits: 'Thư gửi người chưa quen trong bối cảnh học thuật nêu yêu cầu, thời hạn và lý do với dạng đầy đủ, minh bạch.', whyNot: '“Hey, give me more time till May” có thể phù hợp giữa bạn bè nhưng quá suồng suồng và thiếu điều kiện rõ trong bối cảnh trang trọng này. Ngược lại, thay mọi từ bằng danh hóa nặng nề không tự động tạo giọng chuyên nghiệp.' }],
    commonMistakes: ['Coi câu dài hoặc danh hóa dày là luôn trang trọng và chính xác hơn.', 'Dùng cách xưng hô quá thân mật mà không xét quan hệ/ngữ cảnh.', 'Xóa contraction hoặc biến thể vùng miền một cách máy móc dù thể loại và độc giả chấp nhận.'],
    summary: 'Register là lựa chọn theo độc giả, quan hệ và thể loại; điều chỉnh độ trực tiếp/cấu trúc vừa đủ, giữ tác nhân và ý nghĩa rõ.',
    exercises: [{ id: 'grammar-c1-register-q1', prompt: 'Bạn gửi lần đầu cho giảng viên chưa quen để xin lùi hạn một ngày và nêu lý do ngắn. Chọn câu phù hợp nhất.', options: [
      { text: 'Dear Professor Lee, could I submit the report on Friday instead? The lab was closed yesterday.', correct: true, rationale: 'Lời chào phù hợp quan hệ chưa quen, could giảm áp đặt, và lý do/thời gian được nêu cụ thể.' },
      { text: 'Hey Lee, push my deadline back, yeah?', correct: false, rationale: 'Cách gọi và mệnh lệnh thân mật không khớp email đầu tiên gửi giảng viên chưa quen.' },
      { text: 'I hereby request an extension consequent to the aforementioned operational cessation.', correct: false, rationale: 'Dạng này quá nặng và mơ hồ so với yêu cầu ngắn; sự trang trọng từ vựng không cải thiện độ rõ.' },
    ], acceptedAnswers: [{ text: 'Dear Professor Lee, could I submit the report on Friday instead? The lab was closed yesterday.', rationale: 'Câu cân bằng sự tôn trọng, yêu cầu rõ và lý do cụ thể mà không phô trương độ trang trọng.' }] }], sources: [
      { id: 'bc-requests', title: 'British Council: Requests, offers and invitations', url: 'https://learnenglish.britishcouncil.org/free-resources/grammar/english-grammar-reference/requests-offers-invitations' },
    ], review: ownerApproval,
  },
];
