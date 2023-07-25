import {
  VOLUNTEER_CREATE_FAILURE,
  VOLUNTEER_CREATE_REQUEST,
  VOLUNTEER_CREATE_SUCCESS,
  VOLUNTEER_LIST_REQUEST,
  VOLUNTEER_FETCHED_DATA_SUCCESS,
  VOLUNTEER_GET_FAILURE,
  VOLUNTEER_DELETE_REQUEST,
  VOLUNTEER_DELETE_SUCCESS,
  VOLUNTEER_DELETE_FAILURE,
  VOLUNTEER_BULK_UPLOAD_REQUEST,
  VOLUNTEER_BULK_UPLOAD_SUCCESS,
  VOLUNTEER_BULK_UPLOAD_FAILURE,
  VOLUNTEER_SELECTED_IDS,
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

export const volunteerReducer = (state = initState, { type, payload }) => {
  switch (type) {
    case VOLUNTEER_SELECTED_IDS:
      return {
        ...state,
        selectedIds: payload,
      };
    case VOLUNTEER_CREATE_REQUEST:
      return {
        ...state,
        isLoading: true,
        redirectToNewPage: false,
        isDeleted: false,
      };
    case VOLUNTEER_CREATE_SUCCESS:
      return {
        ...state,
        isLoading: false,
        redirectToNewPage: true,
        isDeleted: false,
      };
    case VOLUNTEER_CREATE_FAILURE:
      return {
        ...state,
        isLoading: false,
        redirectToNewPage: false,
        isDeleted: false,
      };
    case VOLUNTEER_LIST_REQUEST:
      return {
        ...state,
        isLoading: true,
        redirectToNewPage: false,
        isDeleted: false,
        filters: payload,
      };
    case VOLUNTEER_FETCHED_DATA_SUCCESS:
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
    case VOLUNTEER_GET_FAILURE:
      return {
        ...state,
        isLoading: false,
        redirectToNewPage: false,
        isDeleted: false,
      };
    case VOLUNTEER_DELETE_REQUEST:
      return {
        ...state,
        isLoading: true,
        redirectToNewPage: false,
        isDeleted: false,
      };
    case VOLUNTEER_DELETE_SUCCESS:
      return {
        ...state,
        isLoading: false,
        redirectToNewPage: false,
        isDeleted: true,
      };
    case VOLUNTEER_DELETE_FAILURE:
      return {
        ...state,
        isLoading: false,
        redirectToNewPage: false,
        isDeleted: false,
      };
    case VOLUNTEER_BULK_UPLOAD_REQUEST:
      return {
        ...state,
        isLoading: true,
        redirectToNewPage: false,
      };
    case VOLUNTEER_BULK_UPLOAD_SUCCESS:
      return {
        ...state,
        isLoading: false,
        data: payload,
        redirectToNewPage: true,
      };
    case VOLUNTEER_BULK_UPLOAD_FAILURE:
      return {
        ...state,
        isLoading: false,
        data: payload,
        redirectToNewPage: false,
      };
    default:
      return state;
  }
};
