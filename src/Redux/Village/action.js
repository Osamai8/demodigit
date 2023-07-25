import axios from 'axios';
import {
  VILLAGE_LIST_REQUEST,
  VILLAGE_FETCHED_DATA_SUCCESS,
  VILLAGE_GET_FAILURE,
  VILLAGE_GET_DROPDOWN_LIST,
} from '../Village/actionType';
import { loadData, getToken, deleteData } from 'src/utils/sessionStorage';
import { filterUrl } from '../../utils/halper';
import { toast } from 'react-toastify';

const baseUrl = process.env.REACT_APP_API_URL;

export const listVillageRequest = payload => {
  return {
    type: VILLAGE_LIST_REQUEST,
    payload,
  };
};
export const listVillageSuccess = payload => {
  return {
    type: VILLAGE_FETCHED_DATA_SUCCESS,
    payload,
  };
};
export const listVillageFailure = payload => {
  return {
    type: VILLAGE_GET_FAILURE,
    payload,
  };
};
export const listDropdownVillageSuccess = payload => {
  return {
    type: VILLAGE_GET_DROPDOWN_LIST,
    payload,
  };
};

export const VillageList = payload => dispatch => {
  dispatch(listVillageRequest(payload));
  axios({
    method: 'get',
    url: `${baseUrl}village/list${filterUrl(payload)}`,
    headers: {
      'x-access-token': getToken(),
    },
  }).then(res => {
    if (payload.fetched == 'All') {
      dispatch(listDropdownVillageSuccess(res.data));
    } else {
      dispatch(listVillageSuccess(res.data));
    }
  }).catch(err => {
    dispatch(listVillageFailure(err.message));
    if (err.response !== undefined && err.response.status == 400) {
      toast.error('Got Error while getting');
    } else if (err.response !== undefined && err.response.status == 500) {
      toast.error('Internal Server Error');
    }  else if (err?.response && err?.response?.status === 401) {
      deleteData('loginInfo')
      window.location.href = '/login';
    }else {
      toast.error('Got Error while getting');
    }
  });
};