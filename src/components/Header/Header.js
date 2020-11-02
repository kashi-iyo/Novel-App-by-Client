import React, {useState} from 'react'
import { Link } from 'react-router-dom'
import axios from 'axios'

import Logo from '../.././img/logo.png'
import './Header.css'
import useLoggedIn from '../../CustomHooks/Auth/useLoggedIn'

function Header({loggedInStatus, currentUser, history}) {
    const { handleLogout, userId } = useLoggedIn()
    const [menu, setMenu] = useState(false)

    const handleDown = () => {
        setMenu(!menu)
    }

    // ログアウトイベント
    const handleClick = () => {
        const redirect = () => {
            history.push("/")
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
        if (loggedInStatus && currentUser) {
            return (
                <div>
                    <div className="userstatus">
                        <Link onClick={handleDown} className="nickname">
                            {currentUser}▼
                        </Link>
                        {
                            menu &&
                            <ul className="downMenu">
                                <li onClick={handleDown}><Link to={`/users/${userId}`}>マイページ</Link></li>
                                <li onClick={handleDown}><Link to="/logout" onClick={handleClick}>ログアウト</Link></li>
                            </ul>
                        }
                    </div>
                </div>
            )
        } else if (!loggedInStatus && !currentUser) {
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
                {!loggedInStatus &&
                    <div className="recruitment__form">
                        <Link>採用担当者様専用ログインフォーム</Link>
                    </div>
                }
                <ul className="header__ul">
                    <li><Link to="/Series/1">ホーム</Link></li>
                    <li><Link>ランキング</Link></li>
                    {currentUser && <li><Link to="/series_create">小説を投稿する</Link></li>}
                    <li><Link to="/users_tags_feed">趣味タグクラウド</Link></li>
                    <li><Link to="/series_tags_feed">小説タグクラウド</Link></li>
                </ul>
            </header>
        </div>
    )
}

export default Header