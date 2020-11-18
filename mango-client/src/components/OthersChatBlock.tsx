import * as React from "react";

function OthersChatBlock ({ text }: any) {
    return (
        <>
            <div className="chat-grid others-chat-grid">
                <div className="chat-profile"></div>
                <div className="chat-block others-chat-block">
                    <p className="chat-text">{ text }</p>
                </div>
            </div>
        </>
    )
}

export default OthersChatBlock