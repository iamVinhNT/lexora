/**
 * @file vocabulary.ts
 * @description Bản dịch tiếng Việt cho quản lý từ vựng, biểu mẫu, chi tiết và phân trang.
 */
export default {
  title: 'Từ vựng', subtitle: 'Lưu từ, nghĩa và ví dụ trong một không gian tập trung.', addWord: 'Thêm từ', filters: 'Bộ lọc từ vựng', search: 'Tìm kiếm từ vựng', searchPlaceholder: 'Từ, định nghĩa, ví dụ…',
  cefrDifficulty: 'Độ khó CEFR', allLevels: 'Tất cả cấp độ', status: 'Trạng thái từ vựng', allStatuses: 'Tất cả trạng thái', tagFilter: 'Lọc theo thẻ', tagPlaceholder: 'ví dụ: công việc', pagination: 'Phân trang từ vựng',
  noMatch: 'Không có từ phù hợp', noMatchDescription: 'Thử tìm kiếm khác hoặc thêm từ để bắt đầu xây dựng vốn từ.', loading: 'Đang tải từ vựng…', retry: 'Thử lại', viewDetails: 'Xem chi tiết', detailsFor: 'Chi tiết {{word}}',
  addTitle: 'Thêm từ', editTitle: 'Sửa {{word}}', required: 'Bắt buộc nhập {{field}}', chooseCefr: 'Chọn cấp độ CEFR', save: 'Lưu từ', saving: 'Đang lưu…', cancel: 'Hủy',
  wordFamilies: 'Họ từ', noWordFamilies: 'Chưa có họ từ.', noCollocations: 'Chưa có cụm từ.', noExamples: 'Chưa có ví dụ.', noContexts: 'Chưa liên kết ngữ cảnh.',
  progress3d: 'Tiến độ 3D', noProgress: 'Chưa ghi nhận tiến độ.', reviewState: 'Trạng thái ôn tập', due: 'Đến hạn {{date}} · {{repetitions}} lần lặp · {{lapses}} lần quên', noReviewState: 'Chưa ghi nhận trạng thái ôn tập.',
  deleteTitle: 'Xóa từ', deleteDescription: 'Thao tác này sẽ xóa {{word}} và chi tiết từ vựng. Không thể hoàn tác.', deleting: 'Đang xóa…', confirmDelete: 'Xác nhận xóa',
  fields: { word: 'Từ', definition: 'Định nghĩa', translation: 'Bản dịch', phonetic: 'Phiên âm', partOfSpeech: 'Từ loại', difficulty: 'Độ khó', tags: 'Thẻ', collocations: 'Cụm từ', examples: 'Ví dụ' },
  scoreSummary: 'Nhận diện {{recognition}} · Ghi nhớ {{recall}} · Đặt câu {{production}}', scores: { recognition: 'Nhận diện', recall: 'Ghi nhớ', production: 'Đặt câu' },
  states: { NEW: 'Mới', LEARNING: 'Đang học', FAMILIAR: 'Quen thuộc', MASTERED: 'Thành thạo', MAINTENANCE: 'Duy trì' },
} as const;
