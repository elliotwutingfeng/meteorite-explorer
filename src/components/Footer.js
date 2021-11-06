import * as React from "react";

import GitHubIcon from "@mui/icons-material/GitHub";
import LinkedInIcon from "@mui/icons-material/LinkedIn";
import { Link, Typography } from "@mui/material";

export default function Footer() {
  return (
    <div
      style={{
        alignItems: "center",
        justifyContent: "center",
      }}
    >
      <div
        style={{
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
        }}
      >
        <Link href="https://github.com/elliotwutingfeng">
          <GitHubIcon fontSize="large" color="primary" />
        </Link>
        <Link href="https://www.linkedin.com/in/wutingfeng">
          <LinkedInIcon fontSize="large" color="primary" />
        </Link>
      </div>
      <div
        style={{
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
        }}
      >
        <Typography variant="body">Created by © Wu Tingfeng</Typography>
      </div>
    </div>
  );
}
