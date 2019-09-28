var userService = require('../service/user');

var signup = function(req, res) {
    var body = req.body;
    if (!body) {
        res.status(401).send({
            error: 'Bad request'
        });
    }
    userService.signup(body, (error, response) => {
        if (error) {
            res.status(500).send(error);
            return;
        }
        if (response) {
            res.status(201).send(response);
            return;
        }
    });
}

exports.signup = signup;