import React from "react";

import "normalize.css";
import "@blueprintjs/core/lib/css/blueprint.css";
import "@blueprintjs/icons/lib/css/blueprint-icons.css";
import {doSubscribe} from "../api/chat.t";
import {useSelector} from "react-redux";
import ContentsNavigator from "./ContentsNavigator";


function ContentsContainer({isAuthenticated} : any) {
    const stompClient = useSelector((state: any) => state.chat.stompClient);
    // doSubscribe(stompClient);
    return (
        <ContentsNavigator />
    )
}

export default ContentsContainer