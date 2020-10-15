import React from 'react'
import OneComment from './OneComment'

// OneCommentへデータを渡すためのコンポーネント
function OneCommentWrapper({ userId, commentsData, count, setCount }) {
    console.log(count)
    console.log(commentsData)
    return (
        <React.Fragment>
            {commentsData.map(comment => (
                <OneComment
                    key={comment.comment_id}
                    userId={userId}
                    commentId={comment.comment_id}
                    commentNovelId={comment.comment_novel_id}
                    commentUserId={comment.comment_user_id}
                    content={comment.content}
                    commentUser={comment.commenter}
                    count={count}
                    setCount={setCount}
                />
            ))}
        </React.Fragment>
    )
}

export default OneCommentWrapper
