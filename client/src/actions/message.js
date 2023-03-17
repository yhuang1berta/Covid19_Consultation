const patientIcon = "https://img.icons8.com/ios/50/000000/consultation.png";
const doctorIcon = "https://img.icons8.com/wired/64/000000/medical-doctor.png";


//Get all messages between current user and selected user
export const getMessages = (chatPage, isDoctor) => {
    const url = isDoctor ? "/doctors/check-session" : "/patients/check-session";
    fetch(url)
        .then((res) => {
            if (res.status === 200) {
                return res.json();
            }
        })
        .then((json) => {
            if (json && (json.currentPatient || json.currentDoctor)) {
                if (!isDoctor) {
                    chatPage.setState({currentPatient: json.currentPatient})
                } else {
                    chatPage.setState({currentDoctor: json.currentDoctor})
                }
            }
            const url1 = isDoctor ? "/patients/contact-session" : "/doctors/contact-session";
            fetch(url1)
                .then((res) => {
                    if (res.status === 200) {
                        return res.json();
                    }
                })
                .then((json) => {
                    if (json && (json.selectedDoctor || json.selectedPatient)) {
                        if (!isDoctor) {
                            chatPage.setState({selectedDoctor: json.selectedDoctor});
                        } else {
                            chatPage.setState({selectedPatient: json.selectedPatient})
                        }
                    }
                    const p = isDoctor ? chatPage.state.selectedPatient.username : chatPage.state.currentPatient.username;
                    const d = isDoctor ? chatPage.state.currentDoctor.username : chatPage.state.selectedDoctor.username;
                    const url2 = `/messages/${p}/${d}`;
                    fetch(url2)
                        .then((res) => {
                            if (res.status === 200) {
                                return res.json();
                            }
                        })
                        .then((json) => {
                            const messages = [];
                            for (let i = 0; i < json.length; i++) {
                                messages.push({
                                    "text": json[i].text,
                                    "id": (i + 1).toString(),
                                    "sender": {
                                        "name": json[i].sender,
                                        "uid": json[i].sender === p ? "2" : "1",
                                        "avatar": json[i].sender === p ? patientIcon : doctorIcon
                                    }
                                })
                            }
                            chatPage.setState({
                                messages: messages
                            })
                        })
                        .catch((error) => {
                            console.log(error);
                        })
                })
                .catch((error) => {
                    console.log(error);
                });
        })
        .catch((error) => {
            console.log(error);
        })
};

//Send message event listener(prePatientChat page)
//Update selected doctor by click related doctor send message button
//Go to PatientChatPage
export const setPatientChatPage = (doctor, app, history) => {
    const url1 = `/doctors/${doctor}`;
    fetch(url1).then((res) => {
        if (res.status === 200) {
            return res.json()
        }
    }).then((json) => {
        app.setState({
            selectedDoctor: json[0]
        });
        const url = "/patients";
        const data = {
            patient: app.state.currentPatient,
            doctor: json[0]
        };
        const request = new Request(url, {
            method: "put",
            body: JSON.stringify(data),
            headers: {
                Accept: "application/json, text/plain, */*",
                "Content-Type": "application/json",
            },
        });
        fetch(request).then((res) => {
            history.push("/ChatPage/PatientChatPage")
        }).catch((error) => {
            console.log(error)
        });
    }).catch((error) => {
        console.log(error);
    });
};

//Get patient message by current doctor as receiver and set page state
export const getPatientMessage = (pdc) => {
    const url = "/doctors/check-session";
    fetch(url)
        .then((res) => {
            if (res.status === 200) {
                return res.json();
            }
        })
        .then((json) => {
            if (json && json.currentDoctor) {
                pdc.setState({currentDoctor: json.currentDoctor});
            }
            const url1 = `/messages/${pdc.state.currentDoctor.username}`;
            fetch(url1)
                .then((res) => {
                    if (res.status === 200) {
                        return res.json();
                    }
                })
                .then((json) => {
                    const patientMessages = [];
                    while (json.length > 0) {
                        let message = json.pop();
                        json = json.filter(m => m.sender !== message.sender);
                        patientMessages.push(message)
                    }
                    pdc.setState({
                        patientMessages: patientMessages
                    })
                })
                .catch((error) => {
                    console.log(error);
                });
        })
        .catch((error) => {
            console.log(error);
        });
};
//Send message event listener(preDoctorChat page)
//Update selected patient by click related patient send message button
//Go to DoctorChatPage
export const setDoctorChatPage = (patient, app, history) => {
    const url = `/patients/${patient}`;
    fetch(url).then((res) => {
        if (res.status === 200) {
            return res.json()
        }
    }).then((json) => {
        app.setState({
            selectedPatient: json[0]
        });
        history.push("/ChatPage/DoctorChatPage")
    }).catch(error => {
        console.log(error)
    })
};

//Set all previous non-replied messages to replied
const messageReplied = (receiver, sender) => {
    const request = new Request("/messages/replied", {
        method: "post",
        body: JSON.stringify({
            sender: sender,
            receiver: receiver
        }),
        headers: {
            Accept: "application/json, text/plain, */*",
            "Content-Type": "application/json",
        },
    });
    fetch(request).catch(error => {
        console.log(error)
    })
};

//Chat box message send  event listener
//Send message to database
export const sendMessage = (message, cp) => {
    const sender = cp.state.isDoctor ? cp.state.currentDoctor.username : cp.state.currentPatient.username;
    const receiver = cp.state.isDoctor ? cp.state.selectedPatient.username : cp.state.selectedDoctor.username;
    messageReplied(sender, receiver);
    const data = {
        sender: sender,
        receiver: receiver,
        text: message,
        isReplied: false
    };
    const request = new Request("/messages", {
        method: "post",
        body: JSON.stringify(data),
        headers: {
            Accept: "application/json, text/plain, */*",
            "Content-Type": "application/json",
        },
    });
    fetch(request).then(res => {
        if (res.status === 200) {
            console.log("success")
        } else {
            console.log("failed")
        }
    }).catch(error => {
        console.log(error)
    })
};

//Chat box message send event listener
//Change ChatPage state to display message
export const displayMessage = (message, chatPage) => {
    const avatar = chatPage.state.isDoctor ? doctorIcon : patientIcon;
    const newMessage = {
        "text": message,
        "id": chatPage.state.messages.length + 1,
        "sender": {
            "name": chatPage.state.name,
            "uid": chatPage.state.user.uid,
            "avatar": avatar,
        },
    };
    chatPage.state.messages.push(newMessage);
};
