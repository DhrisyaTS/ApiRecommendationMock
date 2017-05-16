
// call the packages we need
var express = require('express');        // call express
var app = express();                 // define our app using express
var bodyParser = require('body-parser');
var userData = require('./user');
var fs = require("fs");

var server = require('http').createServer(app);
var io = require('socket.io')(server);
var jwt = require('jsonwebtoken');
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
var users = {}

io.on('connection', function (socket) {
    console.log(socket.id);
    socket.on('new message', function (data) {
        if (data && users && users[data]) {
            users[data].emit('chat message', data);
        }

    });
    socket.on('connectUser', function (user) {
        addClient(socket, user);
    });
    socket.on('disconnect', function () {
        console.log("client disconnected");
    });
});

function addClient(client, user) {
    if (!users[user.From]) {
        users[user.From] = client;
    }
}

// test route to make sure everything is working (accessed at GET http://localhost:8080/api)
router.get('/', function (req, res) {
    res.json({ message: 'welcome to our api!' });
});
router.post('/sendSuggestion', function (req, res) {
    if (req.body && req.body.AgentId && users[req.body.AgentId]) {
        users[req.body.AgentId].emit('chat message', req.body.Message);
    }

    res.json({ message: 'Success. Message Sent' });
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