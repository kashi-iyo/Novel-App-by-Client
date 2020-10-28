import React from 'react'

import './auth.css'
import validateSaveUser from '../../CustomHooks/Validate/AuthValidate/validateSaveUser'
import signupValidate from '../../CustomHooks/Validate/AuthValidate/signupValidate'
import useInput from '../../CustomHooks/Auth/useInput'
import useAccessAuthLogging from '../../CustomHooks/Auth/useAccessAuthLogging'

function Signup(props) {
    const { values, handleChange, handleSubmit, errors, saveErrors } = useInput({
        validate: signupValidate,
        method: "post",
        url: 'http://localhost:3001/api/v1/users',
        props: props
    })
    // ログインした状態でこのページへアクセスされた場合ホームへリダイレクトする
    useAccessAuthLogging(props)

    // 新規登録フォーム
    const signupRenderer = () => {
        return (
            <div className="AuthForm">
                {/* Railsからのerrors.full_messagesをレンダリングする */}
                {validateSaveUser(saveErrors)}
                <h1 className="auth__h1">新規登録</h1>
                <form onSubmit={handleSubmit}>
                    <div className="nickname__Wrapper">
                        {errors.nickname && <p className="error">{errors.nickname}</p>}
                        <label htmlFor="nickname" className="nickname__Label">ユーザー名</label>
                        <input
                            placeholder="ユーザー名"
                            className="nickname"
                            id="nickname"
                            type="text"
                            name="nickname"
                            values={values.nickname}
                            onChange={handleChange}
                        />
                    </div>
                    <div className="accountId__Wrapper">
                        {errors.accountId && <p className="error">{errors.accountId}</p>}
                        <label htmlFor="accountId" className="accountId__Label">ユーザーID</label>
                        <input
                            placeholder="ユーザーID"
                            className="accounrId"
                            id="accountId"
                            type="text"
                            name="account_id"
                            values={values.accountId}
                            onChange={handleChange}
                        />
                    </div>
                    <div className="email__Wrapper">
                        {errors.email && <p className="error">{errors.email}</p>}
                        <label htmlFor="email" className="email__Label">メールアドレス</label>
                        <input
                            placeholder="メールアドレス"
                            className="email"
                            id="email"
                            type="email"
                            name="email"
                            values={values.email}
                            onChange={handleChange}
                        />
                    </div>
                    <div className="password__Wrapper">
                        {errors.password && <p className="error">{errors.password}</p>}
                        <label htmlFor="password" className="password__Label">パスワード</label>
                        <input
                            placeholder="パスワード"
                            className="password"
                            id="password"
                            type="password"
                            name="password"
                            values={values.password}
                            onChange={handleChange}
                        />
                    </div>
                    <div className="passConf__Wrapper">
                        {errors.passwordConfirmation && <p className="error">{errors.passwordConfirmation}</p>}
                        <label htmlFor="passCon" className="passConf__Label">パスワード（確認用）</label>
                        <input
                            id="passCon"
                            type="password"
                            className="passConf"
                            name="password_confirmation"
                            placeholder="パスワード（確認用）"
                            values={values.passwordConfirmation}
                            onChange={handleChange}
                        />
                    </div>
                    <button type="submit" className="button auth__btn">新規登録</button>
                </form>
            </div>
        )
    }

    return (
        <div>
            {signupRenderer()}
        </div>
    )
}

export default Signup
