var express  = require('express');
var app      = express();
var http = require('http').Server(app);
var io = require('socket.io')(http);



var port     = process.env.PORT || 8080;
var mongoose = require('mongoose');
var passport = require('passport');
var flash    = require('connect-flash');

var morgan       = require('morgan');
var cookieParser = require('cookie-parser');
var bodyParser   = require('body-parser');
var session      = require('express-session');

var configDB = require('./config/database.js');



// configuration ===============================================================
mongoose.connect(configDB.url); // connect to our database

require('./config/passport')(passport); // pass passport for configuration

// set up our express application
app.use(morgan('dev')); // log every request to the console
app.use(cookieParser()); // read cookies (needed for auth)
app.use(bodyParser()); // get information from html forms

app.set('view engine', 'ejs'); // set up ejs for templating



// required for passport
app.use(session({ secret: 'N0tHinGIsImP0s5IbL3' })); // session secret
app.use(passport.initialize());
app.use(passport.session()); // persistent login sessions
app.use(flash()); // use connect-flash for flash messages stored in session

// routes ======================================================================
require('./app/routes.js')(app, passport); // load our routes and pass in our app and fully configured passport

// launch ======================================================================
app.listen(port);
console.log('Server is running on ' + port);


// app.get('/', function(req, res){
//   res.sendFile(__dirname + '/view/index.html');
// });

// io.on('connection', function(socket){
//   console.log('a user connected');
//   socket.on('chat message', function(msg){
//     io.emit('chat message', msg);
//   });
//   socket.on('disconnect', function(){
//     console.log('user disconnected');
//   });
// });

// http.listen(3000, function(){
//   console.log('listening on *:3000');
// });
