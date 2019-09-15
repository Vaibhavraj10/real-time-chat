$(function(){
    var socket = io.connect("http://localhost:3000");
     
    var message = $("#message");
    var username = $("#username");
    var send_message = $("#send_message");
    var send_username = $("#send_username");
    var chatroom = $("#chatroom");
    var feedback = $("#feedback");
    
    message.keyup(function(event){
        if(event.keyCode === 13) {
            send_message.click();
        }
    })

    send_message.click(function(){

        socket.emit('new_message', {message: message.val()});
    });

    socket.on("new_message", function(data){
        console.log(data);
        feedback.hide();
        chatroom.append("<p class='message'>" + data.username+ ": " + data.message + "</p>");
    });


    send_username.click(function(){
        console.log(username.val());
        socket.emit("change_username", {username: username.val()});
    });

    /*message.bind("keypress", function(){
        socket.emit('typing');
    });

    socket.on("typing", function(data){
        console.log("Typing acion identified");
        feedback.innerHTML("<p><i>" + data.username + " is typing a message... " + "</i></p>");
    });
    */
    
   message.bind("keypress", () => {
    socket.emit('typing');
})

//Listen on typing
socket.on('typing', (data) => {
    feedback.html("<p><i>" + data.username + " is typing a message..." + "</i></p>");
    feedback.show();
})


});