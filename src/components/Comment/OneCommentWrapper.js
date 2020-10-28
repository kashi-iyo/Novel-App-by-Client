import React from 'react'
import OneComment from './OneComment'

// OneCommentへデータを渡すためのコンポーネント
function OneCommentWrapper({ userId, commentsItems, setCommentsItems, setSuccess}) {
    const arr = commentsItems.commentsUser

    return (
        <React.Fragment>
            {arr ?
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
                            commentsItems={commentsItems}
                            setCommentsItems={setCommentsItems}
                            setSuccess={setSuccess}
                        />
                    )
                }) :
                <p>コメントはありません。</p>
            }
        </React.Fragment>
    )
}

export default OneCommentWrapper
