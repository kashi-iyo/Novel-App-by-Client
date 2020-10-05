import axios from 'axios'
import { useState,useEffect } from 'react'
import useRedirect from '../Redirect/useRedirect'

// ユーザーデータを取得、ユーザーデータの更新
// UsersEdit, UsersPageTop, UsersSeriesにて使用
function useFetchUserItems({ method, url, updateMethod, updateUrl, props }) {
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
    const { redirect } = useRedirect({history: props.history})

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
                    let res = response.data
                    let ok = res.status === 200
                    if (mount && ok && res.keyword === "show_of_user") {
                        setUsers(res.user)
                        setUsersTags(res.user_tags)
                        setUsersSeries(res.users_series)
                        setSeriesCount(res.series_count)
                        setFavoriteSeries(res.favorite_series)
                        setFavoriteSeriesCount(res.favorite_series_count)
                    } else if (mount && ok && res.keyword === "edit_of_user") {
                        setEditUsers(res.user)
                        setUsersTags(res.user_tags)
                    } else if (mount && ok && res.keyword === "tag_has_users") {
                        setUsersTags(res.tags)
                        setUsers(res.users)
                    } else if (mount && ok && res.keyword === "tags_feed") {
                        setUsersTags(res.tags)
                    } else if (mount && res.status === 401) {
                        setUsersErrors(res.errors)
                    } else if (mount && res.status === 500) {
                        setUsersErrors(res.errors)
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
                        "user_tag_name": usersTags.join()
                    }
                },
                { withCredentials: true }
            ).then(response => {
                let res = response.data
                if (res.status === "ok" && res.keyword === "update_of_user") {
                    console.log("ok")
                    console.log(res.successful, res.user_id)
                    setSuccess(res.successful)
                    setTimeout(() => redirect(`/users/${res.user_id}`), 2000)
                } else if (res.status === "unprocessable_entity" || res.status === 401) {
                    setErrors(res.errors)
                }
            }).catch(err => console.log(err))
            setErrors("")
            setSuccess("")
        } else if (usersTags.length > 5) {
            usersTags.length > 5 && setErrors("入力内容に誤りがあります。")
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
        errors
    }

}

export default useFetchUserItems
