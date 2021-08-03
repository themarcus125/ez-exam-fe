import { postAPIForm, postAPIWithToken } from "../utils/api";
import Config from "./config";
const CURRENT_USER = "currentUser";

export const isBrowser = () => typeof window !== "undefined";

export const getUser = () =>
  isBrowser() && window.localStorage.getItem(CURRENT_USER)
    ? JSON.parse(window.localStorage.getItem(CURRENT_USER))
    : {};

const setUser = (user) =>
  window.localStorage.setItem(CURRENT_USER, JSON.stringify(user));

const getTokenFromLocalStorage = () => {
  const user = getUser();
  return user?.tk;
};

const setTokenToLocalStorage = async (token) => {
  const user = getUser();
  user.tk = token;
  setUser(user);
};

const refreshToken = async (token) => {
  try {
    const response = await postAPIWithToken("/refresh", null, token);
    const { data } = await response.json();
    return data;
  } catch (err) {
    console.log("Error occured while refreshing token ", err);
  }
};

const checkToken = async (token) => {
  let tokenIsValid = false;
  if (token) {
    try {
      const response = await postAPIWithToken("/me", null, token);
      const { data } = await response.json();
      if (data) {
        tokenIsValid = true;
      }
    } catch (err) {
      console.log("Error occured while checking token ", err);
    }
  }
  return tokenIsValid;
};

export const getToken = async () => {
  let token = null;
  const tokenFromLocalStorage = getTokenFromLocalStorage();
  if (tokenFromLocalStorage) {
    token = checkToken(tokenFromLocalStorage)
      ? tokenFromLocalStorage
      : await refreshToken(token);
    if (token !== tokenFromLocalStorage) {
      setTokenToLocalStorage(token);
    }
  }
  return token;
};

export const handleLogin = async (
  { email, password },
  onSuccess = () => {},
  onFail = () => {},
) => {
  try {
    const response = await postAPIForm("/login", {
      tenDangNhap: email,
      matKhau: password,
    });
    const { data } = await response.json();
    const role = data?.user?.phan_quyen?.[0]?.quyen;
    setUser({
      email: data?.user?.email,
      username: data?.user?.tenDangNhap,
      role,
      tk: data?.token,
    });
    onSuccess(Config.urlPath[role].url);
  } catch (err) {
    return onFail(err);
  }
};

export const isLoggedIn = async (role) => {
  const token = await getToken();
  const user = getUser();
  if (token && Config.urlPath[user.role].role === role) {
    return !!user.tk;
  }
  return false;
};

export const getUserRole = async () => {
  let role = "";
  try {
    const token = await getToken();
    if (token) {
      role = Config.urlPath[getUser().role]?.role;
    }
  } catch (err) {
    console.log("Error occured while getting user role ", err);
  }
  return role;
};

export const logout = async (callback = () => {}) => {
  const tokenLogout = getUser()?.tk;
  try {
    await postAPIWithToken("/logout", null, tokenLogout);
    setUser({});
  } catch (err) {
    alert("Logout failed !!!");
  } finally {
    callback();
  }
};
