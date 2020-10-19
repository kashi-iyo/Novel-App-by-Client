import { useState, useEffect } from "react"
import axios from 'axios'
import useRedirect from "../Redirect/useRedirect"

// Railsから編集用データを取得。
// →SeriesEdit, で使う
export default function useEditItems({method, url, history}) {
    const [items, setItems] = useState("")
    const [keyword, setKeyword] = useState("")  //handleSubmitにて送るデータを区別するのに使う
    const [errors, setErrors] = useState("")
    const { redirect } = useRedirect({ history: history })

    useEffect(() => {
        let mount = true
        const getItems = () => {
            axios[method](url, { withCredentials: true })
                .then(response => {
                    let editObject = response.data.object_for_edit
                    let key = res.keyword
                    let ok = res.status === 200
                    //Edit NovelSeriesオブジェクト編集用データ
                    if (mount && ok && key === 'edit_of_series') {
                        setItems(editObject)
                        setKeyword(key)
                    //Edit Novelsオブジェクト編集用データ
                    } else if (mount && ok && key === 'edit_of_novels') {
                        setItems(editObject)
                    //error 未認証の場合
                    } else if (mount && res.status === "unauthorized") {
                        setErrors(res.messages)
                        setTimeout(() => { redirect('/') }, 3000)
                    //error 非公開の場合
                    } else if (mount && key === 'unrelease') {
                        setErrors(res.messages)
                    }
                })
                .catch(error => console.log(error))
        }
        getItems()
        localStorage.removeItem("key")
        localStorage.removeItem("tags")
        return () => { mount = false }
    }, [method, url, redirect])

    return {
        items, keyword, errors
    }
}