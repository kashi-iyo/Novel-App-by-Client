import axios from 'axios'
import {useState} from 'react'
import useLoggedIn from './useLoggedIn'

// 認証フォームのカスタムフック
function useInput({ validate, method, url, history }) {
    const [values, setValues] = useState({})
    const [errors, setErrors] = useState("")
    const [saveErrors, setSaveErrors] = useState("")
    const {handleLogin, handleLogout} = useLoggedIn()

    const handleChange = e => {
        const { name, value } = e.target
        setValues({
            ...values,  //配列展開
            [name]: value   //振り分け
        })
    }

    const handleSubmit = e => {
        e.preventDefault()
        const redirect = (url, message) => {
            history.push(url, message)
        }
        setErrors(validate(values))
        axios[method](url,
            { user: values },
            { withCredentials: true })
            .then(reaponse => {
                let res = reaponse.data
                let obj = res.object
                if (res.status === "created") {
                    handleLogin(obj)
                    redirect(`/users/${obj.user_id}`, res.successful)
                }
                if (res.logged_in) {
                    handleLogin(res.user)
                    redirect(`/users/${obj.user_id}`, res.successful)
                } else if (res.status === "unprocessable_entity") {
                    setSaveErrors(res.errors)
                } else if (res.status === "unauthorized") {
                    setErrors(res.errors)
                }
            })
            .catch(err => console.log(err))
    }

    // ログアウトイベント
    const logoutClick = () => {
        const redirect = (message) => {
            history.push("/", message)
        }
        axios.delete('http://localhost:3001/logout',
            { withCredentials: true })
            .then(response => {
                let res = response.data
                if (res.status === 200 && res.logged_out) {
                    handleLogout()
                    redirect(res.user)
                } else if (res.status === "unauthorized") {
                    setErrors(res.errors)
                }
            })
            .catch(error => console.log(error))
    }

    return {values, handleChange, handleSubmit, logoutClick, errors, saveErrors}
}

export default useInput
