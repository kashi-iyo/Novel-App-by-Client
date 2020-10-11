import React from 'react'
import useComment from '../../CustomHooks/CommentHooks/useComment'
import OneComment from './OneComment'

// OneCommentへデータを渡すためのコンポーネント
function OneCommentWrapper({ novelId, userId, update }) {
    const { comments } = useComment({
        novelId: novelId,
        update: update
    })

    return (
        <React.Fragment>
            {comments.map(comment => (
                <OneComment
                    key={comment.id}
                    commentId={comment.id}
                    novelId={novelId}
                    commenterId={comment.user_id}
                    userId={userId}
                    content={comment.content}
                    commenter={comment.commenter}
                    update={update}
                />
            ))}
        </React.Fragment>
    )
}

export default OneCommentWrapper
