import React, { Component } from "react";
import { Textfield, Tab, Tabs } from "react-mdl";
import "./styles.css";
import Greeting from "../DoctorDashboard/Greeting/Greeting";
import PatientTable from "./PatientTable";
import DoctorTable from "./DoctorTable";
import Navbar from "./adminNav";
import { Container } from "reactstrap";
import { deletecases, postcases } from "../../actions/cases";
import { deletenews, postnews } from "../../actions/news";

class AdminDashboard extends Component {
  state = {
    message: { type: "", body: "" },
    username: this.props.app.state.currentAdmin.username,
    id: this.props.app.state.currentAdmin._id,
    activeTab: 0,

    new_news: {
      No: 1,
      ca1: "Nothing here (Admin will update it soon)",
      ca2: "Nothing here (Admin will update it soon)",
      ca3: "Nothing here (Admin will update it soon)",
      lca1: "Nothing here (Admin will update it soon)",
      lca2: "Nothing here (Admin will update it soon)",
      lca3: "Nothing here (Admin will update it soon)",
      tca1: "Nothing here (Admin will update it soon)",
      tca2: "Nothing here (Admin will update it soon)",
      tca3: "Nothing here (Admin will update it soon)",
      us1: "Nothing here (Admin will update it soon)",
      us2: "Nothing here (Admin will update it soon)",
      us3: "Nothing here (Admin will update it soon)",
      lus1: "Nothing here (Admin will update it soon)",
      lus2: "Nothing here (Admin will update it soon)",
      lus3: "Nothing here (Admin will update it soon)",
      tus1: "Nothing here (Admin will update it soon)",
      tus2: "Nothing here (Admin will update it soon)",
      tus3: "Nothing here (Admin will update it soon)",
      w1: "Nothing here (Admin will update it soon)",
      w2: "Nothing here (Admin will update it soon)",
      w3: "Nothing here (Admin will update it soon)",
      lw1: "Nothing here (Admin will update it soon)",
      lw2: "Nothing here (Admin will update it soon)",
      lw3: "Nothing here (Admin will update it soon)",
      tw1: "Nothing here (Admin will update it soon)",
      tw2: "Nothing here (Admin will update it soon)",
      tw3: "Nothing here (Admin will update it soon)",
    },
    new_cases: {
      No: 1,
      AB: 0,
      BC: 0,
      MB: 0,
      NB: 0,
      NL: 0,
      NT: 0,
      NS: 0,
      NU: 0,
      ON: 0,
      PE: 0,
      QC: 0,
      SK: 0,
      YT: 0,
      cases: 0,
      death: 0,
      revorvered: 0,
    },
  };

  constructor(props) {
    //
    super(props);
    this.props.history.push("/AdminHome"); //
  }

  handleNewsChange = (event) => {
    let curr = this.state.new_news;
    const id = event.target.id;
    if (id === "ca1") {
      curr.ca1 = event.target.value;
    } else if (id === "ca2") {
      curr.ca2 = event.target.value;
    } else if (id === "ca3") {
      curr.ca3 = event.target.value;
    } else if (id === "lca1") {
      curr.lca1 = event.target.value;
    } else if (id === "lca2") {
      curr.lca2 = event.target.value;
    } else if (id === "lca3") {
      curr.lca3 = event.target.value;
    } else if (id === "tca1") {
      curr.tca1 = event.target.value;
    } else if (id === "tca2") {
      curr.tca2 = event.target.value;
    } else if (id === "tca3") {
      curr.tca3 = event.target.value;
    } else if (id === "us1") {
      curr.us1 = event.target.value;
    } else if (id === "us2") {
      curr.us2 = event.target.value;
    } else if (id === "us3") {
      curr.us3 = event.target.value;
    } else if (id === "lus1") {
      curr.lus1 = event.target.value;
    } else if (id === "lus2") {
      curr.lus2 = event.target.value;
    } else if (id === "lus3") {
      curr.lus3 = event.target.value;
    } else if (id === "tus1") {
      curr.tus1 = event.target.value;
    } else if (id === "tus2") {
      curr.tus2 = event.target.value;
    } else if (id === "tus3") {
      curr.tus3 = event.target.value;
    } else if (id === "w1") {
      curr.w1 = event.target.value;
    } else if (id === "w2") {
      curr.w2 = event.target.value;
    } else if (id === "w3") {
      curr.w3 = event.target.value;
    } else if (id === "lw1") {
      curr.lw1 = event.target.value;
    } else if (id === "lw2") {
      curr.lw2 = event.target.value;
    } else if (id === "lw3") {
      curr.lw3 = event.target.value;
    } else if (id === "tw1") {
      curr.tw1 = event.target.value;
    } else if (id === "tw2") {
      curr.tw2 = event.target.value;
    } else if (id === "tw3") {
      curr.tw3 = event.target.value;
    }

    this.setState({
      new_news: curr,
    });
  };

  handleCasesChange = (event) => {
    let curr = this.state.new_cases;
    const id = event.target.id;
    if (id === "AB") {
      curr.AB = parseInt(event.target.value, 10);
    } else if (id === "BC") {
      curr.BC = parseInt(event.target.value, 10);
    } else if (id === "MB") {
      curr.MB = parseInt(event.target.value, 10);
    } else if (id === "NB") {
      curr.NB = parseInt(event.target.value, 10);
    } else if (id === "NL") {
      curr.NL = parseInt(event.target.value, 10);
    } else if (id === "NT") {
      curr.NT = parseInt(event.target.value, 10);
    } else if (id === "NS") {
      curr.NS = parseInt(event.target.value, 10);
    } else if (id === "NU") {
      curr.NU = parseInt(event.target.value, 10);
    } else if (id === "ON") {
      curr.ON = parseInt(event.target.value, 10);
    } else if (id === "PE") {
      curr.PE = parseInt(event.target.value, 10);
    } else if (id === "QC") {
      curr.QC = parseInt(event.target.value, 10);
    } else if (id === "SK") {
      curr.SK = parseInt(event.target.value, 10);
    } else if (id === "YT") {
      curr.YT = parseInt(event.target.value, 10);
    } else if (id === "cases") {
      curr.cases = parseInt(event.target.value, 10);
    } else if (id === "death") {
      curr.death = parseInt(event.target.value, 10);
    } else if (id === "recorvered") {
      curr.revorvered = parseInt(event.target.value, 10);
    }
    this.setState({
      new_cases: curr,
    });
  };

  displayTabTable() {
    if (this.state.activeTab === 0) {
      return <PatientTable />;
    } else if (this.state.activeTab === 1) {
      return <DoctorTable />;
    } else if (this.state.activeTab === 2) {
      return (
        <div>
          <div class="alert alert-warning" role="alert">
            Warning! If you click the DELETE button below, you NEED to update it
            below. Otherwise some part of the app WON't work! Also if you want
            to update, you NEED to delete the older version first! You can click
            the delete button as many times as you want, but DO NOT post more
            than 1 time.
          </div>
          <h3>Canada News</h3>
          <p>News body:</p>
          News 1:{" "}
          <input className="sizez" onChange={this.handleNewsChange} id="ca1" />
          News 2:{" "}
          <input className="sizez" onChange={this.handleNewsChange} id="ca2" />
          News 3:{" "}
          <input className="sizez" onChange={this.handleNewsChange} id="ca3" />
          <br />
          <p>News links:</p>
          Link 1:{" "}
          <input className="sizez" onChange={this.handleNewsChange} id="lca1" />
          Link 2:{" "}
          <input className="sizez" onChange={this.handleNewsChange} id="lca2" />
          Link 3:{" "}
          <input className="sizez" onChange={this.handleNewsChange} id="lca3" />
          <br />
          <p>News titles:</p>
          Title 1:{" "}
          <input className="sizez" onChange={this.handleNewsChange} id="tca1" />
          Title 2:{" "}
          <input className="sizez" onChange={this.handleNewsChange} id="tca2" />
          Title 3:{" "}
          <input className="sizez" onChange={this.handleNewsChange} id="tca3" />
          <br />
          <br />
          <p>current ca news (news-title-link):</p>
          <p>{this.state.new_news.ca1}</p>
          <p>{this.state.new_news.ca2}</p>
          <p>{this.state.new_news.ca3}</p>
          <p>{this.state.new_news.tca1}</p>
          <p>{this.state.new_news.tca2}</p>
          <p>{this.state.new_news.tca3}</p>
          <p>{this.state.new_news.lca1}</p>
          <p>{this.state.new_news.lca2}</p>
          <p>{this.state.new_news.lca3}</p>
          <br />
          <br />
          <button
            type="button"
            class="btn btn-warning"
            onClick={() => deletenews()}
          >
            DELETE NEWS
          </button>
          <button
            type="button"
            class="btn btn-warning update-news-button"
            onClick={() => postnews(this)}
          >
            UPDATE NEWS
          </button>
        </div>
      );
    } else if (this.state.activeTab === 3) {
      return (
        <div>
          <div class="alert alert-warning" role="alert">
            Warning! If you click the DELETE button below, you NEED to update it
            below. Otherwise some part of the app WON't work! Also if you want
            to update, you NEED to delete the older version first! You can click
            the delete button as many times as you want, but DO NOT post more
            than 1 time.
          </div>
          <h3>USA News</h3>
          <p>News Body:</p>
          News 1:
          <textarea
            className="sizez"
            onChange={this.handleNewsChange}
            id="us1"
          />
          News 2:
          <textarea
            className="sizez"
            onChange={this.handleNewsChange}
            id="us2"
          />
          News 3:
          <textarea
            className="sizez"
            onChange={this.handleNewsChange}
            id="us3"
          />
          <br />
          <p>News Links:</p>
          Link 1:{" "}
          <textarea
            className="sizez"
            onChange={this.handleNewsChange}
            id="lus1"
          />
          Link 2:{" "}
          <textarea
            className="sizez"
            onChange={this.handleNewsChange}
            id="lus2"
          />
          Link 3:{" "}
          <textarea
            className="sizez"
            onChange={this.handleNewsChange}
            id="lus3"
          />
          <br />
          <p>News Titles:</p>
          Title 1:{" "}
          <textarea
            className="sizez"
            onChange={this.handleNewsChange}
            id="tus1"
          />
          Title 2:{" "}
          <textarea
            className="sizez"
            onChange={this.handleNewsChange}
            id="tus2"
          />
          Title 3:{" "}
          <textarea
            className="sizez"
            onChange={this.handleNewsChange}
            id="tus3"
          />
          <br />
          <br />
          <p>current us news (news-title-link):</p>
          <p>{this.state.new_news.us1}</p>
          <p>{this.state.new_news.us2}</p>
          <p>{this.state.new_news.us3}</p>
          <p>{this.state.new_news.tus1}</p>
          <p>{this.state.new_news.tus2}</p>
          <p>{this.state.new_news.tus3}</p>
          <p>{this.state.new_news.lus4}</p>
          <p>{this.state.new_news.lus5}</p>
          <p>{this.state.new_news.lus6}</p>
          <br />
          <br />
          <button
            type="button"
            class="btn btn-warning"
            onClick={() => deletenews()}
          >
            DELETE NEWS
          </button>
          <button
            type="button"
            class="btn btn-warning update-news-button"
            onClick={() => postnews(this)}
          >
            UPDATE NEWS
          </button>
        </div>
      );
    } else if (this.state.activeTab === 4) {
      return (
        <div>
          <div class="alert alert-warning" role="alert">
            Warning! If you click the DELETE button below, you NEED to update it
            below. Otherwise some part of the app WON't work! Also if you want
            to update, you NEED to delete the older version first! You can click
            the delete button as many times as you want, but DO NOT post more
            than 1 time.
          </div>
          <h3>World News</h3>
          <p>News Body:</p>
          News 1:
          <input className="sizez" onChange={this.handleNewsChange} id="w1" />
          News 2:
          <input className="sizez" onChange={this.handleNewsChange} id="w2" />
          News 3:
          <input className="sizez" onChange={this.handleNewsChange} id="w3" />
          <br />
          <p>News Links:</p>
          Link 1:{" "}
          <input className="sizez" onChange={this.handleNewsChange} id="lw1" />
          Link 2:{" "}
          <input className="sizez" onChange={this.handleNewsChange} id="lw2" />
          Link 3:{" "}
          <input className="sizez" onChange={this.handleNewsChange} id="lw3" />
          <br />
          <p>News Titles:</p>
          Title 1:{" "}
          <input className="sizez" onChange={this.handleNewsChange} id="tw1" />
          Title 2:{" "}
          <input className="sizez" onChange={this.handleNewsChange} id="tw2" />
          Title 3:{" "}
          <input className="sizez" onChange={this.handleNewsChange} id="tw3" />
          <br />
          <br />
          <p>current world news (news-title-link):</p>
          <p>{this.state.new_news.w1}</p>
          <p>{this.state.new_news.w2}</p>
          <p>{this.state.new_news.w3}</p>
          <p>{this.state.new_news.tw1}</p>
          <p>{this.state.new_news.tw2}</p>
          <p>{this.state.new_news.tw3}</p>
          <p>{this.state.new_news.lw4}</p>
          <p>{this.state.new_news.lw5}</p>
          <p>{this.state.new_news.lw6}</p>
          <br />
          <br />
          <button
            type="button"
            class="btn btn-warning"
            onClick={() => deletenews()}
          >
            DELETE NEWS
          </button>
          <button
            type="button"
            class="btn btn-warning update-news-button"
            onClick={() => postnews(this)}
          >
            UPDATE NEWS
          </button>
        </div>
      );
    } else if (this.state.activeTab === 5) {
      return (
        <div>
          <div class="alert alert-warning" role="alert">
            Warning! If you click the DELETE button below, you NEED to update it
            below. Otherwise some part of the app WON't work! Also if you want
            to update, you NEED to delete the older version first! You can click
            the delete button as many times as you want, but DO NOT post more
            than 1 time.
          </div>
          <h3>Cases (Please enter numerical values only!)</h3>
          AB: <Textfield onChange={this.handleCasesChange} id="AB" />
          BC: <Textfield onChange={this.handleCasesChange} id="BC" />
          MB: <Textfield onChange={this.handleCasesChange} id="MB" />
          <br />
          NB: <Textfield onChange={this.handleCasesChange} id="NB" />
          NL: <Textfield onChange={this.handleCasesChange} id="NL" />
          NT: <Textfield onChange={this.handleCasesChange} id="NT" />
          <br />
          NS: <Textfield onChange={this.handleCasesChange} id="NS" />
          NU: <Textfield onChange={this.handleCasesChange} id="NU" />
          ON: <Textfield onChange={this.handleCasesChange} id="ON" />
          <br />
          PE: <Textfield onChange={this.handleCasesChange} id="PE" />
          QC: <Textfield onChange={this.handleCasesChange} id="QC" />
          SK: <Textfield onChange={this.handleCasesChange} id="SK" />
          <br />
          YT: <Textfield onChange={this.handleCasesChange} id="YT" />
          <br />
          cases: <Textfield onChange={this.handleCasesChange} id="cases" />
          death: <Textfield onChange={this.handleCasesChange} id="death" />
          recorvered:{" "}
          <Textfield onChange={this.handleCasesChange} id="recorvered" />
          <br />
          <button
            type="button"
            class="btn btn-warning"
            onClick={() => deletecases()}
          >
            DELETE CASES
          </button>{" "}
          <button
            type="button"
            class="btn btn-warning update-news-button"
            onClick={() => postcases(this)}
          >
            UPDATE CASES
          </button>
        </div>
      );
    }
  }

  render() {
    const { history, app } = this.props;
    return (
      <div className="pa-bg">
        <Navbar history={history} app={app} />
        <br></br>
        <br></br>
        <br></br>
        <br></br>
        <br></br>
        <br></br>
        <Container>
          <div className="admin_dashboard_background">
            <Greeting
              className="greeting"
              name={this.state.username}
              userId={this.state.id}
            />{" "}
            <br />
            <h3 className="error">{this.error}</h3>
            <div>
              <Tabs
                activeTab={this.state.activeTab}
                onChange={(tabId) => this.setState({ activeTab: tabId })}
                ripple
              >
                <Tab>Patient Info</Tab>
                <Tab>Doctor Info</Tab>
                <Tab>Canada News</Tab>
                <Tab>US News</Tab>
                <Tab>World News</Tab>
                <Tab>Cases</Tab>
              </Tabs>
              <section className="user_table">{this.displayTabTable()}</section>
            </div>
          </div>
        </Container>
      </div>
    );
  }
}

export default AdminDashboard;
