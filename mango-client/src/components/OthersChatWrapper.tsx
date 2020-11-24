import * as React from "react";
import OthersChatBlock from "./OthersChatBlock";

function OthersChatWrapper ({ list }: any) {
    const renderList = (data: any) => {
        return data.map(({ text }: any, i: any) => {
            // console.log(text, i)
            return (<OthersChatBlock text={text} key={i} />);
        });
    };
    return (renderList(list));
}

export default OthersChatWrapper