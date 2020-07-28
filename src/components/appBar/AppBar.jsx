import React from "react";
import { makeStyles } from "@material-ui/core/styles";
import AppBar from "@material-ui/core/AppBar";
import Toolbar from "@material-ui/core/Toolbar";
import { Box, Divider } from "@material-ui/core";
import PersonOutlineIcon from "@material-ui/icons/PersonOutline";
import { useState } from "react";
import { withContext } from "../../assests/context/withContext";
import AuthBox from "./AuthBox";

const useStyles = makeStyles((theme) => ({
  root: {
    flexGrow: 1,
  },
  appBar: {
    zIndex: theme.zIndex.drawer + 1,
    backgroundColor: "#cf7500",
    boxShadow: "0 2px 4px rgba(0, 0, 0, 0.5)",
    height: "72px",
  },
  iconButton: {
    fontSize: "60px",
    marginRight: "15px",
    marginLeft: "15px",
  },
}));

function Header(props) {
  const { root, appBar, iconButton } = useStyles();
  return (
    <div className={root}>
      <AppBar position="fixed" className={appBar}>
        <Box display="flex" justifyContent="flex-end">
          <Toolbar>
            <AuthBox />
            <Divider orientation="vertical" />
            <PersonOutlineIcon
              componrnt="span"
              fontSize="large"
              className={iconButton}
            />
          </Toolbar>
        </Box>
      </AppBar>
    </div>
  );
}
export default withContext(Header);
