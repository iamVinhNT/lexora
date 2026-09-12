/**
 * @file contexts.ts
 * @description Bản dịch tiếng Việt cho quản lý ngữ cảnh, loại nguồn, biểu mẫu và chi tiết.
 */
export default {
  title: 'Ngữ cảnh', subtitle: 'Học từ qua câu và tình huống giúp làm rõ ý nghĩa.', addContext: 'Thêm ngữ cảnh', filters: 'Bộ lọc ngữ cảnh', search: 'Tìm kiếm ngữ cảnh', searchPlaceholder: 'Tiêu đề hoặc nội dung…', sourceType: 'Loại nguồn', allSourceTypes: 'Tất cả loại nguồn', pagination: 'Phân trang ngữ cảnh',
  count: '{{formattedCount}} ngữ cảnh', count_other: '{{formattedCount}} ngữ cảnh', wordsOnPage: '{{formattedCount}} từ trên trang', wordsOnPage_other: '{{formattedCount}} từ trên trang', word: 'từ', words: 'từ', noMatch: 'Không có ngữ cảnh phù hợp', noMatchDescription: 'Dán câu, bài viết hoặc đoạn hội thoại để học từ trong ngữ cảnh.', loading: 'Đang tải ngữ cảnh…', retry: 'Thử lại', viewDetails: 'Xem chi tiết', detailsFor: 'Chi tiết {{title}}',
  addTitle: 'Thêm ngữ cảnh', editTitle: 'Sửa {{title}}', fields: { title: 'Tiêu đề', content: 'Nội dung', sourceUrl: 'URL nguồn' }, linkExistingWords: 'Liên kết từ hiện có', addVocabularyFirst: 'Hãy thêm từ vựng trước khi liên kết.', titleRequired: 'Bắt buộc nhập tiêu đề', contentRequired: 'Bắt buộc nhập nội dung', sourceTypeRequired: 'Bắt buộc chọn loại nguồn', save: 'Lưu ngữ cảnh', saving: 'Đang lưu…', cancel: 'Hủy',
  uncategorized: 'Chưa phân loại', openSource: 'Mở nguồn', linkedWords: 'Từ đã liên kết', linkWords: 'Liên kết từ', noWordsLinked: 'Chưa có từ được liên kết.', exposure: 'Số lần gặp: {{count}} · Gặp đầu {{firstSeen}} · Gặp cuối {{lastSeen}}', unlink: 'Bỏ liên kết', saveLinks: 'Lưu liên kết', deleting: 'Đang xóa…', confirmDelete: 'Xác nhận xóa', deleteTitle: 'Xóa ngữ cảnh', deleteDescription: 'Xóa {{title}}? Từ vựng đã liên kết sẽ được giữ lại.',
  sourceTypes: { READING: 'Đọc', LISTENING: 'Nghe', CONVERSATION: 'Hội thoại', BOOK: 'Sách', ARTICLE: 'Bài viết', YOUTUBE: 'YouTube', WORK: 'Công việc', PERSONAL: 'Cá nhân', MANUAL: 'Thủ công' },
} as const;
