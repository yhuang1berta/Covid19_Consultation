import React from "react";
import {ChatBox} from "react-chatbox-component";
import LoginHeader from "../DoctorDashboard/LoginHeader/LoginHeader";
import "react-chatbox-component/dist/style.css";
import "./styles.css";
import {displayMessage, getMessages, sendMessage} from "../../actions/message";
import {Container} from "@material-ui/core";
import patientIcon from "./Picture/patient.jpg"
import {addPatientToWatchlist} from "../../actions/doctor";


class DoctorChatPage extends React.Component {
    constructor(props) {
        super(props);
    }

    state = {
        currentDoctor: {
            username: ''
        },
        messages: [],
        user: {"uid": '1'},
        selectedPatient: {
            username: '',
            gender: '',
            age: '',
            province: ''
        },
        isDoctor: true
    };

    componentDidMount() {
        const isDoctor = true;
        getMessages(this, isDoctor)
    }

    render() {
        const {history, app} = this.props;
        const doctor = this.state.currentDoctor;
        const patient = this.state.selectedPatient;
        return (
            <div>
                <LoginHeader history={history} app={app} name={doctor.username}/>
                <div className="dmain">
                    <div className={"dempty"}>&nbsp;</div>
                    <div className="dcontainer">
                        <Container>
                            <div className="chat-header">
                                <h5>Welcome Dr.{doctor.username}</h5>
                            </div>
                            <ChatBox
                                messages={this.state.messages}
                                user={this.state.user}
                                onSubmit={(message) => {
                                    sendMessage(message, this);
                                    displayMessage(message, this)
                                }
                                }
                            />
                        </Container>
                    </div>
                    <div className="dinfo">
                        <Container>
                            <p className="dinfo-p">Patient info</p>
                            <div className="profile-div">
                                <img src={patientIcon} alt={patient.username} className={"profile-img"}/>
                                <h1>{patient.username}</h1>
                                <p>{patient.gender}</p>
                                <p>{patient.age}</p>
                                <p>{patient.province}</p>
                                <p>
                                    <button className={'add-button'} onClick={event => {
                                        addPatientToWatchlist(event.target, doctor, patient, app)
                                    }}>Add To List
                                    </button>
                                </p>
                            </div>
                        </Container>
                    </div>
                </div>
            </div>
        );
    }
}

export default DoctorChatPage;
