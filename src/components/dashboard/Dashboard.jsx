import React, { useState, useEffect } from "react";
import { makeStyles } from "@material-ui/core/styles";
import Drawer from "@material-ui/core/Drawer";
import AppBar from "@material-ui/core/AppBar";
import CssBaseline from "@material-ui/core/CssBaseline";
import Toolbar from "@material-ui/core/Toolbar";
import List from "@material-ui/core/List";
import Typography from "@material-ui/core/Typography";
import ListItem from "@material-ui/core/ListItem";
import ListItemText from "@material-ui/core/ListItemText";
import AccountCircleOutlinedIcon from "@material-ui/icons/AccountCircleOutlined";
import ArrowBackIosIcon from "@material-ui/icons/ArrowBackIos";
import PersonalInfo from "./PersonalInfo";
import Phone from "./Phone";
import SettingsPhoneIcon from "@material-ui/icons/SettingsPhone";
import Collapse from "@material-ui/core/Collapse";
import ExpandLess from "@material-ui/icons/ExpandLess";
import ExpandMore from "@material-ui/icons/ExpandMore";
import StarBorder from "@material-ui/icons/StarBorder";
import ListItemIcon from "@material-ui/core/ListItemIcon";
import { withContext } from "../../assests/context/withContext";
import WifiIcon from "@material-ui/icons/Wifi";
import SpeedIcon from "@material-ui/icons/Speed";
import { Divider, Button, Box } from "@material-ui/core";
import { Link } from "react-router-dom";
import PhoneNumber from "./PhoneNumber";
import { Switch, BrowserRouter as Router, Route } from "react-router-dom";
import DashboardRout from "./DashboardRout";
import Auth from "../account/Auth";
import AssignmentIndIcon from "@material-ui/icons/AssignmentInd";

const drawerWidth = 340;
const useStyles = makeStyles((theme) => ({
  drawer: {
    width: drawerWidth,
    flexShrink: 0,
    color: "#171717",
  },
  drawerPaper: {
    width: drawerWidth,
    color: "#171717",
    backgroundColor: "#fff",
    boxShadow:
      "0px 3px 3px -2px rgba(0,0,0,0.2), 0px 3px 4px 0px rgba(0,0,0,0.14), 0px 1px 8px 0px rgba(0,0,0,0.12)",
    paddingTop: "40px",
    paddingBottom: "12px",
  },
  drawerContainer: {
    overflow: "auto",
  },
  content: {
    flexGrow: 1,
  },
  toolbar: theme.mixins.toolbar,
}));

function ClippedDrawer(props) {
  const classes = useStyles();
  const [state, setState] = useState({
    collapseStatePhone: false,
    collapseStateInternet: false,
  });

  const expandClick = (value) => {
    setState({
      [value]: !state[value],
    });
  };

  const {
    ListItemTextPhone,
    ListItemTextInternet,
    storageResult,
    loginResult,
  } = props.portalContext;

  const { collapseStatePhone, collapseStateInternet } = state;

  return (
    <Box display="flex">
      <CssBaseline />
      <Router>
        <Drawer
          className={classes.drawer}
          variant="permanent"
          classes={{
            paper: classes.drawerPaper,
          }}
        >
          <Toolbar />
          <Box m={1} className={classes.drawerContainer}>
            <Box mb={4}>
              <Typography
                style={{ fontSize: "20px" }}
              >{` ${loginResult.username} خوش آمدید`}</Typography>
            </Box>
            <Divider />

            <List>
              <ListItem
                component={Link}
                to="/dashboard/personalInfo"
                style={{ color: "black" }}
              >
                <ListItemIcon>
                  <AccountCircleOutlinedIcon fontSize="large" />
                </ListItemIcon>
                <ListItemText primary="پروفایل من" />
              </ListItem>
              <ListItem
                button
                onClick={() => expandClick(["collapseStatePhone"])}
              >
                <ListItemIcon>
                  <SettingsPhoneIcon fontSize="large" />
                </ListItemIcon>
                <ListItemText primary=" تلفن" />
                {collapseStatePhone ? <ExpandLess /> : <ExpandMore />}
              </ListItem>
              <Collapse in={collapseStatePhone} timeout="auto" unmountOnExit>
                <List component="div" disablePadding>
                  {ListItemTextPhone.map((item, index) => (
                    <ListItem
                      key={index}
                      component={Link}
                      to={`/${item.title}`}
                      onClick={() => setState({ component: item.title })}
                    >
                      <ListItemText primary={item.label} />
                      <Divider />
                    </ListItem>
                  ))}
                </List>
              </Collapse>
              <ListItem
                button
                onClick={() => expandClick(["collapseStateInternet"])}
              >
                <ListItemIcon>
                  <WifiIcon fontSize="large" />
                </ListItemIcon>
                <ListItemText primary=" اینترنت" />
                {collapseStateInternet ? <ExpandLess /> : <ExpandMore />}
              </ListItem>
              <Collapse in={collapseStateInternet} timeout="auto" unmountOnExit>
                <List component="div" disablePadding>
                  {ListItemTextInternet.map((item, index) => (
                    <ListItem
                      key={index}
                      component={Link}
                      to={`/${item.title}`}
                    >
                      <ListItemText primary={item.label} />
                      <Divider />
                    </ListItem>
                  ))}
                </List>
              </Collapse>
              <ListItem component={Link} to="/dashboard/personalInfo">
                <ListItemIcon>
                  <SpeedIcon fontSize="large" />
                </ListItemIcon>
                <ListItemText primary="تست سرعت " />
              </ListItem>
              <ListItem component={Link} to="/dashboard/personalInfo">
                <ListItemIcon>
                  <AssignmentIndIcon fontSize="large" />
                </ListItemIcon>
                <ListItemText primary="باشگاه مشتریان " />
              </ListItem>
            </List>
          </Box>
        </Drawer>
        <Box
          display="flex"
          m={2}
          mt={4}
          justifyContent="center"
          className={classes.content}
        >
          <main>
            <div className={classes.toolbar} />
            <Switch>
              <DashboardRout />
            </Switch>
          </main>
        </Box>
      </Router>
    </Box>
  );
}
export default withContext(ClippedDrawer);
