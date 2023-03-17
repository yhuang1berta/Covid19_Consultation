import React, { Component } from "react";
import homepage from "./components/HomePage/homepage";
import covid from "./components/HomePage/covid19";
import currentnews from "./components/HomePage/currentnews";
import preventions from "./components/HomePage/preventions";
import PatientLogin from "./components/Login/PatientLogin";
import Dlogin from "./components/Login/DoctorLogin";
import Alogin from "./components/Login/AdminLogin";
import Registration from "./components/Registration/Registration";
import PreDoctorChat from "./components/ChatPage/PreChatPage/PreDoctorChat";
import DoctorChatPage from "./components/ChatPage/DoctorChatPage";
import PatientChatPage from "./components/ChatPage/PatientChatPage";
import Adminpg from "./components/AdminDashboard/AdminDashboard";
import Patpg from "./components/PatientDashboard/PatientDashboard";
import Docpg from "./components/DoctorDashboard/DoctorDashboard";
import PrePatientChat from "./components/ChatPage/PreChatPage/PrePatientChat";
import { Switch, Route } from "react-router-dom";

import {
  readPatientCookie,
  readSelectedPatientCookie,
} from "./actions/patients";
import { readDoctorCookie, readSelectedDoctorCookie } from "./actions/doctor";
import { readAdminCookie } from "./actions/admin";

class Main extends Component {
  constructor(props) {
    super(props);
    readSelectedDoctorCookie(this);
    readSelectedPatientCookie(this);
    readPatientCookie(this);
    readDoctorCookie(this);
    readAdminCookie(this);
  }

  state = {
    currentPatient: null,
    currentDoctor: null,
    currentAdmin: null,
    selectedDoctor: null,
    selectedPatient: null,
  };

  render() {
    console.log("selected doctor", this.state.selectedDoctor);
    console.log("current patient", this.state.currentPatient);
    return (
      <Switch>
        <Route exact path="/" component={homepage} />

        <Route
          path={["/PatientLogin", "/PatientHome", "/ChatPage/PatientChatPage"]}
          render={({ history }) => (
            <div>
              {!this.state.currentPatient ? (
                <PatientLogin history={history} app={this} />
              ) : !this.state.selectedDoctor ? (
                <Patpg history={history} app={this} />
              ) : (
                <PatientChatPage history={history} app={this} />
              )}
            </div>
          )}
        />

        <Route
          path={["/doctorLogin", "/DoctorHome", "/ChatPage/DoctorChatPage"]}
          render={({ history }) => (
            <div>
              {!this.state.currentDoctor ? (
                <Dlogin history={history} app={this} />
              ) : !this.state.selectedPatient ? (
                <Docpg history={history} app={this} />
              ) : (
                <DoctorChatPage history={history} app={this} />
              )}
            </div>
          )}
        />

        <Route
          path={["/AdminLogin", "/AdminHome"]}
          render={({ history }) => (
            <div>
              {!this.state.currentAdmin ? (
                <Alogin history={history} app={this} />
              ) : (
                <Adminpg history={history} app={this} />
              )}
            </div>
          )}
        />

        <Route
          path={"/ChatPage/PrePatientChat"}
          render={({ history }) => (
            <div>
              {!this.state.currentPatient ? (
                <PatientLogin history={history} app={this} />
              ) : (
                <PrePatientChat history={history} app={this} />
              )}
            </div>
          )}
        />

        <Route
          path={"/ChatPage/PreDoctorChat"}
          render={({ history }) => (
            <div>
              {!this.state.currentDoctor ? (
                <Dlogin history={history} app={this} />
              ) : (
                <PreDoctorChat history={history} app={this} />
              )}
            </div>
          )}
        />

        <Route path="/homepage" component={homepage} />
        <Route path="/covid" component={covid} />
        <Route path="/currentnews" component={currentnews} />
        <Route path="/preventions" component={preventions} />
        {/* <Route path="/PatientLogin" component={PatientLogin} /> */}
        <Route path="/doctorLogin" component={Dlogin} />
        <Route path="/AdminLogin" component={Alogin} />
        <Route
          path="/registration"
          render={({ history }) => (
            <div>
                <Registration history={history} app={this} />
            </div>
          )}
        />
      </Switch>
    );
  }
}

export default Main;
