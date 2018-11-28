const createError = require('http-errors');
const express = require('express');
const path = require('path');
const cookieParser = require('cookie-parser');
const bodyParser = require('body-parser');
const logger = require('morgan');
const AWS = require('aws-sdk');

const indexRouter = require('./routes/index');
const usersRouter = require('./routes/users');
const vendorsRouter = require('./routes/vendors');
const customerInterests = require('./routes/interests');
const eventsInterests = require('./routes/events');

const app = express();


// view engine setup
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'pug');

app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));
app.use(bodyParser.urlencoded({extended: false}));
app.use(bodyParser.json());


//Applying CORS- giving access to any client
app.use((req, res, next) => {
  res.header('Access-Control-Allow-Origin', '*');
  res.header('Access-Control-Allow-Headers', 'Access-Control-Allow-Headers, Origin, Accept, x-auth, X-Requested-With, Content-Type, Access-Control-Request-Method, Access-Control-Request-Headers');
      if(req.method === 'OPTIONS'){
        res.header('Access-Control-Allow-Methods', 'PUT, POST, PATCH, DELETE, GET, OPTIONS');
        return res.status(200).json({})
    }
    next();
});
//Closing CORS. Always add before the routes.

app.use('/', indexRouter);
app.use('/users', usersRouter);
app.use('/vendors', vendorsRouter);
app.use('/interests',customerInterests);
app.use('/events',eventsInterests);

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
