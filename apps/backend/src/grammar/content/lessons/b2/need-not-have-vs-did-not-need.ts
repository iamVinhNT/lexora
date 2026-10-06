/**
 * @file need-not-have-vs-did-not-need.ts
 * @description Lesson: Phân biệt Need not have done và Did not need to do.
 */
import type { GrammarLesson } from '../../types.js';

const lesson: GrammarLesson = {
  id: 'grammar-v2-b2-need-not-have-vs-did-not-need-14',
  revisionId: 'grammar-v2-b2-need-not-have-vs-did-not-need-14@1.0.0',
  revision: '1.0.0',
  title: 'Phân biệt Need not have done và Did not need to do',
  objective: 'Phân biệt "need not have + V3" (hành động đã thực hiện nhưng không cần thiết) với "did not need to + V-bare" (không có nhu cầu; câu này tự nó không cho biết hành động có được thực hiện hay không, dù thường hàm ý không làm).',
  prerequisiteIds: ['grammar-v2-b2-modal-possibility-degree-13'],
  coverage: ['need-not-have-done', 'did-not-need-to-do', 'past-necessity', 'unnecessary-actions', 'b2-grammar'],
  context: {
    english: 'Reviewing the clinical laboratory invoices, the hospital administrator observed: "The surgical team needn\'t have reordered forty vials of anesthetic since the central pharmacy had already dispatched a consignment, whereas the pediatric ward didn\'t need to procure any extra equipment because their inventory was already full."',
    vietnamese: 'Rà soát các hóa đơn phòng xét nghiệm lâm sàng, người quản lý bệnh viện nhận xét: "Kíp phẫu thuật lẽ ra không cần đặt thêm bốn mươi lọ thuốc mê làm gì vì hiệu thuốc trung tâm đã gửi một lô hàng tới rồi (thực tế họ ĐÃ ĐẶT), trong khi khoa nhi không cần mua thêm thiết bị nào vì kho của họ vốn đã đầy đủ (thực tế họ KHÔNG MUA)."',
  },
  guide: {
    pattern: 'S + need not (needn\'t) have + V3/ed (action done, but unnecessary) vs S + did not (didn\'t) need to + V-bare (unnecessary, action not done)',
    whenToUse: [
      'Dùng "need not have + V3" khi một hành động ĐÃ ĐƯỢC THỰC HIỆN trong quá khứ, nhưng sau đó mới vỡ lẽ ra là không cần thiết (tốn công vô ích).',
      'Dùng "did not need to + V-bare" để nói hành động không cần thiết; riêng cấu trúc này không khẳng định hành động có được thực hiện hay không, dù ngữ cảnh thường cho biết người nói đã không làm.',
      'Sử dụng trong đánh giá hiệu quả công việc, chi tiêu tài chính, kiểm soát nguồn lực dự án.',
    ],
    signalWords: ['needn\'t have bought', 'didn\'t need to go', 'wasted effort', 'in advance', 'realized later'],
    check: [
      'Hành động đó trên thực tế CÓ DIỄN RA hay KHÔNG?',
      'Nếu hành động ĐÃ LÀM rồi mới biết thừa thãi -> Bắt buộc dùng "need not have + V3".',
      'Nếu biết trước không cần, dùng "did not need to + V-bare"; cần thêm ngữ cảnh để xác định hành động có thực sự diễn ra không.',
    ],
  },
  explanation: 'Sự khác biệt giữa "Need not have done" và "Did not need to do" là một trong những điểm ngữ pháp phân loại học viên B2 điển hình nhất trong các kỳ thi quốc tế (IELTS, Cambridge B2 First/C1 Advanced):\n1. NEED NOT HAVE + V3 (Lẽ ra không cần làm... nhưng ĐÃ LÀM):\n   - Bản chất: Người nói đã thực hiện hành động đó trong quá khứ. Sau khi làm xong, người ta mới phát hiện ra hành động đó là thừa thãi, không có ích lợi gì (lãng phí thời gian, công sức hoặc tiền bạc).\n   - Ví dụ: "You needn\'t have printed all seventy pages; the committee is reviewing everything digitally on tablets." (Thực tế: bạn ĐÃ IN toàn bộ 70 trang).\n2. DID NOT NEED TO + V-BARE (Không cần phải làm... và ĐÃ KHÔNG LÀM):\n   - Bản chất: Người nói đã biết trước rằng hành động đó là không cần thiết, vì vậy họ ĐÃ KHÔNG THỰC HIỆN nó (hoặc hành động đó không xảy ra).\n   - Ví dụ: "Because today was a national bank holiday, I didn\'t need to set my morning alarm clock." (Thực tế: tôi biết được nghỉ nên ĐÃ KHÔNG ĐẶT báo thức).\n3. Lưu ý về dạng đồng nghĩa: "didn\'t need to do" tương đương về mặt ý nghĩa với "didn\'t have to do".',
  examples: [
    {
      english: 'We needn\'t have rushed to the departure terminal; the flight was delayed by four hours anyway.',
      vietnamese: 'Chúng tôi lẽ ra không cần phải vội vã chạy thục mạng tới nhà ga khởi hành làm gì; đằng nào thì chuyến bay cũng bị hoãn bốn tiếng (thực tế: chúng tôi ĐÃ VỘI VÃ).',
    },
    {
      english: 'As the hotel provided complimentary toiletries and bathrobes, we didn\'t need to pack our own.',
      vietnamese: 'Vì khách sạn đã cung cấp sẵn đồ vệ sinh cá nhân và áo choàng miễn phí, chúng tôi đã không cần phải mang theo đồ của mình (thực tế: chúng tôi KHÔNG MANG theo).',
    },
    {
      english: 'The author needn\'t have rewritten the entire preface; the publisher only asked for minor stylistic revisions.',
      vietnamese: 'Tác giả lẽ ra không cần phải viết lại toàn bộ lời nói đầu làm gì; nhà xuất bản chỉ yêu cầu chỉnh sửa văn phong nhỏ (thực tế: tác giả ĐÃ VIẾT LẠI cả bài).',
    },
    {
      english: 'Because the municipal library offers free digital scanning, the graduate student didn\'t need to purchase the rare volume.',
      vietnamese: 'Vì thư viện thành phố cung cấp dịch vụ quét kỹ thuật số miễn phí, học viên cao học đã không cần phải mua cuốn sách hiếm đó (thực tế: học viên ĐÃ KHÔNG MUA).',
    },
    {
      english: 'You needn\'t have cooked such a lavish four-course dinner; the guests informed us they had already dined in town.',
      vietnamese: 'Bạn lẽ ra không cần phải nấu bữa tối bốn món thịnh soạn như vậy làm gì; khách đã báo là họ ăn tối trong phố rồi (thực tế: bạn ĐÃ NẤU xong xuôi).',
    },
    {
      english: 'She didn\'t need to take an entrance examination because her previous research qualifications granted direct admission.',
      vietnamese: 'Cô ấy đã không cần phải làm bài thi đầu vào vì bằng cấp nghiên cứu trước đây giúp cô được tuyển thẳng (thực tế: cô ấy KHÔNG PHẢI THI).',
    },
  ],
  contrasts: [
    {
      form: 'You needn\'t have brought wine vs You didn\'t need to bring wine',
      whyFits: '"You needn\'t have brought wine" cảm ơn khách vì đã mang rượu đến nhưng cho biết trong nhà đã có sẵn rất nhiều chai mở dở (khách ĐÃ MANG tới).',
      whyNot: '"You didn\'t need to bring wine" khẳng định chủ nhà đã thông báo từ trước rằng không cần mang và khách ĐÃ KHÔNG MANG theo.',
    },
    {
      form: 'needn\'t have done vs shouldn\'t have done',
      whyFits: '"You needn\'t have ironed my socks" chỉ sự thừa thãi, tốn công vô ích vô hại.',
      whyNot: '"You shouldn\'t have ironed my silk tie with high heat" là lời phê bình, trách móc vì đã làm hư hỏng đồ vật (hành động sai trái/tiêu cực).',
    },
  ],
  commonMistakes: [
    'Dùng didn\'t need to khi hành động đã diễn ra trong thực tế: viết "I didn\'t need to buy bread, but I did" thay vì "I needn\'t have bought bread".',
    'Dùng to-infinitive sau needn\'t have: viết "You needn\'t have to pay" thay vì "You needn\'t have paid".',
    'Nhầm lẫn giữa không cần thiết (needn\'t have) và cấm đoán/sai trái (shouldn\'t have).',
  ],
  summary: '"Need not have done" thường nói hành động đã làm nhưng hóa ra không cần thiết. "Did not need to do" nói không có nhu cầu; bản thân cấu trúc không cho biết hành động có được thực hiện hay không, thường thì ngữ cảnh làm rõ.',
  exercises: [
    {
      id: 'grammar-v2-b2-need-not-have-vs-did-not-need-14-q1',
      kind: 'choice',
      prompt: 'I brought a heavy winter parka on the business trip, but the temperature never dropped below twenty degrees. I ___ it.',
      options: [
        { text: 'needn\'t have brought', correct: true, rationale: 'Người nói ĐÃ MANG áo khoác dày đi (I brought...), sau đó mới thấy không cần thiết nên dùng needn\'t have brought.' },
        { text: 'didn\'t need to bring', correct: false, rationale: 'didn\'t need to bring ngụ ý người nói đã không mang áo đi.' },
        { text: 'mustn\'t have brought', correct: false, rationale: 'mustn\'t have không tồn tại trong cấu trúc ngữ pháp này.' },
      ],
      acceptedAnswers: [{ text: 'needn\'t have brought', rationale: 'needn\'t have brought diễn tả hành động đã làm nhưng vô ích.' }],
    },
    {
      id: 'grammar-v2-b2-need-not-have-vs-did-not-need-14-q2',
      kind: 'choice',
      prompt: 'The conference organizers provided free shuttle buses from the airport to the venue, so the delegates ___ taxis.',
      options: [
        { text: 'didn\'t need to hire', correct: true, rationale: 'Vì đã có xe buýt đưa đón miễn phí nên các đại biểu không cần phải thuê taxi và họ đã không thuê (didn\'t need to hire).' },
        { text: 'needn\'t have hired', correct: false, rationale: 'needn\'t have hired hàm ý các đại biểu đã thuê taxi rồi sau đó mới biết có xe buýt miễn phí, không khớp với ngữ cảnh thông báo phương tiện có sẵn.' },
        { text: 'mustn\'t hire', correct: false, rationale: 'mustn\'t hire mang nghĩa cấm đoán ở hiện tại.' },
      ],
      acceptedAnswers: [{ text: 'didn\'t need to hire', rationale: 'didn\'t need to hire chỉ hành động không cần thiết và đã không làm.' }],
    },
    {
      id: 'grammar-v2-b2-need-not-have-vs-did-not-need-14-q3',
      kind: 'choice',
      prompt: '"Why did you spend all morning photocopying those seventy booklets? The client already downloaded the PDFs yesterday!" Which response fits best?',
      options: [
        { text: 'Oh no, I needn\'t have printed them!', correct: true, rationale: 'Người nói đã lãng phí cả buổi sáng in tài liệu (đã làm) nên thốt lên "I needn\'t have printed them!".' },
        { text: 'Oh no, I didn\'t need to print them!', correct: false, rationale: 'didn\'t need to print thường ngụ ý đã không in.' },
        { text: 'Oh no, I shouldn\'t print them!', correct: false, rationale: 'Sai thì vì sự việc xảy ra ở quá khứ.' },
      ],
      acceptedAnswers: [{ text: 'Oh no, I needn\'t have printed them!', rationale: 'needn\'t have printed thể hiện sự tiếc nuối vì đã làm công việc thừa thãi.' }],
    },
    {
      id: 'grammar-v2-b2-need-not-have-vs-did-not-need-14-q4',
      kind: 'choice',
      prompt: 'Select the statement where the speaker knew beforehand that the action was unnecessary and consequently did NOT do it:',
      options: [
        { text: 'Because Friday was declared a regional holiday, the employees didn\'t need to report to the manufacturing facility.', correct: true, rationale: 'Biết trước là ngày nghỉ nên nhân viên không cần đến và đã không đến làm việc.' },
        { text: 'The employees needn\'t have reported to the facility, but they all showed up at 7 AM.', correct: false, rationale: 'Câu này hành động đã diễn ra (họ đã đến).' },
        { text: 'The employees shouldn\'t have reported to work without their hard hats.', correct: false, rationale: 'Câu này là lời chỉ trích vi phạm an toàn.' },
      ],
      acceptedAnswers: [{ text: 'Because Friday was declared a regional holiday, the employees didn\'t need to report to the manufacturing facility.', rationale: 'didn\'t need to report chỉ việc không cần thiết và không thực hiện.' }],
    },
    {
      id: 'grammar-v2-b2-need-not-have-vs-did-not-need-14-q5',
      kind: 'gap',
      prompt: 'We ___ (need / worry) so much about the presentation; the client approved every single design without objections.',
      options: [],
      acceptedAnswers: [
        { text: "needn't have worried", rationale: 'needn\'t have worried diễn tả việc chúng tôi đã lo lắng thái quá trong khi thực tế không cần thiết.' },
        { text: 'need not have worried', rationale: 'Dạng đầy đủ của needn\'t have worried.' },
      ],
    },
    {
      id: 'grammar-v2-b2-need-not-have-vs-did-not-need-14-q6',
      kind: 'gap',
      prompt: 'Because my uncle offered to drive me directly to the train station, I ___ (not need / walk) in the freezing rain.',
      options: [],
      acceptedAnswers: [
        { text: "didn't need to walk", rationale: 'didn\'t need to walk chỉ việc không cần đi bộ và tôi đã không phải đi bộ dưới mưa.' },
        { text: 'did not need to walk', rationale: 'Dạng đầy đủ của didn\'t need to walk.' },
      ],
    },
    {
      id: 'grammar-v2-b2-need-not-have-vs-did-not-need-14-q7',
      kind: 'gap',
      prompt: 'You ___ (need / buy) more milk on your way home; there were three full cartons in the refrigerator.',
      options: [],
      acceptedAnswers: [
        { text: "needn't have bought", rationale: 'needn\'t have bought diễn tả việc đối phương đã mua sữa về nhưng thực tế tủ lạnh vẫn còn.' },
        { text: 'need not have bought', rationale: 'Dạng đầy đủ của needn\'t have bought.' },
      ],
    },
    {
      id: 'grammar-v2-b2-need-not-have-vs-did-not-need-14-q8',
      kind: 'gap',
      prompt: 'Since our museum entry was fully sponsored by the academic society, we ___ (not need / pay) any admission fee.',
      options: [],
      acceptedAnswers: [
        { text: "didn't need to pay", rationale: 'didn\'t need to pay chỉ việc được tài trợ nên không phải trả tiền và đã không trả tiền.' },
        { text: 'did not need to pay', rationale: 'Dạng đầy đủ của didn\'t need to pay.' },
      ],
    },
    {
      id: 'grammar-v2-b2-need-not-have-vs-did-not-need-14-q9',
      kind: 'transform',
      prompt: 'I spent two hours translating the legal memo, but the solicitor told me later that an official translation already existed. -> I ___ the legal memo.',
      options: [],
      acceptedAnswers: [
        { text: "needn't have translated", rationale: 'Dùng needn\'t have translated vì hành động dịch đã diễn ra nhưng vô ích.' },
        { text: 'need not have translated', rationale: 'Dạng đầy đủ của needn\'t have translated.' },
      ],
    },
    {
      id: 'grammar-v2-b2-need-not-have-vs-did-not-need-14-q10',
      kind: 'transform',
      prompt: 'It was unnecessary for her to attend the afternoon briefing, so she stayed home and rested. -> She ___ the afternoon briefing, so she stayed home and rested.',
      options: [],
      acceptedAnswers: [
        { text: "didn't need to attend", rationale: 'Dùng didn\'t need to attend vì không cần và cô ấy đã không tham dự.' },
        { text: 'did not need to attend', rationale: 'Dạng đầy đủ của didn\'t need to attend.' },
      ],
    },
    {
      id: 'grammar-v2-b2-need-not-have-vs-did-not-need-14-q11',
      kind: 'correction',
      prompt: 'Sửa lỗi dùng to-infinitive sau needn\'t have: "You needn\'t have to stay up all night preparing slides that were cancelled."',
      options: [],
      acceptedAnswers: [
        { text: 'You needn\'t have stayed up all night preparing slides that were cancelled.', rationale: 'Sau needn\'t have động từ phải ở dạng quá khứ phân từ V3 (stayed), không dùng "to stay".' },
      ],
    },
    {
      id: 'grammar-v2-b2-need-not-have-vs-did-not-need-14-q12',
      kind: 'correction',
      prompt: 'Sửa lỗi chọn cấu trúc khi hành động đã thực tế diễn ra: "I didn\'t need to purchase the textbook because the professor handed out free digital copies after class, but I had already bought it."',
      options: [],
      acceptedAnswers: [
        { text: 'I needn\'t have purchased the textbook because the professor handed out free digital copies after class.', rationale: 'Vì người nói đã mua sách rồi (hành động đã làm xong) mới biết được phát miễn phí, nên phải dùng "needn\'t have purchased".' },
      ],
    },
  ],
  reviewExercises: [
    {
      id: 'grammar-v2-b2-need-not-have-vs-did-not-need-14-r1',
      kind: 'choice',
      prompt: 'Emma woke up early at 5 AM on Saturday, only to remember that her shift was cancelled. She ___ at dawn.',
      options: [
        { text: 'needn\'t have gotten up', correct: true, rationale: 'Emma đã thức dậy lúc 5 giờ sáng rồi mới nhớ ra ca trực bị hủy nên dùng needn\'t have gotten up (hoặc risen).' },
        { text: 'didn\'t need to get up', correct: false, rationale: 'didn\'t need to get up ngụ ý cô ấy biết trước và đã ngủ nướng tiếp.' },
        { text: 'mustn\'t have gotten up', correct: false, rationale: 'Sai cấu trúc và sai nghĩa.' },
      ],
      acceptedAnswers: [{ text: 'needn\'t have gotten up', rationale: 'needn\'t have gotten up chỉ việc đã dậy sớm một cách uổng công.' }],
    },
    {
      id: 'grammar-v2-b2-need-not-have-vs-did-not-need-14-r2',
      kind: 'gap',
      prompt: 'Because the seminar room had a high-definition projector installed, the lecturer ___ (not need / bring) her own monitor.',
      options: [],
      acceptedAnswers: [
        { text: "didn't need to bring", rationale: 'didn\'t need to bring chỉ việc không cần mang và giảng viên đã không mang màn hình đi.' },
        { text: 'did not need to bring', rationale: 'Dạng đầy đủ của didn\'t need to bring.' },
      ],
    },
    {
      id: 'grammar-v2-b2-need-not-have-vs-did-not-need-14-r3',
      kind: 'transform',
      prompt: 'Mark brought four spare tires on the journey, but none of his vehicle tires punctured. -> Mark ___ four spare tires on the journey.',
      options: [],
      acceptedAnswers: [
        { text: "needn't have brought", rationale: 'Dùng needn\'t have brought vì Mark đã mang 4 lốp xe dự phòng đi một cách thừa thãi.' },
        { text: 'need not have brought', rationale: 'Dạng đầy đủ của needn\'t have brought.' },
      ],
    },
    {
      id: 'grammar-v2-b2-need-not-have-vs-did-not-need-14-r4',
      kind: 'correction',
      prompt: 'Sửa lỗi cấu trúc: "We didn\'t needed to renew the commercial lease because the landlord offered an automatic extension."',
      options: [],
      acceptedAnswers: [
        { text: 'We didn\'t need to renew the commercial lease because the landlord offered an automatic extension.', rationale: 'Sau trợ động từ "didn\'t", động từ need phải ở dạng nguyên mẫu không chia: didn\'t need to renew.' },
      ],
    },
  ],
  outputPrompts: [
    {
      id: 'grammar-v2-b2-need-not-have-vs-did-not-need-14-o1',
      prompt: 'Viết 1 câu tiếng Anh sử dụng cấu trúc "needn\'t have + V3" diễn tả một sự việc bạn hoặc đồng nghiệp đã chuẩn bị rất kỹ lưỡng nhưng sau đó hóa ra lại không cần dùng đến.',
      modelAnswer: 'We needn\'t have printed one hundred physical handouts because all conference attendees accessed the digital portal via QR codes.',
      checks: [
        'Sử dụng cấu trúc needn\'t have + V3',
        'Nội dung thể hiện rõ hành động đã làm trong thực tế nhưng hóa ra thừa thãi',
        'Ngữ pháp và văn phong tự nhiên, chính xác',
      ],
    },
    {
      id: 'grammar-v2-b2-need-not-have-vs-did-not-need-14-o2',
      prompt: 'Viết 1 câu tiếng Anh sử dụng cấu trúc "didn\'t need to + V-bare" giải thích một nghĩa vụ mà bạn đã không phải thực hiện vì có sự hỗ trợ hoặc hoàn cảnh thuận lợi.',
      modelAnswer: 'Because my teammate handled the client inquiries yesterday and I left at five, I did not need to work overtime at the office.',
      checks: [
        'Sử dụng cấu trúc didn\'t need to + V-bare',
        'Nêu rõ lý do hoặc điều kiện dẫn đến việc không cần và không làm',
        'Không nhầm lẫn với needn\'t have + V3',
      ],
    },
  ],
  sources: [
    {
      id: 'cambridge-need-not-have',
      title: 'Cambridge Grammar: Need not have done vs didn\'t need to do',
      url: 'https://dictionary.cambridge.org/grammar/british-grammar/need',
      claims: ['Need not have done normally presents an action as performed unnecessarily; did not need to do says there was no necessity and often suggests non-performance, though context can leave performance open.'],
      checkedAt: '2026-10-05',
      provenance: 'reference-only',
    },
    {
      id: 'bc-past-necessity',
      title: 'British Council: Past obligation and necessity (needn\'t have / didn\'t need to)',
      url: 'https://learnenglish.britishcouncil.org/grammar/b1-b2-grammar/modals-past-necessity',
      claims: ['Contrasts performed but unnecessary actions (need not have) with lack of necessity (did not need to), whose context often indicates whether the action occurred.'],
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
