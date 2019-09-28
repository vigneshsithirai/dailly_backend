var mongoose = require('mongoose');
var DATABASE_URL = process.env.DATABASE_URL || 'mongodb://localhost/DailyExpense'
mongoose.set('useCreateIndex', true);
mongoose.connect(DATABASE_URL, { useNewUrlParser: true });
var db =mongoose.connection;
db.on('error', function() {
    console.error('Error occured in db connection');
});

db.once('open', function() {
    console.log('DB Connection established succesfully');
});
