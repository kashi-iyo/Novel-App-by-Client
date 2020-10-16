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
                    // タグフィード
                    if (mount && ok && key === "tags_feed") {
                        setTags({ ...res.tags })
                        setIsLoading(false)
                    // タグに紐付けられたシリーズ
                    } else if (mount && ok && key === "series_in_tag") {
                        setTags(res.tag)
                        setCount(res.series_count)
                        setItems([ ...res.series_in_tag ])
                        setIsLoading(false)
                    // タグに紐付けられたユーザー
                    } else if (mount && ok && res.keyword === "users_in_tag") {
                        setTags(res.tags)
                        setItems([...res.users])
                        setIsLoading(false)
                    // 趣味タグフィード
                    } else if (mount && ok && res.keyword === "tags_feed") {
                        setTags({ ...res.tags })
                        setIsLoading(false)
                    // 非公開時のデータ
                    } else if (mount && key === 'unrelease') {
                        setErrors(res.messages)
                        setIsLoading(false)
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
