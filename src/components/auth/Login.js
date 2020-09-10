import React, {useState, useEffect} from 'react'
import axios from 'axios'

import ErrorMessages from '../ErrorMessages/ErrorMessages'

function Login(props) {
    const [email, setEmail] = useState("")
    const [password, setPassword] = useState("")
    const [errors, setErrors] = useState("")
    const handleLogin = props.handleLogin
    const loggedInStatus = props.loggedInStatus
    const user = {user: {email: email, password: password}}

    // リダイレクト
    const redirect = () => {
        props.history.push("/")
    }

    const handleSubmit = (event) => {
        event.preventDefault()
        axios.post('http://localhost:3001/login',
            user,
            { withCredentials: true }
        )
            .then(response => {
                if (response.data.logged_in) {
                    handleLogin(response)
                    redirect()
                } else {
                    setErrors(response.data.errors)
                }
            })
            .catch(error => console.log("エラー: ", error))
    }

    // ログイン状態ならばホームへリダイレクト
    useEffect(() => {
        const handleValidatesLogin = () => {
            if (loggedInStatus) {
                setTimeout(() => {redirect()}, 3000)
            }
        }
        handleValidatesLogin()
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

    const loginRenderer = () => {
        return (
            <div className="Login">
                <h1>ログイン</h1>
                <div>
                    {
                        errors ? handleErrors() : null
                    }
                </div>
                <form onSubmit={handleSubmit}>
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
                    <button type="submit">ログイン</button>
                </form>
            </div>
        )
    }


    return (
        <div>
            {loggedInStatus ?
                <ErrorMessages {...props} accessErrors="すでにログインしています。" /> :
                loginRenderer()
            }
        </div>
    )
}

export default Login