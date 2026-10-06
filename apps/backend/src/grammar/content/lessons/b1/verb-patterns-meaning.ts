/**
 * @file verb-patterns-meaning.ts
 * @description B1 lesson on verbs followed by gerund or infinitive with a clear change in meaning (remember, forget, stop, try, regret).
 */
import type { GrammarLesson } from '../../types.js';

const verbPatternsMeaningLesson: GrammarLesson = {
  id: 'grammar-v2-b1-verb-patterns-meaning-24',
  revisionId: 'grammar-v2-b1-verb-patterns-meaning-24@1.0.0',
  revision: '1.0.0',
  title: 'Động từ đổi nghĩa theo dạng: V-ing vs To-V (Verb Patterns with Meaning Change)',
  objective: 'Phân biệt và vận dụng chuẩn xác sự thay đổi ngữ nghĩa khi các động từ remember, forget, stop, try, regret đi với to-infinitive so với V-ing (gerund).',
  prerequisiteIds: ['grammar-v2-b1-whose-where-when-23'],
  coverage: ['verb-patterns-meaning', 'remember-forget-stop-try-regret', 'gerund-vs-infinitive', 'meaning-change', 'verb-complementation'],
  context: {
    english: 'Before leaving for the airport, Minh remembered to pack his passport, and while sitting on the plane, he clearly remembered double-checking his flight tickets the night before.',
    vietnamese: 'Trước khi ra sân bay, Minh nhớ phải mang theo hộ chiếu, và khi ngồi trên máy bay, anh nhớ lại rất rõ việc mình đã kiểm tra vé bay hai lần vào tối hôm trước.',
  },
  guide: {
    pattern: 'remember/forget + to-V: task; + V-ing: memory | stop + to-V: purpose; + V-ing: cease | try + to-V: attempt; + V-ing: method | regret + to-V: announce; + V-ing: remorse',
    whenToUse: [
      'remember / forget to-V: nhớ / quên phải làm một bổn phận hay kế hoạch trong tương lai.',
      'remember / forget V-ing: nhớ / quên một trải nghiệm, kỷ niệm đã xảy ra trong quá khứ.',
      'stop to-V: tạm dừng việc đang làm ĐỂ làm việc khác (chỉ mục đích).',
      'stop V-ing: ngừng hành động hoặc thói quen; không tự khẳng định việc ngừng là vĩnh viễn.',
      'try to-V: nỗ lực, cố gắng vượt qua khó khăn để làm điều gì.',
      'try V-ing: thử nghiệm một phương pháp, cách thức xem có hiệu quả hay không.',
      'regret to-V: lấy làm tiếc phải thông báo điều gì (thường là tin buồn).',
      'regret V-ing: hối hận vì đã làm một việc trong quá khứ.',
    ],
    signalWords: ['remember to bring', 'remember meeting', 'stop to rest', 'stop shouting', 'try to lift', 'try restarting', 'regret to inform', 'regret saying'],
    check: [
      'Phân biệt theo từng động từ; không áp dụng quy tắc chung rằng mọi V-ing đều là quá khứ hay mọi to-V đều là tương lai.',
      'Với "stop", chủ ngữ dừng lại để làm việc gì (to-V) hay chấm dứt hẳn hành vi (V-ing)?',
      'Với "try", đây là sự nỗ lực khó nhọc (try to do) hay một phép thử nghiệm giải pháp (try doing)?',
    ],
  },
  explanation: 'Remember/forget to-V nói về việc nhớ/quên thực hiện nhiệm vụ; remember/forget V-ing nói về ký ức một việc đã xảy ra. Remembered to lock trong lời kể quá khứ cho biết đã nhớ và đã khóa, không phải tương lai so với hiện tại. Stop V-ing nghĩa là ngừng hành động, tạm thời hoặc lâu dài tùy ngữ cảnh; stop to-V nghĩa là dừng việc khác để làm việc này. Try to-V nhấn mạnh cố gắng thực hiện; try V-ing nhấn mạnh thử phương pháp, không hàm ý hời hợt hay ít nỗ lực. Regret V-ing diễn tả hối tiếc; regret to inform/tell/say thường mở thông báo trang trọng. Những khác biệt này theo từng động từ, không phải quy luật thời gian cho mọi to-V và V-ing.',
  examples: [
    { english: 'Please remember to lock the front door before going to bed.', vietnamese: 'Làm ơn hãy nhớ khóa cửa chính trước khi đi ngủ (nhiệm vụ cần thực hiện).' },
    { english: 'I still remember meeting my best friend on our first day of high school.', vietnamese: 'Tôi vẫn nhớ kỷ niệm lần đầu gặp người bạn thân vào ngày đầu vào cấp ba (nhớ về sự kiện quá khứ).' },
    { english: 'On the road trip, we stopped to take photos of the sunrise.', vietnamese: 'Trên chuyến đi phượt, chúng tôi đã dừng xe lại để chụp ảnh bình minh (dừng lại để làm việc khác).' },
    { english: 'The doctor advised him to stop smoking immediately.', vietnamese: 'Bác sĩ khuyên ông ấy nên bỏ hút thuốc ngay lập tức (chấm dứt hoàn toàn thói quen).' },
    { english: 'He tried to move the heavy wardrobe by himself, but it was impossible.', vietnamese: 'Anh ấy đã cố gắng tự di chuyển chiếc tủ nặng một mình nhưng không thể (nỗ lực làm việc khó).' },
    { english: 'If your computer freezes, try restarting it in safe mode.', vietnamese: 'Nếu máy tính bị đơ, hãy thử khởi động lại ở chế độ an toàn xem sao (thử nghiệm phương pháp).' },
  ],
  contrasts: [
    {
      form: 'I stopped to talk to Lan vs I stopped talking to Lan',
      whyFits: '"Stopped to talk" có nghĩa là tôi đang đi hoặc đang làm việc gì đó rồi dừng lại ĐỂ nói chuyện với Lan.',
      whyNot: '"Stopped talking" có nghĩa là tôi và Lan đang nói chuyện thì tôi im lặng, hoặc tôi đã tuyệt giao không trò chuyện với Lan nữa.',
    },
    {
      form: 'We regret to inform you vs I regret telling him the secret',
      whyFits: '"Regret to inform" là công thức trang trọng lấy làm tiếc chuẩn bị thông báo tin không vui ngay lúc nói.',
      whyNot: '"Regret telling him" diễn tả sự ân hận, day dứt về hành động đã lỡ kể bí mật cho anh ta trong quá khứ.',
    },
  ],
  commonMistakes: [
    'Dùng "stop to V" khi muốn nói từ bỏ một thói quen (ví dụ viết "He stopped to smoke" mang nghĩa dừng lại để hút thuốc thay vì "stopped smoking").',
    'Dùng "remember doing" cho một lời nhắc nhở nhiệm vụ trong tương lai (ví dụ viết "Remember bringing your ID" thay vì "Remember to bring your ID").',
    'Nhầm lẫn giữa "try to V" (cố hết sức) và "try V-ing" (thử làm cách nào đó xem có tác dụng không).',
  ],
  summary: 'Remember/forget: nhiệm vụ với to-V, ký ức với V-ing. Stop: dừng để làm với to-V, ngừng làm với V-ing. Try: cố thực hiện với to-V, thử phương pháp với V-ing. Regret: thông báo với to inform/tell, hối tiếc với V-ing.',
  exercises: [
    {
      id: 'grammar-v2-b1-verb-patterns-meaning-24-q1',
      kind: 'choice',
      prompt: 'Choose the correct form: "Don\'t forget _____ the windows before you leave the office."',
      options: [
        { text: 'to close', correct: true, rationale: '"Forget to close" refers to a duty or task to be performed in the future.' },
        { text: 'closing', correct: false, rationale: '"Forget closing" refers to forgetting a past memory.' },
        { text: 'close', correct: false, rationale: '"Forget" cannot be followed directly by a bare infinitive.' },
        { text: 'closed', correct: false, rationale: 'Past participle cannot complement "forget" in this structure.' },
      ],
      acceptedAnswers: [{ text: 'to close', rationale: '"Forget to close" refers to a task that must be done.' }],
    },
    {
      id: 'grammar-v2-b1-verb-patterns-meaning-24-q2',
      kind: 'choice',
      prompt: 'Select the sentence meaning "quit the habit":',
      options: [
        { text: 'He stopped drinking sugary soft drinks after his annual medical check-up.', correct: true, rationale: '"Stop + V-ing" means to quit or cease an activity entirely.' },
        { text: 'He stopped to drink sugary soft drinks after his annual medical check-up.', correct: false, rationale: '"Stop to drink" means paused another activity in order to drink.' },
        { text: 'He stopped drink sugary soft drinks after his check-up.', correct: false, rationale: 'Grammatically invalid bare verb after stopped.' },
        { text: 'He stopped for drinking sugary soft drinks after his check-up.', correct: false, rationale: '"Stopped for drinking" is non-standard.' },
      ],
      acceptedAnswers: [{ text: 'He stopped drinking sugary soft drinks after his annual medical check-up.', rationale: '"Stop + V-ing" means abandoning the habit.' }],
    },
    {
      id: 'grammar-v2-b1-verb-patterns-meaning-24-q3',
      kind: 'choice',
      prompt: 'Choose the correct option for experimenting with a solution: "If you have trouble sleeping, try _____ a warm glass of milk before bed."',
      options: [
        { text: 'drinking', correct: true, rationale: '"Try + V-ing" means experimenting with a method to see if it solves a problem.' },
        { text: 'to drink', correct: false, rationale: '"Try to drink" implies making a difficult physical effort to swallow.' },
        { text: 'drink', correct: false, rationale: 'Bare infinitive cannot complement "try" here.' },
        { text: 'drank', correct: false, rationale: 'Past tense cannot complement "try".' },
      ],
      acceptedAnswers: [{ text: 'drinking', rationale: '"Try + V-ing" tests a potential solution.' }],
    },
    {
      id: 'grammar-v2-b1-verb-patterns-meaning-24-q4',
      kind: 'choice',
      prompt: 'Which sentence expresses regret about an action already performed in the past?',
      options: [
        { text: 'I regret lending him my favorite jacket because he lost it.', correct: true, rationale: '"Regret + V-ing" expresses remorse about a past action.' },
        { text: 'We regret to inform you that your application was unsuccessful.', correct: false, rationale: '"Regret to inform" is a formal notice of bad news in the present.' },
        { text: 'I regret to tell you the final score.', correct: false, rationale: '"Regret to tell" introduces news now.' },
        { text: 'She regrets to leave the meeting early.', correct: false, rationale: 'Incorrect use for past remorse.' },
      ],
      acceptedAnswers: [{ text: 'I regret lending him my favorite jacket because he lost it.', rationale: '"Regret + V-ing" expresses past remorse.' }],
    },
    {
      id: 'grammar-v2-b1-verb-patterns-meaning-24-q5',
      kind: 'gap',
      prompt: 'Ask whether the duty was fulfilled, not whether there is a memory of it. Fill with to lock/locking: "Did you remember _____ the back gate when you left this morning?"',
      options: [],
      acceptedAnswers: [{ text: 'to lock', rationale: '"Remember to lock" asks about fulfilling a duty/task.' }],
    },
    {
      id: 'grammar-v2-b1-verb-patterns-meaning-24-q6',
      kind: 'gap',
      prompt: 'Fill in the correct form of "visit" (to visit / visiting): "Grandpa still remembers _____ the seaside for the first time in 1955."',
      options: [],
      acceptedAnswers: [{ text: 'visiting', rationale: '"Remember visiting" recalls a past memory.' }],
    },
    {
      id: 'grammar-v2-b1-verb-patterns-meaning-24-q7',
      kind: 'gap',
      prompt: 'The driver paused driving in order to stretch. Fill with to stretch/stretching: "The long-distance driver stopped _____ his legs at the service station."',
      options: [],
      acceptedAnswers: [{ text: 'to stretch', rationale: '"Stopped to stretch" expresses the purpose of stopping.' }],
    },
    {
      id: 'grammar-v2-b1-verb-patterns-meaning-24-q8',
      kind: 'gap',
      prompt: 'Fill in the correct form of "inform" (to inform / informing): "The airline regrets _____ passengers that flight VN234 has been delayed."',
      options: [],
      acceptedAnswers: [{ text: 'to inform', rationale: '"Regret to inform" is standard for delivering formal bad news.' }],
    },
    {
      id: 'grammar-v2-b1-verb-patterns-meaning-24-q9',
      kind: 'transform',
      prompt: 'Rewrite using "stop + V-ing": "Hoa gave up eating junk food three months ago."',
      options: [],
      acceptedAnswers: [
        { text: 'Hoa stopped eating junk food three months ago.', rationale: 'Uses "stopped eating" to denote quitting a habit.' },
      ],
    },
    {
      id: 'grammar-v2-b1-verb-patterns-meaning-24-q10',
      kind: 'transform',
      prompt: 'Rewrite using "remember to": "Do not forget to water the houseplants while I am away."',
      options: [],
      acceptedAnswers: [
        { text: 'Remember to water the houseplants while I am away.', rationale: 'Changes negative "Do not forget to water" to affirmative "Remember to water".' },
      ],
    },
    {
      id: 'grammar-v2-b1-verb-patterns-meaning-24-q11',
      kind: 'correction',
      prompt: 'Correct the verb form to express quitting a habit: "My uncle was coughing badly, so he stopped to smoke."',
      options: [],
      acceptedAnswers: [
        { text: 'My uncle was coughing badly, so he stopped smoking.', rationale: 'Changes "stopped to smoke" (stopped in order to smoke) to "stopped smoking" (quit smoking).' },
      ],
    },
    {
      id: 'grammar-v2-b1-verb-patterns-meaning-24-q12',
      kind: 'correction',
      prompt: 'Correct the verb form: "I clearly remember to turn off the air conditioner before I locked the apartment."',
      options: [],
      acceptedAnswers: [
        { text: 'I clearly remember turning off the air conditioner before I locked the apartment.', rationale: 'Changes "to turn off" to "turning off" because it recalls a completed past action.' },
      ],
    },
  ],
  reviewExercises: [
    {
      id: 'grammar-v2-b1-verb-patterns-meaning-24-r1',
      kind: 'choice',
      prompt: 'Choose the sentence whose verb pattern emphasizes an attempt to achieve the goal rather than testing a method:',
      options: [
        { text: 'The mechanic tried to lift the heavy engine, but could not move it.', correct: true, rationale: 'Try to lift emphasizes the attempt to achieve lifting.' },
        { text: 'The mechanic tried lifting the engine with a new hoist to test the method.', correct: false, rationale: 'Try lifting frames lifting as a method being tested, not necessarily a casual or easy action.' },
        { text: 'The paramedic tried revive the patient.', correct: false, rationale: 'Bare infinitive is ungrammatical.' },
      ],
      acceptedAnswers: [{ text: 'The mechanic tried to lift the heavy engine, but could not move it.', rationale: 'Try to + verb emphasizes an attempt.' }],
    },
    {
      id: 'grammar-v2-b1-verb-patterns-meaning-24-r2',
      kind: 'gap',
      prompt: 'Nam paused his journey in order to buy fruit. Fill with to buy/buying: "On the way home from work, Nam stopped _____ some fresh fruit."',
      options: [],
      acceptedAnswers: [{ text: 'to buy', rationale: '"Stopped to buy" indicates stopping for the purpose of buying.' }],
    },
    {
      id: 'grammar-v2-b1-verb-patterns-meaning-24-r3',
      kind: 'transform',
      prompt: 'Rewrite using "deeply regret + V-ing"; preserve the degree of remorse: "I am deeply sorry that I spoke so angrily to my manager."',
      options: [],
      acceptedAnswers: [
        { text: 'I deeply regret speaking so angrily to my manager.', rationale: 'Deeply preserves the strength of remorse while regret speaking expresses the past action.' },
      ],
    },
    {
      id: 'grammar-v2-b1-verb-patterns-meaning-24-r4',
      kind: 'correction',
      prompt: 'Correct the error: "Don\'t forget bringing your passport to the embassy tomorrow morning."',
      options: [],
      acceptedAnswers: [
        { text: "Don't forget to bring your passport to the embassy tomorrow morning.", rationale: 'Changes "bringing" to "to bring" for a future task.' },
      ],
    },
  ],
  outputPrompts: [
    {
      id: 'grammar-v2-b1-verb-patterns-meaning-24-o1',
      prompt: 'Viết 2 câu: một câu với "stopped V-ing" kể về thói quen đã bỏ và một lời nhắc với "remember to V" về việc quan trọng cần làm mỗi ngày.',
      modelAnswer: 'I stopped staying up past midnight six months ago. Remember to pack your lunch before leaving for work each morning.',
      checks: [
        'Sử dụng đúng "stopped + V-ing" chỉ sự từ bỏ thói quen.',
        'Sử dụng đúng "remember to + V" chỉ việc cần làm.',
        'Ngữ cảnh thực tế, câu văn tự nhiên và đúng thì.',
      ],
    },
    {
      id: 'grammar-v2-b1-verb-patterns-meaning-24-o2',
      prompt: 'Viết 2 câu kể về một kỷ niệm tuổi thơ với "remember V-ing" và một giải pháp bạn đã thử nghiệm với "try V-ing".',
      modelAnswer: 'I vividly remember building sandcastles with my cousins during our first summer vacation in Da Nang. When I felt overwhelmed by exam stress last term, I tried practicing mindfulness meditation for fifteen minutes every evening.',
      checks: [
        'Sử dụng đúng "remember + V-ing" để nhớ về một trải nghiệm quá khứ.',
        'Sử dụng đúng "try + V-ing" cho việc thử nghiệm một giải pháp.',
        'Văn phong biểu đạt phong phú, đúng chuẩn B1.',
      ],
    },
  ],
  sources: [
    {
      id: 'british-council-verbs-followed-by-ing-or-infinitive',
      title: 'British Council LearnEnglish: Verbs followed by -ing or infinitive with changes in meaning',
      url: 'https://learnenglish.britishcouncil.org/grammar/b1-b2-grammar/verbs-followed-ing-or-infinitive',
      claims: [
        'Verbs like remember, forget, stop, try, and regret change meaning depending on whether they take an -ing form or a to-infinitive.',
        'To-infinitive generally looks forward or expresses purpose/duty; -ing form generally looks back or refers to the action itself/experimentation.',
      ],
      checkedAt: '2026-10-05',
      provenance: 'reference-only',
    },
  ],
  review: {
    status: 'approved',
    mode: 'ai-internal',
    reviewer: 'OpenAI Codex (AI-internal)',
    reviewedAt: '2026-10-06T00:00:00Z',
    summary: 'Reviewed the complete lesson for grammar accuracy, contextual answerability, distractors, authored variants, output prompts, and source-claim alignment. Applied editorial corrections where needed.',
    checks: { originalProse: true, factualExplanation: true, clearContrasts: true, singleCorrectChoice: true, validTransferExercises: true, soundOutputPrompts: true, referenceOnlySources: true },
  },
};

export default verbPatternsMeaningLesson;
