import axios from "axios";
import { toast } from "react-toastify";
import { deleteData, getToken } from "src/utils/sessionStorage";
import { filterUrl } from "../../utils/halper";
import {
  DISTRICT_FETCHED_DATA_SUCCESS,
  DISTRICT_GET_DROPDOWN_LIST,
  DISTRICT_GET_FAILURE,
  DISTRICT_LIST_REQUEST,
  DISTRICT_DELETE_REQUEST,
  DISTRICT_DELETE_SUCCESS,
  DISTRICT_DELETE_FAILURE,
  DISTRICT_CREATE_REQUEST,
  DISTRICT_CREATE_SUCCESS,
  DISTRICT_CREATE_FAILURE,
  DISTRICT_UPDATE_REQUEST,
  DISTRICT_UPDATE_SUCCESS,
  DISTRICT_UPDATE_FAILURE,
  DISTRICT_SELECTED_IDS,
} from "../District/actionType";
const baseUrl = process.env.REACT_APP_API_URL;

export const DistrictListAction = (inputData) => async (dispatch) => {
  dispatch({ type: DISTRICT_LIST_REQUEST, payload: inputData });
  try {
    const { data } = await axios.get(
      `${baseUrl}district/list${filterUrl(inputData)}`,
      {
        headers: {
          "x-access-token": getToken(),
        },
      }
    );
    if (inputData.fetched === "All") {
      dispatch({ type: DISTRICT_GET_DROPDOWN_LIST, payload: data });
    } else {
      dispatch({ type: DISTRICT_FETCHED_DATA_SUCCESS, payload: data });
    }
  } catch (err) {
    dispatch({
      type: DISTRICT_GET_FAILURE,
      payload: err.message,
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

export const createDistrictAction = (inputData) => async (dispatch) => {
  dispatch({ type: DISTRICT_CREATE_REQUEST });

  try {
    const { data } = await axios.post(`${baseUrl}district/create`, inputData, {
      headers: {
        "x-access-token": getToken(),
      },
    });
    dispatch({ type: DISTRICT_CREATE_SUCCESS, payload: data });
    toast.success("Successfully created");
  } catch (err) {
    dispatch({
      type: DISTRICT_CREATE_FAILURE,
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

export const updateDistrictAction = (inputData) => async (dispatch) => {
  dispatch({ type: DISTRICT_UPDATE_REQUEST });

  try {
    const { data } = await axios.put(
      `${baseUrl}district/update/${inputData.id}`,
      { name: inputData.name, state_id: inputData.state_id },
      {
        headers: {
          "x-access-token": getToken(),
        },
      }
    );
    dispatch({ type: DISTRICT_UPDATE_SUCCESS, payload: data });
    toast.success("Successfully updated");
  } catch (err) {
    dispatch({
      type: DISTRICT_UPDATE_FAILURE,
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

export const deleteDistrictAction = (ids) => async (dispatch) => {
  dispatch({ type: DISTRICT_DELETE_REQUEST });

  try {
    const { data } = await axios.put(
      `${baseUrl}district/delete`,
      { id: ids },
      { headers: { "x-access-token": getToken() } }
    );
    dispatch({ type: DISTRICT_DELETE_SUCCESS, payload: data });
    toast.success("Successfully Deleted content");
  } catch (err) {
    dispatch({
      type: DISTRICT_DELETE_FAILURE,
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

export const districtSelectedAction = (inputData) => (dispatch) => {
  dispatch({ type: DISTRICT_SELECTED_IDS, payload: inputData.join(",") });
};
