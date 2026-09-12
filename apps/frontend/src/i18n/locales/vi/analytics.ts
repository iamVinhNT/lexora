/**
 * @file analytics.ts
 * @description Bản dịch tiếng Việt cho chỉ số, biểu đồ, bảng và insight ổn định của phân tích.
 */
export default {
  title: 'Thống kê', subtitle: 'Hiểu điều bạn ghi nhớ, nơi bạn tiến bộ và nội dung nên luyện tiếp theo.', trendRange: 'Khoảng xu hướng', days: '{{count}} ngày', days_other: '{{count}} ngày', keyMeasures: 'Chỉ số chính', vocabulary: 'Từ vựng', reviewsToday: 'Lượt ôn hôm nay', accuracy: 'Độ chính xác', currentStreak: 'Chuỗi hiện tại', accuracyUnavailable: 'Chưa có độ chính xác', unavailable: 'Không khả dụng', milliseconds: 'ms',
  dimensions: 'Các chiều kiến thức', dimensionsDescription: 'Điểm trung bình phản ánh các đánh giá từ vựng đã ghi nhận.', recognition: 'Nhận diện', recall: 'Ghi nhớ', production: 'Đặt câu', noData: 'Chưa có dữ liệu',
  states: 'Trạng thái từ vựng', statesDescription: 'Mỗi trạng thái có nhãn, số lượng và phần trăm rõ ràng.', showStateTable: 'Hiện bảng dữ liệu trạng thái', hideStateTable: 'Ẩn bảng dữ liệu trạng thái', count: 'Số lượng', new: 'Mới', learning: 'Đang học', familiar: 'Quen thuộc', mastered: 'Thành thạo', maintenance: 'Duy trì',
  retentionTrend: 'Xu hướng ghi nhớ', retentionDescription: 'Khối lượng ôn và độ chính xác hằng ngày từ máy chủ.', showRetentionTable: 'Hiện bảng dữ liệu ghi nhớ', hideRetentionTable: 'Ẩn bảng dữ liệu ghi nhớ', retentionSummary: '{{count}} ngày có ôn. Độ chính xác gần nhất {{accuracy}}. Lượt ôn gần nhất {{reviews}}. Trục khối lượng ôn độc lập, tối đa {{max}} lượt.', retentionSummary_other: '{{count}} ngày có ôn. Độ chính xác gần nhất {{accuracy}}. Lượt ôn gần nhất {{reviews}}. Trục khối lượng ôn độc lập, tối đa {{max}} lượt.', retentionMinimum: 'Xu hướng ghi nhớ cần ít nhất bốn ngày có ôn.', chartUnavailable: 'Không thể xem trước biểu đồ trong môi trường này. Dùng bảng để xem giá trị chính xác.', retentionTable: 'Dữ liệu xu hướng ghi nhớ', dailyRetention: 'Dữ liệu ghi nhớ hằng ngày', date: 'Ngày', reviews: 'Lượt ôn', correct: 'Đúng', averageResponse: 'Phản hồi TB', noReviews: 'Không có lượt ôn', noTimingData: 'Không có dữ liệu thời gian',
  stateTable: 'Dữ liệu trạng thái từ vựng', stateDistribution: 'Phân bố trạng thái từ vựng', stateLabels: 'Nhãn trạng thái từ vựng', percentage: 'Phần trăm', words: '{{count}} từ', words_other: '{{count}} từ', noStates: 'Chưa có trạng thái từ vựng để lập biểu đồ.',
  insights: 'Insight học tập', insightsDescription: 'Đề xuất được tính từ dữ liệu ôn tập và tiến độ của bạn.', noInsight: 'Chưa có insight. Hãy tiếp tục luyện tập để tạo thêm dữ liệu học.', retry: 'Thử lại {{query}}', failedToLoad: 'Không thể tải {{query}}.',
  insightTypes: { RECOMMENDATION: 'Đề xuất', WARNING: 'Cảnh báo', ACHIEVEMENT: 'Thành tựu', INFO: 'Thông tin' },
  insightFallback: { title: 'Thông tin học tập', message: 'Hãy tiếp tục luyện tập để xây dựng thêm dữ liệu học.', action: 'Xem chi tiết' },
  insight: {
    recommendOutputPractice: { title: 'Tập trung đặt câu', message: 'Khả năng nhận diện của bạn tốt nhưng khả năng đặt câu thấp hơn đáng kể. Hãy tập đặt câu để chuyển vốn từ thụ động thành kiến thức chủ động.', action: 'Luyện đặt câu' },
    reinforceWeakWords: { title: 'Củng cố từ vựng yếu', message: 'Bạn có {{count}} từ thường quên hoặc ghi nhớ chưa tốt.', message_other: 'Bạn có {{count}} từ thường quên hoặc ghi nhớ chưa tốt.', action: 'Ôn từ yếu' },
    pendingDueReviews: { title: 'Có lượt ôn đang chờ', message: 'Hôm nay có {{count}} lượt ôn sẵn sàng. Ôn cách quãng đều đặn giúp tăng khả năng ghi nhớ.', message_other: 'Hôm nay có {{count}} lượt ôn sẵn sàng. Ôn cách quãng đều đặn giúp tăng khả năng ghi nhớ.', action: 'Bắt đầu ôn' },
    streakAchievement: { title: 'Tiếp tục duy trì đà học!', message: 'Bạn đang có chuỗi học {{count}} ngày! Luyện tập đều đặn giúp tiếp thu ngôn ngữ nhanh hơn.' },
    exploreNewWords: { title: 'Sẵn sàng học từ mới', message: 'Thư viện có {{count}} từ mới đang chờ bạn học.', message_other: 'Thư viện có {{count}} từ mới đang chờ bạn học.', action: 'Học từ mới' },
    welcomeStart: { title: 'Bắt đầu hành trình từ vựng', message: 'Thêm từ hoặc nhập ngữ cảnh để bắt đầu phương pháp học nhận thức 5 bước.', action: 'Thêm từ' },
  },
  query: { vocabularyStatistics: 'thống kê từ vựng', dashboardStatistics: 'thống kê tổng quan', retentionTrend: 'xu hướng ghi nhớ', learningInsights: 'insight học tập' },
} as const;
