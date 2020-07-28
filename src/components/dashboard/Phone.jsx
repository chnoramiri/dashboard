import React from "react";
import { makeStyles } from "@material-ui/core/styles";
import Paper from "@material-ui/core/Paper";
import { Typography, Divider, Button } from "@material-ui/core";
import { createMuiTheme, ThemeProvider } from "@material-ui/core/styles";

const useStyles = makeStyles((theme) => ({
  root: {
    display: "flex",
    // alignContent: "center",
    textAlign: "center",

    flexWrap: "wrap",
    "& > *": {
      margin: theme.spacing(1),
      width: theme.spacing(90),
      height: theme.spacing(55),
    },
  },
  peper: {
    "& > *": {
      margin: theme.spacing(1),
      //   textAlign: "center",
    },
  },
  typography: {
    margin: theme.spacing(2),
    // backgroundColor: "#4caf50",
    color: "#4caf50",
  },
  typographySize: {
    fontSize: "16px",
  },
  dividerSpace: {
    margin: theme.spacing(2),
  },
}));
const theme = createMuiTheme({
  overrides: {
    MuiButton: {
      contained: {
        backgroundColor: "#4caf50",
        "&:hover": {
          backgroundColor: "#388e3c",
        },
      },
      outlined: {
        border: "1px solid #4caf50",
        "&:hover": {
          border: "1px solid #388e3c",
        },
      },
    },
  },
});
function Phone() {
  const classes = useStyles();

  return (
    <div className={classes.root}>
      <Paper elevation={3} p={2} className={classes.peper}></Paper>
    </div>
  );
}
export default Phone;
