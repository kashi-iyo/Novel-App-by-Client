import axios from 'axios'
import { useEffect, useState } from 'react'

function useFavorites({ novelId, userId }) {
    const [favorite, setFavorite] = useState(false)
    const [favoriteCount, setFavoriteCount] = useState("")
    const [errors, setErrors] = useState("")

    // マウント時にお気に入りのステータスをチェックする
    useEffect(() => {
        axios.get(`http://localhost:3001/api/v1/novel_favorites/${novelId}`, { withCredentials: true })
            .then(response => {
                let res = response.data
                if (res.status === 200) {
                    setFavoriteCount(res.favorites_count)
                    setFavorite(true)
                } else if (res.head === 'no_content') {
                    setFavoriteCount(res.favorites_count)
                    setFavorite(false)
                }
            })
            .catch(err => console.log(err))
    },[setFavorite])

    // お気に入り時の挙動
    const handleFavorites = () => {
        axios.post(
            `http://localhost:3001/api/v1/novel_favorites/${novelId}`,
            {novel_favorite: {user_id: userId, novel_id: novelId}},
            { withCredentials: true })
            .then(response => {
                let res = response.data
                if (res.status === 'created') {
                    setFavorite(true)
                    setFavoriteCount(res.favorites_count)
                } else if (res.status === "unprocessable_entity") {
                    setErrors(res.errors)
                } else if (res.status === 401) {
                    setErrors(res.messages)
                }
            })
        .catch(err => console.log(err))
    }

    // お気に入りを解除時の挙動
    const handleUnFavorites = () => {
        axios.delete(`http://localhost:3001/api/v1/novel_favorites/${novelId}`, { withCredentials: true })
            .then(response => {
                if (response.data.head === 'no_content') {
                    setFavorite(false)
                    setFavoriteCount(response.data.favorites_count)
                }
            })
            .catch(err => console.log(err))
    }

    return {favorite, favoriteCount, errors, handleFavorites, handleUnFavorites}
}

export default useFavorites
