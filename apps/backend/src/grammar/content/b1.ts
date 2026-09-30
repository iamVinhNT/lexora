/**
 * @file b1.ts
 * @description Original Vietnamese B1 grammar lessons with deterministic practice.
 */
import { ownerApproval, type GrammarLesson, type GrammarSource } from './types.js';

export const b1Lessons: GrammarLesson[] = [
  {
    id: 'grammar-b1-tense-aspect-context', revisionId: 'grammar-b1-tense-aspect-context@1.0.0', revision: '1.0.0', title: 'Chọn thì và thể theo mốc nhìn của câu chuyện',
    objective: 'Phân biệt sự kiện quá khứ đã kết thúc, tiến trình làm nền và kinh nghiệm/kết quả còn liên quan hiện tại.',
    prerequisiteIds: ['grammar-a2-basic-modals'], coverage: ['tense-aspect-in-context', 'past-simple', 'past-continuous', 'present-perfect'],
    explanation: 'Khi kể chuyện, hãy hỏi người nghe cần biết điều gì: việc đã xảy ra như một sự kiện trọn vẹn, điều đang diễn ra tại một mốc, hay mối liên hệ của quá khứ với hiện tại? Quá khứ đơn đặt sự kiện trong khoảng thời gian đã kết thúc: We arrived at six. Quá khứ tiếp diễn đưa người nghe vào giữa một tiến trình tại thời điểm đó: We were driving at six. Hiện tại hoàn thành nhìn từ hiện tại về trải nghiệm hoặc kết quả trước đó: We have arrived, nên hiện giờ chúng ta đã tới nơi. Đây là khác biệt về cách trình bày thời gian, không phải chỉ đổi hình thức động từ. Khi chuỗi kể chuyện nêu ngày/giờ đã kết thúc, past simple thường rõ nhất; khi nêu nền hoặc sự kiện xen vào, kết hợp past continuous với past simple; khi hỏi “đã từng chưa” đến hiện tại hoặc kết quả còn hiệu lực, present perfect thích hợp. Một trạng từ đơn lẻ không quyết định thì nếu ý nghĩa rộng hơn khác đi.',
    examples: [
      { english: 'I was reading when the lights went out.', vietnamese: 'Tôi đang đọc thì đèn tắt. Đọc là nền đang diễn ra; đèn tắt là sự kiện xen vào.' },
      { english: 'I read that book last summer, and I have recommended it to three friends since then.', vietnamese: 'Tôi đọc cuốn đó mùa hè năm ngoái (khoảng đã kết thúc), và từ đó đến nay đã giới thiệu cho ba người (kết quả kéo tới hiện tại).' },
    ],
    contrasts: [{ form: 'She has worked here for five years and still works here.', whyFits: 'Khoảng thời gian bắt đầu trong quá khứ vẫn tiếp tục, nên hiện tại hoàn thành kết nối quá khứ và hiện tại.', whyNot: '“She worked here for five years” thường gợi quãng làm việc đã kết thúc; không hợp với mệnh đề still works nếu ý muốn nói công việc vẫn tiếp diễn.' }],
    commonMistakes: ['Dùng present perfect với thời điểm quá khứ đã đóng như in 2021.', 'Dùng past continuous chỉ vì hành động kéo dài, dù câu đang kể sự kiện trọn vẹn.', 'Cho rằng một trạng từ luôn bắt buộc một thì bất kể ý định diễn đạt.'],
    summary: 'Chọn thì theo mốc nhìn: sự kiện quá khứ đóng (past simple), tiến trình tại mốc (past continuous), hoặc liên hệ tới hiện tại (present perfect).',
    exercises: [{ id: 'grammar-b1-tense-aspect-context-q1', prompt: '“I ___ my keys, so I can’t open the door now.” (lose) Nhấn kết quả hiện tại.', options: [
      { text: 'lost', correct: false, rationale: 'Lost chỉ kể một sự kiện đã xảy ra; riêng nó không nối rõ việc mất chìa với việc hiện giờ không mở cửa được.' },
      { text: 'have lost', correct: true, rationale: 'Have lost trình bày kết quả hiện tại của việc mất chìa, khớp với so I can’t open the door now.' },
      { text: 'was losing', correct: false, rationale: 'Was losing mô tả tiến trình mất dần tại một mốc quá khứ; không diễn đạt tự nhiên kết quả hoàn tất đang ảnh hưởng hiện tại.' },
    ], acceptedAnswers: [{ text: 'have lost', rationale: 'Hiện tại hoàn thành nêu việc đã xảy ra với kết quả chìa khóa hiện không có.' }] }],
    sources: [
      { id: 'bc-past-continuous-past-simple', title: 'British Council: Past continuous and past simple', url: 'https://learnenglish.britishcouncil.org/free-resources/grammar/a1-a2/past-continuous-past-simple' },
      { id: 'bc-present-perfect', title: 'British Council: Present perfect', url: 'https://learnenglish.britishcouncil.org/free-resources/grammar/b1-b2/present-perfect' },
    ],
    review: ownerApproval,
  },
  {
    id: 'grammar-b1-conditionals-zero-first-second', revisionId: 'grammar-b1-conditionals-zero-first-second@1.0.0', revision: '1.0.0', title: 'Câu điều kiện 0, 1 và 2: sự thật, khả năng và giả định',
    objective: 'Chọn loại câu điều kiện theo mức độ khái quát, khả năng tương lai hoặc khoảng cách giả định với hiện tại.',
    prerequisiteIds: ['grammar-b1-tense-aspect-context'], coverage: ['zero-first-second-conditionals', 'zero-conditional', 'first-conditional', 'second-conditional'],
    explanation: 'Câu điều kiện nối một tình huống với kết quả, nhưng các mẫu không chỉ khác nhau ở thì. Loại 0 thường nói quy luật hoặc thói quen: If you heat ice, it melts; hiện tại đơn ở cả hai vế thể hiện quan hệ khái quát. Loại 1 nói khả năng có thật hoặc được xem là có thể xảy ra trong tương lai: If it rains tomorrow, we’ll stay home; mệnh đề if dùng hiện tại đơn, còn mệnh đề kết quả có thể dùng will. Loại 2 hình dung tình huống hiện tại/tương lai xa thực tế hoặc ít có khả năng hơn: If I had more time, I would learn Korean. Dạng quá khứ ở vế if tạo khoảng cách giả định, không nhất thiết nói quá khứ; với be, were thường được dùng trong lối giả định trang trọng (If I were you). Tránh will ngay sau if trong mẫu điều kiện tương lai cơ bản; cấu trúc này được giữ ở mệnh đề kết quả. Thay đổi mẫu có thể đúng nếu ý định và thời gian thay đổi, nên cần đọc dấu hiệu và thái độ người nói.',
    examples: [
      { english: 'If you leave milk out in the sun, it spoils.', vietnamese: 'Nếu để sữa ngoài nắng, sữa hỏng: nhận định khái quát, không phải một dự đoán cho ngày mai.' },
      { english: 'If the meeting finishes early, we’ll call you.', vietnamese: 'Nếu cuộc họp kết thúc sớm, chúng tôi sẽ gọi; đây là một khả năng tương lai được xem là có thể.' },
    ],
    contrasts: [{ form: 'If I lived closer, I would walk to work.', whyFits: 'Người nói hiện không sống gần; loại 2 diễn tả hoàn cảnh trái với thực tế hiện tại hoặc được xem là xa thực tế.', whyNot: '“If I live closer, I will walk to work” mô tả khả năng thực tế trong tương lai, không còn giữ ý khoảng cách giả định của câu gốc.' }],
    commonMistakes: ['Dùng “If it will rain, we will stay home” trong điều kiện tương lai cơ bản.', 'Cho rằng were/had trong loại 2 luôn kể quá khứ.', 'Dùng loại 0 cho một dự đoán riêng chỉ xảy ra ngày mai.'],
    summary: 'Loại 0: quy luật; loại 1: khả năng tương lai; loại 2: giả định xa thực tế. Thì ở vế if giúp biểu đạt khoảng cách, không chỉ thời gian.',
    exercises: [{ id: 'grammar-b1-conditionals-q1', prompt: 'If the weather ___ fine tomorrow, we ___ the match outside. Người nói xem đây là khả năng thực tế.', options: [
      { text: 'is / will play', correct: true, rationale: 'Loại 1 dùng hiện tại đơn trong vế if và will ở kết quả cho khả năng tương lai.' },
      { text: 'will be / will play', correct: false, rationale: 'Trong mẫu điều kiện tương lai cơ bản, không đặt will ở vế if; hiện tại đơn thể hiện điều kiện.' },
      { text: 'were / would play', correct: false, rationale: 'Loại 2 sẽ trình bày thời tiết như một giả định xa thực tế, trái với ngữ cảnh khả năng thật.' },
    ], acceptedAnswers: [{ text: 'is / will play', rationale: 'If + hiện tại đơn kết hợp kết quả will cho một điều kiện tương lai có thể xảy ra.' }] }],
    sources: [
      { id: 'bc-zero-first-second-conditionals', title: 'British Council: Conditionals: zero, first and second', url: 'https://learnenglish.britishcouncil.org/free-resources/grammar/b1-b2/conditionals-zero-first-second' },
    ],
    review: ownerApproval,
  },
  {
    id: 'grammar-b1-passive-voice', revisionId: 'grammar-b1-passive-voice@1.0.0', revision: '1.0.0', title: 'Câu bị động: đưa kết quả hoặc đối tượng lên trọng tâm',
    objective: 'Tạo câu bị động với be + quá khứ phân từ và chọn khi nào nên giữ hoặc lược tác nhân.',
    prerequisiteIds: ['grammar-b1-conditionals-zero-first-second'], coverage: ['passive-voice', 'agent-by-phrase', 'passive-tense-forms'],
    explanation: 'Câu chủ động đặt người làm trước: The team repaired the bridge. Câu bị động đổi đối tượng chịu tác động lên làm chủ ngữ và dùng dạng thích hợp của be + quá khứ phân từ: The bridge was repaired by the team. Giữ nguyên thì qua be (repairs → is repaired; repaired → was repaired; has repaired → has been repaired); động từ chính trở thành phân từ, không phải dạng quá khứ đơn tùy ý. Dùng bị động khi quá trình/kết quả quan trọng hơn người làm, khi người làm chưa biết hoặc đã rõ từ ngữ cảnh, hay khi văn bản muốn tránh tập trung vào tác nhân. Có thể thêm by + tác nhân nếu thông tin ấy quan trọng. Không phải động từ nào cũng chuyển bị động tự nhiên: thường cần động từ có tân ngữ trực tiếp. Bị động không mặc định trang trọng hay tốt hơn; nếu nó làm câu mơ hồ hoặc che mất người chịu trách nhiệm, chủ động có thể phù hợp hơn.',
    examples: [
      { english: 'The new library was opened in May.', vietnamese: 'Thư viện mới được mở cửa vào tháng Năm. Ngày mở cửa quan trọng hơn việc nêu ai làm lễ.' },
      { english: 'The report has been checked by two editors.', vietnamese: 'Báo cáo đã được hai biên tập viên kiểm tra. Dùng has been + checked để giữ hiện tại hoàn thành.' },
    ],
    contrasts: [{ form: 'The missing paintings were found yesterday.', whyFits: 'Tác phẩm được tìm thấy là thông tin mới và trọng tâm; người tìm có thể không liên quan hoặc chưa biết.', whyNot: '“Someone found the missing paintings yesterday” không sai, nhưng someone mơ hồ và chuyển trọng tâm khỏi phát hiện quan trọng.' }],
    commonMistakes: ['Bỏ be: “The road repaired yesterday”.', 'Dùng quá khứ đơn thay phân từ với động từ bất quy tắc.', 'Tạo bị động với động từ không có tân ngữ phù hợp hoặc dùng by khi tác nhân không quan trọng.'],
    summary: 'Bị động = be chia theo thì + phân từ; dùng để đưa đối tượng/kết quả lên trọng tâm, chỉ nêu tác nhân khi có ích.',
    exercises: [{ id: 'grammar-b1-passive-voice-q1', prompt: 'Đổi sang bị động, giữ thông tin thời gian: “Workers built this bridge in 1998.”', options: [
      { text: 'This bridge was built in 1998.', correct: true, rationale: 'This bridge lên làm chủ ngữ; was giữ quá khứ đơn và built là phân từ bất quy tắc.' },
      { text: 'This bridge built in 1998.', correct: false, rationale: 'Câu thiếu be; dạng bị động cần was + built.' },
      { text: 'This bridge has been built in 1998.', correct: false, rationale: 'Present perfect không đi tự nhiên với mốc thời gian quá khứ đã kết thúc in 1998; cần quá khứ đơn.' },
    ], acceptedAnswers: [{ text: 'This bridge was built in 1998.', rationale: 'Was built giữ mốc quá khứ đã kết thúc và tạo bị động đúng.' }] }],
    sources: [
      { id: 'bc-passives', title: 'British Council: Passives', url: 'https://learnenglish.britishcouncil.org/free-resources/grammar/b1-b2/passives' },
    ],
    review: ownerApproval,
  },
  {
    id: 'grammar-b1-reported-speech', revisionId: 'grammar-b1-reported-speech@1.0.0', revision: '1.0.0', title: 'Tường thuật lời nói: lùi thì khi góc nhìn chuyển về quá khứ',
    objective: 'Tường thuật câu nói với say/tell, điều chỉnh đại từ, từ chỉ thời gian và thì theo góc nhìn người kể.',
    prerequisiteIds: ['grammar-b1-passive-voice'], coverage: ['reported-speech', 'reported-statements', 'reported-questions', 'backshift'],
    explanation: 'Khi thuật lại lời người khác, đặt lời nói vào khung câu mới: “I am busy,” Lan said → Lan said (that) she was busy. Đại từ đổi theo người nói/người nghe trong tình huống tường thuật; không máy móc đổi mọi I thành he. Nếu động từ tường thuật ở quá khứ, thì thường lùi một bước để phản ánh góc nhìn quá khứ: am → was, will → would, have finished → had finished. Từ chỉ thời gian/nơi chốn như today/now/here có thể đổi thành that day/then/there nếu bối cảnh nhìn đã dịch chuyển. Việc lùi thì không tuyệt đối: khi lời nói vẫn đúng hoặc người thuật lại giữ mốc hiện tại, hiện tại có thể được giữ. Câu hỏi gián tiếp dùng trật tự câu kể sau if/whether hoặc từ hỏi: She asked where I lived, không đảo trợ động từ như câu hỏi trực tiếp. Say thường không cần tân ngữ người nghe; tell thường cần tell + người nghe.',
    examples: [
      { english: '“I can help you tomorrow,” Nam said. → Nam said he could help me the next day.', vietnamese: 'Nam nói anh ấy có thể giúp tôi vào ngày hôm sau; I/you và tomorrow đổi theo người được thuật và mốc kể.' },
      { english: '“Where do you work?” she asked. → She asked where I worked.', vietnamese: 'Câu hỏi từ để hỏi giữ where nhưng chuyển sang trật tự chủ ngữ + động từ, không còn do-support.' },
    ],
    contrasts: [{ form: 'The guide said that water boils at 100°C at sea level.', whyFits: 'Đây là một sự thật chung vẫn đúng; giữ boils giúp câu tường thuật nêu quy luật hiện tại.', whyNot: '“The guide said water boiled at 100°C” có thể đúng trong một số mạch kể lùi thì, nhưng không cần đổi sự thật vẫn đúng chỉ để áp một quy tắc máy móc.' }],
    commonMistakes: ['Đổi đại từ mà không xét ai đang nói với ai.', 'Giữ trật tự câu hỏi trực tiếp: “She asked where did I live”.', 'Lùi thì ngay cả khi muốn khẳng định rõ một sự thật vẫn đúng ở hiện tại.'],
    summary: 'Tường thuật điều chỉnh góc nhìn, đại từ và đôi khi thì/thời gian; câu hỏi gián tiếp dùng trật tự câu kể. Lùi thì là xu hướng theo ngữ cảnh.',
    exercises: [{ id: 'grammar-b1-reported-speech-q1', prompt: 'Chọn cách tường thuật tự nhiên: “I am working today,” Minh said. (kể lại vào ngày hôm sau)', options: [
      { text: 'Minh said that he was working that day.', correct: true, rationale: 'Đổi I theo người nói thành he; am lùi thành was; today đổi thành that day theo mốc kể hôm sau.' },
      { text: 'Minh said that I am working today.', correct: false, rationale: 'Câu giữ nguyên góc nhìn và ngày của lời trực tiếp nên không rõ ai là I/today trong lời kể.' },
      { text: 'Minh told that he was working that day.', correct: false, rationale: 'Tell thường cần người nghe theo sau (told me/us); nếu không nêu tân ngữ, dùng said.' },
    ], acceptedAnswers: [
      { text: 'Minh said that he was working that day.', rationale: 'Các đại từ và thời gian lùi theo hoàn cảnh kể; said phù hợp khi không nêu người nghe.' },
      { text: 'Minh said he was working that day.', rationale: 'That có thể lược sau said mà không đổi ý; he và that day vẫn theo góc nhìn lời kể.' },
    ] }],
    sources: [
      { id: 'bc-reported-speech-statements', title: 'British Council: Reported speech: statements', url: 'https://learnenglish.britishcouncil.org/free-resources/grammar/b1-b2/reported-speech-statements' },
      { id: 'bc-reported-speech-questions', title: 'British Council: Reported speech: questions', url: 'https://learnenglish.britishcouncil.org/free-resources/grammar/b1-b2/reported-speech-questions' },
      { id: 'bc-reported-speech-reporting-verbs', title: 'British Council: Reported speech: reporting verbs', url: 'https://learnenglish.britishcouncil.org/free-resources/grammar/b1-b2/reported-speech-reporting-verbs' },
    ],
    review: ownerApproval,
  },
  {
    id: 'grammar-b1-relative-clauses', revisionId: 'grammar-b1-relative-clauses@1.0.0', revision: '1.0.0', title: 'Mệnh đề quan hệ xác định và không xác định',
    objective: 'Bổ nghĩa cho danh từ bằng who, which, that, whose hoặc where và dùng dấu phẩy theo mức độ cần thiết của thông tin.',
    prerequisiteIds: ['grammar-b1-reported-speech'], coverage: ['relative-clauses', 'defining-relative-clauses', 'non-defining-relative-clauses'],
    explanation: 'Mệnh đề quan hệ nối một danh từ với thông tin mô tả: The woman who called is my aunt. Who thường chỉ người; which chỉ vật; that có thể dùng trong mệnh đề xác định với người/vật trong nhiều trường hợp; whose chỉ sở hữu; where chỉ nơi chốn. Mệnh đề xác định (defining) cho biết chính xác người/vật nào, nên thường không có dấu phẩy: The book that you lent me was helpful. Đại từ quan hệ làm tân ngữ đôi khi có thể lược trong mệnh đề xác định (The book you lent me), nhưng không lược khi nó là chủ ngữ (The book that fell). Mệnh đề không xác định (non-defining) chỉ thêm thông tin phụ về đối tượng đã rõ, được ngăn bằng dấu phẩy và thường không dùng that: My bicycle, which I bought last year, needs a new tire. Lược mệnh đề phụ hoặc đổi loại có thể thay đổi người/vật được nhận diện chứ không chỉ thay đổi dấu câu; hãy xét người nghe đã biết danh từ nào chưa.',
    examples: [
      { english: 'The students who submitted the form can leave early.', vietnamese: 'Chỉ nhóm sinh viên đã nộp đơn được nói tới; mệnh đề xác định nhận diện nhóm nên không có dấu phẩy.' },
      { english: 'Da Nang, where my sister lives, is very busy in summer.', vietnamese: 'Đà Nẵng đã được xác định; nơi em gái sống là thông tin thêm nên đặt giữa hai dấu phẩy.' },
    ],
    contrasts: [{ form: 'My only passport, which expires next year, is in the drawer.', whyFits: 'My only passport đã xác định rõ vật nào; mệnh đề which chỉ bổ sung một chi tiết, nên có dấu phẩy.', whyNot: '“My only passport that expires next year ...” gợi có nhiều hộ chiếu và cần giới hạn chọn chiếc nào; ý đó mâu thuẫn với only trong ngữ cảnh này.' }],
    commonMistakes: ['Dùng that trong mệnh đề không xác định có dấu phẩy.', 'Thêm đại từ lặp: “the person who she called me”.', 'Lược who/which làm chủ ngữ của mệnh đề quan hệ.'],
    summary: 'Mệnh đề xác định chọn đúng đối tượng và không có dấu phẩy; mệnh đề không xác định thêm thông tin về đối tượng đã rõ, có dấu phẩy và không dùng that.',
    exercises: [{ id: 'grammar-b1-relative-clauses-q1', prompt: 'Chọn dấu câu và đại từ: “My brother ___ lives in Hue is visiting us.” Có nhiều anh/em trai; cần nói người nào.', options: [
      { text: 'who', correct: true, rationale: 'Mệnh đề xác định nhận diện người anh/em trai nào; không đặt dấu phẩy và who chỉ người.' },
      { text: ', who', correct: false, rationale: 'Dấu phẩy làm mệnh đề thành thông tin thêm về một người đã xác định, không còn chọn người nào trong số nhiều anh/em trai.' },
      { text: ', that', correct: false, rationale: 'Dấu phẩy tạo mệnh đề không xác định, nơi that không phải lựa chọn chuẩn; hơn nữa ngữ cảnh cần thông tin nhận diện.' },
     ], acceptedAnswers: [
       { text: 'who', rationale: 'Who đứng trước mệnh đề quan hệ xác định, không có dấu phẩy, để nhận diện người anh/em trai nào.' },
       { text: 'My brother who lives in Hue is visiting us.', rationale: 'Who lives in Hue giới hạn người anh/em trai đang được nói tới nên không có dấu phẩy.' },
     ] }],
    sources: [
      { id: 'bc-relative-clauses-defining', title: 'British Council: Relative clauses: defining relative clauses', url: 'https://learnenglish.britishcouncil.org/free-resources/grammar/b1-b2/relative-clauses-defining-relative-clauses' },
      { id: 'bc-relative-clauses-non-defining', title: 'British Council: Relative clauses: non-defining relative clauses', url: 'https://learnenglish.britishcouncil.org/free-resources/grammar/b1-b2/relative-clauses-non-defining-relative-clauses' },
    ],
    review: ownerApproval,
  },
];
