import { useEffect } from "react";

import { Box } from "@mui/system";
import { useDispatch } from "react-redux";

import Description from "./components/Description";
import Footer from "./components/Footer";
import ResultsPanel from "./components/ResultsPanel";
import SearchPanel from "./components/SearchPanel";
import TopAppBar from "./components/TopAppBar";
import { fetchMeteorites } from "./dataBankSlice";

function App() {
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(fetchMeteorites());
  }, [dispatch]);

  return (
    <Box
      sx={{
        display: "grid",
        width: "100%",
        height: "100vh",
        gridTemplateColumns:
          "minmax(10px, 1fr) minmax(10px, 8fr) minmax(10px, 1fr)",
        gap: 1,
        gridTemplateRows:
          "fit-content fit-content fit-content fit-content minmax(10px,1fr)",
        gridTemplateAreas: `"header header header"
    "description description description"
    "search search search"
    ". results ."
    "footer footer footer"`,
        bgcolor: "background.default",
        color: "text.primary",
      }}
    >
      <Box sx={{ gridArea: "header" }}>
        <TopAppBar />
      </Box>
      <Box sx={{ gridArea: "description" }}>
        <Description />
      </Box>
      <Box sx={{ gridArea: "search" }}>
        <SearchPanel />
      </Box>
      <Box
        sx={{
          gridArea: "results",
        }}
      >
        <ResultsPanel />
      </Box>
      <Box
        sx={{
          gridArea: "footer",
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          height: "100%",
        }}
      >
        <Footer />
      </Box>
    </Box>
  );
}

export default App;
