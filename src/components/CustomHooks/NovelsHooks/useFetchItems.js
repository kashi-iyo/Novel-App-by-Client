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
                    let key = res.keyword
                    let ok = res.status === 200
                    // シリーズ全件取得
                    if (ok && key === 'index_of_series') {
                        setItems(res.novel_series)
                    // 1つのシリーズ取得
                    } else if (ok && key === 'show_of_series') {
                        setItems({
                            ...res.novel_series,
                            ...res.novel_in_series
                        })
                    // 1つのシリーズが所有する小説全件取得
                    } else if (ok && key === 'index_of_novels') {
                        let novel = res.novel_in_series
                        let novelId = res.novel_id
                        let seriesTitle = res.series_title
                        let seriesId = res.series_id
                        setItems({ ...novel, novelId, seriesTitle, seriesId })
                    // 非公開時のデータ
                    } else if (key === 'unrelease') {
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