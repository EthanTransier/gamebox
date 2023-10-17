const express = require('express');
const session = require ('express-session');
const flash = require('connect-flash');
const morgan = require('morgan');
const passport = require('passport');
require('./config/passport')(passport)
// Needed for .dotenv to work
require('dotenv').config()
const router = express.Router();
const app = express();
const mongoose = require('mongoose');
const expressEJSLayout = require('express-ejs-layouts')

// mongoose connection, any connection will be trickled into the rest of the program/application
try{
    mongoose.connect(process.env.MONGO_URI, {useNewUrlParser:true,useUnifiedTopology:true})
    .then(()=>{console.log(`connected on Port: ${process.env.PORT}`)})
    .catch((err)=>{console.log(err)})
} catch(error){
    console.log(error)
}
// Development tools
app.use(morgan('tiny'))
// EJS
app.set('view engine', 'ejs')
// Body parser
app.use(express.urlencoded({extended: false}))
// uses the public foler
app.use(express.static(__dirname + '/public'));
// fixes MIME type issues
app.use((req, res, next) => {
  const url = req.originalUrl;
  if (url.endsWith('.js')) {
    res.setHeader('Content-Type', 'text/javascript');
  } else if (url.endsWith('.css')) {
    res.setHeader('Content-Type', 'text/css');
  }
  next();
});

// Express session
app.use(session({
    secret: process.env.SESSION_SECRET,
    resave: true,
    saveUnitialized: true
}))
// initialize passport middleware and session
app.use(passport.initialize())
app.use(passport.session())
app.use(flash())
// errors messages that can be customized
app.use((req, res, next) => {
    res.locals.success_msg = req.flash('sucess message');
    res.locals.error_msg = req.flash('error_msg');
    res.locals.error = req.flash('error');
    next()
})
// /users goes to routes/users.js
// / goes to routes/index.js
app.use('/', require('./routes/index'));
app.use('/users', require('./routes/users'));

app.listen(process.env.PORT || 3000)