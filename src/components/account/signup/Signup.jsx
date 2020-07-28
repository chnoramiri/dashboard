import React, { useState } from "react";
import { makeStyles } from "@material-ui/core/styles";
import TextField from "@material-ui/core/TextField";
import {
  Paper,
  Typography,
  Button,
  Divider,
  Link,
  Box,
} from "@material-ui/core";
import { createMuiTheme, ThemeProvider } from "@material-ui/core/styles";
import Captcha from "../../../assests/Captcha";
import { withContext } from "../../../assests/context/withContext";
import Axios from "axios";
import { ToastContainer, toast, Zoom } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { useHistory, Redirect } from "react-router-dom";

const useStyles = makeStyles((theme) => ({
  paper: {
    "& > *": {
      margin: theme.spacing(2),
      textAlign: "center",
    },
    width: theme.spacing(60),
    height: theme.spacing(75),
  },
  textField: {
    margin: theme.spacing(1),
  },
  loginText: {
    margin: theme.spacing(5),
  },
}));

function Signup(props) {
  const [state, setState] = useState({
    // fieldsSignup: { username: "", password: "" },
    errors: { username: "", password: "", messageReg: "", captcha: "" },
    activeNextButton: false,
  });
  const {
    captchaInput,
    registerURL,
    captchaToken,
    registerResult,
    updateState,
    fetchCaptcha,
    fieldsSignup,
  } = props.portalContext;
  const { errors, activeNextButton } = state;
  let history = useHistory();

  const handleInputChange = (field, e) => {
    fieldsSignup[field] = e.target.value;
    setState((prevState) => ({
      ...prevState,
      fieldsSignup,
    }));
  };
  const validationFunc = () => {
    let phoneno = /^09\d{9}$/;
    if (!fieldsSignup.username) {
      errors["username"] = "لطفانام کاربری را وارد کنید.";
    } else if (fieldsSignup.username) {
      errors["username"] = "";
    }
    if (!fieldsSignup.password) {
      errors["password"] = "لطفا کلمه عبور را وارد کنید.";
    } else if (fieldsSignup.password) {
      errors["password"] = "";
    }
    if (fieldsSignup.password && !fieldsSignup.password.match(phoneno)) {
      errors["password"] = "شماره وارد شده صحیح نمی باشد";
    } else if (fieldsSignup.password.match(phoneno)) {
      errors["password"] = "";
    }
    if (!errors.username && !errors.password) {
      if (!captchaInput || captchaInput.length < 6) {
        errors["captcha"] = "لطفا کد تصویر را وارد نمایید ";
      } else if (captchaInput) {
        errors["captcha"] = "";
      }
    }
    setState({
      ...state,
      errors,
    });
  };
  const optionAPI = {
    url: registerURL,
    method: "POST",
    headers: {
      Accept: "application/json",
      "Content-Type": "application/json;charset=UTF-8",
      captcha: captchaInput,
      token: captchaToken,
    },
    data: {
      Mobile: fieldsSignup.password,
      username: fieldsSignup.username,
    },
  };
  const createButton = () => {
    validationFunc();
    // debugger;
    if (captchaInput.length >= 6 && !errors.username && !errors.password) {
      Axios(optionAPI).then((response) => {
        updateState({ registerResult: response });
        if (response.data.error && response.data.error[0].code == "10") {
          let message = response.data.error[0].message;
          toast.error(message, {
            transition: Zoom,
            autoClose: "2000",
            draggable: false,
            // bodyClassName: "grow-font-size",
          });
          fetchCaptcha();
          updateState({ captchaInput: "" });
        }
        if (response.data.error && response.data.error[0].code == "2001") {
          errors["messageReg"] = response.data.error[0].message;
          setState({
            ...state,
            errors,
          });
          fetchCaptcha();
          updateState({ captchaInput: "" });
        } else {
          errors["messageReg"] = "";
        }

        if (response.data.value) {
          // sessionStorage.setItem("signup", JSON.stringify(fieldsSignup.password));
          history.push("/signup/verification");
        }
      });
    }
    if (!errors.username && !errors.password) {
      setState({ ...state, activeNextButton: true });
    }
  };
  const backButton = () => {
    history.goBack();
  };
  const { root, paper, loginText, textField, error, btn } = useStyles();

  return (
    <div>
      <Box display="flex" justifyContent="flex-end" mr={8} mt={12}>
        <Button
          variant="outlined"
          color="primary"
          style={{ width: "190px", fontSize: "17px" }}
          onClick={backButton}
        >
          بازگشت به صفحه قبل
        </Button>
      </Box>
      <Box display="flex" justifyContent="center" mt={3}>
        <Paper elevation={3} className={paper}>
          <Box display="flex" justifyContent="center" m={1}>
            <Typography className={loginText} variant="h5">
              ایجاد حساب
            </Typography>
          </Box>
          <form noValidate autoComplete="off">
            <ToastContainer />
            <Box display="flex" justifyContent="center" m={1}>
              <TextField
                id="pass"
                variant="outlined"
                value={fieldsSignup["username"]}
                onChange={(event) => handleInputChange("username", event)}
                label="نام کاربری"
                type="text"
                required
              />
            </Box>
            <Box display="flex" justifyContent="center" m={1}>
              <TextField
                id="pass"
                variant="outlined"
                value={fieldsSignup["password"]}
                onChange={(event) => handleInputChange("password", event)}
                label="شماره تلفن همراه"
                type="text"
                required
              />
            </Box>
            <Captcha />
            {errors && (
              // <Box display="flex" justifyContent="center" m={1}>
              <Box m={1} color="red">
                <Box m={1}>{errors["username"]} </Box>
                <Box m={1}>{errors["password"]} </Box>
                <Box m={1}>{errors["captcha"]} </Box>
                <Box m={1}>{errors["messageReg"]} </Box>
              </Box>
              // </Box>
            )}

            {!activeNextButton ? (
              <Box display="flex" justifyContent="center" m={1}>
                <Button
                  variant="contained"
                  color="primary"
                  onClick={createButton}
                >
                  ایجاد حساب
                </Button>
              </Box>
            ) : (
              <Box display="flex" justifyContent="center" m={1}>
                <Button
                  variant="contained"
                  color="primary"
                  onClick={createButton}
                >
                  بعدی
                </Button>
              </Box>
            )}
          </form>
        </Paper>
      </Box>
    </div>
  );
}
export default withContext(Signup);
