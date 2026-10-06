/**
 * @file noun-phrase-pre-modification.ts
 * @description C1 lesson on complex noun phrase pre-modification in dense academic and professional texts.
 */
import type { GrammarLesson } from '../../types.js';

const nounPhrasePreModificationLesson: GrammarLesson = {
  id: 'grammar-v2-c1-noun-phrase-pre-modification-17',
  revisionId: 'grammar-v2-c1-noun-phrase-pre-modification-17@1.0.0',
  revision: '1.0.0',
  title: 'Bổ ngữ trước của cụm danh từ (Noun Phrase Pre-modification)',
  objective: 'Phân tích và kiến tạo các cụm danh từ có bổ ngữ trước phức hợp (danh từ ghép, tính từ phân từ nối gạch ngang, chuỗi bổ ngữ phân cấp) nhằm gia tăng mật độ thông tin và độ cô đọng trong văn phong học thuật C1.',
  prerequisiteIds: ['grammar-v2-c1-hedging-reporting-verbs-16'],
  coverage: ['noun-phrase-pre-modification', 'complex-noun-phrases', 'academic-density', 'compound-adjectives', 'c1-academic-writing'],
  context: {
    english: 'Academic English packs high informational density into nominal structures. Instead of writing "a framework that is based on empirical evidence and evaluated by peers," scholars compress information into pre-modified noun phrases: "a peer-reviewed, evidence-based analytical framework."',
    vietnamese: 'Tiếng Anh học thuật nén mật độ thông tin cao vào các cấu trúc danh từ. Thay vì viết "một khung làm việc dựa trên bằng chứng thực nghiệm và được đánh giá bởi các chuyên gia bình duyệt", các nhà khoa học cô đọng thông tin thành cụm danh từ có bổ ngữ trước: "a peer-reviewed, evidence-based analytical framework".',
  },
  guide: {
    pattern: 'Determiner + Adverb-Participle / Hyphenated Compound Adjective + Classifying Noun(s) + Head Noun',
    whenToUse: [
      'Nén các mệnh đề quan hệ rườm rà thành cụm tính từ ghép đứng trước danh từ chính để tăng tính súc tích học thuật.',
      'Sử dụng danh từ làm bổ ngữ (noun adjuncts / classifying nouns) để phân loại chuyên ngành chính xác (ví dụ: climate risk assessment, neural network architecture).',
      'Xây dựng các tiêu đề bài báo, tóm tắt nghiên cứu (abstracts) và báo cáo phân tích chuyên sâu.',
    ],
    signalWords: ['evidence-based', 'peer-reviewed', 'data-driven', 'readily available', 'state-of-the-art', 'policy-making', 'high-yield'],
    check: [
      'Các tính từ ghép đứng trước danh từ có được nối bằng dấu gạch ngang (hyphen) khi bổ nghĩa cho danh từ chính không?',
      'Khi dùng trạng từ kết thúc bằng đuôi -ly (ví dụ: highly volatile, rapidly expanding), có nhớ TUYỆT ĐỐI KHÔNG dùng dấu gạch ngang không?',
      'Trật tự bổ ngữ đã đi từ khái quát / phẩm chất đến phân loại cụ thể sát danh từ chính chưa?',
    ],
  },
  explanation: 'Bổ ngữ trước (Pre-modification) trong cụm danh từ là đặc trưng tiêu biểu của phong cách viết học thuật và văn kiện chuyên nghiệp bậc cao. Cấu trúc bổ ngữ trước bao gồm: 1) Tính từ ghép có dấu gạch ngang (hyphenated compounds: noun + participle như "peer-reviewed", adjective + noun như "large-scale", adverb + participle như "well-established"); 2) Cụm trạng từ - phân từ không có gạch ngang khi trạng từ có đuôi -ly ("rapidly expanding markets", "highly differentiated cells"); 3) Danh từ bổ nghĩa (noun adjuncts: "carbon capture technology", "machine learning algorithm") - trong đó danh từ bổ nghĩa thường ở dạng số ít; 4) Chuỗi phân cấp thông tin: từ tính từ miêu tả/đánh giá -> tính từ đo lường/kích thước -> tính từ phân từ -> danh từ phân loại chuyên ngành -> danh từ trung tâm (head noun). Việc sắp xếp khéo léo giúp văn bản đạt độ cô đặc thông tin (lexical density) tối ưu mà không gây quá tải nhận thức.',
  examples: [
    {
      english: 'The consortium deployed a state-of-the-art, high-throughput genetic sequencing platform.',
      vietnamese: 'Liên minh đã triển khai một nền tảng giải trình tự di truyền lưu lượng cao, hiện đại bậc nhất.',
    },
    {
      english: 'Our team conducted an extensive, mixed-methods feasibility assessment.',
      vietnamese: 'Nhóm chúng tôi đã tiến hành một đánh giá tính khả thi sâu rộng, kết hợp nhiều phương pháp.',
    },
    {
      english: 'The report highlights the vulnerabilities of rapidly urbanizing coastal settlements.',
      vietnamese: 'Báo cáo làm nổi bật những điểm dễ bị tổn thương của các khu định cư ven biển đang đô thị hóa nhanh chóng.',
    },
    {
      english: 'Researchers isolated a heat-resistant, naturally occurring enzyme from deep-sea hydrothermal vents.',
      vietnamese: 'Các nhà nghiên cứu đã phân lập một loại enzyme chịu nhiệt, xuất hiện trong tự nhiên từ các miệng phun thủy nhiệt dưới biển sâu.',
    },
    {
      english: 'Strict compliance with internationally recognized capital adequacy standards is mandatory.',
      vietnamese: 'Sự tuân thủ nghiêm ngặt các tiêu chuẩn an toàn vốn được quốc tế công nhận là bắt buộc.',
    },
    {
      english: 'The finance ministry introduced targeted, performance-based tax incentives for green tech startups.',
      vietnamese: 'Bộ tài chính đã ban hành các chính sách ưu đãi thuế có mục tiêu, dựa trên hiệu suất cho các công ty khởi nghiệp công nghệ xanh.',
    },
  ],
  contrasts: [
    {
      form: 'a rapidly expanding market vs a rapidly-expanding market',
      whyFits: 'Trạng từ kết thúc bằng hậu tố -ly (như rapidly, widely, highly) bổ nghĩa cho phân từ đứng trước danh từ KHÔNG BAO GIỜ dùng dấu gạch ngang theo quy chuẩn xuất bản học thuật.',
      whyNot: 'Dùng gạch ngang "rapidly-" là lỗi chính tả dấu câu phổ biến, vi phạm cẩm nang phong cách Chicago và APA.',
    },
    {
      form: 'a five-year longitudinal study vs a five years longitudinal study',
      whyFits: 'Cụm từ chỉ số lượng và đơn vị thời gian khi đứng trước làm bổ ngữ cho danh từ phải nối gạch ngang và dùng danh từ số ít (five-year).',
      whyNot: 'Dùng "five years" ở vị trí bổ ngữ trước là sai ngữ pháp vì bổ ngữ danh từ đứng trước luôn ở dạng số ít quy ước.',
    },
  ],
  commonMistakes: [
    'Thêm dấu gạch ngang sau trạng từ có tận cùng bằng đuôi -ly (viết nhầm "a highly-sophisticated model" thay vì "a highly sophisticated model").',
    'Để danh từ bổ trợ ở dạng số nhiều khi làm bổ ngữ trước (viết nhầm "a systems analyst" hoặc "a three months trial" thay vì "a system analyst", "a three-month trial").',
    'Chồng chất quá nhiều danh từ bổ nghĩa liên tiếp (ví dụ: "government department resource allocation policy committee review") gây nghẽn thông tin và mơ hồ ngữ nghĩa.',
  ],
  summary: 'Bổ ngữ trước của cụm danh từ nén thông tin bằng cách kết hợp tính từ ghép nối gạch ngang (evidence-based), trạng từ phân từ đuôi -ly không gạch ngang (sharply declining) và danh từ bổ trợ số ít (risk assessment) trước danh từ trung tâm.',
  exercises: [
    {
      id: 'grammar-v2-c1-noun-phrase-pre-modification-17-q1',
      kind: 'choice',
      prompt: 'Select the option with the correct hyphenation and grammatical form for pre-modifying the noun phrase.',
      options: [
        { text: 'a meticulously documented, evidence-based forensic investigation', correct: true, rationale: 'Adverbs ending in -ly take no hyphen, while noun-participle compound evidence-based correctly takes a hyphen.' },
        { text: 'a meticulously-documented, evidence based forensic investigation', correct: false, rationale: 'Incorrect hyphen after meticulously and missing required hyphen in evidence-based.' },
        { text: 'a meticulously documented, evidence based forensic investigation', correct: false, rationale: 'Missing hyphen in the compound modifier evidence-based.' },
        { text: 'a meticulously-documented, evidence-based forensic investigation', correct: false, rationale: 'Erroneous hyphen attached to the -ly adverb meticulously.' },
      ],
      acceptedAnswers: [{ text: 'a meticulously documented, evidence-based forensic investigation', rationale: 'Standard academic punctuation for pre-modifiers.' }],
    },
    {
      id: 'grammar-v2-c1-noun-phrase-pre-modification-17-q2',
      kind: 'choice',
      prompt: 'Identify the sentence that correctly uses a quantitative compound pre-modifier.',
      options: [
        { text: 'The council sanctioned a thirty-million-dollar infrastructure overhaul.', correct: true, rationale: 'Hyphenated numeral-noun-unit compound modifier in the singular form (thirty-million-dollar).' },
        { text: 'The council sanctioned a thirty-millions-dollars infrastructure overhaul.', correct: false, rationale: 'Pre-modifying measurement units must never be pluralized.' },
        { text: 'The council sanctioned a thirty millions dollar infrastructure overhaul.', correct: false, rationale: 'Plural millions cannot pre-modify dollar overhaul.' },
        { text: 'The council sanctioned a thirty million dollars infrastructure overhaul.', correct: false, rationale: 'Missing hyphens and incorrect plural dollars.' },
      ],
      acceptedAnswers: [{ text: 'The council sanctioned a thirty-million-dollar infrastructure overhaul.', rationale: 'Singular hyphenated compound modifier.' }],
    },
    {
      id: 'grammar-v2-c1-noun-phrase-pre-modification-17-q3',
      kind: 'choice',
      prompt: 'Which sentence exhibits correct hierarchical pre-modification without ungrammatical plural noun adjuncts?',
      options: [
        { text: 'The hospital upgraded its patient monitoring equipment to minimize bedside alarms.', correct: true, rationale: 'Patient and monitoring are singular classifying noun adjuncts modifying equipment.' },
        { text: 'The hospital upgraded its patients monitoring equipment to minimize bedside alarms.', correct: false, rationale: 'Patients should be singular patient when serving as a noun adjunct.' },
        { text: 'The hospital upgraded its patients monitorings equipment to minimize bedside alarms.', correct: false, rationale: 'Unnatural double plural noun adjuncts.' },
        { text: 'The hospital upgraded its patient-monitorings equipment to minimize bedside alarms.', correct: false, rationale: 'Invalid hyphenation and pluralization.' },
      ],
      acceptedAnswers: [{ text: 'The hospital upgraded its patient monitoring equipment to minimize bedside alarms.', rationale: 'Correct singular noun adjunct structure.' }],
    },
    {
      id: 'grammar-v2-c1-noun-phrase-pre-modification-17-q4',
      kind: 'choice',
      prompt: 'Choose the sentence that correctly coordinates pre-modifying participles before the head noun.',
      options: [
        { text: 'The lab synthesized several short-lived, highly reactive isotopic compounds.', correct: true, rationale: 'Short-lived has a hyphen; highly reactive has no hyphen because highly ends in -ly.' },
        { text: 'The lab synthesized several short lived, highly-reactive isotopic compounds.', correct: false, rationale: 'Missing hyphen in short-lived and superfluous hyphen after highly.' },
        { text: 'The lab synthesized several short-lived, highly-reactive isotopic compounds.', correct: false, rationale: 'Superfluous hyphen in highly-reactive.' },
        { text: 'The lab synthesized several short lived, highly reactive isotopic compounds.', correct: false, rationale: 'Missing required hyphen in compound adjective short-lived.' },
      ],
      acceptedAnswers: [{ text: 'The lab synthesized several short-lived, highly reactive isotopic compounds.', rationale: 'Correct contrast between compound adjective and -ly adverbial modification.' }],
    },
    {
      id: 'grammar-v2-c1-noun-phrase-pre-modification-17-q5',
      kind: 'gap',
      prompt: 'Insert the hyphenated adjective formed from "data" and "driven": "The analytics firm relies on _____ decision frameworks to optimize inventory."',
      options: [],
      acceptedAnswers: [
        { text: 'data-driven', rationale: 'Noun + past participle compound modifier requires a hyphen.' },
      ],
    },
    {
      id: 'grammar-v2-c1-noun-phrase-pre-modification-17-q6',
      kind: 'gap',
      prompt: 'Complete the pre-modifier with the singular time measure: "The clinical trial concluded its four-_____ follow-up phase without adverse events." (month)',
      options: [],
      acceptedAnswers: [
        { text: 'month', rationale: 'Pre-modifying compound measurement uses singular month.' },
      ],
    },
    {
      id: 'grammar-v2-c1-noun-phrase-pre-modification-17-q7',
      kind: 'gap',
      prompt: 'Fill in the missing compound adjective meaning peer evaluated: "All submitted papers must undergo a rigorous, _____-reviewed evaluation process."',
      options: [],
      acceptedAnswers: [
        { text: 'peer', rationale: 'Forms the established academic compound peer-reviewed.' },
      ],
    },
    {
      id: 'grammar-v2-c1-noun-phrase-pre-modification-17-q8',
      kind: 'gap',
      prompt: 'Supply the adverb modifying the participle without a hyphen: "The symposium addressed the challenges of _____ emerging infectious pathogens." (rapidly)',
      options: [],
      acceptedAnswers: [
        { text: 'rapidly', rationale: 'Adverbs ending in -ly never take a hyphen when pre-modifying participles.' },
      ],
    },
    {
      id: 'grammar-v2-c1-noun-phrase-pre-modification-17-q9',
      kind: 'transform',
      prompt: 'Condense the relative clause into a hyphenated pre-modifier before "methodology": "We implemented a methodology that is oriented toward results."',
      options: [],
      acceptedAnswers: [
        { text: 'We implemented a results-oriented methodology.', rationale: 'Condenses relative clause into compound adjective results-oriented.' },
        { text: 'We implemented a result-oriented methodology.', rationale: 'Accepts variant result-oriented.' },
      ],
    },
    {
      id: 'grammar-v2-c1-noun-phrase-pre-modification-17-q10',
      kind: 'transform',
      prompt: 'Transform the clause into a pre-modified noun phrase with "initiative": "The government launched an initiative that will span ten years and cost multi-billions."',
      options: [],
      acceptedAnswers: [
        { text: 'The government launched a ten-year, multi-billion-dollar initiative.', rationale: 'Standard academic compression using hyphenated compounds ten-year and multi-billion-dollar.' },
        { text: 'The government launched a ten-year multi-billion-dollar initiative.', rationale: 'Accepts variation without comma between coordinating modifiers.' },
      ],
    },
    {
      id: 'grammar-v2-c1-noun-phrase-pre-modification-17-q11',
      kind: 'correction',
      prompt: 'Correct the punctuation error in this academic noun phrase: "The author advocates for a broadly-accepted theoretical construct."',
      options: [],
      acceptedAnswers: [
        { text: 'The author advocates for a broadly accepted theoretical construct.', rationale: 'Removes the erroneous hyphen after the -ly adverb broadly.' },
      ],
    },
    {
      id: 'grammar-v2-c1-noun-phrase-pre-modification-17-q12',
      kind: 'correction',
      prompt: 'Correct the ungrammatical plural modifier: "The committee reviewed the five-years development strategy yesterday."',
      options: [],
      acceptedAnswers: [
        { text: 'The committee reviewed the five-year development strategy yesterday.', rationale: 'Changes plural years to singular year in pre-nominal compound.' },
      ],
    },
  ],
  reviewExercises: [
    {
      id: 'grammar-v2-c1-noun-phrase-pre-modification-17-r1',
      kind: 'choice',
      prompt: 'Select the sentence with impeccable punctuation and morphology in pre-nominal modifiers.',
      options: [
        { text: 'The researchers unveiled a groundbreaking, cost-effective water purification system.', correct: true, rationale: 'Groundbreaking and cost-effective are correctly punctuated compound modifiers.' },
        { text: 'The researchers unveiled a ground breaking, cost effective water purification system.', correct: false, rationale: 'Missing necessary hyphens in compound modifiers.' },
        { text: 'The researchers unveiled a groundbreaking, cost-effectively water purification system.', correct: false, rationale: 'Adverb cost-effectively cannot directly modify noun system.' },
      ],
      acceptedAnswers: [{ text: 'The researchers unveiled a groundbreaking, cost-effective water purification system.', rationale: 'Exemplary pre-nominal compounding.' }],
    },
    {
      id: 'grammar-v2-c1-noun-phrase-pre-modification-17-r2',
      kind: 'gap',
      prompt: 'Supply the missing component to complete the compound modifier: "This semiconductor employs a cutting-_____ manufacturing architecture." (edge)',
      options: [],
      acceptedAnswers: [
        { text: 'edge', rationale: 'Completes the compound adjective cutting-edge.' },
      ],
    },
    {
      id: 'grammar-v2-c1-noun-phrase-pre-modification-17-r3',
      kind: 'transform',
      prompt: 'Compress the relative clause into a hyphenated pre-modifier before "protocol": "They established a protocol that is intensive in terms of labor."',
      options: [],
      acceptedAnswers: [
        { text: 'They established a labor-intensive protocol.', rationale: 'Compresses into standard compound adjective labor-intensive.' },
        { text: 'They established a labour-intensive protocol.', rationale: 'Accepts British English spelling labour-intensive.' },
      ],
    },
    {
      id: 'grammar-v2-c1-noun-phrase-pre-modification-17-r4',
      kind: 'correction',
      prompt: 'Fix the error in this technical description: "The facility operates a three-stages filtration circuit."',
      options: [],
      acceptedAnswers: [
        { text: 'The facility operates a three-stage filtration circuit.', rationale: 'Corrects plural stages to singular stage in pre-modifying compound.' },
      ],
    },
  ],
  outputPrompts: [
    {
      id: 'grammar-v2-c1-noun-phrase-pre-modification-17-o1',
      prompt: 'Viết 2 câu giới thiệu tóm tắt đề tài nghiên cứu công nghệ hoặc y sinh, sử dụng ít nhất hai cụm tính từ ghép có dấu gạch ngang (ví dụ: evidence-based, peer-reviewed, state-of-the-art) và một cụm trạng từ đuôi -ly bổ nghĩa phân từ không có gạch ngang.',
      modelAnswer: 'This study evaluates a state-of-the-art, machine-learning diagnostic platform designed to detect early oncological mutations. Our findings indicate that this readily accessible tool delivers diagnostic precision comparable to established clinical benchmarks.',
      checks: [
        'Sử dụng chính xác các tính từ ghép có dấu gạch ngang trước danh từ.',
        'Sử dụng trạng từ có đuôi -ly bổ nghĩa cho phân từ mà không dùng dấu gạch ngang (ví dụ: readily accessible).',
        'Cấu trúc câu giàu tính học thuật và súc tích.',
      ],
    },
    {
      id: 'grammar-v2-c1-noun-phrase-pre-modification-17-o2',
      prompt: 'Viết 1-2 câu trong báo cáo phân tích kinh tế mô tả một dự án đầu tư quy mô lớn, sử dụng cụm danh từ bổ nghĩa chỉ thời gian hoặc số lượng (ví dụ: ten-year, multi-million-dollar) và danh từ bổ trợ chuyên ngành (noun adjunct).',
      modelAnswer: 'The municipal authority launched a ten-year, fifty-million-dollar urban renewal initiative to modernize legacy transit corridors.',
      checks: [
        'Sử dụng cụm từ đo lường số ít nối gạch ngang (ten-year, fifty-million-dollar).',
        'Sử dụng danh từ bổ trợ số ít (urban renewal initiative / transit corridors).',
        'Ngữ pháp và văn phong C1 chặt chẽ.',
      ],
    },
  ],
  sources: [
    {
      id: 'cambridge-noun-phrases-dependent-words',
      title: 'English Grammar Today: Noun phrases: dependent words',
      url: 'https://dictionary.cambridge.org/grammar/british-grammar/noun-phrases-dependent-words',
      claims: [
        'In a noun phrase, dependent words before the head are determiners or premodifiers like adjectives and classifying nouns.',
        'Compound adjectives modifying head nouns are hyphenated, whereas adverbs ending in -ly do not take hyphens.',
        'Classifying noun modifiers typically remain in the singular form before the head noun.',
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
    summary: 'Comprehensive review completed. Complex noun phrase pre-modification, hyphenated compounds, -ly adverb exceptions, singular noun adjuncts, exercise items, and verified Cambridge Grammar source confirmed.',
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

export default nounPhrasePreModificationLesson;
