import React from 'react'
import FavoritesUsers from './FavoritesUsers'

function FavoritesUsersWrapper({favoritesData}) {

    return (
        <React.Fragment>
            {favoritesData &&
                Object.keys(favoritesData).map(key => (
                    <FavoritesUsers
                        key={key}
                        favoritesUserId={favoritesData[key].favorites_user_id}
                        favoriter={favoritesData[key].favoriter}
                    />
                ))
            }
        </React.Fragment>
    )
}

export default FavoritesUsersWrapper
