import React from "react"

function userInfo({ user }: any) {
    const { username, password } = user || {}
    return (
        <>
            <h1>userInfo</h1>
            <p>username: {username}</p>
            <p>Password: {password}</p>
        </>
    )
}

export default userInfo