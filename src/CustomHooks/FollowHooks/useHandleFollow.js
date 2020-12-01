import { useState } from 'react'
import axios from 'axios'

function useHandleFollow({ usersRelationships, setUsersRelationships, handleFlashMessages }) {
    const domain = process.env.REACT_APP_BACKEND_URL
    const [errors, setErrors] = useState("")

        // フォロー
    const handleFollow = (userId) => {
        console.log("フォロークリック")
        axios.post(`${domain}/api/v1/relationships`,
            {relationship: {follow_id: userId}},
            { withCredentials: true })
            .then(response => {
                let res = response.data
                let status = res.status
                let errorType = res.error_type
                let errors = res.errors
                if (res.status === "created" && res.data_type === "relationship") {
                    console.log("フォロー: 成功", "レスポンス", res)
                    setUsersRelationships({
                        followingsCount: usersRelationships.followingsCount,
                        followersCount: usersRelationships.followersCount + 1,
                        isOn: usersRelationships.isOn = true
                    })
                //Error フォローに失敗した場合
                } else if (status === "unauthorized") {
                    console.log("フォロー: 失敗")
                    //Error 未ログインの場合
                    if (errorType === "not_login") {
                        console.log("失敗理由: 未ログイン", "レスポンス", res)
                        setErrors(errors)
                        setTimeout(() => setErrors(""), 3000)
                    //Error 自身をフォローしようとした場合
                    } else if (errorType === "follow_myself") {
                        console.log("失敗理由: 自身をフォロー", "レスポンス", res)
                        handleFlashMessages({ errors: errors })
                    }
                } else if (res.head === "no_content") {
                    //Error 存在しないユーザーにフォロー命令した場合
                    if (errorType === "user") {
                        console.log("失敗理由: 相手ユーザーが存在しない", "レスポンス", res)
                        handleFlashMessages({ errors: errors })
                    }
                } else if (status === "unprocessable_entity") {
                    setErrors(errors)
                }

            })
            .catch(err => console.log(err))
    }

    // フォロー解除
    const handleUnFollow = (userId) => {
        console.log("フォロー解除ボタンクリック")
        axios.delete(`${domain}/api/v1/relationships/${userId}`, {withCredentials: true})
            .then(response => {
                let res = response.data
                if (res.head === "no_content" && res.crud_type === "destroy") {
                    console.log("フォロー解除: 成功", "レスポンス", res)
                    setUsersRelationships({
                        followingsCount: usersRelationships.followingsCount,
                        followersCount: usersRelationships.followersCount - 1,
                        isOn: usersRelationships.isOn = false
                    })
                } else if (res.head === "no_content") {
                    console.log("フォロー解除: 失敗")
                    if (res.error_type === "relationship") {
                        console.log("失敗理由: フォロー相手が存在しない", "レスポンス", res)
                        handleFlashMessages({ errors: res.errors })
                    }
                }
            })
            .catch(err => console.log(err))
    }

    return {errors, handleFollow, handleUnFollow}
}

export default useHandleFollow
