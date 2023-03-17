import React, { Component } from "react";
import CA from "./sub-com/newsCA";
import US from "./sub-com/newsUS";
import W from "./sub-com/newsW";
import "./css/header.css";
import { Tabs, Tab } from "react-mdl";
class currentnews extends Component {
  state = { tabNum: 0 };
  changeTab() {
    if (this.state.tabNum === 0) {
      return <CA></CA>;
    } else if (this.state.tabNum === 1) {
      return <US></US>;
    } else {
      return <W></W>;
    }
  }
  render() {
    return (
      <div>
        <Tabs onChange={(tabId) => this.setState({ tabNum: tabId })} ripple>
          <Tab>Canada</Tab>
          <Tab>US</Tab>
          <Tab>World</Tab>
        </Tabs>
        <section>
          <div className="content">{this.changeTab()}</div>
        </section>
      </div>
    );
  }
}

export default currentnews;
