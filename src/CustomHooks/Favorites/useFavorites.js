import axios from 'axios'

function useFavorites({ currentUser, favoriteItems, setFavoriteItems, handleFlashMessages }) {
    const domain = process.env.REACT_APP_BACKEND_URL

    // お気に入り時の挙動
    const handleFavorites = (novelId, userId) => {
        console.log("handleFavorites:  クリック")
        axios.post(
            `${domain}/api/v1/novels/${novelId}/novel_favorites`,
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
                    console.log("handleFavorites: 成功", "レスポンス: ", res)
                    setFavoriteItems({
                        favoriteCounts: favoriteItems.favoriteCounts + 1,
                        favoriteStatus: !favoriteItems.favoriteStatus
                    })
                // お気に入り失敗（すでにお気に入りしている場合）
                } else if (res.status === "unprocessable_entity") {
                    console.log("handleUnFavorites: 失敗", "レスポンス: ", res)
                    handleFlashMessages({
                        errors: res.errors
                    })
                // お気に入り対象の小説データが存在しない場合
                } else if (res.status === "no_content") {
                    console.log("handleUnFavorites: 失敗", "レスポンス: ", res)
                    handleFlashMessages({
                        errors: res.errors
                    })
                // 未ログインの場合
                } else if (res.status === "unauthorized") {
                    console.log("handleUnFavorites: 失敗", "レスポンス: ", res)
                    handleFlashMessages({
                        errors: res.errors
                    })
                }
            })
        .catch(err => console.log(err))
    }

    // お気に入りを解除時の挙動
    const handleUnFavorites = (novelId, userId) => {
        console.log("お気に入りOFF:  クリック")
        axios.delete(
            `${domain}/api/v1/novels/${novelId}/novel_favorites/${userId}`,
            { withCredentials: true })
            .then(response => {
                let res = response.data
                if (res.head === 'no_content' && res.crud_type === "destroy") {
                    console.log("handleUnFavorites: 成功", "レスポンス: ", res)
                    setFavoriteItems({
                        favoriteCounts: favoriteItems.favoriteCounts - 1,
                        favoriteStatus: !favoriteItems.favoriteStatus
                    })
                // 対象の小説が存在しない場合
                } else if (res.head === "no_content") {
                    console.log("handleUnFavorites: 失敗", "レスポンス: ", res)
                    handleFlashMessages({
                        errors: res.errors
                    })
                // 未ログインの場合
                } else if (res.status === "unauthorized") {
                    console.log("handleUnFavorites: 失敗", "レスポンス: ", res)
                    handleFlashMessages({
                        errors: res.errors
                    })
                }
            })
            .catch(err => console.log(err))
    }

    return { handleFavorites, handleUnFavorites }
}

export default useFavorites
