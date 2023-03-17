// used to verify the account that is login in, and set the current patient to the patient that's login in.
export const readPatientCookie = (app) => {
    const url = "/patients/check-session";
    fetch(url)
        .then((res) => {
            if (res.status === 200) {
                return res.json();
            }
        })
        .then((json) => {
            if (json && json.currentPatient) {
                app.setState({currentPatient: json.currentPatient});
            }
        })
        .catch((error) => {
            console.log(error);
        })
};

//read cookie to get selected patient
export const readSelectedPatientCookie = (app) => {
    const url = "/patients/contact-session";
    fetch(url)
        .then((res) => {
            if (res.status === 200) {
                return res.json();
            }
        })
        .then((json) => {
            if (json && json.selectedPatient) {
                app.setState({selectedPatient: json.selectedPatient});
            }
        })
        .catch((error) => {
            console.log(error);
        })
};

// used to set state for the login process for patient's end
export const updateLoginForm = (loginComp, field) => {
    const value = field.value;
    const name = field.name;

    loginComp.setState({
        [name]: value,
    });
};


export const login = (loginComp, app) => {
    const request = new Request("/patients/login", {
        method: "post",
        body: JSON.stringify(loginComp.state),
        headers: {
            Accept: "application/json, text/plain, */*",
            "Content-Type": "application/json",
        },
    });

    // code used to bypass account authentication when server is down, remove as needed
    if (loginComp.state.username === "test" && loginComp.state.password === "test") {
        app.setState({currentPatient: {"username": "test"}});
        return;
    }
    // console.log(JSON.stringify(loginComp.state))

    fetch(request)
        .then((res) => {
            if (res.status === 200) {
                return res.json();
            }
        })
        .then((json) => {
            console.log(json);
            console.log(json.currentPatient);
            if (json.currentPatient !== null && json.currentPatient.username !== undefined) {
                console.log("entered")
                app.setState({currentPatient: json.currentPatient});
                console.log(app.state)
            }
        })
        .catch((error) => {
            console.log(error);
            loginComp.setState({wrong: true})
        })


};

// used to send register request to server end
export const register = (registerComp, app, history) => {
    const url = "/patients";

    const patient = registerComp.state;

    const request = new Request(url, {
        method: "post",
        body: JSON.stringify(patient),
        headers: {
            Accept: "application/json, text/plain, */*",
            "Content-type": "application/json",
        },
    });
    fetch(request)
        .then(function (res) {
            if (res.status === 200) {
                return res.json()
            } else {
                throw new Error()
            }
        })
        .then((json) => {
            if (!app.state.currentPatient && app.state.currentPatient !== undefined) {
                // app.setState({currentPatient: json})
                history.push("/PatientLogin")
            }
        })
        .catch((e) => {
            registerComp.error = "Patient account cannot be created at the moment!"
            registerComp.setState(registerComp.state)
        })
};

// Log out from the current user on patient end.
export const logout = (app) => {
    const url = "/logout";
    fetch(url)
        .then((res) => {
            app.setState({
                currentPatient: null,
                message: {type: "", body: ""},
                selectedDoctor: null
            });
        })
        .catch((error) => {
            console.log(error);
        })
};

//Update selectedDoctor cookie to null
export const updateSelectedDoctor = () => {
    const url = "/doctors/contact-session";
    const request = new Request(url, {
        method: "put",
        body: JSON.stringify({
            selectedDoctor: null
        }),
        headers: {
            Accept: "application/json, text/plain, */*",
            "Content-type": "application/json",
        },
    });
    return new Promise(resolve => {
        fetch(request).then(res => {
            if (res.status === 200) {
                return res.json()
            }
        }).then(json => {
            resolve(json)
        })
    }).catch(error => {
        console.log(error)
    })
};

//Set main.state.selectedDoctor by read selectedDoctor cookie
export const endPatientChat = (app) => {

    updateSelectedDoctor().then(json => {
        if (json) {
            app.setState(
                {
                    selectedDoctor: json.selectedDoctor
                })
        }
    })
        .catch(error => {
        console.log(error);
    });
};

// used to send request to get all patient objects, used in PatientTable component in admin dashboard to get all patients
export const readPatientVisitHistory = (app) => {

    const patient = app.state.patient
    console.log("patient:")
    console.log(patient)
    const url = `/patients/read-patient-visit-history/${patient.id}`

    fetch(url)
    .then((res) => {
        if (res.status === 200) {
            return res.json()
        } else {
            throw new Error()
        }
    })
    .then((json) => {
        if (json !== null && json !== undefined) {
            app.setState({patient: json, loading: false})
            console.log("state resetted")
        }
    })
    .catch((e) => {
        console.log(e)
    })
}

