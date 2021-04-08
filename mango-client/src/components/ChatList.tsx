import React, {useEffect, useState} from "react";

import "normalize.css";
import "@blueprintjs/core/lib/css/blueprint.css";
import "@blueprintjs/icons/lib/css/blueprint-icons.css";
import ChatThumb from "./ChatThumb";
import {BrowserRouter, Link} from "react-router-dom";

function ChatList({list}: any) {
    console.log(list)
    const keyList = Object.keys(list);
    const components: JSX.Element[] = [];

    keyList.map((roomNo: any, i: any) => {
        // const {username, ellipsis, lastReceivedDate} = list[roomNo];
        const username = list[roomNo].username || "";
        const ellipsis = list[roomNo].ellipsis || "";
        const lastReceivedDate = list[roomNo].lastReceivedDate || "";
        components.push(
            <Link key={`link-key-${i}`} to={`/chat/user/${roomNo}`}>
                <ChatThumb
                    key={`chatThumb-key-${i}`}
                    username={username}
                    ellipsis={ellipsis}
                    lastReceivedDate={lastReceivedDate}
                />
            </Link>
        )
    });
    return (
        <>
            <BrowserRouter>
               {components}
            </BrowserRouter>
        </>
    );
}

export default ChatList