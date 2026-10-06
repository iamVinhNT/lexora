/**
 * @file what-clefts.ts
 * @description C1 lesson on wh-cleft (pseudo-cleft) constructions for discourse packaging and end-focus.
 */
import type { GrammarLesson } from '../../types.js';

const whatCleftsLesson: GrammarLesson = {
  id: 'grammar-v2-c1-what-clefts-06',
  revisionId: 'grammar-v2-c1-what-clefts-06@1.0.0',
  revision: '1.0.0',
  title: 'Câu chẻ với What và Wh- (Wh-Cleft / Pseudo-Cleft Sentences)',
  objective: 'Thành thạo cấu trúc câu chẻ giả (pseudo-clefts) với "What...", "All...", "The thing that...", "Where...", "Why..." để đóng gói thông tin đã biết vào mệnh đề danh ngữ và dồn tiêu điểm thông tin quan trọng nhất ra sau động từ "be".',
  prerequisiteIds: ['grammar-v2-c1-it-clefts-05'],
  coverage: ['what-clefts', 'wh-clefts', 'pseudo-clefts', 'cleft-sentences', 'emphasis', 'information-structure'],
  context: {
    english: 'In academic discourse, keynote lectures, and high-level negotiations, wh-clefts package thematic background into an opening nominal clause, allowing the speaker to deliver key conclusions or specific demands with maximum communicative impact after the copula.',
    vietnamese: 'Trong diễn ngôn học thuật, bài thuyết trình chuyên sâu và đàm phán cao cấp, câu chẻ wh- đóng gói thông tin nền vào mệnh đề danh ngữ mở đầu, giúp người nói đưa ra kết luận then chốt hoặc yêu sách cụ thể ở vị trí sau hệ từ "be" với hiệu quả truyền tải tối đa.',
  },
  guide: {
    pattern: 'What + Subject + Verb + is / was + Focus (Noun Phrase / Infinitive Clause / Finite Clause) | Reversed: Focus + is / was + What-Clause',
    whenToUse: [
      'Đóng gói hành động vào mệnh đề mở đầu để nhấn mạnh giải pháp: "What the board did was (to) appoint an independent trustee".',
      'Làm nổi bật thuộc tính, nhu cầu thiết yếu hoặc phát hiện mới: "What strikes researchers most is the resilience of the ecosystem".',
      'Giới hạn sự chú ý vào một yếu tố duy nhất với "All (that)..." hoặc "The only thing that...": "All the treaty guarantees is mutual consultation".',
    ],
    signalWords: ['what we urgently require is', 'what the findings demonstrate is', 'what puzzled observers was', 'all they sought was', 'what happened next was that'],
    check: [
      'Mệnh đề "What..." có giữ trật tự câu khẳng định xuôi (S + V) thay vì bị đảo thành trật tự câu hỏi không?',
      'Khi nhấn mạnh hành động với "What S did was...", động từ theo sau là nguyên mẫu có to hoặc không to (bare/to-infinitive), tuyệt đối không dùng V-ed?',
      'Hệ từ "be" có hòa hợp logic với thì của mệnh đề wh- và số lượng của thành phần tiêu điểm đứng sau không?',
    ],
  },
  explanation: 'Câu chẻ Wh- (Wh-cleft hoặc Pseudo-cleft) sử dụng một mệnh đề quan hệ tự do (free relative clause) mở đầu bằng "What" đóng vai trò chủ ngữ của câu, nối với thành phần tiêu điểm thông qua động từ hệ từ "be" (is/was). Khác với It-cleft (thường đưa tiêu điểm lên đầu), Wh-cleft trì hoãn tiêu điểm tới cuối câu nhằm tận dụng nguyên lý "trọng tâm cuối" (end-focus). Các biến thể học thuật quan trọng gồm: 1) Nhấn mạnh hành động: "What the central bank did was cut prime lending rates" (động từ sau "was" có thể dùng bare infinitive hoặc to-infinitive; bare infinitive phổ biến hơn khi mệnh đề wh- có trợ động từ "did"); 2) Biến thể hạn định với "All": "All the commission accomplished was a temporary truce"; 3) Wh-cleft đảo ngược (Reversed Wh-cleft): đặt tiêu điểm lên đầu để đối chiếu ("A lack of transparent governance was what alienated institutional investors").',
  examples: [
    {
      english: 'What the preliminary clinical data demonstrate is a statistically significant reduction in systemic inflammation.',
      vietnamese: 'Điều mà dữ liệu lâm sàng sơ bộ chứng minh là sự suy giảm có ý nghĩa thống kê của tình trạng viêm toàn thân.',
    },
    {
      english: 'What the restructuring committee did was dissolve redundant managerial layers across regional subsidiaries.',
      vietnamese: 'Những gì ủy ban tái cấu trúc đã làm là giải thể các tầng nấc quản lý thừa thãi tại các chi nhánh khu vực.',
    },
    {
      english: 'All the diplomatic delegation requested was an unconditional forty-eight-hour cessation of hostilities.',
      vietnamese: 'Tất cả những gì phái đoàn ngoại giao yêu cầu chỉ là một thỏa thuận ngừng bắn vô điều kiện trong vòng bốn mươi tám giờ.',
    },
    {
      english: 'What puzzles theoretical physicists is why matter prevails over antimatter in the observable universe.',
      vietnamese: 'Điều khiến các nhà vật lý lý thuyết bối rối là tại sao vật chất lại chiếm ưu thế tuyệt đối trước phản vật chất trong vũ trụ quan sát được.',
    },
    {
      english: 'A systemic lack of internal liquidity controls was what ultimately triggered the insolvency proceedings.',
      vietnamese: 'Sự thiếu hụt mang tính hệ thống các biện pháp kiểm soát thanh khoản nội bộ chính là điều cuối cùng đã kích hoạt thủ tục phá sản.',
    },
    {
      english: 'What surprised the lead archaeologists was the sophisticated metallurgical technique evident in the Bronze Age blades.',
      vietnamese: 'Điều làm các nhà khảo cổ học trưởng đoàn ngạc nhiên là kỹ thuật luyện kim tinh vi thể hiện rõ trên các lưỡi dao thời kỳ Đồ Đồng.',
    },
  ],
  contrasts: [
    {
      form: 'What the minister proposed was to subsidize clean energy infrastructure.',
      whyFits: 'Mệnh đề What giữ trật tự câu trần thuật xuôi (S + V) và tiêu điểm hành động dùng to-infinitive sau was.',
      whyNot: '"What did the minister propose was..." sai vì đưa trật tự câu hỏi đảo ngữ vào mệnh đề danh ngữ làm chủ ngữ.',
    },
    {
      form: 'What the council did was convene an extraordinary plenary session.',
      whyFits: 'Khi mệnh đề What chứa động từ did, động từ sau was dùng nguyên mẫu không to (convene) hoặc có to (to convene).',
      whyNot: '"What the council did was convened an extraordinary session..." sai vì dùng dạng quá khứ convened sau hệ từ was.',
    },
  ],
  commonMistakes: [
    'Đảo trợ động từ kiểu câu hỏi bên trong mệnh đề What (viết "What did the research reveal was..." thay vì "What the research revealed was...").',
    'Chia động từ dạng quá khứ V-ed sau "What S did was..." (viết "What they did was published the report" thay vì "publish" hoặc "to publish").',
    'Dùng sai từ để hỏi thay thế cho cụm danh từ chung (viết "Which we need is patience" thay vì "What we need is patience" hoặc "The thing which we need is...").',
  ],
  summary: 'Wh-clefts (What + S + V + be + [Tiêu điểm]) gom thông tin đã biết làm bàn đạp trước khi công bố thông tin then chốt ở cuối câu. Cần lưu ý trật tự câu kể trong mệnh đề What và dạng nguyên thể của động từ sau "What S did was...".',
  exercises: [
    {
      id: 'grammar-v2-c1-what-clefts-06-q1',
      kind: 'choice',
      prompt: 'Select the correct academic wh-cleft sentence emphasizing the research conclusion:',
      options: [
        { text: 'What the survey reveals is a profound shift in consumer attitudes toward sustainable packaging.', correct: true, rationale: 'Grammatically flawless wh-cleft with affirmative word order in the nominal relative clause.' },
        { text: 'What does the survey reveal is a profound shift in consumer attitudes toward sustainable packaging.', correct: false, rationale: 'Interrogative inversion "does the survey reveal" is ungrammatical inside a nominal clause.' },
        { text: 'That the survey reveals is a profound shift in consumer attitudes toward sustainable packaging.', correct: false, rationale: '"That" cannot function as an independent headless relative meaning "the thing which".' },
        { text: 'Which the survey reveals is a profound shift in consumer attitudes toward sustainable packaging.', correct: false, rationale: '"Which" cannot head an independent subject nominal relative clause here.' },
      ],
      acceptedAnswers: [{ text: 'What the survey reveals is a profound shift in consumer attitudes toward sustainable packaging.', rationale: 'Standard wh-cleft with declarative nominal clause.' }],
    },
    {
      id: 'grammar-v2-c1-what-clefts-06-q2',
      kind: 'choice',
      prompt: 'Choose the correct verb form following "What the task force did was ___":',
      options: [
        { text: 'recalibrate the algorithmic parameters to eliminate bias', correct: true, rationale: 'Bare infinitive "recalibrate" is standard after "What [subject] did was".' },
        { text: 'recalibrated the algorithmic parameters to eliminate bias', correct: false, rationale: 'Past tense "recalibrated" cannot serve as complement to the copula "was".' },
        { text: 'recalibrating the algorithmic parameters to eliminate bias', correct: false, rationale: 'Participle "-ing" changes the aspectual force away from the intended dynamic action focus.' },
        { text: 'had recalibrated the algorithmic parameters to eliminate bias', correct: false, rationale: 'Past perfect clause cannot complement the copula without a conjunction.' },
      ],
      acceptedAnswers: [{ text: 'recalibrate the algorithmic parameters to eliminate bias', rationale: 'Bare infinitive complement is standard after did + was.' }],
    },
    {
      id: 'grammar-v2-c1-what-clefts-06-q3',
      kind: 'choice',
      prompt: 'Select the well-formed reversed wh-cleft highlighting the causal factor:',
      options: [
        { text: 'Institutional inertia was what prevented the prompt adoption of the climate protocol.', correct: true, rationale: 'Subject focus followed by copula and headless relative what-clause.' },
        { text: 'Institutional inertia was that prevented the prompt adoption of the climate protocol.', correct: false, rationale: '"that" requires an explicit nominal head such as "the thing that".' },
        { text: 'Institutional inertia was which prevented the prompt adoption of the climate protocol.', correct: false, rationale: '"which" cannot introduce a nominal headless clause in complement position.' },
        { text: 'Institutional inertia did what prevented the prompt adoption of the climate protocol.', correct: false, rationale: 'The cleft requires the linking copula "was", not lexical "did".' },
      ],
      acceptedAnswers: [{ text: 'Institutional inertia was what prevented the prompt adoption of the climate protocol.', rationale: 'Correct reversed wh-cleft structure.' }],
    },
    {
      id: 'grammar-v2-c1-what-clefts-06-q4',
      kind: 'choice',
      prompt: 'Choose the correct restrictive pseudo-cleft focusing on minimum requirements:',
      options: [
        { text: 'All the treaty requires is mutual notification thirty days prior to military maneuvers.', correct: true, rationale: '"All [subject] requires is..." elegantly focuses on the sole condition.' },
        { text: 'All what the treaty requires is mutual notification thirty days prior to military maneuvers.', correct: false, rationale: '"All what" is ungrammatical; "All" takes that or zero relative, never what.' },
        { text: 'All that does the treaty require is mutual notification thirty days prior to military maneuvers.', correct: false, rationale: 'Inversion inside the relative clause is invalid.' },
        { text: 'Everything what the treaty requires is mutual notification thirty days prior to military maneuvers.', correct: false, rationale: '"Everything what" is non-standard and ungrammatical.' },
      ],
      acceptedAnswers: [{ text: 'All the treaty requires is mutual notification thirty days prior to military maneuvers.', rationale: 'Standard restrictive pseudo-cleft with All.' }],
    },
    {
      id: 'grammar-v2-c1-what-clefts-06-q5',
      kind: 'gap',
      prompt: 'Complete the pseudo-cleft: "_____ the epidemiologists found most alarming was the velocity of community transmission."',
      options: [],
      acceptedAnswers: [
        { text: 'What', rationale: '"What" introduces the nominal relative subject clause.' },
      ],
    },
    {
      id: 'grammar-v2-c1-what-clefts-06-q6',
      kind: 'gap',
      prompt: 'Fill in the restrictive cleft opener: "_____ that remains to be finalized is the schedule of cross-border customs tariffs."',
      options: [],
      acceptedAnswers: [
        { text: 'All', rationale: '"All" pairs with "that remains" to express the sole remaining matter.' },
      ],
    },
    {
      id: 'grammar-v2-c1-what-clefts-06-q7',
      kind: 'gap',
      prompt: 'Complete the action pseudo-cleft with the bare infinitive of "establish": "What the negotiating parties did was _____ an independent maritime boundary arbitration tribunal."',
      options: [],
      acceptedAnswers: [
        { text: 'establish', rationale: 'Bare infinitive "establish" is the standard complement following "did was".' },
        { text: 'to establish', rationale: 'Full infinitive "to establish" is also grammatically acceptable.' },
      ],
    },
    {
      id: 'grammar-v2-c1-what-clefts-06-q8',
      kind: 'gap',
      prompt: 'Supply the appropriate linking verb: "What the statistical models failed to account for _____ the compounding effect of concurrent currency devaluations."',
      options: [],
      acceptedAnswers: [
        { text: 'was', rationale: 'Past copula "was" matches the past tense "failed" and singular complement "compounding effect".' },
      ],
    },
    {
      id: 'grammar-v2-c1-what-clefts-06-q9',
      kind: 'transform',
      prompt: 'Transform into a wh-cleft sentence starting with "What": "The audit team uncovered systematic discrepancies in revenue recognition."',
      options: [],
      acceptedAnswers: [
        { text: 'What the audit team uncovered was systematic discrepancies in revenue recognition.', rationale: 'Wh-cleft with singular copula was.' },
        { text: 'What the audit team uncovered were systematic discrepancies in revenue recognition.', rationale: 'Wh-cleft with plural copula were matching plural discrepancies.' },
      ],
    },
    {
      id: 'grammar-v2-c1-what-clefts-06-q10',
      kind: 'transform',
      prompt: 'Transform into an action pseudo-cleft: "The government responded by freezing the speculative assets."',
      options: [],
      acceptedAnswers: [
        { text: 'What the government did was freeze the speculative assets.', rationale: 'Action pseudo-cleft using bare infinitive freeze.' },
        { text: 'What the government did was to freeze the speculative assets.', rationale: 'Action pseudo-cleft using full infinitive to freeze.' },
      ],
    },
    {
      id: 'grammar-v2-c1-what-clefts-06-q11',
      kind: 'correction',
      prompt: 'Correct the erroneous word order: "What did the research team observe was a sudden spike in atmospheric particulate concentration."',
      options: [],
      acceptedAnswers: [
        { text: 'What the research team observed was a sudden spike in atmospheric particulate concentration.', rationale: 'Replaces interrogative word order with declarative subject-verb sequence "the research team observed".' },
      ],
    },
    {
      id: 'grammar-v2-c1-what-clefts-06-q12',
      kind: 'correction',
      prompt: 'Correct the non-standard relative connector: "All what the shareholders demanded was an independent forensic investigation."',
      options: [],
      acceptedAnswers: [
        { text: 'All that the shareholders demanded was an independent forensic investigation.', rationale: 'Replaces incorrect "All what" with standard "All that".' },
        { text: 'All the shareholders demanded was an independent forensic investigation.', rationale: 'Zero relative after All is also standard.' },
      ],
    },
  ],
  reviewExercises: [
    {
      id: 'grammar-v2-c1-what-clefts-06-r1',
      kind: 'choice',
      prompt: 'Select the correct pseudo-cleft structure: "___ was recommend a complete moratorium on speculative deep-sea drilling."',
      options: [
        { text: 'What the environmental panel did', correct: true, rationale: 'Action pseudo-cleft "What [subject] did was [bare infinitive]".' },
        { text: 'That the environmental panel did', correct: false, rationale: '"That" cannot head a headless nominal clause.' },
        { text: 'Which did the environmental panel do', correct: false, rationale: 'Interrogative syntax is invalid in a cleft subject.' },
      ],
      acceptedAnswers: [{ text: 'What the environmental panel did', rationale: 'Correct action pseudo-cleft framing.' }],
    },
    {
      id: 'grammar-v2-c1-what-clefts-06-r2',
      kind: 'gap',
      prompt: 'Complete with the appropriate headless relative pronoun: "_____ the treaty fails to address is the allocation of extraterritorial orbital frequencies."',
      options: [],
      acceptedAnswers: [
        { text: 'What', rationale: '"What" heads the headless nominal relative clause acting as subject.' },
      ],
    },
    {
      id: 'grammar-v2-c1-what-clefts-06-r3',
      kind: 'transform',
      prompt: 'Rewrite using a reversed wh-cleft: "Severe supply bottlenecking provoked the inflationary surge."',
      options: [],
      acceptedAnswers: [
        { text: 'Severe supply bottlenecking was what provoked the inflationary surge.', rationale: 'Places subject focus upfront followed by "was what...".' },
      ],
    },
    {
      id: 'grammar-v2-c1-what-clefts-06-r4',
      kind: 'correction',
      prompt: 'Correct the verbal complement: "What the central bank did was raised the reserve requirements by fifty basis points."',
      options: [],
      acceptedAnswers: [
        { text: 'What the central bank did was raise the reserve requirements by fifty basis points.', rationale: 'Replaces past form "raised" with bare infinitive "raise".' },
        { text: 'What the central bank did was to raise the reserve requirements by fifty basis points.', rationale: 'Replaces past form with full infinitive "to raise".' },
      ],
    },
  ],
  outputPrompts: [
    {
      id: 'grammar-v2-c1-what-clefts-06-o1',
      prompt: 'Viết 1-2 câu học thuật sử dụng câu chẻ với "What... is / was..." để tóm lược phát hiện quan trọng nhất hoặc hạn chế then chốt của một công trình nghiên cứu.',
      modelAnswer: 'What the epidemiological study demonstrates is that socio-economic stratification heavily conditions vaccine uptake across metropolitan boroughs. What remains elusive, however, is the exact behavioural mechanism driving institutional distrust.',
      checks: [
        'Sử dụng mệnh đề What ở đầu câu làm chủ ngữ.',
        'Mệnh đề What tuân thủ trật tự câu khẳng định xuôi (S + V).',
        'Nối với thành phần tiêu điểm qua động từ be (is/was).',
      ],
    },
    {
      id: 'grammar-v2-c1-what-clefts-06-o2',
      prompt: 'Viết 1-2 câu trong diễn văn lãnh đạo hoặc báo cáo chiến lược sử dụng "What we did was [bare infinitive]..." hoặc "All we need is...".',
      modelAnswer: 'What the executive leadership did was consolidate redundant operational pipelines and reinvest the saved liquidity into fundamental artificial intelligence research. All we require now is unwavering regulatory clarity.',
      checks: [
        'Sử dụng đúng cấu trúc What S did was + bare infinitive (hoặc All S require is...).',
        'Không dùng V-ed sau was trong cấu trúc did was.',
        'Ngữ cảnh chuyên nghiệp, lập luận sắc bén.',
      ],
    },
  ],
  sources: [
    {
      id: 'cambridge-cleft-sentences-wh-clefts',
      title: 'English Grammar Today: Cleft sentences (Wh-clefts)',
      url: 'https://dictionary.cambridge.org/grammar/british-grammar/cleft-sentences-it-was-in-june-we-got-married',
      claims: [
        'Wh-cleft sentences use what-clauses to package given information and place focal information after the verb be.',
        'Action wh-clefts with What [subject] did was take a bare infinitive or to-infinitive complement.',
        'Reversed wh-clefts place the focus at the beginning followed by the copula and what-clause.',
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
    summary: 'Comprehensive review completed. Wh-cleft and pseudo-cleft structures, bare/to-infinitive complements, reversed wh-clefts, exercise items, and verified Cambridge Grammar source confirmed.',
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

export default whatCleftsLesson;
