import { useState, useEffect } from "react"
import axios from 'axios'
import useLoggedIn from "../Auth/useLoggedIn"

// Home, Series, NovelsFeed, Novels, NovelsContents にて使用
export default function useFetchItems({ method, url }) {
    const [items, setItems] = useState("")
    const [count, setCount] = useState("")
    const [tags, setTags] = useState("")
    const [seriesTags, setSeriesTags] = useState("")
    const [tagsId, setTagsId] = useState("")
    const [novels, setNovels] = useState("")
    const [series, setSeries] = useState("")
    const [errors, setErrors] = useState("")
    // const [mount, setMount] = useState(false)
    const { isLoading, setIsLoading } = useLoggedIn()

    useEffect(() => {
        // setMount(true)
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
                        setItems({ ...res.novel_series })
                        setTags({ ...res.tags })
                        // setSeriesTags({ ...res.tags_in_series })
                        setIsLoading(false)
                    } else if (mount && ok && key === 'series_tags') {
                        setTagsId(res.series_id)
                        setSeriesTags(res.series_tags)
                    // 1つのシリーズ取得
                    } else if (mount && ok && key === 'show_of_series') {
                        setNovels(res.novel_in_series)
                        setSeries(res.novel_series)
                        setIsLoading(false)
                    // 1つのシリーズが所有する小説全件取得
                    } else if (mount && ok && key === 'index_of_novels') {
                        let novel = res.novel_in_series
                        let novelId = res.novel_id
                        let seriesTitle = res.series_title
                        let seriesId = res.series_id
                        setSeries({seriesId, seriesTitle})
                        setNovels({ ...novel, novelId })
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
        return () => { mount = false }
    }, [method, url, setItems, setIsLoading])



    return {
        items, count, tags, seriesTags, tagsId, novels, series, errors, isLoading }
}