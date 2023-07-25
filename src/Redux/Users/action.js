import axios from "axios";
import { toast } from "react-toastify";
import { deleteData, getToken } from "src/utils/sessionStorage";
import { filterUrl } from "../../utils/halper";
import {
  USER_LIST_REQUEST,
  USER_LIST_SUCCESS,
  USER_LIST_FAILURE,
  USER_CREATE_REQUEST,
  USER_CREATE_SUCCESS,
  USER_CREATE_FAILURE,
  USER_UPDATE_REQUEST,
  USER_UPDATE_SUCCESS,
  USER_UPDATE_FAILURE,
  USER_DELETE_REQUEST,
  USER_DELETE_SUCCESS,
  USER_DELETE_FAILURE,
  USER_SELECTED_IDS,
} from "./actionType";

const baseUrl = process.env.REACT_APP_API_URL;

export const userListAction = (inputData) => async (dispatch) => {
  dispatch({ type: USER_LIST_REQUEST, payload: inputData });

  try {
    const { data } = await axios.get(
      `${baseUrl}user/list${filterUrl(inputData)}`,
      {
        headers: {
          "x-access-token": getToken(),
        },
      }
    );
    dispatch({ type: USER_LIST_SUCCESS, payload: data });
  } catch (err) {
    dispatch({
      type: USER_LIST_FAILURE,
      payload: err.response.data,
    });
    if (err.response !== undefined && err.response.status === 500) {
      toast.error("Internal Server Error");
    } else if (err.response !== undefined && err.response.status === 400) {
      toast.error(err.response.data.message);
    } else {
      toast.error(err.message);
    }
  }
};

export const userCreateAction = (inputData) => async (dispatch) => {
  dispatch({ type: USER_CREATE_REQUEST });

  try {
    const { data } = await axios.post(`${baseUrl}user/create`, inputData, {
      headers: { "x-access-token": getToken() },
    });
    dispatch({ type: USER_CREATE_SUCCESS, payload: data });
    toast.success("Successfully created content");
  } catch (err) {
    dispatch({
      type: USER_CREATE_FAILURE,
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

export const userUpdateAction = (inputData) => async (dispatch) => {
  dispatch({ type: USER_UPDATE_REQUEST });

  try {
    const { data } = await axios.put(
      `${baseUrl}user/update/${inputData.id}`,
      { name: inputData.name, sub_domain_id: inputData.sub_domain_id },
      {
        headers: { "x-access-token": getToken() },
      }
    );
    dispatch({ type: USER_UPDATE_SUCCESS, payload: data });
    toast.success("Successfully updated content");
  } catch (err) {
    dispatch({
      type: USER_UPDATE_FAILURE,
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

export const userDeleteAction = (inputData) => async (dispatch) => {
  dispatch({ type: USER_DELETE_REQUEST });

  try {
    const { data } = await axios.put(
      `${baseUrl}user/delete`,
      { id: inputData.id, is_deleted: inputData.isDeleted },
      {
        headers: { "x-access-token": getToken() },
      }
    );
    dispatch({ type: USER_DELETE_SUCCESS, payload: data });
  } catch (err) {
    dispatch({
      type: USER_DELETE_FAILURE,
      payload: err.response.data,
    });
    if (err.response !== undefined && err.response.status === 500) {
      toast.error("Internal Server Error");
    } else if (err.response !== undefined && err.response.status === 400) {
      toast.error(err.response.data.message);
    }  else if (err?.response && err?.response?.status === 401) {
      deleteData('loginInfo')
      window.location.href = '/login';
    }else {
      toast.error(err.message);
    }
  }
};

export const userSelectedAction = (inputData) => (dispatch) => {
  dispatch({ type: USER_SELECTED_IDS, payload: inputData.join(",") });
};
