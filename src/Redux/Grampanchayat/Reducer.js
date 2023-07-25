import {
  GRAMPANCHAYAT_LIST_REQUEST,
  GRAMPANCHAYAT_FETCHED_DATA_SUCCESS,
  GRAMPANCHAYAT_GET_FAILURE,
  GRAMPANCHAYAT_GET_DROPDOWN_LIST
} from './actionType';

const initState = {
  isLoading: false,
  data: [],
  list_data: [],
  total: '',
  filters: {
    page: 1
  },
};
export const GrampanchayatReducer = (state = initState, { type, payload }) => {
  switch (type) {
    case GRAMPANCHAYAT_LIST_REQUEST:
      return {
        ...state,
        isLoading: true,
        filters: payload
      };
    case GRAMPANCHAYAT_FETCHED_DATA_SUCCESS:
      let obj = {
        ...state,
        isLoading: false,
        data: payload,
      };
      if (payload.count !== undefined) {
        obj['total'] = payload.count;
      }
      return obj;
    case GRAMPANCHAYAT_GET_DROPDOWN_LIST:
      return {
        ...state,
        isLoading: false,
        list_data: payload.data
      }
    case GRAMPANCHAYAT_GET_FAILURE:
      return {
        ...state,
        isLoading: false,
      };
    default:
      return state;
  }
};
