import axios from 'axios'
import {useState, useEffect} from 'react'
import useRedirect from '../Redirect/useRedirect'

// 投稿系機能のinputフィールドでの挙動を記述
// →SeriesForm, NovelsFormにて使用
function useItemsInput({ method, url, sendItems, history, formType, dataType, editTags, currentUser, setMount }) {

    // シリーズ／小説の初期値
    const [values, setValues] = useState(() => {
        // シリーズ
        const seriesState = { series_title: "", series_description: "" }
        // 小説
        const novelState = { novel_title: "", novel_description: "", novel_content: "" }
        // ローカルストレージから取得
        const localState = JSON.parse(localStorage.getItem("key"))

        // ローカルストレージに値がある
        if (!!localState) {
            return localState
        // ローカルストレージに値がない、createフォーム、シリーズデータ
        }   else if (dataType === "series" && formType === "create") {
            return seriesState
        // ローカルストレージに値がない、createフォーム、小説データ
        } else if (dataType === "novel" && formType === "create" ) {
            return novelState
        // ローカルストレージに値がない、編集フォーム
        } else if (formType === "edit") {
            return sendItems
        }
    })

    // タグの初期値
    const [tags, setTags] = useState(() => {
        // 空の配列
        const initialTags = []
        // ローカルストレージのタグの値
        const localTags = JSON.parse(localStorage.getItem("tags"))
        if (!!localTags) {
            return localTags
        } else if (formType === "create" && dataType === "series") {
            return initialTags
        } else if (formType === "edit" && dataType === 'series') {
            return editTags
        }
    })

    // 公開するかどうか
    const [release, setRelease] = useState(sendItems ? sendItems.release : false)
     // 成功メッセージ
    const [itemSuccess, setItemSuccess] = useState("")
    // エラーメッセージ
    const [itemErrors, setItemErrors] = useState("")
    // const [mount, setMount] = useState(false)
    // リダイレクト
    const {redirect} = useRedirect({history: history})

    // 入力データはブラウザに保存
    useEffect(() => {
        let mount = true
        if (mount) {
            localStorage.setItem(
                "key", JSON.stringify(values)
            )
            if (mount && dataType === "series") {
                localStorage.setItem(
                    "tags", JSON.stringify(tags)
                )
            }
        }
        return () => mount = false
    },[values, tags, dataType])

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

    // サブミットボタンをエンターで発火しないようにする
    // →タグの登録にEnterを使うため
    const handleFalse = e => {
        e.preventDefault()
    }

    // タグの追加
    const addTags = event => {
        const val = event.target.value
        if (val !== "") {
            setTags([ ...tags, val ])
            event.target.value = ""
        }
    }

    // タグの削除
    const removeTags = indexToRemove => {
        // クリックした要素意外の要素だけを返す（＝クリックした要素を消す）
        setTags(tags.filter((_, index) => index !== indexToRemove))
    }

    // Railsへ送るJSONデータ
    const sendData = () => {
        if (dataType === "series") {
            return {
                novel_series: {
                    series_title: values.series_title,
                    series_description: values.series_description,
                    author: currentUser,
                    release: release,
                    novel_tag_name: tags.join()
                }
            }
        } else if (dataType === "novel") {
            return {
                novel: {
                    novel_title: values.novel_title,
                    novel_description: values.novel_description,
                    novel_content: values.novel_content,
                    release: release,
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
                let created = res.status === 'created'  //作成成功
                let updated = res.status === 'ok'   //更新成功
                let seriesId = res.series_id    //シリーズID
                let novelsId = res.novels_id    //小説ID
                let key = res.keyword   //データのタイプ
                if (created && key === "create_of_series") {
                    setItemSuccess(res.successful)
                    setTimeout(() => { redirect(`/novel_series/${seriesId}`) }, 1500)
                } else if (updated && key === "update_of_series") {
                    setItemSuccess(res.successful)
                    setTimeout(() => { redirect(`/novel_series/${seriesId}`) }, 1500)
                } else if (created && key === "create_of_novels") {
                    setItemSuccess(res.successful)
                    setTimeout(() => { redirect(`/novel_series/${seriesId}/novels/${novelsId}`) }, 1500)
                } else if (updated && key === "update_of_novels") {
                    setItemSuccess(res.successful)
                    setTimeout(() => { redirect(`/novel_series/${seriesId}/novels/${novelsId}`) }, 1500)
                } else if (res.status === 401) {
                    setItemErrors(res.messages)
                } else if (res.status === "unprocessable_entity") {
                    setItemErrors(res.errors)
                }
            })
            .catch(err => setItemErrors(err))
        setItemSuccess("")
        setTimeout(() => setItemErrors(""), 3000)
    }

    return {
        values,
        tags, addTags, removeTags,
        release,
        itemSuccess, itemErrors,
        handleFalse,
        handleStatusChange,
        handleChange,
        handleSubmit,
    }
}

export default useItemsInput