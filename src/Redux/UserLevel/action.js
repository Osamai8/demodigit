import axios from "axios";
import { getToken } from "src/utils/sessionStorage";
import { filterUrl } from "../../utils/halper";
import {
  USERLEVEL_LIST_REQUEST,
  USERLEVEL_LIST_SUCCESS,
  USERLEVEL_LIST_FAILURE,
  USERLEVEL_CREATE_REQUEST,
  USERLEVEL_CREATE_SUCCESS,
  USERLEVEL_CREATE_FAILURE,
  USERLEVEL_UPDATE_REQUEST,
  USERLEVEL_UPDATE_SUCCESS,
  USERLEVEL_UPDATE_FAILURE,
  USERLEVEL_DELETE_REQUEST,
  USERLEVEL_DELETE_SUCCESS,
  USERLEVEL_DELETE_FAILURE,
} from "./actionType";

const baseUrl = process.env.REACT_APP_API_URL;

export const userLevelListAction = (inputData) => async (dispatch) => {
  dispatch({ type: USERLEVEL_LIST_REQUEST });

  try {
    const { data } = await axios.get(
      `${baseUrl}userlevel/list${filterUrl(inputData)}`,
      {
        headers: {
          "x-access-token": getToken(),
        },
      }
    );
    dispatch({ type: USERLEVEL_LIST_SUCCESS, payload: data });
  } catch (error) {
    if (error.response) {
      dispatch({
        type: USERLEVEL_LIST_FAILURE,
        payload: error.response.data,
      });
    } else {
      dispatch({ type: USERLEVEL_LIST_FAILURE, payload: error.message });
    }
  }
};

export const userLevelCreateAction = (inputData) => async (dispatch) => {
  dispatch({ type: USERLEVEL_CREATE_REQUEST });

  try {
    const { data } = await axios.post(`${baseUrl}userlevel/create`, inputData, {
      headers: { "x-access-token": getToken() },
    });
    dispatch({ type: USERLEVEL_CREATE_SUCCESS, payload: data });
  } catch (error) {
    if (error.response) {
      dispatch({
        type: USERLEVEL_CREATE_FAILURE,
        payload: error.response.data,
      });
    } else {
      dispatch({ type: USERLEVEL_CREATE_FAILURE, payload: error.message });
    }
  }
};

export const userLevelUpdateAction = (inputData) => async (dispatch) => {
  dispatch({ type: USERLEVEL_UPDATE_REQUEST });

  try {
    const { data } = await axios.put(
      `${baseUrl}userlevel/update/${inputData.id}`,
      { name: inputData.name, sub_domain_id: inputData.sub_domain_id },
      {
        headers: { "x-access-token": getToken() },
      }
    );
    dispatch({ type: USERLEVEL_UPDATE_SUCCESS, payload: data });
  } catch (error) {
    if (error.response) {
      dispatch({
        type: USERLEVEL_UPDATE_FAILURE,
        payload: error.response.data,
      });
    } else {
      dispatch({ type: USERLEVEL_UPDATE_FAILURE, payload: error.message });
    }
  }
};

export const userLevelDeleteAction = (id) => async (dispatch) => {
  dispatch({ type: USERLEVEL_DELETE_REQUEST });

  try {
    const { data } = await axios.put(
      `${baseUrl}userlevel/delete/${id}`,
      {},
      {
        headers: { "x-access-token": getToken() },
      }
    );
    dispatch({ type: USERLEVEL_DELETE_SUCCESS, payload: data });
  } catch (error) {
    if (error.response) {
      dispatch({
        type: USERLEVEL_DELETE_FAILURE,
        payload: error.response.data,
      });
    } else {
      dispatch({ type: USERLEVEL_DELETE_FAILURE, payload: error.message });
    }
  }
};
