/**
 * @file formal-email-register.ts
 * @description C1 lesson on high-register executive and diplomatic email correspondence, focusing on grammatical distancing, negative politeness, and diplomatic pushback.
 */
import type { GrammarLesson } from '../../types.js';

const formalEmailRegisterLesson: GrammarLesson = {
  id: 'grammar-v2-c1-formal-email-register-22',
  revisionId: 'grammar-v2-c1-formal-email-register-22@1.0.0',
  revision: '1.0.0',
  title: 'Thanh ghi thư tín và email trang trọng (Formal Email Register)',
  objective: 'Vận dụng các cấu trúc ngữ pháp tạo khoảng cách lịch sự (aspectual distancing, past modals, negative politeness, conditional framing) để soạn thảo thư tín điều hành, ngoại giao và từ chối nhã nhặn ở cấp độ C1.',
  prerequisiteIds: ['grammar-v2-c1-spoken-vs-written-grammar-21'],
  coverage: ['formal-email-register', 'aspectual-distancing', 'negative-politeness', 'diplomatic-correspondence', 'indirect-directives', 'c1-academic-writing'],
  context: {
    english: 'High-stakes executive and diplomatic emails avoid direct imperatives like "Send me the report by noon." Instead, professionals deploy grammatical distancing: "I was wondering whether it might be feasible to receive the revised draft by midday, should your schedule permit."',
    vietnamese: 'Thư tín ngoại giao và điều hành cấp cao tránh các câu mệnh lệnh trực tiếp như "Send me the report by noon." Thay vào đó, giới chuyên nghiệp triển khai các cấu trúc tạo khoảng cách ngữ pháp: "I was wondering whether it might be feasible to receive the revised draft by midday, should your schedule permit."',
  },
  guide: {
    pattern: 'Subject + Past Continuous / Past Perfect + tentative that/if-clause | Should + Subject + Verb, would + be grateful / obliged if + Subject + could',
    whenToUse: [
      'Đưa ra đề xuất hoặc yêu cầu tế nhị đối với cấp trên, đối tác chiến lược hoặc giáo sư hướng dẫn.',
      'Thực hiện "từ chối ngoại giao" (diplomatic refusal) mà vẫn duy trì mối quan hệ hợp tác tốt đẹp.',
      'Sử dụng thể giả định và đảo ngữ điều kiện loại 1 (Should you require...) để tăng tính trang trọng.',
    ],
    signalWords: ['I was wondering whether', 'I had hoped to inquire', 'should your schedule permit', 'would be much obliged', 'much as we would like to', 'circumstances preclude us from'],
    check: [
      'Đã sử dụng thì quá khứ tiếp diễn (I was hoping / wondering) để giảm áp lực áp đặt thời gian thực lên người nhận chưa?',
      'Đã tránh các lối diễn đạt suồng sã ("Hey", "Thanks in advance", "ASAP") hoặc ngược lại quá cổ hủ quan liêu ("Please find attached hereto") chưa?',
      'Khi từ chối, cấu trúc nhượng bộ (Much as we appreciate..., While we understand...) có đi kèm lý do khách quan không?',
    ],
  },
  explanation: 'Thanh ghi thư tín trang trọng C1 (Formal Email & Epistolary Register) là nghệ thuật điều chỉnh mức độ lịch sự thông qua các công cụ cú pháp tinh vi (Brown & Levinson, 1987). Ba cơ chế ngữ pháp cốt lõi bao gồm: 1) Tạo khoảng cách thời gian và thể (Aspectual and temporal distancing): Dùng thì quá khứ ("I wondered") hoặc quá khứ tiếp diễn ("I was wondering if you might...") biến yêu cầu thành một ý nghĩ thăm dò trong quá khứ, loại bỏ cảm giác đòi hỏi tức thì; dùng quá khứ hoàn thành ("I had hoped to meet") để biểu đạt một mong muốn chưa chắc thực hiện được một cách tế nhị; 2) Lịch sự tiêu cực (Negative politeness / Non-imposition): Tôn trọng không gian tự chủ của người nhận bằng các cấu trúc điều kiện đảo ngữ ("Should you have a moment", "Were it convenient") hoặc cụm từ giảm áp lực ("At your earliest convenience", "Should circumstances allow"); 3) Từ chối ngoại giao (Diplomatic pushback): Dùng mệnh đề nhượng bộ ("Much as we value our partnership, regulatory constraints preclude us from approving...") để khẳng định thiện chí trước khi nêu rào cản khách quan, tránh dùng các từ chối cộc lốc mang tính cá nhân.',
  examples: [
    {
      english: 'I was wondering whether you might be available for a brief consultation early next week.',
      vietnamese: 'Tôi tự hỏi liệu giáo sư/anh có thể dành chút thời gian cho một cuộc trao đổi ngắn vào đầu tuần tới được không.',
    },
    {
      english: 'Should your schedule permit, we would be exceedingly grateful for your feedback on the attached draft.',
      vietnamese: 'Nếu lịch trình cho phép, chúng tôi sẽ vô cùng biết ơn nếu nhận được ý kiến đóng góp của ngài về bản thảo đính kèm.',
    },
    {
      english: 'I had hoped to clarify several contractual ambiguities before we proceed to formal ratification.',
      vietnamese: 'Tôi đã hy vọng có thể làm rõ một số điểm mơ hồ trong hợp đồng trước khi chúng ta tiến hành phê chuẩn chính thức.',
    },
    {
      english: 'Much as we appreciate the merit of your proposal, budgetary constraints preclude us from participating at this juncture.',
      vietnamese: 'Dù rất đánh giá cao giá trị đề xuất của quý vị, các hạn chế ngân sách ngăn cản chúng tôi tham gia vào thời điểm này.',
    },
    {
      english: 'Would it be at all feasible to extend the submission deadline by forty-eight hours?',
      vietnamese: 'Liệu có khả thi chút nào không nếu gia hạn thời hạn nộp hồ sơ thêm bốn mươi tám giờ?',
    },
    {
      english: 'We would be much obliged if you could furnish the updated audit reports at your earliest convenience.',
      vietnamese: 'Chúng tôi sẽ rất biết ơn nếu quý cơ quan có thể cung cấp các báo cáo kiểm toán cập nhật vào thời điểm thuận tiện sớm nhất.',
    },
  ],
  contrasts: [
    {
      form: 'I was wondering whether you might consider vs I wonder if you will consider',
      whyFits: 'Dùng quá khứ tiếp diễn (was wondering) và trợ động từ giả định (might) tạo khoảng cách lịch sự tối đa, hoàn toàn không gây áp lực buộc người nhận phải đồng ý.',
      whyNot: 'Dùng hiện tại đơn (I wonder) và will tạo cảm giác chất vấn trực tiếp, thiếu sự trang trọng cần thiết trong giao tiếp cấp cao.',
    },
    {
      form: 'Circumstances preclude us from accepting vs We don’t want to accept',
      whyFits: 'Chủ ngữ trừu tượng khách quan (circumstances) kết hợp động từ trang trọng (preclude) giải thích rào cản từ chối là do yếu tố ngoại cảnh, bảo toàn thể diện đối tác.',
      whyNot: 'Câu trực diện "We don\'t want to accept" biểu thị sự từ chối mang tính chủ quan, thô lỗ và dễ gây rạn nứt ngoại giao.',
    },
  ],
  commonMistakes: [
    'Dùng câu mệnh lệnh trực tiếp ("Send the file immediately") hoặc lời cảm ơn áp đặt trước ("Thanks in advance") tạo cảm giác trịch thượng, thiếu tôn trọng quyền tự chủ của người nhận.',
    'Lạm dụng từ ngữ cổ lỗ sĩ mang tính pháp lý cứng nhắc ("Please find attached hereto as per above mentioned") khiến email trở nên giả tạo và lỗi thời thay vì trang trọng hiện đại.',
    'Nhầm lẫn giữa đảo ngữ điều kiện trang trọng ("Should you require further details") với câu hỏi nghi vấn (quên dấu chấm câu hoặc đảo ngữ sai cấu trúc).',
  ],
  summary: 'Thanh ghi thư tín trang trọng C1 sử dụng thì quá khứ tiếp diễn (I was hoping/wondering), trợ động từ tình thái thăm dò (might/would), đảo ngữ điều kiện (Should your schedule permit) và cấu trúc từ chối nhượng bộ để đạt chuẩn mực ngoại giao tinh tế.',
  exercises: [
    {
      id: 'grammar-v2-c1-formal-email-register-22-q1',
      kind: 'choice',
      prompt: 'Select the most diplomatical and grammatically distanced opening request for an email to a university dean.',
      options: [
        { text: 'I was wondering whether you might have ten minutes to discuss the doctoral syllabus next Tuesday.', correct: true, rationale: 'Past continuous was wondering combined with tentative modal might embodies high-register negative politeness.' },
        { text: 'I want to ask you whether you can meet me for ten minutes next Tuesday to talk about the syllabus.', correct: false, rationale: 'Overly blunt and demanding for institutional correspondence.' },
        { text: 'You must give me ten minutes next Tuesday because I need to talk about the syllabus.', correct: false, rationale: 'Inappropriate imperative modality.' },
        { text: 'I wonder will you meet me for ten minutes next Tuesday.', correct: false, rationale: 'Inverted interrogative word order in indirect clause lacking polite distancing.' },
      ],
      acceptedAnswers: [{ text: 'I was wondering whether you might have ten minutes to discuss the doctoral syllabus next Tuesday.', rationale: 'Exemplary aspectual and modal distancing.' }],
    },
    {
      id: 'grammar-v2-c1-formal-email-register-22-q2',
      kind: 'choice',
      prompt: 'Identify the sentence that executes a courteous diplomatic refusal without assigning personal blame.',
      options: [
        { text: 'Much as we value our institutional partnership, unforeseen regulatory hurdles preclude us from co-sponsoring the colloquium.', correct: true, rationale: 'Concessive much as paired with impersonal subject hurdles and formal verb preclude delivers an impeccable diplomatic refusal.' },
        { text: 'We do not want to co-sponsor your colloquium because we have regulatory problems.', correct: false, rationale: 'Unprofessional direct rejection lacking diplomatic buffering.' },
        { text: 'We reject your proposal to co-sponsor the colloquium as it is not beneficial to us.', correct: false, rationale: 'Abrasive and hostile tone.' },
        { text: 'Your colloquium is not something we can sponsor so please stop asking us.', correct: false, rationale: 'Impolite conversational dismissal.' },
      ],
      acceptedAnswers: [{ text: 'Much as we value our institutional partnership, unforeseen regulatory hurdles preclude us from co-sponsoring the colloquium.', rationale: 'Flawless diplomatic refusal.' }],
    },
    {
      id: 'grammar-v2-c1-formal-email-register-22-q3',
      kind: 'choice',
      prompt: 'Choose the correct inverted conditional structure for introducing a contingency in a formal closing.',
      options: [
        { text: 'Should you require any further documentation, please do not hesitate to contact our secretariat.', correct: true, rationale: 'Inverted first conditional (Should + subject + bare infinitive) is the gold standard for formal correspondence.' },
        { text: 'Should you will require any further documentation, please do not hesitate to contact our secretariat.', correct: false, rationale: 'Modal will cannot follow conditional auxiliary should.' },
        { text: 'If you should required any further documentation, please contact our secretariat.', correct: false, rationale: 'Past form required is ungrammatical after modal should.' },
        { text: 'Should require you any further documentation, please contact our secretariat.', correct: false, rationale: 'Incorrect inversion syntax; subject must follow auxiliary should.' },
      ],
      acceptedAnswers: [{ text: 'Should you require any further documentation, please do not hesitate to contact our secretariat.', rationale: 'Correct inverted conditional formula.' }],
    },
    {
      id: 'grammar-v2-c1-formal-email-register-22-q4',
      kind: 'choice',
      prompt: 'Which phrase represents contemporary professional high register, avoiding archaic legalese and overly casual jargon?',
      options: [
        { text: 'Please find the revised financial disclosure attached for your review.', correct: true, rationale: 'Clear, modern, and impeccably formal without archaic boilerplate.' },
        { text: 'Please find attached hereto as per above mentioned covenants the disclosure.', correct: false, rationale: 'Stilted, archaic pseudo-legalistic boilerplate.' },
        { text: 'Attached is the file, hope you like it, thanks in advance!', correct: false, rationale: 'Overly casual and presumptuous phrasing.' },
        { text: 'Here goes the document you asked for yesterday.', correct: false, rationale: 'Colloquial and inappropriate for high register.' },
      ],
      acceptedAnswers: [{ text: 'Please find the revised financial disclosure attached for your review.', rationale: 'Balanced modern formal epistolary style.' }],
    },
    {
      id: 'grammar-v2-c1-formal-email-register-22-q5',
      kind: 'gap',
      prompt: 'Supply the inverted conditional auxiliary to express "If you happen to need": "_____ you wish to reschedule our consultation, please notify us forty-eight hours in advance."',
      options: [],
      acceptedAnswers: [
        { text: 'Should', rationale: 'Inverted conditional auxiliary should introduces formal condition.' },
      ],
    },
    {
      id: 'grammar-v2-c1-formal-email-register-22-q6',
      kind: 'gap',
      prompt: 'Complete the aspectual distancing formula: "I _____ wondering whether you could provide guidance on the revised ethics protocol." (be in past continuous)',
      options: [],
      acceptedAnswers: [
        { text: 'was', rationale: 'I was wondering forms the classic polite distancing frame.' },
      ],
    },
    {
      id: 'grammar-v2-c1-formal-email-register-22-q7',
      kind: 'gap',
      prompt: 'Supply the formal adjective in the phrase expressing deep gratitude: "We would be much _____ if you could expedite the processing of the visa sponsorship." (obliged / grateful)',
      options: [],
      acceptedAnswers: [
        { text: 'obliged', rationale: 'Standard high-register collocate in would be much obliged.' },
        { text: 'grateful', rationale: 'Accepts grateful as a standard formal alternative.' },
      ],
    },
    {
      id: 'grammar-v2-c1-formal-email-register-22-q8',
      kind: 'gap',
      prompt: 'Complete the concessive opening for diplomatic pushback: "_____ as we appreciate the urgency of your petition, our bylaws prevent an immediate exception." (Much / Greatly)',
      options: [],
      acceptedAnswers: [
        { text: 'Much', rationale: 'Much as we appreciate is the idiomatic concessive formula.' },
      ],
    },
    {
      id: 'grammar-v2-c1-formal-email-register-22-q9',
      kind: 'transform',
      prompt: 'Transform the direct imperative into a distanced polite request using "I was hoping": "Send me the revised budget draft today."',
      options: [],
      acceptedAnswers: [
        { text: 'I was hoping you might be able to send me the revised budget draft today.', rationale: 'Applies past continuous aspectual distancing and tentative modal might.' },
        { text: 'I was hoping you could send me the revised budget draft today.', rationale: 'Accepts polite variant with modal could.' },
        { text: 'I was hoping that you could send me the revised budget draft today.', rationale: 'Accepts variant with explicit conjunction that.' },
      ],
    },
    {
      id: 'grammar-v2-c1-formal-email-register-22-q10',
      kind: 'transform',
      prompt: 'Rewrite using conditional inversion starting with "Should": "If you need further clarification regarding the tender, please reach out to our legal department."',
      options: [],
      acceptedAnswers: [
        { text: 'Should you need further clarification regarding the tender, please reach out to our legal department.', rationale: 'Applies first conditional inversion with Should.' },
        { text: 'Should you require further clarification regarding the tender, please reach out to our legal department.', rationale: 'Accepts elevated verb require.' },
      ],
    },
    {
      id: 'grammar-v2-c1-formal-email-register-22-q11',
      kind: 'correction',
      prompt: 'Correct the register clash and presumptuous closing in this formal message: "Please send the file by noon. Thanks in advance."',
      options: [],
      acceptedAnswers: [
        { text: 'I would be grateful if you could forward the file by midday, should your schedule permit.', rationale: 'Replaces demanding imperative and thanks in advance with polite conditional request.' },
        { text: 'I would be grateful if you could send the file by noon, should your schedule permit.', rationale: 'Accepts send the file by noon variant.' },
        { text: 'I would appreciate it if you could send the file by noon, should your schedule permit.', rationale: 'Accepts polite alternative formulation.' },
      ],
    },
    {
      id: 'grammar-v2-c1-formal-email-register-22-q12',
      kind: 'correction',
      prompt: 'Correct the syntax error in this indirect question: "I am writing to inquire when will the committee convene to review candidate dossiers."',
      options: [],
      acceptedAnswers: [
        { text: 'I am writing to inquire when the committee will convene to review candidate dossiers.', rationale: 'Restores statement word order in embedded wh-clause (subject committee precedes auxiliary will).' },
      ],
    },
  ],
  reviewExercises: [
    {
      id: 'grammar-v2-c1-formal-email-register-22-r1',
      kind: 'choice',
      prompt: 'Select the sentence that best demonstrates negative politeness in an email to an international dignitary.',
      options: [
        { text: 'Were your commitments to permit an audience, our delegation would be deeply honored.', correct: true, rationale: 'Inverted second conditional (Were... to permit) offers supreme deference and negative politeness.' },
        { text: 'You must grant an audience to our delegation because we have traveled far.', correct: false, rationale: 'Coercive imperative breaching diplomatic decorum.' },
        { text: 'If you have time, come see our delegation tomorrow.', correct: false, rationale: 'Unduly casual conversational invitation.' },
      ],
      acceptedAnswers: [{ text: 'Were your commitments to permit an audience, our delegation would be deeply honored.', rationale: 'Inverted conditional embodying maximum diplomatic respect.' }],
    },
    {
      id: 'grammar-v2-c1-formal-email-register-22-r2',
      kind: 'gap',
      prompt: 'Supply the missing preposition in the diplomatic refusal formula: "Unforeseen supply constraints preclude us _____ fulfilling the order at this time." (from / to)',
      options: [],
      acceptedAnswers: [
        { text: 'from', rationale: 'Preclude takes dependent preposition from + gerund.' },
      ],
    },
    {
      id: 'grammar-v2-c1-formal-email-register-22-r3',
      kind: 'transform',
      prompt: 'Transform into a tentative request using "Would it be feasible": "Can we postpone the steering committee meeting until Friday?"',
      options: [],
      acceptedAnswers: [
        { text: 'Would it be feasible to postpone the steering committee meeting until Friday?', rationale: 'Employs hypothetical modal framing with adjective feasible.' },
        { text: 'Would it be feasible to postpone the steering committee meeting to Friday?', rationale: 'Accepts preposition to Friday.' },
      ],
    },
    {
      id: 'grammar-v2-c1-formal-email-register-22-r4',
      kind: 'correction',
      prompt: 'Correct the word order error in the embedded request: "Could you please inform me where is the summit taking place?"',
      options: [],
      acceptedAnswers: [
        { text: 'Could you please inform me where the summit is taking place?', rationale: 'Restores canonical word order in embedded interrogative clause.' },
      ],
    },
  ],
  outputPrompts: [
    {
      id: 'grammar-v2-c1-formal-email-register-22-o1',
      prompt: 'Viết 2-3 câu trong email gửi cho một giáo sư hoặc đối tác cấp cao để xin gia hạn nộp đề tài/báo cáo, sử dụng thì quá khứ tiếp diễn để tạo khoảng cách (I was wondering whether...), đảo ngữ điều kiện (Should your schedule permit...) và một lý do bất khả kháng khách quan.',
      modelAnswer: 'I was wondering whether it might be feasible to request a forty-eight-hour extension on the research monograph submission. Regrettably, unforeseen laboratory equipment recalibrations have delayed our data verification phase. Should this adjustment be acceptable, I would be exceedingly grateful for your indulgence.',
      checks: [
        'Sử dụng cấu trúc tạo khoảng cách lịch sự "I was wondering whether it might be feasible to...".',
        'Sử dụng đảo ngữ điều kiện trang trọng "Should this adjustment be acceptable...".',
        'Văn phong ngoại giao chuẩn mực, tôn trọng người nhận, không dùng từ ngữ suồng sã.',
      ],
    },
    {
      id: 'grammar-v2-c1-formal-email-register-22-o2',
      prompt: 'Viết 2 câu trong thư từ chối ngoại giao (diplomatic refusal) phản hồi một lời mời thuyết trình hoặc hợp tác dự án, sử dụng cấu trúc nhượng bộ "Much as we would welcome..." và cấu trúc khách quan "circumstances preclude us from...".',
      modelAnswer: 'Much as we would welcome the opportunity to collaborate on this visionary initiative, prior contractual commitments preclude us from taking on additional engagements this quarter. We nonetheless wish your consortium every success and hope our paths may converge on future endeavors.',
      checks: [
        'Sử dụng cấu trúc nhượng bộ "Much as we would welcome...".',
        'Sử dụng cấu trúc khách quan "preclude us from...".',
        'Thể hiện sự lịch thiệp, tôn trọng và mở ra cơ hội hợp tác trong tương lai.',
      ],
    },
  ],
  sources: [
    {
      id: 'brown-levinson-politeness',
      url: 'https://www.cambridge.org/core/books/politeness/E9BA2EB34898CFE0DF9B5EB7EE50A0AE',
      title: 'Politeness: Some Universals in Language Usage: Negative Politeness and Epistolary Register',
      claims: [
        'Aspectual and modal distancing reduces the communicative imposition on the addressee.',
        'Negative politeness strategies utilize impersonalization and conditional frames to preserve recipient autonomy.',
        'Formal email register balances contemporary concision with traditional deferential syntax.',
      ],
      checkedAt: '2026-10-05',
      provenance: 'reference-only',
    },
  ],
  review: {
    status: 'approved',
    mode: 'ai-internal',
    reviewer: 'Editorial Review Agent (AI-Internal)',
    reviewedAt: '2026-10-06T00:00:00.000Z',
    summary: 'Comprehensive review completed. Aspectual distancing, negative politeness, inverted conditional Should-clauses, diplomatic pushback, exercises, and Brown & Levinson sources verified.',
    checks: {
      originalProse: true,
      factualExplanation: true,
      clearContrasts: true,
      singleCorrectChoice: true,
      validTransferExercises: true,
      soundOutputPrompts: true,
      referenceOnlySources: true,
    },
  },
};

export default formalEmailRegisterLesson;
