import axios from "axios";
import { toast } from "react-toastify";
import { deleteData, getToken } from "src/utils/sessionStorage";
import { filterUrl } from "../../utils/halper";
import {
  STREAM_LIST_REQUEST,
  STREAM_DROPDOWN_SUCCESS,
  STREAM_LIST_SUCCESS,
  STREAM_LIST_FAILURE,
  STREAM_DLELETE_REQUEST,
  STREAM_DLELETE_SUCCESS,
  STREAM_DLELETE_FAILURE,
  STREAM_CREATE_REQUEST,
  STREAM_CREATE_SUCCESS,
  STREAM_CREATE_FAILURE,
  STREAM_UPDATE_REQUEST,
  STREAM_UPDATE_SUCCESS,
  STREAM_UPDATE_FAILURE,
  STREAM_SELECTED_IDS,
} from "./actionType";

const baseUrl = process.env.REACT_APP_API_URL;

export const streamListAction = (inputData) => async (dispatch) => {
  dispatch({ type: STREAM_LIST_REQUEST, payload: inputData });

  try {
    const { data } = await axios.get(
      `${baseUrl}stream/list${filterUrl(inputData)}`,
      {
        headers: {
          "x-access-token": getToken(),
        },
      }
    );
    if (inputData?.fetched && inputData.fetched === "All") {
      dispatch({ type: STREAM_DROPDOWN_SUCCESS, payload: data });
    } else {
      dispatch({ type: STREAM_LIST_SUCCESS, payload: data });
    }
  } catch (err) {
    dispatch({
      type: STREAM_LIST_FAILURE,
      payload: err.response.data,
    });
  }
};

export const streamCreateAction = (inputData) => async (dispatch) => {
  dispatch({ type: STREAM_CREATE_REQUEST });

  try {
    const { data } = await axios.post(`${baseUrl}stream/create`, inputData, {
      headers: { "x-access-token": getToken() },
    });
    dispatch({ type: STREAM_CREATE_SUCCESS, payload: data });
    toast.success("Successfully created");
  } catch (err) {
    dispatch({
      type: STREAM_CREATE_FAILURE,
      payload: err.response.data,
    });
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
  }
};

export const streamUpdateAction = (inputData) => async (dispatch) => {
  dispatch({ type: STREAM_UPDATE_REQUEST });

  try {
    const { data } = await axios.put(
      `${baseUrl}stream/update/${inputData.id}`,
      { name: inputData.name, sub_domain_id: inputData.sub_domain_id },
      {
        headers: { "x-access-token": getToken() },
      }
    );
    dispatch({ type: STREAM_UPDATE_SUCCESS, payload: data });
    toast.success("Successfully update");
  } catch (err) {
    dispatch({
      type: STREAM_UPDATE_FAILURE,
      payload: err.response.data,
    });
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
  }
};

export const streamDeleteAction = (inputData) => async (dispatch) => {
  dispatch({ type: STREAM_DLELETE_REQUEST });

  try {
    const { data } = await axios.put(
      `${baseUrl}stream/delete`,
      { id: inputData.id, is_deleted: inputData.isDeleted },
      {
        headers: { "x-access-token": getToken() },
      }
    );
    dispatch({ type: STREAM_DLELETE_SUCCESS, payload: data });
  } catch (err) {
    dispatch({
      type: STREAM_DLELETE_FAILURE,
      payload: err.response.data,
    });
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
  }
};

export const streamSelectedAction = (inputData) => (dispatch) => {
  dispatch({ type: STREAM_SELECTED_IDS, payload: inputData.join(",") });
};
