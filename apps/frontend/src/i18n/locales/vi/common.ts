/**
 * @file common.ts
 * @description Bản dịch tiếng Việt dùng chung cho điều khiển, trạng thái, lỗi và nhãn trợ năng của Lexora.
 */
export default {
  appName: 'Lexora',
  actions: {
    addWord: 'Thêm từ', addContext: 'Thêm ngữ cảnh', save: 'Lưu', saveWord: 'Lưu từ', saveContext: 'Lưu ngữ cảnh',
    cancel: 'Hủy', retry: 'Thử lại', previous: 'Trước', next: 'Sau', editWord: 'Sửa từ', editContext: 'Sửa ngữ cảnh',
    deleteWord: 'Xóa từ', deleteContext: 'Xóa ngữ cảnh', confirmDelete: 'Xác nhận xóa', confirmDeletion: 'Xác nhận xóa', confirm: 'Xác nhận',
    completeSession: 'Hoàn tất phiên', startSession: 'Bắt đầu phiên', abandonSession: 'Bỏ phiên học', startNextSession: 'Bắt đầu phiên tiếp theo', returnOverview: 'Về tổng quan',
    learnNewWords: 'Học từ mới', linkWords: 'Liên kết từ', saveLinks: 'Lưu liên kết', unlink: 'Bỏ liên kết', openSource: 'Mở nguồn',
    show: 'Hiện', hide: 'Ẩn', viewDetails: 'Xem chi tiết', exportVocabulary: 'Xuất từ vựng', downloadFullBackup: 'Tải bản sao lưu đầy đủ',
    openRestoreConfirmation: 'Mở xác nhận khôi phục', resetLearningProgress: 'Đặt lại tiến độ học', deleteAllData: 'Xóa toàn bộ dữ liệu',
    confirmReset: 'Xác nhận đặt lại', importItems: 'Nhập {{count}} mục', importItems_other: 'Nhập {{count}} mục', restoreBackup: 'Khôi phục bản sao lưu',
    working: 'Đang xử lý…', revealAnswer: 'Hiện đáp án', continue: 'Tiếp tục', continueTo: 'Tiếp tục đến {{step}}', retryDashboard: 'Thử lại bảng tổng quan',
    retryQuery: 'Thử lại {{query}}',
  },
  status: {
    noData: 'Chưa có dữ liệu', unavailable: 'Không khả dụng', noReviews: 'Không có lượt ôn', noTimingData: 'Không có dữ liệu thời gian', loading: 'Đang tải…',
    saving: 'Đang lưu…', deleting: 'Đang xóa…', exporting: 'Đang xuất…', preparingBackup: 'Đang chuẩn bị bản sao lưu…', preparingImport: 'Đang chuẩn bị bản xem trước nhập…',
    preparingRestore: 'Đang chuẩn bị bản xem trước khôi phục…', imported: 'Đã nhập {{count}} mục.', imported_other: 'Đã nhập {{count}} mục.',
    exportDownloaded: 'Đã tải bản xuất từ vựng.', backupDownloaded: 'Đã tải bản sao lưu đầy đủ.', restoreCompleted: 'Đã khôi phục.',
    progressReset: 'Đã đặt lại tiến độ học.', allDataDeleted: 'Đã xóa toàn bộ dữ liệu.',
  },
  labels: {
    word: 'Từ', definition: 'Định nghĩa', translation: 'Bản dịch', phonetic: 'Phiên âm', partOfSpeech: 'Từ loại', difficulty: 'Độ khó',
    tags: 'Thẻ', collocations: 'Cụm từ', examples: 'Ví dụ', contexts: 'Ngữ cảnh', sourceType: 'Loại nguồn', sourceUrl: 'URL nguồn',
    date: 'Ngày', reviews: 'Lượt ôn', correct: 'Đúng', accuracy: 'Độ chính xác', averageResponse: 'Phản hồi TB', count: 'Số lượng', state: 'Trạng thái', percentage: 'Phần trăm',
    language: 'Ngôn ngữ', theme: 'Giao diện', selected: 'Đã chọn: {{name}}',
  },
  hints: {
    commaSeparated: 'Phân tách bằng dấu phẩy', onePhrasePerLine: 'Mỗi cụm từ một dòng', oneSentencePerLine: 'Mỗi câu một dòng',
  },
  errors: {
    VALIDATION_ERROR: 'Vui lòng kiểm tra thông tin đã gửi.', BAD_REQUEST: 'Không thể hoàn thành yêu cầu này.', NOT_FOUND: 'Không tìm thấy dữ liệu yêu cầu.',
    CONFLICT: 'Thao tác này xung đột với dữ liệu hiện có.', SERVICE_UNAVAILABLE: 'AI tạm thời chưa chấm được. Câu của bạn vẫn được giữ; hãy thử lại.', INTERNAL_ERROR: 'Đã xảy ra lỗi trên máy chủ.', INVALID_RESPONSE: 'Máy chủ trả về phản hồi không hợp lệ.',
    HTTP_ERROR: 'Không thể hoàn thành yêu cầu.', FORBIDDEN: 'Bạn không có quyền thực hiện thao tác này.', RATE_LIMITED: 'Trợ lý AI đang bận. Vui lòng đợi một lát rồi thử lại.', AI_NOT_CONFIGURED: 'Trợ lý AI chưa được cấu hình trên bản cài đặt này.', AI_PROVIDER_ERROR: 'Nhà cung cấp AI gặp lỗi. Vui lòng thử lại.', AI_INVALID_OUTPUT: 'Trợ lý AI trả về phản hồi không hợp lệ. Vui lòng thử lại.', AI_TIMEOUT: 'Yêu cầu quá thời gian phản hồi. Vui lòng thử lại.', generic: 'Đã xảy ra lỗi. Vui lòng thử lại.',
    AI_API_KEY_REQUIRED: 'Nhập API key mới cho endpoint này.',
    AI_SETTINGS_UNAVAILABLE: 'Không thể mở cấu hình AI đã lưu. Hãy nhập API key mới hoặc xóa cấu hình đã lưu.',
    AI_CONFIG_CHANGED: 'Cấu hình AI đã thay đổi. Câu hỏi vẫn được giữ; hãy gửi lại bằng cấu hình hiện tại.',
  },
  language: { label: 'Ngôn ngữ', vietnamese: 'Tiếng Việt', english: 'English' },
  theme: { light: 'sáng', dark: 'tối', switchToLight: 'Chuyển sang giao diện sáng', switchToDark: 'Chuyển sang giao diện tối' },
  dialog: { close: 'Đóng {{title}}' },
  confirmation: { restore: 'Nhập RESTORE để xác nhận', resetProgress: 'Nhập RESET PROGRESS để xác nhận', deleteAll: 'Nhập DELETE ALL DATA để xác nhận' },
  pagination: { pageOf: 'Trang {{page}} trên {{totalPages}}' },
} as const;
