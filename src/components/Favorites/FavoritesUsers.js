import React from 'react'
import { Link } from 'react-router-dom'
import './FavoritesUsers.css'

function FavoritesUsers({favoritesUserId, favoriter}) {
    return (
        <React.Fragment>
            <span className="favorites-users--wrapper">
                <Link to={`/users/${favoritesUserId}`}>
                    {favoriter}
                </Link>
            </span>
            <span className="favorites-users--bar">／</span>
        </React.Fragment>
    )
}

export default FavoritesUsers
