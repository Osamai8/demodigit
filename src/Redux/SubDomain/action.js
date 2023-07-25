import axios from "axios";
import { toast } from "react-toastify";
import { getToken } from "src/utils/sessionStorage";
import { filterUrl } from "../../utils/halper";
import {
  SUBDOMAIN_LIST_REQUEST,
  SUBDOMAIN_DROPDOWN_SUCCESS,
  SUBDOMAIN_LIST_SUCCESS,
  SUBDOMAIN_LIST_FAILURE,
  SUBDOMAIN_DLELETE_REQUEST,
  SUBDOMAIN_DLELETE_SUCCESS,
  SUBDOMAIN_DLELETE_FAILURE,
  SUBDOMAIN_CREATE_REQUEST,
  SUBDOMAIN_CREATE_SUCCESS,
  SUBDOMAIN_CREATE_FAILURE,
  SUBDOMAIN_UPDATE_REQUEST,
  SUBDOMAIN_UPDATE_SUCCESS,
  SUBDOMAIN_UPDATE_FAILURE,
  SUBDOMAIN_SELECTED_IDS,
} from "./actionType";

const baseUrl = process.env.REACT_APP_API_URL;

export const subDomainListAction = (inputData) => async (dispatch) => {
  dispatch({ type: SUBDOMAIN_LIST_REQUEST, payload: inputData });

  try {
    const { data } = await axios.get(
      `${baseUrl}sub_domain/list${filterUrl(inputData)}`,
      {
        headers: {
          "x-access-token": getToken(),
        },
      }
    );
    if (inputData?.fetched && inputData.fetched === "All") {
      dispatch({ type: SUBDOMAIN_DROPDOWN_SUCCESS, payload: data });
    } else {
      dispatch({ type: SUBDOMAIN_LIST_SUCCESS, payload: data });
    }
  } catch (error) {
    if (error.response) {
      dispatch({
        type: SUBDOMAIN_LIST_FAILURE,
        payload: error.response.statusText,
      });
      toast.error(error.response.statusText);
    } else {
      dispatch({ type: SUBDOMAIN_LIST_FAILURE, payload: error.message });
      toast.error(error.message);
    }
  }
};

export const suDomainCreateAction = (inputData) => async (dispatch) => {
  dispatch({ type: SUBDOMAIN_CREATE_REQUEST });

  try {
    const { data } = await axios.post(
      `${baseUrl}sub_domain/create`,
      inputData,
      {
        headers: { "x-access-token": getToken() },
      }
    );
    dispatch({ type: SUBDOMAIN_CREATE_SUCCESS, payload: data });
    toast.success("Successfully created");
  } catch (error) {
    if (error.response) {
      dispatch({
        type: SUBDOMAIN_CREATE_FAILURE,
        payload: error.response.data,
      });
      toast.error(error.response.data.message);
    } else {
      dispatch({ type: SUBDOMAIN_CREATE_FAILURE, payload: error.message });
      toast.error(error.message);
    }
  }
};

export const subDomainUpdateAction = (inputData) => async (dispatch) => {
  dispatch({ type: SUBDOMAIN_UPDATE_REQUEST });

  try {
    const { data } = await axios.put(
      `${baseUrl}sub_domain/update/${inputData.id}`,
      { name: inputData.name, domain_id: inputData.domain_id },
      {
        headers: { "x-access-token": getToken() },
      }
    );
    dispatch({ type: SUBDOMAIN_UPDATE_SUCCESS, payload: data });
    toast.success("Successfully updated");
  } catch (error) {
    if (error.response) {
      dispatch({
        type: SUBDOMAIN_UPDATE_FAILURE,
        payload: error.response.data,
      });
      toast.error(error.response.data.message);
    } else {
      dispatch({ type: SUBDOMAIN_UPDATE_FAILURE, payload: error.message });
      toast.error(error.message);
    }
  }
};

export const subDomainDeleteAction = (inputData) => async (dispatch) => {
  dispatch({ type: SUBDOMAIN_DLELETE_REQUEST });

  try {
    const { data } = await axios.put(
      `${baseUrl}sub_domain/delete`,
      { id: inputData.id, is_deleted: inputData.isDeleted },
      {
        headers: { "x-access-token": getToken() },
      }
    );
    dispatch({ type: SUBDOMAIN_DLELETE_SUCCESS, payload: data });
  } catch (error) {
    if (error.response) {
      dispatch({
        type: SUBDOMAIN_DLELETE_FAILURE,
        payload: error.response.data,
      });
      toast.error(error.response.data.message);
    } else {
      dispatch({ type: SUBDOMAIN_DLELETE_FAILURE, payload: error.message });
      toast.error(error.message);
    }
  }
};

export const subDomainSelectedAction = (inputData) => (dispatch) => {
  dispatch({ type: SUBDOMAIN_SELECTED_IDS, payload: inputData.join(",") });
};
