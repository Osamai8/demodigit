import {
  SUBDOMAIN_LIST_REQUEST,
  SUBDOMAIN_DROPDOWN_SUCCESS,
  SUBDOMAIN_LIST_SUCCESS,
  SUBDOMAIN_LIST_FAILURE,
  SUBDOMAIN_DLELETE_REQUEST,
  SUBDOMAIN_DLELETE_SUCCESS,
  SUBDOMAIN_DLELETE_FAILURE,
  SUBDOMAIN_CREATE_REQUEST,
  SUBDOMAIN_CREATE_SUCCESS,
  SUBDOMAIN_CREATE_FAILURE,
  SUBDOMAIN_UPDATE_REQUEST,
  SUBDOMAIN_UPDATE_SUCCESS,
  SUBDOMAIN_UPDATE_FAILURE,
  SUBDOMAIN_SELECTED_IDS,
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

export const subDomainReducer = (state = initState, { type, payload }) => {
  switch (type) {
    case SUBDOMAIN_SELECTED_IDS:
      return {
        ...state,
        selectedIds: payload,
      };
    case SUBDOMAIN_CREATE_REQUEST:
      return {
        ...state,
        isLoading: true,
        redirectToNewPage: false,
        isDeleted: false,
      };
    case SUBDOMAIN_CREATE_SUCCESS:
      return {
        ...state,
        isLoading: false,
        redirectToNewPage: true,
        isDeleted: false,
      };
    case SUBDOMAIN_CREATE_FAILURE:
      return {
        ...state,
        isLoading: false,
        redirectToNewPage: false,
        isDeleted: false,
      };
    case SUBDOMAIN_LIST_REQUEST:
      return {
        ...state,
        isLoading: true,
        redirectToNewPage: false,
        isDeleted: false,
        filters: payload,
      };
    case SUBDOMAIN_LIST_SUCCESS:
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
    case SUBDOMAIN_DROPDOWN_SUCCESS:
      return {
        ...state,
        isLoading: false,
        data: payload,
      };
    case SUBDOMAIN_LIST_FAILURE:
      return {
        ...state,
        isLoading: false,
        redirectToNewPage: false,
        isDeleted: false,
      };
    case SUBDOMAIN_DLELETE_REQUEST:
      return {
        ...state,
        isLoading: true,
        redirectToNewPage: false,
        isDeleted: false,
      };
    case SUBDOMAIN_DLELETE_SUCCESS:
      return {
        ...state,
        isLoading: false,
        redirectToNewPage: false,
        isDeleted: true,
      };
    case SUBDOMAIN_DLELETE_FAILURE:
      return {
        ...state,
        isLoading: false,
        redirectToNewPage: false,
        isDeleted: false,
      };
    case SUBDOMAIN_UPDATE_REQUEST:
      return {
        ...state,
        isLoading: true,
        redirectToNewPage: false,
        isDeleted: false,
      };
    case SUBDOMAIN_UPDATE_SUCCESS:
      return {
        ...state,
        isLoading: false,
        redirectToNewPage: true,
        isDeleted: false,
      };
    case SUBDOMAIN_UPDATE_FAILURE:
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
