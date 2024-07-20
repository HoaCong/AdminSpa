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

export const actionConfirmSchedule = (payload, note) => ({
  type: ActionTypes.CONFIRM_SCHEDULE,
  payload,
  note,
});

export const actionConfirmScheduleSuccess = (payload) => ({
  type: ActionTypes.CONFIRM_SCHEDULE_SUCCESS,
  payload,
});

export const actionConfirmScheduleFailed = (error) => ({
  type: ActionTypes.CONFIRM_SCHEDULE_FAILED,
  error,
});

export const actionDestroySchedule = (payload, note) => ({
  type: ActionTypes.DESTROY_SCHEDULE,
  payload,
  note,
});

export const actionDestroyScheduleSuccess = (payload) => ({
  type: ActionTypes.DESTROY_SCHEDULE_SUCCESS,
  payload,
});

export const actionDestroyScheduleFailed = (error) => ({
  type: ActionTypes.DESTROY_SCHEDULE_FAILED,
  error,
});

export const actionAdd = (params) => ({
  type: ActionTypes.ADD,
  params,
});

export const actionAddSuccess = (payload) => ({
  type: ActionTypes.ADD_SUCCESS,
  payload,
});

export const actionAddFailed = (error) => ({
  type: ActionTypes.ADD_FAILED,
  error,
});

export const actionEdit = (params) => ({
  type: ActionTypes.EDIT,
  params,
});

export const actionEditSuccess = (payload) => ({
  type: ActionTypes.EDIT_SUCCESS,
  payload,
});

export const actionEditFailed = (error) => ({
  type: ActionTypes.EDIT_FAILED,
  error,
});

export const resetData = () => ({
  type: ActionTypes.RESET_DATA,
});
