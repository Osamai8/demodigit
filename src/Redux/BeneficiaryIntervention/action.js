import axios from "axios";
import { toast } from "react-toastify";
import { deleteData, getToken } from "src/utils/sessionStorage";
import { filterUrl } from "../../utils/halper";
import {
  BEN_INT_FETCHED_DATA_SUCCESS,
  BEN_INT_GET_FAILURE,
  BEN_INT_LIST_REQUEST
} from "./actionType";
const baseUrl = process.env.REACT_APP_API_URL;

export const listBenIntRequest = (payload) => {
  return {
    type: BEN_INT_LIST_REQUEST,
    payload,
  };
};

export const listBenIntSuccess = (payload) => {
  return {
    type: BEN_INT_FETCHED_DATA_SUCCESS,
    payload,
  };
};

export const listBenIntFailure = (payload) => {
  return {
    type: BEN_INT_GET_FAILURE,
    payload,
  };
};

export const benInterventionListAction = (payload) => (dispatch) => {
  dispatch(listBenIntRequest(payload));
  axios({
    method: "get",
    url: `${baseUrl}beneficiary-intervention/list${filterUrl(payload)}`,
    headers: {
      "x-access-token": getToken(),
    },
  }).then((res) => {
    dispatch(listBenIntSuccess(res.data));
  }).catch((err) => {
    dispatch(listBenIntFailure(err.message));
    if (err.response !== undefined && err.response.status === 500) {
      toast.error("Internal Server Error");
    } else if (err.response !== undefined && err.response.status === 400) {
      toast.error(err.response.data.message);
    } else if (err?.response && err?.response?.status === 401) {
      deleteData('loginInfo')
      window.location.href='/login';
    } else {
      toast.error(err.message);
    }
  });
};
