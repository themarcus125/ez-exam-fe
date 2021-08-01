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

export const handleLogin = async (
  { email, password },
  onSuccess = () => {},
  onFail = () => {},
) => {
  const response = await postAPIForm("/login", {
    tenDangNhap: email,
    matKhau: password,
  });
  if (response.status === 200) {
    const { data } = await response.json();
    const role = data?.user?.phan_quyen?.[0]?.quyen;
    setUser({
      email: data?.user?.email,
      username: data?.user?.tenDangNhap,
      role,
      tk: data?.token,
    });
    return onSuccess(Config.urlPath[role].url);
  }
  return onFail();
};

export const isLoggedIn = (role) => {
  const user = getUser();
  if (Config.urlPath[user.role].role === role) {
    return !!user.username;
  }
  return false;
};

export const getMe = () => {
  // Currently check user is logged in by `getUser` and returns the user's role
  // In the future, it will be replaced by using `getMe` api for checking user's role
  const role = Config?.[getUser()?.role]?.role;
  return { role };
};

export const logout = async (callback) => {
  const tokenLogout = getUser()?.tk;
  const resLogout = await postAPIWithToken("/logout", null, tokenLogout);
  if (resLogout.status === 200) {
    setUser({});
  }else {
    alert("Logout failed !!!");
  }
  if (callback) {
    callback();
  }
};
