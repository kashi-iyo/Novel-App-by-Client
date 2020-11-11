import React, { useState } from 'react'
import useComment from '../../CustomHooks/CommentHooks/useComment'
import './CommentWrapper.css'
import OneCommentWrapper from './OneCommentWrapper'
import classNames from 'classnames'

// コメント機能
function CommentWrapper({ commentItems, setCommentItems, novelId, userId, currentUser, handleFlashMessages }) {
    const commentCounts = commentItems.commentCounts

    // クリックしたときにコメント一覧を表示させる
    const [on, setOn] = useState(false)

    // content, handleChange, handleSubitなどフォームで扱う関数
    const { content, handleChange, handleSubmit } = useComment({
        novelId: novelId,   //バックエンドに送信するデータ
        userId: userId,     //バックエンドに送信するデータ
        currentUser: currentUser,       //バックエンドに送信するデータ
        commentItems: commentItems,
        setCommentItems: setCommentItems,
        handleFlashMessages: handleFlashMessages
    })

    const buttonClass = classNames("button", { "noButton": content.length === 0  })

    const handleOn = () => {
        setOn(!on)
    }

    return (
    <React.Fragment>
        <div className="comment-wrapper--comments">
            <button
                type="submit"
                className="comment-wrapper--down-button"
                onClick={handleOn}
            >
                <p className="comment-wrapper--comment-counts">
                    コメント： {commentCounts}
                </p>
                <span className="sankaku">▼</span>
            </button>
            {on &&
                <ul className="comment-wrapper--comment-form-wrapper">
                    <div className="comment-wrapper--comment-form">
                        <form onSubmit={e => handleSubmit(e)}>
                            <input
                                type="text"
                                id="content"
                                name="content"
                                className="content"
                                placeholder="コメント入力欄"
                                value={content}
                                onChange={handleChange}
                            />
                            <input
                                type="submit"
                                value="送信する"
                                className={buttonClass}
                            />
                        </form>
                    </div>
                    <OneCommentWrapper
                        userId={userId}
                        commentItems={commentItems}
                        setCommentItems={setCommentItems}
                        handleFlashMessages={handleFlashMessages}
                    />
                </ul>
            }
            </div>
        </React.Fragment>
    )
}

export default CommentWrapper
