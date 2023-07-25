import {
  NGO_PARTNER_CREATE_FAILURE,
  NGO_PARTNER_CREATE_REQUEST,
  NGO_PARTNER_CREATE_SUCCESS,
  NGO_PARTNER_LIST_REQUEST,
  NGO_PARTNER_FETCHED_DATA_SUCCESS,
  NGO_PARTNER_GET_FAILURE,
  NGO_PARTNER_DELETE_REQUEST,
  NGO_PARTNER_DELETE_SUCCESS,
  NGO_PARTNER_DELETE_FAILURE,
  NGO_BULK_UPLOAD_REQUEST,
  NGO_BULK_UPLOAD_SUCCESS,
  NGO_BULK_UPLOAD_FAILURE,
  NGO_SELECTED_IDS,
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

export const ngoPartnerReducer = (state = initState, { type, payload }) => {
  switch (type) {
    case NGO_SELECTED_IDS:
      return {
        ...state,
        selectedIds: payload,
      };
    case NGO_PARTNER_CREATE_REQUEST:
      return {
        ...state,
        isLoading: true,
        redirectToNewPage: false,
        isDeleted: false,
      };
    case NGO_PARTNER_CREATE_SUCCESS:
      return {
        ...state,
        isLoading: false,
        redirectToNewPage: true,
        isDeleted: false,
      };
    case NGO_PARTNER_CREATE_FAILURE:
      return {
        ...state,
        isLoading: false,
        redirectToNewPage: false,
        isDeleted: false,
      };
    case NGO_PARTNER_LIST_REQUEST:
      return {
        ...state,
        isLoading: true,
        redirectToNewPage: false,
        isDeleted: false,
        filters: payload,
      };
    case NGO_PARTNER_FETCHED_DATA_SUCCESS:
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
    case NGO_PARTNER_GET_FAILURE:
      return {
        ...state,
        isLoading: false,
        redirectToNewPage: false,
        isDeleted: false,
      };
    case NGO_PARTNER_DELETE_REQUEST:
      return {
        ...state,
        isLoading: true,
        redirectToNewPage: false,
        isDeleted: false,
      };
    case NGO_PARTNER_DELETE_SUCCESS:
      return {
        ...state,
        isLoading: false,
        redirectToNewPage: false,
        isDeleted: true,
      };
    case NGO_PARTNER_DELETE_FAILURE:
      return {
        ...state,
        isLoading: false,
        redirectToNewPage: false,
        isDeleted: false,
      };
    case NGO_BULK_UPLOAD_REQUEST:
      return {
        ...state,
        isLoading: true,
        redirectToNewPage: false,
      };
    case NGO_BULK_UPLOAD_SUCCESS:
      return {
        ...state,
        isLoading: false,
        data: payload,
        redirectToNewPage: true,
      };
    case NGO_BULK_UPLOAD_FAILURE:
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
