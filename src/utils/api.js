const API_URL = process.env.GATSBY_API_URL;

export const getAPI = (endpoint, options = {}) =>
  fetch(`${API_URL}${endpoint}`, options);

export const putAPI = (endpoint, options = {}) =>
  fetch(`${API_URL}${endpoint}`, {
    method: "PUT",
    headers: {
      "Content-Type": "application/json",
    },
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