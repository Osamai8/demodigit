import axios from 'axios';
import { toast } from 'react-toastify';
import { getToken } from 'src/utils/sessionStorage';
// import { compose } from 'redux';
import { filterUrl } from '../../utils/halper';
import {
    STATE_FETCHED_DATA_SUCCESS,

    STATE_FILTER_LIST_REQUEST,

    STATE_GET_DROPDOWN_LIST, STATE_GET_FAILURE, STATE_LIST_REQUEST
} from './actionType';

const baseUrl = process.env.REACT_APP_API_URL;

export const listStateRequest = payload => {
  return {
    type: STATE_LIST_REQUEST,
    payload,
  };
};
export const listStateSuccess = payload => {
  return {
    type: STATE_FETCHED_DATA_SUCCESS,
    payload,
  };
};
export const listStateFailure = payload => {
  return {
    type: STATE_GET_FAILURE,
    payload,
  };
};
export const filterListStateRequest = payload => {
  return {
    type: STATE_FILTER_LIST_REQUEST,
    payload,
  };
};

export const listDropdownStateSuccess = payload => {
  return {
    type: STATE_GET_DROPDOWN_LIST,
    payload,
  };
};

export const StateList = payload => async dispatch => {
  dispatch(listStateRequest(payload));
  await axios({
    method: 'get',
    url: `${baseUrl}state/list${filterUrl(payload)}`,
    headers: {
      'x-access-token': getToken(),
    },
  }).then(res => {
    if (payload.fetched == 'All') {
      dispatch(listDropdownStateSuccess(res.data));
    } else {
      dispatch(listStateSuccess(res.data));
    }
  }).catch(err => {
    
    dispatch(listStateFailure(err.message));
    if (err.response !== undefined && err.response.status == 400) {
      toast.error('Got error while getting');
    } else if (err.response !== undefined && err.response.status == 500) {
      toast.error('Internal Server error');
    } else {
      toast.error('Got error while getting');
    }
  });
};
