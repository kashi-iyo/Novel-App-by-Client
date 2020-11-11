import React, { useState } from 'react'
import './FavoritesButton.css'
import useFavorites from '../../CustomHooks/Favorites/useFavorites'
import FavoritesUsersWrapper from './FavoritesUsersWrapper'
import favoritesIcon from '../../img/favorites.png'
import favoritesIcon2 from '../../img/favorites2.png'

// お気に入りボタン
function FavoritesButton({ favoriteItems, setFavoriteItems, userId, novelId, currentUser, handleFlashMessages }) {
    const favoriteUsers = favoriteItems.favoriteUsers
    const favoriteCounts = favoriteItems.favoriteCounts
    const favoriteStatus = favoriteItems.favoriteStatus

    // プルダウンボタン
    const [on, setOn] = useState(false)

    // お気に入りON / お気に入りOFF
    const { handleFavorites, handleUnFavorites } = useFavorites({
        currentUser: currentUser,
        favoriteItems: favoriteItems,
        setFavoriteItems: setFavoriteItems,
        handleFlashMessages: handleFlashMessages
    })

    // お気に入りユーザーを開く
    const handleOn = () => {
        if (on) {
            setOn(false)
        } else if (!on) {
            setOn(true)
        }
    }

    return (
        <React.Fragment>
            <div className="favorites-button">
                <div className="favorites-button--wrapper">
                {/* お気に入りボタン */}
                    <button
                    type="submit"
                    onClick={() => !favoriteStatus ?
                        handleFavorites(novelId, String(userId)) :
                        handleUnFavorites(novelId, String(userId))
                    }
                >
                    {!favoriteStatus ?
                        // お気に入りON
                        <div className="favorites-button--button-icon-wrapper">
                            <img
                                src={favoritesIcon2}
                                alt="favorites"
                                className="favorites-button--icon"
                            />
                            <span className="favorites-button--word">お気に入りする</span>
                        </div>
                        :
                        // お気に入りOFF
                        <div className="favorites-button--button-icon-wrapper">
                            <img
                                src={favoritesIcon}
                                alt="favorites"
                                className="favorites-button--favorited-icon"
                            />
                            <span className="favorites-button--favorited-word">お気に入り済</span>
                        </div>
                    }
                </button>
                    {/* お気に入り数の表示切り替え */}
                    <p
                        className="favorites-button--count"
                        onClick={() => handleOn()}
                    >
                        <span>{favoriteCounts}</span>
                    </p>
                </div>
                {/* クリックによりユーザーを表示 */}
                {on &&
                    <ul className="favorites-button--users-wrapper">
                        <FavoritesUsersWrapper favoriteUsers={favoriteUsers} />
                    </ul>
                }
            </div>
        </React.Fragment>
    )
}

export default FavoritesButton
