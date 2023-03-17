import React, { Component } from "react";
import { Grid, Cell } from "react-mdl";
import "../css/homepage.css";
import Cone from "../img/c1.png";
import Ctwo from "../img/c2.png";
import Cthree from "../img/c3.png";
import Carousel from "./carousel";
class intro extends Component {
  render() {
    return (
      <div>
        <Grid>
          <Cell col={12}>
            <div className="jumbotron">
              <Carousel c1={Cone} c2={Ctwo} c3={Cthree} />
              <hr className="my-4"></hr>
              <h1>How To Protect Yourself From CoronaVirus?</h1>
              <div className="btn-group">
                <button
                  type="button"
                  className="btn btn-primary dropdown-toggle"
                  data-toggle="dropdown"
                  aria-haspopup="true"
                  aria-expanded="false"
                >
                  Learn more
                </button>
                <div className="dropdown-menu">
                  <a className="dropdown-item" href="#">
                    Login
                  </a>
                  <a className="dropdown-item" href="#">
                    Sign up
                  </a>
                  <div className="dropdown-divider"></div>
                  <a
                    className="dropdown-item"
                    href="#https://www.canada.ca/en/public-health/services/diseases/coronavirus-disease-covid-19.html"
                  >
                    COVID-19 in Canada
                  </a>
                </div>
              </div>
            </div>
          </Cell>
        </Grid>
        <div
          className="alert alert-warning alert-dismissible fade show"
          role="alert"
        >
          <strong>Join Us!</strong> To protect yourself and your family!
          <button
            type="button"
            className="close"
            data-dismiss="alert"
            aria-label="Close"
          >
            <span aria-hidden="true">&times;</span>
          </button>
        </div>
      </div>
    );
  }
}

export default intro;
