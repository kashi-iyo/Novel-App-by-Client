import React from 'react'
import OneComment from './OneComment'

// OneCommentへデータを渡すためのコンポーネント
function OneCommentWrapper({ userId, commentItems }) {
    const arr = commentItems.commentsData

    return (
        <React.Fragment>
            {/* {commentItems.commentsData.map(comment => (
                <OneComment
                    key={comment.comment_id}
                    userId={userId}
                    commentId={comment.comment_id}
                    commentNovelId={comment.comment_novel_id}
                    commentUserId={comment.comment_user_id}
                    content={comment.content}
                    commentUser={comment.commenter}
                    commentItems={commentItems}
                />
            ))} */}
            {
                Object.keys(arr).map(key => {
                    let a = arr[key]
                    return (
                        <OneComment
                            key={key}
                            index={key}
                            userId={userId}
                            commentId={a.comment_id}
                            commentNovelId={a.comment_novel_id}
                            commentUserId={a.comment_user_id}
                            content={a.content}
                            commentUser={a.commenter}
                            commentItems={commentItems}
                        />
                    )
                })
            }
        </React.Fragment>
    )
}

export default OneCommentWrapper
