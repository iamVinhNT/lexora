/**
 * @file reported-tense-shifts.ts
 * @description B1 lesson on backshifting rules, modal changes, and exceptions for permanent truths in reported speech.
 */
import type { GrammarLesson } from '../../types.js';

const reportedTenseShiftsLesson: GrammarLesson = {
  id: 'grammar-v2-b1-reported-tense-shifts-17',
  revisionId: 'grammar-v2-b1-reported-tense-shifts-17@1.0.0',
  revision: '1.0.0',
  title: 'Câu tường thuật: Quy tắc lùi thì và ngoại lệ (Reported Tense Shifts)',
  objective: 'Nắm vững quy tắc lùi thì khi động từ giới thiệu ở quá khứ, biến đổi động từ khuyết thiếu và nhận biết các trường hợp giữ nguyên thì.',
  prerequisiteIds: ['grammar-v2-b1-reported-statements-16'],
  coverage: ['reported-tense-shifts', 'backshift-rules', 'permanent-truths', 'modal-shifts', 'tense-harmony'],
  context: {
    english: 'The teacher said, "Pure water boils at 100 degrees Celsius at standard atmospheric pressure." Later, Viet reported the fact using the present tense because it was still true.',
    vietnamese: 'Giáo viên nói: "Nước tinh khiết sôi ở 100 độ C dưới áp suất khí quyển tiêu chuẩn." Sau đó Việt thuật lại ở hiện tại vì sự thật đó vẫn đúng.',
  },
  guide: {
    pattern: 'Direct: V(present) -> Reported: V(past) / Direct: V(past/perfect) -> Reported: had + V3',
    whenToUse: [
      'Thường lùi thì khi thuật lại với said/told; không coi đây là bắt buộc trong mọi ngữ cảnh.',
      'Will -> would, can -> could, may (khả năng) -> might. Must chỉ nghĩa vụ thường thành had to; must suy đoán thường giữ nguyên.',
      'Có thể giữ thì nếu nội dung vẫn đúng hoặc còn liên quan; cũng có thể backshift sự thật vẫn đúng.',
    ],
    signalWords: ['said that', 'explained that', 'had to', 'would', 'could'],
    check: [
      'Động từ giới thiệu có ở quá khứ không (nếu says/tells ở hiện tại thì không lùi thì)?',
      'Động từ khuyết thiếu có nằm trong nhóm không đổi không (should, would, could, might, ought to)?',
      'Sự việc được tường thuật có phải là chân lý hiển nhiên hoặc vẫn đang đúng lúc này không?',
    ],
  },
  explanation: 'Với động từ tường thuật ở quá khứ, ta thường backshift: present simple -> past simple; present continuous -> past continuous; past simple/present perfect -> past perfect. Past perfect không lùi thêm. Will thường thành would, can thành could, may chỉ khả năng thành might. Must chỉ nghĩa vụ thường thành had to, nhưng có thể giữ must cho nghĩa vụ còn hiệu lực; must suy đoán thường không đổi. Should, could, would, might thường giữ nguyên. Backshift không bắt buộc: với điều vẫn đúng hoặc còn liên quan, người nói có thể giữ thì gốc, kể cả thì tiếp diễn. Một sự thật khoa học có thể được thuật lại ở hiện tại hoặc backshift; dạng quá khứ không tự nó có nghĩa sự thật đã hết đúng. Bài tập ghi rõ khi cần luyện backshift hoặc giữ hiện tại.',
  examples: [
    { english: 'Direct: "I am reading an interesting article," Trang said. -> Reported: Trang said that she was reading an interesting article.', vietnamese: 'Trực tiếp: "Tôi đang đọc một bài báo hay," Trang nói. -> Gián tiếp: Trang nói rằng cô ấy đang đọc một bài báo hay.' },
    { english: 'Direct: "We have lived in Hue for five years," Phong said. -> Reported: Phong said that they had lived in Hue for five years.', vietnamese: 'Trực tiếp: "Chúng tôi đã sống ở Huế được năm năm," Phong nói. -> Gián tiếp: Phong nói rằng họ đã sống ở Huế được năm năm.' },
    { english: 'Direct: "I lost my umbrella on the train," Long said. -> Reported: Long said that he had lost his umbrella on the train.', vietnamese: 'Trực tiếp: "Tôi đã làm mất ô trên tàu," Long nói. -> Gián tiếp: Long nói rằng anh ấy đã làm mất chiếc ô trên tàu.' },
    { english: 'Direct: "You must wear a helmet," the officer said. -> Reported: The officer said that we had to wear a helmet.', vietnamese: 'Trực tiếp: "Các bạn phải đội mũ bảo hiểm," viên cảnh sát nói. -> Gián tiếp: Cảnh sát nói rằng chúng tôi phải đội mũ bảo hiểm.' },
    { english: 'Direct: "You should see a doctor," my friend said. -> Reported: My friend said that I should see a doctor.', vietnamese: 'Trực tiếp: "Bạn nên đi khám bác sĩ," bạn tôi nói. -> Gián tiếp: Bạn tôi nói rằng tôi nên đi khám bác sĩ.' },
    { english: 'Direct: "The Earth moves around the Sun," the teacher said. -> Reported: The teacher said that the Earth moves around the Sun.', vietnamese: 'Trực tiếp: "Trái Đất quay quanh Mặt Trời," giáo viên nói. -> Gián tiếp: Giáo viên nói rằng Trái Đất quay quanh Mặt Trời.' },
  ],
  contrasts: [
    {
      form: 'He said he lived in Hanoi vs The teacher said pure water boils at 100°C at standard atmospheric pressure',
      whyFits: 'Lived minh họa backshift; boils minh họa lựa chọn giữ hiện tại cho điều vẫn đúng.',
      whyNot: 'Không suy ra lived nghĩa là đã chuyển nhà, hoặc boiled là sai chỉ vì sự thật vẫn đúng. Cả giữ thì và backshift có thể phù hợp.',
    },
    {
      form: 'She said she had to leave (must -> had to) vs She said she should leave (should -> should)',
      whyFits: 'Must chỉ nghĩa vụ thường thành had to khi thuật lại; should thường giữ nguyên trong lời khuyên.',
      whyNot: 'Không biến should thành would should hoặc had should vì tiếng Anh không có dạng đó.',
    },
  ],
  commonMistakes: [
    'Coi backshift là bắt buộc hoặc coi thì quá khứ của một sự thật khoa học là sai. Cả hiện tại và quá khứ đều có thể phù hợp.',
    'Tạo dạng không tồn tại như would should hoặc musted thay vì giữ should hay dùng had to theo nghĩa.',
    'Đổi thì nhưng làm mất thể tiếp diễn khi bài yêu cầu backshift: am working -> was working, không phải had worked.',
  ],
  summary: 'Backshift thường gặp: present -> past, past/present perfect -> past perfect, will -> would, can -> could. Must nghĩa vụ thường -> had to; must suy đoán thường giữ nguyên. Điều vẫn đúng có thể giữ thì gốc; backshift không tự phủ nhận sự thật đó.',
  exercises: [
    {
      id: 'grammar-v2-b1-reported-tense-shifts-17-q1',
      kind: 'choice',
      prompt: 'Choose the correct backshifted verb: "I am writing an email," An said. -> An said that he _____ an email.',
      options: [
        { text: 'was writing', correct: true, rationale: 'Present continuous (am writing) backshifts to past continuous (was writing).' },
        { text: 'is writing', correct: false, rationale: 'Fails to backshift to match past reporting verb said.' },
        { text: 'had written', correct: false, rationale: 'Changes the continuous aspect to past perfect simple.' },
        { text: 'wrote', correct: false, rationale: 'Changes continuous to past simple.' },
      ],
      acceptedAnswers: [{ text: 'was writing', rationale: 'Present continuous backshifts to past continuous.' }],
    },
    {
      id: 'grammar-v2-b1-reported-tense-shifts-17-q2',
      kind: 'choice',
      prompt: 'Select the sentence that keeps the present simple to report a currently valid scientific fact:',
      options: [
        { text: 'The professor stated that light travels faster than sound.', correct: true, rationale: 'Permanent scientific truths retain present simple (travels).' },
        { text: 'The professor stated that light had traveled faster than sound.', correct: false, rationale: 'Unnecessarily shifts a perpetual scientific law into past perfect.' },
        { text: 'The professor stated that light would travel faster than sound.', correct: false, rationale: 'Would expresses conditional or future, not eternal fact.' },
        { text: 'The professor stated that light was traveling faster than sound.', correct: false, rationale: 'Past continuous suggests a temporary action, which is incorrect.' },
      ],
      acceptedAnswers: [{ text: 'The professor stated that light travels faster than sound.', rationale: 'Scientific facts retain present simple.' }],
    },
    {
      id: 'grammar-v2-b1-reported-tense-shifts-17-q3',
      kind: 'choice',
      prompt: 'Report after the noon deadline, backshifting the past obligation: "You must submit the application by noon," the officer told me.',
      options: [
        { text: 'The officer told me that I had to submit the application by noon.', correct: true, rationale: '"Must" denoting obligation backshifts to "had to".' },
        { text: 'The officer told me that I musted submit the application by noon.', correct: false, rationale: '"Musted" is not an English word.' },
        { text: 'The officer told me that I should have to submit the application by noon.', correct: false, rationale: 'Unnatural and ungrammatical modal combination.' },
        { text: 'The officer told me that I will have to submit the application by noon.', correct: false, rationale: 'Fails to backshift will to would/had to.' },
      ],
      acceptedAnswers: [{ text: 'The officer told me that I had to submit the application by noon.', rationale: '"Must" backshifts to "had to".' }],
    },
    {
      id: 'grammar-v2-b1-reported-tense-shifts-17-q4',
      kind: 'choice',
      prompt: 'Report the past simple event: "I already locked the door," Khanh said.',
      options: [
        { text: 'Khanh said that he had already locked the door.', correct: true, rationale: 'Past simple (locked) backshifts to past perfect (had locked).' },
        { text: 'Khanh said that he has already locked the door.', correct: false, rationale: 'Fails to backshift present auxiliary has.' },
        { text: 'Khanh said that he would lock the door.', correct: false, rationale: 'Would lock refers to the future, not a completed past action.' },
        { text: 'Khanh told that he had already locked the door.', correct: false, rationale: '"Told" requires an object.' },
      ],
      acceptedAnswers: [{ text: 'Khanh said that he had already locked the door.', rationale: 'Past simple backshifts to past perfect.' }],
    },
    {
      id: 'grammar-v2-b1-reported-tense-shifts-17-q5',
      kind: 'gap',
      prompt: 'Backshift the modal auxiliary: "I will attend the conference," Nga said. -> Nga said that she _____ attend the conference.',
      options: [],
      acceptedAnswers: [{ text: 'would', rationale: '"Will" shifts to "would" in reported speech.' }],
    },
    {
      id: 'grammar-v2-b1-reported-tense-shifts-17-q6',
      kind: 'gap',
      prompt: 'Backshift the modal: "We can complete the task today," the team said. -> The team said that they _____ complete the task that day.',
      options: [],
      acceptedAnswers: [{ text: 'could', rationale: '"Can" shifts to "could" in reported speech.' }],
    },
    {
      id: 'grammar-v2-b1-reported-tense-shifts-17-q7',
      kind: 'gap',
      prompt: 'Backshift the verb into past simple: "I know the answer," Duc said. -> Duc said that he _____ the answer.',
      options: [],
      acceptedAnswers: [{ text: 'knew', rationale: 'Present simple "know" backshifts to past simple "knew".' }],
    },
    {
      id: 'grammar-v2-b1-reported-tense-shifts-17-q8',
      kind: 'gap',
      prompt: 'Provide the reported modal: "You should take an umbrella," she said. -> She said that I _____ take an umbrella.',
      options: [],
      acceptedAnswers: [{ text: 'should', rationale: '"Should" does not change form in reported speech.' }],
    },
    {
      id: 'grammar-v2-b1-reported-tense-shifts-17-q9',
      kind: 'transform',
      prompt: 'Report using backshift; begin "Linh told us" and use she: "I have never seen snow before," Linh told us.',
      options: [],
      acceptedAnswers: [
        { text: 'Linh told us that she had never seen snow before.', rationale: 'Shifts present perfect "have never seen" to past perfect "had never seen".' },
        { text: 'Linh told us she had never seen snow before.', rationale: 'Accepts omission of that.' },
      ],
    },
    {
      id: 'grammar-v2-b1-reported-tense-shifts-17-q10',
      kind: 'transform',
      prompt: 'Report while keeping present simple; begin "The guide said": "The Mekong River flows through several countries," the guide said.',
      options: [],
      acceptedAnswers: [
        { text: 'The guide said that the Mekong River flows through several countries.', rationale: 'Permanent geographical facts retain present simple "flows".' },
        { text: 'The guide said the Mekong River flows through several countries.', rationale: 'Accepts omission of that.' },
      ],
    },
    {
      id: 'grammar-v2-b1-reported-tense-shifts-17-q11',
      kind: 'correction',
      prompt: 'Correct the tense error: "Nam said that he is living in Da Nang when he was a student."',
      options: [],
      acceptedAnswers: [
        { text: 'Nam said that he was living in Da Nang when he was a student.', rationale: 'Corrects "is living" to past continuous "was living" to match past narrative.' },
        { text: 'Nam said that he lived in Da Nang when he was a student.', rationale: 'Past simple "lived" is also grammatically acceptable.' },
      ],
    },
    {
      id: 'grammar-v2-b1-reported-tense-shifts-17-q12',
      kind: 'correction',
      prompt: 'Correct the error in reporting modal: "My father said that I would should study harder."',
      options: [],
      acceptedAnswers: [
        { text: 'My father said that I should study harder.', rationale: '"Should" remains "should" without adding "would".' },
      ],
    },
  ],
  reviewExercises: [
    {
      id: 'grammar-v2-b1-reported-tense-shifts-17-r1',
      kind: 'choice',
      prompt: 'Choose the correct reported clause: "We bought the tickets online," they said.',
      options: [
        { text: 'They said that they had bought the tickets online.', correct: true, rationale: 'Past simple (bought) shifts to past perfect (had bought).' },
        { text: 'They said that they have bought the tickets online.', correct: false, rationale: 'Present perfect has not backshifted.' },
        { text: 'They said that they would buy the tickets online.', correct: false, rationale: 'Would buy indicates future intention, not completed purchase.' },
      ],
      acceptedAnswers: [{ text: 'They said that they had bought the tickets online.', rationale: 'Past simple shifts to past perfect.' }],
    },
    {
      id: 'grammar-v2-b1-reported-tense-shifts-17-r2',
      kind: 'gap',
      prompt: 'Backshift the present continuous verb: "I am working on a new project," Quan said. -> Quan said that he _____ on a new project.',
      options: [],
      acceptedAnswers: [{ text: 'was working', rationale: 'Present continuous backshifts to past continuous.' }],
    },
    {
      id: 'grammar-v2-b1-reported-tense-shifts-17-r3',
      kind: 'transform',
      prompt: 'Report later from another place using backshift; begin "The technician said" and use they for the whole repair team: "We can fix this printer," the technician said.',
      options: [],
      acceptedAnswers: [
        { text: 'The technician said that they could fix that printer.', rationale: 'We refers to the repair team, so it becomes they; can -> could, this -> that.' },
        { text: 'The technician said they could fix that printer.', rationale: 'That may be omitted.' },
      ],
    },
    {
      id: 'grammar-v2-b1-reported-tense-shifts-17-r4',
      kind: 'correction',
      prompt: 'Change only froze to present simple to present the statement as a current fact (the original backshift is also grammatical): "The science teacher said that pure water froze at zero degrees Celsius at standard atmospheric pressure."',
      options: [],
      acceptedAnswers: [
        { text: 'The science teacher said that pure water freezes at zero degrees Celsius at standard atmospheric pressure.', rationale: 'Freezes presents the fact as current; froze was not inherently a reporting error.' },
      ],
    },
  ],
  outputPrompts: [
    {
      id: 'grammar-v2-b1-reported-tense-shifts-17-o1',
      prompt: 'Viết 2 câu tường thuật lời của một người bạn: một câu về việc bạn ấy đã làm trong quá khứ (lùi về past perfect) và một câu về kế hoạch bạn ấy sẽ làm (will -> would).',
      modelAnswer: 'Mai said that she had visited Ha Long Bay during the previous summer. She also told me that she would travel to Sapa the following month.',
      checks: [
        'Sử dụng đúng thì quá khứ hoàn thành (had + V3) cho hành động quá khứ.',
        'Lùi "will" thành "would" cho kế hoạch tương lai trong câu gián tiếp.',
        'Chuyển đổi trạng từ thời gian phù hợp (the previous summer, the following month).',
      ],
    },
    {
      id: 'grammar-v2-b1-reported-tense-shifts-17-o2',
      prompt: 'Viết 2 câu: một câu tường thuật một chân lý/sự thật khoa học (giữ nguyên thì hiện tại) và một câu tường thuật yêu cầu bắt buộc (must -> had to).',
      modelAnswer: 'The geography teacher explained that the sun rises in the east. She also reminded the class that all students had to finish their essays before Friday.',
      checks: [
        'Giữ nguyên thì hiện tại đơn cho sự thật khoa học/tự nhiên (rises).',
        'Biến đổi "must" thành "had to" cho yêu cầu bắt buộc trong quá khứ.',
        'Ngữ pháp và văn phong tự nhiên, chính xác.',
      ],
    },
  ],
  sources: [
    {
      id: 'british-council-reported-speech-tenses',
      title: 'British Council LearnEnglish: Reported speech – tense shifts',
      url: 'https://learnenglish.britishcouncil.org/grammar/b1-b2-grammar/reported-speech-1-statements',
      claims: [
        'Tenses usually shift back when the reporting verb is in the past.',
        'Modals shift (will -> would, can -> could, must -> had to), but should and could remain unchanged.',
        'General truths and permanent facts often remain in the present tense.',
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

export default reportedTenseShiftsLesson;
