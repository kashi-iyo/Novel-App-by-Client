import React, {useEffect} from 'react'

import ErrorMessages from '../ErrorMessages/ErrorMessages'
import useInput from './CustomHooks/AuthHooks/useInput'
import loginValidate from './CustomHooks/Validate/loginValidate'

function Login(props) {
    const { values, handleChange, handleSubmit, errors,}
        = useInput({
                validate: loginValidate,
                method: "post",
                url: 'http://localhost:3001/login',
                props: props
        })
    const loggedInStatus = props.loggedInStatus



    // ログイン状態ならばホームへリダイレクト
    useEffect(() => {
        const redirect = () => {
            props.history.push("/")
        }
        const handleValidatesLogin = () => {
            if (loggedInStatus) {
                setTimeout(() => {redirect()}, 3000)
            }
        }
        handleValidatesLogin()
    })

    const loginRenderer = () => {
        return (
            <div className="Login">
                <h1>ログイン</h1>
                <h1>ログイン</h1>
                <form onSubmit={handleSubmit}>
                    {errors.email && <p>{errors.email}</p>}
                    <input
                        placeholder="email"
                        type="text"
                        name="email"
                        values={values.email}
                        onChange={handleChange}
                    />
                    {errors.password && <p>{errors.password}</p>}
                    <input
                        placeholder="password"
                        type="password"
                        name="password"
                        values={values.password}
                        onChange={handleChange}
                    />

                    <button type="submit">ログイン</button>
                </form>
            </div>
        )
    }


    return (
        <div>
            {loggedInStatus ?
                <ErrorMessages {...props} accessErrors="すでにログインしています。" /> :
                loginRenderer()
            }
        </div>
    )
}

export default Login