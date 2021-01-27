import * as React from "react";

function TextBubble ({ text, isOthers }: any) {
    return (
        isOthers ?
            (<>
                <div className="chat-grid others-chat-grid">
                    <div className="chat-profile"></div>
                    <div className="chat-block others-chat-block">
                        <p className="chat-text">{ text }</p>
                    </div>
                </div>
            </>)
        :
            (<>
                <div className="chat-grid my-chat-grid">
                    <div className="chat-block my-chat-block">
                        <p className="chat-text">{ text }</p>
                    </div>
                </div>
            </>)
    )
}

export default TextBubble