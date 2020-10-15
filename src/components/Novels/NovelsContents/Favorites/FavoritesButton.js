import React, { useState } from 'react'
import './FavoritesButton.css'
import useFavorites from '../../../CustomHooks/Favorites/useFavorites'
import FavoritesUsersWrapper from './FavoritesUsersWrapper'
import favoritesIcon from '../../../../img/favorites.png'
import favoritesIcon2 from '../../../../img/favorites2.png'

function FavoritesButton({ favoritesUserId, favoritesData, favoritesCount, userId, novelId, currentUser }) {
    // プルダウンボタン
    const [on, setOn] = useState(false)
    // お気に入りの状態
    const [stateOfFavorites, setStateOfFavorites] = useState({
        count: favoritesCount,
        isOn: favoritesUserId === userId ? true : false
    })
    const { errors, handleFavorites, handleUnFavorites } = useFavorites({
        currentUser: currentUser,
        stateOfFavorites: stateOfFavorites,
        setStateOfFavorites: setStateOfFavorites,
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
            { errors && <div className="favoritesErrorsWrapper"><p className="error favoritesErrors">{errors}</p></div>}
            <div className="NovelsContents__Favorites">
                {/* お気に入りボタン */}
                <button
                    type="submit"
                    onClick={() => !stateOfFavorites.isOn ?
                        handleFavorites(novelId, String(userId)) :
                        handleUnFavorites(novelId, String(userId))
                    }
                >
                    {!stateOfFavorites.isOn ?
                        // お気に入りON
                        <div className="FavoritesButton">
                            <img src={favoritesIcon2} alt="favorites" className="FavoritesIcon" />
                            <span className="FavoritesSpan">お気に入りする</span>
                        </div>
                        :
                        // お気に入りOFF
                        <div className="FavoritesButton">
                            <img src={favoritesIcon} alt="favorites" className="FavoritedIcon "/>
                            <span className="FavoritedSpan">お気に入り済</span>
                        </div>
                    }
                </button>
                {/* お気に入り数の表示切り替え */}
                    <p className="FavoritesCount" onClick={() => handleOn()}>
                        <span>{stateOfFavorites.count}</span>
                    </p>
                {/* クリックによりユーザーを表示 */}
                {on &&
                    <ul className="Favorites__Ul">
                        <FavoritesUsersWrapper favoritesData={favoritesData} />
                    </ul>
                }
            </div>
        </React.Fragment>
    )
}

export default FavoritesButton
