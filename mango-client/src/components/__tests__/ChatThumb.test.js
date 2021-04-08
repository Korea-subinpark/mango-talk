import React from 'react';
import { render } from '@testing-library/react';
import ChatThumb from '../ChatThumb';

describe("<ChatThumb />", () => {
    it("snapshot & props data 일치 확인", () => {
        const utils = render(<ChatThumb username="admin" ellipsis="xx..." lastReceivedDate="1111-11-11" />);
        expect(utils.container).toMatchSnapshot();
        utils.getByText("admin");
        utils.getByText("xx...");
        utils.getByText("1111-11-11");
    });
});