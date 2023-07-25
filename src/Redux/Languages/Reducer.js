import {
  LANGUAGES_CREATE_FAILURE,
  LANGUAGES_CREATE_REQUEST,
  LANGUAGES_CREATE_SUCCESS,
  LANGUAGES_DELETE_FAILURE,
  LANGUAGES_DELETE_REQUEST,
  LANGUAGES_DELETE_SUCCESS,
  LANGUAGES_FETCHED_DATA_SUCCESS,
  LANGUAGES_GET_FAILURE,
  LANGUAGES_GET_REQUEST,
  LANGUAGES_SELECTED_IDS,
  GET_COMPAIGN_LANGUAGES_REQUEST,
  GET_COMPAIGN_LANGUAGES_SUCCESS,
  GET_COMPAIGN_LANGUAGES_FAILURE,
  CREATE_COMPAIGN_LANGUAGES_SUCCESS,
  CREATE_COMPAIGN_LANGUAGES_REQUEST,
  CREATE_COMPAIGN_LANGUAGES_FAILURE,
} from "./actionType";

const initState = {
  isLoading: false,
  redirectToNewPage: false,
  isDeleted: false,
  data: [],
  translations: [],
  total: "",
  filters: {
    page: 1,
    type_status: "web",
  },
  selectedIds: "",
};

export const languagesReducer = (state = initState, { type, payload }) => {
  switch (type) {
    case LANGUAGES_SELECTED_IDS:
      return {
        ...state,
        selectedIds: payload,
      };
    case LANGUAGES_CREATE_REQUEST:
      return {
        ...state,
        isLoading: true,
        redirectToNewPage: false,
        isDeleted: false,
      };

    case LANGUAGES_CREATE_SUCCESS:
      return {
        ...state,
        isLoading: false,
        redirectToNewPage: true,
        isDeleted: false,
      };

    case LANGUAGES_CREATE_FAILURE:
      return {
        ...state,
        isLoading: false,
        redirectToNewPage: false,
        isDeleted: false,
      };

    case GET_COMPAIGN_LANGUAGES_REQUEST:
      return {
        ...state,
        isLoading: true,
        redirectToNewPage: false,
        isDeleted: false,
      };

    case GET_COMPAIGN_LANGUAGES_SUCCESS:
      return {
        ...state,
        isLoading: false,
        redirectToNewPage: false,
        isDeleted: false,
        translations: payload,
      };

    case GET_COMPAIGN_LANGUAGES_FAILURE:
      return {
        ...state,
        isLoading: false,
        redirectToNewPage: false,
        isDeleted: false,
        translations: [],
      };

    case CREATE_COMPAIGN_LANGUAGES_REQUEST:
      return {
        ...state,
        isLoading: true,
        redirectToNewPage: false,
        isDeleted: false,
      };

    case CREATE_COMPAIGN_LANGUAGES_SUCCESS:
      return {
        ...state,
        isLoading: false,
        redirectToNewPage: true,
        isDeleted: false,
      };

    case CREATE_COMPAIGN_LANGUAGES_FAILURE:
      return state;

    case LANGUAGES_GET_REQUEST:
      return {
        ...state,
        isLoading: true,
        redirectToNewPage: false,
        isDeleted: false,
        filters: payload,
      };

    case LANGUAGES_FETCHED_DATA_SUCCESS:
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

    case LANGUAGES_GET_FAILURE:
      return {
        ...state,
        isLoading: false,
        redirectToNewPage: false,
        isDeleted: false,
      };

    case LANGUAGES_DELETE_REQUEST:
      return {
        ...state,
        isLoading: true,
        redirectToNewPage: false,
        isDeleted: false,
      };

    case LANGUAGES_DELETE_SUCCESS:
      return {
        ...state,
        isLoading: false,
        redirectToNewPage: false,
        isDeleted: true,
      };

    case LANGUAGES_DELETE_FAILURE:
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
