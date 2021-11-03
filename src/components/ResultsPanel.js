import * as React from "react";

import { DataGrid } from "@mui/x-data-grid";
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
  };
});

export default function ResultsPanel() {
  const meteorites = useSelector((state) => state.dataBank.meteorites.data);
  return (
    <div style={{ width: "100%" }}>
      <DataGrid
        rows={meteorites}
        columns={columns}
        pageSize={5}
        rowsPerPageOptions={[5]}
        checkboxSelection={false}
        disableColumnMenu
        disableSelectionOnClick
        disableColumnSelector
        disableColumnFilter
        autoHeight
      />
    </div>
  );
}
