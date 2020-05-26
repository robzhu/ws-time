const WebSocket = require("ws");
const name = require("./randomName");

const wss = new WebSocket.Server({
  port: 8080,
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
