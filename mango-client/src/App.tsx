import "./App.css";
import React, { useState, useEffect } from 'react';
import {Link, Route, Switch, BrowserRouter as Router} from 'react-router-dom';

import { authLogin, test } from "./api/login.t";
import RouteAuthenticatedCheck from "./containers/RouteAuthenticatedCheck";
import RouteAuthorizedCheck from "./containers/RouteAuthorizedCheck";

import UserInfo from './components/UserInfo';
import LoginForm from "./components/LoginForm";
import LogoutButton from './components/LogoutButton';

import {User} from "./models";
import {AuthUser} from "./types";

interface AppProps {
    version: string;
    contributor: string[];
}
function App(props: AppProps) {
    const contributors = ['woojoong.kim', 'subin.park'];
    const version = '1.0.0';

    // user는 User타입의 객체 혹은 null타입
    const [user, setUser] = useState<AuthUser | null>(null);
    // 권한 체크
    const authenticated = user != null;
    // 로그인: user state의 setter를 통해 상태 갱신하는 함수
    const login = ({ email, password }: User) => {
        const authUser: any = authLogin({ email, password });
        authUser.then((response: any) => {
           setUser({ email, authenticated });
        });
    }
    // 로그아웃: user state를 null로 갱신하는 함수
    const logout = () => setUser(null);

    return (
        // ReactRouter로 Browser 내장 API와 연동할 수 있다. ex> 즐겨찾기, 뒤로가기, 새로고침, url 주소로 이동
        <Router>
            <div className="App">
                <header className="App-header">
                    <Link to="/userInfo">
                        <button>userInfo</button>
                    </Link>
                    {
                        authenticated ? (
                            <LogoutButton logout={logout} />
                        ) : (
                            <Link to="/login">
                                <button>Login</button>
                            </Link>
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
                                <LoginForm authenticated={authenticated} login={login} {...props} />
                            )}
                        />
                        {/*
                            Route 컴포넌트를 wrapping한 컴포넌트.
                            authenticated일 때 유저 정보로 이동.
                        */}
                        <RouteAuthenticatedCheck
                            authenticated={authenticated}
                            path="/userInfo"
                            render={(props: any) => <UserInfo user={user} {...props} />}
                        />
                    </Switch>
                </main>
                <footer className="App-footer">
                    <p className="version">{ props.version }</p>
                </footer>
            </div>
        </Router>
    );
}

export default App;
