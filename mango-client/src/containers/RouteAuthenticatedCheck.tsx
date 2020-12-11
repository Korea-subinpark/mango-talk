import React from "react"
import {Route, Redirect} from "react-router-dom"

export default function ({isAuthenticated, Component, render, ...rest}: any) {
    return (
        <Route
            {...rest}
            render={
                props => isAuthenticated ? (
                    render ? (
                        render(props)
                    ) : (<Component {...props} />)
                ) : (<Redirect to={{ pathname: "/login", state: { from: props.location } }}/>)
            }
        />
    )
}