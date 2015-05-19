var express = require('express');
var app = express();
var server = require('http').createServer(app);
var io = require('socket.io').listen(server);
var path = require('path');
var cookieParser = require('cookie-parser');
var bodyParser = require('body-parser');
var session = require('express-session');
var mongoose = require('mongoose');
var passport = require('passport'),
	FacebookStrategy = require('passport-facebook').Strategy;

mongoose.connect('mongodb://chatterbox:chatterbox@ds031982.mongolab.com:31982/chatterbox')

app.set('view engine', 'ejs');
app.set('views', './client/views');

app.use(cookieParser());
app.use(session({ 
    secret: 'SamarthAgarwal',
    resave: false,
    saveUninitialized: true
}));

app.use(passport.initialize());
app.use(passport.session());

app.use(express.static(path.join(__dirname, 'client')));


io.on('connection', function(socket){
	console.log('Connected!');
  	
  	socket.on('newMessage', function(msg){
    	console.log('message: ' + msg);

    	io.emit('newMessage', msg)

  	});

});


require('./auth/passportauth')(mongoose, passport, FacebookStrategy);
var router = require('./routes/routes.js')(app, express, path, passport);
app.use('/', router);


var PORT = process.env.PORT || 3000;
server.listen(PORT, function(){
  console.log('listening on *:' + PORT);
});