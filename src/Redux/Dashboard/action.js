import axios from "axios";
import {
  LIST_REQUEST,
  FETCHED_DATA_SUCCESS,
  GET_FAILURE,
} from "../Dashboard/actionType";
import { deleteData, getToken } from "src/utils/sessionStorage";
import { toast } from "react-toastify";
import { filterUrl } from "../../utils/halper";

const baseUrl = process.env.REACT_APP_API_URL;
export const listRequest = (payload) => {
  return {
    type: LIST_REQUEST,
    payload,
  };
};
export const listSuccess = (payload) => {
  return {
    type: FETCHED_DATA_SUCCESS,
    payload,
  };
};
export const listFailure = (payload) => {
  return {
    type: GET_FAILURE,
    payload,
  };
};

export const geographyWiseWaterSuppyList = (payload) => (dispatch) => {
  dispatch(listRequest(payload));
  axios({
    method: "get",
    url: `${baseUrl}state-wise-data${filterUrl(payload)}`,
    headers: {
      "x-access-token": getToken(),
    },
  })
    .then((res) => {
      dispatch(listSuccess(res.data));
    })
    .catch((err) => {
      dispatch(listFailure(err.message));
      if (err.response !== undefined && err.response.status == 400) {
        toast.error("Error while table entry!");
      } else if (err.response !== undefined && err.response.status == 500) {
        toast.error("Internal Server Error");
      } else if (err?.response && err?.response?.status === 401) {
        deleteData('loginInfo')
        window.location.href = '/login';
      } else {
        toast.error(err.message);
      }
    });
};
