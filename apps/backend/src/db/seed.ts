/**
 * @file seed.ts
 * @description Curated CEFR vocabulary and contextual seed data for Lexora.
 */

import { eq, sql } from 'drizzle-orm';
import { randomUUID } from 'node:crypto';
import type { AppDatabase } from './client.js';
import {
  collocations,
  contexts,
  contextWords,
  examples,
  learningProgress,
  reviewStates,
  tags,
  wordTags,
  words,
} from './schema.js';
import type { CreateWord } from '../schemas/vocabulary.schema.js';

const seedWords: CreateWord[] = [
  {
    word: 'adapt', phonetic: '/əˈdæpt/', partOfSpeech: 'verb', difficulty: 'B1',
    definition: 'to change your behavior or methods to suit a new situation', translation: 'thích nghi',
    collocations: ['adapt to change', 'adapt quickly'], examples: [{ sentence: 'Good teams adapt quickly when priorities change.', translation: 'Đội ngũ tốt thích nghi nhanh khi ưu tiên thay đổi.', source: 'Lexora' }], tags: ['Work', 'Change'],
  },
  {
    word: 'allocate', phonetic: '/ˈæləkeɪt/', partOfSpeech: 'verb', difficulty: 'C1',
    definition: 'to distribute money, time, or resources for a particular purpose', translation: 'phân bổ',
    collocations: ['allocate resources', 'allocate a budget'], examples: [{ sentence: 'The manager allocated more time to quality testing.', translation: 'Quản lý phân bổ thêm thời gian cho kiểm thử chất lượng.', source: 'Lexora' }], tags: ['Business', 'Planning'],
  },
  {
    word: 'ambiguous', phonetic: '/æmˈbɪɡjuəs/', partOfSpeech: 'adjective', difficulty: 'C1',
    definition: 'having more than one possible meaning or interpretation', translation: 'mơ hồ',
    collocations: ['ambiguous statement', 'remain ambiguous'], examples: [{ sentence: 'The ambiguous instruction caused several teams to make different assumptions.', translation: 'Chỉ dẫn mơ hồ khiến nhiều đội đưa ra các giả định khác nhau.', source: 'Lexora' }], tags: ['Academic', 'Communication'],
  },
  {
    word: 'anticipate', phonetic: '/ænˈtɪsɪpeɪt/', partOfSpeech: 'verb', difficulty: 'B2',
    definition: 'to expect something and prepare for it in advance', translation: 'dự đoán; lường trước',
    collocations: ['anticipate problems', 'anticipate demand'], examples: [{ sentence: 'We anticipated delays and prepared an alternative schedule.', translation: 'Chúng tôi lường trước sự chậm trễ và chuẩn bị lịch thay thế.', source: 'Lexora' }], tags: ['Planning', 'Work'],
  },
  {
    word: 'appreciate', phonetic: '/əˈpriːʃieɪt/', partOfSpeech: 'verb', difficulty: 'B1',
    definition: 'to recognize the value or importance of something', translation: 'trân trọng; đánh giá cao',
    collocations: ['deeply appreciate', 'appreciate the effort'], examples: [{ sentence: 'Customers appreciate clear explanations and honest timelines.', translation: 'Khách hàng đánh giá cao lời giải thích rõ ràng và mốc thời gian trung thực.', source: 'Lexora' }], tags: ['Communication', 'Daily Life'],
  },
  {
    word: 'assess', phonetic: '/əˈses/', partOfSpeech: 'verb', difficulty: 'B2',
    definition: 'to judge the quality, importance, or condition of something', translation: 'đánh giá',
    collocations: ['assess the risk', 'assess performance'], examples: [{ sentence: 'The review helps us assess whether the lesson was effective.', translation: 'Buổi ôn tập giúp chúng tôi đánh giá bài học có hiệu quả hay không.', source: 'Lexora' }], tags: ['Academic', 'Planning'],
  },
  {
    word: 'coherent', phonetic: '/kəʊˈhɪərənt/', partOfSpeech: 'adjective', difficulty: 'C1',
    definition: 'logical, clear, and consistent as a whole', translation: 'mạch lạc',
    collocations: ['coherent argument', 'coherent explanation'], examples: [{ sentence: 'She presented a coherent argument supported by evidence.', translation: 'Cô ấy trình bày lập luận mạch lạc được hỗ trợ bằng bằng chứng.', source: 'Lexora' }], tags: ['Academic', 'Communication'],
  },
  {
    word: 'collaborate', phonetic: '/kəˈlæbəreɪt/', partOfSpeech: 'verb', difficulty: 'B2',
    definition: 'to work together with another person or group', translation: 'hợp tác',
    collocations: ['collaborate closely', 'collaborate on a project'], examples: [{ sentence: 'Researchers collaborate across disciplines to solve complex problems.', translation: 'Các nhà nghiên cứu hợp tác giữa nhiều ngành để giải quyết vấn đề phức tạp.', source: 'Lexora' }], tags: ['Work', 'Communication'],
  },
  {
    word: 'compelling', phonetic: '/kəmˈpelɪŋ/', partOfSpeech: 'adjective', difficulty: 'C1',
    definition: 'very convincing or able to hold attention', translation: 'thuyết phục; hấp dẫn',
    collocations: ['compelling evidence', 'compelling reason'], examples: [{ sentence: 'The report offers compelling evidence for immediate action.', translation: 'Báo cáo đưa ra bằng chứng thuyết phục cho hành động ngay lập tức.', source: 'Lexora' }], tags: ['Academic', 'Communication'],
  },
  {
    word: 'concede', phonetic: '/kənˈsiːd/', partOfSpeech: 'verb', difficulty: 'C1',
    definition: 'to admit that something is true, usually unwillingly', translation: 'thừa nhận',
    collocations: ['concede a point', 'concede that'], examples: [{ sentence: 'The speaker conceded that the original estimate was too optimistic.', translation: 'Diễn giả thừa nhận ước tính ban đầu quá lạc quan.', source: 'Lexora' }], tags: ['Communication', 'Academic'],
  },
  {
    word: 'consequently', phonetic: '/ˈkɒnsɪkwəntli/', partOfSpeech: 'adverb', difficulty: 'B2',
    definition: 'as a result of something', translation: 'do đó; vì vậy',
    collocations: ['consequently increase', 'consequently become'], examples: [{ sentence: 'The road was closed; consequently, the journey took longer.', translation: 'Con đường bị đóng; vì vậy chuyến đi mất nhiều thời gian hơn.', source: 'Lexora' }], tags: ['Academic', 'Writing'],
  },
  {
    word: 'constraint', phonetic: '/kənˈstreɪnt/', partOfSpeech: 'noun', difficulty: 'C1',
    definition: 'a limit or restriction that affects what can be done', translation: 'sự hạn chế',
    collocations: ['budget constraint', 'technical constraint'], examples: [{ sentence: 'Time is the main constraint on this research project.', translation: 'Thời gian là hạn chế chính của dự án nghiên cứu này.', source: 'Lexora' }], tags: ['Work', 'Planning'],
  },
  {
    word: 'conventional', phonetic: '/kənˈvenʃənəl/', partOfSpeech: 'adjective', difficulty: 'B2',
    definition: 'usual and accepted by most people', translation: 'thông thường; truyền thống',
    collocations: ['conventional approach', 'conventional wisdom'], examples: [{ sentence: 'The team questioned the conventional approach to customer support.', translation: 'Đội ngũ đặt câu hỏi về cách tiếp cận chăm sóc khách hàng truyền thống.', source: 'Lexora' }], tags: ['Academic', 'Change'],
  },
  {
    word: 'crucial', phonetic: '/ˈkruːʃəl/', partOfSpeech: 'adjective', difficulty: 'B2',
    definition: 'extremely important to a result or situation', translation: 'cốt yếu',
    collocations: ['crucial role', 'crucial decision'], examples: [{ sentence: 'Trust plays a crucial role in effective collaboration.', translation: 'Niềm tin đóng vai trò cốt yếu trong hợp tác hiệu quả.', source: 'Lexora' }], tags: ['Work', 'Communication'],
  },
  {
    word: 'deteriorate', phonetic: '/dɪˈtɪəriəreɪt/', partOfSpeech: 'verb', difficulty: 'C1',
    definition: 'to become worse in quality or condition', translation: 'xấu đi; suy giảm',
    collocations: ['deteriorate rapidly', 'deteriorating condition'], examples: [{ sentence: 'Without maintenance, the quality of the service will deteriorate.', translation: 'Nếu không bảo trì, chất lượng dịch vụ sẽ suy giảm.', source: 'Lexora' }], tags: ['Change', 'Environment'],
  },
  {
    word: 'diligent', phonetic: '/ˈdɪlɪdʒənt/', partOfSpeech: 'adjective', difficulty: 'B2',
    definition: 'working carefully and with consistent effort', translation: 'chăm chỉ; siêng năng',
    collocations: ['diligent worker', 'diligent research'], examples: [{ sentence: 'Her diligent preparation made the presentation confident and clear.', translation: 'Sự chuẩn bị chăm chỉ khiến bài thuyết trình tự tin và rõ ràng.', source: 'Lexora' }], tags: ['Work', 'Personal Growth'],
  },
  {
    word: 'diverse', phonetic: '/daɪˈvɜːs/', partOfSpeech: 'adjective', difficulty: 'B2',
    definition: 'including people or things that are different from one another', translation: 'đa dạng',
    collocations: ['diverse community', 'diverse perspective'], examples: [{ sentence: 'A diverse team can identify risks that one viewpoint misses.', translation: 'Một đội ngũ đa dạng có thể nhận ra rủi ro mà một góc nhìn bỏ lỡ.', source: 'Lexora' }], tags: ['Society', 'Work'],
  },
  {
    word: 'efficient', phonetic: '/ɪˈfɪʃənt/', partOfSpeech: 'adjective', difficulty: 'B1',
    definition: 'working well without wasting time, effort, or resources', translation: 'hiệu quả',
    collocations: ['energy-efficient', 'efficient process'], examples: [{ sentence: 'An efficient process leaves more time for creative work.', translation: 'Quy trình hiệu quả để lại nhiều thời gian hơn cho công việc sáng tạo.', source: 'Lexora' }], tags: ['Work', 'Environment'],
  },
  {
    word: 'empirical', phonetic: '/ɪmˈpɪrɪkəl/', partOfSpeech: 'adjective', difficulty: 'C1',
    definition: 'based on observation or experiment rather than theory alone', translation: 'thực nghiệm',
    collocations: ['empirical evidence', 'empirical study'], examples: [{ sentence: 'The conclusion is supported by empirical evidence from three studies.', translation: 'Kết luận được hỗ trợ bởi bằng chứng thực nghiệm từ ba nghiên cứu.', source: 'Lexora' }], tags: ['Academic', 'Science'],
  },
  {
    word: 'enhance', phonetic: '/ɪnˈhɑːns/', partOfSpeech: 'verb', difficulty: 'B2',
    definition: 'to improve the quality, value, or effect of something', translation: 'nâng cao',
    collocations: ['enhance productivity', 'enhance understanding'], examples: [{ sentence: 'Visual examples enhance understanding of abstract ideas.', translation: 'Ví dụ trực quan nâng cao sự hiểu biết về ý tưởng trừu tượng.', source: 'Lexora' }], tags: ['Academic', 'Learning'],
  },
  {
    word: 'ethical', phonetic: '/ˈeθɪkəl/', partOfSpeech: 'adjective', difficulty: 'B2',
    definition: 'relating to principles about what is morally right or wrong', translation: 'đạo đức',
    collocations: ['ethical concern', 'ethical standard'], examples: [{ sentence: 'The researchers discussed the ethical concerns before collecting data.', translation: 'Các nhà nghiên cứu thảo luận những vấn đề đạo đức trước khi thu thập dữ liệu.', source: 'Lexora' }], tags: ['Society', 'Academic'],
  },
  {
    word: 'evaluate', phonetic: '/ɪˈvæljueɪt/', partOfSpeech: 'verb', difficulty: 'B2',
    definition: 'to examine something carefully and decide its value or quality', translation: 'đánh giá',
    collocations: ['evaluate results', 'evaluate effectiveness'], examples: [{ sentence: 'We evaluate each lesson by checking recall and production.', translation: 'Chúng tôi đánh giá mỗi bài học bằng cách kiểm tra khả năng nhớ và tạo câu.', source: 'Lexora' }], tags: ['Learning', 'Academic'],
  },
  {
    word: 'feasible', phonetic: '/ˈfiːzəbəl/', partOfSpeech: 'adjective', difficulty: 'C1',
    definition: 'possible and practical to achieve', translation: 'khả thi',
    collocations: ['feasible solution', 'financially feasible'], examples: [{ sentence: 'The team proposed a feasible solution within the available budget.', translation: 'Đội ngũ đề xuất giải pháp khả thi trong ngân sách hiện có.', source: 'Lexora' }], tags: ['Planning', 'Business'],
  },
  {
    word: 'fluctuate', phonetic: '/ˈflʌktʃueɪt/', partOfSpeech: 'verb', difficulty: 'C1',
    definition: 'to change frequently between higher and lower levels', translation: 'dao động',
    collocations: ['prices fluctuate', 'fluctuate widely'], examples: [{ sentence: 'Energy prices fluctuate when supply and demand change.', translation: 'Giá năng lượng dao động khi cung và cầu thay đổi.', source: 'Lexora' }], tags: ['Business', 'Environment'],
  },
  {
    word: 'fundamental', phonetic: '/ˌfʌndəˈmentəl/', partOfSpeech: 'adjective', difficulty: 'B2',
    definition: 'forming the basic or essential part of something', translation: 'cơ bản; nền tảng',
    collocations: ['fundamental principle', 'fundamental change'], examples: [{ sentence: 'Regular practice is fundamental to long-term language learning.', translation: 'Luyện tập đều đặn là nền tảng của việc học ngôn ngữ lâu dài.', source: 'Lexora' }], tags: ['Learning', 'Academic'],
  },
  {
    word: 'generate', phonetic: '/ˈdʒenəreɪt/', partOfSpeech: 'verb', difficulty: 'B2',
    definition: 'to produce or create something', translation: 'tạo ra',
    collocations: ['generate ideas', 'generate revenue'], examples: [{ sentence: 'The workshop generated several practical ideas for improvement.', translation: 'Buổi hội thảo tạo ra nhiều ý tưởng thiết thực để cải thiện.', source: 'Lexora' }], tags: ['Work', 'Creativity'],
  },
  {
    word: 'implement', phonetic: '/ˈɪmplɪment/', partOfSpeech: 'verb', difficulty: 'B2',
    definition: 'to put a plan or decision into action', translation: 'triển khai',
    collocations: ['implement a policy', 'implement changes'], examples: [{ sentence: 'The school implemented a new reading program in September.', translation: 'Trường học triển khai chương trình đọc mới vào tháng Chín.', source: 'Lexora' }], tags: ['Work', 'Planning'],
  },
  {
    word: 'inevitable', phonetic: '/ɪnˈevɪtəbəl/', partOfSpeech: 'adjective', difficulty: 'B2',
    definition: 'certain to happen and impossible to avoid', translation: 'không thể tránh khỏi',
    collocations: ['inevitable consequence', 'almost inevitable'], examples: [{ sentence: 'Some uncertainty is inevitable when a project explores new technology.', translation: 'Một số bất định là không thể tránh khỏi khi dự án khám phá công nghệ mới.', source: 'Lexora' }], tags: ['Change', 'Planning'],
  },
  {
    word: 'integrity', phonetic: '/ɪnˈteɡrəti/', partOfSpeech: 'noun', difficulty: 'C1',
    definition: 'the quality of being honest and having strong moral principles', translation: 'sự chính trực',
    collocations: ['professional integrity', 'data integrity'], examples: [{ sentence: 'Professional integrity requires people to report mistakes honestly.', translation: 'Sự chính trực nghề nghiệp đòi hỏi mọi người trung thực báo cáo sai sót.', source: 'Lexora' }], tags: ['Society', 'Work'],
  },
  {
    word: 'justify', phonetic: '/ˈdʒʌstɪfaɪ/', partOfSpeech: 'verb', difficulty: 'B2',
    definition: 'to give a good reason for something', translation: 'biện minh; chứng minh hợp lý',
    collocations: ['justify a decision', 'justify the cost'], examples: [{ sentence: 'The evidence must justify the decision to expand the program.', translation: 'Bằng chứng phải chứng minh hợp lý quyết định mở rộng chương trình.', source: 'Lexora' }], tags: ['Academic', 'Communication'],
  },
  {
    word: 'maintain', phonetic: '/meɪnˈteɪn/', partOfSpeech: 'verb', difficulty: 'B1',
    definition: 'to keep something in good condition or at the same level', translation: 'duy trì; bảo trì',
    collocations: ['maintain quality', 'maintain equipment'], examples: [{ sentence: 'Small daily habits help maintain steady progress.', translation: 'Thói quen nhỏ hằng ngày giúp duy trì tiến bộ ổn định.', source: 'Lexora' }], tags: ['Learning', 'Work'],
  },
  {
    word: 'meticulous', phonetic: '/məˈtɪkjələs/', partOfSpeech: 'adjective', difficulty: 'C1',
    definition: 'very careful about small details', translation: 'tỉ mỉ',
    collocations: ['meticulous planning', 'meticulous attention'], examples: [{ sentence: 'Meticulous notes made the experiment easier to repeat.', translation: 'Ghi chú tỉ mỉ khiến thí nghiệm dễ được lặp lại hơn.', source: 'Lexora' }], tags: ['Academic', 'Work'],
  },
  {
    word: 'notion', phonetic: '/ˈnəʊʃən/', partOfSpeech: 'noun', difficulty: 'B2',
    definition: 'an idea, belief, or understanding of something', translation: 'khái niệm; quan niệm',
    collocations: ['common notion', 'challenge the notion'], examples: [{ sentence: 'The article challenges the notion that talent matters more than practice.', translation: 'Bài viết thách thức quan niệm tài năng quan trọng hơn luyện tập.', source: 'Lexora' }], tags: ['Academic', 'Learning'],
  },
  {
    word: 'obtain', phonetic: '/əbˈteɪn/', partOfSpeech: 'verb', difficulty: 'B2',
    definition: 'to get something, especially through effort or a process', translation: 'đạt được; thu được',
    collocations: ['obtain permission', 'obtain data'], examples: [{ sentence: 'The team obtained permission before interviewing participants.', translation: 'Đội ngũ xin được phép trước khi phỏng vấn người tham gia.', source: 'Lexora' }], tags: ['Academic', 'Work'],
  },
  {
    word: 'persistent', phonetic: '/pəˈsɪstənt/', partOfSpeech: 'adjective', difficulty: 'B2',
    definition: 'continuing firmly despite difficulty or opposition', translation: 'kiên trì; dai dẳng',
    collocations: ['persistent effort', 'persistent problem'], examples: [{ sentence: 'Persistent effort is more reliable than occasional bursts of motivation.', translation: 'Nỗ lực kiên trì đáng tin cậy hơn những đợt động lực bộc phát.', source: 'Lexora' }], tags: ['Personal Growth', 'Learning'],
  },
  {
    word: 'pragmatic', phonetic: '/præɡˈmætɪk/', partOfSpeech: 'adjective', difficulty: 'C1',
    definition: 'dealing with problems in a practical way', translation: 'thực tế',
    collocations: ['pragmatic approach', 'pragmatic solution'], examples: [{ sentence: 'A pragmatic approach focuses on what can be improved today.', translation: 'Cách tiếp cận thực tế tập trung vào điều có thể cải thiện hôm nay.', source: 'Lexora' }], tags: ['Work', 'Planning'],
  },
  {
    word: 'precise', phonetic: '/prɪˈsaɪs/', partOfSpeech: 'adjective', difficulty: 'B2',
    definition: 'exact and accurate in every detail', translation: 'chính xác',
    collocations: ['precise measurement', 'precise language'], examples: [{ sentence: 'Precise language prevents confusion in technical documentation.', translation: 'Ngôn ngữ chính xác ngăn sự nhầm lẫn trong tài liệu kỹ thuật.', source: 'Lexora' }], tags: ['Communication', 'Academic'],
  },
  {
    word: 'profound', phonetic: '/prəˈfaʊnd/', partOfSpeech: 'adjective', difficulty: 'C1',
    definition: 'very great, intense, or having deep meaning', translation: 'sâu sắc',
    collocations: ['profound impact', 'profound insight'], examples: [{ sentence: 'The experience had a profound impact on her career choice.', translation: 'Trải nghiệm đó có ảnh hưởng sâu sắc đến lựa chọn nghề nghiệp của cô ấy.', source: 'Lexora' }], tags: ['Academic', 'Personal Growth'],
  },
  {
    word: 'reinforce', phonetic: '/ˌriːɪnˈfɔːs/', partOfSpeech: 'verb', difficulty: 'B2',
    definition: 'to make an idea, feeling, or structure stronger', translation: 'củng cố',
    collocations: ['reinforce learning', 'reinforce a message'], examples: [{ sentence: 'Spaced review reinforces memory after the first lesson.', translation: 'Ôn tập cách quãng củng cố trí nhớ sau bài học đầu tiên.', source: 'Lexora' }], tags: ['Learning', 'Academic'],
  },
  {
    word: 'resilient', phonetic: '/rɪˈzɪliənt/', partOfSpeech: 'adjective', difficulty: 'B2',
    definition: 'able to recover quickly from difficulty or change', translation: 'kiên cường; có khả năng phục hồi',
    collocations: ['resilient community', 'resilient system'], examples: [{ sentence: 'A resilient service recovers quickly after an unexpected failure.', translation: 'Một dịch vụ có khả năng phục hồi sẽ hoạt động lại nhanh sau sự cố bất ngờ.', source: 'Lexora' }], tags: ['Technology', 'Personal Growth'],
  },
  {
    word: 'sustainable', phonetic: '/səˈsteɪnəbəl/', partOfSpeech: 'adjective', difficulty: 'B2',
    definition: 'able to continue without causing serious harm or using resources up', translation: 'bền vững',
    collocations: ['sustainable development', 'sustainable solution'], examples: [{ sentence: 'The city needs a sustainable transport plan for future growth.', translation: 'Thành phố cần kế hoạch giao thông bền vững cho tăng trưởng tương lai.', source: 'Lexora' }], tags: ['Environment', 'Society'],
  },
  {
    word: 'significant', phonetic: '/sɪɡˈnɪfɪkənt/', partOfSpeech: 'adjective', difficulty: 'B1',
    definition: 'important or large enough to be noticed', translation: 'đáng kể; quan trọng',
    collocations: ['significant difference', 'significant increase'], examples: [{ sentence: 'The new method produced a significant improvement in recall.', translation: 'Phương pháp mới tạo ra cải thiện đáng kể về khả năng nhớ.', source: 'Lexora' }], tags: ['Academic', 'Learning'],
  },
  {
    word: 'subsequent', phonetic: '/ˈsʌbsɪkwənt/', partOfSpeech: 'adjective', difficulty: 'C1',
    definition: 'happening after a particular event or time', translation: 'sau đó; tiếp theo',
    collocations: ['subsequent analysis', 'subsequent meetings'], examples: [{ sentence: 'Subsequent analysis revealed a pattern in the responses.', translation: 'Phân tích sau đó cho thấy một khuôn mẫu trong các câu trả lời.', source: 'Lexora' }], tags: ['Academic', 'Writing'],
  },
  {
    word: 'subtle', phonetic: '/ˈsʌtəl/', partOfSpeech: 'adjective', difficulty: 'B2',
    definition: 'not obvious and difficult to notice or explain', translation: 'tinh tế; khó nhận thấy',
    collocations: ['subtle difference', 'subtle change'], examples: [{ sentence: 'The editor noticed a subtle difference in tone between the two paragraphs.', translation: 'Biên tập viên nhận thấy khác biệt tinh tế về giọng điệu giữa hai đoạn văn.', source: 'Lexora' }], tags: ['Communication', 'Academic'],
  },
  {
    word: 'transparent', phonetic: '/trænsˈpærənt/', partOfSpeech: 'adjective', difficulty: 'B2',
    definition: 'open and easy to understand or notice', translation: 'minh bạch',
    collocations: ['transparent process', 'transparent communication'], examples: [{ sentence: 'Transparent communication helps people trust difficult decisions.', translation: 'Giao tiếp minh bạch giúp mọi người tin tưởng những quyết định khó khăn.', source: 'Lexora' }], tags: ['Communication', 'Work'],
  },
  {
    word: 'unprecedented', phonetic: '/ʌnˈpresɪdentɪd/', partOfSpeech: 'adjective', difficulty: 'C1',
    definition: 'never having happened or existed before', translation: 'chưa từng có tiền lệ',
    collocations: ['unprecedented demand', 'unprecedented challenge'], examples: [{ sentence: 'The small team handled unprecedented demand during the launch.', translation: 'Đội ngũ nhỏ xử lý nhu cầu chưa từng có trong thời gian ra mắt.', source: 'Lexora' }], tags: ['Business', 'Change'],
  },
  {
    word: 'versatile', phonetic: '/ˈvɜːsətaɪl/', partOfSpeech: 'adjective', difficulty: 'B2',
    definition: 'able to be used for many different purposes or activities', translation: 'linh hoạt; đa năng',
    collocations: ['versatile tool', 'highly versatile'], examples: [{ sentence: 'A versatile vocabulary helps learners express precise ideas in many settings.', translation: 'Vốn từ đa năng giúp người học diễn đạt ý chính xác trong nhiều tình huống.', source: 'Lexora' }], tags: ['Learning', 'Technology'],
  },
  {
    word: 'viable', phonetic: '/ˈvaɪəbəl/', partOfSpeech: 'adjective', difficulty: 'C1',
    definition: 'able to work successfully or continue to exist', translation: 'khả thi; có thể tồn tại',
    collocations: ['viable option', 'commercially viable'], examples: [{ sentence: 'The pilot showed that the idea was viable on a larger scale.', translation: 'Chương trình thử nghiệm cho thấy ý tưởng khả thi ở quy mô lớn hơn.', source: 'Lexora' }], tags: ['Business', 'Planning'],
  },
  {
    word: 'vulnerable', phonetic: '/ˈvʌlnərəbəl/', partOfSpeech: 'adjective', difficulty: 'B2',
    definition: 'easy to harm, damage, or attack', translation: 'dễ bị tổn thương',
    collocations: ['vulnerable group', 'vulnerable to attack'], examples: [{ sentence: 'Older systems may be vulnerable to security failures.', translation: 'Hệ thống cũ có thể dễ bị tổn thương trước lỗi bảo mật.', source: 'Lexora' }], tags: ['Technology', 'Society'],
  },
  {
    word: 'withdraw', phonetic: '/wɪðˈdrɔː/', partOfSpeech: 'verb', difficulty: 'B2',
    definition: 'to remove or take something away, or stop participating', translation: 'rút lui; rút ra',
    collocations: ['withdraw an application', 'withdraw from a project'], examples: [{ sentence: 'The researcher withdrew the claim after finding an error in the data.', translation: 'Nhà nghiên cứu rút lại nhận định sau khi phát hiện lỗi trong dữ liệu.', source: 'Lexora' }], tags: ['Academic', 'Work'],
  },
  {
    word: 'accommodate', phonetic: '/əˈkɒmədeɪt/', partOfSpeech: 'verb', difficulty: 'C1',
    definition: 'to provide space or adjust to meet a need', translation: 'đáp ứng; điều chỉnh cho phù hợp',
    collocations: ['accommodate demand', 'accommodate different needs'], examples: [{ sentence: 'The flexible design can accommodate different learning styles.', translation: 'Thiết kế linh hoạt có thể đáp ứng các phong cách học khác nhau.', source: 'Lexora' }], tags: ['Learning', 'Design'],
  },
  {
    word: 'advocate', phonetic: '/ˈædvəkeɪt/', partOfSpeech: 'verb', difficulty: 'C1',
    definition: 'to publicly support a particular idea or policy', translation: 'ủng hộ; chủ trương',
    collocations: ['advocate reform', 'strongly advocate'], examples: [{ sentence: 'Many educators advocate regular low-pressure practice.', translation: 'Nhiều nhà giáo dục ủng hộ việc luyện tập đều đặn với áp lực thấp.', source: 'Lexora' }], tags: ['Academic', 'Learning'],
  },
  {
    word: 'bias', phonetic: '/ˈbaɪəs/', partOfSpeech: 'noun', difficulty: 'C1',
    definition: 'an unfair preference that influences judgment', translation: 'thiên kiến',
    collocations: ['cultural bias', 'reduce bias'], examples: [{ sentence: 'The study explains how selection bias can distort the result.', translation: 'Nghiên cứu giải thích thiên kiến lựa chọn có thể làm sai lệch kết quả.', source: 'Lexora' }], tags: ['Academic', 'Society'],
  },
  {
    word: 'capacity', phonetic: '/kəˈpæsəti/', partOfSpeech: 'noun', difficulty: 'B2',
    definition: 'the ability or amount that something can contain or handle', translation: 'khả năng; sức chứa',
    collocations: ['production capacity', 'capacity to learn'], examples: [{ sentence: 'The team increased system capacity before the busy season.', translation: 'Đội ngũ tăng khả năng xử lý của hệ thống trước mùa cao điểm.', source: 'Lexora' }], tags: ['Technology', 'Business'],
  },
  {
    word: 'clarify', phonetic: '/ˈklærɪfaɪ/', partOfSpeech: 'verb', difficulty: 'B1',
    definition: 'to make something easier to understand', translation: 'làm rõ',
    collocations: ['clarify a point', 'clarify expectations'], examples: [{ sentence: 'Please clarify the next step before the meeting ends.', translation: 'Vui lòng làm rõ bước tiếp theo trước khi cuộc họp kết thúc.', source: 'Lexora' }], tags: ['Communication', 'Work'],
  },
  {
    word: 'discrete', phonetic: '/dɪˈskriːt/', partOfSpeech: 'adjective', difficulty: 'C1',
    definition: 'separate and distinct from other things', translation: 'riêng biệt',
    collocations: ['discrete stages', 'discrete units'], examples: [{ sentence: 'The course divides a complex skill into discrete stages.', translation: 'Khóa học chia kỹ năng phức tạp thành các giai đoạn riêng biệt.', source: 'Lexora' }], tags: ['Academic', 'Learning'],
  },
  {
    word: 'emerge', phonetic: '/ɪˈmɜːdʒ/', partOfSpeech: 'verb', difficulty: 'B2',
    definition: 'to become known, visible, or important', translation: 'xuất hiện; nổi lên',
    collocations: ['emerge as a leader', 'new pattern emerges'], examples: [{ sentence: 'A clear pattern emerged after the interviews were compared.', translation: 'Một khuôn mẫu rõ ràng xuất hiện sau khi các cuộc phỏng vấn được so sánh.', source: 'Lexora' }], tags: ['Academic', 'Change'],
  },
  {
    word: 'foster', phonetic: '/ˈfɒstə/', partOfSpeech: 'verb', difficulty: 'B2',
    definition: 'to encourage the development of something', translation: 'nuôi dưỡng; thúc đẩy',
    collocations: ['foster creativity', 'foster cooperation'], examples: [{ sentence: 'Open questions foster curiosity and deeper discussion.', translation: 'Câu hỏi mở nuôi dưỡng sự tò mò và thảo luận sâu hơn.', source: 'Lexora' }], tags: ['Learning', 'Communication'],
  },
  {
    word: 'hierarchy', phonetic: '/ˈhaɪərɑːki/', partOfSpeech: 'noun', difficulty: 'B2',
    definition: 'a system in which people or things are ranked by importance', translation: 'hệ thống cấp bậc',
    collocations: ['organizational hierarchy', 'social hierarchy'], examples: [{ sentence: 'The organizational hierarchy determines who approves the budget.', translation: 'Hệ thống cấp bậc tổ chức quyết định ai phê duyệt ngân sách.', source: 'Lexora' }], tags: ['Business', 'Society'],
  },
  {
    word: 'infrastructure', phonetic: '/ˈɪnfrəstrʌktʃə/', partOfSpeech: 'noun', difficulty: 'B2',
    definition: 'the basic systems and structures needed for a society or organization', translation: 'cơ sở hạ tầng',
    collocations: ['digital infrastructure', 'public infrastructure'], examples: [{ sentence: 'Reliable digital infrastructure supports remote education and work.', translation: 'Cơ sở hạ tầng số đáng tin cậy hỗ trợ giáo dục và làm việc từ xa.', source: 'Lexora' }], tags: ['Technology', 'Society'],
  },
  {
    word: 'legitimate', phonetic: '/lɪˈdʒɪtɪmət/', partOfSpeech: 'adjective', difficulty: 'C1',
    definition: 'reasonable, lawful, or deserving to be accepted', translation: 'chính đáng; hợp pháp',
    collocations: ['legitimate concern', 'legitimate reason'], examples: [{ sentence: 'The customer raised a legitimate concern about privacy.', translation: 'Khách hàng nêu một mối quan ngại chính đáng về quyền riêng tư.', source: 'Lexora' }], tags: ['Society', 'Communication'],
  },
  {
    word: 'mediate', phonetic: '/ˈmiːdieɪt/', partOfSpeech: 'verb', difficulty: 'C1',
    definition: 'to help people in a disagreement reach an agreement', translation: 'hòa giải; trung gian',
    collocations: ['mediate a dispute', 'mediate between parties'], examples: [{ sentence: 'A neutral facilitator helped mediate the dispute.', translation: 'Một người điều phối trung lập giúp hòa giải tranh chấp.', source: 'Lexora' }], tags: ['Communication', 'Society'],
  },
  {
    word: 'objective', phonetic: '/əbˈdʒektɪv/', partOfSpeech: 'adjective', difficulty: 'B2',
    definition: 'based on facts rather than personal feelings or opinions', translation: 'khách quan',
    collocations: ['objective assessment', 'remain objective'], examples: [{ sentence: 'An objective assessment considers both strengths and weaknesses.', translation: 'Đánh giá khách quan xem xét cả điểm mạnh và điểm yếu.', source: 'Lexora' }], tags: ['Academic', 'Communication'],
  },
  {
    word: 'prioritize', phonetic: '/praɪˈɒrətaɪz/', partOfSpeech: 'verb', difficulty: 'B2',
    definition: 'to decide which tasks or needs are most important', translation: 'ưu tiên',
    collocations: ['prioritize tasks', 'prioritize safety'], examples: [{ sentence: 'Learners should prioritize meaningful practice over passive rereading.', translation: 'Người học nên ưu tiên luyện tập có ý nghĩa thay vì chỉ đọc lại thụ động.', source: 'Lexora' }], tags: ['Learning', 'Planning'],
  },
  {
    word: 'relevant', phonetic: '/ˈreləvənt/', partOfSpeech: 'adjective', difficulty: 'B1',
    definition: 'directly connected with a subject or purpose', translation: 'liên quan; phù hợp',
    collocations: ['relevant information', 'highly relevant'], examples: [{ sentence: 'Use examples that are relevant to your daily communication.', translation: 'Hãy dùng ví dụ liên quan đến giao tiếp hằng ngày của bạn.', source: 'Lexora' }], tags: ['Learning', 'Communication'],
  },
  {
    word: 'retain', phonetic: '/rɪˈteɪn/', partOfSpeech: 'verb', difficulty: 'B2',
    definition: 'to keep or continue to have something', translation: 'giữ lại; ghi nhớ',
    collocations: ['retain information', 'retain control'], examples: [{ sentence: 'Retrieval practice helps learners retain new vocabulary.', translation: 'Luyện tập truy hồi giúp người học ghi nhớ từ vựng mới.', source: 'Lexora' }], tags: ['Learning', 'Academic'],
  },
  {
    word: 'stimulate', phonetic: '/ˈstɪmjuleɪt/', partOfSpeech: 'verb', difficulty: 'B2',
    definition: 'to encourage activity, growth, or interest', translation: 'kích thích; thúc đẩy',
    collocations: ['stimulate discussion', 'stimulate growth'], examples: [{ sentence: 'The debate stimulated discussion about responsible innovation.', translation: 'Cuộc tranh luận kích thích thảo luận về đổi mới có trách nhiệm.', source: 'Lexora' }], tags: ['Academic', 'Communication'],
  },
];

const seedContexts = [
  {
    id: 'seed-context-building-resilient-digital-services',
    title: 'Building Resilient Digital Services',
     content: 'A resilient digital service needs reliable infrastructure, efficient processes, and transparent communication. Teams anticipate failures, assess each constraint, and adapt quickly when demand fluctuates. The service has enough capacity to handle the changing demand, and conditions fluctuate when supply changes.',
    sourceType: 'ARTICLE' as const,
    words: ['resilient', 'infrastructure', 'efficient', 'transparent', 'anticipate', 'assess', 'constraint', 'adapt', 'capacity', 'fluctuate'],
  },
  {
    id: 'seed-context-learning-through-retrieval-practice',
    title: 'Learning Through Retrieval Practice',
     content: 'Fundamental learning improves when students retrieve relevant ideas, clarify meaning, and reinforce memory through subsequent practice. Persistent effort helps learners retain vocabulary and evaluate their progress objectively. A significant improvement appears when each objective is practiced deliberately.',
    sourceType: 'READING' as const,
    words: ['fundamental', 'relevant', 'clarify', 'reinforce', 'subsequent', 'persistent', 'retain', 'evaluate', 'objective', 'significant'],
  },
  {
    id: 'seed-context-ethical-research-and-clear-evidence',
    title: 'Ethical Research and Clear Evidence',
     content: 'A coherent research report uses precise language and empirical evidence. Researchers must identify bias, protect vulnerable participants, and justify conclusions without ambiguous claims. They concede uncertainty when the evidence cannot support a stronger conclusion, and an objective review keeps the analysis fair while applying an ethical standard.',
    sourceType: 'BOOK' as const,
    words: ['coherent', 'precise', 'empirical', 'bias', 'vulnerable', 'justify', 'ambiguous', 'ethical', 'objective', 'concede'],
  },
  {
    id: 'seed-context-pragmatic-collaboration-at-work',
    title: 'Pragmatic Collaboration at Work',
     content: 'Diverse teams collaborate more effectively when they clarify expectations, prioritize crucial tasks, and mediate disagreements with integrity. A pragmatic plan can accommodate different needs while maintaining quality, and leaders maintain trust through clear decisions.',
    sourceType: 'WORK' as const,
    words: ['diverse', 'collaborate', 'clarify', 'prioritize', 'crucial', 'mediate', 'integrity', 'pragmatic', 'accommodate', 'maintain'],
  },
  {
    id: 'seed-context-sustainable-growth-and-change',
    title: 'Sustainable Growth and Change',
     content: 'Sustainable growth requires feasible decisions, viable infrastructure, and a willingness to question conventional assumptions. Organizations implement changes gradually, foster innovation, and respond when conditions deteriorate. Unprecedented opportunities emerge when teams plan for change responsibly.',
    sourceType: 'ARTICLE' as const,
    words: ['sustainable', 'feasible', 'viable', 'infrastructure', 'conventional', 'implement', 'foster', 'deteriorate', 'emerge', 'unprecedented'],
  },
];

const SEED_MARKER_ID = 'lexora-curated-vocabulary-v1';
const SEED_BUSY_RETRIES = 8;

function isBusyError(error: unknown): boolean {
  const typedError = error as { code?: string; message?: string };
  return typedError.code === 'SQLITE_BUSY' || typedError.code === 'SQLITE_LOCKED' ||
    /database is locked|database table is locked/i.test(typedError.message ?? '');
}

function waitForRetry(attempt: number): Promise<void> {
  return new Promise((resolve) => setTimeout(resolve, 10 * (attempt + 1)));
}

function seedWithinLockedTransaction(db: AppDatabase): { wordCount: number; contextCount: number } {
  const wordIds = new Map<string, string>();
  let contextCount = 0;

  db.sqlite.exec(`
    CREATE TABLE IF NOT EXISTS lexora_seed_markers (
      id TEXT PRIMARY KEY,
      created_at TEXT NOT NULL
    )
  `);

  const marker = db.sqlite
    .prepare('SELECT id FROM lexora_seed_markers WHERE id = ?')
    .get(SEED_MARKER_ID);
  if (marker) return { wordCount: seedWords.length, contextCount: 0 };

  const now = new Date().toISOString();

  for (const seedWord of seedWords) {
    const existing = db
      .select({ id: words.id })
      .from(words)
      .where(sql`lower(${words.word}) = lower(${seedWord.word})`)
      .all()[0];
    let wordId = existing?.id;

    if (!wordId) {
      wordId = randomUUID();
      db.insert(words).values({
        id: wordId,
        word: seedWord.word,
        phonetic: seedWord.phonetic ?? null,
        partOfSpeech: seedWord.partOfSpeech ?? null,
        definition: seedWord.definition,
        translation: seedWord.translation ?? null,
        difficulty: seedWord.difficulty ?? null,
        createdAt: now,
        updatedAt: now,
      }).onConflictDoNothing().run();

      const insertedWord = db
        .select({ id: words.id })
        .from(words)
        .where(sql`lower(${words.word}) = lower(${seedWord.word})`)
        .all()[0];

      if (!insertedWord) throw new Error(`Seed word was not inserted: ${seedWord.word}`);
      wordId = insertedWord.id;
    }

    wordIds.set(seedWord.word, wordId);
    if (existing) continue;

      for (const phrase of seedWord.collocations ?? []) {
        db.insert(collocations).values({
          id: randomUUID(),
          wordId,
          phrase: typeof phrase === 'string' ? phrase : phrase.phrase,
        }).onConflictDoNothing().run();
      }

      for (const example of seedWord.examples ?? []) {
        db.insert(examples).values({
          id: randomUUID(),
          wordId,
          sentence: typeof example === 'string' ? example : example.sentence,
          translation: typeof example === 'string' ? null : example.translation ?? null,
          source: typeof example === 'string' ? null : example.source ?? null,
        }).onConflictDoNothing().run();
      }

      for (const tagName of Array.from(new Set(seedWord.tags ?? []))) {
        db.insert(tags).values({ id: randomUUID(), name: tagName, createdAt: now }).onConflictDoNothing().run();
        const tag = db.select().from(tags).where(eq(tags.name, tagName)).all()[0];
        if (!tag) throw new Error(`Seed tag was not inserted: ${tagName}`);
        db.insert(wordTags).values({ wordId, tagId: tag.id }).onConflictDoNothing().run();
      }

      db.insert(learningProgress).values({
        id: randomUUID(),
        wordId,
        status: 'NEW',
        recognitionScore: 0,
        recallScore: 0,
        productionScore: 0,
        lastStudiedAt: null,
        updatedAt: now,
      }).onConflictDoNothing().run();

      db.insert(reviewStates).values({
        id: randomUUID(),
        wordId,
        interval: 0,
        easeFactor: 2.5,
        repetitions: 0,
        lapses: 0,
        dueAt: now,
        lastReviewedAt: null,
      }).onConflictDoNothing().run();
  }

  for (const seedContext of seedContexts) {
    const contextId = seedContext.id;
    const existing = db
      .select({ id: contexts.id })
      .from(contexts)
      .where(eq(contexts.id, contextId))
      .all()[0];

    if (!existing) {
        db.insert(contexts).values({
          id: contextId,
          title: seedContext.title,
          content: seedContext.content,
          sourceType: seedContext.sourceType,
          sourceUrl: null,
          createdAt: now,
          updatedAt: now,
        }).onConflictDoNothing().run();
        contextCount += 1;
    }

    for (const word of seedContext.words) {
      const wordId = wordIds.get(word);
      if (!wordId) throw new Error(`Seed word not found: ${word}`);
      db.insert(contextWords).values({
          contextId,
          wordId,
          exposureCount: 1,
          firstSeenAt: now,
          lastSeenAt: now,
      }).onConflictDoNothing().run();
    }
  }

  db.sqlite.prepare('INSERT INTO lexora_seed_markers (id, created_at) VALUES (?, ?)').run(SEED_MARKER_ID, now);
  return { wordCount: wordIds.size, contextCount };
}

export async function seedDatabase(db: AppDatabase): Promise<{ wordCount: number; contextCount: number }> {
  const previousBusyTimeout = Number(db.sqlite.pragma('busy_timeout', { simple: true }));
  // Let this bounded retry loop, rather than SQLite's multi-second default timeout, own lock waits.
  db.sqlite.pragma('busy_timeout = 0');

  try {
    for (let attempt = 0; ; attempt++) {
      try {
        db.sqlite.exec('BEGIN IMMEDIATE');
        try {
          const result = seedWithinLockedTransaction(db);
          db.sqlite.exec('COMMIT');
          return result;
        } catch (error) {
          if (db.sqlite.inTransaction) db.sqlite.exec('ROLLBACK');
          throw error;
        }
      } catch (error) {
        if (!isBusyError(error) || attempt >= SEED_BUSY_RETRIES) throw error;
        await waitForRetry(attempt);
      }
    }
  } finally {
    db.sqlite.pragma(`busy_timeout = ${previousBusyTimeout}`);
  }
}
