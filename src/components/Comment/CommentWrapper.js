import React, { useState } from 'react'
import useComment from '../../CustomHooks/CommentHooks/useComment'
import './CommentWrapper.css'
import OneCommentWrapper from './OneCommentWrapper'
import classNames from 'classnames'

// コメント機能
function CommentWrapper({ commentsCount, commentsData, novelId, userId, currentUser }) {

    // クリックしたときにコメント一覧を表示させる
    const [on, setOn] = useState(false)

    // content, handleChange, handleSubitなどフォームで扱う関数
    const { commentItems, content, success, errors, handleChange, handleSubmit } = useComment({
        novelId: novelId,   //バックエンドに送信するデータ
        userId: userId,     //バックエンドに送信するデータ
        currentUser: currentUser,       //バックエンドに送信するデータ
        commentsCount: commentsCount,   // カウントの初期値
        commentsData: commentsData,     // コメントデータの初期値
    })

    const buttonClass = classNames("button", { "noButton": content.length === 0  })

    const handleOn = () => {
        if (on) {
            setOn(false)
        } else if (!on) {
            setOn(true)
        }
    }

    return (
    <React.Fragment>
        <div className="NovelsContents__Comments">
            <button type="submit" className="DisplayComment" onClick={handleOn}>
                <p className="Comments__count">コメント：
                    {commentItems.commentsCount}
                </p>
                <span className="sankaku">▼</span>
            </button>
            {on &&
                <ul className="Comments__Ul">
                    {errors && <p className="error">{errors}</p>}
                    <div className="CommentForm">
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
                    {success && <span className="success">{success}</span>}
                    {commentItems &&
                        <OneCommentWrapper
                            userId={userId}
                            commentItems={commentItems}
                        />
                    }
                </ul>
            }
            </div>
        </React.Fragment>
    )
}

export default CommentWrapper
