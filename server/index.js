// server/index.js

const express = require("express");
const axios = require("axios");

const PORT = process.env.PORT || 3001;

const app = express();

async function fetch_meteorite_dataset() {
  const endpointURI = "https://data.nasa.gov/resource/gh4g-9sfh.json";
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
        return String(meteorite["name"]).toLowerCase().includes(filterKeywords);
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

async function clean_meteorite_dataset(filterKeywords) {
  const apiResponse = await fetch_meteorite_dataset();
  // Fill in missing fields
  const fillNAResponse = fillMissingFields(apiResponse);
  // If there are filterKeywords, filter fillNAResponse to include only
  // meteorites with names containing filterKeywords
  const filteredResponse =
    filterKeywords !== undefined
      ? filterByKeywords(filterKeywords, fillNAResponse)
      : fillNAResponse;
  // Sort by "name" alphabetically in ascending order
  const sortedByAlphabet = sortByAlphabet(filteredResponse);
  // Truncate 'Year' field
  const yearTruncated = truncateYears(sortedByAlphabet);
  return yearTruncated;
}

function handleError(error, response) {
  const errorStatusCode = error.toJSON().status;
  const errorMessage = error.toJSON().message;
  return errorMessage.includes("timeout of")
    ? response.status(408).end()
    : errorStatusCode !== null
    ? response.status(Number(errorStatusCode)).end()
    : response.status(404).end();
}

app.get("/api/meteorite-landings", async (request, response) => {
  try {
    return response.json(await clean_meteorite_dataset());
  } catch (error) {
    return handleError(error, response);
  }
});

app.get(
  "/api/meteorite-landings/:filterKeywords",
  async (request, response) => {
    const filterKeywords = request.params.filterKeywords.toLowerCase();
    try {
      return response.json(await clean_meteorite_dataset(filterKeywords));
    } catch (error) {
      return handleError(error, response);
    }
  }
);

app.listen(PORT, () => {
  console.log(`Server listening on ${PORT}`);
});
