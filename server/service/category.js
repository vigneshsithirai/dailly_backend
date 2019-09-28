var mongoose = require('mongoose');
var category = mongoose.model('Category');

var create =  function (data, callback) {
    category.create(data, callback);
};

exports.create = create;