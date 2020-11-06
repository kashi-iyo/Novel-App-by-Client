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

    const handleChange = e => {
        const { name, value } = e.target
        setValues({
            ...values,  //配列展開
            [name]: value   //振り分け
        })
    }

    const handleSubmit = e => {
        console.log(values)
        e.preventDefault()
        const redirect = (url) => {
            history.push(url)
        }
        setErrors(validate(values))
        if (!errors) {
            axios[method](url,
                { user: values },
                { withCredentials: true })
                .then(response => {
                    console.log(response)
                    let res = response.data
                    let status = res.status
                    let obj = res.object
                    // 新規登録成功
                    if (status === "created") {
                        handleLogin({ user: obj, success: res.successful })
                        redirect(`/users/${obj.id}`)
                    }
                    // ログイン成功
                    if (status === 200 && res.logged_in) {
                        handleLogin({ user: obj, success: res.successful })
                        redirect(`/users/${obj.id}`)
                    // 新規登録失敗
                    } else if (status === "unprocessable_entity") {
                        setSaveErrors(res.errors)
                    // 入力内容によるログイン失敗
                    // ログインしているのにログイン
                    // 新規登録しているのに新規登録しようとする場合
                    } else if (status === "unauthorized") {
                        setErrors(res.errors)
                    }
                })
                .catch(err => console.log(err))
        }
    }

    // ログアウトイベント
    const logoutClick = () => {
        const redirect = () => {
            history.push("/")
        }
        axios.delete('http://localhost:3001/logout',
            { withCredentials: true })
            .then(response => {
                console.log("logoutClick: クリック")
                let res = response.data
                if (res.status === 200 && !res.logged_in) {
                    console.log("logout: 成功")
                    handleLogout({success: res.successful})
                    redirect()
                } else if (res.status === "unauthorized") {
                    console.log("logout: 失敗")
                    handleFlashMessages({ errors: res.errors })
                }
            })
            .catch(error => console.log(error))
    }

    // 採用担当者様専用ログインフォーム
    const handleLoginForRecruit = () => {
        const redirect = (url) => {
            history.push(url)
        }
        axios.post(`http://localhost:3001/login`,
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
                    handleLogin({ user: obj, success: res.successful })
                    redirect(`/users/${obj.id}`)
                } else if (res.status === "unauthorized") {
                    handleFlashMessages({ errors: res.errors })
                }
            })
            .catch(err => console.log(err))
    }

    return {values, handleChange, handleSubmit, logoutClick, errors, saveErrors, handleLoginForRecruit}
}

export default useInput
