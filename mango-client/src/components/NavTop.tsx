import * as React from "react";

import {Link} from 'react-router-dom';
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
                <Link to="/userInfo">
                    <Button className="bp3-minimal" icon="home" text="Home" />
                </Link>
                <Link to="/chat/user/1">
                    <Button className="bp3-minimal" icon="chat" text="Chat" />
                </Link>
            </Navbar.Group>
        </Navbar>
    )
}

export default NavTop