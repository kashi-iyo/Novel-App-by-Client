import React from 'react'

import validateSaveUser from '../CustomHooks/Validate/AuthValidate/validateSaveUser'
import signupValidate from '../CustomHooks/Validate/AuthValidate/signupValidate'
import useInput from '../CustomHooks/Auth/useInput'
import useAccessAuthLogging from '../CustomHooks/Auth/useAccessAuthLogging'

function Signup(props) {
    const { values, handleChange, handleSubmit, errors, saveErrors } = useInput({
        validate: signupValidate,
        method: "post",
        url: 'http://localhost:3001/users',
        props: props
    })
    // ログインした状態でこのページへアクセスされた場合ホームへリダイレクトする
    useAccessAuthLogging(props)

    // 新規登録フォーム
    const signupRenderer = () => {
        return (
            <div>
                {/* Railsからのerrors.full_messagesをレンダリングする */}
                {validateSaveUser(saveErrors)}
                <h1>新規登録</h1>
                <form onSubmit={handleSubmit}>
                    {errors.nickname && <p className="error">{errors.nickname}</p>}
                    <input
                        placeholder="nickname"
                        type="text"
                        name="nickname"
                        values={values.nickname}
                        onChange={handleChange}
                    />
                    {errors.accountId && <p className="error">{errors.accountId}</p>}
                    <input
                        placeholder="account_id"
                        type="text"
                        name="account_id"
                        values={values.accountId}
                        onChange={handleChange}
                    />
                    {errors.email && <p className="error">{errors.email}</p>}
                    <input
                        placeholder="email"
                        type="text"
                        name="email"
                        values={values.email}
                        onChange={handleChange}
                    />
                    {errors.password && <p className="error">{errors.password}</p>}
                    <input
                        placeholder="password"
                        type="password"
                        name="password"
                        values={values.password}
                        onChange={handleChange}
                    />
                    {errors.passwordConfirmation && <p className="error">{errors.passwordConfirmation}</p>}
                    <input
                        placeholder="password_confirmation"
                        type="password"
                        name="password_confirmation"
                        values={values.passwordConfirmation}
                        onChange={handleChange}
                    />
                    <button type="submit">新規登録</button>
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
