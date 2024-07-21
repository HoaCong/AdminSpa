import * as ActionTypes from "./constant";

export const actionDashboard = () => ({
  type: ActionTypes.DASHBOARD,
});

export const actionDashboardSuccess = (payload) => ({
  type: ActionTypes.DASHBOARD_SUCCESS,
  payload,
});

export const actionDashboardFailed = (error) => ({
  type: ActionTypes.DASHBOARD_FAILED,
  error,
});
