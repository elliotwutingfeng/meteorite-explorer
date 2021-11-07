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

const endpointURI = "https://data.nasa.gov/resource/gh4g-9sfh.json";

async function fetch_meteorite_dataset() {
  return axios
    .get(endpointURI, {
      timeout: 15000, // 15000ms request timeout
    })
    .then((res) => res.data);
}

function fillMissingFields(data) {
  const columnNameMappings = {
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
  return data.map((e) => {
    for (const columnName of Object.keys(columnNameMappings)) {
      if (typeof e[columnName] === "undefined" || e[columnName] === "") {
        e[columnName] = `N/A`;
      }
    }
    return e;
  });
}

function filterByKeywords(filterKeywords, data) {
  return filterKeywords === ""
    ? data
    : data.filter((meteorite) => {
        return String(meteorite["name"])
          .toLowerCase()
          .includes(filterKeywords.toLowerCase());
      });
}

function sortByAlphabet(data) {
  return Array.from(data).sort((a, b) => {
    return a["name"].localeCompare(b["name"], "en", {
      sensitivity: "base",
    });
  });
}

function truncateYears(data) {
  return data.map((el) => {
    return {
      ...el,
      year: typeof el.year !== "undefined" ? el.year.split("-")[0] : el.year,
    };
  });
}

async function clean_meteorite_dataset() {
  const apiResponse = await fetch_meteorite_dataset();
  // Fill in missing fields
  const filteredResponse = fillMissingFields(apiResponse);
  // Sort by "name" alphabetically in ascending order
  const sortedByAlphabet = sortByAlphabet(filteredResponse);
  // Truncate 'Year' field
  const yearTruncated = truncateYears(sortedByAlphabet);
  return yearTruncated;
}

// Data retrieval method
export const fetchMeteorites = createAsyncThunk(
  "dataBank/fetchMeteorites",
  // eslint-disable-next-line no-unused-vars
  async (obj = {}, { getState, rejectWithValue }) => {
    try {
      return await clean_meteorite_dataset();
    } catch (error) {
      return rejectWithValue(error.toJSON());
    }
  }
);

const searchReducers = {
  searchMeteorites(state) {
    state.page = 0;
    state.filtered_meteorites.data = filterByKeywords(
      state.filter,
      state.meteorites.data
    );
  },
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
    state.filtered_meteorites.data = action.payload;
    state.page = 0;
    state.meteorites.status = "up_to_date";
  },
  [fetchMeteorites.rejected]: (state, action) => {
    state.page = 0;
    const message = action.payload.message;
    state.meteorites.status = message.includes("timeout")
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
    filtered_meteorites: { data: [] },
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

export const { setFilter, setPage, appendSearchHistory, searchMeteorites } =
  dataBankSlice.actions;
export default dataBankSlice.reducer;
