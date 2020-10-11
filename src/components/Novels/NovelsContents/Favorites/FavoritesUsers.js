import React from 'react'
import { Link } from 'react-router-dom'

function FavoritesUsers({user, favoriterId}) {
    return (
        <React.Fragment>
            <span className="FavoritesUsersWrapper"><Link to={`/users/${favoriterId}`}>{user}</Link></span>
            <span className="tuitate">／</span>
        </React.Fragment>
    )
}

export default FavoritesUsers
