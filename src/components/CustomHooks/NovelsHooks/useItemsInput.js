import axios from 'axios'
import {useState, useEffect} from 'react'
import useRedirect from '../Redirect/useRedirect'

// 投稿系機能のinputフィールドでの挙動を記述
// →SeriesForm, NovelsFormにて使用
function useItemsInput({ method, url, mounted, setMount, sendItems, props, formType, dataType }) {

    const [values, setValues] = useState(() => {
        // 初期値
        const seriesState = { series_title: "", series_description: "" }
        const novelState = { novel_title: "", novel_description: "", novel_content: "" }
        // ローカルストレージから取得
        const localState = JSON.parse(localStorage.getItem("key"))

        // ローカルストレージに値がない、createフォーム、シリーズデータ
        if (localState === null && formType === "create" && dataType === "series") {
            return seriesState
        // ローカルストレージに値がない、createフォーム、小説データ
        } else if (localState === null && formType === "create" && dataType === "novel") {
            return novelState
        // ローカルストレージに値がない、編集フォーム
        } else if (localState == null && formType === "edit") {
            console.log("ok")
            return sendItems
        // ローカルストレージに値がある
        } else if (!!localState) {
            return localState
        }
    })
    const [release, setRelease] = useState(sendItems ? sendItems.release : false)           // 公開するかどうか
    const [itemSuccess, setItemSuccess] = useState("")        // 成功メッセージ
    const [itemErrors, setItemErrors] = useState("")                 // エラーメッセージ
    const {redirect} = useRedirect({history: props.history})

    // 入力データはブラウザに保存
    useEffect(() => {
        localStorage.setItem(
            "key", JSON.stringify(values)
        )
    },[values])

    // チェックボックスにチェックを入れた場合にtrueに切り替える。
    const handleStatusChange = () => {
        if (!release) {
            setRelease(true)
        } else if (release) {
            setRelease(false)
        }
    }

    // 入力した内容を保持
    const handleChange = e => {
        const { name, value } = e.target    //inputのname属性、value属性を取得
        setValues({
            ...values,      // {id:..., series_title: "...", }
            [name]: value,   // name: "series_title" value: "nameに紐づく値"
        })
    }

    // Railsへ送るJSONデータ
    const sendData = () => {
        if (dataType === "series") {
            return {
                novel_series: {
                    series_title: values.series_title,
                    series_description: values.series_description,
                    author: props.currentUser,
                    release: release
                }
            }
        } else if (dataType === "novel") {
            return {
                novel: {
                    novel_title: values.novel_title,
                    novel_description: values.novel_description,
                    novel_content: values.novel_content,
                    release: release
                }
            }
        }
    }


    // Railsへデータを送信し、画面を遷移
    const handleSubmit = e => {
        e.preventDefault()
        axios[method](url, sendData(), { withCredentials: true })
            .then(response => {
                let res = response.data
                let created = res.status === 'created'
                let updated = res.status === 'ok'
                let seriesId = res.series_id
                let novelsId = res.novels_id
                let key = res.keyword
                if (mounted && created && key === "create_of_series") {
                    setItemSuccess(res.successful)
                    setTimeout(() => { redirect(`/novel_series/${seriesId}`) }, 1500)
                } else if (mounted && updated && key === "update_of_series") {
                    setItemSuccess(res.successful)
                    setTimeout(() => { redirect(`/novel_series/${seriesId}`) }, 1500)
                } else if (mounted && created && key === "create_of_novels") {
                    setItemSuccess(res.successful)
                    setTimeout(() => { redirect(`/novel_series/${seriesId}/novels/${novelsId}`) }, 1500)
                } else if (mounted && updated && key === "update_of_novels") {
                    setItemSuccess(res.successful)
                    setTimeout(() => { redirect(`/novel_series/${seriesId}/novels/${novelsId}`) }, 1500)
                } else if (mounted && res.status === 401) {
                    setItemErrors(res.messages)
                } else if (mounted && res.status === "unprocessable_entity") {
                    setItemErrors(res.errors)
                }
            })
                .catch(err => setItemErrors(err))
        setMount(false)
        localStorage.removeItem("key")
        setItemErrors("")
        setItemSuccess("")
        setValues("")
        setRelease(false)
    }

    return {
        values, release,
        itemSuccess, itemErrors,
        handleStatusChange,
        handleChange,
        handleSubmit,
    }
}

export default useItemsInput