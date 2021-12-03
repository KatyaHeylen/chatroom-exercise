let socket = io.connect();

let name = prompt("What is your nickname?", "");
socket.emit('login', name);

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
    socket.emit('sendToAll', name, message);
    document.getElementById("message").value = "";
});

socket.on('displayMessage', (name, message) => {
    let today = new Date();
    let date = today.getFullYear()+'-'+(today.getMonth()+1)+'-'+today.getDate();
    let time = today.getHours() + ":" + today.getMinutes();
    let dayTime = date + ": " + time;
    let target = document.getElementById('target');
    target.innerHTML += '<br>' + dayTime + " " + name +': ' + message;
});
document.getElementById("private").addEventListener('click', () => {
    let message = document.getElementById('message').value;
    socket.emit('sendToMe', name, message);
});

socket.on('displayList', (names) => {
    document.getElementById("list").innerHTML = '';
    names.forEach(name => {
        document.getElementById("list").innerHTML += "<br>" + name;
    })
})






