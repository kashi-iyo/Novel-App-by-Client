import { useState, useEffect } from "react"
import axios from 'axios'
import useRedirect from "../Redirect/useRedirect"

// Railsから編集用データを取得。
// →SeriesEdit, で使う
export default function useEditItems({method, url, history}) {
    const [items, setItems] = useState("")
    const [errors, setErrors] = useState("")
    const [isLoading, setIsLoading] = useState(true)
    const { redirect } = useRedirect({ history: history })

    useEffect(() => {
        let mount = true
        const getItems = () => {
            axios[method](url, { withCredentials: true })
                .then(response => {
                    setIsLoading(true)
                    console.log(response.data)
                    let res = response.data
                    let object = res.object
                    let crud_type = res.crud_type
                    let data_type = res.data_type
                    let status = res.status
                    //Edit NovelSeriesオブジェクト編集用データ
                    if (mount && status === 200 && crud_type === 'edit' && data_type === "series") {
                        setItems(object)
                        setIsLoading(false)
                    //Edit Novelsオブジェクト編集用データ
                    } else if (mount && status === 200 && crud_type === 'edit' && data_type === "novel") {
                        setItems(object)
                        setIsLoading(false)
                    //error 未認証の場合
                    } else if (mount && status === "unauthorized") {
                        setErrors(res.messages)
                        setTimeout(() => { redirect('/') }, 3000)
                        setIsLoading(false)
                    //error 非公開の場合
                    } else if (mount && status === 'forbidden') {
                        setErrors(res.messages)
                        setIsLoading(false)
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
        items, errors, isLoading
    }
}