import { useState, useEffect } from 'react'
import axios from 'axios'

// シリーズデータ・小説データを取得するカスタムフック
export const useAllNovelsItems = (props) => {
    // 小説データ全件
    const [novels, setNovels] = useState("")
    // マウント切り替え
    const [isMounted, setIsMounted] = useState(false)
    // ログインの有無
    const loggedInStatus = props.loggedInStatus
    // ログインユーザー
    const user = props.user.nickname
    // ブラウザの持つパラメータを取得
    const params = props.match.params.id
    // ブラウザで取得したURL
    const url = props.match.url


    // Railsからシリーズが所有する小説を取得するライフサイクル
    useEffect(() => {
        const novelsValue = () => {
            axios.get(`http://localhost:3001/api/v1/novel_series/${params}/novels`, { withCredentials: true })
                .then(response => {
                    if (isMounted && response.data.status === 200) {
                        setNovels(response.data.novels_in_series)
                    }
                })
                .catch(error => console.log("エラー: ", error))
        }
        setIsMounted(true)
        novelsValue()
    }, [params, isMounted])


    return {
        novels, setNovels,
        isMounted, setIsMounted,
        loggedInStatus, user, params, url
    }
}
