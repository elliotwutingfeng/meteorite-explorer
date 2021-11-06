import * as React from "react";

import AppBar from "@mui/material/AppBar";
import Toolbar from "@mui/material/Toolbar";
import Typography from "@mui/material/Typography";
export default function TopAppBar() {
  return (
    <AppBar position="static" sx={{ alignItems: "center" }}>
      <Toolbar>
        <Typography variant="h6" component="div" sx={{ flexGrow: 1 }}>
          <span role="img" aria-label="comet">
            ☄️ Meteorite Explorer
          </span>
        </Typography>
      </Toolbar>
    </AppBar>
  );
}
