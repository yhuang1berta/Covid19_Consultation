import React, { Component } from "react";
import Greeting from "../DoctorDashboard/Greeting/Greeting";
import PatientHeader from "./components/PatientHeader/PatientHeader";
import ProfileTable from "./components/ProfileTable/ProfileTable";
import { Grid, Cell } from "react-mdl";
import { Container } from "reactstrap";
import CurrentNews from "../HomePage/currentnews";
import Pimg from "../ChatPage/Picture/patient.jpg";

const patient_sample = {
  name: "yyy",
  userId: "123",
  checklist: {
    list: ["36.5C", "mild", "None"],
    date: new Date(),
  },
  province: "ON",
  history: [
    {
      doctor: "Amelia Brand",
      visit_date: new Date("2020-02-20"),
      guidance: "Drink hot water!",
    },
  ],
};

class PatientDashboard extends Component {
  //login ///
  constructor(props) {
    //

    super(props);
    this.props.history.push("/PatientHome"); //
  }
  state = {
    username: this.props.app.state.currentPatient.username,
    id: this.props.app.state.currentPatient._id,
    province: this.props.app.state.currentPatient.province,
    visit_history: this.props.app.state.currentPatient.visit_history,
  };

  render() {
    console.log(this.state);
    console.log(this.props.app.state.currentPatient._id);
    const { history, app } = this.props;
    return (
      <div className="pa-bg">
        <PatientHeader history={history} app={app} name={this.state.username} />
        <Container>
          <Grid>
            <Cell col={4}>
              <br></br>
              <img src={Pimg} alt="paimg" className="pa-img" />
            </Cell>
            <Cell col={8}>
              <Greeting name={this.state.username} userId={this.state.id} />
            </Cell>
          </Grid>
          <ProfileTable history={history} app={app} patient={this.state} />
          <br></br>
          <br></br>
        </Container>

        <Grid>
          <Cell col={1}></Cell>
          <Cell col={10}>
            <br></br>
            <br></br>
            <h1>Current News:</h1>
            <br></br>
            <CurrentNews />
          </Cell>
          <Cell col={1}></Cell>
        </Grid>
      </div>
    );
  }
}

export default PatientDashboard;
// function PatientDashboard() {
//   // const patient_A = ["A","100",null,"BC"]
//   // const patient_B = ["B","101",null,"ON"]
//   // const patient_C = ["C","102",null,"AB"]
//   // const patients = [patient_A, patient_B, patient_C]
//   const patient_sample = {
//     name: "yyy",
//     userId: "123",
//     checklist: {
//       list: ["36.5C", "mild", "None"],
//       date: new Date(),
//     },
//     province: "ON",
//     history: [
//       {
//         doctor: "Amelia Brand",
//         visit_date: new Date("2020-02-20"),
//         guidance: "Drink hot water!",
//       },
//     ],
//   };

//   return (
//     <div className="app">
//       <PatientHeader name={patient_sample.name} />
//       <Greeting name={patient_sample.name} userId={patient_sample.userId} />
//       <ProfileTable patient={patient_sample} />
//     </div>
//     // <ul>
//     //   {patients.map(patient =>
//     //     (<li>
//     //       <Patient key={patient[1]} name={patient[0]} userId={patient[1]} checkList={patient[2]} province={patient[3]}/>
//     //      </li>))}
//     // </ul>
//   );
// }

// export default PatientDashboard;
