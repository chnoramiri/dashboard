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

function ForgetPass(props) {
  const [state, setState] = useState({
    // fieldsSignin: { username: "", password: "" },
    errors: { username: "", captcha: "" },
    activeNextButton: false,
  });
  const {
    captchaInput,
    registerURL,
    captchaToken,
    verifyForgetPassResult,
    updateState,
    fetchCaptcha,
    fieldsSignin,
    verifyForgetPassURL,
  } = props.portalContext;
  const { errors, activeNextButton } = state;
  let history = useHistory();

  const handleInputChange = (field, e) => {
    fieldsSignin[field] = e.target.value;
    setState((prevState) => ({
      ...prevState,
      fieldsSignin,
    }));
  };
  const validationFunc = () => {
    if (!fieldsSignin.username) {
      errors["username"] = "لطفانام کاربری را وارد کنید.";
    } else if (fieldsSignin.username) {
      errors["username"] = "";
    }
    if (!errors.username && !errors.password) {
      if (!captchaInput || captchaInput.length < 6) {
        errors["captcha"] = "لطفابه کد تصویر توجه نمایید ";
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
    url: verifyForgetPassURL,
    method: "POST",
    headers: {
      Accept: "application/json",
      "Content-Type": "application/json;charset=UTF-8",
      captcha: captchaInput,
      token: captchaToken,
    },
    data: {
      username: fieldsSignin.username,
    },
  };
  const createButton = () => {
    validationFunc();
    // debugger;
    if (captchaInput.length >= 6 && !errors.username && !errors.password) {
      Axios(optionAPI).then((response) => {
        if (response.data.error && response.data.error[0].code) {
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

        if (response.data.value) {
          updateState({ verifyForgetPassResult: response.data.value });
          sessionStorage.setItem(
            "PassStorage",
            JSON.stringify(response.data.value)
          );
          history.push("/signin/forgetPass/verifyForgetPass");
        }
      });
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
              فراموشی رمز عبور
            </Typography>
          </Box>
          <form noValidate autoComplete="off">
            <ToastContainer />
            <Box display="flex" ml={2}>
              <Typography align="left">
                نام کاربری یا شماره موبایل خود را وارد کنید تاما از طریق پیامک
                برای شما یک کد فعالسازی ارسال کنیم.
              </Typography>
            </Box>
            <Box display="flex" justifyContent="center" m={1} mt={3}>
              <TextField
                id="pass"
                variant="outlined"
                value={fieldsSignin["username"]}
                onChange={(event) => handleInputChange("username", event)}
                label="نام کاربری یا شماره موبایل"
                type="text"
                required
              />
            </Box>
            <Captcha />
            {errors && (
              <Box m={1} color="red">
                <Box m={1}>{errors["username"]} </Box>
                <Box m={1}>{errors["captcha"]} </Box>
              </Box>
            )}
            <Box display="flex" justifyContent="center" m={1}>
              <Button
                variant="contained"
                color="primary"
                onClick={createButton}
              >
                ارسال کد
              </Button>
            </Box>
          </form>
        </Paper>
      </Box>
    </div>
  );
}
export default withContext(ForgetPass);
