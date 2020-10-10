import React from 'react'
import './Comment.css'

function Comment({ commentId, content, commenter })
{

    return (
        <div className="Comment">
            <li className="Comment__List">
                <span className="Comment__commenter">{commenter}さん ： </span>
                <span className="Comment__content">{content}</span>
            </li>
        </div>
    )
}

export default Comment
