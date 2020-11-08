import React from 'react'
import { Link } from 'react-router-dom'
import FollowButton from '../../../Follow/FollowButton'
import TagsWrapper from '../../../Tags/TagsWrapper/TagsWrapper'
import './UsersPageTop.css'

// ユーザーページの上部
function UsersPageTop({ users, userId, usersTags, errors, usersRelationships, setUsersRelationships, handleFlashMessages
}) {

    return (
        <div>
            <h1 className="display-multiple-items--caption">{users.nickname}さんのページ</h1>
            <div className="users-page-top">
                <div className="users-page-top--wrapper">
                    {/* ユーザー名 */}
                    <p className="users-page-top--username">{users.nickname}</p>
                    {/* フォローボタン */}
                    {userId !== users.user_id && <FollowButton
                        errors={errors}
                        userId={users.user_id}
                        usersRelationships={usersRelationships}
                        handleFlashMessages={handleFlashMessages}
                        setUsersRelationships={setUsersRelationships}
                    />}
                </div>
                {/* フォロー数 / フォロワー数 */}
                <div className="users-page-top--relationships">
                    <Link to={`/users/${users.user_id}/followings`}>フォロー： {usersRelationships.followingsCount}</Link>
                    <span className="users-page-top--relationships-span"></span>
                    <Link to={`/users/${users.user_id}/followers`}>フォロワー： {usersRelationships.followersCount}</Link>
                </div>
                {/* プロフィール */}
                <div className="users-page-top--user-profile">{users.profile}</div>
                {/* ユーザーが登録しているタグを表示 */}
                <div className="users-page-top--tag-wrapper">
                    <p className="users-page-top--tag-hobby">登録している趣味タグ：</p>
                    {usersTags.length !== 0 ?
                        <TagsWrapper tags={usersTags} dataType="user" /> :
                            userId === users.user_id &&
                        <p className="users-page-top--no-tags-messages">
                            登録しているタグはまだありません。<br></br>
                            好みのジャンル・アニメなどをタグ登録して同じ趣味を持つユーザーと繋がりましょう！
                        </p>}
                </div>
                {/* 編集ボタン */}
                {userId=== users.user_id &&
                    <div className="users-page-top--edit-wrapper">
                        <Link
                            to={`/users/${userId}/edit`}
                            className="users-page-top--edit-button button">
                            プロフィールを編集する
                        </Link>
                    </div>}
            </div>
        </div>
    )
}

export default UsersPageTop
