/**
 * @file articles-shared-reference.ts
 * @description B2 lesson 25: Advanced article usage with shared reference, generic reference, and institutional nouns.
 */
import type { GrammarLesson } from '../../types.js';

const lesson: GrammarLesson = {
  id: 'grammar-v2-b2-articles-shared-reference-25',
  revisionId: 'grammar-v2-b2-articles-shared-reference-25@1.0.0',
  revision: '1.0.0',
  title: 'Mạo từ với quy chiếu chia sẻ và khái quát (Articles in Shared and Generic Reference)',
  objective: 'Làm chủ cách sử dụng mạo từ xác định "the" và mạo từ số không (zero article) trong các trường hợp tri thức chung được chia sẻ (shared knowledge), quy chiếu khái quát (generic reference), và danh từ chỉ định chế (institutional nouns: school, hospital, prison).',
  prerequisiteIds: ['grammar-v2-b2-concession-clauses-24'],
  coverage: ['articles-shared-reference', 'definite-article', 'zero-article', 'shared-knowledge', 'generic-reference', 'institutional-use'],
  context: {
    english: 'Professional writers and academics navigate subtle distinctions between unique situational shared knowledge, overarching biological or technical classifications, and institutional functions.',
    vietnamese: 'Các nhà văn chuyên nghiệp và học giả xử lý tinh tế các khác biệt giữa tri thức tình huống chung được chia sẻ, phân loại sinh học/kỹ thuật khái quát và chức năng định chế xã hội.',
  },
  guide: {
    pattern: 'The + Noun (Shared/Unique) | The + Singular Noun (Scientific Generic) | Zero Article + Plural/Uncountable Noun (General) | Zero Article + Institution (Primary function)',
    whenToUse: [
      'Dùng "the" khi đối tượng là duy nhất hoặc thuộc về hiểu biết chung của người nói và người nghe trong ngữ cảnh văn hóa/xã hội (the government, the police, the environment, the internet).',
      'Dùng "the + danh từ số ít" trong văn phong học thuật để chỉ toàn bộ một loài động thực vật, nhạc cụ hoặc phát minh công nghệ (The blue whale, the violin, the microchip).',
      'Dùng zero article với một số danh từ định chế khi nói về chức năng chính, nhất là trong tiếng Anh-Anh (in hospital, go to prison, attend university); tiếng Anh-Mỹ thường dùng the trong một số trường hợp như in the hospital.',
    ],
    signalWords: ['the environment', 'the economy', 'in hospital', 'at university', 'the smartphone'],
    check: [
      'Khi nói về loài/phát minh trong văn bản khoa học, đã dùng "the + danh từ số ít" (The tiger is endangered) hoặc "danh từ số nhiều không mạo từ" (Tigers are endangered)?',
      'Người đó đang ở định chế để thực hiện chức năng chính (bệnh nhân in hospital) hay chỉ ghé thăm tòa nhà (visit the hospital)?',
      'Tránh dùng the với society, nature hoặc space khi nói khái quát, nhưng dùng mạo từ khi danh từ được giới hạn hoặc xác định bởi ngữ cảnh.',
    ],
  },
  explanation: 'Mạo từ phụ thuộc vào cách người nói định danh danh từ và phương ngữ. Dùng the khi danh từ là duy nhất hoặc đã xác định trong ngữ cảnh (the sun, the government). Quy chiếu khái quát có thể dùng the + danh từ số ít (the blue whale), danh từ số nhiều không mạo từ (whales), hoặc a/an + danh từ số ít (a whale). Với danh từ chỉ định chế, cách dùng zero article theo chức năng như in hospital phổ biến trong tiếng Anh-Anh; tiếng Anh-Mỹ thường dùng in the hospital. Danh từ trừu tượng khái quát thường không có the, nhưng the có thể xuất hiện khi ý nghĩa được xác định.',
  examples: [
    {
      english: 'The government has pledged substantial subsidies to protect the environment.',
      vietnamese: 'Chính phủ đã cam kết các khoản trợ cấp đáng kể để bảo vệ môi trường.',
    },
    {
      english: 'The Siberian tiger faces severe habitat fragmentation across eastern Russia.',
      vietnamese: 'Hổ Siberia đang đối mặt với sự phân mảnh môi trường sống nghiêm trọng trên khắp vùng viễn đông nước Nga.',
    },
    {
      english: 'After fracturing his femur in the skiing accident, he remained in hospital for three weeks.',
      vietnamese: 'Sau khi bị gãy xương đùi trong vụ tai nạn trượt tuyết, anh ấy đã phải nằm viện suốt ba tuần.',
    },
    {
      english: 'A delegation of architectural inspectors visited the hospital to assess fire safety exits.',
      vietnamese: 'Một phái đoàn thanh tra kiến trúc đã tới thăm bệnh viện để đánh giá các lối thoát hiểm phòng cháy.',
    },
    {
      english: 'Alexander Graham Bell is widely credited with the invention of the telephone.',
      vietnamese: 'Alexander Graham Bell được công nhận rộng rãi là người đã phát minh ra điện thoại.',
    },
    {
      english: 'Society must balance technological innovation with ethical considerations.',
      vietnamese: 'Xã hội phải cân bằng giữa đổi mới công nghệ và các cân nhắc đạo đức.',
    },
  ],
  contrasts: [
    {
      form: 'The defendant was convicted of fraud and sent to prison for four years.',
      whyFits: 'Dùng prison không có mạo từ vì người này bị giam giữ với tư cách phạm nhân (đúng chức năng định chế).',
      whyNot: '"...sent to the prison for four years" ngụ ý người này được phái tới thăm một tòa nhà tù cụ thể chứ không phải đi thụ án.',
    },
    {
      form: 'The domestic cat has lived alongside human civilizations for millennia.',
      whyFits: 'Dùng The domestic cat (danh từ số ít có the) để quy chiếu khái quát về mặt sinh học cho toàn bộ loài mèo nhà.',
      whyNot: '"A domestic cat has lived alongside human civilizations for millennia" nghe gượng gạo vì một con mèo cá thể không thể sống hàng thiên niên kỷ.',
    },
  ],
  commonMistakes: [
    'Khác biệt Anh-Anh/Anh-Mỹ với một số danh từ định chế: tiếng Anh-Anh thường dùng "in hospital" khi là bệnh nhân, còn tiếng Anh-Mỹ thường dùng "in the hospital"; chọn theo phương ngữ mục tiêu.',
    'Thêm "the" trước các khái niệm trừu tượng mang tính toàn cầu (ví dụ: viết "We must protect the nature" thay vì "protect nature", hoặc "in the society" thay vì "in society").',
    'Bỏ quên "the" khi nói về các phát minh công nghệ hoặc nhạc cụ (ví dụ: viết "She plays piano" thay vì "She plays the piano", "who invented computer" thay vì "the computer").',
  ],
  summary: 'Dùng the cho danh từ duy nhất/đã xác định và có thể dùng the + danh từ số ít để khái quát loài hoặc phát minh; danh từ số nhiều cũng thường khái quát không mạo từ. Một số danh từ định chế nhận zero article theo chức năng trong Anh-Anh, với khác biệt phương ngữ; danh từ trừu tượng khái quát thường không có the.',
  exercises: [
    {
      id: 'grammar-v2-b2-articles-shared-reference-25-q1',
      kind: 'choice',
      prompt: 'Select the sentence with the correct generic article usage in an academic biological context:',
      options: [
        { text: 'The polar bear is classified as a vulnerable species due to receding sea ice.', correct: true, rationale: 'The + singular noun (The polar bear) is the formal academic generic form for species.' },
        { text: 'A polar bear is classified as a vulnerable species due to receding sea ice.', correct: false, rationale: 'A single individual representative cannot bear an aggregate species vulnerability classification.' },
        { text: 'Polar bear is classified as a vulnerable species due to receding sea ice.', correct: false, rationale: 'Singular countable noun cannot appear without a determiner.' },
        { text: 'The polar bears is classified as a vulnerable species due to receding sea ice.', correct: false, rationale: 'Subject-verb disagreement: plural noun with singular verb is.' },
      ],
      acceptedAnswers: [{ text: 'The polar bear is classified as a vulnerable species due to receding sea ice.', rationale: 'The polar bear correctly expresses formal biological generic reference.' }],
    },
    {
      id: 'grammar-v2-b2-articles-shared-reference-25-q2',
      kind: 'choice',
      prompt: 'Choose the sentence that correctly expresses being a patient receiving medical treatment in standard British English:',
      options: [
        { text: 'Following the surgery, the diplomat was kept in hospital for observation.', correct: true, rationale: 'In hospital without article indicates status as a patient receiving medical care.' },
        { text: 'Following the surgery, the diplomat was kept in the hospital for observation.', correct: false, rationale: 'In British English, the hospital implies visiting the building rather than patient status.' },
        { text: 'Following the surgery, the diplomat was kept in a hospital for observation.', correct: false, rationale: 'A hospital shifts focus to an indefinite facility rather than the medical condition.' },
        { text: 'Following the surgery, the diplomat was kept at hospital for observation.', correct: false, rationale: 'At hospital is an incorrect prepositional collocation for patient admission.' },
      ],
      acceptedAnswers: [{ text: 'Following the surgery, the diplomat was kept in hospital for observation.', rationale: 'In hospital without article indicates medical inpatient status.' }],
    },
    {
      id: 'grammar-v2-b2-articles-shared-reference-25-q3',
      kind: 'choice',
      prompt: 'Identify the sentence with an erroneous definite article before a broad abstract concept:',
      options: [
        { text: 'Philosophers have debated how the society influences personal moral integrity.', correct: true, rationale: 'Society should take zero article when referring to human society in general.' },
        { text: 'Philosophers have debated how society influences personal moral integrity.', correct: false, rationale: 'Correct zero article with broad concept society.' },
        { text: 'Ecologists warn that damage to the environment may soon be irreversible.', correct: false, rationale: 'The environment correctly takes the definite article for shared global reality.' },
        { text: 'The judicial system must uphold the rule of law without political interference.', correct: false, rationale: 'The rule of law correctly takes the definite article.' },
      ],
      acceptedAnswers: [{ text: 'Philosophers have debated how the society influences personal moral integrity.', rationale: 'The society is incorrect for general human society.' }],
    },
    {
      id: 'grammar-v2-b2-articles-shared-reference-25-q4',
      kind: 'choice',
      prompt: 'Select the correct option for cultural shared reference: "Citizens expect ___ to ensure public order during major sporting events."',
      options: [
        { text: 'the police', correct: true, rationale: 'The police refers to the institutional law enforcement body as shared social knowledge.' },
        { text: 'a police', correct: false, rationale: 'Police is a plural collective noun and cannot take the singular indefinite article a.' },
        { text: 'police', correct: false, rationale: 'Zero article sounds unidiomatic when referring to the recognized institutional authority.' },
        { text: 'the polices', correct: false, rationale: 'Police has no plural form with -s.' },
      ],
      acceptedAnswers: [{ text: 'the police', rationale: 'The police correctly denotes the civic institution.' }],
    },
    {
      id: 'grammar-v2-b2-articles-shared-reference-25-q5',
      kind: 'gap',
      prompt: 'Fill in the correct article (a, an, the, or write "zero" for no article): "Human exploration of _____ outer space has accelerated over the past decade."',
      options: [],
      acceptedAnswers: [{ text: 'zero', rationale: 'Outer space takes zero article when referring to astronomical space.' }, { text: 'Ø', rationale: 'Symbol indicating zero article.' }],
    },
    {
      id: 'grammar-v2-b2-articles-shared-reference-25-q6',
      kind: 'gap',
      prompt: 'Fill in the article: "Who was credited with inventing _____ microscope in the late sixteenth century?"',
      options: [],
      acceptedAnswers: [{ text: 'the', rationale: 'The microscope is the generic singular form for an invention.' }],
    },
    {
      id: 'grammar-v2-b2-articles-shared-reference-25-q7',
      kind: 'gap',
      prompt: 'Fill in the article: "She completed her undergraduate degree at _____ Oxford University before entering politics."',
      options: [],
      acceptedAnswers: [{ text: 'zero', rationale: 'Universities named after towns/founders take zero article (Oxford University).' }, { text: 'Ø', rationale: 'Zero article symbol.' }],
    },
    {
      id: 'grammar-v2-b2-articles-shared-reference-25-q8',
      kind: 'gap',
      prompt: 'Fill in the article: "Conservationists work tirelessly to preserve _____ flora and fauna of the Amazon basin."',
      options: [],
      acceptedAnswers: [{ text: 'the', rationale: 'The flora and fauna is specified by the post-modifying phrase of the Amazon basin.' }],
    },
    {
      id: 'grammar-v2-b2-articles-shared-reference-25-q9',
      kind: 'transform',
      prompt: 'Rewrite the informal general statement using the formal generic "the + singular noun": "Smartphones have revolutionized global communication."',
      options: [],
      acceptedAnswers: [
        { text: 'The smartphone has revolutionized global communication.', rationale: 'Transforms plural generic to formal singular generic The smartphone.' },
      ],
    },
    {
      id: 'grammar-v2-b2-articles-shared-reference-25-q10',
      kind: 'transform',
      prompt: 'Change from physical building visit to institutional inmate status: "He was escorted into the prison by armed guards to begin his five-year sentence."',
      options: [],
      acceptedAnswers: [
        { text: 'He was sent to prison to begin his five-year sentence.', rationale: 'Replaces into the prison with to prison to express institutional conviction.' },
        { text: 'He was sent to prison for five years.', rationale: 'Concise institutional phrasing.' },
      ],
    },
    {
      id: 'grammar-v2-b2-articles-shared-reference-25-q11',
      kind: 'correction',
      prompt: 'Correct the error in article usage for musical instruments: "He has been practicing piano for two hours every evening."',
      options: [],
      acceptedAnswers: [
        { text: 'He has been practicing the piano for two hours every evening.', rationale: 'Inserts definite article the before musical instrument piano.' },
      ],
    },
    {
      id: 'grammar-v2-b2-articles-shared-reference-25-q12',
      kind: 'correction',
      prompt: 'Correct the article error: "We must learn to live in harmony with the nature rather than exploiting it."',
      options: [],
      acceptedAnswers: [
        { text: 'We must learn to live in harmony with nature rather than exploiting it.', rationale: 'Removes erroneous definite article the before abstract nature.' },
      ],
    },
  ],
  reviewExercises: [
    {
      id: 'grammar-v2-b2-articles-shared-reference-25-r1',
      kind: 'choice',
      prompt: 'Select the sentence that conforms to standard academic conventions regarding article usage:',
      options: [
        { text: 'The printing press accelerated the dissemination of scientific treatises across Europe.', correct: true, rationale: 'The printing press correctly uses the generic singular for a technological invention.' },
        { text: 'A printing press accelerated the dissemination of scientific treatises across Europe.', correct: false, rationale: 'A printing press refers to a single individual machine rather than the technology.' },
        { text: 'Printing press accelerated the dissemination of scientific treatises across Europe.', correct: false, rationale: 'Singular countable noun cannot stand without a determiner.' },
      ],
      acceptedAnswers: [{ text: 'The printing press accelerated the dissemination of scientific treatises across Europe.', rationale: 'The printing press accurately represents the technology as a generic entity.' }],
    },
    {
      id: 'grammar-v2-b2-articles-shared-reference-25-r2',
      kind: 'gap',
      prompt: 'Fill in the correct article (the or write "zero"): "After graduating from high school, both siblings enrolled at _____ university in Edinburgh."',
      options: [],
      acceptedAnswers: [{ text: 'zero', rationale: 'At university takes zero article when referring to tertiary study.' }, { text: 'Ø', rationale: 'Zero article symbol.' }],
    },
    {
      id: 'grammar-v2-b2-articles-shared-reference-25-r3',
      kind: 'transform',
      prompt: 'Rewrite using zero article for institutional purpose: "The injured firefighter was admitted to the hospital for emergency surgery."',
      options: [],
      acceptedAnswers: [
        { text: 'The injured firefighter was admitted to hospital for emergency surgery.', rationale: 'Removes the before hospital in British English for patient admission.' },
      ],
    },
    {
      id: 'grammar-v2-b2-articles-shared-reference-25-r4',
      kind: 'correction',
      prompt: 'Correct the sentence: "Astronauts aboard the space station conducted experiments in the zero gravity."',
      options: [],
      acceptedAnswers: [
        { text: 'Astronauts aboard the space station conducted experiments in zero gravity.', rationale: 'Removes the before non-count scientific state zero gravity.' },
      ],
    },
  ],
  outputPrompts: [
    {
      id: 'grammar-v2-b2-articles-shared-reference-25-o1',
      prompt: 'Viết 1-2 câu học thuật về tác động của một phát minh công nghệ đối với xã hội, sử dụng cấu trúc "the + singular noun" cho phát minh và "society" không có mạo từ.',
      modelAnswer: 'The steam engine transformed industrial manufacturing and redefined how human society organized labor. Modern historians agree that the locomotive catalyzed economic integration across entire continents.',
      checks: [
        'Dùng "the + singular noun" (The steam engine, the locomotive) cho phát minh mang tính khái quát.',
        'Dùng "society" ở nghĩa toàn thể không có mạo từ "the".',
        'Văn phong học thuật, chính xác.',
      ],
    },
    {
      id: 'grammar-v2-b2-articles-shared-reference-25-o2',
      prompt: 'Viết 1-2 câu tiếng Anh-Anh phân biệt việc một bệnh nhân ở bệnh viện để điều trị (zero article) với việc tới thăm tòa nhà bệnh viện (the hospital).',
      modelAnswer: 'While several injured passengers were rushed to hospital for urgent triage, city building inspectors arrived at the hospital to verify structural integrity.',
      checks: [
        'Sử dụng "to hospital" (zero article) cho người bệnh/nạn nhân tiếp nhận điều trị.',
        'Sử dụng "at the hospital" (có "the") cho người tới thăm hoặc thanh tra tòa nhà.',
        'Câu văn mạch lạc, phân biệt sắc thái rõ nét.',
      ],
    },
  ],
  sources: [
    {
      id: 'cambridge-articles-advanced',
      title: 'Cambridge English Grammar: Advanced uses of articles',
      url: 'https://dictionary.cambridge.org/grammar/british-grammar/articles',
      claims: [
        'The definite article is used for generic reference with singular countable nouns representing inventions, musical instruments, and species.',
        'Zero article is used with some institutional nouns when referring to their primary purpose, especially in British English; usage varies by institution and dialect.',
      ],
      checkedAt: '2026-10-05',
      provenance: 'reference-only',
    },
  ],
  review: {
    status: 'approved',
    mode: 'ai-internal',
    reviewer: 'OpenAI Codex (AI-internal editorial review)',
    reviewedAt: '2026-10-06T00:00:00.000Z',
    summary: 'AI-internal review of teaching content, controlled and transfer exercises, output prompts, and reference claims; corrected ambiguity and overgeneralized rules.',
    checks: { originalProse: true, factualExplanation: true, clearContrasts: true, singleCorrectChoice: true, validTransferExercises: true, soundOutputPrompts: true, referenceOnlySources: true },
  },
};

export default lesson;
