import Axios from "axios";
import SockJS from "sockjs-client";
import {Stomp} from "@stomp/stompjs";

const instance = Axios.create({
    baseURL: "http://localhost:8080/mango/v1",
    timeout: 2000
});

const SOCKET_URL = "http://localhost:8080/stomp";
const CHAT_LIST_URL = "http://localhost:8080/mango/v1/user/chatRoom";
const SUBSCRIBE_URL = "http://localhost:8080/topic/chat";

var sockJS: WebSocket | null = null;
var username = 'subin';
var chatRoomId = 0;

const openConnection = () => {
    // use a WebSocket
    client.webSocketFactory = function () {
        return new WebSocket("wss://broker.329broker.com:15674/ws");
    };

    // Typical usage with SockJS
    // client.webSocketFactory = function () {
    //     return new SockJS("http://broker.329broker.com/stomp");
    // };
    const sock = Stomp.over(new SockJS(SOCKET_URL));
    console.log("-----------------------------------------------")
    console.log(sock)
    console.log("-----------------------------------------------")
    return sock;
}

const openChat = ((stompClient: any, chatRoomId: any) => {
    stompClient.connect({}, function () {
        // TODO
    });
});

function getCookie(name: string){
    const reg = new RegExp(name + "=([^;]*)");
    const result = reg.test(document.cookie) ? unescape(RegExp.$1) : "";
    console.log("cookie: " + result);
    return result;
}

function checkSocketNull(stompClient: WebSocket) {
    console.log(stompClient)
    return stompClient ? true : false;
}

const getChatList = (token: string): any => {
    const array = [1, 2, 3, 4];
    instance.get(CHAT_LIST_URL, {
        headers: {
            "Authorization": `Bearer ${token}`
        }
    }).then((response: any) => {
        console.log("then");
    }).catch(e => {
        console.log("catch");
    });
    return array;
}
async function doSubscribe(stompClient: any) {
    const roomList = await getChatList(getCookie("token"));
    console.log(roomList)
    for (let roomNum of roomList) {
        console.log(stompClient)

        stompClient.subscribe(`SUBSCRIBE_URL/${roomNum}`, function (message: any) {
            const content = JSON.parse(message.body).content;
            console.log("메시지: " + content)
            return content;
        });
    }
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

export {
    openConnection, checkSocketNull, doSubscribe, doSend, openChat, getChatList
}
