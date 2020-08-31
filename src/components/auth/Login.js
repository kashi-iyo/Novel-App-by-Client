import React, { useState } from 'react'
import axios from 'axios'
import { Link } from 'react-router-dom'

export default function Login(props) {
    const [email, setEmail] = useState("")
    const [password, setPassword] = useState("")
    const [registrationErrors, setRegistrationErrors] = useState("")

    const handleSubmit = (event) => {
        axios.post("http://localhost:3001/login",
            {
                user: {
                    email: email,
                    password: password,
                }
            },
            { withCredentials: true }
        ).then(response => {
            console.log(response)
            if (response.data.status === 'created') {
                props.handleSuccessfulAuth(response.data)
            }
        }).catch(error => {
            console.log("registration error", error)
        })
        event.preventDefault()
    }

    return (
        <div>
            <p>ログイン</p>

            <form onSubmit={handleSubmit}>
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

                <button type="submit">ログイン</button>
            </form>
            <Link to="/signup">新規登録はコチラ</Link>
        </div>
    )
}
