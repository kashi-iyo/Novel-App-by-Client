import React from 'react'
import { Link } from 'react-router-dom'
import useComment from '../../CustomHooks/CommentHooks/useComment'
import './Comment.css'

// 1つのコメントを表示
function OneComment({ index, content, commentUser, userId, commentUserId, commentId, commentNovelId, commentItems, setCommentItems, handleFlashMessages })
{
console.log()
    // コメントの順番
    const indexNo = parseInt(index) + 1

    // 削除用の関数とサクセスメッセージ
    const { handleRemove } = useComment({
        commentItems: commentItems,
        setCommentItems: setCommentItems,
        handleFlashMessages: handleFlashMessages
    })

    return (
        <React.Fragment>
            <div className="one-comment">
                <li className="one-comment--list">
                    <span className="one-comment--index">{indexNo} . </span>
                    <Link
                        to={`/users/${commentUserId}`}
                        className="one-comment--commenter">
                            {commentUser}
                    </Link>さん ：
                    <span className="one-comment--content">{content}</span>
                    {userId === commentUserId &&
                        <span
                            type="submit"
                            onClick={() => handleRemove(commentNovelId, commentId)}
                            className="one-comment--remove-button"
                        >
                            削除
                    </span>
                    }
                </li>
            </div>
        </React.Fragment>
    )
}

export default OneComment
