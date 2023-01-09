import axios from "axios";
import authHeader from "./auth-header";
import { DataGrid } from "@mui/x-data-grid";

const instance = axios.create({
  baseURL: process.env.REACT_APP_API,
  timeout: 1000,
  headers: {
    Authorization: authHeader(),
    "Content-Type": "application/json",
  },
});

const config = {
  headers: { Authorization: authHeader() },
};

async function get(url) {
  try {
    const resp = await instance.get(`${url}`, {
      config,
    });
    return await resp.data;
  } catch (err) {
    return [];
  }
}

async function post(url, payload) {
  const config2 = {
    headers: { Authorization: authHeader() },
  };
  console.log("Ezzel postolok:")
  console.log(config.headers)
  try {
    const resp = await instance.post(`${url}`, {
      ...payload,
      config2,
    });
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
  const resp = await axios(config);
  return resp;
}

async function remove(url) {
  const resp = await instance.delete(`${url}`, {
    config,
  });
}

async function update(url, payload) {
  const resp = await instance.patch(`${url}`, {
    ...payload,
    config,
  });
}

export { get, post, postBulk, remove, update };
