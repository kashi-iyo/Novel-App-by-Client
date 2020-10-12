import axios from 'axios'
import { useEffect, useState } from 'react'

function useFavorites({ novelId, userId, currentUser }) {
    const [favorite, setFavorite] = useState(false)     // お気に入りボタンの状態
    const [count, setCount] = useState(parseInt(0))    // お気に入り数
    const [favoriter, setFavoriter] = useState([])      // お気に入りしたユーザー
    const [errors, setErrors] = useState("")

    // マウント時にお気に入りのステータスをチェックする
    useEffect(() => {
        let mount = true
        const getFavorites = () => {
            axios.get(`http://localhost:3001/api/v1/novels/${novelId}/novel_favorites`, { withCredentials: true })
            .then(response => {
                let res = response.data
                if (mount && res.status === 200) {
                    setFavoriter(res.favorites)
                    setCount(res.favorites_count)
                    res.favorites.forEach(favorite => {
                        let userId2 = parseInt(favorite.user_id)
                        if (userId === userId2) {   // お気に入りしたユーザーIDとログインユーザーのIDが一致した場合
                            setFavorite(true)   // お気に入りの状態をオンにする
                        }
                    })
                }
            }).catch(err => console.log(err))
        }
        getFavorites()
        return () => { mount = false }
    },[novelId, userId])

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
                // レスが"created"で、お気に入りの状態がOFFなら
                if (res.status === 'created' && !favorite) {
                    setFavorite(true)
                    setCount(count + 1)
                } else if (res.status === "unprocessable_entity") {
                    setErrors(res.errors)
                } else if (res.status === 401) {
                    setErrors(res.messages)
                }
            })
        .catch(err => console.log(err))
    }

    // お気に入りを解除時の挙動
    const handleUnFavorites = (novelId, userId) => {
        axios.delete(`http://localhost:3001/api/v1/novels/${novelId}/novel_favorites/${userId}`, { withCredentials: true })
            .then(response => {
                // レスが"no_content"で、お気に入りの状態がONなら
                if (response.data.head === 'no_content' && favorite) {
                    setFavorite(false)
                    setCount(count - 1)
                }
            })
            .catch(err => console.log(err))
    }

    return {favorite, count, favoriter, errors, handleFavorites, handleUnFavorites}
}

export default useFavorites
