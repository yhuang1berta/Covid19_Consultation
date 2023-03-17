import React, { Component } from "react";
import { Container } from "reactstrap";
import "../css/header.css";
class Header extends Component {
  state = {};
  render() {
    return (
      <div className="headermain">
        <div className="circle circle1" />
        <div className="circle circle3" />
        <div className="circle circle4" />
        <div className="circle circle5" />
        <div className="circle circle6" />
        <div className="circle circle7" />
        <div className="circle circle8" />
        <Container>
          <div>
            <br></br>
            <br></br>
            <br></br>
            <br></br>
            <br></br>
            <br></br>
            <br></br>
            <br></br>
            <h1 className="title">How To Protect Yourself From CoronaVirus?</h1>
            <hr className="my-4"></hr>
            <div className="btn-group">
              <button
                type="button"
                className="btn btn-primary dropdown-toggle"
                data-toggle="dropdown"
                aria-haspopup="true"
                aria-expanded="false"
              >
                Login here
              </button>
              <div className="dropdown-menu">
                <a className="dropdown-item" href="/patientLogin">
                  Login
                </a>
                <a className="dropdown-item" href="/registration">
                  Sign up
                </a>
                <a className="dropdown-item" href="/doctorLogin">
                  Doctor Login
                </a>
                <div className="dropdown-divider"></div>
                <a className="dropdown-item" href="/AdminLogin">
                  Administrator Only
                </a>
              </div>
            </div>
          </div>
        </Container>
      </div>
    );
  }
}

export default Header;
