var express = require('express');
var app = express();
//var ws = require('./ws');
var http = require('http').createServer(app);
var io = require('socket.io')(http); 
app.use(express.static('public'));
var port = process.env.PORT || 3000;

http.listen(port,() => {
    console.log('Server running at port `+port');
});

// app.get('/', (req,res) => {
// //    res.send('<h1>Hello world</h1>');
//     res.sendFile(__dirname + '/public/index.html');
// });

io.on('connection', newConnection);

function newConnection(socket){
    console.log('new connection: ' + socket.id);


        //new connected player ID to be added to our players object: - SL
        players[socket.id] = {
            playerID: socket.id, //store socket ID of the connected player - SL

            //anything else needs to be in this object??
        }



//    socket.on('person', personMsg);
    socket.on('mouse', mouseMsg);

    function mouseMsg(data){
        socket.broadcast.emit('mouse', data);
        console.log(data);
    }
}



//Adding players -server - SL

let players = {}; //object to keep track of players

//send the message about any object being detected to the client
socket.emit('detectedPlayer', players);

//update all other players of the new player
socket.broadcast.emit('newPlayer', players[socket.id]);


//listen for player when they disconnect 
socket.on('disconnect', function() {
    console.log('player disconnected: ' + socket.id);
  });


//emit a message to all players to remove that disconnected player
//io.emit('disconnect', socket.id);
