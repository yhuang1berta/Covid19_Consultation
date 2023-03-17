import React, { Component } from "react";
import "./ddash.css";
import Greeting from "./Greeting/Greeting";
import SearchBar from "./SearchBar/SearchBar";
import { Grid, Cell } from "react-mdl";
import { Container } from "reactstrap";
import LoginHeader from "./LoginHeader/LoginHeader";
import Pimg from "../ChatPage/Picture/doctor.jpg";

class DoctorDashBoard extends Component {
  constructor(props) {
    //
    super(props);
    this.props.history.push("/DoctorHome"); //
  }
  state = {
    watchlist: this.props.app.state.currentDoctor.watchlist,
    username: this.props.app.state.currentDoctor.username,
    doctorType: this.props.app.state.currentDoctor.doctorType,
    location: this.props.app.state.currentDoctor.location,
    id: this.props.app.state.currentDoctor._id,
    message: { type: "", body: "" },
  };
  render() {
    const { history, app } = this.props;
    return (
      <div className="do-bg">
        <LoginHeader history={history} app={app} name={this.state.username} />
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
          <SearchBar app={app}/>
        </Container>
        <br></br>
        <br></br>
      </div>
    );
  }
}

export default DoctorDashBoard;