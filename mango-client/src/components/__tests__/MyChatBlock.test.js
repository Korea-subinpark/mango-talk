import React from 'react';
import { render } from '@testing-library/react';
import MyChatBlock from '../MyChatBlock';

describe("<MyChatBlock />", () => {
    it("props 데이터 확인", () => {
        const utils = render(<MyChatBlock text="text test" />);
        expect(utils.container).toMatchSnapshot();
        utils.getByText("text test");
    });
});