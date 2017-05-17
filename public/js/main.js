var user = {};
user.From = getRandomId();

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
    $(".recomendations").append("<div class=\"bubble me\">" + msg +"</div>" );
});

socket.on('disconnect', function () {
    alert("disconnected server");
});

function getRandomId() {
    return Math.floor(Math.random() * 770);
}
function openPopup() {
    window.open("https://www.w3schools.com", '',
        'width=450,height=600,scrollbars=yes,menubar=yes,status=yes,resizable=yes,directories=false,location=false,left=0,top=0');
}