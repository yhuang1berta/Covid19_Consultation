//get admin session cookie with admin information back in order to keep admin logged in
export const readAdminCookie = (app) => {
    const url = "/admins/check-session";

    fetch(url)
        .then((res) => {
            if (res.status === 200) {
                return res.json();
            }
        })
        .then((json) => {
            if (json && json.currentAdmin) {
                app.setState({currentAdmin: json.currentAdmin});
            }
        })
        .catch((error) => {
            console.log(error);
        });
};

// used to set state for the login process for admin's end
export const updateLoginForm = (loginComp, field) => {
    const value = field.value;
    const name = field.name;

    loginComp.setState({
        [name]: value,
    });
};

//admin login
export const login = (loginComp, app) => {
    const request = new Request("/admins/login", {
        method: "post",
        body: JSON.stringify(loginComp.state),
        headers: {
            Accept: "application/json, text/plain, */*",
            "Content-Type": "application/json",
        },
    });

    // code used to bypass account authentication when server is down, remove as needed
    if (loginComp.state.username === "test" && loginComp.state.password === "test") {
        app.setState({currentAdmin: {"username": "admin"}});
        return;
    }

    fetch(request)
        .then((res) => {
            if (res.status === 200) {
                return res.json();
            } else {
                console.log(res.status);
                throw new Error();
            }
        })
        .then((json) => {
            console.log(json);
            if (
                json.currentAdmin !== null &&
                json.currentAdmin.username !== undefined
            ) {
                app.setState({currentAdmin: json.currentAdmin});
            }
        })
        .catch((error) => {
            console.log(error);
            loginComp.setState({wrong: true});
        });
};

//admin logout
export const logout = (app) => {
    const url = "/logout";

    fetch(url)
        .then((res) => {
            app.setState({
                currentAdmin: null,
                message: {type: "", body: ""},
            });
        })
        .catch((error) => {
            console.log(error);
        });
};

// Get all the doctor objects for Doctor table component in admin dashboard
export const getDoctors = (app) => {
    const url = "/doctors";

    fetch(url)
        .then((res) => {
            if (res.status === 200) {
                return res.json();
            } else {
                throw new Error();
            }
        })
        .then((json) => {
            if (json !== null && json !== undefined) {
                console.log("getDoctor before: ");
                console.log(app.state);
                app.setState({doctors: json});
                console.log("getDoctor after: ");
                console.log(app.state);
            } else {
                app.setState({error: "Cannot retrieve Doctor accounts information!"});
            }
        })
        .catch((e) => {
            app.setState({error: "Cannot retrieve Doctor accounts information!"});
        });
};

// Get all the patient objects for Doctor table component in admin dashboard
export const getPatients = (app) => {
    const url = "/patients";

    fetch(url)
        .then((res) => {
            if (res.status === 200) {
                return res.json();
            } else {
                throw new Error();
            }
        })
        .then((json) => {
            if (json !== null && json !== undefined) {
                app.setState({patients: json});
                // app.setState({error: "success"})
            } else {
                app.setState({
                    error: "Cannot retrieve patient accounts information!",
                });
            }
        })
        .catch((e) => {
            app.setState({error: "Cannot retrieve patient accounts information!"});
        });
};

// used to send update request to patient object after admin end changes its info.
export const updatePatient = (app, patient) => {
    const request = new Request(`/admins/patient-update/${patient._id}`, {
        method: "put",
        body: JSON.stringify({patient: patient}),
        headers: {
            Accept: "application/json, text/plain, */*",
            "Content-Type": "application/json",
        },
    });

    console.log(JSON.stringify(patient));
    console.log(patient._id);

    fetch(request)
        .then((res) => {
            if (res.status === 200) {
                app.setState({
                    error: "",
                    success: `Patient (id: ${patient._id}) updated sucessfully!`,
                });
            } else {
                throw new Error();
            }
        })
        .catch((e) => {
            app.setState({
                error: "Update Failed, please try again later!",
                success: "",
            });
        });
};

// used to send update request to doctor object after admin end changes its info.
export const updateDoctor = (app, doctor) => {
    const request = new Request(`/admins/doctor-update/${doctor._id}`, {
        method: "put",
        body: JSON.stringify({doctor: doctor}),
        headers: {
            Accept: "application/json, text/plain, */*",
            "Content-Type": "application/json",
        },
    });

    console.log(doctor);

    fetch(request)
        .then((res) => {
            if (res.status === 200) {
                app.setState({
                    error: "",
                    success: `Doctor (id: ${doctor._id}) updated sucessfully!`,
                });
            } else {
                throw new Error();
            }
        })
        .catch((e) => {
            app.setState({
                error: "Update Failed, please try again later!",
                success: "",
            });
        });
};
