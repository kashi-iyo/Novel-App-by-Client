import React from 'react'
import { Link } from 'react-router-dom'

function FavoritesUsers({favoritesUserId, favoriter}) {
    return (
        <React.Fragment>
            <span className="FavoritesUsersWrapper"><Link to={`/users/${favoritesUserId}`}>{favoriter}</Link></span>
            <span className="tuitate">／</span>
        </React.Fragment>
    )
}

export default FavoritesUsers
