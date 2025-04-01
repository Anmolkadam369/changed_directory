import { createSlice } from '@reduxjs/toolkit';

const initialState = {
  isAuthenticated: false,
  userId: null,
  token: null,
};

const authSlice = createSlice({
  name: 'auth',
  initialState,
  reducers: {
    login: (state, action) => {
      state.isAuthenticated = true;
      state.userId = action.payload.userId; // Access userId from payload
      state.token = action.payload.token;   // Access token from payload
      console.log("ISAUTHENTICATED!@#", state.isAuthenticated)
      console.log("some123",action.payload.userId)
      console.log("some456",action.payload.token)
    },
    logout: (state) => {
      state.isAuthenticated = false;
      state.userId = null;
      state.token = null;
    },
  },
});

export const { login, logout } = authSlice.actions;
export default authSlice.reducer;
