import AdminLayout from "components/layout/AdminLayout";
import { ROUTES } from "constants/routerWeb";
import AdminBooking from "pages/Admin/Booking";
import AdminCustomer from "pages/Admin/Customer";
import AdminDashboard from "pages/Admin/Dashboard";
import AdminEmployee from "pages/Admin/Employee";
import AdminFactory from "pages/Admin/Factory";
import AdminProduct from "pages/Admin/Product";
import Login from "pages/Login";
import PageNotFound from "pages/NotFoundPage";
// import Register from "pages/Register";

export const EnumHome = {
  MANAGER: ROUTES.ADMIN_HOME_PAGE,
  EMPLOYEE: ROUTES.ADMIN_HOME_PAGE,
};

export const managerRoutes = [
  {
    path: ROUTES.ADMIN_HOME_PAGE,
    name: "Admin Layout",
    element: <AdminLayout />,
    children: [
      { isRoot: true, name: "Dashboard Page", element: <AdminDashboard /> },
      {
        path: ROUTES.ADMIN_DASHBOARD,
        name: "Dashboard Page",
        element: <AdminDashboard />,
      },
      {
        path: ROUTES.ADMIN_BOOKING,
        name: "Booking",
        element: <AdminBooking />,
      },
      {
        path: ROUTES.ADMIN_FACTORY,
        name: "Factory Page",
        element: <AdminFactory />,
      },
      {
        path: ROUTES.ADMIN_EMPLOYEE,
        name: "Employee",
        element: <AdminEmployee />,
      },
      {
        path: ROUTES.ADMIN_PRODUCT,
        name: "Product",
        element: <AdminProduct />,
      },
      {
        path: ROUTES.ADMIN_CUSTOMER,
        name: "Customer",
        element: <AdminCustomer />,
      },
      { path: "*", name: "Not Found Page", element: <PageNotFound /> },
    ],
  },
];

export const employeeRoutes = [
  {
    path: ROUTES.ADMIN_HOME_PAGE,
    name: "Admin Layout",
    element: <AdminLayout />,
    children: [
      { isRoot: true, name: "Dashboard Page", element: <AdminDashboard /> },
      {
        path: ROUTES.ADMIN_FACTORY,
        name: "Factory",
        element: <AdminFactory />,
      },
      {
        path: ROUTES.ADMIN_EMPLOYEE,
        name: "Employee",
        element: <AdminEmployee />,
      },
      {
        path: ROUTES.ADMIN_PRODUCT,
        name: "Product",
        element: <AdminProduct />,
      },
      { path: "*", name: "Not Found Page", element: <PageNotFound /> },
    ],
  },
];

export const publicRoutes = [
  {
    path: ROUTES.HOME_PAGE,
    name: "Admin Layout",
    element: <AdminLayout />,
  },
  { path: ROUTES.LOGIN, name: "Login Page", element: <Login /> },
  // { path: ROUTES.REGISTER, name: "Register Page", element: <Register /> },
  { path: "*", name: "Not Found Page", element: <PageNotFound /> },
];
