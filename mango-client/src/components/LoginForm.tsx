import React, { useState } from "react"
import { Redirect } from "react-router-dom"

import 'normalize.css';
import '@blueprintjs/core/lib/css/blueprint.css';
import '@blueprintjs/icons/lib/css/blueprint-icons.css';
import {
    Button,
    FormGroup,
    InputGroup
} from '@blueprintjs/core';
import { handleStringChange } from './changeHandler';


function LoginForm({ authenticated, login, location } : any) {

    // state에 email, password 생성
    const [email, setEmail] = useState("")
    const [password, setPassword] = useState("")

    // 값이 입력될 때마다 state에 적용
    const onSetEmail = handleStringChange(email => setEmail(email));
    const onSetPassword = handleStringChange(password => setPassword(password));

    const onClickLoginButton = () => {
        try {
            login({ email, password })
        } catch (e) {
            alert("로그인에 실패했습니다.")
            setEmail(email)
            setPassword("")
        }
    }

    const { from } = location.state || { from: { pathname: "/" } }
    if (authenticated) return <Redirect to={from} />

    return (
        // Fragments 컴포넌트 React.Fragment
        // DOM에 별도의 노드를 추가하지 않고 자식 컴포넌트를 그룹화할 수 있음.
        <>
            <h1>Login</h1>
            <FormGroup className='login-form'>
                {/* 유저 이메일 */}
                <InputGroup
                    id='email'
                    className='bp3-input-group margin-bottom-10'
                    placeholder='Mango-Talk ID'
                    type='text'
                    value={ email }
                    onChange={ onSetEmail }
                />
                {/* 유저 패스워드 */}
                <InputGroup
                    id='password'
                    className='bp3-input-group margin-bottom-10'
                    placeholder='Password'
                    type='password'
                    value={ password }
                    onChange={ onSetPassword }
                />
                {/* 로그인 버튼 */}
                <Button
                    id='btn-login'
                    className='margin-bottom-10'
                    fill={ true }
                    onClick={ onClickLoginButton }
                >로그인</Button>

            </FormGroup>
        </>
    )
}

export default LoginForm