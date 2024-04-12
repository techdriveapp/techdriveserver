const mongoose = require("mongoose");

const Schema = mongoose.Schema;

const socialmedia = new Schema({
    views: {
        type: Number,
        required: true,
    },
    support: {
        type: Number,
        required: true,
    },
    userId: {
        type: Schema.Types.ObjectId,
        required: true,
    },
});

module.exports = mongoose.model("socialmedia", socialmedia)