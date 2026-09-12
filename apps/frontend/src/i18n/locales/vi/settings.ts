/**
 * @file settings.ts
 * @description Bản dịch tiếng Việt cho tùy chọn, quản lý dữ liệu và xác nhận thao tác nguy hiểm.
 */
export default {
  title: 'Cài đặt', subtitle: 'Kiểm soát giao diện và dữ liệu học của bạn.', appearance: 'Giao diện', theme: 'Chủ đề', currentTheme: 'Chủ đề hiện tại: {{theme}}.', language: 'Ngôn ngữ', languageDescription: 'Chọn ngôn ngữ Lexora sử dụng.', dataManagement: 'Quản lý dữ liệu', dataDescription: 'Xem trước thao tác nhập và khôi phục trước khi ghi dữ liệu. Thao tác nguy hiểm nêu rõ dữ liệu bị xóa.',
  importVocabulary: 'Nhập từ vựng', importDescription: 'Định dạng hỗ trợ: TXT, CSV, JSON. Bắt buộc xem trước trước khi nhập.', importFormat: 'Định dạng nhập', importFile: 'Tệp nhập', selected: 'Đã chọn: {{name}}', importPreview: 'Xem trước nhập', valid: 'Hợp lệ', duplicate: 'Trùng lặp', invalid: 'Không hợp lệ', skipped: 'Bỏ qua: API không báo cáo', confirmImport: 'Xác nhận nhập', reviewedValid: 'Tôi đã xem các mục hợp lệ.', noValidItems: 'Không có mục hợp lệ để nhập.', preparing: 'Đang chuẩn bị bản xem trước nhập…',
  exportBackup: 'Xuất và sao lưu', exportDescription: 'Bản xuất từ vựng tách biệt với bản sao lưu có thể khôi phục.', exporting: 'Đang xuất…', preparingBackup: 'Đang chuẩn bị bản sao lưu…',
  restore: 'Khôi phục bản sao lưu', restoreDescription: 'Bản xem trước xác thực bản sao lưu và báo cáo dữ liệu sẽ bị ghi đè.', restoreFile: 'Tệp sao lưu', restorePreview: 'Xem trước khôi phục', records: '{{count}} bản ghi từ bản sao lưu {{application}} phiên bản {{version}}.', records_other: '{{count}} bản ghi từ bản sao lưu {{application}} phiên bản {{version}}.', overwrite: 'Khôi phục sẽ ghi đè {{count}} bản ghi hiện có.', overwrite_other: 'Khôi phục sẽ ghi đè {{count}} bản ghi hiện có.', noOverwrite: 'Không có bản ghi hiện có bị ghi đè.', openRestore: 'Mở xác nhận khôi phục', restoreTitle: 'Khôi phục bản sao lưu', restoreDescriptionDialog: 'Thao tác này ghi đè dữ liệu hiện có. Bản xem trước không đảm bảo khôi phục thành công.',
  dangerZone: 'Khu vực nguy hiểm', dangerDescription: 'Không thể hoàn tác các thao tác này.', resetProgress: 'Đặt lại tiến độ học tập', resetDescription: 'Giữ từ vựng và ngữ cảnh nhưng đặt lại tiến độ, lượt ôn và phiên học.', deleteAll: 'Xóa toàn bộ dữ liệu', deleteAllDescription: 'Xóa từ vựng, ngữ cảnh và toàn bộ dữ liệu học.', resetDialogTitle: 'Đặt lại tiến độ học tập', resetDialogDescription: 'Giữ từ vựng và ngữ cảnh nhưng xóa nhật ký ôn, phiên học và đặt lại tiến độ.', deleteDialogTitle: 'Xóa toàn bộ dữ liệu', deleteDialogDescription: 'Xóa từ vựng, ngữ cảnh và toàn bộ dữ liệu học. Không giữ lại gì.',
  confirmation: {
    restore: 'Nhập {{phrase}} để xác nhận', restorePhrase: 'KHÔI PHỤC',
    resetProgress: 'Nhập {{phrase}} để xác nhận', resetProgressPhrase: 'ĐẶT LẠI TIẾN ĐỘ',
    deleteAll: 'Nhập {{phrase}} để xác nhận', deleteAllPhrase: 'XÓA TOÀN BỘ DỮ LIỆU',
  },
  errors: { readFile: 'Không thể đọc tệp đã chọn.', previewImport: 'Không thể xem trước tệp nhập.', import: 'Không thể nhập từ vựng.', previewRestore: 'Không thể xem trước tệp khôi phục.', restore: 'Không thể khôi phục bản sao lưu.', restoreResponse: 'Phản hồi khôi phục không xác nhận hoàn tất.', resetResponse: 'Phản hồi đặt lại không xác nhận đặt lại {{scope}}.' },
} as const;
