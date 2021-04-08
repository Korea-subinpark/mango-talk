import React from 'react';
import { fireEvent, render } from '@testing-library/react';
import TextWrapper from '../TextWrapper';

const list = [
    { text: "Hi", isOthers: true },
    { text: "lol", isOthers: false }
];

describe("<TextWrapper />", () => {
    it("snapshot & props로 전달한 리스트에 의한 결과가 분기 처리되는지 확인", () => {
        const utils = render(<TextWrapper list={list} />);
        expect(utils.container).toMatchSnapshot();
        utils.getByText("Hi");
        utils.getByText("lol");
    });

});