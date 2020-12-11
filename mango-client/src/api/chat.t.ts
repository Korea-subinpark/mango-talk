import Axios from "axios";
import SockJS from "sockjs-client";
import {Stomp} from "@stomp/stompjs";

const instance = Axios.create({
    baseURL: 'http://localhost:8080/mango/v1',
    timeout: 2000
});

const SOCKET_URL = "http://localhost:8080/stomp";

var sockJS: WebSocket | null = null;
var username = 'subin';
var chatRoomId = 0;

const openConnection = () => {
    return Stomp.over(new SockJS(SOCKET_URL));
}

const openChat = ((stompClient: any, chatRoomId: any) => {
    stompClient.connect({}, function () {
        // TODO
    });
});
function checkSocketNull(stompClient: WebSocket) {
    console.log(stompClient)
    return stompClient ? true : false;
}
function doSubscribe(stompClient: any) {
    console.log(stompClient)
    stompClient.subscribe('/topic/chat/', function (message: any) {
        const content = JSON.parse(message.body).content;
        console.log("메시지: " + content)
        return content;
    });
}
function doSend(message: any, stompClient: any) {
    const content = message;
    const request = {
        senderName: username,
        content: content,
        chatRoomId: chatRoomId
    }
    stompClient.connect({}, function () {
        stompClient.send("/app/chat", {}, JSON.stringify(request));
    })
}
// FIXME chat list 모두 불러오기(url)
const getChatList = ({ id }: any) => instance.post('/topic/chat', { id }).then((response) => {
    return { chatList: response.data }
})

export {
    openConnection, checkSocketNull, doSubscribe, doSend, openChat, getChatList
}
