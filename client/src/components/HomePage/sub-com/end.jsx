import React, { Component } from "react";
import "../css/homepage.css";
class end extends Component {
  state = {};
  render() {
    return (
      <div className="endtext">
        <h1>WE ARE HERE TO HELP!</h1>

        <hr />

        <p>Follow Us On Social Media To Get More Info</p>

        <div className="end">
          <a href="https://www.utoronto.ca/" rel="link">
            <i
              className="fa fa-facebook-official fa-5x "
              aria-hidden="true"
            ></i>
          </a>

          <a href="https://www.utoronto.ca/" rel="link">
            <i className="fa fa-instagram" aria-hidden="true"></i>
          </a>
          <a href="https://www.utoronto.ca/" rel="link">
            <i className="fa fa-twitter" aria-hidden="true"></i>
          </a>
          <a href="https://www.utoronto.ca/" rel="link">
            <i className="fa fa-youtube-square " aria-hidden="true" />
          </a>
        </div>
      </div>
    );
  }
}

export default end;
