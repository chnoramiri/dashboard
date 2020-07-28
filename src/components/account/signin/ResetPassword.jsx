import React, { useState, useEffect } from "react";
import { makeStyles } from "@material-ui/core/styles";
import Input from "@material-ui/core/Input";
import TextField from "@material-ui/core/TextField";
import {
  Paper,
  Typography,
  Button,
  Link,
  Box,
  Divider,
} from "@material-ui/core";
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

function ResetPassword(props) {
  const [state, setState] = useState({
    checkedA: false,
    captchaDisplay: false,
    errors: { password: "", duplicatePassword: "", comparePass: "" },
  });
  let history = useHistory();

  const classes = useStyles();
  const handleChange = (name) => (event) => {
    setState({ ...state, [name]: event.target.checked });
  };
  const handleInputChange = (field, e) => {
    fieldsResetPass[field] = e.target.value;
    setState((prevState) => ({
      ...prevState,
      fieldsResetPass,
    }));
  };
  const { captchaDisplay, checkedA, errors } = state;
  const {
    fieldsResetPass,
    updateState,
    verifyForgetPassResult,
    resetPasswordURL,
    resetPasswordResult,
    loginURL,
  } = props.portalContext;

  const optionResetPassAPI = {
    url: resetPasswordURL,
    method: "POST",
    data: {
      ConfirmPassword: fieldsResetPass.duplicatePassword,
      NewPassword: fieldsResetPass.password,
      Token: verifyForgetPassResult.token,
    },
  };
  const validationFunc = () => {
    let val = /^(?=.*?\d)(?=.*?[a-zA-Z])[a-zA-Z\d]+$/;
    if (!fieldsResetPass.password) {
      errors["password"] = "لطفاکلمه عبور را وارد کنید";
    } else if (!/[a-zA-Z]$/i.test(fieldsResetPass.password)) {
      errors["password"] = "زبان کیبورد را انگلیسی کنید ";
      //   errors["duplicatePassword"] = "زبان کیبورد را انگلیسی کنید ";
    } else if (fieldsResetPass.password.length < 8) {
      errors["password"] = "کلمه عبور باید حداقل  8 رقم باشد";
    } else if (!fieldsResetPass.password.match(val)) {
      errors["password"] = "کلمه عبور باید ترکیب حروف و عدد باشد";
    } else if (fieldsResetPass.password) {
      errors["password"] = "";
    }
    if (!errors.password && !fieldsResetPass.duplicatePassword) {
      errors["duplicatePassword"] = "لطفا تکرار کلمه عبور را وارد کنید";
    } else if (
      !errors.password &&
      fieldsResetPass.duplicatePassword.length < 8
    ) {
      errors["password"] = "تکرار کلمه عبور باید 8 رقم باشد ";
    } else if (fieldsResetPass.duplicatePassword) {
      errors["duplicatePassword"] = "";
    }

    setState({
      ...state,
      errors,
    });
  };
  const optionSigninAPI = {
    url: loginURL,
    method: "POST",
    // headers: {
    //   Accept: "application/json",
    //   "Content-Type": "application/json;charset=UTF-8",
    //   captcha: captchaInput,
    //   token: captchaToken,
    // },
    data: {
      username: verifyForgetPassResult.username,
      password: fieldsResetPass.password,
    },
  };
  const signinButton = () => {
    validationFunc();
    if (!errors.password && !errors.duplicatePassword) {
      if (fieldsResetPass.password !== fieldsResetPass.duplicatePassword) {
        errors["comparePass"] = "کلمه عبور و تکرار آن با یکدیگر همخوانی ندارد ";
      } else {
        errors["comparePass"] = "";
      }
      setState({
        ...state,
        errors,
      });
    } else if (!errors.comparePass) {
      {
        Axios(optionResetPassAPI).then((response) => {
          if (response.data.value) {
            updateState({ resetPasswordResult: response.data.value });
            // let message = "پسورد با موفقیت تغییر یافت";
            // toast.error(message, {
            //   transition: Zoom,
            //   autoClose: "2000",
            //   draggable: false,
            //   // bodyClassName: "grow-font-size",
            // });
            setTimeout(() => {
              Axios(optionSigninAPI).then((response) => {
                sessionStorage.setItem(
                  "login",
                  JSON.stringify(response.data.value)
                );
                Auth.Authentication("signinButton");
                history.push("/dashboard");
              });
            }, 2000);
          }
        });
      }
    }
  };
  const backButton = () => {
    history.push("/signin/forgetPass");
  };

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
      <Box display="flex" justifyContent="center" mt={2}>
        <Paper elevation={3} className={classes.paper}>
          <ToastContainer />
          <Box display="flex" justifyContent="center">
            <Typography className={classes.signinText} variant="h5">
              ورود رمز جدید
            </Typography>
          </Box>
          <Divider />
          <form noValidate autoComplete="off">
            {verifyForgetPassResult && (
              <Box display="flex" justifyContent="flex-start" mt={4} ml={2}>
                <Typography>{`نام کاربری: ${verifyForgetPassResult.username}`}</Typography>
              </Box>
            )}
            <Box
              display="flex"
              justifyContent="flex-start"
              mt={2}
              mb={3}
              ml={2}
            >
              <Typography>کلمه عبور جدید خود را وارد نمایید</Typography>
            </Box>
            <Box display="flex" justifyContent="center" m={2}>
              <TextField
                id="password"
                variant="outlined"
                label="کلمه عبور"
                type="password"
                value={fieldsResetPass["password"]}
                onChange={(event) => handleInputChange("password", event)}
              />
            </Box>
            <Box display="flex" justifyContent="center" m={2}>
              <TextField
                id="pass"
                variant="outlined"
                label="تکرار کلمه عبور"
                type="password"
                value={fieldsResetPass["duplicatePassword"]}
                onChange={(event) =>
                  handleInputChange("duplicatePassword", event)
                }
              />
            </Box>

            {errors && (
              // <Box display="flex" justifyContent="center" m={1}>
              <Box m={2} color="red">
                <Box m={2}>{errors["password"]} </Box>
                <Box m={2}>{errors["duplicatePassword"]} </Box>
                <Box m={2}>{errors["comparePass"]} </Box>
              </Box>
              // </Box>
            )}
            <Box display="flex" justifyContent="center" m={2}>
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
          </form>
        </Paper>
      </Box>
    </div>
  );
}
export default withContext(ResetPassword);
