import React from "react";
import SyncIcon from "@material-ui/icons/Sync";
import TextField from "@material-ui/core/TextField";
import { useEffect } from "react";
import { withContext } from "../assests/context/withContext";
import { makeStyles } from "@material-ui/core/styles";
import Box from "@material-ui/core/Box";

const useStyles = makeStyles((theme) => ({
  root: {
    display: "flex",
  },
  textField: {
    margin: theme.spacing(1),
    width: "176px",
  },
}));
function Captcha(props) {
  const {
    updateState,
    captchaInput,
    captchaImage,
    fetchCaptcha,
  } = props.portalContext;

  const handleInputChange = (e) => {
    // debugger;
    let value = e.target.value;
    updateState({ captchaInput: value });
  };

  useEffect(() => {
    fetchCaptcha();
  }, []);
  const { textField, root } = useStyles();

  return (
    <div className={root}>
      <Box display="flex" justifyContent="flex-start">
        <TextField
          id="captcha"
          variant="outlined"
          value={captchaInput}
          onChange={handleInputChange}
          className={textField}
          type="text"
          required
        />
      </Box>
      <Box display="flex" justifyContent="center" ml={1} p={3}>
        <span onClick={fetchCaptcha}>
          <SyncIcon />
        </span>
      </Box>
      <Box
        display="flex"
        justifyContent="flex-end"
        ml={1}
        // mr={1}
        p={1}
        height="70px"
      >
        <img src={`data:image/jpeg;base64,${captchaImage}`} alt="" />
      </Box>
    </div>
  );
}
export default withContext(Captcha);
