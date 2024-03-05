import { createSlice } from "@reduxjs/toolkit";
// utils
import axios from "axios";
import { dispatch } from "../store";

// ----------------------------------------------------------------------

const initialState = {
  error: null,
  user: null,
  signup: null,
  all: null,
  allFT: null,
  isLoader: false
};

const slice = createSlice({
  name: "auth",
  initialState,
  reducers: {
    // START LOADING
    startLoader(state) {
      state.isLoader = true;
    },

    // HAS ERROR
    hasError(state, action) {
      state.isLoader = false;
      state.error = action.payload;
    },

    // GET EVENTS
    getSigninSuccess(state, action) {
      state.isLoader = false;
      state.error = null;
      state.user = action.payload;
    },

    getSignUpSuccess(state, action) {
      state.isLoader = false;
      state.error = null;
      state.signup = action.payload;
    },

    resetAuth: () => initialState
  }
});

// Reducer
export default slice.reducer;

// Actions
export const { getSigninSuccess, resetAuth } = slice.actions;

// ----------------------------------------------------------------------

const machineURLForStripe = "http://192.168.18.8:4000/";

export function signIn(user) {
  return async () => {
    dispatch(slice.actions.startLoader());

    try {
      const response = await axios.post(
        `${machineURLForStripe}user/login`,
        user
      );
      dispatch(slice.actions.getSigninSuccess(response.data));
      return response?.data;
    } catch (error) {
      dispatch(slice.actions.hasError(error?.response?.data));
      return error?.response?.data;
    }
  };
}

export function signUp(user) {
  return async () => {
    dispatch(slice.actions.startLoader());

    try {
      const response = await axios.post(
        `${machineURLForStripe}user/register`,
        user
      );
      dispatch(slice.actions.getSignUpSuccess(response.data));
      return response?.data;
    } catch (error) {
      dispatch(slice.actions.hasError(error?.response?.data));
      return error?.response?.data;
    }
  };
}
