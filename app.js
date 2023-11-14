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
// handling CORS error
app.use((req, res, next)=>{
    res.setHeader('Access-Control-Allow-Origin', '*');
    res.setHeader('Access-Control-Allow-Methods', 'GET, POST, PUT, PATCH, DELETE');
    res.setHeader('Access-Control-Allow-Headers', 'Content-Type, Authorization');
    next();
})

//user router
app.get('/simple', (req, res)=>{
    res.json({
        message:"Working succefully"
    })
})
app.get("/",(req,res)=>{
    res.json({
        message: "Hello world"
    })
})
app.use('/users', userRouter);
app.use('/projects', projectRouter);


app.listen(3001, ()=>{
    console.log("Connected Succesfully");
})