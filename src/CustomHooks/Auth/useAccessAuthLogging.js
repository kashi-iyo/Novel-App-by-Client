import {useEffect} from 'react'
import useLoggedIn from "./useLoggedIn"

// ログイン中に認証系ページへアクセスした場合の処理を実行させるカスタムフック
export default function useAccessAuthLogging(props) {
    const {loggedInStatus} = useLoggedIn()

    // ログイン状態ならばホームへリダイレクト（Login、Signupコンポーネントに使用）
    useEffect(() => {
        const redirect = () => {
            props.history.push("/")
        }
        const handleRejectAccess = () => {
            if (loggedInStatus) {
                setTimeout(() => {redirect()}, 3000)
            }
        }
        handleRejectAccess()
    })

}