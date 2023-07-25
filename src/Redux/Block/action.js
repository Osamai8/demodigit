import axios from "axios";
import { toast } from "react-toastify";
import { deleteData, getToken } from "src/utils/sessionStorage";
import { filterUrl } from "../../utils/halper";
import {
  BLOCK_FETCHED_DATA_SUCCESS,
  BLOCK_GET_FAILURE,
  BLOCK_LIST_REQUEST,
  DELETE_BLOCK_REQUEST,
  DELETE_BLOCK_SUCCESS,
  DELETE_BLOCK_FAILURE,
  UPDATE_BLOCK_REQUEST,
  UPDATE_BLOCK_SUCCESS,
  UPDATE_BLOCK_FAILURE,
  CREATE_BLOCK_REQUEST,
  CREATE_BLOCK_SUCCESS,
  CREATE_BLOCK_FAILURE,
  BLOCK_SELECTED_IDS,
} from "../Block/actionType";

const baseUrl = process.env.REACT_APP_API_URL;

export const blockListAction = (inputData) => async (dispatch) => {
  dispatch({ type: BLOCK_LIST_REQUEST, payload: inputData });
  try {
    const { data } = await axios.get(
      `${baseUrl}block/list${filterUrl(inputData)}`,
      {
        headers: {
          "x-access-token": getToken(),
        },
      }
    );
    dispatch({ type: BLOCK_FETCHED_DATA_SUCCESS, payload: data });
  } catch (err) {
    dispatch({
      type: BLOCK_GET_FAILURE,
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

export const createBlockAction = (inputData) => async (dispatch) => {
  dispatch({ type: CREATE_BLOCK_REQUEST, payload: inputData });

  try {
    const { data } = await axios.post(`${baseUrl}block/create`, inputData, {
      headers: { "x-access-token": getToken() },
    });
    dispatch({ type: CREATE_BLOCK_SUCCESS, payload: data });
    toast.success("Successfully created");
  } catch (err) {
    dispatch({
      type: CREATE_BLOCK_FAILURE,
      payload: err.response.data,
    });
    if (err.response !== undefined && err.response.status === 500) {
      toast.error("Internal Server Error");
    } else if (err.response !== undefined && err.response.status === 400) {
      toast.error(err.response.data.message);
    }  else if (err?.response && err?.response?.status === 401) {
      deleteData('loginInfo')
      window.location.href='/login';
    }else {
      toast.error(err.message);
    }
  }
};

export const updateBlockAction = (inputData) => async (dispatch) => {
  dispatch({ type: UPDATE_BLOCK_REQUEST, payload: inputData });

  try {
    const { data } = await axios.put(
      `${baseUrl}block/update/${inputData.id}`,
      { name: inputData.name, district_id: inputData.district_id },
      {
        headers: { "x-access-token": getToken() },
      }
    );
    dispatch({ type: UPDATE_BLOCK_SUCCESS, payload: data });
    toast.success("Successfully updated");
  } catch (err) {
    dispatch({
      type: UPDATE_BLOCK_FAILURE,
      payload: err.response.data,
    });
    if (err.response !== undefined && err.response.status === 500) {
      toast.error("Internal Server Error");
    } else if (err.response !== undefined && err.response.status === 400) {
      toast.error(err.response.data.message);
    }  else if (err?.response && err?.response?.status === 401) {
      deleteData('loginInfo')
      window.location.href='/login';
    }else {
      toast.error(err.message);
    }
  }
};

export const deleteBlockAction = (ids) => async (dispatch) => {
  dispatch({ type: DELETE_BLOCK_REQUEST });

  try {
    const { data } = await axios.put(
      `${baseUrl}block/delete`,
      { id: ids },
      { headers: { "x-access-token": getToken() } }
    );
    dispatch({ type: DELETE_BLOCK_SUCCESS, payload: data });
    toast.success("Successfully Deleted content");
  } catch (err) {
    dispatch({
      type: DELETE_BLOCK_FAILURE,
      payload: err.response.data,
    });
    if (err.response !== undefined && err.response.status === 500) {
      toast.error("Internal Server Error");
    } else if (err?.response && err?.response?.status === 401) {
      deleteData('loginInfo')
      window.location.href='/login';
    } else if (err.response !== undefined && err.response.status === 400) {
      toast.error(err.response.data.message);
    } else {
      toast.error(err.message);
    }
  }
};

export const blockSelectedAction = (inputData) => (dispatch) => {
  dispatch({ type: BLOCK_SELECTED_IDS, payload: inputData.join(",") });
};
