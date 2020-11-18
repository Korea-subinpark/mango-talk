import React from "react"

import 'normalize.css';
import '@blueprintjs/core/lib/css/blueprint.css';
import '@blueprintjs/icons/lib/css/blueprint-icons.css';
import {
    Card,
    Elevation
} from '@blueprintjs/core';
import NavTop from "./NavTop";


function ChatList({ authenticated } : any) {
    console.log("authenticated : " +  authenticated);


    return (
        // Fragments 컴포넌트 React.Fragment
        // DOM에 별도의 노드를 추가하지 않고 자식 컴포넌트를 그룹화할 수 있음.
        // TODO - authenticated should be true
        <>
            { authenticated ? (
                <>
                    <NavTop />
                    <Card
                        className="list-body"
                        interactive={false}
                        elevation={Elevation.TWO}
                    >
                    </Card>
                </>
                ) : (
                    <p>로그인 후 시도해주세요.</p>
                )
            }
        </>
    )
}

export default ChatList