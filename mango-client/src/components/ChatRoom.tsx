import React, {useEffect, useState} from "react"

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
import {checkSocketNull, doSend, doSubscribe, getChatList} from "../api/chat.t";
import MyChatWrapper from "./MyChatWrapper";
import OthersChatWrapper from "./OthersChatBlock";

// blueprint css
const styleMargin0 = { margin: 0 };
const styleButtonDisabled = { border: "1px solid #e7d73d", color: "#bdb038", backgroundColor: "#feeb41" };
const styleButtonEnabled = { border: "1px solid #e7d73d", color: "#222", boxShadow: "none", backgroundImage: "none", backgroundColor: "#feeb41" };

function ChatRoom({ authenticated, login, location, roomId } : any) {
    const onFocus = () => {
        return {outline: "none"};
    }

    const [chat, setChat] = useState("");
    const [chatList, setChatList] = useState([]);
    const onSetChat = handleStringChange(chat => {setChat(chat)});

    useEffect(() => {
        doSubscribe(roomId);
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
            doSend(chat);
            for (const text of chatList) {
                myChatList.push(text);
            }
            myChatList.push({ text: chat });
            setChatList(myChatList);
            setChat("");
        } catch (e) {
            console.warn(e)
            alert("전송 실패")
        }
    }
    const isSocketNull = () => {
        alert(checkSocketNull());
        if (chat === "") {
            return;
        }
    }
    return (
        <>
            <Card interactive={false} elevation={Elevation.TWO}>
                <div className="chatRoom-container">
                    <button onClick={isSocketNull}>asassadasa</button>
                    <div className="chatRoom-wrapper">
                        <OthersChatWrapper text="." />
                        <MyChatWrapper list={chatList} />
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

export default ChatRoom