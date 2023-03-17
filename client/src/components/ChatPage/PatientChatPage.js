import React from "react";
import {ChatBox} from 'react-chatbox-component';
import 'react-chatbox-component/dist/style.css';
import PatientHeader from "../PatientDashboard/components/PatientHeader/PatientHeader";
import {displayMessage, getMessages, sendMessage} from "../../actions/message";
import {Container} from "@material-ui/core";
import doctorIcon from "./Picture/doctor.jpg";

class PatientChatPage extends React.Component {
    constructor(props) {
        super(props);
        this.props.history.push("/ChatPage/PatientChatPage");
    }

    state = {
        currentPatient: {
            username: ''
        },
        messages: [],
        user: {"uid": '2'},
        selectedDoctor: {
            username: '',
            doctorType: '',
            location: ''
        },
        isDoctor: false
    };

    componentDidMount() {
        const isDoctor = false;
        getMessages(this, isDoctor)
    }

    render() {
        const {history, app} = this.props;
        const patient = this.state.currentPatient;
        const doctor = this.state.selectedDoctor;
        return (
            <div>
                <PatientHeader history={history} app={app} name={patient.username}/>
                <div className="dmain">
                    <div className={"dempty"}>&nbsp;</div>
                    <div className="dcontainer">
                        <Container>
                            <div className="chat-header">
                                <h5>Welcome {patient.username}</h5>
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
                            <p className="dinfo-p">Doctor info</p>
                            <div className="profile-div">
                                <img src={doctorIcon} alt={doctor.username} className={"profile-img"}/>
                                <h1>Dr.{doctor.username}</h1>
                                <p>{doctor.doctorType}</p>
                                <p>{doctor.location}</p>
                            </div>
                        </Container>
                    </div>
                </div>
            </div>
        )
    }
}

export default PatientChatPage;
