/**
 * @file spoken-vs-written-grammar.ts
 * @description C1 lesson analyzing structural divergences between dense formal written grammar and flexible high-level spoken discourse grammar.
 */
import type { GrammarLesson } from '../../types.js';

const spokenVsWrittenGrammarLesson: GrammarLesson = {
  id: 'grammar-v2-c1-spoken-vs-written-grammar-21',
  revisionId: 'grammar-v2-c1-spoken-vs-written-grammar-21@1.0.0',
  revision: '1.0.0',
  title: 'Ngữ pháp nói và ngữ pháp viết (Spoken vs Written Grammar)',
  objective: 'Phân tích và điều chỉnh linh hoạt giữa các cấu trúc ngữ pháp viết trang trọng (mật độ danh từ cao, phân cấp mệnh đề phụ) và ngữ pháp nói tương tác bậc cao (heads and tails, chuỗi mệnh đề tuyến tính, situational ellipsis, từ định hướng diễn ngôn).',
  prerequisiteIds: ['grammar-v2-c1-subject-verb-agreement-complex-20'],
  coverage: ['spoken-vs-written-grammar', 'discourse-grammar', 'heads-and-tails', 'situational-ellipsis', 'register-variation', 'c1-academic-writing'],
  context: {
    english: 'A common pitfall at C1 is transcribing spoken syntax into scholarly papers or speaking in rigid textbook prose during seminars. Spoken grammar utilizes real-time features like heads and tails ("That quarterly report, did you spot that anomaly in it?") and situational ellipsis, whereas formal written grammar demands integrated nominal density: "An inspection of the quarterly report revealed an anomaly."',
    vietnamese: 'Một lỗi phổ biến ở trình độ C1 là bê nguyên cú pháp nói vào văn bản học thuật hoặc giao tiếp hội thảo bằng giọng văn viết cứng nhắc như đọc sách. Ngữ pháp nói tận dụng các đặc tính thời gian thực như tiền đề và vĩ đề (heads and tails: "That quarterly report, did you spot that anomaly in it?") cùng tỉnh lược tình huống, trong khi ngữ pháp viết trang trọng đòi hỏi mật độ danh từ cô đọng: "An inspection of the quarterly report revealed an anomaly".',
  },
  guide: {
    pattern: 'Spoken: Head/Topic + Clause + Tail/Clarification | Written: Dense Pre-modified & Post-modified Noun Phrase + Lexical Verb + Object/Complement',
    whenToUse: [
      'Nhận diện các đặc trưng cú pháp nói tương tác (dislocation/heads & tails, conversational ellipsis, vague category tags) trong giao tiếp hội thảo và phỏng vấn chuyên gia.',
      'Chuyển đổi các phát ngôn dạng chuỗi mệnh đề lỏng lẻo (clause chaining / coordinate clauses) thành văn bản học thuật cô đọng có tính thứ bậc cao.',
      'Lựa chọn đúng thanh ghi (register) tương thích với bối cảnh: không viết văn nói vào tiểu luận và không nói văn viết cứng nhắc trong đàm phán trực tiếp.',
    ],
    signalWords: ['as it were', 'mind you', 'in a sense', 'to be fair', 'and things like that', 'or something along those lines'],
    check: [
      'Đã loại bỏ các cấu trúc "heads and tails" (tiền đề/vĩ đề tách rời) và đại từ chỉ định dư thừa khi chuyển ngữ sang văn bản viết trang trọng chưa?',
      'Có nhầm lẫn giữa tỉnh lược ngữ pháp tự nhiên trong giao tiếp nói (situational ellipsis) với lỗi ngữ pháp thiếu chủ ngữ trong văn viết không?',
      'Đã sử dụng liên kết phụ thuộc có thứ bậc (subordination) thay vì ghép chuỗi liên từ đẳng lập (and/so/but) trong bài viết chưa?',
    ],
  },
  explanation: 'Ngữ pháp nói (Spoken Grammar) và ngữ pháp viết (Written Grammar) phục vụ các điều kiện giao tiếp và áp lực nhận thức khác nhau (Biber et al., 1999; Carter & McCarthy, 2006). Ngữ pháp nói vận hành dưới áp lực xử lý thời gian thực (real-time processing), mang tính tương tác trực tiếp (interpersonal) nên chuộng: 1) Cấu trúc tiền đề và vĩ đề (Heads/Left dislocation: "That candidate we interviewed yesterday, what did you think of her?" giúp người nghe định hướng chủ đề trước; Tails/Right dislocation: "It was remarkably insightful, that keynote presentation" giúp bổ sung làm rõ sau vị ngữ); 2) Tỉnh lược tình huống (Situational ellipsis: lược bỏ chủ ngữ hoặc trợ động từ có thể suy luận trực tiếp từ ngữ cảnh như "(Have you) got a minute?", "(It) seems plausible"); 3) Chuỗi mệnh đề tuyến tính (Parataxis / Clause chaining) nối bằng and, but, so; 4) Từ chỉ mức độ mờ nhạt (Vague language tags: "and so forth", "or whatever"). Ngược lại, ngữ pháp viết học thuật trang trọng loại bỏ hoàn toàn các yếu tố trên, thay thế bằng mật độ danh từ cao (high lexical density), danh từ hóa sâu (nominalisation) và cấu trúc phân cấp phụ thuộc phức tạp.',
  examples: [
    {
      english: 'Spoken: That proposal from the logistics unit, I think it overlooks several supply bottlenecks.',
      vietnamese: 'Văn nói: Đề xuất đó từ bộ phận hậu cần, tôi nghĩ nó bỏ sót một vài nút thắt cung ứng. (Cấu trúc Head / Left dislocation định hướng người nghe).',
    },
    {
      english: 'Written: The proposal submitted by the logistics unit overlooks critical supply chain bottlenecks.',
      vietnamese: 'Văn viết: Đề xuất do bộ phận hậu cần đệ trình bỏ sót các nút thắt chuỗi cung ứng mang tính then chốt. (Cụm danh từ cô đọng, loại bỏ đại từ dư thừa).',
    },
    {
      english: 'Spoken: It caused quite an uproar among the delegates, that unexpected amendment.',
      vietnamese: 'Văn nói: Nó gây ra một sự náo động lớn trong các đại biểu, cái tu chính án bất ngờ đó ấy. (Cấu trúc Tail / Right dislocation để làm rõ chủ thể).',
    },
    {
      english: 'Written: The unexpected amendment generated substantial contention among the delegates.',
      vietnamese: 'Văn viết: Tu chính án bất ngờ đã tạo ra sự tranh cãi đáng kể giữa các đại biểu.',
    },
    {
      english: 'Spoken: Looks like the algorithm is overfitting the validation sample, doesn’t it?',
      vietnamese: 'Văn nói: Trông như thuật toán đang bị quá khớp mẫu xác thực, đúng không? (Tỉnh lược tình huống bỏ chủ ngữ It và trợ từ).',
    },
    {
      english: 'Written: Preliminary diagnostic metrics indicate that the algorithm exhibits overfitting on the validation dataset.',
      vietnamese: 'Văn viết: Các chỉ số chẩn đoán sơ bộ chỉ ra rằng thuật toán biểu hiện tình trạng quá khớp trên tập dữ liệu xác thực.',
    },
  ],
  contrasts: [
    {
      form: 'Written: "The inflation surge eroded real wages" vs Spoken: "The inflation, it escalated so fast and wages just dropped"',
      whyFits: 'Văn bản viết trang trọng yêu cầu cấu trúc danh từ chặt chẽ (inflation surge eroded real wages), nén hành động thành chủ ngữ danh từ trực tiếp.',
      whyNot: 'Câu văn nói phân mảnh (it escalated... and wages just dropped) sử dụng đại từ lặp "it" và liên từ nối lỏng lẻo "and", không phù hợp văn phong học thuật.',
    },
    {
      form: 'Spoken: "They had to recall the batch, didn’t they, the pharmaceutical firm?" vs Written: "The pharmaceutical firm was compelled to recall the batch."',
      whyFits: 'Trong giao tiếp nói tương tác, cấu trúc vĩ đề (tail: ", the pharmaceutical firm?") giúp củng cố thông tin một cách tự nhiên.',
      whyNot: 'Để cấu trúc đuôi này trong văn bản viết sẽ bị coi là lỗi cú pháp vụng về và thừa đại từ không chuẩn tắc.',
    },
  ],
  commonMistakes: [
    'Sử dụng cấu trúc tiền đề/vĩ đề của văn nói (Left/Right dislocation) trong tiểu luận học thuật (ví dụ: "That environmental policy, it has failed completely" thay vì "That environmental policy has failed completely").',
    'Bê nguyên các đuôi nói ước lệ mơ hồ (vague language tags như "and stuff like that", "or whatever") vào các bài viết nghiên cứu hoặc bản báo cáo kinh doanh.',
    'Sử dụng câu tỉnh lược tình huống không có chủ ngữ (ví dụ viết "Seems appropriate to evaluate..." thay vì "It seems appropriate to evaluate...") trong thư tín hoặc văn bản trang trọng.',
  ],
  summary: 'Ngữ pháp nói tận dụng heads/tails (dislocation), chuỗi mệnh đề tuyến tính và tỉnh lược tình huống để xử lý thời gian thực, trong khi ngữ pháp viết C1 đòi hỏi cấu trúc danh từ cô đọng, phân cấp mệnh đề chặt chẽ và loại bỏ đại từ dư thừa.',
  exercises: [
    {
      id: 'grammar-v2-c1-spoken-vs-written-grammar-21-q1',
      kind: 'choice',
      prompt: 'Select the sentence that exemplifies an authentic high-register spoken grammar feature (left dislocation / head) used for conversational topic-framing.',
      options: [
        { text: 'That new macroeconomic forecasting model, do you reckon it accounts for supply disruptions?', correct: true, rationale: 'Left dislocation (head noun phrase that new model followed by resumptive pronoun it) is a canonical spoken topic-framing feature.' },
        { text: 'The new macroeconomic forecasting model accounts for unexpected supply disruptions.', correct: false, rationale: 'Standard written sentence without spoken dislocative framing.' },
        { text: 'Accounting for supply disruptions is the primary merit of the new model.', correct: false, rationale: 'Formal gerundial written structure.' },
        { text: 'It is widely known that the model accounts for supply disruptions.', correct: false, rationale: 'Formal written extraposition.' },
      ],
      acceptedAnswers: [{ text: 'That new macroeconomic forecasting model, do you reckon it accounts for supply disruptions?', rationale: 'Authentic spoken left dislocation structure.' }],
    },
    {
      id: 'grammar-v2-c1-spoken-vs-written-grammar-21-q2',
      kind: 'choice',
      prompt: 'Identify the sentence that correctly transforms a fragmented spoken utterance into dense formal academic prose.',
      options: [
        { text: 'The acute volatility in benchmark energy prices precipitated a sharp curtailment of industrial output.', correct: true, rationale: 'Compresses clausal coordination into dense nominal subject volatility... precipitated curtailment.' },
        { text: 'Because energy prices were volatile and went up, industries had to cut down their outputs quickly.', correct: false, rationale: 'Remains in informal clausal-chaining spoken register.' },
        { text: 'That energy price volatility, it caused industries to cut down what they were producing.', correct: false, rationale: 'Retains spoken left dislocation and informal phrasing.' },
        { text: 'Energy prices were very volatile, so industries produced much less, as you know.', correct: false, rationale: 'Contains colloquial coordinating so and interactive tag as you know.' },
      ],
      acceptedAnswers: [{ text: 'The acute volatility in benchmark energy prices precipitated a sharp curtailment of industrial output.', rationale: 'Exemplary nominalised academic conversion.' }],
    },
    {
      id: 'grammar-v2-c1-spoken-vs-written-grammar-21-q3',
      kind: 'choice',
      prompt: 'Which utterance illustrates a spoken "tail" (right dislocation) functioning to clarify the grammatical subject after the predicate?',
      options: [
        { text: 'It proved exceptionally challenging to calibrate, that deep-sea acoustic sensor.', correct: true, rationale: 'Postposes the clarification that deep-sea acoustic sensor after the main predicate as a spoken tail.' },
        { text: 'Calibrating the deep-sea acoustic sensor proved exceptionally challenging.', correct: false, rationale: 'Formal written gerund subject.' },
        { text: 'That deep-sea acoustic sensor was exceptionally challenging to calibrate.', correct: false, rationale: 'Tough-movement construction in standard written syntax.' },
        { text: 'The technician found it challenging to calibrate the deep-sea acoustic sensor.', correct: false, rationale: 'Formal dummy object structure.' },
      ],
      acceptedAnswers: [{ text: 'It proved exceptionally challenging to calibrate, that deep-sea acoustic sensor.', rationale: 'Classic spoken tail / right dislocation.' }],
    },
    {
      id: 'grammar-v2-c1-spoken-vs-written-grammar-21-q4',
      kind: 'choice',
      prompt: 'Identify the informal spoken element that is inappropriate for an academic research paper.',
      options: [
        { text: 'The laboratory encountered equipment malfunctions and stuff like that during synthesis.', correct: true, rationale: 'Contains vague category tag and stuff like that, inappropriate for academic register.' },
        { text: 'The laboratory encountered recurring equipment calibration disparities during synthesis.', correct: false, rationale: 'Precise academic terminology.' },
        { text: 'Systemic mechanical impediments compromised the synthesis protocol.', correct: false, rationale: 'Formal scholarly diction.' },
        { text: 'Subsequent iterations revealed sporadic hardware inconsistencies.', correct: false, rationale: 'Appropriate formal register.' },
      ],
      acceptedAnswers: [{ text: 'The laboratory encountered equipment malfunctions and stuff like that during synthesis.', rationale: 'Inappropriate vague spoken tag.' }],
    },
    {
      id: 'grammar-v2-c1-spoken-vs-written-grammar-21-q5',
      kind: 'gap',
      prompt: 'Complete the conversational situational ellipsis by supplying the missing subject and copula in formal written English: "_____ advisable to review the clinical trial dossier." (It + be)',
      options: [],
      acceptedAnswers: [
        { text: 'It is', rationale: 'Formal written grammar requires the explicit dummy subject and copula It is.' },
        { text: 'It was', rationale: 'Accepts past tense copula It was.' },
      ],
    },
    {
      id: 'grammar-v2-c1-spoken-vs-written-grammar-21-q6',
      kind: 'gap',
      prompt: 'Complete the academic equivalent by supplying the nominal head for "propose": "The _____ submitted by the task force was endorsed unanimously."',
      options: [],
      acceptedAnswers: [
        { text: 'proposal', rationale: 'Nominalisation proposal replaces conversational clausal forms.' },
      ],
    },
    {
      id: 'grammar-v2-c1-spoken-vs-written-grammar-21-q7',
      kind: 'gap',
      prompt: 'Supply the formal linking adverb replacing informal spoken "anyway/mind you" in academic writing: "_____, empirical validation remains indispensable." (Nonetheless / However)',
      options: [],
      acceptedAnswers: [
        { text: 'Nonetheless', rationale: 'Formal adversative transition.' },
        { text: 'However', rationale: 'Accepts standard formal transition However.' },
        { text: 'Nevertheless', rationale: 'Accepts nevertheless.' },
      ],
    },
    {
      id: 'grammar-v2-c1-spoken-vs-written-grammar-21-q8',
      kind: 'gap',
      prompt: 'Supply the missing pronoun to restore formal written grammar from conversational ellipsis: "_____ looked thoroughly into the historical archives before publishing." (They / The researchers)',
      options: [],
      acceptedAnswers: [
        { text: 'They', rationale: 'Supplies the explicit subject pronoun.' },
        { text: 'The researchers', rationale: 'Accepts explicit nominal subject.' },
      ],
    },
    {
      id: 'grammar-v2-c1-spoken-vs-written-grammar-21-q9',
      kind: 'transform',
      prompt: 'Transform the spoken utterance containing left dislocation into formal academic prose: "That new trade restriction, it severely dampened international semiconductor sales."',
      options: [],
      acceptedAnswers: [
        { text: 'The new trade restriction severely dampened international semiconductor sales.', rationale: 'Eliminates spoken left dislocation and resumptive pronoun it.' },
        { text: 'That new trade restriction severely dampened international semiconductor sales.', rationale: 'Accepts determiner that without pronoun duplication.' },
      ],
    },
    {
      id: 'grammar-v2-c1-spoken-vs-written-grammar-21-q10',
      kind: 'transform',
      prompt: 'Rewrite the conversational utterance containing a tail into a formal written sentence: "It sparked extensive debate among economists, that unexpected monetary stimulus."',
      options: [],
      acceptedAnswers: [
        { text: 'The unexpected monetary stimulus sparked extensive debate among economists.', rationale: 'Restores canonical subject-verb-object order, eliminating the spoken tail.' },
        { text: 'That unexpected monetary stimulus sparked extensive debate among economists.', rationale: 'Accepts variant with demonstrative that.' },
      ],
    },
    {
      id: 'grammar-v2-c1-spoken-vs-written-grammar-21-q11',
      kind: 'correction',
      prompt: 'Correct the conversational ellipsis error in this formal executive memorandum: "Wondered if we could convene a briefing tomorrow morning."',
      options: [],
      acceptedAnswers: [
        { text: 'I wondered if we could convene a briefing tomorrow morning.', rationale: 'Restores the obligatory first-person subject pronoun I.' },
        { text: 'We wondered if we could convene a briefing tomorrow morning.', rationale: 'Accepts plural subject pronoun We.' },
      ],
    },
    {
      id: 'grammar-v2-c1-spoken-vs-written-grammar-21-q12',
      kind: 'correction',
      prompt: 'Remove the redundant spoken pronoun from this academic sentence: "The legislative reform, which was enacted last year, it has failed to curb emissions."',
      options: [],
      acceptedAnswers: [
        { text: 'The legislative reform, which was enacted last year, has failed to curb emissions.', rationale: 'Removes the ungrammatical spoken resumptive pronoun it.' },
      ],
    },
  ],
  reviewExercises: [
    {
      id: 'grammar-v2-c1-spoken-vs-written-grammar-21-r1',
      kind: 'choice',
      prompt: 'Select the sentence that complies strictly with formal written register standards.',
      options: [
        { text: 'The revised fiscal mandate necessitated immediate budgetary reapportionment.', correct: true, rationale: 'High nominal density and formal scholarly vocabulary.' },
        { text: 'The revised fiscal mandate, it made them reallocate budgets right away.', correct: false, rationale: 'Contains spoken dislocation and colloquial phrasal verbs.' },
        { text: 'It forced immediate budgetary changes, the revised mandate did.', correct: false, rationale: 'Contains colloquial emphatic tail.' },
      ],
      acceptedAnswers: [{ text: 'The revised fiscal mandate necessitated immediate budgetary reapportionment.', rationale: 'Standard academic register.' }],
    },
    {
      id: 'grammar-v2-c1-spoken-vs-written-grammar-21-r2',
      kind: 'gap',
      prompt: 'Supply the formal academic verb replacing spoken "looked into": "The regulatory agency _____ the alleged accounting irregularities." (investigated / examined)',
      options: [],
      acceptedAnswers: [
        { text: 'investigated', rationale: 'Formal Latinate verb replacing conversational phrasal verb.' },
        { text: 'examined', rationale: 'Accepts examined.' },
      ],
    },
    {
      id: 'grammar-v2-c1-spoken-vs-written-grammar-21-r3',
      kind: 'transform',
      prompt: 'Transform this spoken utterance with left-dislocation into formal written syntax: "Those experimental compounds, they degraded within forty-eight hours."',
      options: [],
      acceptedAnswers: [
        { text: 'Those experimental compounds degraded within forty-eight hours.', rationale: 'Removes redundant resumptive pronoun they.' },
        { text: 'The experimental compounds degraded within forty-eight hours.', rationale: 'Accepts definite article the.' },
      ],
    },
    {
      id: 'grammar-v2-c1-spoken-vs-written-grammar-21-r4',
      kind: 'correction',
      prompt: 'Correct the colloquial vagueness in this academic conclusion: "The survey investigated consumer sentiment, spending habits, and stuff like that."',
      options: [],
      acceptedAnswers: [
        { text: 'The survey investigated consumer sentiment, spending habits, and related economic indicators.', rationale: 'Replaces vague tag and stuff like that with precise academic noun phrase.' },
        { text: 'The survey investigated consumer sentiment, spending habits, and related behaviors.', rationale: 'Accepts related behaviors.' },
      ],
    },
  ],
  outputPrompts: [
    {
      id: 'grammar-v2-c1-spoken-vs-written-grammar-21-o1',
      prompt: 'Viết 2 câu so sánh cùng một nội dung (ví dụ: việc phân tích dữ liệu bị chậm trễ do lỗi phần cứng): câu (a) sử dụng ngữ pháp nói tương tác tự nhiên trong thảo luận nhóm nghiên cứu (có cấu trúc head hoặc tail và từ ngữ thân mật), câu (b) diễn đạt lại dưới dạng một câu văn học thuật C1 chuẩn tắc cho bài báo cáo chính thức.',
      modelAnswer: '(a) That unexpected hardware crash during data ingestion, it really set our team back by several weeks, didn\'t it? (b) The hardware failure that occurred during data ingestion resulted in substantial delays to the analytical timeline.',
      checks: [
        'Câu (a) thể hiện đặc trưng ngữ pháp nói chuẩn xác (left dislocation, question tag, interpersonal tone).',
        'Câu (b) chuyển đổi thành công sang văn phong viết học thuật cô đọng (nominalisation, precise vocabulary).',
        'Cả hai câu đều đúng chuẩn ngữ pháp trong thanh ghi (register) tương ứng.',
      ],
    },
    {
      id: 'grammar-v2-c1-spoken-vs-written-grammar-21-o2',
      prompt: 'Viết 1 đoạn văn ngắn (2 câu) trong một bài thuyết trình hội thảo khoa học C1, khéo léo kết hợp một cấu trúc định hướng chủ đề của văn nói tương tác (ví dụ: "Now, as regards our secondary findings...") nhưng vẫn duy trì tính chính xác và trang trọng của thuật ngữ chuyên ngành.',
      modelAnswer: 'Now, turning to our secondary findings, they would appear to challenge conventional assumptions regarding cellular regeneration. Paradoxically, this counterintuitive trend, which initially seemed anomalous, provides critical empirical insight into adaptive tissue mechanisms.',
      checks: [
        'Sử dụng cấu trúc định hướng người nghe tự nhiên của ngữ pháp nói cấp cao (topic management device).',
        'Duy trì sự chuẩn xác của thuật ngữ và sự thận trọng học thuật (hedging).',
        'Tránh các lỗi vụng về như lạm dụng vague language.',
      ],
    },
  ],
  sources: [
    {
      id: 'carter-mccarthy-spoken-grammar',
      url: 'https://www.cambridge.org/core/books/cambridge-grammar-of-english/1BE21F1F81F94F3C474E8256F28562A9',
      title: 'Cambridge Grammar of English: Spoken and Written Grammar Contrasts',
      claims: [
        'Spoken grammar features situational ellipsis, heads and tails (dislocation), and interpersonal stance markers.',
        'Written academic grammar prioritizes high lexical density and complex nominal packaging over linear coordination.',
        'Register awareness requires discriminating between real-time communicative syntax and formal written discourse.',
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
    summary: 'Comprehensive review completed. Spoken vs written grammar contrasts, left/right dislocation, situational ellipsis, nominal density, and Carter & McCarthy Cambridge sources verified.',
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

export default spokenVsWrittenGrammarLesson;
