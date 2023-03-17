import React from "react";
import { Container } from "reactstrap";
import { DataTable, TableHeader, Button, Grid, Cell } from "react-mdl";
import {
  getPatients,
  AddToWatchlist,
  getWatchlist,
  removePatientFromWatchlist,
} from "../../../actions/doctor";
import "./styles.css";

class SearchBar extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      keyword: "",
      found: [],
      patients: [],
      watchlist: null,
      doctor: props.app.state.currentDoctor,
      error: "",
      success: "",
    };
    this.handleSearchClick = this.handleSearchClick.bind(this);
  }

  handleChange = (event) => {
    this.setState({
      keyword: event.target.value,
    });
  };

  showSearch(found_patients) {
    return (
      <div>
        <br></br> <br></br>
        <DataTable className="dtable" shadow={0} rows={found_patients}>
          <TableHeader name="Id" tooltip="The id of patients">
            Id
          </TableHeader>
          <TableHeader name="name" tooltip="The name of patients">
            Name
          </TableHeader>
          <TableHeader name="province" tooltip="The province of patient(s)">
            Province
          </TableHeader>
          <TableHeader name="age" tooltip="The age of patient(s)">
            Age
          </TableHeader>
          <TableHeader name="province" tooltip="The gender of patient(s)">
            Gender
          </TableHeader>
          <TableHeader name="add">Add</TableHeader>
        </DataTable>
      </div>
    );
  }

  // update = (new_list) => {
  //   this.setState({watchlist: new_list});
  //   console.log(new_list)
  // };

  showWatchlist(watchlist) {
    console.log("watchlist in showWatchlist");
    console.log(watchlist);
    if (!watchlist) {
      return <p>Watchlist Loading!</p>;
    } else if (watchlist.length < 1) {
      return <p>No Patient on watchlist at the moment!</p>;
    } else {
      return watchlist.map((patient) => (
        <div className="Patient">
          <h3>UserName :{patient.username}</h3>
          <p>User Id :{patient._id}</p>
          <p>Province :{patient.province}</p>
          <Button
            raised
            colored
            ripple
            onClick={(event) => {
              removePatientFromWatchlist(this, patient);
            }}
          >
            KICK OUT
          </Button>{" "}
          <br></br> <br></br>
        </div>
      ));
    }
  }

  handleSearchClick() {
    // check if name or id matches
    getPatients(this);
  }

  componentWillMount() {
    getWatchlist(this, this.props.app.state.currentDoctor._id);
  }

  render() {
    const { app } = this.props;

    let found_patients = [];
    if (this.state.keyword.length < 1) {
      found_patients = this.state.patients.map((user) => {
        return {
          name: `${user.username}`,
          Id: `${user._id}`,
          province: `${user.province}`,
          age: `${user.age}`,
          add: (
            <Button
              raised
              colored
              ripple
              onClick={(event) =>
                AddToWatchlist(
                  this,
                  event.target,
                  app.state.currentDoctor,
                  user
                )
              }
            >
              Add
            </Button>
          ),
        };
      });
    } else {
      found_patients = this.state.patients.filter(
        (patient) =>
          patient._id.includes(this.state.keyword) ||
          patient.username.includes(this.state.keyword)
      );
      found_patients = found_patients.map((user) => {
        return {
          name: `${user.username}`,
          Id: `${user._id}`,
          province: `${user.province}`,
          age: `${user.age}`,
          add: (
            <Button
              raised
              colored
              ripple
              onClick={(event) =>
                AddToWatchlist(
                  this,
                  event.target,
                  app.state.currentDoctor,
                  user
                )
              }
            >
              Add
            </Button>
          ),
        };
      });
    }
    console.log(`waitlist`, this.state.watchlist);
    return (
      <Container>
        <Grid>
          <Cell col={4}>
            <div className="SearchBar">
              <label>
                Search Patient:
                <input
                  className="input"
                  type="text"
                  placeholder="Search a patient by username"
                  value={this.state.keyword}
                  onChange={this.handleChange}
                />
                <Button
                  raised
                  colored
                  ripple
                  className="button"
                  onClick={() => this.handleSearchClick()}
                >
                  Search
                </Button>
                {this.showSearch(found_patients)}
              </label>
            </div>
            <h3 className="error">{this.state.error}</h3>
            <h3 className="success">{this.state.success}</h3>
          </Cell>
          <Cell col={4}></Cell>
          <Cell col={4}>
            <h3>Watchlist:</h3>
            {this.showWatchlist(this.state.watchlist)}
          </Cell>
        </Grid>
      </Container>
    );
  }
}

export default SearchBar;
