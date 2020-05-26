const buttonConnect = document.getElementById("buttonConnect");
const inputServerAddress = document.getElementById("inputServerAddress");
const messages = document.getElementById("messages");
const instructions = document.getElementById("instructions");

const sleep = async (ms) =>
  new Promise((res) => {
    setTimeout(() => res(), ms);
  });

function appendMessage(text) {
  const p = document.createElement("P");
  p.appendChild(document.createTextNode(text));

  messages.append(p);
}

buttonConnect.onclick = async () => {
  const serverAddress = inputServerAddress.value;
  messages.innerHTML = "";
  instructions.parentElement.removeChild(instructions);

  appendMessage(`Connecting to ${serverAddress}`);

  try {
    let retries = 0;
    while (retries < 50) {
      appendMessage(`establishing connection... retry #${retries}`);
      await runSession(serverAddress);
      await sleep(1500);
      retries++;
    }

    appendMessage("Reached maximum retries, giving up.");
  } catch (e) {
    appendMessage(e.message || e);
  }
};

async function runSession(address) {
  const ws = new WebSocket(address);

  ws.addEventListener("open", () => {
    appendMessage("connected to server");
  });

  ws.addEventListener("message", ({ data }) => {
    console.log(data);
    appendMessage(data);
  });

  return new Promise((resolve) => {
    ws.addEventListener("close", () => {
      appendMessage("Connection lost with server.");
      resolve();
    });
  });
}
