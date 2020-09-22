import React from 'react'

import './auth.css'
import useInput from '../CustomHooks/Auth/useInput'
import loginValidate from '../CustomHooks/Validate/AuthValidate/loginValidate'
import useAccessAuthLogging from '../CustomHooks/Auth/useAccessAuthLogging'
import ErrorMessages from '../ErrorMessages/ErrorMessages'
import useLoggedIn from '../CustomHooks/Auth/useLoggedIn'

function Login(props) {
    const { values, handleChange, handleSubmit, errors,}
        = useInput({
                validate: loginValidate,
                method: "post",
                url: 'http://localhost:3001/login',
                props: props
        })
    const {loggedInStatus} = useLoggedIn()
    // ログイン状態にこのページへアクセスされたらリダイレクト
    useAccessAuthLogging(props)

    // ログインフォーム
    const loginRenderer = () => {
        return (
            <div className="AuthForm">
                <h1 className="auth__h1">ログイン</h1>
                <form onSubmit={handleSubmit} className="login__Form">
                    <div className="email__Wrapper">
                        {errors.email && <p>{errors.email}</p>}
                        <label htmlFor="email" className="email__Label">メールアドレス</label>
                        <input
                            placeholder="email"
                            className="email"
                            type="email"
                            name="email"
                            id="email"
                            values={values.email}
                            onChange={handleChange}
                        />
                    </div>
                    <div className="password__Wrapper">
                        {errors.password && <p>{errors.password}</p>}
                        <label htmlFor="password" className="password__Label">パスワード</label>
                        <input
                            placeholder="password"
                            className="password"
                            type="password"
                            name="password"
                            id="password"
                            values={values.password}
                            onChange={handleChange}
                        />
                    </div>

                    <button type="submit" className="button auth__btn ">ログイン</button>
                </form>
            </div>
        )
    }

    const renderer = () => {
        if (loggedInStatus) {
            return <ErrorMessages loggedInStatus={loggedInStatus} errors={errors} />
        } else {
            return loginRenderer()
        }
    }


    return (
        <div>
            {renderer()}
        </div>
    )
}

export default Login