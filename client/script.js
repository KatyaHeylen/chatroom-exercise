let socket = io.connect();
console.log('hi from the script.js file');

document.getElementById('message').addEventListener('keyup', function(event) {
    if (event.code === 'Enter') {
        event.preventDefault();
        document.getElementById('send').click();
    }
});

document.getElementById('message').addEventListener('keyup', function(event) {
    if (event.code === 'Enter' && event.code === 'ControlLeft') {
        event.preventDefault();
        document.getElementById('private').click();
    }
});


document.getElementById("send").addEventListener('click', () => {
    let message = document.getElementById('message').value;
    socket.emit('sendToAll', (message));
});

socket.on('displayMessage', (message) => {
    let target = document.getElementById('target');
    target.innerHTML += '<br>'+ message;
});
document.getElementById("private").addEventListener('click', () => {
    let message = document.getElementById('message').value;
    socket.emit('sendToMe', (message));
});
