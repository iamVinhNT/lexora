/**
 * @file a2.ts
 * @description Original Vietnamese A2 grammar lessons with deterministic practice.
 */
import { ownerApproval, type GrammarLesson, type GrammarSource } from './types.js';

export const a2Lessons: GrammarLesson[] = [
  {
    id: 'grammar-a2-past-continuous', revisionId: 'grammar-a2-past-continuous@1.0.0', revision: '1.0.0', title: 'Quá khứ tiếp diễn: việc đang diễn ra tại một thời điểm quá khứ',
    objective: 'Tạo câu quá khứ tiếp diễn và phối hợp với quá khứ đơn để kể việc đang diễn ra cùng một sự kiện xen vào.',
    prerequisiteIds: ['grammar-a1-past-simple'], coverage: ['past-continuous', 'tense-context-contrast', 'verb-conjugation'],
    explanation: 'Quá khứ tiếp diễn có dạng was/were + V-ing: I/he/she/it was working; you/we/they were working. Dạng này đặt người nghe vào giữa một hành động đang diễn ra tại một thời điểm quá khứ, thường đi với at eight last night. Khi một sự kiện ngắn xảy ra trong lúc hành động nền đang tiếp diễn, dùng quá khứ tiếp diễn cho hành động nền và quá khứ đơn cho sự kiện xen vào; when thường mở đầu sự kiện xen vào, while thường dẫn hành động kéo dài. Cả hai mệnh đề không bắt buộc phải có đủ hai thì này: hai việc kéo dài song song có thể cùng dùng quá khứ tiếp diễn. Phủ định thêm not sau was/were; câu hỏi đảo was/were lên trước chủ ngữ. Không dùng tiếp diễn chỉ vì câu có từ chỉ quá khứ: nếu kể một hành động trọn vẹn đã kết thúc, quá khứ đơn thường phù hợp hơn.',
    examples: [
      { english: 'At nine, I was finishing my report.', vietnamese: 'Lúc chín giờ tôi đang hoàn tất báo cáo; người nghe hình dung tiến trình đang diễn ra lúc đó, không nhất thiết là đã xong.' },
      { english: 'We were walking home when it started to rain.', vietnamese: 'Chúng tôi đang đi bộ thì trời bắt đầu mưa: việc đi bộ là nền kéo dài, mưa bắt đầu là sự kiện xen vào.' },
    ],
    contrasts: [{ form: 'While Mai was cooking, her brother set the table.', whyFits: 'Nấu ăn là tiến trình đang diễn ra; việc bày bàn được kể như một sự kiện hoàn chỉnh trong khoảng đó.', whyNot: '“While Mai cooked, her brother was setting the table” có thể diễn tả cách phân chia thời gian khác, nhưng không phù hợp nếu ý muốn nhấn việc Mai đang giữa chừng nấu ăn khi em trai bày bàn.' }],
    commonMistakes: ['Bỏ be: “They waiting when I arrived”.', 'Chia cả hai động từ sang tiếp diễn dù một sự kiện xen vào được kể như việc xảy ra trọn vẹn.', 'Dùng was với chủ ngữ số nhiều.'],
    summary: 'was/were + V-ing mở ra một thời điểm hoặc hành động nền trong quá khứ; quá khứ đơn thường kể sự kiện xen vào đã xảy ra.',
    exercises: [{ id: 'grammar-a2-past-continuous-q1', prompt: 'At 10 p.m. last night, the children ___ (sleep); their parents saw them still asleep at that moment.', options: [
      { text: 'slept', correct: false, rationale: 'Slept kể việc ngủ như một sự kiện hoàn chỉnh; câu yêu cầu hình dung việc vẫn đang diễn ra khi bố mẹ nhìn thấy.' },
      { text: 'were sleeping', correct: true, rationale: 'The children là chủ ngữ số nhiều, đi với were + sleeping để diễn tả tiến trình tại mốc quá khứ.' },
      { text: 'was sleeping', correct: false, rationale: 'Dạng tiếp diễn phù hợp về ý, nhưng was không hòa hợp với chủ ngữ số nhiều the children.' },
    ], acceptedAnswers: [{ text: 'were sleeping', rationale: 'Were + V-ing diễn tả việc đang diễn ra tại mốc 10 giờ tối qua.' }] }],
    sources: [
      { id: 'bc-past-continuous-past-simple', title: 'British Council: Past continuous and past simple', url: 'https://learnenglish.britishcouncil.org/free-resources/grammar/a1-a2/past-continuous-past-simple' },
    ],
    review: ownerApproval,
  },
  {
    id: 'grammar-a2-intro-present-perfect', revisionId: 'grammar-a2-intro-present-perfect@1.0.0', revision: '1.0.0', title: 'Hiện tại hoàn thành nhập môn: kinh nghiệm và kết quả hiện tại',
    objective: 'Dùng have/has + quá khứ phân từ cho kinh nghiệm hoặc kết quả còn liên quan hiện tại và phân biệt với mốc quá khứ đã kết thúc.',
    prerequisiteIds: ['grammar-a2-past-continuous'], coverage: ['intro-present-perfect', 'present-perfect', 'past-simple-contrast', 'verb-conjugation'],
    explanation: 'Hiện tại hoàn thành có dạng have/has + quá khứ phân từ: I have seen; Linh has seen. Với động từ có quy tắc, phân từ thường giống dạng -ed; nhiều động từ bất quy tắc cần học riêng như go–went–gone. Dùng thì này khi nói đã từng trải nghiệm nhưng không nêu một thời điểm quá khứ đã kết thúc, hoặc khi kết quả quá khứ còn quan trọng ở hiện tại: I have lost my key nghĩa là hiện giờ tôi không có chìa. Với just, already, yet, since, for, nghĩa thường nối sự việc trước đây với hiện tại; không ghép hiện tại hoàn thành với yesterday, last year hay một mốc đã kết thúc. Câu hỏi đảo have/has lên trước chủ ngữ; phủ định đặt not sau trợ động từ. Cùng một việc có thể kể bằng hai thì tùy câu hỏi: hiện tại hoàn thành nói kinh nghiệm, quá khứ đơn xác định lúc việc xảy ra.',
    examples: [
      { english: 'Have you ever tried durian?', vietnamese: 'Bạn đã từng ăn sầu riêng chưa? Hỏi về kinh nghiệm trong đời đến hiện tại, không hỏi lần ăn vào ngày nào.' },
      { english: 'I have lost my card, so I cannot get into the building.', vietnamese: 'Tôi làm mất thẻ nên bây giờ không vào tòa nhà được; kết quả hiện tại là trọng tâm.' },
    ],
    contrasts: [{ form: 'I have visited Hue, but I went there in 2022.', whyFits: 'Hiện tại hoàn thành nêu kinh nghiệm; mệnh đề sau dùng quá khứ đơn để cho biết thời điểm đã kết thúc.', whyNot: '“I have visited Hue in 2022” không phù hợp vì in 2022 khóa sự việc vào một khoảng quá khứ đã kết thúc; khi ấy dùng visited.' }],
    commonMistakes: ['Dùng have went thay vì have gone.', 'Dùng hiện tại hoàn thành với yesterday hoặc last month.', 'Cho rằng thì này luôn tương đương “đã” và bỏ qua liên hệ với hiện tại.'],
    summary: 'have/has + phân từ nối trải nghiệm hoặc kết quả quá khứ với hiện tại; mốc quá khứ đã kết thúc thường gọi quá khứ đơn.',
    exercises: [{ id: 'grammar-a2-intro-present-perfect-q1', prompt: 'Chọn cách hoàn tất câu hỏi kinh nghiệm: ___ you ever ___ sushi?', options: [
      { text: 'Did / eat', correct: false, rationale: 'Did you ever eat có thể hỏi một dịp quá khứ đã kết thúc; câu này đang hỏi kinh nghiệm tính đến nay.' },
      { text: 'Have / eaten', correct: true, rationale: 'Have + you + quá khứ phân từ eaten hỏi kinh nghiệm đến hiện tại; ever thường gặp trong kiểu câu hỏi này.' },
      { text: 'Have / ate', correct: false, rationale: 'Sau have phải dùng phân từ eaten, không dùng dạng quá khứ ate.' },
    ], acceptedAnswers: [
      { text: 'Have / eaten', rationale: 'Have + you + ever + phân từ eaten tạo câu hỏi về kinh nghiệm tính đến hiện tại.' },
      { text: 'Have you ever eaten sushi?', rationale: 'Have + chủ ngữ + ever + phân từ tạo câu hỏi về kinh nghiệm đến hiện tại.' },
    ] }],
    sources: [
      { id: 'bc-present-perfect', title: 'British Council: Present perfect', url: 'https://learnenglish.britishcouncil.org/free-resources/grammar/b1-b2/present-perfect' },
    ],
    review: ownerApproval,
  },
  {
    id: 'grammar-a2-future-forms', revisionId: 'grammar-a2-future-forms@1.0.0', revision: '1.0.0', title: 'Nói về tương lai: dự định, sắp xếp và dự đoán',
    objective: 'Chọn will, be going to hoặc hiện tại tiếp diễn theo việc quyết định lúc nói, dự định có trước hay sắp xếp đã chốt.',
    prerequisiteIds: ['grammar-a2-intro-present-perfect'], coverage: ['future-forms', 'will', 'going-to', 'present-continuous-future'],
    explanation: 'Tiếng Anh không có một dạng tương lai duy nhất dùng cho mọi ý. Will + động từ nguyên mẫu thường diễn tả quyết định vừa đưa ra, lời hứa hoặc dự đoán của người nói: I’ll answer it. Be going to + nguyên mẫu thường nêu dự định đã có trước hoặc dự đoán dựa trên dấu hiệu đang thấy: Look at those clouds. It’s going to rain. Hiện tại tiếp diễn (am/is/are + V-ing) dùng cho cuộc hẹn hay sắp xếp cá nhân đã định, thường có thời gian hoặc người liên quan cụ thể: I’m meeting Ana at six. Các cách này có vùng nghĩa giao nhau; lựa chọn phụ thuộc điều người nói muốn nhấn, không phải một bảng từ khóa cứng. Câu hỏi/phủ định của going to chia be; will tạo phủ định won’t và câu hỏi đảo will. Đừng dùng will sau if trong mệnh đề điều kiện cơ bản chỉ điều kiện tương lai; phần đó học ở B1.',
    examples: [
      { english: 'The phone is ringing. I’ll get it.', vietnamese: 'Điện thoại đang reo. Để tôi nghe; lời đề nghị là quyết định ngay lúc nói.' },
      { english: 'We are having lunch with the Parkers on Sunday; we booked a table.', vietnamese: 'Chúng tôi ăn trưa với gia đình Parker vào Chủ nhật; đã đặt bàn, nên đây là sắp xếp cụ thể.' },
    ],
    contrasts: [{ form: 'I’m going to apply for that course; I’ve decided already.', whyFits: 'Người nói đã có dự định trước khi phát ngôn.', whyNot: '“I’ll apply” không sai ngữ pháp, nhưng trong ngữ cảnh này có thể nghe như quyết định hoặc cam kết vừa đưa ra thay vì dự định đã hình thành; will sẽ phù hợp nếu người nói muốn nhấn lời hứa.' }],
    commonMistakes: ['Dùng will cho mọi câu nói tương lai, làm mất khác biệt về dự định và sắp xếp.', 'Quên am/is/are trong be going to.', 'Nhầm V-ing tương lai với hiện tại tiếp diễn đang xảy ra vì bỏ qua mốc thời gian đã hẹn.'],
    summary: 'Will thường là quyết định/lời hứa/dự đoán; going to là dự định có trước hoặc dấu hiệu; tiếp diễn là sắp xếp đã chốt. Ngữ cảnh quyết định sắc thái.',
    exercises: [{ id: 'grammar-a2-future-forms-q1', prompt: 'A: “I forgot my umbrella.” B: Chọn một trong những câu phù hợp để đề nghị chia ô ngay lúc này.', options: [
      { text: 'Don’t worry, I will share mine with you.', correct: true, rationale: 'Will thường diễn tả quyết định/lời đề nghị hình thành ngay khi nghe tình huống; đây là đáp án điển hình.' },
      { text: 'Don’t worry, I am going to share mine with you.', correct: true, rationale: 'Going to cũng tự nhiên nếu người nói trình bày ý định vừa hình thành; trong ngữ cảnh này đây vẫn là một cách nói đúng.' },
      { text: 'Don’t worry, I am sharing mine with you.', correct: false, rationale: 'Hiện tại tiếp diễn tương lai thường gợi một sắp xếp đã chốt; ngữ cảnh không nêu cuộc hẹn hay kế hoạch có trước.' },
    ], acceptedAnswers: [
      { text: 'Don’t worry, I will share mine with you.', rationale: 'Will thường hợp với quyết định tức thời; dạng rút gọn “I’ll share mine with you” cũng đúng.' },
      { text: 'Don’t worry, I’ll share mine with you.', rationale: 'I’ll là dạng rút gọn của I will, phù hợp lời đề nghị ngay lúc nói.' },
      { text: 'Don’t worry, I am going to share mine with you.', rationale: 'Going to cũng dùng được khi người nói hình thành ý định giúp ngay trong cuộc trò chuyện.' },
    ] }],
    sources: [
      { id: 'bc-future-forms', title: 'British Council: Future forms: will, be going to and present continuous', url: 'https://learnenglish.britishcouncil.org/free-resources/grammar/b1-b2/future-forms-will-be-going-present-continuous' },
    ],
    review: ownerApproval,
  },
  {
    id: 'grammar-a2-comparatives', revisionId: 'grammar-a2-comparatives@1.0.0', revision: '1.0.0', title: 'So sánh hơn và so sánh bằng',
    objective: 'So sánh hai người hoặc vật bằng tính từ ngắn/dài, dạng bất quy tắc và cấu trúc as ... as.',
    prerequisiteIds: ['grammar-a2-future-forms'], coverage: ['comparatives', 'adjective-forms'],
    explanation: 'Khi so sánh hai đối tượng, nhiều tính từ ngắn thêm -er rồi dùng than: small–smaller than; tính từ dài thường đi với more: more useful than. Một số dạng cần nhớ như good–better, bad–worse; tận cùng phụ âm-y thường đổi y thành i (easy–easier). Không thêm more đồng thời với -er trong cấu trúc cơ bản. Dùng as + tính từ nguyên mẫu + as để nói hai đối tượng ngang nhau; phủ định not as ... as có thể diễn tả mức độ thấp hơn. Than thường nối đối tượng thứ hai: This route is shorter than the old one. So sánh cần tiêu chí và đối tượng rõ; tính từ so sánh không tự nói ai “tốt nhất” trong nhóm từ ba trở lên. Trong hội thoại có thể lược phần sau than nếu đã hiểu, nhưng không lược thành phần làm người đọc nhầm đối tượng so sánh.',
    examples: [
      { english: 'This exercise is easier than the last one.', vietnamese: 'Bài tập này dễ hơn bài trước. Easy đổi y thành i rồi thêm -er.' },
      { english: 'The blue bag is as heavy as the black bag.', vietnamese: 'Túi xanh nặng ngang túi đen; as ... as diễn tả hai mức bằng nhau.' },
    ],
    contrasts: [{ form: 'The train is more comfortable than the bus.', whyFits: 'Comfortable là tính từ nhiều âm tiết; more đứng trước tính từ và than đưa ra đối tượng so sánh.', whyNot: '“Comfortabler than” không phải dạng so sánh thông thường của tính từ này; “more comfortabler” dùng đồng thời hai dấu hiệu so sánh.' }],
    commonMistakes: ['Viết more cheaper hoặc beautifuller.', 'Quên than khi cần nêu đối tượng so sánh.', 'Dùng better như tính từ gốc rồi thêm more.'],
    summary: 'Tính từ ngắn thường + -er; tính từ dài thường dùng more; as ... as so sánh ngang bằng; học riêng dạng bất quy tắc.',
    exercises: [{ id: 'grammar-a2-comparatives-q1', prompt: 'This route is ___ (short) than the coastal road.', options: [
      { text: 'more short', correct: false, rationale: 'Short là tính từ ngắn, dạng so sánh thông thường là shorter.' },
      { text: 'shorter', correct: true, rationale: 'Short + -er tạo shorter; than nối với con đường được so sánh.' },
      { text: 'the shortest', correct: false, rationale: 'The shortest là so sánh nhất cho một nhóm, trong khi câu này so sánh hai tuyến bằng than.' },
    ], acceptedAnswers: [{ text: 'shorter', rationale: 'Shorter than diễn tả tuyến đường ngắn hơn tuyến còn lại.' }] }],
    sources: [
      { id: 'bc-comparative-adjectives', title: 'British Council: Comparative adjectives', url: 'https://learnenglish.britishcouncil.org/free-resources/grammar/a1-a2/comparative-adjectives' },
    ],
    review: ownerApproval,
  },
  {
    id: 'grammar-a2-quantifiers', revisionId: 'grammar-a2-quantifiers@1.0.0', revision: '1.0.0', title: 'Lượng từ: phân biệt danh từ đếm được và không đếm được',
    objective: 'Dùng some, any, much, many, a lot of và a few/a little theo loại danh từ và ý khẳng định, hỏi hoặc phủ định.',
    prerequisiteIds: ['grammar-a2-comparatives'], coverage: ['quantifiers', 'countable-uncountable-nouns'],
    explanation: 'Trước khi chọn lượng từ, xác định danh từ là đếm được hay không đếm được trong nghĩa đang dùng. Danh từ đếm được có dạng số nhiều như apples, chairs; danh từ không đếm được thường là chất liệu hoặc khái niệm khối như water, information và không thêm -s theo nghĩa đó. Many đi với danh từ đếm được số nhiều; much đi với danh từ không đếm được, đặc biệt trong câu hỏi và phủ định. A lot of dùng được với cả hai loại và thường tự nhiên trong câu khẳng định. Some thường xuất hiện trong câu khẳng định; any thường dùng trong câu hỏi/phủ định, nhưng lời mời hoặc đề nghị có thể dùng some khi người nói mong câu trả lời thuận. A few có nghĩa một số, còn a little là một lượng nhỏ; bỏ a (few/little) tạo sắc thái gần như không đủ. Many danh từ đổi theo nghĩa: chicken là thịt không đếm được nhưng chickens là những con gà đếm được.',
    examples: [
      { english: 'How many chairs do we need? We need a few more.', vietnamese: 'Cần bao nhiêu chiếc ghế? Cần thêm vài chiếc. Chairs đếm được số nhiều nên dùng many/a few.' },
      { english: 'There isn’t much information, but we have a lot of useful advice.', vietnamese: 'Không có nhiều thông tin, nhưng có nhiều lời khuyên hữu ích. Information và advice không đếm được trong nghĩa này.' },
    ],
    contrasts: [{ form: 'Would you like some tea?', whyFits: 'Some tự nhiên trong lời mời vì người nói đưa ra một lựa chọn và thường mong câu trả lời nhận lời.', whyNot: '“Would you like any tea?” có thể xuất hiện trong một số ngữ cảnh, nhưng với lời mời thân thiện thông thường, any nghe kém trực tiếp tự nhiên hơn.' }],
    commonMistakes: ['Viết informations hoặc advices theo quy tắc số nhiều tiếng Việt.', 'Dùng much với danh từ đếm được như much chairs.', 'Nhầm a few (một vài) với few (hầu như không có).'],
    summary: 'Many/a few đi với danh từ đếm được số nhiều; much/a little với danh từ không đếm được; a lot of dùng cho cả hai.',
    exercises: [{ id: 'grammar-a2-quantifiers-q1', prompt: 'We have ___ time before the train leaves, so let’s walk slowly.', options: [
      { text: 'a few', correct: false, rationale: 'Time trong nghĩa thời lượng là không đếm được, không đi với a few.' },
      { text: 'a little', correct: true, rationale: 'A little đi với time không đếm được và nói còn một lượng thời gian.' },
      { text: 'many', correct: false, rationale: 'Many cần danh từ đếm được số nhiều; time ở đây là lượng không đếm được.' },
    ], acceptedAnswers: [{ text: 'a little', rationale: 'A little time là một ít thời gian còn lại.' }] }],
    sources: [
      { id: 'bc-nouns-countable-uncountable', title: 'British Council: Nouns: countable and uncountable', url: 'https://learnenglish.britishcouncil.org/free-resources/grammar/a1-a2/nouns-countable-uncountable' },
      { id: 'bc-quantifiers-few-little', title: 'British Council: Quantifiers: few, a few, little and a bit of', url: 'https://learnenglish.britishcouncil.org/free-resources/grammar/a1-a2-grammar/quantifiers-few-a-few-little-a-bit' },
    ],
    review: ownerApproval,
  },
  {
    id: 'grammar-a2-basic-modals', revisionId: 'grammar-a2-basic-modals@1.0.0', revision: '1.0.0', title: 'Động từ khuyết thiếu cơ bản: khả năng, lời khuyên và nghĩa vụ',
    objective: 'Dùng can/could, should và must/have to với động từ nguyên mẫu để nói khả năng, lời khuyên hoặc mức độ bắt buộc.',
    prerequisiteIds: ['grammar-a2-quantifiers'], coverage: ['basic-modals', 'modal-verbs', 'advice-obligation-ability'],
    explanation: 'Động từ khuyết thiếu đứng trước động từ nguyên mẫu không to: can swim, should rest, must leave. Không thêm -s cho he/she/it; câu hỏi đảo modal lên trước chủ ngữ và phủ định thêm not ngay sau modal. Can diễn tả khả năng hiện tại hoặc xin phép thân mật; could thường nói khả năng quá khứ hoặc lời đề nghị/yêu cầu lịch sự hơn, tùy ngữ cảnh. Should đưa lời khuyên, không phải mệnh lệnh tuyệt đối. Must thể hiện nghĩa vụ mạnh hoặc kết luận chắc chắn của người nói; have to thường nêu điều bắt buộc do quy định hay hoàn cảnh, và chia have theo chủ ngữ/thì: she has to wear a badge. Phủ định mustn’t nghĩa là bị cấm; don’t have to nghĩa là không cần thiết—hai nghĩa trái nhau, cần đọc kỹ ngữ cảnh. Chọn modal theo quan hệ và mức độ chắc chắn, không chỉ theo một từ dịch cố định.',
    examples: [
      { english: 'You should save a copy before you edit the file.', vietnamese: 'Bạn nên lưu một bản trước khi sửa tệp; đây là lời khuyên để tránh rủi ro.' },
      { english: 'Visitors must not touch the paintings, but they don’t have to book a time slot.', vietnamese: 'Khách không được chạm vào tranh, nhưng không bắt buộc đặt giờ; must not là cấm, don’t have to là không cần.' },
    ],
    contrasts: [{ form: 'You don’t have to bring food; the host has prepared dinner.', whyFits: 'Ý là không cần mang thức ăn vì bữa tối đã được chuẩn bị.', whyNot: '“You mustn’t bring food” sẽ biến lời trấn an thành lệnh cấm mang thức ăn, một nghĩa khác hẳn.' }],
    commonMistakes: ['Viết “She cans swim” hoặc “should to rest”.', 'Đánh đồng mustn’t với don’t have to.', 'Dùng could như quá khứ duy nhất dù trong yêu cầu nó có thể biểu thị sự lịch sự.'],
    summary: 'Modal + nguyên mẫu không to; should là lời khuyên, must/have to là nghĩa vụ; mustn’t cấm còn don’t have to không bắt buộc.',
    exercises: [{ id: 'grammar-a2-basic-modals-q1', prompt: 'The museum sign says “No food or drink.” You ___ eat in this room.', options: [
      { text: 'don’t have to', correct: false, rationale: 'Don’t have to chỉ nói không cần làm, không thể hiện lệnh cấm trên biển.' },
      { text: 'mustn’t', correct: true, rationale: 'Biển báo quy định cấm ăn trong phòng; mustn’t diễn tả điều bị cấm.' },
      { text: 'should', correct: false, rationale: 'Should là lời khuyên, nhẹ hơn và không thể hiện quy định cấm rõ ràng.' },
    ], acceptedAnswers: [{ text: 'mustn’t', rationale: 'Mustn’t phù hợp với lệnh cấm được nêu trên biển.' }] }],
    sources: [
      { id: 'bc-modals-permission-obligation', title: 'British Council: Modals: permission and obligation', url: 'https://learnenglish.britishcouncil.org/free-resources/grammar/b1-b2/modals-permission-obligation' },
      { id: 'bc-past-ability', title: 'British Council: Past ability', url: 'https://learnenglish.britishcouncil.org/free-resources/grammar/b1-b2/past-ability' },
    ],
    review: ownerApproval,
  },
];
