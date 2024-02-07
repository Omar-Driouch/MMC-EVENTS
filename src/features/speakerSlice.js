import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";

const linkAPI = "http://10.5.122.43:45455/api/Speaker";

export const getSpeakers = createAsyncThunk(
  "Speakers/getSpeakers",
  async () => {
    const response = await axios.get(linkAPI);
    return response.data;
  }
);

export const DeleteSpeaker = createAsyncThunk(
  "Speakers/DeleteSpeaker",
  async (speakerId) => {
    const response = await axios.delete(linkAPI + `/${speakerId}`);
    return response.data;
  }
);

export const UpdateSpeaker = createAsyncThunk(
  "Speakers/UpdateSpeaker",
  async (speaker) => {
    const response = await axios.put(
      linkAPI + `/${speaker.speakerId}`,
      speaker
    );

    return response.data;
  }
);
export const AddNewSpeaker = createAsyncThunk(
  "Speakers/AddNewSpeaker",
  async (newSpeaker) => {
    try {
      const response = await axios.post(linkAPI, newSpeaker);
      return response.data;
    } catch (error) {
      throw error;
    }
  }
);

const initialState = {
  speakers: [],
  speakersStatus: "idle",
  speakersError: null,
};

const speakerSlice = createSlice({
  name: "Speaker",
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(getSpeakers.pending, (state) => {
        state.speakersStatus = "loading";
      })
      .addCase(getSpeakers.fulfilled, (state, action) => {
        state.speakersStatus = "succeeded";
        state.speakers = action.payload;
      })
      .addCase(getSpeakers.rejected, (state, action) => {
        state.speakersStatus = "failed";
        state.speakersError = action.error.message;
      })
      .addCase(DeleteSpeaker.pending, (state) => {
        state.speakersStatus = "loading";
      })
      .addCase(DeleteSpeaker.fulfilled, (state, action) => {
        state.speakersStatus = "succeeded";
        state.speakers = state.speakers.filter(
          (speaker) => speaker.speakerId !== action.meta.arg
        );
      })
      .addCase(DeleteSpeaker.rejected, (state, action) => {
        state.speakersStatus = "failed";
        state.speakersError = action.error.message;
      })
      .addCase(AddNewSpeaker.pending, (state) => {
        state.speakersStatus = "loading";
      })
      .addCase(AddNewSpeaker.fulfilled, (state, action) => {
        state.speakersStatus = "succeeded";
        state.speakers.push(action.payload);
      })
      .addCase(AddNewSpeaker.rejected, (state, action) => {
        state.speakersStatus = "failed";
        state.speakersError = action.error.message;
      })
      .addCase(UpdateSpeaker.pending, (state) => {
        state.speakersStatus = "loading";
      })
      .addCase(UpdateSpeaker.fulfilled, (state, action) => {
        state.speakersStatus = "succeeded";
        const index = state.speakers.findIndex(
          (speaker) => speaker.speakerId === action.payload.speakerId
        );
        if (index !== -1) {
          state.speakers[index] = action.payload;
        }
      })

      .addCase(UpdateSpeaker.rejected, (state, action) => {
        state.speakersStatus = "failed";
        state.speakersError = action.error.message;
      });
  },
});

export default speakerSlice.reducer;
