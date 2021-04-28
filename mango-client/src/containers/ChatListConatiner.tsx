import React from "react";
import {getChatRoomList, getCookie} from "../api/chat.t";
import ChatList from "../components/ChatList";
import useAsync from "../store/useAync";
import Axios from "axios";

async function getChats() {
    // @ts-ignore
    const token = arguments[0] ? arguments[0] : getCookie("token");
    const response = await Axios.get("http://localhost:8080/mango/v1/chatRoom", {
        headers: {
            "Authorization": `Bearer ${token}`
        }
    });
    return response.data;
}

function ChatListContainer({ token }: any) {
    // @ts-ignore
    // const [state] = token ? useAsync(() => getChats(token), [token]) : useAsync(getChats, []);
    const [state] = useAsync(getChats, []);
    let { loading, data: list, error }: any = state;
    if (loading) return <div>로딩 중...</div>;
    if (error) return <div style={{color: "black"}}>채팅 목록을 불러오는 데 실패했습니다.</div>;
    if (!list) return null;
    return <ChatList list={list} />;
}

export default ChatListContainer;