import * as React from "react";
import MyChatBlock from "./MyChatBlock";
function MyChatWrapper ({ list }: any) {
    const renderList = (data: any) => {
        return data.map(({ text }: any, i: any) => {
            // console.log(text, i)
            return (<MyChatBlock text={text} key={i} />);
        });
    };
    return (renderList(list));
}

export default MyChatWrapper