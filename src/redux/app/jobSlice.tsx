import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";

export interface PostJobData {
  positions: string;
  companyName: string;
  companyImage: string;
  jobType: string;
  country: string;
  salary: number;
  experience: number;
  description: string;
  responsibilities: string[];
  skills: string[];
  user_id: string | undefined;
}

interface ApplyJobData {
  resume: string;
  userId: string;
  jobId: string;
  firstname: string;
  lastname: string;
  email: string;
  phonenumber: string;
  coverletter: string;
}

interface EmployerJobDetail {
  _id: any;
  companyName: any;
  responsibilities: string[];
  skills: string[];
  positions: string;
  companyImage: string;
  description: string;
  jobType: string;
  country: string;
  created_at: string;
  experience: number;
  salary: number;
  id: string;
  // Add other properties as needed
}

interface RootState {
  jobs: {
    appliedJobs: any[]; // Or a more specific type if you know the structure
  };
}

export const postJobs = createAsyncThunk<any, PostJobData>(
  "jobs/postJobs",
  async (form, { rejectWithValue }) => {
    try {
      const { data } = await axios.post("/api/jobs", form);
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
        "/api/jobs/employer"
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
    const { data } = await axios.get(`/api/jobs`);
    return data;
  } catch (error) {
    console.log(error);
  }
});

export const getEmployerJobsDetails = createAsyncThunk(
  "jobs/getEmployerJobsDetails",
  async (id: string, { rejectWithValue }) => {
    try {
      const { data } = await axios.get(`/api/jobs/${id}`);
      return data;
    } catch (error) {
      console.log(error);
      return rejectWithValue(error);
    }
  }
);

export const applyJobs = createAsyncThunk<any, ApplyJobData>(
  "jobs/applyJobs",
  async (form, { rejectWithValue }) => {
    try {
      const { data } = await axios.post(
        "/api/jobs/apply",
        form
      );
      return data;
    } catch (error) {
      console.log(error);
      return rejectWithValue(error);
    }
  }
);

export const getApplliedJobs = createAsyncThunk<any, string>(
  "jobs/getApplliedJobs",
  async (userId: string, { rejectWithValue }) => {
    try {
      const { data } = await axios.get(
        `/api/jobs/apply?jobId=${userId}`
      );
      return data;
    } catch (error) {
      console.log(error);
      return rejectWithValue(error);
    }
  }
);

export const getApplicantJobDetails = createAsyncThunk<any, string>(
  "jobs/getApplicantJobDetails",
  async (id: string, { rejectWithValue }) => {
    try {
      const { data } = await axios.get(
        `/api/jobs/apply/applied/${id}`
      );
      return data;
    } catch (error) {
      console.log(error);
      return rejectWithValue(error);
    }
  }
);

interface JobState {
  postJob: PostJobData | null;
  status: string;
  error: any;
  employerJobs: EmployerJobDetail[];
  employerJobsDetail: EmployerJobDetail | null;
  allJobs: EmployerJobDetail[];
  apply: ApplyJobData | null;
  appliedJobs: ApplyJobData[];
  applicantJobDetails: ApplyJobData | null;
}

const initialState: JobState = {
  postJob: null,
  status: "idle",
  error: null,
  employerJobs: [],
  employerJobsDetail: null,
  allJobs: [],
  apply: null,
  appliedJobs: [],
  applicantJobDetails: null,
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
        state.employerJobsDetail = null;
      })
      .addCase(getEmployerJobsDetails.fulfilled, (state, { payload }) => {
        state.status = "idle";
        state.error = null;
        state.employerJobsDetail = payload;
      })
      .addCase(getEmployerJobsDetails.rejected, (state, { payload }) => {
        state.status = "idle";
        state.error = payload;
        state.employerJobsDetail = null;
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
        state.appliedJobs = [];
      })
      .addCase(getApplliedJobs.fulfilled, (state, { payload }) => {
        state.status = "idle";
        state.error = null;
        state.appliedJobs = payload;
      })
      .addCase(getApplliedJobs.rejected, (state, { payload }) => {
        state.status = "idle";
        state.error = payload;
        state.appliedJobs = [];
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
