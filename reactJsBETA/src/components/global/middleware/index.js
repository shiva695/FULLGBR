import { all, takeEvery } from "redux-saga/effects";
import actionTypes from "../redux/actionTypes";
import { getConfigSaga } from "./sagas/configSaga";

export default function* rootSaga() {
  yield all([takeEvery(actionTypes.CONFIG_GET_REQUEST, getConfigSaga)]);
}
