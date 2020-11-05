import React, {useState} from 'react'
import { Link } from 'react-router-dom'

import Logo from '../.././img/logo.png'
import './Header.css'
import Flash from '../Flash/Flash'
import useInput from '../../CustomHooks/Auth/useInput'

function Header({ loggedInStatus, currentUser, userId, history, handleLogin, handleLogout, flashMessages, handleMessages }) {
    const { logoutClick, errors, handleLoginForRecruit } = useInput({
        history: history,
        handleLogin: handleLogin,
        handleLogout: handleLogout,
        handleMessages: handleMessages
    })
    const [menu, setMenu] = useState(false)

    const handleDown = () => {
        setMenu(!menu)
    }

    const rendererUser = () => {
        if (loggedInStatus && currentUser) {
            return (
                <div>
                    <div className="user-status">
                        <Link onClick={handleDown} className="nickname">
                            {currentUser}▼
                        </Link>
                        {
                            menu &&
                            <ul className="down-menu">
                                <li onClick={handleDown}><Link to={`/users/${userId}`}>マイページ</Link></li>
                                <li onClick={handleDown}>
                                    <Link
                                        to="/logout"
                                        onClick={logoutClick}
                                    >
                                        ログアウト
                                    </Link>
                                </li>
                            </ul>
                        }
                    </div>
                </div>
            )
        } else if (!loggedInStatus && !currentUser) {
            return (
                <div>
                    <ul className="header-auth">
                        <li onClick={handleDown}><Link to="/login">ログイン</Link></li>
                        <li onClick={handleDown}><Link to="/signup">新規登録</Link></li>
                    </ul>
                </div>
            )
        }
    }

    return (
        <div>
            <header className="home-header">
                <div className="header-top">
                    <img src={Logo} alt="ロゴ" className="Logo" />
                    <div className="header-top-left">
                        {rendererUser()}
                    </div>
                </div>
                {!loggedInStatus &&
                    <button
                        className="recruitment-form" type="submit"
                        onClick={handleLoginForRecruit}>
                        採用担当者様専用ログインフォーム
                    </button>
                }
                <ul className="header-bottom">
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