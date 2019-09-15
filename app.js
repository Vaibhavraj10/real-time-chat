const express = require('express');
const app = express();


app.set('view engine', 'ejs');

app.use(express.static('public'));

app.get('/', function(req,res){
   res.render('index');
});

server = app.listen(3000, function(){
    console.log("Server started on Port 3000");   
});


const io = require("socket.io")(server);

io.on('connection', function (socket){
    console.log("New user connected!");
   
    socket.username = "Anonymous";

    socket.on('change_username', function(data){
        socket.username = data.username;
    });

    socket.on("new_message", function(data){
        io.sockets.emit('new_message', {message: data.message, username: socket.username});
    });

    /*socket.on('typing', function(data){
        console.log("Somebody is typing");
        
        socket.broadcast.emit('typing', {username: socket.username});
    });*/
    socket.on('typing', (data) => {
    	socket.broadcast.emit('typing', {username : socket.username})
    })

});
