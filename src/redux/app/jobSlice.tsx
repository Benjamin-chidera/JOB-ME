import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";

export const postJobs = createAsyncThunk(
  "jobs/postJobs",
  async (form, { rejectWithValue }) => {
    try {
      const { data } = await axios.post("http://localhost:3000/api/jobs", form);
      return data;
    } catch (error) {
      console.log(error);
      return rejectWithValue(error);
    }
  }
);

export const getEmployerJobs = createAsyncThunk(
  "jobs/getEmployerJobs",
  async (_, { rejectWithValue }) => {
    try {
      const { data } = await axios.get(
        "http://localhost:3000/api/jobs/employer"
      );
      return data;
    } catch (error) {
      console.log(error);
      return rejectWithValue(error);
    }
  }
);

export const getAllJobs = createAsyncThunk("jobs/getAllJobs", async () => {
  try {
    const { data } = await axios.get(`http://localhost:3000/api/jobs`);
    return data;
  } catch (error) {
    console.log(error);
  }
});

export const getEmployerJobsDetails = createAsyncThunk(
  "jobs/getEmployerJobsDetails",
  async (id, { rejectWithValue }) => {
    try {
      const { data } = await axios.get(`http://localhost:3000/api/jobs/${id}`);
      return data;
    } catch (error) {
      console.log(error);
      return rejectWithValue(error);
    }
  }
);

export const applyJobs = createAsyncThunk(
  "jobs/applyJobs",
  async (form, { rejectWithValue }) => {
    try {
      const { data } = await axios.post(
        "http://localhost:3000/api/jobs/apply",
        form
      );
      return data;
    } catch (error) {
      console.log(error);
      return rejectWithValue(error);
    }
  }
);

export const getApplliedJobs = createAsyncThunk(
  "jobs/getApplliedJobs",
  async (userId, { rejectWithValue }) => {
    try {
      const { data } = await axios.get(
        `http://localhost:3000/api/jobs/apply/applied?jobId=${userId}`
      );
      return data;
    } catch (error) {
      console.log(error);
      return rejectWithValue(error);
    }
  }
);

export const getApplicantJobDetails = createAsyncThunk(
  "jobs/getApplicantJobDetails",
  async (id, { rejectWithValue }) => {
    try {
      const { data } = await axios.get(
        `http://localhost:3000/api/jobs/apply/applied/details?jobId=${id}`
      );
      return data;
    } catch (error) {
      console.log(error);
      return rejectWithValue(error);
    }
  }
);

const initialState = {
  postJob: null,
  status: "idle",
  error: null,
  employerJobs: [],
  employerJobsDetail: {},
  allJobs: [],
  apply: null,
  appliedJobs: [],
  applicantJobDetails: {}
};

const jobSlice = createSlice({
  name: "jobs",
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(postJobs.pending, (state) => {
        state.status = "loading";
        state.error = null;
        state.postJob = null;
      })
      .addCase(postJobs.fulfilled, (state, { payload }) => {
        state.status = "idle";
        state.error = null;
        state.postJob = payload;
      })
      .addCase(postJobs.rejected, (state, { payload }) => {
        state.status = "idle";
        state.error = payload;
        state.postJob = null;
      })

      // GET EMPLOYER JOBS
      .addCase(getEmployerJobs.pending, (state) => {
        state.status = "loading";
        state.error = null;
        state.employerJobs = [];
      })
      .addCase(getEmployerJobs.fulfilled, (state, { payload }) => {
        state.status = "idle";
        state.error = null;
        state.employerJobs = payload;
      })
      .addCase(getEmployerJobs.rejected, (state, { payload }) => {
        state.status = "idle";
        state.error = payload;
        state.employerJobs = [];
      })

      // GET EMPLOYER JOBS DETAILS
      .addCase(getEmployerJobsDetails.pending, (state) => {
        state.status = "loading";
        state.error = null;
        state.employerJobsDetail = {};
      })
      .addCase(getEmployerJobsDetails.fulfilled, (state, { payload }) => {
        state.status = "idle";
        state.error = null;
        state.employerJobsDetail = payload;
      })
      .addCase(getEmployerJobsDetails.rejected, (state, { payload }) => {
        state.status = "idle";
        state.error = payload;
        state.employerJobsDetail = {};
      })

      // GET ALL JOBS
      .addCase(getAllJobs.pending, (state) => {
        state.status = "loading";
        state.error = null;
        state.allJobs = [];
      })
      .addCase(getAllJobs.fulfilled, (state, { payload }) => {
        state.status = "idle";
        state.error = null;
        state.allJobs = payload;
      })
      .addCase(getAllJobs.rejected, (state, { payload }) => {
        state.status = "idle";
        state.error = payload;
        state.allJobs = [];
      })

      // apply for a JOBS
      .addCase(applyJobs.pending, (state) => {
        state.status = "loading";
        state.error = null;
        state.apply = null;
      })
      .addCase(applyJobs.fulfilled, (state, { payload }) => {
        state.status = "idle";
        state.error = null;
        state.apply = payload;
      })
      .addCase(applyJobs.rejected, (state, { payload }) => {
        state.status = "idle";
        state.error = payload;
        state.apply = null;
      })

      // get jobs applied
      .addCase(getApplliedJobs.pending, (state) => {
        state.status = "loading";
        state.error = null;
        state.appliedJobs = null;
      })
      .addCase(getApplliedJobs.fulfilled, (state, { payload }) => {
        state.status = "idle";
        state.error = null;
        state.appliedJobs = payload;
      })
      .addCase(getApplliedJobs.rejected, (state, { payload }) => {
        state.status = "idle";
        state.error = payload;
        state.appliedJobs = null;
      })

      // get jobs applied details
      .addCase(getApplicantJobDetails.pending, (state) => {
        state.status = "loading";
        state.error = null;
        state.applicantJobDetails = null;
      })
      .addCase(getApplicantJobDetails.fulfilled, (state, { payload }) => {
        state.status = "idle";
        state.error = null;
        state.applicantJobDetails = payload;
      })
      .addCase(getApplicantJobDetails.rejected, (state, { payload }) => {
        state.status = "idle";
        state.error = payload;
        state.applicantJobDetails = null;
      });
  },
});

export default jobSlice.reducer;
