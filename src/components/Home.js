import React, { Component } from 'react'
import axios from 'axios'
import Registration from './auth/Registration'
import Login from './auth/Login'

export default class Home extends Component {
    constructor(props) {
        super(props)

        this.handleSuccessfulAuth = this.handleSuccessfulAuth.bind(this)
        this.handleLogoutClick = this.handleLogoutClick.bind(this)
    }

    handleSuccessfulAuth(data) {
        // TODO update parent component
        // handleLogin()はprops(App.jsコンポーネント)から受け取る＝App.jsで定義
        this.props.handleLogin(data)
        // このpropsのhistoryはRouteコンポーネントが受け取っている物で、ルートを表す
        this.props.history.push("/dashboard")
    }

    handleLogoutClick() {
        axios.delete("http://localhost:3001/logout", { withCredentials: true }).then(response => {
            this.props.handleLogout()
        }).catch(error => {
            console.log("logout error", error)
        })
        
    }

    render() {
        return (
            <div>
                <h2>Home</h2>
                <h2>Status: {this.props.loggedInStatus}</h2>
                <button onClick={() => this.handleLogoutClick()}>Logout</button>
                <Registration
                    handleSuccessfulAuth={this.handleSuccessfulAuth}
                />
                <Login
                    handleSuccessfulAuth={this.handleSuccessfulAuth}
                />
            </div>
        )
    }
}

