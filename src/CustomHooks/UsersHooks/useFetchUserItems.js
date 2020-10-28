import axios from 'axios'
import { useState,useEffect } from 'react'
import useRedirect from '../Redirect/useRedirect'

// ユーザーデータを取得、ユーザーデータの更新
// UsersEdit, UsersPageTop, UsersSeriesにて使用
function useFetchUserItems({ method, url, updateMethod, updateUrl, history }) {
    const [users, setUsers] = useState("")
    const [editUsers, setEditUsers] = useState({ nickname: "", profile: "" })
    const [usersTags, setUsersTags] = useState("")
    const [usersSeries, setUsersSeries] = useState("")
    const [success, setSuccess] = useState("")
    const [errors, setErrors] = useState("")
    const [usersErrors, setUsersErrors] = useState("")
    const [seriesCount, setSeriesCount] = useState("")
    const [favoriteSeries, setFavoriteSeries] = useState("")
    const [favoriteSeriesCount, setFavoriteSeriesCount] = useState("")
    const [isLoading, setIsLoading] = useState(true)
    const { redirect } = useRedirect({history: history})

    const handleChange = e => {
        const { name, value } = e.target
        setEditUsers({
            ...editUsers,
            [name]: value
        })
    }

    useEffect(() => {
        let mount = true
        const getUserItems = () => {
            axios[method](url, { withCredentials: true })
                .then(response => {
                    setIsLoading(true)
                    let res = response.data
                    let object = res.object
                    let ok = res.status === 200
                    if (mount && ok && res.crud_type === "show") {
                        setUsers(object.user)
                        setUsersTags(object.user_tags)
                        setSeriesCount(object.user_series_count)
                        setUsersSeries(object.user_series)
                        setFavoriteSeries(object.user_favorites_series)
                        setFavoriteSeriesCount(object.user_favorites_series_count)
                        setIsLoading(false)
                    } else if (mount && ok && res.crud_type === "edit") {
                        setEditUsers(object)
                        setUsersTags(object.user_tags)
                        setIsLoading(false)
                    } else if (mount && res.status === 401) {
                        setUsersErrors(res.errors)
                        setIsLoading(false)
                    } else if (mount && res.status === 500) {
                        setUsersErrors(res.errors)
                        setIsLoading(false)
                    }
                })
                .catch(err => console.log(err))
        }
        getUserItems()
        setUsersErrors("")
        return () => { mount = false }
    }, [method, url])

    // タグの追加
    const addTags = event => {
        const val = event.target.value
        if (val !== "") {
            setUsersTags([ ...usersTags, val ])
            event.target.value = ""
        }
    }

    // タグの削除
    const removeTags = indexToRemove => {
        // クリックした要素意外の要素だけを返す（＝クリックした要素を消す）
        setUsersTags(usersTags.filter((_, index) => index !== indexToRemove))
    }

    // サブミットボタンをエンターで発火しないようにする
    const handleFalse = e => {
        e.preventDefault()
    }


    const handleSubmit = e => {
        e.preventDefault()
        if (usersTags.length < 6) {
            axios[updateMethod](updateUrl,
                {
                    user: {
                        "nickname": editUsers.nickname,
                        "profile": editUsers.profile,
                        "user_tag_name": usersTags ? usersTags.join() : null
                    }
                },
                { withCredentials: true }
            ).then(response => {
                let res = response.data
                if (res.status === "ok" && res.crud_type === "update") {
                    setSuccess(res.successful)
                    setTimeout(() => redirect(`/users/${res.object}`), 2000)
                } else if (res.status === "unprocessable_entity" || res.status === "unauthorized") {
                    setErrors(res.errors)
                }
            }).catch(err => console.log(err))
            setErrors("")
            setSuccess("")
        } else if (usersTags.length > 5) {
            usersTags.length > 5 && setErrors("趣味タグは5つ以内まで登録できます。")
            setTimeout(() => setErrors(""), 2000)
        }
    }

    return {
        users,
        editUsers,
        usersTags, addTags, removeTags, handleFalse,
        usersSeries,
        usersErrors,
        seriesCount,
        favoriteSeries, favoriteSeriesCount,
        handleChange,
        handleSubmit,
        success,
        errors,
        isLoading
    }

}

export default useFetchUserItems
