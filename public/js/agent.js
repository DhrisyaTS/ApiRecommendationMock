

function field_focus(field, email) {
    if (field.value == email) {
        field.value = '';
    }
}
function field_blur(field, email) {
    if (field.value == '') {
        field.value = email;
    }
}
$(document).ready(function () {
    $('.box').hide().fadeIn(1000);
});

$('#connectButtonId').click(function (event) {
    event.preventDefault();
    window.open("http://localhost:8080", '',
        'width=450,height=600,scrollbars=yes,menubar=yes,status=yes,resizable=no,directories=false,location=false,left=0,top=0'
    );
});

$('#sendButtonId').click(function () {
    var clientId = document.getElementById("clientId").value;
    var clientMessageId = document.getElementById("clientMessageId").value;

    $.post("/api/processMessage",
                {
            clientId: clientId,
            message:  clientMessageId
               },
                function  (data,  status)  {
                  //alert(data.message);  
                });



    //     $.ajax({
    //     url : "/ajaxRoute",
    //     type: "POST",
    //     dataType:'json',
    //     data : appId,
    //     success: function(data){
    //         console.log(data.msg); // 'OK'
    //     },
    // });


});