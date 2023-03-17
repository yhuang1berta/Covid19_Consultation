import React, { Component } from "react";
import { Grid, Cell } from "react-mdl";
import Cimg from "./img/covid.png";

import "./css/covid.css";
import End from "./sub-com/end";
import "./css/header.css";
import { Container } from "reactstrap";
import Navbar from "./Navbar";
import Cases from "./Cases";
import Header from "./sub-com/covidHeader";
import News from "./currentnews";
class Covid extends Component {
  state = {};

  render() {
    return (
      <div className="headerbg">
        <Navbar />
        <Grid>
          <Cell col={8}>
            <Container>
              <Header></Header>
              <br></br>
              <br></br>
              <br></br>
              <br></br>
              <br></br>
              <Cases></Cases>
              <br></br>
              <br></br> <br></br>
              <br></br>
              <h1 className="w"> Current News</h1>
            </Container>
          </Cell>
          <Cell col={4}>
            <div>
              <br></br>
              <br></br>
              <br></br>
              <img src={Cimg} alt="Covid Pic" />
            </div>
          </Cell>
          <Cell col={12}>
            <News></News>
          </Cell>
        </Grid>
        <br></br>
        <br></br>
        <br></br> <br></br>
        <br></br>
        <br></br>
        <End></End>
      </div>
    );
  }
}

export default Covid;
