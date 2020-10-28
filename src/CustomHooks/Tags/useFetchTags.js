import {useState, useEffect} from 'react'
import axios from 'axios'

function useFetchTags({method, url}) {
    const [items, setItems] = useState([])  // 投稿データ
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
                    let data_type = res.data_type
                    let crud_type = res.crud_type
                    let status = res.status
                    let obj = res.object
                    // let tags = [...obj]             //タグ
                    //Read NovelTagsフィード
                    if (mount && status === 200 && data_type === "series_tag" && crud_type === "index") {
                        setItems(obj)
                        setIsLoading(false)
                    //Read NovelTagsに紐付けられたNovelSeries
                    } else if (mount && status === 200 && data_type === "series_tag" && crud_type === "show") {
                        setTags(obj.tag)
                        setItems(obj.series)
                        setIsLoading(false)
                    //Read UserTagsフィード
                    } else if (mount && status === 200 && data_type === "user_tag" && crud_type === "index") {
                        setItems(obj)
                        setIsLoading(false)
                    //Read UserTagsに紐付けられたUsers
                    } else if (mount && status === 200 && data_type === "user_tag" && crud_type === "show") {
                        setTags(obj.tag)
                        setItems(obj.users)
                        setIsLoading(false)
                    //error 存在しないタグにアクセスした場合
                    } else if (mount && res.head === "no_content") {
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
        items, tags, errors, isLoading
    }
}

export default useFetchTags
