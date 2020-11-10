import { useState, useEffect } from "react"
import axios from 'axios'

// Railsから編集用データを取得。
// →SeriesEdit, で使う
export default function useEditItems({method, url, history, handleFlashMessages}) {
    const [items, setItems] = useState("")
    const [errors, setErrors] = useState("")
    const [isLoading, setIsLoading] = useState(true)

    useEffect(() => {
        let mount = true
        const getItems = () => {
            axios[method](url, { withCredentials: true })
                .then(response => {
                    setIsLoading(true)
                    console.log(response.data)
                    let res = response.data
                    let object = res.object
                    let crud_type = res.crud_type
                    let data_type = res.data_type
                    let status = res.status
                    //Edit NovelSeriesオブジェクト編集用データ
                    if (mount && status === 200 && crud_type === 'edit' && data_type === "series") {
                        setItems(object)
                        setIsLoading(false)
                    //Edit Novelsオブジェクト編集用データ
                    } else if (mount && status === 200 && crud_type === 'edit' && data_type === "novel") {
                        setItems(object)
                        setIsLoading(false)
                    // 別のユーザーのデータにアクセスしようとした場合
                    } else if (mount && status === "unauthorized") {
                        handleFlashMessages({
                            errors: res.errors,
                            history: history,
                            pathname: "/"
                        })
                    // 存在しないデータにアクセスした場合
                    } else if (mount && res.head === "no_content") {
                        handleFlashMessages({
                            errors: res.errors,
                            history: history,
                            pathname: "/"
                        })
                    }
                })
                .catch(error => console.log(error))
        }
        getItems()
        localStorage.removeItem("key")
        localStorage.removeItem("tags")
        return () => { mount = false }
    }, [method, url])

    return {
        items, errors, isLoading
    }
}