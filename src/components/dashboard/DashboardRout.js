import React from 'react'
import { Route } from "react-router-dom";
import Phone from './Phone'
import PersonalInfo from './PersonalInfo';
import PhoneNumber from './PhoneNumber';


const MainRoute = () => {
    return (
        <div>
            {/* <Route path="/" exact component={App} /> */}
            <Route path="/dashboard/personalInfo" exact component={PersonalInfo} />
            <Route path="/phone" exact component={Phone} />
            <Route path="/phoneNumber" exact component={PhoneNumber} />




            {/* // <Route path="/payBill" exact component={payBill} />
            // <Route path="/viewPayBill" exact component={ViewPayBill} />
            // <Route path="/viewGroupePayBill" exact component={ViewGroupePayBill} />
            // <Route path="/viewIntegratePayBill" exact component={ViewIntegratePayBill} />
            // <Route path="/servicePhone" exact component={ServicePhone} />
            // <Route path="/serviceAdd" exact component={ServiceAdd} />
            // <Route path="/historyPayBill" exact component={historyPayBill} />
            // <Route path="/summaryConversation" exact component={SummaryConversation} />
            // <Route path="/manageRequest" exact component={ManageRequest} />
            // <Route path="/serviceStatus" exact component={ServiceStatus} />
            // <Route path="/cansumeDetail" exact component={CansumeDetail} />
            // <Route path="/changePass" exact component={ChangePass} /> */}
            {/* <Route path="/collect" exact component={Collect} /> */}




        </div>
    )
}

export default MainRoute
