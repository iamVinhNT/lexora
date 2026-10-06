/**
 * @file tense-reference-discourse.ts
 * @description C2 lesson on tense reference in extended discourse: temporal anaphora, Reichenbachian reference points, and backshifting invariance.
 */
import type { GrammarLesson } from '../../types.js';

const lesson: GrammarLesson = {
  id: 'grammar-v2-c2-tense-reference-discourse-07',
  revisionId: 'grammar-v2-c2-tense-reference-discourse-07@1.0.0',
  revision: '1.0.0',
  title: 'Quy chiếu thời gian trong diễn ngôn phức hợp: Temporal Reference & Discourse Coherence',
  objective: 'Làm chủ cơ chế quy chiếu thời gian đa tầng theo mô hình Hans Reichenbach (Speech, Event, Reference Time): điều phối phép quy chiếu hồi chỉ thời gian (temporal anaphora), áp dụng linh hoạt quy tắc không lùi thì (non-backshifting) đối với các nguyên lý pháp lý/khoa học vĩnh cửu, và duy trì tính mạch lạc thời gian trong các văn bản phân tích phức tạp.',
  prerequisiteIds: ['grammar-v2-c2-aspectual-viewpoint-06'],
  coverage: ['tense-reference-discourse', 'discourse-grammar', 'temporal-anaphora', 'backshifting'],
  context: {
    english: 'An appellate judge drafts a majority opinion overturning lower-court precedent, meticulously regulating temporal reference points to establish the historical chronology of the dispute while keeping enduring constitutional doctrines in the unshifted present tense.',
    vietnamese: 'Một thẩm phán phúc thẩm soạn thảo bản án đa số lật lại án lệ của tòa cấp dưới, điều phối tỉ mỉ các điểm quy chiếu thời gian để xác lập trình tự lịch sử của vụ tranh chấp trong khi vẫn giữ các nguyên lý hiến pháp vĩnh cửu ở thì hiện tại không lùi thì.',
  },
  guide: {
    pattern: 'Discourse Time Anchor (Past Simple) -> Temporal Anaphora (Moving R) -> Flashback Closure (Past Perfect -> Revert to Simple Past) -> Enduring Jurisprudence / Scientific Truth (Non-backshifted Present: S + held/ruled that + S + V_s/es)',
    whenToUse: [
      'Điều phối dòng thời gian phức tạp trải dài nhiều đoạn văn trong các bản án tư pháp, chuyên khảo lịch sử và tài liệu đàm phán ngoại giao.',
      'Duy trì thì hiện tại đơn trong mệnh đề phụ danh từ (non-backshifting) khi nội dung trích dẫn thể hiện một nguyên lý, đạo luật hoặc học thuyết vẫn đang có hiệu lực toàn vẹn.',
      'Sử dụng phép quy chiếu hồi chỉ thời gian (temporal anaphora) để dịch chuyển điểm quy chiếu (Reference Time) mạch lạc mà không phải lặp lại trạng ngữ thời gian hoặc lạm dụng thì quá khứ hoàn thành.',
    ],
    signalWords: ['affirmed that', 'held that', 'ruled that', 'hitherto', 'heretofore', 'at the material time', 'enduring principle'],
    check: [
      'Tránh lùi thì một cách máy móc trong các văn bản tư pháp và học thuật khi trích dẫn các phán quyết hoặc quy luật còn nguyên giá trị đương đại.',
      'Không duy trì thì quá khứ hoàn thành (Past Perfect) xuyên suốt toàn bộ đoạn văn hồi tưởng; chỉ dùng Past Perfect ở câu mở đầu để thiết lập mốc tham chiếu rồi chuyển về Quá khứ Đơn.',
      'Phân biệt hiện tượng "Double Access Reading" (mệnh đề vừa đúng tại thời điểm phát ngôn ban đầu, vừa đúng tại thời điểm báo cáo hiện tại).',
    ],
  },
  explanation: 'Ở cấp độ C2, việc sử dụng thì vượt ra khỏi phạm vi một câu đơn lẻ để trở thành công cụ định vị diễn ngôn toàn cục (global discourse organization). Theo mô hình kinh điển của Hans Reichenbach (1947), thời gian trong ngôn ngữ được xác định bởi ba trục tọa độ: Speech Time (S - thời điểm phát ngôn), Event Time (E - thời điểm biến cố diễn ra), và Reference Time (R - điểm quy chiếu thời gian mà người nói hướng sự chú ý tới). Trong các văn bản tự sự và phân tích chuyên sâu, điểm quy chiếu R dịch chuyển liên tục theo từng bước phát triển của lập luận (Temporal Anaphora). Một sai lầm phổ biến là tiếp tục dùng thì quá khứ hoàn thành (had + V-ed) trong mọi câu của một đoạn hồi ức; quy ước C2 chuẩn mực là dùng quá khứ hoàn thành ở câu đầu để "neo" điểm R vào quá khứ xa hơn, sau đó quay trở lại quá khứ đơn để duy trì nhịp điệu tự nhiên. Quan trọng hơn cả là hiện tượng "Non-backshifting" (Bảo lưu thì hiện tại trong lời dẫn gián tiếp): khi tòa án tuyên bố "The Chief Justice held that the constitution guarantees due process", việc giữ nguyên "guarantees" thay vì lùi về "guaranteed" mang tính quyết định về mặt luật học, khẳng định rằng quyền hiến định đó là một nguyên lý vĩnh cửu có hiệu lực đương thời, chứ không phải một sự kiện lịch sử đã chấm dứt.',
  examples: [
    {
      english: 'In Marbury v. Madison, Chief Justice Marshall held that the Constitution is the supreme law of the land.',
      vietnamese: 'Trong án lệ Marbury kiện Madison, Chánh án Marshall đã phán quyết rằng Hiến pháp là đạo luật tối cao của quốc gia. (Non-backshifting: "is" được giữ nguyên ở hiện tại vì nguyên lý hiến pháp vẫn có hiệu lực vĩnh cửu).',
    },
    {
      english: 'The epidemiologist testified that the pathogen mutates rapidly under selective antibiotic pressure.',
      vietnamese: 'Chuyên gia dịch tễ học đã làm chứng rằng mầm bệnh biến dị nhanh chóng dưới áp lực chọn lọc của kháng sinh. (Chân lý sinh học vĩnh viễn được bảo lưu ở thì hiện tại đơn sau động từ tường thuật quá khứ).',
    },
    {
      english: 'The consortium had acquired the concessions in 2018. Over the subsequent decade, it injected billions into infrastructure, transformed the regional logistics network, and eventually divested the non-core assets.',
      vietnamese: 'Tập đoàn đã mua lại quyền nhượng quyền vào năm 2018. Trong thập kỷ tiếp theo, tập đoàn đã rót hàng tỷ đô la vào cơ sở hạ tầng, chuyển đổi mạng lưới hậu cần khu vực, và cuối cùng đã thoái vốn các tài sản không cốt lõi. (Quá khứ hoàn thành neo thời gian ở câu đầu, sau đó chuyển nhịp sang quá khứ đơn: injected, transformed, divested).',
    },
    {
      english: 'Counsel argued that the defendant remains eligible for statutory immunity under the amended code.',
      vietnamese: 'Luật sư lập luận rằng bị cáo vẫn tiếp tục đủ điều kiện hưởng quyền miễn trừ theo luật định chiếu theo bộ luật sửa đổi. (Double access: quyền miễn trừ được cho là có hiệu lực tại thời điểm lập luận và vẫn tiếp tục kéo dài tới hiện tại).',
    },
    {
      english: 'The historical chronicle established that hitherto, no sovereign had successfully negotiated a non-aggression pact with the confederation.',
      vietnamese: 'Biên niên sử xác lập rằng cho tới thời điểm đó, chưa từng có vị quân vương nào đàm phán thành công hiệp ước bất tương xâm với liên bang. (Hitherto kết hợp past perfect xác lập giới hạn thời gian lùi trước điểm quy chiếu R).',
    },
    {
      english: 'The panel noted that while the initial assessment was flawed, the corrective protocol complies with international standards.',
      vietnamese: 'Hội đồng lưu ý rằng trong khi đánh giá ban đầu có sai sót, thì quy trình khắc phục hiện tại vẫn tuân thủ đầy đủ các tiêu chuẩn quốc tế. (Phối hợp thì tinh tế: quá khứ đơn cho dữ liệu cũ, hiện tại đơn cho tính tương thích hiện hành).',
    },
  ],
  contrasts: [
    {
      form: 'The judge ruled that the contract was void vs The judge ruled that the statute violates equal protection',
      whyFits: 'Câu thứ nhất lùi thì về "was void" vì đó là phán quyết cho một hợp đồng cụ thể trong quá khứ; câu thứ hai giữ nguyên "violates" vì điều luật đó vẫn đang tồn tại và xung đột với hiến pháp cho đến ngày nay.',
      whyNot: 'Nếu lùi câu thứ hai về "violated", người đọc có thể hiểu sai rằng đạo luật đã bị bãi bỏ hoặc không còn vi hiến nữa.',
    },
    {
      form: 'He had entered the room, had sat down, and had opened his briefcase vs He had entered the room; he then sat down and opened his briefcase',
      whyFits: 'Câu thứ hai đạt chuẩn mực diễn ngôn tự sự cao cấp: dùng past perfect một lần để định vị thời gian lùi trước, sau đó dùng past simple cho chuỗi hành động kế tiếp.',
      whyNot: 'Câu thứ nhất lặp lại had ba lần gây nặng nề, cơ học và thiếu tự nhiên về mặt dụng học ngôn ngữ.',
    },
  ],
  commonMistakes: [
    'Lùi thì máy móc (mechanical backshifting) biến các định chế pháp lý và chân lý khoa học hiện hành thành các sự kiện quá khứ đã mất hiệu lực.',
    'Lạm dụng Past Perfect liên tiếp trong nhiều câu văn miêu tả quá khứ (past-perfect fatigue) thay vì quay về Past Simple sau khi đã thiết lập mốc thời gian.',
    'Bối rối giữa thời điểm sự kiện (Event Time) và thời điểm phát ngôn (Speech Time), dẫn đến việc dùng sai thì hoàn thành và thì đơn trong cùng một đoạn trích dẫn.',
  ],
  summary: 'Quy chiếu thời gian trong diễn ngôn (Tense Reference in Discourse) yêu cầu kiểm soát tọa độ Reichenbach, điều phối điểm quy chiếu R mạch lạc và vận dụng linh hoạt ngoại lệ không lùi thì để bảo toàn giá trị pháp lý và chân lý.',
  exercises: [
    {
      id: 'grammar-v2-c2-tense-reference-discourse-07-q1',
      kind: 'choice',
      prompt: 'Trong phán quyết tư pháp phúc thẩm: "The trial court correctly observed that the Fourth Amendment ___ citizens against unreasonable searches." Chọn dạng động từ chính xác nhất theo chuẩn mực luật học:',
      options: [
        { text: 'protects', correct: true, rationale: 'Nguyên lý hiến pháp có giá trị bảo hộ vĩnh cửu và đang có hiệu lực tối cao, quy ước học thuật bắt buộc giữ thì hiện tại đơn (non-backshifting).' },
        { text: 'protected', correct: false, rationale: 'Lùi thì về protected có thể gây hiểu lầm rằng tu chính án hiến pháp đã chấm dứt hiệu lực bảo vệ quyền công dân.' },
        { text: 'had been protecting', correct: false, rationale: 'Thì quá khứ hoàn thành tiếp diễn biến nguyên tắc thành một giai đoạn lịch sử cục bộ.' },
      ],
      acceptedAnswers: [{ text: 'protects', rationale: 'Non-backshifting đối với nguyên tắc hiến pháp đang có hiệu lực.' }],
    },
    {
      id: 'grammar-v2-c2-tense-reference-discourse-07-q2',
      kind: 'choice',
      prompt: 'Xét đoạn văn tự sự lịch sử: "The general had retreated across the river at midnight. At dawn, he ___ his officers and outlined the counter-offensive." Chọn thì phù hợp nhất để duy trì dòng chảy tự sự:',
      options: [
        { text: 'convened', correct: true, rationale: 'Sau khi câu đầu đã dùng Past Perfect (had retreated) để thiết lập mốc lùi, câu tiếp theo chuyển về Past Simple (convened) để tiếp nối chuỗi hành động mạch lạc.' },
        { text: 'had convened', correct: false, rationale: 'Lặp lại had convened tạo nên sự nặng nề không cần thiết (past-perfect fatigue).' },
        { text: 'has convened', correct: false, rationale: 'Hiện tại hoàn thành sai mốc thời gian lịch sử.' },
      ],
      acceptedAnswers: [{ text: 'convened', rationale: 'Chuyển về Past Simple sau khi điểm tham chiếu đã được thiết lập.' }],
    },
    {
      id: 'grammar-v2-c2-tense-reference-discourse-07-q3',
      kind: 'choice',
      prompt: 'Hiện tượng "Double Access Reading" xuất hiện trong câu nào sau đây?',
      options: [
        { text: 'The ambassador announced that the borders are open.', correct: true, rationale: 'Double access reading: biên giới mở cửa tại thời điểm đại sứ tuyên bố và vẫn đang mở cửa tại thời điểm người nói thuật lại.' },
        { text: 'The ambassador announced that the borders had been breached.', correct: false, rationale: 'Đây là sự kiện đã kết thúc hoàn toàn trước thời điểm thông báo.' },
        { text: 'The ambassador will announce that the borders will close.', correct: false, rationale: 'Đây là dự báo tương lai thuần túy.' },
      ],
      acceptedAnswers: [{ text: 'The ambassador announced that the borders are open.', rationale: 'Double access: mệnh đề có giá trị đúng tại cả hai thời điểm.' }],
    },
    {
      id: 'grammar-v2-c2-tense-reference-discourse-07-q4',
      kind: 'choice',
      prompt: 'Theo mô hình Hans Reichenbach, thì Quá khứ Hoàn thành (Past Perfect) được định nghĩa bởi mối quan hệ nào giữa Speech Time (S), Event Time (E), và Reference Time (R)?',
      options: [
        { text: 'E diễn ra trước R, và R diễn ra trước S (E < R < S)', correct: true, rationale: 'Past Perfect đặt sự kiện (E) trước mốc quy chiếu quá khứ (R), và mốc R nằm trước thời điểm phát ngôn (S).' },
        { text: 'E và R diễn ra đồng thời tại thời điểm S (E = R = S)', correct: false, rationale: 'Đây là định nghĩa của Hiện tại Đơn.' },
        { text: 'S diễn ra trước E, và E diễn ra trước R (S < E < R)', correct: false, rationale: 'Đây là cấu trúc của Tương lai Hoàn thành nhìn từ góc độ khác.' },
      ],
      acceptedAnswers: [{ text: 'E diễn ra trước R, và R diễn ra trước S (E < R < S)', rationale: 'Cấu trúc tọa độ Reichenbach của Past Perfect: E < R < S.' }],
    },
    {
      id: 'grammar-v2-c2-tense-reference-discourse-07-q5',
      kind: 'gap',
      prompt: 'Điền động từ ở thì thích hợp để duy trì tính vĩnh cửu của học thuyết vật lý: "Newton demonstrated that gravitational attraction ___ inversely with the square of the distance."',
      options: [],
      acceptedAnswers: [
        { text: 'varies', rationale: 'Quy luật vật lý vĩnh cửu giữ nguyên ở hiện tại đơn (varies).' },
        { text: 'decreases', rationale: 'Decreases diễn tả định luật hấp dẫn suy giảm theo bình phương khoảng cách.' },
      ],
    },
    {
      id: 'grammar-v2-c2-tense-reference-discourse-07-q6',
      kind: 'gap',
      prompt: 'Điền động từ quá khứ đơn để tiếp nối chuỗi hành động sau câu mở đầu dùng past perfect: "The spy had infiltrated the ministry under an assumed name. Within weeks, he ___ access to classified communications."',
      options: [],
      acceptedAnswers: [
        { text: 'gained', rationale: 'Gained đưa mạch truyện tự nhiên về quá khứ đơn.' },
        { text: 'secured', rationale: 'Secured mang nghĩa bảo đảm quyền tiếp cận an toàn.' },
        { text: 'obtained', rationale: 'Obtained diễn tả việc thu được quyền truy cập.' },
      ],
    },
    {
      id: 'grammar-v2-c2-tense-reference-discourse-07-q7',
      kind: 'gap',
      prompt: 'Điền từ nối thời gian cổ điển chỉ giới hạn sự kiện lùi trước mốc quy chiếu: "The archivist confirmed that ___, no surviving manuscript had ever referenced the lost chronicle."',
      options: [],
      acceptedAnswers: [
        { text: 'hitherto', rationale: 'Hitherto chỉ thời điểm trước đó trong diễn ngôn trang trọng.' },
        { text: 'heretofore', rationale: 'Heretofore mang nghĩa tương đương trong văn bản cổ điển và pháp lý.' },
      ],
    },
    {
      id: 'grammar-v2-c2-tense-reference-discourse-07-q8',
      kind: 'gap',
      prompt: 'Điền động từ thì hiện tại đơn phản ánh hiệu lực hợp đồng vẫn đang tiếp diễn: "The general counsel clarified yesterday that the indemnity covenant still ___ all senior partners."',
      options: [],
      acceptedAnswers: [
        { text: 'binds', rationale: 'Binds giữ nguyên hiện tại đơn vì điều khoản cam kết vẫn tiếp tục ràng buộc pháp lý.' },
        { text: 'covers', rationale: 'Covers diễn đạt phạm vi bảo hiểm/bồi thường vẫn đang có hiệu lực.' },
        { text: 'protects', rationale: 'Protects thể hiện sự bảo vệ pháp lý đang hiện hữu.' },
      ],
    },
    {
      id: 'grammar-v2-c2-tense-reference-discourse-07-q9',
      kind: 'transform',
      prompt: 'Sửa câu bị lùi thì máy móc làm mất giá trị hiệu lực hiện hành của án lệ: "The magistrate stated that Section 5 was unconstitutional." -> "The magistrate stated that Section 5 ___ unconstitutional."',
      options: [],
      acceptedAnswers: [
        { text: 'is', rationale: 'Giữ nguyên "is" để khẳng định phán quyết vô hiệu hóa điều luật vẫn đang có giá trị tối thượng.' },
      ],
    },
    {
      id: 'grammar-v2-c2-tense-reference-discourse-07-q10',
      kind: 'transform',
      prompt: 'Khắc phục hiện tượng lạm dụng had liên tiếp bằng cách chuyển động từ thứ hai về thì Quá khứ Đơn tự nhiên: "The army had captured the citadel, had garrisoned the ramparts, and had waited for reinforcements." -> "The army had captured the citadel, then ___ the ramparts and waited for reinforcements."',
      options: [],
      acceptedAnswers: [
        { text: 'garrisoned', rationale: 'Garrisoned ở thì quá khứ đơn giải tỏa sự lặp lại nặng nề của had.' },
      ],
    },
    {
      id: 'grammar-v2-c2-tense-reference-discourse-07-q11',
      kind: 'correction',
      prompt: 'Sửa lỗi lùi thì sai làm biến tướng chân lý y học hiện đại trong bài báo cáo: "Louis Pasteur proved that microscopic pathogens caused infectious ailments."',
      options: [],
      acceptedAnswers: [
        { text: 'cause infectious ailments', rationale: 'Chân lý khoa học phải dùng hiện tại đơn (cause) chứ không lùi thì.' },
        { text: 'Louis Pasteur proved that microscopic pathogens cause infectious ailments.', rationale: 'Câu hoàn chỉnh giữ nguyên hiện tại đơn.' },
        { text: 'cause', rationale: 'Chân lý khoa học dùng hiện tại đơn (cause).' },
      ],
    },
    {
      id: 'grammar-v2-c2-tense-reference-discourse-07-q12',
      kind: 'correction',
      prompt: 'Sửa lỗi phối hợp thì lộn xộn trong bản tường trình bảo hiểm: "The driver reported that the road had been icy and asserts that the vehicle was skidding without warning."',
      options: [],
      acceptedAnswers: [
        { text: 'asserted that the vehicle skidded', rationale: 'Đồng bộ động từ tường thuật về quá khứ đơn (asserted) và biến cố cụ thể sang skidded.' },
        { text: 'asserted that the vehicle had skidded', rationale: 'Dùng asserted và had skidded để thể hiện sự kiện diễn ra trước báo cáo.' },
      ],
    },
  ],
  reviewExercises: [
    {
      id: 'grammar-v2-c2-tense-reference-discourse-07-r1',
      kind: 'choice',
      prompt: 'Tại sao các giáo sư luật học luôn viết: "In Brown v. Board of Education, the Supreme Court struck down segregation because separate educational facilities ___ inherently unequal"?',
      options: [
        { text: 'are (vì đây là tuyên bố về một nguyên lý công lý bất di bất dịch, không bao giờ được lùi về quá khứ)', correct: true, rationale: 'Non-backshifting là nguyên tắc cốt tử để khẳng định sự bình đẳng giáo dục là chân lý hiến định vĩnh cửu.' },
        { text: 'were (để phản ánh biến cố chỉ đúng vào năm 1954)', correct: false, rationale: 'Dùng were sẽ làm suy yếu tính phổ quát và giá trị pháp lý đương đại của phán quyết.' },
        { text: 'had been (để chỉ tình trạng trước năm 1954)', correct: false, rationale: 'Sai hoàn toàn về cấu trúc và dụng ý tư pháp.' },
      ],
      acceptedAnswers: [{ text: 'are (vì đây là tuyên bố về một nguyên lý công lý bất di bất dịch, không bao giờ được lùi về quá khứ)', rationale: 'Bảo tồn chân lý hiến pháp bằng non-backshifting.' }],
    },
    {
      id: 'grammar-v2-c2-tense-reference-discourse-07-r2',
      kind: 'gap',
      prompt: 'Điền dạng động từ phù hợp phản ánh định luật sinh thái đang tồn tại: "Darwin demonstrated that evolutionary adaptations ___ species to dynamic ecological niches."',
      options: [],
      acceptedAnswers: [
        { text: 'attune', rationale: 'Attune ở hiện tại đơn khẳng định quy luật tiến hóa muôn đời.' },
        { text: 'adapt', rationale: 'Adapt phản ánh cơ chế thích nghi vĩnh cửu.' },
      ],
    },
    {
      id: 'grammar-v2-c2-tense-reference-discourse-07-r3',
      kind: 'transform',
      prompt: 'Chuyển đổi câu sau sang cấu trúc phối hợp thì chuẩn C2, giữ nguyên hiệu lực của điều khoản thỏa ước: "The mediator confirmed that Article 9 bound both parties until 2030." -> "The mediator confirmed that Article 9 ___ both parties until 2030."',
      options: [],
      acceptedAnswers: [
        { text: 'binds', rationale: 'Binds giữ thì hiện tại đơn vì điều khoản vẫn đang ràng buộc các bên.' },
      ],
    },
    {
      id: 'grammar-v2-c2-tense-reference-discourse-07-r4',
      kind: 'correction',
      prompt: 'Sửa lỗi lặp thì quá khứ hoàn thành trong đoạn hồi ký: "We had disembarked at dawn, had trekked ten miles through dense jungle, and had reached the forward outpost."',
      options: [],
      acceptedAnswers: [
        { text: 'had disembarked at dawn, trekked ten miles through dense jungle, and reached the forward outpost', rationale: 'Chỉ giữ had cho hành động đầu tiên, chuyển các động từ kế tiếp về quá khứ đơn.' },
        { text: 'We had disembarked at dawn, trekked ten miles through dense jungle, and reached the forward outpost.', rationale: 'Câu hoàn chỉnh giải phóng sự lặp lại của had.' },
      ],
    },
  ],
  outputPrompts: [
    {
      id: 'grammar-v2-c2-tense-reference-discourse-07-o1',
      prompt: 'Viết một đoạn văn 3-4 câu trong một bài bình luận án luật học so sánh (comparative law jurisprudence). Sử dụng kỹ thuật quy chiếu thời gian diễn ngôn: (1) một câu mở đầu nêu bối cảnh lịch sử của vụ kiện dùng thì Quá khứ Đơn/Hoàn thành, và (2) hai câu phân tích phán quyết tư pháp có vận dụng nguyên tắc không lùi thì (non-backshifting) để bảo toàn giá trị pháp lý đương đại của một quyền hiến định.',
      modelAnswer: 'The litigation originated in 1998 after municipal authorities had confiscated private printing presses without prior judicial warrants. In its landmark ruling, the Constitutional Court established that the doctrine of substantive due process shields expressive liberties from arbitrary executive confiscation. The bench underscored that statutory ambiguity never confers unfettered administrative discretion upon local magistrates.',
      checks: [
        'Sử dụng quá khứ/quá khứ hoàn thành để định vị bối cảnh tranh chấp lịch sử (originated, had confiscated).',
        'Vận dụng chính xác non-backshifting (shields, never confers) cho các nguyên lý hiến pháp vĩnh cửu.',
        'Đạt độ chuẩn xác tuyệt đối về thuật ngữ pháp lý và mạch lạc diễn ngôn.',
      ],
    },
    {
      id: 'grammar-v2-c2-tense-reference-discourse-07-o2',
      prompt: 'Viết một đoạn văn tự sự lịch sử ngắn (3 câu) tái hiện sự sụp đổ của một pháo đài. Câu 1 dùng Past Perfect để thiết lập một mốc thời gian hồi cố xa hơn (anchor event); hai câu sau chuyển nhịp mượt mà về Past Simple để tiếp nối chuỗi hành động mà không lặp lại trợ động từ had.',
      modelAnswer: 'The besieged garrison had withstood relentless artillery bombardment for over forty days, their rations dwindled to desperate crumbs. At dusk, the commander finally lowered the tattered standards from the parapet and surrendered the citadel to the advancing vanguard. Silence fell over the smoking ramparts as the remaining defenders marched into captivity.',
      checks: [
        'Sử dụng Past Perfect (had withstood) để neo điểm quy chiếu thời gian ban đầu.',
        'Chuyển tiếp tự nhiên sang Past Simple (lowered, surrendered, fell, marched) cho chuỗi hành động kế tiếp.',
        'Không phạm lỗi lạm dụng quá khứ hoàn thành cơ học (past-perfect fatigue).',
      ],
    },
  ],
  sources: [
    {
      id: 'reichenbach-elements-symbolic-logic',
      title: 'Elements of Symbolic Logic: The Analysis of Conversational Language (Hans Reichenbach)',
      url: 'https://openlibrary.org/books/OL5974052M/Elements_of_symbolic_logic',
      claims: ['Thiết lập mô hình tọa độ thời gian ba điểm: Speech Time (S), Event Time (E), và Reference Time (R).'],
      checkedAt: '2026-10-05',
      provenance: 'reference-only',
    },
    {
      id: 'cambridge-grammar-discourse-tense',
      title: 'The Cambridge Grammar of the English Language: Tense, Aspect and Indirect Speech',
      url: 'https://www.cambridge.org/core/books/cambridge-grammar-of-the-english-language/AFD6DE78E568F873DE6EE0C1A7416353',
      claims: ['Phân tích cơ chế temporal anaphora, điều kiện ngoại lệ không lùi thì (non-backshifting) và hiện tượng double access reading.'],
      checkedAt: '2026-10-05',
      provenance: 'reference-only',
    },
  ],
  review: {
    status: 'approved',
    mode: 'ai-internal',
    reviewer: 'ai-internal-reviewer',
    reviewedAt: '2026-10-06T00:00:00.000Z',
    summary: 'Thorough C2 editorial review completed: verified Reichenbach framework, temporal anaphora, non-backshifting, 16 exercises, outputs, and canonical sources.',
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

export default lesson;
