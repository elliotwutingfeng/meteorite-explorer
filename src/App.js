import { Container } from "@mui/material";

import ResultsPanel from "./components/ResultsPanel";
import SearchPanel from "./components/SearchPanel";
import TopAppBar from "./components/TopAppBar";

function App() {
  return (
    <>
      <TopAppBar />
      <Container maxWidth="xl">
        <SearchPanel />
        <ResultsPanel />
      </Container>
    </>
  );
}

export default App;
