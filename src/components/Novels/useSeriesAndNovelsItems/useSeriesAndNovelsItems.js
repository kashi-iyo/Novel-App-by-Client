import { useState, useEffect } from 'react'
import axios from 'axios'

// シリーズデータ・小説データを取得するカスタムフック
export const useSeriesAndNovelsItems = (props) => {
    // 作者
    const [author, setAuthor] = useState("")
    // シリーズデータ
    const [seriesTitle, setSeriesTitle] = useState("")
    const [seriesDescription, setSeriesDescription] = useState("")
    // 小説データ全件
    const [novels, setNovels] = useState("")
    // 1話分の小説データ
    const [novelTitle, setNovelTitle] = useState("")
    const [novelDescription, setNovelDescription] = useState("")
    const [novelContent, setNovelContent] = useState("")
    // 公開or非公開
    const [release, setRelease] = useState(false)
    // エラーメッセージ
    const [releaseErrors, setReleaseErrors] = useState("")
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


    // Railsから小説1話分の内容を取得するライフサイクル
    useEffect(() => {
         // リダイレクト
        const redirect = () => {
            props.history.push("/")
        }
        const novelValue = () => {
            axios.get(`http://localhost:3001/api/v1${url}`, { withCredentials: true })
                .then(response => {
                    if (isMounted && response.data.status === 200) {
                        console.log(response.data.novel_in_series)
                        setSeriesTitle(response.data.novel_series.series_title)
                        setNovelTitle(response.data.novel_in_series.novel_title)
                        setNovelDescription(response.data.novel_in_series.novel_description)
                        setNovelContent(response.data.novel_in_series.novel_content)
                        setAuthor(response.data.novel_series.author)
                    } else if (isMounted && response.data.status === 400) {
                        setReleaseErrors(response.data.messages)
                        setTimeout(() => {redirect()}, 3000)
                    }
                })
                .catch(error => console.log("エラー: ", error))
        }
        setIsMounted(true)
        novelValue()
    }, [url, isMounted, props.history, params, setNovelTitle])

    return {
        seriesTitle, setSeriesTitle,
        seriesDescription, setSeriesDescription,
        novels, setNovels,
        novelTitle, setNovelTitle,
        novelDescription, setNovelDescription,
        novelContent, setNovelContent,
        release, setRelease,
        author, setAuthor,
        releaseErrors, setReleaseErrors,
        isMounted, setIsMounted,
        loggedInStatus, user, params, url
    }
}
