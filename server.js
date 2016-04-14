var express      = require('express');
var app          = express();
var port         = process.env.PORT || 8080;
var mongoose     = require('mongoose');
var flash        = require('connect-flash');
var jwt          = require('jsonwebtoken');
var morgan       = require('morgan');
var cookieParser = require('cookie-parser');
var bodyParser   = require('body-parser');
var session      = require('express-session');
var configDB = require('./config/database.js');

app.set('superSecret', configDB.secret);
app.use( express.static(__dirname+'/public'));
mongoose.connect(configDB.url);

process.on('SIGINT', function() {  
  mongoose.connection.close(function () { 
    console.log('Mongoose default connection disconnected through app termination'); 
    process.exit(0); 
  }); 
}); 

app.use(morgan('dev')); 
    app.use(cookieParser());
    app.use(bodyParser.json()); 
    app.use(bodyParser.urlencoded({extended: true}));
    app.use(session({secret: 'ilovecoding'})); 
    app.use(flash()); 


require('./app/routes.js')(app);
app.listen(port);

console.log('Listening on port: ' + port);
