import { configureStore } from "@reduxjs/toolkit";
import tareasReducer from "./features/tareas/tareasSlice";
import authReducer from './features/auth/authSlice';

const store = configureStore({
  reducer: {
    auth: authReducer,
    tareas: tareasReducer,
  }
});

export default store;
