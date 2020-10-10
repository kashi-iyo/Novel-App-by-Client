import React, { useState } from 'react'
import useComment from '../../CustomHooks/CommentHooks/useComment'
import Comment from './Comment'
import './CommentWrapper.css'

function CommentWrapper({ novelId }) {
    const [on, setOn] = useState(false)
    const { comments } = useComment({
        method: "get",
        url: `http://localhost:3001/api/v1/novels/${novelId}/comments`
    })

    const handleOn = () => {
        if (on) {
            setOn(false)
        } else if (!on) {
            setOn(true)
        }
    }

    return (
        <div className="NovelsContents__Comments">
            <button type="submit" className="DisplayComment" onClick={handleOn}>
                <p className="Comments__count">コメント： {comments.length}</p>
                <span className="sankaku">▼</span>
            </button>
            {on && comments &&
                <ul className="Comments__Ul">
                {comments.map(comment => (
                    <Comment
                        key={comment.id}
                        commentId={comment.id}
                        content={comment.content}
                        commenter={comment.commenter}
                    />
                ))}
            </ul>
            }
        </div>
    )
}

export default CommentWrapper
