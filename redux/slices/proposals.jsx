import { createSlice } from "@reduxjs/toolkit";
// utils
import axios from "axios";
import { dispatch } from "../store";

// ----------------------------------------------------------------------
const initialState = {
  isLoading: false,
  error: null,
  data: [],
  details: [],
  connection:[],
};

const slice = createSlice({
  name: "proposals",
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
    createProposalsSuccess(state, action) {
      state.isLoading = false;
      state.error = null;
      state.data = action.payload;
    },

    getDetailsSuccess(state, action) {
      state.isLoading = false;
      state.error = null;
      if (action.payload !== null) {
        action.payload.reverse();
      }
      state.details = action.payload;
    },
    
    getConnectionSuccess(state, action) {
      state.isLoading = false;
      state.error = null;
      if (action.payload !== null) {
        action.payload.reverse();
      }
      state.connection = action.payload;
    },

    resetProposals: () => initialState,
  },
});

// Reducer
export default slice.reducer;

// Actions
export const { resetProposals, createProposalsSuccess } = slice.actions;

const machineURLForStripe = "http://192.168.18.8:4000/";

// add proposal
export function createProposals(data) {
  return async () => {
    dispatch(slice.actions.startLoading());
    try {
      const response = await axios.post(
        `${machineURLForStripe}proposal/post`,
        data
      );
      dispatch(slice.actions.createProposalsSuccess(response.data));
      return response?.data;
    } catch (error) {
      dispatch(slice.actions.hasError(error?.response?.data));
      return error?.response?.data;
    }
  };
}
// teacher get all its proposals
export function getAllProposals(id) {
  return async () => {
    dispatch(slice.actions.startLoading());
    try {
      const response = await axios.get(
        `${machineURLForStripe}proposal/findAll/${id}`
      );
      console.log(response?.data);
      await dispatch(slice.actions.getDetailsSuccess(response?.data?.data));
      return response?.data?.data;
    } catch (error) {
      console.log("in catch in login", error?.response?.data);
      dispatch(slice.actions.hasError(error?.response?.data));
      return error?.response?.data;
    }
  };
}
// update proposal
export function updateProposal(data, userId, tutionId) {
  return async () => {
    dispatch(slice.actions.startLoading());
    try {
      const response = await axios.put(
        `${machineURLForStripe}tution/update?tution=${tutionId}&user=${userId}`,
        data //fee,title
      );
      return response?.data;
    } catch (error) {
      console.log("in catch in login", error?.response?.data);
      dispatch(slice.actions.hasError(error?.response?.data));
      return error?.response?.data;
    }
  };
}
// see all connections
export function getAllConnections(status, userId) {
  return async () => {
    dispatch(slice.actions.startLoading());
    try {
      const response = await axios.get(
        `${machineURLForStripe}proposal/status?userId=${userId}&value=${status}`
      );
      console.log(response?.data?.data);
      await dispatch(slice.actions.getConnectionSuccess(response?.data?.data));
      return response?.data?.data;
    } catch (error) {
      console.log("in catch in login", error?.response?.data);
      dispatch(slice.actions.hasError(error?.response?.data));
      return error?.response?.data;
    }
  };
}