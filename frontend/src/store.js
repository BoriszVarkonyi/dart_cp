import { configureStore } from '@reduxjs/toolkit'
import authReducer from "./slices/auth";
import messageReducer from "./slices/message";
import modalReducer from "./slices/modalSlice"
import compReducer from "./slices/compSlice"
import loadReducer from "./slices/load"

const reducer = {
  auth: authReducer,
  message: messageReducer,
  modal: modalReducer,
  competitions: compReducer,
  isLoading: loadReducer

}

const store = configureStore({
  reducer: reducer,
  devTools: true,
})

export default store;