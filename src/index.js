import React from "react";

import "./index.css";
import CssBaseline from "@mui/material/CssBaseline";
import { createTheme, ThemeProvider } from "@mui/material/styles";
import ReactDOM from "react-dom";
import { Provider } from "react-redux";

import App from "./App";
import { store } from "./store";

const theme = createTheme({
  palette: {
    mode: "dark",
    primary: {
      main: "#EBBF55",
      light: "#FCD96F",
      dark: "#EBBF55",
      contrastText: "#0B0C0F",
    },
    background: {
      paper: "#0B0C0F",
      default: "#0B0C0F",
    },
    action: { hover: "rgba(117,87,38,0.3)", hoverOpacity: 0.3 },
  },
  components: {
    MuiButtonBase: {
      defaultProps: {
        disableRipple: true, // Disable button ripple globally
      },
    },
  },
});

ReactDOM.render(
  <React.StrictMode>
    <Provider store={store}>
      <CssBaseline />
      <ThemeProvider theme={theme}>
        <App />
      </ThemeProvider>
    </Provider>
  </React.StrictMode>,
  document.getElementById("root"),
);
