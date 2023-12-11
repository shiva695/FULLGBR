import { combineReducers } from "redux";
import getConfigSlice from "./slices/configSlice";

//@import Constants
import { constant } from "../../../constants/reduxConstants";

const combineReducer = combineReducers({
  // Reducers here
  [`${constant.CONFIGSLICE}`]: getConfigSlice,
});

const rootReducers = (state, action) => {
  return combineReducer(state, action);
};
export default rootReducers;
