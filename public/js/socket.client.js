var user = {};
user.From = getRandomId();

var conPorps = {
    //reconnection: false,
    reconnectionAttempts: 5,
    autoConnect: false
};
var socket = io('http://localhost:3000', conPorps);

document.getElementById("fromUsr").innerHTML = user.From;
socket.on('connect', function () {
    alert("connected server");
});

$("#connectUser").click(function () {
    //user.To = $('#touser').val();
    socket.open();
    socket.emit('connectUser', user);
    return false;
});
socket.on('disconnect', function () {
    alert("disconnected server");
});
socket.on('chat message', function (msg) {
    $('#messages').append($('<li>').text(msg));
});

$("#sendmsg").click(function () {
    var paylod = {
        To: $('#touser').val(),
        Message: $('#m').val()
    }
    socket.emit('chat message', paylod);
    $('#m').val('');
    $('#messages').append($('<li>').text(paylod.Message));
    return false;
});

function getRandomId() {
    return Math.floor(Math.random() * 770);
}