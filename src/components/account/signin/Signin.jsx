import React, { useState, useEffect } from "react";
import { makeStyles } from "@material-ui/core/styles";
import Input from "@material-ui/core/Input";
import TextField from "@material-ui/core/TextField";
import { Paper, Typography, Button, Link, Box } from "@material-ui/core";
import { createMuiTheme, ThemeProvider } from "@material-ui/core/styles";
import { useHistory } from "react-router-dom";
import Axios from "axios";
import { withContext } from "../../../assests/context/withContext";
import { ToastContainer, toast, Zoom } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import Captcha from "../../../assests/Captcha";
import Auth from "../Auth";
import FormLabel from "@material-ui/core/FormLabel";
import FormControl from "@material-ui/core/FormControl";
import FormGroup from "@material-ui/core/FormGroup";
import FormControlLabel from "@material-ui/core/FormControlLabel";
import FormHelperText from "@material-ui/core/FormHelperText";
import Checkbox from "@material-ui/core/Checkbox";
import { useSnackbar } from "notistack";

const useStyles = makeStyles((theme) => ({
  paper: {
    "& > *": {
      margin: theme.spacing(2),
      textAlign: "center",
    },
    width: theme.spacing(60),
    height: theme.spacing(75),
  },
  signinText: {
    margin: theme.spacing(3),
  },
}));

function Signin(props) {
  const [state, setState] = useState({
    checkedA: false,
    captchaDisplay: false,
    errors: { username: "", password: "" },
  });
  let history = useHistory();

  const forgetButton = (event) => {
    event.preventDefault();
    history.push("/signin/forgetPass");
  };
  const classes = useStyles();
  const handleChange = (name) => (event) => {
    setState({ ...state, [name]: event.target.checked });
  };
  const handleInputChange = (field, e) => {
    fieldsSignin[field] = e.target.value;
    setState((prevState) => ({
      ...prevState,
      fieldsSignin,
    }));
  };
  const { captchaDisplay, checkedA, errors } = state;
  const {
    loginURL,
    fieldsSignin,
    loginResult,
    captchaInput,
    captchaToken,
    fetchCaptcha,
    updateState,
    errorMessage,
    notificationCenter,
  } = props.portalContext;

  const optionSigninAPI = {
    url: loginURL,
    method: "POST",
    headers: {
      Accept: "application/json",
      "Content-Type": "application/json;charset=UTF-8",
      captcha: captchaInput,
      token: captchaToken,
    },
    data: {
      username: fieldsSignin.username,
      password: fieldsSignin.password,
    },
  };
  const validationFunc = () => {
    if (!fieldsSignin.username) {
      errors["username"] = "لطفانام کاربری را وارد کنید.";
    } else if (fieldsSignin.username) {
      errors["username"] = "";
    }
    if (!fieldsSignin.password) {
      errors["password"] = "لطفا کلمه عبور را وارد کنید.";
    } else if (fieldsSignin.password) {
      errors["password"] = "";
    }
    setState({
      ...state,
      errors,
    });
  };
  const signinButton = () => {
    validationFunc();
    if (!errors.username && !errors.password) {
      // try {
      //   if (navigator.onLine) {
      //     console.log("online");

      Axios(optionSigninAPI).then((response) => {
        if (response.data.error) {
          let message = response.data.error[0].message;
          toast.error(message, {
            transition: Zoom,
            autoClose: "1000",
            draggable: false,
            // bodyClassName: "grow-font-size",
          });
          if (response.data.error && response.data.error[0].code == "10") {
            setState({ ...state, captchaDisplay: true });
          }
          fetchCaptcha();
        }
        if (response.data.value) {
          updateState({ loginResult: response.data.value });
          sessionStorage.setItem("login", JSON.stringify(response.data.value));
          Auth.Authentication("signinButton");
          history.push("/dashboard");
        }
      });
    }
    //  else console.log("false");
    // }
    // // catch (err) {
    // //   console.log("offline");

    // //   console.log("435345345");
    //   toast.error("message", {
    //     transition: Zoom,
    //     autoClose: "1000",
    //     draggable: false,
    //     // bodyClassName: "grow-font-size",
    //   });
    // }
    // }
  };
  const signupButton = () => {
    history.push("/signup");
  };

  return (
    <div>
      <Box display="flex" justifyContent="center" mt={20}>
        <Paper elevation={3} className={classes.paper}>
          <ToastContainer />
          <Box display="flex" justifyContent="center">
            <Typography className={classes.signinText} variant="h5">
              ورود به سیستم
            </Typography>
          </Box>

          <form noValidate autoComplete="off">
            <Box display="flex" justifyContent="center" m={1}>
              <TextField
                id="username"
                variant="outlined"
                label="نام کاربری"
                type="text"
                value={fieldsSignin["username"]}
                onChange={(event) => handleInputChange("username", event)}
              />
            </Box>
            <Box display="flex" justifyContent="center" m={1}>
              <TextField
                id="pass"
                variant="outlined"
                label="رمز عبور"
                type="password"
                value={fieldsSignin["password"]}
                onChange={(event) => handleInputChange("password", event)}
              />
            </Box>
            <Box display="flex" justifyContent="flex-start" m={1}>
              <Link href="#" onClick={forgetButton}>
                رمز عبور را فراموش کرده اید؟
              </Link>
            </Box>
            <Box display="flex" justifyContent="flex-start" m={1}>
              <FormControlLabel
                control={
                  <Checkbox
                    checked={checkedA}
                    onChange={handleChange("checkedA")}
                    value="checkedA"
                    color="primary"
                  />
                }
                label="مرا به خاطر بسپار"
              />
            </Box>
            <Box display="flex" justifyContent="flex-start" ml={1}>
              <Typography>
                اگر از کامپیوترهای عمومی استفاده می کنید این گزینه را فعال نکنید
              </Typography>
            </Box>
            {errors && (
              // <Box display="flex" justifyContent="center" m={1}>
              <Box m={2} color="red">
                <Box m={2}>{errors["username"]} </Box>
                <Box m={2}>{errors["password"]} </Box>
              </Box>
              // </Box>
            )}
            {captchaDisplay && <Captcha />}
            <Box display="flex" justifyContent="center" mt={4}>
              <Box display="flex" m={1}>
                <Button
                  className={classes.btn}
                  variant="contained"
                  color="primary"
                  disableElevation
                  onClick={signinButton}
                >
                  ورود
                </Button>
              </Box>

              <Box display="flex" m={1}>
                <Button
                  className={classes.btn}
                  variant="outlined"
                  color="primary"
                  disableElevation
                  onClick={signupButton}
                >
                  ثبت نام
                </Button>
              </Box>
            </Box>
          </form>
        </Paper>
      </Box>
    </div>
  );
}
export default withContext(Signin);
