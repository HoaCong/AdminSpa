import * as ActionTypes from "./constant";

export const actionGet = () => ({
  type: ActionTypes.GET,
});

export const actionGetSuccess = (payload) => ({
  type: ActionTypes.GET_SUCCESS,
  payload,
});

export const actionGetFailed = (error) => ({
  type: ActionTypes.GET_FAILED,
  error,
});

export const actionUpdate = (params) => ({
  type: ActionTypes.UPDATE,
  params,
});

export const actionUpdateSuccess = (payload) => ({
  type: ActionTypes.UPDATE_SUCCESS,
  payload,
});

export const actionUpdateFailed = (error) => ({
  type: ActionTypes.UPDATE_FAILED,
  error,
});

export const resetData = () => ({
  type: ActionTypes.RESET_DATA,
});
