var createError = require('http-errors');
var express = require('express');
var path = require('path');
var cookieParser = require('cookie-parser');
var logger = require('morgan');
var indexRouter = require('./routes/index');
var app = express();
var mysql = require('mysql');
var xmlRequest = require('xhr2');

// view engine setup
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'ejs');


app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));

app.use('/', indexRouter);


app.post('/getChar', function(req, res) {
  var xhr2 = new xmlRequest();
  var url = req.body.url
  var token = "bearer " + req.body.token
  console.log(token)
  xhr2.open("GET", url, true);
  xhr2.setRequestHeader('accept', 'application/json');
  xhr2.setRequestHeader('authorization', 'bearer ' + token);
  xhr2.onreadystatechange = () => { };
  xhr2.onload = () => { console.log(xhr2.response); };
  xhr2.send();
});

// app.post('/idVerification', function(req, res) {
//   // mySQL Connection
//   var connection = mysql.createConnection({
//       host: "oogis.asuscomm.com",
//       port: "15020",
//       user: "choi",
//       password: "1518",
//       database: "oogis"
//   })
//   var id = req.body.id;
//   var pw = req.body.pw;

//   var sql = `SELECT * FROM login WHERE id = "` + id + `" AND pw = md5(` + pw + ");";

//   connection.query(sql, function(err, result) {
//     if (err) throw err;
    
//     if (result == "") res.send("");
//     else res.send(result);
//   })
// })


app.post('/register', function(req, res) {
  console.log(req.body)
})

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
