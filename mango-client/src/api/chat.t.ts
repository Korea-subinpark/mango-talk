import Axios from "axios";
import SockJS from "sockjs-client";
import {Stomp} from "@stomp/stompjs";

const instance = Axios.create({
    baseURL: 'http://localhost:8080/mango/v1',
    timeout: 2000
});

const SOCKET_URL = "http://localhost:8080/stomp";

const openConnection = () => {
    return Stomp.over(new SockJS(SOCKET_URL));
}
// TODO room list 받기
const getRoomList = () => {

}
// @ts-ignore
function checkSocketNull({ stompClient }) {
    console.log(stompClient);
    return stompClient ? true : false;
}
// TODO room list 반복 돌면서 subscribe
// @ts-ignore
function doSubscribe({ stompClient }) {
    console.log(stompClient)
    stompClient.subscribe('/topic/chat/1', function (message: any) {
        const content = JSON.parse(message.body).content;
        console.log("메시지: " + content)
        return content;
    });
}
function doSend(message: any, stompClient: any) {
    const content = message;
    const request = {
        senderName: 'subin',
        content: content,
        chatRoomId: 1
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
    openConnection, checkSocketNull, doSubscribe, doSend, getChatList
}
