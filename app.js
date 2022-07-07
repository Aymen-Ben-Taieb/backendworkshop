
var express = require('express');
var path = require('path');
var cookieParser = require('cookie-parser');
var logger = require('morgan');
var cors=require('cors');

var mongoose=require('mongoose')
mongoose.connect('mongodb://localhost:27017/PIDEV_API_db',()=>{
    console.log('connected to database')
})

var indexRouter = require('./routes/index');
var usersRouter = require('./routes/users');
var carteRouter = require('./routes/carte');
var conseilRouter= require('./routes/conseil');
var techniquesRouter= require('./routes/techniques');
var especesRouter= require('./routes/especes');
var carteEspeceRouter = require('./routes/carteEspece');


var app = express();

app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));
app.use(cors());

app.use('/', indexRouter);
app.use('/users', usersRouter);
app.use('/carte', carteRouter);
app.use('/conseil',conseilRouter);
app.use('/techniques',techniquesRouter);
app.use('/especes',especesRouter);
app.use('/carteEspece',carteEspeceRouter);



module.exports = app;
