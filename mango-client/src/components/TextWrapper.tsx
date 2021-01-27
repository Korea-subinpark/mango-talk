import * as React from "react";
import TextBubble from "./TextBubble";

function TextWrapper ({ list }: any) {
    const renderList = (data: any) => {
        return data.map(({ text, isOthers }: any, i: any) => {
            return (<TextBubble text={text} key={i} isOthers={isOthers} />);
        });
    };
    return (renderList(list));
}

export default TextWrapper