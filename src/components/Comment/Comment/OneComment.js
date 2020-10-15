import React, {useState} from 'react'
import { Link } from 'react-router-dom'
import useComment from '../../CustomHooks/CommentHooks/useComment'
import './Comment.css'

// 1つのコメントを表示
function OneComment({ content, commentUser, userId, commentUserId, commentId, commentNovelId, count, setCount})
{
    const [commentData, setCommentData] = useState({
        commentId: commentId ? commentId : "",
    })

    const { handleRemove, success } = useComment({
        setCommentData: setCommentData,
        count: count,
        setCount: setCount,
    })

    return (
        <React.Fragment>
            {success && <span className="success">{success}</span>}
            {commentData.commentId &&
                <div className="Comment">
                    <li className="Comment__List">
                        <Link to={`/users/${commentUserId}`} className="Comment__commenter">{commentUser}</Link>さん ：
                        <span className="Comment__content">{content}</span>
                        {userId === commentUserId &&
                            <span
                                type="submit"
                                onClick={() => handleRemove(commentNovelId, commentData.commentId)}
                                className="CommentRemove"
                            >
                                削除
                        </span>
                        }
                    </li>
                </div>
            }
        </React.Fragment>
    )
}

export default OneComment
