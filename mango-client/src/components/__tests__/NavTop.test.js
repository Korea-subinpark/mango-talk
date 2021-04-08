import React from 'react';
import {fireEvent, render, wait} from '@testing-library/react';
import NavTop from '../NavTop';
import UserInfo from '../UserInfo';
import {BrowserRouter} from "react-router-dom";
import App from "../../App";

describe("<NavTop />", () => {
    // const arrangeRender =  async () => {
    //     render(
    //         <App />
    //     );
    //     await wait(() => {
    //         expect(screen.getByTestId(/userInfoComponent/)).toBeInTheDocument();
    //     });
    // };


    it("snapshot & Router 일치 확인", () => {
        const utils = render(
            <BrowserRouter>
                <NavTop />
            </BrowserRouter>
            );
        expect(utils.container).toMatchSnapshot();
        fireEvent.click(utils.getByText("Home"));
        // arrangeRender();
        // expect(utils.getByText("userInfo")).toBeInTheDocument();
    });
});