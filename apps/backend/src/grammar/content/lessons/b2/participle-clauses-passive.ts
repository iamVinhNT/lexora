/**
 * @file participle-clauses-passive.ts
 * @description B2 lesson 21: Passive participle clauses (past participle and having been + past participle).
 */
import type { GrammarLesson } from '../../types.js';

const lesson: GrammarLesson = {
  id: 'grammar-v2-b2-participle-clauses-passive-21',
  revisionId: 'grammar-v2-b2-participle-clauses-passive-21@1.0.0',
  revision: '1.0.0',
  title: 'Mệnh đề phân từ bị động (Passive Participle Clauses)',
  objective: 'Rút gọn mệnh đề phụ hoặc mệnh đề quan hệ dạng bị động bằng quá khứ phân từ (V3) và phân từ hoàn thành bị động (Having been + V3), đảm bảo chủ ngữ nhất quán và văn phong học thuật chuẩn mực.',
  prerequisiteIds: ['grammar-v2-b2-participle-clauses-active-20'],
  coverage: ['participle-clauses-passive', 'past-participle-clauses', 'perfect-passive-participles', 'reduced-clauses', 'academic-writing'],
  context: {
    english: 'Academic writers and journalists frequently condense passive clauses of reason, condition, and background circumstance by employing past participles or perfect passive participles.',
    vietnamese: 'Các tác giả học thuật và nhà báo thường xuyên cô đọng các mệnh đề bị động chỉ nguyên nhân, điều kiện và hoàn cảnh nền bằng cách sử dụng quá khứ phân từ hoặc phân từ hoàn thành bị động.',
  },
  guide: {
    pattern: 'V3 (Past Participle) + ..., Subject + Verb | Having been + V3 + ..., Subject + Verb',
    whenToUse: [
      'Rút gọn mệnh đề bị động chỉ nguyên nhân hoặc hoàn cảnh đồng thời (Shocked by the news, the community demanded answers).',
      'Rút gọn mệnh đề quan hệ dạng bị động (The artifacts discovered during the excavation date back to 300 BC).',
      'Dùng "Having been + V3" khi muốn nhấn mạnh một hành động bị động đã hoàn tất trọn vẹn trước khi hành động chính diễn ra (Having been warned twice, he was disqualified).',
    ],
    signalWords: ['surrounded by', 'built in', 'having been informed', 'located near', 'shocked by'],
    check: [
      'Chủ ngữ của mệnh đề chính có phải là đối tượng chịu tác động của hành động phân từ không (tránh dangling participle)?',
      'Đã dùng đúng dạng bị động V3 hoặc Having been V3 thay vì V-ing chủ động chưa?',
      'Khi phủ định, từ "Not" đã đứng ở đầu mệnh đề phân từ (Not having been told / Not satisfied with) chưa?',
    ],
  },
  explanation: 'Mệnh đề phân từ bị động (Passive Participle Clauses) được dùng để rút gọn mệnh đề trạng ngữ hoặc mệnh đề quan hệ khi chủ ngữ ở thể bị động. Dạng 1: Quá khứ phân từ đơn (Past Participle - V3) dùng khi hành động bị động diễn ra đồng thời, mang tính trạng thái, hoặc là lý do trực tiếp (Built in 1890, the manor retains its original charm). Dạng 2: Phân từ hoàn thành bị động (Having been + V3) nhấn mạnh việc chịu tác động đã hoàn tất dứt điểm trong quá khứ trước sự kiện chính (Having been tested extensively, the software was deployed globally). Lưu ý cốt lõi: Chủ ngữ của mệnh đề chính bắt buộc phải là đối tượng tiếp nhận hành động phân từ; nếu sai lệch sẽ dẫn đến lỗi phân từ treo.',
  examples: [
    {
      english: 'Surrounded by dense pine forests, the sanatorium enjoys clean mountain air.',
      vietnamese: 'Được bao quanh bởi những cánh rừng thông rậm rạp, viện điều dưỡng được hưởng không khí vùng núi trong lành.',
    },
    {
      english: 'Having been warned of severe storms, the fishermen steered their boats toward the harbor.',
      vietnamese: 'Sau khi đã được cảnh báo về những cơn bão dữ dội, các ngư dân đã điều khiển thuyền về bến cảng.',
    },
    {
      english: 'Frightened by the loud lightning strike, the dog hid beneath the sofa.',
      vietnamese: 'Bị hoảng sợ bởi tiếng sét đánh chói tai, chú chó đã trốn dưới gầm ghế sô pha.',
    },
    {
      english: 'Having been translated into thirty languages, the novel gained worldwide acclaim.',
      vietnamese: 'Sau khi được dịch sang ba mươi thứ tiếng, cuốn tiểu thuyết đã gặt hái danh tiếng trên toàn thế giới.',
    },
    {
      english: 'Trained by Olympic coaches, the young gymnast demonstrated exceptional balance.',
      vietnamese: 'Được huấn luyện bởi các huấn luyện viên Olympic, nữ vận động viên thể dục trẻ tuổi đã thể hiện khả năng giữ thăng bằng xuất sắc.',
    },
    {
      english: 'Not satisfied with the initial test results, the laboratory ordered a second round of trials.',
      vietnamese: 'Không hài lòng với kết quả thử nghiệm ban đầu, phòng thí nghiệm đã yêu cầu một đợt thử nghiệm thứ hai.',
    },
  ],
  contrasts: [
    {
      form: 'Damaged during transit, the marble statue was rejected by the curator.',
      whyFits: 'Dùng quá khứ phân từ Damaged vì bức tượng đá cẩm thạch (the marble statue) là đối tượng chịu hư hại (bị động).',
      whyNot: '"Damaging during transit, the marble statue..." là sai vì Damaging mang nghĩa chủ động, ngụ ý bức tượng tự gây hư hại cho vật khác.',
    },
    {
      form: 'Having been told about the road closure, the courier chose an alternative highway.',
      whyFits: 'Dùng Having been told để nhấn mạnh việc người vận chuyển được thông báo đã hoàn tất trước khi anh ta đưa ra lựa chọn đổi tuyến đường.',
      whyNot: '"Telling about the road closure, the courier..." mang nghĩa chủ động rằng người vận chuyển đi thông báo cho người khác, sai hoàn toàn ngữ cảnh.',
    },
  ],
  commonMistakes: [
    'Dùng dạng chủ động V-ing thay cho quá khứ phân từ V3 khi đối tượng của mệnh đề chính chịu tác động (ví dụ: viết "Treating with antibiotics, the patient recovered" thay vì "Treated with...").',
    'Phân từ treo (dangling participle): chủ ngữ mệnh đề chính không phải là đối tượng chịu tác động của phân từ (ví dụ: "Damaged by frost, we threw away the plants" - người "we" không bị đóng băng).',
    'Bỏ quên "been" trong phân từ hoàn thành bị động (viết "Having examined by doctors" thay vì "Having been examined by doctors").',
  ],
  summary: 'Passive participle clauses sử dụng V3 (quá khứ phân từ) hoặc Having been + V3 để rút gọn mệnh đề bị động chỉ nguyên nhân, điều kiện hoặc chuỗi thời gian. Chủ ngữ của mệnh đề chính phải là đối tượng đón nhận hành động bị động.',
  exercises: [
    {
      id: 'grammar-v2-b2-participle-clauses-passive-21-q1',
      kind: 'choice',
      prompt: 'Select the sentence in which the proposal, rather than another subject, is described as criticized:',
      options: [
        { text: 'Criticized by several senior reviewers, the proposal was substantially revised.', correct: true, rationale: 'The proposal is the recipient of the criticism and subject of the revision.' },
        { text: 'Criticizing by several senior reviewers, the proposal was substantially revised.', correct: false, rationale: 'Criticizing is an active participle and cannot express passive meaning here.' },
        { text: 'Criticized by several senior reviewers, the committee revised the proposal.', correct: false, rationale: 'Dangling participle: the committee was not criticized; the proposal was.' },
        { text: 'Having criticized by several senior reviewers, the proposal was substantially revised.', correct: false, rationale: 'Missing been: Having criticized is active, not passive.' },
      ],
      acceptedAnswers: [{ text: 'Criticized by several senior reviewers, the proposal was substantially revised.', rationale: 'Correct passive past participle clause.' }],
    },
    {
      id: 'grammar-v2-b2-participle-clauses-passive-21-q2',
      kind: 'choice',
      prompt: 'Choose the correct form to show an action completed prior to the main clause: "___ about the changes in advance, the staff adjusted quickly."',
      options: [
        { text: 'Having been informed', correct: true, rationale: 'Having been informed emphasizes prior completion of receiving information.' },
        { text: 'Informing', correct: false, rationale: 'Informing is active and indicates that the staff informed someone else.' },
        { text: 'Having informed', correct: false, rationale: 'Having informed is active perfect participle, omitting the passive marker been.' },
        { text: 'Being inform', correct: false, rationale: 'Ungrammatical form; inform is not in past participle form.' },
      ],
      acceptedAnswers: [{ text: 'Having been informed', rationale: 'Having been informed is the correct perfect passive participle.' }],
    },
    {
      id: 'grammar-v2-b2-participle-clauses-passive-21-q3',
      kind: 'choice',
      prompt: 'Select the correct negative passive participle clause: "___ of the schedule change, the speaker arrived two hours late."',
      options: [
        { text: 'Not having been notified', correct: true, rationale: 'Not correctly precedes the perfect passive participle having been notified.' },
        { text: 'Not been having notified', correct: false, rationale: 'The participle and passive auxiliaries are in the wrong order.' },
        { text: 'Not notifying', correct: false, rationale: 'Not notifying is active and suggests the speaker failed to notify someone.' },
        { text: 'Without notified', correct: false, rationale: 'Preposition without requires a gerund (without being notified), not a bare participle.' },
      ],
      acceptedAnswers: [{ text: 'Not having been notified', rationale: 'Not correctly precedes the perfect passive participle having been notified.' }],
    },
    {
      id: 'grammar-v2-b2-participle-clauses-passive-21-q4',
      kind: 'choice',
      prompt: 'Which option correctly avoids a dangling participle?',
      options: [
        { text: 'Shocked by the audit findings, the board dismissed the financial controller.', correct: true, rationale: 'The board is the subject that was shocked by the audit findings.' },
        { text: 'Shocked by the audit findings, an investigation was immediately launched by the board.', correct: false, rationale: 'Dangling participle: the investigation itself cannot be shocked.' },
        { text: 'Shocked by the audit findings, rumors spread throughout the headquarters.', correct: false, rationale: 'Dangling participle: rumors cannot feel shock.' },
        { text: 'Shocked by the audit findings, a statement was issued promptly.', correct: false, rationale: 'Dangling participle: a statement cannot be shocked.' },
      ],
      acceptedAnswers: [{ text: 'Shocked by the audit findings, the board dismissed the financial controller.', rationale: 'Correct subject alignment with passive participle.' }],
    },
    {
      id: 'grammar-v2-b2-participle-clauses-passive-21-q5',
      kind: 'gap',
      prompt: 'Fill in the gap with the past participle of "bear": "_____ in a small coastal village, she felt an enduring connection to the sea."',
      options: [],
      acceptedAnswers: [{ text: 'Born', rationale: 'Born is the irregular past participle of bear in the sense of birth.' }],
    },
    {
      id: 'grammar-v2-b2-participle-clauses-passive-21-q6',
      kind: 'gap',
      prompt: 'Complete the perfect passive participle: "Having _____ rejected by three publishers, the manuscript was finally accepted by a university press."',
      options: [],
      acceptedAnswers: [{ text: 'been', rationale: 'Been is required to complete the passive perfect participle having been rejected.' }],
    },
    {
      id: 'grammar-v2-b2-participle-clauses-passive-21-q7',
      kind: 'gap',
      prompt: 'Fill in the past participle of "publish": "First _____ in 1925, The Great Gatsby remains a foundational American novel."',
      options: [],
      acceptedAnswers: [{ text: 'published', rationale: 'Published forms the past participle clause specifying initial release.' }],
    },
    {
      id: 'grammar-v2-b2-participle-clauses-passive-21-q8',
      kind: 'gap',
      prompt: 'Complete the negative passive clause: "_____ satisfied with the explanation, the inspector demanded further documentation."',
      options: [],
      acceptedAnswers: [{ text: 'Not', rationale: 'Not negates the participle clause directly before the participle adjective satisfied.' }],
    },
    {
      id: 'grammar-v2-b2-participle-clauses-passive-21-q9',
      kind: 'transform',
      prompt: 'Rewrite using a passive participle clause starting with "Built": "Because it was built from local limestone, the cottage blends into the hillside."',
      options: [],
      acceptedAnswers: [
        { text: 'Built from local limestone, the cottage blends into the hillside.', rationale: 'Reduces passive reason clause to Built from local limestone.' },
      ],
    },
    {
      id: 'grammar-v2-b2-participle-clauses-passive-21-q10',
      kind: 'transform',
      prompt: 'Rewrite using "Having been": "Because he had been warned repeatedly about speeding, the motorist lost his license."',
      options: [],
      acceptedAnswers: [
        { text: 'Having been warned repeatedly about speeding, the motorist lost his license.', rationale: 'Reduces past perfect passive clause to Having been warned repeatedly.' },
      ],
    },
    {
      id: 'grammar-v2-b2-participle-clauses-passive-21-q11',
      kind: 'correction',
      prompt: 'Correct the error in the participle clause: "Having warned by security guards, the tourists stepped away from the ledge."',
      options: [],
      acceptedAnswers: [
        { text: 'Having been warned by security guards, the tourists stepped away from the ledge.', rationale: 'Inserts been to form the required passive perfect participle.' },
        { text: 'Warned by security guards, the tourists stepped away from the ledge.', rationale: 'Simplifies to past participle Warned.' },
      ],
    },
    {
      id: 'grammar-v2-b2-participle-clauses-passive-21-q12',
      kind: 'correction',
      prompt: 'Correct the sentence to fix the dangling participle: "Overwhelmed by the floodwaters, rescue workers had to evacuate the residents."',
      options: [],
      acceptedAnswers: [
        { text: 'Overwhelmed by the floodwaters, the residents had to be evacuated by rescue workers.', rationale: 'Aligns the residents as the subject overwhelmed by the floodwaters.' },
      ],
    },
  ],
  reviewExercises: [
    {
      id: 'grammar-v2-b2-participle-clauses-passive-21-r1',
      kind: 'choice',
      prompt: 'Which participle construction accurately conveys prior passive completion? "___ by an unexpected gale, the ship sought shelter in the cove."',
      options: [
        { text: 'Having been battered', correct: true, rationale: 'Having been battered shows completed prior passive experience before seeking shelter.' },
        { text: 'Having battered', correct: false, rationale: 'Active participle implies the ship battered something else.' },
        { text: 'Being batter', correct: false, rationale: 'Incomplete verb form; batter lacks past participle inflection.' },
      ],
      acceptedAnswers: [{ text: 'Having been battered', rationale: 'Uses correct perfect passive participle.' }],
    },
    {
      id: 'grammar-v2-b2-participle-clauses-passive-21-r2',
      kind: 'gap',
      prompt: 'Fill in the missing word: "_____ discovered by archaeologists in 1922, the tomb had remained untouched for millennia."',
      options: [],
      acceptedAnswers: [{ text: 'When', rationale: 'When discovered creates a reduced temporal passive clause.' }, { text: 'Although', rationale: 'Although discovered functions conditionally/concessively.' }, { text: 'Until', rationale: 'Until discovered sets the temporal endpoint.' }],
    },
    {
      id: 'grammar-v2-b2-participle-clauses-passive-21-r3',
      kind: 'transform',
      prompt: 'Rewrite using "Having been": "Because she had been selected for the fellowship, the researcher relocated to Cambridge."',
      options: [],
      acceptedAnswers: [
        { text: 'Having been selected for the fellowship, the researcher relocated to Cambridge.', rationale: 'Reduces causal passive clause to Having been selected.' },
      ],
    },
    {
      id: 'grammar-v2-b2-participle-clauses-passive-21-r4',
      kind: 'correction',
      prompt: 'Correct the dangling participle error: "Trained in classical ballet, the performance was praised by critics."',
      options: [],
      acceptedAnswers: [
        { text: 'Trained in classical ballet, the dancer was praised by critics for her performance.', rationale: 'Aligns the trained person as the subject of the main clause.' },
        { text: 'Because the dancer was trained in classical ballet, the performance was praised by critics.', rationale: 'Expands participle clause to full causal clause.' },
      ],
    },
  ],
  outputPrompts: [
    {
      id: 'grammar-v2-b2-participle-clauses-passive-21-o1',
      prompt: 'Viết 1-2 câu học thuật miêu tả một di tích kiến trúc hoặc tác phẩm nghệ thuật, sử dụng mệnh đề phân từ bị động mở đầu bằng quá khứ phân từ (V3) (ví dụ: "Constructed in...", "Preserved by...").',
      modelAnswer: 'Constructed during the late fourteenth century, the stone fortress overlooks the strategic mountain pass. Restored by international conservators, the interior halls now house rare medieval tapestries.',
      checks: [
        'Mở đầu câu bằng quá khứ phân từ (V3) mang nghĩa bị động.',
        'Chủ ngữ của mệnh đề chính là đối tượng được xây dựng / bảo tồn (không mắc lỗi phân từ treo).',
        'Văn phong học thuật, trang trọng.',
      ],
    },
    {
      id: 'grammar-v2-b2-participle-clauses-passive-21-o2',
      prompt: 'Viết 1-2 câu kể lại một quyết định nghề nghiệp hoặc chính sách kinh doanh, sử dụng phân từ hoàn thành bị động "Having been + V3" chỉ nguyên nhân hoặc sự việc đi trước.',
      modelAnswer: 'Having been advised by corporate risk analysts, the executive committee postponed the planned market expansion. Having been tested in simulated environments, the new protocols were subsequently implemented across all branches.',
      checks: [
        'Sử dụng cấu trúc Having been + V3 để chỉ hành động bị động đã hoàn tất trước.',
        'Đảm bảo chủ ngữ mệnh đề chính tương thích với chủ thể chịu tác động.',
        'Sử dụng từ vựng và cấu trúc câu tự nhiên, chính xác.',
      ],
    },
  ],
  sources: [
    {
      id: 'cambridge-participle-clauses',
      title: 'Cambridge Dictionary: Participle clauses',
      url: 'https://dictionary.cambridge.org/grammar/british-grammar/participle-clauses',
      claims: [
        'Past participle clauses have a passive meaning and can replace passive relative or adverbial clauses.',
        'Having been + past participle emphasizes that the passive action was completed before the main clause event.',
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
