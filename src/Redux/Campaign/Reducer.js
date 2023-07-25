import {
  CAMPAIGN_CREATE_FAILURE,
  CAMPAIGN_CREATE_REQUEST,
  CAMPAIGN_CREATE_SUCCESS,
  CAMPAIGN_LIST_REQUEST,
  CAMPAIGN_FETCHED_DATA_SUCCESS,
  CAMPAIGN_GET_FAILURE,
  CAMPAIGN_DELETE_REQUEST,
  CAMPAIGN_DELETE_SUCCESS,
  CAMPAIGN_DELETE_FAILURE,
  CAMPAIGN_GETBYID_REQUEST,
  CAMPAIGN_GETBYID_SUCCESS,
  CAMPAIGN_GETBYID_FAILURE,
  CAMPAIGN_LOCATION_REQUEST,
  CAMPAIGN_LOCATION_SUCCESS,
  CAMPAIGN_LOCATION_FAILURE,
  COMPAIGN_SELECTED_IDS,
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

export const campaignReducer = (state = initState, { type, payload }) => {
  switch (type) {
    case COMPAIGN_SELECTED_IDS:
      return {
        ...state,
        selectedIds: payload,
      };
    case CAMPAIGN_CREATE_REQUEST:
      return {
        ...state,
        isLoading: true,
        redirectToNewPage: false,
        isDeleted: false,
      };

    case CAMPAIGN_CREATE_SUCCESS:
      return {
        ...state,
        isLoading: false,
        redirectToNewPage: true,
        isDeleted: false,
      };

    case CAMPAIGN_CREATE_FAILURE:
      return {
        ...state,
        isLoading: false,
        redirectToNewPage: false,
        isDeleted: false,
      };

    case CAMPAIGN_LIST_REQUEST:
      return {
        ...state,
        isLoading: true,
        redirectToNewPage: false,
        isDeleted: false,
        filters: payload,
      };

    case CAMPAIGN_FETCHED_DATA_SUCCESS:
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

    case CAMPAIGN_GET_FAILURE:
      return {
        ...state,
        isLoading: false,
        redirectToNewPage: false,
        isDeleted: false,
      };

    case CAMPAIGN_DELETE_REQUEST:
      return {
        ...state,
        isLoading: true,
        redirectToNewPage: false,
        isDeleted: false,
      };

    case CAMPAIGN_DELETE_SUCCESS:
      return {
        ...state,
        isLoading: false,
        redirectToNewPage: false,
        isDeleted: true,
      };

    case CAMPAIGN_DELETE_FAILURE:
      return {
        ...state,
        isLoading: false,
        redirectToNewPage: false,
        isDeleted: false,
      };
    case CAMPAIGN_GETBYID_REQUEST:
      return {
        ...state,
        isLoading: true,
      };
    case CAMPAIGN_GETBYID_SUCCESS:
      return {
        ...state,
        isLoading: false,
        data: payload,
      };
    case CAMPAIGN_GETBYID_FAILURE:
      return {
        ...state,
        isLoading: false,
      };
    case CAMPAIGN_LOCATION_REQUEST:
      return {
        ...state,
        isLoading: true,
      };
    case CAMPAIGN_LOCATION_SUCCESS:
      return {
        ...state,
        isLoading: false,
        data: payload,
      };
    case CAMPAIGN_LOCATION_FAILURE:
      return {
        ...state,
        isLoading: false,
      };

    default:
      return state;
  }
};
