import React from 'react'
import FavoritesUsers from './FavoritesUsers'

function FavoritesUsersWrapper({favoritesData}) {

    return (
        <React.Fragment>
            {favoritesData &&
                favoritesData.map(data => (
                    <FavoritesUsers
                    key={data.favorites_id}
                    favoritesUserId={data.favorites_user_id}
                    favoriter={data.favoriter}
                    />
                ))
            }
        </React.Fragment>
    )
}

export default FavoritesUsersWrapper
