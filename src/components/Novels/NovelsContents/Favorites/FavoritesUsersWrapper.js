import React from 'react'
import FavoritesUsers from './FavoritesUsers'

function FavoritesUsersWrapper(props) {

    return (
        <React.Fragment>
            {props.favoriter &&
                props.favoriter.map(favoriter => (
                    <FavoritesUsers
                        key={favoriter.user_id}
                        user={favoriter.favoriter}
                        favoriterId={favoriter.user_id}
                    />
                ))
            }
        </React.Fragment>
    )
}

export default FavoritesUsersWrapper
