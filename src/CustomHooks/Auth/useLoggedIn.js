import { useState, useEffect } from 'react'
import axios from 'axios'

// ログイン状態を確認するカスタムフック
export default function useLoggedIn({handleFlashMessages}) {
    const [loggedInStatus, setLoggedInStatus] = useState(false)
    const [currentUser, setCurrentUser] = useState("")
    const [userId, setUserId] = useState("")
    const [isLoading, setIsLoading] = useState(true)
    const domain = process.env.REACT_APP_BACKEND_URL


    // ログイン
    const handleLogin = ({ user, success, errors, history, pathname }) => {
        setLoggedInStatus(true)
        setCurrentUser(user.nickname)
        setUserId(user.id)
        // フラッシュメッセージの表示
        success && handleFlashMessages({
            success: success
        })
        errors && handleFlashMessages({
            errors: errors
        })
        // リダイレクト
        pathname && history.push(pathname)
    }

    // ログアウト
    const handleLogout = ({success, errors, history, pathname}) => {
        setLoggedInStatus(false)
        setCurrentUser("")
        // フラッシュメッセージの表示
        success && handleFlashMessages({
            success: success
        })
        errors && handleFlashMessages({
            errors: errors
        })
        // リダイレクト
        pathname && history.push(pathname)
    }

    // ログインステータスの追跡
    useEffect(() => {
        let mount = true
        console.log("ログインステータスマウント: ON")
        const checkLoginStatus = () => {
        axios.get(`${domain}/logged_in`,
            { withCredentials: true })
            .then(response => {
                setIsLoading(true)
                console.log("useLoggedIn: OK", "レスポンス: ", response.data.object)
                let res = response.data
                if (mount && res.logged_in) {
                    console.log("logged_in: ", res.logged_in)
                    handleLogin({ user: res.object })
                    setLoggedInStatus(true)
                    setCurrentUser(res.object.nickname)
                    setUserId(res.object.id)
                    setIsLoading(false)
                } else if (mount && !res.logged_in) {
                    console.log("logged_in: ", res.logged_in)
                handleLogout({})
                setIsLoading(false)
            }
            }).catch(error => console.log("ログインエラー", error))
        }
        checkLoginStatus()
        return () => { mount = false }
    }, [setIsLoading])

    return { loggedInStatus, currentUser, handleLogin, handleLogout, isLoading, setIsLoading, userId }
}