/**
 * @file hedging-propositions.ts
 * @description C1 lesson on hedging propositions to soften categorical claims in academic writing.
 */
import type { GrammarLesson } from '../../types.js';

const hedgingPropositionsLesson: GrammarLesson = {
  id: 'grammar-v2-c1-hedging-propositions-13',
  revisionId: 'grammar-v2-c1-hedging-propositions-13@1.0.0',
  revision: '1.0.0',
  title: 'Hedging trong mệnh đề: Giảm độ tuyệt đối hóa của luận điểm',
  objective: 'Vận dụng các cấu trúc hedging mệnh đề (impersonal passive, that-clauses thăm dò, mệnh đề điều kiện thu hẹp) để diễn đạt luận điểm học thuật khách quan, chừng mực và có căn cứ.',
  prerequisiteIds: ['grammar-v2-c1-so-not-do-so-12'],
  coverage: ['hedging-propositions', 'academic-hedging', 'tentative-claims', 'c1-academic-writing', 'epistemic-stance'],
  context: {
    english: 'In research papers and high-level discourse, authors avoid dogmatic assertions. Instead of stating "This policy causes inflation," experienced researchers use hedged propositions like "The available data suggest that the policy may contribute to inflationary pressures."',
    vietnamese: 'Trong văn bản học thuật và nghị luận cao cấp, người viết tránh khẳng định giáo điều, tuyệt đối. Thay vì nói "Chính sách này gây ra lạm phát", các nhà nghiên cứu dùng mệnh đề chừng mực như "Dữ liệu hiện có gợi ý rằng chính sách này có thể góp phần làm gia tăng áp lực lạm phát".',
  },
  guide: {
    pattern: 'It is + (widely/generally) + past participle (suggested/believed/assumed) + that-clause | There is (some/ample) reason to believe that-clause',
    whenToUse: [
      'Trình bày kết quả nghiên cứu hoặc luận điểm mà không khẳng định tuyệt đối 100%.',
      'Giữ thái độ khách quan, bảo vệ tác giả khỏi sự quy kết sai lầm khi dữ liệu chưa toàn diện.',
      'Tạo không gian phản biện và thảo luận mở trong trao đổi khoa học.',
    ],
    signalWords: ['it is suggested that', 'evidence indicates that', 'there appears to be', 'it would seem that', 'arguably', 'to some extent'],
    check: [
      'Mệnh đề đã tránh các từ tuyệt đối hóa như "always", "proves", "definitely" khi dữ liệu chỉ có tính suy luận chưa?',
      'Cấu trúc bị động vô nhân xưng (It is believed/suggested that) có chia đúng thì và thể không?',
    ],
  },
  explanation: 'Hedging (nói rào / chừng mực hóa mệnh đề) là kỹ thuật ngữ pháp học thuật cốt lõi giúp điều chỉnh mức độ cam kết của tác giả đối với một nhận định. Thay vì dùng câu trần thuật khẳng định trực tiếp (unhedged assertion), ta áp dụng các khung mệnh đề như: 1) Bị động khách quan: "It is widely postulated that..."; 2) Mệnh đề tồn tại chừng mực: "There would seem to be little evidence that..."; 3) Chủ ngữ danh từ chỉ bằng chứng kết hợp động từ suy luận: "Empirical findings lend support to the view that...". Việc sử dụng hedging không phải là thiếu tự tin mà là dấu hiệu của tư duy phản biện và tính chính xác khoa học.',
  examples: [
    {
      english: 'It is generally assumed that fiscal interventions yield immediate macroeconomic shifts.',
      vietnamese: 'Người ta thường giả định rằng các can thiệp tài khóa mang lại những chuyển biến vĩ mô tức thì.',
    },
    {
      english: 'There is reason to believe that the proposed algorithmic model overfits sparse demographic cohorts.',
      vietnamese: 'Có cơ sở để tin rằng mô hình thuật toán được đề xuất bị quá khớp đối với các nhóm dân số phân tán.',
    },
    {
      english: 'Preliminary observations would suggest that cell metabolism slows under extreme hydrostatic stress.',
      vietnamese: 'Các quan sát sơ bộ dường như cho thấy quá trình trao đổi chất của tế bào chậm lại dưới áp lực thủy tĩnh cực hạn.',
    },
    {
      english: 'It cannot be ruled out that compounding external variables skewed the longitudinal sample.',
      vietnamese: 'Không thể loại trừ khả năng các biến số bên ngoài đan xen đã làm lệch mẫu nghiên cứu theo chiều dọc.',
    },
    {
      english: 'The data appear to corroborate the working hypothesis, at least within controlled environments.',
      vietnamese: 'Dữ liệu dường như chứng minh cho giả thuyết làm việc, ít nhất là trong các môi trường được kiểm soát.',
    },
    {
      english: 'It is hypothesized that urban density correlates with faster adoption of localized green energy.',
      vietnamese: 'Người ta đưa ra giả thuyết rằng mật độ đô thị tương quan với tốc độ tiếp nhận năng lượng xanh cục bộ nhanh hơn.',
    },
  ],
  contrasts: [
    {
      form: 'Unhedged: "The implementation proves our initial framework." vs Hedged: "The findings lend tentative support to our initial framework."',
      whyFits: 'Câu hedged thể hiện tính thận trọng học thuật chuẩn mực, nhìn nhận rằng một nghiên cứu đơn lẻ khó có thể chứng minh tuyệt đối (prove).',
      whyNot: 'Dùng "proves" khẳng định tuyệt đối, khiến tác giả dễ bị tổn thương trước phản biện khoa học khi gặp mẫu nghiên cứu khác.',
    },
    {
      form: 'It is suggested that the rate will decline vs It is a fact that the rate will decline',
      whyFits: 'It is suggested that mở ra khả năng dự báo dựa trên bằng chứng mà không cam kết chắc chắn 100%.',
      whyNot: 'It is a fact xem dự báo tương lai như sự thật hiển nhiên, vi phạm nguyên tắc lập luận logic.',
    },
  ],
  commonMistakes: [
    'Lạm dụng quá nhiều từ rào đón trong một mệnh đề (over-hedging), ví dụ: "It might perhaps possibly seem that..." khiến câu trở nên luẩn quẩn và thiếu tự tin.',
    'Dùng động từ khẳng định tuyệt đối (proves, definitely establishes) thay vì các động từ rào đón (suggests, indicates) khi thảo luận về dữ liệu thực nghiệm có tính biến thiên.',
    'Sử dụng cấu trúc bị động vô nhân xưng (It is considered that...) để trình bày quan điểm cá nhân mà không có sự đồng thuận hoặc bằng chứng học thuật hỗ trợ.',
  ],
  summary: 'Hedging mệnh đề sử dụng các khung như "It is suggested that", "There is reason to believe that", "Data indicate that" để giảm độ tuyệt đối hóa, tăng tính khách quan và bảo vệ luận điểm trong lập luận học thuật.',
  exercises: [
    {
      id: 'grammar-v2-c1-hedging-propositions-13-q1',
      kind: 'choice',
      prompt: 'Select the most academically appropriate hedged proposition for a research abstract.',
      options: [
        { text: 'The empirical evidence suggests that remote instruction may influence pupil engagement.', correct: true, rationale: 'Uses tentative framing (suggests that... may influence) appropriate for academic claims.' },
        { text: 'The empirical evidence undoubtedly proves that remote instruction ruins pupil engagement.', correct: false, rationale: 'Categorical words "undoubtedly proves" and emotive "ruins" are inappropriate.' },
        { text: 'Remote instruction definitely always degrades pupil engagement across all cohorts.', correct: false, rationale: 'Absolute quantifiers "definitely always" and "all cohorts" create indefensible dogmatism.' },
        { text: 'It is a certain fact that remote instruction creates disengagement in classrooms.', correct: false, rationale: 'Claims an absolute fact where empirical variation exists.' },
      ],
      acceptedAnswers: [{ text: 'The empirical evidence suggests that remote instruction may influence pupil engagement.', rationale: 'Correct academic hedging.' }],
    },
    {
      id: 'grammar-v2-c1-hedging-propositions-13-q2',
      kind: 'choice',
      prompt: 'Choose the correct introductory passive hedge: "___ that chronic stress impairs prefrontal cortical regulation."',
      options: [
        { text: 'It is widely postulated', correct: true, rationale: 'Impersonal passive "It is widely postulated that" correctly hedges scholarly consensus.' },
        { text: 'There is widely postulated', correct: false, rationale: 'Existential "there" cannot pair directly with passive participle without a copula.' },
        { text: 'It postulating widely', correct: false, rationale: 'Active participle postulating lacks auxiliary verb and passive sense.' },
        { text: 'Widely it postulates', correct: false, rationale: 'Ungrammatical syntax and missing inanimate agent.' },
      ],
      acceptedAnswers: [{ text: 'It is widely postulated', rationale: 'Standard impersonal passive hedge.' }],
    },
    {
      id: 'grammar-v2-c1-hedging-propositions-13-q3',
      kind: 'choice',
      prompt: 'Identify the sentence with appropriate hedging using tentative perception.',
      options: [
        { text: 'There would appear to be little correlation between the two demographic indicators.', correct: true, rationale: '"There would appear to be" is a nuanced tentative modal hedge.' },
        { text: 'There appears to be never any correlation between two demographic indicators.', correct: false, rationale: 'Contradicts hedging by inserting absolute "never any".' },
        { text: 'It would appear that the correlation is totally nonexistent beyond any doubt.', correct: false, rationale: 'Undermines tentative hedge with absolute phrase "beyond any doubt".' },
        { text: 'There might perhaps possibly appear to be no correlation at all whatsoever.', correct: false, rationale: 'Suffers from redundant over-hedging.' },
      ],
      acceptedAnswers: [{ text: 'There would appear to be little correlation between the two demographic indicators.', rationale: 'Nuanced tentative modal perception.' }],
    },
    {
      id: 'grammar-v2-c1-hedging-propositions-13-q4',
      kind: 'choice',
      prompt: 'Select the optimal phrase to hedge a causal claim: "The policy shift ___ the export rebound."',
      options: [
        { text: 'is thought to have contributed to', correct: true, rationale: 'Hedging via passive perception "is thought to" and non-definitive "contributed to".' },
        { text: 'was the sole and direct creator of', correct: false, rationale: 'Absolute claim of solitary causality.' },
        { text: 'has proven beyond question to generate', correct: false, rationale: 'Inappropriately dogmatic for economic analysis.' },
        { text: 'undeniably triggered all aspects of', correct: false, rationale: 'Categorical assertion devoid of academic nuance.' },
      ],
      acceptedAnswers: [{ text: 'is thought to have contributed to', rationale: 'Balanced academic hedge.' }],
    },
    {
      id: 'grammar-v2-c1-hedging-propositions-13-q5',
      kind: 'gap',
      prompt: 'Complete the hedged proposition with the appropriate passive participle (assumed / suggested / hypothesized): "It is generally _____ that fiscal decentralization stimulates local infrastructure spending."',
      options: [],
      acceptedAnswers: [
        { text: 'assumed', rationale: 'It is generally assumed that expresses common scholarly supposition.' },
        { text: 'suggested', rationale: 'It is generally suggested that is an accepted impersonal hedge.' },
        { text: 'hypothesized', rationale: 'It is generally hypothesized that introduces a tentative scholarly proposition.' },
      ],
    },
    {
      id: 'grammar-v2-c1-hedging-propositions-13-q6',
      kind: 'gap',
      prompt: 'Complete with "suggest" or "indicate" (base-form reporting verb): "The emerging metrics would _____ that consumer sentiment has stabilized."',
      options: [],
      acceptedAnswers: [
        { text: 'suggest', rationale: 'Would suggest is a classic academic hedging collocate.' },
        { text: 'indicate', rationale: 'Would indicate is equally valid as a tentative claim.' },
      ],
    },
    {
      id: 'grammar-v2-c1-hedging-propositions-13-q7',
      kind: 'gap',
      prompt: 'Fill in the negative hedge prepositional phrase: "It cannot be _____ out that secondary infections influenced patient recovery."',
      options: [],
      acceptedAnswers: [
        { text: 'ruled', rationale: 'Cannot be ruled out is the standard idiom to keep alternative hypotheses open.' },
      ],
    },
    {
      id: 'grammar-v2-c1-hedging-propositions-13-q8',
      kind: 'gap',
      prompt: 'Insert the noun expressing cautious justification: "There is _____ to believe that microbial biodiversity protects crop yields under drought conditions."',
      options: [],
      acceptedAnswers: [
        { text: 'reason', rationale: 'There is reason to believe that is the standard cautious epistemic formula.' },
      ],
    },
    {
      id: 'grammar-v2-c1-hedging-propositions-13-q9',
      kind: 'transform',
      prompt: 'Soften this dogmatic statement into an impersonal hedged proposition starting with "It is suggested that": "Urban congestion directly reduces worker productivity."',
      options: [],
      acceptedAnswers: [
        { text: 'It is suggested that urban congestion may reduce worker productivity.', rationale: 'Introduces impersonal frame and tentative modal may.' },
        { text: 'It is suggested that urban congestion reduces worker productivity.', rationale: 'Softens claim via impersonal passive introductory frame.' },
      ],
    },
    {
      id: 'grammar-v2-c1-hedging-propositions-13-q10',
      kind: 'transform',
      prompt: 'Rewrite using "There would appear to be": "No substantial discrepancy exists between the two audit reports."',
      options: [],
      acceptedAnswers: [
        { text: 'There would appear to be no substantial discrepancy between the two audit reports.', rationale: 'Replaces absolute copula with tentative perception frame.' },
        { text: 'There would appear to be little substantial discrepancy between the two audit reports.', rationale: 'Cautious phrasing using little discrepancy.' },
      ],
    },
    {
      id: 'grammar-v2-c1-hedging-propositions-13-q11',
      kind: 'correction',
      prompt: 'Correct the unhedged, dogmatic assertion to an acceptable academic hedge: "The experiment proves that our compound completely cures neural inflammation."',
      options: [],
      acceptedAnswers: [
        { text: 'The experiment suggests that our compound may alleviate neural inflammation.', rationale: 'Replaces proves with suggests and completely cures with may alleviate.' },
        { text: 'The experiment suggests that our compound may reduce neural inflammation.', rationale: 'Uses tentative verb suggests and modal may reduce.' },
        { text: 'The findings indicate that our compound may reduce neural inflammation.', rationale: 'Uses tentative reporting verb indicate and modal may.' },
        { text: 'The findings suggest that our compound may reduce neural inflammation.', rationale: 'Accepts findings suggest variant.' },
      ],
    },
    {
      id: 'grammar-v2-c1-hedging-propositions-13-q12',
      kind: 'correction',
      prompt: 'Fix the faulty grammar in this impersonal hedge: "There is widely believed that genetic markers dictate metabolic rates."',
      options: [],
      acceptedAnswers: [
        { text: 'It is widely believed that genetic markers dictate metabolic rates.', rationale: 'Replaces dummy there with dummy pronoun it in impersonal passive construction.' },
      ],
    },
  ],
  reviewExercises: [
    {
      id: 'grammar-v2-c1-hedging-propositions-13-r1',
      kind: 'choice',
      prompt: 'Select the optimal academic hedge for concluding a methodology critique.',
      options: [
        { text: 'The present methodology appears to offer a defensible, albeit imperfect, metric.', correct: true, rationale: 'Balanced hedging with appears to offer and concessive albeit imperfect.' },
        { text: 'Our methodology is definitively flawless and solves all previous limitations.', correct: false, rationale: 'Absolutist claim violates scholarly modesty.' },
        { text: 'It could maybe possibly seem that our method might somehow work.', correct: false, rationale: 'Ineffective over-hedging.' },
      ],
      acceptedAnswers: [{ text: 'The present methodology appears to offer a defensible, albeit imperfect, metric.', rationale: 'Disciplined academic hedge.' }],
    },
    {
      id: 'grammar-v2-c1-hedging-propositions-13-r2',
      kind: 'gap',
      prompt: 'Complete the cautious proposition: "There appears _____ be a divergence between recorded outcomes and theoretical projections."',
      options: [],
      acceptedAnswers: [{ text: 'to', rationale: 'Appears to be is the required infinitive complement.' }],
    },
    {
      id: 'grammar-v2-c1-hedging-propositions-13-r3',
      kind: 'transform',
      prompt: 'Hedge this categorical claim starting with "Evidence indicates that": "New tariff barriers cause localized shortages."',
      options: [],
      acceptedAnswers: [
        { text: 'Evidence indicates that new tariff barriers may cause localized shortages.', rationale: 'Integrates evidence indicates that with tentative modal may.' },
        { text: 'Evidence indicates that new tariff barriers could lead to localized shortages.', rationale: 'Cautious claim using could lead to.' },
        { text: 'Evidence indicates that new tariff barriers could cause localized shortages.', rationale: 'Accepts modal could cause.' },
        { text: 'Evidence indicates that new tariff barriers might cause localized shortages.', rationale: 'Accepts tentative modal might cause.' },
      ],
    },
    {
      id: 'grammar-v2-c1-hedging-propositions-13-r4',
      kind: 'correction',
      prompt: 'Correct the error in this hedged sentence: "It cannot be rule out that seasonal migration altered the dataset."',
      options: [],
      acceptedAnswers: [
        { text: 'It cannot be ruled out that seasonal migration altered the dataset.', rationale: 'Passive construction requires past participle ruled.' },
      ],
    },
  ],
  outputPrompts: [
    {
      id: 'grammar-v2-c1-hedging-propositions-13-o1',
      prompt: 'Viết 2 câu học thuật diễn đạt kết quả nghiên cứu về ảnh hưởng của trí tuệ nhân tạo đối với năng suất lao động, sử dụng cấu trúc "It is widely suggested that..." và "There would appear to be...".',
      modelAnswer: 'It is widely suggested that generative AI tools may accelerate early-stage drafting workflows across knowledge-intensive sectors. However, there would appear to be limited empirical evidence demonstrating sustained long-term productivity gains in specialized engineering roles.',
      checks: [
        'Sử dụng mệnh đề vô nhân xưng chừng mực "It is widely suggested that...".',
        'Sử dụng khung nhận thức dè dặt "There would appear to be...".',
        'Tránh các từ khẳng định tuyệt đối (proves, definitely, 100%).',
      ],
    },
    {
      id: 'grammar-v2-c1-hedging-propositions-13-o2',
      prompt: 'Viết 1-2 câu trong phần thảo luận bài báo khoa học, sử dụng "cannot be ruled out" và "lends tentative support to" để bình luận về một ngoại lệ trong dữ liệu thí nghiệm.',
      modelAnswer: 'Although secondary environmental variables cannot be ruled out, the observed correlation lends tentative support to the primary thermodynamic model under investigation.',
      checks: [
        'Sử dụng cụm diễn đạt "cannot be ruled out" (hoặc "cannot be ruled out that...").',
        'Sử dụng cụm "lends tentative support to" hoặc cấu trúc rào đón tương đương.',
        'Văn phong học thuật chuẩn C1, mạch lạc và chặt chẽ.',
      ],
    },
  ],
  sources: [
    {
      id: 'hyland-hedging-scientific-writing',
      title: 'Hyland: The Author in the Text: Hedging Scientific Writing',
      url: 'https://files.eric.ed.gov/fulltext/ED390258.pdf',
      claims: [
        'Hedging propositions softens categorical assertiveness in scholarly claims.',
        'Impersonal passive and non-agentive frames allow researchers to report hypotheses without personal liability.',
        'Modal verbs and cautious cognitive verbs combine to indicate epistemic restraint.',
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
    summary: 'Reviewed all 12 exercises, 4 review exercises, 2 output prompts, and updated bibliographic source to verified Hyland scientific hedging paper.',
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

export default hedgingPropositionsLesson;
