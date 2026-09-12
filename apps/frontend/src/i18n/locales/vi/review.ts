/**
 * @file review.ts
 * @description Bản dịch tiếng Việt cho ôn tập cách quãng và điều khiển đánh giá.
 */
export default {
  title: 'Ôn tập', subtitle: 'Gợi nhớ các từ đến hạn rồi đánh giá mức độ ghi nhớ.', loading: 'Đang tải hàng đợi ôn…', loadingAnnouncement: 'Đang tải hàng đợi ôn tập.', completeAnnouncement: 'Đã hoàn tất ôn tập. Hiện không có từ đến hạn.', dueToday: '{{formattedCount}} mục đến hạn hôm nay', recallMode: 'Ghi nhớ SM-2', recallReview: 'Ôn ghi nhớ', statusNew: 'MỚI', recallTheWord: 'Gợi nhớ từ', recallPrompt: 'Câu hỏi ghi nhớ', cloze: 'Điền vào chỗ trống', completeSentence: 'Hoàn thành câu bằng từ mục tiêu.', revealAnswer: 'Hiện đáp án', answer: 'Đáp án', rateRecall: 'Đánh giá ghi nhớ', chooseRating: 'Chọn mức độ bạn ghi nhớ từ này.', revealBeforeRating: 'Hãy hiện đáp án trước khi đánh giá.', ratingButton: '{{label}}, ôn lại sau {{interval}}', saved: 'Đã lưu {{rating}}. Ôn lại sau {{interval}}.', saved_other: 'Đã lưu {{rating}}. Ôn lại sau {{interval}}.',
  reviewComplete: 'Đã hoàn tất ôn tập', noDue: 'Hiện không có lượt ôn đến hạn.', returnOverview: 'Về tổng quan', learnNewWords: 'Học từ mới', retry: 'Thử lại', couldNotLoad: 'Không thể tải hàng đợi ôn tập.', couldNotSave: 'Không thể lưu lượt ôn.', saving: 'Đang lưu lượt ôn…',
  table: 'Hàng đợi ôn', intervalDay: '{{count}} ngày', intervalDay_other: '{{count}} ngày', intervalMonth: '{{count}} tháng', intervalMonth_other: '{{count}} tháng', intervalYear: '{{count}} năm', intervalYear_other: '{{count}} năm',
  rating: { AGAIN: 'Lặp lại', HARD: 'Khó', GOOD: 'Tốt', EASY: 'Dễ' }, states: { NEW: 'Mới', LEARNING: 'Đang học', FAMILIAR: 'Quen thuộc', MASTERED: 'Thành thạo', MAINTENANCE: 'Duy trì' },
} as const;
