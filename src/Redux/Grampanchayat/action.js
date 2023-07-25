import axios from 'axios';
import { toast } from 'react-toastify';
import { deleteData, loadData } from 'src/utils/sessionStorage';
import { filterUrl } from '../../utils/halper';
import {
  GRAMPANCHAYAT_FETCHED_DATA_SUCCESS,
  GRAMPANCHAYAT_GET_DROPDOWN_LIST,
  GRAMPANCHAYAT_GET_FAILURE,
  GRAMPANCHAYAT_LIST_REQUEST,
} from '../Grampanchayat/actionType';

const baseUrl = process.env.REACT_APP_API_URL;

export const listGrampanchayatRequest = payload => {
  return {
    type: GRAMPANCHAYAT_LIST_REQUEST,
    payload,
  };
};
export const listGrampanchayatSuccess = payload => {
  return {
    type: GRAMPANCHAYAT_FETCHED_DATA_SUCCESS,
    payload,
  };
};
export const listGrampanchayatFailure = payload => {
  return {
    type: GRAMPANCHAYAT_GET_FAILURE,
    payload,
  };
};
export const listDropdownPanchayatSuccess = payload => {
  return {
    type: GRAMPANCHAYAT_GET_DROPDOWN_LIST,
    payload,
  };
};

export const GrampanchayatList = payload => dispatch => {
  const loginInfo = loadData('loginInfo');
  dispatch(listGrampanchayatRequest(payload));
  axios({
    method: 'get',
    url: `${baseUrl}grampanchayat/list${filterUrl(payload)}`,
    headers: {
      'x-access-token': loginInfo.token,
    },
  })
    .then(res => {
      if (payload.fetched == 'All') {
        dispatch(listDropdownPanchayatSuccess(res.data));
      } else {
        dispatch(listGrampanchayatSuccess(res.data));
      }
    })
    .catch(err => {
      dispatch(listGrampanchayatFailure(err.message));
      if (err.response !== undefined && err.response.status == 400) {
        toast.error('Got error while getting');
      } else if (err.response !== undefined && err.response.status == 500) {
        toast.error('Internal Server error');
      } else if (err?.response && err?.response?.status === 401) {
        deleteData('loginInfo')
        window.location.href = '/login';
      } else {
        toast.error('Got error while getting');
      }
    });
};
