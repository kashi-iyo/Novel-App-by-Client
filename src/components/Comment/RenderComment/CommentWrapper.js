import React, { useState } from 'react'
import CommentCreateForm from '../CommentForm/CommentCreateForm'
import './CommentWrapper.css'

// コメント機能
function CommentWrapper({ commentsCount, novelId, userId, currentUser }) {
    const [on, setOn] = useState(false)

    const handleOn = () => {
        if (on) {
            setOn(false)
        } else if (!on) {
            setOn(true)
        }
    }

    return (
    <React.Fragment>
        <div className="NovelsContents__Comments">
            <button type="submit" className="DisplayComment" onClick={handleOn}>
                <p className="Comments__count">コメント：
                    {commentsCount}
                </p>
                <span className="sankaku">▼</span>
            </button>
            {on &&
                <ul className="Comments__Ul">
                    <CommentCreateForm
                        novelId={novelId}
                        userId={userId}
                        commenter={currentUser}
                    />
                </ul>
            }
            </div>
        </React.Fragment>
    )
}

export default CommentWrapper
