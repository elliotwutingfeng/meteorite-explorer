import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";

async function get_predictions() {
  return fetch("https://data.nasa.gov/resource/gh4g-9sfh.json", {
    headers: { "content-type": "application/json; charset=UTF-8" },
    method: "GET",
  }).then((res) => res.json());
}

// Data retrieval method
export const fetchMeteorites = createAsyncThunk(
  "dataBank/fetchMeteorites",
  async (obj = {}, { getState }) => {
    const filterKeywords = getState().dataBank.filter.toLowerCase();
    const apiResponse = await get_predictions();
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
      return a["name"].localeCompare(b["name"], "en", { sensitivity: "base" });
    });

    return sortedByAlphabet;
  }
);

const mainReducers = {
  setFilter(state, action) {
    state.filter = action.payload;
  },
};

const mainExtraReducers = {
  [fetchMeteorites.pending]: (state) => {
    state.meteorites.status = "obsolete";
  },
  [fetchMeteorites.fulfilled]: (state, action) => {
    state.meteorites.data = action.payload;
    state.meteorites.status = "up_to_date";
  },
  [fetchMeteorites.rejected]: (state) => {
    state.meteorites.status = "failed";
  },
};

export const dataBankSlice = createSlice({
  name: "dataBank",
  initialState: {
    filter: "",
    meteorites: { data: [], status: "obsolete" },
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
