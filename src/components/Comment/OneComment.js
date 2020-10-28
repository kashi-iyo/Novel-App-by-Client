import React from 'react'
import { Link } from 'react-router-dom'
import useComment from '../../CustomHooks/CommentHooks/useComment'
import './Comment.css'

// 1つのコメントを表示
function OneComment({ index, content, commentUser, userId, commentUserId, commentId, commentNovelId, commentsItems, setCommentsItems, setSuccess })
{

    // コメントの順番
    const indexNo = parseInt(index) + 1

    // 削除用の関数とサクセスメッセージ
    const { handleRemove, removeMessage } = useComment({
        commentsCount: commentsItems.commentsCount,  // カウントの初期値
        commentsUser: commentsItems.commentsUser,    //  コメントデータの初期値
        setAfterRemove: setCommentsItems, // コメント削除後にStateを変更するのに使う
        setRemoveSuccess: setSuccess    // コメント削除時に表示するメッセージに使う
    })

    return (
        <React.Fragment>
            {
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
