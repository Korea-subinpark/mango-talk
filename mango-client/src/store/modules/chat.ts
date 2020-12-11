// action type
const CREATE_SOCKET = 'chat/CREATE_SOCKET';
const CONNECT = 'chat/CONNECT';

// action method
// export const createSocket = () => ({ type: CREATE_SOCKET });
// export const connect = () => ({ type: CONNECT });

// module state
const initialState = {
    username: '',
    isConn: false,
    stompClient: null,
    roomList: []
};

// 소켓 생성
export const setStompClient = (stompClient: any) => ({
    type: CREATE_SOCKET,
    payload: stompClient
});

// subscribe ready

// connect chat
// const openChat = ((state: any, username: string) => {
//     state.stompClient.connect({}, function () {
//         console.log("open chat !!")
//         // TODO openChat action
//         return { username, isConn: true };
//     });
// });

export default function reducer(state = initialState, action: any) {
    switch(action.type) {
        case CREATE_SOCKET:
            return { stompClient: action.payload.stompClient };
        case CONNECT:
            return;
        default:
            return state;
    }
}
// TODO redux-actions(lib)