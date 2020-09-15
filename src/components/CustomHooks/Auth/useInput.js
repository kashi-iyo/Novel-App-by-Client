import axios from 'axios'
import {useState} from 'react'
import useLoggedIn from './useLoggedIn'

// 認証フォームのカスタムフック
function useInput({ validate, method, url, props }) {
    const [values, setValues] = useState({})
    const [errors, setErrors] = useState("")
    const [saveErrors, setSaveErrors] = useState("")
    const {handleLogin} = useLoggedIn()

    const handleChange = e => {
        const { name, value } = e.target
        setValues({
            ...values,
            [name]: value
        })
    }

    const handleSubmit = e => {
        e.preventDefault()
        const redirect = () => {
            props.history.push("/")
        }
        setErrors(validate(values))
        axios[method](url,
            { user: values },
            { withCredentials: true })
            .then(res => {
                let data = res.data
                if (data.logged_in || data.status === 'created') {
                    handleLogin(data.user)
                    redirect()
                } else if (data.status === 500) {
                    setSaveErrors(data.errors)
                }
            })
            .catch(err => console.log(err))
    }

    return {values, handleChange, handleSubmit, errors, saveErrors}
}

export default useInput
