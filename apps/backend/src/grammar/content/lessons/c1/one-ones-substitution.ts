/**
 * @file one-ones-substitution.ts
 * @description C1 lesson on nominal substitution with one and ones for cohesive academic writing.
 */
import type { GrammarLesson } from '../../types.js';

const oneOnesSubstitutionLesson: GrammarLesson = {
  id: 'grammar-v2-c1-one-ones-substitution-11',
  revisionId: 'grammar-v2-c1-one-ones-substitution-11@1.0.0',
  revision: '1.0.0',
  title: 'Thay thế danh từ với One và Ones (Nominal Substitution with One and Ones)',
  objective: 'Vận dụng chuẩn xác đại từ thay thế "one" và "ones" để đại diện cho danh từ đếm được đã xác định đi kèm từ bổ nghĩa, đồng thời phân biệt rành mạch các vùng cấm cú pháp (danh từ không đếm được, sau đại từ sở hữu trực tiếp, sau số từ) trong diễn ngôn học thuật C1.',
  prerequisiteIds: ['grammar-v2-c1-infinitive-ellipsis-10'],
  coverage: ['one-ones-substitution', 'substitution', 'nominal-substitution', 'cohesion', 'anaphora'],
  context: {
    english: 'In scientific classification, economic comparative studies, and formal critiques, nominal substitution with "one" and "ones" prevents tedious repetition of head nouns while maintaining sharp differentiation between rival taxonomies, models, or empirical cohorts.',
    vietnamese: 'Trong phân loại khoa học, nghiên cứu so sánh kinh tế và phê bình học thuật, phép thay thế danh từ với "one" và "ones" ngăn chặn sự lặp lại đơn điệu của danh từ trung tâm trong khi vẫn duy trì sự phân biệt sắc bén giữa các hệ thống phân loại, mô hình hoặc nhóm thực nghiệm đối nghịch.',
  },
  guide: {
    pattern: 'Determiner + (Adjective) + one (Singular Countable) / ones (Plural Countable) | Contrastive: the one(s) + Prepositional Phrase / Relative Clause',
    whenToUse: [
      'Thay thế danh từ đếm được đi kèm tính từ bổ nghĩa trước hoặc sau: "Instead of the conventional cryptographic protocol, security architects deployed a far more resilient one".',
      'Đối chiếu các tiểu nhóm trong phân loại học thuật: "Of all the econometric paradigms reviewed, the ones emphasizing behavioral irrationality demonstrated superior predictive accuracy".',
      'Đại diện cho danh từ trung tâm có mệnh đề quan hệ bổ nghĩa: "The mechanism underlying cellular apoptosis is the one that warrants immediate clinical attention".',
    ],
    signalWords: ['the existing one', 'the newly synthesized ones', 'an analogous one', 'the preceding one', 'the ones characterized by'],
    check: [
      'Danh từ được thay thế có phải là danh từ đếm được không? Tuyệt đối không dùng one/ones cho danh từ không đếm được như evidence, information, data (mass sense), equipment!',
      'Sau tính từ sở hữu (my, his, their) có tính từ xen vào không? Nếu không có tính từ, phải dùng đại từ sở hữu (mine, his, theirs) thay vì nói "his one"?',
      'Sau số từ (two, three) hoặc từ chỉ lượng như both, several, few, có lược bỏ hoàn toàn "ones" không (viết "analyzed three cohorts and retained two", không viết "retained two ones")?',
    ],
  },
  explanation: 'Phép thay thế danh từ (Nominal Substitution) sử dụng "one" (số ít) và "ones" (số nhiều) để thay thế cho danh từ trung tâm (head noun) của một cụm danh từ đếm được, tránh sự trùng lặp từ vựng trong văn bản. Không giống như đại từ nhân xưng (it/they) vốn quy chiếu về một thực thể xác định cụ thể giống hệt tiền ngữ, "one/ones" quy chiếu về một thực thể mới cùng chủng loại nhưng mang thuộc tính khác ("I lost my pen, so I bought a new one" - không phải chính cây bút đã mất). Các quy tắc hạn chế mang tính quyết định ở cấp độ C1 bao gồm: 1) Không áp dụng cho danh từ không đếm được (phải dùng "that/those of" hoặc lặp lại danh từ: viết "The evidence from the second trial corroborated that from the first", không viết "the one from the first"); 2) Sau số từ hoặc từ hạn định lượng tử (both, either, neither, several, two), "ones" bị triệt tiêu hoàn toàn ("We tested four configurations and rejected three"); 3) Sau mạo từ xác định không có tính từ đi kèm, văn phong học thuật chuộng "those who/which" hơn là "the ones who/which".',
  examples: [
    {
      english: 'Rather than adhering to the orthodox macroprudential framework, the central bank piloted an unprecedentedly agile one.',
      vietnamese: 'Thay vì bám chặt vào khuôn khổ an toàn vĩ mô chính thống, ngân hàng trung ương đã thử nghiệm một khuôn khổ linh hoạt chưa từng có tiền lệ.',
    },
    {
      english: 'Among the surveyed municipalities, the ones implementing congestion pricing recorded immediate emissions reductions.',
      vietnamese: 'Trong số các đô thị được khảo sát, những đô thị áp dụng mức phí ùn tắc đã ghi nhận mức giảm phát thải tức thì.',
    },
    {
      english: 'The original hypothesis regarding neural synaptic plasticity has been superseded by a vastly more complex one.',
      vietnamese: 'Giả thuyết ban đầu liên quan đến tính mềm dẻo của synap thần kinh đã bị thay thế bởi một giả thuyết phức tạp hơn rất nhiều.',
    },
    {
      english: 'Scholars contrasted the maritime trade routes of the Mediterranean with the overland ones spanning Central Asia.',
      vietnamese: 'Các học giả đã đối chiếu các tuyến đường thương mại hàng hải của Địa Trung Hải với các tuyến đường bộ trải dài khắp Trung Á.',
    },
    {
      english: 'The subsequent geological stratum exhibited structural anomalies similar to the ones cataloged at the excavation trench.',
      vietnamese: 'Tầng địa chất tiếp theo bộc lộ những dị thường cấu trúc tương tự như những dị thường đã được lập danh mục tại hào khai quật.',
    },
    {
      english: 'When evaluating algorithmic architectures, systems engineers favor open-source frameworks over proprietary ones.',
      vietnamese: 'Khi đánh giá các kiến trúc thuật toán, các kỹ sư hệ thống ưu tiên các khung mã nguồn mở hơn là các khung độc quyền.',
    },
  ],
  contrasts: [
    {
      form: 'The empirical evidence gathered during the winter expedition contradicts that obtained during the summer trial.',
      whyFits: 'Danh từ evidence là không đếm được (uncountable), do đó bắt buộc dùng đại từ thay thế that thay vì the one.',
      whyNot: '"...contradicts the one obtained during the summer trial" sai hoàn toàn vì the one chỉ thay thế danh từ đếm được số ít.',
    },
    {
      form: 'The laboratory evaluated six distinct antibody candidates and ultimately synthesized three for clinical validation.',
      whyFits: 'Sau số từ (three), không dùng ones vì số từ tự thân đóng vai trò hạn định danh ngữ.',
      whyNot: '"...and ultimately synthesized three ones for clinical validation" sai ngữ pháp vì ones không đứng trực tiếp sau số từ xác định.',
    },
  ],
  commonMistakes: [
    'Dùng "one" hoặc "ones" để thay thế danh từ không đếm được như information, research, equipment (phải dùng "that of" hoặc diễn đạt lại).',
    'Thêm "ones" ngay sau số đếm hoặc từ chỉ số lượng (viết "both ones" hoặc "three ones" thay vì "both" hoặc "three").',
    'Dùng "my one", "their one" trong văn phong học thuật thay vì dùng đại từ sở hữu "mine", "theirs" hoặc danh từ đầy đủ.',
  ],
  summary: 'Phép thay thế với "one/ones" áp dụng riêng cho danh từ đếm được có từ bổ nghĩa đi kèm. Tuyệt đối không dùng cho danh từ không đếm được (dùng "that/those"), sau số từ (dùng số từ trơ) hoặc sau đại từ sở hữu trực tiếp.',
  exercises: [
    {
      id: 'grammar-v2-c1-one-ones-substitution-11-q1',
      kind: 'choice',
      prompt: 'Select the sentence with standard academic substitution for a countable noun with an adjective modifier:',
      options: [
        { text: 'The research institute phased out obsolete silicon lithography tools in favor of more advanced ones.', correct: true, rationale: 'Plural "ones" correctly substitutes for countable plural noun "lithography tools" preceded by adjective "advanced".' },
        { text: 'The research institute phased out obsolete silicon lithography tools in favor of more advanced.', correct: false, rationale: 'Adjective "advanced" cannot be stranded without a nominal head or substitution pronoun.' },
        { text: 'The research institute phased out obsolete silicon lithography tools in favor of more advanced those.', correct: false, rationale: '"those" cannot be preceded directly by an attributive adjective in this manner.' },
        { text: 'The research institute phased out obsolete silicon lithography tools in favor of advanced them.', correct: false, rationale: 'Personal pronouns cannot accept attributive adjectival modification.' },
      ],
      acceptedAnswers: [{ text: 'The research institute phased out obsolete silicon lithography tools in favor of more advanced ones.', rationale: 'Standard nominal substitution with adjective + ones.' }],
    },
    {
      id: 'grammar-v2-c1-one-ones-substitution-11-q2',
      kind: 'choice',
      prompt: 'Identify the sentence that correctly avoids illicit substitution of an uncountable noun:',
      options: [
        { text: 'The demographic data from the rural census corroborate that collected in urban municipalities.', correct: true, rationale: 'Mass/uncountable concept "data" is correctly referenced by "that", not "the one".' },
        { text: 'The demographic data from the rural census corroborate the one collected in urban municipalities.', correct: false, rationale: '"the one" is ungrammatical when referring to non-count or plural data.' },
        { text: 'The demographic data from the rural census corroborate the ones collected in urban municipalities.', correct: false, rationale: '"ones" treats mass/aggregate data inappropriately as individual discrete items.' },
        { text: 'The demographic data from the rural census corroborate these collected in urban municipalities.', correct: false, rationale: '"these" cannot head a post-modifying past participle phrase without a head noun.' },
      ],
      acceptedAnswers: [{ text: 'The demographic data from the rural census corroborate that collected in urban municipalities.', rationale: 'Uses that instead of one for non-count reference.' }],
    },
    {
      id: 'grammar-v2-c1-one-ones-substitution-11-q3',
      kind: 'choice',
      prompt: 'Select the sentence adhering to formal numeric quantification rules without redundant "ones":',
      options: [
        { text: 'The structural engineers tested five composite beam configurations and subsequently reinforced two.', correct: true, rationale: 'Cardinal numbers (two) stand alone without redundant "ones".' },
        { text: 'The structural engineers tested five composite beam configurations and subsequently reinforced two ones.', correct: false, rationale: 'Placing "ones" directly after cardinal numbers is ungrammatical.' },
        { text: 'The structural engineers tested five composite beam configurations and reinforced both ones.', correct: false, rationale: '"both ones" is redundant and non-standard; "both" stands alone.' },
        { text: 'The structural engineers tested five composite beam configurations and reinforced several ones.', correct: false, rationale: '"several ones" is colloquial or non-standard in academic writing.' },
      ],
      acceptedAnswers: [{ text: 'The structural engineers tested five composite beam configurations and subsequently reinforced two.', rationale: 'Correct standalone cardinal number quantification.' }],
    },
    {
      id: 'grammar-v2-c1-one-ones-substitution-11-q4',
      kind: 'choice',
      prompt: 'Choose the correct formal phrasing for contrastive personal possession:',
      options: [
        { text: 'While the university patent office defended its own institutional claims, the commercial partners vigorously defended theirs.', correct: true, rationale: 'Possessive pronoun "theirs" correctly stands alone without informal substitution.' },
        { text: 'While the university patent office defended its own institutional claims, the commercial partners vigorously defended their ones.', correct: false, rationale: '"their ones" is strictly avoided in formal written English.' },
        { text: 'While the university patent office defended its own claims, commercial partners defended their one.', correct: false, rationale: 'Singular/plural mismatch and informal possessive substitution.' },
        { text: 'The university defended its own claims, while commercial partners defended those of their ones.', correct: false, rationale: 'Redundant and convoluted phrasing.' },
      ],
      acceptedAnswers: [{ text: 'While the university patent office defended its own institutional claims, the commercial partners vigorously defended theirs.', rationale: 'Standard possessive pronoun theirs.' }],
    },
    {
      id: 'grammar-v2-c1-one-ones-substitution-11-q5',
      kind: 'gap',
      prompt: 'Complete the sentence with the appropriate substitution pronoun for the singular count noun "methodology": "Rather than adopting a rigid qualitative framework, the research team designed an empirical _____."',
      options: [],
      acceptedAnswers: [
        { text: 'one', rationale: '"one" replaces singular countable noun "methodology" after adjective "empirical".' },
      ],
    },
    {
      id: 'grammar-v2-c1-one-ones-substitution-11-q6',
      kind: 'gap',
      prompt: 'Supply the plural substitution pronoun: "Traditional incandescent bulbs consume significantly more wattage than modern LED _____."',
      options: [],
      acceptedAnswers: [
        { text: 'ones', rationale: '"ones" substitutes for plural countable noun "bulbs" after modifier "LED".' },
      ],
    },
    {
      id: 'grammar-v2-c1-one-ones-substitution-11-q7',
      kind: 'gap',
      prompt: 'Complete the non-count demonstrative comparison: "The financial intelligence gathered by domestic agencies far surpassed _____ obtained through foreign backchannels."',
      options: [],
      acceptedAnswers: [
        { text: 'that', rationale: '"that" (not "the one") replaces uncountable noun "financial intelligence".' },
      ],
    },
    {
      id: 'grammar-v2-c1-one-ones-substitution-11-q8',
      kind: 'gap',
      prompt: 'Supply the pronoun: "Of all the potential technological disruptions discussed, the _____ posing the greatest systemic threat is quantum cryptanalysis."',
      options: [],
      acceptedAnswers: [
        { text: 'one', rationale: '"the one" functions as the focused singular referent before the participle phrase.' },
      ],
    },
    {
      id: 'grammar-v2-c1-one-ones-substitution-11-q9',
      kind: 'transform',
      prompt: 'Eliminate noun repetition using nominal substitution: "The company decommissioned two legacy servers and deployed three high-throughput servers."',
      options: [],
      acceptedAnswers: [
        { text: 'The company decommissioned two legacy servers and deployed three high-throughput ones.', rationale: 'Replaces repeated plural noun servers with ones after the adjective modifier.' },
      ],
    },
    {
      id: 'grammar-v2-c1-one-ones-substitution-11-q10',
      kind: 'transform',
      prompt: 'Correct the repetition using "that of" for the uncountable noun "resilience": "The structural resilience of carbon fiber composites surpasses the structural resilience of conventional aerospace alloys."',
      options: [],
      acceptedAnswers: [
        { text: 'The structural resilience of carbon fiber composites surpasses that of conventional aerospace alloys.', rationale: 'Substitutes "that of" for the uncountable noun phrase "the structural resilience of".' },
      ],
    },
    {
      id: 'grammar-v2-c1-one-ones-substitution-11-q11',
      kind: 'correction',
      prompt: 'Correct the illicit substitution following a cardinal number: "The aviation committee inspected seven regional airfields and decertified three ones for non-compliance."',
      options: [],
      acceptedAnswers: [
        { text: 'The aviation committee inspected seven regional airfields and decertified three for non-compliance.', rationale: 'Removes ungrammatical "ones" after cardinal number "three".' },
      ],
    },
    {
      id: 'grammar-v2-c1-one-ones-substitution-11-q12',
      kind: 'correction',
      prompt: 'Correct the non-count noun substitution error: "The empirical evidence presented by the prosecution was far more compelling than the one offered by the defense counsel."',
      options: [],
      acceptedAnswers: [
        { text: 'The empirical evidence presented by the prosecution was far more compelling than that offered by the defense counsel.', rationale: 'Replaces "the one" with "that" because evidence is an uncountable noun.' },
      ],
    },
  ],
  reviewExercises: [
    {
      id: 'grammar-v2-c1-one-ones-substitution-11-r1',
      kind: 'choice',
      prompt: 'Select the sentence with impeccable nominal substitution in formal academic register:',
      options: [
        { text: 'The revised treaty framework contains rigorous environmental stipulations, whereas the predecessor contained purely aspirational ones.', correct: true, rationale: 'Plural "ones" correctly substitutes for countable noun "stipulations" preceded by adjective "aspirational".' },
        { text: 'The revised treaty contains rigorous environmental stipulations, whereas the predecessor contained aspirational them.', correct: false, rationale: 'Personal pronoun "them" cannot follow an attributive adjective.' },
        { text: 'The revised treaty contains rigorous environmental stipulations, whereas the predecessor contained aspirational those.', correct: false, rationale: '"those" cannot follow an attributive adjective in this construction.' },
      ],
      acceptedAnswers: [{ text: 'The revised treaty framework contains rigorous environmental stipulations, whereas the predecessor contained purely aspirational ones.', rationale: 'Correct adjective + ones substitution.' }],
    },
    {
      id: 'grammar-v2-c1-one-ones-substitution-11-r2',
      kind: 'gap',
      prompt: 'Complete with the non-count pronoun: "The research expenditure allocated to renewable microgrids exceeded _____ dedicated to nuclear fusion."',
      options: [],
      acceptedAnswers: [
        { text: 'that', rationale: '"that" substitutes for uncountable "research expenditure".' },
      ],
    },
    {
      id: 'grammar-v2-c1-one-ones-substitution-11-r3',
      kind: 'transform',
      prompt: 'Rewrite to avoid repeating the countable noun "variable": "The primary economic variable is interest rates; the secondary economic variable is inflation expectations."',
      options: [],
      acceptedAnswers: [
        { text: 'The primary economic variable is interest rates; the secondary one is inflation expectations.', rationale: 'Substitutes "one" for the repeated singular countable noun variable.' },
        { text: 'The primary economic variable is interest rates. The secondary one is inflation expectations.', rationale: 'Accepts separated two-sentence coordination.' },
      ],
    },
    {
      id: 'grammar-v2-c1-one-ones-substitution-11-r4',
      kind: 'correction',
      prompt: 'Correct the quantifier substitution error: "The lab investigated four chemical catalysts and synthesized both ones in large quantities."',
      options: [],
      acceptedAnswers: [
        { text: 'The lab investigated four chemical catalysts and synthesized both in large quantities.', rationale: 'Removes redundant "ones" after quantifier "both".' },
      ],
    },
  ],
  outputPrompts: [
    {
      id: 'grammar-v2-c1-one-ones-substitution-11-o1',
      prompt: 'Viết 1-2 câu học thuật sử dụng phép thay thế danh từ với "one / ones" (đi kèm tính từ bổ nghĩa) để đối chiếu giữa mô hình hoặc phương pháp truyền thống và hiện đại.',
      modelAnswer: 'Rather than evaluating macroeconomic volatility through static linear models, the central bank increasingly relies on dynamic stochastic ones. The newly deployed framework offers far greater predictive fidelity than the legacy one.',
      checks: [
        'Sử dụng one / ones thay thế cho danh từ đếm được đã nhắc trước đó.',
        'Đi kèm tính từ bổ nghĩa (dynamic stochastic ones / legacy one).',
        'Văn phong học thuật chuẩn xác, không lặp danh từ trung tâm.',
      ],
    },
    {
      id: 'grammar-v2-c1-one-ones-substitution-11-o2',
      prompt: 'Viết 1-2 câu so sánh học thuật có chứa danh từ không đếm được, sử dụng chuẩn xác "that of / that obtained" thay vì lạm dụng "the one".',
      modelAnswer: 'The qualitative feedback gathered from regional healthcare providers largely mirrored that documented in the national clinical oversight report.',
      checks: [
        'Sử dụng that thay vì the one cho danh từ không đếm được (feedback/evidence/information).',
        'Kết nối mệnh đề so sánh mạch lạc, chuẩn xác.',
        'Không phạm lỗi sai ngữ pháp substitution.',
      ],
    },
  ],
  sources: [
    {
      id: 'halliday-hasan-cohesion',
      title: 'Cohesion in English: Nominal Substitution (One / Ones)',
      url: 'https://www.routledge.com/Cohesion-in-English/Halliday-Hasan/p/book/9780582550315',
      claims: [
        'Nominal substitute "one/ones" functions as head of a noun phrase replacing a countable noun count.',
        'Uncountable nouns do not license "one/ones" and must use demonstrative "that" or lexical repetition.',
        'Numerals, quantifiers (both, few), and possessive pronouns resist "ones" in standard written English.',
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
    summary: 'Comprehensive review completed. Nominal substitution with one/ones, uncountable noun restrictions, quantifier rules, transfer exercises, and Halliday & Hasan sources verified.',
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

export default oneOnesSubstitutionLesson;
