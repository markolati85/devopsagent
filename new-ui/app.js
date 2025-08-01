function sendCommand() {
  const input = document.getElementById("command-input").value.trim();
  const chat = document.getElementById("chat-box");

  if (!input) return;

  const userMsg = document.createElement("p");
  userMsg.className = "user-msg";
  userMsg.textContent = `🧑‍💻 You: ${input}`;
  chat.appendChild(userMsg);

  const botMsg = document.createElement("p");
  botMsg.className = "bot-msg";
  botMsg.textContent = "🤖 Thinking...";
  chat.appendChild(botMsg);

  // Simulated response
  setTimeout(() => {
    botMsg.textContent = `✅ Command "${input}" successfully sent to the Nexus agent!`;
  }, 1200);

  // Optional: clear input
  document.getElementById("command-input").value = "";
}
