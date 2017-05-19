var sockets = require('../socket/socket');
var jwt = require('jsonwebtoken');
var Client = require('node-rest-client').Client;
var client = new Client();

var impObject = {
    'jwtSecret': 'mockcontactcenter'
};
var authenticatedToken;
module.exports.controller = function (apiRouts) {
    apiRouts.post("/sendRecommendation", function (req, resp) {
        var skt = sockets.GetSocket(req.body.AgentId);
        var token = req.query.token;
        if (token) {
            jwt.verify(token, impObject.jwtSecret, function (err, decoded) {
                if (err) {
                    return resp.json({ success: false, message: 'Failed to authenticate token.' });
                    console.log('error');
                } else {
                    // if everything is good, save to request for use in other routes
                    req.decoded = decoded;
                    if (req.body && req.body.AgentId && skt) {
                        skt.emit('chat message', req.body.Message);
                        resp.json({ message: 'Success. Message Sent' });
                    } else {
                        resp.json({ message: 'Error. Message Not Sent!' });
                    }
                }
            });
        } else {
            return resp.status(403).send({
                success: false,
                message: 'No token provided.'
            });
        }
    });

    apiRouts.post("/processMessage", function (req, resp) {
        var arg = {
            result: { "message": req.body.message, "clientId": req.body.clientId, "connectId": req.body.clientId },
            headers: { "Content-Type": "application/json"}
        };

        client.post("https://nlp-mock-api.herokuapp.com/processMessage", arg, function (result, response) {
            console.log(response.statusCode);
            if (response.statusCode == 401) {
                var args = {
                    data: { "appId": 1 },
                    headers: { "Content-Type": "application/json" }
                };
                client.post("https://nlp-mock-api.herokuapp.com/authenticate", args, function (data, res) {
                     console.log(data["token"]);
                    var arg1 = {
                        data: { "message": req.body.message, "clientId": req.body.clientId, "connectId": req.body.clientId },
                        headers: { "Content-Type": "application/json", "Authorization": data["token"] }
                    };
                    client.post("https://nlp-mock-api.herokuapp.com/processMessage", arg1, function (authReq, authres) {
                        console.log(authReq);
                    });

                });
            }
        });

        resp.json({ message: 'Test' });
    });


}

