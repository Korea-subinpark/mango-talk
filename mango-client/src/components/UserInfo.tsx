import React from "react";

function userInfo({userInfo}: any) {
    const { username } = userInfo || {};
    return (
        <>
            <h1>userInfo</h1>
            <p>username: {username}</p>
        </>
    )
}

export default userInfo