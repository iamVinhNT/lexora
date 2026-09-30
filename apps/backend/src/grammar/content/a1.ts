/**
 * @file a1.ts
 * @description Original Vietnamese A1 lessons on pronouns, articles, present and past forms.
 */
import { ownerApproval, type GrammarLesson, type GrammarSource } from './types.js';

export const a1Lessons: GrammarLesson[] = [
  {
    id: 'grammar-a1-pronouns-and-articles', revisionId: 'grammar-a1-pronouns-and-articles@1.0.0', revision: '1.0.0', title: 'Đại từ, danh từ và mạo từ đầu tiên',
    objective: 'Chọn đại từ làm chủ ngữ hoặc tân ngữ, nhận biết danh từ số ít/số nhiều và dùng a/an/the trong ngữ cảnh cơ bản.',
    prerequisiteIds: ['grammar-0-be'], coverage: ['pronouns', 'noun-articles'],
    explanation: 'Đại từ chủ ngữ đứng trước động từ: I, you, he, she, it, we, they. Sau động từ hoặc giới từ thường dùng đại từ tân ngữ: me, you, him, her, it, us, them. Danh từ đếm được số ít thường cần từ đứng trước: a/an khi nhắc một vật chưa xác định (a book, an apple), the khi người nghe biết vật nào. Dùng a trước âm phụ âm và an trước âm nguyên âm, không chỉ dựa vào chữ cái. Danh từ số nhiều thường thêm -s/-es nhưng có dạng bất quy tắc như children; không dùng a/an trước danh từ số nhiều.',
    examples: [
      { english: 'She sees him near the station.', vietnamese: 'Cô ấy nhìn thấy anh ấy gần nhà ga. She là chủ ngữ; him là tân ngữ.' },
      { english: 'I have an umbrella and a bag. The bag is blue.', vietnamese: 'Tôi có một chiếc ô và một cái túi. Chiếc túi màu xanh. Lần đầu dùng an/a; lần nhắc lại đã xác định dùng the.' },
      { english: 'Two children are playing.', vietnamese: 'Hai đứa trẻ đang chơi. Children là số nhiều bất quy tắc nên không có a.' },
    ],
    contrasts: [
      { form: 'a university', whyFits: 'University bắt đầu bằng âm /juː/, một âm phụ âm /j/, nên chọn a.', whyNot: '“an university” chỉ nhìn chữ u mà bỏ qua âm đầu.' },
      { form: 'The key is on the table.', whyFits: 'Người nói và nghe cùng biết chiếc chìa khóa và chiếc bàn nào.', whyNot: 'Dùng a key có thể giới thiệu một chìa khóa bất kỳ, không nhấn vào vật đã biết.' },
    ],
    commonMistakes: ['Bỏ mạo từ trước danh từ đếm được số ít: “I bought book”.', 'Dùng an trước university theo chữ viết thay vì âm đầu.', 'Dùng đại từ chủ ngữ sau động từ: “She called I”.'],
    summary: 'Dùng đại từ theo vai trò chủ ngữ/tân ngữ; danh từ đếm được số ít cần từ hạn định; a/an giới thiệu, the chỉ vật đã xác định.',
    exercises: [{
      id: 'grammar-a1-pronouns-and-articles-q1', prompt: 'Lan sees ___ at the café. (nói với Nam)',
      options: [
        { text: 'he', correct: false, rationale: 'he là đại từ chủ ngữ; chỗ trống là người được nhìn thấy, cần dạng tân ngữ.' },
        { text: 'him', correct: true, rationale: 'Sau động từ sees, Nam là tân ngữ nên dùng him.' },
        { text: 'his', correct: false, rationale: 'his chỉ sở hữu, không thể đứng một mình ở vị trí tân ngữ này.' },
      ], acceptedAnswers: [{ text: 'him', rationale: 'him là dạng tân ngữ ngôi thứ ba số ít nam.' }],
    }, {
      id: 'grammar-a1-pronouns-and-articles-q2', prompt: 'Chọn cụm tự nhiên khi lần đầu nhắc tới một quả táo.',
      options: [
        { text: 'a apple', correct: false, rationale: 'Apple bắt đầu bằng âm nguyên âm nên cần an.' },
        { text: 'an apple', correct: true, rationale: 'An đứng trước âm nguyên âm trong apple.' },
        { text: 'the apples', correct: false, rationale: 'The apples là những quả táo số nhiều đã xác định, khác ý “một quả” chưa xác định.' },
      ], acceptedAnswers: [{ text: 'an apple', rationale: 'An apple giới thiệu một quả táo đếm được, chưa xác định.' }],
    }], sources: [
      { id: 'bc-pronouns', title: 'British Council LearnEnglish: Pronouns', url: 'https://learnenglish.britishcouncil.org/grammar/english-grammar-reference/pronouns' },
      { id: 'bc-articles-a-an-the', title: "British Council LearnEnglish: Articles: 'a', 'an', 'the'", url: 'https://learnenglish.britishcouncil.org/grammar/a1-a2-grammar/articles-a-an-the' },
    ], review: ownerApproval,
  },
  {
    id: 'grammar-a1-present-simple', revisionId: 'grammar-a1-present-simple@1.0.0', revision: '1.0.0', title: 'Hiện tại đơn: thói quen và sự thật',
    objective: 'Nói về thói quen/sự thật, chia động từ đúng và tạo phủ định/câu hỏi với do hoặc does.',
    prerequisiteIds: ['grammar-a1-pronouns-and-articles'], coverage: ['present-simple', 'verb-conjugation', 'affirmative', 'negative', 'questions'],
    explanation: 'Hiện tại đơn thường diễn tả thói quen, lịch trình hoặc điều được xem là đúng nói chung. Câu khẳng định dùng động từ nguyên mẫu với I/you/we/they; he/she/it thêm -s/-es (study → studies; watch → watches). Phủ định và câu hỏi dùng do với I/you/we/they, does với he/she/it; sau do/does động từ chính trở về nguyên mẫu: She doesn’t work; Does she work? Be không theo mẫu này: Is she ready? Trạng từ usually/often thường đứng trước động từ thường nhưng sau be.',
    examples: [
      { english: 'Our shop opens at nine.', vietnamese: 'Cửa hàng chúng tôi mở cửa lúc chín giờ. Đây là lịch cố định.' },
      { english: 'He doesn’t take the bus. Does he walk to work?', vietnamese: 'Anh ấy không đi xe buýt. Anh ấy đi bộ đến chỗ làm à? Sau doesn’t/does, dùng take/walk nguyên mẫu.' },
    ],
    contrasts: [
      { form: 'Mia studies English every evening.', whyFits: 'Every evening nêu thói quen lặp lại; Mia là chủ ngữ số ít nên study đổi thành studies.', whyNot: '“Mia is studying English every evening” thường gợi một giai đoạn tạm thời, không phải lựa chọn mặc định cho thói quen ổn định.' },
      { form: 'Does your brother live here?', whyFits: 'Does mang dấu hiệu ngôi số ít; live giữ nguyên sau does.', whyNot: '“Does your brother lives here?” đánh dấu ngôi hai lần.' },
    ],
    commonMistakes: ['Viết “She don’t like tea” thay vì doesn’t.', 'Giữ -s sau does: “Does he works?”', 'Dùng hiện tại đơn mặc định cho việc đang diễn ra ngay lúc nói.'],
    summary: 'Thói quen/sự thật: hiện tại đơn; he/she/it thêm -s ở khẳng định, nhưng dùng does + nguyên mẫu trong phủ định/câu hỏi.',
    exercises: [{
      id: 'grammar-a1-present-simple-q1', prompt: 'My father ___ (watch) the news every night.',
      options: [
        { text: 'watch', correct: false, rationale: 'Chủ ngữ my father là ngôi thứ ba số ít nên khẳng định cần -es.' },
        { text: 'watches', correct: true, rationale: 'Watch kết thúc bằng -ch nên thêm -es; every night báo hiệu thói quen.' },
        { text: 'is watch', correct: false, rationale: 'Be không đứng trước động từ nguyên mẫu trần để diễn tả thói quen.' },
      ], acceptedAnswers: [{ text: 'watches', rationale: 'Dạng hiện tại đơn số ít của watch là watches.' }],
    }, {
      id: 'grammar-a1-present-simple-q2', prompt: 'Chọn câu hỏi đúng về thói quen của Nga.',
      options: [
        { text: 'Does Nga cooks at home?', correct: false, rationale: 'Sau does, động từ chính phải ở nguyên mẫu cook.' },
        { text: 'Do Nga cook at home?', correct: false, rationale: 'Nga là một người; câu hỏi cần does.' },
        { text: 'Does Nga cook at home?', correct: true, rationale: 'Does phù hợp với Nga; cook giữ nguyên sau trợ động từ.' },
      ], acceptedAnswers: [{ text: 'Does Nga cook at home?', rationale: 'Mẫu Does + chủ ngữ số ít + động từ nguyên mẫu tạo câu hỏi hiện tại đơn.' }],
    }], sources: [
      { id: 'bc-present-simple', title: 'British Council LearnEnglish: Present simple', url: 'https://learnenglish.britishcouncil.org/grammar/a1-a2-grammar/present-simple' },
    ], review: ownerApproval,
  },
  {
    id: 'grammar-a1-present-continuous', revisionId: 'grammar-a1-present-continuous@1.0.0', revision: '1.0.0', title: 'Hiện tại tiếp diễn: việc đang diễn ra',
    objective: 'Dùng be + V-ing cho việc đang diễn ra hoặc tình huống tạm thời và đối chiếu với thói quen.',
    prerequisiteIds: ['grammar-a1-present-simple'], coverage: ['present-continuous', 'verb-conjugation', 'affirmative', 'negative', 'questions', 'tense-context-contrast'],
    explanation: 'Hiện tại tiếp diễn có dạng am/is/are + động từ-ing. Dùng cho việc đang xảy ra quanh thời điểm nói hoặc hoàn cảnh tạm thời trong giai đoạn hiện tại. Phủ định đặt not sau be; câu hỏi đảo be lên trước chủ ngữ. Động từ thường bỏ e cuối trước -ing (write → writing); một số động từ gấp đôi phụ âm cuối (run → running). Không phải mọi động từ đều thường dùng ở dạng tiếp diễn: know và like thường dùng dạng đơn để nói trạng thái.',
    examples: [
      { english: 'I am waiting for the bus now.', vietnamese: 'Bây giờ tôi đang đợi xe buýt. now đặt việc đợi tại thời điểm hiện tại.' },
      { english: 'She is working from home this month, but she usually works at the office.', vietnamese: 'Tháng này cô ấy đang làm ở nhà, nhưng thường làm ở văn phòng. Việc tháng này tạm thời đối lập với thói quen.' },
    ],
    contrasts: [
      { form: 'They are having lunch right now.', whyFits: 'Right now cho biết hành động đang diễn ra; have mang nghĩa ăn/uống trong ngữ cảnh này có thể dùng tiếp diễn.', whyNot: '“They have lunch right now” nghe như thói quen hoặc lịch trình, không làm rõ hành động đang xảy ra lúc nói.' },
      { form: 'I know the answer.', whyFits: 'Know diễn tả trạng thái/tri thức và thường dùng hiện tại đơn.', whyNot: '“I am knowing the answer” không phải dạng thông thường cho nghĩa biết này.' },
    ],
    commonMistakes: ['Bỏ be: “She working now”.', 'Thêm -ing nhưng quên đổi am/is/are theo chủ ngữ.', 'Dùng tiếp diễn với trạng thái như know trong nghĩa thông thường.'],
    summary: 'am/is/are + V-ing nhấn vào việc đang diễn ra hoặc tạm thời; thói quen vẫn thường dùng hiện tại đơn.',
    exercises: [{
      id: 'grammar-a1-present-continuous-q1', prompt: 'Listen! The baby ___ (cry).',
      options: [
        { text: 'cries', correct: false, rationale: 'Cries có thể nói thói quen; “Listen!” ở đây báo hiệu hành động đang nghe thấy.' },
        { text: 'is crying', correct: true, rationale: 'The baby là chủ ngữ số ít; dùng is + crying cho việc đang diễn ra.' },
        { text: 'does crying', correct: false, rationale: 'Do/does không tạo tiếp diễn; cần be + V-ing.' },
      ], acceptedAnswers: [{ text: 'is crying', rationale: 'Câu cần is theo chủ ngữ số ít và crying cho hành động hiện tại.' }],
    }, {
      id: 'grammar-a1-present-continuous-q2', prompt: 'Every day Ben ___ to work, but right now he ___ the train. (walk / take)',
      options: [
        { text: 'walks / is taking', correct: true, rationale: 'Every day là thói quen dùng walks; right now nêu hành động đang diễn ra dùng is taking.' },
        { text: 'is walking / takes', correct: false, rationale: 'Every day nêu thói quen; right now nêu việc đang xảy ra, nên cần walks / is taking.' },
        { text: 'walk / take', correct: false, rationale: 'Ben là chủ ngữ số ít; câu cần walks cho thói quen và is taking cho hành động hiện tại.' },
      ], acceptedAnswers: [{ text: 'walks / is taking', rationale: 'Dùng hiện tại đơn cho thói quen và tiếp diễn cho hành động đang xảy ra lúc nói.' }],
    }], sources: [
      { id: 'bc-present-continuous', title: 'British Council LearnEnglish: Present continuous', url: 'https://learnenglish.britishcouncil.org/grammar/english-grammar-reference/present-continuous' },
    ], review: ownerApproval,
  },
  {
    id: 'grammar-a1-past-simple', revisionId: 'grammar-a1-past-simple@1.0.0', revision: '1.0.0', title: 'Quá khứ đơn và mốc thời gian đã kết thúc',
    objective: 'Kể sự việc kết thúc trong quá khứ, tạo câu hỏi/phủ định và phân biệt với thói quen hoặc việc đang diễn ra.',
    prerequisiteIds: ['grammar-a1-present-continuous'], coverage: ['past-simple', 'verb-conjugation', 'affirmative', 'negative', 'questions', 'tense-context-contrast'],
    explanation: 'Quá khứ đơn kể việc đã xảy ra tại một thời điểm hoặc khoảng thời gian đã kết thúc, thường có yesterday, last week hoặc in 2022. Động từ có quy tắc thêm -ed (visit → visited); động từ bất quy tắc cần học theo dạng riêng (go → went). Câu phủ định dùng did not/didn’t + nguyên mẫu; câu hỏi dùng Did + chủ ngữ + nguyên mẫu. Be ở quá khứ là was/were và tự đảo trong câu hỏi. Chữ -ed có thể đọc nhiều cách; ở bài này cần nhận dạng cách viết trước.',
    examples: [
      { english: 'We visited our aunt last Sunday.', vietnamese: 'Chủ nhật trước chúng tôi đã thăm cô/dì. Last Sunday là khoảng thời gian đã kết thúc; visit thành visited.' },
      { english: 'He didn’t go by car. Did he take the bus?', vietnamese: 'Anh ấy đã không đi bằng ô tô. Anh ấy đã đi xe buýt à? Sau didn’t/did, dùng go/take nguyên mẫu.' },
      { english: 'I was tired yesterday, but I am fine now.', vietnamese: 'Hôm qua tôi mệt, nhưng giờ tôi ổn. Yesterday đã kết thúc nên dùng was; now là hiện tại nên dùng am.' },
    ],
    contrasts: [
      { form: 'She works at the library every Saturday.', whyFits: 'Every Saturday là lịch lặp lại hiện tại, phù hợp hiện tại đơn.', whyNot: '“She worked every Saturday” đặt các lần làm vào một giai đoạn quá khứ đã kết thúc, không khẳng định lịch hiện tại.' },
      { form: 'They played outside yesterday.', whyFits: 'Yesterday kết thúc; past simple nêu việc chơi đã xảy ra.', whyNot: '“They are playing outside yesterday” ghép hiện tại tiếp diễn với mốc quá khứ không phù hợp.' },
    ],
    commonMistakes: ['Viết “didn’t went” thay vì didn’t go.', 'Quên dạng bất quy tắc went.', 'Dùng -ed cho mọi động từ.', 'Dùng was/were cùng did trong một câu hỏi be.'],
    summary: 'Khoảng thời gian đã kết thúc: past simple; khẳng định dùng dạng quá khứ, còn did/didn’t đi với nguyên mẫu.',
    exercises: [{
      id: 'grammar-a1-past-simple-q1', prompt: 'Yesterday, Hoa ___ (go) to the market.',
      options: [
        { text: 'goes', correct: false, rationale: 'Goes là hiện tại đơn số ít, không khớp với yesterday.' },
        { text: 'went', correct: true, rationale: 'Go là động từ bất quy tắc; quá khứ đơn của nó là went.' },
        { text: 'did went', correct: false, rationale: 'Câu khẳng định không thêm did trước dạng quá khứ went trong mẫu cơ bản.' },
      ], acceptedAnswers: [{ text: 'went', rationale: 'Went là dạng quá khứ cần dùng cho go.' }],
    }, {
      id: 'grammar-a1-past-simple-q2', prompt: 'Chọn câu hỏi đúng về bộ phim đã xem tối qua.',
      options: [
        { text: 'Did you watched the film last night?', correct: false, rationale: 'Did đã mang dấu hiệu quá khứ; watched cần trở về watch.' },
        { text: 'Did you watch the film last night?', correct: true, rationale: 'Did + you + nguyên mẫu watch tạo câu hỏi quá khứ đơn.' },
        { text: 'Were you watch the film last night?', correct: false, rationale: 'Were không đi với động từ nguyên mẫu watch theo cách này.' },
      ], acceptedAnswers: [{ text: 'Did you watch the film last night?', rationale: 'Sau did, dùng nguyên mẫu watch.' }],
    }], sources: [
      { id: 'bc-past-simple', title: 'British Council LearnEnglish: Past simple', url: 'https://learnenglish.britishcouncil.org/grammar/english-grammar-reference/past-simple' },
    ], review: ownerApproval,
  },
];
