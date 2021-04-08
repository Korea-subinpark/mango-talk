import React from 'react';
import {fireEvent, render} from '@testing-library/react';
import LogoutButton from '../LogoutButton';

const logoutEvent = jest.fn();
const history = {
    go: jest.fn()
};
// LogoutButton 컴포넌트는 withRouter에 의해 wrapping 된 wrappedComponent임
describe("<LogoutButton />", () => {
    it("Logout버튼 snapshot 확인", () => {
        const utils = render(<LogoutButton.WrappedComponent logout={logoutEvent} history={history} />);
        expect(utils.container).toMatchSnapshot();
        utils.getByText("Logout");
    });
    it("LogoutButton click event 확인", () => {
        const utils = render(<LogoutButton.WrappedComponent logout={logoutEvent} history={history} />);
        const logoutButton = utils.getByText("Logout");
        fireEvent.click(logoutButton);
    });
});