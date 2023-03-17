"use strict";

const mongoose = require("mongoose");
const bcrypt = require("bcryptjs");

const NewsSchema = new mongoose.Schema({
  No: {
    type: Number,
    required: true,
    minlength: 0,
    trim: true,
    unique: true,
  },
  ca1: {
    type: String,
    required: true,
    minlength: 0,
    trim: true,
    unique: true,
  },
  ca2: {
    type: String,
    required: true,
    minlength: 0,
    trim: true,
    unique: true,
  },
  ca3: {
    type: String,
    required: true,
    minlength: 0,
    trim: true,
    unique: true,
  },

  lca1: {
    type: String,
    required: true,
    minlength: 0,
    trim: true,
    unique: true,
  },
  lca2: {
    type: String,
    required: true,
    minlength: 0,
    trim: true,
    unique: true,
  },
  lca3: {
    type: String,
    required: true,
    minlength: 0,
    trim: true,
    unique: true,
  },
  tca1: {
    type: String,
    required: true,
    minlength: 0,
    trim: true,
    unique: true,
  },
  tca2: {
    type: String,
    required: true,
    minlength: 0,
    trim: true,
    unique: true,
  },
  tca3: {
    type: String,
    required: true,
    minlength: 0,
    trim: true,
    unique: true,
  },

  us1: {
    type: String,
    required: true,
    minlength: 0,
    trim: true,
    unique: true,
  },
  us2: {
    type: String,
    required: true,
    minlength: 0,
    trim: true,
    unique: true,
  },
  us3: {
    type: String,
    required: true,
    minlength: 0,
    trim: true,
    unique: true,
  },

  lus1: {
    type: String,
    required: true,
    minlength: 0,
    trim: true,
    unique: true,
  },
  lus2: {
    type: String,
    required: true,
    minlength: 0,
    trim: true,
    unique: true,
  },
  lus3: {
    type: String,
    required: true,
    minlength: 0,
    trim: true,
    unique: true,
  },
  tus1: {
    type: String,
    required: true,
    minlength: 0,
    trim: true,
    unique: true,
  },
  tus2: {
    type: String,
    required: true,
    minlength: 0,
    trim: true,
    unique: true,
  },
  tus3: {
    type: String,
    required: true,
    minlength: 0,
    trim: true,
    unique: true,
  },

  w1: {
    type: String,
    required: true,
    minlength: 0,
    trim: true,
    unique: true,
  },
  w2: {
    type: String,
    required: true,
    minlength: 0,
    trim: true,
    unique: true,
  },
  w3: {
    type: String,
    required: true,
    minlength: 0,
    trim: true,
    unique: true,
  },

  lw1: {
    type: String,
    required: true,
    minlength: 0,
    trim: true,
    unique: true,
  },
  lw2: {
    type: String,
    required: true,
    minlength: 0,
    trim: true,
    unique: true,
  },
  lw3: {
    type: String,
    required: true,
    minlength: 0,
    trim: true,
    unique: true,
  },
  tw1: {
    type: String,
    required: true,
    minlength: 0,
    trim: true,
    unique: true,
  },
  tw2: {
    type: String,
    required: true,
    minlength: 0,
    trim: true,
    unique: true,
  },
  tw3: {
    type: String,
    required: true,
    minlength: 0,
    trim: true,
    unique: true,
  },
});

const News = mongoose.model("News", NewsSchema);
module.exports = { News };
