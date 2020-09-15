import { useState, useEffect } from 'react'
import axios from 'axios'

// ログイン状態を確認するカスタムフック
export default function useLoggedIn() {
    const [loggedInStatus, setLoggedInStatus] = useState(false)
    const [user, setUser] = useState({})

    // 認証系のイベント=======================================================================
    // ログイン
    const handleLogin = (user) => {
        setLoggedInStatus(true)
        setUser(user)
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
            console.log(response.data.logged_in)
            let res = response.data
            if (res.logged_in && !loggedInStatus) {
                handleLogin(res.user)
            } else if (!res.logged_in && loggedInStatus) {
                handleLogout()
            }
            }).catch(error => {
                console.log("ログインエラー", error)
            })
        }
        checkLoginStatus()
    }, [])

    return { loggedInStatus, user, handleLogin, handleLogout }
}