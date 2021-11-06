import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";
/*
function wait(ms) {
  return new Promise((resolve) => setTimeout(resolve, ms));
}
*/

async function get_predictions() {
  return axios
    .get("https://data.nasa.gov/resource/gh4g-9sfh.json", {
      timeout: 5000, // 5000ms request timeout
    })
    .then((res) => res.data);
}

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
      const apiResponse = await get_predictions();
      //await wait(1000); // delay 1000ms

      // Fill in missing fields
      const fillNAResponse = apiResponse.map((e) => {
        for (const columnName of Object.keys(columnNameMappings)) {
          if (e[columnName] === undefined || e[columnName] === "") {
            e[columnName] = `N/A`;
          }
        }
        return e;
      });

      // If there are filterKeywords, filter fillNAResponse to include only
      // meteorites with names containing filterKeywords
      const filteredResponse =
        filterKeywords === ""
          ? fillNAResponse
          : fillNAResponse.filter((meteorite) => {
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
      // Truncate 'Year' field
      const yearTruncated = sortedByAlphabet.map((el) => {
        return {
          ...el,
          year: el.year !== undefined ? el.year.split("-")[0] : el.year,
        };
      });

      return yearTruncated;
    } catch (error) {
      return rejectWithValue(error.toJSON());
    }
  }
);

const filterReducers = {
  setFilter(state, action) {
    state.filter = action.payload;
  },
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
    page: 0,
    filter: "",
    meteorites: { data: [], status: "pending" },
  },
  reducers: {
    ...filterReducers,
  },
  extraReducers: {
    ...meteoriteExtraReducers,
  },
});

export const { setFilter, setPage } = dataBankSlice.actions;
export default dataBankSlice.reducer;
