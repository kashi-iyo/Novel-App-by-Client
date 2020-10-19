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
                    let key = res.keyword
                    let ok = res.status === 200
                    //Read シリーズ全件取得
                    if (mount && ok && key === 'index_of_series') {
                        setCount(res.read_object.series_count)
                        setItems([...res.read_object.all_series])
                        setIsLoading(false)
                    //Read 1つのシリーズ取得 & このシリーズが所有する小説全件を取得
                    } else if (mount && ok && key === 'show_of_series') {
                        setItems(res.read_object)
                        setIsLoading(false)
                    //Read 小説1話分を取得
                    } else if (mount && ok && key === 'show_of_novels') {
                        setItems(res.read_object)
                        setIsLoading(false)
                    //error 非公開時のデータ
                    } else if (mount && res.status === "forbidden" && key === 'unrelease') {
                        setErrors(res.messages)
                        setIsLoading(false)
                    //error データが存在しない場合
                    } else if (mount && res.status === "no_content" && key === "not_present") {
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
    }, [method, url, setIsLoading])



    return {
        items, count, errors, isLoading }
}