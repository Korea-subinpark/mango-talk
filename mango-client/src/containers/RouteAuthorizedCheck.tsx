import React from "react";
import { Route } from "react-router-dom";
import { UnAuthorizedPage } from "../components";

export default function RouteAuthorizedCheck({ role, component: Component, ...rest }: any) {
    return (
        <Route
            {...rest}
            render={
                props => {
                    if (role === role.NONE) {
                        return <UnAuthorizedPage />;
                    }
                    // if(Component) {
                    //     return <Component {...props} role={role} />;
                    // }
                }
            }

        />
    )
}