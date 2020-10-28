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
                    console.log(response.data)
                    let res = response.data
                    let object = res.object
                    let crud_type = res.crud_type
                    let data_type = res.data_type
                    let status = res.status
                    //Edit NovelSeriesオブジェクト編集用データ
                    if (mount && status === 200 && crud_type === 'edit' && data_type === "series") {
                        setItems(object)
                        setKeyword(data_type)
                    //Edit Novelsオブジェクト編集用データ
                    } else if (mount && status === 200 && crud_type === 'edit' && data_type === "novel") {
                        setItems(object)
                    //error 未認証の場合
                    } else if (mount && status === "unauthorized") {
                        setErrors(res.messages)
                        setTimeout(() => { redirect('/') }, 3000)
                    //error 非公開の場合
                    } else if (mount && status === 'forbidden') {
                        setErrors(res.messages)
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
        items, keyword, errors
    }
}