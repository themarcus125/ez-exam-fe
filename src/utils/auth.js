import mockData from "../mockData/data.json";
const USER_TYPE = "currentUser";

export const isBrowser = () => typeof window !== "undefined";

export const getUser = () =>
  isBrowser() && window.localStorage.getItem(USER_TYPE)
    ? JSON.parse(window.localStorage.getItem(USER_TYPE))
    : {};

const setUser = (user) =>
  window.localStorage.setItem(USER_TYPE, JSON.stringify(user));

export const handleLogin = ({ email, password, role }) => {
  const loggedUser = mockData.user.find(
    (currentUser) =>
      currentUser.email === email &&
      currentUser.password === password &&
      currentUser.role === role,
  );
  if (loggedUser) {
    setUser({
      email: email,
      role: role,
    });
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
  callback();
};
