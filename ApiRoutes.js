
var fs = require("fs");

module.exports = function (express, app) { 
    var apiRouts = express.Router();
    fs.readdirSync("./Api").forEach(function (file) {

        if (file.substr(-3) == '.js') {
            var route = require("./Api/" + file);
            if (route.controller) {
                route.controller(apiRouts);
            }
        }
    });
    app.use('/api', apiRouts);
}