import {
  LIST_REQUEST,
  FETCHED_DATA_SUCCESS,
  GET_FAILURE
} from './actionType';

const initState = {
  isLoading: false,
  redirectToNewPage: false,
  isDeleted: false,
  data: [],
  total: '',
  filters: {
    page: 1
  },
};
export const DashBoardReducer = (state = initState, { type, payload }) => {
  switch (type) {
    case LIST_REQUEST:
      return {
        ...state,
        isLoading: true,
        redirectToNewPage: false,
        isDeleted: false,
      };
    case FETCHED_DATA_SUCCESS:
      return {
        ...state,
        isLoading: false,
        data: payload,
        redirectToNewPage: false,
        isDeleted: false,
      };
    case GET_FAILURE:
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
