import axios from 'axios'
import {useState} from 'react'

// 認証フォームのカスタムフック
function useInput({ validate, method, url, history, dataType, handleLogin, handleLogout, handleFlashMessages }) {
    const [values, setValues] = useState(() => {
        // Signup, Loginによって初期値を切り替え
        const signupValues = {
            nickname: "",
            account_id: "",
            email: "",
            password: "",
            password_confirmation: ""
        }
        const loginValues = { email: "", password: "" }
        if (dataType === "signup") {
            return signupValues
        } else if (dataType === "login") {
            return loginValues
        }
    })
    const [errors, setErrors] = useState("")
    const [saveErrors, setSaveErrors] = useState("")
    const [unauthorizedErrors, setUnauthorizedErrors] = useState("")

    const handleChange = e => {
        const { name, value } = e.target
        setValues({
            ...values,  //配列展開
            [name]: value   //振り分け
        })
    }

    // ログインイベント
    const handleSubmit = e => {
        console.log(values)
        e.preventDefault()
        if (Object.keys(validate(values)).length) {
            console.log(Object.keys(validate(values)).length)
            setErrors(validate(values))
        } if (!Object.keys(validate(values)).length) {
            axios[method](url,
                { user: values },
                { withCredentials: true })
                .then(response => {
                    console.log("ログインイベント: クリック")
                    let res = response.data
                    let status = res.status
                    let errorType = res.error_type
                    let obj = res.object
                    // 新規登録成功
                    if (status === "created") {
                        console.log("新規登録: OK", "レスポンス: ", res)
                        handleLogin({
                            user: obj,
                            success: res.successful,
                            history: history,
                            pathname: `/users/${obj.id}`
                        })
                    }
                    // ログイン成功
                    if (status === 200 && res.logged_in) {
                        console.log("ログイン: OK", "レスポンス: ", res)
                        handleLogin({
                            user: obj,
                            success: res.successful,
                            history: history,
                            pathname: `/users/${obj.id}`
                        })
                    // 新規登録(保存)失敗
                    } else if (status === "unprocessable_entity") {
                        console.log("新規登録: 失敗", "レスポンス", res.errors)
                        setSaveErrors(res.errors)
                    } else if (status === "unauthorized") {
                        // 入力内容によるログイン失敗
                        if (errorType === "authenticate_password") {
                            console.log("ログイン: 失敗", "レスポンス: ", res.errors)
                            setUnauthorizedErrors(res.errors)
                        // ログイン中にログインしようとする場合
                        // ログイン中に新規登録しようとする場合
                        } else if (errorType === "already_login") {
                            console.log("ログイン: 失敗（すでにログイン済み）", "レスポンス", res.errors)
                            handleFlashMessages({errors: res.errors})
                        }
                    }
                })
                .catch(err => console.log(err))
        }
    }

    // ログアウトイベント
    const logoutClick = () => {
        axios.delete('//54.65.39.121/logout',
            { withCredentials: true })
            .then(response => {
                console.log("logoutClick: クリック")
                let res = response.data
                if (res.status === 200 && !res.logged_in) {
                    console.log("logout: 成功", "レスポンス: ", response)
                    handleLogout({
                        success: res.successful,
                        history: history,
                        pathname: "/"
                    })
                } else if (res.status === "unauthorized") {
                    console.log("logout: 失敗", "レスポンス: ", response)
                    handleFlashMessages({ errors: res.errors })
                }
            })
            .catch(error => console.log(error))
    }

    // 採用担当者様専用ログインフォーム
    const handleLoginForRecruit = () => {
        axios.post(`//54.65.39.121/login`,
            {
                user: {
                    email: "recruit@recruit.com",
                    password: "123456"
            }},
            { withCredentials: true })
            .then(response => {
                console.log("handleLoginForRecruit: ok")
                let res = response.data
                let obj = res.object
                if (res.logged_in) {
                    console.log("response: ", res)
                    handleLogin({
                        user: obj,
                        success: res.successful,
                        history: history,
                        pathname: `/users/${obj.id}`
                    })
                } else if (res.status === "unauthorized") {
                    handleFlashMessages({ errors: res.errors })
                }
            })
            .catch(err => console.log(err))
    }

    return {values, handleChange, handleSubmit, logoutClick, errors, saveErrors, unauthorizedErrors ,handleLoginForRecruit}
}

export default useInput
