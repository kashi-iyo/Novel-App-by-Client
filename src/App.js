import React, { useState, useEffect } from 'react'
import { BrowserRouter, Switch, Route } from 'react-router-dom'
import axios from 'axios'

import Home from './components/Home/Home'
import Dashboard from './components/Dashboard'
import Header from './components/Header/Header'
import Login from './components/auth/Login'
import Registration from './components/auth/Registration'



import './App.css'

export default function App() {
  const [loggedInStatus, setLoggedInStatus] = useState(false)
  const [user, setUser] = useState({})

  // エラー出力===========================================
  // const handleErrors = () => {
  //   return (
  //       <div>
  //           <ul>
  //               {loginErrors.map(error => {
  //                   return <li key={error}>{error}</li>
  //               })}
  //           </ul>
  //       </div>
  //   )
  // }
  //======================================================


  // 認証系の関数=======================================================================
  // ログイン===============================
  const handleLogin = (data) => {
    setLoggedInStatus(true)
    setUser(data.user)
  }
  //========================================

  // リダイレクト===========================
  // const redirect = () => {
  //   props.history.push("/")
  // }
  //========================================

  // ログインステータスの追跡===============================
  useEffect(() => {
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
    checkLoginStatus()
  })

  
//==========================================================
//===============================================================================


  return (
    <div>
      <BrowserRouter>
        <Header />
        <Switch>
          <Route
            exact path={"/"}
            render={props => (
              <Home {...props} loggedInStatus={loggedInStatus} />
            )}
          />
          <Route
            exact path={"/dashboard"}
            render={props => (
              <Dashboard { ...props } loggedInStatus={loggedInStatus} />
            )}
          />
          {!loggedInStatus && <Route exact path={"/login"} render={props => (
            <Login {...props} handleLogin={handleLogin}
              // redirect={redirect}
              // handleErrors={handleErrors}
              loggedInStatus={loggedInStatus} />
            )} />
          },
          {!loggedInStatus && <Route exact path={"/signup"} render={props => (
            <Registration {...props} handleLogin={handleLogin}
              // redirect={redirect}
              // handleErrors={handleErrors}
              loggedInStatus={loggedInStatus} />
            )} />
          }
          {/* 投稿系機能へのルーティング =================================== */}
          {/* <Route
            exact path="/series_create"
            render={props => (
              <SeriesCreate {...props}
                user={user}
                loggedInStatus={isLoggedIn}
              />
            )}
          /> */}
          {/* ============================================================== */}
        </Switch>
      </BrowserRouter>
    </div>
  )
}
