import React, { Component } from "react";
import { Link } from "react-router-dom";
import { Header, Navigation } from "react-mdl";
import { endDoctorChat, logout } from "../../../actions/doctor";

class LoginHeader extends Component {
  state = {};
  logoutDoctor = (app) => {
    this.props.history.push("/doctorLogin");
    logout(app);
  };

  chatWithPatients = (app) => {
    endDoctorChat(app);
    this.props.history.push("/ChatPage/PreDoctorChat");
  };

  doctorHome = (app) => {
    endDoctorChat(app);
    this.props.history.push("/DoctorHome");
  };

  render() {
    const { app, history, name } = this.props;
    return (
      <div>
        <Header
          title={
            <Link className="Link" to="/DoctorHome">
              {`${name}'s profile`}
            </Link>
          }
          className="do-header"
        >
          <Navigation>
            <Link onClick={() => this.doctorHome(app)}>Dashboard</Link>
            <Link onClick={() => this.chatWithPatients(app)}>
              Chat With Patients
            </Link>
            <Link onClick={() => this.logoutDoctor(app)}> Logout</Link>
          </Navigation>
        </Header>
      </div>
    );
  }
}

export default LoginHeader;
// function LoginHeader(props) {
//   logoutDoctor = (app) => {
//     this.props.history.push("/doctorLogin");
//     logout(app);
//   };
//   return (
//     <div>
//       <Header
//         title={
//           <Link className="Link" to="/DoctorHome">
//             {props.name + "'s profile"}
//           </Link>
//         }
//         className="header-color"
//       >
//         <Navigation>
//           <Link to={"/"}>Homepage</Link>
//           <Link to={"/ChatPage/PreDoctorChat"}>Chat With Patients</Link>
//           <Link onClick={() => this.logoutDoctor(app)}> Logout</Link>
//         </Navigation>
//       </Header>
//     </div>
//   );
// }

// export default LoginHeader;
