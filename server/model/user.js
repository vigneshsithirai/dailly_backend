const mongoose = require('mongoose');


var schema = new mongoose.Schema({
    username: {
        type: String,
        required: true,
        unique: true
    },
    firstName: String,
    lastName: String,
    dob: Date,
    role: String
});

exports.user = mongoose.model('User', schema);