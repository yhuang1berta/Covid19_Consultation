//get doctor session cookie with doctor information back in order to keep doctor logged in
export const readDoctorCookie = (app) => {
  const url = "/doctors/check-session";
  fetch(url)
      .then((res) => {
          if (res.status === 200) {
              return res.json();
          }
      })
      .then((json) => {
          if (json && json.currentDoctor) {
              app.setState({currentDoctor: json.currentDoctor});
          }
      })
      .catch((error) => {
          console.log(error);
      });
};

//Read cookies to get selected Doctor
export const readSelectedDoctorCookie = (app) => {
  const url = "/doctors/contact-session";
  fetch(url)
      .then((res) => {
          if (res.status === 200) {
              return res.json();
          }
      })
      .then((json) => {
          if (json && json.selectedDoctor) {
              app.setState({selectedDoctor: json.selectedDoctor});
          }
      })
      .catch((error) => {
          console.log(error);
      });
};

// used to set state for the login process for doctor's end
export const updateLoginForm = (loginComp, field) => {
  const value = field.value;
  const name = field.name;

  loginComp.setState({
    [name]: value,
  });
};

//doctor login
export const login = (loginComp, app) => {
  const request = new Request("/doctors/login", {
    method: "post",
    body: JSON.stringify(loginComp.state),
    headers: {
      Accept: "application/json, text/plain, */*",
      "Content-Type": "application/json",
    },
  });

  // code used to bypass account authentication when server is down, remove as needed
  if (loginComp.state.username === "test" && loginComp.state.password === "test") {
    app.setState({currentDoctor: {"username": "test1"}});
    return;
}

  fetch(request)
      .then((res) => {
          if (res.status === 200) {
              return res.json();
          }
      })
      .then((json) => {
          console.log(json);
          if (json.currentDoctor !== undefined) {
              app.setState({currentDoctor: json.currentDoctor});
          }
      })
      .catch((error) => {
          console.log(error);
          loginComp.setState({wrong: true});
      });
};

//doctor logout
export const logout = (app) => {
  const url = "/logout";

  fetch(url)
      .then((res) => {
          app.setState({
              currentDoctor: null,
              message: {type: "", body: ""},
              selectedPatient: null
          });
      })
      .catch((error) => {
          console.log(error);
      });
};

//Get all doctors
export const getDoctors = (ppc) => {
  const url = "/doctors";
  fetch(url)
      .then((res) => {
          if (res.status === 200) {
              return res.json();
          }
      })
      .then((json) => {
          ppc.setState({
              doctorInfo: json,
          });
      })
      .catch((error) => {
          console.log(error);
      });
};

//Update patient into doctor watchlist
const updateWatchlist = (doctor, patient) => {
  const url = "/doctors";
  const request = new Request(url, {
    method: "put",
    body: JSON.stringify({
      patient: patient,
      doctor: doctor,
    }),
    headers: {
      Accept: "application/json, text/plain, */*",
      "Content-Type": "application/json",
    },
  });
  return new Promise((resolve) => {
    fetch(request)
        .then((res) => {
            if (res.status === 200) {
                return res.json();
            }
        })
        .then((json) => {
            resolve(json);
        })
        .catch((error) => {
            console.log(error);
        });
  });
};

//Add patient to list button event listener(DoctorChatPage)
export const addPatientToWatchlist = (button, doctor, patient, app) => {
  updateWatchlist(doctor, patient).then((res) => {
    if (res) {
      app.state.currentDoctor.watchlist = res.watchlist;
      button.innerText = "Added!";
      setTimeout(function () {
        button.innerText = "Add to List";
      }, 1000);
    } else {
      button.innerText = "Failed!";
      setTimeout(function () {
        button.innerText = "Add to List";
      }, 1000);
    }
  });
};

//remove patients from doctor's watchlist
export const removePatientFromWatchlist = (app, patient) => {
  const url = "/doctors/delfwlist";

  const doctor = app.state.doctor;

  const request = new Request(url, {
    method: "put",
    body: JSON.stringify({
      patient: patient,
      doctor: doctor,
    }),
    headers: {
      Accept: "application/json, text/plain, */*",
      "Content-Type": "application/json",
    },
  });
  fetch(request)
      .then((res) => {
          if (res.status === 200) {
              return res.json();
          } else {
              throw new Error();
          }
      })
      .then((json) => {
          if (json !== null && json !== undefined) {
              console.log(json);
              app.setState({watchlist: json.watchlist});
          }
      })
      .catch((error) => {
          console.log(error);
      });
};

//Update selectedPatient cookie to null
export const updateSelectedPatient = () => {
  const url = "/patients/contact-session";
  const request = new Request(url, {
    method: "put",
    body: JSON.stringify({
      selectedPatient: null,
    }),
    headers: {
      Accept: "application/json, text/plain, */*",
      "Content-type": "application/json",
    },
  });
  return new Promise((resolve) => {
    fetch(request)
        .then((res) => {
            if (res.status === 200) {
                return res.json();
            }
        })
        .then((json) => {
            resolve(json);
        });
  }).catch((error) => {
    console.log(error);
  });
};

//Add patient to doctor watchlist button event listener(Doctor Dashboard)
export const AddToWatchlist = (app, button, doctor, patient) => {
  updateWatchlist(doctor, patient)
      .then((json) => {
          if (json) {
              button.setDisabled = true;
              app.setState({
                  watchlist: json.watchlist,
                  success: "Patient added to watchlist!",
                  error: "",
              });
          } else {
              throw new Error();
          }
      })
      .catch((error) => {
          button.disabled = true;
          app.setState({
              error: "Failed to add patient to watchlist",
              success: "",
          });
          setTimeout(function () {
              button.disabled = false;
          }, 1000);
      });
};

//Set main.state.selectedDoctor by read selectedPatient cookie
export const endDoctorChat = (app) => {
  updateSelectedPatient()
      .then((json) => {
          if (json) {
              app.setState({
                  selectedPatient: json.selectedPatient,
              });
          }
      })
      .catch((error) => {
          console.log(error);
      });
};

// get all the patients from database, used to search for patient in doctor dashboard
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
              console.log(json);
              app.setState({patients: json});
              // app.setState({error: "success"})
          } else {
              app.setState({
                  error: "Cannot retrieve patient accounts information!",
              });
          }
      })
      .catch((e) => {
          console.log("error caught");
          app.setState({error: "Cannot retrieve patient accounts information!"});
      });
};

// get all the patients from this doctor's watchlist, used for doctor dashboard's watchlist component
export const getWatchlist = (app, id) => {
  const url = `/doctors/get-doctor-by-id/${id}`;
  console.log(id);

  fetch(url)
      .then((res) => {
          if (res.status === 200) {
              console.log("returning json");
              return res.json();
          } else {
              throw new Error();
          }
      })
      .then((json) => {
          if (json !== null && json !== undefined) {
              console.log(json);
              app.setState({watchlist: json.watchlist});
          } else {
              throw new Error();
          }
      })
      .catch((e) => {
          console.log(e);
      });
};
