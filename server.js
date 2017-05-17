
// call the packages we need
var express = require('express');        // call express
var app = express();                 // define our app using express
var bodyParser = require('body-parser');
var userData = require('./user');
var fs = require("fs");

var server = require('http').createServer(app);
var io = require('socket.io')(server);
var jwt = require('jsonwebtoken');

var sockets = require('./socket/socket');
app.use(express.static(__dirname + '/public'));

var impObject = {
    'jwtSecret': 'mockcontactcenter'
};

app.set('jwtSecret', impObject.jwtSecret);

// configure app to use bodyParser()
// this will let us get the data from a POST
app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());

var port = process.env.PORT || 8080;        // set our port
var router = express.Router();              // get an instance of the express Router

io.on('connection', function (socket) {
    console.log(socket.id);
    socket.on('connectUser', function (user) {
        sockets.AddSocket(socket,user.From)
    });
    socket.on('disconnect', function () {
        console.log("client disconnected");
    });
});

// test route to make sure everything is working (accessed at GET http://localhost:8080/api)
///Loads all available routings
require("./ApiRoutes")(express, app);

router.get('/', function (req, res) {
    res.json({ message: 'welcome to our api!' });
});

router.get('/users', function (req, res) {
    //console.log(userData.user1);
    res.json(userData.user1);
});

router.post('/authenticate', function (req, res) {

    // find the user

    if (userData.user1.name != req.body.name) {
        res.json({ success: false, message: 'Authentication failed. User not found.' });
    }
    if (userData.user1.password != req.body.password) {
        res.json({ success: false, message: 'Authentication failed. Wrong password.' });
    }
    var accessToken = jwt.sign(
        {name:req.body.name}, 
        impObject.jwtSecret, 
        {expiresIn: '1h' }
    );
    res.json({
          success: true,
          message: 'Enjoy your token!',
          token: accessToken
        });

});

app.use('/api', router);

server.listen(port);
console.log('Listening to port ' + port);
module.exports = server