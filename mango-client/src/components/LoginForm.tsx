import React from "react"

import 'normalize.css';
import '@blueprintjs/core/lib/css/blueprint.css';
import '@blueprintjs/icons/lib/css/blueprint-icons.css';
import {
    Button,
    FormGroup,
    InputGroup
} from '@blueprintjs/core';


function LoginForm({ username, password, onSetUsername, onSetPassword, onClickLoginButton  } : any) {

    return (
        <>
            <h1>Login</h1>
            <FormGroup className='login-form'>
                {/* 유저 이메일 */}
                <InputGroup
                    id='username'
                    className='bp3-input-group margin-bottom-10'
                    placeholder='Mango-Talk ID'
                    type='text'
                    value={ username }
                    onChange={ onSetUsername }
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