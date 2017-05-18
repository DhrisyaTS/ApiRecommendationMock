var sockets = require('../socket/socket');
var jwt = require('jsonwebtoken');


var impObject = {
    'jwtSecret': 'mockcontactcenter'
};
module.exports.controller = function (apiRouts) {

    apiRouts.post("/sendRecommendation", function (req, resp) {
        var token = req.query.token;
        if (token) {
            jwt.verify(token, impObject.jwtSecret, function (err, decoded) {
                if (err) {
                    console.log('error');
                    return resp.json({ success: false, message: 'Failed to authenticate token.' });
                } else {
                    // if everything is good, save to request for use in other routes
                    req.decoded = decoded;
                    if (req.body && req.body.agentId && req.body.clientId) {
                       var client = sockets.GetSocket(req.body);
                        if (client && client.socket) {
                            client.socket.emit('chat message', req.body.Message);
                            resp.json({ message: 'Success. Message Sent' });
                        }
                      
                    } else{
                        resp.json({ message: 'Message Senting failed no open socket available' });
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
}

