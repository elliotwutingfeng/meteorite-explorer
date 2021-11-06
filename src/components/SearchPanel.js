import * as React from "react";

import Box from "@mui/material/Box";
import Button from "@mui/material/Button";
import TextField from "@mui/material/TextField";
import { useDispatch } from "react-redux";

import { fetchMeteorites, setFilter } from "../dataBankSlice";

function FullWidthTextField({ setPage }) {
  const dispatch = useDispatch();

  return (
    <Box
      sx={{
        display: "flex",
        justifyContent: "center",
      }}
    >
      <TextField
        label=""
        id="search"
        placeholder="Search by Name"
        aria-placeholder="Search by Name"
        onChange={(e) => {
          dispatch(setFilter(e.target.value));
        }}
        color="primary"
        autoComplete="off"
      />
      <Button
        variant="contained"
        onClick={() => {
          setPage(0);
          dispatch(fetchMeteorites());
        }}
        color="primary"
      >
        Search
      </Button>
    </Box>
  );
}
export default function SearchPanel({ setPage }) {
  return <FullWidthTextField setPage={setPage} />;
}
