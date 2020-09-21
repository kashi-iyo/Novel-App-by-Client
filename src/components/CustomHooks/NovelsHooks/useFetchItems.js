import { useState, useEffect } from "react"
import axios from 'axios'

// Home, Series, NovelsFeed, Novels, NovelsContents にて使用
export default function useFetchItems({method, url}) {
    const [items, setItems] = useState("")
    const [novels, setNovels] = useState("")
    const [series, setSeries] = useState("")
    const [errors, setErrors] = useState("")

    useEffect(() => {
        const getItems = () => {
            axios[method](url, { withCredentials: true })
                .then(response => {
                    let res = response.data
                    let key = res.keyword
                    let ok = res.status === 200
                    // シリーズ全件取得
                    if (ok && key === 'index_of_series') {
                        setItems({ ...res.novel_series })
                    } else if (ok && key === 'novel_count') {
                        setItems(res.novel_count)
                    // 1つのシリーズ取得
                    } else if (ok && key === 'show_of_series') {
                        console.log(res)
                        // setItems({ ...res })
                        setNovels(res.novel_in_series)
                        setSeries(res.novel_series)
                    // 1つのシリーズが所有する小説全件取得
                    } else if (ok && key === 'index_of_novels') {
                        let novel = res.novel_in_series
                        let novelId = res.novel_id
                        let seriesTitle = res.series_title
                        let seriesId = res.series_id
                        setSeries({seriesId, seriesTitle})
                        setNovels({...novel, novelId})
                    // 非公開時のデータ
                    } else if (key === 'unrelease') {
                        setErrors(res.messages)
                    }
                })
                .catch(error => console.log(error))
        }
        getItems()
    }, [method, url], items)

    return {
        items, novels, series, errors
    }
}