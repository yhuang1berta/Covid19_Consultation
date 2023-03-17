import React, { Component } from "react";
import "../../PatientLogin.css";
import { Header, Navigation } from "react-mdl";
import { Link } from "react-router-dom";
import { endPatientChat, logout } from "../../../../actions/patients";

class PatientHeader extends Component {
  state = {};

  logoutPatient = (app) => {
    this.props.history.push("/PatientLogin");
    logout(app);
  };

  askADoctor = (app) => {
    endPatientChat(app);
    this.props.history.push("/ChatPage/PrePatientChat");
  };

  patientHome = (app) => {
    endPatientChat(app);
    this.props.history.push("/PatientHome");
  };

  render() {
    const { app, history, name } = this.props;
    return (
      <div>
        <Header title={`${name}'s profile`} className="pa-header">
          <Navigation>
            <Link onClick={() => this.patientHome(app)}>Dashboard</Link>
            <Link onClick={() => this.askADoctor(app)}> Ask a doctor</Link>
            <Link onClick={() => this.logoutPatient(app)}> Logout</Link>
          </Navigation>
        </Header>
      </div>
    );
  }
}

export default PatientHeader;
// function PatientHeader(props) {
//   return (
//     <div>
//       <Header title={props.name + "'s profile"} className="header-color">
//         <Navigation>
//           <Link to="/PatientHome">Homepage</Link>
//           <Link to="/SymptomChecklist">Symptom Checklist</Link>
//           <Link to="/ChatPage/PrePatientChat"> Ask a doctor</Link>
//           <Link to="/PatientLogin">Logout</Link>
//         </Navigation>
//       </Header>
//     </div>
//   );
// }

// export default PatientHeader;
