import { createSlice } from '@reduxjs/toolkit';
import { jwtDecode } from 'jwt-decode';

const initialState = {
  isLoggedIn: localStorage.getItem('token') ? true : false,
  loading: false,
  error: null,
};

const backendUrl = process.env.REACT_APP_BACKEND_AUTH_URL || "https://pruebabbr.azurewebsites.net";

const authSlice = createSlice({
  name: 'auth',
  initialState,
  reducers: {
    loginStart: (state) => {
      state.loading = true;
      state.error = null;
    },
    loginSuccess: (state) => {
      state.isLoggedIn = true;
      state.loading = false;
      state.error = null;
    },
    loginFailure: (state, action) => {
      state.isLoggedIn = false;
      state.loading = false;
      state.error = action.payload;
    },
    logout: (state) => {
      localStorage.removeItem('token');
      state.isLoggedIn = false;
      state.loading = false;
      state.error = null;
    },
    checkTokenExpiration: (state) => {
      const token = localStorage.getItem('token');
      if (token) {
        const decodedToken = jwtDecode(token);
        const currentTime = Math.floor(Date.now() / 1000);

        if (decodedToken.exp && decodedToken.exp < currentTime) {
          localStorage.removeItem('token');
          state.isLoggedIn = false;
          state.loading = false;
          state.error = null;
        }
      }
    },
  },
});

export const { loginStart, loginSuccess, loginFailure, logout, checkTokenExpiration } = authSlice.actions;

export const loginUser = (credentials) => async (dispatch) => {
  dispatch(loginStart());
  try {
    const response = await fetch(`${backendUrl}/auth`, {
      method: "POST",
      mode:"cors",
      headers: {
        "Content-Type": "application/json"
      },
      body: JSON.stringify(credentials),
    });
    if (response.ok) {
      const data = await response.json();
      localStorage.setItem('token', data.token);
      dispatch(loginSuccess());
    } else {
      const errorData = await response.json();
      dispatch(loginFailure(errorData.message || 'Error de inicio de sesión'));
    }
  } catch (error) {
    console.error("Error al iniciar sesión:", error);
    dispatch(loginFailure('Error de conexión'));
    dispatch(logout());
  }
};

export const checkTokenExpirationMiddleware = () => (next) => (action) => {
  if (action.type !== checkTokenExpiration.type) {
    next(checkTokenExpiration);
  }
  return next(action);
};

export default authSlice.reducer;
