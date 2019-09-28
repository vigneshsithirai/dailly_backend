var express = require('express');
var router = express.Router();
var expense = require('../controller/expense');

router.post('/create', expense.create);
router.get('/getexpense/:paidBy/:paidTo', expense.getUserExpense);

module.exports = router;
