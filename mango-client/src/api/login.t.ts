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
    const token = 'token=' + response.data.token;
    document.cookie = token;
    return { username, token, isAuthenticated: true }
})

const authSignup = ({ username, password }: User) => instance.post('/auth/user', { username: username, password}).then((response) => {
    console.log(response.data)
    return { username, isAuthenticated: true }
})

export {
    authLogin, authSignup
}