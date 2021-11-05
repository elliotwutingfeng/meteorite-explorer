import * as React from "react";

import { Button, TextField } from "@mui/material";
import Box from "@mui/material/Box";
import { useDispatch } from "react-redux";

import { fetchMeteorites, setFilter } from "../dataBankSlice";

function FullWidthTextField() {
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
        color="success"
      />
      <Button
        variant="contained"
        disableRipple
        onClick={(e) => {
          e.preventDefault();
          dispatch(fetchMeteorites());
        }}
        color="success"
      >
        Search
      </Button>
    </Box>
  );
}
export default function SearchPanel() {
  return <FullWidthTextField />;
}
