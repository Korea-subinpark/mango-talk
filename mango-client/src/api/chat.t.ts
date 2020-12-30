import Axios from "axios";
import SockJS from "sockjs-client";
import {Stomp, Versions, Client} from "@stomp/stompjs";

const instance = Axios.create({
    baseURL: "http://localhost:8080/mango/v1",
    timeout: 2000
});

const SOCKET_URL = "http://localhost:8080/stomp";
const CHAT_LIST_URL = "http://localhost:8080/mango/v1/user/chatRoom";
const SUBSCRIBE_URL = "http://localhost:8080/topic/chat";

var username = 'subin';
var chatRoomId = 0;

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
    console.log("cookie: " + result);
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
const getChatList = (token: string): any => {
    console.log(token)
    const array = [1, 2, 3, 4];
    instance.get(CHAT_LIST_URL, {
        headers: {
            "Authorization": `Bearer ${token}`
        }
    }).then(({ data }: any) => {
        console.log(data)
        console.log("then");
    }).catch(e => {
        console.log("catch");
    });
    return array;
}
async function doSubscribe(client: any) {
    await tempRoomList(getCookie("token"));
    const roomList = await getChatList(getCookie("token"));
    console.log(roomList)
    client.onConnect = function (frame: any) {
        for (let roomNum of roomList) {
        console.log(roomNum)
            client.subscribe(`SUBSCRIBE_URL/${roomNum}`, function (message: any) {
                const content = JSON.parse(message.body).content;
                console.log("메시지: " + content)
                return content;
            });
        }
    };

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
    openConnection, checkSocketNull, doSubscribe, doSend, openChat, getChatList, tempRoomList
}
