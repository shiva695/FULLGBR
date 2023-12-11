import { call, put } from "redux-saga/effects";
import {
  getConfigErrorAction,
  getConfigSuccessAction,
} from "../../redux/slices/configSlice";
import { apiList, invokeApi } from "../../../../utills/apiService";
import { config } from "../../../../utills/configUtils";

export const getConfigSaga = function* (action) {
  try {
    let response = yield call(() =>
      invokeApi(
        config.baseUrl + apiList.getConfigData,
        action.params,
        action.cookies
      )
    );
    if (response.customcode === 200) {
      yield put(getConfigSuccessAction(response.data));
    }
  } catch (error) {
    yield put(getConfigErrorAction(error));
  }
};
