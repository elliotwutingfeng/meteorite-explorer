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
        placeholder="Enter search terms"
        aria-placeholder="Enter search terms"
        onChange={(e) => {
          dispatch(setFilter(e.target.value));
        }}
      />
      <Button
        variant="contained"
        disableRipple
        onClick={(e) => {
          e.preventDefault();
          dispatch(fetchMeteorites());
        }}
      >
        Search
      </Button>
    </Box>
  );
}
export default function SearchPanel() {
  return <FullWidthTextField />;
}
