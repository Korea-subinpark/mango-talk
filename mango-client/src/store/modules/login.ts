// action type
import {User} from "../../models";

const LOGIN_SUCCESS = 'login/LOGIN_SUCCESS';
const INPUT_USERNAME = 'login/INPUT_USERNAME';
const INPUT_PASSWORD = 'login/INPUT_PASSWORD';

// login success -> username 저장
export const loginSuccess = (username: string) => ({
    type: LOGIN_SUCCESS,
    payload: username
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
    authenticated: false
};

export default function reducer(state = initialState, action: any) {
    switch(action.type) {
        case LOGIN_SUCCESS:
            return { username: action.payload, password: '', authenticated: true };
        case INPUT_USERNAME:
            return { username: action.payload, password: state.password };
        case INPUT_PASSWORD:
            return { username: state.username, password: action.payload };
        default:
            return state; // 아무 일도 일어나지 않으면 현재 상태를 그대로 반환
    }
}