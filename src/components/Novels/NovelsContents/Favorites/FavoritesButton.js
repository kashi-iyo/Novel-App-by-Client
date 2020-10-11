import React, { useState } from 'react'
import FavoriteIcon from '@material-ui/icons/FavoriteBorder'
import './FavoritesButton.css'
import useFavorites from '../../../CustomHooks/Favorites/useFavorites'
import favoritesIcon from '../../../../img/favorites.png'
import FavoritesUsersWrapper from './FavoritesUsersWrapper'

function FavoritesButton({ props, userId, novelId, currentUser, favoritesCount }) {
    const [on, setOn] = useState(false)
    const { favorite, updateFavoritesCount, favoriter, errors, handleFavorites, handleUnFavorites } = useFavorites({
        props: props,
        novelId: novelId,
        userId: userId,
        currentUser: currentUser
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
                {!favorite ?
                    <button type="submit" className="FavoritesButton" onClick={handleFavorites} >
                            <FavoriteIcon fontSize="default" color="action" className="FavoritesIcon" />
                            <span className="FavoritesSpan">お気に入りする</span>
                    </button> :
                    <button type="submit" className="FavoritesButton" onClick={handleUnFavorites} >
                            <img src={favoritesIcon} alt="favorites" className="FavoritedIcon "/>
                            <span className="FavoritedSpan">お気に入り済</span>
                    </button>
                }
                {/* お気に入り数の表示切り替え */}
                <p className="FavoritesCount" onClick={() => handleOn()}>
                    {updateFavoritesCount ?
                        <span>{updateFavoritesCount}</span> :
                        <span>{favoritesCount}</span>
                    }
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
