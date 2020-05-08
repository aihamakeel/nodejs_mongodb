const express = require('express');
const app = express();
const mongoose = require('mongoose');
const bodyParser = require('body-parser');
const cors = require('cors');
require('dotenv/config');

//Middlewares--------------------------------------
app.use(cors());
app.use(bodyParser.json());

//import routes------------------------------------
//posts route
const postsRoute = require('./routes/posts');
app.use('/posts',postsRoute);
//users route
const usersRoute = require('./auth/users');
app.use('/users',usersRoute);
//login route
const loginRoute = require('./auth/login');
app.use('/login',loginRoute);

//Home routes---------------------------------------
app.get('/',(req,res) => {
    res.send('We are on home');
});

//connect to db--------------
mongoose.connect(process.env.DB_LOCAL,
{ useNewUrlParser: true , useUnifiedTopology: true }
).then(()=> console.log('Connectd to DB!')
).catch(err=>{
    console.error(err);
});

//Start listening server----------------------
app.listen(3000,()=> console.log('Server is running!'));
