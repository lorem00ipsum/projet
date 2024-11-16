const express = require('express');
const http = require('http');
const socketIo = require('socket.io');

const app = express();
const server = http.createServer(app);
const io = socketIo(server, {
    cors: {
        origin: '*', // Permet à n'importe quelle origine de se connecter
        methods: ['GET', 'POST']
    },
    transports: ['polling'] // Nécessaire pour Vercel
});

const PORT = process.env.PORT || 3000;

io.on('connection', (socket) => {
    console.log('Un utilisateur est connecté');

    // Écoute de l'événement 'message'
    socket.on('message', (message) => {
        console.log('Message reçu :', message);
        io.emit('message', message); // Diffuse le message à tous les utilisateurs connectés
    });

    socket.on('disconnect', () => {
        console.log('Un utilisateur s\'est déconnecté');
    });
});

server.listen(PORT, () => {
    console.log(`Serveur en ligne sur le port ${PORT}`);
});
