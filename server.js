
// call the packages we need
var express = require('express');        // call express
var app = express();                 // define our app using express
var bodyParser = require('body-parser');
var agentData = require('./agent');
var fs = require("fs");

var server = require('http').createServer(app);
var io = require('socket.io')(server);
app.use(express.static(__dirname + '/public'));

// configure app to use bodyParser()
// this will let us get the data from a POST
app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());

var port = process.env.PORT || 8080;        // set our port
// ROUTES FOR OUR API
// =============================================================================
var router = express.Router();              // get an instance of the express Router
var users = {}
console.log('hi');
// middleware to use for all requests
router.use(function (req, res, next) {
    // do logging
    console.log('Something is happening.');
    next(); // make sure we go to the next routes and don't stop here
});

io.on('connection', function (socket) {
    console.log(socket.id);
    socket.on('new message', function (data) {
        // we tell the client to execute 'new message'
        // socket.broadcast.emit('new message', {
        //   username: socket.username,
        //   message: data
        // });
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

router.route('/test')

    // create a bear (accessed at POST http://localhost:8080/api/bears)
    .post(function (req, res) {
        fs.readFile(__dirname + "/" + "agent.json", 'utf8', function (err, data) {
            data = JSON.parse(data);
            //data["user4"] = user["user4"];
            //console.log( data.agent1 );
            //res.end( JSON.stringify(data.agent1));
            let rslt = req.body;

            res.end(JSON.stringify(rslt));


        });
        // res.json({ message: 'test created!' });

    });


// test route to make sure everything is working (accessed at GET http://localhost:8080/api)
router.get('/', function (req, res) {
    res.json({ message: 'welcome to our api!' });
});
router.post('/sendSuggestion', function (req, res) {
    console.log(users["'" +req.body.AgentId+"'"]);
    if (req.body && req.body.AgentId && users[req.body.AgentId]) {
        console.log(req.body.AgentId);
        users[req.body.AgentId].emit('chat message', req.body.Message);
    }
   
    res.json({ message: 'Success. Message Sent' });
});

// more routes for our API will happen here

// REGISTER OUR ROUTES -------------------------------
// all of our routes will be prefixed with /api
app.use('/api', router);

// START THE SERVER
// =============================================================================
server.listen(port);
console.log('Magic happens on port ' + port);
