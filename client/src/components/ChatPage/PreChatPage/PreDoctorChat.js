import React from "react";
import LoginHeader from "../../DoctorDashboard/LoginHeader/LoginHeader";
import ReactTable from 'react-table-v6';
import "react-table-v6/react-table.css";
import matchSorter from "match-sorter";
import {getPatientMessage, setDoctorChatPage} from "../../../actions/message";
import {Container} from "@material-ui/core";

class PreDoctorChat extends React.Component {
    constructor(props) {
        super(props);
        this.props.history.push("/ChatPage/PreDoctorChat");
        this.state = {
            currentDoctor: {
                username: ''
            },
            patientMessages: []
        };
    };

    componentDidMount() {
        getPatientMessage(this)
    }

    render() {
        const {history, app} = this.props;
        const columns = [
            {
                Header: 'Patient Name',
                id: 'patientName',
                filterable: true,
                accessor: 'sender',
                filterMethod: (filter, rows) =>
                    matchSorter(rows, filter.value, {keys: ['patientName']}),
                filterAll: true
            },
            {
                Header: 'Message',
                id: 'message',
                sortable: false,
                filterable: true,
                accessor: 'text',
                filterMethod: (filter, rows) =>
                    matchSorter(rows, filter.value, {keys: ['message']}),
                filterAll: true
            },
            {
                Header: 'Chat With Patient',
                sortable: false,
                accessor: 'sender',
                Cell: (props) => (
                    <button className={"message-b"} id={props.value} onClick={event => {
                        setDoctorChatPage(event.target.id, app, history)
                    }}>
                        Send Message
                    </button>)
            },
        ];
        return (
            <div className="pcp-main-div">
                <LoginHeader history={history} app={app} name={this.state.currentDoctor.username}/>
                <div className="list-div">
                    <p className="list-header">
                        patient messages:
                    </p>
                </div>
                <Container>
                    <ReactTable
                        className={`-highlight`}
                        columns={columns}
                        data={this.state.patientMessages}
                        noDataText={`No Patient Message Found`}
                    >
                    </ReactTable>
                </Container>
            </div>

        );
    }
}

export default PreDoctorChat;

