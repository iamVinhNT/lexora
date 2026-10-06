/**
 * @file if-only-would.ts
 * @description Lesson: If only & Wish + Would: Phàn nàn và mong muốn thay đổi hành vi.
 */
import type { GrammarLesson } from '../../types.js';

const lesson: GrammarLesson = {
  id: 'grammar-v2-b2-if-only-would-10',
  revisionId: 'grammar-v2-b2-if-only-would-10@1.0.0',
  revision: '1.0.0',
  title: 'If only & Wish + Would: Phàn nàn và mong muốn thay đổi hành vi',
  objective: 'Nắm vững cấu trúc "wish + would" và "If only + would" để thể hiện sự khó chịu, phàn nàn về một thói quen hoặc hành vi của người khác và bày tỏ mong muốn thiết tha họ sẽ thay đổi cách hành xử.',
  prerequisiteIds: ['grammar-v2-b2-wish-past-regret-09'],
  coverage: ['if-only', 'wish-would', 'annoyance-complaint', 'future-desire-change', 'b2-grammar'],
  context: {
    english: 'During the high-stakes negotiations, the lead mediator whispered: "If only both delegations would stop trading personal accusations and concentrate on the border treaty."',
    vietnamese: 'Trong cuộc đàm phán căng thẳng, nhà hòa giải trưởng thì thầm: "Giá mà cả hai phái đoàn chịu ngừng công kích cá nhân và tập trung vào hiệp ước biên giới."',
  },
  guide: {
    pattern: 'S + wish + someone + would + V-bare | If only + someone + would + V-bare',
    whenToUse: [
      'Thể hiện sự bực bội, khó chịu (annoyance/irritation) trước một thói quen hoặc hành động lặp đi lặp lại của người khác.',
      'Bày tỏ mong muốn thiết tha ai đó sẽ chịu thay đổi thái độ hoặc hành vi trong tương lai.',
      'Ước một hiện tượng khó chịu (như thời tiết xấu, tiếng ồn dai dẳng) sẽ chấm dứt: "I wish it would stop raining."',
    ],
    signalWords: ['wish someone would', 'if only someone would', 'stop interrupting', 'turn down', 'listen for once'],
    check: [
      'Hai chủ ngữ có khác nhau không? TUYỆT ĐỐI KHÔNG dùng "I wish I would" hoặc "We wish we would" (phải dùng "I wish I could").',
      'Động từ sau would có ở dạng nguyên mẫu không "to" (V-bare)?',
      'Có nhầm lẫn giữa wish + would (phàn nàn hành vi) với wish + past simple (ước trạng thái hiện tại) không?',
    ],
  },
  explanation: 'Cấu trúc "wish + would" và "If only + would" mang sắc thái biểu cảm rất đặc thù ở trình độ B2:\n1. Diễn tả sự bực dọc, thiếu kiên nhẫn đối với hành vi của người khác hoặc một tình huống khách quan khó chịu (tiếng ồn, thời tiết dai dẳng):\n   - "I wish you would lower your voice in the library." (Tôi ước bạn chịu hạ giọng trong thư viện).\n   - "If only the rain would stop so we can resume construction." (Giá như cơn mưa tạnh để chúng tôi tiếp tục thi công).\n2. Quy tắc cấm kỵ cốt tử:\n   - KHÔNG dùng "I wish I would..." khi người nói muốn ước cho bản thân mình. Khi chủ ngữ trùng nhau, phải dùng "I wish I could..." (Tôi ước mình có thể...).\n3. Không dùng cho trạng thái tĩnh không thể tự ý thay đổi (stative situations): Không nói "I wish he would be taller" (vì chiều cao không phải hành vi có thể tự nguyện thay đổi), mà phải nói "I wish he were taller".',
  examples: [
    {
      english: 'I wish the neighbors would stop playing deafening techno music in the middle of the night.',
      vietnamese: 'Tôi ước gì những người hàng xóm chịu ngừng bật nhạc techno đinh tai nhức óc vào giữa đêm.',
    },
    {
      english: 'If only our department head would listen to junior staff suggestions before finalizing quarterly budgets.',
      vietnamese: 'Giá mà trưởng phòng chúng tôi chịu lắng nghe ý kiến của nhân viên cấp dưới trước khi chốt ngân sách quý.',
    },
    {
      english: 'The commuter sighed: "I wish the municipal transit authority would modernize these unreliable ticketing gates."',
      vietnamese: 'Người đi làm thở dài: "Tôi ước gì cơ quan vận tải thành phố chịu nâng cấp những cổng soát vé chập chờn này."',
    },
    {
      english: 'If only the persistent drizzle would clear up before the outdoor wedding ceremony begins.',
      vietnamese: 'Giá mà cơn mưa phùn dai dẳng chịu tạnh trước khi lễ cưới ngoài trời bắt đầu.',
    },
    {
      english: 'We wish the subcontractors would communicate schedule delays more transparently.',
      vietnamese: 'Chúng tôi ước các nhà thầu phụ chịu thông báo việc chậm tiến độ một cách minh bạch hơn.',
    },
    {
      english: 'Do you wish your supervisor would delegate responsibilities instead of micromanaging every trivial task?',
      vietnamese: 'Bạn có ước người giám sát của mình chịu phân quyền thay vì quản lý vi mô từng việc nhỏ nhặt không?',
    },
  ],
  contrasts: [
    {
      form: 'wish + would vs wish + past simple',
      whyFits: '"I wish you would arrive on time" thể hiện sự bực bội với thói quen đi trễ của đối phương và yêu cầu họ thay đổi hành vi.',
      whyNot: '"I wish you were here" chỉ ước đối phương có mặt ở đây (trạng thái), không hàm ý trách móc thói quen hay yêu cầu sửa đổi hành vi.',
    },
    {
      form: 'I wish I could vs I wish I would (Error)',
      whyFits: '"I wish I could speak fluent Japanese" đúng ngữ pháp vì ước năng lực cho chính mình.',
      whyNot: '"I wish I would speak fluent Japanese" sai ngữ pháp vì không được dùng "I wish I would" cho cùng một chủ ngữ I.',
    },
  ],
  commonMistakes: [
    'Dùng trùng chủ ngữ với would: viết "I wish I would have more courage" thay vì "I wish I had more courage" hoặc "I wish I could...".',
    'Dùng wish + would cho trạng thái không thể thay đổi theo ý chí: viết "I wish it would be warmer today" thay vì "I wish it were warmer today".',
    'Dùng to-infinitive sau would: viết "I wish they would to stop talking" thay vì "I wish they would stop talking".',
  ],
  summary: '"Wish + would" và "If only + would" dùng để phàn nàn về hành vi gây khó chịu của người khác và bày tỏ mong muốn họ thay đổi. Không dùng "I wish I would".',
  exercises: [
    {
      id: 'grammar-v2-b2-if-only-would-10-q1',
      kind: 'choice',
      prompt: 'To express irritation about a colleague repeatedly tapping their pen during meetings, which sentence is most natural?',
      options: [
        { text: 'I wish you would stop clicking your pen on the desk.', correct: true, rationale: 'wish + would diễn tả sự phàn nàn và yêu cầu ngừng một hành vi gây khó chịu.' },
        { text: 'I wish you stopped clicking your pen on the desk.', correct: false, rationale: 'wish + stopped không thể hiện đúng sắc thái bực mình và yêu cầu hành động chấm dứt.' },
        { text: 'I wish you will stop clicking your pen on the desk.', correct: false, rationale: 'Will is not used in this wish construction to complain about the addressee’s present behavior; use would.' },
      ],
      acceptedAnswers: [{ text: 'I wish you would stop clicking your pen on the desk.', rationale: 'Cấu trúc phàn nàn hành vi bằng wish + would.' }],
    },
    {
      id: 'grammar-v2-b2-if-only-would-10-q2',
      kind: 'choice',
      prompt: 'Why is "I wish I would remember where I parked the car" grammatically incorrect?',
      options: [
        { text: 'English does not permit "wish + would" when both clauses share the same subject (I wish I...).', correct: true, rationale: 'Không dùng would khi chủ ngữ trùng nhau; phải dùng "I wish I could remember" hoặc "I wish I remembered".' },
        { text: 'The verb "remember" must be in the gerund form.', correct: false, rationale: 'Sai vì sau modal verb là bare infinitive, không liên quan đến gerund.' },
        { text: 'The word "wish" cannot refer to memory.', correct: false, rationale: 'Wish hoàn toàn có thể đi với mệnh đề về trí nhớ.' },
      ],
      acceptedAnswers: [{ text: 'English does not permit "wish + would" when both clauses share the same subject (I wish I...).', rationale: 'Quy tắc cấm kỵ trùng chủ ngữ với would sau wish.' }],
    },
    {
      id: 'grammar-v2-b2-if-only-would-10-q3',
      kind: 'choice',
      prompt: 'If only the municipal council ___ the crumbling bridge before an accident occurs!',
      options: [
        { text: 'would repair', correct: true, rationale: 'If only + would repair diễn tả mong mỏi thiết tha hội đồng thành phố sẽ chịu hành động sửa chữa.' },
        { text: 'will repair', correct: false, rationale: 'Sau If only không dùng thì tương lai will.' },
        { text: 'would have repaired', correct: false, rationale: 'would have repaired chỉ sự tiếc nuối quá khứ, không phù hợp với mệnh đề trước tương lai (before an accident occurs).' },
      ],
      acceptedAnswers: [{ text: 'would repair', rationale: 'would repair thể hiện mong muốn cơ quan chức năng chịu hành động.' }],
    },
    {
      id: 'grammar-v2-b2-if-only-would-10-q4',
      kind: 'choice',
      prompt: 'Select the statement where "wish + would" is used ungrammatically for an uncontrollable state:',
      options: [
        { text: 'I wish my brother would be taller so he could join the basketball team.', correct: true, rationale: 'Sai vì chiều cao là trạng thái tự nhiên, không phải hành vi có ý chí; phải dùng "I wish my brother were taller".' },
        { text: 'I wish my brother would practice basketball instead of playing video games.', correct: false, rationale: 'Câu này đúng ngữ pháp vì luyện tập bóng rổ là hành vi do ý chí quyết định.' },
        { text: 'I wish the bus driver would wait for running passengers.', correct: false, rationale: 'Câu này đúng ngữ pháp vì chờ hành khách là hành vi tự nguyện của tài xế.' },
      ],
      acceptedAnswers: [{ text: 'I wish my brother would be taller so he could join the basketball team.', rationale: 'Không dùng wish + would cho các trạng thái tĩnh nằm ngoài ý chí kiểm soát.' }],
    },
    {
      id: 'grammar-v2-b2-if-only-would-10-q5',
      kind: 'gap',
      prompt: 'I wish the software developers ___ (address) the recurring synchronization bug in the next update.',
      options: [],
      acceptedAnswers: [{ text: 'would address', rationale: 'would address diễn tả mong muốn các lập trình viên chịu giải quyết lỗi.' }],
    },
    {
      id: 'grammar-v2-b2-if-only-would-10-q6',
      kind: 'gap',
      prompt: 'If only the persistent howling wind ___ (die) down so the emergency helicopter can land.',
      options: [],
      acceptedAnswers: [{ text: 'would die', rationale: 'would die diễn tả mong mỏi hiện tượng thời tiết gió gầm rú dịu bớt.' }],
    },
    {
      id: 'grammar-v2-b2-if-only-would-10-q7',
      kind: 'gap',
      prompt: 'The professor sighed: "I wish the students ___ (turn) off their mobile ringtones during lectures."',
      options: [],
      acceptedAnswers: [{ text: 'would turn', rationale: 'would turn thể hiện sự phàn nàn và yêu cầu sinh viên tắt chuông điện thoại.' }],
    },
    {
      id: 'grammar-v2-b2-if-only-would-10-q8',
      kind: 'gap',
      prompt: 'If only our landlord ___ (replace) the faulty heating system before winter sets in.',
      options: [],
      acceptedAnswers: [{ text: 'would replace', rationale: 'would replace thể hiện mong mỏi chủ nhà chịu thay thế hệ thống sưởi.' }],
    },
    {
      id: 'grammar-v2-b2-if-only-would-10-q9',
      kind: 'transform',
      prompt: 'Please stop interrupting me while I am delivering the client report! -> I wish you ___ me while I am delivering the client report!',
      options: [],
      acceptedAnswers: [
        { text: 'would stop interrupting', rationale: 'Dùng would stop interrupting để diễn đạt sự phàn nàn lịch sự nhưng dứt khoát.' },
      ],
    },
    {
      id: 'grammar-v2-b2-if-only-would-10-q10',
      kind: 'transform',
      prompt: 'I strongly desire the management to consider our remote working proposal. -> If only the management ___ our remote working proposal.',
      options: [],
      acceptedAnswers: [
        { text: 'would consider', rationale: 'Dùng If only + would consider để bày tỏ mong muốn thiết tha ban giám đốc chịu xem xét.' },
      ],
    },
    {
      id: 'grammar-v2-b2-if-only-would-10-q11',
      kind: 'correction',
      prompt: 'Sửa lỗi trùng chủ ngữ với would: "I am exhausted; I wish I would take a three-week holiday right now."',
      options: [],
      acceptedAnswers: [
        { text: 'I am exhausted; I wish I could take a three-week holiday right now.', rationale: 'Thay "I wish I would" bằng "I wish I could" khi chủ ngữ trùng nhau và nói về khả năng/nguyện vọng của bản thân.' },
      ],
    },
    {
      id: 'grammar-v2-b2-if-only-would-10-q12',
      kind: 'correction',
      prompt: 'Sửa lỗi dùng would cho trạng thái tĩnh: "The apartment is freezing; I wish it would be warmer in here."',
      options: [],
      acceptedAnswers: [
        { text: 'The apartment is freezing; I wish it were warmer in here.', rationale: 'Thay "would be warmer" bằng "were warmer" vì nhiệt độ căn phòng là trạng thái tĩnh, không phải hành vi ý thức.' },
        { text: 'The apartment is freezing; I wish it was warmer in here.', rationale: 'Chấp nhận biến thể was warmer trong văn phong thân mật.' },
      ],
    },
  ],
  reviewExercises: [
    {
      id: 'grammar-v2-b2-if-only-would-10-r1',
      kind: 'choice',
      prompt: 'I wish the courier company ___ delivering parcels to the wrong office unit.',
      options: [
        { text: 'would stop', correct: true, rationale: 'Phàn nàn về hành vi lặp đi lặp lại của công ty chuyển phát dùng would stop.' },
        { text: 'stops', correct: false, rationale: 'Hiện tại đơn không dùng sau wish.' },
        { text: 'will stop', correct: false, rationale: 'Will không dùng trong mệnh đề phụ sau wish.' },
      ],
      acceptedAnswers: [{ text: 'would stop', rationale: 'would stop diễn tả yêu cầu chấm dứt hành vi phiền toái.' }],
    },
    {
      id: 'grammar-v2-b2-if-only-would-10-r2',
      kind: 'gap',
      prompt: 'If only you ___ (listen) to reason instead of jumping to hasty conclusions!',
      options: [],
      acceptedAnswers: [{ text: 'would listen', rationale: 'would listen diễn tả mong muốn tha thiết đối phương chịu lắng nghe lý lẽ.' }],
    },
    {
      id: 'grammar-v2-b2-if-only-would-10-r3',
      kind: 'transform',
      prompt: 'I am really annoyed that John keeps smoking inside the shared apartment. -> I wish John ___ inside the shared apartment.',
      options: [],
      acceptedAnswers: [
        { text: 'would stop smoking', rationale: 'Dùng would stop smoking để bày tỏ sự khó chịu về thói quen hút thuốc.' },
        { text: 'would not smoke', rationale: 'Dùng would not smoke để ước đối phương không hút thuốc.' },
        { text: "wouldn't smoke", rationale: 'Dạng rút gọn của would not smoke.' },
      ],
    },
    {
      id: 'grammar-v2-b2-if-only-would-10-r4',
      kind: 'correction',
      prompt: 'Sửa lỗi ngữ pháp: "If only my business partner will share the financial ledgers with me."',
      options: [],
      acceptedAnswers: [
        { text: 'If only my business partner would share the financial ledgers with me.', rationale: 'Thay trợ động từ "will" bằng "would" sau cụm từ If only.' },
      ],
    },
  ],
  outputPrompts: [
    {
      id: 'grammar-v2-b2-if-only-would-10-o1',
      prompt: 'Viết 1 câu tiếng Anh sử dụng cấu trúc "I wish [someone] would stop [V-ing]" để phàn nàn lịch sự về một thói quen gây phiền toái ở nơi làm việc hoặc nơi công cộng.',
      modelAnswer: 'I wish my coworker would stop taking loudspeaker telephone calls in the open-plan office.',
      checks: [
        'Sử dụng cấu trúc I wish + chủ ngữ khác + would stop + V-ing',
        'Miêu tả một hành động gây phiền toái thực tế',
        'Ngữ pháp chuẩn xác, không dùng I wish I would',
      ],
    },
    {
      id: 'grammar-v2-b2-if-only-would-10-o2',
      prompt: 'Viết 1 câu tiếng Anh bắt đầu bằng "If only..." với "would + V-bare" thể hiện mong muốn tha thiết một tổ chức hoặc cá nhân chịu hành động để giải quyết vấn đề.',
      modelAnswer: 'If only the municipal council would invest in dedicated bicycle lanes to protect commuters on busy avenues.',
      checks: [
        'Bắt đầu bằng If only...',
        'Sử dụng would + động từ nguyên mẫu (V-bare)',
        'Diễn tả mong muốn thay đổi hành vi/chính sách mang tính xây dựng',
      ],
    },
  ],
  sources: [
    {
      id: 'cambridge-wish-would',
      title: 'Cambridge Grammar: Wish with would (complaints and desires for change)',
      url: 'https://dictionary.cambridge.org/grammar/british-grammar/wish',
      claims: ['Wish + would commonly expresses dissatisfaction with someone else or a circumstance and a desire for change; it is generally avoided for expressing personal willingness or ability.'],
      checkedAt: '2026-10-05',
      provenance: 'reference-only',
    },
    {
      id: 'bc-if-only-wish',
      title: 'British Council: If only and wish with would',
      url: 'https://learnenglish.britishcouncil.org/grammar/b2-c1-grammar/wishes-if-only',
      claims: ['Highlights annoyance at habits, uncontrollable nature of stative verbs with would, and imperative-like force.'],
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
