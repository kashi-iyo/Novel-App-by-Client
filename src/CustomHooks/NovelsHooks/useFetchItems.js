import { useState, useEffect } from "react"
import axios from 'axios'

// Home, Series, NovelsFeed, Novels, NovelsContents にて使用
export default function useFetchItems({ method, url, history, handleFlashMessages }) {
    const [items, setItems] = useState([])  // 投稿データ
    const [novelItems, setNovelItems] = useState({
        series: "",
        novel: "",
        novelIds: [],
        novelsCount: "",
        favorites: "",
        comments: ""
    })
    const [count, setCount] = useState("")  // 投稿数
    const [selectedValue, setSelectedValue] = useState("")
    const [isLoading, setIsLoading] = useState(true)

    useEffect(() => {
        let mount = true
        const getItems = () => {
            axios[method](url, { withCredentials: true })
                .then(response => {
                    setIsLoading(true)
                    console.log("useFetchItems: OK")
                    let res = response.data
                    let obj = res.object
                    let data_type = res.data_type
                    let crud_type = res.crud_type
                    let status = res.status
                    //Read シリーズ全件取得
                    if (mount && status === 200 && data_type === 'series' && crud_type === "index") {
                        console.log("シリーズ全件取得成功: ", "レスポンス", res)
                        setCount(obj.series_count)
                        setItems(obj.series)
                        setIsLoading(false)
                    //Read 1つのシリーズ取得 & このシリーズが所有する小説全件を取得
                    } else if (mount && status === 200 && data_type === 'series' && crud_type === "show") {
                        console.log("シリーズ1件取得成功: ", "レスポンス", res)
                        setItems(obj)
                        setIsLoading(false)
                    //Read 小説1話分を取得
                    } else if (mount && status === 200 && data_type === 'novel' && crud_type === "show") {
                        console.log("小説1件取得成功: ", "レスポンス", res)
                        setNovelItems({
                            series: obj.series,
                            novel: obj.novel,
                            novelIds: obj.novels_ids,
                            novelsCount: obj.novels_count,
                            favorites: obj.favorites_obj,
                            comments: obj.comments_obj
                        })
                        setIsLoading(false)
                    //Read selectタグで並び替えた後のシリーズ全件取得
                    } else if (mount && status === 200 && data_type === "series" && crud_type === "selected") {
                        console.log("select並び替え後のシリーズ全件取得成功: ", "レスポンス", res)
                        setCount(obj.series_count)
                        setItems(obj.series)
                        setSelectedValue(obj.selected_value)
                        setIsLoading(false)
                    //error 非公開時のデータ
                    } else if (mount && status === "forbidden") {
                        console.log("取得失敗: 非公開データ", "レスポンス", res)
                        handleFlashMessages({
                            errors: res.errors,
                            history: history,
                            pathname: "/"
                        })
                    //error データが存在しない場合
                    } else if (mount && res.head === "no_content") {
                        console.log("取得失敗: 存在しないデータ", "レスポンス", res)
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
    }, [url, method, setIsLoading])


    return {
        items, novelItems, count, isLoading, selectedValue
    }
}