import React from 'react';
import { render } from '@testing-library/react';
import OthersChatBlock from '../OthersChatBlock';

describe("<OthersChatBlock />", () => {
    it("props 데이터 확인", () => {
        const utils = render(<OthersChatBlock text="text test" />);
        expect(utils.container).toMatchSnapshot();
        utils.getByText("text test");
    });
});