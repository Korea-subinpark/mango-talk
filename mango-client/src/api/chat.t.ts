import Axios from "axios";
import SockJS from "sockjs-client";
import {Stomp, Versions, Client} from "@stomp/stompjs";

const instance = Axios.create({
    baseURL: "http://localhost:8080/mango/v1",
    timeout: 2000
});

const SOCKET_URL = "http://localhost:8080/stomp";
const CHAT_LIST_URL = "http://localhost:8080/mango/v1/chatRoom";
const SUBSCRIBE_URL = "http://localhost:8080/topic/chat";

const openConnection = () => {
    // Client 인스턴스 생성
    const client = new Client();
    // Client의 factory 정의
    // @ts-ignore
    client.webSocketFactory = function () {
        const sock = new SockJS(SOCKET_URL);
        console.log(sock)
        return sock;
    };
    client.onConnect = function () {}
    client.activate();
    console.log("is connected? " + client.connected)
    return client;
}

const openChat = ((client: any, chatRoomId: any) => {
    client.onConnect = function (frame: any) {
        // TODO
    };
});

function getCookie(name: string){
    const reg = new RegExp(name + "=([^;]*)");
    const result = reg.test(document.cookie) ? unescape(RegExp.$1) : "";
    // console.log("cookie: " + result);
    return result;
}

function checkSocketNull(stompClient: WebSocket) {
    console.log(stompClient)
    return stompClient ? true : false;
}
const tempRoomList = (token: string): any => {
    Axios.post("http://localhost:8080/mango/v1/chatRoom", {
        "userNames": ["admin", "kim"]
    }, {
        headers: {
            "Authorization": `Bearer ${token}`
        }
    });
}
const getChatList = (token: string) => {
    return instance.get(CHAT_LIST_URL, {
        headers: {
            "Authorization": `Bearer ${token}`
        }
    });
}

const doSubscribe = (client: any, roomList: any) => {
    const stomp = client.stompClient;
    console.log(stomp)
    stomp.onConnect = function () {
        for (let roomNum of roomList) {
            stomp.subscribe(`SUBSCRIBE_URL/${roomNum}`, function (message: any) {
                const content = JSON.parse(message.body).content;
                console.log("메시지: " + content)
                return content;
            });
        }
    }
}

function doSend(message: any, username: any, roomId: any, client: any) {
    // Client의 factory 정의
    // @ts-ignore
    const content = message;
    const request = {
        senderName: username,
        content: content,
        chatRoomId: roomId
    };
    client.subscribe(`SUBSCRIBE_URL/${roomId}`, function (message: any) {
        const content = JSON.parse(message.body).content;
        console.log("메시지: " + content)
        return content;
    });
    console.log(client.connected)
    client.publish({destination: "/app/chat", body: JSON.stringify(request)});

}

export {
    openConnection, checkSocketNull, doSubscribe, doSend, openChat, getChatList, tempRoomList, getCookie
}
