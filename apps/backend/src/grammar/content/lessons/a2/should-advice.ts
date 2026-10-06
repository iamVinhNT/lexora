/**
 * @file should-advice.ts
 * @description A2 lesson on modal verb 'should' and 'shouldn’t' for giving and asking for advice and recommendations.
 */
import type { GrammarLesson } from '../../types.js';

const shouldAdviceLesson: GrammarLesson = {
  id: 'grammar-v2-a2-should-advice-24',
  revisionId: 'grammar-v2-a2-should-advice-24@1.0.0',
  revision: '1.0.0',
  title: 'Động từ khuyết thiếu Should chỉ lời khuyên (Should and Shouldn’t for Advice)',
  objective: 'Sử dụng should và shouldn’t để đưa ra lời khuyên, đề xuất ý kiến nhẹ nhàng hoặc hỏi xin lời khuyên với Should I...?, phân biệt rạch ròi giữa lời khuyên (should) và nghĩa vụ bắt buộc (must / have to).',
  prerequisiteIds: ['grammar-v2-a2-must-not-vs-no-obligation-23'],
  coverage: ['should-advice', 'modals', 'advice', 'should', 'shouldnt'],
  context: {
    english: 'We use the modal verb "should" and its negative form "shouldn’t" to give advice, make friendly recommendations, and ask what is the best thing to do.',
    vietnamese: 'Chúng ta sử dụng động từ khuyết thiếu "should" và dạng phủ định "shouldn’t" để đưa ra lời khuyên, đề xuất gợi ý thân thiện và hỏi xem đâu là điều tốt nhất nên làm.',
  },
  guide: {
    pattern: 'Affirmative: S + should + V-bare | Negative: S + should not / shouldn’t + V-bare | Questions: Should + S + V-bare? | Opinion: I think you should... / I don’t think you should...',
    whenToUse: [
      'Đưa ra lời khuyên tích cực về điều tốt, hợp lý hoặc có lợi (You should drink more water every day).',
      'Khuyên ai đó không nên làm điều gì vì nó không tốt hoặc bất lợi (You shouldn’t stay up so late playing video games).',
      'Hỏi xin ý kiến hoặc gợi ý từ người khác (Should I wear the dark blue suit to the interview?).',
      'Diễn đạt quan điểm lịch sự, thường bắt đầu bằng "I think...": "I think you should see a doctor." / "I don’t think you should drive in this heavy rain."',
    ],
    signalWords: ['should', "shouldn't", 'should not', 'I think', "I don't think", 'good idea', 'advice', 'recommend'],
    check: [
      'Sau should và shouldn’t luôn là động từ nguyên mẫu không có "to" (You should go, không phải You should to go).',
      'Chủ ngữ số ít he/she/it không thêm -s vào should (She should, không bao giờ viết She shoulds).',
      'Khi đưa ra lời khuyên phủ định cùng "think", người bản ngữ thường dùng "I don’t think you should...", thay vì "I think you shouldn’t...".',
      'Should thường đưa ra lời khuyên ít mạnh hơn must/have to; sắc thái cụ thể tùy người nói và ngữ cảnh.',
    ],
  },
  explanation: 'Should/shouldn’t thường dùng để đưa ra lời khuyên, gợi ý hoặc quan điểm về điều nên làm. Should theo sau bởi động từ nguyên mẫu không to và không đổi theo chủ ngữ; câu hỏi đặt should trước chủ ngữ. So với must/have to, should thường đưa ra lời khuyên ít mạnh hơn chứ không tạo ra ranh giới tuyệt đối: sắc thái phụ thuộc vào người nói và ngữ cảnh.',
  examples: [
    {
      english: 'You look exhausted after work; you should take a warm bath and rest.',
      vietnamese: 'Bạn trông kiệt sức sau giờ làm việc; bạn nên tắm nước ấm và nghỉ ngơi.',
    },
    {
      english: 'Drivers shouldn’t check text messages on their smartphones while on the road.',
      vietnamese: 'Các tài xế không nên kiểm tra tin nhắn trên điện thoại khi đang lưu thông trên đường.',
    },
    {
      english: 'Should I email the professor directly or ask the teaching assistant first?',
      vietnamese: 'Tôi nên gửi thư điện tử trực tiếp cho giáo sư hay hỏi trợ giảng trước?',
    },
    {
      english: 'I think you should visit Da Lat during the dry season between December and March.',
      vietnamese: 'Tôi nghĩ bạn nên ghé thăm Đà Lạt vào mùa khô từ tháng mười hai đến tháng ba.',
    },
    {
      english: 'I don’t think we should walk home alone through the dark park at midnight.',
      vietnamese: 'Tôi không nghĩ chúng ta nên đi bộ về nhà một mình qua công viên tối tăm vào nửa đêm.',
    },
    {
      english: 'If you want to improve your spoken fluency, you should practice speaking English every day.',
      vietnamese: 'Nếu bạn muốn cải thiện độ lưu loát khi nói, bạn nên luyện nói tiếng Anh mỗi ngày.',
    },
  ],
  contrasts: [
    {
      form: 'You should eat more fresh vegetables for better digestive health.',
      whyFits: 'Should đưa ra lời khuyên lành mạnh về lối sống và dinh dưỡng (ý kiến gợi ý).',
      whyNot: '"You must eat more fresh vegetables..." quá nặng nề và mang tính áp đặt như một mệnh lệnh bắt buộc.',
    },
    {
      form: 'I don’t think you should lend him any more money.',
      whyFits: 'Cách diễn đạt tự nhiên và lịch sự của người bản ngữ khi khuyên can ai đó.',
      whyNot: '"I think you shouldn’t lend him..." tuy người nghe vẫn hiểu nhưng không tự nhiên bằng việc phủ định từ don’t think.',
    },
  ],
  commonMistakes: [
    'Thêm "to" sau should (viết "You should to go home" thay vì "You should go home").',
    'Thêm -s vào should ở ngôi thứ ba số ít (viết "He shoulds study harder").',
    'Dùng "must" thay vì "should" khi chỉ có ý định đưa ra một lời khuyên thân mật (khiến lời khuyên trở nên quá gay gắt như mệnh lệnh).',
  ],
  summary: 'Dùng should + V-bare để khuyên nên làm gì; shouldn’t + V-bare để khuyên không nên làm gì. Đảo Should lên đầu để hỏi xin lời khuyên. Thường kết hợp với "I think / I don’t think".',
  exercises: [
    {
      id: 'grammar-v2-a2-should-advice-24-q1',
      kind: 'choice',
      prompt: 'Select the correct advice form: "Your throat is sore; you ___ drink warm ginger tea with honey."',
      options: [
        { text: 'should', correct: true, rationale: 'Should đưa ra lời khuyên tích cực, hợp lý cho sức khỏe của người bị viêm họng.' },
        { text: 'should to', correct: false, rationale: 'Should là modal verb, không đi kèm giới từ to.' },
        { text: 'shoulds', correct: false, rationale: 'Should không nhận đuôi -s ở bất kỳ ngôi nào.' },
        { text: 'must to', correct: false, rationale: 'Must không đi cùng to và quá nặng nề cho một lời khuyên uống trà.' },
      ],
      acceptedAnswers: [{ text: 'should', rationale: 'Should gives friendly health advice followed by bare infinitive drink.' }],
    },
    {
      id: 'grammar-v2-a2-should-advice-24-q2',
      kind: 'choice',
      prompt: 'Choose the correct negative advice: "You have a big exam tomorrow morning; you ___ stay up late playing games."',
      options: [
        { text: 'shouldn’t', correct: true, rationale: 'Shouldn’t đưa ra lời khuyên ngăn cản việc thức khuya trước ngày thi.' },
        { text: 'don’t should', correct: false, rationale: 'Không dùng trợ động từ don’t trước modal verb should.' },
        { text: 'shouldn’t to', correct: false, rationale: 'Shouldn’t không đi cùng giới từ to.' },
        { text: 'mustn’t to', correct: false, rationale: 'Mustn’t không đi cùng to.' },
      ],
      acceptedAnswers: [{ text: 'shouldn’t', rationale: 'Shouldn’t advises against staying up late before an exam.' }],
    },
    {
      id: 'grammar-v2-a2-should-advice-24-q3',
      kind: 'choice',
      prompt: 'Choose the most natural way to express negative opinion: "___ you should invest in that risky business."',
      options: [
        { text: 'I don’t think', correct: true, rationale: '"I don’t think you should..." là cách diễn đạt tự nhiên nhất của người bản ngữ khi khuyên không nên làm gì.' },
        { text: 'I think not', correct: false, rationale: 'I think not you should sai ngữ pháp trong tiếng Anh hiện đại.' },
        { text: 'I am not think', correct: false, rationale: 'I am not think sai thì và sai cấu trúc trợ động từ.' },
        { text: 'I think that shouldn’t', correct: false, rationale: 'Thiếu chủ ngữ và thiếu tự nhiên so với I don’t think.' },
      ],
      acceptedAnswers: [{ text: 'I don’t think', rationale: 'Negative advice is naturally framed with I don’t think + affirmative clause.' }],
    },
    {
      id: 'grammar-v2-a2-should-advice-24-q4',
      kind: 'choice',
      prompt: 'Select the correct question asking for advice: "___ to the interview in a formal business suit?"',
      options: [
        { text: 'Should I go', correct: true, rationale: 'Đảo Should lên trước chủ ngữ I kèm động từ nguyên mẫu go để xin lời khuyên.' },
        { text: 'Do I should go', correct: false, rationale: 'Không dùng trợ động từ Do với modal verb Should.' },
        { text: 'Should I to go', correct: false, rationale: 'Should không kết hợp với động từ có to.' },
        { text: 'Am I should go', correct: false, rationale: 'Không dùng Am với Should.' },
      ],
      acceptedAnswers: [{ text: 'Should I go', rationale: 'Should inverts directly with subject I to ask for advice.' }],
    },
    {
      id: 'grammar-v2-a2-should-advice-24-q5',
      kind: 'gap',
      prompt: 'Fill in the blank with "should" or "shouldn\'t": "The sky is dark and cloudy; you _____ take an umbrella when you go out."',
      options: [],
      acceptedAnswers: [
        { text: 'should', rationale: 'Gives positive advice to take an umbrella due to cloudy weather.' },
      ],
    },
    {
      id: 'grammar-v2-a2-should-advice-24-q6',
      kind: 'gap',
      prompt: 'Fill in the blank with the negative form of "should": "You _____ eat too much salty fast food if you have high blood pressure."',
      options: [],
      acceptedAnswers: [
        { text: "shouldn't", rationale: 'Advises against eating salty food with negative modal shouldn’t.' },
        { text: 'should not', rationale: 'Uncontracted should not is accepted.' },
      ],
    },
    {
      id: 'grammar-v2-a2-should-advice-24-q7',
      kind: 'gap',
      prompt: 'Fill in the blank with the bare infinitive of "apologize": "You were quite rude to your colleague; you should _____ to her."',
      options: [],
      acceptedAnswers: [
        { text: 'apologize', rationale: 'Should is followed by the bare infinitive apologize.' },
        { text: 'apologise', rationale: 'British spelling apologise is equally accepted.' },
      ],
    },
    {
      id: 'grammar-v2-a2-should-advice-24-q8',
      kind: 'gap',
      prompt: 'Complete the question asking for advice: "What _____ (we / do) about the leaking ceiling in the living room?"',
      options: [],
      acceptedAnswers: [
        { text: 'should we do', rationale: 'Inversion of should with subject we asking for advice.' },
      ],
    },
    {
      id: 'grammar-v2-a2-should-advice-24-q9',
      kind: 'transform',
      prompt: 'Rewrite using "should": "It is a good idea for you to practice speaking English every day."',
      options: [],
      acceptedAnswers: [
        { text: 'You should practice speaking English every day.', rationale: 'Expresses advice using You should practice.' },
        { text: 'You should practise speaking English every day.', rationale: 'British spelling practise is accepted.' },
      ],
    },
    {
      id: 'grammar-v2-a2-should-advice-24-q10',
      kind: 'transform',
      prompt: 'Rewrite using "I don’t think you should": "My advice is that you do not buy that expensive sports car."',
      options: [],
      acceptedAnswers: [
        { text: "I don't think you should buy that expensive sports car.", rationale: 'Uses the polite natural frame I don’t think you should buy.' },
        { text: 'I do not think you should buy that expensive sports car.', rationale: 'Uncontracted form is accepted.' },
      ],
    },
    {
      id: 'grammar-v2-a2-should-advice-24-q11',
      kind: 'correction',
      prompt: 'Correct the error in this sentence: "If you feel unwell, you should to see a doctor immediately."',
      options: [],
      acceptedAnswers: [
        { text: 'If you feel unwell, you should see a doctor immediately.', rationale: 'Removes the incorrect particle to after should.' },
      ],
    },
    {
      id: 'grammar-v2-a2-should-advice-24-q12',
      kind: 'correction',
      prompt: 'Correct the error in this sentence: "Minh shoulds spend more time reviewing his lesson notes."',
      options: [],
      acceptedAnswers: [
        { text: 'Minh should spend more time reviewing his lesson notes.', rationale: 'Removes the incorrect third-person suffix -s from modal verb should.' },
      ],
    },
  ],
  reviewExercises: [
    {
      id: 'grammar-v2-a2-should-advice-24-r1',
      kind: 'choice',
      prompt: 'Choose the correct advice for a student: "You ___ read the exam instructions carefully before writing your answers."',
      options: [
        { text: 'should', correct: true, rationale: 'Should đưa ra lời khuyên hữu ích cho học sinh trước khi làm bài thi.' },
        { text: 'should to', correct: false, rationale: 'Should không đi kèm to.' },
        { text: 'are should', correct: false, rationale: 'Không kết hợp động từ be với should.' },
      ],
      acceptedAnswers: [{ text: 'should', rationale: 'Should gives helpful advice before starting an exam.' }],
    },
    {
      id: 'grammar-v2-a2-should-advice-24-r2',
      kind: 'gap',
      prompt: 'Fill in the blank with "should" or "shouldn\'t": "It is already midnight; you _____ play loud music in your apartment."',
      options: [],
      acceptedAnswers: [
        { text: "shouldn't", rationale: 'Advises against playing loud music late at night.' },
        { text: 'should not', rationale: 'Uncontracted should not is accepted.' },
      ],
    },
    {
      id: 'grammar-v2-a2-should-advice-24-r3',
      kind: 'transform',
      prompt: 'Rewrite as a question asking for advice: "Should I call the customer back right now?" (Rewrite confirming the meaning: "Is it a good idea for me to call the customer back right now?")',
      options: [],
      acceptedAnswers: [
        { text: 'Should I call the customer back right now?', rationale: 'Direct question asking for advice with Should I call.' },
      ],
    },
    {
      id: 'grammar-v2-a2-should-advice-24-r4',
      kind: 'correction',
      prompt: 'Correct the error: "You shouldn’t to drink cold water when you have a bad cough."',
      options: [],
      acceptedAnswers: [
        { text: "You shouldn't drink cold water when you have a bad cough.", rationale: 'Removes to after shouldn’t.' },
        { text: 'You should not drink cold water when you have a bad cough.', rationale: 'Uncontracted should not is accepted.' },
      ],
    },
  ],
  outputPrompts: [
    {
      id: 'grammar-v2-a2-should-advice-24-o1',
      prompt: 'Viết 2 câu đưa ra lời khuyên cho một người bạn đang chuẩn bị đi du lịch tại Việt Nam, dùng "should" cho điều nên làm và "shouldn’t" cho điều không nên làm.',
      modelAnswer: 'You should try authentic street food like bun cha when you visit Hanoi. However, you shouldn’t drink tap water directly without boiling it first.',
      checks: [
        'Dùng should + V-bare đưa ra lời khuyên tích cực.',
        'Dùng shouldn’t + V-bare đưa ra lời khuyên phòng tránh.',
        'Ý nghĩa tự nhiên, liên hệ thực tế phù hợp trình độ A2.',
      ],
    },
    {
      id: 'grammar-v2-a2-should-advice-24-o2',
      prompt: 'Viết 2 câu về một lời khuyên học ngoại ngữ, trong đó một câu dùng cấu trúc "I think you should..." và câu thứ hai dùng câu hỏi xin ý kiến "Should I...?".',
      modelAnswer: 'I think you should listen to English podcasts for fifteen minutes every morning. Should I also write a daily summary of what I hear?',
      checks: [
        'Sử dụng cấu trúc I think you should + V-bare.',
        'Sử dụng câu hỏi xin lời khuyên Should I + V-bare?',
        'Ngữ pháp chuẩn xác, câu văn gãy gọn.',
      ],
    },
  ],
  sources: [
    {
      id: 'british-council-modals-should',
      title: 'British Council: Modals – should and shouldn’t',
      url: 'https://learnenglish.britishcouncil.org/grammar/a1-a2-grammar/modals-should',
      claims: [
        'Should and shouldn’t are used to give advice or opinions about what is right or a good idea.',
        'Should is followed by a bare infinitive without to.',
        'Negative advice is often politely introduced with I don’t think you should.',
      ],
      checkedAt: '2026-10-05',
      provenance: 'reference-only',
    },
  ],
  review: {
    status: 'approved',
    mode: 'ai-internal',
    reviewer: 'Final review A2 curriculum.A2 audit east',
    reviewedAt: '2026-10-06T05:55:07.025Z',
  },
};

export default shouldAdviceLesson;
