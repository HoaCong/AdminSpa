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
  statistics: {
    IN_PROCCESS: 0,
    SUCCESS: 0,
    DESTROYED: 0,
  },
};

const bookingDetailReducer = (state = initialState, action) => {
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
        draft.statistics = action.payload.statistics;
        break;

      case ActionTypes.LIST_FAILED:
        draft.listStatus.isLoading = false;
        draft.listStatus.isFailure = true;
        draft.list = [];
        draft.statistics = {
          IN_PROCCESS: 0,
          SUCCESS: 0,
          DESTROYED: 0,
        };
        break;

      case ActionTypes.CONFIRM_BOOKINGDETAIL:
        draft.detailStatus.isLoading = true;
        draft.detailStatus.isSuccess = false;
        draft.detailStatus.isFailure = false;
        break;

      case ActionTypes.CONFIRM_BOOKINGDETAIL_SUCCESS:
        draft.detailStatus.isLoading = false;
        draft.detailStatus.isSuccess = true;
        draft.list = state.list.map((item) =>
          item.id === action.payload.idbookingdetail
            ? {
                ...item,
                dataSchedule: item.dataSchedule.map((element) =>
                  element.id === action.payload.id ? action.payload : element
                ),
              }
            : item
        );
        break;

      case ActionTypes.CONFIRM_BOOKINGDETAIL_FAILED:
        draft.detailStatus.isLoading = false;
        draft.detailStatus.isFailure = true;
        break;

      case ActionTypes.DESTROY_BOOKINGDETAIL:
        draft.detailStatus.isLoading = true;
        draft.detailStatus.isSuccess = false;
        draft.detailStatus.isFailure = false;
        break;

      case ActionTypes.DESTROY_BOOKINGDETAIL_SUCCESS:
        draft.detailStatus.isLoading = false;
        draft.detailStatus.isSuccess = true;
        draft.list = state.list.map((item) =>
          item.id === action.payload.idbookingdetail
            ? {
                ...item,
                status: "DESTROYED",
                dataSchedule: item.dataSchedule.map((element) =>
                  element.status === "IN_PROCCESS"
                    ? {
                        ...element,
                        status: "DESTROYED",
                        note: action.payload.note,
                      }
                    : element
                ),
              }
            : item
        );
        break;

      case ActionTypes.DESTROY_BOOKINGDETAIL_FAILED:
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

export default bookingDetailReducer;
