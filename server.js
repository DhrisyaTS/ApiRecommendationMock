
// call the packages we need
var express = require('express');        // call express
var app = express();                 // define our app using express
var bodyParser = require('body-parser');
var userData = require('./user');
var fs = require("fs");
var server = require('http').createServer(app);
var io = require('socket.io')(server);
var sockets = require('./socket/socket');
var jwt = require('jsonwebtoken');

app.use('/public',express.static(__dirname + '/public'));

// configure app to use bodyParser()
// this will let us get the data from a POST
app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());

var port = process.env.PORT || 8080;        // set our port
var router = express.Router();              // get an instance of the express Router

io.on('connection', function (socket) {
    console.log(socket.id);
    socket.on('connectUser', function (user) {
        sockets.AddSocket(socket, user);
    });
    socket.on('disconnect', function () {
        console.log("client disconnected");
    });
});

// test route to make sure everything is working (accessed at GET http://localhost:8080/api)
///Loads all available routings
require("./ApiRoutes")(express, app);

var pageRoute = express.Router();
pageRoute.get('/login', function (req, res) {
    res.sendfile(__dirname + '/public/AgentLogin.html');
});

pageRoute.get('/recommendation/:agentId?/:clientId?', function (req, res) {
    sockets.GetClient(req.query.agentId, req.query.clientId);

    res.sendfile(__dirname + '/public/index.html');
});
app.use('/', pageRoute);

server.listen(port);
console.log('Listening to port ' + port);
console.log(process.env);
module.exports = server