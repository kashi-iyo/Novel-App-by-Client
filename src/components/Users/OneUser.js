import React from 'react'
import { Link } from 'react-router-dom'
import RelationshipsLink from '../Follow/RelationshipsLink'
import TagsWrapper from '../Tags/TagsWrapper/TagsWrapper'
import './OneUser.css'

// 1人のユーザーを表示
function OneUser({ link, userId, name, profile, tags, relationships }) {
    return (
        <div className="one-user">
            <div className="one-user--wrapper">
                    <li className="one-user--list">
                        <Link to={link}>{name}</Link>
                    </li>
                <RelationshipsLink
                    userId={userId}
                    followingsCount={relationships.followings_count}
                    followersCount={relationships.followers_count}
                />
                <p className="one-user--profile">{profile}</p>
                <TagsWrapper tags={tags} dataType="user" />
            </div>
        </div>
    )
}

export default OneUser
