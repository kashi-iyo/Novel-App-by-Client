import React, {useState} from 'react'
import { Link } from 'react-router-dom'
import axios from 'axios'

import Logo from '../.././img/logo.png'
import './Header.css'
import useLoggedIn from '../CustomHooks/Auth/useLoggedIn'

function Header(props) {
    const { handleLogout, userId } = useLoggedIn()
    const [userMenu, setUserMenu] = useState("defaultMenu")

    const handleDown = () => {
        if (userMenu === "defaultMenu") {
            setUserMenu("")
            setUserMenu("downMenu")
        } else if (userMenu === "downMenu") {
            setUserMenu("")
            setUserMenu("defaultMenu")
        }
    }

    // ログアウトイベント
    const handleClick = () => {
        const redirect = () => {
            props.history.push("/")
        }
        axios.delete('http://localhost:3001/logout',
            { withCredentials: true })
            .then(response => {
            if (response.data.logged_out) {
                handleLogout()
                redirect()
            }
            })
            .catch(error => console.log(error))
    }

    const rendererUser = () => {
        if (props.loggedInStatus && props.currentUser) {
            return (
                <div>
                    <div className="userstatus">
                        <Link onClick={handleDown} className="nickname">
                            {props.currentUser}▼
                        </Link>
                        <ul className={userMenu}>
                            <li><Link to={`/users/${userId}`}>マイページ</Link></li>
                            <li><Link to="/logout" onClick={handleClick}>ログアウト</Link></li>
                        </ul>
                    </div>
                </div>
            )
        } else if (!props.loggedInStatus && !props.currentUser) {
            return (
                <div>
                    <ul className="header__auth">
                        <li><Link to="/login">ログイン</Link></li>
                        <li><Link to="/signup">新規登録</Link></li>
                    </ul>
                </div>
            )
        }
    }

    return (
        <div>
            <header className="home__header">
                <div className="header__top">
                    <img src={Logo} alt="ロゴ" className="Logo" />
                    <div className="header__topLeft">
                        {rendererUser()}
                    </div>
                </div>
                {!props.loggedInStatus &&
                    <div className="recruitment__form">
                        <Link>採用担当者様専用ログインフォーム</Link>
                    </div>
                }
                <ul className="header__ul">
                    <li><Link to="/">ホーム</Link></li>
                    <li><Link>ランキング</Link></li>
                    {props.currentUser && <li><Link to="/series_create">小説を投稿する</Link></li>}
                </ul>
            </header>
        </div>
    )
}

export default Header