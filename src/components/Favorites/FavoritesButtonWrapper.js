import React from 'react'
import FavoritesButton from './FavoritesButton'

function FavoritesButtonWrapper({ favoritesData, favoritesCount, novelId, userId, currentUser }) {

    return (
        <React.Fragment>
            {
                Object.keys(favoritesData).map(key => (
                    <FavoritesButton
                        key={key}
                        favoritesUserId={favoritesData[key].favorites_user_id}
                        favoritesData={favoritesData[key]}
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
