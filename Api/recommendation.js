var sockets = require('../socket/socket');

module.exports.controller = function (apiRouts) {
    apiRouts.post("/sendRecommendation", function (req, resp) { 
        if (req.body && req.body.agentId && req.body.clientId) {
            var client = sockets.GetSocket(req.body);
            if (client && client.socket) {
                client.socket.emit('chat message', req.body.Message);
                resp.json({ message: 'Success. Message Sent' });
            }
            else{
                resp.json({ message: 'Message Senting failed no open socket available' });
            }
        } else {
            resp.json({ message: 'Error. Message Not Sent!'});
        }
    });
}

