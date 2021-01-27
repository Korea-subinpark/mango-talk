import React from "react";

import "normalize.css";
import "@blueprintjs/core/lib/css/blueprint.css";
import "@blueprintjs/icons/lib/css/blueprint-icons.css";
import {doSubscribe} from "../api/chat.t";
import {useSelector} from "react-redux";
import {Card, Elevation} from "@blueprintjs/core";

const tmpStyle = {
    border: "1px solid red",
    width: "400px",
    height: "80px",
    display: "grid",
    gridTemplateColumns: "70% 30%",
    color: "black",
    fontSize: "10px"
}
const titleStyle: any = {fontWeight: "bold", textAlign: "left", textOverflow: "ellipsis", whiteSpace: "nowrap", overflow:"hidden"};
const contentStyle: any = {textAlign: "left", textOverflow: "ellipsis", whiteSpace: "nowrap", overflow:"hidden"};
function dateParser (dateString: any) {
    Date.parse(dateString);
}

// TODO chat room ordering by date
function ChatThumb({username, ellipsis, lastReceivedDate}: any) {
    const stompClient = useSelector((state: any) => state.chat.stompClient);

    // doSubscribe(stompClient);
    return (
        <div style={tmpStyle}>
            <div>
                <div style={titleStyle}>{username}</div>
                <div style={contentStyle}>{ellipsis}</div>
            </div>
            <div>{lastReceivedDate}</div>
        </div>
    )
}

export default ChatThumb