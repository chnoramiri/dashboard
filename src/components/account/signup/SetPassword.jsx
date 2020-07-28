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
import Auth from "../Auth";

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

function SetPassword(props) {
  const [state, setState] = useState({
    // fieldsSignup: { username: "", password: "" },
    errors: { password: "", duplicatePassword: "", comparePass: "" },
    activeNextButton: false,
  });
  const {
    fieldsResetPass,
    updateState,
    verifyForgetPassResult,
    resetPasswordURL,
    resetPasswordResult,
    loginURL,
    fieldsSignup,
  } = props.portalContext;
  const { errors, activeNextButton } = state;
  let history = useHistory();

  const handleInputChange = (field, e) => {
    fieldsResetPass[field] = e.target.value;
    setState((prevState) => ({
      ...prevState,
      fieldsResetPass,
    }));
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
  const loginButton = () => {
    validationFunc();
    debugger;
    if (errors.password || errors.duplicatePassword) {
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
      Auth.Authentication("signinButton");
      history.push("/dashboard");
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
              وارد کردن کلمه عبور
            </Typography>
          </Box>
          <form noValidate autoComplete="off">
            <ToastContainer />
            <Box display="flex" justifyContent="right" m={2}>
              <Typography variant="h7">{`نام کاربری: ${fieldsSignup.username}`}</Typography>
            </Box>
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
                className={btn}
                variant="contained"
                color="primary"
                disableElevation
                onClick={loginButton}
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
export default withContext(SetPassword);
