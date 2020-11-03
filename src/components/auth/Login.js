import React from 'react'

import './auth.css'
import useInput from '../../CustomHooks/Auth/useInput'
import loginValidate from '../../CustomHooks/Validate/AuthValidate/loginValidate'
import validateSaveUser from '../../CustomHooks/Validate/AuthValidate/validateSaveUser'

function Login({history}) {
    const { values, handleChange, handleSubmit, errors, saveErrors}
        = useInput({
                validate: loginValidate,
                method: "post",
                url: 'http://localhost:3001/login',
                history: history
        })

    return (
        <div className="auth-form">
            {saveErrors && validateSaveUser(saveErrors)}
            <h1 className="auth-form--h1">ログイン</h1>
            <form onSubmit={handleSubmit}>
            <div className="auth-form--email_wrapper">
                {errors.email && <p>{errors.email}</p>}
                <label htmlFor="email">メールアドレス</label>
                <input
                    placeholder="email"
                    type="email"
                    name="email"
                    id="email"
                    values={values.email}
                    onChange={handleChange}
                />
            </div>
            <div className="auth-form--password-wrapper">
                {errors.password && <p>{errors.password}</p>}
                <label htmlFor="password">パスワード</label>
                <input
                    placeholder="password"
                    type="password"
                    name="password"
                    id="password"
                    values={values.password}
                    onChange={handleChange}
                />
            </div>

            <button type="submit" className="button">ログイン</button>
        </form>
        </div>
    )
}

export default Login