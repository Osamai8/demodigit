import axios from "axios";
import { toast } from "react-toastify";
import { getToken } from "src/utils/sessionStorage";
import {
  LOGIN_FAILURE,
  LOGIN_REQUEST,
  LOGIN_SUCCESS,
  SIGNUP_REQUEST,
  SIGNUP_SUCCESS,
  SIGNUP_FAILURE,
  SEND_EMAIL_REQUEST,
  SEND_EMAIL_SUCCESS,
  SEND_EMAIL_FAILURE,
  VERIFY_TOKEN_REQUEST,
  VERIFY_TOKEN_SUCCESS,
  VERIFY_TOKEN_FIALURE,
  RESET_PASSWORD_REQUEST,
  RESET_PASSWORD_SUCCESS,
  RESET_PASSWORD_FAILURE,
  LOGOUT,
} from "../Auth/actionType";
const baseUrl = process.env.REACT_APP_API_URL;

export const loginRequest = () => {
  return {
    type: LOGIN_REQUEST,
  };
};
export const loginSuccess = (payload) => {
  return {
    type: LOGIN_SUCCESS,
    payload,
  };
};
export const loginFailure = (payload) => {
  return {
    type: LOGIN_FAILURE,
    payload,
  };
};
export const logOut = () => {
  return {
    type: LOGOUT,
  };
};

export const loginUser = (payload) => (dispatch) => {
  dispatch(loginRequest());
  axios({
    method: "post",
    url: `${baseUrl}login`,
    data: {
      value: payload.value,
      password: payload.password,
      random: payload.random,
      // recaptcha: payload.recaptcha
    },
  })
    .then((res) => {
      dispatch(loginSuccess(res.data));
    })
    .catch((err) => {
      let errMessage = "";
      if (err.response !== undefined && err.response.status === 400) {
        errMessage =
          err.response.data.message !== undefined
            ? err.response.data.message
            : "";
      } else if (err.response !== undefined && err.response.status === 500) {
        errMessage = "Internal Server Error";
      } else {
        errMessage = err.message;
      }
      dispatch(loginFailure(errMessage));
    });
};

export const logoutUser = (payload) => (dispatch) => {
  axios({
    method: "post",
    url: `${baseUrl}logout`,
    headers: {
      "x-access-token": getToken(),
    },
  })
    .then((res) => {
      dispatch(logOut());
    })
    .catch((err) => { });
};

export const signupAction = (inputData) => async (dispatch) => {
  dispatch({ type: SIGNUP_REQUEST });

  try {
    const { data } = await axios.post("");
    dispatch({ type: SIGNUP_SUCCESS, payload: data });
  } catch (err) {
    dispatch({ type: SIGNUP_FAILURE, payload: err });
    if (err.response !== undefined && err.response.status === 500) {
      toast.error("Internal Server Error");
    } else if (err.response !== undefined && err.response.status === 400) {
      toast.error(err.response.data.message);
    } else {
      toast.error(err.message);
    }
  }
};

export const sendMailForVerification = (formData) => async (dispatch) => {
  dispatch({ type: SEND_EMAIL_REQUEST });

  try {
    const { data } = await axios.post(`${baseUrl}forgotPassword`, formData);
    dispatch({ type: SEND_EMAIL_SUCCESS, payload: data });
  } catch (err) {
    dispatch({
      type: SEND_EMAIL_FAILURE,
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

export const verifyToken = (formData) => async (dispatch) => {
  dispatch({ type: VERIFY_TOKEN_REQUEST });

  try {
    const { data } = await axios.post(`${baseUrl}verify_reset_password`, formData);
    dispatch({ type: VERIFY_TOKEN_SUCCESS, payload: data });
  } catch (err) {
    dispatch({
      type: VERIFY_TOKEN_FIALURE,
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

export const resetPassword = (formData) => async (dispatch) => {
  dispatch({ type: RESET_PASSWORD_REQUEST });

  try {
    const { data } = await axios.post(`${baseUrl}updatePasswordViaEmail`, formData);
    dispatch({ type: RESET_PASSWORD_SUCCESS, payload: data });
  } catch (err) {
    dispatch({
      type: RESET_PASSWORD_FAILURE,
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
