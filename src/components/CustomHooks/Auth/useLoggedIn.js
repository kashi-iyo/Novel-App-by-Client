import { useState, useEffect } from 'react'
import axios from 'axios'

// ログイン状態を確認するカスタムフック
export default function useLoggedIn() {
    const [loggedInStatus, setLoggedInStatus] = useState(false)
    const [currentUser, setCurrentUser] = useState("")
    const [isLoading, setIsLoading] = useState(true)

    // 認証系のイベント=======================================================================
    // ログイン
    const handleLogin = (name) => {
        setLoggedInStatus(true)
        setCurrentUser(name)
    }

    // ログアウト
    const handleLogout = () => {
        setLoggedInStatus(false)
        setCurrentUser("")
    }

    // ログインステータスの追跡
    useEffect(() => {
        const checkLoginStatus = () => {
        axios.get("http://localhost:3001/logged_in",
            { withCredentials: true })
            .then(response => {
                setIsLoading(true)
                let res = response.data
            if (res.logged_in && !loggedInStatus) {
                handleLogin(res.user.nickname)
                setIsLoading(false)
            } else if (!res.logged_in && loggedInStatus) {
                handleLogout()
                setIsLoading(false)
            }
            }).catch(error => {
                setIsLoading(true)
                console.log("ログインエラー", error)
            })
        }
        checkLoginStatus()
    }, [])

    return { loggedInStatus, currentUser, handleLogin, handleLogout, isLoading, setIsLoading }
}