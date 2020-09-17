import Axios from 'axios';

const instance = Axios.create({
    baseURL: 'url',
    timeout: 2000
});

const login = () => instance.get('/login').then((response) => {
    console.log(response.data)
    // TODO: login 처리 로직
})

const test = () => {
    setTimeout(() => {
        alert("Hello Test")
    }, 1500)
}

export {
    login, test
}