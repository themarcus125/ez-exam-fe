export const createSession = (data) => {
  if (typeof window !== "undefined") {
    window.localStorage.setItem("session", JSON.stringify(data));
  }
};

export const deleteSession = () => {
  if (typeof window !== "undefined") {
    window.localStorage.removeItem("session");
  }
};
