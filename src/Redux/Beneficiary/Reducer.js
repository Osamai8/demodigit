import {
  BENEFICIARY_CREATE_FAILURE,
  BENEFICIARY_CREATE_REQUEST,
  BENEFICIARY_CREATE_SUCCESS,
  BENEFICIARY_DELETE_FAILURE,
  BENEFICIARY_DELETE_REQUEST,
  BENEFICIARY_DELETE_SUCCESS,
  BENEFICIARY_FETCHED_DATA_SUCCESS,
  BENEFICIARY_GET_FAILURE,
  BENEFICIARY_LIST_REQUEST,
  BENEFICIARY_SELECTED_IDS,
} from "./actionType";

const initState = {
  isError: false,
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

export const beneficiaryReducer = (state = initState, { type, payload }) => {
  switch (type) {
    case BENEFICIARY_SELECTED_IDS:
      return {
        ...state,
        selectedIds: payload,
      };
    case BENEFICIARY_CREATE_REQUEST:
      return {
        ...state,
        isLoading: true,
        redirectToNewPage: false,
        isDeleted: false,
      };

    case BENEFICIARY_CREATE_SUCCESS:
      return {
        ...state,
        isLoading: false,
        redirectToNewPage: true,
        isDeleted: false,
        isError: false,
      };

    case BENEFICIARY_CREATE_FAILURE:
      return {
        ...state,
        isLoading: false,
        redirectToNewPage: false,
        isDeleted: false,
        isError: true,
      };

    case BENEFICIARY_LIST_REQUEST:
      return {
        ...state,
        isLoading: true,
        redirectToNewPage: false,
        isDeleted: false,
        filters: payload,
      };

    case BENEFICIARY_FETCHED_DATA_SUCCESS:
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

    case BENEFICIARY_GET_FAILURE:
      return {
        ...state,
        isLoading: false,
        redirectToNewPage: false,
        isDeleted: false,
      };

    case BENEFICIARY_DELETE_REQUEST:
      return {
        ...state,
        isLoading: true,
        redirectToNewPage: false,
        isDeleted: false,
      };

    case BENEFICIARY_DELETE_SUCCESS:
      return {
        ...state,
        isLoading: false,
        redirectToNewPage: false,
        isDeleted: true,
      };

    case BENEFICIARY_DELETE_FAILURE:
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
