import React from "react";
import "normalize.css";
import "@blueprintjs/core/lib/css/blueprint.css";
import "@blueprintjs/icons/lib/css/blueprint-icons.css";

import {
    Button,
    FormGroup,
    InputGroup,
    Intent
} from "@blueprintjs/core";
import { handleStringChange } from "./changeHandler";
import { test } from "../api/login.t";

const LoginForm = () => {

    // useState hook: [state 상태, setState 상태 변이 함수], 리턴 데이터에 대한 타입을 자동으로 추론하기 때문에 generic 생략 가능.
    const [userId, setUserId] = React.useState<string>("");
    const [password, setPassword] = React.useState<string>("");

    const [isLogin, setIsLogin] = React.useState<boolean>(false);

    // intent Type: NONE, PRIMANRY, SUCCESS, WARNING, DANGER
    const [userIdIntent, setUserIdIntent] = React.useState<Intent>(Intent.NONE);
    const [passwordIntent, setPasswordIntent] = React.useState<Intent>(Intent.NONE);

    // 입력된 userId 값을 state에 적용
    const onSetUserId = handleStringChange(userId => setUserId(userId));

    // 입력된 password 값을 state에 적용
    const onSetPassword = handleStringChange(password => setPassword(password));

    // 로그인 버튼 클릭 이벤트
    const onClickLoginButton = () => {
        console.log('Try login..')
        if (!userId || !password) {
            return
        } else {
            test();
        }
    }

    // TODO: Intent props 추가
    // const onUserIdIntentChange = handleStringChange(intent => setUserIdIntent(intent));
    // const onPasswordIntentChange = handleStringChange(intent => setPasswordIntent(intent));
    return (
        <FormGroup className="login-form">
            {/* 유저 아이디 */}
            <InputGroup
                id="userId"
                className="bp3-input-group margin-bottom-10"
                placeholder="Mango-Talk ID"
                type="text"
                intent={ userIdIntent }
                value={ userId }
                onChange={ onSetUserId }
            />
            {/* 유저 패스워드 */}
            <InputGroup
                id="password"
                className="bp3-input-group margin-bottom-10"
                placeholder="Password"
                type="password"
                intent={ passwordIntent }
                value={ password }
                onChange={ onSetPassword }
            />
            {/* 로그인 버튼 */}
            <Button
                id="btn-login"
                className="margin-bottom-10"
                fill={ true }
                onClick={ onClickLoginButton }
            >로그인</Button>
        </FormGroup>
    )
}

export default LoginForm;