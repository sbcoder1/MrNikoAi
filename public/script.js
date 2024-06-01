document.getElementById('send-btn').addEventListener('click', sendMessage);

function sendMessage() {
    const userInput = document.getElementById('user-input').value;
    if (userInput.trim() === '') return;

    appendMessage('User', userInput);
    document.getElementById('user-input').value = '';

    fetch('/api/chat', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
        },
        body: JSON.stringify({ message: userInput }),
    })
    .then(response => response.json())
    .then(data => appendMessage('ChatGPT', data.reply))
    .catch(error => console.error('Error:', error));
}

function appendMessage(sender, message) {
    const output = document.getElementById('output');
    const messageElement = document.createElement('div');
    messageElement.innerHTML = `<strong>${sender}:</strong> ${message}`;
    output.appendChild(messageElement);
    output.scrollTop = output.scrollHeight;
}

