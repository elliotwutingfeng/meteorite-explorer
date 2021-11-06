import * as React from "react";

import { useScrollTrigger } from "@mui/material";
import AppBar from "@mui/material/AppBar";
import Toolbar from "@mui/material/Toolbar";
import Typography from "@mui/material/Typography";

export default function TopAppBar() {
  const trigger = useScrollTrigger({
    disableHysteresis: true,
    threshold: 0,
  });
  return (
    <>
      <AppBar
        position="fixed"
        sx={{ alignItems: "center" }}
        elevation={trigger ? 9 : 4}
      >
        <Toolbar>
          <Typography variant="h6" component="div" sx={{ flexGrow: 1 }}>
            <span role="img" aria-label="comet">
              ☄️ Meteorite Explorer
            </span>
          </Typography>
        </Toolbar>
      </AppBar>
      {/* Extra Toolbar component to push content below floating AppBar */}
      <Toolbar />
    </>
  );
}
