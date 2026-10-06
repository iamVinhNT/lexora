/**
 * @file infinitive-ellipsis.ts
 * @description C1 lesson on to-infinitive ellipsis (reduced infinitives) for concision and cohesive style.
 */
import type { GrammarLesson } from '../../types.js';

const infinitiveEllipsisLesson: GrammarLesson = {
  id: 'grammar-v2-c1-infinitive-ellipsis-10',
  revisionId: 'grammar-v2-c1-infinitive-ellipsis-10@1.0.0',
  revision: '1.0.0',
  title: 'Lược bỏ cụm động từ sau tiểu từ To (Infinitive and To-Ellipsis)',
  objective: 'Thành thạo kỹ thuật rút gọn cụm động từ nguyên thể bằng cách giữ lại tiểu từ "to" (to-infinitive ellipsis / reduced infinitive) sau các động từ chỉ thái độ, ý chí, khả năng hoặc nghĩa vụ, tạo câu văn đĩnh đạc, khúc chiết và loại trừ hoàn toàn sự rườm rà trong diễn ngôn C1.',
  prerequisiteIds: ['grammar-v2-c1-auxiliary-ellipsis-09'],
  coverage: ['infinitive-ellipsis', 'ellipsis', 'reduced-infinitives', 'to-ellipsis', 'cohesion'],
  context: {
    english: 'In sophisticated administrative drafting, scholarly argumentation, and executive deliberation, repeating an entire infinitive complement burdens the reader. Elegant writers retain merely the infinitive marker "to" (or "not to") to signal complete presupposed actions effortlessly.',
    vietnamese: 'Trong soạn thảo văn bản hành chính tinh tế, lập luận học thuật và thảo luận điều hành cao cấp, việc lặp lại toàn bộ thành phần bổ ngữ nguyên thể gây cảm giác nặng nề cho người đọc. Người viết sắc sảo chỉ giữ lại tiểu từ nguyên thể "to" (hoặc "not to") để gợi nhắc trọn vẹn hành động đã tiền giả định một cách nhẹ nhàng.',
  },
  guide: {
    pattern: 'Subject + Verb / Adjective (intend / refuse / choose / hesitate / afford / be willing / have the power) + (not) + to [ellipted verb phrase] | Passive: + (not) + to be [ellipted past participle]',
    whenToUse: [
      'Rút gọn sau động từ chỉ ý muốn, dự định hoặc sự từ chối: "The defense minister was invited to address the parliament, but chose not to [address it]".',
      'Rút gọn sau tính từ biểu thị sự sẵn lòng hoặc e ngại: "The central bank stood ready to intervene in foreign exchange markets, should it be required to [intervene]".',
      'Rút gọn với thể phủ định: đặt "not" trước "to" ("advised the committee not to", tránh "to not").',
      'Rút gọn trong thể bị động hoặc hoàn thành: giữ lại "be" hoặc "have" nếu câu trước là bị động hoặc hoàn thành ("The document could not be released immediately, though researchers had hoped for it to be").',
    ],
    signalWords: ['chose not to', 'hesitated to', 'declined to', 'could not afford to', 'urged them not to', 'stood ready to'],
    check: [
      'Tiểu từ "to" có được giữ lại làm điểm tựa (stranding) không, tránh lược bỏ cả "to" gây hiểu nhầm sang nghĩa khác?',
      'Khi diễn đạt ý phủ định, từ "not" có đứng trước "to" (not to) thay vì tách rời cụm nguyên thể (split infinitive: to not)?',
      'Ở thể bị động, trợ động từ "be" có được giữ lại cùng với "to" (to be) khi vị ngữ bị lược bỏ là một phân từ bị động không?',
    ],
  },
  explanation: 'Lược bỏ cụm nguyên mẫu (To-Infinitive Ellipsis hoặc Reduced Infinitive) là hiện tượng cú pháp trong đó toàn bộ vị ngữ sau tiểu từ "to" được lược bỏ vì đã xuất hiện rõ ràng trong ngữ cảnh trước đó. Tiểu từ "to" được giữ lại trơ trọi (stranded "to") để đóng vai trò đại diện cú pháp. Các điểm cốt tử ở trình độ C1: 1) Cấu trúc phủ định chuẩn mực yêu cầu đặt "not" trước "to" ("They instructed the envoys not to [compromise]"); 2) Sau các động từ đi với tính từ hoặc danh từ (be unable, have the right, find it difficult), "to" vẫn được giữ lại ("They possessed the statutory authority to halt construction, but lacked the political will to"); 3) Trong thể bị động, trợ từ "be" bắt buộc phải được giữ lại nếu không muốn gây mơ hồ giữa chủ động và bị động ("The files have not been cataloged, nor do they need to be [cataloged]").',
  examples: [
    {
      english: 'The consortium had the legal entitlement to terminate the joint venture agreement, but decisively opted not to.',
      vietnamese: 'Liên doanh có quyền lợi pháp lý để chấm dứt thỏa thuận hợp tác, nhưng đã dứt khoát quyết định không làm vậy.',
    },
    {
      english: 'The lead climatologist was reluctant to extrapolate nationwide trends from localized sensor readings, and rightly hesitated to.',
      vietnamese: 'Nhà khí hậu học trưởng đoàn ngần ngại ngoại suy các xu hướng toàn quốc từ số liệu cảm biến cục bộ, và ông đã hoàn toàn đúng đắn khi do dự.',
    },
    {
      english: 'Foreign direct investors would have diversified into regional manufacturing had they been incentivized to.',
      vietnamese: 'Các nhà đầu tư trực tiếp nước ngoài hẳn đã đa dạng hóa vào sản xuất khu vực nếu họ được khuyến khích làm vậy.',
    },
    {
      english: 'The sovereign wealth fund could not afford to absorb additional subprime credit exposure, even if advisers urged it to.',
      vietnamese: 'Quỹ tài sản có chủ quyền không thể kham nổi việc gánh thêm rủi ro tín dụng dưới chuẩn, ngay cả khi các cố vấn thúc giục quỹ làm vậy.',
    },
    {
      english: 'The experimental therapeutic compound has not yet been approved by regulatory agencies, nor is it expected to be.',
      vietnamese: 'Hợp chất điều trị thử nghiệm vẫn chưa được các cơ quan quản lý phê duyệt, và nó cũng không được kỳ vọng là sẽ được phê duyệt trong tương lai gần.',
    },
    {
      english: 'The chief security officer instructed all systems administrators to rotate cryptographic master keys, and insisted they remember to.',
      vietnamese: 'Giám đốc an ninh mạng đã chỉ đạo tất cả các quản trị viên hệ thống xoay vòng các khóa mã hóa chính, và nhấn mạnh họ phải nhớ làm điều đó.',
    },
  ],
  contrasts: [
    {
      form: 'The independent oversight board asked the executive director to testify under oath, but she categorically refused to.',
      whyFits: 'To-ellipsis chuẩn xác: giữ lại tiểu từ to sau động từ refused để đại diện cho toàn bộ cụm vị ngữ "testify under oath".',
      whyNot: '"...but she categorically refused" tuy có thể hiểu trong văn nói thân mật nhưng trong văn viết học thuật thiếu to làm câu cụt hoặc biến refuse thành nội động từ mang sắc thái khác.',
    },
    {
      form: 'The confidential diplomatic telegram was never meant to be published, nor ought it to have been.',
      whyFits: 'Hoàn thành và bị động yêu cầu giữ lại to have been để phản ánh đúng thì quá khứ hoàn thành của hành vi xuất bản.',
      whyNot: '"...nor ought it to" sai vì nếu chỉ để lại to, người đọc sẽ hiểu nhầm là thì hiện tại chủ động thay vì thể hoàn thành bị động to have been [published].',
    },
  ],
  commonMistakes: [
    'Bỏ rơi hoàn toàn tiểu từ "to" sau các động từ như refuse, agree, hope trong văn viết trang trọng (viết "He agreed, but she refused" thay vì "refused to" khi ám chỉ cùng hành động).',
    'Đặt "not" sau "to" tạo cấu trúc chẻ nguyên thể thiếu tự nhiên trong văn phong trang trọng (viết "decided to not" thay vì chuẩn mực "decided not to").',
    'Bỏ qua "be" ở thể bị động khiến câu đổi nghĩa từ bị động sang chủ động (viết "The project was not funded, nor did it deserve to" thay vì "deserve to be").',
  ],
  summary: 'Lược bỏ cụm nguyên mẫu giữ lại tiểu từ "to" (hoặc "not to", "to be") để tránh lặp lại cụm động từ đi sau. Đây là dấu ấn của văn phong hàm súc, giúp kết nối tư tưởng nhịp nhàng mà không sa vào sự rườm rà cú pháp.',
  exercises: [
    {
      id: 'grammar-v2-c1-infinitive-ellipsis-10-q1',
      kind: 'choice',
      prompt: 'Select the sentence with standard high-register negative to-infinitive ellipsis:',
      options: [
        { text: 'The ethics committee advised the researchers to publish the anomalous findings, but they decided not to.', correct: true, rationale: 'Negative particle "not" neatly precedes the stranded infinitive marker "to".' },
        { text: 'The ethics committee advised the researchers to publish the anomalous findings, but they decided to not.', correct: false, rationale: '"to not" creates an informal split infinitive disfavored in high-register prose.' },
        { text: 'The ethics committee advised the researchers to publish the anomalous findings, but they decided not.', correct: false, rationale: 'Omitting the infinitive particle "to" leaves the transitive verb "decided" stranded without an object.' },
        { text: 'The ethics committee advised the researchers to publish the anomalous findings, but they decided not to publish them all.', correct: false, rationale: 'Fails to exploit elegant infinitive ellipsis, resulting in redundant repetition.' },
      ],
      acceptedAnswers: [{ text: 'The ethics committee advised the researchers to publish the anomalous findings, but they decided not to.', rationale: 'Standard negative to-ellipsis with not to.' }],
    },
    {
      id: 'grammar-v2-c1-infinitive-ellipsis-10-q2',
      kind: 'choice',
      prompt: 'Choose the correct passive to-ellipsis: "The classified diplomatic correspondence was never intended to be disclosed, and nor did it deserve ___"',
      options: [
        { text: 'to be.', correct: true, rationale: 'Retains "to be" to preserve the passive voice of the elided predicate.' },
        { text: 'to.', correct: false, rationale: 'Bare "to" improperly shifts the interpretation from passive to active voice.' },
        { text: 'to have.', correct: false, rationale: '"to have" without been fails to represent the passive condition.' },
        { text: 'being.', correct: false, rationale: 'Gerund complement "being" does not match the catenative requirement of deserve.' },
      ],
      acceptedAnswers: [{ text: 'to be.', rationale: 'Passive ellipsis retains "to be".' }],
    },
    {
      id: 'grammar-v2-c1-infinitive-ellipsis-10-q3',
      kind: 'choice',
      prompt: 'Select the sentence properly retaining stranded "to" after an adjectival predicate:',
      options: [
        { text: 'The municipal transit authority was fully prepared to electrify the regional fleet, had it possessed the funding to.', correct: true, rationale: 'Stranded "to" after the nominal head "funding" cleanly ellipts the repeated infinitive clause.' },
        { text: 'The municipal transit authority was fully prepared to electrify the regional fleet, had it possessed the funding.', correct: false, rationale: 'Omitting "to" converts funding into a general noun rather than a purpose-directed complement.' },
        { text: 'The municipal transit authority was fully prepared to electrify the fleet, had it possessed the funding doing so.', correct: false, rationale: 'Malformed participle addition.' },
        { text: 'The transit authority was fully prepared to electrify the fleet, had it possessed the funding for to do it.', correct: false, rationale: 'Ungrammatical double prepositional sequence.' },
      ],
      acceptedAnswers: [{ text: 'The municipal transit authority was fully prepared to electrify the regional fleet, had it possessed the funding to.', rationale: 'Correct stranded to after nominal purpose complement.' }],
    },
    {
      id: 'grammar-v2-c1-infinitive-ellipsis-10-q4',
      kind: 'choice',
      prompt: 'Identify the sentence with correct perfect passive to-ellipsis:',
      options: [
        { text: 'The catastrophic data breach could have been mitigated earlier, and indeed it ought to have been.', correct: true, rationale: 'Modal auxiliary "ought" correctly licenses "to have been" to represent the perfect passive predicate.' },
        { text: 'The catastrophic data breach could have been mitigated earlier, and indeed it ought to have.', correct: false, rationale: 'Omitting "been" leaves an active perfect clause, clashing with the passive subject.' },
        { text: 'The catastrophic data breach could have been mitigated earlier, and indeed it ought to be.', correct: false, rationale: 'Tense clash: "to be" shifts past counterfactual circumstance into present obligation.' },
        { text: 'The catastrophic data breach could have been mitigated earlier, and indeed it ought to.', correct: false, rationale: 'Bare "to" fails to convey perfective aspect and passive voice.' },
      ],
      acceptedAnswers: [{ text: 'The catastrophic data breach could have been mitigated earlier, and indeed it ought to have been.', rationale: 'Flawless perfect passive to-ellipsis with ought to have been.' }],
    },
    {
      id: 'grammar-v2-c1-infinitive-ellipsis-10-q5',
      kind: 'gap',
      prompt: 'Supply the particle to complete the reduced infinitive: "The chief economist intended to challenge the interest rate hike, but her senior colleagues persuaded her not _____."',
      options: [],
      acceptedAnswers: [
        { text: 'to', rationale: 'Infinitive marker "to" completes the negative reduced infinitive "not to".' },
      ],
    },
    {
      id: 'grammar-v2-c1-infinitive-ellipsis-10-q6',
      kind: 'gap',
      prompt: 'Complete the passive to-ellipsis: "The hazardous chemical waste has not yet been neutralized, although municipal safety regulations require it to _____."',
      options: [],
      acceptedAnswers: [
        { text: 'be', rationale: '"be" completes the passive reduced infinitive "to be [neutralized]".' },
      ],
    },
    {
      id: 'grammar-v2-c1-infinitive-ellipsis-10-q7',
      kind: 'gap',
      prompt: 'Supply the missing particle: "The sovereign debt restructuring committee had the constitutional authority to audit foreign accounts, yet stubbornly declined _____."',
      options: [],
      acceptedAnswers: [
        { text: 'to', rationale: '"to" is retained after "declined" to ellipt the repeated infinitive complement.' },
      ],
    },
    {
      id: 'grammar-v2-c1-infinitive-ellipsis-10-q8',
      kind: 'gap',
      prompt: 'Complete the perfect aspect to-ellipsis: "The ancient mosaic was never cataloged during the nineteenth-century expedition, although it certainly ought to have _____."',
      options: [],
      acceptedAnswers: [
        { text: 'been', rationale: '"been" completes the perfect passive ellipsis "to have been [cataloged]".' },
      ],
    },
    {
      id: 'grammar-v2-c1-infinitive-ellipsis-10-q9',
      kind: 'transform',
      prompt: 'Reduce the repetitive infinitive clause using to-ellipsis: "The whistleblower was tempted to leak the financial ledgers, but her legal counsel strongly cautioned her not to leak the financial ledgers."',
      options: [],
      acceptedAnswers: [
        { text: 'The whistleblower was tempted to leak the financial ledgers, but her legal counsel strongly cautioned her not to.', rationale: 'Reduces the second infinitive clause to "not to".' },
      ],
    },
    {
      id: 'grammar-v2-c1-infinitive-ellipsis-10-q10',
      kind: 'transform',
      prompt: 'Apply passive to-ellipsis to eliminate repetition: "The maritime border dispute was not formally arbitrated by the international court, even though both coastal nations had originally agreed that it ought to be formally arbitrated."',
      options: [],
      acceptedAnswers: [
        { text: 'The maritime border dispute was not formally arbitrated by the international court, even though both coastal nations had originally agreed that it ought to be.', rationale: 'Retains "to be" to ellipt the passive participle arbitrated.' },
      ],
    },
    {
      id: 'grammar-v2-c1-infinitive-ellipsis-10-q11',
      kind: 'correction',
      prompt: 'Correct the informal split infinitive in the reduced clause: "The board members considered issuing an emergency dividend, but eventually voted to not."',
      options: [],
      acceptedAnswers: [
        { text: 'The board members considered issuing an emergency dividend, but eventually voted not to.', rationale: 'Transposes "not" before "to" to restore standard high-register negative to-ellipsis.' },
      ],
    },
    {
      id: 'grammar-v2-c1-infinitive-ellipsis-10-q12',
      kind: 'correction',
      prompt: 'Correct the voice ambiguity in the reduced infinitive: "The confidential medical files were never meant to be decrypted, nor did the system architecture permit them to."',
      options: [],
      acceptedAnswers: [
        { text: 'The confidential medical files were never meant to be decrypted, nor did the system architecture permit them to be.', rationale: 'Supplies missing auxiliary "be" to preserve the intended passive interpretation.' },
      ],
    },
  ],
  reviewExercises: [
    {
      id: 'grammar-v2-c1-infinitive-ellipsis-10-r1',
      kind: 'choice',
      prompt: 'Select the optimal sentence with cohesive to-infinitive ellipsis:',
      options: [
        { text: 'The lead negotiator was entitled to walk away from the talks, but graciously chose not to.', correct: true, rationale: 'Flawlessly uses "not to" to ellipt the repeated infinitive complement.' },
        { text: 'The lead negotiator was entitled to walk away from the talks, but graciously chose to not.', correct: false, rationale: 'Informal split infinitive word order.' },
        { text: 'The lead negotiator was entitled to walk away from the talks, but graciously chose not.', correct: false, rationale: 'Omission of "to" creates an ungrammatical transitive stranding.' },
      ],
      acceptedAnswers: [{ text: 'The lead negotiator was entitled to walk away from the talks, but graciously chose not to.', rationale: 'Standard negative to-ellipsis.' }],
    },
    {
      id: 'grammar-v2-c1-infinitive-ellipsis-10-r2',
      kind: 'gap',
      prompt: 'Fill in the passive auxiliary to complete the ellipsis: "The critical vulnerabilities were patched overnight, as they certainly ought to have _____."',
      options: [],
      acceptedAnswers: [
        { text: 'been', rationale: '"been" completes the perfect passive reduced infinitive "to have been".' },
      ],
    },
    {
      id: 'grammar-v2-c1-infinitive-ellipsis-10-r3',
      kind: 'transform',
      prompt: 'Condense the clause using to-ellipsis: "The central bank wanted to raise the benchmark discount rate, but lacked the statutory independence to raise the benchmark discount rate."',
      options: [],
      acceptedAnswers: [
        { text: 'The central bank wanted to raise the benchmark discount rate, but lacked the statutory independence to.', rationale: 'Ellipts the repeated verb phrase, stranding the infinitive marker "to".' },
        { text: 'The central bank wanted to raise the benchmark discount rate, but lacked statutory independence to.', rationale: 'Accepts variant without definite article before statutory independence.' },
      ],
    },
    {
      id: 'grammar-v2-c1-infinitive-ellipsis-10-r4',
      kind: 'correction',
      prompt: 'Correct the voice error in the ellipsis: "The clinical trial results have not yet been peer-reviewed, though researchers urgently want them to."',
      options: [],
      acceptedAnswers: [
        { text: 'The clinical trial results have not yet been peer-reviewed, though researchers urgently want them to be.', rationale: 'Inserts "be" to preserve the passive voice of the antecedent predicate.' },
      ],
    },
  ],
  outputPrompts: [
    {
      id: 'grammar-v2-c1-infinitive-ellipsis-10-o1',
      prompt: 'Viết 1-2 câu học thuật hoặc phân tích chính sách sử dụng kỹ thuật to-infinitive ellipsis với "chose not to" hoặc "lacked the political will to" để bình luận về sự chần chừ của một thể chế.',
      modelAnswer: 'The international regulatory body possessed the statutory mandate to impose binding carbon caps across multinational freight operators, but consistently lacked the geopolitical consensus to. Consequently, sovereign states that could have intervened unilaterally chose not to.',
      checks: [
        'Sử dụng tiểu từ to đứng trơ trọi (stranded to) sau động từ hoặc danh từ đòi hỏi to-V.',
        'Áp dụng đúng vị trí của not trong cụm phủ định (chose not to).',
        'Ngữ cảnh lập luận chính sách sắc sảo, tự nhiên.',
      ],
    },
    {
      id: 'grammar-v2-c1-infinitive-ellipsis-10-o2',
      prompt: 'Viết 1-2 câu sử dụng passive to-ellipsis ("...ought to have been" hoặc "...need to be") trong báo cáo kỹ thuật hoặc quy trình kiểm toán an toàn.',
      modelAnswer: 'The legacy cryptographic encryption certificates were not revoked following the perimeter intrusion, although standard security protocols dictated they ought to have been.',
      checks: [
        'Sử dụng thể bị động trong mệnh đề lược bỏ (to be hoặc ought to have been).',
        'Giữ lại be/been để tránh hiểu nhầm sang thể chủ động.',
        'Diễn đạt rõ nghĩa và chuẩn mực ngữ pháp C1.',
      ],
    },
  ],
  sources: [
    {
      id: 'hudleston-pullum-reduced-infinitives',
      title: 'The Cambridge Grammar of the English Language: Non-finite Complements and Stranded To',
      url: 'https://www.cambridge.org/core/books/cambridge-grammar-of-the-english-language/5409E8391BE0E63510FE4A52654D9E2E',
      claims: [
        'The infinitival marker "to" can be stranded when its VP complement is elided under anaphoric identity.',
        'Negative reduced infinitives place "not" strictly before "to" in standard formal writing.',
        'Passive and perfect aspectual markers (be, have been) must be retained to avoid voice and aspect shifts.',
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
    summary: 'Comprehensive review completed. To-infinitive ellipsis, stranded to rules, negative placement, passive/perfect preservation, exercises, and Huddleston & Pullum sources verified.',
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

export default infinitiveEllipsisLesson;
