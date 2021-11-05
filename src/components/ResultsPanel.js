import React from "react";

import { Typography } from "@mui/material";
import Pagination from "@mui/material/Pagination";
import Stack from "@mui/material/Stack";
import { useTheme } from "@mui/material/styles";
import { DataGrid, GridOverlay } from "@mui/x-data-grid";
import { WaveLoading } from "react-loadingg";
import { useSelector } from "react-redux";

const columnNameMappings = {
  name: "Name",
  id: "Id",
  nametype: "Name Type",
  recclass: "Rec Class",
  mass: "Mass (g)",
  fall: "Fall",
  year: "Year",
  reclat: "Latitude",
  reclong: "Longitude",
};
const columns = [
  "name",
  "id",
  "nametype",
  "recclass",
  "mass",
  "fall",
  "year",
  "reclat",
  "reclong",
].map((e) => {
  return {
    field: e,
    headerName: columnNameMappings[e],
    sortable: false,
    editable: false,
    flex: 1,
    minWidth: 160,
  };
});

function BasicPagination({ page, setPage, pageSize, numEntries }) {
  return (
    <Stack spacing={2} alignItems="center">
      <Pagination
        count={Math.ceil(numEntries / pageSize)}
        page={page + 1}
        onChange={(e, page) => {
          setPage(page - 1);
        }}
        showFirstButton
        showLastButton
        variant="outlined"
        shape="rounded"
        color="primary"
      />
    </Stack>
  );
}

const GridNoRowsOverlay = React.forwardRef(function GridNoRowsOverlay(
  props,
  ref
) {
  const meteorites = useSelector((state) => state.dataBank.meteorites.data);
  return (
    <GridOverlay ref={ref} {...props}>
      {meteorites.length === 0 && <Typography>No matches found</Typography>}
    </GridOverlay>
  );
});

const GridLoadingOverlay = React.forwardRef(function GridLoadingOverlay(
  props,
  ref
) {
  const theme = useTheme();
  const loadingStatus = useSelector(
    (state) => state.dataBank.meteorites.status
  );
  return (
    <GridOverlay ref={ref} {...props} sx={{ zIndex: 1 }}>
      {loadingStatus === "pending" ? (
        <WaveLoading color={theme.palette.primary.main} size="large" />
      ) : loadingStatus === "timed out" ? (
        <Typography>Failed to retrieve data from NASA</Typography>
      ) : (
        <Typography>Failed to retrieve data from NASA</Typography>
      )}
    </GridOverlay>
  );
});

export default function ResultsPanel({ page, setPage }) {
  const meteorites = useSelector((state) => state.dataBank.meteorites.data);
  const loadingStatus = useSelector(
    (state) => state.dataBank.meteorites.status
  );

  const pageSize = 10;

  return (
    <DataGrid
      rows={meteorites}
      columns={columns}
      pageSize={pageSize}
      page={page}
      rowsPerPageOptions={[pageSize]}
      checkboxSelection={false}
      disableColumnMenu
      disableSelectionOnClick
      disableColumnSelector
      disableColumnFilter
      autoHeight
      sx={{ borderColor: "red" }}
      loading={loadingStatus !== "up_to_date"}
      components={{
        Footer: () => (
          <BasicPagination
            page={page}
            setPage={setPage}
            pageSize={pageSize}
            numEntries={meteorites.length}
          />
        ),
        NoRowsOverlay: () => <GridNoRowsOverlay />,
        LoadingOverlay: () => <GridLoadingOverlay />,
      }}
    />
  );
}
