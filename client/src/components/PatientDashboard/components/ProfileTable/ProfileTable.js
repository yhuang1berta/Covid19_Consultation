import React from "react";
import { Container, Button } from "reactstrap";
import { Grid, Cell } from "react-mdl";
import { uid } from "react-uid";
import { setPatientChatPage } from "../../../../actions/message";
import CurrentNews from "../../../HomePage/currentnews";
import Cases from "../../../HomePage/Cases";
import { readPatientVisitHistory } from "../../../../actions/patients";
import "./ProfileTable.css";

class ProfileTable extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      patient: this.props.patient,
      loading: true,
    };
  }

  displayHistory() {
    console.log(this.state.patient.visit_history);
    const { app, history } = this.props;
    if (this.state.patient.visit_history.length >= 1) {
      const visits = this.state.patient.visit_history.map(function (
        visit,
        index
      ) {
        if (index < 8) {
          return (
            <li key={uid(visit)}>
              <h5>
                Dr. {visit.username} ({visit.doctorType})
              </h5>
              <Button
                id={visit.username}
                onClick={(event) =>
                  setPatientChatPage(visit.username, app, history)
                }
              >
                chat
              </Button>
            </li>
          );
        }
      });
      return <ul className="visit">{visits}</ul>;
    } else {
      return <h3>No visit history currently!</h3>;
    }
  }

  componentWillMount() {
    readPatientVisitHistory(this);
    // this.visit_history = this.displayHistory()
  }

  render() {
    if (this.state.loading) {
      return (
        <div>
          <Container>
            <Grid>
              <Cell col={10}>
                <div className="outer_box">
                  <br></br>
                  <br></br>
                  <br></br>
                  <h1 className="loading">Loading Dashboard, please wait!</h1>
                </div>
              </Cell>
              <Cell col={2}>
                <CurrentNews />
              </Cell>
            </Grid>
          </Container>
        </div>
      );
    } else {
      return (
        <div>
          <Container>
            <Grid>
              <Cell col={10}>
                <div className="outer_box">
                  <br></br>
                  <br></br>
                  {/* <div className="profilePic">
                                        <img alt=""/>
                                    </div> */}
                  <div className="current_news">
                    <Cases p={this.state.province} />
                  </div>
                  <br></br>
                  <br></br>
                </div>
              </Cell>
              <Cell col={2}>
                <div className="visit_history">
                  <br></br>
                  <h3 className="historyHeader">Visit History:</h3>
                  {this.displayHistory()}
                </div>
              </Cell>
            </Grid>
          </Container>
        </div>
      );
    }
  }
}

export default ProfileTable;
