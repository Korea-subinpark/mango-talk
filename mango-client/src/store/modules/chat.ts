// action type
const CREATE_SOCKET = 'chat/CREATE_SOCKET';

// module state
const initialState = {
    stompClient: {}
};

// 소켓 생성
export const setStompClient = (stompClient: any) => ({
    type: CREATE_SOCKET,
    payload: stompClient
});

export default function reducer(state = initialState, action: any) {
    switch(action.type) {
        case CREATE_SOCKET:
            state.stompClient = action.payload;
            return { stompClient: action.payload };
        default:
            return state;
    }
}
