import React from "react";

import { TextScramble } from "@a7sc11u/scramble";
import CancelIcon from "@mui/icons-material/Cancel";
import ErrorIcon from "@mui/icons-material/Error";
import HourglassBottom from "@mui/icons-material/HourglassBottom";
import Pagination from "@mui/material/Pagination";
import Stack from "@mui/material/Stack";
import { useTheme } from "@mui/material/styles";
import Typography from "@mui/material/Typography";
import { makeStyles } from "@mui/styles";
import { DataGrid, GridOverlay } from "@mui/x-data-grid";
import { MeteorRainLoading } from "react-loadingg";
import { useDispatch, useSelector } from "react-redux";

import { columnNameMappings, setPage } from "../dataBankSlice";

const Scramble = ({ text }) => (
  <TextScramble
    play={true}
    speed={1}
    scramble={8}
    step={1}
    stepInterval={1}
    seed={3}
    seedInterval={10}
    text={text}
  />
);

function columns(previousSearchTerm) {
  return Object.keys(columnNameMappings).map((e) => {
    return {
      field: e,
      headerName: columnNameMappings[e],
      sortable: false,
      editable: false,
      flex: 1,
      minWidth: 150,

      renderHeader: (params) => {
        return <Scramble text={params.colDef.headerName} />;
      },

      renderCell: (cellValues) => {
        return (
          <Typography variant="body1">
            <Scramble
              text={cellValues.value}
              key={previousSearchTerm + cellValues.id}
            />
          </Typography>
        );
      },
    };
  });
}

function BasicPagination({ pageSize, numEntries }) {
  const dispatch = useDispatch();
  const page = useSelector((state) => state.dataBank.page);
  return (
    <Stack alignItems="center">
      <Pagination
        count={Math.ceil(numEntries / pageSize)}
        page={page + 1}
        onChange={(e, page) => {
          dispatch(setPage(page - 1));
        }}
        showFirstButton
        showLastButton
        variant="text"
        shape="rounded"
        color="primary"
      />
    </Stack>
  );
}

const DataGridOverlay = React.forwardRef(function DataGridOverlay(props, ref) {
  const theme = useTheme();
  const loadingStatus = useSelector(
    (state) => state.dataBank.meteorites.status,
  );

  return (
    <GridOverlay ref={ref} {...props} sx={{ zIndex: 1 }}>
      {loadingStatus === "pending" ? (
        <MeteorRainLoading
          color={theme.palette.primary.main}
          size="large"
          speed={0.5}
        />
      ) : (
        <div>
          <div
            style={{
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
            }}
          >
            {props.norows === "true" ? (
              <CancelIcon
                fontSize="large"
                sx={{ color: theme.palette.primary.main }}
              />
            ) : loadingStatus === "timed out" ? (
              <HourglassBottom
                fontSize="large"
                sx={{ color: theme.palette.primary.main }}
              />
            ) : (
              <ErrorIcon
                fontSize="large"
                sx={{ color: theme.palette.primary.main }}
              />
            )}
          </div>
          <div
            style={{
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
            }}
          >
            <Typography variant="body1" color={theme.palette.primary.main}>
              {props.norows === "true"
                ? `No Matches Found`
                : loadingStatus === "timed out"
                ? `No Data: Request timed out`
                : `No Data: Server Unreachable`}
            </Typography>
          </div>
        </div>
      )}
    </GridOverlay>
  );
});

export default function ResultsPanel() {
  const meteorites = useSelector(
    (state) => state.dataBank.filtered_meteorites.data,
  );
  const loadingStatus = useSelector(
    (state) => state.dataBank.meteorites.status,
  );
  const page = useSelector((state) => state.dataBank.page);
  const previousSearchTerm = useSelector(
    (state) => state.dataBank.previousSearchTerm,
  );

  const pageSize = 10;

  const theme = useTheme();
  const useStylesAntDesign = makeStyles(
    (theme) => ({
      root: {
        border: `3px solid ${
          theme.palette.mode === "light" ? "#f0f0f0" : "#303030"
        }`,
        color:
          theme.palette.mode === "light"
            ? "rgba(0,0,0,.85)"
            : "rgba(255,255,255,0.85)",
        fontFamily: [
          "-apple-system",
          "BlinkMacSystemFont",
          '"Segoe UI"',
          "Roboto",
          '"Helvetica Neue"',
          "Arial",
          "sans-serif",
          '"Apple Color Emoji"',
          '"Segoe UI Emoji"',
          '"Segoe UI Symbol"',
        ].join(","),
        WebkitFontSmoothing: "auto",
        letterSpacing: "normal",
        "& .MuiDataGrid-columnsContainer": {
          backgroundColor:
            theme.palette.mode === "light" ? "#fafafa" : "#1d1d1d",
        },
        "& .MuiDataGrid-iconSeparator": {
          display: "none",
        },
        "& .MuiDataGrid-columnHeader, .MuiDataGrid-cell": {
          borderRight: `1px solid ${
            theme.palette.mode === "light" ? "#f0f0f0" : "#303030"
          }`,
          borderBottom: `1px solid ${
            theme.palette.mode === "light" ? "#f0f0f0" : "#303030"
          }`,
          color: theme.palette.primary.light,
          fontWeight: theme.typography.fontWeightBold,
        },
        "& .MuiDataGrid-columnsContainer, .MuiDataGrid-cell": {
          borderBottom: `1px solid ${
            theme.palette.mode === "light" ? "#f0f0f0" : "#303030"
          }`,
        },
        "& .MuiDataGrid-cell": {
          color:
            theme.palette.mode === "light"
              ? "rgba(0,0,0,.85)"
              : "rgba(255,255,255,0.85)",
          fontWeight: theme.typography.fontWeightRegular,
          fontFamily: [
            "-apple-system",
            "BlinkMacSystemFont",
            '"Segoe UI"',
            "Roboto",
            '"Helvetica Neue"',
            "Arial",
            "sans-serif",
            '"Apple Color Emoji"',
            '"Segoe UI Emoji"',
            '"Segoe UI Symbol"',
          ].join(","),
          WebkitFontSmoothing: "auto",
          letterSpacing: "normal",
          "& .MuiDataGrid-columnsContainer": {
            backgroundColor:
              theme.palette.mode === "light" ? "#fafafa" : "#1d1d1d",
          },
          "& .MuiDataGrid-iconSeparator": {
            display: "none",
          },
          "& .MuiDataGrid-colCell, .MuiDataGrid-cell": {
            borderRight: `1px solid ${
              theme.palette.mode === "light" ? "#f0f0f0" : "#303030"
            }`,
          },
          "& .MuiDataGrid-columnsContainer, .MuiDataGrid-cell": {
            borderBottom: `1px solid ${
              theme.palette.mode === "light" ? "#f0f0f0" : "#303030"
            }`,
          },
          "& .MuiDataGrid-cell": {
            color:
              theme.palette.mode === "light"
                ? "rgba(0,0,0,.85)"
                : "rgba(255,255,255,0.65)",
          },
          "& .MuiPaginationItem-root": {
            borderRadius: 0,
          },
          "& .MuiCheckbox-root svg": {
            width: 16,
            height: 16,
            backgroundColor: "transparent",
            border: `1px solid ${
              theme.palette.mode === "light" ? "#d9d9d9" : "rgb(67, 67, 67)"
            }`,
            borderRadius: 2,
          },
          "& .MuiCheckbox-root svg path": {
            display: "none",
          },
          "& .MuiCheckbox-root.Mui-checked:not(.MuiCheckbox-indeterminate) svg":
            {
              backgroundColor: "#1890ff",
              borderColor: "#1890ff",
            },
          "& .MuiCheckbox-root.Mui-checked .MuiIconButton-label:after": {
            position: "absolute",
            display: "table",
            border: "2px solid #fff",
            borderTop: 0,
            borderLeft: 0,
            transform: "rotate(45deg) translate(-50%,-50%)",
            opacity: 1,
            transition: "all .2s cubic-bezier(.12,.4,.29,1.46) .1s",
            content: '""',
            top: "50%",
            left: "39%",
            width: 5.71428571,
            height: 9.14285714,
          },
          "& .MuiCheckbox-root.MuiCheckbox-indeterminate .MuiIconButton-label:after":
            {
              width: 8,
              height: 8,
              backgroundColor: "#1890ff",
              transform: "none",
              top: "39%",
              border: 0,
            },
        },
      },
    }),
    { theme },
  );
  const antDesignClasses = useStylesAntDesign();
  return (
    <DataGrid
      className={antDesignClasses.root}
      columnBuffer={pageSize} // DataGrid column virtualization; prevents disappearing column headers when resizing
      columnThreshold={pageSize} // DataGrid column virtualization; prevents disappearing column headers when resizing
      rows={meteorites}
      columns={columns(previousSearchTerm)}
      page={page}
      pageSize={pageSize}
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
          <BasicPagination pageSize={pageSize} numEntries={meteorites.length} />
        ),
        NoRowsOverlay: () => <DataGridOverlay norows={"true"} />,
        LoadingOverlay: () => <DataGridOverlay norows={"false"} />,
      }}
    />
  );
}
