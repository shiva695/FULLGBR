import createSagaMiddleware from "@redux-saga/core";
import { configureStore } from "@reduxjs/toolkit";
import { createLogger } from "redux-logger";
import rootReducers from "./rootReducers";
import rootSaga from "../middleware/index";
const sagaMiddleware = createSagaMiddleware();

const store = configureStore({
  reducer: rootReducers,
  middleware: [createLogger({ collapsed: true }), sagaMiddleware],
});

// Added line
sagaMiddleware.run(rootSaga);

export default store;
