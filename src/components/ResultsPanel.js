import React from "react";

import { TextScramble } from "@a7sc11u/scramble";
import Pagination from "@mui/material/Pagination";
import Stack from "@mui/material/Stack";
import { useTheme } from "@mui/material/styles";
import Typography from "@mui/material/Typography";
import { makeStyles } from "@mui/styles";
import { DataGrid, GridOverlay } from "@mui/x-data-grid";
import { WaveLoading } from "react-loadingg";
import { useSelector } from "react-redux";

import { columnNameMappings } from "../dataBankSlice";

const columns = Object.keys(columnNameMappings).map((e) => {
  return {
    field: e,
    headerName: columnNameMappings[e],
    sortable: false,
    editable: false,
    flex: 1,
    minWidth: 150,

    renderHeader: (params) => {
      return (
        <TextScramble
          as="div"
          play={true}
          speed={1}
          scramble={8}
          step={1}
          stepInterval={1}
          seed={3}
          seedInterval={10}
          text={params.colDef.headerName}
        />
      );
    },

    renderCell: (cellValues) => {
      return (
        <Typography variant="body">
          <TextScramble
            as="div"
            play={true}
            speed={1}
            scramble={8}
            step={1}
            stepInterval={1}
            seed={3}
            seedInterval={10}
            text={cellValues.value}
          />
        </Typography>
      );
    },
  };
});

function BasicPagination({ page, setPage, pageSize, numEntries }) {
  return (
    <Stack alignItems="center">
      <Pagination
        count={Math.ceil(numEntries / pageSize)}
        page={page + 1}
        onChange={(e, page) => {
          setPage(page - 1);
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
    { theme }
  );
  const antDesignClasses = useStylesAntDesign();
  return (
    <DataGrid
      className={antDesignClasses.root}
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
