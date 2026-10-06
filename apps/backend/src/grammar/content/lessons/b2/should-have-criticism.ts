/**
 * @file should-have-criticism.ts
 * @description Lesson: Should have & Ought to have diễn tả sự chỉ trích và hối tiếc (Criticism and Past Obligation).
 */
import type { GrammarLesson } from '../../types.js';

const lesson: GrammarLesson = {
  id: 'grammar-v2-b2-should-have-criticism-15',
  revisionId: 'grammar-v2-b2-should-have-criticism-15@1.0.0',
  revision: '1.0.0',
  title: 'Should have & Ought to have diễn tả sự chỉ trích và hối tiếc (Criticism and Past Obligation)',
  objective: 'Nắm vững cách sử dụng should have + V3/ed và ought to have + V3/ed để diễn đạt lời chỉ trích, khiển trách đối với sai lầm của người khác hoặc bày tỏ sự ân hận, nuối tiếc sâu sắc về việc đã không làm một điều đúng đắn trong quá khứ.',
  prerequisiteIds: ['grammar-v2-b2-need-not-have-vs-did-not-need-14'],
  coverage: ['should-have-done', 'ought-to-have-done', 'criticism-regret', 'past-obligation-unfulfilled', 'b2-grammar'],
  context: {
    english: 'Addressing the parliamentary committee on maritime safety, the chief investigator concluded: "The harbor authorities should have closed the shipping channel during the hurricane alert, and the ship\'s captain ought not to have navigated through the narrow shoal with defective radar."',
    vietnamese: 'Phát biểu trước ủy ban nghị viện về an toàn hàng hải, điều tra viên trưởng kết luận: "Lẽ ra chính quyền cảng phải đóng luồng hàng hải trong thời gian cảnh báo bão (thực tế họ ĐÃ KHÔNG ĐÓNG), và thuyền trưởng lẽ ra không được điều hướng qua bãi cạn hẹp với radar bị lỗi (thực tế ông ta ĐÃ ĐIỀU HƯỚNG)."',
  },
  guide: {
    pattern: 'S + should / ought to + have + V3/ed (should have done) | S + should not (shouldn\'t) / ought not to + have + V3/ed',
    whenToUse: [
      'Chỉ trích, phê phán hành vi của người khác trong quá khứ (ví dụ: You should have consulted me first!).',
      'Bày tỏ sự tự trách hoặc nuối tiếc về một quyết định sai lầm của bản thân (ví dụ: I should have studied medicine).',
      'Đánh giá một nghĩa vụ, bổn phận hoặc hành động đúng đắn lẽ ra phải xảy ra nhưng trên thực tế đã bị bỏ lỡ.',
    ],
    signalWords: ['should have done', 'ought to have known', 'shouldn\'t have said', 'ought not to have', 'a terrible mistake'],
    check: [
      'Sau should/ought to có dùng have + V3/ed không? (tránh quên "have" hoặc dùng had/V2).',
      'Phân biệt rõ "should have done" (chỉ trích/nghĩa vụ chưa làm) với "must have done" (suy đoán logic dựa trên chứng cứ).',
      'Cấu trúc phủ định của ought to: "ought not to have + V3" (chú ý vị trí của "to").',
    ],
  },
  explanation: 'Cấu trúc "Should have + V3" và "Ought to have + V3" được sử dụng phổ biến trong giao tiếp thường nhật lẫn văn bản chuyên môn khi đánh giá hồi cố (retrospective evaluation):\n1. KHẲNG ĐỊNH (Should have done / Ought to have done):\n   - Ý nghĩa: Lẽ ra nên làm... (nhưng thực tế ĐÃ KHÔNG LÀM).\n   - Dùng để phê bình người khác vì đã bỏ qua một giải pháp khôn ngoan, hoặc bày tỏ sự tiếc nuối của bản thân vì đã bỏ lỡ một cơ hội tốt.\n   - Ví dụ: "You should have double-checked the flight reservation before leaving for the airport." (Thực tế bạn đã không kiểm tra lại).\n2. PHỦ ĐỊNH (Should not have done / Ought not to have done):\n   - Ý nghĩa: Lẽ ra không nên làm... (nhưng thực tế ĐÃ LÀM).\n   - Dùng để chỉ trích một hành động sai trái, thiếu cân nhắc hoặc gây hậu quả tiêu cực.\n   - Ví dụ: "The doctor shouldn\'t have prescribed that dosage without checking the patient\'s allergy history." (Thực tế bác sĩ đã kê đơn thuốc đó).\n3. SỰ KHÁC BIỆT MẤU CHỐT VỚI MUST HAVE:\n   - Must have done: Suy đoán chắc chắn sự việc đã xảy ra ("He must have arrived by now" - Nhìn hành lý kìa, chắc hẳn anh ấy đã đến).\n   - Should have done: Sự việc ĐÃ KHÔNG XẢY RA, mang tính phán xét luân lý/nghĩa vụ ("He should have arrived by now, but he was held up in traffic" - Lẽ ra anh ấy phải đến rồi nhưng chưa đến).',
  examples: [
    {
      english: 'You should have informed the legal department before signing that binding exclusivity agreement.',
      vietnamese: 'Lẽ ra bạn phải thông báo cho phòng pháp chế trước khi ký thỏa thuận độc quyền mang tính ràng buộc đó (chỉ trích việc đã không thông báo).',
    },
    {
      english: 'The civil engineers ought to have reinforced the retaining wall prior to the torrential monsoon season.',
      vietnamese: 'Lẽ ra các kỹ sư xây dựng phải gia cố bức tường chắn trước mùa mưa lũ xối xả (chỉ trích việc đã bỏ bê gia cố).',
    },
    {
      english: 'I shouldn\'t have shared confidential client metrics in an unencrypted email thread.',
      vietnamese: 'Lẽ ra tôi không nên chia sẻ các số liệu mật của khách hàng trong chuỗi email không mã hóa (tự trách về sai lầm đã phạm phải).',
    },
    {
      english: 'The airline ought not to have overbooked the transatlantic flight during the peak holiday weekend.',
      vietnamese: 'Hãng hàng không lẽ ra không nên bán vé vượt quá số ghế của chuyến bay xuyên Đại Tây Dương trong dịp cuối tuần lễ hội cao điểm.',
    },
    {
      english: 'We should have bought travel insurance before embarking on the high-altitude trek.',
      vietnamese: 'Lẽ ra chúng tôi nên mua bảo hiểm du lịch trước khi dấn thân vào chuyến đi bộ đường dài ở vùng núi cao.',
    },
    {
      english: 'The supervisor shouldn\'t have dismissed the apprentice\'s concerns about faulty brake lines so casually.',
      vietnamese: 'Người giám sát lẽ ra không nên gạt bỏ những lo ngại của học viên về đường dẫn phanh bị lỗi một cách hời hợt như vậy.',
    },
  ],
  contrasts: [
    {
      form: 'should have warned vs must have warned',
      whyFits: '"You should have warned us about the ice on the road" là lời khiển trách gay gắt vì đối phương đã KHÔNG cảnh báo, khiến xe gặp nguy hiểm.',
      whyNot: '"You must have warned us about the ice" là một suy đoán logic (nhìn xe đi chậm thế kia, chắc hẳn bạn đã cảnh báo mọi người rồi), hoàn toàn không mang ý chỉ trích.',
    },
    {
      form: 'should have done vs could have done',
      whyFits: '"He should have helped his elderly neighbor" chỉ trích nghĩa vụ đạo đức mà anh ta đã không hoàn thành.',
      whyNot: '"He could have helped his elderly neighbor" chỉ nêu lên khả năng hoặc cơ hội anh ta có thể giúp (mang tính trung tính, không nặng nề tính trách cứ nghĩa vụ bắt buộc).',
    },
  ],
  commonMistakes: [
    'Dùng should + V-bare khi chỉ trích sự việc trong quá khứ: viết "You should tell me yesterday" thay vì "You should have told me yesterday".',
    'Nhầm vị trí của "to" trong cấu trúc phủ định của ought: viết "ought to not have" hoặc "ought not have to" thay vì "ought not to have done".',
    'Dùng would have thay cho should have khi muốn chỉ trích nghĩa vụ: viết "You would have locked the door" thay vì "You should have locked the door".',
  ],
  summary: 'Should have / Ought to have + V3 diễn tả điều lẽ ra nên làm nhưng không làm (nuối tiếc, chỉ trích). Shouldn\'t have + V3 diễn tả điều lẽ ra không nên làm nhưng đã làm.',
  exercises: [
    {
      id: 'grammar-v2-b2-should-have-criticism-15-q1',
      kind: 'choice',
      prompt: 'The laboratory experiment caught fire because the students neglected safety protocols. The students ___ protective goggles and gloves.',
      options: [
        { text: 'should have worn', correct: true, rationale: 'Chỉ trích hành vi lẽ ra phải làm nhưng thực tế các sinh viên đã không đeo kính bảo hộ (should have worn).' },
        { text: 'must have worn', correct: false, rationale: 'must have worn là suy đoán chắc chắn đã đeo, trái ngược với thực tế thí nghiệm bốc cháy do vi phạm an toàn.' },
        { text: 'should wear', correct: false, rationale: 'should wear là lời khuyên cho hiện tại, không dùng cho sự việc đã xảy ra.' },
      ],
      acceptedAnswers: [{ text: 'should have worn', rationale: 'should have worn thể hiện lời chỉ trích về nghĩa vụ an toàn bị bỏ lỡ.' }],
    },
    {
      id: 'grammar-v2-b2-should-have-criticism-15-q2',
      kind: 'choice',
      prompt: 'You ___ confidential financial data onto an unsecured USB flash drive; that was a severe violation of company security policy.',
      options: [
        { text: 'shouldn\'t have downloaded', correct: true, rationale: 'Chỉ trích một hành động sai trái đã thực hiện trong quá khứ đòi hỏi shouldn\'t have downloaded.' },
        { text: 'mustn\'t download', correct: false, rationale: 'mustn\'t download là điều cấm ở hiện tại, không dùng cho sự việc vi phạm đã xảy ra.' },
        { text: 'needn\'t have downloaded', correct: false, rationale: 'needn\'t have chỉ sự việc vô hại nhưng thừa thãi, không phù hợp với mức độ vi phạm an ninh nghiêm trọng.' },
      ],
      acceptedAnswers: [{ text: 'shouldn\'t have downloaded', rationale: 'shouldn\'t have downloaded thể hiện lời khiển trách về hành vi sai trái đã làm.' }],
    },
    {
      id: 'grammar-v2-b2-should-have-criticism-15-q3',
      kind: 'choice',
      prompt: 'Select the grammatically accurate negative form of "ought to have" expressing past criticism:',
      options: [
        { text: 'The municipal contractors ought not to have cut down the historic oak trees along the boulevard.', correct: true, rationale: 'Cấu trúc phủ định chuẩn mực: ought not to have + V3 (ought not to have cut).' },
        { text: 'The municipal contractors ought to not have cut down the historic oak trees along the boulevard.', correct: false, rationale: 'ought to not have là cách đặt sai vị trí từ "not".' },
        { text: 'The municipal contractors ought not have cut down the historic oak trees along the boulevard.', correct: false, rationale: 'Thiếu giới từ "to" sau ought.' },
      ],
      acceptedAnswers: [{ text: 'The municipal contractors ought not to have cut down the historic oak trees along the boulevard.', rationale: 'ought not to have cut là dạng phủ định chuẩn của ought to have.' }],
    },
    {
      id: 'grammar-v2-b2-should-have-criticism-15-q4',
      kind: 'choice',
      prompt: 'Why is "You must have told me the meeting was moved forward!" inappropriate when reprimanding someone for keeping you in the dark?',
      options: [
        { text: '"Must have told" expresses a logical assumption that you did tell me, whereas "should have told" expresses criticism for not telling me.', correct: true, rationale: 'Must have done là suy đoán logic (chắc hẳn đã nói), trong khi should have done mới là lời trách móc lẽ ra phải nói.' },
        { text: '"Must have" can only be used with third-person singular subjects.', correct: false, rationale: 'Must have đi được với mọi chủ ngữ.' },
        { text: '"Told" is an irregular verb that cannot follow modal auxiliaries.', correct: false, rationale: 'Told là quá khứ phân từ hợp lệ sau have.' },
      ],
      acceptedAnswers: [{ text: '"Must have told" expresses a logical assumption that you did tell me, whereas "should have told" expresses criticism for not telling me.', rationale: 'Phân biệt giữa suy đoán logic và chỉ trích trách nhiệm.' }],
    },
    {
      id: 'grammar-v2-b2-should-have-criticism-15-q5',
      kind: 'gap',
      prompt: 'I am so embarrassed; I ___ (should / not / lose) my temper during yesterday\'s stakeholder consultation.',
      options: [],
      acceptedAnswers: [
        { text: "shouldn't have lost", rationale: 'shouldn\'t have lost thể hiện sự hối hận vì đã mất bình tĩnh trong buổi họp hôm qua.' },
        { text: 'should not have lost', rationale: 'Dạng đầy đủ của shouldn\'t have lost.' },
      ],
    },
    {
      id: 'grammar-v2-b2-should-have-criticism-15-q6',
      kind: 'gap',
      prompt: 'The hospital management ___ (ought / to / sanitize) the operating instruments more thoroughly prior to the surgery.',
      options: [],
      acceptedAnswers: [{ text: 'ought to have sanitized', rationale: 'ought to have sanitized chỉ trích việc lẽ ra phải khử trùng thiết bị kỹ lưỡng hơn.' }],
    },
    {
      id: 'grammar-v2-b2-should-have-criticism-15-q7',
      kind: 'gap',
      prompt: 'You ___ (should / consult) a certified accountant before investing your inheritance in that volatile startup.',
      options: [],
      acceptedAnswers: [{ text: 'should have consulted', rationale: 'should have consulted là lời trách móc lẽ ra phải tham vấn kế toán.' }],
    },
    {
      id: 'grammar-v2-b2-should-have-criticism-15-q8',
      kind: 'gap',
      prompt: 'The logistics manager ___ (ought / not / to / dispatch) the fragile cargo without proper shock-absorbent packaging.',
      options: [],
      acceptedAnswers: [{ text: 'ought not to have dispatched', rationale: 'ought not to have dispatched thể hiện lời khiển trách về việc gửi hàng dễ vỡ mà không bọc lót kỹ.' }],
    },
    {
      id: 'grammar-v2-b2-should-have-criticism-15-q9',
      kind: 'transform',
      prompt: 'It was a terrible mistake that the pilot did not divert the aircraft around the thunderstorm. -> The pilot ___ the aircraft around the thunderstorm.',
      options: [],
      acceptedAnswers: [
        { text: 'should have diverted', rationale: 'Dùng should have diverted để diễn tả hành động lẽ ra phi công phải chuyển hướng máy bay.' },
        { text: 'ought to have diverted', rationale: 'Dùng ought to have diverted.' },
      ],
    },
    {
      id: 'grammar-v2-b2-should-have-criticism-15-q10',
      kind: 'transform',
      prompt: 'I regret buying that expensive sports coupe because the insurance premiums are exorbitant. -> I ___ that expensive sports coupe.',
      options: [],
      acceptedAnswers: [
        { text: "shouldn't have bought", rationale: 'Dùng shouldn\'t have bought để diễn tả sự ân hận vì đã mua xe thể thao đắt đỏ.' },
        { text: 'should not have bought', rationale: 'Dạng đầy đủ của shouldn\'t have bought.' },
      ],
    },
    {
      id: 'grammar-v2-b2-should-have-criticism-15-q11',
      kind: 'correction',
      prompt: 'Sửa lỗi thì sau should khi chỉ trích hành động trong quá khứ: "You should lock the office door before leaving last night; the burglar entered easily."',
      options: [],
      acceptedAnswers: [
        { text: 'You should have locked the office door before leaving last night; the burglar entered easily.', rationale: 'Thay "should lock" bằng "should have locked" vì sự việc xảy ra tối qua (last night).' },
      ],
    },
    {
      id: 'grammar-v2-b2-should-have-criticism-15-q12',
      kind: 'correction',
      prompt: 'Sửa lỗi vị trí của từ not trong phủ định của ought to: "The driver ought to not have accelerated when the traffic light turned amber."',
      options: [],
      acceptedAnswers: [
        { text: 'The driver ought not to have accelerated when the traffic light turned amber.', rationale: 'Đặt "not" trước "to": ought not to have accelerated.' },
      ],
    },
  ],
  reviewExercises: [
    {
      id: 'grammar-v2-b2-should-have-criticism-15-r1',
      kind: 'choice',
      prompt: 'The audit discovered serious bookkeeping errors that cost the firm millions. The chief financial officer ___ those balance sheets personally.',
      options: [
        { text: 'should have verified', correct: true, rationale: 'Chỉ trích giám đốc tài chính vì đã không tự mình xác minh các bảng cân đối kế toán (should have verified).' },
        { text: 'must have verified', correct: false, rationale: 'must have verified là suy đoán chắc chắn đã xác minh, trái với thực tế để xảy ra sai sót.' },
        { text: 'would verify', correct: false, rationale: 'Sai thì và sai ngữ cảnh chỉ trích quá khứ.' },
      ],
      acceptedAnswers: [{ text: 'should have verified', rationale: 'should have verified thể hiện lời phê bình trách nhiệm đã bị bỏ bê.' }],
    },
    {
      id: 'grammar-v2-b2-should-have-criticism-15-r2',
      kind: 'gap',
      prompt: 'The authorities ___ (ought / to / evacuate) the residents twenty-four hours before the tidal surge breached the sea wall.',
      options: [],
      acceptedAnswers: [{ text: 'ought to have evacuated', rationale: 'ought to have evacuated chỉ trích việc chính quyền lẽ ra phải sơ tán người dân sớm hơn.' }],
    },
    {
      id: 'grammar-v2-b2-should-have-criticism-15-r3',
      kind: 'transform',
      prompt: 'You were wrong to sign the purchase contract without consulting our corporate legal counsel. -> You ___ the purchase contract without consulting our corporate legal counsel.',
      options: [],
      acceptedAnswers: [
        { text: "shouldn't have signed", rationale: 'Dùng shouldn\'t have signed để chỉ trích hành vi đã ký hợp đồng mà không hỏi luật sư.' },
        { text: 'should not have signed', rationale: 'Dạng đầy đủ của shouldn\'t have signed.' },
        { text: 'ought not to have signed', rationale: 'Dạng ought not to have signed.' },
      ],
    },
    {
      id: 'grammar-v2-b2-should-have-criticism-15-r4',
      kind: 'correction',
      prompt: 'Sửa lỗi cấu trúc: "We should had warned the hikers about the flash flood warning issued at noon."',
      options: [],
      acceptedAnswers: [
        { text: 'We should have warned the hikers about the flash flood warning issued at noon.', rationale: 'Sau should luôn là nguyên mẫu "have", không bao giờ dùng "had".' },
      ],
    },
  ],
  outputPrompts: [
    {
      id: 'grammar-v2-b2-should-have-criticism-15-o1',
      prompt: 'Viết 1 câu tiếng Anh sử dụng cấu trúc "should have + V3" hoặc "ought to have + V3" đưa ra lời chỉ trích mang tính xây dựng về một thiếu sót trong quản lý dự án hoặc quy trình làm việc.',
      modelAnswer: 'The project manager should have conducted weekly risk assessments before approving the aggressive construction timetable.',
      checks: [
        'Sử dụng chính xác should have + V3 hoặc ought to have + V3',
        'Nội dung thể hiện rõ một thiếu sót hoặc hành động lẽ ra phải làm',
        'Văn phong chuyên nghiệp, đúng ngữ pháp',
      ],
    },
    {
      id: 'grammar-v2-b2-should-have-criticism-15-o2',
      prompt: 'Viết 1 câu tiếng Anh sử dụng cấu trúc "shouldn\'t have + V3" hoặc "ought not to have + V3" bày tỏ sự hối hận của bản thân về một quyết định tài chính hoặc chi tiêu trong quá khứ.',
      modelAnswer: 'I shouldn\'t have invested a large portion of my savings in speculative shares without seeking independent financial advice.',
      checks: [
        'Sử dụng cấu trúc shouldn\'t have + V3 hoặc ought not to have + V3',
        'Bày tỏ sự tự trách/hối hận về một hành động đã lỡ thực hiện',
        'Động từ ở dạng quá khứ phân từ chuẩn xác',
      ],
    },
  ],
  sources: [
    {
      id: 'cambridge-should-criticism',
      title: 'Cambridge Grammar: Should have and ought to have (past criticism and regret)',
      url: 'https://dictionary.cambridge.org/grammar/british-grammar/should',
      claims: ['In regret or criticism uses, should have and ought to have can say an action was desirable or advisable but did not take place; other uses can express expectation.'],
      checkedAt: '2026-10-05',
      provenance: 'reference-only',
    },
    {
      id: 'bc-should-have',
      title: 'British Council: Modals - should have and ought to have',
      url: 'https://learnenglish.britishcouncil.org/grammar/b1-b2-grammar/should-have-ought-to-have',
      claims: ['Examines nuances of past moral criticism, regret, and distinction from logical deduction (must have).'],
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
