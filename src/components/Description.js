import { useTheme } from "@emotion/react";
import { Typography } from "@mui/material";

export default function Description() {
  const theme = useTheme();
  return (
    <div>
      <div
        style={{
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
        }}
      >
        <Typography
          variant="body1"
          color={theme.palette.primary.main}
          align="center"
        >
          {`Explore The Meteoritical Society's comprehensive data set of all
          known meteorite landings across the globe.`}
        </Typography>
      </div>
    </div>
  );
}
