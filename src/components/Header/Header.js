import React, {useState} from 'react'
import { Link } from 'react-router-dom'

import Logo from '../.././img/logo.png'
import './Header.css'
import Flash from '../Flash/Flash'
import useInput from '../../CustomHooks/Auth/useInput'

function Header({ loggedInStatus, currentUser, userId, history }) {
    const { logoutClick, errors } = useInput({
        history: history
    })
    const [menu, setMenu] = useState(false)

    const handleDown = () => {
        setMenu(!menu)
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
                                <li onClick={handleDown}><Link to="/logout" onClick={logoutClick}>ログアウト</Link></li>
                            </ul>
                        }
                    </div>
                </div>
            )
        } else if (!loggedInStatus && !currentUser) {
            return (
                <div>
                    <ul className="header__auth">
                        <li onClick={handleDown}><Link to="/login">ログイン</Link></li>
                        <li onClick={handleDown}><Link to="/signup">新規登録</Link></li>
                    </ul>
                </div>
            )
        }
    }

    return (
        <div>
            <Flash Errors={errors} />
            <header className="home__header">
                <div className="header__top">
                    <img src={Logo} alt="ロゴ" className="Logo" />
                    <div className="header__topLeft">
                        {rendererUser()}
                    </div>
                </div>
                {!loggedInStatus &&
                    <div className="recruitment__form">
                        <p>採用担当者様専用ログインフォーム</p>
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