(function () {
    var mongoose = require('mongoose');

    var schema = new mongoose.Schema({
        userId: { type: mongoose.Schema.Types.ObjectId, ref: 'User' },
        date: Date,
        amount: Number,
        description: String,
        category: { type: mongoose.Schema.Types.ObjectId, ref: 'Category' },
        splitTo: [{
            user: {
                type: mongoose.Schema.Types.ObjectId,
                ref: 'User'
            },
            balance: Number
        }],
    });

    var expense = mongoose.model('Expense', schema);

    module.exports = expense;
}())