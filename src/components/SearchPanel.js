import * as React from "react";

import { Autocomplete } from "@mui/material";
import Box from "@mui/material/Box";
import Button from "@mui/material/Button";
import TextField from "@mui/material/TextField";
import { useDispatch, useSelector } from "react-redux";

import {
  appendSearchHistory,
  fetchMeteorites,
  setFilter,
} from "../dataBankSlice";

function FullWidthTextField() {
  const dispatch = useDispatch();

  const searchHistory = useSelector((state) => state.dataBank.searchHistory);
  const filter = useSelector((state) => state.dataBank.filter);
  return (
    <Box
      sx={{
        display: "flex",
        justifyContent: "center",
      }}
    >
      <Autocomplete
        disablePortal
        freeSolo
        id="autocomplete-search"
        options={searchHistory}
        sx={{ width: 300 }}
        onChange={(e, newValue) => {
          dispatch(setFilter(newValue === null ? "" : newValue.label));
        }}
        onInputChange={(e, newInputValue) => {
          dispatch(setFilter(newInputValue));
        }}
        renderInput={(params) => (
          <TextField
            {...params}
            label=""
            id="search"
            placeholder="Search by Name"
            aria-placeholder="Search by Name"
            color="primary"
          />
        )}
      />

      <Button
        variant="contained"
        onClick={() => {
          dispatch(fetchMeteorites());
          dispatch(appendSearchHistory(filter));
        }}
        color="primary"
      >
        Search
      </Button>
    </Box>
  );
}
export default function SearchPanel() {
  return <FullWidthTextField />;
}
