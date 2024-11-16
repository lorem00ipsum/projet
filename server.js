const express = require('express');
const http = require('http');
const socketIo = require('socket.io');

const app = express();
const server = http.createServer(app);
const io = socketIo(server);

app.use(express.static('public')); // Servir les fichiers frontend

// Gestion des messages
io.on('connection', (socket) => {
    console.log('Un utilisateur est connecté');
    
    // Recevoir un message
    socket.on('message', (message) => {
        console.log('Message reçu: ' + message);
        io.emit('message', message); // Émettre à tous les utilisateurs connectés
    });

    // Déconnexion
    socket.on('disconnect', () => {
        console.log('Utilisateur déconnecté');
    });
});

// Démarrer le serveur
server.listen(3000, () => {
    console.log('Serveur en écoute sur le port 3000');
});
