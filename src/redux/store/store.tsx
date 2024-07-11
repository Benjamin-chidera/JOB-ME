"use client";

import { configureStore } from "@reduxjs/toolkit";
import authReducer from "../app/authSlice";
import jobReducer from "../app/jobSlice";

export const store = configureStore({
  reducer: {
    auth: authReducer,
    jobs: jobReducer,
  },
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
