/**
 * @file subject-verb-agreement-complex.ts
 * @description C1 lesson on subject-verb agreement in complex syntactic environments (intervening modifiers, quantifiers, collective nouns, proximity rules).
 */
import type { GrammarLesson } from '../../types.js';

const subjectVerbAgreementComplexLesson: GrammarLesson = {
  id: 'grammar-v2-c1-subject-verb-agreement-complex-20',
  revisionId: 'grammar-v2-c1-subject-verb-agreement-complex-20@1.0.0',
  revision: '1.0.0',
  title: 'Hòa hợp chủ vị trong cấu trúc phức hợp (Subject-Verb Agreement in Complex Structures)',
  objective: 'Xác định chính xác chủ ngữ trung tâm và chia động từ chuẩn mực trong các cấu trúc cú pháp phức tạp: bổ ngữ xen giữa nhiều tầng, lượng từ tỷ lệ, danh từ tập hợp, liên từ sóng đôi và mệnh đề danh ngữ what.',
  prerequisiteIds: ['grammar-v2-c1-nominalisation-19'],
  coverage: ['subject-verb-agreement-complex', 'complex-syntax', 'proximity-principle', 'collective-nouns', 'quantifier-agreement', 'c1-academic-writing'],
  context: {
    english: 'In sophisticated academic writing, lengthy modifiers frequently separate the head subject from the predicate. A careless author might fall into the trap of proximity agreement: "The prevalence of severe neurological symptoms in patients undergoing experimental immunotherapy have alarmed clinicians" (incorrect). The head noun is singular "prevalence," requiring "has alarmed."',
    vietnamese: 'Trong văn phong học thuật cao cấp, các bổ ngữ kéo dài thường xen giữa chủ ngữ chính và vị ngữ. Người viết thiếu cẩn trọng dễ rơi vào bẫy "hòa hợp theo từ đứng gần" (proximity trap): "The prevalence of severe neurological symptoms in patients undergoing experimental immunotherapy have alarmed clinicians" (sai). Danh từ trung tâm là "prevalence" số ít, đòi hỏi động từ "has alarmed".',
  },
  guide: {
    pattern: 'Head Noun (+ Intervening Modifiers) + Verb (Agreement with Head) | Either A or B + Verb (Agrees with B) | Quantifier + of + Noun + Verb (Agrees with Noun)',
    whenToUse: [
      'Xử lý câu có chuỗi bổ ngữ dài (cụm giới từ, mệnh đề quan hệ rút gọn) xen giữa chủ ngữ và động từ chính.',
      'Chia động từ theo tỷ lệ phần trăm hoặc phân số (a majority of, two-thirds of, a proportion of) dựa trên danh từ đứng sau giới từ "of".',
      'Phân biệt cấu trúc "one of the [plural nouns] who + V(plural)" với "the only one of the [plural nouns] who + V(singular)".',
    ],
    signalWords: ['a proportion of', 'along with', 'as well as', 'either... or', 'neither... nor', 'one of those who', 'the only one of'],
    check: [
      'Đã tìm đúng danh từ trung tâm (head noun) trước các cụm giới từ chêm xen chưa?',
      'Các cụm thêm thông tin như "along with", "as well as", "together with" có làm thay đổi số của chủ ngữ chính không? (Câu trả lời: KHÔNG).',
      'Trong cặp "either... or" hoặc "neither... nor", động từ có hòa hợp với chủ ngữ đứng sát nó nhất không?',
    ],
  },
  explanation: 'Sự hòa hợp chủ vị ở cấp độ C1 vượt khỏi các quy tắc số ít/số nhiều sơ cấp, đòi hỏi người học phân tích sâu về cấu trúc ngữ pháp (grammatical agreement) đối chiếu với nghĩa biểu đạt (notional agreement) và nguyên tắc kế cận (principle of proximity). Các trường hợp then chốt gồm: 1) Bổ ngữ xen giữa (Intervening material): các cụm giới từ phụ hoặc phân từ chen ngang không làm thay đổi số của danh từ hạt nhân ("The quality [of the materials tested across laboratories] is/*are"); 2) Cụm liên từ bổ sung (Quasi-coordinators): "along with", "as well as", "together with" chỉ là trạng ngữ chêm xen, động từ hoàn toàn phụ thuộc vào chủ ngữ đầu ("The professor, along with her research fellows, has/*have arrived"); 3) Lượng từ theo sau bởi "of": với fractions/percentages/majority/none, động từ hòa hợp theo danh từ nằm sau "of" ("Two-thirds of the dataset was analyzed" vs "Two-thirds of the respondents were surveyed"); 4) Mệnh đề what (Nominal relative clauses): thường đi với động từ số ít khi mang nghĩa "the thing that", nhưng có thể đi với số nhiều khi bổ ngữ vị ngữ là danh từ số nhiều ("What concerns us is inflation" vs "What we need are reliable metrics"); 5) "One of the X who": "She is one of the scientists who have made breakthroughs" (đại từ who bổ nghĩa cho scientists số nhiều, nên V chia số nhiều), NHƯNG "She is the only one of the scientists who has made breakthroughs" (chỉ một người duy nhất, V chia số ít).',
  examples: [
    {
      english: 'The proliferation of algorithmic trading platforms across emerging financial markets has confounded legacy regulators.',
      vietnamese: 'Sự sinh sôi của các nền tảng giao dịch thuật toán trên khắp các thị trường tài chính mới nổi đã làm bối rối các nhà quản lý truyền thống.',
    },
    {
      english: 'The principal investigator, together with her postdoctoral assistants, has submitted the grant dossier.',
      vietnamese: 'Nhà nghiên cứu chính, cùng với các trợ lý sau tiến sĩ của bà, đã nộp hồ sơ xin tài trợ.',
    },
    {
      english: 'A substantial proportion of the arable land in the arid delta remains vulnerable to salinization.',
      vietnamese: 'Một tỷ lệ đáng kể đất canh tác tại vùng châu thổ khô hạn vẫn dễ bị nhiễm mặn.',
    },
    {
      english: 'Neither the lead architect nor the project engineers were prepared for the structural fissures.',
      vietnamese: 'Cả kiến trúc sư trưởng lẫn các kỹ sư dự án đều không lường trước được những vết nứt kết cấu.',
    },
    {
      english: 'Dr. Ellis is one of those economists who argue that quantitative easing distort asset valuations.',
      vietnamese: 'Tiến sĩ Ellis là một trong những nhà kinh tế học lập luận rằng việc nới lỏng định lượng làm méo mó định giá tài sản.',
    },
    {
      english: 'On the cabinet table were several confidential memoranda detailing defense expenditures.',
      vietnamese: 'Trên bàn làm việc của nội các là một số bản ghi nhớ tuyệt mật trình bày chi tiết các khoản chi quốc phòng.',
    },
  ],
  contrasts: [
    {
      form: 'The minister, as well as his aides, has approved the treaty vs The minister and his aides have approved the treaty',
      whyFits: 'Cụm "as well as his aides" là trạng ngữ chêm xen (quasi-coordinator), chủ ngữ ngữ pháp duy nhất là "The minister" số ít nên động từ phải chia "has approved".',
      whyNot: 'Dùng "have approved" sau "as well as" là nhầm lẫn với liên từ đẳng lập "and" vốn tạo thành chủ ngữ kép số nhiều.',
    },
    {
      form: 'One of the researchers who have published on this topic vs The only one of the researchers who has published on this topic',
      whyFits: 'Trong "one of the researchers who have...", đại từ "who" thay thế cho "researchers" số nhiều; trong "the only one...", trọng tâm là thực thể duy nhất "the only one" nên động từ chia số ít "has".',
      whyNot: 'Không nhận diện được từ hạn định tuyệt đối "the only" sẽ dẫn đến chia sai số của động từ trong mệnh đề quan hệ.',
    },
  ],
  commonMistakes: [
    'Bị đánh lừa bởi danh từ số nhiều đứng ngay trước động từ trong cụm giới từ xen giữa (proximity trap), ví dụ viết nhầm "The development of new vaccines take time" thay vì "takes time".',
    'Chia động từ số nhiều sau các liên từ chêm xen như "as well as", "together with", "in addition to" vì tưởng nhầm là tương đương với liên từ "and".',
    'Chia sai động từ trong cấu trúc "one of those who + plural verb" thành số ít do nhìn vào từ "one".',
  ],
  summary: 'Hòa hợp chủ vị phức hợp đòi hỏi quy chiếu về danh từ trung tâm thay vì bị chi phối bởi từ đứng gần, phân biệt liên từ chêm xen (as well as) với "and", và chia theo danh từ sau "of" đối với các lượng từ tỷ lệ.',
  exercises: [
    {
      id: 'grammar-v2-c1-subject-verb-agreement-complex-20-q1',
      kind: 'choice',
      prompt: 'Select the sentence with impeccable subject-verb agreement despite intervening modifiers.',
      options: [
        { text: 'The synthesis of multiple organic polymers within pressurized chambers requires continuous monitoring.', correct: true, rationale: 'Singular head noun synthesis correctly pairs with singular verb requires despite intervening plural nouns.' },
        { text: 'The synthesis of multiple organic polymers within pressurized chambers require continuous monitoring.', correct: false, rationale: 'Erroneously agrees with intervening plural chambers rather than singular head synthesis.' },
        { text: 'The synthesis of multiple organic polymers within pressurized chambers are requiring continuous monitoring.', correct: false, rationale: 'Incorrect plural copula are paired with singular subject.' },
        { text: 'The synthesis of multiple organic polymers within pressurized chambers have required continuous monitoring.', correct: false, rationale: 'Incorrect plural auxiliary have.' },
      ],
      acceptedAnswers: [{ text: 'The synthesis of multiple organic polymers within pressurized chambers requires continuous monitoring.', rationale: 'Correct agreement with singular head noun synthesis.' }],
    },
    {
      id: 'grammar-v2-c1-subject-verb-agreement-complex-20-q2',
      kind: 'choice',
      prompt: 'Identify the sentence with correct verb agreement following quasi-coordinators.',
      options: [
        { text: 'The chief executive, along with two senior board members, has resigned from the corporation.', correct: true, rationale: 'Singular head noun chief executive dictates singular verb has; along with is parenthetical.' },
        { text: 'The chief executive, along with two senior board members, have resigned from the corporation.', correct: false, rationale: 'Along with does not create a plural compound subject like and.' },
        { text: 'The chief executive, along with two senior board members, were resigned from the corporation.', correct: false, rationale: 'Incorrect plural passive copula were.' },
        { text: 'The chief executive, along with two senior board members, are resigning from the corporation.', correct: false, rationale: 'Incorrect plural verb are.' },
      ],
      acceptedAnswers: [{ text: 'The chief executive, along with two senior board members, has resigned from the corporation.', rationale: 'Parenthetical phrase does not alter singular subject agreement.' }],
    },
    {
      id: 'grammar-v2-c1-subject-verb-agreement-complex-20-q3',
      kind: 'choice',
      prompt: 'Choose the sentence with correct verb agreement in the relative clause modifying the antecedent.',
      options: [
        { text: 'She is one of the few scholars who have deciphered the ancient cuneiform tablets.', correct: true, rationale: 'Antecedent of who is plural scholars, requiring plural verb have deciphered.' },
        { text: 'She is one of the few scholars who has deciphered the ancient cuneiform tablets.', correct: false, rationale: 'Who refers to scholars, not one; requires plural have deciphered.' },
        { text: 'She is the only one of the scholars who have deciphered the ancient cuneiform tablets.', correct: false, rationale: 'The only one makes the singular head exclusive, requiring has deciphered.' },
        { text: 'She is one of the scholars who is deciphering the ancient cuneiform tablets.', correct: false, rationale: 'Singular is clashes with plural antecedent scholars.' },
      ],
      acceptedAnswers: [{ text: 'She is one of the few scholars who have deciphered the ancient cuneiform tablets.', rationale: 'Plural antecedent scholars dictates plural relative verb have deciphered.' }],
    },
    {
      id: 'grammar-v2-c1-subject-verb-agreement-complex-20-q4',
      kind: 'choice',
      prompt: 'Which sentence correctly applies the proximity principle with correlative conjunctions?',
      options: [
        { text: 'Neither the department chair nor the faculty members were satisfied with the budgetary allocation.', correct: true, rationale: 'Verb agrees with the closer plural subject faculty members following nor.' },
        { text: 'Neither the department chair nor the faculty members was satisfied with the budgetary allocation.', correct: false, rationale: 'Violates proximity rule by agreeing with distant singular chair rather than closer plural members.' },
        { text: 'Neither the faculty members nor the department chair were satisfied with the budgetary allocation.', correct: false, rationale: 'Violates proximity rule: closer subject chair is singular, requiring was.' },
        { text: 'Either the delegates or the secretary-general have sanctioned the communique.', correct: false, rationale: 'Closer subject secretary-general is singular, requiring has.' },
      ],
      acceptedAnswers: [{ text: 'Neither the department chair nor the faculty members were satisfied with the budgetary allocation.', rationale: 'Correct proximity agreement with faculty members.' }],
    },
    {
      id: 'grammar-v2-c1-subject-verb-agreement-complex-20-q5',
      kind: 'gap',
      prompt: 'Supply the correct present form of "be" for this inverted sentence: "Underlying the current diplomatic tensions _____ a profound dispute over maritime boundaries." (singular)',
      options: [],
      acceptedAnswers: [
        { text: 'is', rationale: 'Inverted subject dispute is singular, requiring is.' },
      ],
    },
    {
      id: 'grammar-v2-c1-subject-verb-agreement-complex-20-q6',
      kind: 'gap',
      prompt: 'Choose the correct form of "have" (has / have): "A majority of the surveyed clinicians _____ expressed skepticism regarding the preliminary findings."',
      options: [],
      acceptedAnswers: [
        { text: 'have', rationale: 'A majority of + plural noun clinicians takes plural verb have.' },
      ],
    },
    {
      id: 'grammar-v2-c1-subject-verb-agreement-complex-20-q7',
      kind: 'gap',
      prompt: 'Supply the correct present form of "remain": "The governor, as well as several municipal mayors, _____ steadfast in opposing the tax measure."',
      options: [],
      acceptedAnswers: [
        { text: 'remains', rationale: 'Head subject governor is singular; as well as does not alter number.' },
      ],
    },
    {
      id: 'grammar-v2-c1-subject-verb-agreement-complex-20-q8',
      kind: 'gap',
      prompt: 'Choose "has" or "have": "Professor Martinez is the only one of the committee members who _____ voted against the acquisition."',
      options: [],
      acceptedAnswers: [
        { text: 'has', rationale: 'The only one makes the subject strictly singular, requiring has.' },
      ],
    },
    {
      id: 'grammar-v2-c1-subject-verb-agreement-complex-20-q9',
      kind: 'transform',
      prompt: 'Correct the agreement error and rewrite the sentence: "The collection of historical manuscripts housed in the northern archives have suffered water damage."',
      options: [],
      acceptedAnswers: [
        { text: 'The collection of historical manuscripts housed in the northern archives has suffered water damage.', rationale: 'Changes plural have to singular has to agree with singular head noun collection.' },
      ],
    },
    {
      id: 'grammar-v2-c1-subject-verb-agreement-complex-20-q10',
      kind: 'transform',
      prompt: 'Rewrite the inverted sentence with the correct form of "lie" (lies / lie): "In the eastern foothills of the mountain range lie/lies three secluded monastic settlements."',
      options: [],
      acceptedAnswers: [
        { text: 'In the eastern foothills of the mountain range lie three secluded monastic settlements.', rationale: 'Plural postposed subject settlements requires plural verb lie.' },
      ],
    },
    {
      id: 'grammar-v2-c1-subject-verb-agreement-complex-20-q11',
      kind: 'correction',
      prompt: 'Correct the verb agreement in this correlative sentence: "Either the laboratory supervisor or the technician have miscalibrated the spectrometer."',
      options: [],
      acceptedAnswers: [
        { text: 'Either the laboratory supervisor or the technician has miscalibrated the spectrometer.', rationale: 'Singular subject technician closest to verb requires singular has.' },
      ],
    },
    {
      id: 'grammar-v2-c1-subject-verb-agreement-complex-20-q12',
      kind: 'correction',
      prompt: 'Correct the verb form error: "A comprehensive analysis of consumer trends in suburban districts indicate a marked decline in retail spending."',
      options: [],
      acceptedAnswers: [
        { text: 'A comprehensive analysis of consumer trends in suburban districts indicates a marked decline in retail spending.', rationale: 'Singular head noun analysis requires third-person singular verb indicates.' },
      ],
    },
  ],
  reviewExercises: [
    {
      id: 'grammar-v2-c1-subject-verb-agreement-complex-20-r1',
      kind: 'choice',
      prompt: 'Select the sentence with accurate subject-verb agreement.',
      options: [
        { text: 'The lead negotiator, accompanied by legal counsel, was escorted to the plenary hall.', correct: true, rationale: 'Accompanied by is parenthetical; singular lead negotiator takes was.' },
        { text: 'The lead negotiator, accompanied by legal counsel, were escorted to the plenary hall.', correct: false, rationale: 'Accompanied by does not pluralize the head subject.' },
        { text: 'The lead negotiator, accompanied by legal counsel, have been escorted to the plenary hall.', correct: false, rationale: 'Plural auxiliary have clashes with singular negotiator.' },
      ],
      acceptedAnswers: [{ text: 'The lead negotiator, accompanied by legal counsel, was escorted to the plenary hall.', rationale: 'Singular subject agreement with parenthetical phrase.' }],
    },
    {
      id: 'grammar-v2-c1-subject-verb-agreement-complex-20-r2',
      kind: 'gap',
      prompt: 'Supply the correct present form of "reveal": "A thorough examination of the financial ledgers _____ several unexplained discrepancies." (reveals / reveal)',
      options: [],
      acceptedAnswers: [
        { text: 'reveals', rationale: 'Singular head examination takes singular verb reveals.' },
      ],
    },
    {
      id: 'grammar-v2-c1-subject-verb-agreement-complex-20-r3',
      kind: 'transform',
      prompt: 'Correct the verb number error in this proportional sentence: "Nearly sixty percent of the national petroleum reserve have been depleted."',
      options: [],
      acceptedAnswers: [
        { text: 'Nearly sixty percent of the national petroleum reserve has been depleted.', rationale: 'Uncountable/singular reserve takes singular verb has been depleted.' },
      ],
    },
    {
      id: 'grammar-v2-c1-subject-verb-agreement-complex-20-r4',
      kind: 'correction',
      prompt: 'Fix the subject-verb agreement in this relative clause: "Dr. Aris is one of those theorists who believes that dark matter is an illusion."',
      options: [],
      acceptedAnswers: [
        { text: 'Dr. Aris is one of those theorists who believe that dark matter is an illusion.', rationale: 'Theorists is plural antecedent of who, requiring plural verb believe.' },
      ],
    },
  ],
  outputPrompts: [
    {
      id: 'grammar-v2-c1-subject-verb-agreement-complex-20-o1',
      prompt: 'Viết 2 câu trong báo cáo học thuật hoặc quản trị công: một câu có chủ ngữ số ít đi kèm chuỗi bổ ngữ giới từ dài xen giữa (ít nhất 2 giới từ) trước khi đến vị ngữ, và một câu sử dụng liên từ chêm xen "as well as" hoặc "together with" với chủ ngữ số ít.',
      modelAnswer: 'The implementation of rigorous environmental safeguards across decentralized manufacturing hubs has substantially curtailed unauthorized chemical runoffs. The chief environmental inspector, together with his audit team, remains vigilant regarding ongoing regulatory compliance.',
      checks: [
        'Câu thứ nhất chia động từ hòa hợp chính xác với danh từ hạt nhân số ít (implementation... has curtailed) bất chấp các danh từ số nhiều xen giữa.',
        'Câu thứ hai chia động từ số ít với liên từ chêm xen (inspector, together with his team, remains).',
        'Văn phong học thuật chỉn chu, ngữ pháp không tì vết.',
      ],
    },
    {
      id: 'grammar-v2-c1-subject-verb-agreement-complex-20-o2',
      prompt: 'Viết 1-2 câu học thuật sử dụng lượng từ tỷ lệ ("A majority of..." hoặc "A significant proportion of...") và cấu trúc so sánh tương phản ("either... or" hoặc "neither... nor") với sự hòa hợp chủ vị chính xác theo ngữ nghĩa và vị trí.',
      modelAnswer: 'While a significant proportion of the survey respondents were receptive to remote working, neither the departmental directors nor the human resources manager was willing to codify a permanent flexible schedule.',
      checks: [
        'Chia đúng động từ số nhiều theo danh từ sau "of" (proportion of the survey respondents were).',
        'Áp dụng chính xác quy tắc kế cận (proximity) với "neither... nor" (manager was willing).',
        'Logic câu mạch lạc, diễn đạt đạt chuẩn C1.',
      ],
    },
  ],
  sources: [
    {
      id: 'huddleston-pullum-agreement',
      url: 'https://www.cambridge.org/core/books/cambridge-grammar-of-the-english-language/5409E8391BE0E63510FE4A52654D9E2E',
      title: 'The Cambridge Grammar of the English Language: Agreement in Complex Noun Phrases and Clauses',
      claims: [
        'Grammatical agreement overrides linear proximity in standard formal English.',
        'Parenthetical quasi-coordinators like as well as do not change the grammatical number of the subject.',
        'Quantificational nouns taking of-complements display variable number based on the complement noun.',
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
    summary: 'Comprehensive review completed. Complex subject-verb agreement, intervening modifiers, quasi-coordinators, proximity principle, and Huddleston & Pullum sources verified.',
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
export default subjectVerbAgreementComplexLesson;
