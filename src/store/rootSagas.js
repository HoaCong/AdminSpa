/* quy phạm khai báo Saga */
import { all, fork } from "redux-saga/effects";

import bookingSaga from "./Booking/saga";
import bookingDetailSaga from "./BookingDetailList/saga";
import customerSaga from "./Customer/saga";
import dashboardSaga from "./Dashboard/saga";
import employeeSaga from "./Employee/saga";
import factorySaga from "./Factory/saga";
import loginSaga from "./Login/saga";
import productSaga from "./Product/saga";
import scheduleSaga from "./Schedule/saga";
import settingSaga from "./Setting/saga";

export default function* rootSaga() {
  yield all([
    fork(loginSaga),
    fork(employeeSaga),
    fork(productSaga),
    fork(dashboardSaga),
    fork(factorySaga),
    fork(customerSaga),
    fork(bookingSaga),
    fork(bookingDetailSaga),
    fork(settingSaga),
    fork(scheduleSaga),
  ]);
}
