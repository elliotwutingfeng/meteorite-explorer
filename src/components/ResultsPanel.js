import { useEffect } from "react";

import { useTheme } from "@mui/material/styles";
import { DataGrid } from "@mui/x-data-grid";
import { WaveLoading } from "react-loadingg";
import { useSelector, useDispatch } from "react-redux";

import { fetchMeteorites } from "../dataBankSlice";
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
  const theme = useTheme();
  // Fetch data on first page load
  const dispatch = useDispatch();
  useEffect(() => {
    dispatch(fetchMeteorites());
  }, [dispatch]);

  const meteorites = useSelector((state) => state.dataBank.meteorites.data);
  const loadingStatus = useSelector(
    (state) => state.dataBank.meteorites.status
  );
  return (
    <>
      {loadingStatus === "up_to_date" ? (
        meteorites.length === 0 ? (
          "Search criteria found nothing!"
        ) : (
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
        )
      ) : loadingStatus === "pending" ? (
        <WaveLoading color={theme.palette.primary.main} size="large" />
      ) : loadingStatus === "timed out" ? (
        "timed out"
      ) : (
        "failed"
      )}
    </>
  );
}
