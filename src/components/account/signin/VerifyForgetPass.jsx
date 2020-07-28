import React, { useState } from "react";
import { makeStyles } from "@material-ui/core/styles";
import TextField from "@material-ui/core/TextField";
import {
  Paper,
  Typography,
  Button,
  Divider,
  // Link,
  Box,
} from "@material-ui/core";
import { createMuiTheme, ThemeProvider } from "@material-ui/core/styles";
import Captcha from "../../../assests/Captcha";
import { withContext } from "../../../assests/context/withContext";
import Axios from "axios";
import { ToastContainer, toast, Zoom } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { useHistory, Link } from "react-router-dom";
import Timer from "../../../assests/Timer";
import { useEffect } from "react";

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
    width: "95%",
  },
  loginText: {
    margin: theme.spacing(5),
  },
  btn: {
    margin: theme.spacing(1),
    textAlign: "center",
    fontSize: "20px",
  },
  error: {
    color: "red",
    margin: theme.spacing(2),
  },
  link: {
    textDecoration: "none",
    color: "#3f51b5",
  },
}));

const theme = createMuiTheme({
  overrides: {
    MuiButton: {
      label: {
        width: "100px",
      },
    },
  },
});
function VerifyForgetPass(props) {
  const [state, setState] = useState({
    verifyCodeInput: "",
    errors: { captcha: "" },
    isTimer: false,
    isCaptcha: false,
  });
  let history = useHistory();

  console.log(state);
  const { root, paper, loginText, textField, error, btn, link } = useStyles();
  const {
    verifyURL,
    verifyForgetPassResult,
    resendURL,
    captchaInput,
    fetchCaptcha,
    updateState,
    captchaToken,
    verifyCodeSMSResult,
  } = props.portalContext;
  const { verifyCodeInput, errors, isTimer, isCaptcha } = state;
  useEffect(() => {
    showComponent();
  }, []);
  const handleInputChange = (e) => {
    setState({ ...state, verifyCodeInput: e.target.value });
  };

  const optionVerifyAPI = {
    url: verifyURL,
    method: "POST",
    data: {
      Code: verifyCodeInput,
      Token: verifyForgetPassResult.token,
    },
  };
  const verifyButton = () => {
    if (verifyCodeInput.length >= 6) {
      Axios(optionVerifyAPI).then((response) => {
        if (response.data.error && response.data.error[0]) {
          let message = response.data.error[0].message;
          toast.error(message, {
            transition: Zoom,
            autoClose: "2000",
            draggable: false,
            // bodyClassName: "grow-font-size",
          });
        } else {
          history.push("/signin/forgetPass/verifyForgetPass/resetPassword");
        }
      });
    }
  };
  const optionResendAPI = {
    url: resendURL,
    method: "POST",
    headers: {
      Accept: "application/json",
      "Content-Type": "application/json;charset=UTF-8",
      captcha: captchaInput,
      token: captchaToken,
    },
    data: {
      username: verifyForgetPassResult.username,
    },
  };
  const resendCode = (event) => {
    event.preventDefault();
    if (!captchaInput || captchaInput.length < 6) {
      errors["captcha"] = "لطفا کد تصویر را وارد نمایید ";
    } else if (captchaInput) {
      errors["captcha"] = "";
    }
    setState({
      ...state,
      errors,
    });
    console.log(errors.captcha);

    if (captchaInput.length >= 6) {
      Axios(optionResendAPI).then((response) => {
        if (response.data.error && response.data.error[0]) {
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

        if (response.data.value == "") {
          let message = "کد مجددا ارسال شد";
          toast.success(message, {
            transition: Zoom,
            autoClose: "2000",
            draggable: false,
            // bodyClassName: "grow-font-size",
          });
          showComponent();
        }
      });
    }
  };
  const showComponent = () => {
    setState({ ...state, isTimer: true });
    setTimeout(() => {
      setState({ ...state, isCaptcha: true });
    }, 121000);
  };
  const backButton = () => {
    history.goBack();
  };
  // if (!errors.username && !errors.password) {
  //   setState({ ...state, activeNextButton: true });
  // }
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
          <ToastContainer />
          <Box display="flex" justifyContent="center" m={1}>
            <Typography className={loginText} variant="h5">
              تایید کد دریافت شده
            </Typography>
          </Box>
          <Divider />
          <form noValidate autoComplete="off">
            <Box display="flex" justifyContent="flex-start" ml={2}>
              <Typography>
                تا لحظاتی دیگر کد فعالسازی برای شماره زیر ارسال می شود
              </Typography>
            </Box>
            <Box component="span">
              <Box display="flex" justifyContent="flex-start" mt={2} ml={2}>
                <Link to="/signin/forgetPass" className={link}>
                  شماره اشتباه است؟
                </Link>
              </Box>
              {verifyForgetPassResult && (
                <Box display="flex" justifyContent="flex-end" mr={2}>
                  {`${verifyForgetPassResult.mobile}*******`}
                </Box>
              )}
            </Box>
            <Box display="flex" justifyContent="flex-start" mt={2}>
              <TextField
                id="pass"
                variant="outlined"
                value={verifyCodeInput}
                onChange={handleInputChange}
                label="کد فعالسازی"
                className={textField}
                type="Number"
                required
              />
            </Box>
            <Box display="flex" justifyContent="center" mt={3}>
              <Typography>کدی دریافت نکرده اید؟</Typography>
            </Box>
            <Box display="flex" justifyContent="center" mt={2}>
              {isCaptcha ? <Captcha /> : ""}
            </Box>
            {isTimer && (
              <Box display="flex" justifyContent="center" mt={2}>
                <Box display="flex" mr={3}>
                  <Typography>{`درخواست مجدد بعد از `}</Typography>
                </Box>
                <Box display="flex">
                  <Timer />
                </Box>
              </Box>
            )}
            <Box display="flex" justifyContent="center">
              {errors && (
                <div>
                  <div className={error}>{errors["captcha"]} </div>
                </div>
              )}
            </Box>
            {isCaptcha && (
              <Box display="flex" justifyContent="center" mt={1}>
                <Link className={link} onClick={resendCode}>
                  درخواست مجدد
                </Link>
              </Box>
            )}
            <Box display="flex" justifyContent="center" mt={2}>
              <ThemeProvider theme={theme}>
                {/* {console.log(verifyCodeInput)} */}
                {verifyCodeInput && verifyCodeInput.length >= 6 ? (
                  <Button
                    className={btn}
                    variant="contained"
                    color="primary"
                    onClick={verifyButton}
                  >
                    بعدی
                  </Button>
                ) : (
                  <Button
                    className={btn}
                    variant="contained"
                    color="primary"
                    onClick={verifyButton}
                  >
                    تایید
                  </Button>
                )}
              </ThemeProvider>
            </Box>
          </form>
        </Paper>
      </Box>
    </div>
  );
}

export default withContext(VerifyForgetPass);
