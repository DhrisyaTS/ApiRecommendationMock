var sockets = require('../socket/socket');
var jwt = require('jsonwebtoken');


var impObject = {
    'jwtSecret': 'mockcontactcenter'
};
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
}

