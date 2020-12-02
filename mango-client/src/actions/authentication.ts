import {
    AUTH_FAILURE,
    AUTH_LOGIN,
    AUTH_SUCCESS
} from "./ActionTypes";
import {User} from "../models";
import Axios from "axios";

// thunk 함수
export function loginRequest(user: User) {
    return (dispatch: any) => {

        // 로그인 시도를 알리는 action 객체를 리듀서에 전달
        dispatch(login());
        return Axios.post('/login', user).then((response) => {
            console.log(response.data)
            dispatch(loginSuccess(user.username));
        }).catch((error) => {
            dispatch(loginFailure());
        })
    }
}

// 액션 생성자 함수. 액션 객체 리턴
export function login() {
    return {
        type: AUTH_LOGIN
    }
}

export function loginSuccess(username: string) {
    return {
        type: AUTH_SUCCESS,
        username
    }
}

export function loginFailure() {
    return {
        type: AUTH_FAILURE
    }
}