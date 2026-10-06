/**
 * @file fronting-focus.ts
 * @description C1 lesson on fronting and topicalization for thematic progression and stylistic emphasis.
 */
import type { GrammarLesson } from '../../types.js';

const frontingFocusLesson: GrammarLesson = {
  id: 'grammar-v2-c1-fronting-focus-07',
  revisionId: 'grammar-v2-c1-fronting-focus-07@1.0.0',
  revision: '1.0.0',
  title: 'Đưa thành phần lên đầu câu để tạo tiêu điểm (Fronting for Focus / Topicalization)',
  objective: 'Thành thạo nghệ thuật đảo vị trí thành phần câu lên đầu (fronting: tân ngữ, bổ ngữ tính từ, cụm giới từ chỉ vị trí/hướng, cụm phân từ) nhằm kết nối mạch lạc diễn ngôn (thematic linkage), tạo tương phản tu từ và gia tăng sức nặng biểu đạt trong văn phong C1.',
  prerequisiteIds: ['grammar-v2-c1-what-clefts-06'],
  coverage: ['fronting-focus', 'fronting', 'topicalization', 'information-structure', 'emphasis'],
  context: {
    english: 'In scholarly prose, high-level journalism, and rhetorical speeches, writers front non-subject constituents to forge unbroken thematic chains with preceding sentences or to cast dramatic spotlight onto an unexpected attribute before revealing the subject.',
    vietnamese: 'Trong văn phong học thuật, báo chí phân tích cao cấp và diễn văn hùng biện, người viết đưa các thành phần không phải chủ ngữ lên đầu câu nhằm thiết lập chuỗi mạch đề tài (thematic chains) liền mạch với câu trước hoặc dồn sự chú ý vào một thuộc tính bất ngờ trước khi tiết lộ chủ thể.',
  },
  guide: {
    pattern: 'Fronted Constituent (Object / Adjective / Prepositional Phrase / Participle) + (Subject + Verb OR Copula + Subject OR Full Verb + Subject)',
    whenToUse: [
      'Topicalization tân ngữ: đưa tân ngữ lên đầu câu để đối chiếu thông tin đã biết với thông tin mới mà không đảo ngữ: "That assumption, we can safely discard; this alternative, we must retain".',
      'Đưa tính từ so sánh/bổ ngữ lên đầu nối với hệ từ đảo: "Equally critical is the prompt recapitalization of regional credit unions".',
      'Đảo ngữ chỉ nơi chốn/hướng (Locative / Directional Inversion): "Beneath the outer crust lies a pressurized geothermal reservoir".',
      'Đưa cụm phân từ hoặc đính kèm lên đầu: "Attached to the communique were the formal terms of surrender".',
    ],
    signalWords: ['equally important is', 'particularly striking was', 'beneath the surface lies', 'attached to the dispatch was', 'this proposition we reject'],
    check: [
      'Đã phân biệt khi nào fronting KHÔNG đảo ngữ (Object topicalization: Object + S + V) và khi nào BẮT BUỘC đảo ngữ (Locative inversion: Prep + Verb + Subject)?',
      'Trong Locative Inversion, động từ chính có được đảo trực tiếp (không mượn do/does/did) không: "Inside the chamber sat the ambassadors", tuyệt đối không viết "did the ambassadors sit"?',
      'Nếu chủ ngữ là đại từ nhân xưng trong Locative Inversion, trật tự có giữ nguyên S + V không ("Here comes the envoy" nhưng "Here she comes")?',
    ],
  },
  explanation: 'Fronting (đưa thành phần lên đầu câu) là thủ pháp chuyển dịch một thành phần vốn đứng sau động từ (như tân ngữ trực tiếp, bổ ngữ tính từ, cụm giới từ chỉ địa điểm/phương hướng) lên vị trí đầu câu (initial/theme position). Khác với cấu trúc câu chẻ, fronting không cần bổ sung các từ giả như "it" hay "what". Ta phân biệt ba loại chính trong ngữ pháp C1: 1) Topicalization (Chủ đề hóa): đưa tân ngữ lên đầu để tạo liên kết mạch văn; trật tự chủ ngữ - động từ vẫn giữ nguyên không đảo ngữ ("Most of these recommendations the committee endorsed without reservation"); 2) Inversion sau tính từ so sánh/đánh giá: tính từ đứng đầu kéo theo hệ từ đảo lên trước chủ ngữ ("Of greater consequence was the sudden collapse of interbank confidence"); 3) Locative Inversion (Đảo ngữ vị trí): cụm giới từ nơi chốn/hướng đứng đầu kéo toàn bộ nội động từ lên trước chủ ngữ danh từ ("Behind this procedural stalemate stands a fierce partisan rivalry"). Lưu ý tuyệt đối không dùng trợ động từ "did/do" trong Locative Inversion.',
  examples: [
    {
      english: 'This contentious theoretical premise, contemporary sociobiologists have largely abandoned.',
      vietnamese: 'Tiền đề lý thuyết gây nhiều tranh cãi này, các nhà sinh học xã hội đương đại phần lớn đã từ bỏ.',
    },
    {
      english: 'Equally significant is the role of decentralized energy microgrids in bolstering climate resilience.',
      vietnamese: 'Có ý nghĩa quan trọng không kém là vai trò của các lưới điện vi mô phi tập trung trong việc tăng cường khả năng chống chịu khí hậu.',
    },
    {
      english: 'At the heart of the antitrust investigation lies an obscure software exclusivity covenant.',
      vietnamese: 'Nằm ở trọng tâm của cuộc điều tra chống độc quyền là một điều khoản độc quyền phần mềm ít người biết tới.',
    },
    {
      english: 'Attached to the ministerial briefing was a classified risk assessment regarding maritime logistics.',
      vietnamese: 'Đính kèm theo bản tóm tắt của bộ trưởng là một bản đánh giá rủi ro mật liên quan đến hoạt động hậu cần hàng hải.',
    },
    {
      english: 'Particularly troubling to international observers was the abrupt suspension of statutory habeas corpus rights.',
      vietnamese: 'Đặc biệt gây lo ngại cho các quan sát viên quốc tế là việc đình chỉ đột ngột quyền bảo thân theo luật định.',
    },
    {
      english: 'Out of the ashes of the protracted industrial dispute emerged a groundbreaking co-determination framework.',
      vietnamese: 'Bước ra từ đống tro tàn của cuộc tranh chấp lao động kéo dài là một khuôn khổ đồng quyết định mang tính đột phá.',
    },
  ],
  contrasts: [
    {
      form: 'Such anomalies we can readily accommodate within the existing predictive paradigm.',
      whyFits: 'Topicalization tân ngữ: đưa such anomalies lên đầu để kết nối ý; câu giữ trật tự S + V (we can readily accommodate).',
      whyNot: '"Such anomalies can we readily accommodate..." sai vì nhầm lẫn topicalization với negative inversion; không có phó từ phủ định thì không đảo trợ động từ.',
    },
    {
      form: 'Beyond the mountain ridge stood three heavily fortified radar installations.',
      whyFits: 'Locative inversion: cụm giới từ chỉ nơi chốn đứng đầu câu đảo toàn bộ nội động từ stood lên trước chủ ngữ danh từ three installations.',
      whyNot: '"Beyond the mountain ridge did three installations stand..." sai vì locative inversion đảo trực tiếp động từ chính, tuyệt đối không mượn trợ động từ did.',
    },
  ],
  commonMistakes: [
    'Mượn trợ động từ do/did trong Locative Inversion (viết "Under the archway did wait the guards" thay vì "waited the guards").',
    'Tự ý đảo trợ động từ khi chỉ đơn thuần đưa tân ngữ lên làm chủ đề (viết "That proposal rejected the council" hoặc "did the council reject" thay vì "That proposal the council rejected").',
    'Đảo động từ trước đại từ nhân xưng trong cụm trạng ngữ mở đầu (viết "Down fell it" thay vì "Down it fell").',
  ],
  summary: 'Fronting đưa tân ngữ hoặc trạng ngữ lên đầu câu để gắn kết diễn ngôn hoặc tạo kịch tính. Với tân ngữ (Topicalization), giữ nguyên trật tự S + V; với trạng ngữ vị trí (Locative Inversion) hoặc tính từ đánh giá ("Equally vital is..."), đảo động từ trực tiếp lên trước chủ ngữ danh từ.',
  exercises: [
    {
      id: 'grammar-v2-c1-fronting-focus-07-q1',
      kind: 'choice',
      prompt: 'Select the correct academic sentence displaying object topicalization for discourse cohesion:',
      options: [
        { text: 'The initial budgetary surplus the finance ministry allocated to sovereign debt reduction.', correct: true, rationale: 'Flawless object topicalization: Object + Subject + Verb without ungrammatical inversion.' },
        { text: 'The initial budgetary surplus did the finance ministry allocate to sovereign debt reduction.', correct: false, rationale: 'Topicalization of non-negative objects does not license auxiliary inversion.' },
        { text: 'The initial budgetary surplus allocated the finance ministry to sovereign debt reduction.', correct: false, rationale: 'Direct subject-verb inversion after object fronting is ungrammatical.' },
        { text: 'The initial budgetary surplus was allocated the finance ministry to sovereign debt reduction.', correct: false, rationale: 'Malformed passive blend.' },
      ],
      acceptedAnswers: [{ text: 'The initial budgetary surplus the finance ministry allocated to sovereign debt reduction.', rationale: 'Correct topicalization structure.' }],
    },
    {
      id: 'grammar-v2-c1-fronting-focus-07-q2',
      kind: 'choice',
      prompt: 'Choose the grammatically correct locative inversion: "In the shadow of the cathedral ___"',
      options: [
        { text: 'stood the historic municipal guildhalls.', correct: true, rationale: 'Prepositional phrase followed directly by full lexical intransitive verb and plural subject.' },
        { text: 'did stand the historic municipal guildhalls.', correct: false, rationale: 'Dummy auxiliary "did" is forbidden in locative inversion.' },
        { text: 'the historic municipal guildhalls standing.', correct: false, rationale: 'Fragment lacking a finite verb.' },
        { text: 'did the historic municipal guildhalls stood.', correct: false, rationale: 'Double past tense and ungrammatical inversion.' },
      ],
      acceptedAnswers: [{ text: 'stood the historic municipal guildhalls.', rationale: 'Direct intransitive verb inversion in locative construction.' }],
    },
    {
      id: 'grammar-v2-c1-fronting-focus-07-q3',
      kind: 'choice',
      prompt: 'Select the correct sentence with a fronted comparative adjective phrase:',
      options: [
        { text: 'Far more consequential was the unanticipated decline in agricultural commodity yields.', correct: true, rationale: 'Fronted adjective complement followed by copula was and subject noun phrase.' },
        { text: 'Far more consequential the unanticipated decline in agricultural commodity yields was.', correct: false, rationale: 'Missing copular inversion creates awkward disjointed syntax.' },
        { text: 'Far more consequential did the unanticipated decline in yields be.', correct: false, rationale: 'Dummy auxiliary "did" cannot combine with copula "be" in adjectival fronting.' },
        { text: 'Far more consequential were the unanticipated decline in agricultural commodity yields.', correct: false, rationale: 'Number disagreement: decline is singular, requiring "was".' },
      ],
      acceptedAnswers: [{ text: 'Far more consequential was the unanticipated decline in agricultural commodity yields.', rationale: 'Standard fronted comparative adjective construction.' }],
    },
    {
      id: 'grammar-v2-c1-fronting-focus-07-q4',
      kind: 'choice',
      prompt: 'Identify the correct handling of a personal pronoun subject following a directional adverbial:',
      options: [
        { text: 'Into the briefing room she stepped, armed with unredacted audit trails.', correct: true, rationale: 'When the subject is a personal pronoun, it precedes the verb even after directional fronting.' },
        { text: 'Into the briefing room stepped she, armed with unredacted audit trails.', correct: false, rationale: 'Pronominal subjects cannot be inverted after directional adverbs in modern English.' },
        { text: 'Into the briefing room did she step, armed with unredacted audit trails.', correct: false, rationale: 'Directional fronting does not trigger auxiliary do-inversion.' },
        { text: 'Into the briefing room stepping she, armed with unredacted audit trails.', correct: false, rationale: 'Participle fragment lacking finite verb clause structure.' },
      ],
      acceptedAnswers: [{ text: 'Into the briefing room she stepped, armed with unredacted audit trails.', rationale: 'Pronominal subject precedes verb in directional fronting.' }],
    },
    {
      id: 'grammar-v2-c1-fronting-focus-07-q5',
      kind: 'gap',
      prompt: 'Supply the appropriate copular verb form: "Equally vital to the urban ecosystem _____ the preservation of contiguous wildlife corridors."',
      options: [],
      acceptedAnswers: [
        { text: 'is', rationale: 'Singular copula "is" agrees with singular subject "the preservation of contiguous wildlife corridors".' },
      ],
    },
    {
      id: 'grammar-v2-c1-fronting-focus-07-q6',
      kind: 'gap',
      prompt: 'Complete the locative inversion: "Beneath the surface layer of polite diplomatic communiques _____ a fierce geopolitical rivalry."',
      options: [],
      acceptedAnswers: [
        { text: 'lies', rationale: 'Intransitive stative verb "lies" or "lay" fits locative inversion with singular rivalry.' },
        { text: 'lay', rationale: 'Past tense "lay" is equally grammatical.' },
      ],
    },
    {
      id: 'grammar-v2-c1-fronting-focus-07-q7',
      kind: 'gap',
      prompt: 'Complete the participle fronting construction: "_____ to the official petition was a dossier containing sworn testimonies from factory inspectors."',
      options: [],
      acceptedAnswers: [
        { text: 'Attached', rationale: 'Passive participle "Attached" frequently fronts to highlight annexes or enclosures.' },
        { text: 'Appended', rationale: '"Appended" is an exact formal academic synonym.' },
      ],
    },
    {
      id: 'grammar-v2-c1-fronting-focus-07-q8',
      kind: 'gap',
      prompt: 'Supply the copula: "Of paramount importance _____ the rigorous verification of all experimental calibration protocols."',
      options: [],
      acceptedAnswers: [
        { text: 'is', rationale: 'Singular copula "is" agrees with singular subject "the rigorous verification".' },
        { text: 'was', rationale: 'Past copula "was" is also grammatically valid.' },
      ],
    },
    {
      id: 'grammar-v2-c1-fronting-focus-07-q9',
      kind: 'transform',
      prompt: 'Front the direct object for contrastive focus without changing the meaning: "We can readily verify the first statistical claim, but we must dismiss the second."',
      options: [],
      acceptedAnswers: [
        { text: 'The first statistical claim we can readily verify, but the second we must dismiss.', rationale: 'Topicalizes the direct objects in both clauses to establish contrast.' },
      ],
    },
    {
      id: 'grammar-v2-c1-fronting-focus-07-q10',
      kind: 'transform',
      prompt: 'Apply locative inversion starting with the prepositional phrase: "A centuries-old irrigation network lies hidden behind the terraced slopes."',
      options: [],
      acceptedAnswers: [
        { text: 'Behind the terraced slopes lies hidden a centuries-old irrigation network.', rationale: 'Fronts prepositional phrase, inverting intransitive verb complex before subject.' },
        { text: 'Behind the terraced slopes lies a centuries-old irrigation network hidden.', rationale: 'Valid alternative placement of adjective hidden.' },
      ],
    },
    {
      id: 'grammar-v2-c1-fronting-focus-07-q11',
      kind: 'correction',
      prompt: 'Correct the ungrammatical do-support in locative inversion: "Across the southern horizon did gather dark storm clouds."',
      options: [],
      acceptedAnswers: [
        { text: 'Across the southern horizon gathered dark storm clouds.', rationale: 'Removes dummy auxiliary "did" and inverts lexical past verb "gathered" directly.' },
      ],
    },
    {
      id: 'grammar-v2-c1-fronting-focus-07-q12',
      kind: 'correction',
      prompt: 'Correct the pronoun inversion error: "Up the flight of marble stairs ran he to deliver the dispatch."',
      options: [],
      acceptedAnswers: [
        { text: 'Up the flight of marble stairs he ran to deliver the dispatch.', rationale: 'Restores Subject + Verb order for personal pronoun subject following directional fronting.' },
      ],
    },
  ],
  reviewExercises: [
    {
      id: 'grammar-v2-c1-fronting-focus-07-r1',
      kind: 'choice',
      prompt: 'Select the well-formed high-register inversion with a fronted evaluation complement:',
      options: [
        { text: 'Especially notable was the unanimous consensus among independent climatologists.', correct: true, rationale: 'Adjectival complement fronting followed by singular copula was and subject noun phrase.' },
        { text: 'Especially notable did the unanimous consensus become among climatologists.', correct: false, rationale: 'Unnatural auxiliary insertion.' },
        { text: 'Especially notable the unanimous consensus was among climatologists.', correct: false, rationale: 'Uninverted order lacks rhetorical focus cadence.' },
      ],
      acceptedAnswers: [{ text: 'Especially notable was the unanimous consensus among independent climatologists.', rationale: 'Correct fronted complement structure.' }],
    },
    {
      id: 'grammar-v2-c1-fronting-focus-07-r2',
      kind: 'gap',
      prompt: 'Complete with the intransitive verb in locative inversion: "At the intersection of cognitive linguistics and neurobiology _____ the question of conceptual embodiment."',
      options: [],
      acceptedAnswers: [
        { text: 'lies', rationale: 'Intransitive verb "lies" or "stands" completes the locative inversion.' },
        { text: 'stands', rationale: '"stands" is also standard.' },
      ],
    },
    {
      id: 'grammar-v2-c1-fronting-focus-07-r3',
      kind: 'transform',
      prompt: 'Front the comparative adjective phrase: "The legal ramifications for the parent corporation were far more serious."',
      options: [],
      acceptedAnswers: [
        { text: 'Far more serious were the legal ramifications for the parent corporation.', rationale: 'Fronts "Far more serious" and inverts plural copula were before subject.' },
      ],
    },
    {
      id: 'grammar-v2-c1-fronting-focus-07-r4',
      kind: 'correction',
      prompt: 'Correct the erroneous auxiliary inversion in object topicalization: "This preliminary finding can we corroborate through subsequent clinical trials."',
      options: [],
      acceptedAnswers: [
        { text: 'This preliminary finding we can corroborate through subsequent clinical trials.', rationale: 'Restores Subject + Modal order (we can) in affirmative object topicalization.' },
      ],
    },
  ],
  outputPrompts: [
    {
      id: 'grammar-v2-c1-fronting-focus-07-o1',
      prompt: 'Viết 1-2 câu học thuật sử dụng kỹ thuật đảo bổ ngữ tính từ lên đầu ("Equally important / Far more concerning is / was...") để chuyển giao mạch thảo luận sang một khía cạnh nghiêm trọng hơn.',
      modelAnswer: 'Equally significant is the rapid depletion of sub-surface aquifers across the agricultural basin. Far more concerning, however, was the administrative failure to mandate conservation quotas before the peak drought season.',
      checks: [
        'Đưa cụm tính từ (Equally significant / Far more concerning) lên đầu câu.',
        'Đảo hệ từ is/was lên trước cụm danh từ chủ ngữ.',
        'Chủ ngữ và hệ từ hòa hợp về số và thời.',
      ],
    },
    {
      id: 'grammar-v2-c1-fronting-focus-07-o2',
      prompt: 'Viết 1-2 câu miêu tả phân tích không gian hoặc bối cảnh tổ chức dùng Locative Inversion ("At the core of...", "Behind this facade lies...").',
      modelAnswer: 'At the heart of the protracted institutional paralysis lies an unbridgeable ideological chasm between executive leadership and the faculty senate.',
      checks: [
        'Sử dụng cụm giới từ chỉ địa điểm/bản chất ở đầu câu.',
        'Đảo trực tiếp nội động từ (lies/stands/sits) lên trước chủ ngữ.',
        'Không dùng trợ động từ do/does/did.',
      ],
    },
  ],
  sources: [
    {
      id: 'cambridge-grammar-fronting',
      title: 'English Grammar Today: Fronting',
      url: 'https://dictionary.cambridge.org/grammar/british-grammar/fronting',
      claims: [
        'Fronting moves an element that does not usually begin a sentence to the beginning for focus or cohesion.',
        'Fronting of objects and complements establishes thematic focus without auxiliary inversion.',
        'Locative and directional prepositional phrases license full verb inversion without do-support.',
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
    summary: 'Comprehensive review completed. Topicalization, locative and directional inversion, pronominal subject constraints, exercises, and verified Cambridge Grammar source confirmed.',
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

export default frontingFocusLesson;
