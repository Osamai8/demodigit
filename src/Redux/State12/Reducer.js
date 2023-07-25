import {
  STATE_LIST_REQUEST,
  STATE_FETCHED_DATA_SUCCESS,
  STATE_GET_DROPDOWN_LIST,
  STATE_GET_FAILURE,
  STATE_FILTER_LIST_REQUEST,
} from './actionType';
import { loadData } from 'src/utils/sessionStorage';
const loginInfo = loadData('loginInfo');
const initState = {
  isLoading: false,
  data: [],
  total: '',
  list_data: [],
  filters: {
    page: 1,
  },
};
export const StateReducer = (state = initState, { type, payload }) => {
  switch (type) {
    case STATE_LIST_REQUEST:
      return {
        ...state,
        isLoading: true,
        filters: payload
      };
    case STATE_FETCHED_DATA_SUCCESS:
      let obj = {
        ...state,
        isLoading: false,
        data: payload
      };
      if (payload.count !== undefined) {
        obj['total'] = payload.count;
      }
      return obj;
    case STATE_GET_DROPDOWN_LIST:
      return {
        ...state,
        isLoading: false,
        list_data: payload.data
      }
    case STATE_GET_FAILURE:
      return {
        ...state,
        isLoading: false
      }
    case STATE_FILTER_LIST_REQUEST:
      return {
        ...state,
        isLoading:false,
        data:payload
      }
    default:
      return state;
  }
};
