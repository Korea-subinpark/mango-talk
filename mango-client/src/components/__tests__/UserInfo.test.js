import React from 'react';
import { render } from '@testing-library/react';
import UserInfo from '../UserInfo';

let userInfo = {
    username: "admin"
};

describe("<UserInfo />", () => {
    it("snapshot 일치 확인", () => {
        const utils = render(<UserInfo UserInfo={userInfo} />);
        expect(utils.container).toMatchSnapshot();
    });

    it("props 데이터 확인", () => {
        const utils = render(<UserInfo userInfo={userInfo} />);
        utils.getByText("admin");
    });
});