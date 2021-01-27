import React, {useEffect, useState} from "react"
import { withRouter } from 'react-router-dom';

import 'normalize.css';
import '@blueprintjs/core/lib/css/blueprint.css';
import '@blueprintjs/icons/lib/css/blueprint-icons.css';
import {
    Button,
    FormGroup,
    TextArea,
    Card,
    Elevation
} from '@blueprintjs/core';
import {handleStringChange} from "./changeHandler";
import {checkSocketNull, doSend, getChatList, getCookie} from "../api/chat.t";
import TextWrapper from "./TextWrapper";
import {useSelector} from "react-redux";

// blueprint css
const styleMargin0 = { margin: 0 };
const styleButtonDisabled = { border: "1px solid #e7d73d", color: "#bdb038", backgroundColor: "#feeb41" };
const styleButtonEnabled = { border: "1px solid #e7d73d", color: "#222", boxShadow: "none", backgroundImage: "none", backgroundColor: "#feeb41" };

async function getMessages() {
    // const response = await getChatList(getCookie("token"));
    // return response.data;
}

function ChatRoom({ match } : any) {
    const { roomId } = match.params;
    const onFocus = () => {
        return {outline: "none"};
    }
    const [chat, setChat] = useState("");
    const [chatList, setChatList] = useState([]);
    const onSetChat = handleStringChange(chat => {setChat(chat)});
    const {stompClient} = useSelector((state: any) => state.chat);
    const username = useSelector((state: any) => state.login.username);
    useEffect(() => {

        // openChat(roomId);
        // 채팅방의 번호
        // getChatList(roomId).then((response) => {
        //     for (const text of chatList) {
        //         // setChatList.push(text);
        //         // TODO
        //     }
        // });
    }, []);

    const onClickSendButton = () => {
        let myChatList: any = [];
        try {
            // send API
            console.log("chat room test: " + chat);
            doSend(chat, username, roomId, stompClient);
            for (const text of chatList) {
                myChatList.push(text);
            }
            myChatList.push({ text: chat, isOthers: false });
            setChatList(myChatList);
            setChat("");
        } catch (e) {
            console.warn(e)
            alert("전송 실패")
        }
    }
    const isSocketNull = () => {
        alert(checkSocketNull(stompClient) ? "연결됨" : "연결 안됨");
        if (chat === "") {
            return;
        }
    }
    return (
        <>
            <Card interactive={false} elevation={Elevation.TWO}>
                <div className="chatRoom-container">
                    <button onClick={isSocketNull}>소켓 null 체크</button>
                    <div className="chatRoom-wrapper">
                        <TextWrapper list={chatList} />
                    </div>
                    <div className="chat-input">
                        <FormGroup className="chat-form" style={styleMargin0}>
                            <TextArea
                                className="chat-input-textarea"
                                fill={true}
                                growVertically={false}
                                large={true}
                                onChange={onSetChat}
                                onFocus={onFocus}
                                value={chat}
                                style={ {height: "120px", boxShadow: "none"} }
                            />
                            <div className="btn-send-wrapper">
                                <Button
                                    id="btn-send"
                                    className="margin-bottom-10"
                                    disabled={!chat}
                                    fill={true}
                                    onClick={onClickSendButton}
                                    style={chat ? {...styleButtonEnabled, ...styleMargin0} : {...styleButtonDisabled, ...styleMargin0}}
                                >전송</Button>
                            </div>
                        </FormGroup>
                        <div className="btn-group-wrapper">

                        </div>
                    </div>
                </div>
            </Card>
        </>
    )
}

export default withRouter(ChatRoom)