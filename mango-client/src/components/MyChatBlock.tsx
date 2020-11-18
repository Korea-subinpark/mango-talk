import * as React from "react";
function MyChatBlock ({ text }: any) {
    return (
        <>
            <div className="chat-grid my-chat-grid">
                <div className="chat-block my-chat-block">
                    <p className="chat-text">{ text }</p>
                </div>
            </div>
        </>
    )
}

export default MyChatBlock