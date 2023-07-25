import { getToken } from "src/utils/sessionStorage";
export const fetchWrapper = {
  get,
  post,
  put,
  delete: _delete,
  uploadFile,
  s3UploadFile,
};
function get(url) {
  const requestOptions = {
    method: "GET",
    headers: {
      "x-access-token": getToken(),
    },
  };
  return fetch(url, requestOptions).then(handleResponse);
}
function post(url, body) {
  const requestOptions = {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      "x-access-token": getToken(),
    },
    body: JSON.stringify(body),
  };
  return fetch(url, requestOptions).then(handleResponse);
}
function put(url, body) {
  const requestOptions = {
    method: "PUT",
    headers: {
      "Content-Type": "application/json",
      "x-access-token": getToken(),
    },
    body: JSON.stringify(body),
  };
  return fetch(url, requestOptions).then(handleResponse);
}
function _delete(url) {
  const requestOptions = {
    method: "DELETE",
    headers: {
      "x-access-token": getToken(),
    },
  };
  return fetch(url, requestOptions).then(handleResponse);
}
function handleResponse(response) {
  return response.text().then((text) => {
    const data = text && JSON.parse(text);
    if (!response.ok) {
      const error = (data && data.message) || response.statusText;
      return Promise.reject(error);
    }
    return data;
  });
}
async function uploadFile(body) {
  let file = body.target.files[0];
  const baseUrl = process.env.REACT_APP_API_URL;
  let requestOptions = {
    method: "post",
    body: JSON.stringify([
      {
        file_name: file.name,
      },
    ]),
    headers: {
      "Content-Type": "application/json",
      "x-access-token": getToken(),
    },
  };
  let url = `${baseUrl}getSignedUrl`;
  let responceUrl = await fetch(url, requestOptions).then(handleResponse);
  if (responceUrl.success) {
    let putOptions = {
      method: "put",
      body: file,
      headers: {
        "Content-Type": file.type,
        excludeContentHeader: true,
        "x-access-token": getToken(),
      },
    };
    let putData = await fetch(responceUrl["data"][0]["url"], putOptions).then(
      handleResponse
    );
    if (putData.success) {
      return { success: true, url: responceUrl["data"][0]["file_alias"] };
    } else {
      return { success: false, message: putData.message };
    }
  } else {
    return { success: false, message: responceUrl.message };
  }
}
async function s3UploadFile(file) {
  const baseUrl = process.env.REACT_APP_API_URL;
  let requestOptions = {
    method: "post",
    body: JSON.stringify([
      {
        file_name: file.name,
        mime_type: file.type,
      },
    ]),
    headers: {
      "Content-Type": "application/json",
      "x-access-token": getToken(),
    },
  };
  let url = `${baseUrl}getSignedUrl`;
  let responceUrl = await fetch(url, requestOptions).then(handleResponse);
  if (responceUrl.success) {
    let putOptions = {
      method: "put",
      body: file,
      headers: {
        "Content-Type": file.type,
        excludeContentHeader: true,
        "x-access-token": getToken(),
      },
    };
    let response = await fetch(responceUrl["data"]["url"], putOptions);
    if (response.status === 403) {
      let obj = { success: false, message: response.statusText };
      return obj;
    } else {
      return { success: true, url: responceUrl["data"]["file_url"] };
    }
  } else {
    return { success: false, message: responceUrl.message };
  }
}
