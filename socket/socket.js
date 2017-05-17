var Sockets = (function (params) {
    var clients = {};
    var GetSocket = function (userId) {
        if (clients[userId]) {
            return clients[userId];
        }
        else {
            return null;
        }
    }
    var AddSocket = function (socket,userId) {
        if (socket && userId) {
            if (!clients[userId]) {
                clients[userId] = socket;
            }
            return clients[userId];
        }
        else {
            return null;
        }
    }
    return {
        GetSocket,
        AddSocket
    }
})();

module.exports = Sockets;