/**
 * @file it-clefts.ts
 * @description C1 lesson on it-cleft sentences for information packaging and contrastive focus.
 */
import type { GrammarLesson } from '../../types.js';

const itCleftsLesson: GrammarLesson = {
  id: 'grammar-v2-c1-it-clefts-05',
  revisionId: 'grammar-v2-c1-it-clefts-05@1.0.0',
  revision: '1.0.0',
  title: 'Câu chẻ với It (It-Cleft Sentences)',
  objective: 'Vận dụng cấu trúc câu chẻ "It is / was + Focus + that / who" để phân tách thành phần cần nhấn mạnh (chủ ngữ, tân ngữ, cụm giới từ, mệnh đề trạng ngữ), định hình dòng thông tin và tạo sự tương phản luận điểm sắc bén trong diễn ngôn C1.',
  prerequisiteIds: ['grammar-v2-c1-inversion-after-so-such-04'],
  coverage: ['it-clefts', 'cleft-sentences', 'emphasis', 'information-structure', 'focus-construction'],
  context: {
    english: 'In argumentative writing, legal briefs, and academic analyses, it-clefts single out the decisive variable, correcting misperceptions by contrasting the true catalyst against competing factors.',
    vietnamese: 'Trong văn lập luận, văn bản pháp lý và phân tích học thuật, câu chẻ với It giúp cô lập biến số quyết định, đính chính các hiểu lầm bằng cách làm nổi bật tác nhân thực sự trước các yếu tố đối nghịch.',
  },
  guide: {
    pattern: 'It + is / was + Focus (Noun / Pronoun / Prepositional Phrase / Adverbial Clause) + that / who + Remaining Clause',
    whenToUse: [
      'Nhấn mạnh tác nhân chính hoặc đối tượng chịu tác động trong một chuỗi nguyên nhân - kết quả.',
      'Tạo sự tương phản rõ rệt giữa hai luận điểm hoặc sửa chữa quan niệm sai lầm (It was not X but Y that...).',
      'Đưa cụm giới từ chỉ thời gian, nơi chốn hoặc mệnh đề nguyên nhân (because...) vào vị trí tiêu điểm để giải thích tính tất yếu.',
    ],
    signalWords: ['it was not until... that', 'it is precisely because', 'it was X who', 'it is the underlying assumption that', 'it was primarily through'],
    check: [
      'Thì của "to be" (is / was) đã hòa hợp với thì của mệnh đề gốc chưa?',
      'Thành phần tiêu điểm có được nối bằng "that" (hoặc "who" cho người làm chủ ngữ) thay vì dùng nhầm "which" hay "where" không?',
      'Khi nhấn mạnh đại từ nhân xưng, động từ trong mệnh đề that/who có hòa hợp chuẩn xác với đại từ đó không (It is I who am / It is they who are)?',
    ],
  },
  explanation: 'Câu chẻ với It (It-cleft) là cấu trúc phân tách (cleaving) một mệnh đề đơn thành hai phần nhằm đưa một thành phần cụ thể vào tiêu điểm thông tin (focus position). Cấu trúc chuẩn bao gồm: đại từ giả "It" + dạng tương ứng của "be" (is/was) + thành phần tiêu điểm + mệnh đề phụ mở đầu bằng "that" (hoặc "who" khi tiêu điểm là danh từ chỉ người làm chủ ngữ). Trong văn phong học thuật C1: 1) Tránh dùng "which" hoặc "where" để mở đầu mệnh đề sau tiêu điểm (viết "It was in Geneva that the treaty was signed", không viết "where the treaty was signed"); 2) Khi tiêu điểm là cụm giới từ hoặc mệnh đề điều kiện/thời gian ("It was only when the data emerged that..."), "that" là liên từ chuẩn tắc; 3) Cấu trúc phủ định tương phản "It is not X but Y that..." được sử dụng rộng rãi để định hướng góc nhìn phản biện.',
  examples: [
    {
      english: 'It was the breakdown in diplomatic backchannels that precipitated the regional embargo.',
      vietnamese: 'Chính sự đổ vỡ trong các kênh ngoại giao bí mật đã châm ngòi cho lệnh cấm vận khu vực.',
    },
    {
      english: 'It is not the absolute volume of foreign reserves but their currency composition that safeguards stability.',
      vietnamese: 'Không phải tổng quy mô dự trữ ngoại hối tuyệt đối mà chính cơ cấu tiền tệ của chúng mới bảo đảm sự ổn định.',
    },
    {
      english: 'It was only after rigorous peer review that the climatological anomalies were officially recognized.',
      vietnamese: 'Chỉ sau khi trải qua bình duyệt độc lập nghiêm ngặt, những dị thường khí hậu mới được chính thức thừa nhận.',
    },
    {
      english: 'It was Dr. Aris Thorne who first questioned the statistical assumptions underpinning the econometric model.',
      vietnamese: 'Chính tiến sĩ Aris Thorne là người đầu tiên chất vấn các giả định thống kê làm nền tảng cho mô hình kinh tế lượng.',
    },
    {
      english: 'It is precisely because the algorithm operates autonomously that regulatory oversight becomes indispensable.',
      vietnamese: 'Chính bởi vì thuật toán hoạt động tự chủ nên sự giám sát quản lý mới trở nên thiết yếu hơn bao giờ hết.',
    },
    {
      english: 'It was through cross-sectoral collaboration that the conservation team rehabilitated the degraded estuary.',
      vietnamese: 'Chính nhờ sự hợp tác liên ngành mà nhóm bảo tồn đã phục hồi thành công vùng cửa sông bị suy thoái.',
    },
  ],
  contrasts: [
    {
      form: 'It was in 1994 that the trilateral trade agreement took effect.',
      whyFits: 'Dùng that để mở đầu mệnh đề cleft sau cụm trạng ngữ chỉ thời gian in 1994 theo chuẩn mực cú pháp học thuật.',
      whyNot: '"It was in 1994 when the agreement took effect..." không chuẩn mực trong văn viết trang trọng, vì when làm câu giống mệnh đề quan hệ thời gian hơn là câu chẻ tiêu điểm.',
    },
    {
      form: 'It is the board directors who bear statutory responsibility for fiduciary compliance.',
      whyFits: 'Who hoặc that làm chủ ngữ cho mệnh đề phụ, động từ bear chia số nhiều hòa hợp với the board directors.',
      whyNot: '"It is the board directors which bears..." sai cả đại từ nối (dùng which cho người) và chia động từ số ít bears.',
    },
  ],
  commonMistakes: [
    'Dùng "where" hoặc "when" thay cho "that" sau cụm trạng ngữ nơi chốn hoặc thời gian (viết "It was in London where we signed" thay vì "that we signed").',
    'Chia thì của "be" lệch với thì của mệnh đề chính (viết "It is the sudden drop in liquidity that triggered the 2008 crash" thay vì "was").',
    'Dùng "which" làm từ nối câu chẻ sau danh từ chỉ vật (viết "It was the algorithm which caused the error" thay vì chuẩn mực "that caused").',
  ],
  summary: 'It-clefts tái cấu trúc câu thành "It + is/was + [Tiêu điểm] + that/who + [Thông tin nền]". Công cụ này giúp tác giả C1 cô lập nguyên nhân, làm nổi bật tương phản phản biện ("It is not X but Y that...") và định hướng mạch đọc chính xác tuyệt đối.',
  exercises: [
    {
      id: 'grammar-v2-c1-it-clefts-05-q1',
      kind: 'choice',
      prompt: 'Select the standard high-register cleft sentence focusing on the institutional catalyst: "___ that facilitated the cross-border merger."',
      options: [
        { text: 'It was the multilateral regulatory accord', correct: true, rationale: 'Standard it-cleft structure: It was + noun phrase focus + that.' },
        { text: 'There was the multilateral regulatory accord', correct: false, rationale: 'Existential "There was" does not form a focused cleft sentence.' },
        { text: 'What was the multilateral regulatory accord', correct: false, rationale: '"What was" forms an interrogative or malformed pseudo-cleft.' },
        { text: 'That was the multilateral regulatory accord', correct: false, rationale: '"That was" acts as a deictic demonstrative, not a cleft operator.' },
      ],
      acceptedAnswers: [{ text: 'It was the multilateral regulatory accord', rationale: 'It was + focus + that correctly structures the cleft.' }],
    },
    {
      id: 'grammar-v2-c1-it-clefts-05-q2',
      kind: 'choice',
      prompt: 'Choose the correct formal relative subordinator in: "It was in the secondary bond market ___ the initial liquidity shock manifested."',
      options: [
        { text: 'that', correct: true, rationale: 'Academic grammar strictly uses "that" to introduce the presupposed clause in it-clefts with adverbial foci.' },
        { text: 'where', correct: false, rationale: '"where" is colloquial or non-standard in formal it-cleft constructions.' },
        { text: 'in which', correct: false, rationale: '"in which" creates an ungrammatical relative blend in an it-cleft.' },
        { text: 'at which', correct: false, rationale: '"at which" is redundant and grammatically invalid here.' },
      ],
      acceptedAnswers: [{ text: 'that', rationale: 'Formal syntax requires "that" after prepositional foci in it-clefts.' }],
    },
    {
      id: 'grammar-v2-c1-it-clefts-05-q3',
      kind: 'choice',
      prompt: 'Identify the grammatically correct contrastive cleft sentence:',
      options: [
        { text: 'It was not consumer apathy but prohibitive tariffs that stifled commercial adoption.', correct: true, rationale: 'Correct contrastive cleft with parallel noun phrases and that-clause.' },
        { text: 'It was not consumer apathy but prohibitive tariffs which stifled commercial adoption.', correct: false, rationale: '"which" is disfavored in formal cleft syntax.' },
        { text: 'Was not consumer apathy but prohibitive tariffs that stifled commercial adoption.', correct: false, rationale: 'Omission of preparatory "It" creates a fragmented sentence.' },
        { text: 'It were not consumer apathy but prohibitive tariffs that stifled commercial adoption.', correct: false, rationale: 'Preparatory "It" takes singular "was", never plural "were".' },
      ],
      acceptedAnswers: [{ text: 'It was not consumer apathy but prohibitive tariffs that stifled commercial adoption.', rationale: 'Standard contrastive it-cleft with singular was and that.' }],
    },
    {
      id: 'grammar-v2-c1-it-clefts-05-q4',
      kind: 'choice',
      prompt: 'Select the correct sentence with a subjective pronoun focus in formal style:',
      options: [
        { text: 'It was he who authorized the forensic audit of the subsidiary.', correct: true, rationale: 'Formal high-register cleft maintains nominative case "he" followed by "who".' },
        { text: 'It was him who authorized the forensic audit of the subsidiary.', correct: false, rationale: '"him" represents informal spoken register rather than formal written syntax.' },
        { text: 'It was he which authorized the forensic audit of the subsidiary.', correct: false, rationale: '"which" cannot refer to human antecedents.' },
        { text: 'It were he who authorized the forensic audit of the subsidiary.', correct: false, rationale: 'Preparatory "It" requires singular "was".' },
      ],
      acceptedAnswers: [{ text: 'It was he who authorized the forensic audit of the subsidiary.', rationale: 'High-register nominative focus he + who.' }],
    },
    {
      id: 'grammar-v2-c1-it-clefts-05-q5',
      kind: 'gap',
      prompt: 'Complete the temporal cleft sentence: "It was _____ after the whistle-blower testified that the parliamentary committee launched an inquiry."',
      options: [],
      acceptedAnswers: [
        { text: 'only', rationale: 'Restrictive adverb "only" commonly pairs with "after" in cleft focal expressions.' },
      ],
    },
    {
      id: 'grammar-v2-c1-it-clefts-05-q6',
      kind: 'gap',
      prompt: 'Supply the correct subordinator: "It is because the supply chain remains deeply fragmented _____ inflationary pressures persist."',
      options: [],
      acceptedAnswers: [
        { text: 'that', rationale: 'Adverbial reason clauses in it-clefts are linked to the matrix proposition by "that".' },
      ],
    },
    {
      id: 'grammar-v2-c1-it-clefts-05-q7',
      kind: 'gap',
      prompt: 'Provide the correct form of "be": "It _____ through sustained diplomatic engagement that the border demarcation dispute was finally resolved last month."',
      options: [],
      acceptedAnswers: [
        { text: 'was', rationale: 'Past tense "was" aligns with past temporal context "was finally resolved last month".' },
      ],
    },
    {
      id: 'grammar-v2-c1-it-clefts-05-q8',
      kind: 'gap',
      prompt: 'Fill in the subordinator for the human agent focus: "It was the chief epidemiologist _____ alerted the ministry to the emerging pathogen."',
      options: [],
      acceptedAnswers: [
        { text: 'who', rationale: '"who" is the preferred subject subordinator for human focus in it-clefts.' },
        { text: 'that', rationale: '"that" is also fully acceptable and standard in cleft sentences.' },
      ],
    },
    {
      id: 'grammar-v2-c1-it-clefts-05-q9',
      kind: 'transform',
      prompt: 'Transform into an it-cleft focusing on the underlined cause: "A severe semiconductor bottleneck delayed the release of the medical scanner."',
      options: [],
      acceptedAnswers: [
        { text: 'It was a severe semiconductor bottleneck that delayed the release of the medical scanner.', rationale: 'Focuses the subject noun phrase using "It was [NP] that...".' },
      ],
    },
    {
      id: 'grammar-v2-c1-it-clefts-05-q10',
      kind: 'transform',
      prompt: 'Transform into an it-cleft focusing on the time adjunct: "The research council approved the longitudinal grant only in October."',
      options: [],
      acceptedAnswers: [
        { text: 'It was only in October that the research council approved the longitudinal grant.', rationale: 'Fronts "only in October" into the focus position of an it-cleft.' },
      ],
    },
    {
      id: 'grammar-v2-c1-it-clefts-05-q11',
      kind: 'correction',
      prompt: 'Correct the subordinator error: "It was at the Kyoto summit where world leaders first established binding emissions targets."',
      options: [],
      acceptedAnswers: [
        { text: 'It was at the Kyoto summit that world leaders first established binding emissions targets.', rationale: 'Replaces "where" with "that" to adhere to standard academic it-cleft syntax.' },
      ],
    },
    {
      id: 'grammar-v2-c1-it-clefts-05-q12',
      kind: 'correction',
      prompt: 'Correct the number agreement of the cleft operator: "It were the continuous fiscal deficits that undermined foreign investor confidence."',
      options: [],
      acceptedAnswers: [
        { text: 'It was the continuous fiscal deficits that undermined foreign investor confidence.', rationale: 'Replaces "were" with singular "was" because preparatory "It" is invariable.' },
      ],
    },
  ],
  reviewExercises: [
    {
      id: 'grammar-v2-c1-it-clefts-05-r1',
      kind: 'choice',
      prompt: 'Choose the correct cleft sentence focusing on the decisive factor: "___ that restored solvency to the municipal pension fund."',
      options: [
        { text: 'It was emergency sovereign intervention', correct: true, rationale: 'Standard it-cleft format isolating the causal agent.' },
        { text: 'What was emergency sovereign intervention', correct: false, rationale: 'Malformed pseudo-cleft construction.' },
        { text: 'There was emergency sovereign intervention', correct: false, rationale: 'Existential statement lacking cleft focus.' },
      ],
      acceptedAnswers: [{ text: 'It was emergency sovereign intervention', rationale: 'Standard it-cleft construction.' }],
    },
    {
      id: 'grammar-v2-c1-it-clefts-05-r2',
      kind: 'gap',
      prompt: 'Supply the subordinator in this academic cleft: "It was through meticulous ethnographic fieldwork _____ the sociologist uncovered the informal economic network."',
      options: [],
      acceptedAnswers: [
        { text: 'that', rationale: 'Prepositional phrase focus in formal it-clefts takes "that".' },
      ],
    },
    {
      id: 'grammar-v2-c1-it-clefts-05-r3',
      kind: 'transform',
      prompt: 'Rewrite as an it-cleft focusing on the agent: "Dr. Eleanor Vance formulated the prevailing quantum coherence theorem."',
      options: [],
      acceptedAnswers: [
        { text: 'It was Dr. Eleanor Vance who formulated the prevailing quantum coherence theorem.', rationale: 'Cleft with who highlighting the scholarly author.' },
        { text: 'It was Dr. Eleanor Vance that formulated the prevailing quantum coherence theorem.', rationale: 'Cleft with that is equally valid.' },
      ],
    },
    {
      id: 'grammar-v2-c1-it-clefts-05-r4',
      kind: 'correction',
      prompt: 'Correct the informal subordinator in: "It was in late December when the appellate judges delivered their landmark verdict."',
      options: [],
      acceptedAnswers: [
        { text: 'It was in late December that the appellate judges delivered their landmark verdict.', rationale: 'Replaces non-standard "when" with formal "that".' },
      ],
    },
  ],
  outputPrompts: [
    {
      id: 'grammar-v2-c1-it-clefts-05-o1',
      prompt: 'Viết 1-2 câu học thuật sử dụng cấu trúc câu chẻ "It is / was... that..." để chỉ ra nguyên nhân cốt lõi gây ra một sự biến đổi kinh tế hoặc đột phá khoa học.',
      modelAnswer: 'It was the rapid proliferation of high-throughput gene sequencing that decentralized genetic diagnosis across regional medical centers. It was not mere fiscal expansion but targeted infrastructure investment that catalyzed the subsequent regional recovery.',
      checks: [
        'Sử dụng cấu trúc It is / was + [Tiêu điểm] + that.',
        'Thì của động từ be hòa hợp với ngữ cảnh thời gian.',
        'Diễn đạt rõ ràng tính nguyên nhân hoặc tương phản luận điểm.',
      ],
    },
    {
      id: 'grammar-v2-c1-it-clefts-05-o2',
      prompt: 'Viết 1-2 câu phân tích chính sách sử dụng câu chẻ phủ định tương phản "It is not X but Y that...".',
      modelAnswer: 'It is not a deficiency of statutory regulations but the persistent absence of stringent enforcement mechanisms that undermines municipal environmental governance.',
      checks: [
        'Áp dụng cấu trúc It is not [X] but [Y] that...',
        'Hai thành phần X và Y song song về mặt ngữ pháp.',
        'Mệnh đề sau that giải thích hệ quả trực tiếp.',
      ],
    },
  ],
  sources: [
    {
      id: 'cambridge-cleft-sentences-it-clefts',
      title: 'English Grammar Today: Cleft sentences (It was in June we got married.)',
      url: 'https://dictionary.cambridge.org/grammar/british-grammar/cleft-sentences-it-was-in-june-we-got-married',
      claims: [
        'It-cleft sentences use It + be + focus + that/who to highlight a particular element.',
        'That is the standard subordinator for things, prepositional phrases, and adverbial clauses.',
        'The dummy subject It is always singular regardless of the number of the focused element.',
      ],
      checkedAt: '2026-10-05',
      provenance: 'reference-only',
    },
  ],
  review: {
    status: 'approved',
    mode: 'ai-internal',
    reviewer: 'ai-internal-reviewer',
    reviewedAt: '2026-10-06T00:00:00.000Z',
    summary: 'Comprehensive review completed. It-cleft structures, focal constraints, relative subordinator rules, transfer exercises, and Cambridge Grammar source verified.',
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

export default itCleftsLesson;
