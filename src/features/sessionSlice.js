import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";
import { linkAPI } from "./data";

export const getSessions = createAsyncThunk("Session/getSessions", async () => {
  const response = await axios.get(linkAPI + "Session");
  return response.data;
});

export const getSessionsByID = createAsyncThunk(
  "Session/getSessionsByID",
  async (EventID) => {
    const response = await axios.get(linkAPI + `Session/${EventID}`);
    //console.log("====================================");
    //console.log(response.data);
    //console.log("====================================");
    return response.data;
  }
);
export const postSessions = createAsyncThunk(
  "Session/postSessions",
  async (session) => {
    const response = await axios.post(linkAPI + "Session", session);
    console.log(response);
    return response.data;
  }
);

export const deleteSessions = createAsyncThunk(
  "Session/deleteSessions",
  async (sessionID) => {
    const response = await axios.delete(linkAPI + `Session/${sessionID}`);
    console.log(response);
    return response.data;
  }
);

const initialState = {
  sessions: [],
  sessionsEvent: [],
  sessionsStatus: "idle",
  sessionsError: null,
};

const sessionSlice = createSlice({
  name: "Session",
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(getSessions.pending, (state) => {
        state.sessionsStatus = "loading";
      })
      .addCase(getSessions.fulfilled, (state, action) => {
        state.sessionsStatus = "succeeded";
        state.sessions = action.payload;
      })
      .addCase(getSessions.rejected, (state, action) => {
        state.sessionsStatus = "failed";
        state.sessionsError = action.error.message;
      })
      .addCase(postSessions.pending, (state) => {
        state.sessionsStatus = "loading";
      })
      .addCase(postSessions.fulfilled, (state, action) => {
        state.sessionsStatus = "succeeded";
        state.sessions.push(action.payload);
      })
      .addCase(postSessions.rejected, (state, action) => {
        state.sessionsStatus = "failed";
        state.sessionsError = action.error.message;
      })
      .addCase(deleteSessions.pending, (state) => {
        state.sessionsStatus = "loading";
      })
      .addCase(deleteSessions.fulfilled, (state, action) => {
        state.sessionsStatus = "succeeded";
        state.sessions = state.sessions.filter(
          (session) => session.id !== action.meta.arg
        );
      })
      .addCase(deleteSessions.rejected, (state, action) => {
        state.sessionsStatus = "failed";
        state.sessionsError = action.error.message;
      })
      .addCase(getSessionsByID.pending, (state) => {
        state.sessionsStatus = "loading";
      })
      .addCase(getSessionsByID.fulfilled, (state, action) => {
        state.sessionsStatus = "succeeded";
        state.sessionsEvent = action.payload;
      })
      .addCase(getSessionsByID.rejected, (state, action) => {
        state.sessionsStatus = "failed";
        state.sessionsError = action.error.message;
      });
  },
});

export default sessionSlice.reducer;
