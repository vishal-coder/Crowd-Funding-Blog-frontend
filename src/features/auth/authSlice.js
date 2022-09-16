import { createSlice } from "@reduxjs/toolkit";

export const authSlice = createSlice({
  name: "user",
  initialState: {
    user: null, // for user object
    userToken: localStorage.getItem("token") || null, // for storing the JWT
    isLoggedIn: false,
    paymentInfo: null,
  },
  reducers: {
    setUser: (state, action) => {
      state.user = action.payload;
    },

    setIsLoggedIn: (state, action) => {
      state.isLoggedIn = action.payload;
    },

    setUserToken: (state, action) => {
      state.userToken = action.payload;
    },
    setUserPaymentInfo: (state, action) => {
      state.paymentInfo = action.payload;
    },

    LOG_OUT: (state) => {
      state.user = undefined;
    },
  },
});

export const {
  setUser,
  setIsLoggedIn,
  setUserToken,
  LOG_OUT,
  setUserPaymentInfo,
} = authSlice.actions;

export default authSlice.reducer;
