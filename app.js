var createError = require('http-errors');
var express = require('express');
var app = express();

var path = require('path');
var cookieParser = require('cookie-parser');
var logger = require('morgan');

var indexRouter = require('./routes/index');
var usersRouter = require('./routes/users');
//cahnges 1 
const expHbs = require('express3-handlebars');

const bodyparser = require('body-parser');
app.use(bodyparser.json())
app.use(bodyparser.urlencoded({extended:false}))

// view engine setup
// app.set('views', path.join(__dirname, 'views'));
// app.set('view engine', 'hbs');

app.engine('hbs',expHbs({defaultLayout:'layout',extname:'.hbs'}))
app.set('view engine','hbs');

require('dotenv').config();
//add helper function

// app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));



app.use('/', indexRouter);
// app.use('/users', usersRouter);


//add book routes
const bookroute = require('./routes/book/bookroute');
app.use('/book',bookroute);

// catch 404 and forward to error handler
app.use(function(req, res, next) {
  next(createError(404));
});

// error handler
app.use(function(err, req, res, next) {
  // set locals, only providing error in development
  res.locals.message = err.message;
  res.locals.error = req.app.get('env') === 'development' ? err : {};

  // render the error page
  res.status(err.status || 500);
  res.render('error');
});

module.exports = app;
