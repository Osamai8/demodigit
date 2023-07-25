import {
  STATE_CREATE_FAILURE,
  STATE_CREATE_REQUEST,
  STATE_CREATE_SUCCESS,
  STATE_LIST_REQUEST,
  STATE_FETCHED_DATA_SUCCESS,
  STATE_GET_DROPDOWN_LIST,
  STATE_GET_FAILURE,
  STATE_DELETE_REQUEST,
  STATE_DELETE_SUCCESS,
  STATE_DELETE_FAILURE,
  STATE_SELECTED_IDS,
} from "./actionType";

const initState = {
  isLoading: false,
  redirectToNewPage: false,
  isDeleted: false,
  data: [],
  total: "",
  filters: {
    page: 1,
    type_status: "web",
    category: "",
  },
  selectedIds: "",
};

export const stateReducer = (state = initState, { type, payload }) => {
  switch (type) {
    case STATE_SELECTED_IDS:
      return {
        ...state,
        selectedIds: payload,
      };
    case STATE_CREATE_REQUEST:
      return {
        ...state,
        isLoading: true,
        redirectToNewPage: false,
        isDeleted: false,
      };
    case STATE_CREATE_SUCCESS:
      return {
        ...state,
        isLoading: false,
        redirectToNewPage: true,
        isDeleted: false,
      };
    case STATE_CREATE_FAILURE:
      return {
        ...state,
        isLoading: false,
        redirectToNewPage: false,
        isDeleted: false,
      };
    case STATE_LIST_REQUEST:
      return {
        ...state,
        isLoading: true,
        redirectToNewPage: false,
        isDeleted: false,
        filters: payload,
      };
    case STATE_FETCHED_DATA_SUCCESS:
      let obj = {
        ...state,
        isLoading: false,
        data: payload,
        redirectToNewPage: false,
        isDeleted: false,
      };
      if (payload.total !== undefined) {
        obj["total"] = payload.total;
      }
      return obj;
    case STATE_GET_DROPDOWN_LIST:
      return {
        ...state,
        isLoading: false,
        data: payload,
      };
    case STATE_GET_FAILURE:
      return {
        ...state,
        isLoading: false,
        redirectToNewPage: false,
        isDeleted: false,
      };
    case STATE_DELETE_REQUEST:
      return {
        ...state,
        isLoading: true,
        redirectToNewPage: false,
        isDeleted: false,
      };
    case STATE_DELETE_SUCCESS:
      return {
        ...state,
        isLoading: false,
        redirectToNewPage: false,
        isDeleted: true,
      };
    case STATE_DELETE_FAILURE:
      return {
        ...state,
        isLoading: false,
        redirectToNewPage: false,
        isDeleted: false,
      };
    default:
      return state;
  }
};
