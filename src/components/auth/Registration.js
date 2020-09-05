import React, { useState } from 'react'
import axios from 'axios'
import { Link } from 'react-router-dom'

export default function Registration(props) {
    console.log(props)
    const [nickname, setNickname] = useState("")
    const [accountId, setAccountId] = useState("")
    const [email, setEmail] = useState("")
    const [password, setPassword] = useState("")
    const [passwordConfirmation, setPasswordConfirmation] = useState("")
    const [admin, setAdmin] = useState(false)
    // const [registrationErrors, setRegistrationErrors] = useState("")
    const user = {
        user: {
            nickname: nickname,
            account_id: accountId,
            email: email,
            password: password,
            password_confirmation: passwordConfirmation,
            admin: admin
        }
    }

    const redirect = (props) => {
        props.history.push("/")
    }

    const handleSubmit = (event) => {
        event.preventDefault()
        axios.post("http://localhost:3001/users", user, { withCredentials: true })
            .then(response => {
                if (response.data.status === 'created') {
                    props.handleLogin(response.data)
                    redirect(response)
                } else {
                    // setRegistrationErrors(response.data.errors)
                }
            }).catch(error => {
                console.log("registration error", error)
            })
    }

    return (
        <div>
            <p>新規登録</p>

            {/* {registrationErrors ? props.handleErrors() : null} */}
            <form onSubmit={handleSubmit}>
                <input
                    type="text"
                    name="nickname"
                    placeholder="ユーザー名"
                    value={nickname}
                    onChange={event => setNickname(event.target.value)}
                />
                <input
                    type="text"
                    name="account_id"
                    placeholder="ユーザーID"
                    value={accountId}
                    onChange={event => setAccountId(event.target.value)}
                />
                <input
                    type="email"
                    name="email"
                    placeholder="メールアドレス"
                    value={email}
                    onChange={event => setEmail(event.target.value)}
                />
                <input
                    type="password"
                    name="password"
                    placeholder="パスワード"
                    value={password}
                    onChange={event => setPassword(event.target.value)}
                />
                <input
                    type="password"
                    name="password_confirmation"
                    placeholder="確認用パスワード"
                    value={passwordConfirmation}
                    onChange={event => setPasswordConfirmation(event.target.value)}
                />

                <button type="submit">登録</button>
            </form>
            <Link to="/login">ログインはコチラ</Link>
            <Link to="/">ホーム</Link>
        </div>
    )
}
