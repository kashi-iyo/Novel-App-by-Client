import React, {Fragment} from 'react'
import { Link } from 'react-router-dom'
import axios from 'axios'

import './Header.css'
import useLoggedIn from '../CustomHooks/Auth/useLoggedIn'

function Header(props) {
    const { user, loggedInStatus, handleLogout } = useLoggedIn()
    const nickname = user.nickname

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

    return (
        <header className="home__header">
            <div className="header__top">
                {nickname
                    ?
                    <div className="userstatus">
                        <Link className="nickname">{nickname}さん</Link>でログイン中
                    </div>
                    :
                    <p className="guest">ゲストさんようこそ。</p>
                }
            </div>
            <ul>
                <li><Link to="/">ホーム</Link></li>
                <li><Link>ランキング</Link></li>
                <ul className="header__options">
                    <li><Link>投稿一覧</Link></li>
                    ／
                    <li><Link to="/series_create">小説を投稿する</Link></li>
                </ul>
                {
                    loggedInStatus ?
                        <li><Link to="/logout" onClick={handleClick}>ログアウト</Link></li> :
                        <Fragment>
                            <li><Link to="/login">ログイン</Link></li>
                            <li><Link to="/signup">新規登録</Link></li>
                        </Fragment>
                }
            </ul>
        </header>
    )
}

export default Header
