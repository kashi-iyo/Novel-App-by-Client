import axios from 'axios'
import { useState,useEffect } from 'react'

// ユーザーデータを取得、ユーザーデータの更新
// UsersEdit, UsersPageTop, UsersSeriesにて使用
function useFetchUserItems({ method, url, updateMethod, updateUrl, history, handleFlashMessages }) {
    const [users, setUsers] = useState("")
    const [editUsers, setEditUsers] = useState({
        nickname: "",
        profile: ""
    })
    const [usersTags, setUsersTags] = useState("")
    const [usersRelationships, setUsersRelationships] = useState({
        followingsCount: "",
        followersCount: "",
        isOn: false
    })
    const [seriesData, setSeriesData] = useState({
        usersSeries: "",
        usersSeriesCount: "",
        favoriteSeries: "",
        favoriteSeriesCount: "",
    })
    const [success, setSuccess] = useState("")
    const [errors, setErrors] = useState("")
    const [isLoading, setIsLoading] = useState(true)

    const handleChange = e => {
        const { name, value } = e.target
        setEditUsers({
            ...editUsers,
            [name]: value
        })
    }

    //Read ユーザーデータ取得
    useEffect(() => {
        let mount = true
        const getUserItems = () => {
            axios[method](url, { withCredentials: true })
                .then(response => {
                    console.log("useFetchUserItems: OK")
                    setIsLoading(true)
                    let res = response.data
                    let obj = res.object
                    let status = res.status
                    // ユーザープロフィール
                    if (mount && status === 200 && res.crud_type === "show") {
                        console.log("useFetchUserItems: show", "response: ", res)
                        setUsers(obj.user)
                        setUsersTags(obj.user_tags)
                        let relate = obj.user_relationships
                        setUsersRelationships({
                            followingsCount: relate.followings_count,
                            followersCount: relate.followers_count,
                            isOn: relate.following_status
                        })
                        setSeriesData({
                            usersSeries: obj.user_series,
                            usersSeriesCount: obj.user_series_count,
                            favoriteSeries: obj.user_favorites_series,
                            favoriteSeriesCount: obj.user_favorites_series_count
                        })
                        setIsLoading(false)
                    //Edit ユーザー編集用データ
                    } else if (mount && status === 200 && res.crud_type === "edit") {
                        console.log("useFetchUserItems: edit", "response: ", res)
                        setEditUsers(obj)
                        setUsersTags(obj.user_tags)
                        setIsLoading(false)
                    //Error 不認可
                    } else if (mount && res.status === "unauthorized") {
                        // 異なるユーザーの編集ページへアクセスした場合
                        if (res.error_type === "user") {
                            console.log("unauthorized: 異なるユーザーの編集ページへのアクセス", "response: ", res)
                            handleFlashMessages({
                                errors: res.errors,
                                history: history,
                                pathname: "/"
                            })
                            setIsLoading(false)
                        }
                    //Error 存在しない
                    } else if (mount && res.head === "no_content") {
                        if (res.error_type === "user") {
                            console.log("useFetchUserItems: no_content", "response: ", res)
                            handleFlashMessages({
                                errors: res.errors,
                                history: history,
                                pathname: "/"
                            })
                            setIsLoading(false)
                        }
                    }
                })
                .catch(err => console.log(err))
        }
        getUserItems()
        setErrors("")
        return () => { mount = false }
    }, [method, url])

    //Edit タグの追加
    const addTags = event => {
        const val = event.target.value
        if (val !== "") {
            setUsersTags([ ...usersTags, val ])
            event.target.value = ""
        }
    }

    //Edit タグの削除
    const removeTags = indexToRemove => {
        // クリックした要素意外の要素だけを返す（＝クリックした要素を消す）
        setUsersTags(usersTags.filter((_, index) => index !== indexToRemove))
    }

    //Edit サブミットボタンをエンターで発火しないようにする
    const handleFalse = e => {
        e.preventDefault()
    }


    //Edit ユーザー編集フォームの送信
    const handleSubmit = e => {
        console.log("編集の保存をクリック")
        e.preventDefault()
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
            // 更新成功
            if (res.status === "ok" && res.crud_type === "update") {
                console.log("シリーズ編集: OK", "レスポンス: ", res)
                handleFlashMessages({
                    success: res.successful,
                    history: history,
                    pathname: `/users/${res.object}`
                })
            // 更新失敗
            } else if (res.status === "unprocessable_entity") {
                console.log("シリーズ編集: 更新失敗", "レスポンス: ", res)
                setErrors(res.errors)
            // 不認可
            } else if (res.status === "unauthorized") {
                console.log("シリーズ編集: 失敗")
                if (res.error_type === "user") {
                    console.log("失敗理由:  異なるユーザーによる編集")
                    handleFlashMessages({
                        errors: res.errors,
                        history: history,
                        pathname: "/"
                    })
                }
            }
        }).catch(err => console.log(err))
        setErrors("")
        setSuccess("")
    }

    return {
        users, editUsers, seriesData,
        usersTags, addTags, removeTags, handleFalse,
        usersRelationships, setUsersRelationships,
        handleChange, handleSubmit,
        success, errors, isLoading
    }

}

export default useFetchUserItems
