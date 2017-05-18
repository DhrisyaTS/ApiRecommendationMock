var userData = require('../user');
var jwt = require('jsonwebtoken');

var impObject = {
    'jwtSecret': 'mockcontactcenter',
    'payloadSecret':'agentpayload'
};

module.exports.controller = function (apiRouts) {
    apiRouts.post("/tokenAuthentication", function (req, resp) {
        if (userData.user1.name != req.body.name) {
            resp.json({ success: false, message: 'Authentication failed. User not found.' });
        }
        if (userData.user1.password != req.body.password) {
            resp.json({ success: false, message: 'Authentication failed. Wrong password.' });
        }
        var accessToken = jwt.sign(
            { name: req.body.name },
            impObject.payloadSecret,
            { expiresIn: '48h' }
        );
        resp.json({
            success: true,
            message: 'Enjoy your token!',
            token: accessToken
        });
    });

    apiRouts.post("/acceptChat", function (req, resp) {
        if (!req.body.AgentId) {
            resp.json({ success: false, message: 'Not a valid Agent' });
        }
        if (req.body.ClientId) {
            resp.json({ success: false, message: 'Not a valid Client.' });
        }
        var accessToken = jwt.sign(
            { AgentId: req.body.AgentId, ClientId: req.body.ClientId},
            impObject.jwtSecret,
            { expiresIn: '1h' }
        );
        resp.json({
            success: true,
            message: 'Enjoy your token!',
            token: accessToken
        });
    });
}

