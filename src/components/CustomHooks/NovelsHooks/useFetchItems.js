import { useState, useEffect } from "react"
import axios from 'axios'

// Home, Series, NovelsFeed, Novels, NovelsContents にて使用
export default function useFetchItems({ method, url }) {
    const [items, setItems] = useState([])  // 投稿データ
    const [count, setCount] = useState("")  // 投稿数
    const [favoritesCount] = useState("")    // お気に入り数
    const [commentsCount, setCommentsCount] = useState("")
    const [tags, setTags] = useState("")
    const [seriesTags] = useState("")
    const [tagsId] = useState("")
    const [novels, setNovels] = useState("")
    const [series, setSeries] = useState("")
    const [errors, setErrors] = useState("")
    const [isLoading, setIsLoading] = useState(true)

    useEffect(() => {
        let mount = true
        const getItems = () => {
            axios[method](url, { withCredentials: true })
                .then(response => {
                    setIsLoading(true)
                    let res = response.data
                    let key = res.keyword
                    let ok = res.status === 200
                    // シリーズ全件取得
                    if (mount && ok && key === 'index_of_series') {
                        setCount(res.series_count)
                        setItems([...res.all_series])
                        setIsLoading(false)
                    // タグフィード
                    } else if (mount && ok && key === "tags_feed") {
                        setTags({ ...res.tags })
                        setIsLoading(false)
                    // タグに紐付けられたシリーズ
                    } else if (mount && ok && key === "series_in_tag") {
                        setTags(res.tag)
                        setCount(res.series_count)
                        setItems({ ...res.series_in_tag })
                        setIsLoading(false)
                    // 1つのシリーズ取得 & このシリーズが所有する小説全件を取得
                    } else if (mount && ok && key === 'show_of_series') {
                        setItems([...res.series])
                        setIsLoading(false)
                    // 小説1話分を取得
                    } else if (mount && ok && key === 'index_of_novels') {
                        let novel = res.novel_in_series
                        let novelId = res.novel_id
                        let seriesTitle = res.series_title
                        let seriesId = res.series_id
                        setSeries({seriesId, seriesTitle})
                        setNovels({ ...novel, novelId })
                        setCommentsCount(res.comment_count)
                        setIsLoading(false)
                    // 非公開時のデータ
                    } else if (mount && key === 'unrelease') {
                        setErrors(res.messages)
                        setIsLoading(false)
                    }
                })
                .catch(error => {
                    setIsLoading(true)
                    console.log(error)
                })
        }
        getItems()
        localStorage.removeItem("key")
        localStorage.removeItem("tags")
        return () => { mount = false }
    }, [method, url, setIsLoading])



    return {
        items, count, favoritesCount, commentsCount, tags, seriesTags, tagsId, novels, series, errors, isLoading }
}