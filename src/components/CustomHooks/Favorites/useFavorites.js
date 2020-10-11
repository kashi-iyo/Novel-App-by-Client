import axios from 'axios'
import { useEffect, useState } from 'react'

function useFavorites({ novelId, userId, currentUser }) {
    const [favorite, setFavorite] = useState(false)
    const [update, setUpdate] = useState("initial")
    // const [favoriteCount, setFavoriteCount] = useState("")
    const [updateFavoritesCount, setUpdateFavoritesCount] = useState("")
    const [favoriter, setFavoriter] = useState([])
    const [errors, setErrors] = useState("")

    // マウント時にお気に入りのステータスをチェックする
    useEffect(() => {
        let mount = true
        const getFavorites = () => {
            axios.get(`http://localhost:3001/api/v1/novel_favorites/${novelId}`, { withCredentials: true })
            .then(response => {
                let res = response.data
                if (mount && res.status === 200) {
                    setUpdateFavoritesCount(res.favorites_count)
                    setFavoriter(res.favorites)
                    res.favorites.forEach(favorite => {
                        let userId2 = parseInt(favorite.user_id)
                        if (userId === userId2) {
                            setFavorite(true)
                        }
                    })
                }
            }).catch(err => console.log(err))
        }
        getFavorites()
        return () => { mount = false }
    },[update, novelId, userId])

    // お気に入り時の挙動
    const handleFavorites = () => {
        axios.post(
            `http://localhost:3001/api/v1/novel_favorites/${novelId}`,
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
                if (res.status === 'created') {
                    setFavorite(true)
                    setUpdate("on")
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
        axios.delete(`http://localhost:3001/api/v1/novel_favorites/${novelId}/${userId}`, { withCredentials: true })
            .then(response => {
                if (response.data.head === 'no_content') {
                    setFavorite(false)
                    setUpdate("off")
                }
            })
            .catch(err => console.log(err))
    }

    return {favorite, updateFavoritesCount, favoriter, errors, handleFavorites, handleUnFavorites}
}

export default useFavorites
