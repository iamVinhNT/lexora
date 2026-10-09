/**
 * @file assistant.ts
 * @description Vietnamese translations for Lexi’s character guide.
 */
export default {
  title: 'Lexi · Hướng dẫn học',
  description: 'Hướng dẫn học tiếng Anh, không sửa dữ liệu',
  openAssistant: 'Hỏi Lexi',
  closeAssistant: 'Đóng Lexi',
  newConversation: 'Câu hỏi mới / xóa hội thoại',
  resizeHandle: 'Đổi kích thước khung chat bằng kéo hoặc phím mũi tên',
  resizeToggle: 'Đổi kích thước khung chat',
  loading3d: 'Đang tải 3D…',
  unavailable3d: '3D không khả dụng',
  includeContent: 'Kèm dữ liệu đã lưu của menu',
  includeProgress: 'Kèm tiến độ',
  privacyControls: 'Chia sẻ và riêng tư',
  privacyNotice: 'Câu hỏi, hội thoại gần đây và một phần dữ liệu đã lưu của menu này (khi bật) được gửi tới nhà cung cấp AI bạn đã cấu hình. Tiến độ chỉ được gửi khi bật riêng. Lexi không thể thay đổi dữ liệu học.',
  inputPlaceholder: 'Đặt câu hỏi cho Lexi…',
  followUpPlaceholder: 'Hỏi tiếp…',
  inputLabel: 'Câu hỏi của bạn',
  send: 'Gửi',
  sending: 'Đang suy nghĩ…',
  emptyDescription: 'Hỏi về menu này và dữ liệu đã lưu. Tôi có thể giải thích, đưa ví dụ hoặc giúp bạn luyện tập.',
  tipQuestion: 'Tôi nên luyện tập với dữ liệu đã lưu trong menu này như thế nào?',
  askAssistant: 'Hỏi Lexi',
  retry: 'Thử lại',
  notConfigured: 'Hãy cấu hình nhà cung cấp AI trước khi hỏi Lexi. Bạn vẫn có thể học mà không cần AI.',
  openSettings: 'Mở cài đặt AI',
  screens: {
    overview: 'Tổng quan',
    learn: 'Học từ',
    review: 'Ôn tập',
    vocabulary: 'Từ vựng',
    calendar: 'Kế hoạch',
    grammar: 'Ngữ pháp',
    contexts: 'Ngữ cảnh',
    statistics: 'Thống kê',
    settings: 'Cài đặt'
  },
  contextBadges: {
    general: 'Chung',
    screen: 'Màn hình: {{screen}}',
  }
} as const;
