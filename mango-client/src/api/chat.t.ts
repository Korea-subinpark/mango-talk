var wsUri = "ws://localhost:3003/";
let websocket: WebSocket;

function onOpen(evt: any) {
    doSend("WebSocket open");
}

function onClose(evt: any) {
    console.log("DISCONNECTED");
}

// echo
function onMessage(evt: any) {
    console.log("RESPONSE: " + evt.data);
}

function onError(evt: any) {
    console.log("ERROR: " + evt.data);
}

function doSend(message: any) {
    console.log("SENT: " + message);
    websocket.send(message);
}
// WebSocket init - event binding
const openChat = (() => {
    websocket = new WebSocket(wsUri);
    websocket.onopen = function(evt) { onOpen(evt) };
    websocket.onclose = function(evt) { onClose(evt) };
    websocket.onmessage = function(evt) { onMessage(evt) };
    websocket.onerror = function(evt) { onError(evt) };
});

export {
    doSend, openChat, onMessage
}
