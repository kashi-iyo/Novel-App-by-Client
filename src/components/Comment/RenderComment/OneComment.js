import React from 'react'
import useComment from '../../CustomHooks/CommentHooks/useComment'
import './Comment.css'

// 1つのコメントを表示
function OneComment({ content, commenter, userId, commenterId, commentId, novelId, update})
{

    const { handleRemove, success } = useComment({
        novelId: novelId,
        commentId: commentId,
        update: update
    })

    return (
        <div className="Comment">
            {success &&  <p className="success">{success}</p>}
            <li className="Comment__List">
                <span className="Comment__commenter">{commenter}さん ： </span>
                <span className="Comment__content">{content}</span>
                {userId === commenterId &&
                    <p>
                        <button type="submit" onClick={handleRemove} className="CommentRemove">削除</button>
                    </p>
                }
            </li>
        </div>
    )
}

export default OneComment
