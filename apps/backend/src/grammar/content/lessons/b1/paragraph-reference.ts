/**
 * @file paragraph-reference.ts
 * @description B1 lesson on paragraph cohesion, reference devices (pronouns, this/these + summary noun, substitution with one/ones, do so) and sequencing linkers.
 */
import type { GrammarLesson } from '../../types.js';

const paragraphReferenceLesson: GrammarLesson = {
  id: 'grammar-v2-b1-paragraph-reference-30',
  revisionId: 'grammar-v2-b1-paragraph-reference-30@1.0.0',
  revision: '1.0.0',
  title: 'Phương tiện liên kết và quy chiếu đoạn văn (Paragraph Cohesion & Reference)',
  objective: 'Sử dụng thành thạo các phương tiện quy chiếu (it, they, this, these), từ thay thế (one, ones, do so) và từ nối liên kết trình tự để tạo tính mạch lạc và gắn kết chặt chẽ cho đoạn văn.',
  prerequisiteIds: ['grammar-v2-b1-contrast-concession-links-29'],
  coverage: ['paragraph-reference', 'cohesion-and-coherence', 'pronoun-reference', 'substitution-one-ones', 'sequencing-linkers'],
  context: {
    english: 'Urban rooftop farming offers significant ecological benefits. This innovative practice lowers building temperatures, absorbs excess rainwater, and provides organic produce to nearby residents; these advantages explain why municipal governments now subsidize green roofs.',
    vietnamese: 'Nông nghiệp trên mái nhà đô thị mang lại nhiều lợi ích sinh thái đáng kể. Mô hình đổi mới này giúp hạ nhiệt các tòa nhà, hấp thụ lượng nước mưa dư thừa và cung cấp nông sản hữu cơ cho cư dân lân cận; những ưu điểm này giải thích tại sao chính quyền đô thị hiện đang trợ cấp cho các mái nhà xanh.',
  },
  guide: {
    pattern: 'Pronoun reference (it, they) | Demonstrative + Summary Noun (this issue, these benefits) | Substitution (one, ones, do so) | Discourse markers (Firstly, ... In addition, ... In conclusion, ...)',
    whenToUse: [
      'Tạo tính liên kết (cohesion) và mạch lạc (coherence) để các câu văn trong một đoạn được gắn kết tự nhiên, không bị lặp từ hoặc đứt gãy ý.',
      'Dùng đại từ (it, they, them) hoặc từ chỉ định (this, that, these, those) để quy chiếu về danh từ hoặc ý niệm đã xuất hiện ở câu trước.',
      'Dùng "this / these + summary noun" (this problem, this approach, these factors) để thâu tóm và tiếp nối một ý tưởng phức tạp vừa trình bày.',
      'Dùng "one / ones" để thay thế cho danh từ đếm được, và "do so" để thay thế cho cụm động từ nhằm tránh lỗi lặp từ.',
      'Dùng các từ liên kết luận điểm (firstly, secondly, furthermore, finally, in conclusion) để dẫn dắt mạch tư duy của đoạn văn.',
    ],
    signalWords: ['this approach', 'these problems', 'such measures', 'a new one', 'the old ones', 'do so', 'furthermore', 'in conclusion'],
    check: [
      'Đại từ hoặc từ chỉ định có quy chiếu rõ ràng đến đối tượng cụ thể không (tránh quy chiếu mơ hồ khiến người đọc khó hiểu)?',
      'Có hòa hợp số lượng giữa từ quy chiếu và danh từ gốc (this/it cho số ít, these/they cho số nhiều)?',
      'Các từ nối chuyển ý ở đầu câu có được ngăn cách bằng dấu phẩy theo sau không?',
    ],
  },
  explanation: 'A cohesive paragraph links ideas with clear pronoun reference, demonstratives plus summary nouns, substitution and discourse markers. Use it/they only when the antecedent is clear, and match singular or plural forms. This problem or these advantages can summarize a preceding idea. One/ones replace countable nouns; do so replaces a verb phrase. Sequencing markers such as firstly, in addition and in conclusion help readers follow the argument.',
  examples: [
    { english: 'Air pollution has increased significantly in the capital. This serious problem affects millions of schoolchildren.', vietnamese: 'Ô nhiễm không khí đã tăng đáng kể tại thủ đô. Vấn đề nghiêm trọng này ảnh hưởng đến hàng triệu học sinh.' },
    { english: 'Renewable energy sources reduce greenhouse emissions. In addition, they create thousands of green jobs.', vietnamese: 'Các nguồn năng lượng tái tạo giúp giảm phát thải khí nhà kính. Ngoài ra, chúng còn tạo ra hàng ngàn việc làm xanh.' },
    { english: 'I wanted to buy a winter coat, so I chose a warm woollen one rather than a synthetic jacket.', vietnamese: 'Tôi muốn mua một chiếc áo khoác mùa đông, vì vậy tôi đã chọn một chiếc bằng len ấm áp thay vì áo khoác sợi tổng hợp.' },
    { english: 'All applicants must submit their portfolios before noon; those who fail to do so will not be interviewed.', vietnamese: 'Tất cả ứng viên phải nộp hồ sơ trước buổi trưa; những ai không làm như vậy sẽ không được phỏng vấn.' },
    { english: 'Firstly, public transport saves money. Secondly, it reduces road congestion. Finally, it helps protect the environment.', vietnamese: 'Thứ nhất, giao thông công cộng giúp tiết kiệm tiền. Thứ hai, nó giảm ùn tắc giao thông. Cuối cùng, nó giúp bảo vệ môi trường.' },
    { english: 'Modern smartphones are extremely powerful. However, these electronic devices can cause digital addiction if used excessively.', vietnamese: 'Điện thoại thông minh ngày nay cực kỳ mạnh mẽ. Tuy nhiên, những thiết bị điện tử này có thể gây nghiện kỹ thuật số nếu sử dụng quá mức.' },
  ],
  contrasts: [
    {
      form: 'This problem vs These problems',
      whyFits: '"This problem" dùng để quy chiếu về một vấn đề đơn lẻ số ít hoặc một tình huống tổng thể đã nêu.',
      whyNot: '"These problems" bắt buộc phải quy chiếu về một danh sách gồm hai hoặc nhiều vấn đề số nhiều cụ thể.',
    },
    {
      form: 'A new one vs A new it',
      whyFits: '"One" là đại từ thay thế (indefinite pronoun) có thể đi cùng mạo từ và tính từ ("a new one", "the red ones").',
      whyNot: '"It" là đại từ nhân xưng chỉ định trực tiếp, không bao giờ kết hợp với mạo từ hoặc tính từ (không thể nói "a new it").',
    },
  ],
  commonMistakes: [
    'Quy chiếu mơ hồ (ambiguous reference): dùng "it" hoặc "they" khi câu trước có nhiều danh từ khiến người đọc không rõ đại từ chỉ đối tượng nào.',
    'Dùng sai số lượng của từ chỉ định (ví dụ viết "these problem" hoặc "this advantages").',
    'Lặp lại danh từ liên tục trong nhiều câu liên tiếp thay vì sử dụng các từ thay thế như "one", "ones", hoặc "this + summary noun".',
  ],
  summary: 'Liên kết đoạn văn: dùng [it/they] và [this/these + summary noun] để quy chiếu, [one/ones/do so] để thay thế tránh lặp từ, và các từ nối [Firstly, In addition, In conclusion] để định hướng mạch văn.',
  exercises: [
    {
      id: 'grammar-v2-b1-paragraph-reference-30-q1',
      kind: 'choice',
      prompt: 'Select the correct summary noun phrase: "Many employees experience chronic fatigue and back pain from prolonged desk work. _____ can be alleviated through ergonomic furniture."',
      options: [
        { text: 'These symptoms', correct: true, rationale: '"These symptoms" correctly refers back to plural health complaints (fatigue, back pain).' },
        { text: 'This symptom', correct: false, rationale: '"This symptom" is singular and cannot refer to multiple conditions.' },
        { text: 'These symptom', correct: false, rationale: 'Grammatically mismatched demonstrative and singular noun.' },
        { text: 'That symptoms', correct: false, rationale: 'Singular "that" cannot modify plural "symptoms".' },
      ],
      acceptedAnswers: [{ text: 'These symptoms', rationale: '"These symptoms" refers back to plural ailments.' }],
    },
    {
      id: 'grammar-v2-b1-paragraph-reference-30-q2',
      kind: 'choice',
      prompt: 'Choose the correct substitution word: "My old running shoes are completely worn out, so I need to purchase a new _____."',
      options: [
        { text: 'pair', correct: true, rationale: '"Pair" correctly replaces shoes as a countable unit (a new pair).' },
        { text: 'it', correct: false, rationale: '"Shoes" is plural; "it" cannot refer to them.' },
        { text: 'ones', correct: false, rationale: 'Cannot say "a new ones" with singular indefinite article "a".' },
        { text: 'them', correct: false, rationale: '"Them" cannot be preceded by article and adjective "a new".' },
      ],
      acceptedAnswers: [{ text: 'pair', rationale: '"A new pair" correctly substitutes for plural shoes.' }],
    },
    {
      id: 'grammar-v2-b1-paragraph-reference-30-q3',
      kind: 'choice',
      prompt: 'Select the sentence that uses "do so" correctly to avoid verbal repetition:',
      options: [
        { text: 'Students who wish to postpone their exams must submit a medical certificate; failure to do so will result in a zero.', correct: true, rationale: '"Do so" correctly substitutes for the verb phrase "submit a medical certificate".' },
        { text: 'Students must submit a medical certificate; failure to do it so will result in a zero.', correct: false, rationale: '"Do it so" is ungrammatical.' },
        { text: 'Students must submit a certificate; failure to make so will result in a zero.', correct: false, rationale: '"Make so" is not the idiom; "do so" is standard.' },
        { text: 'Students must submit a certificate; failure doing so it will result in a zero.', correct: false, rationale: 'Ungrammatical word order and redundant pronoun.' },
      ],
      acceptedAnswers: [{ text: 'Students who wish to postpone their exams must submit a medical certificate; failure to do so will result in a zero.', rationale: '"Do so" replaces the verb phrase.' }],
    },
    {
      id: 'grammar-v2-b1-paragraph-reference-30-q4',
      kind: 'choice',
      prompt: 'Identify the discourse marker best suited to conclude an essay paragraph:',
      options: [
        { text: 'In conclusion, regular physical exercise benefits both physical and psychological well-being.', correct: true, rationale: '"In conclusion" is the standard formal transition for summarizing and concluding.' },
        { text: 'Firstly, regular physical exercise benefits both physical and psychological well-being.', correct: false, rationale: '"Firstly" introduces the first point, not a conclusion.' },
        { text: 'Furthermore, regular physical exercise benefits both physical and psychological well-being.', correct: false, rationale: '"Furthermore" introduces an additional supporting point.' },
        { text: 'For example, regular physical exercise benefits both physical and psychological well-being.', correct: false, rationale: '"For example" introduces an illustration, not a final summary.' },
      ],
      acceptedAnswers: [{ text: 'In conclusion, regular physical exercise benefits both physical and psychological well-being.', rationale: '"In conclusion" introduces the final summary.' }],
    },
    {
      id: 'grammar-v2-b1-paragraph-reference-30-q5',
      kind: 'gap',
      prompt: 'Fill in the singular substitute for one jacket: "I tried on several leather jackets and decided to buy the black _____."',
      options: [],
      acceptedAnswers: [{ text: 'one', rationale: 'The prompt specifies one jacket; use singular one.' }],
    },
    {
      id: 'grammar-v2-b1-paragraph-reference-30-q6',
      kind: 'gap',
      prompt: 'Fill in the demonstrative summary word: "Deforestation destroys biodiversity and destabilizes soil. _____ environmental catastrophe threatens local communities."',
      options: [],
      acceptedAnswers: [
        { text: 'This', rationale: '"This" modifies singular summary noun "environmental catastrophe".' },
      ],
    },
    {
      id: 'grammar-v2-b1-paragraph-reference-30-q7',
      kind: 'gap',
      prompt: 'Fill in the sequencing adverb introducing an additional point: "The new transit system is punctual and clean. In _____, ticket fares are affordable for students."',
      options: [],
      acceptedAnswers: [
        { text: 'addition', rationale: '"In addition" is the complete transition phrase.' },
      ],
    },
    {
      id: 'grammar-v2-b1-paragraph-reference-30-q8',
      kind: 'gap',
      prompt: 'Fill in the verb phrase substitution: "Customers are advised to save their digital receipts, as those who do _____ can request a full refund within thirty days."',
      options: [],
      acceptedAnswers: [
        { text: 'so', rationale: '"Do so" replaces "save their digital receipts".' },
      ],
    },
    {
      id: 'grammar-v2-b1-paragraph-reference-30-q9',
      kind: 'transform',
      prompt: 'Rewrite using "one" to avoid repeating "laptop": "My current laptop is outdated, so I am saving up to purchase a modern laptop."',
      options: [],
      acceptedAnswers: [
        { text: 'My current laptop is outdated, so I am saving up to purchase a modern one.', rationale: 'Replaces repetitive "laptop" with substitute pronoun "one".' },
      ],
    },
    {
      id: 'grammar-v2-b1-paragraph-reference-30-q10',
      kind: 'transform',
      prompt: 'Rewrite using "This method" to synthesize the prior sentence: "Practicing flashcards every day helps learners retain vocabulary. Learning in this way is proven to be effective."',
      options: [],
      acceptedAnswers: [
        { text: 'Practicing flashcards every day helps learners retain vocabulary. This method is proven to be effective.', rationale: 'Uses summary phrase "This method" to refer back to daily flashcard practice.' },
      ],
    },
    {
      id: 'grammar-v2-b1-paragraph-reference-30-q11',
      kind: 'correction',
      prompt: 'Correct the pronoun number agreement: "Plastic bottles take hundreds of years to decompose. This is why we must recycle it."',
      options: [],
      acceptedAnswers: [
        { text: 'Plastic bottles take hundreds of years to decompose. This is why we must recycle them.', rationale: 'Changes singular "it" to plural "them" to match plural "plastic bottles".' },
      ],
    },
    {
      id: 'grammar-v2-b1-paragraph-reference-30-q12',
      kind: 'correction',
      prompt: 'Correct the demonstrative agreement error: "These finding suggests that a balanced diet improves cardiovascular health."',
      options: [],
      acceptedAnswers: [
        { text: 'This finding suggests that a balanced diet improves cardiovascular health.', rationale: 'Changes plural "These" to singular "This" to match singular "finding" and verb "suggests".' },
        { text: 'These findings suggest that a balanced diet improves cardiovascular health.', rationale: 'Alternative: makes noun and verb plural "These findings suggest".' },
      ],
    },
  ],
  reviewExercises: [
    {
      id: 'grammar-v2-b1-paragraph-reference-30-r1',
      kind: 'choice',
      prompt: 'Select the best cohesive sentence for academic writing:',
      options: [
        { text: 'Solar panels generate electricity without emitting carbon dioxide. These advantages make solar power attractive.', correct: true, rationale: '"These advantages" provides clear summary cohesion.' },
        { text: 'Solar panels generate electricity without emitting carbon dioxide. These advantage make solar power attractive.', correct: false, rationale: 'Plural demonstrative "These" with singular noun "advantage" is ungrammatical.' },
        { text: 'Solar panels generate electricity without emitting carbon dioxide. This advantages make solar power attractive.', correct: false, rationale: 'Singular "This" with plural "advantages" is ungrammatical.' },
      ],
      acceptedAnswers: [{ text: 'Solar panels generate electricity without emitting carbon dioxide. These advantages make solar power attractive.', rationale: 'Correct demonstrative and noun agreement.' }],
    },
    {
      id: 'grammar-v2-b1-paragraph-reference-30-r2',
      kind: 'gap',
      prompt: 'Fill in the transition phrase: "To _____ up, a plant-based diet supports environmental sustainability and personal health."',
      options: [],
      acceptedAnswers: [
        { text: 'sum', rationale: '"To sum up" is the standard concluding phrase.' },
      ],
    },
    {
      id: 'grammar-v2-b1-paragraph-reference-30-r3',
      kind: 'transform',
      prompt: 'Rewrite using "ones" to replace the repeated noun: "I dislike bitter apples, but I love sweet apples."',
      options: [],
      acceptedAnswers: [
        { text: 'I dislike bitter apples, but I love sweet ones.', rationale: 'Replaces repeated plural noun "apples" with "ones".' },
      ],
    },
    {
      id: 'grammar-v2-b1-paragraph-reference-30-r4',
      kind: 'correction',
      prompt: 'Replace the singular technician with the specified pronoun he: "When the technician examined the damaged computer, they found several loose cables inside it."',
      options: [],
      acceptedAnswers: [{ text: 'When the technician examined the damaged computer, he found several loose cables inside it.', rationale: 'The prompt specifies he; singular they is also grammatical in other contexts.' }],
    },
  ],
  outputPrompts: [
    {
      id: 'grammar-v2-b1-paragraph-reference-30-o1',
      prompt: 'Viết một đoạn văn ngắn (3 câu) về lợi ích của việc đọc sách mỗi ngày, sử dụng "This habit" để quy chiếu và "In addition," để bổ sung luận điểm.',
      modelAnswer: 'Reading books for thirty minutes every day expands vocabulary and improves analytical thinking. This habit also helps reduce stress by allowing the mind to unwind after work. In addition, it enhances concentration in an era filled with digital distractions.',
      checks: [
        'Sử dụng đúng "This habit" để tóm lược và quy chiếu thói quen đọc sách.',
        'Sử dụng từ nối bổ sung "In addition," với dấu phẩy đúng chuẩn.',
        'Đoạn văn mạch lạc, câu từ tự nhiên và gắn kết chặt chẽ.',
      ],
    },
    {
      id: 'grammar-v2-b1-paragraph-reference-30-o2',
      prompt: 'Viết 2 câu mô tả một lựa chọn tiêu dùng của bạn, sử dụng từ thay thế "one" hoặc "ones" và từ nối tương phản ". However,".',
      modelAnswer: 'When shopping for a new office chair, I decided to purchase an ergonomic mesh one instead of a cheap leather model. However, finding the right lumbar support required trying out several different designs.',
      checks: [
        'Sử dụng chính xác đại từ thay thế "one" (an ergonomic mesh one).',
        'Sử dụng đúng trạng từ tương phản ". However," ở đầu câu sau.',
        'Cấu trúc câu phong phú và chuẩn xác ngữ pháp B1.',
      ],
    },
  ],
  sources: [
    {
      id: 'cambridge-text-cohesion-reference',
      title: 'Cambridge Dictionary: Texts – cohesion and reference',
      url: 'https://dictionary.cambridge.org/grammar/british-grammar/texts-cohesion',
      claims: [
        'Cohesion in texts is achieved through pronoun reference, demonstratives, and substitution words like one and do so.',
        'Demonstratives combined with summary nouns (this problem, these factors) synthesize previous discourse.',
        'Discourse markers structure paragraphs logically from introduction to conclusion.',
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

export default paragraphReferenceLesson;
