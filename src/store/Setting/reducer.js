import produce from "immer";
import * as ActionTypes from "./constant";

// DEFAULT STATE
const status = { isLoading: false, isSuccess: false, isFailure: false };
const initialState = {
  dataStatus: { ...status },
  actionStatus: { ...status },
  data: [],
};

const settingReducer = (state = initialState, action) => {
  return produce(state, (draft) => {
    switch (action.type) {
      case ActionTypes.GET:
        draft.dataStatus.isLoading = true;
        draft.dataStatus.isSuccess = false;
        draft.dataStatus.isFailure = false;
        break;

      case ActionTypes.GET_SUCCESS:
        draft.dataStatus.isLoading = false;
        draft.dataStatus.isSuccess = true;
        draft.data = action.payload.data;
        break;

      case ActionTypes.GET_FAILED:
        draft.dataStatus.isLoading = false;
        draft.dataStatus.isFailure = true;
        draft.data = [];
        break;

      case ActionTypes.UPDATE:
        draft.actionStatus.isLoading = true;
        draft.actionStatus.isSuccess = false;
        draft.actionStatus.isFailure = false;
        break;

      case ActionTypes.UPDATE_SUCCESS:
        draft.actionStatus.isLoading = false;
        draft.actionStatus.isSuccess = true;
        draft.data = action.payload;
        break;

      case ActionTypes.UPDATE_FAILED:
        draft.actionStatus.isLoading = false;
        draft.actionStatus.isFailure = true;
        break;

      case ActionTypes.RESET_DATA:
        return initialState;

      default:
        return state;
    }
  });
};

export default settingReducer;
