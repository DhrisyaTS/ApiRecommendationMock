var user = {};
user.From = getRandomId();

console.log('check');
$(function() {
  var $window = $(window);
  var $usernameInput = $('.usernameInput'); 
  console.log('ABC');
});
var conPorps = {
    reconnectionAttempts: 5,
    autoConnect: false
}; 
var socket = io('http://localhost:8080', conPorps);

$("#connectUser").click(function () {
    socket.open();
    socket.emit('connectUser', user);
    $("#agentId").text(user.From);
    return false;
});

socket.on('connect', function () {
    alert("connected server");
});

socket.on('chat message', function (msg) {
    $( ".recomendations" ).append( "<p>"+msg+"</p>" );
});

socket.on('disconnect', function () {
    alert("disconnected server");
});

function getRandomId() {
    return Math.floor(Math.random() * 770);
}