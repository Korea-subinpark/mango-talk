import React from 'react';
import { render } from '@testing-library/react';
import TextBubble from '../TextBubble';

describe("<TextBubble />", () => {
    it("isOthers가 true일 때 snapshot 일치 확인", () => {
        const utils = render(<TextBubble text="My text test" isOthers={true} />);
        expect(utils.container).toMatchSnapshot();
        utils.getByText("My text test");
    });

    it('isOthers가 false일 때 snapshot 일치 확인 확인', () => {
        const utils = render(<TextBubble text="Others text test" isOthers={false} />);
        expect(utils.container).toMatchSnapshot();
        utils.getByText("Others text test");
    });
});