/* quy phạm khai báo rootReducer */
import { combineReducers } from "redux";

import bookingReducer from "./Booking/reducer";
import customerReducer from "./Customer/reducer";
import dashboardReducer from "./Dashboard/reducer";
import employeeReducer from "./Employee/reducer";
import factoryReducer from "./Factory/reducer";
import loginReducer from "./Login/reducer";
import productReducer from "./Product/reducer";
import toastReducer from "./Toast/reducer";

const rootReducer = combineReducers({
  loginReducer,
  toastReducer,
  employeeReducer,
  dashboardReducer,
  factoryReducer,
  productReducer,
  customerReducer,
  bookingReducer,
});

export default rootReducer;
