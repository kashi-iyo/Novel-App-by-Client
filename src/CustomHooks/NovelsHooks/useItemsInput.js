import axios from 'axios'
import {useState, useEffect} from 'react'

// 投稿系機能のinputフィールドでの挙動を記述
// →SeriesForm, NovelsFormにて使用
function useItemsInput({ method, url, sendItems, history, formType, dataType, editTags, currentUser, handleFlashMessages }) {

    // シリーズ／小説の初期値
    // 1回目のレンダリング:
        // 作成の場合 → seriesState / novelStateが格納される。
        // 編集の場合 → sendItems（編集用データ）が格納される。
    // 2回目以降のレンダリング: localStateが格納される。
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
        // ローカルストレージに値がない、createフォーム、シリーズの作成の場合
        }   else if (dataType === "series" && formType === "create") {
            return seriesState
        // ローカルストレージに値がない、createフォーム、小説の作成の場合
        } else if (dataType === "novel" && formType === "create" ) {
            return novelState
        // ローカルストレージに値がない、編集フォームの場合
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
                let status = res.status
                let data_type = res.data_type
                // シリーズ作成成功
                if (status === "created" && data_type === "series") {
                    handleFlashMessages({
                        success: res.successful,
                        history: history,
                        pathname: `/novel_series/${res.object}`
                    })
                // シリーズ更新成功
                } else if (status === "ok" && data_type === "series") {
                    handleFlashMessages({
                        success: res.successful,
                        history: history,
                        pathname: `/novel_series/${res.object}`
                    })
                //Create 小説作成成功
                } else if (status === "created" && data_type === "novel_for_create") {
                    handleFlashMessages({
                        success: res.successful,
                        history: history,
                        pathname: `/novel_series/${res.object.series_id}/novels/${res.object.novel_id}`
                    })
                //Update 小説更新成功
                } else if (status === "ok" && data_type === "novel") {
                    handleFlashMessages({
                        success: res.successful,
                        history: history,
                        pathname: `/novel_series/${res.object.series_id}/novels/${res.object.novel_id}`
                    })
                //error 未認可の場合
                } else if (res.status === "unauthorized") {
                    // ログインしていない場合
                    // 別のユーザーのデータにアクセスしようとした場合
                    handleFlashMessages({
                        errors: res.errors,
                        history: history,
                        pathname: "/"
                    })
                //error オブジェクトの生成または更新に失敗した場合
                // タイトル空欄/内容空欄など
                } else if (res.status === "unprocessable_entity") {
                    handleFlashMessages({
                        errors: res.errors,
                    })
                }
            })
            .catch(err => console.log(err))
    }

    return {
        values, tags, addTags, removeTags, release,
        handleFalse, handleStatusChange, handleChange, handleSubmit,
    }
}

export default useItemsInput