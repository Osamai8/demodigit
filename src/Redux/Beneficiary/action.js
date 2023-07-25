import axios from "axios";
import { toast } from "react-toastify";
import { deleteData, getToken } from "src/utils/sessionStorage";
import { filterUrl } from "../../utils/halper";
import {
  BENEFICIARY_CREATE_FAILURE,
  BENEFICIARY_CREATE_REQUEST,
  BENEFICIARY_CREATE_SUCCESS,
  BENEFICIARY_DELETE_FAILURE,
  BENEFICIARY_DELETE_REQUEST,
  BENEFICIARY_DELETE_SUCCESS,
  BENEFICIARY_FETCHED_DATA_SUCCESS,
  BENEFICIARY_GET_FAILURE,
  BENEFICIARY_LIST_REQUEST,
  BENEFICIARY_SELECTED_IDS,
} from "./actionType";
const baseUrl = process.env.REACT_APP_API_URL;

export const createBeneficiaryRequest = () => {
  return {
    type: BENEFICIARY_CREATE_REQUEST,
  };
};

export const createBeneficiarySuccess = (payload) => {
  return {
    type: BENEFICIARY_CREATE_SUCCESS,
    payload,
  };
};

export const createBeneficiaryFailure = (payload) => {
  return {
    type: BENEFICIARY_CREATE_FAILURE,
    payload,
  };
};

export const listBeneficiaryRequest = (payload) => {
  return {
    type: BENEFICIARY_LIST_REQUEST,
    payload,
  };
};

export const listBeneficiarySuccess = (payload) => {
  return {
    type: BENEFICIARY_FETCHED_DATA_SUCCESS,
    payload,
  };
};

export const listBeneficiaryFailure = (payload) => {
  return {
    type: BENEFICIARY_GET_FAILURE,
    payload,
  };
};

export const createAction = (payload) => (dispatch) => {
  dispatch(createBeneficiaryRequest());
  axios({
    method: "post",
    url: `${baseUrl}beneficiary/create`,
    data: payload,
    headers: {
      "x-access-token": getToken(),
    },
  })
    .then((res) => {
      dispatch(createBeneficiarySuccess(res.data.success));
      toast.success("Successfully create content");
    })
    .catch((err) => {
      dispatch(createBeneficiaryFailure(err.message));
      if (err.response !== undefined && err.response.status === 500) {
        toast.error("Internal Server Error");
      } else if (err.response !== undefined && err.response.status === 400) {
        toast.error(err.response.data.message);
      } else if (err?.response && err?.response?.status === 401) {
        deleteData('loginInfo')
        window.location.href = '/login';
      } else {
        toast.error(err.message);
      }
    });
};

export const beneficiaryListAction = (payload) => (dispatch) => {
  dispatch(listBeneficiaryRequest(payload));
  axios({
    method: "get",
    url: `${baseUrl}beneficiary/list${filterUrl(payload)}`,
    headers: {
      "x-access-token": getToken(),
    },
  })
    .then((res) => {
      dispatch(listBeneficiarySuccess(res.data));
    })
    .catch((err) => {
      dispatch(listBeneficiaryFailure(err.message));
      if (err.response !== undefined && err.response.status === 500) {
        toast.error("Internal Server Error");
      } else if (err.response !== undefined && err.response.status === 400) {
        toast.error(err.response.data.message);
      } else if (err?.response && err?.response?.status === 401) {
        deleteData('loginInfo')
        window.location.href = '/login';
      } else {
        toast.error(err.message);
      }
    });
};

export const updateAction = (payload) => (dispatch) => {
  dispatch(createBeneficiaryRequest());
  axios({
    method: "put",
    url: `${baseUrl}beneficiary/update/${payload?.id}`,
    data: payload,
    headers: {
      "x-access-token": getToken(),
    },
  })
    .then((res) => {
      dispatch(createBeneficiarySuccess(res.data.success));
      toast.success("Successfully update content");
    })
    .catch((err) => {
      dispatch(createBeneficiaryFailure(err.message));
      if (err.response !== undefined && err.response.status === 500) {
        toast.error("Internal Server Error");
      } else if (err.response !== undefined && err.response.status === 400) {
        toast.error(err.response.data.message);
      } else if (err?.response && err?.response?.status === 401) {
        deleteData('loginInfo')
        window.location.href = '/login';
      } else {
        toast.error(err.message);
      }
    });
};

export const deleteDataAction = (payload) => (dispatch) => {
  dispatch({ type: BENEFICIARY_DELETE_REQUEST });
  axios({
    method: "put",
    url: `${baseUrl}beneficiary/delete`,
    data: { id: payload.id, is_deleted: payload.isDeleted },
    headers: {
      "x-access-token": getToken(),
    },
  })
    .then((res) => {
      dispatch({ type: BENEFICIARY_DELETE_SUCCESS, payload: res.data.success });
    })
    .catch((err) => {
      dispatch({ type: BENEFICIARY_DELETE_FAILURE, payload: err.message });
      if (err.response !== undefined && err.response.status === 500) {
        toast.error("Internal Server Error");
      } else if (err?.response && err?.response?.status === 401) {
        deleteData('loginInfo')
        window.location.href = '/login';
      } else if (err.response !== undefined && err.response.status === 400) {
        toast.error(err.response.data.message);
      } else {
        toast.error(err.message);
      }
    });
};

export const beneficiarySelectedAction = (inputData) => (dispatch) => {
  dispatch({ type: BENEFICIARY_SELECTED_IDS, payload: inputData.join(",") });
};
