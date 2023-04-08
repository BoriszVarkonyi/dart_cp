import axios from "axios";
import authHeader from "./auth-header";
import { DataGrid, SortGridMenuItems } from "@mui/x-data-grid";
import { useState } from "react";


const instance = axios.create({
  baseURL: process.env.REACT_APP_API,
  timeout: 1000,
  headers: {
    Authorization: authHeader(),
    "Content-Type": "application/json",
  },
  cancelToken: ''
});


//Lord forgive me what I'm about to do
async function get(url) {
  instance.defaults.headers.Authorization = authHeader();
  try {
    const resp = await instance.get(`${url}`);
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

async function remove(url) {
  instance.defaults.headers.Authorization = authHeader();
  const resp = await instance.delete(`${url}`);
}

async function update(url, payload) {
  instance.defaults.headers.Authorization = authHeader();
  const resp = await instance.patch(`${url}`, payload);
}

export { get, post, postBulk, remove, update };
