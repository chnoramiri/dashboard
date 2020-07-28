import React, { useEffect, useRef } from "react";
import { createMuiTheme, ThemeProvider } from "@material-ui/core/styles";
import Dashboard from "./components/dashboard/Dashboard";
import { withContext } from "./assests/context/withContext";

import { create } from "jss";
import rtl from "jss-rtl";
import RTL from "./assests/RTL";
import { spacing } from "@material-ui/system";

import DashboardRout from "./components/dashboard/DashboardRout";
import { BrowserRouter as Router, Route, Redirect } from "react-router-dom";
import AppBar from "./components/appBar/AppBar";
import Routers from "./components/routes/Routers";
import Auth from "./components/account/Auth";
import { useHistory } from "react-router-dom";
import { purple } from "@material-ui/core/colors";
import ForgetPass from "./components/account/signin/ForgetPass";
import VerifyForgetPass from "./components/account/signin/VerifyForgetPass";
import ResetPassword from "./components/account/signin/ResetPassword";
import { SnackbarProvider, withSnackbar } from "notistack";
import SetPassword from "./components/account/signup/SetPassword";

const theme = createMuiTheme({
  direction: "rtl", // Both here and <body dir="rtl">
  // spacing: 2,
  underlineHover: {
    textDecoration: "none",
  },
  overrides: {
    MuiLink: {
      underlineHover: {
        "&:hover": {
          textDecoration: "none",
        },
      },
    },
    MuiOutlinedInput: {
      input: {
        width: "400px",
      },
    },
  },
  typography: {
    link: {
      fontSize: "20px",
      main: "#000",
    },
    button: {
      fontSize: "20px",
      width: "130px",
    },

    fontSize: 15,
    color: "black",
    fontWeightBold: "normal",
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
  },
  palette: {
    primary: {
      // Purple and green play nicely together.
      main: "#f0a500",
    },
    secondary: {
      main: "#000",
    },
  },
});

function App(props) {
  const {
    updateState,
    loginResult,
    verifyForgetPassResult,
  } = props.portalContext;
  var loginStorage = sessionStorage.getItem("login");
  if (loginStorage) {
    loginStorage = JSON.parse(loginStorage);
    Auth.Authentication("App");
  }
  useEffect(() => {
    var loginStorage = sessionStorage.getItem("login");
    if (loginStorage) {
      loginStorage = JSON.parse(loginStorage);
      Auth.Authentication("App");
      updateState({ loginResult: loginStorage });
    }
  }, []);
  useEffect(() => {
    let passStorage = sessionStorage.getItem("PassStorage");
    if (passStorage) {
      passStorage = JSON.parse(passStorage);
      updateState({ verifyForgetPassResult: passStorage });
    }
  }, []);

  return (
    <Router>
      <ThemeProvider theme={theme}>
        <RTL>
          <div dir="rtl">
            <AppBar />
            <Routers />
          </div>
        </RTL>
      </ThemeProvider>
    </Router>
  );
}

export default withContext(App);
