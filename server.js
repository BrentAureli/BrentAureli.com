
var express = require('express');
var app = express();
var port = process.env.PORT || 8080;

var http = require('http').Server(app);
var io = require('socket.io')(http);

var cookieParser = require('cookie-parser');
var session = require('express-session');
var morgan = require('morgan');
var mongoose = require('mongoose');
var bodyParser = require('body-parser');
var multer = require('multer');
var passport = require('passport');
var flash = require('connect-flash');
var MongoStore = require('connect-mongo')(session);


var configDB = require('./config/database.js');
mongoose.connect(configDB.url);
require('./config/passport')(passport);

app.use(express.static(__dirname + '/public'));
app.use(multer({dest: './uploads/'}));
app.use(morgan('dev'));
app.use(cookieParser());
app.use(bodyParser.urlencoded({extended: false}));
app.use(session({secret: 'anystringoftext',
				 saveUninitialized: true,
				 resave: true,
				 store: new MongoStore({ mongooseConnection: mongoose.connection,
				 							ttl: 2 * 24 * 60 * 60 })}));

app.use(passport.initialize());
app.use(passport.session()); // persistent login sessions
app.use(flash()); // use connect-flash for flash messages stored in session

app.set('view engine', 'ejs');


var public_router = express.Router();
require('./app/routes/public.js')(public_router);
app.use('/public', public_router);

var api = express.Router();
require('./app/routes/api.js')(api, passport);
app.use('/api', api);

var auth = express.Router();
require('./app/routes/auth.js')(auth, passport);
app.use('/auth', auth);

var secure = express.Router();
require('./app/routes/secure.js')(secure);
app.use('/', secure);

io.on('connection', function(socket){
  console.log('a user connected');
  socket.on('disconnect', function(){
    console.log('user disconnected');
  });
  //Test messages by sending a message every 1 second.
  // var i = 0;
  // setInterval(function(){
  // 	socket.emit('message', {
  // 		message: i
  // 	});
  // 	i++;
  // }, 1000);
});


// app.listen(port);
// console.log('Server running on port: ' + port);

http.listen(port, function(){
  console.log('listening on *: ' + port);
  console.log(process.env.PORT);
});


