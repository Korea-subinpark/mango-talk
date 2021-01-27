import * as React from "react";
import { faUser, faComment } from "@fortawesome/free-solid-svg-icons"
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome"
import {
    Tab,
    Tabs
} from "@blueprintjs/core";
import {useDispatch, useSelector} from "react-redux";
import {setNavbarTabId} from "../store/modules/nav";
import ChatListContainer from "../containers/ChatListConatiner";
function ContentsNavigator () {

    // TODO WebSocket
    const dispatch = useDispatch();
    const handleChangeNavbarTabId = (navbarTabId: string) => dispatch(setNavbarTabId(navbarTabId));
    let navbarTabId = useSelector((state: any) => state.nav.navbarTabId);

    return (
    <div id="sidebar-container">
        <Tabs vertical={true} onChange={handleChangeNavbarTabId} selectedTabId={navbarTabId}>
            <Tab id="user-list" title={<FontAwesomeIcon icon={faUser} size="1x" />} panel={<div>a2</div>} />
            <Tab id="chat-list" title={<FontAwesomeIcon icon={faComment} size="1x" />} panel={<ChatListContainer />} />
            <Tabs.Expander />
        </Tabs>
    </div>
    )
}

export default ContentsNavigator
