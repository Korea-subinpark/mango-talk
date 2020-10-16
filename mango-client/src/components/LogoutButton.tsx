import React from "react"
import { withRouter } from "react-router-dom"

function LogoutButton({ logout, history }: any) {
    const onClickLogoutButton = () => {
        logout()
        history.push("/login")
    }
    return <button onClick={onClickLogoutButton}>Logout</button>
}

export default withRouter(LogoutButton)