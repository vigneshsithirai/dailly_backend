(function () {
    var expense = require('../service/expense');
    var jsonata = require("jsonata");

    var create = function (req, res) {
        var splitToExp = `splitTo.{ "user": user, "balance": balance ? balance : $number($$.amount)/$count($$.splitTo) }`;
        var body = req.body;
        if (!body.amount || !body.userId || !body.category) {
            res.status(400).send({
                error: 'Bad Request'
            });
            return;
        }
        var data = {
            userId: body.userId,
            date: body.date || new Date(),
            amount: body.amount || '',
            description: body.description || '',
            category: body.category || null,
            splitTo: jsonata(splitToExp).evaluate(body) || []
        };
        expense.create(data, function (error, result) {
            if (error) {
                return res.status(500).send(error);
            }
            return res.status(200).send(result);
        });
    }

    var getUserExpense = function(req, res) {
        var params = req.params
        if (!params.paidBy || !params.paidTo) {
            res.status(404).send({
                error: 'Bad Request'
            });
            return;
        }

        expense.getUserExpense(params, (error, response) => {
            if (error) {
                res.status(500).send(response);
                return;
            }
            if (response) {
                res.status(200).send(response);
                return;
            }
        });
    }
    exports.create = create;
    exports.getUserExpense = getUserExpense;
}());