import * as ActionTypes from "./constant";

export const actionGetList = (params) => ({
  type: ActionTypes.LIST,
  params,
});

export const actionGetListSuccess = (payload) => ({
  type: ActionTypes.LIST_SUCCESS,
  payload,
});

export const actionGetListFailed = (error) => ({
  type: ActionTypes.LIST_FAILED,
  error,
});

export const actionDetail = (id) => ({
  type: ActionTypes.DETAIL,
  id,
});

export const actionDetailSuccess = (payload) => ({
  type: ActionTypes.DETAIL_SUCCESS,
  payload,
});

export const actionDetailFailed = (error) => ({
  type: ActionTypes.DETAIL_FAILED,
  error,
});

export const actionConfirm = (id) => ({
  type: ActionTypes.CONFIRM,
  id,
});

export const actionConfirmSuccess = (payload) => ({
  type: ActionTypes.CONFIRM_SUCCESS,
  payload,
});

export const actionConfirmFailed = (error) => ({
  type: ActionTypes.CONFIRM_FAILED,
  error,
});

export const actionDestroy = (id) => ({
  type: ActionTypes.DESTROY,
  id,
});

export const actionDestroySuccess = (payload) => ({
  type: ActionTypes.DESTROY_SUCCESS,
  payload,
});

export const actionDestroyFailed = (error) => ({
  type: ActionTypes.DESTROY_FAILED,
  error,
});

export const resetData = () => ({
  type: ActionTypes.RESET_DATA,
});
