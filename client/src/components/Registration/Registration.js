import React from "react";
import { Textfield, RadioGroup, Radio, Button } from "react-mdl";
import "./registration.css";
import { Container } from "reactstrap";
import Navbar from "../HomePage/Navbar";
import {register} from "../../actions/patients"


class Registration extends React.Component {
  constructor(props) {
    super(props);
    this.homepage = props.app
    this.props.history.push("/Registration")
    this.error = ""
    this.state = {
      username: "",
      password: "",
      gender: "male",
      age: "",
      province: "ON",
      visit_history: []
    };
    this.handleUsernameChange = this.handleUsernameChange.bind(this);
    this.handlePasswordChange = this.handlePasswordChange.bind(this);
    this.handleAgeChange = this.handleAgeChange.bind(this);
    this.handleGenderChange = this.handleGenderChange.bind(this);
    this.handleProvinceChange = this.handleProvinceChange.bind(this);
  }

  render() {
    const {app, history} = this.props;
    return (
    <div>
      <Navbar />
      <div className="Registration">
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

            <h1 className="Registration_loginTitle">Registration</h1>
            <hr />
            <div className="Registration_div">
              Username:{" "}
              <Textfield onChange={this.handleUsernameChange} label="JackMa" /> <br />
              Password:{" "}
              <Textfield onChange={this.handlePasswordChange} label="1234" /> <br />
              Gender:{" "}
              <RadioGroup name="gender" value="male">
                <Radio value="male" onClick={this.handleGenderChange} ripple>
                  Male
                </Radio>
                <Radio value="female" onClick={this.handleGenderChange} ripple>
                  Female
                </Radio>
              </RadioGroup>{" "}
              <br />
              Age:{" "}
              <Textfield
                onChange={this.handleAgeChange}
                label="21"
                pattern="0?[1-9][0-9]{0,2}"
                error="Please enter a valid age!"
              />{" "}
              <br />
              Province:
              <RadioGroup
                row={false}
                name="province"
                value="ON"
              >
                <Radio onClick={this.handleProvinceChange} value="BC" ripple>
                  British Columbia
                </Radio>
                <br/>
                <Radio onClick={this.handleProvinceChange} value="AB" ripple>
                  Alberta
                </Radio>
                <br/>
                <Radio onClick={this.handleProvinceChange} value="MB" ripple>
                  Manitoba
                </Radio>
                <br/>
                <Radio onClick={this.handleProvinceChange} value="NB" ripple>
                  New Brunswick
                </Radio>
                <br/>
                <Radio onClick={this.handleProvinceChange} value="NL" ripple>
                  Newfoundland and Labrador
                </Radio>
                <br/>
                <Radio onClick={this.handleProvinceChange} value="NS" ripple>
                  Nova Scotia
                </Radio>
                <br/>
                <Radio onClick={this.handleProvinceChange} value="ON" ripple>
                  Ontario
                </Radio>
                <br/>
                <Radio onClick={this.handleProvinceChange} value="PEI" ripple>
                  Prince Edward Island
                </Radio>
                <br/>
                <Radio onClick={this.handleProvinceChange} value="QC" ripple>
                  Quebec
                </Radio>
                <br/>
                <Radio onClick={this.handleProvinceChange} value="SK" ripple>
                  Saskatchewan
                </Radio>
              </RadioGroup>
              <br />
              <Button raised colored onClick={() => register(this, this.homepage, history)}>
                Submit
              </Button>
              <h3 className="error">{this.error}</h3>
            </div>
          </div>
        </Container>
      </div>
    </div>
      
    );
  }

  handleUsernameChange(event) {
    this.setState({ username: event.target.value });
  }

  handlePasswordChange(event) {
    this.setState({ password: event.target.value });
  }

  handleGenderChange(event) {
    this.setState({ gender: event.currentTarget.value });
  }

  handleAgeChange(event) {
    this.setState({ age: event.currentTarget.value });
  }

  handleProvinceChange(event) {
    this.setState({ province: event.target.value });
  }
}


export default Registration;
