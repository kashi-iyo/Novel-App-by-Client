import { useState, useEffect } from 'react'
import axios from 'axios'

// ログイン状態を確認するカスタムフック
export default function useLoggedIn() {
    const [loggedInStatus, setLoggedInStatus] = useState(false)
    const [currentUser, setCurrentUser] = useState("")
    const [userId, setUserId] = useState("")
    const [messages, setMessages] = useState("")
    const [isLoading, setIsLoading] = useState(true)


    // ログイン
    const handleLogin = (user) => {
        setLoggedInStatus(true)
        setCurrentUser(user.nickname)
        setUserId(user.id)
    }

    // ログアウト
    const handleLogout = () => {
        setLoggedInStatus(false)
        setCurrentUser("")
    }

    // ログインステータスの追跡
    useEffect(() => {
        let mount = true
        const checkLoginStatus = () => {
        axios.get("http://localhost:3001/logged_in",
            { withCredentials: true })
            .then(response => {
                console.log(response)
                setIsLoading(true)
                let res = response.data
            if (mount && res.logged_in) {
                handleLogin(res.user)
                setIsLoading(false)
            } else if (mount && !res.logged_in) {
                handleLogout()
                setIsLoading(false)
            }
            }).catch(error => console.log("ログインエラー", error))
        }
        checkLoginStatus()
        return () => { mount = false }
    }, [setIsLoading])

    return { loggedInStatus, currentUser, handleLogin, handleLogout, isLoading, setIsLoading, userId, messages, handleMessages }
}