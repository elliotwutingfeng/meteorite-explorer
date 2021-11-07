import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";

export const columnNameMappings = {
  name: "Name",
  id: "Id",
  nametype: "Name Type",
  recclass: "Rec Class",
  mass: "Mass (g)",
  fall: "Fall",
  year: "Year",
  reclat: "Latitude",
  reclong: "Longitude",
};

// Data retrieval method
export const fetchMeteorites = createAsyncThunk(
  "dataBank/fetchMeteorites",
  // eslint-disable-next-line no-unused-vars
  async (obj = {}, { getState, rejectWithValue }) => {
    const filterKeywords = getState().dataBank.filter.toLowerCase();

    try {
      const uri = `api/meteorite-landings${
        filterKeywords !== "" ? `/${filterKeywords}` : ""
      }`;
      return await axios.get(uri).then((res) => res.data);
    } catch (error) {
      return rejectWithValue(error.toJSON());
    }
  }
);

const searchReducers = {
  setFilter(state, action) {
    state.filter = action.payload;
  },
  appendSearchHistory(state, action) {
    const searchTerm = action.payload;
    if (searchTerm === "") {
      return;
    }

    if (state.searchHistory.some((e) => e.label === searchTerm)) {
      // Bubble existing searchTerm to the top
      state.searchHistory = [{ label: searchTerm }].concat(
        state.searchHistory.filter((e) => e.label !== searchTerm)
      );
    } else {
      // Add searchTerm to searchHistory if it is not already in searchHistory.
      state.searchHistory.unshift({ label: searchTerm });
      // Delete oldest searchTerms from searchHistory until searchHistory length <= 10
      state.searchHistory = state.searchHistory.slice(0, 10);
    }
  },
};

const pageReducers = {
  setPage(state, action) {
    state.page = action.payload;
  },
};

const meteoriteExtraReducers = {
  [fetchMeteorites.pending]: (state) => {
    state.meteorites.status = "pending";
  },
  [fetchMeteorites.fulfilled]: (state, action) => {
    state.meteorites.data = action.payload;
    state.page = 0;
    state.meteorites.status = "up_to_date";
  },
  [fetchMeteorites.rejected]: (state, action) => {
    state.page = 0;
    const statusCode = action.payload.status;
    state.meteorites.status = statusCode === 408 ? "timed out" : "failed";
  },
};

export const dataBankSlice = createSlice({
  name: "dataBank",
  initialState: {
    page: 0,
    filter: "",
    meteorites: { data: [], status: "pending" },
    searchHistory: [],
  },
  reducers: {
    ...searchReducers,
    ...pageReducers,
  },
  extraReducers: {
    ...meteoriteExtraReducers,
  },
});

export const { setFilter, setPage, appendSearchHistory } =
  dataBankSlice.actions;
export default dataBankSlice.reducer;
