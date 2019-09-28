var category = require('../service/category');
var add = function (req, res) {
    var body = req.body;
    var data = {
        name: body.name,
        icon: body.icon
    };
    category.create(data, function (error, result) {
        return res.status(200).send(result);
    });
}
exports.create = add;