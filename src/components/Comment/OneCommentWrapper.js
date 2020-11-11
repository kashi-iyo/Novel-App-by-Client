import React from 'react'
import OneComment from './OneComment'

// OneCommentへデータを渡すためのコンポーネント
function OneCommentWrapper({ userId, commentItems, setCommentItems, handleFlashMessages }) {
    const contents = commentItems.commentContents

    return (
        <React.Fragment>
            {contents.length !== 0 ?
                Object.keys(contents).map(key => {
                    return (
                        <OneComment
                            key={key}
                            index={key}
                            userId={userId}
                            commentId={contents[key].comment_id}
                            commentNovelId={contents[key].comment_novel_id}
                            commentUserId={contents[key].comment_user_id}
                            content={contents[key].content}
                            commentUser={contents[key].commenter}
                            commentItems={commentItems}
                            setCommentItems={setCommentItems}
                            handleFlashMessages={handleFlashMessages}
                        />
                    )
                }) :
                <p>投稿されたコメントはありません。</p>
            }
        </React.Fragment>
    )
}

export default OneCommentWrapper
