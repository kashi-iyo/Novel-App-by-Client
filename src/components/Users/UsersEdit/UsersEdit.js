import React from 'react'
import classNames from 'classnames'
import './UsersEdit.css'
import useFetchUserItems from '../../../CustomHooks/UsersHooks/useFetchUserItems'
import InputTag from '../../Series/SeriesTagForm/SeriesTagForm'
import ValidateWordsCounts from '../../ValidateWordsCounts/ValidateWordsCounts'
import Button from '../../Button/Button'

// ユーザー編集フォーム
function UsersEdit({userId, history, handleFlashMessages}) {
    const { editUsers, usersTags, addTags, removeTags, handleFalse, handleChange, handleSubmit, success, errors } = useFetchUserItems({
        method: "get",
        url: `http://localhost:3001/api/v1/users/${userId}/edit`,
        updateMethod: "patch",
        updateUrl: `http://localhost:3001/api/v1/users/${userId}`,
        userId: userId,
        history: history,
        handleFlashMessages: handleFlashMessages
    })
    const limitErrors = usersTags.length > 5 ? true : false
    const nickname = editUsers && editUsers.nickname
    const profile = editUsers && editUsers.profile

    return (
        <div>
            <div className="users-edit--form-wrapper">
                <h2 className="caption">プロフィール編集</h2>
                {/* Enterでの送信阻止 */}
                <form onSubmit={e => handleFalse(e)} className="users-edit--form" >
                    <div className="users-edit--nickname-wrapper">
                        <label htmlFor="nickname">ニックネーム</label>
                        <ValidateWordsCounts
                            wordsLength={nickname.length}
                            upperLimit={30}
                            isRequire={true}
                        />
                        <input
                            type="text"
                            id="nickname"
                            name="nickname"
                            className="editNickname"
                            value={nickname}
                            onChange={handleChange}
                        />
                    </div>
                    <div className="users-edit--profile-wrapper">
                        <label htmlFor="profile">紹介文</label>
                        <ValidateWordsCounts
                            wordsLength={profile.length}
                            upperLimit={200}
                            isRequire={false}
                        />
                        <textarea
                            id="profile"
                            className="editProfile"
                            name="profile"
                            value={profile}
                            onChange={handleChange}
                        />
                    </div>
                    <div className="users-edit--hobby-tag-wrapper">
                        {/* タグフォーム */}
                        <InputTag
                            tags={usersTags}
                            addTags={addTags}
                            removeTags={removeTags}
                            tagTitle="趣味タグ（5個まで）"
                            limitErrors={limitErrors}
                        />
                    </div>
                    <Button
                        handleSubmit={handleSubmit}
                        badCase={
                            nickname.length === 0 ||
                            nickname.length > 30 ||
                            profile.length > 200 ||
                            usersTags.length > 5 ?
                            true :
                            false
                        }
                        buttonValue="変更を保存する"
                    />
                </form>
            </div>
        </div>
    )
}

export default UsersEdit
