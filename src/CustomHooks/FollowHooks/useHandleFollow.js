import { useState } from 'react'
import axios from 'axios'

function useHandleFollow({usersRelationships, setUsersRelationships}) {
    const [errors, setErrors] = useState("")

        // フォロー
    const handleFollow = (userId) => {
        axios.post(`http://localhost:3001/api/v1/relationships`,
            {relationship: {follow_id: userId}},
            { withCredentials: true })
            .then(response => {
                let res = response.data
                let status = res.status
                if (res.status === "created" && res.data_type === "relationship") {
                    setUsersRelationships({
                        followingsCount: usersRelationships.followingsCount,
                        followersCount: usersRelationships.followersCount + 1,
                        isOn: usersRelationships.isOn = true
                    })
                    //Error 存在しないユーザーにフォロー命令した場合
                    //Error フォローに失敗した場合
                } else if (status === "unauthorized") {
                    //Error 未ログインの場合
                    if (res.error_type = "not_login") {
                        setErrors(res.errors)
                        setTimeout(() => setErrors(""), 3000)
                    //Error 自身をフォローしようとした場合
                    } else if (res.error_type = "follow_myself") {
                        handleFlashMessages({errors: res.errors})
                    }
                } else if (status === "unprocessable_entity" || res.head === "no_content" ) {
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

    return {errors, handleFollow, handleUnFollow}
}

export default useHandleFollow
