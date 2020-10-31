import React from 'react'
import { Link } from 'react-router-dom'
import TagsWrapper from '../Tags/TagsWrapper/TagsWrapper'
import './OneUser.css'

// 1人のユーザーを表示
function OneUser({link, name, profile, tags}) {
    return (
        <div className="OneUser">
            <div className="OneUserWrapper">
                <li className="TagHasUsers__List">
                    <Link to={link}>{name}</Link>
                </li>
                <p className="OneUserDescription">{profile}</p>
                <TagsWrapper tags={tags} dataType="user" />
            </div>
        </div>
    )
}

export default OneUser
