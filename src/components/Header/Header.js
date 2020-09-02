import React, {useState, useEffect} from 'react'
import { Link } from 'react-router-dom'
import axios from 'axios'

import './Header.css'

function Header(props) {
    const [loggedInStatus, setLoggedInStatus] = useState(false)
    const [user, setUser] = useState({})

  // ログアウト===============================
  const handleLogout = () => {
    setLoggedInStatus(false)
    setUser({})
  }

const handleLogoutClick = () => {
    axios.delete("http://localhost:3001/logout", { withCredentials: true })
        .then(response => {
            handleLogout()
        }).catch(error => console.log("ログアウトエラー", error))
}
  // ログアウト===============================

  // ログインステータスの追跡===============================
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
// ログインステータスの追跡===============================

    return (
        <div>
            <header className="header">
                <div className="header__top">
                    {user.nickname
                        ?
                        <div className="userstatus">
                            <span>{user.nickname}</span>でログイン中
                        </div>
                        :
                        <p className="guest">ゲスト</p>
                    }
                </div>

                <div className="header__bottom">
                    <ul>
                        <li className="li__link"><Link to="/">ホーム</Link></li>
                        {
                            loggedInStatus ?
                            <button className="logout__button" onClick={handleLogoutClick}>
                                ログアウト
                            </button> :
                            <ul>
                                <li><Link to="/login">ログイン</Link></li>
                                <li><Link to="/signup">新規登録</Link></li>
                            </ul>
                        }
                    </ul>
                </div>
            </header>
        </div>
    )
}

export default Header
