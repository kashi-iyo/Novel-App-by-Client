import { useState, useEffect } from 'react'
import axios from 'axios'

// ログイン状態を確認するカスタムフック
export default function useLoggedIn({handleFlashMessages}) {
    const [loggedInStatus, setLoggedInStatus] = useState(false)
    const [currentUser, setCurrentUser] = useState("")
    const [userId, setUserId] = useState("")
    const [isLoading, setIsLoading] = useState(true)


    // ログイン
    const handleLogin = ({ user, success, errors }) => {
        setLoggedInStatus(true)
        setCurrentUser(user.nickname)
        setUserId(user.id)
        success && handleFlashMessages({
            success: success
        })
        errors && handleFlashMessages({
            errors: errors
        })
    }

    // ログアウト
    const handleLogout = ({success, errors}) => {
        setLoggedInStatus(false)
        setCurrentUser("")
        success && handleFlashMessages({
            success: success
        })
        errors && handleFlashMessages({
            errors: errors
        })
    }

    // ログインステータスの追跡
    useEffect(() => {
        let mount = true
        const checkLoginStatus = () => {
        axios.get("http://localhost:3001/logged_in",
            { withCredentials: true })
            .then(response => {
                setIsLoading(true)
                console.log("useLoggedIn: OK")
                let res = response.data
                if (mount && res.logged_in) {
                    console.log("logged_in: ", res.logged_in)
                    handleLogin({ user: res.object })
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