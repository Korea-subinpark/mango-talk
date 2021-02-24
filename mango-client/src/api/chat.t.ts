import Axios from "axios";
import {Client} from "@stomp/stompjs";
import SockJS from "sockjs-client";
import {useDispatch} from "react-redux";
import {loginSuccess, logout} from "../store/modules/login";
import {setStompClient} from "../store/modules/chat";

const instance = Axios.create({
    baseURL: "http://localhost:8080/mango/v1",
    timeout: 2000
});

const SOCKET_URL = "http://localhost:8080/stomp";
const ROOM_LIST_URL = "http://localhost:8080/mango/v1/chatRoom";
const SUBSCRIBE_URL = "/topic/chat/";

const initSocketConnection = () => {
    // 0. Client 인스턴스 생성
    const client = new Client({
        connectHeaders: {
            "Authorization": `Bearer ${getCookie("token")}`
        }
    });
    // 1. beforeConnect 정의
    client.beforeConnect = function () {
        // STOMP broker에 대한 연결 전에 호출됨.
        // 다른 서비스로부터 비동기적으로 인증 정보(credentials), 액세스 토큰(access token) 등을 안정적으로 가져오는(fetch) 데 사용할 수 있음.
        console.log("[Processing beforeConnect...]");
    }
    // 2-1. 연결 설정 - brokerURL과 webSocketFactory 중 하나를 설정함
    // STOMP broker가 웹소켓을 지원하는 경우 brokerURL을 설정, 여기서는 http로 정의했으므로 webSocketFactory 사용

    // @ts-ignore
    client.webSocketFactory = function () {
        const sock = new SockJS(SOCKET_URL);
        console.log(sock)
        return sock;
    };

    // 2-2. 콘솔에 디버그 로그를 남김
    client.debug = function(debugLog) {
        console.log(debugLog);
    };
    const callback = function (message: any) {
        // chat
        console.log("subscribe callback run")
        const tx = client.begin();
        console.log(tx)
        console.log(JSON.parse(message.body));
        message.ack({ transaction: tx.id });
        tx.commit();
    };
    // 3. STOMP 브로커에 대한 모든 연결에 대해 호출
    client.onConnect = function () {
        console.log(`[Processing onConnect... connect state: ${client.connected}]`);
        // for (let roomNum of roomList) {
        client.subscribe(SUBSCRIBE_URL + "1", callback, {"ack": "client"});
        // }
    }

    // 4-1. STOMP 브로커와의 연결이 끊길 때마다 호출(오류에 의한 disconnect는 제외)
    client.onWebSocketClose = function (closeEvent) {
        console.log("[Processing onWebSocketClose...]");
        console.log(closeEvent)
    }

    // 4-2. 웹소켓에서 오류 발생 시 호출
    client.onWebSocketError = function (event) {
        console.log(`[{Processing onWebSocketError...]`)
        console.log(event)
        console.log()
    }

    // 5. 브로커와의 연결을 초기화
    client.activate();

    return client;
}

function getCookie(name: string){
    const reg = new RegExp(name + "=([^;]*)");
    const result = reg.test(document.cookie) ? unescape(RegExp.$1) : "";
    return result;
}

const setChatRoom = (token: string): any => {
    Axios.post("http://localhost:8080/mango/v1/chatRoom", {
        "userNames": ["admin", "kim"]
    }, {
        headers: {
            "Authorization": `Bearer ${token}`
        }
    });
}

const getChatList = (chat: any) => {
    // return insta
}
const getChatRoomList = (token: string) => {
    return instance.get(ROOM_LIST_URL, {
        headers: {
            "Authorization": `Bearer ${token}`
        }
    });
}

const doSubscribeForChatList = (client: any, roomList: any) => {
    if (!client) {
        return;
    }

}

function doPublish(message: any, roomId: any, client: any) {

    const request = {
        content: message,
        chatRoomId: roomId
    };

    client.publish({destination: "/app/chat", body: JSON.stringify(request)});
}

export {
    initSocketConnection, doSubscribeForChatList, doPublish, getChatRoomList, setChatRoom, getCookie
}
