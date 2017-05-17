var sockets = require('../socket/socket');

module.exports.controller = function (apiRouts) {
    apiRouts.post("/sendRecommendation", function (req, resp) { 
        var skt = sockets.GetSocket(req.body.AgentId);
        if (req.body && req.body.AgentId && skt) {
            skt.emit('chat message', req.body.Message);
            resp.json({ message: 'Success. Message Sent'});
        } else {
            resp.json({ message: 'Error. Message Not Sent!'});
        }
    });
}

