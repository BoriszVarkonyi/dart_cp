import axios from "axios";
import authService from "../services/auth.services";

const parseJwt = (token) => {
  try {
    return JSON.parse(atob(token.split(".")[1]));
  } catch (e) {
    return null;
  }
};

const refreshToken = () => {
  const authData = JSON.parse(localStorage.getItem("user"));
  const payload = {
    refresh: authData.refresh,
  };

  const apiResponse = axios
    .post("http://localhost:8082/api/token/refresh/", payload)
    .then((response) => {
      if (response.data.access) {
        localStorage.setItem(
          "user",
          JSON.stringify({ ...authData, access: response.data.access })
        );
      }
    });
};

const refreshTokenTimer = () => {
  const user = JSON.parse(localStorage.getItem("user"));
  if (user) {
    const decodedJwt = parseJwt(user.access);
    const expireTime = new Date(decodedJwt.exp * 1000);
    if (expireTime < Date.now()) {
      authService.logout();
      return
    }
    const timeout = expireTime.getTime() - Date.now() - 60 * 1000;
    setInterval(() => refreshToken(), timeout);
  }
};

const AuthVerify = {
  refreshTokenTimer,
};

export default AuthVerify;
