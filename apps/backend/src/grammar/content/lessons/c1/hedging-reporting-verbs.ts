/**
 * @file hedging-reporting-verbs.ts
 * @description C1 lesson on reporting verbs graded by epistemic commitment (tentative vs neutral vs assertive) in scholarly writing.
 */
import type { GrammarLesson } from '../../types.js';

const hedgingReportingVerbsLesson: GrammarLesson = {
  id: 'grammar-v2-c1-hedging-reporting-verbs-16',
  revisionId: 'grammar-v2-c1-hedging-reporting-verbs-16@1.0.0',
  revision: '1.0.0',
  title: 'Động từ trích dẫn mang tính rào đón (Hedging Reporting Verbs)',
  objective: 'Phân biệt và vận dụng các động từ tường thuật/trích dẫn theo thang độ cam kết học thuật (tentative: suggest, imply; neutral: observe; assertive: demonstrate; skeptical: claim) để tích hợp tài liệu tham khảo chính xác.',
  prerequisiteIds: ['grammar-v2-c1-stance-adverbials-15'],
  coverage: ['hedging-reporting-verbs', 'academic-citations', 'reporting-verbs', 'stance-and-evaluation', 'c1-academic-writing'],
  context: {
    english: 'In academic literature reviews, the choice of reporting verb is an evaluative act. Writing "Patel (2023) demonstrates that..." endorses the finding as empirical truth, whereas "Patel (2023) suggests that..." remains cautious, and "Patel (2023) claims that..." signals authorial skepticism.',
    vietnamese: 'Trong tổng quan tài liệu học thuật, lựa chọn động từ trích dẫn là một hành vi đánh giá. Viết "Patel (2023) demonstrates that..." thể hiện sự ủng hộ kết quả như chân lý thực nghiệm, trong khi "Patel (2023) suggests that..." giữ sự chừng mực, còn "Patel (2023) claims that..." phát tín hiệu hoài nghi từ tác giả.',
  },
  guide: {
    pattern: 'Researcher / Study + Tentative / Neutral / Assertive Reporting Verb + that-clause | as reported / postulated by Author',
    whenToUse: [
      'Trích dẫn nghiên cứu tiền nhiệm với mức độ đồng tình hoặc dè dặt tương ứng với chất lượng chứng cứ.',
      'Rào đón kết luận của chính mình khi đối chiếu với các tác giả khác ("Our data lead us to propose that...").',
      'Định vị khoảng cách học thuật mà không dùng từ ngữ công kích thô thiển.',
    ],
    signalWords: ['suggest', 'imply', 'postulate', 'observe', 'contend', 'demonstrate', 'purport', 'allege'],
    check: [
      'Động từ được chọn có phản ánh đúng mức độ tin cậy của nguồn nghiên cứu được trích không?',
      'Đã lưu ý rằng "claim" hay "purport" thường biểu thị thái độ hoài nghi của người trích dẫn chưa?',
    ],
  },
  explanation: 'Reporting verbs (động từ trích dẫn) trong văn phong học thuật C1 không đơn thuần là từ nối ngữ pháp mà là chỉ báo lập trường (stance marker). Thang đo cam kết được chia thành: 1) Tentative / Hedging (thăm dò, khiêm tốn): suggest, imply, propose, postulate, intimate — dùng khi kết quả mới dừng ở mức gợi ý; 2) Neutral (trung tính): note, observe, report, describe — tường thuật khách quan không bày tỏ thiên kiến; 3) Strong / Assertive (khẳng định mạnh): demonstrate, establish, substantiate, show — khi phương pháp nghiên cứu chặt chẽ và kết luận đã được kiểm chứng; 4) Distancing / Skeptical (tạo khoảng cách, hoài nghi): claim, allege, assert without evidence, purport — ngụ ý luận điểm của tác giả được trích chưa đủ sức thuyết phục.',
  examples: [
    {
      english: 'Vogel (2024) suggests that microplastics may compromise cellular permeability in marine fauna.',
      vietnamese: 'Vogel (2024) gợi ý rằng các vi hạt nhựa có thể làm tổn hại tính thấm của màng tế bào ở động vật biển.',
    },
    {
      english: 'The longitudinal census data imply a systemic demographic shift toward regional commuter hubs.',
      vietnamese: 'Dữ liệu điều tra dân số theo chiều dọc ngụ ý một sự chuyển dịch nhân khẩu học mang tính hệ thống sang các đầu mối ngoại ô.',
    },
    {
      english: 'Richards and Chang (2022) established that the enzymatic reaction accelerates under alkaline conditions.',
      vietnamese: 'Richards và Chang (2022) đã chứng minh vững chắc rằng phản ứng enzyme tăng tốc trong điều kiện kiềm.',
    },
    {
      english: 'Proponents of deregulation claim that market competition alone will curb escalating tariffs.',
      vietnamese: 'Những người ủng hộ việc bãi bỏ quy định quả quyết rằng chỉ riêng cạnh tranh thị trường sẽ kiềm chế được biểu thuế leo thang.',
    },
    {
      english: 'The authors postulate a novel mechanism linking gut microbiomes to neuroinflammation.',
      vietnamese: 'Các tác giả đưa ra giả thuyết về một cơ chế mới liên kết hệ vi sinh đường ruột với chứng viêm thần kinh.',
    },
    {
      english: 'Early pilot studies observed modest gains in language fluency through spaced retrieval practice.',
      vietnamese: 'Các nghiên cứu thí điểm ban đầu ghi nhận mức cải thiện khiêm tốn về độ trôi chảy ngôn ngữ thông qua thực hành truy xuất ngắt quãng.',
    },
  ],
  contrasts: [
    {
      form: 'Tanaka suggests that the metric is flawed vs Tanaka claims that the metric is flawed',
      whyFits: 'Suggests thể hiện sự thận trọng học thuật, nhìn nhận Tanaka đưa ra đóng góp phản biện đáng cân nhắc.',
      whyNot: 'Claims ngụ ý người viết nghi ngờ lập luận của Tanaka hoặc xem đó là phán đoán chủ quan chưa đủ bằng chứng.',
    },
    {
      form: 'The trial demonstrated therapeutic efficacy vs The trial suggested therapeutic efficacy',
      whyFits: 'Demonstrated chỉ được dùng khi dữ liệu thử nghiệm lâm sàng đủ độ tin cậy thống kê cao và không thể tranh cãi.',
      whyNot: 'Suggested phù hợp hơn cho các giai đoạn thử nghiệm sơ bộ hoặc cỡ mẫu nhỏ chưa đủ kết luận dứt khoát.',
    },
  ],
  commonMistakes: [
    'Dùng động từ "claim" bừa bãi cho mọi trích dẫn nghiên cứu, vô tình truyền tải thái độ hoài nghi hoặc coi thường luận điểm của tác giả được dẫn.',
    'Nhầm lẫn giữa "imply" (dữ liệu hay tác giả ngụ ý điều gì) và "infer" (người đọc hay nhà nghiên cứu tự suy luận ra điều gì từ bằng chứng).',
    'Lẫn lộn thì của động từ trích dẫn: không phân biệt giữa thì quá khứ đơn (mô tả thí nghiệm lịch sử cụ thể) và hiện tại đơn (trích dẫn mô hình lý thuyết vẫn đang có hiệu lực).',
  ],
  summary: 'Hedging Reporting Verbs (suggest, imply, postulate vs demonstrate vs claim) cho phép tác giả điều chỉnh mức độ đồng tình, bảo vệ tính trung thực khoa học và định vị khoảng cách phản biện trong tổng quan tài liệu.',
  exercises: [
    {
      id: 'grammar-v2-c1-hedging-reporting-verbs-16-q1',
      kind: 'choice',
      prompt: 'Select the reporting verb that signals authorial skepticism toward an unverified assertion.',
      options: [
        { text: 'The lobby group claims that the proposed tax will destroy thousands of jobs.', correct: true, rationale: 'Claims signals distance and skepticism by the writer toward the unverified assertion.' },
        { text: 'The lobby group demonstrates that the proposed tax will destroy thousands of jobs.', correct: false, rationale: 'Demonstrates endorses the claim as empirically proven fact.' },
        { text: 'The lobby group establishes that the proposed tax will destroy thousands of jobs.', correct: false, rationale: 'Establishes endorses the validity of the evidence.' },
        { text: 'The lobby group observes that the proposed tax will destroy thousands of jobs.', correct: false, rationale: 'Observes reports a neutral, objective recording.' },
      ],
      acceptedAnswers: [{ text: 'The lobby group claims that the proposed tax will destroy thousands of jobs.', rationale: 'Correct skeptical stance via claims.' }],
    },
    {
      id: 'grammar-v2-c1-hedging-reporting-verbs-16-q2',
      kind: 'choice',
      prompt: 'Choose the most appropriate tentative reporting verb for an exploratory, non-definitive study: "Recent spectroscopic observations ___ that water vapor may exist in the exoplanet atmosphere."',
      options: [
        { text: 'suggest', correct: true, rationale: 'Suggest appropriately frames an exploratory finding without overcommitting.' },
        { text: 'prove beyond doubt', correct: false, rationale: 'Inappropriately absolute for initial observations.' },
        { text: 'irrefutably confirm', correct: false, rationale: 'Overstates preliminary evidence.' },
        { text: 'allege', correct: false, rationale: 'Allege implies legal wrongdoing or groundless accusation.' },
      ],
      acceptedAnswers: [{ text: 'suggest', rationale: 'Appropriate tentative reporting verb.' }],
    },
    {
      id: 'grammar-v2-c1-hedging-reporting-verbs-16-q3',
      kind: 'choice',
      prompt: 'Identify the sentence where the reporting verb expresses strong empirical endorsement.',
      options: [
        { text: 'Extensive randomized trials have demonstrated that the vaccine confers robust immunity.', correct: true, rationale: 'Demonstrated expresses strong empirical verification grounded in robust data.' },
        { text: 'Extensive randomized trials have claimed that the vaccine confers robust immunity.', correct: false, rationale: 'Trials do not "claim"; trials show or demonstrate outcomes.' },
        { text: 'Extensive randomized trials have insinuated that the vaccine confers robust immunity.', correct: false, rationale: 'Insinuated implies covert or malicious hints.' },
        { text: 'Extensive randomized trials have guessed that the vaccine confers robust immunity.', correct: false, rationale: 'Unscientific and informal verb.' },
      ],
      acceptedAnswers: [{ text: 'Extensive randomized trials have demonstrated that the vaccine confers robust immunity.', rationale: 'Correct assertive empirical endorsement.' }],
    },
    {
      id: 'grammar-v2-c1-hedging-reporting-verbs-16-q4',
      kind: 'choice',
      prompt: 'Which reporting verb best denotes formulating a theoretical proposition for further testing?',
      options: [
        { text: 'The astrophysicists postulate that dark matter interacts via an undocumented fifth force.', correct: true, rationale: 'Postulate means proposing an unproven hypothesis as the basis for theory.' },
        { text: 'The astrophysicists fabricate that dark matter interacts via a fifth force.', correct: false, rationale: 'Fabricate implies fraudulent invention.' },
        { text: 'The astrophysicists preach that dark matter interacts via a fifth force.', correct: false, rationale: 'Preach conveys religious or moralistic exhortation.' },
        { text: 'The astrophysicists boast that dark matter interacts via a fifth force.', correct: false, rationale: 'Boast conveys personal arrogance rather than science.' },
      ],
      acceptedAnswers: [{ text: 'The astrophysicists postulate that dark matter interacts via an undocumented fifth force.', rationale: 'Postulate fits theoretical hypothesis building.' }],
    },
    {
      id: 'grammar-v2-c1-hedging-reporting-verbs-16-q5',
      kind: 'gap',
      prompt: 'Fill in the tentative reporting verb: "Preliminary survey data _____ that remote working options increase employee retention. (suggest / prove)"',
      options: [],
      acceptedAnswers: [
        { text: 'suggest', rationale: 'Suggest appropriately frames preliminary data.' },
        { text: 'indicate', rationale: 'Indicate is also accepted as a cautious reporting verb.' },
      ],
    },
    {
      id: 'grammar-v2-c1-hedging-reporting-verbs-16-q6',
      kind: 'gap',
      prompt: 'Supply the skeptical reporting verb indicating unproven assertion: "The manufacturer _____ that the device functions for a decade without maintenance, though independent tests refute this. (claims / establishes)"',
      options: [],
      acceptedAnswers: [
        { text: 'claims', rationale: 'Claims signals distance and doubtful veracity.' },
      ],
    },
    {
      id: 'grammar-v2-c1-hedging-reporting-verbs-16-q7',
      kind: 'gap',
      prompt: 'Insert the verb denoting theoretical hypothesis proposal: "Quantum theorists _____ that parallel histories branch at every measurement. (postulate / preach)"',
      options: [],
      acceptedAnswers: [
        { text: 'postulate', rationale: 'Postulate means to suggest a foundational hypothesis.' },
        { text: 'hypothesize', rationale: 'Hypothesize is also accepted.' },
      ],
    },
    {
      id: 'grammar-v2-c1-hedging-reporting-verbs-16-q8',
      kind: 'gap',
      prompt: 'Complete the sentence with the neutral observational verb: "In his seminal monograph, Weber _____ that bureaucratic rationalization dominates modern institutions. (notes / demands)"',
      options: [],
      acceptedAnswers: [
        { text: 'notes', rationale: 'Notes objectively cites a scholar without taking a strong subjective bias.' },
        { text: 'observes', rationale: 'Observes is equally acceptable as a neutral verb.' },
      ],
    },
    {
      id: 'grammar-v2-c1-hedging-reporting-verbs-16-q9',
      kind: 'transform',
      prompt: 'Soften this strong assertion into a tentative academic citation using "suggests": "Miller demonstrates that linguistic immersion cures grammatical deficits."',
      options: [],
      acceptedAnswers: [
        { text: 'Miller suggests that linguistic immersion may alleviate grammatical deficits.', rationale: 'Replaces demonstrates with suggests and softens cures with may alleviate.' },
        { text: 'Miller suggests that linguistic immersion cures grammatical deficits.', rationale: 'Replaces demonstrates with tentative verb suggests.' },
      ],
    },
    {
      id: 'grammar-v2-c1-hedging-reporting-verbs-16-q10',
      kind: 'transform',
      prompt: 'Rewrite to express critical distance using "claims that": "The spokesperson states that emissions have dropped by fifty percent."',
      options: [],
      acceptedAnswers: [
        { text: 'The spokesperson claims that emissions have dropped by fifty percent.', rationale: 'Replaces neutral states with skeptical claims to introduce critical distance.' },
      ],
    },
    {
      id: 'grammar-v2-c1-hedging-reporting-verbs-16-q11',
      kind: 'correction',
      prompt: 'Correct the misuse of "infer" where the author is imparting meaning: "The researcher infers that economic instability will continue."',
      options: [],
      acceptedAnswers: [
        { text: 'The researcher implies that economic instability will continue.', rationale: 'Imply is used when the author conveys or hints at a conclusion.' },
        { text: 'The researcher suggests that economic instability will continue.', rationale: 'Suggests is also accepted.' },
      ],
    },
    {
      id: 'grammar-v2-c1-hedging-reporting-verbs-16-q12',
      kind: 'correction',
      prompt: 'Correct the unhedged, over-assertive reporting verb in this preliminary review: "This small pilot study completely proves that the curriculum is universally effective."',
      options: [],
      acceptedAnswers: [
        { text: 'This small pilot study suggests that the curriculum may be broadly effective.', rationale: 'Replaces proves with suggests and removes absolute words.' },
        { text: 'This small pilot study indicates that the curriculum could be effective.', rationale: 'Uses indicates and tentative modal could.' },
      ],
    },
  ],
  reviewExercises: [
    {
      id: 'grammar-v2-c1-hedging-reporting-verbs-16-r1',
      kind: 'choice',
      prompt: 'Choose the most neutral reporting verb for a factual literature summary.',
      options: [
        { text: 'Harrison (2021) observes that urban green corridors support migratory bird populations.', correct: true, rationale: 'Observes provides a balanced, neutral citation.' },
        { text: 'Harrison (2021) purports that urban green corridors support migratory birds.', correct: false, rationale: 'Purports casts suspicious doubt on the research.' },
        { text: 'Harrison (2021) boasts that urban green corridors support migratory birds.', correct: false, rationale: 'Boasts implies vanity, unsuited to academic literature.' },
      ],
      acceptedAnswers: [{ text: 'Harrison (2021) observes that urban green corridors support migratory bird populations.', rationale: 'Correct neutral citation verb.' }],
    },
    {
      id: 'grammar-v2-c1-hedging-reporting-verbs-16-r2',
      kind: 'gap',
      prompt: 'Insert the cautious verb: "The emerging correlations _____ a linkage between chronic insomnia and metabolic decline. (imply / dictate)"',
      options: [],
      acceptedAnswers: [{ text: 'imply', rationale: 'Imply suggests a connection without asserting rigid causation.' }],
    },
    {
      id: 'grammar-v2-c1-hedging-reporting-verbs-16-r3',
      kind: 'transform',
      prompt: 'Rewrite to indicate theoretical hypothesis rather than certainty using "postulate": "Cosmologists believe that cosmic inflation occurred in microseconds."',
      options: [],
      acceptedAnswers: [
        { text: 'Cosmologists postulate that cosmic inflation occurred in microseconds.', rationale: 'Replaces informal believe with scholarly postulate.' },
      ],
    },
    {
      id: 'grammar-v2-c1-hedging-reporting-verbs-16-r4',
      kind: 'correction',
      prompt: 'Correct the stance error in reporting an uncorroborated marketing boast: "The vendor demonstrates that their server never crashes."',
      options: [],
      acceptedAnswers: [
        { text: 'The vendor claims that their server never crashes.', rationale: 'Changes demonstrates to claims because the claim is unverified and questionable.' },
      ],
    },
  ],
  outputPrompts: [
    {
      id: 'grammar-v2-c1-hedging-reporting-verbs-16-o1',
      prompt: 'Viết 2 câu tổng quan tài liệu học thuật (literature review) so sánh hai trường phái: một trường phái đưa ra giả thuyết thận trọng ("suggest" hoặc "postulate") và một bên khẳng định thiếu căn cứ ("claim").',
      modelAnswer: 'While early neurobiologists postulated that adult neurogenesis was biologically impossible, contemporary studies suggest that hippocampal plasticity persists throughout adulthood. Conversely, certain commercial wellness advocates claim that specific dietary supplements can instantaneously restore cognitive deficits.',
      checks: [
        'Sử dụng động từ trích dẫn mang tính giả thuyết "postulated" hoặc "suggest".',
        'Sử dụng "claim" với hàm ý hoài nghi đối với tuyên bố chưa kiểm chứng.',
        'Văn phong so sánh tài liệu học thuật C1 chuẩn xác.',
      ],
    },
    {
      id: 'grammar-v2-c1-hedging-reporting-verbs-16-o2',
      prompt: 'Viết 1-2 câu trích dẫn kết quả của một nghiên cứu thực nghiệm quy mô lớn bằng động từ mang tính khẳng định mạnh mẽ có căn cứ ("demonstrate" hoặc "establish").',
      modelAnswer: 'A landmark multi-center trial established that early cardiovascular intervention reduces five-year mortality rates by twenty percent among hypertensive patients.',
      checks: [
        'Sử dụng động từ trích dẫn khẳng định mạnh "established" hoặc "demonstrated".',
        'Có ngữ cảnh thử nghiệm lâm sàng hoặc dữ liệu thực nghiệm quy mô lớn.',
        'Ngữ pháp và thì của câu chuẩn xác.',
      ],
    },
  ],
  sources: [
    {
      id: 'cambridge-hedges-and-reporting',
      title: 'English Grammar Today: Hedges (just)',
      url: 'https://dictionary.cambridge.org/grammar/british-grammar/hedges-just',
      claims: [
        'Hedges are expressions used to make statements less direct, less categorical, or less strictly factual.',
        'Reporting structures allow writers to calibrate epistemic stance from tentative suggestion to critical distance.',
        'Evaluative reporting words signal authorial alignment or skepticism toward cited claims.',
      ],
      checkedAt: '2026-10-05',
      provenance: 'reference-only',
    },
  ],
  review: {
    status: 'approved',
    mode: 'ai-internal',
    reviewer: 'ai-internal-reviewer',
    reviewedAt: '2026-10-06T00:00:00.000Z',
    summary: 'Comprehensive review completed. Hedging reporting verbs (suggest, postulate vs demonstrate vs claim), epistemic stance scales, q4 agreement fix, exercise items, and verified Cambridge Grammar source confirmed.',
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

export default hedgingReportingVerbsLesson;
