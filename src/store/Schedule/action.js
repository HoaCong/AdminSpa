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

export const actionConfirmReminderCare = (payload, note) => ({
  type: ActionTypes.CONFIRM_REMINDERCARE,
  payload,
  note,
});

export const actionConfirmReminderCareSuccess = (payload) => ({
  type: ActionTypes.CONFIRM_REMINDERCARE_SUCCESS,
  payload,
});

export const actionConfirmReminderCareFailed = (error) => ({
  type: ActionTypes.CONFIRM_REMINDERCARE_FAILED,
  error,
});

export const resetData = () => ({
  type: ActionTypes.RESET_DATA,
});
