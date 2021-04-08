import React from "react";

function userInfo({userInfo}: any) {
    const { username } = userInfo || {};
    return (
        <div data-testid="userInfoComponent">
            <h1>userInfo</h1>
            <p>username: </p>
            <p>{username}</p>
        </div>
    )
}

export default userInfo