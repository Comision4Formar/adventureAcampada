var createError = require('http-errors');
var express = require('express');
var path = require('path');
var cookieParser = require('cookie-parser');
var logger = require('morgan');
const methodOverride = require('method-override');
const session = require('express-session');

/* rutas */

const indexRouter = require('./routes/indexRouter');
const productRouter = require('./routes/productsRouter');
const adminRouter = require('./routes/adminRouter');
var usersRouter = require('./routes/usersRouter');
const localsCheck = require('./middlewares/localsCheck'); 
const cookieCheck = require('./middlewares/cookieCheck');


var app = express();

// view engine setup
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'ejs');
app.use(methodOverride('_method'));
app.use(session({
  secret :"proyectoacampada",
  resave :true,
  saveUninitialized: true
}));

app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(localsCheck);
app.use(cookieCheck);
app.use(express.static(path.join(__dirname, 'public')));

app.use('/', indexRouter);
app.use('/users', usersRouter);
app.use('/admin',adminRouter);
app.use('/products', productRouter);

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
