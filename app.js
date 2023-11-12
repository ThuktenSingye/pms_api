require('dotenv').config();
const express = require('express');
const bodyParser = require('body-parser');
const app = express();
const userRouter = require('./api/users/user.router');
const projectRouter = require('./api/project/project.router');

// app.use(express.json())
// use express static folder
app.use(express.static("./public"));
// body-parser middleware usenp
app.use(bodyParser.json({ limit: "50mb" }))
app.use(bodyParser.urlencoded({ limit: '50mb', extended: true }));
app.use('/public/images', express.static('public/images'));


//user router
app.use('/users', userRouter);
app.use('/projects', projectRouter);


app.listen(process.env.APP_PORT, ()=>{
    console.log('Server up and running on port:',process.env.APP_PORT);
})