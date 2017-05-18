function getUrlVars() {
    var vars = {}, hash;
    var hashes = window.location.href.slice(window.location.href.indexOf('?') + 1).split('&');
    for (var i = 0; i < hashes.length; i++) {
        hash = hashes[i].split('=');
        vars[hash[0]] = hash[1];
    }
    return vars;
}
var user = getUrlVars();//window.location.href.substr(window.location.href.lastIndexOf('/') + 1);

var connectSocket = function () {
    if (user.agentId && user.clientId) {
        socket.open();
        socket.emit('connectUser', user);
        $("#agentId").text('Client: ' + user.clientId + '. Agent Id: ' + user.agentId);
        return false;
    }
}
console.log('check');
$(function() {
  var $window = $(window);
  var $usernameInput = $('.usernameInput'); 
});
var conPorps = {
    reconnectionAttempts: 5,
    autoConnect: false
}; 
var socket = io('http://localhost:8080', conPorps);

// $("#connectUser").click(function () {
//     socket.open();
//     socket.emit('connectUser', user);
//     $("#agentId").text(user.From);
//     return false;
// });

socket.on('connect', function () {
    alert("connected server");
});

socket.on('chat message', function (msg) {
    $(".recomendations").append("<div class=\"bubble me\">" + msg +"</div>" );
});

socket.on('disconnect', function () {
    alert("disconnected server");
});

function getRandomId() {
    return Math.floor(Math.random() * 770);
}
connectSocket();
