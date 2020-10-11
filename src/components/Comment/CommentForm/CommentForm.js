import React from 'react'
import useComment from '../../CustomHooks/CommentHooks/useComment'
import classNames from 'classnames'
import './CommentForm.css'
import OneCommentWrapper from '../RenderComment/OneCommentWrapper'

// コメントフォーム
function CommentForm({novelId, userId, commenter}) {
    const { content, success, errors, handleChange, handleSubmit } = useComment({
        novelId: novelId,
        userId: userId,
        commenter: commenter
    })

    const buttonClass = classNames("button", { "noButton": content.length === 0  })

    return (
        <React.Fragment>
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
            {success && <p className="success">{success}</p>}
            <OneCommentWrapper
                novelId={novelId}
                userId={userId}
                update={success}
            />
        </React.Fragment>
    )
}

export default CommentForm
