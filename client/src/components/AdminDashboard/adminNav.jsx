import React, { Component } from "react";
import { Link } from "react-router-dom";
import { Layout, Header, Navigation } from "react-mdl";
import { logout } from "../../actions/admin";
class Navbar extends Component {
  logoutAdmin = (app) => {
    this.props.history.push("/AdminLogin");
    logout(app);
  };
  render() {
    const { app } = this.props;
    return (
      <div className="demo-big-content">
        <Layout>
          <Header
            className="pa-header"
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
              <Link onClick={() => this.logoutAdmin(app)}> Logout</Link>
            </Navigation>
          </Header>
        </Layout>
      </div>
    );
  }
}

export default Navbar;
