const socket = io('https://votre-backend-url'); // Remplacez par l'URL de votre serveur

// Fonction pour envoyer un message
function sendMessage(event) {
    if (event.key === "Enter" && event.target.value.trim() !== "") {
        const message = event.target.value;
        socket.emit('message', message);
        event.target.value = "";
    }
}

// Réception des messages
socket.on('message', (message) => {
    const chatBox = document.getElementById('chat-box');
    const newMessage = document.createElement('p');
    newMessage.textContent = message;
    chatBox.appendChild(newMessage);
    chatBox.scrollTop = chatBox.scrollHeight; // Auto-scroll vers le bas
});
