import axios from "axios";
import { toast } from "react-toastify";
import { getToken } from "src/utils/sessionStorage";
import { filterUrl } from "../../utils/halper";
import {
  VOLUNTEER_CREATE_FAILURE,
  VOLUNTEER_CREATE_REQUEST,
  VOLUNTEER_CREATE_SUCCESS,
  VOLUNTEER_DELETE_FAILURE,
  VOLUNTEER_DELETE_REQUEST,
  VOLUNTEER_DELETE_SUCCESS,
  VOLUNTEER_FETCHED_DATA_SUCCESS,
  VOLUNTEER_GET_FAILURE,
  VOLUNTEER_LIST_REQUEST,
  VOLUNTEER_BULK_UPLOAD_REQUEST,
  VOLUNTEER_BULK_UPLOAD_SUCCESS,
  VOLUNTEER_BULK_UPLOAD_FAILURE,
  VOLUNTEER_SELECTED_IDS,
} from "./actionType";

const baseUrl = process.env.REACT_APP_API_URL;
export const createVolunteerRequest = () => {
  return {
    type: VOLUNTEER_CREATE_REQUEST,
  };
};

export const createVolunteerSuccess = (payload) => {
  return {
    type: VOLUNTEER_CREATE_SUCCESS,
    payload,
  };
};

export const createVolunteerFailure = (payload) => {
  return {
    type: VOLUNTEER_CREATE_FAILURE,
    payload,
  };
};
export const listVolunteerRequest = (payload) => {
  return {
    type: VOLUNTEER_LIST_REQUEST,
    payload,
  };
};
export const listVolunteerSuccess = (payload) => {
  return {
    type: VOLUNTEER_FETCHED_DATA_SUCCESS,
    payload,
  };
};
export const listVolunteerFailure = (payload) => {
  return {
    type: VOLUNTEER_GET_FAILURE,
    payload,
  };
};

export const create = (payload) => (dispatch) => {
  dispatch(createVolunteerRequest());
  axios({
    method: "post",
    url: `${baseUrl}VOLUNTEER/create`,
    data: payload,
    headers: {
      "x-access-token": getToken(),
    },
  })
    .then((res) => {
      dispatch(createVolunteerSuccess(res.data.success));
      toast.success("Successfully create content");
      // dispatch(<Navigate to="/app/userlist" />)
    })
    .catch((err) => {
      dispatch(createVolunteerFailure(err.message));
      if (err.response !== undefined && err.response.status === 400) {
        toast.error(err.response.data.err);
      } else if (err.response !== undefined && err.response.status === 500) {
        toast.error(err.response.data.err);
      } else if (err?.response && err?.response?.status === 401) {
        deleteData('loginInfo')
        window.location.href = '/login';
      } else {
        toast.error(err.message);
      }
    });
};
export const volunteerList = (payload) => (dispatch) => {
  dispatch(listVolunteerRequest(payload));
  axios({
    method: "get",
    url: `${baseUrl}volunteer/list${filterUrl(payload)}`,
    headers: {
      "x-access-token": getToken(),
    },
  })
    .then((res) => {
      dispatch(listVolunteerSuccess(res.data));
    })
    .catch((err) => {
      dispatch(listVolunteerFailure(err.message));
      if (err.response !== undefined && err.response.status === 500) {
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
  dispatch(createVolunteerRequest());
  axios({
    method: "put",
    url: `${baseUrl}VOLUNTEER/update/${payload.id}`,
    data: payload,
    headers: {
      "x-access-token": getToken(),
    },
  })
    .then((res) => {
      dispatch(createVolunteerSuccess(res.data.success));
      toast.success("Successfully update content");
    })
    .catch((err) => {
      dispatch(createVolunteerFailure(err.message));
      if (err.response !== undefined && err.response.status === 500) {
        // toast.error("Internal Server Error");
        toast.error(err.response.data.err);
      } else if (err?.response && err?.response?.status === 401) {
        deleteData('loginInfo')
        window.location.href = '/login';
      } else {
        toast.error(err.message);
      }
    });
};

export const deleteData = (payload) => (dispatch) => {
  dispatch({ type: VOLUNTEER_DELETE_REQUEST });
  axios({
    method: "put",
    url: `${baseUrl}volunteer/delete`,
    data: { id: payload.id, is_deleted: payload.isDeleted },
    headers: {
      "x-access-token": getToken(),
    },
  })
    .then((res) => {
      dispatch({ type: VOLUNTEER_DELETE_SUCCESS, payload: res.data.success });
    })
    .catch((err) => {
      dispatch({ type: VOLUNTEER_DELETE_FAILURE, payload: err.message });
      if (err.response !== undefined && err.response.status === 500) {
        toast.error("Internal Server Error");
      } else if (err?.response && err?.response?.status === 401) {
        deleteData('loginInfo')
        window.location.href = '/login';
      } else {
        toast.error(err.message);
      }
    });
};

export const volunteerBulkUploadAction = (file) => (dispatch) => {
  dispatch({ type: VOLUNTEER_BULK_UPLOAD_REQUEST });

  const myHeaders = new Headers();
  myHeaders.append("x-access-token", getToken());

  const requestOptions = {
    method: "POST",
    headers: myHeaders,
    body: file,
    redirect: "follow",
  };

  fetch(`${baseUrl}volunteer/upload`, requestOptions)
    .then((res) => res.json())
    .then((result) => {
      dispatch({ type: VOLUNTEER_BULK_UPLOAD_SUCCESS, payload: result });
      toast.success(result.message);
    })
    .catch((err) => {
      dispatch({ type: VOLUNTEER_BULK_UPLOAD_FAILURE, payload: err.message });
      if (err.response) {
        toast.error(err.response.data.message);
      } else if (err?.response && err?.response?.status === 401) {
        deleteData('loginInfo')
        window.location.href = '/login';
      } else {
        toast.error(err.message);
      }
    });
};

export const volunteerSelectedAction = (inputData) => (dispatch) => {
  dispatch({ type: VOLUNTEER_SELECTED_IDS, payload: inputData.join(",") });
};
