import React from 'react'

import './auth.css'
import useInput from '../../CustomHooks/Auth/useInput'
import loginValidate from '../../CustomHooks/Validate/AuthValidate/loginValidate'

function Login({ history, handleLogin, handleMessages }) {
    const domain = process.env.REACT_APP_BACKEND_URL
    const { values, handleChange, handleSubmit, errors,unauthorizedErrors}
        = useInput({
            validate: loginValidate,
            method: "post",
            url: `${domain}/login`,
            history: history,   // リダイレクト用
            dataType: "login",  // 送信フォームをSignup.jsと区別
            handleLogin: handleLogin,   // ログインを行わせる
            handleMessages: handleMessages  // フラッシュメッセージの表示に使用
        })

    return (
        <div className="auth-form">
            <h1 className="auth-form--h1">ログインフォーム</h1>
            <form onSubmit={handleSubmit}>
                <div className="auth-form--email-wrapper">
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
            {unauthorizedErrors && <p className="error">{unauthorizedErrors}</p>}
        </div>
    )
}

export default Login