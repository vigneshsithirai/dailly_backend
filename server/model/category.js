var mongoose = require('mongoose');

var schema = new mongoose.Schema({
    name: { type: String, required: true, unique: true, },
    icon: String
});

var category = mongoose.model('Category', schema);

module.exports = category;