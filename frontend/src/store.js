import { configureStore } from '@reduxjs/toolkit'
import authReducer from "./slices/auth";
import messageReducer from "./slices/message";
import modalReducer from "./slices/modalSlice"

const reducer = {
  auth: authReducer,
  message: messageReducer,
  modal: modalReducer
}

const store = configureStore({
  reducer: reducer,
  devTools: true,
})

export default store;