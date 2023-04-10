import axios from "axios";
import authHeader from "./auth-header";
import { DataGrid, SortGridMenuItems } from "@mui/x-data-grid";
import { useState } from "react";
import { useDispatch } from "react-redux";
import { openModal } from "../slices/modalSlice";
import createMixins from "@mui/material/styles/createMixins";

let apiCalls = [];

const instance = axios.create({
  baseURL: process.env.REACT_APP_API,
  timeout: 100000,
  headers: {
    Authorization: authHeader(),
    "Content-Type": "application/json",
  },
  cancelToken: "",
});

function apiCallHandler() {
  const CancelToken = axios.CancelToken;
  const source = CancelToken.source();
  return source;
}

//Lord forgive me what I'm about to do
async function get(url) {
  if (
    apiCalls.some((call) => {
      if (call.apiCall == url) {
        return true;
      }
      return false;
    })
  ) {
    const callToCancel = apiCalls.filter((call)=>call.apiCall.includes(url))
    console.log(callToCancel[0].apiCall)
  } else {
    apiCalls.push({ apiCall: url, cToken: apiCallHandler() });
  }
  instance.defaults.headers.Authorization = authHeader();
  try {
    const resp = await instance.get(`${url}`);
    apiCalls = apiCalls.filter((item) => item.apiCall != url);
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
  const resp = await instance.patch(`${url}`);
}

export { get, post, postBulk, remove, update };
