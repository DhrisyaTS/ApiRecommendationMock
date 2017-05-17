var sockets = require('../socket/socket');
var userData = require('../user');
var jwt = require('jsonwebtoken');

var impObject = {
    'jwtSecret': 'mockcontactcenter'
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

