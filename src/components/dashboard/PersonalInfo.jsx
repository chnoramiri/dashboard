import React, { useEffect } from "react";
import { makeStyles } from "@material-ui/core/styles";
import Paper from "@material-ui/core/Paper";
import { Typography, Divider, Button, Box } from "@material-ui/core";
import { withContext } from "../../assests/context/withContext";
import Axios from "axios";

const useStyles = makeStyles((theme) => ({
  peper: {
    textAlign: "center",
    width: theme.spacing(120),
    height: theme.spacing(60),
    "& > *": {
      margin: theme.spacing(1),
    },
  },
}));

function PersonalInfo(props) {
  const classes = useStyles();

  const {
    ListPerson,
    accountURL,
    loginResult,
    updateState,
    accountResult,
  } = props.portalContext;

  const optionEditAPI = {
    url: accountURL,
    method: "GET",
    headers: {
      Accept: "application/json",
      "Content-Type": "application/json;charset=UTF-8",
      Authorization: `bearer ${loginResult.access_token}`,
    },
  };
  useEffect(() => {
    Axios(optionEditAPI).then((response) => {
      updateState({ accountResult: "response" });
      console.log(response);
    });
  }, []);
  const editButton = () => {};

  return (
    <Box display="flex">
      <Paper elevation={3} className={classes.peper}>
        <Box p={2}>
          <Typography
            className={classes.typography}
            color="primary"
            variant="h6"
            component="h6"
          >
            اطلاعات شخصی
          </Typography>
        </Box>
        {console.log(accountResult)}
        <Divider />
        {accountResult.map((item, index) => (
          <Box p={0.1} justifyContent="ceter" justifyItems="flex-start">
            <Typography>{` نام :  ${item.first_name}`}</Typography>
            <Typography>{` نام خانوادگی :${item.last_name}`}</Typography>
            <Typography>{` نام کاربری : ${item.userName}`}</Typography>
            <Typography>{`کدملی  : ${item.nationalCode}  `}</Typography>
            <Typography>{`شماره موبایل : ${item.mobile} `}</Typography>
            <Typography>{` ایمیل : ${item.email} `}</Typography>
          </Box>
        ))}
        <Divider variant="middle" className={classes.dividerSpace} />
        <Box display="flex" justifyContent="center" pt={2}>
          <Box display="flex" m={1}>
            <Button variant="contained" color="primary" onClick={editButton}>
              ویرایش
            </Button>
          </Box>
          <Box display="flex" m={1}>
            <Button variant="outlined" color="primary">
              تغییر رمز
            </Button>
          </Box>
        </Box>
      </Paper>
    </Box>
  );
}
export default withContext(PersonalInfo);
