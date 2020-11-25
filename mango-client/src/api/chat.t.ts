import {User} from "../models";
import Axios from "axios";
import SockJS from "sockjs-client";
import {Stomp} from "@stomp/stompjs";

const instance = Axios.create({
    baseURL: 'http://localhost:8080/mango/v1',
    timeout: 2000
});

var sockJS: WebSocket | null = null;
var stompClient: any = null;
var username = 'subin';
var chatRoomId = 0;

const openChat = ((username: string) => {
    username = username;
    sockJS = new SockJS("http://localhost:8080/stomp");
    stompClient = Stomp.over(sockJS);

    stompClient.connect({}, function () {
        console.log("open chat !!")
        if (username === 'admin' || username === 'subin') {
            chatRoomId = 1;
        }
    });
});
function checkSocketNull() {
    return sockJS ? true : false;
}
function doSubscribe(chatRoomId: any) {
    var url = '/topic/chat/' + chatRoomId;
    if(stompClient == null) {
        return;
    }
    stompClient.subscribe(url, function (message: any) {
        var content = JSON.parse(message.body).content;
        console.log("메시지: " + content)
        return content;
    });
}
function doSend(message: any) {
    const content = message;

    // FIXME 전역 객체 확인
    sockJS = new SockJS("http://localhost:8080/stomp");
    stompClient = Stomp.over(sockJS);

    if (username === 'admin' || username === 'subin') {
        chatRoomId = 1;
    }

    var request = {
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
    console.log(response.data)
    return { chatList: response.data }
})

export {
    checkSocketNull, doSubscribe, doSend, openChat, getChatList
}
