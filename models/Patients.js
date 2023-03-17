"use strict";

const mongoose = require("mongoose");
const bcrypt = require("bcryptjs");

const PatientsSchema = new mongoose.Schema({
  username: {
    type: String,
    required: true,
    minlength: 1,
    trim: true,
    unique: true,
  },
  password: {
    type: String,
    required: true,
    minlength: 1,
  },
  age: {
    type: String,
    required: true,
    minlength: 1
  },
  gender: {
    type: String,
    required: true,
  },
  province: {
    type: String,
    required: true
  },
  visit_history: {
    type: Array,
    required: true
  }
});

PatientsSchema.pre("save", function (next) {
  const user = this;

  if (user.isModified("password")) {
    bcrypt.genSalt(10, (err, salt) => {
      bcrypt.hash(user.password, salt, (err, hash) => {
        user.password = hash;
        next();
      });
    });
  } else {
    next();
  }
});

PatientsSchema.statics.findByUsernamePassword = function (username, password) {
  const User = this;
  return User.findOne({ username: username }).then((user) => {
    if (!user) {
      return Promise.reject();
    }
    return new Promise((resolve, reject) => {
      bcrypt.compare(password, user.password, (err, result) => {
        if (result) {
          resolve(user);
        } else {
          reject();
        }
      });
    });
  });
};

const Patient = mongoose.model("Patient", PatientsSchema);
module.exports = { Patient };
