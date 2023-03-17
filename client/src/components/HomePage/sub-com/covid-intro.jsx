import React, { Component } from "react";
import { Grid, Cell } from "react-mdl";
import Cone from "../img/covid1.jpg";
import Ctwo from "../img/covid2.jpg";
import Cthree from "../img/covid3.jpg";
import Carousel from "./carousel";
import Def from "../def/covid exp";
import "../css/covid.css";

class covid extends Component {
  state = { text: Def };
  render() {
    return (
      <div className="maingrid">
        <Grid>
          <Cell col={5}>
            <br></br>
            <br></br>
            <br></br>
            <Carousel c1={Cone} c2={Ctwo} c3={Cthree} />
          </Cell>
          <Cell col={6}>
            <br></br>
            <br></br>
            <br></br> <br></br>
            <div class="titlebox">
              <div class="container">
                <p className="titlefont">What is</p>
                <p className="titlefont">COVID19?</p>
                <p class="exp">{this.state.text[0].info}</p>
              </div>
            </div>
          </Cell>
        </Grid>
      </div>
    );
  }
}

export default covid;
