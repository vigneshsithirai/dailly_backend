var mongoose = require('mongoose');
var user = mongoose.model('User');

var signup = function(data, callback) {
    var postData = new UserClass(data);
    user.create(postData).then(callback).catch((error) => {
        if (error && error.code ===  11000) {
            callback({
                error: 'Username already exist'
            }, null);
            return;
        }
        callback(error, null);
    });
}

class UserClass {
    constructor(userObj) {
        this.username = userObj.username || '';
        this.firstName = userObj.firstName || '';
        this.lastName = userObj.lastName || '';
        this.dob = userObj.dob || null;
        this.role = userObj.role || '';
    }
}

exports.UserClass = UserClass;
exports.signup = signup;