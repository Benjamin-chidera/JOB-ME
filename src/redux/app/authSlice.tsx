import { createSlice, createAsyncThunk, PayloadAction } from "@reduxjs/toolkit";
import axios from "axios";

export interface RegisterFormData {
  firstname: string;
  lastname: string;
  email: string;
  password: string;
  role: string;
}

export interface ContactFormData {
  name: string;
  email: string;
  phonenumber: string;
  subject: string;
  message: string;
}

export interface ForgottenPasswordFormData {
  email: string;
}

export interface ResetPasswordFormData {
  password: string;
}

interface ErrorResponse {
  response?: {
    data?: {
      err?: string;
    };
  };
}

type registerTypes = {
  user: null | unknown;
  status: string;
  error: ErrorResponse | null;
  contact: null | unknown;
  forgotten: null | unknown;
  reset: null | unknown;
};

export const registerUser = createAsyncThunk<any, RegisterFormData>(
  "user/registerUser",
  async (formData: RegisterFormData, { rejectWithValue }) => {
    try {
      const { data } = await axios.post("/api/signup", formData);
      return data;
    } catch (error) {
      return rejectWithValue(error as ErrorResponse);
    }
  }
);

export const contactUs = createAsyncThunk<any, ContactFormData>(
  "user/contactUs",
  async (form, { rejectWithValue }) => {
    try {
      const { data } = await axios.post("/api/contact", form);

      return data;
    } catch (error) {
      console.log(error);
      return rejectWithValue(error as ErrorResponse);
    }
  }
);

export const forgottenPassword = createAsyncThunk<
  any,
  ForgottenPasswordFormData
>("user/forgottenPassword", async (form, { rejectWithValue }) => {
  try {
    const { data } = await axios.post("/api/auth/forgotten-password", form);

    return data;
  } catch (error) {
    console.log(error);
    return rejectWithValue(error as ErrorResponse);
  }
});

export const resetPassword = createAsyncThunk<
  any,
  ResetPasswordFormData
>("user/resetPassword", async (formData, { rejectWithValue }) => {
  try {
    const { data } = await axios.post("/api/auth/reset-password", formData);
    console.log(data);
    

    return data;
  } catch (error) {
    console.log(error);
    return rejectWithValue(error as ErrorResponse);
  }
});

const initialState: registerTypes = {
  user: null,
  status: "idle",
  error: null,
  contact: null,
  forgotten: null,
  reset: null,
};

const authSlice = createSlice({
  name: "auth",
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(registerUser.pending, (state, { payload }) => {
        state.status = "loading";
        state.error = payload ?? null;
        state.user = null;
      })
      .addCase(registerUser.fulfilled, (state, { payload }) => {
        state.status = "idle";
        state.error = payload;
        state.user = payload;
      })
      .addCase(registerUser.rejected, (state, { payload }) => {
        state.status = "idle";
        state.error = payload ?? null;
        state.user = null;
      })

      // contact us

      .addCase(contactUs.pending, (state) => {
        state.status = "loading";
        state.error = null;
        state.contact = null;
      })
      .addCase(contactUs.fulfilled, (state, { payload }) => {
        state.status = "idle";
        state.error = null;
        state.contact = payload;
      })
      .addCase(contactUs.rejected, (state, { payload }) => {
        state.status = "idle";
        state.error = payload ?? null;
        state.contact = null;
      })

      // forgotten password

      .addCase(forgottenPassword.pending, (state) => {
        state.status = "loading";
        state.error = null;
        state.forgotten = null;
      })
      .addCase(forgottenPassword.fulfilled, (state, { payload }) => {
        state.status = "idle";
        state.error = null;
        state.forgotten = payload;
      })
      .addCase(forgottenPassword.rejected, (state, { payload }) => {
        state.status = "idle";
        state.error = payload ?? null;
        state.forgotten = null;
      })

      // reset password

      .addCase(resetPassword.pending, (state) => {
        state.status = "loading";
        state.error = null;
        state.reset = null;
      })
      .addCase(resetPassword.fulfilled, (state, { payload }) => {
        state.status = "idle";
        state.error = null;
        state.reset = payload;
      })
      .addCase(resetPassword.rejected, (state, { payload }) => {
        state.status = "idle";
        state.error = payload ?? null;
        state.reset = null;
      });
  },
});

export const {} = authSlice.actions;

export default authSlice.reducer;
