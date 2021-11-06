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

export default function SearchPanel() {
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
        onKeyDown={(event) => {
          if (event.key === "Enter") {
            dispatch(fetchMeteorites());
            dispatch(appendSearchHistory(filter));
            event.target.blur();
          }
        }}
        freeSolo
        blurOnSelect
        options={searchHistory}
        sx={{ width: 300 }}
        onChange={(event, newValue) => {
          if (event.type === "click") {
            dispatch(
              setFilter(
                typeof newValue === "undefined" || newValue === null
                  ? ""
                  : newValue.label
              )
            );
            dispatch(fetchMeteorites());
            dispatch(appendSearchHistory(filter));
            event.target.blur();
          }
        }}
        onInputChange={(e, newInputValue) => {
          dispatch(
            setFilter(
              typeof newInputValue === "undefined" || newInputValue === null
                ? ""
                : newInputValue
            )
          );
        }}
        renderInput={(params) => (
          <TextField
            {...params}
            inputProps={{ ...params.inputProps }}
            label=""
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
