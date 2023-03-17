import React, { Component } from "react";
import "../css/currentnews.css";
class Popup extends Component {
  render() {
    return (
      <div>
        <p>{this.props.n}</p>
      </div>
    );
  }
}

export default Popup;
