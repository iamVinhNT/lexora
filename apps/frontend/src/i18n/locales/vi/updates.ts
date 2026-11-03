/**
 * @file updates.ts
 * @description Vietnamese translations for the desktop update notification.
 */
export default {
  bellTitle: 'Có bản {{version}}',
  bellLabel: 'Có bản mới {{version}}. Xem chi tiết',
  title: 'Lexora {{version}} đã có',
  summary: 'Bạn đang dùng {{current}}. Phát hành {{date}}.',
  download: 'Tải {{file}} ({{size}})',
  savesTo: 'Lưu vào {{dir}}. Không cài và không chạy gì.',
  progressLabel: 'Đang tải… {{received}} trên {{total}}',
  cancel: 'Huỷ tải',
  done: 'Đã tải về {{path}}',
  nextAppImage: 'Đóng Lexora rồi chạy file mới, file đã có quyền chạy.',
  nextDeb: 'Đóng Lexora rồi chạy lệnh này:',
  nextUnknown: 'Đóng Lexora rồi cài file đã tải.',
  dataSafe: 'Dữ liệu học trong {{dataDir}} được giữ nguyên.',
  reveal: 'Hiện trong thư mục',
  retry: 'Thử tải lại',
  errorNetwork: 'Tải bị gián đoạn. Kiểm tra mạng rồi thử lại.',
  errorVerify: 'File không khớp mã kiểm tra nên đã bị xoá. Thử lại.',
  errorDisk: 'Không lưu được vào {{dir}}. Giải phóng dung lượng hoặc kiểm tra quyền.',
  errorNoAsset: 'Bản này không có file cho cách cài của bạn.',
  skip: 'Bỏ qua bản {{version}}',
  close: 'Đóng',
} as const;
