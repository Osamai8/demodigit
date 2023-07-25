import {
  DOMAIN_LIST_REQUEST,
  DOMAIN_DROPDOWN_SUCCESS,
  DOMAIN_LIST_SUCCESS,
  DOMAIN_LIST_FAILURE,
  DOMAIN_DLELETE_REQUEST,
  DOMAIN_DLELETE_SUCCESS,
  DOMAIN_DLELETE_FAILURE,
  DOMAIN_CREATE_REQUEST,
  DOMAIN_CREATE_SUCCESS,
  DOMAIN_CREATE_FAILURE,
  DOMAIN_UPDATE_REQUEST,
  DOMAIN_UPDATE_SUCCESS,
  DOMAIN_UPDATE_FAILURE,
  DOMAIN_SELECTED_IDS,
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

export const domainReducer = (state = initState, { type, payload }) => {
  switch (type) {
    case DOMAIN_SELECTED_IDS:
      return {
        ...state,
        selectedIds: payload,
      };
    case DOMAIN_CREATE_REQUEST:
      return {
        ...state,
        isLoading: true,
        redirectToNewPage: false,
        isDeleted: false,
      };
    case DOMAIN_CREATE_SUCCESS:
      return {
        ...state,
        isLoading: false,
        redirectToNewPage: true,
        isDeleted: false,
      };
    case DOMAIN_CREATE_FAILURE:
      return {
        ...state,
        isLoading: false,
        redirectToNewPage: false,
        isDeleted: false,
      };
    case DOMAIN_LIST_REQUEST:
      return {
        ...state,
        isLoading: true,
        redirectToNewPage: false,
        isDeleted: false,
        filters: payload,
      };
    case DOMAIN_LIST_SUCCESS:
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
    case DOMAIN_DROPDOWN_SUCCESS:
      return {
        ...state,
        isLoading: false,
        data: payload,
      };
    case DOMAIN_LIST_FAILURE:
      return {
        ...state,
        isLoading: false,
        redirectToNewPage: false,
        isDeleted: false,
      };
    case DOMAIN_DLELETE_REQUEST:
      return {
        ...state,
        isLoading: true,
        redirectToNewPage: false,
        isDeleted: false,
      };
    case DOMAIN_DLELETE_SUCCESS:
      return {
        ...state,
        isLoading: false,
        redirectToNewPage: false,
        isDeleted: true,
      };
    case DOMAIN_DLELETE_FAILURE:
      return {
        ...state,
        isLoading: false,
        redirectToNewPage: false,
        isDeleted: false,
      };
    case DOMAIN_UPDATE_REQUEST:
      return {
        ...state,
        isLoading: true,
        redirectToNewPage: false,
        isDeleted: false,
      };
    case DOMAIN_UPDATE_SUCCESS:
      return {
        ...state,
        isLoading: false,
        redirectToNewPage: true,
        isDeleted: false,
      };
    case DOMAIN_UPDATE_FAILURE:
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
