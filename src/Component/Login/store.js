import { configureStore } from '@reduxjs/toolkit';
import authReducer from './authSlice'; // Import the reducer

// Create the store with a single reducer
const store = configureStore({
  reducer: {
    auth: authReducer, // Reducer key must match your slice name
  },
  preloadedState: {
    auth: {
      isAuthenticated: !!localStorage.getItem('token'),
      userId: localStorage.getItem('userId') || null,
      token: localStorage.getItem('token') || null,
      role: localStorage.getItem('userRole')||null
    },
  },
});

export default store;
