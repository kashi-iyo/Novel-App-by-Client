import React from 'react'
import { Link } from 'react-router-dom'
import useComment from '../../CustomHooks/CommentHooks/useComment'
import './Comment.css'

// 1つのコメントを表示
function OneComment({ index, content, commentUser, userId, commentUserId, commentId, commentNovelId, commentItems })
{

    // コメントの順番
    const indexNo = parseInt(index) + 1

    // 削除用の関数とサクセスメッセージ
    const { commentState, handleRemove, success } = useComment({
        commentsCount: commentItems.commentsCount,  // カウントの初期値
        commentsData: commentItems.commentsData,    //  コメントデータの初期値
    })

    return (
        <React.Fragment>
            {success && <span className="success">{success}</span>}
            {commentState &&
                <div className="Comment">
                    <li className="Comment__List">
                        <span className="indexNo">{indexNo} . </span>
                        <Link
                            to={`/users/${commentUserId}`}
                            className="Comment__commenter">
                                {commentUser}
                        </Link>さん ：
                        <span className="Comment__content">{content}</span>
                        {userId === commentUserId &&
                            <span
                                type="submit"
                                onClick={() => handleRemove(commentNovelId, commentId)}
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
