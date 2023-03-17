import React, { Component } from "react";
import "../css/homepage.css";
import { Container, UncontrolledAlert, Row, Col } from "reactstrap";
import { Grid, Cell } from "react-mdl";
import Bact from "../img/b1.gif";
class introduce extends Component {
  state = { num: 1, cases: 1 };
  componentWillMount() {
    const request = new Request("/patients", {
      method: "get",
      headers: {
        "Content-Type": "application/json",
      },
    });

    fetch(request)
      .then((response) => response.json())
      .then((datas) => {
        this.setState({ num: datas.length });
      })
      .catch((error) => console.log(error));

    const request2 = new Request("/cases/find", {
      method: "get",
      headers: {
        "Content-Type": "application/json",
      },
    });

    fetch(request2)
      .then((response) => response.json())
      .then((datas) => {
        this.setState({ cases: datas.cases.cases });
      })
      .catch((error) => console.log(error));
  }
  render() {
    return (
      <div>
        <Container>
          <UncontrolledAlert className="alert-with-icon" color="primary">
            <span>
              <b>Join Us! -</b>
              To protect yourself and your family!
            </span>
          </UncontrolledAlert>
        </Container>
        <br></br>
        <br></br>
        <br></br>
        <Container>
          <Grid>
            <Cell col={10}>
              <Row>
                <Col md="12">
                  <div className="numinfo">
                    <h1>
                      <span>{this.state.cases}</span>
                      Worldwide Cofirmed
                    </h1>
                  </div>
                  <br></br> <br></br>
                  <div className="numinfo">
                    <h1>
                      <span>{this.state.num}</span>
                      are using our webapp
                    </h1>
                  </div>
                </Col>
              </Row>
            </Cell>
            <Cell col={2}>
              <img src={Bact} alt="bact" className="bact-img" />
            </Cell>
          </Grid>
        </Container>
        <br></br> <br></br> <br></br> <br></br> <br></br> <br></br> <br></br>{" "}
        <br></br> <br></br> <br></br>
        <Container>
          <br></br>
          <p className="f35a">What do we offer?</p>

          <br></br>
          <br></br>
          <br></br>
          <br></br>
          <Row>
            <Col md="12">
              <div className="ofinfo">
                <span>Professional doctors</span>
                <h1 className="lightgreentext">
                  To answer all kinds of questions
                </h1>
              </div>
              <br></br>
              <br></br>
              <div className="ofinfo">
                <span>Online chat</span>
                <h1 className="lightbluetext">24 hours a day 7 days a week</h1>
              </div>
            </Col>
          </Row>
        </Container>
        <br></br>
        <br></br>
        <Grid>
          <Cell col={2}></Cell>
          <Cell col={8}>
            <div className="media">
              <i className="fa fa-check-square-o fa-5x" aria-hidden="true">
                {" "}
              </i>
              <div className="media-body">
                <br></br>
                <p className="f35b">
                  Sign up today to meet your personal doctor
                </p>
              </div>
              <i className="fa fa-user-md fa-5x" aria-hidden="true"></i>
            </div>
            <br></br>
          </Cell>
          <Cell col={2}></Cell>
          <Cell col={2}></Cell>
          <Cell col={8}>
            <div className="media">
              <i className="fa fa-check-square-o fa-5x" aria-hidden="true">
                {" "}
              </i>
              <div className="media-body">
                <br></br>
                <p className="f35b">
                  Chat today to get the freshest information
                </p>
              </div>
              <i className="fa fa-comments fa-5x" aria-hidden="true"></i>
            </div>
          </Cell>
          <Cell col={2}></Cell>
        </Grid>
      </div>
    );
  }
}

export default introduce;
