import React, { useState } from 'react'
import FavoriteIcon from '@material-ui/icons/FavoriteBorder'
import './FavoritesButton.css'
import useFavorites from '../../../CustomHooks/Favorites/useFavorites'
import favoritesIcon from '../../../../img/favorites.png'
import favoritesIcon2 from '../../../../img/favorites2.png'
import FavoritesUsersWrapper from './FavoritesUsersWrapper'

function FavoritesButton({ userId, novelId, currentUser }) {
    const [on, setOn] = useState(false)
    const { favorite, favoriter, count, errors, handleFavorites, handleUnFavorites } = useFavorites({
        novelId: novelId,
        userId: userId,
        currentUser: currentUser,
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
                {/* お気に入りされているかどうかで表示切り替え */}
                {/* {!favorite ? */}
                <button type="submit" className="FavoritesButton" onClick={() => !favorite ? handleFavorites(novelId, userId) : handleUnFavorites(novelId, userId)} >
                    {!favorite ?
                        // お気に入りON
                        <React.Fragment>
                            <img src={favoritesIcon2} alt="favorites" className="FavoritesIcon" />
                            <span className="FavoritesSpan">お気に入りする</span>
                        </React.Fragment>
                        :
                        // お気に入りOFF
                        <React.Fragment>
                            <img src={favoritesIcon} alt="favorites" className="FavoritedIcon "/>
                            <span className="FavoritedSpan">お気に入り済</span>
                        </React.Fragment>
                        }
                    </button>
                {/* お気に入り数の表示切り替え */}
                <p className="FavoritesCount" onClick={() => handleOn()}>
                    <span>{count}</span>
                </p>
                {/* クリックによりユーザーを表示 */}
                {on &&
                    <ul className="Favorites__Ul">
                        <FavoritesUsersWrapper favoriter={favoriter} />
                    </ul>
                }
            </div>
        </React.Fragment>
    )
}

export default FavoritesButton
