import {
  BEN_INT_FETCHED_DATA_SUCCESS,
  BEN_INT_GET_FAILURE,
  BEN_INT_LIST_REQUEST,
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
};

export const benInterventionReducer = (state = initState, { type, payload }) => {
  switch (type) {
    case BEN_INT_LIST_REQUEST:
      return {
        ...state,
        isLoading: true,
        redirectToNewPage: false,
        isDeleted: false,
        filters: payload,
      };
    case BEN_INT_FETCHED_DATA_SUCCESS:
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
    case BEN_INT_GET_FAILURE:
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
