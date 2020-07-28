import React, { Component } from 'react'
import { Switch, Route, Redirect } from "react-router-dom";
import Signup from "../account/signup/Signup";
import Verification from "../account/signup/VerifySignup";
import Signin from "../account/signin/Signin";
import Auth from '../account/Auth';
import Dashboard from '../dashboard/Dashboard';
import ForgetPass from '../account/signin/ForgetPass';
import VerifyForgetPass from '../account/signin/VerifyForgetPass';
import ResetPassword from '../account/signin/ResetPassword';
import SetPassword from '../account/signup/SetPassword';



const Routers = () => (
    <Switch>
        <Route path="/signup" exact component={Signup} />
        <Route
            path="/signup/verification"
            exact
            component={Verification}
        />
        <Route
            path="/signup/verification/setPassword"
            exact
            component={SetPassword}
        />
        <Route path="/signin" exact component={Signin} />
        <Route path="/signin/forgetPass" exact component={ForgetPass} />
        <Route path="/signin/forgetPass/verifyForgetPass" exact component={VerifyForgetPass} />
        <Route path="/signin/forgetPass/verifyForgetPass/resetPassword" exact component={ResetPassword} />
        <PrivateRoute path="/dashboard" component={Dashboard} />
    </Switch>
)
const PrivateRoute = ({ component: Component, ...rest }) => (
    <Route {...rest} render={props => {
        return Auth.getAuth("PrivateRoute") ? <Component {...props} /> : <Redirect to={{ pathname: "/" }} />
    }} />
)
export default Routers
