import React from 'react'
import CommentForm from './CommentForm'
import './CommentCreateForm.css'

function CommentCreateForm({ novelId, userId, commenter }) {

    return (
        <div className="CommentCreateForm">
            <CommentForm
                novelId={novelId}
                userId={userId}
                commenter={commenter}
            />
        </div>
    )
}

export default CommentCreateForm
