/**
 * @file present-modal-deduction.ts
 * @description Lesson: Động từ khuyết thiếu suy đoán ở hiện tại (Present Modal Deduction).
 */
import type { GrammarLesson } from '../../types.js';

const lesson: GrammarLesson = {
  id: 'grammar-v2-b2-present-modal-deduction-11',
  revisionId: 'grammar-v2-b2-present-modal-deduction-11@1.0.0',
  revision: '1.0.0',
  title: 'Động từ khuyết thiếu suy đoán ở hiện tại (Present Modal Deduction)',
  objective: 'Nắm vững cách sử dụng các modal verbs (must, can\'t, couldn\'t, may, might, could) kết hợp với động từ nguyên mẫu hoặc V-ing để đưa ra phán đoán logic về các sự việc, trạng thái ở hiện tại dựa trên bằng chứng cụ thể.',
  prerequisiteIds: ['grammar-v2-b2-if-only-would-10'],
  coverage: ['present-modal-deduction', 'must-be', 'cant-be', 'could-might-be', 'logical-deduction', 'b2-grammar'],
  context: {
    english: 'Examining the forensic blood spatters and uninterrupted security footage, Detective Vance remarked: "The burglar must know the vault combination; there are no signs of forced entry, and it can\'t be an opportunistic outsider."',
    vietnamese: 'Xem xét các vết máu pháp y và cảnh quay an ninh liên tục, Thám tử Vance nhận xét: "Kẻ trộm chắc chắn phải biết mật mã két sắt; không hề có dấu vết cạy phá, và đó tuyệt đối không thể là một kẻ ngoài cuộc tiện tay trộm cắp."',
  },
  guide: {
    pattern: 'S + must / can\'t / couldn\'t / may / might / could + V-bare (hoặc be + V-ing)',
    whenToUse: [
      'Dùng "must" để đưa ra suy luận khẳng định mạnh dựa trên bằng chứng.',
      'Dùng "cannot" hoặc "could not" để nói điều gì đó khó hoặc không thể đúng theo đánh giá của người nói.',
      'Dùng "may", "might" hoặc "could" để nêu khả năng chưa chắc chắn; sắc thái tùy ngữ cảnh.',
      'Suy đoán hành động đang diễn ra: dùng "modal + be + V-ing" (ví dụ: He must be sleeping).',
    ],
    signalWords: ['surely', 'there is no doubt', 'it is impossible that', 'perhaps', 'it is likely', 'look at the evidence'],
    check: [
      'Để phủ định suy đoán của "must", đã dùng "can\'t" thay vì "mustn\'t" chưa? (mustn\'t = cấm đoán, không phải suy đoán phủ định).',
      'Động từ sau modal verb có ở dạng nguyên mẫu không "to" không?',
      'Trường hợp hành động đang tiếp diễn ở hiện tại có dùng "be + V-ing" không?',
    ],
  },
  explanation: 'Suy đoán logic ở hiện tại dựa trên mức độ bằng chứng và đánh giá của người nói. Must thường nêu suy luận khẳng định mạnh; cannot/could not thường nêu suy luận phủ định mạnh; may/might/could nêu khả năng chưa chắc chắn. Không có tỷ lệ phần trăm cố định cho các modal. Must not thường diễn đạt sự cấm đoán hoặc không được phép, vì vậy khi muốn phủ định một suy luận thường dùng cannot hoặc could not.',
  examples: [
    {
      english: 'The laboratory lights are switched off and the doors are bolted; the researchers must be at the faculty dinner.',
      vietnamese: 'Đèn phòng thí nghiệm đã tắt và cửa đã cài then; các nhà nghiên cứu chắc hẳn đang ở bữa tiệc tối của khoa.',
    },
    {
      english: 'He only earns an entry-level intern salary; he can\'t be buying that luxury sports vehicle with his own money.',
      vietnamese: 'Cậu ta chỉ nhận mức lương thực tập sinh mới vào nghề; cậu ta không thể nào mua chiếc xe thể thao hạng sang đó bằng tiền tự kiếm được.',
    },
    {
      english: 'The server response times are sluggish today; the network could be undergoing a distributed denial-of-service attack.',
      vietnamese: 'Thời gian phản hồi máy chủ hôm nay rất chậm chạp; mạng lưới có thể đang chịu một đợt tấn công từ chối dịch vụ phân tán.',
    },
    {
      english: 'She is not answering her direct office line; she might be presenting quarterly targets to executive clients.',
      vietnamese: 'Cô ấy không nghe máy bàn cơ quan; có lẽ cô ấy đang thuyết trình về mục tiêu quý cho các khách hàng cấp cao.',
    },
    {
      english: 'That fragile structure can\'t be an authentic Roman aqueduct; the mortar exhibits modern chemical additives.',
      vietnamese: 'Công trình mỏng manh đó chắc chắn không thể là máng dẫn nước La Mã cổ đại đích thực; vữa xây có chứa các chất phụ gia hóa học hiện đại.',
    },
    {
      english: 'Why is David carrying two heavy umbrellas? It must be pouring with rain outside.',
      vietnamese: 'Tại sao David lại mang theo hai chiếc ô lớn thế kia? Chắc hẳn bên ngoài trời đang mưa tầm tã.',
    },
  ],
  contrasts: [
    {
      form: 'can\'t be vs mustn\'t be',
      whyFits: '"That can\'t be Arthur; Arthur is on sabbatical in Melbourne" đưa ra phán đoán phủ định dựa trên logic thực tế (không thể nào là Arthur).',
      whyNot: '\"That mustn\'t be Arthur\" thường được hiểu là không được phép là Arthur, nên không tự nhiên để nêu suy luận phủ định; trong ngữ cảnh này dùng can\'t.',
    },
    {
      form: 'must be vs may/might be',
      whyFits: '"She must have the master keys because only the keyholder can enter" khẳng định sự chắc chắn tuyệt đối dựa trên sự thật hiển nhiên.',
      whyNot: '"She might have the master keys" chỉ nêu một giả định 50/50 chưa có căn cứ vững chắc, làm suy yếu tính xác thực của suy luận logic.',
    },
  ],
  commonMistakes: [
    'Dùng mustn\'t thay cho can\'t trong suy đoán phủ định: viết "He mustn\'t be rich" thay vì "He can\'t be rich".',
    'Dùng can thay vì could/may/might trong suy đoán khả năng một trường hợp cụ thể: viết "The train can be delayed" thay vì "The train could/might be delayed" (can dùng cho khả năng chung mang tính quy luật).',
    'Quên dạng be + V-ing khi suy đoán hành động đang diễn ra: viết "He must sleep right now" thay vì "He must be sleeping right now".',
  ],
  summary: 'Must (suy luận khẳng định mạnh), cannot/could not (suy luận phủ định mạnh), may/might/could (khả năng) dùng để suy đoán hiện tại; sắc thái phụ thuộc ngữ cảnh. Must not thường diễn đạt cấm đoán, nên cannot/could not thường phù hợp hơn cho suy luận phủ định.',
  exercises: [
    {
      id: 'grammar-v2-b2-present-modal-deduction-11-q1',
      kind: 'choice',
      prompt: 'Look at the thick frost covering all vehicle windows; the temperature outside ___ well below freezing point.',
      options: [
        { text: 'must be', correct: true, rationale: 'Bằng chứng sương muối đóng băng dày đặc cho thấy nhiệt độ chắc chắn đang dưới 0 độ (must be).' },
        { text: 'can be', correct: false, rationale: 'Can không dùng để suy đoán một sự việc cụ thể đang diễn ra.' },
        { text: 'mustn\'t be', correct: false, rationale: 'mustn\'t mang nghĩa cấm đoán, không dùng trong suy đoán.' },
      ],
      acceptedAnswers: [{ text: 'must be', rationale: 'must be thể hiện suy đoán logic chắc chắn dựa trên bằng chứng sương băng.' }],
    },
    {
      id: 'grammar-v2-b2-present-modal-deduction-11-q2',
      kind: 'choice',
      prompt: 'Choose the strongest negative deduction consistent with the evidence: That woman walking across the lobby ___ our new chief executive; she is currently addressing a symposium in Tokyo.',
      options: [
        { text: 'can\'t be', correct: true, rationale: 'Người đó đang ở Tokyo nên người ở sảnh chắc chắn không thể nào là tổng giám đốc (can\'t be).' },
        { text: 'mustn\'t be', correct: false, rationale: 'mustn\'t mang nghĩa cấm đoán, hoàn toàn sai ngữ pháp trong suy đoán logic.' },
        { text: 'might not be', correct: false, rationale: 'might not chỉ mức độ không chắc chắn, trong khi chứng cứ ở Tokyo chứng minh sự bất khả thi 100%.' },
      ],
      acceptedAnswers: [{ text: 'can\'t be', rationale: 'can\'t be khẳng định sự bất khả thi dựa trên chứng cứ chắc chắn.' }],
    },
    {
      id: 'grammar-v2-b2-present-modal-deduction-11-q3',
      kind: 'choice',
      prompt: 'I cannot locate Dr. Sterling in the faculty lounge; she ___ consultations in the clinic right now.',
      options: [
        { text: 'might be conducting', correct: true, rationale: 'Suy đoán về một hành động có thể đang tiếp diễn dùng might be conducting.' },
        { text: 'can conduct', correct: false, rationale: 'Không dùng can trong suy đoán sự việc cụ thể và thiếu dạng tiếp diễn.' },
        { text: 'must have conducted', correct: false, rationale: 'must have conducted là suy đoán quá khứ, không phù hợp với right now.' },
      ],
      acceptedAnswers: [{ text: 'might be conducting', rationale: 'might be conducting thể hiện khả năng hành động đang tiếp diễn.' }],
    },
    {
      id: 'grammar-v2-b2-present-modal-deduction-11-q4',
      kind: 'choice',
      prompt: 'Which sentence uses must not where the intended meaning is negative deduction?',
      options: [
        { text: 'He has not eaten anything since sunrise; he must not be hungry.', correct: true, rationale: 'Must not can express prohibition, but not the intended negative deduction; the evidence would normally support must be hungry.' },
        { text: 'He hasn\'t eaten anything since sunrise; he must be ravenous.', correct: false, rationale: 'Câu này đúng ngữ pháp và logic (chắc hẳn rất đói).' },
        { text: 'The door is locked from the inside; somebody must be inside.', correct: false, rationale: 'Câu này suy đoán logic chuẩn xác.' },
      ],
      acceptedAnswers: [{ text: 'He has not eaten anything since sunrise; he must not be hungry.', rationale: 'Must not is not the usual form for negative deduction; use a context that supports cannot or could not.' }],
    },
    {
      id: 'grammar-v2-b2-present-modal-deduction-11-q5',
      kind: 'gap',
      prompt: 'The patient\'s vital signs are fully stabilized; she ___ (not be) in critical danger anymore.',
      options: [],
      acceptedAnswers: [
        { text: 'can\'t be', rationale: 'can\'t be khẳng định sự bất khả thi ở hiện tại dựa trên chỉ số sinh tồn ổn định.' },
        { text: 'cannot be', rationale: 'cannot be là dạng đầy đủ trang trọng của can\'t be.' },
        { text: 'couldn\'t be', rationale: 'couldn\'t be cũng được dùng để phủ định suy đoán chắc chắn.' },
      ],
    },
    {
      id: 'grammar-v2-b2-present-modal-deduction-11-q6',
      kind: 'gap',
      prompt: 'Listen to that violin melody; Sarah ___ (practice) in the music conservatory right now.',
      options: [],
      acceptedAnswers: [
        { text: 'must be practicing', rationale: 'must be practicing suy đoán hành động chắc chắn đang diễn ra (chính tả Mỹ).' },
        { text: 'must be practising', rationale: 'must be practising suy đoán hành động chắc chắn đang diễn ra (chính tả Anh).' },
      ],
    },
    {
      id: 'grammar-v2-b2-present-modal-deduction-11-q7',
      kind: 'gap',
      prompt: 'I am not certain where the legal files are, but they ___ (be) in the senior partner\'s archive cabinet.',
      options: [],
      acceptedAnswers: [
        { text: 'could be', rationale: 'could be thể hiện khả năng 50/50 ở hiện tại.' },
        { text: 'might be', rationale: 'might be thể hiện khả năng có thể ở hiện tại.' },
        { text: 'may be', rationale: 'may be thể hiện khả năng ở hiện tại.' },
      ],
    },
    {
      id: 'grammar-v2-b2-present-modal-deduction-11-q8',
      kind: 'gap',
      prompt: 'The young intern has only lived in England for three weeks; he ___ (not speak) British idioms with native fluency yet.',
      options: [],
      acceptedAnswers: [
        { text: 'can\'t speak', rationale: 'can\'t speak khẳng định điều bất khả thi dựa trên thời gian 3 tuần.' },
        { text: 'cannot speak', rationale: 'cannot speak là dạng trang trọng của can\'t speak.' },
      ],
    },
    {
      id: 'grammar-v2-b2-present-modal-deduction-11-q9',
      kind: 'transform',
      prompt: 'I am 100% sure that this diamond necklace is an imitation because it scratches easily. -> This diamond necklace ___ an authentic gemstone because it scratches easily.',
      options: [],
      acceptedAnswers: [
        { text: 'can\'t be', rationale: 'Dùng can\'t be để diễn tả sự chắc chắn phủ định.' },
        { text: 'cannot be', rationale: 'Dạng đầy đủ của can\'t be.' },
      ],
    },
    {
      id: 'grammar-v2-b2-present-modal-deduction-11-q10',
      kind: 'transform',
      prompt: 'It is almost certain that the engineers are testing the high-speed locomotive on track four. -> The engineers ___ the high-speed locomotive on track four.',
      options: [],
      acceptedAnswers: [
        { text: 'must be testing', rationale: 'Dùng must be testing để suy đoán hành động chắc chắn đang tiếp diễn.' },
      ],
    },
    {
      id: 'grammar-v2-b2-present-modal-deduction-11-q11',
      kind: 'correction',
      prompt: 'Sửa lỗi dùng mustn\'t trong suy đoán phủ định: "His telephone is switched off and his curtains are drawn; he mustn\'t be at home."',
      options: [],
      acceptedAnswers: [
        { text: 'His telephone is switched off and his curtains are drawn; he can\'t be at home.', rationale: 'Thay "mustn\'t be" bằng "can\'t be" vì trong suy đoán logic không dùng mustn\'t.' },
        { text: 'His telephone is switched off and his curtains are drawn; he cannot be at home.', rationale: 'Dạng trang trọng cannot be.' },
      ],
    },
    {
      id: 'grammar-v2-b2-present-modal-deduction-11-q12',
      kind: 'correction',
      prompt: 'Rewrite the sentence as a tentative deduction about this particular flight, using a modal of possibility: "The flight is not listed on the monitor; it can be cancelled."',
      options: [],
      acceptedAnswers: [
        { text: 'The flight is not listed on the monitor; it may be cancelled.', rationale: 'Dùng may/might/could để diễn đạt khả năng của một sự việc cụ thể thay vì can.' },
        { text: 'The flight is not listed on the monitor; it might be cancelled.', rationale: 'Dùng might be cancelled.' },
        { text: 'The flight is not listed on the monitor; it could be cancelled.', rationale: 'Dùng could be cancelled.' },
      ],
    },
  ],
  reviewExercises: [
    {
      id: 'grammar-v2-b2-present-modal-deduction-11-r1',
      kind: 'choice',
      prompt: 'Professor Evans has published twenty books on medieval literature; he ___ one of the foremost scholars in the country.',
      options: [
        { text: 'must be', correct: true, rationale: 'Dựa trên thành tích 20 cuốn sách, suy đoán chắc chắn là must be.' },
        { text: 'can be', correct: false, rationale: 'Can không dùng cho suy đoán logic khẳng định.' },
        { text: 'should have been', correct: false, rationale: 'should have been chỉ sự việc trong quá khứ hoặc tiếc nuối, không suy đoán hiện tại.' },
      ],
      acceptedAnswers: [{ text: 'must be', rationale: 'must be thể hiện suy đoán chắc chắn ở hiện tại.' }],
    },
    {
      id: 'grammar-v2-b2-present-modal-deduction-11-r2',
      kind: 'gap',
      prompt: 'The shop windows are completely dark and shuttered; they ___ (not be) open for business today.',
      options: [],
      acceptedAnswers: [
        { text: 'can\'t be', rationale: 'can\'t be thể hiện sự chắc chắn phủ định cửa hàng không mở cửa.' },
        { text: 'cannot be', rationale: 'Dạng trang trọng cannot be.' },
      ],
    },
    {
      id: 'grammar-v2-b2-present-modal-deduction-11-r3',
      kind: 'transform',
      prompt: 'Perhaps the delivery courier is stuck in morning commuter traffic. -> The delivery courier ___ in morning commuter traffic.',
      options: [],
      acceptedAnswers: [
        { text: 'could be stuck', rationale: 'Dùng could be stuck để diễn tả khả năng có lẽ.' },
        { text: 'might be stuck', rationale: 'Dùng might be stuck để diễn tả phỏng đoán có thể.' },
        { text: 'may be stuck', rationale: 'Dùng may be stuck để diễn tả phỏng đoán.' },
      ],
    },
    {
      id: 'grammar-v2-b2-present-modal-deduction-11-r4',
      kind: 'correction',
      prompt: 'Sửa lỗi cấu trúc: "Look at the smoke coming from the chimney; somebody must live in that cabin right now."',
      options: [],
      acceptedAnswers: [
        { text: 'Look at the smoke coming from the chimney; somebody must be living in that cabin right now.', rationale: 'Khi suy đoán hành động đang diễn ra tại thời điểm nói (right now), phải dùng thì tiếp diễn: must be living.' },
        { text: 'Look at the smoke coming from the chimney; somebody must be in that cabin right now.', rationale: 'Dạng rút gọn tĩnh từ: must be in that cabin.' },
      ],
    },
  ],
  outputPrompts: [
    {
      id: 'grammar-v2-b2-present-modal-deduction-11-o1',
      prompt: 'Viết 2 câu tiếng Anh ngắn đưa ra suy đoán về một tình huống ở văn phòng: 1 câu dùng "must be" (chắc hẳn là) và 1 câu dùng "can\'t be" (chắc chắn không thể nào) dựa trên các chứng cứ quan sát được.',
      modelAnswer: 'The managing director\'s laptop is still open on her desk, so she must be in a meeting nearby. However, she can\'t be traveling abroad today because her passport is lying right next to the keyboard.',
      checks: [
        'Một câu sử dụng cấu trúc must be kèm chứng cứ logic',
        'Một câu sử dụng cấu trúc can\'t be (tuyệt đối không dùng mustn\'t)',
        'Bối cảnh văn phòng rõ ràng, liên kết mạch lạc',
      ],
    },
    {
      id: 'grammar-v2-b2-present-modal-deduction-11-o2',
      prompt: 'Viết 1 câu tiếng Anh suy đoán về một hành động đang diễn ra hiện tại sử dụng cấu trúc "modal verb + be + V-ing" (ví dụ: might be doing / must be presenting).',
      modelAnswer: 'The laboratory doors are locked and the warning light is blinking, so the scientists must be conducting a hazardous chemical experiment inside.',
      checks: [
        'Sử dụng cấu trúc modal verb + be + V-ing',
        'Đưa ra bằng chứng quan sát thực tế (warning light, locked door...)',
        'Ngữ pháp chuẩn xác, tự nhiên',
      ],
    },
  ],
  sources: [
    {
      id: 'cambridge-modals-deduction',
      title: 'Cambridge Grammar: Modals - deduction (must, can\'t, may, might)',
      url: 'https://dictionary.cambridge.org/grammar/british-grammar/modals-deduction',
      claims: ['Must commonly expresses strong positive deduction, while cannot commonly expresses negative deduction; must not is normally deontic rather than the usual negative epistemic form.'],
      checkedAt: '2026-10-05',
      provenance: 'reference-only',
    },
    {
      id: 'bc-modals-deduction-present',
      title: 'British Council: Modals of deduction (present)',
      url: 'https://learnenglish.britishcouncil.org/grammar/b1-b2-grammar/modals-deduction-present',
      claims: ['Details certainty distinctions between must, can\'t, could, may, might in present deduction scenarios.'],
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
