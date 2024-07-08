import { ROUTES } from "./routerWeb";
export const MENU_MANAGER = [
  {
    label: "Dashboard",
    active: false,
    src: ROUTES.ADMIN_DASHBOARD,
    icon: <i className="fas fa-home"></i>,
  },
  {
    label: "Booking",
    active: false,
    src: ROUTES.ADMIN_BOOKING,
    icon: <i className="far fa-calendar-check"></i>,
  },
  {
    label: "Factory",
    active: false,
    src: ROUTES.ADMIN_FACTORY,
    icon: <i className="fas fa-map-marked-alt"></i>,
  },
  {
    label: "Employee",
    active: false,
    src: ROUTES.ADMIN_EMPLOYEE,
    icon: <i className="fas fa-users-cog"></i>,
  },
  {
    label: "Service",
    active: false,
    src: ROUTES.ADMIN_PRODUCT,
    icon: <i className="fas fa-window-restore"></i>,
  },
  {
    label: "Customer",
    active: false,
    src: ROUTES.ADMIN_CUSTOMER,
    icon: <i className="fas fa-users"></i>,
  },
];

export const MENU_EMPLOYEE = [
  {
    label: "Dashboard",
    active: false,
    src: ROUTES.ADMIN_DASHBOARD,
    icon: <i className="fas fa-home"></i>,
  },
  {
    label: "Factory",
    active: false,
    src: ROUTES.ADMIN_FACTORY,
    icon: <i className="fas fa-home"></i>,
  },
  {
    label: "Employee",
    active: false,
    src: ROUTES.ADMIN_EMPLOYEE,
    icon: <i className="fas fa-users"></i>,
  },
  {
    label: "Service",
    active: false,
    src: ROUTES.ADMIN_PRODUCT,
    icon: <i className="fas fa-users"></i>,
  },
];
