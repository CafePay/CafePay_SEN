//Requiring Dependencies ==========================================================
var express      = require('express');
var app          = express();
var port         = process.env.PORT || 8080;
var mongoose     = require('mongoose');
var jwt          = require('jsonwebtoken');
var morgan       = require('morgan');
var cookieParser = require('cookie-parser');
var bodyParser   = require('body-parser');

//Connecting to database using mongoose ===========================================
var configDB = require('./config/database.js');
app.set('superSecret', configDB.secret);
app.use( express.static(__dirname+'/public'));
mongoose.connect(configDB.url);

//Setting environment =============================================================
app.use(morgan('dev')); 
app.use(cookieParser());
app.use(bodyParser.json()); 
app.use(bodyParser.urlencoded({extended: true}));

//Requiring routes.js file where all routes are specified =========================
require('./app/routes.js')(app);

//Listening to port 8080 ==========================================================
app.listen(port);
console.log('Listening on port: ' + port);
