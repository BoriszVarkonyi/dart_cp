import axios from "axios";
import authHeader from "./auth-header";

const API_URL = `${process.env.REACT_APP_API}test/`;

const getPublicContent = () => {
  return axios.get(API_URL);
};


const userService = {
  getPublicContent
};

export default userService