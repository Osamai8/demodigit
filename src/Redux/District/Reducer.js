import {
  DISTRICT_LIST_REQUEST,
  DISTRICT_FETCHED_DATA_SUCCESS,
  DISTRICT_GET_FAILURE,
  DISTRICT_GET_DROPDOWN_LIST,
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

export const DistrictReducer = (state = initState, { type, payload }) => {
  switch (type) {
    case DISTRICT_SELECTED_IDS:
      return {
        ...state,
        selectedIds: payload,
      };
    case DISTRICT_CREATE_REQUEST:
      return {
        ...state,
        isLoading: true,
        redirectToNewPage: false,
        isDeleted: false,
      };
    case DISTRICT_CREATE_SUCCESS:
      return {
        ...state,
        isLoading: false,
        redirectToNewPage: true,
        isDeleted: false,
      };
    case DISTRICT_CREATE_FAILURE:
      return {
        ...state,
        isLoading: false,
        redirectToNewPage: false,
        isDeleted: false,
      };
    case DISTRICT_LIST_REQUEST:
      return {
        ...state,
        isLoading: true,
        redirectToNewPage: false,
        isDeleted: false,
        filters: payload,
      };
    case DISTRICT_FETCHED_DATA_SUCCESS:
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
    case DISTRICT_GET_DROPDOWN_LIST:
      return {
        ...state,
        isLoading: false,
        data: payload,
      };
    case DISTRICT_GET_FAILURE:
      return {
        ...state,
        isLoading: false,
        redirectToNewPage: false,
        isDeleted: false,
      };
    case DISTRICT_DELETE_REQUEST:
      return {
        ...state,
        isLoading: true,
        redirectToNewPage: false,
        isDeleted: false,
      };
    case DISTRICT_DELETE_SUCCESS:
      return {
        ...state,
        isLoading: false,
        redirectToNewPage: false,
        isDeleted: true,
      };
    case DISTRICT_DELETE_FAILURE:
      return {
        ...state,
        isLoading: false,
        redirectToNewPage: false,
        isDeleted: false,
      };
    case DISTRICT_UPDATE_REQUEST:
      return {
        ...state,
        isLoading: true,
        redirectToNewPage: false,
        isDeleted: false,
      };
    case DISTRICT_UPDATE_SUCCESS:
      return {
        ...state,
        isLoading: false,
        redirectToNewPage: true,
        isDeleted: false,
      };
    case DISTRICT_UPDATE_FAILURE:
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
