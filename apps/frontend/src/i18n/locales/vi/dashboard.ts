/**
 * @file dashboard.ts
 * @description Bản dịch tiếng Việt cho tổng quan, chỉ số, trạng thái và thông báo tải dữ liệu.
 */
export default {
  title: 'Tổng quan', subtitle: 'Học qua ngữ cảnh. Ghi nhớ lâu dài.', learningPath: 'Lộ trình học', learningPathDescription: 'Lộ trình tập trung từ ngữ cảnh đến vốn từ chủ động.',
  today: 'Hôm nay', todayDescription: 'Hoạt động ôn tập hiện tại của bạn trên Lexora.', workspace: 'Không gian học', workspaceDescription: '{{count}} từ trong các trạng thái từ vựng.', workspaceDescription_other: '{{count}} từ trong các trạng thái từ vựng.',
  noLearningData: 'Chưa có dữ liệu học', noLearningDataDescription: 'Bắt đầu với một từ và xây dựng vốn từ chủ động qua ngữ cảnh, ghi nhớ và đặt câu.', addFirstWord: 'Thêm từ đầu tiên',
  reviewsToday: 'Lượt ôn hôm nay', wordsPracticedToday: 'Từ đã luyện hôm nay', overallAccuracy: 'Độ chính xác tổng thể', accuracyUnavailable: 'Chưa có độ chính xác', currentStreak: 'Chuỗi hiện tại',
  day: '{{count}} ngày', day_other: '{{count}} ngày', startReview: 'Bắt đầu ôn · {{count}} mục', learnNewWords: 'Học từ mới',
  states: { NEW: 'Mới', LEARNING: 'Đang học', FAMILIAR: 'Quen thuộc', MASTERED: 'Thành thạo', MAINTENANCE: 'Duy trì' },
  loading: 'Đang tải bảng tổng quan', retry: 'Thử lại bảng tổng quan', couldNotLoad: 'Không thể tải bảng tổng quan.', ready: 'Sẵn sàng bắt đầu phiên học.', activeLoaded: 'Đã tải phiên học đang hoạt động.',
  steps: { context: 'Ngữ cảnh', understand: 'Hiểu', recall: 'Ghi nhớ', output: 'Đặt câu', review: 'Ôn tập' },
} as const;
