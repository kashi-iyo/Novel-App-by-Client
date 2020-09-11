import { useState, useEffect } from 'react'
import axios from 'axios'

// シリーズデータ・小説データを取得するカスタムフック
export const useSeriesItems = (props) => {
    // 作者
    const [author, setAuthor] = useState("")
    // シリーズデータ
    const [seriesTitle, setSeriesTitle] = useState("")
    const [seriesDescription, setSeriesDescription] = useState("")
    // 公開or非公開
    const [release, setRelease] = useState(false)
    // エラーメッセージ
    const [releaseErrors, setReleaseErrors] = useState("")
    const [errors, setErrors] = useState("")
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


    // Railsからシリーズを取得するライフサイクル
    useEffect(() => {
        // リダイレクト
        const redirect = () => {
            props.history.push("/")
        }
        const seriesValue = () => {
            axios.get(`http://localhost:3001/api/v1/${url}`, { withCredentials: true })
                .then(response => {
                    if (isMounted && response.data.status === 200) {
                        setSeriesTitle(response.data.novel_series.series_title)
                        setSeriesDescription(response.data.novel_series.series_description)
                        setAuthor(response.data.novel_series.author)
                        setRelease(response.data.novel_series.release)
                    } else if (isMounted && response.data.status === 400) {
                        setReleaseErrors(response.data.messages)
                        setTimeout(() => {redirect()}, 3000)
                    }
                })
                    .catch(error => console.log('エラー: ', error))
        }
        setIsMounted(true)
        seriesValue()
    }, [url, props.history, releaseErrors, isMounted])


    return {
        seriesTitle, setSeriesTitle,
        seriesDescription, setSeriesDescription,
        release, setRelease,
        author, setAuthor,
        releaseErrors, setReleaseErrors,
        errors, setErrors,
        isMounted, setIsMounted,
        loggedInStatus, user, params, url
    }
}
