export const pageSize = 20;

export const STATUS_LABEL = {
  IN_PROCCESS: { bg: "secondary", name: "Chưa duyệt" },
  CONFIRMED: { bg: "success", name: "Đã duyệt" },
  DESTROYED: { bg: "danger", name: "Đã hủy" },
  SUCCESS: { bg: "success", name: "Thành công" },
};

export const TYPE_LABEL = {
  TRIET_LONG: "Triệt lông",
  CHAM_DA: "Chăm da",
};

export const STATUS = [
  { id: null, name: "Tất cả" },
  { id: "IN_PROCCESS", name: "Chưa duyệt" },
  { id: "CONFIRMED", name: "Đã duyệt" },
  { id: "DESTROYED", name: "Đã hủy" },
];
