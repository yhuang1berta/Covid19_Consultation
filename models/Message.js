"use strict";

const mongoose = require("mongoose");


const MessageSchema = new mongoose.Schema({
    sender: {
        type: String,
        required: true,
        minlength: 1
    },
    receiver: {
        type: String,
        required: true,
        minlength: 1,
    },
    text: {
        type: String,
        required: true,
    },
    isReplied: {
        type: Boolean,
        required: true,
    }
});


const Message = mongoose.model("Message", MessageSchema);
module.exports = {Message};
