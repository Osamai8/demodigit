import axios from "axios";
import { toast } from "react-toastify";
import { deleteData, getToken } from "src/utils/sessionStorage";
import { filterUrl } from "../../utils/halper";
import {
  DOMAIN_LIST_REQUEST,
  DOMAIN_DROPDOWN_SUCCESS,
  DOMAIN_LIST_SUCCESS,
  DOMAIN_LIST_FAILURE,
  DOMAIN_DLELETE_REQUEST,
  DOMAIN_DLELETE_SUCCESS,
  DOMAIN_DLELETE_FAILURE,
  DOMAIN_CREATE_REQUEST,
  DOMAIN_CREATE_SUCCESS,
  DOMAIN_CREATE_FAILURE,
  DOMAIN_UPDATE_REQUEST,
  DOMAIN_UPDATE_SUCCESS,
  DOMAIN_UPDATE_FAILURE,
  DOMAIN_SELECTED_IDS,
} from "./actionType";

const baseUrl = process.env.REACT_APP_API_URL;

export const domainListAction = (inputData) => async (dispatch) => {
  dispatch({ type: DOMAIN_LIST_REQUEST, payload: inputData });

  try {
    const { data } = await axios.get(
      `${baseUrl}domain/list${filterUrl(inputData)}`,
      {
        headers: {
          "x-access-token": getToken(),
        },
      }
    );
    if (inputData?.fetched && inputData.fetched === "All") {
      dispatch({ type: DOMAIN_DROPDOWN_SUCCESS, payload: data });
    } else {
      dispatch({ type: DOMAIN_LIST_SUCCESS, payload: data });
    }
  } catch (err) {
    dispatch({
      type: DOMAIN_LIST_FAILURE,
      payload: err?.response?.data?.message,
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

export const domainCreateAction = (inputData) => async (dispatch) => {
  dispatch({ type: DOMAIN_CREATE_REQUEST });

  try {
    const { data } = await axios.post(`${baseUrl}domain/create`, inputData, {
      headers: { "x-access-token": getToken() },
    });
    dispatch({ type: DOMAIN_CREATE_SUCCESS, payload: data });
    toast.success("Successfully created");
  } catch (err) {
    dispatch({
      type: DOMAIN_CREATE_FAILURE,
      payload: err.response.data.message,
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

export const domainUpdateAction = (inputData) => async (dispatch) => {
  dispatch({ type: DOMAIN_UPDATE_REQUEST });

  try {
    const { data } = await axios.put(
      `${baseUrl}domain/update/${inputData.id}`,
      { name: inputData.name },
      {
        headers: { "x-access-token": getToken() },
      }
    );
    dispatch({ type: DOMAIN_UPDATE_SUCCESS, payload: data });
    toast.success("Successfully updated");
  } catch (err) {
    dispatch({
      type: DOMAIN_UPDATE_FAILURE,
      payload: err.response.data.message,
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

export const deleteDomainAction = (inputData) => async (dispatch) => {
  dispatch({ type: DOMAIN_DLELETE_REQUEST });

  try {
    const { data } = await axios.put(
      `${baseUrl}domain/delete`,
      { id: inputData.id, is_deleted: inputData.isDeleted },
      {
        headers: { "x-access-token": getToken() },
      }
    );
    dispatch({ type: DOMAIN_DLELETE_SUCCESS, payload: data });
  } catch (err) {
    dispatch({
      type: DOMAIN_DLELETE_FAILURE,
      payload: err.response.data.message,
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

export const domainSelectedAction = (inputData) => (dispatch) => {
  dispatch({ type: DOMAIN_SELECTED_IDS, payload: inputData.join(",") });
};
