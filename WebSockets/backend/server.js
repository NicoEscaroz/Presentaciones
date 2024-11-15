const WebSocket = require("ws");

const server = new WebSocket.Server({ port: 8080, host: "0.0.0.0" });

server.on("connection", (socket) => {
  console.log("Client connected");
  socket.on("message", (msg) => {
    console.log(`Received message: ${msg}`);
    server.clients.forEach((client) => {
      if (client.readyState === WebSocket.OPEN) {
        client.send(msg);
      }
    });
  });

  socket.on("close", () => {
    console.log("Client disconnected");
  });
});

console.log("Server running on port 8080");
