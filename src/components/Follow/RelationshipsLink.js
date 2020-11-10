import React from 'react'
import { Link } from 'react-router-dom'
import './RelationshipsCounts.css'

function RelationshipsLink({userId, followingsCount, followersCount}) {
    return (
        <div className="users-page-top--relationships">
            <Link to={`/users/${userId}/followings`}>フォロー： {followingsCount}</Link>
            <span className="users-page-top--relationships-span"></span>
            <Link to={`/users/${userId}/followers`}>フォロワー： {followersCount}</Link>
        </div>
    )
}

export default RelationshipsLink
