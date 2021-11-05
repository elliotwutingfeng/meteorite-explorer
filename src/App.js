import { useEffect, useState } from "react";

import { Box } from "@mui/system";
import { useDispatch } from "react-redux";

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
        width: "100vw",
        height: "100vh",
        gridTemplateColumns:
          "minmax(10px, 1fr) minmax(10px, 8fr) minmax(10px, 1fr)",
        gap: 1,
        gridTemplateRows: "min-content min-content minmax(10px, 1fr)",
        gridTemplateAreas: `"header header header"
    "search search search"
    ". results ."`,
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
          display: "flex",
          alignItems: "flex-start",
        }}
      >
        <ResultsPanel {...{ page, setPage }} />
      </Box>
    </Box>
  );
}

export default App;
