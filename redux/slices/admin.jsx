import { createSlice } from "@reduxjs/toolkit";
// utils
import axios from "axios";
import { dispatch } from "../store";

// ----------------------------------------------------------------------
const initialState = {
  isLoading: false,
  error: null,
  data: [],
  sum: [],
  commission:null,
};

const slice = createSlice({
  name: "Admin",
  initialState,
  reducers: {
    // START LOADING
    startLoading(state) {
      state.isLoading = true;
    },

    // HAS ERROR
    hasError(state, action) {
      state.isLoading = false;
      state.error = action.payload;
    },

    // GET EVENTS
    getUserSuccess(state, action) {
      state.isLoading = false;
      state.error = null;
      state.data = action.payload;
    },

    getSumSuccess(state, action) {
      state.isLoading = false;
      state.error = null;
      state.sum = action.payload;
    },

    getCommissionSuccess(state, action) {
      state.isLoading = false;
      state.error = null;
      state.commission = action.payload;
    },

    updateCommissionSuccess(state, action) {
      state.isLoading = false;
      state.error = null;
      state.commission.data[0].percentage = action.payload.data.percentage;
    },

    resetAdmin: () => initialState,
  },
});

// Reducer
export default slice.reducer;

// Actions
export const { resetAdmin } = slice.actions;

const machineURLForStripe = "http://192.168.18.8:4000/";
// get all teachers or students
export function getUser(user, id) {
  return async () => {
    dispatch(slice.actions.startLoading());

    try {
      const response = await axios.get(
        `${machineURLForStripe}user/get?value=${user}&id=${id}`
      );
      dispatch(slice.actions.getUserSuccess(response.data));
      return response?.data;
    } catch (error) {
      dispatch(slice.actions.hasError(error?.response?.data));
      return error?.response?.data;
    }
  };
}
// commission update
export function updateCommission(data) {
  return async () => {
    try {
      const response = await axios.put(
        `${machineURLForStripe}commision/update`,
        data //percentage,email of admin
      );
      dispatch(slice.actions.updateCommissionSuccess(response.data));
      return response?.data;
    } catch (error) {
      dispatch(slice.actions.hasError(error?.response?.data));
      return error?.response?.data;
    }
  };
}
// sum of teacher or students
export function sumOfUsers(value, id) {
  return async () => {
    dispatch(slice.actions.startLoading());
    try {
      const response = await axios.get(
        `${machineURLForStripe}commision/sum?value=${value}&id=${id}`
      );
      dispatch(slice.actions.getSumSuccess(response.data));
      return response.data;
    } catch (error) {
      dispatch(slice.actions.hasError(error?.response?.data));
      return error?.response?.data;
    }
  };
}
// commision/get
export function getCommission() {
  return async () => {
    try {
      const response = await axios.get(`${machineURLForStripe}commision/get`);
      dispatch(slice.actions.getCommissionSuccess(response.data));
      return response?.data;
    } catch (error) {
      dispatch(slice.actions.hasError(error?.response?.data));
      return error?.response?.data;
    }
  };
}
