import Axios from "axios";
import { User } from "../models";

const instance = Axios.create({
    baseURL: 'url',
    timeout: 2000
});

// FIXME: 가데이터. 수정 필요.
let store: User[] = [
    { password: '1234', email: 'kwj@naver.com' },
    { password: '1234', email: 'asd' },
]

const login = (user: User) => instance.post('/login', user).then((response) => {
    console.log(response.data)
})


// test module
const test = ({ email, password }: User) => {
    const user = store.find(
        (user) => user.email === email && user.password === password
    )
    if (user === undefined) throw new Error()
    return { email: user.email, authenticated: true }
}
export {
    login, test
}