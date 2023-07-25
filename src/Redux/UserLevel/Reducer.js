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

const initialState = {
  loading: false,
  data: [],
  total: "",
  filters: {
    page: 1,
  },
  error: "",
};

export const userLevelListReducer = (
  state = initialState,
  { type, payload }
) => {
  switch (type) {
    case USERLEVEL_LIST_REQUEST:
      return {
        ...state,
        loading: true,
        filters: payload,
      };
    case USERLEVEL_LIST_SUCCESS:
      let obj = {
        ...state,
        loading: false,
        data: payload,
      };
      if (payload.count !== undefined) {
        obj["total"] = payload.count;
      }
      return obj;
    case USERLEVEL_LIST_FAILURE:
      return {
        ...state,
        loading: false,
        error: payload,
      };
    default:
      return state;
  }
};

export const userLevelCreateReducer = (state = null, { type, payload }) => {
  switch (type) {
    case USERLEVEL_CREATE_REQUEST:
      return {
        loading: true,
      };
    case USERLEVEL_CREATE_SUCCESS:
      return {
        loading: false,
        res: payload,
        redirectToNewPage: true,
        err: "",
      };
    case USERLEVEL_CREATE_FAILURE:
      return {
        loading: false,
        res: null,
        err: payload,
      };
    default:
      return state;
  }
};

export const userLevelUpdateReducer = (state = null, { type, payload }) => {
  switch (type) {
    case USERLEVEL_UPDATE_REQUEST:
      return {
        loading: true,
      };
    case USERLEVEL_UPDATE_SUCCESS:
      return {
        loading: false,
        res: payload,
        redirectToNewPage: true,
        err: "",
      };
    case USERLEVEL_UPDATE_FAILURE:
      return {
        loading: false,
        res: null,
        err: payload,
      };
    default:
      return state;
  }
};

export const userLevelDeleteReducer = (state = null, { type, payload }) => {
  switch (type) {
    case USERLEVEL_DELETE_REQUEST:
      return {
        loading: true,
      };
    case USERLEVEL_DELETE_SUCCESS:
      return {
        loading: false,
        res: payload,
        err: "",
      };
    case USERLEVEL_DELETE_FAILURE:
      return {
        loading: false,
        data: null,
        err: payload,
      };
    default:
      return state;
  }
};
