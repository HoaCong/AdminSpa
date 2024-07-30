import { ENDPOINT } from "constants/routerApi";
import { get, post, put as puts } from "helper/ajax";
import { all, call, put, takeLatest, takeLeading } from "redux-saga/effects";
import { addToast } from "store/Toast/action";
import {
  actionConfirmReminderCareDetailFailed,
  actionConfirmReminderCareDetailSuccess,
  actionConfirmReminderCareFailed,
  actionConfirmReminderCareSuccess,
  actionConfirmSchedulesFailed,
  actionConfirmSchedulesSuccess,
  actionDestroySchedulesFailed,
  actionDestroySchedulesSuccess,
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
      puts,
      ENDPOINT.CONFIRM_REMINDER_CARE_SCHEDULE + payload.id,
      {
        note,
      }
    );
    if (response.status === 200 && response.data.status) {
      yield put(
        actionConfirmReminderCareSuccess({
          id: payload.id,
          status: response.data.message,
          note,
        })
      );
      yield put(
        addToast({
          text: "Xác nhận thành công",
          type: "success",
          title: "",
        })
      );
    } else {
      yield put(actionConfirmReminderCareFailed());
      yield put(
        addToast({
          text: response.data.message,
          type: "danger",
          title: "",
        })
      );
    }
  } catch (error) {
    yield put(actionConfirmReminderCareFailed(error.response.data.error));
    yield put(
      addToast({
        text: "Đã xảy ra lỗi",
        type: "danger",
        title: "",
      })
    );
  }
}

function* callApiConfirmReminderCareDetail({ payload, note }) {
  try {
    const response = yield call(
      puts,
      ENDPOINT.CONFIRM_REMINDER_CARE_SCHEDULE + payload.id,
      {
        note,
      }
    );
    if (response.status === 200 && response.data.status) {
      yield put(
        actionConfirmReminderCareDetailSuccess({
          id: payload.id,
          status: response.data.message,
          note,
        })
      );
      yield put(
        addToast({
          text: "Xác nhận thành công",
          type: "success",
          title: "",
        })
      );
    } else {
      yield put(actionConfirmReminderCareDetailFailed());
      yield put(
        addToast({
          text: response.data.message,
          type: "danger",
          title: "",
        })
      );
    }
  } catch (error) {
    yield put(actionConfirmReminderCareDetailFailed(error.response.data.error));
    yield put(
      addToast({
        text: "Đã xảy ra lỗi",
        type: "danger",
        title: "",
      })
    );
  }
}

function* callApiConfirmSchedule({ payload, note }) {
  try {
    const response = yield call(
      post,
      `${ENDPOINT.CONFIRM_SCHEDULE + payload.id}/${payload.serviceid}`,
      {
        note,
      }
    );
    if (response.status === 200 && response.data.status) {
      yield put(
        actionConfirmSchedulesSuccess({
          ...payload,
          status: response.data.message,
          note,
        })
      );
      yield put(
        addToast({
          text: "Xác nhận thành công",
          type: "success",
          title: "",
        })
      );
    } else {
      yield put(actionConfirmSchedulesFailed());
      yield put(
        addToast({
          text: "Xác nhận thất bại",
          type: "danger",
          title: "",
        })
      );
    }
  } catch (error) {
    yield put(actionConfirmSchedulesFailed(error.response.data.error));
    yield put(
      addToast({
        text: "Xảy ra lỗi",
        type: "danger",
        title: "",
      })
    );
  }
}

function* callApiDestroySchedule({ payload, note }) {
  try {
    const response = yield call(
      puts,
      ENDPOINT.DESTROY_SCHEDULE + payload.idbookingdetail,
      {
        note,
      }
    );
    if (response.status === 200 && response.data.status) {
      yield put(
        actionDestroySchedulesSuccess({
          ...payload,
          status: response.data.message,
          note,
        })
      );
      yield put(
        addToast({
          text: "Xác nhận thành công",
          type: "success",
          title: "",
        })
      );
    } else {
      yield put(actionDestroySchedulesFailed());
      yield put(
        addToast({
          text: "Hủy bỏ thất bại",
          type: "danger",
          title: "",
        })
      );
    }
  } catch (error) {
    yield put(actionDestroySchedulesFailed(error.response.data.error));
    yield put(
      addToast({
        text: "Xảy ra lỗi",
        type: "danger",
        title: "",
      })
    );
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
    yield takeLatest(
      ActionTypes.CONFIRM_REMINDERCARE_DETAIL,
      callApiConfirmReminderCareDetail
    ),
    yield takeLatest(ActionTypes.CONFIRM_SCHEDULES, callApiConfirmSchedule),
    yield takeLatest(ActionTypes.DESTROY_SCHEDULES, callApiDestroySchedule),
  ]);
}
