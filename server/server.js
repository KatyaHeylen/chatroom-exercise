const express = require('express');
const http = require('http');

const app = express();
const clientPath = `${__dirname}/../client`;
app.use(express.static(clientPath));
const server = http.createServer(app);
const io = require('socket.io')(server);
let names = [];

server.listen(8080, () => {
    console.log("server running on " + 8080);
});

let counter = 0;

io.on('connection', (socket) => {
    counter++;
    console.log(counter + ' connected');

    socket.on('sendToAll', (name, message) => {
        console.log(name, message);
        io.emit("displayMessage", name, message);
    });
    socket.on('sendToMe', (name, message) => {
        console.log(name, message);
        socket.emit("displayMessage", name, message);
    });
    socket.on('login', (name) => {
        names.push(name);
        socket.emit("displayList", names);
    })
});
