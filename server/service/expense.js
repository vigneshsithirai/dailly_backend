(function () {
    var mongoose = require('mongoose');
    var expense = mongoose.model('Expense');
    var ObjectId = mongoose.Types.ObjectId;

    var create = function (data, callback) {
        expense.create(data, callback);
    };

    var getUserExpense = function (data, callback) {
        var paidBy = ObjectId(data.paidBy);
        var paidTo = ObjectId(data.paidTo);
        var aggregateQuery = [
            {
                '$match': {
                    'userId': paidBy,
                    'splitTo': {
                        '$elemMatch': {
                            'user': paidTo
                        }
                    }
                }
            }, {
                '$project': {
                    'userId': 1,
                    'date': 1,
                    'amount': 1,
                    'category': 1,
                    'description': 1,
                    'splitTo': {
                        '$filter': {
                            'input': '$splitTo',
                            'as': 'splitTo',
                            'cond': {
                                '$eq': [
                                    '$$splitTo.user', paidTo
                                ]
                            }
                        }
                    }
                }
            }, {
                '$lookup': {
                    'from': 'users',
                    'localField': 'splitTo.user',
                    'foreignField': '_id',
                    'as': 'user'
                }
            }, {
                '$project': {
                    'userId': 1,
                    'date': 1,
                    'amount': 1,
                    'category': 1,
                    'description': 1,
                    'splitTo.user': {
                        '$arrayElemAt': [
                            '$user', 0
                        ]
                    },
                    'splitTo.balance': 1
                }
            }, {
                '$lookup': {
                    'from': 'categories',
                    'localField': 'category',
                    'foreignField': '_id',
                    'as': 'category'
                }
            }, {
                '$unwind': {
                    'path': '$category'
                }
            }, {
                '$unwind': {
                    'path': '$splitTo'
                }
            }
        ];
        expense.aggregate(aggregateQuery).exec(callback);
    }

    exports.create = create;
    exports.getUserExpense = getUserExpense;
}())