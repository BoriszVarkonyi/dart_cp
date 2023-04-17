import axios from "axios";
import jwt_decode from "jwt-decode";

const API_URL = "http://localhost:8082/api/token/";

const register = (username, email, password) => {
  return axios.post(API_URL, {
    username,
    email,
    password,
  });
};
// http://localhost:8082/api/accounts/register/


const login = (username, password) => {
  return axios
  .post(API_URL, {
    username,
    password,
  })
  .then((response) => {
    if (response.data.access) {
      localStorage.setItem("user", JSON.stringify(response.data));

      const decoded = jwt_decode(response.data.access);
      localStorage.setItem("username", decoded.name);
    }
    return response.data;
  });
};

const logout = () => {
  localStorage.removeItem("user");
};

const authService = {
  register,
  login,
  logout,
};

export default authService;