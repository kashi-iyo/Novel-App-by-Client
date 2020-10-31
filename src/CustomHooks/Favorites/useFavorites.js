import axios from 'axios'
import { useState } from 'react'

function useFavorites({ currentUser, stateOfFavorites, setStateOfFavorites}) {
    const [errors, setErrors] = useState("")

    // お気に入り時の挙動
    const handleFavorites = (novelId, userId) => {
        axios.post(
            `http://localhost:3001/api/v1/novels/${novelId}/novel_favorites`,
            {
                novel_favorite: {
                    user_id: userId,
                    novel_id: novelId,
                    favoriter: currentUser,
                }
            },
            { withCredentials: true })
            .then(response => {
                let res = response.data
                if (res.status === "created") {
                    setStateOfFavorites({
                        count: stateOfFavorites.count + 1,
                        isOn: true
                    })
                } else if (res.status === "unprocessable_entity") {
                    setErrors(res.errors)
                } else if (res.status === "no_content") {
                    setErrors(res.errors)
                }
            })
        .catch(err => console.log(err))
    }

    // お気に入りを解除時の挙動
    const handleUnFavorites = (novelId, userId) => {
        console.log("favoritesOn:  OFF")
        axios.delete(`http://localhost:3001/api/v1/novels/${novelId}/novel_favorites/${userId}`, { withCredentials: true })
            .then(response => {
                let res = response.data
                if (res.head === 'no_content' && res.crud_type === "favorites") {
                    setStateOfFavorites({
                        count: stateOfFavorites.count - 1,
                        isOn: false
                    })
                } else if (res.head === "no_content") {
                    setErrors(res.errors)
                }
            })
            .catch(err => console.log(err))
    }

    return { errors, handleFavorites, handleUnFavorites }
}

export default useFavorites
