require('dotenv').config();

const bodyParser   = require('body-parser');
const cookieParser = require('cookie-parser');
const express      = require('express');
const favicon      = require('serve-favicon');
const hbs          = require('hbs');
const mongoose     = require('mongoose');
const logger       = require('morgan');
const path         = require('path');


mongoose
  .connect('mongodb://localhost/projectGenerator', {useNewUrlParser: true})
  .then(x => {
    console.log(`Connected to Mongo! Database name: "${x.connections[0].name}"`)
  })
  .catch(err => {
    console.error('Error connecting to mongo', err)
  });

const app_name = require('./package.json').name;
cons = require('debug')(`${app_name}:${path.basename(__filename).split('.')[0]}`);

const app = express();

// Middleware Setup
app.use(logger('dev'));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));
app.use(cookieParser("secret"));


// Express View engine setup

app.use(require('node-sass-middleware')({
  src:  path.join(__dirname, 'public'),
  dest: path.join(__dirname, 'public'),
  sourceMap: true
}));
      

app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'hbs');
app.use(express.static(path.join(__dirname, 'public')));
app.use(favicon(path.join(__dirname, 'public', 'images', 'favicon.ico')));

hbs.registerPartials(__dirname + '/views/partials')

// default values for title local
app.locals.title = 'Express - Generated with IronGenerator';



const index = require('./routes/index');
const register = require('./routes/register')
const generator = require('./routes/generator')
const generateProj = require('./routes/generateProj')
const help = require('./routes/helpPage')
const myProjs = require('./routes/myProjs')
const download = require('./routes/download') //Under development

app.use('/', index)
app.use('/register', register)
app.use('/generator', generator)
app.use('/help', help)
app.use('/generateProj', generateProj)
app.use('/myProjs', myProjs)
app.use('/download', download) //Under development


app.listen(3000, () => {
  console.log("Listening port 3000")
})
