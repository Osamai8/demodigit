import axios from "axios";
import { toast } from "react-toastify";
import { deleteData, getToken } from "src/utils/sessionStorage";
import { filterUrl } from "../../utils/halper";
import {
  CAMPAIGN_CREATE_FAILURE,
  CAMPAIGN_CREATE_REQUEST,
  CAMPAIGN_CREATE_SUCCESS,
  CAMPAIGN_DELETE_FAILURE,
  CAMPAIGN_DELETE_REQUEST,
  CAMPAIGN_DELETE_SUCCESS,
  CAMPAIGN_FETCHED_DATA_SUCCESS,
  CAMPAIGN_GET_FAILURE,
  CAMPAIGN_LIST_REQUEST,
  CAMPAIGN_GETBYID_REQUEST,
  CAMPAIGN_GETBYID_SUCCESS,
  CAMPAIGN_GETBYID_FAILURE,
  CAMPAIGN_LOCATION_REQUEST,
  CAMPAIGN_LOCATION_SUCCESS,
  CAMPAIGN_LOCATION_FAILURE,
  COMPAIGN_SELECTED_IDS,
} from "./actionType";
const baseUrl = process.env.REACT_APP_API_URL;

export const createCampaignRequest = () => {
  return {
    type: CAMPAIGN_CREATE_REQUEST,
  };
};

export const createCampaignSuccess = (payload) => {
  return {
    type: CAMPAIGN_CREATE_SUCCESS,
    payload,
  };
};

export const createCampaignFailure = (payload) => {
  return {
    type: CAMPAIGN_CREATE_FAILURE,
    payload,
  };
};

export const listCampaignRequest = (payload) => {
  return {
    type: CAMPAIGN_LIST_REQUEST,
    payload,
  };
};

export const listCampaignSuccess = (payload) => {
  return {
    type: CAMPAIGN_FETCHED_DATA_SUCCESS,
    payload,
  };
};

export const listCampaignFailure = (payload) => {
  return {
    type: CAMPAIGN_GET_FAILURE,
    payload,
  };
};

export const createAction = (payload) => (dispatch) => {
  dispatch(createCampaignRequest());
  axios({
    method: "post",
    url: `${baseUrl}campaign/create`,
    data: payload,
    headers: {
      "x-access-token": getToken(),
    },
  })
    .then((res) => {
      dispatch(createCampaignSuccess(res.data.success));
      toast.success("Successfully create content");
    })
    .catch((err) => {
      dispatch(createCampaignFailure(err.message));
      if (err.response !== undefined && err.response.status === 500) {
        toast.error("Internal Server Error");
      } else if (err.response !== undefined && err.response.status === 400) {
        toast.error(err.response.data.message);
      } else if (err?.response && err?.response?.status === 401) {
        deleteData('loginInfo')
        window.location.href = '/login';
      } else {
        toast.error(err.message);
      }
    });
};

export const campaignListAction = (payload) => (dispatch) => {
  dispatch(listCampaignRequest(payload));
  axios({
    method: "get",
    url: `${baseUrl}campaign/list${filterUrl(payload)}`,
    headers: {
      "x-access-token": getToken(),
    },
  })
    .then((res) => {
      dispatch(listCampaignSuccess(res.data));
    })
    .catch((err) => {
      dispatch(listCampaignFailure(err.message));
      if (err.response !== undefined && err.response.status === 500) {
        toast.error("Internal Server Error");
      } else if (err.response !== undefined && err.response.status === 400) {
        toast.error(err.response.data.message);
      } else if (err?.response && err?.response?.status === 401) {
        deleteData('loginInfo')
        window.location.href = '/login';
      } else {
        toast.error(err.message);
      }
    });
};

export const updateAction = (payload) => (dispatch) => {
  dispatch(createCampaignRequest());
  axios({
    method: "put",
    url: `${baseUrl}campaign/update/${payload.id}`,
    data: payload,
    headers: {
      "x-access-token": getToken(),
    },
  })
    .then((res) => {
      dispatch(createCampaignSuccess(res.data.success));
      toast.success("Successfully update content");
    })
    .catch((err) => {
      dispatch(createCampaignFailure(err.message));
      if (err.response !== undefined && err.response.status === 500) {
        toast.error("Internal Server Error");
      } else if (err.response !== undefined && err.response.status === 400) {
        toast.error(err.response.data.message);
      } else if (err?.response && err?.response?.status === 401) {
        deleteData('loginInfo')
        window.location.href = '/login';
      } else {
        toast.error(err.message);
      }
    });
};

export const deleteDataAction = (payload) => (dispatch) => {
  dispatch({ type: CAMPAIGN_DELETE_REQUEST });
  axios({
    method: "put",
    url: `${baseUrl}campaign/delete`,
    data: { id: payload.id, is_deleted: payload.isDeleted },
    headers: {
      "x-access-token": getToken(),
    },
  })
    .then((res) => {
      dispatch({ type: CAMPAIGN_DELETE_SUCCESS, payload: res.data.success });
    })
    .catch((err) => {
      dispatch({ type: CAMPAIGN_DELETE_FAILURE, payload: err.message });
      if (err.response !== undefined && err.response.status === 500) {
        toast.error("Internal Server Error");
      } else if (err?.response && err?.response?.status === 401) {
        deleteData('loginInfo')
        window.location.href = '/login';
      } else if (err.response !== undefined && err.response.status === 400) {
        toast.error(err.response.data.message);
      } else {
        toast.error(err.message);
      }
    });
};

export const getCampaignByIdAction = (payload) => (dispatch) => {
  dispatch({ type: CAMPAIGN_GETBYID_REQUEST });
  axios({
    method: "get",
    url: `${baseUrl}campaign/getById/${payload}`,
    // data: {id: payload},
    headers: {
      "x-access-token": getToken(),
    },
  })
    .then((res) => {
      dispatch({ type: CAMPAIGN_GETBYID_SUCCESS, payload: res.data });
    })
    .catch((err) => {
      dispatch({ type: CAMPAIGN_GETBYID_FAILURE, payload: err.message });
      if (err.response !== undefined && err.response.status === 500) {
        toast.error("Internal Server Error");
      } else if (err.response !== undefined && err.response.status === 400) {
        toast.error(err.response.data.message);
      } else if (err?.response && err?.response?.status === 401) {
        deleteData('loginInfo')
        window.location.href = '/login';
      } else {
        toast.error(err.message);
      }
    });
};

export const getCampaignLocationAction = (payload) => (dispatch) => {
  dispatch({ type: CAMPAIGN_LOCATION_REQUEST });
  axios({
    method: "get",
    url: `${baseUrl}campaign/location/${payload}`,
    headers: {
      "x-access-token": getToken(),
    },
  })
    .then((res) => {
      dispatch({ type: CAMPAIGN_LOCATION_SUCCESS, payload: res.data });
    })
    .catch((err) => {
      dispatch({ type: CAMPAIGN_LOCATION_FAILURE, payload: err.message });
      if (err.response !== undefined && err.response.status === 500) {
        toast.error("Internal Server Error");
      } else if (err.response !== undefined && err.response.status === 400) {
        toast.error(err.response.data.message);
      } else if (err?.response && err?.response?.status === 401) {
        deleteData('loginInfo')
        window.location.href = '/login';
      } else {
        toast.error(err.message);
      }
    });
};

export const compaignSelectedAction = (inputData) => (dispatch) => {
  dispatch({ type: COMPAIGN_SELECTED_IDS, payload: inputData.join(",") });
};
