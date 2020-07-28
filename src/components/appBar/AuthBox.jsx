import React, { useEffect } from "react";
import { makeStyles } from "@material-ui/core/styles";
// import { Box, Divider, Typography } from "@material-ui/core";
import { Box, Divider, Typography, Link } from "@material-ui/core";
import { withRouter, useHistory } from "react-router-dom";
import Auth from "../account/Auth";
import { withContext } from "../../assests/context/withContext";
import Axios from "axios";

const useStyles = makeStyles((theme) => ({
  root: {
    flexGrow: 1,
    "& > * + *": {
      marginRight: theme.spacing(2),
    },
  },
  loginLink: {
    fontSize: "22px",
  },
  exitTypo: {
    cursor: "pointer",
    fontSize: "22px",
  },
}));

const AuthBox = withContext(
  withRouter((props) => {
    const { logoutURL, loginResult, storageResult } = props.portalContext;

    let history = useHistory();

    const classes = useStyles();

    const loginButton = (event) => {
      event.preventDefault();
      history.push("/signin");
    };
    const signupButton = (event) => {
      event.preventDefault();
      history.push("/signup");
    };
    const optionlogoutAPI = {
      url: logoutURL,
      method: "POST",
      headers: {
        Accept: "application/json",
        "Content-Type": "application/json;charset=UTF-8",
        Authorization: `bearer ${loginResult.access_token}`,
      },
    };

    const logoutButton = () => {
      Axios(optionlogoutAPI);
      sessionStorage.removeItem("login");
      sessionStorage.removeItem("PassStorage");
      Auth.signout();
      history.push("/");
    };

    return Auth.getAuth("AuthBox") ? (
      <Box display="flex" mr={3}>
        <Typography
          className={classes.exitTypo}
          onClick={logoutButton}
        >{`  خروج از ${loginResult.userName}`}</Typography>
      </Box>
    ) : (
      <Box display="flex" className={classes.root}>
        <Box mr={2}>
          <Link
            href="#"
            onClick={loginButton}
            className={classes.loginLink}
            color="secondary"
          >
            ورود
          </Link>
        </Box>
        <Divider orientation="horizontal" component="hr" />
        <Box mr={2}>
          <Link
            href="#"
            onClick={signupButton}
            className={classes.loginLink}
            color="secondary"
          >
            ثبت نام
          </Link>
        </Box>
      </Box>
    );
  })
);
export default AuthBox;
