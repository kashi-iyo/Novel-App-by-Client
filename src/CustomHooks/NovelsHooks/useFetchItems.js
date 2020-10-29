import { useState, useEffect } from "react"
import axios from 'axios'

// Home, Series, NovelsFeed, Novels, NovelsContents にて使用
export default function useFetchItems({ method, url }) {
    const [items, setItems] = useState([])  // 投稿データ
    const [count, setCount] = useState("")  // 投稿数
    const [errors, setErrors] = useState("")
    const [isLoading, setIsLoading] = useState(true)

    useEffect(() => {
        let mount = true
        const getItems = () => {
            axios[method](url, { withCredentials: true })
                .then(response => {
                    setIsLoading(true)
                    let res = response.data
                    let obj = res.object
                    let data_type = res.data_type
                    let crud_type = res.crud_type
                    let status = res.status
                    //Read シリーズ全件取得
                    if (mount && status === 200 && data_type === 'series' && crud_type === "index") {
                        setCount(obj.series_count)
                        setItems(obj.series)
                        setIsLoading(false)
                    //Read 1つのシリーズ取得 & このシリーズが所有する小説全件を取得
                    } else if (mount && status === 200 && data_type === 'series' && crud_type === "show") {
                        setItems(obj)
                        setIsLoading(false)
                    //Read 小説1話分を取得
                    } else if (mount && status === 200 && data_type === 'novel' && crud_type === "show") {
                        setItems(obj)
                        setIsLoading(false)
                    //error 非公開時のデータ
                    } else if (mount && status === "forbidden") {
                        setErrors(res.messages)
                        setIsLoading(false)
                    //error データが存在しない場合
                    } else if (mount && res.head === "no_content") {
                        setErrors(res.errors)
                        setIsLoading(false)
                    }
                })
                .catch(error => console.log(error))
        }
        getItems()
        localStorage.removeItem("key")
        localStorage.removeItem("tags")
        return () => { mount = false }
    }, [url, method, setIsLoading])


    return {
        items, count, errors, isLoading }
}