import {
  VILLAGE_LIST_REQUEST,
  VILLAGE_FETCHED_DATA_SUCCESS,
  VILLAGE_GET_FAILURE,
  VILLAGE_GET_DROPDOWN_LIST
} from './actionType';
const initState = {
  isLoading: false,
  data: [],
  total: '',
  list_data: [],
  filters: {
    page: 1,
  },
};
export const VillageReducer = (state = initState, { type, payload }) => {
  switch (type) {
    case VILLAGE_LIST_REQUEST:
      return {
        ...state,
        isLoading: true,
        filters: payload
      };
    case VILLAGE_FETCHED_DATA_SUCCESS:
      let obj = {
        ...state,
        isLoading: false,
        data: payload,
      };
      if (payload.count !== undefined) {
        obj['total'] = payload.count;
      }
      return obj;
    case VILLAGE_GET_DROPDOWN_LIST:
      return {
        ...state,
        isLoading: false,
        list_data: payload.data
      }
    case VILLAGE_GET_FAILURE:
      return {
        ...state,
        isLoading: false
      };
    default:
      return state;
  }
};
