import React from 'react';
import { render } from '@testing-library/react';
import OthersChatWrapper from '../OthersChatWrapper';

const list = [
    { text: "list data 1" },
    { text: "list data 2" }
];
describe("<OthersChatWrapper />", () => {
    it("props로 전달된 list 데이터를 하위 컴포넌트의 props로 전달 확인", () => {
        const utils = render(<OthersChatWrapper list={list} />);
        expect(utils.container).toMatchSnapshot();
        utils.getByText("list data 1");
        utils.getByText("list data 2");
    });
});