import Axios from "axios";
import { User } from "../models";

const instance = Axios.create({
    baseURL: 'http://localhost:8080/mango/v1',
    timeout: 2000
});

// cookie type
interface cookie {
    token: string;
}

const authLogin = ({ username, password }: User) => instance.post('/auth/login', { username: username, password}).then((response) => {
    console.log(response.data)
    setCookie(response.data.token);
    return { username, authenticated: true }
})

const authSignup = ({ username, password }: User) => instance.post('/auth/user', { username: username, password}).then((response) => {
    console.log(response.data)
    setCookie(response.data.token);
    return { username, authenticated: true }
})
function setCookie(token: cookie) {
    document.cookie = 'token=' + token;
}

export {
    authLogin, authSignup
}