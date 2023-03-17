import React from "react";
import PatientHeader from "../../PatientDashboard/components/PatientHeader/PatientHeader";
import "./styles.css";
import {doctorType} from "../../RegistrationInfo/infomation";
import ReactTable from 'react-table-v6';
import "react-table-v6/react-table.css";
import matchSorter from 'match-sorter';
import {getDoctors} from '../../../actions/doctor';
import {setPatientChatPage} from "../../../actions/message";
import {endPatientChat, readPatientCookie} from "../../../actions/patients";
import {Container} from "@material-ui/core";

class PrePatientChat extends React.Component {

    constructor(props) {
        super(props);
        this.props.history.push("/ChatPage/PrePatientChat");
    }

    state = {
        currentPatient: {
            username: ''
        },
        doctorInfo: []
    };

    createOptions = (opt) => {
        let select = [];
        for (let i = 0; i < opt.length; i++) {
            select.push(<option value={`${opt[i]}`}>{opt[i]}</option>)
        }
        return select
    };

    componentDidMount() {
        endPatientChat(this.props.app);
        readPatientCookie(this);
        getDoctors(this);
    }

    render() {
        const {history, app} = this.props;
        const name = this.state.currentPatient.username;
        const columns = [
            {
                Header: 'Doctor Name',
                id: 'doctorName',
                filterable: true,
                accessor: 'username',
                filterMethod: (filter, rows) =>
                    matchSorter(rows, filter.value, {keys: ['doctorName']}),
                filterAll: true
            },
            {
                Header: 'Doctor Type',
                filterable: true,
                accessor: 'doctorType',
                filterMethod: (filter, row) => {
                    if (filter.value === "All") {
                        return true;
                    }
                    return row[filter.id] === filter.value;
                },
                Filter: ({filter, onChange}) =>
                    <select
                        onChange={event => onChange(event.target.value)}
                        style={{width: "100%"}}
                        value={filter ? filter.value : "All"}
                    >
                        <option value='All'>All</option>
                        {this.createOptions(doctorType)}
                    </select>
            },
            {
                Header: 'Location',
                id: 'location',
                filterable: true,
                accessor: 'location',
                filterMethod: (filter, rows) =>
                    matchSorter(rows, filter.value, {keys: ['location']}),
                filterAll: true
            },
            {
                Header: 'Chat With Doctor',
                sortable: false,
                accessor: 'username',
                Cell: (props) => (
                    <button className={'message-b'} id={props.value} onClick={event => {
                        setPatientChatPage(event.target.id, app, history)
                    }}>
                        Send Message
                    </button>

                )
            },
        ];
        return (
            <div className={'pcp-main-div'}>
                <PatientHeader history={history} app={app} name={name}/>
                <div className={"list-div"}>
                    <p className="list-header">Doctor List</p>
                </div>
                <Container>
                    <ReactTable
                        className={`-highlight`}
                        columns={columns}
                        data={this.state.doctorInfo}
                        noDataText={`No Doctor Found`}
                    >
                    </ReactTable>
                </Container>
            </div>
        );
    }
}

export default PrePatientChat;
