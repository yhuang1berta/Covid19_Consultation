"use strict";

const mongoose = require("mongoose");
const bcrypt = require("bcryptjs");

const DoctorsSchema = new mongoose.Schema({
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
  doctorType: {
    type: String,
    required: true,
    minlength: 1,
  },
  location: {
    type: String,
    required: true,
    minlength: 1,
  },
    watchlist: {
        type: Array,
        required: true
    }
});

DoctorsSchema.pre("save", function (next) {
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

DoctorsSchema.statics.findByUsernamePassword = function (username, password) {
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


const Doctor = mongoose.model("Doctor", DoctorsSchema);
module.exports = { Doctor };
