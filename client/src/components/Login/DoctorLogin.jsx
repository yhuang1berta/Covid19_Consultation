import React, { Component } from "react";
import { Textfield, Button } from "react-mdl";
import { Container } from "reactstrap";
import "./login.css";
import Navbar from "../HomePage/Navbar";
import { updateLoginForm, login } from "../../actions/doctor";
class Login extends Component {
  constructor(props) {
    super(props);
    this.props.history.push("/doctorLogin");
  }
  state = { username: "", password: "", wrong: false };

  render() {
    const { app } = this.props;
    return (
      <div className="entire_background">
        <Navbar />
        <Container className="content">
          <h1 className="logintitle">Doctor Login</h1>
          <hr />
          <div className="Login">
            Username:{" "}
            <Textfield
              name="username"
              margin="normal"
              onChange={(e) => updateLoginForm(this, e.target)}
              label="Please enter your username"
            />{" "}
            <br />
            Password:{" "}
            <Textfield
              name="password"
              margin="normal"
              onChange={(e) => updateLoginForm(this, e.target)}
              label="Please enter your password"
            />{" "}
            <br />
            {this.state.wrong ? (
              <div className="alert alert-warning" role="alert">
                Your username or password is wrong! Please try again.
              </div>
            ) : (
              <div />
            )}
            <Button raised color onClick={() => login(this, app)}>
              Log In
            </Button>
          </div>
        </Container>
      </div>
    );
  }
}
export default Login;
