import React, { useState, useEffect } from 'react'
import { BrowserRouter, Switch, Route, Link } from 'react-router-dom'
import axios from 'axios'

import Home from './components/Home/Home'
import Header from './components/Header/Header'
import Login from './components/auth/Login'
import Signup from './components/auth/Signup'

import SeriesCreate from './components/Series/SeriesCreate/SeriesCreate'
import SeriesEdit from './components/Series/SeriesEdit/SeriesEdit'

import NovelsFeed from './components/Novels/NovelsFeed/NovelsFeed'

import './App.css'

export default function App() {
  const [loggedInStatus, setLoggedInStatus] = useState(false)
  const [user, setUser] = useState({})

  // 認証系のイベント=======================================================================
  // ログイン
  const handleLogin = (response) => {
    setLoggedInStatus(true)
    setUser(response.data.user)
  }

  // ログアウト
  const handleLogout = () => {
    setLoggedInStatus(false)
    setUser({})
  }

  // ログインステータスの追跡
  useEffect(() => {
    const checkLoginStatus = () => {
      axios.get("http://localhost:3001/logged_in",
        { withCredentials: true })
        .then(response => {
          if (response.data.logged_in && !loggedInStatus) {
            handleLogin(response)
          } else if (!response.data.logged_in && loggedInStatus) {
            handleLogout()
          }
        }).catch(error => {
          console.log("ログインエラー", error)
        })
    }
    checkLoginStatus()
  }, [loggedInStatus])
//===============================================================================
  
  // アクセス制限=============================
    // ログイン画面への誘導メッセージ
    const handleLeadingToLogin = (errors) => {
      return (
        <div className="leadingToLogin">
          {errors}
          <div>この機能を利用するには正しいアカウントでの<Link to="/login">ログイン</Link>が必要です。</div>
        </div>
      )
    }
  // =========================================

  return (
    <div>
      <BrowserRouter>
        <Route
          render={props => (
            <Header {...props} user={user} loggedInStatus={loggedInStatus} handleLogout={handleLogout} />
          )}
        />
        <Switch>
          <Route
            exact path={"/"}
            render={props => (
              <Home {...props} loggedInStatus={loggedInStatus} />
            )}
          />

          {/* 認証系機能へのルーティング===================== */}
          {!loggedInStatus && <Route exact path={"/login"} render={props => (
            <Login {...props} handleLogin={handleLogin}
              loggedInStatus={loggedInStatus} />
            )} />
          },
          {!loggedInStatus && <Route exact path={"/signup"} render={props => (
            <Signup {...props} handleLogin={handleLogin}
              loggedInStatus={loggedInStatus} />
            )} />
          }
          {/* 認証系機能へのルーティング===================== */}

          {/* 小説系機能へのルーティング =================================== */}
          <Route
            exact path="/series_create"
            render={props => (
              <SeriesCreate {...props}
                user={user}
                loggedInStatus={loggedInStatus}
                handleLeadingToLogin={handleLeadingToLogin}
              />
            )}
          />
          <Route
            exact path={`/novel_series/:id/edit`}
            render={props => (
              <SeriesEdit {...props}
                user={user}
                loggedInStatus={loggedInStatus}
                handleLeadingToLogin={handleLeadingToLogin}
              />
            )}
          />
          <Route
            exact path="/novel_series/:id"
            render={props => (
              <NovelsFeed {...props}
                user={user}
                loggedInStatus={loggedInStatus}
              />
            )}
          />
          {/* ============================================================== */}
        </Switch>
      </BrowserRouter>
    </div>
  )
}
