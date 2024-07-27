import { ROUTES } from "./routerWeb";
export const MENU_MANAGER = [
  {
    label: "Trang chủ",
    active: false,
    src: ROUTES.ADMIN_DASHBOARD,
    icon: <i className="fas fa-home"></i>,
  },
  {
    label: "Đặt lịch",
    active: false,
    src: ROUTES.ADMIN_BOOKING,
    icon: <i className="far fa-calendar-check"></i>,
  },
  {
    label: "Lịch đặt chi tiết",
    active: false,
    src: ROUTES.ADMIN_BOOKING_DETAIL_LIST,
    icon: <i className="far fa-calendar-alt"></i>,
  },
  {
    label: "Lịch hẹn",
    active: false,
    src: ROUTES.ADMIN_SCHEDULE,
    icon: <i className="fas fa-calendar-alt"></i>,
  },
  {
    label: "Cơ sở",
    active: false,
    src: ROUTES.ADMIN_FACTORY,
    icon: <i className="fas fa-map-marked-alt"></i>,
  },
  {
    label: "Nhân viên",
    active: false,
    src: ROUTES.ADMIN_EMPLOYEE,
    icon: <i className="fas fa-users-cog"></i>,
  },
  {
    label: "Dịch vụ",
    active: false,
    src: ROUTES.ADMIN_PRODUCT,
    icon: <i className="fas fa-window-restore"></i>,
  },
  {
    label: "Khách hàng",
    active: false,
    src: ROUTES.ADMIN_CUSTOMER,
    icon: <i className="fas fa-users"></i>,
  },
  {
    label: "Cấu hình",
    active: false,
    src: ROUTES.ADMIN_SETTING,
    icon: <i className="fas fa-cog"></i>,
  },
];

export const MENU_EMPLOYEE = [
  {
    label: "Đặt lịch",
    active: false,
    src: ROUTES.ADMIN_BOOKING,
    icon: <i className="far fa-calendar-check"></i>,
  },
  {
    label: "Lịch đặt chi tiết",
    active: false,
    src: ROUTES.ADMIN_BOOKING_DETAIL_LIST,
    icon: <i className="far fa-calendar-check"></i>,
  },
  {
    label: "Lịch hẹn",
    active: false,
    src: ROUTES.ADMIN_SCHEDULE,
    icon: <i className="fas fa-calendar-alt"></i>,
  },
  {
    label: "Khách hàng",
    active: false,
    src: ROUTES.ADMIN_CUSTOMER,
    icon: <i className="fas fa-users"></i>,
  },
];
