import React from 'react'
// import axios from 'axios'
// import { Link } from 'react-router-dom'

import './Home.css'
// import Registration from './auth/Registration'
// import Login from './auth/Login'

export default function Home() {

    // const handleSuccessfulAuth = (data) => {
    //     props.handleLogin(data)
    //     props.history.push("/dashboard")
    // }

    // const handleLogoutClick = () => {
    //     axios.delete("http://localhost:3001/logout", { withCredentials: true })
    //         .then(response => {
    //             props.handleLogout()
    //         }).catch(error => console.log("ログアウトエラー", error))
    // }

    return (
        <div className="home">
            <h1>Home</h1>
            {/* <Registration handleSuccessfulAuth={handleSuccessfulAuth} /> */}
            {/* <Login handleSuccessfulAuth={handleSuccessfulAuth} /> */}
        </div>
    )
}
