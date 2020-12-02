import SockJS from "sockjs-client";
import {Stomp} from "@stomp/stompjs";

// action type
const CREATE_SOCKET = 'chat/CREATE_SOCKET';
const CONNECT = 'chat/CONNECT';

// action method
export const createSocket = () => ({ type: CREATE_SOCKET });
export const connect = () => ({ type: CONNECT });

// module state
const initialState = {
    username: '',
    isConn: false,
    socket: null,
    stompClient: null,
    roomList: []
};

// 소켓 생성 함수
const createSocketStomp = ((username: string) => {
    if (!username) {
        return { username: '', isConn: false };
    }
    const socket = new SockJS("http://localhost:8080/stomp");
    const stompClient = Stomp.over(socket);
    return { username, isConn: true, socket, stompClient };
});

// connect 함수
const openChat = ((state: any, username: string) => {
    state.stompClient.connect({}, function () {
        console.log("open chat !!")
        // TODO openChat action
        return { username, isConn: true };
    });
});

export default function reducer(state = initialState, action: any) {
    switch(action.type) {
        case CREATE_SOCKET:
            return createSocketStomp(state.username);
            return
        case CONNECT:
            return openChat(state, state.username);
        default:
            return state;
    }
}
// TODO redux-actions(lib)