import { ENDPOINT } from "constants/routerApi";
import { get, post } from "helper/ajax";
import { all, call, put, takeLatest, takeLeading } from "redux-saga/effects";
import {
  actionConfirmFailed,
  actionConfirmSuccess,
  actionDestroyFailed,
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
    } else {
      yield put(actionConfirmFailed());
    }
  } catch (error) {
    yield put(actionConfirmFailed(error.response.data.error));
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
  }
}

export default function* bookingSaga() {
  yield all([
    yield takeLeading(ActionTypes.LIST, callApiList),
    yield takeLeading(ActionTypes.DETAIL, callApiDetail),
    yield takeLatest(ActionTypes.CONFIRM, callApiConfirm),
    yield takeLatest(ActionTypes.DESTROY, callApiDestroy),
  ]);
}
