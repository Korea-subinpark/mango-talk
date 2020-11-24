import {User} from "../models";
import Axios from "axios";

const instance = Axios.create({
    baseURL: 'http://localhost:8080/mango/v1',
    timeout: 2000
});

var wsUri = "ws://localhost:8080/";
let websocket: WebSocket;

function onOpen(evt: any) {
    doSend("WebSocket open");
}

function onClose(evt: any) {
    console.log("DISCONNECTED");
}

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

// FIXME chat list 모두 불러오기(url)
const getChatList = ({ id }: any) => instance.post('/topic/chat', { id }).then((response) => {
    console.log(response.data)
    return { chatList: response.data }
})

export {
    doSend, openChat, onMessage, getChatList
}
