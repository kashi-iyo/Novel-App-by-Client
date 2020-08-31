import React, { useState, useEffect } from 'react'
import { BrowserRouter, Switch, Route, Link } from 'react-router-dom'
import axios from 'axios'

import Home from './components/Home/Home'
import Dashboard from './components/Dashboard'
import Login from './components/auth/Login'
import Registration from './components/auth/Registration'
import './App.css'

export default function App() {
  const [loggedInStatus, setLoggedInStatus] = useState(false)
  const [user, setUser] = useState({})

  // 認証系の関数=======================================================================
  const handleLogin = (data) => {
    setLoggedInStatus(true)
    setUser(data.user)
  }

  const handleLogout = () => {
    setLoggedInStatus(false)
    setUser({})
  }

  const handleSuccessfulAuth = (data) => {
    handleLogin(data)
    data.history.push("/dashboard")
}

const handleLogoutClick = () => {
    axios.delete("http://localhost:3001/logout", { withCredentials: true })
        .then(response => {
            handleLogout()
        }).catch(error => console.log("ログアウトエラー", error))
}

  useEffect(() => {
    checkLoginStatus()
  })

  const checkLoginStatus = () => {
    axios.get("http://localhost:3001/logged_in", { withCredentials: true })
      .then(response => {
        if (response.data.logged_in && !loggedInStatus) {
          setLoggedInStatus(true)
          setUser(response.data.user)
        } else if (!response.data.logged_in && loggedInStatus) {
          setLoggedInStatus(false)
          setUser({})
        }
      }).catch(error => {
        console.log("ログインエラー", error)
      })
  }
  //===============================================================================

  return (
    <div>
      <BrowserRouter>
        
        <header className="header">
          <div className="header__top">
            {user.nickname ? <p><span className="userstatus">{user.nickname}</span>でログイン中</p> : <p>ゲスト</p>}
          </div>

          <div className="header__bottom">
            <ul>
              <li className="li__link"><Link to="/">ホーム</Link></li>
              {
                loggedInStatus
                  ? <button className="logout__button" onClick={handleLogoutClick}>ログアウト</button>
                  : <ul><li><Link to="/login">ログイン</Link></li><li><Link to="/signup">新規登録</Link></li></ul>
              }
            </ul>
          </div>
        </header>

        <Switch>
          <Route
            exact path={"/"}
            render={props => (
              <Home
                {...props}
                handleLogin={handleLogin}
                handleLogout={handleLogout}
                loggedInStatus={loggedInStatus}
              />
            )}
          />
          <Route
            exact path={"/dashboard"}
            render={props => (
              <Dashboard { ...props } loggedInStatus={loggedInStatus} />
            )}
          />
          <Route 
            exact path={"/login"}
            render={props => (
              <Login
                {...props}
                handleLogin={handleLogin}
                handleSuccessfulAuth={handleSuccessfulAuth}
                loggedInStatus={loggedInStatus}
              />
            )}
          />
          <Route 
            exact path={"/signup"}
            render={props => (
              <Registration
                {...props}
                handleLogin={handleLogin}
                handleSuccessfulAuth={handleSuccessfulAuth}
                loggedInStatus={loggedInStatus}
              />
            )}
          />
        </Switch>
      </BrowserRouter>
    </div>
  )
}
