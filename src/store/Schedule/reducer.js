import produce from "immer";
import * as ActionTypes from "./constant";

// DEFAULT STATE
const status = { isLoading: false, isSuccess: false, isFailure: false };
const initialState = {
  listStatus: { ...status },
  actionStatus: { ...status },
  detailStatus: { ...status },
  list: [],
  detail: [],
  customer: null,
  factory: null,
  params: { limit: 10, page: 1 },
  meta: {
    total: 0,
  },
};

const scheduleReducer = (state = initialState, action) => {
  return produce(state, (draft) => {
    switch (action.type) {
      case ActionTypes.LIST:
        draft.listStatus.isLoading = true;
        draft.listStatus.isSuccess = false;
        draft.listStatus.isFailure = false;
        draft.params = action.params;
        break;

      case ActionTypes.LIST_SUCCESS:
        draft.listStatus.isLoading = false;
        draft.listStatus.isSuccess = true;
        draft.list = action.payload.data;
        draft.meta.total = action.payload.total;
        break;

      case ActionTypes.LIST_FAILED:
        draft.listStatus.isLoading = false;
        draft.listStatus.isFailure = true;
        draft.list = [];
        break;

      case ActionTypes.DETAIL:
        draft.actionStatus.isLoading = true;
        draft.actionStatus.isSuccess = false;
        draft.actionStatus.isFailure = false;
        break;

      case ActionTypes.DETAIL_SUCCESS:
        draft.actionStatus.isLoading = false;
        draft.actionStatus.isSuccess = true;
        draft.detail = action.payload;
        draft.customer = action.payload[0].customer;
        draft.factory = action.payload[0].factory;
        break;

      case ActionTypes.DETAIL_FAILED:
        draft.actionStatus.isLoading = false;
        draft.actionStatus.isFailure = true;
        break;

      case ActionTypes.CONFIRM_REMINDERCARE:
        draft.detailStatus.isLoading = true;
        draft.detailStatus.isSuccess = false;
        draft.detailStatus.isFailure = false;
        break;

      case ActionTypes.CONFIRM_REMINDERCARE_SUCCESS:
        draft.detailStatus.isLoading = false;
        draft.detailStatus.isSuccess = true;
        draft.list = state.list.map((item) =>
          item.id === action.payload.id ? { ...item, ...action.payload } : item
        );
        break;

      case ActionTypes.CONFIRM_REMINDERCARE_FAILED:
        draft.detailStatus.isLoading = false;
        draft.detailStatus.isFailure = true;
        break;

      case ActionTypes.CONFIRM_REMINDERCARE_DETAIL:
        draft.detailStatus.isLoading = true;
        draft.detailStatus.isSuccess = false;
        draft.detailStatus.isFailure = false;
        break;

      case ActionTypes.CONFIRM_REMINDERCARE_DETAIL_SUCCESS:
        draft.detailStatus.isLoading = false;
        draft.detailStatus.isSuccess = true;
        draft.detail = state.detail.map((item) =>
          item.id === action.payload.id ? { ...item, ...action.payload } : item
        );
        break;

      case ActionTypes.CONFIRM_REMINDERCARE_DETAIL_FAILED:
        draft.detailStatus.isLoading = false;
        draft.detailStatus.isFailure = true;
        break;

      case ActionTypes.CONFIRM_SCHEDULES:
        draft.detailStatus.isLoading = true;
        draft.detailStatus.isSuccess = false;
        draft.detailStatus.isFailure = false;
        break;

      case ActionTypes.CONFIRM_SCHEDULES_SUCCESS:
        draft.detailStatus.isLoading = false;
        draft.detailStatus.isSuccess = true;
        draft.list = state.list.map((item) =>
          item.id === action.payload.id ? { ...item, ...action.payload } : item
        );
        break;

      case ActionTypes.CONFIRM_SCHEDULES_FAILED:
        draft.detailStatus.isLoading = false;
        draft.detailStatus.isFailure = true;
        break;

      case ActionTypes.DESTROY_SCHEDULES:
        draft.detailStatus.isLoading = true;
        draft.detailStatus.isSuccess = false;
        draft.detailStatus.isFailure = false;
        break;

      case ActionTypes.DESTROY_SCHEDULES_SUCCESS:
        draft.detailStatus.isLoading = false;
        draft.detailStatus.isSuccess = true;
        draft.list = state.list.map((item) =>
          item.id === action.payload.id ? { ...item, ...action.payload } : item
        );
        break;

      case ActionTypes.DESTROY_SCHEDULES_FAILED:
        draft.detailStatus.isLoading = false;
        draft.detailStatus.isFailure = true;
        break;

      case ActionTypes.RESET_DATA:
        return initialState;

      default:
        return state;
    }
  });
};

export default scheduleReducer;
