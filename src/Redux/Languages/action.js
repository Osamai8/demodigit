import axios from "axios";
import { toast } from "react-toastify";
import { deleteData, getToken } from "src/utils/sessionStorage";
import { filterUrl } from "../../utils/halper";
import {
  LANGUAGES_CREATE_FAILURE,
  LANGUAGES_CREATE_REQUEST,
  LANGUAGES_CREATE_SUCCESS,
  LANGUAGES_DELETE_FAILURE,
  LANGUAGES_DELETE_REQUEST,
  LANGUAGES_DELETE_SUCCESS,
  LANGUAGES_FETCHED_DATA_SUCCESS,
  LANGUAGES_GET_FAILURE,
  LANGUAGES_GET_REQUEST,
  LANGUAGES_SELECTED_IDS,
  GET_COMPAIGN_LANGUAGES_REQUEST,
  GET_COMPAIGN_LANGUAGES_SUCCESS,
  GET_COMPAIGN_LANGUAGES_FAILURE,
  CREATE_COMPAIGN_LANGUAGES_SUCCESS,
  CREATE_COMPAIGN_LANGUAGES_REQUEST,
  CREATE_COMPAIGN_LANGUAGES_FAILURE,
} from "./actionType";
const baseUrl = process.env.REACT_APP_API_URL;

export const languagesCreateAction = (payload) => (dispatch) => {
  dispatch({ type: LANGUAGES_CREATE_REQUEST });
  axios({
    method: "post",
    url: `${baseUrl}language/create`,
    data: payload,
    headers: {
      "x-access-token": getToken(),
    },
  })
    .then((res) => {
      dispatch({ type: LANGUAGES_CREATE_SUCCESS, payload: res.data.success });
      toast.success("Successfully create content");
    })
    .catch((err) => {
      dispatch({ type: LANGUAGES_CREATE_FAILURE, payload: err.message });
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

export const languagesListAction = (payload) => (dispatch) => {
  dispatch({ type: LANGUAGES_GET_REQUEST, payload: payload });
  axios({
    method: "get",
    url: `${baseUrl}language/list${filterUrl(payload)}`,
    headers: {
      "x-access-token": getToken(),
    },
  })
    .then((res) => {
      dispatch({ type: LANGUAGES_FETCHED_DATA_SUCCESS, payload: res.data });
    })
    .catch((err) => {
      dispatch({ type: LANGUAGES_GET_FAILURE, payload: err.message });
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

export const languagesUpdateAction = (payload) => (dispatch) => {
  dispatch({ type: LANGUAGES_CREATE_REQUEST });
  axios({
    method: "put",
    url: `${baseUrl}language/update/${payload?.id}`,
    data: payload,
    headers: {
      "x-access-token": getToken(),
    },
  })
    .then((res) => {
      dispatch({ type: LANGUAGES_CREATE_SUCCESS, payload: res.data.success });
      toast.success("Successfully update content");
    })
    .catch((err) => {
      dispatch({ type: LANGUAGES_CREATE_FAILURE, payload: err.message });
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

export const deleteLanguagesAction = (payload) => (dispatch) => {
  dispatch({ type: LANGUAGES_DELETE_REQUEST });
  axios({
    method: "put",
    url: `${baseUrl}language/delete`,
    data: { id: payload.id, is_deleted: payload.isDeleted },
    headers: {
      "x-access-token": getToken(),
    },
  })
    .then((res) => {
      dispatch({ type: LANGUAGES_DELETE_SUCCESS, payload: res.data.success });
    })
    .catch((err) => {
      dispatch({ type: LANGUAGES_DELETE_FAILURE, payload: err.message });
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

export const languagesSelectedAction = (inputData) => (dispatch) => {
  dispatch({ type: LANGUAGES_SELECTED_IDS, payload: inputData.join(",") });
};

export const getCompaingLanuguagesAction = (formData) => async (dispatch) => {
  dispatch({ type: GET_COMPAIGN_LANGUAGES_REQUEST });

  try {
    const { data } = await axios.get(
      `${baseUrl}language-translation/list?row_id=${formData.row_id}&short_key=${formData.short_key}`,
      {
        headers: {
          "x-access-token": getToken(),
        },
      }
    );
    dispatch({ type: GET_COMPAIGN_LANGUAGES_SUCCESS, payload: data.data });
  } catch (err) {
    dispatch({
      type: GET_COMPAIGN_LANGUAGES_FAILURE,
      payload: err.respons,
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

export const createCompainLanuguagesAction = (formData) => async (dispatch) => {
  dispatch({ type: CREATE_COMPAIGN_LANGUAGES_REQUEST });

  try {
    const { data } = await axios.post(
      `${baseUrl}language-translation/create`,
      formData,
      {
        headers: {
          "x-access-token": getToken(),
        },
      }
    );
    dispatch({ type: CREATE_COMPAIGN_LANGUAGES_SUCCESS, payload: data.data });
  } catch (err) {
    dispatch({
      type: CREATE_COMPAIGN_LANGUAGES_FAILURE,
      payload: err.respons,
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
