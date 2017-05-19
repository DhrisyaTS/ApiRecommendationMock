
var ajaxPost = function (params) {
    $.post("demo_test_post.asp",
        {
            name: "Donald Duck",
            city: "Duckburg"
        },
        function (data, status) {
            alert("Data: " + data + "\nStatus: " + status);
        });
}

$('#connectClient').click(function (event) {
    event.preventDefault();

    $.post("/api/connectUser",
        {
            AgentId: $("#agentId").val(),
            ClientId: $("#clientId").val()
        },
        function (data, status) {
            //alert(data.token + " and " + data.message);
            window.open("http://localhost:8080/recommendation?agentId=" + data.AgentId + "&clientId=" + data.ClientId, '',
                'width=450,height=600,scrollbars=yes,menubar=yes,' +
                'status=yes,resizable=yes,directories=false,location=false,left=0,top=0'
            );
        });    
});