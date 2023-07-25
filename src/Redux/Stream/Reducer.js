import {
  STREAM_LIST_REQUEST,
  STREAM_DROPDOWN_SUCCESS,
  STREAM_LIST_SUCCESS,
  STREAM_LIST_FAILURE,
  STREAM_DLELETE_REQUEST,
  STREAM_DLELETE_SUCCESS,
  STREAM_DLELETE_FAILURE,
  STREAM_CREATE_REQUEST,
  STREAM_CREATE_SUCCESS,
  STREAM_CREATE_FAILURE,
  STREAM_UPDATE_REQUEST,
  STREAM_UPDATE_SUCCESS,
  STREAM_UPDATE_FAILURE,
  STREAM_SELECTED_IDS,
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
  },
  selectedIds: "",
};

export const streamReducer = (state = initState, { type, payload }) => {
  switch (type) {
    case STREAM_SELECTED_IDS:
      return {
        ...state,
        selectedIds: payload,
      };
    case STREAM_CREATE_REQUEST:
      return {
        ...state,
        isLoading: true,
        redirectToNewPage: false,
        isDeleted: false,
      };
    case STREAM_CREATE_SUCCESS:
      return {
        ...state,
        isLoading: false,
        redirectToNewPage: true,
        isDeleted: false,
      };
    case STREAM_CREATE_FAILURE:
      return {
        ...state,
        isLoading: false,
        redirectToNewPage: false,
        isDeleted: false,
      };
    case STREAM_LIST_REQUEST:
      return {
        ...state,
        isLoading: true,
        redirectToNewPage: false,
        isDeleted: false,
        filters: payload,
      };
    case STREAM_LIST_SUCCESS:
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
    case STREAM_DROPDOWN_SUCCESS:
      return {
        ...state,
        isLoading: false,
        data: payload,
      };
    case STREAM_LIST_FAILURE:
      return {
        ...state,
        isLoading: false,
        redirectToNewPage: false,
        isDeleted: false,
      };
    case STREAM_DLELETE_REQUEST:
      return {
        ...state,
        isLoading: true,
        redirectToNewPage: false,
        isDeleted: false,
      };
    case STREAM_DLELETE_SUCCESS:
      return {
        ...state,
        isLoading: false,
        redirectToNewPage: false,
        isDeleted: true,
      };
    case STREAM_DLELETE_FAILURE:
      return {
        ...state,
        isLoading: false,
        redirectToNewPage: false,
        isDeleted: false,
      };
    case STREAM_UPDATE_REQUEST:
      return {
        ...state,
        isLoading: true,
        redirectToNewPage: false,
        isDeleted: false,
      };
    case STREAM_UPDATE_SUCCESS:
      return {
        ...state,
        isLoading: false,
        redirectToNewPage: true,
        isDeleted: false,
      };
    case STREAM_UPDATE_FAILURE:
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
