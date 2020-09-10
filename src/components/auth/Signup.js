import React, {useState, useEffect} from 'react'
import axios from 'axios'

import ErrorMessages from '../ErrorMessages/ErrorMessages'

function Signup(props) {
    const [nickname, setNickname] = useState("")
    const [accountId, setAccountId] = useState("")
    const [email, setEmail] = useState("")
    const [password, setPassword] = useState("")
    const [passwordConfirmation, setPasswordConfirmation] = useState("")
    const [errors, setErrors] = useState("")
    const loggedInStatus = props.loggedInStatus
    const handleLogin = props.handleLogin
    const user = {
        user:
        {
            nickname: nickname,
            account_id: accountId,
            email: email,
            password: password,
            password_confirmation: passwordConfirmation,
        }
    }

    // リダイレクト
    const redirect = () => {
        props.history.push("/")
    }

    const handleSubmit = (event) => {
        event.preventDefault()
        axios.post('http://localhost:3001/users', user, { withCredentials: true }).then(response => {
            if (response.data.status === 'created') {
                handleLogin(response)
                redirect()
            } else {
                setErrors(response.data.errors)
            }
        }).catch(error => console.log("エラー: ", error))
    }

    // ログイン済みの場合ホームへリダイレクト
    useEffect(() => {
        const handleValidatesSignup = () => {
            if (loggedInStatus) {
                setTimeout(() => {redirect()}, 3000)
            }
        }
        handleValidatesSignup()
    })

    const handleErrors = () => {
        return (
            <div>
                <ul>
                    {
                        errors.map(error => {
                            return <li key={error}>{error}</li>
                        })
                    }
                </ul>
            </div>
        )
    }

    const signupRenderer = () => {
        return (
            <div>
                <div>
                    {
                        errors ? handleErrors() : null
                    }
                </div>
                <h1>新規登録</h1>
                <form onSubmit={handleSubmit}>
                    <input
                        placeholder="nickname"
                        type="text"
                        name="nickname"
                        value={nickname}
                        onChange={e => setNickname(e.target.value)}
                    />
                    <input
                        placeholder="account_id"
                        type="text"
                        name="account_id"
                        value={accountId}
                        onChange={e => setAccountId(e.target.value)}
                    />
                    <input
                        placeholder="email"
                        type="text"
                        name="email"
                        value={email}
                        onChange={e => setEmail(e.target.value)}
                    />
                    <input
                        placeholder="password"
                        type="password"
                        name="password"
                        value={password}
                        onChange={e => setPassword(e.target.value)}
                    />
                    <input
                        placeholder="password_confirmation"
                        type="password"
                        name="password_confirmation"
                        value={passwordConfirmation}
                        onChange={e => setPasswordConfirmation(e.target.value)}
                    />
                    <button type="submit">新規登録</button>
                </form>
            </div>
        )
    }

    return (
        <div>
            {loggedInStatus ?
                <ErrorMessages {...props} accessErrors="すでに登録済みです。" /> :
                signupRenderer()
            }
        </div>
    )
}

export default Signup
