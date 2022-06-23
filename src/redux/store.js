import { configureStore } from '@reduxjs/toolkit'
import authReducer from "./authSlice";
import messageReducer from "./message";
import nacionalidadReducer from "./nacionalidadSlice";
import equiposReducer from "./equiposSlice";
const reducer = {
  auth: authReducer,
  message: messageReducer,
  nacionalidad: nacionalidadReducer,
  equipos: equiposReducer,
}
const store = configureStore({
  reducer: reducer,
  devTools: true,
})
export default store;