import axios from 'axios'
import {useState} from 'react'

function useInput({ validate, method, url, props }) {
    const [values, setValues] = useState({})
    const [errors, setErrors] = useState({})

    const handleChange = e => {
        const { name, value } = e.target
        setValues({
            ...values,
            [name]: value
        })
        console.log(values)
    }

    // リダイレクト
    const redirect = () => {
        props.history.push("/")
    }

    const handleSubmit = e => {
        e.preventDefault()
        setErrors(validate(values))
        axios[method](url,
            { user: values },
            { widthCredentials: true })
            .then(res => {
                let data = res.data
                if (data.logged_in) {
                    props.handleLogin(data.user)
                    redirect()
                }
            })
            .catch(err => console.log(err))
    }

    return {values, handleChange, handleSubmit, errors}
}

export default useInput
