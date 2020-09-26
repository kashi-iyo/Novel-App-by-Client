import React from 'react'
import './UsersEdit.css'
import useFetchUserItems from '../../CustomHooks/UsersHooks/useFetchUserItems'
import Flash from '../../CustomHooks/Flash/Flash'
import Caption from '../../CustomHooks/Caption/Caption'

function UsersEdit(props) {
    const {
        editUsers,
        handleChange,
        handleSubmit,
        success,
        errors
    } = useFetchUserItems({
        method: "get",
        url: `http://localhost:3001/users/${props.userId}/edit`,
        updateMethod: "patch",
        updateUrl: `http://localhost:3001/users/${props.userId}`,
        userId: props.userId,
        props: props
    })

    return (
        <div>
            <Flash Success={success} Errors={errors} />
            <div className="UsersPageEditForm">
                <h2 className="Caption">╋プロフィール編集</h2>
                <form onSubmit={handleSubmit} >
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
                        <label htmlFor="hobbyTag">趣味タグ（5つまで追加できます。）</label>
                        <input
                            type="text"
                            id="hobbyTag"
                            className="editHobbyTag"
                        />
                        <p>（記入例： ライトノベル,野球,React.js,...）</p>
                    </div>
                    <button type="submit" className="button">変更を保存する</button>
                </form>
            </div>
        </div>
    )
}

export default UsersEdit
