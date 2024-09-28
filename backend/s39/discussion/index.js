
// require directive to load the express m,odule/package
//module is a software component/part of a program that conatins one or more routines
const express = require("express");

// creating an app using express
// this creates an express app and stores it in a variable app
// APP is our server
// http://localhost
const app = express();

// for the app to run, need a port where to listen to
const port = 4000;

// these are called middlewares
// middlewares are software that provide common services to the app outside of what is being offered by the operating system

// setup for allowing the server to handle data from your requyest or from the client 
// because it allows app to read json data and convert it into JS object
app.use(express.json());

//  by Default, info receive from the url can only be received as a string or an array
// by applying the option of extended : true this allows us to receive info in other data type such as an object which we will use throughout the app
app.use(express.urlencoded({ extended: true }));

// [SECTION] Routes
// express has a methods corresponding to reach HTTP method. 
// This route expects to receive a GET request from the URI "/"
// 1st argument will be the URI endpoint
app.get('/', (req, res) => {

    // it uses send() method to send a response back to the client
    res.send('Hello World!');
})

// MINI ACT
app.get('/hello', (req, res) => {
    res.send('Hello from the other side!');
})

// this route expects to receive a POST request at the URI "/hello"
app.post('/hello', (req, res) => {

    // body property is a property found in request object
    // req.body contains the contents/data of the request body
    /* 
        req.body = {
                    "firstName":"Michael Lester",
                    "lastName":"Aguhob"
                }
     */
    res.send(`Hello there ${req.body.firstName} ${req.body.lastName}`);
})

let users = [];
app.post("/register", (req, res) => {
    if(req.body.username !== '' && req.body.password !== '') {
        users.push(req.body);
        res.send(`User ${req.body.username} successfully registered`)
    } else {
        res.send(`Please input BOTH username and password.`)
    }
    console.log(users);
})


app.delete("/delete-user", (req, res) => {
    if (users.length > 0) {
      users.pop();
      res.send(users);
    } else {
      res.send("Users collection is empty.");
    }
  });






// tells our server to listen to the port given
app.listen(port, () => console.log(`Server is running port: ${port}`));