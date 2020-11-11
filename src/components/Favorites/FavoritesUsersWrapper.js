import React from 'react'
import FavoritesUsers from './FavoritesUsers'

function FavoritesUsersWrapper({favoriteUsers}) {

    return (
        <React.Fragment>
            {favoriteUsers &&
                Object.keys(favoriteUsers).map(key => (
                    <FavoritesUsers
                        key={key}
                        favoritesUserId={favoriteUsers[key].user_id}
                        favoriter={favoriteUsers[key].favoriter}
                    />
                ))
            }
        </React.Fragment>
    )
}

export default FavoritesUsersWrapper
