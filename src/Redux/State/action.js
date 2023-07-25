import axios from "axios";
import { toast } from "react-toastify";
import { getToken, deleteData as deleteSession } from "src/utils/sessionStorage";
import { filterUrl } from "../../utils/halper";
import {
  STATE_CREATE_FAILURE,
  STATE_CREATE_REQUEST,
  STATE_CREATE_SUCCESS,
  STATE_DELETE_FAILURE,
  STATE_DELETE_REQUEST,
  STATE_DELETE_SUCCESS,
  STATE_FETCHED_DATA_SUCCESS,
  STATE_GET_DROPDOWN_LIST,
  STATE_GET_FAILURE,
  STATE_LIST_REQUEST,
  STATE_SELECTED_IDS,
} from "./actionType";

const baseUrl = process.env.REACT_APP_API_URL;
export const createStateRequest = () => {
  return {
    type: STATE_CREATE_REQUEST,
  };
};

export const createStateSuccess = (payload) => {
  return {
    type: STATE_CREATE_SUCCESS,
    payload,
  };
};

export const createStateFailure = (payload) => {
  return {
    type: STATE_CREATE_FAILURE,
    payload,
  };
};
export const listStateRequest = (payload) => {
  return {
    type: STATE_LIST_REQUEST,
    payload,
  };
};
export const listStateSuccess = (payload) => {
  return {
    type: STATE_FETCHED_DATA_SUCCESS,
    payload,
  };
};
export const listStateFailure = (payload) => {
  return {
    type: STATE_GET_FAILURE,
    payload,
  };
};

export const listDropdownStateSuccess = (payload) => {
  return {
    type: STATE_GET_DROPDOWN_LIST,
    payload,
  };
};

export const create = (payload) => (dispatch) => {
  dispatch(createStateRequest());
  axios({
    method: "post",
    url: `${baseUrl}state/create`,
    data: payload,
    headers: {
      "x-access-token": getToken(),
    },
  })
    .then((res) => {
      dispatch(createStateSuccess(res.data.success));
      toast.success("Successfully create content");
    })
    .catch((err) => {
      dispatch(createStateFailure(err.message));
      if (err.response !== undefined && err.response.status === 400) {
        toast.error("Error while table entry!");
      } else if (err?.response && err?.response?.status === 401) {
        deleteSession('loginInfo')
        window.location.href='/login';
      } else {
        toast.error(err.message);
      }
    });
};

export const StateList = (payload) => (dispatch) => {
  dispatch(listStateRequest(payload));
  axios({
    method: "get",
    url: `${baseUrl}state/list${filterUrl(payload)}`,
    headers: {
      "x-access-token": getToken(),
    },
  }).then((res) => {
    if (payload.fetched === "All") {
      dispatch(listDropdownStateSuccess(res.data));
    } else {
      dispatch(listStateSuccess(res.data));
    }
  }).catch((err) => {
    dispatch(listStateFailure(err.message));
    if (err.response !== undefined && err.response.status === 500) {
      toast.error("Internal Server Error");
    } else if (err?.response && err?.response?.status === 401) {
      deleteSession('loginInfo')
      window.location.href='/login';
    } else {
      toast.error(err.message);
    }
  });
};

export const update = (payload) => (dispatch) => {
  dispatch(createStateRequest());
  axios({
    method: "put",
    url: `${baseUrl}state/update/${payload.id}`,
    data: payload,
    headers: {
      "x-access-token": getToken(),
    },
  })
    .then((res) => {
      dispatch(createStateSuccess(res.data.success));
      toast.success("Successfully update content");
    })
    .catch((err) => {
      dispatch(createStateFailure(err.message));
      if (err.response !== undefined && err.response.status === 500) {
        toast.error("Internal Server Error");
      } else if (err?.response && err?.response?.status === 401) {
        deleteSession('loginInfo')
        window.location.href='/login';
      } else {
        toast.error(err.message);
      }
    });
};

export const deleteData = (payload) => (dispatch) => {
  dispatch({ type: STATE_DELETE_REQUEST });
  axios({
    method: "put",
    url: `${baseUrl}state/delete`,
    data: { id: payload },
    headers: {
      "x-access-token": getToken(),
    },
  })
    .then((res) => {
      dispatch({ type: STATE_DELETE_SUCCESS, payload: res.data.success });
      toast.success("Successfully Deleted content");
    })
    .catch((err) => {
      dispatch({ type: STATE_DELETE_FAILURE, payload: err.message });
      if (err.response !== undefined && err.response.status === 500) {
        toast.error("Internal Server Error");
      } else if (err?.response && err?.response?.status === 401) {
        deleteSession('loginInfo')
        window.location.href='/login';
      } else {
        toast.error(err.message);
      }
    });
};

export const stateSelectedAction = (inputData) => (dispatch) => {
  dispatch({ type: STATE_SELECTED_IDS, payload: inputData.join(",") });
};
