import { createSlice } from "@reduxjs/toolkit";
// utils
import axios from "axios";
import { dispatch } from "../store";

// ----------------------------------------------------------------------

const initialState = {
  isLoading: false,
  error: null,
  allRequests: [],
  isLoader: false,
  details: [],
  proposal: [],
  createRequest: null,
  accept: [],
  reject: [],
};

const slice = createSlice({
  name: "request",
  initialState,
  reducers: {
    // START LOADING
    startLoading(state) {
      state.isLoading = true;
    },

    startLoader(state) {
      state.isLoader = true;
    },

    // HAS ERROR
    hasError(state, action) {
      state.isLoading = false;
      state.error = action.payload;
    },

    // GET EVENTS
    getRequestsSuccess(state, action) {
      state.isLoading = false;
      state.error = null;
      if (action.payload !== null) {
        action.payload.reverse();
      }
      state.allRequests = action.payload;
    },

    // GET EVENTS
    getDetailsSuccess(state, action) {
      state.isLoading = false;
      state.error = null;
      if (action.payload !== null) {
        action.payload.reverse();
      }
      state.details = action.payload;
    },

    // GET EVENTS
    createRequestsuccess(state, action) {
      state.isLoading = false;
      state.error = null;
      state.createRequest = action.payload;
    },

    deleteRequestsuccess(state, action) {
      state.isLoading = false;
      state.error = null;
      state.allRequests = state.allRequests.filter(
        (item) => item._id !== action.payload
      );
    },

    allProposalsSuccess(state, action) {
      state.isLoading = false;
      state.error = null;
      if (action.payload !== null) {
        action.payload.reverse();
      }
      state.proposal = action.payload;
    },

    acceptSuccess(state, action) {
      state.isLoading = false;
      state.error = null;
      state.accept = action.payload;
      const foundProposal = state.proposal.find(
        (proposal) => proposal._id === action.payload._id
      );
      if (foundProposal) {
        foundProposal.status = "accepted";
      }
    },

    rejectSuccess(state, action) {
      state.isLoading = false;
      state.error = null;
      state.reject = action.payload;
      const foundProposal = state.proposal.find(
        (proposal) => proposal._id === action.payload._id
      );
      if (foundProposal) {
        foundProposal.status = "rejected";
      }
    },

    resetRequests: () => initialState,
  },
});

// Reducer
export default slice.reducer;

// Actions
export const { getRequestsSuccess, resetRequests } = slice.actions;

// ----------------------------------------------------------------------

const machineURLForStripe = "http://192.168.18.8:4000/";
// get tution of user
export function getAllRequests(id) {
  return async () => {
    dispatch(slice.actions.startLoading());
    try {
      const response = await axios.get(
        `${machineURLForStripe}tution/get/${id}`
      );
      // console.log(res);
      dispatch(slice.actions.getRequestsSuccess(response.data.data));
      return response?.data?.data;
    } catch (error) {
      dispatch(slice.actions.hasError(error?.response?.data));
      return error?.response?.data;
    }
  };
}
// get all tutions
export function getAllReqData() {
  return async () => {
    dispatch(slice.actions.startLoading());
    try {
      const response = await axios.get(`${machineURLForStripe}tution/get`);
      await dispatch(slice.actions.getDetailsSuccess(response?.data?.data));
      return response?.data?.data;
    } catch (error) {
      dispatch(slice.actions.hasError(error?.response?.data));
      return error?.response?.data;
    }
  };
}
// request create
export function createRequest(data) {
  return async () => {
    dispatch(slice.actions.startLoading());
    try {
      const response = await axios.post(
        `${machineURLForStripe}tution/post`,
        data
      );
      dispatch(slice.actions.createRequestsuccess(response.status));
      return response?.status;
    } catch (error) {
      dispatch(slice.actions.hasError(error?.response?.data));
      return error?.response?.data;
    }
  };
}
// delete request
export function deleteRequest(id) {
  return async () => {
    dispatch(slice.actions.startLoading());
    try {
      const response = await axios.delete(
        `${machineURLForStripe}tution/delete/${id}`
      );
      await dispatch(slice.actions.deleteRequestsuccess(id));
      return response?.status;
    } catch (error) {
      dispatch(slice.actions.hasError(error?.response?.data));
      return error?.response?.data;
    }
  };
}
//update tutions
export function updateTution(data, userId, tutionId) {
  return async () => {
    dispatch(slice.actions.startLoading());
    try {
      const response = await axios.get(
        `${machineURLForStripe}proposal/update?userId=${userId}&tutionId=${tutionId}`,
        data
      );
      return response?.data;
    } catch (error) {
      console.log("in catch in login", error?.response?.data);
      dispatch(slice.actions.hasError(error?.response?.data));
      return error?.response?.data;
    }
  };
}
// get all proposals for student
export function getAllProposals(id) {
  return async () => {
    dispatch(slice.actions.startLoading());
    try {
      const response = await axios.get(
        `${machineURLForStripe}proposal/findAll/${id}`
      );
      await dispatch(slice.actions.allProposalsSuccess(response?.data?.data));
      return response?.data?.data;
    } catch (error) {
      console.log("in catch in login", error?.response?.data);
      dispatch(slice.actions.hasError(error?.response?.data));
      return error?.response?.data;
    }
  };
}
// put status to accepted
export function statusAccept(data) {
  return async () => {
    dispatch(slice.actions.startLoading());
    try {
      const response = await axios.put(
        `${machineURLForStripe}proposal/accept`,
        data
      );
      console.log('response', response?.data);
      await dispatch(slice.actions.acceptSuccess(response?.data?.data));
      return response?.data?.data;
    } catch (error) {
      console.log("in catch in login", error?.response?.data);
      dispatch(slice.actions.hasError(error?.response?.data));
      return error?.response?.data;
    }
  };
}
// put status to rejected
export function statusReject(data) {
  return async () => {
    dispatch(slice.actions.startLoading());
    try {
      const response = await axios.put(
        `${machineURLForStripe}proposal/reject`,
        data
      );
      console.log('response',response?.data?.newProposal);
      await dispatch(slice.actions.rejectSuccess(response?.data?.newProposal));
      return response?.data?.data;
    } catch (error) {
      console.log("in catch in login", error?.response?.data);
      dispatch(slice.actions.hasError(error?.response?.data));
      return error?.response?.data;
    }
  };
}
