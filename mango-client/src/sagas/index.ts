import { takeEvery } from 'redux-saga/effects'
import SockJS from "sockjs-client";
import {Stomp} from "@stomp/stompjs";

export default function* rootSaga() {
    yield takeEvery('AUTH_SUCCESS', loginSuccessHandler);
}

function* loginSuccessHandler() {
    console.log('redux-saga login success');

    const sockJS = new SockJS("/stomp");
    const stompClient = Stomp.over(sockJS);

    var request = {
        senderName: 'admin',
        content: 'hello',
        chatRoomId: 1
    }

    stompClient.connect({}, function () {
        stompClient.send("/app/chat", {}, JSON.stringify(request));
    })
}

