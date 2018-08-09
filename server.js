// a simple node server.
// manually create a new file - server.js
// make a package.json using terminal command npm init --force
// npm install --save express body-parser

// all middle ware functions located here need to be IN ORDER otherwise stuff will not work

// 1 - import everything
const express = require('express'); // bring in express
const app = express(); // create app 
const bodyParser = require('body-parser'); // bring in body parser
const webSocketConfig = require('./app/websocket')
const router = require('./app/routes')
const mongo = require('./app/mongodb')

// 2 - use the bodyparser
app.use(bodyParser.json()); // use bodyparser
app.use(bodyParser.urlencoded()); // use url encoded

// 3 - use the Cors function
app.use(function (req, res, next) { // you need this whole function or axios calls wont work
    res.header("Access-Control-Allow-Origin", "http://localhost:3000");
    res.header("Access-Control-Allow-Credentials", true);
    res.header("Access-Control-Allow-Methods", "GET,PUT,POST,DELETE,PATCH");
    res.header(
        "Access-Control-Allow-Headers",
        "Origin, X-Requested-With, Content-Type, Accept"
    );
    next();
})

webSocketConfig.webSocketConfig();

app.use(bodyParser.json());
app.use(
    bodyParser.urlencoded({
      extended: true
    }))
app.use(router); // register routes
// start mongo connection pool, then start express app
mongo.connect("mongodb://localhost:27017")
  .then(() => app.listen(8080)) // test the server
  .then(() => console.log('server running on port: 8080')) // you'll see this on the terminal
  .catch(err => {
    console.error(err);
    process.exit(1);
  });

// 4 - test the rest client
// app.use(function (req, res) { // this is the api call to localhost:8080
//     res.send('hello thereeee!!'); // open rest client and get homepage, this will show on the rest client
// })

// 5 - test the server
// app.listen(8080, function () { // app.listen starts the server
//     console.log('server running on 8080') // you'll see this on the terminal
// }) 