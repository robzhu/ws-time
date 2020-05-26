const WebSocket = require("ws");
const shortid = require("shortid");
const { sleep } = require("./sleep");

const clientId = shortid.generate();
console.log(`using clientId: ${clientId}`);
const ServerEndpoint = "ws://localhost:8080";

(async function run() {
  let retries = 0;
  while (retries < 50) {
    console.log("establishing connection...");
    await runSession();
    await sleep(1500);
    retries++;
  }

  console.log("Reached maximum retries, giving up.");
})();

async function runSession() {
  const ws = new WebSocket(`${ServerEndpoint}?id=${clientId}`);

  ws.on("message", function incoming(data) {
    console.log(data);
  });

  return new Promise((resolve) => {
    ws.on("close", () => {
      console.log("Connection lost with server.");
      resolve();
    });
  });
}
