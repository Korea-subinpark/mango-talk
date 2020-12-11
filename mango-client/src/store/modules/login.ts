// action type
const LOGIN_SUCCESS = 'login/LOGIN_SUCCESS';
const INPUT_USERNAME = 'login/INPUT_USERNAME';
const INPUT_PASSWORD = 'login/INPUT_PASSWORD';
const LOGOUT = 'LOGOUT';

interface UserInfo {
    username: string,
    token: string
}

// login success -> username 저장
export const loginSuccess = (userInfo: UserInfo) => ({
    type: LOGIN_SUCCESS,
    payload: userInfo
});
export const logout = () => ({
    type: LOGOUT
});
export const setUsername = (username: string) => ({
    type: INPUT_USERNAME,
    payload: username
});
export const setPassword = (password: string) => ({
    type: INPUT_PASSWORD,
    payload: password
});

// 초기 state
const initialState = {
    username: '',
    password: '',
    token: '',
    isAuthenticated: false
};

function cookieRemove() {
    const date = new Date();
    date.setDate(date.getDate() - 1);

    let willCookie = "";
    willCookie += "token=;";
    willCookie += "Expires=" + date.toUTCString();

    document.cookie = willCookie;
};

export default function reducer(state = initialState, action: any) {
    switch(action.type) {
        case LOGIN_SUCCESS:
            return { username: action.payload.username, token: action.payload.token, password: '', isAuthenticated: true };;
        case LOGOUT:
            cookieRemove();
            console.log("안됨?")
            return { username: "", token: "", isAuthenticated: false };
        case INPUT_USERNAME:
            return { username: action.payload, password: state.password };
        case INPUT_PASSWORD:
            return { username: state.username, password: action.payload };
        default:
            return state; // 아무 일도 일어나지 않으면 현재 상태를 그대로 반환
    }
}