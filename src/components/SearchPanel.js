import * as React from "react";

import { Autocomplete } from "@mui/material";
import Box from "@mui/material/Box";
import Button from "@mui/material/Button";
import TextField from "@mui/material/TextField";
import { useDispatch, useSelector } from "react-redux";

import {
  appendSearchHistory,
  searchMeteorites,
  setFilter,
} from "../dataBankSlice";

export default function SearchPanel() {
  const dispatch = useDispatch();

  const searchHistory = useSelector((state) => state.dataBank.searchHistory);
  const filter = useSelector((state) => state.dataBank.filter);
  const previousSearchTerm = useSelector(
    (state) => state.dataBank.previousSearchTerm,
  );
  return (
    <Box
      sx={{
        display: "flex",
        justifyContent: "center",
      }}
    >
      <Autocomplete
        disablePortal
        disableClearable
        onKeyDown={(event) => {
          if (event.key === "Enter") {
            dispatch(searchMeteorites());
            dispatch(appendSearchHistory(filter));
            event.target.blur();
          }
        }}
        freeSolo
        blurOnSelect
        options={searchHistory}
        sx={{ width: 250 }}
        onChange={(event, newValue) => {
          if (event.type === "click") {
            dispatch(
              setFilter(
                typeof newValue === "undefined" || newValue === null
                  ? ""
                  : newValue.label,
              ),
            );
            dispatch(searchMeteorites());
            dispatch(
              appendSearchHistory(
                typeof newValue === "object" ? newValue.label : newValue,
              ),
            );
            event.target.blur();
          }
        }}
        onInputChange={(e, newInputValue) => {
          dispatch(
            setFilter(
              typeof newInputValue === "undefined" || newInputValue === null
                ? ""
                : newInputValue,
            ),
          );
        }}
        renderInput={(params) => (
          <TextField
            {...params}
            inputProps={{ ...params.inputProps, value: filter }}
            hiddenLabel
            placeholder="Search by Name"
            aria-placeholder="Search by Name"
            color="primary"
          />
        )}
      />

      <Button
        variant="contained"
        onClick={() => {
          dispatch(searchMeteorites());
          dispatch(appendSearchHistory(filter));
        }}
        disabled={filter === previousSearchTerm}
        color="primary"
      >
        Search
      </Button>
    </Box>
  );
}
