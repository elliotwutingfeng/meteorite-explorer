import GitHubIcon from "@mui/icons-material/GitHub";
import LinkedInIcon from "@mui/icons-material/LinkedIn";
import { Link, Typography } from "@mui/material";

export default function Footer() {
  return (
    <div>
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
        <Typography variant="body1">Created by © Wu Tingfeng</Typography>
      </div>

      <div
        style={{
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
        }}
      >
        <Typography variant="body1">
          Dataset provided by{" "}
          <Link href="http://www.meteoriticalsociety.org/">
            The Meteoritical Society
          </Link>{" "}
          and hosted on{" "}
          <Link href="https://data.nasa.gov/Space-Science/Meteorite-Landings/gh4g-9sfh">
            {`NASA's Open Data Portal`}
          </Link>
        </Typography>
      </div>
    </div>
  );
}
