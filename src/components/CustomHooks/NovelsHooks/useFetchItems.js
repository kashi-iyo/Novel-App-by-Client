import { useState, useEffect } from "react"
import axios from 'axios'


export default function useFetchItems({method, url}) {
    const [items, setItems] = useState({})
    const [errors, setErrors] = useState("")

    useEffect(() => {
        const getItems = () => {
            axios[method](url, { withCredentials: true })
                .then(response => {
                    let res = response.data
                    // シリーズ全件取得
                    if (res.status === 200 && res.keyword === 'index') {
                        setItems(res.novel_series)
                    // 1つのシリーズ取得
                    } else if (res.status === 200 && res.keyword === 'show') {
                        setItems({ ...res.novel_series, ...res })
                    // 1つのシリーズが所有する小説全件取得
                    } else if (res.status === 200 && res.keyword === 'index_of_novels') {
                        let novel = res.novel_in_series
                        let novelId = res.novel_id
                        let seriesTitle = res.series_title
                        let seriesId = res.series_id
                        setItems({ ...novel, novelId, seriesTitle, seriesId })
                    // 非公開時のデータ
                    } else if (res.keyword === 'unrelease') {
                        setErrors(res.messages)
                    }
                })
                .catch(error => console.log(error))
        }
        getItems()
    }, [])

    return {
        items, errors
    }
}