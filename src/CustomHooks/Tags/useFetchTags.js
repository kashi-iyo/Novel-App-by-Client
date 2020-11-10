import {useState, useEffect} from 'react'
import axios from 'axios'

function useFetchTags({method, url, history, handleFlashMessages}) {
    const [items, setItems] = useState({
        tag: "",
        users: [],
        series: [],
        selectedValue: ""
    })
    const [isLoading, setIsLoading] = useState(true)

    useEffect(() => {
        let mount = true
        const getItems = () => {
            axios[method](url, { withCredentials: true })
                .then(response => {
                    console.log("useFetchTags: OK")
                    setIsLoading(true)
                    let res = response.data
                    let data_type = res.data_type
                    let crud_type = res.crud_type
                    let status = res.status
                    let obj = res.object
                    //Read NovelTagsフィード
                    if (mount && status === 200 && data_type === "series_tag" && crud_type === "index") {
                        setItems({ tag: obj })
                        setIsLoading(false)
                    //Read NovelTagsに紐付けられたNovelSeries
                    } else if (mount && status === 200 && data_type === "series_tag" && crud_type === "show") {
                        setItems({ tag: obj.tag, series: obj.series })
                        setIsLoading(false)
                    // タグに紐付けされたシリーズを、selectで並び替えされた場合
                    } else if (mount && status === 200 && data_type === "series_tag" && crud_type === "selected") {
                        console.log("useFetchTags: selectによる絞り込み", "レスポンス: ", obj)
                        setItems({
                            tag: obj.tag,
                            selectedValue: obj.selected_value,
                            series: obj.series
                        })
                        setIsLoading(false)
                    //Read UserTagsフィード
                    } else if (mount && status === 200 && data_type === "user_tag" && crud_type === "index") {
                        setItems({tag: obj})
                        setIsLoading(false)
                    //Read UserTagsに紐付けられたUsers
                    } else if (mount && status === 200 && data_type === "user_tag" && crud_type === "show") {
                        setItems({ tag: obj.tag, users: obj.users})
                        setIsLoading(false)
                    //error 存在しないタグにアクセスした場合
                    } else if (mount && res.head === "no_content") {
                        handleFlashMessages({
                            errors: res.errors,
                            history: history,
                            pathname: "/"
                        })
                    }
                })
                .catch(error => console.log(error) )
        }
        getItems()
        return () => { mount = false }
    }, [method, url, setIsLoading])



    return {
        items, setItems, isLoading
    }
}

export default useFetchTags
