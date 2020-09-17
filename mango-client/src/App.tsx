import "./App.css";
import React, { useEffect } from "react";

import LoginForm from "./components/LoginForm";

// App의 인자인 props의 타입 인터페이스
interface AppProps {
    version: string;
    contributor: string[];
}

const App = (props: AppProps) => {

    return (
        <div className="App">
            <header className="App-header">
                <img src="/images/logo512.png" className="App-logo" alt="logo" />
            </header>
            <div id="input-container">
                <LoginForm />
            </div>
            <footer className="App-footer">
                <p className="version">{ props.version }</p>
            </footer>
        </div>
    );
};
export default App;
