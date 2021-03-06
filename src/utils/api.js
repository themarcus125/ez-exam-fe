const API_URL = process.env.GATSBY_API_URL;

export const getAPI = (endpoint, options = {}) =>
  fetch(`${API_URL}${endpoint}`, options);

export const uploadVideoFile = async (
  fileBlob,
  filename,
  maCTPhong,
  type,
  token,
) => {
  try {
    const formData = new FormData();
    formData.append("file", fileBlob, filename);
    formData.append("name", filename);
    formData.append("maCTPhong", maCTPhong);
    formData.append("type", type);
    const response = await postFileAPIWithToken("/videos", formData, token);
    if (response.status === 200) {
      console.log("Video file has uploaded successfully.");
    }
  } catch (error) {
    console.log("Video file has failed to upload successfully !!!", error);
  }
};

export const getAPIWithToken = (endpoint, token, options = {}) =>
  fetch(`${API_URL}${endpoint}`, {
    headers: {
      Accept: "application/json",
      Authorization: `Bearer ${token}`,
    },
    ...options,
  }).then((response) => response.json());

export const putAPI = (endpoint, options = {}) =>
  fetch(`${API_URL}${endpoint}`, {
    method: "PUT",
    headers: {
      "Content-Type": "application/json",
    },
    ...options,
  });

export const putAPIWithToken = (endpoint, data, token, options = {}) =>
  fetch(`${API_URL}${endpoint}`, {
    method: "PUT",
    headers: {
      Accept: "application/json",
      "Content-Type": "application/json",
      Authorization: `Bearer ${token}`,
    },
    body: data ? JSON.stringify(data) : null,
    ...options,
  });

export const deleteAPI = (endpoint, options = {}) =>
  fetch(`${API_URL}${endpoint}`, {
    method: "DELETE",
    ...options,
  });

export const postAPI = (endpoint, data, options = {}) =>
  fetch(`${API_URL}${endpoint}`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: data ? JSON.stringify(data) : null,
    ...options,
  });

export const postAPIWithToken = (endpoint, data, token, options = {}) =>
  fetch(`${API_URL}${endpoint}`, {
    method: "POST",
    headers: {
      Accept: "application/json",
      "Content-Type": "application/json",
      Authorization: `Bearer ${token}`,
    },
    body: data ? JSON.stringify(data) : null,
    ...options,
  });

export const postAPIForm = (endpoint, data, options = {}) =>
  fetch(`${API_URL}${endpoint}`, {
    method: "POST",
    headers: {
      "Content-Type": "application/x-www-form-urlencoded",
    },
    body: data ? new URLSearchParams(data) : null,
    ...options,
  });

export const postAPIFormWithToken = (endpoint, data, token, options = {}) =>
  fetch(`${API_URL}${endpoint}`, {
    method: "POST",
    headers: {
      "Content-Type": "application/x-www-form-urlencoded",
      Authorization: `Bearer ${token}`,
    },
    body: data ? new URLSearchParams(data) : null,
    ...options,
  });

export const postFileAPIWithToken = (endpoint, formData, token, options = {}) =>
  fetch(`${API_URL}${endpoint}`, {
    method: "POST",
    headers: {
      Authorization: `Bearer ${token}`,
    },
    body: formData,
    ...options,
  });

export const deleteAPIWithToken = (endpoint, token, options = {}) =>
  fetch(`${API_URL}${endpoint}`, {
    method: "DELETE",
    headers: {
      Accept: "application/json",
      Authorization: `Bearer ${token}`,
    },
    ...options,
  });
