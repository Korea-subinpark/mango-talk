import React from "react";
import {getChatList, getCookie} from "../api/chat.t";
import ChatList from "../components/ChatList";
import useAsync from "../store/useAync";
import {useSelector} from "react-redux";

async function getChats() {
    const response = await getChatList(getCookie("token"));
    return response.data;
}

function ChatListContainer() {
    const [state] = useAsync(getChats, []);
    const { loading, data: list, error }: any = state;
    if (loading) return <div>로딩 중...</div>;
    if (error) return <div>채팅 목록을 불러오는 데 실패했습니다.</div>;
    if (!list) return null;
    return <ChatList list={list} />;
}

export default ChatListContainer;