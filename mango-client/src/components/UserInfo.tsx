import React from "react"

function userInfo({ user }: any) {
    const { email, password } = user || {}
    return (
        <>
            <h1>userInfo</h1>
            <p>email: {email}</p>
            <p>Password: {password}</p>
        </>
    )
}

export default userInfo