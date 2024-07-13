import { ENDPOINT } from "constants/routerApi";
import { get, put as puts } from "helper/ajax";
import { all, call, put, takeLatest, takeLeading } from "redux-saga/effects";
import { addToast } from "store/Toast/action";
import {
  actionGetFailed,
  actionGetSuccess,
  actionUpdateFailed,
  actionUpdateSuccess,
} from "./action";
import * as ActionTypes from "./constant";
function* callApiGet() {
  try {
    const response = yield call(get, ENDPOINT.GET_SETTING);
    if (response.status === 200) {
      yield put(actionGetSuccess(response.data));
    } else {
      yield put(actionGetFailed());
    }
  } catch (error) {
    yield put(actionGetFailed(error.response.data.error));
  }
}

function* callApiUpdate({ params }) {
  try {
    const { logo, numberPhone, nameBanner, colorone, colortwo, colorthree } =
      params;
    const response = yield call(puts, ENDPOINT.UPDATE_SETTING, {
      logo,
      numberPhone,
      nameBanner,
      colorone,
      colortwo,
      colorthree,
    });
    if (response.status === 200) {
      yield put(actionUpdateSuccess(response.data.data));
      yield put(
        addToast({
          text: response.data.message,
          type: "success",
          title: "",
        })
      );
    } else {
      yield put(actionUpdateFailed());
      yield put(
        addToast({
          text: "Update setting failed",
          type: "danger",
          title: "",
        })
      );
    }
  } catch (error) {
    yield put(actionUpdateFailed(error.response.data.error));
    yield put(
      addToast({
        text: "Update setting failed",
        type: "danger",
        title: "",
      })
    );
  }
}

export default function* settingSaga() {
  yield all([
    yield takeLeading(ActionTypes.GET, callApiGet),
    yield takeLatest(ActionTypes.UPDATE, callApiUpdate),
  ]);
}
