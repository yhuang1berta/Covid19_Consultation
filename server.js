"use strict";
const log = console.log;
const express = require("express");
const app = express();
const mongoose = require("mongoose");
const mongoURI =
    process.env.MONGODB_URI ||
    "mongodb+srv://Chen:Chen@csc309team12.qqjn4.mongodb.net/csc309team12?retryWrites=true&w=majority";

mongoose.connect(mongoURI, {
  useNewUrlParser: true,
  useUnifiedTopology: true,
  useCreateIndex: true,
});

module.exports = {mongoose}; // Export the active connection.
// bcrypt is needed to hash the updated password by admin using findByIdAndUpdate
const bcrypt = require("bcryptjs");
mongoose.set("useFindAndModify", false);
//models
const { Patient } = require("./models/Patients");
const { Doctor } = require("./models/Doctor");
const { Admin } = require("./models/Admin");
const { Message } = require("./models/Message");
const { News } = require("./models/News");
const { Cases } = require("./models/Cases");
const { ObjectID } = require("mongodb");

const bodyParser = require("body-parser");
app.use(bodyParser.json());

const session = require("express-session");
app.use(bodyParser.urlencoded({ extended: true }));

app.use(
    session({
        secret: "oursecret",
        resave: false,
        saveUninitialized: false,
        cookie: {
            expires: 60000000,
            httpOnly: true,
        },
    })
);

//Server call for Patient side

app.post("/patients/login", (req, res) => {
  const username = req.body.username;
  const password = req.body.password;

  log(username, password);

  Patient.findByUsernamePassword(username, password)
    .then((user) => {
      req.session.patient = user;
      res.send({ currentPatient: user });
    })
    .catch((error) => {
      res.status(400).send();
    });
});

//send session cookie of patient information in order to make patient logged back after refreshing the page
app.get("/patients/check-session", (req, res) => {
  if (req.session.patient) {
      res.send({currentPatient: req.session.patient});
  } else {
    res.status(401).send();
  }
});

//Get selected Patient to chat from cookie
app.get("/patients/contact-session", (req, res) => {
  if (req.session.selectedPatient) {
      res.send({selectedPatient: req.session.selectedPatient});
  } else {
    res.status(401).send();
  }
});
//Update selected Patient in cookie
app.put("/patients/contact-session", (req, res) => {
  if (req.session.selectedPatient) {
    req.session.selectedPatient = req.body.selectedPatient;
      res.send({selectedPatient: req.session.selectedPatient});
  } else {
    res.status(401).send();
  }
});
//Update doctor in Patient visit history
app.put("/patients", (req, res) => {
  const patient = req.body.patient;
  const doctor = req.body.doctor ? req.body.doctor : {};
  if (patient) {
    Patient.findById(patient._id)
        .then((p) => {
            if (doctor !== {}) {
                for (let i = 0; i < p.visit_history.length; i++) {
                    if (p.visit_history[i]._id === doctor._id) {
                        p.visit_history.splice(i, 1);
                        break;
                    }
                }
                p.visit_history.push(doctor);
            }
            p.save()
                .then((p) => {
                    res.send(p);
                })
                .catch((error) => {
                    res.status(400).send();
                });
        })
        .catch((error) => {
            res.status(500).send();
        });
  }
});
//Get all patients in database
app.get("/patients", (req, res) => {
  Patient.find()
      .then((patients) => {
          res.send(patients);
      })
      .catch((error) => {
          res.status(404).send();
      });
});
//Get patient by username && update cookie of selectedPatient
app.get("/patients/:username", (req, res) => {
  const username = req.params.username;
    Patient.find({username: username})
        .then((patient) => {
            req.session.selectedPatient = patient[0];
            res.send(patient);
        })
        .catch((error) => {
            res.status(500).send();
        });
});

// Get patient by patient id, then send patient object back
app.get("/patients/read-patient-visit-history/:patient_id", (req, res) => {
  const id = req.params.patient_id;

  Patient.findById(id)
      .then((user) => {
          res.send(user);
      })
      .catch((e) => {
          res.status(404).send();
      });
});

//Upload patient to database
app.post("/patients", (req, res) => {
  log(req.body);

  const user = new Patient({
    username: req.body.username,
    password: req.body.password,
    age: req.body.age,
    gender: req.body.gender,
    province: req.body.province,
    visit_history: req.body.visit_history,
  });

  user.save().then(
      (user) => {
          res.send(user);
      },
      (error) => {
          res.status(400).send();
      }
  );
});

//Server call for Doctor side

app.post("/doctors/login", (req, res) => {
  const username = req.body.username;
  const password = req.body.password;

  log(username, password);

  Doctor.findByUsernamePassword(username, password)
    .then((user) => {
      req.session.doctor = user;
      res.send({ currentDoctor: user });
    })
    .catch((error) => {
      res.status(400).send();
    });
});

//send session cookie of doctor information in order to make doctor logged back after refreshing the page
app.get("/doctors/check-session", (req, res) => {
  if (req.session.doctor) {
      res.send({currentDoctor: req.session.doctor});
  } else {
    res.status(401).send();
  }
});
//Get selected Patient to chat from cookie
app.get("/doctors/contact-session", (req, res) => {
  if (req.session.selectedDoctor) {
      res.send({selectedDoctor: req.session.selectedDoctor});
  } else {
    res.status(401).send();
  }
});
//Update selected Doctor in cookie
app.put("/doctors/contact-session", (req, res) => {
  if (req.session.selectedDoctor) {
    req.session.selectedDoctor = req.body.selectedDoctor;
      res.send({selectedDoctor: req.session.selectedDoctor});
  } else {
    res.status(401).send();
  }
});
//Get all doctors in database
app.get("/doctors", (req, res) => {
  Doctor.find()
      .then((doctors) => {
          res.send(doctors);
      })
      .catch((error) => {
          res.status(500).send();
      });
});

// get doctor object by id
app.get("/doctors/get-doctor-by-id/:id", (req, res) => {
  const id = req.params.id;

  Doctor.findById(id)
      .then((doctor) => {
          res.send(doctor);
      })
      .catch((error) => {
          res.status(500).send();
      });
});
//Delete patient in doctor watchlist
app.put("/doctors/delfwlist", (req, res) => {
  const doctor = req.body.doctor;
  const patient = req.body.patient;
  if (doctor) {
    Doctor.findById(doctor._id)
        .then((d) => {
            if (patient) {
                Patient.findById(patient._id)
                    .then((p) => {
                        for (let i = 0; i < d.watchlist.length; i++) {
                            if (d.watchlist[i].username === p.username) {
                                d.watchlist.splice(i, 1);
                                break;
                            }
                        }
                        d.save()
                            .then((d) => {
                                res.send(d);
                            })
                            .catch((error) => {
                                res.status(400).send();
                            });
                    })
                    .catch((error) => {
                        res.status(500).send();
                    });
            }
        })
        .catch((error) => {
            res.status(500).send();
        });
  }
});
//Add patient to doctor's watchlist
app.put("/doctors", (req, res) => {
  const doctor = req.body.doctor;
  const patient = req.body.patient;
  if (doctor) {
    Doctor.findById(doctor._id)
        .then((d) => {
            if (patient) {
                Patient.findById(patient._id)
                    .then((p) => {
                        for (let i = 0; i < d.watchlist.length; i++) {
                            if (d.watchlist[i].username === p.username) {
                                d.watchlist.splice(i, 1);
                                break;
                            }
                        }
                        d.watchlist.push({
                            username: p.username,
                            _id: p._id,
                            province: p.province,
                            age: p.age,
                            gender: p.gender,
                        });
                        d.save()
                            .then((d) => {
                                res.send(d);
                            })
                            .catch((error) => {
                                res.status(400).send();
                            });
                    })
                    .catch((error) => {
                        res.status(500).send();
                    });
            }
        })
        .catch((error) => {
            res.status(500).send();
        });
  }
});
//Get doctor by username
app.get("/doctors/:username", (req, res) => {
  const username = req.params.username;
    Doctor.find({username: username})
        .then((doctor) => {
            req.session.selectedDoctor = doctor[0];
            res.send(doctor);
        })
        .catch((error) => {
            res.status(500).send();
        });
});
//Upload new doctor to database
app.post("/doctors", (req, res) => {
  log(req.body);

  const user = new Doctor({
    username: req.body.username,
    password: req.body.password,
    doctorType: req.body.doctorType,
    location: req.body.location,
  });

  user.save().then(
      (user) => {
          res.send(user);
      },
      (error) => {
          res.status(400).send();
      }
  );
});

//destory session cookie of all user type if they logged out
app.get("/logout", (req, res) => {
  req.session.destroy((error) => {
    if (error) {
      res.status(500).send(error);
    } else {
      res.send();
    }
  });
});

//Server call for Admin side

app.post("/admins/login", (req, res) => {
  const username = req.body.username;
  const password = req.body.password;

  Admin.findByUsernamePassword(username, password)
    .then((user) => {
      req.session.admin = user;
      res.send({ currentAdmin: user });
    })
    .catch((error) => {
      res.status(400).send(error);
    });
});

//send session cookie of admin information in order to make admin logged back after refreshing the page
app.get("/admins/check-session", (req, res) => {
  if (req.session.admin) {
    res.send({ currentAdmin: req.session.admin });
  } else {
    res.status(401).send();
  }
});

// updating patient information from admin end
app.put("/admins/patient-update/:patient_id", (req, res) => {
  const id = req.params.patient_id;
  const p = req.body.patient;

  // console.log(id)
  // console.log(p)
  if (!(p.password.length >= 7 && p.password.substring(0, 7) === "$2a$10$")) {
    const salt = bcrypt.genSaltSync(10);
    p.password = bcrypt.hashSync(p.password, salt);
  }

  Patient.findByIdAndUpdate(id, p)
    .then((updated_p) => {
      if (updated_p !== null && updated_p !== undefined) {
        res.send();
      } else {
        res.status(404).send();
      }
    })
    .catch((e) => {
      res.status(404).send(e);
    });
});

// updating doctor information from admin end
app.put("/admins/doctor-update/:doctor_id", (req, res) => {
  const id = req.params.doctor_id;
  const d = req.body.doctor;

  // console.log(id)
  // console.log(d.password)

  if (!(d.password.length >= 7 && d.password.substring(0, 7) === "$2a$10$")) {
    const salt = bcrypt.genSaltSync(10);
    d.password = bcrypt.hashSync(d.password, salt);
  }

  Doctor.findByIdAndUpdate(id, d)
    .then((updated_d) => {
      if (updated_d !== null && updated_d !== undefined) {
        res.send();
      } else {
        res.status(404).send();
      }
    })
    .catch((e) => {
      res.status(404).send(e);
    });
});

//create admin account
app.post("/admins", (req, res) => {
  log(req.body);

  const user = new Admin({
    username: req.body.username,
    password: req.body.password,
  });

  user.save().then(
    (user) => {
      res.send(user);
    },
    (error) => {
      res.status(400).send();
    }
  );
});

//post cases information to the database
app.post("/Cases", (req, res) => {
  log(req.body);
  const cases = new Cases({
    No: req.body.No,
    AB: req.body.AB,
    BC: req.body.BC,
    MB: req.body.MB,
    NB: req.body.NB,
    NL: req.body.NL,
    NT: req.body.NT,
    NS: req.body.NS,
    NU: req.body.NU,
    ON: req.body.ON,
    PE: req.body.PE,
    QC: req.body.QC,
    SK: req.body.SK,
    YT: req.body.YT,
    cases: req.body.cases,
    death: req.body.death,
    revorvered: req.body.revorvered,
  });

  cases.save().then(
    (cases) => {
      res.send(cases);
    },
    (error) => {
      res.status(400).send();
    }
  );
});

//post news information to the database
app.post("/news", (req, res) => {
  log(req.body);

  const news = new News({
    No: req.body.No,
    ca1: req.body.ca1,
    ca2: req.body.ca2,
    ca3: req.body.ca3,
    lca1: req.body.lca1,
    lca2: req.body.lca2,
    lca3: req.body.lca3,
    tca1: req.body.tca1,
    tca2: req.body.tca2,
    tca3: req.body.tca3,

    us1: req.body.us1,
    us2: req.body.us2,
    us3: req.body.us3,
    lus1: req.body.lus1,
    lus2: req.body.lus2,
    lus3: req.body.lus3,
    tus1: req.body.tus1,
    tus2: req.body.tus2,
    tus3: req.body.tus3,

    w1: req.body.w1,
    w2: req.body.w2,
    w3: req.body.w3,
    lw1: req.body.lw1,
    lw2: req.body.lw2,
    lw3: req.body.lw3,
    tw1: req.body.tw1,
    tw2: req.body.tw2,
    tw3: req.body.tw3,
  });

  news.save().then(
    (news) => {
      res.send(news);
    },
    (error) => {
      console.log(error);
      res.status(400).send();
    }
  );
});

//get news information from database
app.get("/news/find", (req, res) => {
  News.findOne({ No: 1 })
    .then((news) => {
      res.send({ news });
    })
    .catch((error) => {
      res.status(400).send();
    });
});

//delete news information from database
app.delete("/news/delete", (req, res) => {
  News.findOneAndRemove({ No: 1 })
    .then((news) => {
      if (!news) {
        res.status(404).send();
      } else {
        res.send(news);
      }
    })
    .catch((error) => {
      log(error);
      res.status(500).send();
    });
});

//get cases information from database
app.get("/cases/find", (req, res) => {
  Cases.findOne({ No: 1 })
    .then((cases) => {
      res.send({ cases });
    })
    .catch((error) => {
      res.status(400).send();
    });
});

//delete cases information from database
app.delete("/cases/delete", (req, res) => {
  Cases.findOneAndRemove({ No: 1 })
    .then((cases) => {
      if (!cases) {
        res.status(404).send();
      } else {
        res.send(cases);
      }
    })
    .catch((error) => {
      log(error);
      res.status(500).send();
    });
});

//Server call for doctor and patient messages

//Upload message to database
app.post("/messages", (req, res) => {
  const message = new Message({
    sender: req.body.sender,
    receiver: req.body.receiver,
    text: req.body.text,
    isReplied: req.body.isReplied,
  });
  message.save().then(
    (m) => {
      req.session.touch();
      res.send(m);
    },
    (error) => {
      console.log(error);
      res.status(400).send();
    }
  );
});

//Get all non-replied messages by receiver
app.get("/messages/:receiver", (req, res) => {
  const receiver = req.params.receiver;
  Message.find({ receiver: receiver, isReplied: false })
    .then((messages) => {
      res.send(messages);
    })
    .catch((error) => {
      res.status(500).send();
    });
});

//Get all messages between doctor and patient(no matter who is sender and who is receiver)
app.get("/messages/:sender/:receiver", (req, res) => {
  const sender = req.params.sender;
  const receiver = req.params.receiver;
  const communicators = [sender, receiver];
  Message.find({
    sender: { $in: communicators },
    receiver: { $in: communicators },
  })
    .then((messages) => {
      res.send(messages);
    })
    .catch((error) => {
      res.status(500).send();
    });
});
//Update all non-replied messages to replied by sender and receiver
app.post("/messages/replied", (req, res) => {
  const sender = req.body.sender;
  const receiver = req.body.receiver;
  Message.find({
    sender: sender,
    receiver: receiver,
    isReplied: false,
  })
    .then((messages) => {
      messages.forEach((message) => {
        message.isReplied = true;
        message.save().catch((error) => {
          console.log(error);
          res.status(400).send();
        });
      });
      res.send("success");
    })
    .catch((error) => {
      console.log(error);
      res.status(400).send();
    });
});

//web routes
app.use(express.static(__dirname + "/client/build"));

// All routes other than above will go to index.html
app.get("*", (req, res) => {
  const goodPageRoutes = [
    "/",
    "/PatientLogin",
    "/doctorLogin",
    "/AdminLogin",
    "/PatientHome",
    "/DoctorHome",
    "/AdminHome",
  ];
  if (!goodPageRoutes.includes(req.url)) {
    res.status(404);
  }

  // send index.html
  res.sendFile(__dirname + "/client/build/index.html");
});

// Express server listening
const port = process.env.PORT || 5000;
app.listen(port, () => {
  log(`Listening on port ${port}...`);
});
