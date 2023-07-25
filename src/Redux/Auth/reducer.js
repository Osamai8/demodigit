import { loadData, saveData, deleteData } from "src/utils/sessionStorage";
import {
  LOGIN_FAILURE,
  LOGIN_REQUEST,
  LOGIN_SUCCESS,
  LOGOUT,
  VERIFY_TOKEN_REQUEST,
  VERIFY_TOKEN_SUCCESS,
  VERIFY_TOKEN_FIALURE,
  SEND_EMAIL_REQUEST,
  SEND_EMAIL_SUCCESS,
  SEND_EMAIL_FAILURE,
  RESET_PASSWORD_REQUEST,
  RESET_PASSWORD_SUCCESS,
  RESET_PASSWORD_FAILURE,
} from "../Auth/actionType";

const loginInfo = loadData("loginInfo");

const initState = {
  isAuth: loginInfo ? true : false,
  isLoading: false,
  isError: false,
  token: loginInfo || "",
  errorMessage: "",
  data: null,
};
export const authReducer = (state = initState, { type, payload }) => {
  switch (type) {
    case LOGIN_REQUEST:
      return {
        ...state,
        isLoading: true,
        isError: false,
      };
    case LOGIN_SUCCESS:
      saveData("loginInfo", payload);
      return {
        ...state,
        isLoading: true,
        isAuth: true,
        token: payload.token,
      };
    case LOGIN_FAILURE:
      return {
        ...state,
        isLoading: false,
        isError: true,
        errorMessage: payload,
        token: "",
      };
    case LOGOUT:
      deleteData("loginInfo");
      return {
        ...state,
        isLoading: false,
        isAuth: false,
        isError: false,
      };
    case VERIFY_TOKEN_REQUEST:
      return {
        ...state,
        isLoading: true,
      };
    case VERIFY_TOKEN_SUCCESS:
      return {
        ...state,
        isLoading: false,
        isError: false,
        data: payload,
      };
    case VERIFY_TOKEN_FIALURE:
      return {
        ...state,
        isLoading: false,
        isError: true,
        errorMessage: payload,
      };
    case SEND_EMAIL_REQUEST:
      return {
        ...state,
        isLoading: true,
      };
    case SEND_EMAIL_SUCCESS:
      return {
        ...state,
        isLoading: false,
        isError: false,
        data: payload,
      };
    case SEND_EMAIL_FAILURE:
      return {
        ...state,
        isLoading: false,
        isError: true,
        errorMessage: payload,
      };

    default:
      return state;
  }
};

export const resetPasswordReducer = (
  state = { loading: false, err: false, errorMessage: "", data: null },
  action
) => {
  switch (action.type) {
    case RESET_PASSWORD_REQUEST:
      return {
        ...state,
        isLoading: true,
      };
    case RESET_PASSWORD_SUCCESS:
      return {
        ...state,
        isLoading: false,
        isError: false,
        data: action.payload,
      };
    case RESET_PASSWORD_FAILURE:
      return {
        ...state,
        isLoading: false,
        isError: true,
        errorMessage: action.payload,
      };

    default:
      return state;
  }
};
