import {useState, useEffect} from 'react'
import axios from 'axios'

function useFetchTags({method, url}) {
    const [items, setItems] = useState([])  // 投稿データ
    const [count, setCount] = useState("")  // 投稿数
    const [tags, setTags] = useState("")
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
                    let obj = res.read_object
                    let tags = [...obj]             //タグ
                    let count = obj.objects_count   //オブジェクト総数
                    let arr = [...obj.objects]      //オブジェクト
                    //Read NovelTagsフィード
                    if (mount && ok && key === "index_of_series_tags") {
                        setTags(tags)
                        setIsLoading(false)
                    //Read NovelTagsに紐付けられたNovelSeries
                    } else if (mount && ok && key === "show_of_series_in_tag") {
                        setTags(obj.tag)
                        setCount(count)
                        setItems(arr)
                        setIsLoading(false)
                    //Read UserTagsフィード
                    } else if (mount && ok && res.keyword === "index_of_user_tags") {
                        setTags(tags)
                        setIsLoading(false)
                    //Read UserTagsに紐付けられたUsers
                    } else if (mount && ok && res.keyword === "show_of_users_in_tag") {
                        setTags(obj.tag)
                        setCount(count)
                        setItems(arr)
                        setIsLoading(false)
                    //error 非公開時のデータ
                    } else if (mount && key === 'unrelease') {
                        setErrors(res.messages)
                        setIsLoading(false)
                    //error データが存在しない場合
                    } else if (mount && key === "not_present") {
                        setErrors(res.errors)
                    }
                })
                .catch(error => {
                    if (mount) {
                        setIsLoading(true)
                        console.log(error)
                    }
                })
        }
        getItems()
        return () => { mount = false }
    }, [method, url, setIsLoading])



    return {
        items, count, tags, errors, isLoading
    }
}

export default useFetchTags
