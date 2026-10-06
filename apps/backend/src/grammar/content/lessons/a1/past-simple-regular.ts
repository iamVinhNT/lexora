/**
 * @file past-simple-regular.ts
 * @description Thì quá khứ đơn với động từ có quy tắc: quy tắc thêm đuôi -ed, thể phủ định và nghi vấn với did.
 */
import type { GrammarLesson } from '../../types.js';

const lesson: GrammarLesson = {
  id: 'grammar-v2-a1-past-simple-regular-18',
  revisionId: 'grammar-v2-a1-past-simple-regular-18@1.0.0',
  revision: '1.0.0',
  title: 'Quá khứ đơn: Động từ có quy tắc và trợ động từ Did',
  objective: 'Thành lập và sử dụng chính xác thì quá khứ đơn với các động từ có quy tắc (thêm đuôi -ed), tạo câu phủ định với didn’t và câu hỏi với Did.',
  prerequisiteIds: ['grammar-v2-a1-present-continuous-17'],
  coverage: ['past-simple-regular', 'past-simple', 'regular-verbs', 'ed-endings'],
  context: {
    english: 'Chi shares her trip to Hue last weekend with her classmates, describing visiting historic monuments, walking by the Perfume River, and tasting regional sweets.',
    vietnamese: 'Chi chia sẻ về chuyến đi Huế cuối tuần trước với các bạn cùng lớp, miêu tả việc thăm các di tích lịch sử, dạo bộ bên bờ sông Hương và thưởng thức bánh kẹo địa phương.',
  },
  guide: {
    pattern: 'Khẳng định: S + V-ed; Phủ định: S + did not (didn’t) + V(nguyên mẫu); Câu hỏi: Did + S + V(nguyên mẫu)...?',
    whenToUse: [
      'Diễn tả sự việc hoặc trạng thái ở một thời gian quá khứ đã xác định qua câu hoặc ngữ cảnh; không bắt buộc phải nêu một mốc giờ chính xác.',
      'Kể lại một chuỗi các sự việc, hành động nối tiếp nhau trong quá khứ.',
    ],
    signalWords: ['yesterday', 'last night', 'last week', 'last year', 'two days ago', 'in 2020'],
    check: [
      'Thường thêm -ed; sau e thêm -d; phụ âm + y đổi thành -ied. Với một nguyên âm + một phụ âm cuối ở âm tiết được nhấn, thường nhân đôi phụ âm (stop → stopped, plan → planned), nhưng không nhân đôi w/x/y (snowed, fixed, played).',
      'Trong câu phủ định (didn’t) và câu hỏi (Did), động từ chính bắt buộc đưa về dạng nguyên mẫu không "to".',
    ],
  },
  explanation: 'Thì quá khứ đơn (Past Simple) dùng để diễn đạt các sự việc đã kết thúc trong quá khứ. Với động từ có quy tắc (regular verbs), ta thêm hậu tố -ed vào sau động từ nguyên mẫu ở thể khẳng định cho tất cả các ngôi chủ ngữ mà không phân biệt số ít hay số nhiều (I walked, she walked, they walked). Khi chuyển sang thể phủ định, ta dùng trợ động từ "didn’t" (did not) và đưa động từ chính về dạng nguyên thể. Tương tự trong câu hỏi, ta đảo trợ động từ "Did" lên trước chủ ngữ và động từ chính giữ nguyên thể.',
  examples: [
    { english: 'We visited the Imperial Citadel in Hue last Saturday.', vietnamese: 'Chúng tôi đã thăm Đại Nội Huế vào thứ Bảy tuần trước. (Hành động có mốc thời gian xác định last Saturday, visit thêm -ed).' },
    { english: 'Linh lived in Da Lat for three years before moving to Da Nang.', vietnamese: 'Linh đã sống ở Đà Lạt trong ba năm trước khi chuyển về Đà Nẵng. (Live tận cùng là e nên chỉ thêm -d thành lived).' },
    { english: 'My brother studied hard for his university entrance examination.', vietnamese: 'Anh trai tôi đã học hành chăm chỉ cho kỳ thi tuyển sinh đại học. (Study đổi y thành -ied).' },
    { english: 'The rain stopped completely around ten o’clock yesterday morning.', vietnamese: 'Cơn mưa đã dứt hẳn vào khoảng mười giờ sáng hôm qua. (Stop nhân đôi p thành stopped).' },
    { english: 'I didn’t watch the football match on television last night.', vietnamese: 'Tôi đã không xem trận bóng đá trên ti vi tối qua. (Didn’t + watch nguyên mẫu).' },
    { english: 'Did you clean your room yesterday afternoon? — Yes, I did.', vietnamese: 'Hôm qua bạn đã dọn dẹp phòng chưa? — Vâng, tôi đã dọn rồi. (Did + clean nguyên mẫu).' },
  ],
  contrasts: [
    {
      form: 'I visited my aunt yesterday vs I visit my aunt every Sunday',
      whyFits: 'Visited diễn tả sự việc đã hoàn thành vào ngày hôm qua (yesterday).',
      whyNot: 'Visit ở hiện tại đơn diễn tả thói quen lặp đi lặp lại hàng tuần (every Sunday).',
    },
    {
      form: 'She didn’t call me vs She didn’t called me',
      whyFits: 'Sau trợ động từ quá khứ didn’t, động từ call bắt buộc giữ ở dạng nguyên mẫu.',
      whyNot: 'Dạng "didn’t called" mắc lỗi chia thì hai lần ở cả trợ động từ lẫn động từ chính.',
    },
  ],
  commonMistakes: [
    'Giữ lại đuôi -ed sau trợ động từ did/didn’t: “I didn’t played football” → Cần sửa thành “I didn’t play football”.',
    'Nhầm quy tắc đổi -y: “He plaied guitar” → Cần viết “He played guitar” vì trước y là nguyên âm a nên chỉ thêm -ed.',
    'Quên nhân đôi phụ âm cuối: “She stoped the bus” → Cần viết đúng “She stopped the bus”.',
  ],
  summary: 'Quá khứ đơn có quy tắc: Khẳng định S + V-ed (tất cả các ngôi). Phủ định: S + didn’t + V(nguyên mẫu). Câu hỏi: Did + S + V(nguyên mẫu)? Chú ý: -d sau e, -ied sau phụ âm + y, nhân đôi phụ âm với stop/plan.',
  exercises: [
    {
      id: 'grammar-v2-a1-past-simple-regular-18-q1',
      kind: 'choice',
      prompt: 'Yesterday afternoon, we ___ along the beach for two hours.',
      options: [
        { text: 'walked', correct: true, rationale: 'Yesterday afternoon là mốc thời gian quá khứ, động từ có quy tắc walk thêm -ed thành walked.' },
        { text: 'walk', correct: false, rationale: 'Walk là dạng nguyên thể hiện tại.' },
        { text: 'walking', correct: false, rationale: 'Walking cần có to be đi kèm trong thì tiếp diễn.' },
      ],
      acceptedAnswers: [{ text: 'walked', rationale: 'Walked là dạng quá khứ đơn có quy tắc của walk.' }],
    },
    {
      id: 'grammar-v2-a1-past-simple-regular-18-q2',
      kind: 'choice',
      prompt: 'Nam ___ his grandmother in the countryside last weekend.',
      options: [
        { text: 'visited', correct: true, rationale: 'Last weekend là trạng từ quá khứ, visit thêm -ed thành visited.' },
        { text: 'visitted', correct: false, rationale: 'Visit trọng âm rơi vào âm tiết đầu nên không nhân đôi chữ t.' },
        { text: 'visits', correct: false, rationale: 'Visits là thì hiện tại đơn ngôi thứ ba số ít.' },
      ],
      acceptedAnswers: [{ text: 'visited', rationale: 'Visited thêm đuôi -ed theo đúng quy tắc chính tả.' }],
    },
    {
      id: 'grammar-v2-a1-past-simple-regular-18-q3',
      kind: 'choice',
      prompt: 'She ___ the movie last night because she had to finish her report.',
      options: [
        { text: 'didn’t watch', correct: true, rationale: 'Thể phủ định quá khứ đơn dùng didn’t + động từ nguyên mẫu watch.' },
        { text: 'didn’t watched', correct: false, rationale: 'Sai ngữ pháp vì không giữ đuôi -ed sau trợ động từ didn’t.' },
        { text: 'doesn’t watch', correct: false, rationale: 'Doesn’t watch là thì hiện tại đơn, không phù hợp với mốc last night.' },
      ],
      acceptedAnswers: [{ text: 'didn’t watch', rationale: 'Didn’t watch tuân thủ cấu trúc didn’t + V nguyên mẫu.' }],
    },
    {
      id: 'grammar-v2-a1-past-simple-regular-18-q4',
      kind: 'choice',
      prompt: '___ you close the windows before leaving the office yesterday?',
      options: [
        { text: 'Did', correct: true, rationale: 'Câu hỏi quá khứ đơn dùng trợ động từ Did cho tất cả các ngôi.' },
        { text: 'Do', correct: false, rationale: 'Do là trợ động từ hiện tại đơn.' },
        { text: 'Were', correct: false, rationale: 'Were không dùng trước động từ nguyên mẫu close.' },
      ],
      acceptedAnswers: [{ text: 'Did', rationale: 'Did là trợ động từ câu hỏi ở thì quá khứ đơn.' }],
    },
    {
      id: 'grammar-v2-a1-past-simple-regular-18-q5',
      kind: 'gap',
      prompt: 'The bus ___ (stop) at the intersection three minutes ago.',
      options: [],
      acceptedAnswers: [
        { text: 'stopped', rationale: 'Stop là động từ 1 âm tiết có phụ âm-nguyên âm-phụ âm nên nhân đôi p thành stopped.' },
      ],
    },
    {
      id: 'grammar-v2-a1-past-simple-regular-18-q6',
      kind: 'gap',
      prompt: 'Hanh ___ (study) Japanese for six months last year.',
      options: [],
      acceptedAnswers: [
        { text: 'studied', rationale: 'Study có phụ âm trước y nên đổi y thành -ied thành studied.' },
      ],
    },
    {
      id: 'grammar-v2-a1-past-simple-regular-18-q7',
      kind: 'gap',
      prompt: 'I ___ (not / listen) to the radio yesterday morning.',
      options: [],
      acceptedAnswers: [
        { text: 'didn’t listen', rationale: 'Phủ định quá khứ đơn dùng didn’t + động từ nguyên mẫu listen.' },
        { text: 'did not listen', rationale: 'Dạng đầy đủ did not listen hoàn toàn chính xác.' },
      ],
    },
    {
      id: 'grammar-v2-a1-past-simple-regular-18-q8',
      kind: 'gap',
      prompt: 'Did they ___ (arrive) at the airport on time yesterday? (arrive / arrived)',
      options: [],
      acceptedAnswers: [
        { text: 'arrive', rationale: 'Sau trợ động từ Did, động từ giữ nguyên mẫu arrive.' },
      ],
    },
    {
      id: 'grammar-v2-a1-past-simple-regular-18-q9',
      kind: 'transform',
      prompt: 'Chuyển câu sau sang thể phủ định ở thì quá khứ đơn: "They cleaned their house yesterday."',
      options: [],
      acceptedAnswers: [
        { text: 'They didn’t clean their house yesterday.', rationale: 'Mượn didn’t và đưa cleaned về nguyên mẫu clean.' },
        { text: 'They did not clean their house yesterday.', rationale: 'Dạng đầy đủ did not clean cũng chính xác.' },
      ],
    },
    {
      id: 'grammar-v2-a1-past-simple-regular-18-q10',
      kind: 'transform',
      prompt: 'Chuyển câu sau sang câu hỏi nghi vấn Yes/No: "Minh painted the front door last Sunday."',
      options: [],
      acceptedAnswers: [
        { text: 'Did Minh paint the front door last Sunday?', rationale: 'Đảo trợ động từ Did lên đầu câu và chuyển painted về nguyên mẫu paint.' },
      ],
    },
    {
      id: 'grammar-v2-a1-past-simple-regular-18-q11',
      kind: 'correction',
      prompt: 'Sửa lỗi sai duy nhất trong câu sau: "We didn’t played tennis yesterday afternoon."',
      options: [],
      acceptedAnswers: [
        { text: 'We didn’t play tennis yesterday afternoon.', rationale: 'Đưa played về nguyên mẫu play sau trợ động từ didn’t.' },
        { text: 'We did not play tennis yesterday afternoon.', rationale: 'Dạng đầy đủ did not play cũng đúng.' },
      ],
    },
    {
      id: 'grammar-v2-a1-past-simple-regular-18-q12',
      kind: 'correction',
      prompt: 'Sửa lỗi sai chính tả duy nhất trong câu sau: "They planed a wonderful surprise party for Sarah last month."',
      options: [],
      acceptedAnswers: [
        { text: 'They planned a wonderful surprise party for Sarah last month.', rationale: 'Plan nhân đôi n trước khi thêm -ed thành planned.' },
      ],
    },
  ],
  reviewExercises: [
    {
      id: 'grammar-v2-a1-past-simple-regular-18-r1',
      kind: 'choice',
      prompt: 'David ___ the guitar when he was in high school.',
      options: [
        { text: 'played', correct: true, rationale: 'Play có nguyên âm trước y nên chỉ thêm -ed thành played.' },
        { text: 'plaied', correct: false, rationale: 'Sai chính tả; chỉ đổi sang -ied khi trước y là phụ âm.' },
        { text: 'plays', correct: false, rationale: 'Plays là thì hiện tại đơn, không phù hợp mốc when he was in high school.' },
      ],
      acceptedAnswers: [{ text: 'played', rationale: 'Played thêm đuôi -ed theo đúng quy tắc chính tả.' }],
    },
    {
      id: 'grammar-v2-a1-past-simple-regular-18-r2',
      kind: 'gap',
      prompt: 'We ___ (live) in that small house near the river five years ago.',
      options: [],
      acceptedAnswers: [
        { text: 'lived', rationale: 'Live tận cùng là e nên chỉ thêm -d thành lived.' },
      ],
    },
    {
      id: 'grammar-v2-a1-past-simple-regular-18-r3',
      kind: 'transform',
      prompt: 'Chuyển cả câu sang quá khứ đơn, thêm yesterday ở cuối câu: "She cooks dinner for the family."',
      options: [],
      acceptedAnswers: [
        { text: 'She cooked dinner for the family yesterday.', rationale: 'Cooks chuyển thành cooked và thêm yesterday ở cuối câu.' },
      ],
    },
    {
      id: 'grammar-v2-a1-past-simple-regular-18-r4',
      kind: 'correction',
      prompt: 'Sửa lỗi sai duy nhất trong câu sau: "Did you finished your math project last night?"',
      options: [],
      acceptedAnswers: [
        { text: 'Did you finish your math project last night?', rationale: 'Finished đưa về nguyên mẫu finish sau trợ động từ Did.' },
      ],
    },
  ],
  outputPrompts: [
    {
      id: 'grammar-v2-a1-past-simple-regular-18-o1',
      prompt: 'Viết 4 câu kể về những hoạt động bạn đã làm vào ngày hôm qua, sử dụng các động từ có quy tắc (như cleaned, watched, walked, cooked, studied, listened).',
      modelAnswer: 'Yesterday, I walked to the park in the morning. I cleaned my bedroom in the afternoon. In the evening, I cooked dinner for my parents. Before going to bed, I watched a short documentary.',
      checks: [
        'Sử dụng ít nhất 3 động từ có quy tắc chia đúng đuôi -ed.',
        'Sử dụng các từ nối hoặc mốc thời gian quá khứ rõ ràng (Yesterday, in the morning, in the evening).',
        'Cấu trúc câu khẳng định quá khứ đơn chính xác.',
      ],
    },
    {
      id: 'grammar-v2-a1-past-simple-regular-18-o2',
      prompt: 'Viết một đoạn hội thoại ngắn 3-4 câu giữa hai người bạn hỏi thăm nhau về ngày cuối tuần vừa qua, sử dụng câu hỏi với Did và câu phủ định với didn’t.',
      modelAnswer: 'Lan: Did you watch the football match on Saturday?\nTuan: No, I didn’t. I visited my grandparents in the countryside.\nLan: Did you stay there all weekend?\nTuan: Yes, we played board games and enjoyed the fresh air.',
      checks: [
        'Có câu hỏi với Did + V nguyên mẫu.',
        'Có câu trả lời phủ định với didn’t.',
        'Có câu khẳng định với động từ có quy tắc đuôi -ed.',
      ],
    },
  ],
  sources: [
    {
      "id": "past",
      "title": "British Council: Past simple",
      "url": "https://learnenglish.britishcouncil.org/free-resources/grammar/english-grammar-reference/past-simple",
      "claims": [
        "Past simple uses regular -ed or irregular forms; did questions and did not negatives use the base verb."
      ],
      "checkedAt": "2026-10-06",
      "provenance": "reference-only"
    }
  ],
  review: {
    status: 'approved',
    mode: 'ai-internal',
    reviewer: 'Lexora internal AI editorial reviewers; main assistant source verification',
    reviewedAt: "2026-10-06T15:30:39.729Z",
    summary: 'Independent internal-AI prose/exercise review completed; cited reference claims checked on publisher pages. No human-expert or CEFR certification.',
  },
};

export default lesson;
