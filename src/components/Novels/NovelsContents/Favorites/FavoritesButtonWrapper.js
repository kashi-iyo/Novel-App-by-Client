import React from 'react'
import FavoritesButton from './FavoritesButton'

function FavoritesButtonWrapper({ favoritesData, favoritesCount, novelId, userId, currentUser }) {

    return (
        <React.Fragment>
            {
                favoritesData.map(fav => (
                    <FavoritesButton
                        key={fav.favorites_id}
                        favoritesUserId={fav.favorites_user_id}
                        favoritesData={favoritesData}
                        favoritesCount={favoritesCount}
                        novelId={novelId}
                        userId={userId}
                        currentUser={currentUser}
                    />
                ))
            }
        </React.Fragment>
    )
}

export default FavoritesButtonWrapper
