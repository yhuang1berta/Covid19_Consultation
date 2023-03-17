import React, {Component} from "react";
import "./css/homepage.css";
import {Grid, Cell} from "react-mdl";
import End from "./sub-com/end";
import Introduce from "./sub-com/homepage-introduce";
import Header from "./sub-com/header";
import Navbar from "./Navbar";
import {updateSelectedPatient} from "../../actions/doctor";
import {updateSelectedDoctor} from "../../actions/patients";


class homepage extends Component {
    state = {};

    componentDidMount() {
        updateSelectedDoctor().then(r => {
            if (r) {
                console.log("Selected Doctor Removed")
            }
        }).catch(error => {
            console.log(error)
        });

        updateSelectedPatient().then(r => {
            if (r) {
                console.log("Selected Patient Removed")
            }
        }).catch(error => {
            console.log(error)
        })
    };

    render() {
        return (
            <div>
                <Navbar/>
                <Grid className="headerbg">
                    <Cell col={12}>
                        <Header/>
                        <Introduce/>
                    </Cell>
                    <Cell col={12}></Cell>
                    <Cell col={12}></Cell>
                    <Cell col={12}></Cell>
                    <Cell col={12}></Cell>
                    <Cell col={12}></Cell>
                    <Cell col={12}></Cell>
                    <Cell col={12}></Cell>
                    <Cell col={12}>
                        <End/>
                    </Cell>
                </Grid>
            </div>
        );
    }
}

export default homepage;
