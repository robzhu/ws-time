const WebSocket = require("ws");
const name = require("./randomName");
const server = require("http").createServer();
const express = require("express");
const app = express();

console.log(`This server is named: ${name}`);

// serve files from the public directory
server.on("request", app.use(express.static("public")));

// tell the WebSocket server to use the same HTTP server
const wss = new WebSocket.Server({
  server,
});

wss.on("connection", function connection(ws, req) {
  const clientId = req.url.replace("/?id=", "");
  console.log(`Client connected with ID: ${clientId}`);

  let n = 0;
  const interval = setInterval(() => {
    ws.send(`${name}: you have been connected for ${n++} seconds`);
  }, 1000);

  ws.on("close", () => {
    clearInterval(interval);
  });
});

const port = process.env.PORT || 80;
server.listen(port, () => {
  console.log(`Server listening on port ${port}`);
});
