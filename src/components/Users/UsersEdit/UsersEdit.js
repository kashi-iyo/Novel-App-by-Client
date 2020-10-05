import React from 'react'
import classNames from 'classnames'
import './UsersEdit.css'
import useFetchUserItems from '../../CustomHooks/UsersHooks/useFetchUserItems'
import Flash from '../../CustomHooks/Flash/Flash'
import InputTag from '../../Series/SeriesTagForm/SeriesTagForm'

// ユーザー編集フォーム
function UsersEdit(props) {
    const { editUsers, usersTags, addTags, removeTags, handleFalse, handleChange, handleSubmit, success, errors } = useFetchUserItems({
        method: "get",
        url: `http://localhost:3001/users/${props.userId}/edit`,
        updateMethod: "patch",
        updateUrl: `http://localhost:3001/users/${props.userId}`,
        userId: props.userId,
        props: props
    })
    const limitErrors = usersTags.length > 5 ? true : false
    const buttonClass = classNames("button", { "noButton":usersTags.length > 5 })

    return (
        <div>
            <Flash Success={success} Errors={errors} />
            <div className="UsersPageEditForm">
                <h2 className="Caption UsersCaption">╋プロフィール編集</h2>
                {/* Enterでの送信阻止 */}
                <form onSubmit={e => handleFalse(e)} className="UsersEditForm" >
                    <div className="editNicknameWrapper">
                        <label htmlFor="nickname">ニックネーム</label>
                        <input
                            type="text"
                            id="nickname"
                            name="nickname"
                            className="editNickname"
                            value={editUsers.nickname}
                            onChange={handleChange}
                        />
                    </div>
                    <div className="editProfileWrapper">
                        <label htmlFor="profile">紹介文</label>
                        <textarea
                            id="profile"
                            className="editProfile"
                            name="profile"
                            value={editUsers.profile}
                            onChange={handleChange}
                        />
                    </div>
                    <div className="editHobbyTagWrapper">
                        {/* タグフォーム */}
                        <InputTag
                            tags={usersTags}
                            addTags={addTags}
                            removeTags={removeTags}
                            tagTitle="趣味タグ（5個まで）"
                            limitErrors={limitErrors}
                        />
                    </div>
                    <button type="button" onClick={handleSubmit} className={buttonClass}>変更を保存する</button>
                </form>
            </div>
        </div>
    )
}

export default UsersEdit
