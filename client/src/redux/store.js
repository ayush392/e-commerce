import { configureStore } from "@reduxjs/toolkit";
import authreducer from "./auth/authSlice";
import { apiSlice } from "./api/apiSlice";

export const store = configureStore({
  reducer: {
    auth: authreducer,
    [apiSlice.reducerPath]: apiSlice.reducer,
  },
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware().concat(apiSlice.middleware),
  devTools: true,
});
