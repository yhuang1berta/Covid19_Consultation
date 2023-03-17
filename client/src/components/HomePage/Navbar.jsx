import React, { Component } from "react";
import { Link } from "react-router-dom";
import { Layout, Header, Navigation } from "react-mdl";
class Navbar extends Component {
  render() {
    return (
      <div className="demo-big-content">
        <Layout>
          <Header
            className="header-color"
            title={
              <Link className="Link" to="/">
                COVID19
              </Link>
            }
            scroll
          >
            <Navigation>
              <Link to="/">Homepage</Link>
              <Link to="/covid">Coronavirus (COVID-19)</Link>
              <Link to="/preventions">Preventions</Link>
            </Navigation>
          </Header>
        </Layout>
      </div>
    );
  }
}

export default Navbar;
