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

export const actionConfirmBookingDetail = (payload, note) => ({
  type: ActionTypes.CONFIRM_BOOKINGDETAIL,
  payload,
  note,
});

export const actionConfirmBookingDetailSuccess = (payload) => ({
  type: ActionTypes.CONFIRM_BOOKINGDETAIL_SUCCESS,
  payload,
});

export const actionConfirmBookingDetailFailed = (error) => ({
  type: ActionTypes.CONFIRM_BOOKINGDETAIL_FAILED,
  error,
});

export const actionDestroyBookingDetail = (payload, note) => ({
  type: ActionTypes.DESTROY_BOOKINGDETAIL,
  payload,
  note,
});

export const actionDestroyBookingDetailSuccess = (payload) => ({
  type: ActionTypes.DESTROY_BOOKINGDETAIL_SUCCESS,
  payload,
});

export const actionDestroyBookingDetailFailed = (error) => ({
  type: ActionTypes.DESTROY_BOOKINGDETAIL_FAILED,
  error,
});

export const resetData = () => ({
  type: ActionTypes.RESET_DATA,
});
