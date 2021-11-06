import { useEffect, useState } from "react";

import { Box } from "@mui/system";
import { useDispatch } from "react-redux";

import Footer from "./components/Footer";
import ResultsPanel from "./components/ResultsPanel";
import SearchPanel from "./components/SearchPanel";
import TopAppBar from "./components/TopAppBar";
import { fetchMeteorites } from "./dataBankSlice";

function App() {
  const dispatch = useDispatch();
  const [page, setPage] = useState(0);

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
          "min-content min-content min-content minmax(10px,1fr)",
        gridTemplateAreas: `"header header header"
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
      <Box sx={{ gridArea: "search" }}>
        <SearchPanel setPage={setPage} />
      </Box>
      <Box
        sx={{
          gridArea: "results",
        }}
      >
        <ResultsPanel {...{ page, setPage }} />
      </Box>
      <Box
        sx={{
          gridArea: "footer",
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
        }}
      >
        <Footer />
      </Box>
    </Box>
  );
}

export default App;
