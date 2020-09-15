import React from 'react'

import useInput from '../CustomHooks/Auth/useInput'
import loginValidate from '../CustomHooks/Validate/AuthValidate/loginValidate'
import useAccessAuthLogging from '../CustomHooks/Auth/useAccessAuthLogging'

function Login(props) {
    const { values, handleChange, handleSubmit, errors,}
        = useInput({
                validate: loginValidate,
                method: "post",
                url: 'http://localhost:3001/login',
                props: props
        })
    // ログイン状態にこのページへアクセスされたらリダイレクト
    useAccessAuthLogging(props)

    // ログインフォーム
    const loginRenderer = () => {
        return (
            <div className="Login">
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
            {loginRenderer()}
        </div>
    )
}

export default Login