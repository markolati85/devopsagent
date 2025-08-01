function sendCommand() {
  const input = document.getElementById('command-input');
  const chatBox = document.getElementById('chat-box');
  const command = input.value.trim();
  if (!command) return;
  const userMessage = document.createElement('div');
  userMessage.textContent = "🧑 " + command;
  chatBox.appendChild(userMessage);
  input.value = "";
  fetch('/api/command', {
    method: 'POST',
    headers: {'Content-Type': 'application/json'},
    body: JSON.stringify({ prompt: command })
  })
  .then(res => res.json())
  .then(data => {
    const botResponse = document.createElement('div');
    botResponse.textContent = "🤖 " + data.response;
    chatBox.appendChild(botResponse);
    chatBox.scrollTop = chatBox.scrollHeight;
  })
  .catch(() => {
    const error = document.createElement('div');
    error.textContent = "❌ Failed to reach backend.";
    chatBox.appendChild(error);
  });
}