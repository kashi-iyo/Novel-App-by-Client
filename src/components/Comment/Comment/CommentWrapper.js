import React, { useState } from 'react'
import useComment from '../../CustomHooks/CommentHooks/useComment'
import './CommentWrapper.css'
import OneCommentWrapper from './OneCommentWrapper'
import classNames from 'classnames'

// コメント機能
function CommentWrapper({ commentsCount, commentsData, novelId, userId, currentUser }) {
    const [on, setOn] = useState(false)
    const [count, setCount] = useState({
        commentsCount: commentsCount
    })

    const { content, success, errors, handleChange, handleSubmit } = useComment({
        novelId: novelId,
        userId: userId,
        currentUser: currentUser,
        count: count,
        setCount: setCount,
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
                    {count.commentsCount}
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
                    <OneCommentWrapper
                        userId={userId}
                        commentsData={commentsData}
                        count={count}
                        setCount={setCount}
                    />
                </ul>
            }
            </div>
        </React.Fragment>
    )
}

export default CommentWrapper
