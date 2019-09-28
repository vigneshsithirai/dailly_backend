var createError = require('http-errors');
var express = require('express');
var path = require('path');
var cookieParser = require('cookie-parser');
var cookieSession = require('cookie-session');
var logger = require('morgan');
var passport = require('passport')
require('./server/model/expense');
require('./server/model/category');
require('./server/model/user');

var indexRouter = require('./server/routes/index');
var usersRouter = require('./server/routes/users');
var authRouter = require('./server/routes/auth');
var expenseRouter = require('./server/routes/expense');
var categoryRouter = require('./server/routes/category');

var auth = require('./server/config/auth');
var config = require('./server/config/config');

var app = express();

// view engine setup
app.set('views', path.join(__dirname, './server/views'));
app.set('view engine', 'pug');

app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));

auth(passport);
app.use(passport.initialize());

app.use('/', indexRouter);
app.use('/api/users', usersRouter);
app.use('/auth', authRouter);
app.use('/api/expense', expenseRouter);
app.use('/api/category', categoryRouter);

app.use(cookieSession({
  name: 'session',
  keys: ['SECRECT KEY'],
  maxAge: 24 * 60 * 60 * 1000
}));

app.get('/', (req, res) => {
  if (req.session.token) {
    res.cookie('token', req.session.token);
    res.json({
      status: 'session cookie set'
    });
  } else {
    res.cookie('token', '')
    res.json({
      status: 'session cookie not set'
    });
  }
});


// catch 404 and forward to error handler
app.use(function (req, res, next) {
  next(createError(404));
});

// error handler
app.use(function (err, req, res, next) {
  // set locals, only providing error in development
  res.locals.message = err.message;
  res.locals.error = req.app.get('env') === 'development' ? err : {};

  // render the error page
  res.status(err.status || 500);
  res.render('error');
});

app.listen(5000, () => {
  console.log('Server is running on port 5000');
});

module.exports = app;
