import React from "react";
import LoginForm from "components/LoginForm";
import { handleStringChange } from "../components/changeHandler";
import {Redirect} from "react-router-dom";
import {setUsername, setPassword} from "store/modules/login";
import { useSelector, useDispatch } from "react-redux";


function LoginFormContainer({isAuthenticated, login, location} : any) {

    // state getter
    const username = useSelector((state: any) => state.login.username);
    const password = useSelector((state: any) => state.login.password);

    // state dispatcher
    const dispatch = useDispatch();

    // dispatch(action)
    const handleInputUsername = (username: string) => dispatch(setUsername(username));
    const handleInputPassword = (password: string) => dispatch(setPassword(password));

    const { from } = location.state || { from: { pathname: "/" } };
    if (isAuthenticated) return <Redirect to={from} />;

    // input text change handler
    const handleUsername = handleStringChange(username => handleInputUsername(username));
    const handlePassword = handleStringChange(password => handleInputPassword(password));

    const onClickLoginButton = () => {
        try {
            login({ username, password });
        } catch (e) {
            console.warn(e);
            alert("로그인에 실패했습니다.");
        }

    }

    return (
        <LoginForm
            login={login}
            onSetUsername={handleUsername}
            onSetPassword={handlePassword}
            onClickLoginButton={onClickLoginButton}
        />
    );
}

export default LoginFormContainer;