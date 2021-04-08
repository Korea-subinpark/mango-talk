import React from 'react';
import { fireEvent, render } from '@testing-library/react';
import LoginForm from '../LoginForm';

const username = "";
const password = "true";
const onSetUsername = jest.fn();
const onSetPassword = jest.fn();
const onClickLoginButton = jest.fn();

describe("<LoginForm />", () => {
    it("snapshot & props data 일치 확인", () => {
        const utils = render(
            <LoginForm
                username={username}
                password={password}
                onSetUsername={onSetUsername}
                onSetPassword={onSetPassword}
                onClickLoginButton={onClickLoginButton}
            />);
        expect(utils.container).toMatchSnapshot();

        fireEvent.change(utils.getByPlaceholderText("Mango-Talk ID"), {
            target: {
                value: "user"
            }
        });
        fireEvent.change(utils.getByPlaceholderText("Password"), {
            target: {
                value: "qwe123"
            }
        });
        fireEvent.click(utils.getByText("로그인"));
    });

});