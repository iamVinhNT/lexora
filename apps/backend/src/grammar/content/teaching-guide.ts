/**
 * @file teaching-guide.ts
 * @description Structured Vietnamese teaching cues shared by every grammar lesson.
 */
import type { GrammarTeachingGuide } from './types.js';

const guides: Record<string, GrammarTeachingGuide> = {
  'parts-of-speech': {
    pattern: 'Danh từ gọi tên người/vật/ý: teacher, bicycle, happiness.\nĐại từ thay danh từ: I, she, they.\nĐộng từ nêu hành động/trạng thái: read, live, be.\nTính từ mô tả danh từ: a quiet street; the street is quiet.\nTrạng từ thường bổ nghĩa động từ/tính từ: walk slowly; very quiet.',
    whenToUse: ['Đọc câu theo vai trò của từ: ai/vật nào → làm gì/ra sao → thông tin bổ sung.', 'Một từ có thể có nhiều vai trò: work trong “I work” là động từ, trong “my work” là danh từ. Hãy xét cả câu.'],
    signalWords: ['Danh từ sau a/an/the hoặc từ sở hữu: my book.', 'Tính từ trước danh từ hoặc sau be: a bright room; the room is bright.'],
    check: ['Câu hoàn chỉnh đã có động từ chưa? “The sky blue” cần is.', 'Không coi mọi từ đuôi -ly là trạng từ: friendly là tính từ.'],
  },
  'word-order': {
    pattern: 'Chủ ngữ (S) + động từ (V) + tân ngữ/bổ ngữ khi cần.\nS + V: Birds sing.\nS + V + O: Mai reads a book.\nS + be + bổ ngữ: Mai is a student.\nI/you/we/they work; he/she/it works.',
    whenToUse: ['Dựng câu từ chủ thể và động từ trước, rồi thêm đối tượng, nơi chốn hoặc thời gian.', 'Động từ phải phù hợp với chủ ngữ thực sự, không chỉ với danh từ đứng gần nó: The box of pencils is here.'],
    signalWords: ['Tìm “ai/cái gì?” để nhận ra chủ ngữ.', 'Tìm “làm gì/ở đâu/như thế nào?” để xác định động từ và phần bổ sung.'],
    check: ['Tiếng Anh thường cần chủ ngữ rõ: “Rains” → “It rains”.', 'Đừng thêm -s vào động từ vì chủ ngữ số nhiều: The students learn, không phải learns.'],
  },
  be: {
    pattern: 'Khẳng định: I am; he/she/it hoặc danh từ số ít + is; you/we/they hoặc danh từ số nhiều + are.\nPhủ định: S + am/is/are + not + bổ ngữ.\nCó/không: Am/Is/Are + S + bổ ngữ?\nWh-question: Where/Why/How + am/is/are + S?\nTrả lời ngắn: Yes, she is. / No, she isn’t.',
    whenToUse: ['Nói danh tính/nghề nghiệp: My sister is a nurse.', 'Nói vị trí hoặc trạng thái: We are outside. He is hungry.', 'Không dùng be thay động từ hành động: I read, không phải I am read.'],
    signalWords: ['Danh từ/tính từ/cụm nơi chốn sau be: a student, ready, at home.', 'Rút gọn thường gặp: I’m, she’s, we’re, isn’t, aren’t.'],
    check: ['Không đặt do/does trước be: Is he ready?', 'Trả lời ngắn khẳng định không rút gọn ở cuối: Yes, I am, không phải Yes, I’m.'],
  },
  pronouns: {
    pattern: 'Chủ ngữ → tân ngữ: I → me; he → him; she → her; we → us; they → them; you/it giữ nguyên.\nDanh từ đếm được số ít: a/an/the hoặc từ hạn định + danh từ.\nChưa xác định: a book, an idea. Đã xác định: the book.\nSố nhiều thông thường: book → books; box → boxes; child → children.',
    whenToUse: ['Đại từ chủ ngữ đứng trước động từ; tân ngữ sau động từ hoặc giới từ: She speaks to him.', 'A/an giới thiệu một người/vật chưa xác định; the khi người nghe biết đối tượng nào.', 'Danh từ số nhiều/không đếm được nói chung thường không có mạo từ: Cats sleep. Water matters.'],
    signalWords: ['A/an theo âm đầu, không theo chữ cái: a university; an hour.', 'The thường gắn với vật đã nhắc hoặc xác định bởi ngữ cảnh.'],
    check: ['Không để danh từ đếm được số ít trơ: I need a pen, không phải I need pen.', 'Danh từ không đếm được không đi với a/an theo nghĩa khối: information, không phải an information.'],
  },
  'present-simple': {
    pattern: 'Khẳng định: I/you/we/they + V; he/she/it + V-s/es.\nPhủ định: S + do not/does not + V.\nCó/không: Do/Does + S + V?\nWh-question: Where/What/When + do/does + S + V?\nTrả lời ngắn: Yes, she does. / No, they don’t.',
    whenToUse: ['Thói quen: Linh cycles to work on weekdays.', 'Sự thật/trạng thái: This shop sells bread. I know the answer.', 'Lịch cố định: The class starts at six. Be dùng am/is/are, không dùng do/does.'],
    signalWords: ['usually', 'every day', 'often', 'always', 'never'],
    check: ['Thêm -es sau -ch/-sh/-s/-x/-o: watches, goes. Phụ âm + y: study → studies; nguyên âm + y: play → plays.', 'Sau does động từ về nguyên mẫu: Does she study? Không dùng studies.', 'Trạng từ tần suất thường trước động từ thường nhưng sau be: often walks; is often late.'],
  },
  'present-continuous': {
    pattern: 'Khẳng định: S + am/is/are + V-ing.\nPhủ định: S + am/is/are + not + V-ing.\nCó/không: Am/Is/Are + S + V-ing?\nWh-question: What + am/is/are + S + V-ing?\nTrả lời ngắn: Yes, they are. / No, he isn’t.',
    whenToUse: ['Việc đang diễn ra quanh lúc nói: She is checking the map.', 'Tình huống tạm thời: I am staying with a friend this week.', 'Động từ trạng thái như know, want thường không ở tiếp diễn; nghĩa động từ có thể đổi: think = cân nhắc có thể dùng V-ing.'],
    signalWords: ['now', 'right now', 'at the moment', 'this week', 'Listen!'],
    check: ['Chính tả: write → writing; run → running; lie → lying; see → seeing.', 'Đã có be chưa? “She working” thiếu is.', 'Đừng chỉ dựa vào now: I understand now vẫn là hiện tại đơn.'],
  },
  'past-simple': {
    pattern: 'Khẳng định: S + V-ed/V2.\nPhủ định: S + did not + V.\nCó/không: Did + S + V?\nWh-question: When/Where + did + S + V?\nBe: S + was/were; phủ định wasn’t/weren’t; hỏi Was/Were + S?',
    whenToUse: ['Sự kiện đã kết thúc: We moved house last year.', 'Kể chuỗi hành động: She opened the box and smiled.', 'Mốc có thể đã rõ trong hội thoại, không bắt buộc câu nào cũng có yesterday.'],
    signalWords: ['yesterday', 'last week', 'in 2022', 'ago'],
    check: ['Sau did dùng nguyên mẫu: Did he go?, không phải Did he went?', 'Chính tả: live → lived; study → studied; stop → stopped. Bất quy tắc: go → went; eat → ate.', 'Phát âm -ed: /t/ sau âm vô thanh trừ /t/; /d/ sau âm hữu thanh trừ /d/; /ɪd/ sau /t/, /d/.'],
  },
  'past-continuous': {
    pattern: 'Khẳng định: S + was/were + V-ing.\nPhủ định: S + was/were + not + V-ing.\nHỏi: Was/Were + S + V-ing?\nI/he/she/it was; you/we/they were.\nWhile + past continuous, past simple thường nêu sự kiện xen vào.',
    whenToUse: ['Việc đang diễn ra tại mốc quá khứ: At nine, I was preparing lunch.', 'Hành động nền và sự kiện xen vào: We were talking when the bell rang.', 'Hai tiến trình song song: I was reading while she was cooking.'],
    signalWords: ['at eight last night', 'while', 'when', 'at that moment'],
    check: ['Was/were hòa hợp với chủ ngữ, V-ing giữ tiến trình.', 'When/while không tự quyết định thì; xét việc đang diễn ra hay sự kiện trọn vẹn.'],
  },
  'intro-present-perfect': {
    pattern: 'Khẳng định: S + have/has + V3 (phân từ).\nPhủ định: S + have/has + not + V3.\nCó/không: Have/Has + S + V3?\nWh-question: How long + have/has + S + V3?\nI/you/we/they have; he/she/it has.',
    whenToUse: ['Kinh nghiệm đến hiện tại: I have visited Hanoi twice.', 'Kết quả hiện tại: She has broken her glasses; she cannot read now.', 'Trạng thái kéo đến hiện tại: We have known each other for years. For chỉ thời lượng; since chỉ mốc bắt đầu.'],
    signalWords: ['ever', 'never', 'already', 'yet', 'just', 'for/since'],
    check: ['V3 không luôn giống V2: go–went–gone; see–saw–seen; write–wrote–written.', 'Khi nêu mốc quá khứ đã kết thúc như last Monday, thường chọn past simple.', 'Been to = đã đi và trở về; gone to = đã đi, chưa về trong ngữ cảnh hiện tại.'],
  },
  'future-forms': {
    pattern: 'Will: S + will + V; phủ định won’t + V; hỏi Will + S + V?\nGoing to: S + am/is/are + going to + V; not sau be; hỏi đảo be.\nSắp xếp: S + am/is/are + V-ing + mốc tương lai.',
    whenToUse: ['Will: quyết định ngay lúc nói, lời hứa hoặc dự đoán của người nói.', 'Going to: dự định có trước hoặc dự đoán dựa trên dấu hiệu đang thấy.', 'Hiện tại tiếp diễn: cuộc hẹn/sắp xếp đã chốt, thường biết thời gian hoặc người tham gia.'],
    signalWords: ['I’ll...', 'Look at...', 'tomorrow', 'next week', 'at 7 p.m.'],
    check: ['Các từ tomorrow/next week không tự chọn will hay going to; cần ngữ cảnh quyết định/dự định/sắp xếp.', 'Không quên be: She is going to leave; She is meeting us.', 'Một số ngữ cảnh chấp nhận nhiều dạng; khác biệt có thể là trọng tâm hoặc phong cách, không phải đúng/sai tuyệt đối.'],
  },
  comparatives: {
    pattern: 'Tính từ ngắn: adjective-er + than; tính từ dài: more + adjective + than.\nBằng nhau: as + adjective + as; kém bằng: not as + adjective + as.\nBất quy tắc: good → better; bad → worse; far → farther/further.',
    whenToUse: ['So sánh hai đối tượng: This task is harder than the last one.', 'Nói ngang bằng: The blue bag is as heavy as the red one. Not as...as nói mức độ thấp hơn.'],
    signalWords: ['than', 'as...as', 'not as...as', 'two items'],
    check: ['Không dùng đồng thời more và -er: more useful, không phải more usefuler.', 'Chính tả: big → bigger; easy → easier. Tính từ hai âm tiết có biến thể; không chỉ đếm âm tiết máy móc.', 'Tăng/giảm độ chênh bằng much/a little: much better; a little cheaper.'],
  },
  quantifiers: {
    pattern: 'Đếm được số nhiều: many, a few, few + nouns.\nKhông đếm được: much, a little, little + noun.\nCả hai: some, any, a lot of.\nHỏi lượng: How many + plural noun? / How much + uncountable noun?',
    whenToUse: ['Some thường trong khẳng định; any thường trong hỏi/phủ định. Some còn dùng trong lời mời/yêu cầu dự kiến đồng ý: Would you like some tea?', 'A few/a little nhấn có một ít; few/little nhấn rất ít hoặc không đủ. Much thường dùng trong hỏi/phủ định; a lot of tự nhiên trong khẳng định.'],
    signalWords: ['how many', 'how much', 'some', 'any', 'a lot of'],
    check: ['Danh từ sau lượng từ là countable hay uncountable?', 'Danh từ đếm được có ở số nhiều chưa?'],
  },
  'basic-modals': {
    pattern: 'Khẳng định: S + can/could/should/must + V.\nPhủ định: S + modal + not + V.\nHỏi: Modal + S + V?\nHave to chia như động từ thường: she has to; does she have to?; she doesn’t have to.',
    whenToUse: ['Can/could: khả năng hoặc yêu cầu lịch sự: Could you open the window?', 'Should: lời khuyên: You should rest. Must/have to: nghĩa vụ: We have to wear helmets.', 'Could thường nói khả năng chung trong quá khứ; một lần thành công cụ thể thường dùng was/were able to.'],
    signalWords: ['can', 'could', 'should', 'must', 'have to'],
    check: ['Không thêm -s sau modal.', 'Phân biệt mustn’t = bị cấm với don’t have to = không bắt buộc.'],
  },
  'tense-aspect-in-context': {
    pattern: 'Past simple: S + V2 → kể sự kiện trọn vẹn.\nPast continuous: S + was/were + V-ing → mở nền đang diễn ra.\nPresent perfect: S + have/has + V3 → nhìn về quá khứ từ hiện tại.',
    whenToUse: ['So sánh cùng một hành động: I read the report yesterday (sự kiện xong); I was reading at five (đang giữa tiến trình).', 'I have read the report nhấn kinh nghiệm/kết quả đến hiện tại; không nêu một mốc quá khứ đã kết thúc.', 'Việc ở gần hiện tại không tự quyết định present perfect; mốc nhìn và cách tổ chức thông tin mới quan trọng.'],
    signalWords: ['when/while', 'so...now', 'at that time', 'already'],
    check: ['Mốc tham chiếu của câu ở đâu?', 'Người nói muốn nhấn sự kiện, tiến trình hay hệ quả?'],
  },
  'zero-first-second-conditionals': {
    pattern: 'Loại 0: If + present simple, present simple.\nLoại 1: If + present simple, will/can/may + V hoặc mệnh lệnh.\nLoại 2: If + past simple, would/could/might + V.\nĐảo thứ tự hai vế không đổi ý; vế if đứng đầu thường có dấu phẩy.',
    whenToUse: ['Loại 0 cho quy luật/thói quen: If I skip lunch, I get hungry.', 'Loại 1 cho khả năng thực tế tương lai: If you finish early, you can leave.', 'Loại 2 cho giả định xa hiện tại/tương lai: If I had more time, I would travel.'],
    signalWords: ['if', 'when', 'tomorrow', 'imagine', 'would'],
    check: ['Không dùng will trong if-clause dự đoán cơ bản; những trường hợp will chỉ ý sẵn lòng là ý nghĩa khác.', 'Past ở loại 2 biểu thị khoảng cách giả định, không nhất thiết thời gian quá khứ.', 'If I were you là mẫu phổ biến để khuyên; were cũng dùng với chủ ngữ số ít trong giả định trang trọng.'],
  },
  'passive-voice': {
    pattern: 'Hiện tại: am/is/are + V3; quá khứ: was/were + V3.\nTiếp diễn: am/is/are being + V3.\nHoàn thành: have/has been + V3.\nModal: modal + be + V3.\nPhủ định/hỏi thao tác trên trợ động từ đầu tiên: Was it repaired? It wasn’t repaired.',
    whenToUse: ['Đưa đối tượng/kết quả lên trọng tâm: The parcel was delivered this morning.', 'Lược tác nhân khi không biết/không cần; thêm by khi hữu ích: The design was approved by the committee.', 'Chỉ động từ có tân ngữ phù hợp mới chuyển bị động: arrive không thành was arrived.'],
    signalWords: ['was built', 'is used', 'has been completed', 'by'],
    check: ['Be có giữ đúng thì của câu chủ động không?', 'Động từ chính đã chuyển sang phân từ chưa?'],
  },
  'reported-speech': {
    pattern: 'Phát biểu: S + said (that) + clause / told + người nghe + clause.\nCâu hỏi có/không: asked + if/whether + S + V.\nWh-question: asked + wh-word + S + V.\nYêu cầu: told/asked + người + (not) to + V.',
    whenToUse: ['Thuật lại câu nói/câu hỏi và đổi đại từ theo người nói/người nghe thật.', 'Lùi thì thường gặp sau động từ tường thuật quá khứ: present → past; present perfect/past → past perfect; will → would.', 'Không luôn phải lùi thì khi thông tin vẫn đúng hoặc người kể giữ điểm nhìn hiện tại.'],
    signalWords: ['said', 'told', 'asked', 'the next day', 'that'],
    check: ['Tell cần người nhận: told me/us; said to me khác told me.', 'Câu hỏi gián tiếp không đảo: She asked where I lived, không phải where did I live.', 'Today/tomorrow/here chỉ đổi khi mốc thời gian/nơi chốn thay đổi; không áp dụng máy móc.'],
  },
  'relative-clauses': {
    pattern: 'Who: người; which: vật; whose + danh từ: sở hữu; where: nơi chốn.\nDefining: noun + relative clause, không dấu phẩy; thường có thể dùng that.\nNon-defining: noun, who/which... , phần còn lại; không dùng that.',
    whenToUse: ['Defining nhận diện đối tượng: The cyclist who won is my friend.', 'Non-defining thêm thông tin về đối tượng đã rõ: My bike, which is red, is outside.', 'Trong defining, đại từ làm tân ngữ có thể lược: the book (that) I bought; đại từ làm chủ ngữ không lược: the book that fell.'],
    signalWords: ['the person who', 'the book which', 'the place where', 'whose'],
    check: ['Không lặp đại từ chủ ngữ/tân ngữ: the woman who called, không phải who she called.', 'Không lược đại từ hoặc dùng that trong non-defining clause.', 'Where thay ý “ở nơi đó”; nếu vị trí cần tân ngữ thì dùng which/that: the city that I visited.'],
  },
  'third-mixed-conditionals': {
    pattern: 'Loại 3: If + S + had + V3, S + would/could/might have + V3.\nMixed quá khứ → hiện tại: If + had + V3, would + V.\nMixed hiện tại → quá khứ: If + past simple, would have + V3.',
    whenToUse: ['Loại 3: điều kiện và hệ quả đều không xảy ra trong quá khứ: If I had called, she would have waited.', 'Mixed: If I had saved more, I would own a car now (nguyên nhân quá khứ → kết quả hiện tại).', 'Mixed ngược: If he were more careful, he wouldn’t have lost the file (đặc điểm hiện tại → hệ quả quá khứ).'],
    signalWords: ['if', 'last night', 'now', 'would have', 'would be'],
    check: ['Ghi mốc của từng vế trước khi chọn dạng; không gọi mọi câu có had là loại 3.', 'Phủ định đặt sau had/would: hadn’t left; wouldn’t have missed. Would không đứng trong if-clause giả định cơ bản.'],
  },
  'speculative-modals': {
    pattern: 'Hiện tại: must/may/might/could/can’t + V; tiến trình: modal + be + V-ing.\nQuá khứ: modal + have + V3.\nQuá khứ đang diễn ra: modal + have been + V-ing.',
    whenToUse: ['Must: suy luận mạnh từ bằng chứng; may/might/could: để ngỏ khả năng.', 'Can’t/couldn’t: bằng chứng khiến điều đó gần như không thể; không diễn tả lệnh cấm.', 'She might have missed the bus nêu khả năng quá khứ, không khẳng định cô ấy thực sự lỡ xe.'],
    signalWords: ['must be', 'might be', 'can’t be', 'must have', 'evidence'],
    check: ['Mustn’t thường là cấm, không phải phủ định của suy luận must.', 'Không gán một phần trăm cố định cho mỗi modal; ngữ cảnh và bằng chứng ảnh hưởng độ chắc chắn.'],
  },
  'perfect-aspect': {
    pattern: 'Hiện tại hoàn thành: have/has + V3 → trước/đến hiện tại.\nQuá khứ hoàn thành: had + V3 → trước mốc quá khứ.\nTương lai hoàn thành: will have + V3 → trước/đến mốc tương lai.\nPhủ định thêm not sau trợ động từ đầu; câu hỏi đảo trợ động từ đầu.',
    whenToUse: ['By noon, she had finished the draft: việc hoàn tất trước mốc trưa trong quá khứ.', 'By next Friday, we will have finished the draft: nhìn từ mốc tương lai về việc hoàn tất.', 'Perfect continuous nhấn tiến trình/thời lượng: have/had/will have + been + V-ing; chọn khi muốn nêu hoạt động kéo dài, không chỉ kết quả.'],
    signalWords: ['by', 'before', 'already', 'for', 'since'],
    check: ['Past perfect không cần cho mọi hành động xảy ra trước; trình tự có thể đã rõ bằng before/after.', 'Hoàn thành không luôn có nghĩa hành động đã kết thúc: I have lived here for years có thể vẫn sống ở đó.'],
  },
  'advanced-clauses': {
    pattern: 'Although/though/even though + S + V.\nDespite/in spite of + danh từ/V-ing; hoặc the fact that + clause.\nBecause + cause clause; because of + noun/V-ing.\nS + V, so + result clause.\nS + V + so that + purpose clause (thường can/could).',
    whenToUse: ['Nhượng bộ: Although the road was wet, we continued (kết quả trái kỳ vọng).', 'Nguyên nhân: We stopped because the road was flooded. Kết quả: The road was flooded, so we stopped.', 'Mục đích: We left early so that we could avoid traffic. So that cũng có cách dùng kết quả; đọc quan hệ ý trước.'],
    signalWords: ['although', 'despite', 'because', 'so', 'so that'],
    check: ['Không dùng although và but để nối cùng một quan hệ trong mẫu cơ bản.', 'Không đặt mệnh đề hữu hạn trực tiếp sau despite/because of.', 'To + V chỉ mục đích khi chủ thể phù hợp; dùng so that để nói rõ chủ thể khác.'],
  },
  cohesion: {
    pattern: 'Reference: it/they/this + tiền ngữ rõ.\nSubstitution: one/ones thay danh từ; do so thay hành động.\nConnectors: however (tương phản), therefore (kết quả), moreover (thêm ý).\nHowever/therefore thường nối hai câu bằng dấu chấm hoặc chấm phẩy, không chỉ dấu phẩy.',
    whenToUse: ['This + danh từ làm rõ ý được nhắc: This decision, thay vì this mơ hồ giữa nhiều thông tin.', 'Chọn từ nối dựa trên logic thật, không dùng therefore nếu chưa có quan hệ nguyên nhân/kết quả.', 'Giữ lặp có chủ đích khi một thuật ngữ cần chính xác; không bắt buộc thay mọi danh từ bằng đại từ.'],
    signalWords: ['this/that', 'one/ones', 'do so', 'however', 'therefore'],
    check: ['Đại từ đang chỉ rõ về ai/vật/ý nào chưa?', 'Từ nối có đúng quan hệ tương phản, thêm ý hay kết quả không?'],
  },
  inversion: {
    pattern: 'Trạng ngữ phủ định/giới hạn + trợ động từ + S + động từ chính.\nKhông có trợ động từ: dùng do/does/did + V.\nNot until + mốc/mệnh đề, auxiliary + S + V (đảo ở mệnh đề chính).\nĐiều kiện không if: Had + S + V3; Were + S + to V; Should + S + V.',
    whenToUse: ['Nhấn giới hạn trong văn trang trọng: Only later did we notice the mistake.', 'Had I known thay If I had known; ý giả định vẫn giữ nguyên.', 'Không đảo chỉ vì only đứng đầu: Only Lan understood có only bổ nghĩa chủ ngữ nên giữ trật tự thường.'],
    signalWords: ['rarely', 'never', 'only then', 'not until', 'under no circumstances'],
    check: ['Đảo trợ động từ, không đảo tùy ý động từ chính.', 'Sau did/does/do là nguyên mẫu: Rarely does she complain.', 'Đừng đảo mệnh đề phụ sau not until: Not until he arrived did we start.'],
  },
  emphasis: {
    pattern: 'Do/does/did + V trong câu khẳng định: I do agree; she did call.\nTrọng âm tương phản làm nổi phần được sửa: I said MONDAY, not Tuesday.\nFronting đưa thành phần lên đầu: That question, I cannot answer.',
    whenToUse: ['Phản bác nghi ngờ: I did send the message (thực sự đã gửi).', 'Chọn nhấn vào người, hành động hay mốc thời gian theo thông tin cần sửa; không phải đổi cấu trúc lúc nào cũng tăng chất lượng.'],
    signalWords: ['I do...', 'She did...', 'but', 'actually'],
    check: ['Nhấn mạnh có mục đích giao tiếp cụ thể chưa?', 'Không dùng did với động từ đã chia quá khứ.'],
  },
  'cleft-sentences': {
    pattern: 'It-cleft: It + is/was + focus + that/who + clause.\nWh-cleft: What + S + V + is/was + focus.\nVí dụ: It was the wind that broke the window. / What we need is a new plan.',
    whenToUse: ['It-cleft thường đặt tiêu điểm sớm để sửa đối lập về ai/cái gì.', 'Wh-cleft đặt phần nền trước, phần trả lời sau be: What I want is a short break.', 'Dùng câu chẻ khi thật sự cần tổ chức thông tin, không chỉ để làm câu dài/trang trọng.'],
    signalWords: ['It was...', 'What we need is...', 'who', 'that'],
    check: ['Tiêu điểm có trả lời đúng thông tin cần làm rõ không?', 'Wh-clause dùng trật tự câu kể.'],
  },
  ellipsis: {
    pattern: 'Trợ động từ làm điểm tựa: “Has he left?” — “He has.”\nĐồng tình khẳng định: So + auxiliary + S; phủ định: Neither + auxiliary + S.\nPhối hợp: Lan ordered tea and Minh coffee (lược ordered).',
    whenToUse: ['Trả lời ngắn và phối hợp song song khi phần bị lược đã rõ.', 'Trong so sánh, lược phần lặp: She works harder than I do.', 'Chọn trợ động từ theo thì/thể: I like it → So do I; I have finished → So have I.'],
    signalWords: ['So do I', 'She has', 'than...', 'too'],
    check: ['Phần bị lược có khôi phục duy nhất được không?', 'Nếu gây mơ hồ, viết lại đầy đủ.'],
  },
  hedging: {
    pattern: 'Modal: may/might + V; adverb: probably/apparently.\nStance verb: the evidence suggests/appears to...\nGiới hạn: in this sample; under these conditions; based on these observations.',
    whenToUse: ['The data suggest a link phát biểu quan hệ quan sát; không tự nâng thành prove a cause.', 'Gắn giới hạn vào đúng nhận định: In this sample, attendance appears to improve.', 'Hedge còn giảm áp đặt trong giao tiếp: It might be worth checking the figures.'],
    signalWords: ['may', 'probably', 'suggest', 'appear', 'in this sample'],
    check: ['Mức khẳng định có phù hợp bằng chứng không?', 'Đã nêu giới hạn hoặc phạm vi khi cần chưa?'],
  },
  register: {
    pattern: 'Thân mật: Can you send the file?; lịch sự ít áp đặt hơn: Could you send the file when convenient?\nDanh hóa: The team revised the plan → The revision of the plan...\nContraction: we’re/can’t; dạng đầy đủ: we are/cannot.',
    whenToUse: ['Chọn theo quan hệ và thể loại, không coi contraction là sai: nhiều email công việc vẫn dùng tự nhiên.', 'Danh hóa giúp nói về quá trình như một khái niệm nhưng có thể che tác nhân; giữ “who did what” khi cần rõ trách nhiệm.', 'Một câu trực tiếp có thể lịch sự nếu quan hệ và mục đích phù hợp.'],
    signalWords: ['Dear...', 'Could you...', 'Hey...', 'therefore', 'contraction'],
    check: ['Người đọc và thể loại yêu cầu mức trang trọng nào?', 'Câu có rõ và tự nhiên thay vì chỉ “trang trọng” không?'],
  },
  'modality-nuance': {
    pattern: 'Nghĩa vụ: must/have to + V; suy luận: must + V/be + complement.\nPhê bình/hối tiếc quá khứ: should have + V3.\nKhả năng không chắc: may/might + V; quá khứ: may/might have + V3.\nKhoảng cách lịch sự/giả định: could/would, không chỉ thời gian quá khứ.',
    whenToUse: ['You must sign là nghĩa vụ; She must be tired là suy luận. Phải xác định nguồn nghĩa trước khi dịch.', 'You should have checked nói việc nên làm trong quá khứ; The train should arrive soon nêu kỳ vọng hiện tại/tương lai.', 'Could you help? tạo khoảng cách lịch sự, không hỏi riêng khả năng trong quá khứ.'],
    signalWords: ['must', 'have to', 'should', 'should have', 'must be'],
    check: ['Ai tạo nghĩa vụ hoặc cung cấp bằng chứng?', 'Phủ định đang cấm, phủ nhận hay nói không cần?'],
  },
  'tense-aspect-discourse': {
    pattern: 'Sự kiện tiến lên: past simple; nền: past continuous; hồi cố trước mốc kể: past perfect.\nHistorical present: dùng present simple để kể/tóm tắt chuỗi sự kiện quá khứ có chủ đích.\nPerfect/continuous điều chỉnh góc nhìn kết quả hoặc tiến trình, không chỉ vị trí trên lịch.',
    whenToUse: ['The phone rang while I was packing tách sự kiện nổi bật khỏi hành động nền.', 'Trong tóm tắt truyện, “The hero arrives and finds...” có thể là hiện tại tường thuật hợp lệ.', 'Chuyển khung thì có thể hợp lý khi đổi người kể, đoạn trích hoặc điểm nhìn; cần tín hiệu để người đọc theo được.'],
    signalWords: ['then', 'while', 'suddenly', 'by the time', 'historical present'],
    check: ['Khung kể đã nhất quán chưa?', 'Chuyển thì có tạo hiệu ứng diễn ngôn rõ hay chỉ là lỗi?'],
  },
  'information-structure': {
    pattern: 'Thông tin đã biết → thông tin mới thường tạo mạch đọc thuận.\nFronting: That issue, we will discuss tomorrow (đối tượng làm chủ đề).\nPassive: The issue will be discussed tomorrow (đưa đối tượng lên chủ ngữ).\nEnd-weight: thành phần dài/phức tạp thường đặt về cuối.',
    whenToUse: ['Chọn điểm xuất phát nối với câu trước; topic không luôn trùng chủ ngữ.', 'Cleft/passive/fronting thay tiêu điểm nhưng phải giữ ai làm gì cho ai.', 'Đặt phần mới ở cuối không phải luật tuyệt đối; đối lập có thể đưa lên đầu hoặc nhấn bằng giọng.'],
    signalWords: ['by contrast', 'as for', 'this', 'the latter', 'first'],
    check: ['Câu có tiếp tục chủ đề đoạn văn không?', 'Thông tin mới có nằm ở vị trí dễ nhận ra không?'],
  },
  'ellipsis-substitution': {
    pattern: 'Danh từ đếm được: one/ones; hành động: do so; mệnh đề trong cấu trúc phù hợp: think so/hope not.\nEllipsis: I can help if you can [help].\nSo + auxiliary + S: đồng tình; S + auxiliary + so trong một số cấu trúc khác không hoán đổi tùy ý.',
    whenToUse: ['The newer ones thay danh từ số nhiều đã xác định; it/they thường quy chiếu đối tượng cụ thể, không làm cùng việc với one/ones.', 'Do so thay hoạt động đã nêu: They agreed to revise it and did so.', 'Lược bỏ chỉ khi cấu trúc/ngữ cảnh cho phép phục hồi; không thay mọi động từ trạng thái bằng do so.'],
    signalWords: ['one/ones', 'do so', 'so/not', 'if you can'],
    check: ['Đang thay danh từ, hành động hay mệnh đề?', 'Tiền ngữ có đủ rõ để người đọc không phải đoán không?'],
  },
  'register-variation': {
    pattern: 'Hội thoại có ngữ cảnh chung: contraction, discourse marker, ellipsis có thể tự nhiên.\nVăn bản cần lưu hồ sơ: thường làm rõ chủ ngữ, tác nhân và tiền ngữ.\nBiến thể: organisation/analyse (Anh-Anh), organization/analyze (Anh-Mỹ).',
    whenToUse: ['Đánh giá theo thể loại/cộng đồng cụ thể; ngữ pháp hội thoại không tự động là lỗi văn viết.', 'Chọn quy ước chính tả theo tài liệu và giữ nhất quán; biến thể ngoài quy ước mục tiêu có thể vẫn đúng trong cộng đồng khác.', 'Sửa điều gây hiểu sai hoặc không phù hợp độc giả, không xóa mọi lựa chọn phong cách thành một kiểu duy nhất.'],
    signalWords: ['spoken', 'written', 'academic', 'organisation/organization', 'contraction'],
    check: ['Chuẩn/biến thể mục tiêu đã được chọn chưa?', 'Lựa chọn có phù hợp người đọc và mục đích không?'],
  },
};

export function getGrammarTeachingGuide(coverage: readonly string[]): GrammarTeachingGuide {
  const primaryTopic = coverage[0];
  if (!primaryTopic || !hasGrammarTeachingGuide(primaryTopic)) throw new Error(`Missing grammar teaching guide for ${primaryTopic ?? '<empty coverage>'}.`);
  const guide = guides[primaryTopic];
  return {
    pattern: guide.pattern,
    whenToUse: [...guide.whenToUse],
    signalWords: [...guide.signalWords],
    check: [...guide.check],
  };
}

export function hasGrammarTeachingGuide(topic: string): boolean {
  return Object.hasOwn(guides, topic);
}
