import axios from "axios";
import { toast } from "react-toastify";
import { deleteData, getToken } from "src/utils/sessionStorage";
import { filterUrl } from "../../utils/halper";
import {
  COMM_INT_FETCHED_DATA_SUCCESS,
  COMM_INT_GET_FAILURE,
  COMM_INT_LIST_REQUEST
} from "./actionType";
const baseUrl = process.env.REACT_APP_API_URL;

export const listCommunityIntRequest = (payload) => {
  return {
    type: COMM_INT_LIST_REQUEST,
    payload,
  };
};

export const listCommunityIntSuccess = (payload) => {
  return {
    type: COMM_INT_FETCHED_DATA_SUCCESS,
    payload,
  };
};

export const listCommunityIntFailure = (payload) => {
  return {
    type: COMM_INT_GET_FAILURE,
    payload,
  };
};

export const communityInterventionListAction = (payload) => (dispatch) => {
  dispatch(listCommunityIntRequest(payload));
  axios({
    method: "get",
    url: `${baseUrl}community-intervention/list${filterUrl(payload)}`,
    headers: {
      "x-access-token": getToken(),
    },
  }).then((res) => {
    dispatch(listCommunityIntSuccess(res.data));
  }).catch((err) => {
    dispatch(listCommunityIntFailure(err.message));
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
