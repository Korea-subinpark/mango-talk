import "./App.css";
import React, {useEffect} from "react";
import {Link, Route, Switch, BrowserRouter as Router} from "react-router-dom";

import {authLogin} from "./api/login.t";
import RouteAuthenticatedCheck from "./containers/RouteAuthenticatedCheck";

import UserInfo from "./components/UserInfo";
import LoginFormContainer from "./containers/LoginFormContainer";
import LogoutButton from "./components/LogoutButton";

import {User} from "./models";
import ContentsContainer from "./components/ContentsContainer";
import ChatRoom from "./components/ChatRoom";
import {initSocketConnection} from "./api/chat.t";

import {Provider, useDispatch, useSelector} from "react-redux";
import store from "./store";
import {loginSuccess, logout} from "./store/modules/login";
import {setStompClient} from "./store/modules/chat";

interface AppProps {
    version: string;
    contributor: string[];
}
function getCookie(name: string){
    const reg = new RegExp(name + "=([^;]*)");
    const result = reg.test(document.cookie) ? unescape(RegExp.$1) : "";
    return result;
}

    /* state getter */
function App(props: AppProps) {
    //login
    // TODO Auth check detail(cookie check, state check...)
    let isAuthenticated = getCookie("token") !== "";
    let username = useSelector((state: any) => state.login.username);
    /* state dispatcher */
    const dispatch = useDispatch();
    // login
    const handleLoginSuccess = (userInfo: any) => dispatch(loginSuccess(userInfo));
    const handleLogout = () => dispatch(logout());
    // chat
    const handleCreateSocket = (stompClient: any) => dispatch(setStompClient(stompClient));

    useEffect(() => {
        if (isAuthenticated) {
            handleCreateSocket(initSocketConnection());
        }
    });

    // 로그인
    const login = ({ username, password }: User) => {
        const authUser: any = authLogin({ username, password });
        authUser.then((response: any) => {
            handleLoginSuccess(response);
        });
    }

    return (
        <Provider store={store}>
            {/* ReactRouter로 Browser 내장 API와 연동할 수 있다. ex> 즐겨찾기, 뒤로가기, 새로고침, url 주소로 이동*/}
            <Router>
                <div className="App">
                    <header className="App-header">
                        <Link to="/userInfo">
                            <button>userInfo</button>
                        </Link>
                        {
                            isAuthenticated ? (
                                <>
                                <Link to="/menu">
                                    <button>menu open</button>
                                </Link>
                                <LogoutButton logout={handleLogout} />
                                </>
                            ) : (
                                <>
                                    <Link to="/login">
                                        <button>Login</button>
                                    </Link>
                                    <Link to="/user">
                                        <button>Signup</button>
                                    </Link>
                                </>
                            )
                        }
                    </header>
                    <hr />
                    <main>
                        {/* Switch는 하위 라우터 중 하나를 선택 */}
                        <Switch>
                            {/*
                                Route 컴포넌트는 현재 url에 맞게 보여줄 컴포넌트를 지정함.
                                Route 컴포넌트의 props
                                 - path: url 정의
                                 - component: url 요청에 대해 어떤 컴포넌트를 그릴지 정의
                                 - render: url 요청에 대해 컴포넌트를 그릴 함수를 정의. render 함수의 props는 3가지 정보를 가짐 [history, location, match].
                                 주의) component가 render보다 우선순위가 높음. 동시 사용 불가.
                            */}
                            <Route
                                path="/login"
                                render={
                                    props => (
                                    <LoginFormContainer isAuthenticated={isAuthenticated} login={login} {...props} />
                                )}
                            />
                            <Route
                                path="/menu"
                                render={
                                    props => (
                                        <ContentsContainer isAuthenticated={isAuthenticated} {...props} />
                                    )
                                }
                            />
                            <Route
                                path="/chat/user/:roomId"
                                render={
                                    props => (
                                        <ChatRoom />
                                    )
                                }
                            />
                            {/*
                                Route 컴포넌트를 wrapping한 컴포넌트.
                                authenticated일 때 유저 정보로 이동.
                            */}
                            <RouteAuthenticatedCheck
                                isAuthenticated={isAuthenticated}
                                path="/userInfo"
                                render={(props: any) => <UserInfo user={username} {...props} />}
                            />
                        </Switch>
                    </main>
                    <footer className="App-footer">
                        <p className="version">{ props.version }</p>
                    </footer>
                </div>
            </Router>
        </Provider>
    );
}

export default App;
