import axios from "axios";
import { toast } from "react-toastify";
import { getToken } from "src/utils/sessionStorage";
import { filterUrl } from "../../utils/halper";
import {
  NGO_PARTNER_CREATE_FAILURE,
  NGO_PARTNER_CREATE_REQUEST,
  NGO_PARTNER_CREATE_SUCCESS,
  NGO_PARTNER_DELETE_FAILURE,
  NGO_PARTNER_DELETE_REQUEST,
  NGO_PARTNER_DELETE_SUCCESS,
  NGO_PARTNER_FETCHED_DATA_SUCCESS,
  NGO_PARTNER_GET_FAILURE,
  NGO_PARTNER_LIST_REQUEST,
  NGO_BULK_UPLOAD_REQUEST,
  NGO_BULK_UPLOAD_SUCCESS,
  NGO_BULK_UPLOAD_FAILURE,
  NGO_SELECTED_IDS,
} from "./actionType";

const baseUrl = process.env.REACT_APP_API_URL;
export const createNgoPartnerRequest = () => {
  return {
    type: NGO_PARTNER_CREATE_REQUEST,
  };
};

export const createNgoPartnerSuccess = (payload) => {
  return {
    type: NGO_PARTNER_CREATE_SUCCESS,
    payload,
  };
};

export const createNgoPartnerFailure = (payload) => {
  return {
    type: NGO_PARTNER_CREATE_FAILURE,
    payload,
  };
};

export const listNgoPartnerRequest = (payload) => {
  return {
    type: NGO_PARTNER_LIST_REQUEST,
    payload,
  };
};

export const listNgoPartnerSuccess = (payload) => {
  return {
    type: NGO_PARTNER_FETCHED_DATA_SUCCESS,
    payload,
  };
};

export const listNgoPartnerFailure = (payload) => {
  return {
    type: NGO_PARTNER_GET_FAILURE,
    payload,
  };
};

export const create = (payload) => (dispatch) => {
  dispatch(createNgoPartnerRequest());
  axios({
    method: "post",
    url: `${baseUrl}ngo_partner/create`,
    data: payload,
    headers: {
      "x-access-token": getToken(),
    },
  })
    .then((res) => {
      dispatch(createNgoPartnerSuccess(res.data.success));
      toast.success("Successfully create content");
    })
    .catch((err) => {
      dispatch(createNgoPartnerFailure(err.message));
      if (err?.response && err?.response?.status === 500) {
        toast.error("Internal Server Error");
      } else if (err?.response && err?.response?.status === 401) {
        deleteData('loginInfo')
        window.location.href = '/login';
      } else {
        toast.error(err.message);
      }
    });
};

export const ngoPartnerList = (payload) => (dispatch) => {
  dispatch(listNgoPartnerRequest(payload));
  axios({
    method: "get",
    url: `${baseUrl}ngo_partner/list${filterUrl(payload)}`,
    headers: {
      "x-access-token": getToken(),
    },
  })
    .then((res) => {
      dispatch(listNgoPartnerSuccess(res.data));
    })
    .catch((err) => {
      dispatch(listNgoPartnerFailure(err.message));
      if (err?.response && err?.response?.status === 500) {
        toast.error("Internal Server Error");
      } else if (err?.response && err?.response?.status === 401) {
        deleteData('loginInfo')
        window.location.href = '/login';
      } else {
        toast.error(err.message);
      }
    });
};

export const update = (payload) => (dispatch) => {
  dispatch(createNgoPartnerRequest());
  axios({
    method: "put",
    url: `${baseUrl}ngo_partner/update/${payload.id}`,
    data: payload,
    headers: {
      "x-access-token": getToken(),
    },
  })
    .then((res) => {
      dispatch(createNgoPartnerSuccess(res.data.success));
      toast.success("Successfully update content");
    })
    .catch((err) => {
      dispatch(createNgoPartnerFailure(err.message));
      if (err?.response && err?.response?.status === 500) {
        toast.error("Internal Server Error");
      } else if (err?.response && err?.response?.status === 401) {
        deleteData('loginInfo')
        window.location.href = '/login';
      } else {
        toast.error(err.message);
      }
    });
};

export const deleteData = (payload) => (dispatch) => {
  dispatch({ type: NGO_PARTNER_DELETE_REQUEST });
  axios({
    method: "put",
    url: `${baseUrl}ngo_partner/delete`,
    data: { id: payload.id, is_deleted: payload.isDeleted },
    headers: {
      "x-access-token": getToken(),
    },
  })
    .then((res) => {
      dispatch({ type: NGO_PARTNER_DELETE_SUCCESS, payload: res.data.success });
    })
    .catch((err) => {
      dispatch({ type: NGO_PARTNER_DELETE_FAILURE, payload: err.message });
      if (err?.response && err?.response?.status === 500) {
        toast.error("Internal Server Error");
      } else if (err?.response && err?.response?.status === 401) {
        deleteData('loginInfo')
        window.location.href = '/login';
      } else {
        toast.error(err.message);
      }
    });
};

export const ngoBulkUploadAction = (file) => async (dispatch) => {
  dispatch({ type: NGO_BULK_UPLOAD_REQUEST });

  const myHeaders = new Headers();
  myHeaders.append("x-access-token", getToken());

  const requestOptions = {
    method: "POST",
    headers: myHeaders,
    body: file,
    redirect: "follow",
  };

  fetch(`${baseUrl}ngo_partner/upload`, requestOptions)
    .then((res) => res.json())
    .then((result) => {
      dispatch({ type: NGO_BULK_UPLOAD_SUCCESS, payload: result });
      toast.success(result.message);
    })
    .catch((err) => {
      dispatch({ type: NGO_BULK_UPLOAD_FAILURE, payload: err.message });
      if (err?.response && err?.response?.status === 500) {
        toast.error("Internal Server Error");
      } else if (err?.response && err?.response?.status === 401) {
        deleteData('loginInfo')
        window.location.href = '/login';
      } else {
        toast.error(err.message);
      }
    });

  // try {
  //   const { data } = await axios.post(
  //     `${baseUrl}ngo_partner/upload`,
  //     { file },
  //     { headers: { "x-access-token": getToken() } }
  //   );
  //   dispatch({ type: NGO_BULK_UPLOAD_SUCCESS, payload: data });
  // } catch (err) {
  //   dispatch({ type: NGO_BULK_UPLOAD_FAILURE, payload: err.message });
  //   if (err.response) {
  //     toast.error(err.response.data.message);
  //   } else {
  //     toast.error(err.message);
  //   }
  // }
};

export const ngoSelectedAction = (inputData) => (dispatch) => {
  dispatch({ type: NGO_SELECTED_IDS, payload: inputData.join(",") });
};
