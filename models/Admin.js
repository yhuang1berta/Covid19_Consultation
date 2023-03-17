"use strict";

const mongoose = require("mongoose");
const bcrypt = require("bcryptjs");

const AdminsSchema = new mongoose.Schema({
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
});

AdminsSchema.pre("save", function (next) {
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

AdminsSchema.statics.findByUsernamePassword = function (username, password) {
  const User = this;
  return User.findOne({ username: username }).then((user) => {
    console.log("model")
    if (!user) {
      console.log("can't find username")
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
const Admin = mongoose.model("Admin", AdminsSchema);
module.exports = { Admin };
