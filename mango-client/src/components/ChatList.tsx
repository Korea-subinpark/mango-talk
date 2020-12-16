import React from "react";

import "normalize.css";
import "@blueprintjs/core/lib/css/blueprint.css";
import "@blueprintjs/icons/lib/css/blueprint-icons.css";
import {Card, Elevation} from "@blueprintjs/core";
import NavTop from "./NavTop";
import {doSubscribe} from "../api/chat.t";
import {useSelector} from "react-redux";


function ChatList({isAuthenticated} : any) {
    const stompClient = useSelector((state: any) => state.chat.stompClient);

    doSubscribe(stompClient);
    return (
        // TODO - authenticated should be true
        <>
            { isAuthenticated ? (
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