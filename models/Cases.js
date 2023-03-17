"use strict";

const mongoose = require("mongoose");
const bcrypt = require("bcryptjs");

const CasesSchema = new mongoose.Schema({
    No: {
        type: Number,
        required: true,
        minlength: 1,
        trim: true,
        unique: true,
    },
    AB: {
        type: Number,
        required: true,
        minlength: 1,
        trim: true,
        unique: true,
    },
    BC: {
        type: Number,
        required: true,
        minlength: 1,
        trim: true,
        unique: true,
    },
    MB: {
        type: Number,
        required: true,
        minlength: 1,
        trim: true,
        unique: true,
    },
    NB: {
        type: Number,
        required: true,
        minlength: 1,
        trim: true,
        unique: true,
    },
    NL: {
        type: Number,
        required: true,
        minlength: 1,
        trim: true,
        unique: true,
    },
    NT: {
        type: Number,
        required: true,
        minlength: 1,
        trim: true,
        unique: true,
    },
    NS: {
        type: Number,
        required: true,
        minlength: 1,
        trim: true,
        unique: true,
    },
    NU: {
        type: Number,
        required: true,
        minlength: 1,
        trim: true,
        unique: true,
    },
    ON: {
        type: Number,
        required: true,
        minlength: 1,
        trim: true,
        unique: true,
    },
    PE: {
        type: Number,
        required: true,
        minlength: 1,
        trim: true,
        unique: true,
    },
    QC: {
        type: Number,
        required: true,
        minlength: 1,
        trim: true,
        unique: true,
    },
    SK: {
        type: Number,
        required: true,
        minlength: 1,
        trim: true,
        unique: true,
    },
    YT: {
        type: Number,
        required: true,
        minlength: 1,
        trim: true,
        unique: true,
    },
    cases: {
        type: Number,
        required: true,
        minlength: 1,
        trim: true,
        unique: true,
    },
    death: {
        type: Number,
        required: true,
        minlength: 1,
        trim: true,
        unique: true,
    },
    revorvered: {
        type: Number,
        required: true,
        minlength: 1,
        trim: true,
        unique: true,
    },
})


const Cases = mongoose.model("Cases", CasesSchema);
module.exports = {Cases};
