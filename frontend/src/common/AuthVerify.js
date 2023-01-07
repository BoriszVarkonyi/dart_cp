import axios from "axios";
import authService from "../services/auth.services";
import { useEffect } from "react";

//It is just a simple costum hook. Manages the token refresh. 
//Just call it, the usEffect will do the rest of thw work

export default function useTokenService() {
  //With useEffect it calls the function only once. 
  useEffect(() => {
    const user = JSON.parse(localStorage.getItem("user"));
    //If theres is no user it doesn't do anything
    if (user) {
      const decodedJwt = parseJwt(user.access);
      const expireTime = new Date(decodedJwt.exp * 1000);
      if (expireTime < Date.now()) {
        authService.logout();
        return;
      }
      const timeout = expireTime.getTime() - Date.now() - 60 * 1000;

      const interval = setInterval(() => {
        refreshToken()
      }, timeout);

      return () => clearInterval(interval);
    }
  }, []);
}

//Helper function. 
const parseJwt = (token) => {
  try {
    return JSON.parse(atob(token.split(".")[1]));
  } catch (e) {
    return null;
  }
};

//Helper Function
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
