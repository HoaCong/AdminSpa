import produce from "immer";
import * as ActionTypes from "./constant";

const status = {
  isLoading: false,
  isSuccess: false,
  isFailure: false,
};
// DEFAULT STATE
const initialState = {
  dashboardStatus: { ...status },
  dashboard: {
    overview: {
      totalRevenue: 0,
      totalBookings: 0,
      totalCustomers: 0,
      totalServices: 0,
    },
    statisticStatus: [
      {
        status: "DESTROYED",
        count: 0,
      },
      {
        status: "IN_PROCCESS",
        count: 0,
      },
      {
        status: "SUCCESS",
        count: 0,
      },
    ],
    listService: [],
  },
};

const dashboardReducer = (state = initialState, action) => {
  return produce(state, (draft) => {
    switch (action.type) {
      case ActionTypes.DASHBOARD:
        draft.dashboardStatus.isLoading = true;
        draft.dashboardStatus.isSuccess = false;
        draft.dashboardStatus.isFailure = false;
        break;

      case ActionTypes.DASHBOARD_SUCCESS:
        draft.dashboardStatus.isLoading = false;
        draft.dashboardStatus.isSuccess = true;
        draft.dashboard = action.payload;
        break;

      case ActionTypes.DASHBOARD_FAILED:
        draft.dashboardStatus.isLoading = false;
        draft.dashboardStatus.isFailure = true;
        draft.dashboard = {};
        break;

      default:
        return state;
    }
  });
};

export default dashboardReducer;
