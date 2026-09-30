/**
 * @file zero.ts
 * @description Original Vietnamese zero-level grammar lessons with deterministic practice.
 */
import { ownerApproval, type GrammarLesson, type GrammarSource } from './types.js';

export const zeroLessons: GrammarLesson[] = [
  {
    id: 'grammar-0-word-roles', revisionId: 'grammar-0-word-roles@1.0.0', revision: '1.0.0', title: 'Nhận ra vai trò của từ',
    objective: 'Phân biệt người/vật được nói đến, hành động hoặc trạng thái, và từ bổ nghĩa trong câu ngắn.',
    prerequisiteIds: [], coverage: ['parts-of-speech'],
    explanation: 'Một câu đơn thường cho biết ai hoặc vật gì (danh từ, đại từ), người/vật ấy làm gì hoặc ra sao (động từ), và có thể thêm từ chỉ đặc điểm (tính từ). Hãy nhìn công việc của từ trong câu thay vì cố dịch từng từ theo vị trí tiếng Việt. Trong “The small cat sleeps”, “cat” là vật được nói đến, “sleeps” là hành động, còn “small” mô tả cat.',
    examples: [
      { english: 'Mina reads.', vietnamese: 'Mina đọc. Mina là người được nói đến; reads là hành động.' },
      { english: 'The room is quiet.', vietnamese: 'Căn phòng yên tĩnh. room là vật được nói đến; is nối vật với đặc điểm quiet.' },
    ],
    contrasts: [{ form: 'The quiet room feels warm.', whyFits: 'quiet bổ nghĩa cho room; feels diễn tả trạng thái của căn phòng.', whyNot: '“The room quiet” thiếu động từ nối trong câu hoàn chỉnh; quiet không tự thay được is/feels.' }],
    commonMistakes: ['Bỏ động từ vì tiếng Việt có thể đặt tính từ trực tiếp sau chủ ngữ: “The room quiet”.'],
    summary: 'Tìm chủ thể trước, rồi tìm động từ; tính từ bổ nghĩa cho danh từ hoặc đứng sau động từ nối.',
    exercises: [{
      id: 'grammar-0-word-roles-q1', prompt: 'Trong “The young bird flies”, từ nào nêu hành động?',
      options: [
        { text: 'young', correct: false, rationale: 'young mô tả bird, không nêu hành động.' },
        { text: 'bird', correct: false, rationale: 'bird là vật được nói đến.' },
        { text: 'flies', correct: true, rationale: 'flies cho biết con chim làm gì.' },
      ], acceptedAnswers: [{ text: 'flies', rationale: 'flies là động từ chỉ hành động trong câu.' }],
    }], sources: [
      { id: 'bc-nouns', title: 'British Council LearnEnglish: Nouns', url: 'https://learnenglish.britishcouncil.org/grammar/english-grammar-reference/nouns' },
      { id: 'bc-verbs', title: 'British Council LearnEnglish: Verbs', url: 'https://learnenglish.britishcouncil.org/grammar/english-grammar-reference/verbs' },
      { id: 'bc-adjectives', title: 'British Council LearnEnglish: Adjectives', url: 'https://learnenglish.britishcouncil.org/grammar/english-grammar-reference/adjectives' },
    ], review: ownerApproval,
  },
  {
    id: 'grammar-0-subjects-and-verbs', revisionId: 'grammar-0-subjects-and-verbs@1.0.0', revision: '1.0.0', title: 'Chủ ngữ, động từ và dạng động từ',
    objective: 'Tạo câu tối thiểu có chủ ngữ và chọn dạng động từ phù hợp với chủ ngữ.',
    prerequisiteIds: ['grammar-0-word-roles'], coverage: ['word-order', 'verb-conjugation'],
    explanation: 'Câu tiếng Anh cơ bản thường theo thứ tự Chủ ngữ + Động từ + phần còn lại. Động từ thường giữ nguyên với I/you/we/they ở hiện tại đơn, nhưng thêm -s hoặc -es với he/she/it: I walk, she walks; go thành goes sau he/she/it. Be là động từ đặc biệt, có các dạng am/is/are và sẽ học riêng. Đừng thêm -s chỉ vì danh từ số nhiều; hãy kiểm tra chủ ngữ của động từ.',
    examples: [
      { english: 'I cook dinner.', vietnamese: 'Tôi nấu bữa tối. Chủ ngữ I đứng trước động từ cook.' },
      { english: 'Linh cooks dinner.', vietnamese: 'Linh nấu bữa tối. Linh là một người nên động từ hiện tại đơn thêm -s.' },
    ],
    contrasts: [{ form: 'Linh cooks every evening.', whyFits: 'Linh là chủ ngữ ngôi thứ ba số ít và câu nói về thói quen.', whyNot: '“Linh cook every evening” thiếu -s trong khẳng định hiện tại đơn; “Linh is cook” dùng sai cấu trúc với động từ thường.' }],
    commonMistakes: ['Viết “She walk” thay vì “She walks”.', 'Đảo chủ ngữ và động từ theo trật tự tiếng Việt.'],
    summary: 'Câu cơ bản đi theo Chủ ngữ + Động từ; thêm -s/-es cho he, she, it trong hiện tại đơn khẳng định.',
    exercises: [{
      id: 'grammar-0-subjects-and-verbs-q1', prompt: 'Chọn câu đúng để nói về thói quen của An.',
      options: [
        { text: 'An drink tea each morning.', correct: false, rationale: 'An là một người; động từ hiện tại đơn cần -s: drinks.' },
        { text: 'An drinks tea each morning.', correct: true, rationale: 'Chủ ngữ số ít An đi với drinks trong thói quen hiện tại.' },
        { text: 'Drinks An tea each morning.', correct: false, rationale: 'Câu khẳng định thông thường không đặt động từ trước chủ ngữ.' },
      ], acceptedAnswers: [{ text: 'An drinks tea each morning.', rationale: 'Dạng drinks phù hợp với chủ ngữ An và nghĩa thói quen.' }],
    }], sources: [
      { id: 'bc-present-simple', title: 'British Council LearnEnglish: Present simple', url: 'https://learnenglish.britishcouncil.org/grammar/a1-a2-grammar/present-simple' },
    ], review: ownerApproval,
  },
  {
    id: 'grammar-0-be', revisionId: 'grammar-0-be@1.0.0', revision: '1.0.0', title: 'Động từ be: am, is, are',
    objective: 'Dùng am/is/are để giới thiệu người, nơi chốn hoặc trạng thái và đổi câu sang phủ định, câu hỏi.',
    prerequisiteIds: ['grammar-0-subjects-and-verbs'], coverage: ['be', 'affirmative', 'negative', 'questions'],
    explanation: 'Be nối chủ ngữ với danh tính, vị trí hoặc trạng thái; trong hiện tại, I đi với am, he/she/it hoặc danh từ số ít đi với is, you/we/they đi với are. Khẳng định: chủ ngữ + be. Phủ định: thêm not sau be. Câu hỏi có/không: đưa be lên trước chủ ngữ. Rút gọn như isn’t và aren’t thường dùng trong giao tiếp; không đặt do trước be.',
    examples: [
      { english: 'I am ready. / I am not ready. / Am I ready?', vietnamese: 'Tôi sẵn sàng. / Tôi không sẵn sàng. / Tôi sẵn sàng chưa? Dạng câu hỏi đưa am lên trước I.' },
      { english: 'The children are at home. / Are the children at home?', vietnamese: 'Bọn trẻ ở nhà. / Bọn trẻ có ở nhà không? Danh từ số nhiều children đi với are.' },
    ],
    contrasts: [
      { form: 'Is Mai tired?', whyFits: 'Câu hỏi có be đảo is lên trước chủ ngữ số ít Mai.', whyNot: '“Does Mai be tired?” sai vì hiện tại của be tự tạo câu hỏi, không dùng trợ động từ do.' },
      { form: 'They are not late.', whyFits: 'not đứng ngay sau are để phủ định be.', whyNot: '“They do not are late” ghép do với be không đúng.' },
    ],
    commonMistakes: ['Dùng “I is” thay cho “I am”.', 'Dùng do/does trong câu hỏi có be.', 'Đặt not trước be.'],
    summary: 'I am; he/she/it is; you/we/they are. Phủ định thêm not; câu hỏi đưa be lên đầu.',
    exercises: [{
      id: 'grammar-0-be-q1', prompt: 'Chọn câu hỏi đúng để hỏi liệu Hoa có mệt không.',
      options: [
        { text: 'Does Hoa be tired?', correct: false, rationale: 'Be không kết hợp với does để tạo câu hỏi hiện tại.' },
        { text: 'Is Hoa tired?', correct: true, rationale: 'Hoa là chủ ngữ số ít; đảo is lên trước chủ ngữ.' },
        { text: 'Hoa is tired?', correct: false, rationale: 'Có thể nghe như câu lên giọng trong hội thoại, nhưng dạng câu hỏi chuẩn ở bài này là đảo is.' },
      ], acceptedAnswers: [{ text: 'Is Hoa tired?', rationale: 'Is đứng trước chủ ngữ Hoa trong câu hỏi có be.' }],
    }], sources: [
      { id: 'bc-present-simple-be', title: "British Council LearnEnglish: Present simple: 'to be'", url: 'https://learnenglish.britishcouncil.org/grammar/a1-a2-grammar/present-simple-be' },
    ], review: ownerApproval,
  },
];
