import { navigate as gatsbyNavigate } from "gatsby";

export const isBrowser = () => typeof window !== "undefined";

export const navigate = (to, ...options) => {
  if (isBrowser()) {
    gatsbyNavigate(to, ...options);
  }
};
