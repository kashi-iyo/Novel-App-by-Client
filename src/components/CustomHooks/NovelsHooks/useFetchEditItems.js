import { useState, useEffect } from "react"
import axios from 'axios'

import useLoggedIn from '../Auth/useLoggedIn'

// Railsから編集用データを取得。
// →SeriesEdit, で使う
export default function useEditItems({method, url, props}) {
    const [items, setItems] = useState("")
    const [keyword, setKeyword] = useState("")  //handleSubmitにて送るデータを区別するのに使う
    const [errors, setErrors] = useState("")
    const [isMounted, setIsMounted] = useState(false)
    const { loggedInStatus } = useLoggedIn()

    useEffect(() => {
        // ログインしていればホームへ、していなければログインフォームへ
        const redirect = () => {
            if (loggedInStatus) {
                props.history.push("/")
            } else {
                props.history.push("/login")
            }
        }
        const getItems = () => {
            axios[method](url, { withCredentials: true })
                .then(response => {
                    let res = response.data
                    let key = res.keyword
                    let ok = res.status === 200
                    let series = res.novel_series
                    // 編集用のシリーズデータを取得
                    if (isMounted && ok && key === 'edit_of_series') {
                        setItems(series)
                        setKeyword(key)
                    // 別のユーザーが編集しようとした場合のエラー
                    } else if (res.status === 401) {
                        setErrors(res.messages)
                        setTimeout(() => { redirect() }, 3000)
                    } else if (key === 'unrelease') {
                        setErrors(res.messages)
                    }
                })
                .catch(error => console.log(error))
        }
        getItems()
        setIsMounted(true)
    }, [isMounted])

    return {
        items, keyword, errors, setIsMounted
    }
}