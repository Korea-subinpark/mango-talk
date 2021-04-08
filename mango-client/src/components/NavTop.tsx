import * as React from "react";

import {Route} from 'react-router-dom';
import {
    Alignment,
    Button,
    Navbar
} from "@blueprintjs/core";


function NavTop () {
    return (
        <Navbar fixedToTop={true}>
            <Navbar.Group align={Alignment.CENTER}>
                <Navbar.Divider />
                <Route to="/userInfo">
                    <Button className="bp3-minimal" icon="home" text="Home" />
                </Route>
                <Route to="/chat/user/1">
                    <Button className="bp3-minimal" icon="chat" text="Chat" />
                </Route>
            </Navbar.Group>
        </Navbar>
    )
}

export default NavTop