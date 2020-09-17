import axios from 'axios'
import {useState, useEffect} from 'react'

// 投稿系昨日のinputフィールドでの挙動を記述
// →SeriesFormにて使用
function useNovelsInput({ method, url, mount, sendItems, props }) {
    // 元からあるデータがあればそれをフォームに表示、入力するたびにその値をフォームに表示
    const initialState = "" || JSON.parse(localStorage.getItem("keys")) || sendItems
    const [values, setValues] = useState(initialState)  // 入力データ、作者データなどを格納する
    const [release, setRelease] = useState(false)   // 公開するかどうか
    const [successful, setSuccessful] = useState("")    // 成功メッセージ
    const [errors, setErrors] = useState("")  // エラーメッセージ
    const [existingErrors, setExistingErrors] = useState("")

    // 入力データはブラウザに保存
    useEffect(() => {
        localStorage.setItem(
            "keys", JSON.stringify(values)
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
    const items = {
        novel_series: {
            series_title: values.series_title,
            series_description: values.series_description,
            author: values.author ? values.author : props.user.nickname,
            release: values.release ? values.release : release
        }
    }

    // Railsへデータを送信し、画面を遷移
    const handleSubmit = e => {
        e.preventDefault()
        const redirect = (params) => {
            props.history.push(`/novel_series/${params}`)
        }
        // validate内にエラーが発生しなければ処理続行
        axios[method](url, items, { withCredentials: true })
            .then(response => {
                let res = response.data
                if (res.status === 'created') {
                    setSuccessful(res.successful)
                    setTimeout(() => {redirect(res.series_id)}, 1500)
                } else if (res.status === 'ok') {
                    setSuccessful(res.successful)
                    setTimeout(() => {redirect(res.series_id)}, 1500)
                } else if (res.status === 500) {
                    setExistingErrors(res.errors)
                }
            })
                .catch(err => setErrors(err))
        mount(false)
    }

    return {values, release, handleStatusChange, handleChange, handleSubmit, successful, errors, existingErrors}
}

export default useNovelsInput