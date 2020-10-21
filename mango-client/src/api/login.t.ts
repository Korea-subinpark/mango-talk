import Axios from "axios";
import { User } from "../models";

const instance = Axios.create({
    baseURL: 'http://localhost:8080/mango/v1',
    timeout: 2000
});

// FIXME: 가데이터. 수정 필요.
let store: User[] = [
    { password: '1234', email: 'kwj@naver.com' },
    { password: '1234', email: 'asd' },
]
// cookie type
interface cookie {
    token: string;
}

const authLogin = ({ email, password }: User) => instance.post('/auth/login', { username: email, password}).then((response) => {
    console.log(response.data)
    setCookie(response.data.token);
    return { email, authenticated: true }
})

function setCookie(token: cookie) {
    document.cookie = 'token=' + token;
}

// test module
const test = ({ email, password }: User) => {
    const user = store.find(
        (user) => user.email === email && user.password === password
    )
    if (user === undefined) throw new Error()
    return { email: user.email, authenticated: true }
}
export {
    authLogin, test
}