import React from 'react'
import './styles.css'
import "react-table-v6/react-table.css";
import {getPatients} from "../../actions/admin"
import {Table, TableHeader} from "react-mdl"
import {updatePatient} from "../../actions/admin"

class PatientTable extends React.Component {

    constructor(props) {
        super(props)
        this.state= {
            patients: [],
            doctors: [],
            error: "",
            success: "",
            searching: false
        }
        this.handleNameChange = this.handleNameChange.bind(this)
        this.handlePasswordChange = this.handlePasswordChange.bind(this)
        this.handleProvinceChange = this.handleProvinceChange.bind(this)
        this.handleAgeChange = this.handleAgeChange.bind(this)
        
    }

    componentWillMount() {
        getPatients(this)
    }

    render() {

        const patient_list = this.state.patients.map((user)=>(
            {name: <input type="text" value={user.username} onChange={this.handleNameChange}/>, 
            Id: user._id, 
            password: <input type="text" onChange={this.handlePasswordChange} />,
            province: <input type="text" value={user.province} onChange={this.handleProvinceChange} />,
            age: <input type="text" value={user.age} onChange={this.handleAgeChange} />,
            edit: <button onClick={()=> updatePatient(this, user)} >Edit</button>
            }
          ))

        // const patient_columns = [
        //     {
        //         Header: 'User ID',
        //         accessor: '_id'
        //     },
        //     {
        //         Header: 'Username',
        //         accessor: 'username',
        //         Cell: (props) => (
        //             <input type="text" value={props.value} onChange={this.handleNameChange}/>
        //         )
        //     },
        //     {
        //         Header: "Password",
        //         accessor: "password",
        //         Cell: (props) => (
        //             <input type="text" value={props.value} onChange={this.handlePasswordChange}/>
        //         )
        //     },
        //     {
        //         Header: "Province",
        //         accessor: "province",
        //         Cell: (props) => (
        //             <input type="text" value={props.value} onChange={this.handleProvinceChange}/>
        //         )
        //     },
        //     {
        //         Header: "Age",
        //         accessor: "age",
        //         Cell: (props) => (
        //             <input type="text" value={props.value} onChange={this.handleAgeChange}/>
        //         )
        //     },
        //     {
        //         Header: 'Update',
        //         accessor: '_id',
        //         Cell: (props) => (
        //             <Button id={props.value} onClick={() => console.log("clicked!")}>
        //                 Update
        //             </Button>)
        //     }
        // ];

        // const doctor_columns = [
        //     {
        //         Header: 'User ID',
        //         accessor: '_id'
        //     },
        //     {
        //         Header: 'Username',
        //         accessor: 'username',
        //         Cell: (props) => (
        //             <TextField
        //             onChange={this.handleNameChange}
        //             label={props.value} 
        //             style={{width: "80%"}}/>
        //         )
        //     },
        //     {
        //         Header: "Password",
        //         accessor: "password",
        //         Cell: (props) => (
        //             <TextField
        //             onChange={this.handlePasswordChange}
        //             label="New Password..." 
        //             style={{width: "80%"}}/>
        //         )
        //     },
        //     {
        //         Header: "Province",
        //         accessor: "location",
        //         Cell: (props) => (
        //             <TextField
        //             onChange={this.handleProvinceChange}
        //             label={props.value} 
        //             style={{width: "80%"}}/>
        //         )
        //     },
        //     {
        //         Header: "Doctor Type",
        //         accessor: "doctorType",
        //         Cell: (props) => (
        //                 <TextField
        //                 onChange={() => console.log("typed")}
        //                 label={props.value} 
        //                 style={{width: "80%"}}/>
        //             )
        //     },
        //     {
        //         Header: 'Update',
        //         accessor: '_id',
        //         Cell: (props) => (
        //             <Button id={props.value} onClick={() => console.log("clicked!")}>
        //                 Update
        //             </Button>)
        //     }
        // ];
        // return (
        //         <ReactTable
        //             className={`-highlight`}
        //             columns={patient_columns}
        //             data={this.state.patients}
        //             noDataText={`No User currently`}
        //         >
        //         </ReactTable>
        // );
    

        return (
            <div>
                <h3 className="error">{this.state.error}</h3>
                <h3 className="success">{this.state.success}</h3>
                <Table 
                sortable 
                shadow={1} 
                rows={patient_list}
                >
            
                    <TableHeader
                    name="Id"
                    sortFn={(a, b, isAsc) => (isAsc ? a : b).match(/(.*)/)[0].localeCompare((isAsc ? b : a).match(/(.*)/)[0])}
                    tooltip="The id of the users"
                    >
                    User Id
                    </TableHeader>

                    <TableHeader
                    name="name"
                    sortFn={(a, b, isAsc) => (isAsc ? a : b).match(/(.*)/)[0].localeCompare((isAsc ? b : a).match(/(.*)/)[0])}
                    tooltip="The name of the users"
                    >
                    Name
                    </TableHeader>
                    
                    <TableHeader
                    name="password"
                    // sortFn={(a, b, isAsc) => (isAsc ? a.value : b.value).match(/(.*)/)[0].localeCompare((isAsc ? b.value : a.value).match(/(.*)/)[0])}
                    tooltip="Enter new password for the user"
                    >
                    New Password
                    </TableHeader>

                    <TableHeader
                    name="province"
                    // sortFn={(a, b, isAsc) => (isAsc ? a : b).match(/(.*)/)[0].localeCompare((isAsc ? b : a).match(/(.*)/)[0])}
                    tooltip="The password of the users"
                    >
                    Province
                    </TableHeader>

                    <TableHeader
                    name="age"
                    // sortFn={(a, b, isAsc) => (isAsc ? a : b).match(/(.*)/)[0].localeCompare((isAsc ? b : a).match(/(.*)/)[0])}
                    tooltip="The age of the users"
                    >
                    Age
                    </TableHeader>

                    <TableHeader
                    name="edit"
                    // sortFn={(a, b, isAsc) => (isAsc ? a : b).match(/(.*)/)[0].localeCompare((isAsc ? b : a).match(/(.*)/)[0])}
                    tooltip="Click the edit button to update the user's information"
                    >
                    Edit
                    </TableHeader>
                </Table>
            </div>
        )
    }

    handleNameChange(event) {
        const changed_id= event.target.parentElement.parentElement.firstElementChild.innerText
        const new_state= this.state.patients.slice()
        for (let i = 0; i < new_state.length; i++) {
            if (new_state[i]._id === changed_id) {
                new_state[i].username = event.target.value
                break
            }
        }
        this.setState({patien: new_state})
    }

    handlePasswordChange(event) {
        console.log(event.target.parentElement.parentElement.firstElementChild.innerText)
        const changed_id= event.target.parentElement.parentElement.firstElementChild.innerText
        const new_state= this.state.patients.slice()
        for (let i = 0; i < new_state.length; i++) {
            if (new_state[i]._id === changed_id) {
                new_state[i].password = event.target.value
                break
            }
        }
        this.setState({users: new_state})
    }

    handleProvinceChange(event) {
        const changed_id= event.target.parentElement.parentElement.firstElementChild.innerText
        const new_state= this.state.patients.slice()
        for (let i = 0; i < new_state.length; i++) {
            if (new_state[i]._id === changed_id) {
                new_state[i].province = event.target.value
                break
            }
        }
        this.setState({patients: new_state})
    }

    handleAgeChange(event) {
        const changed_id= event.target.parentElement.parentElement.firstElementChild.innerText
        const new_state= this.state.patients.slice()
        for (let i = 0; i < new_state.length; i++) {
            if (new_state[i]._id === changed_id) {
                new_state[i].age = event.target.value
                break
            }
        }
        this.setState({patients: new_state})
    }

}

export default PatientTable