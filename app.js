var createError  = require('http-errors');
var express      = require('express');
var expHbs       = require('express-handlebars')
var mongoose     = require('mongoose')
var path         = require('path');
var cookieParser = require('cookie-parser');
var logger       = require('morgan');
var session      = require('express-session');
var flash        = require('connect-flash');
var validator    = require('express-validator');

var settings = require('./config/settings');
var database = require('./config/database');
var helpers  = require('./helpers/handlebars');

var indexRouter  = require('./routes/index');
var usersRouter  = require('./routes/users');

var app = express();

mongoose.connect(database.dbStr, { useNewUrlParser: true });

// view engine setup
var hbsConfig = expHbs.create({
    layoutsDir   : path.join(__dirname, 'templates/' + settings.defaultTemplate + '/layouts'),
    defaultLayout: path.join(__dirname, 'templates/' + settings.defaultTemplate + '/layouts/layout'),
    partialsDir  : path.join(__dirname, 'templates/' + settings.defaultTemplate + '/partials'),
    extname      : ".hbs",
    helpers : {
        compare: helpers.compare
    }
});
app.engine('.hbs', hbsConfig.engine);
app.set('view engine', '.hbs');
app.set('views', path.join(__dirname, 'templates/' + settings.defaultTemplate));


app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(validator());
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));

app.use(session({
    secret           : settings.secretKey,
    resave           : false,
    saveUninitialized: false
}));
app.use(flash());

app.use('/', (req, res, next) => {
    res.locals.settings = settings;
    next();
});

app.use('/', indexRouter);
app.use('/', usersRouter);

// catch 404 and forward to error handler
app.use(function(req, res, next) {
    next(createError(404));
});

// error handler
app.use(function(err, req, res, next) {
    // set locals, only providing error in development
    res.locals.message = err.message;
    res.locals.error   = req.app.get('env') === 'development' ? err : {};

    // render the error page
    res.status(err.status || 500);
    res.render('error');
});

module.exports = app;
