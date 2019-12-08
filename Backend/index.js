const port = process.env.PORT || 4000;
const rooturl = "http://localhost:3000";
var express = require('express');
var app = express();
var bodyParser = require('body-parser');
var session = require('express-session');
var cors = require('cors');
const mongoose = require('mongoose');
const db = require('./src/helpers/settings').mongoURI;

const graphqlHTTP = require('express-graphql');
const schema = require('./src/schema/schema');

app.use('/graphql', graphqlHTTP({
  schema,
  graphiql : true
}));
 

mongoose
  .connect(db, { useNewUrlParser: true, useUnifiedTopology: true, poolSize: 100, useFindAndModify: false })
  .then(() => console.log('MongoDB Connected'))
  .catch(err => console.log(err));


app.use(session({
    secret              : 'cmpe273_homeaway_mysql',
    resave              : false, // Forces the session to be saved back to the session store, even if the session was never modified during the request
    saveUninitialized   : false, // Force to save uninitialized session to db. A session is uninitialized when it is new but not modified.
    duration            : 60 * 60 * 1000,    // Overall duration of Session : 30 minutes : 1800 seconds
    activeDuration      :  5 * 60 * 1000
}));

app.use(function(req, res, next) {
    res.setHeader('Access-Control-Allow-Origin', rooturl);
    res.setHeader('Access-Control-Allow-Credentials', 'true');
    res.setHeader('Access-Control-Allow-Methods', 'GET,HEAD,OPTIONS,POST,PUT,DELETE');
    res.setHeader('Access-Control-Allow-Headers', 'Access-Control-Allow-Headers, Origin,Accept, X-Requested-With, Content-Type, Access-Control-Request-Method, Access-Control-Request-Headers');
    res.setHeader('Cache-Control', 'no-cache');
    next();
});

app.use(cors({ origin: rooturl, credentials: true }));
app.use(express.json());
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({extended: true}));

app.listen(port);
console.log("Server Listening on port " + port);