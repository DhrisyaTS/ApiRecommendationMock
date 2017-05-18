var Sockets = (function (params) {
    this.clients = [];//[{clientId:xxx,agentId:yyx,socket:{..},connectId:xxx},..]
    var GetSocket = function (user) {
        var client = addGetClient(user.clientId);
        if (client.socket) {
            return client;
        }
        else {
            return null;
        }
    }
    var AddSocket = function (socket,user) {
        if (socket && user) {
            var client = GetClient(user.agentId, user.clientId);
            if (client) { 
                client.socket = socket;
            }
            return client;
        }
        else {
            return null;
        }
    }
    
    var GetClient = function (agentId, clientId) {
        var client = addGetClient(clientId);
        
        if (client) {
            client.agentId = agentId;
        }
        return client;
    }
    var addGetClient = function (clientId) {
        var client = findInArrya(clients, { clientId: clientId }, 'clientId');
        if (!client) {
            client = { clientId: clientId};
            clients.push(client);
        }
        return client;
    }

    function findInArrya(array,toFind,propName) {
        for (var index = 0; index < array.length; index++) {
            if (toFind[propName] === array[index][propName]) {
                return array[index];
            } 
        }
        return null;
    }
    return {
        GetSocket,
        AddSocket,
        GetClient
    }
})();

module.exports = Sockets;