const mongoose = require("mongoose");

const Schema = mongoose.Schema;

const schoolSchema = new Schema({
    schoolname: {
        type: String,
        required: true
    },
    ownername: {
        type: String,
        required: true    
    },
    email: {
        type: String,
        required: true
    },
    password: {
        type: String,
        required: true
    },
    number: {
        type: Number,
        required: true
    },
    address: {
        type: String,
        required: true
    },
    city: {
        type: String,
        required: true
    },
    state: {
        type: String,
        required: true
    },
    pincode: {
        type: Number,
        required: true
    },
    certificate: { 
        type: String,
        required: true
    },
    license: { 
        type: String,
        required: true
    },
    createdAt: {
        type: Date,
        default: Date.now
    },
    updatedAt: {
        type: Date,
        default: Date.now
    }
});

module.exports = mongoose.model("School", schoolSchema);
