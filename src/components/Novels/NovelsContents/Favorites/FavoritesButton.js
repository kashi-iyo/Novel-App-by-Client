import React from 'react'
import FavoriteIcon from '@material-ui/icons/FavoriteBorder'
import './FavoritesButton.css'
import useFavorites from '../../../CustomHooks/Favorites/useFavorites'
import favoritesIcon from '../../../../img/favorites.png'

function FavoritesButton(props) {
    const { favorite, favoriteCount, errors, handleFavorites, handleUnFavorites } = useFavorites({
        props: props,
        novelId: props.match.params.novel_id,
        userId: props.userId
    })

    return (
        <React.Fragment>
            { errors && <div className="favoritesErrorsWrapper"><p className="error favoritesErrors">{errors}</p></div>}
            <div className="NovelsContents__Favorites">
                {/* お気に入りされているかどうかで表示切り替え */}
                {!favorite ?
                    <button type="submit" className="FavoritesButton" onClick={handleFavorites} >
                        <div className="FavoritesWrapper" >
                            <FavoriteIcon fontSize="default" color="action" className="FavoritesIcon" />
                            <span className="FavoritesSpan">お気に入りする</span>
                        </div>
                    </button> :
                    <button type="submit" className="FavoritesButton" onClick={handleUnFavorites} >
                        <div className="FavoritesWrapper" >
                            <img src={favoritesIcon} alt="favorites" className="FavoritedIcon "/>
                            <span className="FavoritedSpan">お気に入り済</span>
                        </div>
                    </button>
                }
                <p className="FavoritesCount">{favoriteCount}</p>
            </div>
        </React.Fragment>
    )
}

export default FavoritesButton
