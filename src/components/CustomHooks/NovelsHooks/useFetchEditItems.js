import { useState, useEffect } from "react"
import axios from 'axios'
import useRedirect from "../Redirect/useRedirect"

// Railsから編集用データを取得。
// →SeriesEdit, で使う
export default function useEditItems({method, url, props}) {
    const [items, setItems] = useState("")
    const [paramId, setParamId] = useState("")
    const [keyword, setKeyword] = useState("")  //handleSubmitにて送るデータを区別するのに使う
    const [errors, setErrors] = useState("")
    const [mounted, setMount] = useState(false)
    const { redirect } = useRedirect({ history: props.history })

    useEffect(() => {
        const getItems = () => {
            axios[method](url, { withCredentials: true })
                .then(response => {
                    let res = response.data
                    let key = res.keyword
                    let ok = res.status === 200
                    let series = res.novel_series
                    // 編集用のシリーズデータを取得
                    if (mounted && ok && key === 'edit_of_series') {
                        setItems(series)
                        setKeyword(key)
                    } else if (mounted && ok && key === 'edit_of_novels') {
                        let novels = res.novel_in_series
                        let novelsId = res.novels_id
                        let seriesId = res.series_id
                        setParamId({ novelsId, seriesId })
                        setItems(novels)
                    // 別のユーザーが編集しようとした場合のエラー
                    } else if (res.status === 401) {
                        setErrors(res.messages)
                        setTimeout(() => { redirect('/') }, 3000)
                    } else if (key === 'unrelease') {
                        setErrors(res.messages)
                    }
                })
                .catch(error => console.log(error))
        }
        getItems()
        setMount(true)
    }, [mounted, method, url, redirect])

    return {
        items, paramId, keyword, errors, mounted, setMount
    }
}