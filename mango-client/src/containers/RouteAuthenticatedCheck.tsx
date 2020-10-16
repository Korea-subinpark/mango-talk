import React, {Component} from "react"
import {Route, Redirect} from "react-router-dom"

export default function RouteAuthenticatedCheck({authenticated, Component: Component, render, ...rest}: any) {
    return (
        <Route
            {...rest}
            render={
                props => authenticated ? (
                    render ? (
                        render(props)
                    ) : (<Component {...props} />)
                ) : (<Redirect to={{ pathname: "/login", state: { from: props.location } }}/>)
            }
        />
    )
}