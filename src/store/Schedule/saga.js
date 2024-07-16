import { ENDPOINT } from "constants/routerApi";
import { get, post } from "helper/ajax";
import { all, call, put, takeLatest, takeLeading } from "redux-saga/effects";
import {
  actionConfirmReminderCareFailed,
  actionConfirmReminderCareSuccess,
  actionDetailFailed,
  actionDetailSuccess,
  actionGetListFailed,
  actionGetListSuccess,
} from "./action";
import * as ActionTypes from "./constant";
function* callApiList({ params }) {
  try {
    const response = yield call(get, ENDPOINT.LIST_SCHEDULE + params);
    if (response.status === 200) {
      yield put(actionGetListSuccess(response.data));
    } else {
      yield put(actionGetListFailed());
    }
  } catch (error) {
    yield put(actionGetListFailed(error.response.data.error));
  }
}

function* callApiDetail({ id }) {
  try {
    const response = yield call(get, ENDPOINT.REMINDER_CARE_SCHEDULE + id);
    if (response.status === 200) {
      yield put(actionDetailSuccess(response.data.data));
    } else {
      yield put(actionDetailFailed());
    }
  } catch (error) {
    yield put(actionDetailFailed(error.response.data.error));
  }
}

function* callApiConfirmReminderCare({ payload, note }) {
  try {
    const response = yield call(
      post,
      `${ENDPOINT.CONFIRM_SCHEDULE + payload.idschedule}/${payload.serviceid}`,
      {
        note,
      }
    );
    if (response.status === 200) {
      yield put(
        actionConfirmReminderCareSuccess({
          ...payload,
          status: response.data.message,
          note,
        })
      );
    } else {
      yield put(actionConfirmReminderCareFailed());
    }
  } catch (error) {
    yield put(actionConfirmReminderCareFailed(error.response.data.error));
  }
}

export default function* scheduleSaga() {
  yield all([
    yield takeLatest(ActionTypes.LIST, callApiList),
    yield takeLeading(ActionTypes.DETAIL, callApiDetail),
    yield takeLatest(
      ActionTypes.CONFIRM_REMINDERCARE,
      callApiConfirmReminderCare
    ),
  ]);
}
