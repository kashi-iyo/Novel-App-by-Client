import React from 'react'

import './auth.css'
import validateSaveUser from '../../CustomHooks/Validate/AuthValidate/validateSaveUser'
import signupValidate from '../../CustomHooks/Validate/AuthValidate/signupValidate'
import useInput from '../../CustomHooks/Auth/useInput'

// 新規登録フォーム
function Signup({history, handleLogin, handleMessages}) {
    const { values, handleChange, handleSubmit, errors, saveErrors } = useInput({
        validate: signupValidate,
        method: "post",
        url: 'http://localhost:3001/api/v1/users',
        history: history,   // 新規登録後にリダイレクトするのに使用
        dataType: "signup",     // 送信フォームをLogin.jsと区別
        handleLogin: handleLogin,   // ログインを行う
        handleMessages: handleMessages  // フラッシュメッセージの表示に使用
    })

    return (
        <React.Fragment>
            <div className="auth-form">
                <h1 className="auth-form--h1">新規登録フォーム</h1>
                <form onSubmit={handleSubmit}>
                    <div className="auth-form--nickname-wrapper">
                        {errors.nickname && <p className="error">{errors.nickname}</p>}
                        <label htmlFor="nickname">ユーザー名</label>
                        <input
                            placeholder="ユーザー名"
                            id="nickname"
                            type="text"
                            name="nickname"
                            values={values.nickname}
                            onChange={handleChange}
                        />
                    </div>
                    <div className="auth-form--accountId-wrapper">
                        {errors.accountId && <p className="error">{errors.accountId}</p>}
                        <label htmlFor="accountId">ユーザーID</label>
                        <input
                            placeholder="ユーザーID"
                            id="accountId"
                            type="text"
                            name="account_id"
                            values={values.accountId}
                            onChange={handleChange}
                        />
                    </div>
                    <div className="auth-form--email-wrapper">
                        {errors.email && <p className="error">{errors.email}</p>}
                        <label htmlFor="email">メールアドレス</label>
                        <input
                            placeholder="メールアドレス"
                            id="email"
                            type="email"
                            name="email"
                            values={values.email}
                            onChange={handleChange}
                        />
                    </div>
                    <div className="auth-form--password-wrapper">
                        {errors.password && <p className="error">{errors.password}</p>}
                        <label htmlFor="password">パスワード</label>
                        <input
                            placeholder="パスワード"
                            id="password"
                            type="password"
                            name="password"
                            values={values.password}
                            onChange={handleChange}
                        />
                    </div>
                    <div className="auth-form--passConf-wrapper">
                        {errors.passwordConfirmation && <p className="error">{errors.passwordConfirmation}</p>}
                        <label htmlFor="passCon">パスワード（確認用）</label>
                        <input
                            id="passCon"
                            type="password"
                            name="password_confirmation"
                            placeholder="パスワード（確認用）"
                            values={values.passwordConfirmation}
                            onChange={handleChange}
                        />
                    </div>
                    <button type="submit" className="button">新規登録</button>
                </form>
                {/* Railsからのerrors.full_messagesをレンダリングする */}
                {saveErrors && validateSaveUser(saveErrors)}
            </div>
        </React.Fragment>
    )
}

export default Signup
