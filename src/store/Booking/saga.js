import { ENDPOINT } from "constants/routerApi";
import { get, post, put as puts } from "helper/ajax";
import { all, call, put, takeLatest, takeLeading } from "redux-saga/effects";
import { addToast } from "store/Toast/action";
import {
  actionConfirmFailed,
  actionConfirmScheduleFailed,
  actionConfirmScheduleSuccess,
  actionConfirmSuccess,
  actionDestroyFailed,
  actionDestroyScheduleFailed,
  actionDestroyScheduleSuccess,
  actionDestroySuccess,
  actionDetailFailed,
  actionDetailSuccess,
  actionGetListFailed,
  actionGetListSuccess,
} from "./action";
import * as ActionTypes from "./constant";
function* callApiList({ params }) {
  try {
    const response = yield call(get, ENDPOINT.LIST_BOOKING, params);
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
    const response = yield call(get, ENDPOINT.DETAIL_BOOKING + id);
    if (response.status === 200) {
      yield put(actionDetailSuccess(response.data.data));
    } else {
      yield put(actionDetailFailed());
    }
  } catch (error) {
    yield put(actionDetailFailed(error.response.data.error));
  }
}

function* callApiConfirm({ id }) {
  try {
    const response = yield call(post, ENDPOINT.CONFIRM_BOOKING, {
      idbooking: id,
    });
    if (response.status === 200) {
      yield put(actionConfirmSuccess({ status: response.data.message, id }));
      yield put(
        addToast({
          text: "Xác nhận thành công",
          type: "success",
          title: "",
        })
      );
    } else {
      yield put(actionConfirmFailed());
      yield put(
        addToast({
          text: "Xác nhận thất bại",
          type: "danger",
          title: "",
        })
      );
    }
  } catch (error) {
    yield put(actionConfirmFailed(error.response.data.error));
    yield put(
      addToast({
        text: "Xác nhận thất bại",
        type: "danger",
        title: "",
      })
    );
  }
}

function* callApiDestroy({ id }) {
  try {
    const response = yield call(post, ENDPOINT.DESTROY_BOOKING, {
      idbooking: id,
    });
    if (response.status === 200) {
      yield put(actionDestroySuccess({ status: response.data.message, id }));
    } else {
      yield put(actionDestroyFailed());
    }
  } catch (error) {
    yield put(actionDestroyFailed(error.response.data.error));
    yield put(
      addToast({
        text: "Xảy ra lỗi",
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
        actionConfirmScheduleSuccess({
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
      yield put(actionConfirmScheduleFailed());
      yield put(
        addToast({
          text: "Xác nhận thất bại",
          type: "danger",
          title: "",
        })
      );
    }
  } catch (error) {
    yield put(actionConfirmScheduleFailed(error.response.data.error));

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
        actionDestroyScheduleSuccess({
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
      yield put(actionDestroyScheduleFailed());
      yield put(
        addToast({
          text: "Hủy bỏ thất bại",
          type: "danger",
          title: "",
        })
      );
    }
  } catch (error) {
    yield put(actionDestroyScheduleFailed(error.response.data.error));
    yield put(
      addToast({
        text: "Xảy ra lỗi",
        type: "danger",
        title: "",
      })
    );
  }
}

export default function* bookingSaga() {
  yield all([
    yield takeLeading(ActionTypes.LIST, callApiList),
    yield takeLeading(ActionTypes.DETAIL, callApiDetail),
    yield takeLatest(ActionTypes.CONFIRM, callApiConfirm),
    yield takeLatest(ActionTypes.DESTROY, callApiDestroy),
    yield takeLatest(ActionTypes.CONFIRM_SCHEDULE, callApiConfirmSchedule),
    yield takeLatest(ActionTypes.DESTROY_SCHEDULE, callApiDestroySchedule),
  ]);
}
