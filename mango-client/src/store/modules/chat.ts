// action type
const CREATE_SOCKET = 'chat/CREATE_SOCKET';
const CREATE_CHAT_OBJECT =  'chat/CREATE_CHAT_OBJECT';

// module state
const initialState = {
    stompClient: {},
    chatObject: {}
};

// 소켓 생성
export const setStompClient = (stompClient: any) => ({
    type: CREATE_SOCKET,
    payload: stompClient
});

// chat object 생성
export const setChatObject = (chatObject: any) => ({
    type: CREATE_CHAT_OBJECT,
    payload: chatObject
});

export default function reducer(state = initialState, action: any) {
    switch(action.type) {
        case CREATE_SOCKET:
            state.stompClient = action.payload;
            return { stompClient: action.payload };
        case CREATE_CHAT_OBJECT:
            state.chatObject = action.payload;
            return { chatObject: action.payload };
        default:
            return state;
    }
}
