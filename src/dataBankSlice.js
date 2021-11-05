import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";

function wait(ms) {
  return new Promise((resolve) => setTimeout(resolve, ms));
}

async function get_predictions() {
  return axios
    .get("https://data.nasa.gov/resource/gh4g-9sfh.json", {
      timeout: 5000, // 5000ms request timeout
    })
    .then((res) => res.data);
}

// Data retrieval method
export const fetchMeteorites = createAsyncThunk(
  "dataBank/fetchMeteorites",
  // eslint-disable-next-line no-unused-vars
  async (obj = {}, { getState, rejectWithValue }) => {
    const filterKeywords = getState().dataBank.filter.toLowerCase();
    try {
      const apiResponse = await get_predictions();
      await wait(1000); // delay 500ms
      // If there are filterKeywords, filter apiResponse to include only
      // meteorites with names containing filterKeywords
      const filteredResponse =
        filterKeywords === ""
          ? apiResponse
          : apiResponse.filter((meteorite) => {
              return String(meteorite["name"])
                .toLowerCase()
                .includes(filterKeywords);
            });
      // Sort filteredResponse by "name" alphabetically in ascending order
      const sortedByAlphabet = Array.from(filteredResponse).sort((a, b) => {
        return a["name"].localeCompare(b["name"], "en", {
          sensitivity: "base",
        });
      });
      return sortedByAlphabet;
    } catch (error) {
      return rejectWithValue(error.toJSON());
    }
  }
);

const mainReducers = {
  setFilter(state, action) {
    state.filter = action.payload;
  },
};

const mainExtraReducers = {
  [fetchMeteorites.pending]: (state) => {
    state.meteorites.data = [];
    state.meteorites.status = "pending";
  },
  [fetchMeteorites.fulfilled]: (state, action) => {
    state.meteorites.data = action.payload;
    state.meteorites.status = "up_to_date";
  },
  [fetchMeteorites.rejected]: (state, action) => {
    state.meteorites.status = action.payload.message.includes("timeout of")
      ? "timed out"
      : "failed";
  },
};

export const dataBankSlice = createSlice({
  name: "dataBank",
  initialState: {
    filter: "",
    meteorites: { data: [], status: "pending" },
  },
  reducers: {
    ...mainReducers,
  },
  extraReducers: {
    ...mainExtraReducers,
  },
});

export const { setFilter } = dataBankSlice.actions;
export default dataBankSlice.reducer;
