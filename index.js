// import express module
const express = require('express');
// import mysql module
const mysql = require('mysql');

const app = express();

// import body-parser
const bodyParser = require('body-parser');

const port = 3000;

// set up database parameter
const db = mysql.createConnection({
    host: "localhost",
    user: "root",
    password: "",
    database: "pmsDB"
});

// connect to database
db.connect((err)=>{
    if(err) throw err;
    console.log("Connected to MySql database");
    // query
   
});
// Use body-parser middleware to parse JSON requests
app.use(bodyParser.json());

// route to get user data
app.get('/users',(req, res)=>{
    db.query("SELECT * FROM users", (err, result)=>{
        if(err){
            console.error('Error querying the database:', err);
            res.status(500).json({error: 'Database error'});
            return
        }
        res.json(result)
    });
});

// api endpont to get email
app.get('/emails',(req, res)=>{
    db.query("SELECT Email FROM Credentials INNER JOIN Users ON Credentials.C_Id = Users.User_Id", (err,result)=>{
        if(err){
            console.error('Error querying the database:', err);
            res.status(500).json({error: 'Database error'});
            return
        }
        res.json(result)
    })
});
// api endpont to get email
app.get('/type',(req, res)=>{
    db.query("SELECT FName,LName from Researcher INNER JOIN Type ON Researcher.Type_Id = Type.Type_Id WHERE Type.TypeName = 'other'", (err,result)=>{
        if(err){
            console.error('Error querying the database:', err);
            res.status(500).json({error: 'Database error'});
            return
        }
        res.json(result)
    })
});

// api endpoint to get researcher based on project title
app.get('/researcher',(req, res)=>{
    db.query("SELECT FName,LName FROM Researcher R JOIN ResearcherProject RP ON R.R_Id = RP.R_Id JOIN Project P ON RP.P_Id = P.P_Id WHERE P.Title = 'NLP and Universal Human Values' ", (err,result)=>{
        if(err){
            console.error('Error querying the database:', err);
            res.status(500).json({error: 'Database error'});
            return
        }
        res.json(result)
    })
});



// login endpoint
app.post('/login', (req, res)=>{
    const {email, password} = req.body;
    // res.json({email: email, password: password});
    // check if email and password is correct
    db.query("SELECT * FROM users WHERE email = ?", [email], (err, result)=>{
        if(err){
            console.error('Error querying the database:', err);
            res.status(500).json({error: "Database error"});
        }else if(result.length === 0){
            res.status(401).json({error: 'Email not found'});
        }else{
            const user = result[0];
            if(email !== user.email){
                return res.status(401).json({error:'ie'});
            }
            if(password === user.password){
                // pwd match, login succesful
                res.json({username: user.username});
            }else{
                //password don't match
                res.status(401).json({error: 'ip'});
            }
        }
    });
});

app.listen(port, ()=>{
    console.log(`Server is running on port ${port}`);
});