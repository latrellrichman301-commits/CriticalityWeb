const express = require('express');
const http = require('http');
const { Server } = require('socket.io');

const app = express();
const server = http.createServer(app);
const io = new Server(server, {
    cors: { origin: "*" }
});

const players = {};

io.on('connection', (socket) => {
    console.log('Player connected:', socket.id);

    // Handle movement
    socket.on('move', (data) => {
        players[socket.id] = data;
        data.id = socket.id;
        socket.broadcast.emit('playerMoved', data);
    });

    // Handle chat
    socket.on('chatMessage', (data) => {
        io.emit('chatMessage', { name: data.name, text: data.text });
    });

    socket.on('disconnect', () => {
        console.log('Player disconnected:', socket.id);
        delete players[socket.id];
        io.emit('playerDisconnected', socket.id);
    });
});

server.listen(3000, () => {
    console.log('Criticality Server running on port 3000');
});