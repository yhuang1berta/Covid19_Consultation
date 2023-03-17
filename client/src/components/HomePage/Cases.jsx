import React, { Component } from "react";
import { Container, Row, Col } from "reactstrap";
import "./css/covid.css";

import "./css/header.css";

class Cases extends Component {

  constructor(props) {
    super(props)
    this.state = {
      data: undefined,
      province: this.props.p,
      cases:undefined,
      deaths: undefined,
      recorvered:undefined,
    };
  }
  componentWillMount() {
    const request = new Request("/cases/find", {
      method: "get",
      headers: {
        "Content-Type": "application/json",
      },
    });

    fetch(request)
        .then(response => response.json())
        .then(datas => {
          this.setState({data: datas.cases})
          this.setState({cases: datas.cases.cases})
          this.setState({deaths: datas.cases.death})
          this.setState({recorvered:datas.cases.revorvered})

        })
        .catch(error => console.log(error));

  };
  handleChange = (event) => {
    const { value } = event.target;
    if (value === "BC") {
      this.setState({ province: this.state.data.BC });
    } else if (value === "AB") {
      this.setState({ province: this.state.data.AB });
    } else if (value === "MB") {
      this.setState({ province: this.state.data.MB });
    } else if (value === "NB") {
      this.setState({ province: this.state.data.NB });
    } else if (value === "NL") {
      this.setState({ province: this.state.data.NL });
    } else if (value === "NT") {
      this.setState({ province: this.state.data.NT });
    } else if (value === "NS") {
      this.setState({ province: this.state.data.NS });
    } else if (value === "NU") {
      this.setState({ province: this.state.data.NU });
    } else if (value === "PE") {
      this.setState({ province: this.state.data.PE });
    } else if (value === "QC") {
      this.setState({ province: this.state.data.QC });
    } else if (value === "SK") {
      this.setState({ province: this.state.data.SK });
    } else if (value === "YT") {
      this.setState({ province: this.state.data.YT });
    } else {
      this.setState({ province: this.state.data.ON });
    }
  };
  render() {
    return (
      <div className="re">
        <h1 className="w"> CASES IN CANADA:</h1>
        <form>
          <label className="w">Province:</label>
          <select onChange={this.handleChange}>
            <option value="NULL">Please select the province</option>
            <option value="AB">Alberta</option>
            <option value="BC">British Columbia</option>
            <option value="MB">Manitoba</option>
            <option value="NB">New Brunswick</option>
            <option value="NL">Newfoundland and Labrador</option>
            <option value="NT">Northwest Territories</option>
            <option value="NS">Nova Scotia</option>
            <option value="NU">Nunavut</option>
            <option value="ON">Ontario</option>
            <option value="PE">Prince Edward Island</option>
            <option value="QC">Quebec</option>
            <option value="SK">Saskatchewan</option>
            <option value="YT">Yukon</option>
          </select>
        </form>
        <hr />
        <h1 className="w">
          Your province's Coronavirus Cases: {this.state.province}
        </h1>
        <br></br>
        <br></br>
        <br></br>
        <Container>
          <Row>
            <Col md="12">
              <div className="w">
                <h1>World COVID19 situation:</h1>
              </div>
              <Container>
                <div className="w">
                  <h2>Coronavirus Cases:</h2>
                  <h1 className="y">{this.state.cases}</h1>
                </div>
                <div className="w">
                  <h2>Deaths:</h2>
                  <h1 className="y">{this.state.deaths}</h1>
                </div>
                <div className="w">
                  <h2>Recorvered:</h2>
                  <h1 className="y">{this.state.recorvered}</h1>
                </div>
              </Container>
            </Col>
          </Row>
        </Container>
      </div>
    );
  }
}

export default Cases;
