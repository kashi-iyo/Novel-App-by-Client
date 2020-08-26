import React from 'react'
import axios from 'axios'

import Registration from './auth/Registration'
import Login from './auth/Login'

export default function Home(props) {

    const handleSuccessfulAuthentication = (data) => {
        props.handleLogin(data)
        props.history.push("/dashboard")
    }

    const handleLogoutClick = () => {
        axios.delete("http://localhost:3001/logout", { withCredentials: true })
            .then(response => {
                props.handleLogout()
            }).catch(error => console.log("ログアウトエラー", error))
    }

    return (
        <div>
            <h1>Home</h1>
            <p>ログイン状態: {props.loggedInStatus}</p><br></br>
            <button onClick={handleLogoutClick}>ログアウト</button>
            <Registration handleSuccessfulAuthentication={handleSuccessfulAuthentication} />
            <Login handleSuccessfulAuthentication={handleSuccessfulAuthentication} />
        </div>
    )
}
