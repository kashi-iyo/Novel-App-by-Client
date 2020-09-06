import React, {useState} from 'react'
import axios from 'axios'
// import { Link } from 'react-router-dom'

function Login(props) {
    const [email, setEmail] = useState("")
    const [password, setPassword] = useState("")
    const [errors, setErrors] = useState("")
    const user = {user: {email: email, password: password}}

    const handleSubmit = (event) => {
        event.preventDefault()

        axios.post('http://localhost:3001/login', user, { withCredentials: true })
            .then(response => {
                if (response.data.logged_in) {
                    props.handleLogin(response)
                    redirect()
                } else {
                    setErrors(response.data.errors)
                }
            })
            .catch(error => console.log("エラー: ", error))
    }

    const redirect = () => {
        props.history.push("/")
    }

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

    return (
        <div>
            <h1>ログイン</h1>

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
            <div>
                {
                    errors ? handleErrors() : null
                }
            </div>
        </div>
    )
}

export default Login

// import React, { useState } from 'react'
// import axios from 'axios'
// import { Link } from 'react-router-dom'

// export default function Login(props) {
//     console.log(props.history)
//     const [email, setEmail] = useState("")
//     const [password, setPassword] = useState("")
//     const [loginErrors, setLoginErrors] = useState("")
//     const user =  {
//         user: {
//             email: email,
//             password: password,
//         }
//     }

//     const redirect = (props) => {
//         props.history.push("/")
//     }

//     const handleSubmit = (event) => {
//         event.preventDefault()
//         axios.post("http://localhost:3001/login", user, { withCredentials: true })
//             .then(response => {
//                 if (response.data.status === 'created') {
//                     console.log(props)
//                     props.handleLogin(response.data)
//                     redirect(response)
//                 } else {
//                     setLoginErrors(response.data.errors)
//                 }
//             }).catch(error => {
//                 console.log("registration error", error)
//             })
//     }

//     return (
//         <div>
//             <p>ログイン</p>
//             <div>
//                 {/* {loginErrors ? props.handleErrors() : null} */}
//             </div>
//             <form onSubmit={handleSubmit}>
//                 <input
//                     type="email"
//                     name="email"
//                     placeholder="メールアドレス"
//                     value={email}
//                     onChange={event => setEmail(event.target.value)}
//                 />
//                 <input
//                     type="password"
//                     name="password"
//                     placeholder="パスワード"
//                     value={password}
//                     onChange={event => setPassword(event.target.value)}
//                 />

//                 <button type="submit">ログイン</button>
//             </form>
//             <Link to="/signup">新規登録はコチラ</Link>
//             <Link to="/">ホーム</Link>
//         </div>
//     )
// }
