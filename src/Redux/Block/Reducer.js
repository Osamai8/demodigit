import {
  BLOCK_LIST_REQUEST,
  BLOCK_FETCHED_DATA_SUCCESS,
  BLOCK_GET_FAILURE,
  BLOCK_GET_DROPDOWN_LIST,
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

export const blockReducer = (state = initState, { type, payload }) => {
  switch (type) {
    case BLOCK_SELECTED_IDS:
      return {
        ...state,
        selectedIds: payload,
      };
    case CREATE_BLOCK_REQUEST:
      return {
        ...state,
        isLoading: true,
        redirectToNewPage: false,
        isDeleted: false,
      };
    case CREATE_BLOCK_SUCCESS:
      return {
        ...state,
        isLoading: false,
        redirectToNewPage: true,
        isDeleted: false,
      };
    case CREATE_BLOCK_FAILURE:
      return {
        ...state,
        isLoading: false,
        redirectToNewPage: false,
        isDeleted: false,
      };
    case BLOCK_LIST_REQUEST:
      return {
        ...state,
        isLoading: true,
        redirectToNewPage: false,
        isDeleted: false,
        filters: payload,
      };
    case BLOCK_FETCHED_DATA_SUCCESS:
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
    case BLOCK_GET_DROPDOWN_LIST:
      return {
        ...state,
        isLoading: false,
        data: payload,
      };
    case BLOCK_GET_FAILURE:
      return {
        ...state,
        isLoading: false,
        redirectToNewPage: false,
        isDeleted: false,
      };
    case DELETE_BLOCK_REQUEST:
      return {
        ...state,
        isLoading: true,
        redirectToNewPage: false,
        isDeleted: false,
      };
    case DELETE_BLOCK_SUCCESS:
      return {
        ...state,
        isLoading: false,
        redirectToNewPage: false,
        isDeleted: true,
      };
    case DELETE_BLOCK_FAILURE:
      return {
        ...state,
        isLoading: false,
        redirectToNewPage: false,
        isDeleted: false,
      };
    case UPDATE_BLOCK_REQUEST:
      return {
        ...state,
        isLoading: true,
        redirectToNewPage: false,
        isDeleted: false,
      };
    case UPDATE_BLOCK_SUCCESS:
      return {
        ...state,
        isLoading: false,
        redirectToNewPage: true,
        isDeleted: false,
      };
    case UPDATE_BLOCK_FAILURE:
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
