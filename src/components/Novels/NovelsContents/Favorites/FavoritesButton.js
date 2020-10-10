import React from 'react'
import FavoriteIcon from '@material-ui/icons/FavoriteBorder'
import './FavoritesButton.css'
import useFavorites from '../../../CustomHooks/Favorites/useFavorites'
import favoritesIcon from '../../../../img/favorites.png'

function FavoritesButton({ props, userId, novelId, currentUser }) {
    const { favorite, favoriteCount, errors, handleFavorites, handleUnFavorites } = useFavorites({
        props: props,
        novelId: novelId,
        userId: userId,
        currentUser: currentUser
    })

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
                <p className="FavoritesCount">
                    <span>{favoriteCount}</span>
                </p>
            </div>
        </React.Fragment>
    )
}

export default FavoritesButton
