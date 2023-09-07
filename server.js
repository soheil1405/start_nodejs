const express = require('express');
require('dotenv').config();

global.config = require('./config');
// const { check , validationResult } = require('express-validator');

var methodOverride = require('method-override')
const coockieParser = require('cookie-parser');

const session = require('express-session');
const flash = require('connect-flash');
const mongoose = require('mongoose');
mongoose.connect('mongodb://127.0.0.1:27017/nodetest' , {userNewUrlParser : true , userUnifiedTopology:true});

const app = express();



app.use(express.static(__dirname + '/public'));
app.use(express.urlencoded({extended : false}));
app.set('view engine' , 'ejs');
app.use(methodOverride("mothod"));


app.use(coockieParser(process.env.COOKIE_SECRET));
app.use(session({
    secret : process.env.SESSION_SECRET  ,
    resave :true ,
    saveUninitialized : true ,

}));
app.use(flash());


app.get('/' , (req , res)=>{
 res.render('index');   
})




app.use('/user' , require('./routes/user'));






app.listen(config.port , ()=>{

    console.log(`app is in port ${config.port}`);
});