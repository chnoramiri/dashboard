//core libraries
import React, { Component } from "react";
import Axios from "axios";
//components
import { PortalContext } from "./PortalContext";
import { withContext } from "./withContext";
import { withSnackbar } from 'notistack';



// const apiVersion = 1;
class PortalContextProvider extends Component {
  constructor(props) {
    super(props);
    this.state = {
      //api address
      captchaURL: 'https://www.tci.ir/api/v1/captcha',
      registerURL: 'https://www.tci.ir/api/v2/Account/Register',
      verifyURL: 'https://www.tci.ir/api/v2/Account/VerifySMSCode',
      resendURL: 'https://www.tci.ir/api/v2/Account/Resend/',
      loginURL: 'https://www.tci.ir/api/v1/Account/Login',
      logoutURL: 'https://www.tci.ir/api/v1/Account/logout',
      verifyForgetPassURL: 'https://www.tci.ir/api/v2/Account/RequestVerificationCode',
      resetPasswordURL: 'https://www.tci.ir/api/v2/Account/AssignPassword',
      accountURL: ' https://www.tci.ir/api/v1/Account/',
      //Dashboard
      ListItemTextPhone: [
        { label: "شماره تلفن های من", title: 'phoneNumber', id: 1 },
        { label: "پرداخت قبض", title: 'PayBill', id: 2 },
        { label: "مشاهده ریز هزینه های قبض", title: 'ViewTBC', id: 3 },
        { label: "دریافت گروهی ریز هزینه های قبض", title: 'GetGTBC', id: 4 },
        { label: "مشاهده ریز هزینه های قبض تجمیعی", title: 'ViewTBAC', id: 5 },
        { label: "خدمات تلفن ثابت", title: 'ServicesPA', id: 6 },
        { label: "سرویس های ارزش افزوده", title: 'ServicesVA', id: 7 },
        { label: "تاریخچه پرداخت قبض", title: 'HistoryPayBill', id: 8 },
        { label: "خلاصه کارکرد-ریزمکالمات", title: 'SummaryPhone', id: 9 },
      ],
      ListItemTextInternet: [
        { label: "مدیریت درخواست های اینترنت", title: 'ManageReqI', id: 1 },
        { label: "مشاهده وضعیت سرویس", title: 'ViewServiceStatus', id: 2 },
        { label: "مشاهده ریز مصرف", title: 'ViewTU', id: 3 },
        { label: "تغییر رمز مودم", title: 'ChangeModemPass', id: 4 },
        { label: "جمع آوری", title: 'Collect', id: 5 },
      ],
      //personal info component

      //captcha
      captchaInput: "",
      updateState: this.setAllState,
      captchaImage: '',
      captchaToken: '',
      fetchCaptcha: this.fetchCaptcha,
      //register & login
      registerResult: [],
      verifyForgetPassResult: [],
      verifyCodeSMSResult: [],
      resetPasswordResult: [],
      loginResult: {},
      fieldsSignin: { username: "", password: "" },
      fieldsSignup: { username: "", password: "" },
      fieldsResetPass: { password: "", duplicatePassword: '' },
      //verify
      //Authen..
      storageResult: {},
      accountResult:[],
      //erroMessage
      errorMessage: {
        title: 'ارتباط با سرویس مقدور نیست.'
      },



      ///Binding Section


    };
  }
  setAllState = value => {
    this.setState(value)
  };
  Auth = {
    isAuthentication: false,
    Authentication() {
      this.isAuthentication = true
    },
    signout() {
      this.isAuthentication = false
    },
    getAuth() {
      return this.isAuthentication
    }
  }
  fetchCaptcha = () => {
    Axios(this.state.captchaURL).then((result) => {
      this.setState({
        captchaImage: result.data.image,
        captchaToken: result.data.token,
      });
    });
    // this.props.enqueueSnackbar("button.message", { variant: 'error' });

  };

  //Render Section
  render() {
    return (

      <PortalContext.Provider
        value={{
          portalContext: {
            ...this.state
          },
        }}
      >
        {this.props.children}
      </PortalContext.Provider>
    );
  }
}
export default withContext(PortalContextProvider);
