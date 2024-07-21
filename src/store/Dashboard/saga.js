import { ENDPOINT } from "constants/routerApi";
import { get } from "helper/ajax";
import { all, call, put, takeLeading } from "redux-saga/effects";
import { actionDashboardFailed, actionDashboardSuccess } from "./action";
import * as ActionTypes from "./constant";
function* callApiDashboard() {
  try {
    const response = yield call(get, ENDPOINT.DASHBOARD);

    if (response.status === 200) {
      yield put(actionDashboardSuccess(response.data.data));
    } else {
      yield put(actionDashboardFailed());
    }
  } catch (error) {
    yield put(actionDashboardFailed(error.response.data.error));
  }
}

export default function* dashboardSaga() {
  yield all([yield takeLeading(ActionTypes.DASHBOARD, callApiDashboard)]);
}
