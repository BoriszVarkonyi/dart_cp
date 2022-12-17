import axios from "axios";

const API_URL = "http://localhost:8082/api/token/";

const register = (username, email, password) => {
  return axios.post(API_URL, {
    username,
    email,
    password,
  });
};
// http://localhost:8082/api/accounts/register/


const config = {
  method: 'post',
  url: 'http://localhost:8082/api/token/',
  headers: { 
    'Content-Type': 'application/json'
  },
};

const login = (username, password) => {
  return axios(config)
    // .post(API_URL, {
    //   username,
    //   password,
    // })
    // .then((response) => {
    //   if (response.data.accessToken) {
    //     localStorage.setItem("user", JSON.stringify(response.data));
    //   }

    //   return response.data;
    // });
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