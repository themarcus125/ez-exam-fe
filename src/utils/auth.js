import { postAPIForm } from "../utils/api";
const CURRENT_USER = "currentUser";

export const isBrowser = () => typeof window !== "undefined";

export const getUser = () =>
  isBrowser() && window.localStorage.getItem(CURRENT_USER)
    ? JSON.parse(window.localStorage.getItem(CURRENT_USER))
    : {};

const setUser = (user) =>
  window.localStorage.setItem(CURRENT_USER, JSON.stringify(user));

export const handleLogin = async ({ email, password, role }, callback) => {
  const response = await postAPIForm("/login", {
    tenDangNhap: email,
    matKhau: password,
  });
  if (response.status === 200) {
    const { data } = await response.json();
    setUser({
      email: data?.user?.email,
      username: data?.user?.tenDangNhap,
      role: data?.user?.phan_quyen?.[0]?.quyen,
      tk: data?.token,
    });
    if (callback) {
      callback();
    }
    return true;
  }
  return false;
};

export const isLoggedIn = (role) => {
  const user = getUser();
  if (user.role === role) {
    return !!user.email;
  }
  return false;
};

export const logout = (callback) => {
  setUser({});
  if (callback) {
    callback();
  }
};
