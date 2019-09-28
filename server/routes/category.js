var express = require('express');
var router = express.Router();
var category = require('../controller/category');

router.post('/add', category.create);

module.exports = router;
