import React from 'react'
import './styles.css'
import "react-table-v6/react-table.css";
import {getDoctors} from "../../actions/admin"
import {Table, TableHeader} from "react-mdl"
import {updateDoctor} from "../../actions/admin"

class DoctorTable extends React.Component {

    constructor(props) {
        super(props)
        this.state= {
            doctors: [],
            error: "",
            success: "",
            activeTab: 0
        }
        this.handleNameChange = this.handleNameChange.bind(this)
        this.handlePasswordChange = this.handlePasswordChange.bind(this)
        this.handleLocationChange = this.handleLocationChange.bind(this)
        this.handleDoctorTypeChange = this.handleDoctorTypeChange.bind(this)
        
    }

    componentWillMount() {
        getDoctors(this)
    }

    render() {

        const doctor_list = this.state.doctors.map((user)=>(
            {name: <input type="text" value={user.username} onChange={this.handleNameChange}/>, 
            Id: user._id, 
            password: <input type="text" onChange={this.handlePasswordChange} />,
            location: <input type="text" value={user.location} onChange={this.handleLocationChange} />,
            doctorType: <input type="text" value={user.doctorType} onChange={this.handleDoctorTypeChange} />,
            edit: <button onClick={()=> updateDoctor(this, user)} >Edit</button>
            }
          ))
        

        return (
            <div>
                <h3 className="error">{this.state.error}</h3>
                <h3 className="success">{this.state.success}</h3>
                <Table 
                sortable 
                shadow={1} 
                rows={doctor_list}
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
                    name="location"
                    // sortFn={(a, b, isAsc) => (isAsc ? a : b).match(/(.*)/)[0].localeCompare((isAsc ? b : a).match(/(.*)/)[0])}
                    tooltip="The province of the users"
                    >
                    Province
                    </TableHeader>

                    <TableHeader
                    name="doctorType"
                    // sortFn={(a, b, isAsc) => (isAsc ? a : b).match(/(.*)/)[0].localeCompare((isAsc ? b : a).match(/(.*)/)[0])}
                    tooltip="The field the user specializes"
                    >
                    Doctor Type
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
        const new_state= this.state.doctors.slice()
        console.log(new_state[0]._id)
        for (let i = 0; i < new_state.length; i++) {
            if (new_state[i]._id === changed_id) {
                new_state[i].username = event.target.value
                break
            }
        }
        this.setState({doctors: new_state})
    }

    handlePasswordChange(event) {
        console.log(event.target.parentElement.parentElement.firstElementChild.innerText)
        const changed_id= event.target.parentElement.parentElement.firstElementChild.innerText
        const new_state= this.state.doctors.slice()
        for (let i = 0; i < new_state.length; i++) {
            if (new_state[i]._id === changed_id) {
                new_state[i].password = event.target.value
                break
            }
        }
        this.setState({doctors: new_state})
    }

    handleLocationChange(event) {
        const changed_id= event.target.parentElement.parentElement.firstElementChild.innerText
        const new_state= this.state.doctors.slice()
        for (let i = 0; i < new_state.length; i++) {
            if (new_state[i]._id === changed_id) {
                new_state[i].location = event.target.value
                break
            }
        }
        this.setState({doctors: new_state})
    }

    handleDoctorTypeChange(event) {
        const changed_id= event.target.parentElement.parentElement.firstElementChild.innerText
        const new_state= this.state.doctors.slice()
        for (let i = 0; i < new_state.length; i++) {
            if (new_state[i]._id === changed_id) {
                new_state[i].doctorType = event.target.value
                break
            }
        }
        this.setState({doctors: new_state})
    }

}

export default DoctorTable