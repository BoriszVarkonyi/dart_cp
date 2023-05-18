import axios from "axios";
import authHeader from "./auth-header";
import store from "../store"
import { setIsLoading } from "../slices/load";
import createMixins from "@mui/material/styles/createMixins";

const instance = axios.create({
  baseURL: process.env.REACT_APP_API,
  timeout: 100000,
  headers: {
    Authorization: authHeader(),
    "Content-Type": "application/json",
  },
  cancelToken: "",
});

function createCancelToken() {
  const CancelToken = axios.CancelToken;
  const source = CancelToken.source();
  return source;
}


async function get(url, cToken) {
  instance.defaults.headers.Authorization = authHeader();
  try {
    const resp = await instance.get(`${url}`, {cancelToken: cToken});
    //I the api call is done, sets the loading state to false. Loading state is stored in Redux store.
    store.dispatch(setIsLoading(false))
    return await resp.data;
  } catch (err) {
    return [];
  }
}

async function post(url, payload) {
  instance.defaults.headers.Authorization = authHeader();
  try {
    const resp = await instance.post(`${url}`, payload);
    return resp.data;
  } catch (err) {
    return err;
  }
}

// TODO: refactor this when we will have time.
async function postBulk(url, payload) {
  const config = {
    method: "post",
    url: process.env.REACT_APP_API + url,
    headers: {
      Authorization: authHeader(),
      "Content-Type": "application/json",
    },
    data: payload,
  };
  try {
    const resp = await axios(config);
    return resp.data;
  } catch (err) {
    return err;
  }
}

async function remove(url, payload) {
  instance.defaults.headers.Authorization = authHeader();
  const resp = await instance.delete(`${url}`, { data: payload });
}


async function update(url, payload) {
  instance.defaults.headers.Authorization = authHeader();
  try {
    const resp = await instance.patch(`${url}`, payload);
    return resp.data;
  } catch (err) {
    return err;
  }
}

export { get, post, postBulk, remove, update, createCancelToken };
