import axios from "axios";
import authHeader from "./auth-header";

const instance = axios.create({
  baseURL: process.env.REACT_APP_API,
  timeout: 1000,
  headers: { 'Authorization': authHeader() }

});

const config = {
  headers: authHeader(),
};

async function get (url) {

  try {
    const resp = await instance.get(`${url}`, {
      config
    });
    return await resp.data;
  } catch (err) {
    return []; 
  }
};

async function post (url, payload) {
  try {
    const resp = await instance.post(`${url}`, {
      ...payload,
      config
    });
    return resp.data;
  } catch (err) {
    return err;
  }
}

async function remove (url) {
  const resp = await instance.delete(`${url}`, {
    config
  });
}

async function update (url, payload) {
  const resp = await instance.patch(`${url}`, {
    ...payload,
    config
  });
}

export {
  get,
  post,
  remove,
  update
}