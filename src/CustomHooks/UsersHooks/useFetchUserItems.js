import axios from 'axios'
import { useState,useEffect } from 'react'
import useRedirect from '../Redirect/useRedirect'

// ユーザーデータを取得、ユーザーデータの更新
// UsersEdit, UsersPageTop, UsersSeriesにて使用
function useFetchUserItems({ method, url, updateMethod, updateUrl, history }) {
    const [users, setUsers] = useState("")
    const [editUsers, setEditUsers] = useState({ nickname: "", profile: "" })
    const [usersTags, setUsersTags] = useState("")
    const [usersRelationships, setUsersRelationships] = useState({
        followingsCount: "",
        followersCount: "",
        isOn: false
    })
    const [usersSeries, setUsersSeries] = useState("")
    const [success, setSuccess] = useState("")
    const [errors, setErrors] = useState("")
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

    //Read ユーザーデータ取得
    useEffect(() => {
        let mount = true
        const getUserItems = () => {
            axios[method](url, { withCredentials: true })
                .then(response => {
                    console.log("useeffect: OK")
                    setIsLoading(true)
                    let res = response.data
                    let obj = res.object
                    let ok = res.status === 200
                    // ユーザープロフィール
                    if (mount && ok && res.crud_type === "show") {
                        setUsers(obj.user)
                        setUsersTags(obj.user_tags)
                        let relate = obj.user_relationships
                        setUsersRelationships({
                            followingsCount: relate.followings_count,
                            followersCount: relate.followers_count,
                            isOn: relate.following_status
                        })
                        setSeriesCount(obj.user_series_count)
                        setUsersSeries(obj.user_series)
                        setFavoriteSeries(obj.user_favorites_series)
                        setFavoriteSeriesCount(obj.user_favorites_series_count)
                        setIsLoading(false)
                    //Edit ユーザー編集用データ
                    } else if (mount && ok && res.crud_type === "edit") {
                        setEditUsers(obj)
                        setUsersTags(obj.user_tags)
                        setIsLoading(false)
                    //Error 不認可
                    } else if (mount && res.status === "unauthorized") {
                        setErrors(res.errors)
                        setIsLoading(false)
                    //Error 存在しない
                    } else if (mount && res.status === "no_content") {
                        setErrors(res.errors)
                        setIsLoading(false)
                    //Error 保存失敗
                    } else if (mount && res.status === "unprocessable_entity") {
                        setErrors(res.errors)
                        setIsLoading(false)
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

    // フォロー
    const handleFollow = (userId) => {
        axios.post(`http://localhost:3001/api/v1/relationships`,
            {relationship: {follow_id: userId}},
            { withCredentials: true })
            .then(response => {
                let res = response.data
                let st = res.status
                if (res.status === "created" && res.data_type === "relationship") {
                    setUsersRelationships({
                        followingsCount: usersRelationships.followingsCount,
                        followersCount: usersRelationships.followersCount + 1,
                        isOn: usersRelationships.isOn = true
                    })
                //Error 自身をフォローしようとした場合
                //Error 存在しないユーザーにフォロー命令した場合
                //Error フォローに失敗した場合
                } else if (st=== "unauthorized" || st=== "unprocessable_entity" || res.head === "no_content" ) {
                    setErrors(res.errors)
                }

            })
            .catch(err => console.log(err))
    }

    // フォロー解除
    const handleUnFollow = (userId) => {
        axios.delete(`http://localhost:3001/api/v1/relationships/${userId}`, {withCredentials: true})
            .then(response => {
                let res = response.data
                if (res.head === "no_content" && res.crud_type === "destroy" ) {
                    setUsersRelationships({
                        followingsCount: usersRelationships.followingsCount,
                        followersCount: usersRelationships.followersCount - 1,
                        isOn: usersRelationships.isOn = false
                    })
                } else if (res.head === "no_content") {
                    setErrors(res.errors)
                }
            })
            .catch(err => console.log(err))
    }

    return {
        users,
        editUsers,
        usersTags, addTags, removeTags, handleFalse,
        usersRelationships, handleFollow, handleUnFollow,
        usersSeries,
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
