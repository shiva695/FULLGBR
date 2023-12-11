//@Import Dependencies
import { createSlice } from "@reduxjs/toolkit";

//@import Constants
import { constant } from "../../../../constants/reduxConstants";

export const getConfigSlice = createSlice({
  name: constant.CONFIGSLICE,
  initialState: {
    data: null,
    isLoading: false,
    errors: "",
  },
  reducers: {
    getConfigRequestAction: (state) => {
      state.isLoading = true;
      state.errors = "";
    },
    getConfigSuccessAction: (state, action) => {
      state.isLoading = false;
      state.data = action.payload;
    },
    getConfigErrorAction: (state, action) => {
      state.isLoading = false;
      state.errors = action.error;
    },
  },
});

export const {
  getConfigRequestAction,
  getConfigSuccessAction,
  getConfigErrorAction,
} = getConfigSlice.actions;
export default getConfigSlice.reducer;
