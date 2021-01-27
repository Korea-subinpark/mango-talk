import React, {useEffect, useState} from "react";

import "normalize.css";
import "@blueprintjs/core/lib/css/blueprint.css";
import "@blueprintjs/icons/lib/css/blueprint-icons.css";
import ChatThumb from "./ChatThumb";
import {Link} from "react-router-dom";
import {doSubscribe, getChatList, getCookie} from "../api/chat.t";
import {useSelector} from "react-redux";

function ChatList({list}: any) {
    const keyList = Object.keys(list);
    const stompClient = useSelector((state: any) => state.chat);
    doSubscribe(stompClient, keyList);
    const components: JSX.Element[] = [];

    keyList.map((roomNo: any, i: any) => {
        // const {username, ellipsis, lastReceivedDate} = list[roomNo];
        const username = list[roomNo].username || "";
        const ellipsis = list[roomNo].ellipsis || "";
        const lastReceivedDate = list[roomNo].lastReceivedDate || "";
        components.push(
            <Link to={`/chat/user/${roomNo}`}>
                <ChatThumb
                    key={`${username}${i}`}
                    username={username}
                    ellipsis={ellipsis}
                    lastReceivedDate={lastReceivedDate}
                />
            </Link>
        )
    });
    return (
        <>
            {components}
        </>
    );
}

export default ChatList